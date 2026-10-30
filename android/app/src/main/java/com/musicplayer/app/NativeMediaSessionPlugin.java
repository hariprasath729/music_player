package com.musicplayer.app;

import android.Manifest;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.pm.PackageManager;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.os.Build;

import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;
import androidx.media.session.MediaButtonReceiver;
import android.support.v4.media.MediaMetadataCompat;
import android.support.v4.media.session.MediaSessionCompat;
import android.support.v4.media.session.PlaybackStateCompat;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.net.URL;

@CapacitorPlugin(name = "NativeMediaSession")
public class NativeMediaSessionPlugin extends Plugin {
    private static final String CHANNEL_ID = "music_playback";
    private static final int NOTIFICATION_ID = 4201;
    private static final int NOTIFICATION_PERMISSION_REQUEST = 4202;

    private MediaSessionCompat mediaSession;
    private String title = "Music Player";
    private String artist = "";
    private String album = "";
    private boolean playing = false;
    private boolean transitioning = false;
    private long position = 0;
    private long duration = 0;
    private android.graphics.Bitmap artworkBitmap;
    private android.os.PowerManager.WakeLock wakeLock;
    private boolean foregroundServiceStarted = false;

    private synchronized void updateForegroundService(boolean shouldRun) {
        try {
            Intent intent = new Intent(getContext(), PlaybackForegroundService.class);
            if (shouldRun) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    ContextCompat.startForegroundService(getContext(), intent);
                } else {
                    getContext().startService(intent);
                }
                foregroundServiceStarted = true;
            } else if (foregroundServiceStarted) {
                getContext().stopService(intent);
                foregroundServiceStarted = false;
            }
        } catch (Exception ignored) {
        }
    }

    private synchronized void updateWakeLock(boolean shouldHold) {
        try {
            if (shouldHold) {
                if (wakeLock == null) {
                    android.os.PowerManager pm = (android.os.PowerManager) getContext().getSystemService(android.content.Context.POWER_SERVICE);
                    if (pm != null) {
                        wakeLock = pm.newWakeLock(android.os.PowerManager.PARTIAL_WAKE_LOCK, "MusicPlayer:AudioPlaybackWakeLock");
                        wakeLock.setReferenceCounted(false);
                    }
                }
                if (wakeLock != null && !wakeLock.isHeld()) {
                    wakeLock.acquire(12 * 60 * 60 * 1000L); // Max 12 hours timeout safety
                }
            } else {
                if (wakeLock != null && wakeLock.isHeld()) {
                    wakeLock.release();
                }
            }
        } catch (Exception ignored) {
        }
    }

    @Override
    public void load() {
        super.load();
        createChannel();
        mediaSession = new MediaSessionCompat(getContext(), "MusicPlayer");
        mediaSession.setCallback(new MediaSessionCompat.Callback() {
            @Override public void onPlay() { emitAction("play"); }
            @Override public void onPause() { emitAction("pause"); }
            @Override public void onSkipToNext() { emitAction("next"); }
            @Override public void onSkipToPrevious() { emitAction("previous"); }
            @Override public void onSeekTo(long seekPosition) { emitSeek(seekPosition); }
        });
        mediaSession.setFlags(MediaSessionCompat.FLAG_HANDLES_MEDIA_BUTTONS | MediaSessionCompat.FLAG_HANDLES_TRANSPORT_CONTROLS);
    }

    @PluginMethod
    public void requestNotifications(PluginCall call) {
        if (Build.VERSION.SDK_INT >= 33 && ActivityCompat.checkSelfPermission(getContext(), Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(getActivity(), new String[]{Manifest.permission.POST_NOTIFICATIONS}, NOTIFICATION_PERMISSION_REQUEST);
        }
        call.resolve();
    }

    @PluginMethod
    public void updateMetadata(PluginCall call) {
        title = call.getString("title", "Music Player");
        artist = call.getString("artist", "");
        album = call.getString("album", "");
        duration = Math.max(0, (long) (call.getDouble("duration", 0.0) * 1000));
        String artwork = call.getString("artwork", "");
        if (mediaSession != null) {
            MediaMetadataCompat metadata = new MediaMetadataCompat.Builder()
                .putString(MediaMetadataCompat.METADATA_KEY_TITLE, title)
                .putString(MediaMetadataCompat.METADATA_KEY_ARTIST, artist)
                .putString(MediaMetadataCompat.METADATA_KEY_ALBUM, album)
                .putLong(MediaMetadataCompat.METADATA_KEY_DURATION, duration)
                .build();
            mediaSession.setMetadata(metadata);
        }
        publishNotification();
        if (artwork != null && !artwork.isEmpty()) {
            new Thread(() -> {
                try (java.io.InputStream stream = new URL(artwork).openStream()) {
                    android.graphics.Bitmap bitmap = BitmapFactory.decodeStream(stream);
                    if (bitmap != null) {
                        artworkBitmap = bitmap;
                        getActivity().runOnUiThread(this::publishNotification);
                    }
                } catch (Exception ignored) {
                    // Artwork is optional; the notification remains usable without it.
                }
            }).start();
        }
        call.resolve();
    }

    @PluginMethod
    public void updatePlayback(PluginCall call) {
        playing = call.getBoolean("playing", false);
        transitioning = call.getBoolean("transitioning", false);
        position = Math.max(0, (long) (call.getDouble("position", 0.0) * 1000));
        duration = Math.max(0, (long) (call.getDouble("duration", 0.0) * 1000));
        float rate = (float) Math.max(0.1, call.getDouble("rate", 1.0));
        updateForegroundService(playing || transitioning);
        int state = playing ? PlaybackStateCompat.STATE_PLAYING : PlaybackStateCompat.STATE_PAUSED;
        long actions = PlaybackStateCompat.ACTION_PLAY | PlaybackStateCompat.ACTION_PAUSE |
            PlaybackStateCompat.ACTION_SKIP_TO_NEXT | PlaybackStateCompat.ACTION_SKIP_TO_PREVIOUS |
            PlaybackStateCompat.ACTION_SEEK_TO;
        mediaSession.setPlaybackState(new PlaybackStateCompat.Builder()
            .setActions(actions)
            .setBufferedPosition(duration)
            .setState(state, position, rate)
            .build());
        updateWakeLock(playing);
        publishNotification();
        call.resolve();
    }

    @PluginMethod
    public void clear(PluginCall call) {
        updateForegroundService(false);
        updateWakeLock(false);
        if (mediaSession != null) {
            mediaSession.setActive(false);
            mediaSession.release();
            mediaSession = null;
        }
        NotificationManager manager = (NotificationManager) getContext().getSystemService(NotificationManager.class);
        if (manager != null) manager.cancel(NOTIFICATION_ID);
        call.resolve();
    }

    private void emitAction(String action) {
        JSObject data = new JSObject();
        data.put("action", action);
        notifyListeners("mediaAction", data);
    }

    private void emitSeek(long seekPosition) {
        JSObject data = new JSObject();
        data.put("action", "seek");
        data.put("position", seekPosition / 1000.0);
        notifyListeners("mediaAction", data);
    }

    private void createChannel() {
        if (Build.VERSION.SDK_INT < 26) return;
        NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "Music playback", NotificationManager.IMPORTANCE_LOW);
        channel.setDescription("Playback controls");
        channel.setShowBadge(false);
        NotificationManager manager = (NotificationManager) getContext().getSystemService(NotificationManager.class);
        if (manager != null) manager.createNotificationChannel(channel);
    }

    private void publishNotification() {
        if (mediaSession == null) return;
        if (Build.VERSION.SDK_INT >= 33 && ActivityCompat.checkSelfPermission(getContext(), Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) return;

        mediaSession.setActive(true);
        NotificationCompat.Builder builder = new NotificationCompat.Builder(getContext(), CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_media_play)
            .setContentTitle(title)
            .setContentText(artist)
            .setSubText(album)
            .setOngoing(playing || transitioning)
            .setOnlyAlertOnce(true)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC);
        if (artworkBitmap != null) builder.setLargeIcon(artworkBitmap);

        Notification notification = builder
            .setStyle(new androidx.media.app.NotificationCompat.MediaStyle()
                .setMediaSession(mediaSession.getSessionToken())
                .setShowActionsInCompactView(0, 1, 2))
            .addAction(new NotificationCompat.Action(
                android.R.drawable.ic_media_previous, "Previous", MediaButtonReceiver.buildMediaButtonPendingIntent(getContext(), android.support.v4.media.session.PlaybackStateCompat.ACTION_SKIP_TO_PREVIOUS)))
            .addAction(new NotificationCompat.Action(
                playing ? android.R.drawable.ic_media_pause : android.R.drawable.ic_media_play,
                playing ? "Pause" : "Play",
                MediaButtonReceiver.buildMediaButtonPendingIntent(getContext(), playing ? PlaybackStateCompat.ACTION_PAUSE : PlaybackStateCompat.ACTION_PLAY)))
            .addAction(new NotificationCompat.Action(
                android.R.drawable.ic_media_next, "Next", MediaButtonReceiver.buildMediaButtonPendingIntent(getContext(), PlaybackStateCompat.ACTION_SKIP_TO_NEXT)))
            .build();

        NotificationManager manager = (NotificationManager) getContext().getSystemService(NotificationManager.class);
        if (manager != null) manager.notify(NOTIFICATION_ID, notification);
    }
}
