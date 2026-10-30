package com.musicplayer.app;

import com.getcapacitor.BridgeActivity;

import com.musicplayer.app.NativeMediaSessionPlugin;
import com.musicplayer.app.NativeGoogleAuthPlugin;

public class MainActivity extends BridgeActivity {
	@Override
	public void onCreate(android.os.Bundle savedInstanceState) {
		registerPlugin(NativeMediaSessionPlugin.class);
		registerPlugin(NativeGoogleAuthPlugin.class);
		super.onCreate(savedInstanceState);
	}

	@Override
	public void onStart() {
		super.onStart();
		if (getBridge() != null && getBridge().getWebView() != null) {
			getBridge().getWebView().getSettings().setMediaPlaybackRequiresUserGesture(false);
		}
	}

	@Override
	public void onPause() {
		super.onPause();
		// Prevent Android from pausing WebView JavaScript timers and network requests
		// when app is backgrounded or screen is turned off during audio playback
		if (getBridge() != null && getBridge().getWebView() != null) {
			getBridge().getWebView().onResume();
		}
	}
}
