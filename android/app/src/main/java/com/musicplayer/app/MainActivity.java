package com.musicplayer.app;

import com.getcapacitor.BridgeActivity;

import com.musicplayer.app.NativeGoogleAuthPlugin;

public class MainActivity extends BridgeActivity {
	@Override
	public void onCreate(android.os.Bundle savedInstanceState) {
		registerPlugin(NativeGoogleAuthPlugin.class);
		super.onCreate(savedInstanceState);
	}
}
