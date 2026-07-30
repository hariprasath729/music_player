import React, { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Track, Playlist, TRACKS } from '../data/musicCatalog';
import { audioEngine } from '../services/audioEngine';
import { playlistApi, likeApi, recentlyPlayedApi, playCountApi, libraryApi, mapSongToTrack, homeApi } from '../services/apiClient';
import { useAuth } from './AuthContext';
import { downloadService } from '../services/downloadService';
import streamService from '../services/streamService';
import { X, Check, Plus, Heart, ListMusic } from 'lucide-react';

export type RepeatMode = 'off' | 'all' | 'one';
export type ViewType =
  | 'home'
  | 'search'
  | 'library'
  | 'playlist'
  | 'liked-songs'
  | 'lyrics'
  | 'visualizer'
  | 'profile'
  | 'all-songs'
  | 'artists'
  | 'artist'
  | 'request-song'
  | 'play-area'
  | 'downloads';

export interface ToastMessage {
  id: number;
  text: string;
  icon?: string;
}

export const isBgmOrScore = (track: Track): boolean => {
  const albumName = (track.album || '').toLowerCase();
  const titleName = (track.title || '').toLowerCase();
  return (
    albumName.includes('(original background score)') ||
    albumName.includes('bgm') ||
    albumName.includes('side a') ||
    albumName.includes('side b') ||
    albumName.includes('instrumental') ||
    albumName.includes('theme') ||
    titleName.includes('theme') ||
    titleName.includes('instrumental') 
  );
};

export interface CustomPlaylist {
  id: string;
  title: string;
  description: string;
  songIds: string[];
  createdAt: string;
}

interface PlayerContextType {
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  queue: Track[];
  history: Track[];
  isShuffle: boolean;
  repeatMode: RepeatMode;
  currentView: ViewType;
  activePlaylist: Playlist | null;
  likedTracks: string[];
  isFullScreen: boolean;
  searchQuery: string;
  isQueueOpen: boolean;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  isFullScreenMenuOpen: boolean;
  toasts: ToastMessage[];
  canGoBack: boolean;
  canGoForward: boolean;
  activeFilter: string;
  customPlaylists: CustomPlaylist[];
  isPlaybackLocked: boolean;

  playbackRate: number;
  setPlaybackRate: (rate: number) => void;
  sleepTimerRemaining: number | null;
  isSleepAtTrackEnd: boolean;
  setSleepTimer: (minutes: number | 'track-end' | null) => void;

  setIsPlaybackLocked: (locked: boolean) => void;
  playTrack: (track: Track, contextTracks?: Track[], force?: boolean) => void;
  togglePlay: (force?: boolean, forceState?: boolean) => void;
  nextTrack: (force?: boolean) => void;
  prevTrack: (force?: boolean) => void;
  seek: (time: number, force?: boolean) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  reorderQueue: (startIndex: number, endIndex: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleLike: (trackId: string) => void;
  setView: (view: ViewType, playlist?: Playlist | null) => void;
  toggleFullScreen: () => void;
  setSearchQuery: (query: string) => void;
  toggleQueue: () => void;
  setIsFullScreenMenuOpen: (open: boolean) => void;
  showToast: (text: string, icon?: string) => void;
  goBack: () => void;
  goForward: () => void;
  setActiveFilter: (f: string) => void;
  createPlaylist: (title: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  renamePlaylist: (playlistId: string, title: string) => void;
  deletePlaylist: (playlistId: string) => void;
  downloadedTracks: string[];
  toggleDownload: (track: Track) => Promise<void>;
  downloadedPlaylists: string[];
  togglePlaylistDownload: (playlistId: string, isDownloaded: boolean) => void;
  likedPlaylists: string[];
  toggleLikePlaylist: (playlistId: string) => void;
  followedArtists: string[];
  toggleFollowArtist: (artistName: string) => void;
  savedAlbums: string[];
  toggleSaveAlbum: (albumName: string) => void;
  addToPlaylistTrack: Track | null;
  setAddToPlaylistTrack: (track: Track | null) => void;
  downloadProgress: Record<string, number>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const LAST_TRACK_KEY = 'music_player_last_track';
const PLAYER_SETTINGS_KEY = 'music_player_settings';

const EMPTY_TRACK: Track = {
  id: '' ,
  title: 'No song selected',
  artist: 'Unknown',
  album: '',
  duration: 0,
  genre: '' as any,
  color: '#282828',
  gradient: 'linear-gradient(135deg, #282828, #121212)',
  fileUrl: '',
  coverUrl: ''
};

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track>(EMPTY_TRACK);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const [queue, setQueue] = useState<Track[]>([]);
  const [history, setHistory] = useState<Track[]>(() => {
    try { return JSON.parse(localStorage.getItem('music_player_history') || '[]'); } catch { return []; }
  });
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');

  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);
  const [likedTracks, setLikedTracks] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('music_player_liked_tracks') || '[]'); } catch { return []; }
  });
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isQueueOpen, setIsQueueOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isFullScreenMenuOpen, setIsFullScreenMenuOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [viewStack, setViewStack] = useState<{ view: ViewType; playlist: Playlist | null }[]>([{ view: 'home', playlist: null }]);
  const [viewStackIndex, setViewStackIndex] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [customPlaylists, setCustomPlaylists] = useState<CustomPlaylist[]>([]);
  const [isPlaybackLocked, setIsPlaybackLocked] = useState<boolean>(false);
  const [playbackRate, setPlaybackRateState] = useState<number>(1);
  const [sleepTimerEnd, setSleepTimerEnd] = useState<number | null>(null);
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState<number | null>(null);
  const [isSleepAtTrackEnd, setIsSleepAtTrackEndState] = useState<boolean>(false);
  const isSleepAtTrackEndRef = useRef<boolean>(false);

  const setIsSleepAtTrackEnd = (val: boolean) => {
    setIsSleepAtTrackEndState(val);
    isSleepAtTrackEndRef.current = val;
  };
  const [addToPlaylistTrack, setAddToPlaylistTrack] = useState<Track | null>(null);
  const [newPlTitle, setNewPlTitle] = useState('');
  const [downloadedTracks, setDownloadedTracks] = useState<string[]>([]);
  const [downloadedPlaylists, setDownloadedPlaylists] = useState<string[]>([]);
  const [likedPlaylists, setLikedPlaylists] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('music_player_liked_playlists') || '[]');
    } catch {
      return [];
    }
  });
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});
  const [followedArtists, setFollowedArtists] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('music_player_followed_artists') || '[]'); } catch { return []; }
  });
  const [savedAlbums, setSavedAlbums] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('music_player_saved_albums') || '[]'); } catch { return []; }
  });

  const { isLoggedIn, user } = useAuth();
  const prevVolumeRef = useRef<number>(0.7);
  const toastIdRef = useRef<number>(0);
  const loadingTrackIdRef = useRef<string | null>(null);

  // ── Live state refs (always current, safe to read from background callbacks) ──
  // These prevent stale closure bugs when track ends while screen is locked.
  const queueRef = useRef<Track[]>([]);
  const repeatModeRef = useRef<RepeatMode>('off');
  const isShuffleRef = useRef<boolean>(false);
  const activePlaylistRef = useRef<Playlist | null>(null);
  const currentTrackRef = useRef<Track>(EMPTY_TRACK);
  const isPlaybackLockedRef = useRef<boolean>(false);
  const isLoggedInRef = useRef<boolean>(false);
  const currentTimeRef = useRef<number>(0);
  const downloadedTracksRef = useRef<string[]>([]);
  const volumeRef = useRef<number>(0.7);
  const isMutedRef = useRef<boolean>(false);
  const playbackRateRef = useRef<number>(1);

  const lastClickPos = useRef<{ x: number; y: number } | null>(null);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});

  // Stop any active media when the player shell unmounts (for example on logout).
  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  useEffect(() => {
    downloadService.init();
    setDownloadedTracks(downloadService.getDownloadedIds());
    setDownloadedPlaylists(downloadService.getDownloadedPlaylists());
  }, []);

  // When the user comes back online, silently re-download any tracks that were
  // in the download list but whose cache entry was cleared by the browser.
  useEffect(() => {
    const handleOnline = async () => {
      const ids = downloadService.getDownloadedIds();
      if (ids.length === 0) return;
      for (const id of ids) {
        const exists = await downloadService.isCached(id);
        if (!exists) {
          // Re-download silently in the background
          downloadService.downloadTrack({ id }).catch(() => {});
        }
      }
    };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  // Global input tracker for popup positioning
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      lastClickPos.current = { x: e.clientX, y: e.clientY };
    };
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.code === 'KeyL') lastClickPos.current = null;
    };
    document.addEventListener('mousedown', handleGlobalClick, true);
    document.addEventListener('keydown', handleGlobalKey, true);
    return () => {
      document.removeEventListener('mousedown', handleGlobalClick, true);
      document.removeEventListener('keydown', handleGlobalKey, true);
    };
  }, []);

  // Check for PWA update flag on load
  useEffect(() => {
    if (sessionStorage.getItem('pwa-updated') === 'true') {
      const v = sessionStorage.getItem('pwa-updated-version');

      showToast(
        v ? `Version ${v} updated successfully` : 'Version updated successfully',
        'check'
      );

      sessionStorage.removeItem('pwa-updated');
      // Keep `pwa-updated-version` so we don't re-show the same
      // “update available” notification after a manual refresh.

      // Clear suppression AFTER the update UI has had time to settle.
      // If we clear it synchronously, the app can re-render and re-open
      // the "update available" UI during the same refresh cycle.
      window.setTimeout(() => {
        sessionStorage.removeItem('pwa-suppress-update-ui');
      }, 1000);
    } else {
      // Clear suppression immediately on normal page loads/manual refreshes
      sessionStorage.removeItem('pwa-suppress-update-ui');
    }
  }, []);
  useEffect(() => {
    if (addToPlaylistTrack && lastClickPos.current) {
      const { x, y } = lastClickPos.current;
      const isRight = x > window.innerWidth / 2;
      const isBottom = y > window.innerHeight / 2;
      setPopupStyle({ position: 'fixed', ...(isBottom ? { bottom: window.innerHeight - y + 15 } : { top: y + 15 }), ...(isRight ? { right: window.innerWidth - x - 15 } : { left: x - 15 }), zIndex: 10000 });
    } else if (addToPlaylistTrack) {
      setPopupStyle({ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10000 });
    }
  }, [addToPlaylistTrack]);

  // Load persistent local settings
  useEffect(() => {
    try {
      const storedLastTrack = localStorage.getItem(LAST_TRACK_KEY);
      if (storedLastTrack) {
        const parsed = JSON.parse(storedLastTrack) as any;
        if (parsed.track) {
          setCurrentTrack(parsed.track);
          setDuration(parsed.track.duration);
          setCurrentTime(parsed.time || 0);
        } else if (parsed.trackId) {
          const match = TRACKS.find((t) => String(t.id) === String(parsed.trackId));
          if (match) {
            setCurrentTrack(match);
            setDuration(match.duration);
            setCurrentTime(parsed.time || 0);
          }
        }
      }

      const storedSettings = localStorage.getItem(PLAYER_SETTINGS_KEY);
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings) as { volume?: number; isShuffle?: boolean; repeatMode?: RepeatMode; playbackRate?: number };
        if (typeof parsed.volume === 'number') setVolumeState(parsed.volume);
        if (typeof parsed.isShuffle === 'boolean') setIsShuffle(parsed.isShuffle);
        if (parsed.repeatMode) setRepeatMode(parsed.repeatMode);
        if (typeof parsed.playbackRate === 'number') {
          setPlaybackRateState(parsed.playbackRate);
          if (typeof (audioEngine as any).setPlaybackRate === 'function') (audioEngine as any).setPlaybackRate(parsed.playbackRate);
        }
      }
    } catch (err) {
      console.warn('[PlayerContext] Failed to load localStorage state', err);
    }
  }, []);

  // Sync with Backend when Auth State Changes
  useEffect(() => {
    // isLoggedIn is safely restored from localStorage, wait for it before fetching!
    if (isLoggedIn) {
      libraryApi.getLibrary().then((res) => {
        if (res.success && res.data) {
          setLikedTracks(res.data.likedSongs?.map((s: any) => String(s._id || s.id)) || []);
          setCustomPlaylists(res.data.playlists?.map((p: any) => ({
            id: p._id,
            title: p.name,
            description: 'Custom playlist',
            songIds: p.songs?.map((s: any) => String(s._id || s.id)) || [],
            createdAt: p.createdAt,
          })));
          setHistory(res.data.recentlyPlayed?.map((s: any) => ({ ...mapSongToTrack(s), playedAt: s.playedAt })) || []);
          setFollowedArtists(res.data.followedArtists || []);
          setSavedAlbums(res.data.savedAlbums || []);

          // Resume the user's last listened song if one exists
          if (res.data.recentlyPlayed.length > 0) {
            const mappedRecent = { ...mapSongToTrack(res.data.recentlyPlayed[0]), playedAt: res.data.recentlyPlayed[0].playedAt };
            setCurrentTrack(prev => prev.id === '' ? (mappedRecent as Track) : prev);
          }
        }
      }).catch(err => console.error("Library sync failed", err));
    } else {
      // Clear user data on logout
      setLikedTracks([]);
      setCustomPlaylists([]);
      setHistory([]);
      setQueue([]);
      setActivePlaylist(null);
      setFollowedArtists([]);
      setSavedAlbums([]);
      setIsSleepAtTrackEnd(false);
      setSleepTimerEnd(null);
      setSleepTimerRemaining(null);
      // Clear stream token cache so stale tokens don't linger
      streamService.clearStreamCache();
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    localStorage.setItem('music_player_liked_tracks', JSON.stringify(likedTracks));
  }, [likedTracks]);

  useEffect(() => {
    localStorage.setItem('music_player_liked_playlists', JSON.stringify(likedPlaylists));
  }, [likedPlaylists]);

  useEffect(() => {
    localStorage.setItem('music_player_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('music_player_followed_artists', JSON.stringify(followedArtists));
  }, [followedArtists]);

  useEffect(() => {
    localStorage.setItem('music_player_saved_albums', JSON.stringify(savedAlbums));
  }, [savedAlbums]);

  // Persist the last track for resume
  useEffect(() => {
    if (currentTrack.id !== '') {
      localStorage.setItem(LAST_TRACK_KEY, JSON.stringify({ track: currentTrack, time: currentTime }));
    }
  }, [currentTrack, currentTime]);



  // Keep live refs in sync with React state so background callbacks always see current values
  useEffect(() => { queueRef.current = queue; }, [queue]);
  useEffect(() => { repeatModeRef.current = repeatMode; }, [repeatMode]);
  useEffect(() => { isShuffleRef.current = isShuffle; }, [isShuffle]);
  useEffect(() => { activePlaylistRef.current = activePlaylist; }, [activePlaylist]);
  useEffect(() => { currentTrackRef.current = currentTrack; }, [currentTrack]);
  useEffect(() => { isPlaybackLockedRef.current = isPlaybackLocked; }, [isPlaybackLocked]);
  useEffect(() => { isLoggedInRef.current = isLoggedIn; }, [isLoggedIn]);
  useEffect(() => { currentTimeRef.current = currentTime; }, [currentTime]);
  useEffect(() => { downloadedTracksRef.current = downloadedTracks; }, [downloadedTracks]);
  useEffect(() => { volumeRef.current = volume; }, [volume]);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);
  useEffect(() => { playbackRateRef.current = playbackRate; }, [playbackRate]);

  // Sync playback time
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        const t = audioEngine.getCurrentTime();
        const realDuration = audioEngine.getDuration();
        setCurrentTime(t);
        if (realDuration > 0 && Math.abs(realDuration - duration) > 0.5) {
          setDuration(realDuration);
          // Update the track object globally so the real duration shows up everywhere else
          if (currentTrack) currentTrack.duration = realDuration;
        }
        if (audioEngine.hasEnded() || (realDuration > 0 && t >= realDuration - 0.15)) {
          handleTrackEnd();
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, duration, queue, repeatMode]);

  // Prefetch stream URLs for the upcoming 2 tracks and cache the next track's audio after 3 seconds of playback
  useEffect(() => {
    const next = queue[0];
    const afterNext = queue[1];

    if (!next?.id || !isPlaying || currentTrack.id === '') return;

    let active = true;

    // Delay prefetching by 3 seconds to let current song buffer and start playing smoothly
    const timer = setTimeout(() => {
      if (!active) return;

      // 1. Prefetch stream URL for the 2nd upcoming song
      if (afterNext?.id) {
        streamService.prefetch(afterNext.id);
      }

      // 2. Prefetch stream URL and cache audio stream for the next song
      streamService.getStreamUrl(next.id)
        .then((streamUrl) => {
          if (!active) return;
          next.fileUrl = streamUrl;

          // Warm up browser HTTP cache for the next song's audio stream
          fetch(streamUrl, { mode: 'cors' }).catch(() => {
            // Non-critical background warmup
          });
        })
        .catch((err) => {
          console.warn('[PlayerContext] Failed to prefetch next song:', err);
        });
    }, 3000);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [currentTrack.id, queue, isPlaying]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          if (e.shiftKey) nextTrack();
          else seek(currentTime + 10);
          break;
        case 'ArrowLeft':
          if (e.shiftKey) prevTrack();
          else seek(currentTime - 10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.05));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.05));
          break;
        case 'KeyM':
          toggleMute();
          break;
        case 'KeyS':
          toggleShuffle();
          break;
        case 'KeyR':
          toggleRepeat();
          break;
        case 'KeyL':
          if (currentTrack.id !== '') setAddToPlaylistTrack(currentTrack);
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentTime, volume, currentTrack, likedTracks]); // added likedTracks

  const handleTrackEnd = () => {
    // Read live refs — this is called from both the poll interval and onEnded
    const _isPlaybackLocked = isPlaybackLockedRef.current;
    const _currentTrack = currentTrackRef.current;
    if (_isPlaybackLocked) return;
    if (_currentTrack.id === '') return;
    if (isSleepAtTrackEndRef.current) {
      audioEngine.pause();
      setIsPlaying(false);
      setIsSleepAtTrackEnd(false);
      showToast('Sleeper ended playback', 'moon');
      return;
    }
    if (repeatModeRef.current === 'one') {
      // Re-fetch a fresh stream URL for repeat-one (current token might be near expiry)
      streamService.getStreamUrl(_currentTrack.id).then((streamUrl) => {
        _currentTrack.fileUrl = streamUrl;
        audioEngine.playNext(streamUrl, _currentTrack.duration);
        setCurrentTime(0);
      }).catch(() => {
        // On failure just try with whatever fileUrl is stored
        if (_currentTrack.fileUrl) audioEngine.playNext(_currentTrack.fileUrl, _currentTrack.duration);
        setCurrentTime(0);
      });
    } else {
      nextTrack(false, true); // fromTrackEnd=true → use playNext to preserve autoplay
    }
  };

  const playTrack = (track: Track, contextTracks?: Track[], force: boolean = false, fromTrackEnd: boolean = false) => {
    // Read live values from refs to avoid stale closures (critical for background/locked-screen)
    const _isPlaybackLocked = isPlaybackLockedRef.current;
    const _isShuffle = isShuffleRef.current;
    const _downloadedTracks = downloadedTracksRef.current;
    const _isLoggedIn = isLoggedInRef.current;
    const _volume = volumeRef.current;
    const _isMuted = isMutedRef.current;
    const _playbackRate = playbackRateRef.current;

    if (_isPlaybackLocked && !force) return;

    // Check if offline and trying to play a non-downloaded song
    if (!navigator.onLine && !_downloadedTracks.includes(track.id)) {
      showToast('You are offline. Only downloaded songs can be played.', 'error');
      audioEngine.stop();
      setIsPlaying(false);
      return;
    }

    // When advancing from track end, do NOT stop/pause the audio element —
    // calling pause() before play() revokes the browser's autoplay permission
    // that was granted by the `ended` event. Instead we use playNext() which
    // swaps src directly. For user-initiated plays, stop() is fine.
    if (!fromTrackEnd) {
      audioEngine.stop();
      setIsPlaying(false);
    }

    // Track the latest requested song ID to prevent race conditions
    loadingTrackIdRef.current = track.id;

    if (contextTracks) {
      const trackIndex = contextTracks.findIndex((t) => t.id === track.id);
      if (trackIndex !== -1) {
        let upcoming = contextTracks.slice(trackIndex + 1);
        if (_isShuffle) upcoming = [...upcoming].sort(() => 0.5 - Math.random());
        setQueue(upcoming);
      }
    }

    const now = new Date().toISOString();
    setHistory((prev) => {
      if (prev.length > 0 && prev[0].id === track.id) {
        const newPrev = [...prev];
        newPrev[0] = { ...track, playedAt: now } as any;
        return newPrev;
      }
      return [{ ...track, playedAt: now } as any, ...prev.filter((t) => t.id !== track.id)].slice(0, 20);
    });
    setCurrentTrack(track);
    currentTrackRef.current = track;
    setDuration(track.duration);
    setCurrentTime(0);
    currentTimeRef.current = 0;

    // Sync recently played & play count with backend
    if (_isLoggedIn) {
      recentlyPlayedApi.add(track.id).catch(err => console.error('Failed to log play', err));
      playCountApi.increment(track.id).catch(err => console.error('Failed to increment count', err));
    }

    // Helper: apply volume and playback rate after play starts
    const applyAudioSettings = () => {
      audioEngine.setVolume(_isMuted ? 0 : _volume);
      if (typeof (audioEngine as any).setPlaybackRate === 'function') {
        (audioEngine as any).setPlaybackRate(_playbackRate);
      }
    };

    // If the song is already downloaded, play from cache
    const checkAndPlayCache = async () => {
      const isDownloaded = _downloadedTracks.includes(track.id);
      if (isDownloaded) {
        const exists = await downloadService.isCached(track.id);
        if (exists) {
          if (loadingTrackIdRef.current !== track.id) return true;
          const cachedUrl = `https://music-player.local/song/${track.id}`;
          track.fileUrl = cachedUrl;
          setIsPlaying(true);
          if (fromTrackEnd) {
            audioEngine.playNext(cachedUrl, track.duration);
          } else {
            audioEngine.play(track.duration, 0, cachedUrl);
          }
          applyAudioSettings();
          return true;
        } else if (!navigator.onLine) {
          showToast('This song is unavailable offline. It will re-download when you reconnect.', 'error');
          audioEngine.stop();
          setIsPlaying(false);
          return true;
        } else {
          downloadService.downloadTrack({ id: track.id }).catch(() => {});
        }
      }
      return false;
    };

    // Fast path: if the URL was already prefetched onto track.fileUrl, use it immediately.
    // This is the KEY fix for autoplay on locked screen — no async gap at all.
    if (fromTrackEnd && track.fileUrl) {
      if (loadingTrackIdRef.current !== track.id) return;
      setIsPlaying(true);
      audioEngine.playNext(track.fileUrl, track.duration);
      applyAudioSettings();
      // Refresh the stream URL in background for the next play/pause cycle
      streamService.getStreamUrl(track.id).then(url => { track.fileUrl = url; }).catch(() => {});
      return;
    }

    checkAndPlayCache().then((playedFromCache) => {
      if (playedFromCache) return;
      if (loadingTrackIdRef.current !== track.id) return;

      streamService.getStreamUrl(track.id)
      .then((streamUrl) => {
        if (loadingTrackIdRef.current !== track.id) return;
        track.fileUrl = streamUrl;
        setIsPlaying(true);
        if (fromTrackEnd) {
          audioEngine.playNext(streamUrl, track.duration);
        } else {
          audioEngine.play(track.duration, 0, streamUrl);
        }
        applyAudioSettings();
      })
      .catch((err) => {
        if (loadingTrackIdRef.current !== track.id) return;
        console.error('[playTrack] Stream URL fetch failed:', err);
        showToast('Could not load song. Please try again.', 'error');
        setIsPlaying(false);
      });
    });
  };

  const togglePlay = useCallback((force: boolean = false, forceState?: boolean) => {
    if (isPlaybackLocked && !force) return;
    if (currentTrack.id === '') return;
    
    const nextState = forceState !== undefined ? forceState : !isPlaying;

    if (!nextState) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      // Check if offline and trying to play a non-downloaded song
      if (!navigator.onLine && !downloadedTracks.includes(currentTrack.id)) {
        showToast('You are offline. Only downloaded songs can be played.', 'error');
        audioEngine.pause();
        setIsPlaying(false);
        return;
      }

      const resumeOnline = () => {
        streamService.getStreamUrl(currentTrack.id)
          .then((streamUrl) => {
            currentTrack.fileUrl = streamUrl;
            audioEngine.play(currentTrack.duration, currentTime, streamUrl);
            audioEngine.setVolume(isMuted ? 0 : volume);
            if (typeof (audioEngine as any).setPlaybackRate === 'function') {
              (audioEngine as any).setPlaybackRate(playbackRate);
            }
          })
          .catch(() => {
            // Fallback to old URL if getStreamUrl fails
            audioEngine.play(currentTrack.duration, currentTime, currentTrack.fileUrl);
            audioEngine.setVolume(isMuted ? 0 : volume);
            if (typeof (audioEngine as any).setPlaybackRate === 'function') {
              (audioEngine as any).setPlaybackRate(playbackRate);
            }
          });
      };

      // If the song is already downloaded, check if it exists in local storage cache
      const isDownloaded = downloadedTracks.includes(currentTrack.id);
      if (isDownloaded) {
        downloadService.isCached(currentTrack.id).then((exists) => {
          if (!exists) {
            if (!navigator.onLine) {
              // Cache gone + offline — block playback, keep download marker
              showToast('This song is unavailable offline. It will re-download when you reconnect.', 'error');
              return;
            }
            // Cache gone but online — silently re-download then play online
            downloadService.downloadTrack({ id: currentTrack.id }).catch(() => {});
            resumeOnline();
          } else {
            const cachedUrl = `https://music-player.local/song/${currentTrack.id}`;
            currentTrack.fileUrl = cachedUrl;
            audioEngine.play(currentTrack.duration, currentTime, cachedUrl);
            audioEngine.setVolume(isMuted ? 0 : volume);
            if (typeof (audioEngine as any).setPlaybackRate === 'function') {
              (audioEngine as any).setPlaybackRate(playbackRate);
            }
            setIsPlaying(true);
          }
        });
        return;
      }

      resumeOnline();
    }
  }, [isPlaybackLocked, currentTrack.id, isPlaying, isMuted, volume, playbackRate, currentTime, downloadedTracks]);

  const nextTrack = useCallback((force: boolean = false, fromTrackEnd: boolean = false) => {
    // ALWAYS read from refs, never from closed-over state.
    // This is the critical fix for the stale closure bug when screen is locked.
    const _isPlaybackLocked = isPlaybackLockedRef.current;
    const _queue = queueRef.current;
    const _repeatMode = repeatModeRef.current;
    const _isShuffle = isShuffleRef.current;
    const _activePlaylist = activePlaylistRef.current;
    const _currentTrack = currentTrackRef.current;
    const _isLoggedIn = isLoggedInRef.current;
    const _currentTime = currentTimeRef.current;

    if (_isPlaybackLocked && !force) return;

    // Skip quickly tracking: user pressed Next/skip while played < 5s
    if (_isLoggedIn && _currentTrack.id !== '' && _currentTime < 5) {
      homeApi
        .recordSkipAvoid(_currentTrack.id)
        .catch(() => {
          // non-blocking / best-effort
        });
    }

    if (_queue.length > 0) {
      const next = _queue[0];
      // Update ref immediately so re-entrant background calls see empty queue
      queueRef.current = _queue.slice(1);
      setQueue(_queue.slice(1));
      playTrack(next, undefined, force, fromTrackEnd);
    } else if (_repeatMode === 'all') {
      const sourceList = _activePlaylist ? _activePlaylist.tracks : TRACKS.filter(t => !isBgmOrScore(t));
      if (sourceList.length > 0) {
        let nextList = [...sourceList];
        if (_isShuffle) nextList = nextList.sort(() => 0.5 - Math.random());
        const next = nextList[0];
        queueRef.current = nextList.slice(1);
        setQueue(nextList.slice(1));
        playTrack(next, undefined, force, fromTrackEnd);
      }
    } else {
      // Queue ended — always play a random recommendation so notification card never disappears.
      let sourceList = _activePlaylist ? _activePlaylist.tracks : TRACKS;
      let validTracks = sourceList.filter((t) => !isBgmOrScore(t) && t.id !== _currentTrack.id);

      if (validTracks.length === 0 && _activePlaylist) {
        sourceList = TRACKS;
        validTracks = sourceList.filter((t) => !isBgmOrScore(t) && t.id !== _currentTrack.id);
      }

      if (validTracks.length > 0) {
        const randomIndex = Math.floor(Math.random() * validTracks.length);
        const next = validTracks[randomIndex];
        const rest = validTracks.filter((t) => t.id !== next.id);
        const remaining = [...rest].sort(() => Math.random() - 0.5).slice(0, 19);
        const newQueue = remaining.length > 0 ? remaining : [];
        queueRef.current = newQueue;
        setQueue(newQueue);
        playTrack(next, undefined as any, force, fromTrackEnd);
      } else {
        // No tracks at all — just stop cleanly
        audioEngine.pause();
        setIsPlaying(false);
        setCurrentTime(0);
      }
    }
  }, []);

  const prevTrack = useCallback((force: boolean = false) => {
    if (isPlaybackLocked && !force) return;
    if (currentTrack.id === '') return;
    if (currentTime > 3) {
          seek(0, force);
        } else if (history.length > 1) {
          const prev = history[1];
          setHistory((h) => h.slice(2));
      setQueue((q) => [currentTrack, ...q]);
          playTrack(prev, undefined, force);
    } else {
          seek(0, force);
    }
  }, [isPlaybackLocked, currentTrack.id, currentTime, history]);

  const seek = (time: number, force: boolean = false) => {
    if (isPlaybackLocked && !force) return;
    if (currentTrack.id === '') return;
    const clampedTime = Math.max(0, time);
    setCurrentTime(clampedTime);
    audioEngine.seek(clampedTime);
  };

  const setVolume = (vol: number) => {
    const clamped = Math.max(0, Math.min(vol, 1));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) setIsMuted(false);
    audioEngine.setVolume(isMuted ? 0 : clamped);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setVolume(volume);
    } else {
      prevVolumeRef.current = volume;
      setIsMuted(true);
      audioEngine.setVolume(0);
    }
  };

  const addToQueue = (track: Track) => setQueue((prev) => [...prev, track]);
  const removeFromQueue = (index: number) => setQueue((prev) => prev.filter((_, i) => i !== index));
  const clearQueue = () => setQueue([]);

  const reorderQueue = (startIndex: number, endIndex: number) => {
    setQueue((prev) => {
      const result = [...prev];
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const toggleShuffle = () => {
    setIsShuffle((prev) => {
      const nextShuffle = !prev;
      if (nextShuffle) setQueue((q) => [...q].sort(() => 0.5 - Math.random()));
      return nextShuffle;
    });
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => (prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off'));
  };

  const toggleLike = async (trackId: string) => {
    if (!isLoggedIn) {
      showToast('Log in to like songs', 'error');
      return;
    }
    const isLiked = likedTracks.includes(trackId);
    
    // Optimistic UI update
    setLikedTracks((prev) => (isLiked ? prev.filter((id) => id !== trackId) : [...prev, trackId]));

    try {
      if (isLiked) {
        await likeApi.unlike(trackId);
      } else {
        await likeApi.like(trackId);
      }
    } catch (err: any) {
      console.error('Failed to sync like:', err);
      const errMsg = err?.message || '';

      if (!isLiked && errMsg.toLowerCase().includes('already liked')) {
        // We wanted to like it, backend says it's already liked.
        // Our optimistic update was correct, don't revert.
      } else if (isLiked && errMsg.toLowerCase().includes('not found')) {
        // We wanted to unlike it, backend says it's not found (already unliked).
        // Our optimistic update was correct, don't revert.
      } else {
        // Revert on real failure
        setLikedTracks((prev) => (!isLiked ? prev.filter((id) => id !== trackId) : [...prev, trackId]));
        showToast('Action failed', 'error');
      }
    }
  };

  const toggleLikePlaylist = (playlistId: string) => {
    setLikedPlaylists((prev) => {
      const isLiked = prev.includes(playlistId);
      if (isLiked) {
        showToast('Removed playlist from library', 'heart');
        return prev.filter((id) => id !== playlistId);
      } else {
        showToast('Saved playlist to library', 'heart');
        return [...prev, playlistId];
      }
    });
  };

  const setView = (view: ViewType, playlist?: Playlist | null) => {
    setCurrentView(view);
    const pl = playlist !== undefined ? playlist : activePlaylist;
    if (playlist !== undefined) setActivePlaylist(playlist);

    setViewStack((prev) => {
      const truncated = prev.slice(0, viewStackIndex + 1);
      return [...truncated, { view, playlist: pl ?? null }];
    });

    setViewStackIndex((prev) => prev + 1);

    // Push dummy history state to enable native swipe-back gestures for view navigation only.
    // This must NOT be used as control flow; it only enables swipe-back popstate events.
    window.history.pushState({ view }, '', window.location.href);
  };

  const goBack = () => {
    if (viewStackIndex <= 0) return;
    const newIdx = viewStackIndex - 1;
    const entry = viewStack[newIdx];
    setCurrentView(entry.view);
    if (entry.playlist !== null) setActivePlaylist(entry.playlist);
    setViewStackIndex(newIdx);
  };

  const goForward = () => {
    if (viewStackIndex >= viewStack.length - 1) return;
    const newIdx = viewStackIndex + 1;
    const entry = viewStack[newIdx];
    setCurrentView(entry.view);
    if (entry.playlist !== null) setActivePlaylist(entry.playlist);
    setViewStackIndex(newIdx);
  };

  const showToast = (text: string, icon?: string) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev.slice(-2), { id, text, icon }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
  };

  // Sleep Timer countdown logic
  useEffect(() => {
    if (sleepTimerEnd) {
      const updateRemaining = () => {
        const remaining = sleepTimerEnd - Date.now();
        if (remaining <= 0) {
          setSleepTimerEnd(null);
          setSleepTimerRemaining(null);
          audioEngine.pause();
          setIsPlaying(false);
          showToast('Sleep timer ended', 'moon');
        } else {
          setSleepTimerRemaining(Math.ceil(remaining / 60000));
        }
      };
      updateRemaining();
      const interval = window.setInterval(updateRemaining, 1000);
      return () => window.clearInterval(interval);
    } else {
      setSleepTimerRemaining(null);
    }
  }, [sleepTimerEnd]);

  const setSleepTimer = (value: number | 'track-end' | null) => {
    if (value === null) {
      setSleepTimerEnd(null);
      setSleepTimerRemaining(null);
      setIsSleepAtTrackEnd(false);
      showToast('Sleep timer canceled', 'clock');
    } else if (value === 'track-end') {
      setSleepTimerEnd(null);
      setSleepTimerRemaining(null);
      setIsSleepAtTrackEnd(true);
      showToast('Sleeper set to end of track', 'clock');
    } else {
      setIsSleepAtTrackEnd(false);
      setSleepTimerEnd(Date.now() + value * 60000);
      showToast(`Sleep timer set for ${value} minutes`, 'clock');
    }
  };

  const setPlaybackRate = (rate: number) => {
    setPlaybackRateState(rate);
    if (typeof (audioEngine as any).setPlaybackRate === 'function') {
      (audioEngine as any).setPlaybackRate(rate);
    }
    showToast(`Speed set to ${rate}x`, 'zap');
  };

  const toggleFullScreen = () => setIsFullScreen((prev) => !prev);
  const toggleQueue = () => setIsQueueOpen((prev) => !prev);

  const NAV_ROOT_EXIT_WINDOW_MS = 2000;
  const lastRootBackPressAtRef = useRef<number | null>(null);

  // Hardware back + native swipe-back:
  // - Only affect internal view navigation (viewStack).
  // - If an overlay is open (fullscreen player / queue), do NOT navigate views.
  // - At root (Home): double-press back to exit. First press shows toast and stays.
  useEffect(() => {
    const onPopState = () => {
      // If we are currently handling a programmatic/cleanup history pop, ignore it.
      if ((window as any).__blockPopState) return;

      // If an overlay is open, do nothing here. Overlays have their own back handling.
      if (isFullScreen || isQueueOpen || isFullScreenMenuOpen) return;

      // Internal navigation stack handling
      if (viewStackIndex > 0) {
        // Compute target BEFORE mutating state
        const newIdx = viewStackIndex - 1;
        const target = viewStack[newIdx]?.view ?? 'home';

        goBack();

        // Re-push a dummy history state so swipe-back continues to work for the view stack
        // without reloading/navigating to external routes.
        window.history.pushState({ view: target }, '', window.location.href);
        return;
      }

      // Root behavior: double-press to exit
      const now = Date.now();
      const last = lastRootBackPressAtRef.current;

      if (last && now - last <= NAV_ROOT_EXIT_WINDOW_MS) {
        // Second press: allow native exit / default behavior
        return;
      }

      lastRootBackPressAtRef.current = now;
      showToast('Press back again to exit', 'info');

      // Cancel the exit by re-pushing root state
      window.history.pushState({ view: 'home' }, '', window.location.href);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [isFullScreen, isQueueOpen, viewStackIndex, viewStack, goBack]);

  const createPlaylist = async (title: string): Promise<string | undefined> => {
    const trimmed = title.trim();
    if (!trimmed) return undefined;
    
    if (!isLoggedIn) {
      showToast('Log in to create playlists');
      return undefined;
    }

    try {
      const res = await playlistApi.create(trimmed);
      if (res.success && res.data) {
        const playlist: CustomPlaylist = {
          id: res.data._id,
          title: res.data.name,
          description: 'Custom playlist',
          songIds: [],
          createdAt: res.data.createdAt,
        };
        setCustomPlaylists((prev) => [playlist, ...prev]);
        showToast('Playlist created', 'check');
        return res.data._id;
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to create playlist');
    }
    return undefined;
  };

  const addSongToPlaylist = async (playlistId: string, songId: string) => {
    if (!isLoggedIn) return;
    try {
      const res = await playlistApi.addSong(playlistId, songId);
      if (res.success) {
        setCustomPlaylists((prev) =>
          prev.map((p) =>
            p.id === playlistId && !p.songIds.includes(songId)
              ? { ...p, songIds: [...p.songIds, songId] }
              : p
          )
        );
        showToast('Added to playlist', 'plus');
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to add song');
    }
  };

  const removeSongFromPlaylist = async (playlistId: string, songId: string) => {
    if (!isLoggedIn) return;
    try {
      const res = await playlistApi.removeSong(playlistId, songId);
      if (res.success) {
        setCustomPlaylists((prev) =>
          prev.map((p) =>
            p.id === playlistId ? { ...p, songIds: p.songIds.filter((id) => id !== songId) } : p
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renamePlaylist = (playlistId: string, title: string) => {
    // Basic local rename, can add backend API if needed
    setCustomPlaylists((prev) =>
      prev.map((p) => (p.id === playlistId ? { ...p, title: title.trim() || p.title } : p))
    );
  };

  const deletePlaylist = async (playlistId: string) => {
    if (!isLoggedIn) return;
    try {
      const res = await playlistApi.delete(playlistId);
      if (res.success) {
        setCustomPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
        showToast('Playlist deleted', 'check');
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to delete playlist');
    }
  };

  const toggleDownload = async (track: Track) => {
    const isDownloaded = downloadedTracks.includes(track.id);
    
    if (isDownloaded) {
      setDownloadedTracks((prev) => prev.filter((id) => id !== track.id));
      const success = await downloadService.removeTrack(track);
      if (success) {
        showToast('Removed from downloads', 'minus');
      } else {
        setDownloadedTracks((prev) => [...prev, track.id]);
        showToast('Failed to remove download', 'error');
      }
    } else {
      if (downloadProgress[track.id] !== undefined) return;

      showToast('Downloading...', 'download');
      setDownloadProgress((prev) => ({ ...prev, [track.id]: 0 }));

      const success = await downloadService.downloadTrack(track, (progress) => {
        setDownloadProgress((prev) => ({ ...prev, [track.id]: progress }));
      });

      setDownloadProgress((prev) => {
        const copy = { ...prev };
        delete copy[track.id];
        return copy;
      });

      if (success) {
        setDownloadedTracks((prev) => [...prev, track.id]);
        showToast('Download complete', 'check');
      } else {
        showToast('Download failed', 'error');
      }
    }
  };

  const togglePlaylistDownload = (playlistId: string, isDownloaded: boolean) => {
    setDownloadedPlaylists((prev) => {
      const updated = isDownloaded
        ? [...prev.filter((id) => id !== playlistId), playlistId]
        : prev.filter((id) => id !== playlistId);
      downloadService.saveDownloadedPlaylists(updated);
      return updated;
    });
  };

  const toggleFollowArtist = async (artistName: string) => {
    if (!artistName) return;
    const isFollowing = followedArtists.includes(artistName);
    setFollowedArtists((prev) => isFollowing ? prev.filter(a => a !== artistName) : [...prev, artistName]);
    if (isLoggedIn) {
      libraryApi.toggleFollowArtist(artistName).catch(() => setFollowedArtists((prev) => !isFollowing ? prev.filter(a => a !== artistName) : [...prev, artistName]));
    }
  };

  const toggleSaveAlbum = async (albumName: string) => {
    if (!albumName) return;
    const isSaved = savedAlbums.includes(albumName);
    setSavedAlbums((prev) => isSaved ? prev.filter(a => a !== albumName) : [...prev, albumName]);
    if (isLoggedIn) {
      libraryApi.toggleSaveAlbum(albumName).catch(() => setSavedAlbums((prev) => !isSaved ? prev.filter(a => a !== albumName) : [...prev, albumName]));
    }
  };

  const handleCreatePlaylist = async () => {
    if (!newPlTitle.trim() || !addToPlaylistTrack) return;
    const newId = await createPlaylist(newPlTitle);
    if (newId) {
      addSongToPlaylist(newId, addToPlaylistTrack.id);
    }
    setNewPlTitle('');
    setAddToPlaylistTrack(null);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Media Session API integration (OS lock screen / BT / headset / media keys)
  // Centralized here so it stays tightly coupled with global player state.
  // ─────────────────────────────────────────────────────────────────────────────
  const togglePlayRef = useRef(togglePlay);
  const nextTrackRef = useRef(nextTrack);
  const prevTrackRef = useRef(prevTrack);
  const handleTrackEndRef = useRef(handleTrackEnd);

  // Keep refs up-to-date with latest PlayerContext callbacks to prevent stale closures.
  togglePlayRef.current = togglePlay;
  nextTrackRef.current = nextTrack;
  prevTrackRef.current = prevTrack;
  handleTrackEndRef.current = handleTrackEnd;

  // Register native ended and play state handlers to support background playback transitions when device is locked/sleeping
  useEffect(() => {
    audioEngine.setOnEnded(() => {
      handleTrackEndRef.current();
    });
    audioEngine.setOnPlayStateChange((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      audioEngine.setOnEnded(() => {});
      audioEngine.setOnPlayStateChange(() => {});
    };
  }, []);

  const mediaSessionActive = useRef<boolean>(false);

  // Register Media Session handlers exactly once when a valid track is loaded,
  // and keep them registered for the duration of the track's existence.
  useEffect(() => {
    const ms = (navigator as any)?.mediaSession as MediaSession | undefined;
    if (!ms || typeof ms.setActionHandler !== 'function') return;

    const hasValidTrack = currentTrack && currentTrack.id !== '';

    if (hasValidTrack && !mediaSessionActive.current) {
      const safe = (fn: () => void) => {
        try {
          fn();
        } catch (err) {
          console.error('[mediaSession] handler error:', err);
        }
      };

      ms.setActionHandler('play', () => safe(() => togglePlayRef.current(false, true)));
      ms.setActionHandler('pause', () => safe(() => togglePlayRef.current(false, false)));
      ms.setActionHandler('previoustrack', () => safe(() => prevTrackRef.current()));
      ms.setActionHandler('nexttrack', () => safe(() => nextTrackRef.current()));
      // Allow seeking from lock screen / notification shade
      try {
        ms.setActionHandler('seekto', (details) => {
          if (details.seekTime != null) {
            seek(details.seekTime);
          }
        });
        ms.setActionHandler('seekforward', (details) => {
          seek(Math.min(currentTime + (details.seekOffset ?? 10), duration));
        });
        ms.setActionHandler('seekbackward', (details) => {
          seek(Math.max(currentTime - (details.seekOffset ?? 10), 0));
        });
      } catch {
        // seekto not supported on this browser
      }

      mediaSessionActive.current = true;
    } else if (!hasValidTrack && mediaSessionActive.current) {
      try {
        ms.setActionHandler('play', null);
        ms.setActionHandler('pause', null);
        ms.setActionHandler('previoustrack', null);
        ms.setActionHandler('nexttrack', null);
        try { ms.setActionHandler('seekto', null); } catch { /* ignore */ }
        try { ms.setActionHandler('seekforward', null); } catch { /* ignore */ }
        try { ms.setActionHandler('seekbackward', null); } catch { /* ignore */ }
      } catch (err) {
        console.error('[mediaSession] unregister error:', err);
      }
      mediaSessionActive.current = false;
    }

    return () => {
      // Cleanup on unmount
      if (mediaSessionActive.current) {
        try {
          ms.setActionHandler('play', null);
          ms.setActionHandler('pause', null);
          ms.setActionHandler('previoustrack', null);
          ms.setActionHandler('nexttrack', null);
          try { ms.setActionHandler('seekto', null); } catch { /* ignore */ }
          try { ms.setActionHandler('seekforward', null); } catch { /* ignore */ }
          try { ms.setActionHandler('seekbackward', null); } catch { /* ignore */ }
        } catch {
          // no-op
        }
        mediaSessionActive.current = false;
      }
    };
  }, [currentTrack.id]);

  // Sync playback state + position with Media Session (timing bar + play/pause icon on lock screen)
  useEffect(() => {
    const ms = (navigator as any)?.mediaSession as MediaSession | undefined;
    if (!ms) return;

    try {
      if (currentTrack && currentTrack.id !== '') {
        // Update play/pause icon
        ms.playbackState = isPlaying ? 'playing' : 'paused';

        // Update the timing / seek bar
        const dur = duration > 0 ? duration : (currentTrack.duration ?? 0);
        if (dur > 0 && Number.isFinite(currentTime) && Number.isFinite(dur)) {
          ms.setPositionState({
            duration: dur,
            playbackRate: isPlaying ? (audioEngine.getPlaybackRate() || 1) : 0,
            position: Math.min(currentTime, dur),
          });
        }
      } else {
        ms.playbackState = 'none';
      }
    } catch {
      // ignore browsers that don't fully support Media Session
    }
  }, [isPlaying, currentTime, duration, currentTrack.id]);

  // Update Media Session metadata when track changes
  useEffect(() => {
    const ms = (navigator as any)?.mediaSession as MediaSession | undefined;
    if (!ms) return;

    if (currentTrack && currentTrack.id !== '') {
      const title = currentTrack.title || 'Unknown';
      const artist = currentTrack.artist || 'Unknown';
      const album = currentTrack.album || '';

      const coverUrl = (currentTrack as any).coverUrl as string | undefined;
      const artwork = coverUrl
        ? [
            { src: coverUrl, sizes: '96x96', type: 'image/jpeg' },
            { src: coverUrl, sizes: '128x128', type: 'image/jpeg' },
            { src: coverUrl, sizes: '192x192', type: 'image/jpeg' },
            { src: coverUrl, sizes: '256x256', type: 'image/jpeg' },
            { src: coverUrl, sizes: '384x384', type: 'image/jpeg' },
            { src: coverUrl, sizes: '512x512', type: 'image/jpeg' },
          ]
        : [];

      try {
        ms.metadata = new MediaMetadata({
          title,
          artist,
          album,
          artwork,
        });
      } catch {
        // If MediaMetadata construction fails, degrade gracefully.
      }
    } else {
      try {
        ms.metadata = null;
      } catch {
        // ignore
      }
    }
  }, [currentTrack]);

  const value = useMemo(
    () => ({
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      volume,
      isMuted,
      queue,
      history,
      isShuffle,
      repeatMode,
      currentView,
      activePlaylist,
      likedTracks,
      isFullScreen,
      isPlaybackLocked,
      setIsPlaybackLocked,
      playTrack,
      togglePlay,
      nextTrack,
      prevTrack,
      seek,
      setVolume,
      toggleMute,
      addToQueue,
      removeFromQueue,
      clearQueue,
      reorderQueue,
      toggleShuffle,
      toggleRepeat,
      toggleLike,
      setView,
      toggleFullScreen,
      searchQuery,
      setSearchQuery,
      isQueueOpen,
      isFullScreenMenuOpen,
      toggleQueue,
      setIsFullScreenMenuOpen,
      toasts,
      canGoBack: viewStackIndex > 0,
      canGoForward: viewStackIndex < viewStack.length - 1,
      showToast,
      goBack,
      goForward,
      activeFilter,
      setActiveFilter,
      playbackRate,
      setPlaybackRate,
      sleepTimerRemaining,
      isSleepAtTrackEnd,
      setSleepTimer,
      customPlaylists,
      createPlaylist,
      addSongToPlaylist,
      removeSongFromPlaylist,
      renamePlaylist,
      deletePlaylist,
      downloadedTracks,
      toggleDownload,
      downloadedPlaylists,
      togglePlaylistDownload,
      likedPlaylists,
      toggleLikePlaylist,
      followedArtists,
      toggleFollowArtist,
      savedAlbums,
      toggleSaveAlbum,
      addToPlaylistTrack,
      setAddToPlaylistTrack,
      isProfileModalOpen,
      setIsProfileModalOpen,
      downloadProgress,
    }),
    [
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      volume,
      isMuted,
      queue,
      history,
      isShuffle,
      repeatMode,
      currentView,
      activePlaylist,
      likedTracks,
      isFullScreen,
      searchQuery,
      isQueueOpen,
      toasts,
      viewStackIndex,
      viewStack.length,
      activeFilter,
      playbackRate,
      sleepTimerRemaining,
      isSleepAtTrackEnd,
      customPlaylists,
      isPlaybackLocked,
      downloadedTracks,
      downloadedPlaylists,
      likedPlaylists,
      followedArtists,
      savedAlbums,
      addToPlaylistTrack,
      isProfileModalOpen,
      downloadProgress,
    ]
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
      {addToPlaylistTrack && (
        <>
          <div className="fixed inset-0 z-[9999]" onClick={() => setAddToPlaylistTrack(null)} />
          <div className="flex w-64 flex-col overflow-hidden rounded-xl bg-[#282828] shadow-2xl border border-white/10 select-none" style={popupStyle}>
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-sm font-bold text-white">
              <span>Add to playlist</span>
              <button onClick={() => setAddToPlaylistTrack(null)} className="text-[#b3b3b3] hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col p-1.5 max-h-[50vh] overflow-y-auto scrollbar-none">
              <div className="flex items-center gap-2 p-1.5 pb-2">
                <input 
                  type="text" 
                  placeholder="New playlist" 
                  value={newPlTitle}
                  onChange={(e) => setNewPlTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreatePlaylist()}
                  className="flex-1 rounded bg-[#121212] px-2.5 py-1.5 text-xs text-white outline-none border border-white/10 focus:border-[#1db954]"
                />
                <button 
                  onClick={handleCreatePlaylist}
                  disabled={!newPlTitle.trim()}
                  className="rounded bg-[#1db954] p-1.5 text-black disabled:opacity-50 transition-transform hover:scale-105 active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="h-px w-full bg-white/5 my-1 shrink-0" />
              
              <button 
                onClick={() => { toggleLike(addToPlaylistTrack.id); setAddToPlaylistTrack(null); }} 
                className="group flex w-full items-center gap-2.5 rounded-md p-1.5 hover:bg-white/10 transition-colors"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded shadow-sm bg-gradient-to-br from-[#450af5] to-[#c4efd9]">
                  <Heart className="h-4 w-4 fill-white text-white" />
                </div>
                <span className="text-xs font-bold text-white">Liked Songs</span>
                {likedTracks.includes(addToPlaylistTrack.id) && (
                  <Check className="ml-auto h-4 w-4 text-[#1db954]" />
                )}
              </button>

              {customPlaylists.map(pl => {
                const isInPl = pl.songIds.includes(addToPlaylistTrack.id);
                return (
                  <button 
                    key={pl.id}
                    onClick={() => {
                      if (isInPl) removeSongFromPlaylist(pl.id, addToPlaylistTrack.id);
                      else addSongToPlaylist(pl.id, addToPlaylistTrack.id);
                      setAddToPlaylistTrack(null);
                    }} 
                    className="group flex w-full items-center gap-2.5 rounded-md p-1.5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded shadow-sm bg-[#333]">
                      <ListMusic className="h-4 w-4 text-[#b3b3b3]" />
                    </div>
                    <span className="text-xs font-bold text-white truncate">{pl.title}</span>
                    {isInPl && (
                      <Check className="ml-auto h-4 w-4 text-[#1db954] shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within a PlayerProvider');
  return context;
};
