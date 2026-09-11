import { registerPlugin } from '@capacitor/core';

interface NativeGoogleAuthPlugin {
  signIn(): Promise<{ idToken: string }>;
  signOut(): Promise<void>;
}

export const nativeGoogleAuth = registerPlugin<NativeGoogleAuthPlugin>('NativeGoogleAuth');
