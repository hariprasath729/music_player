import { registerPlugin } from '@capacitor/core';

export interface NativeMediaSessionPlugin {
  requestNotifications(): Promise<void>;
  updateMetadata(options: { title: string; artist: string; album?: string; artwork?: string; duration?: number }): Promise<void>;
  updatePlayback(options: { playing: boolean; position: number; duration: number; rate: number; transitioning?: boolean }): Promise<void>;
  clear(): Promise<void>;
  addListener(
    eventName: 'mediaAction',
    listenerFunc: (event: { action: 'play' | 'pause' | 'next' | 'previous' | 'seek'; position?: number }) => void,
  ): Promise<{ remove: () => Promise<void> }>;
}

export const nativeMediaSession = registerPlugin<NativeMediaSessionPlugin>('NativeMediaSession');
