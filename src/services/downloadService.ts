import streamService from './streamService';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';

const CACHE_NAME = 'music-player-songs-v1';
const DOWNLOADS_KEY = 'music_player_downloads';
const DOWNLOADED_PLAYLISTS_KEY = 'music_player_downloaded_playlists';
const nativePath = (id: string | number) => `downloads/${String(id)}.audio`;

const blobToBase64 = async (blob: Blob): Promise<string> => {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = '';
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return btoa(binary);
};

export const downloadService = {
  init: () => {},
  getDownloadedIds: (): string[] => {
    try {
      return JSON.parse(localStorage.getItem(DOWNLOADS_KEY) || '[]');
    } catch {
      return [];
    }
  },
  saveDownloadedIds: (ids: string[]) => {
    localStorage.setItem(DOWNLOADS_KEY, JSON.stringify(ids));
  },
  getDownloadedPlaylists: (): string[] => {
    try {
      return JSON.parse(localStorage.getItem(DOWNLOADED_PLAYLISTS_KEY) || '[]');
    } catch {
      return [];
    }
  },
  saveDownloadedPlaylists: (ids: string[]) => {
    localStorage.setItem(DOWNLOADED_PLAYLISTS_KEY, JSON.stringify(ids));
  },
  downloadTrack: async (
    track: { id: string; fileUrl?: string },
    onProgress?: (progress: number) => void
  ): Promise<boolean> => {
    let url;
    try {
      url = await streamService.getStreamUrl(track.id);
    } catch {
      return false;
    }
    if (!url) return false;

    try {
      // Start a simulated progress bar to keep UI active and responsive
      let simulatedProgress = 0;
      const interval = setInterval(() => {
        simulatedProgress += 0.05;
        if (simulatedProgress >= 0.95) {
          simulatedProgress = 0.95;
        }
        if (onProgress) onProgress(simulatedProgress);
      }, 100);

      const response = await fetch(url);
      if (!response.ok) {
        clearInterval(interval);
        return false;
      }

      // Delegate buffering to native browser thread
      const blob = await response.blob();
      clearInterval(interval);

      if (Capacitor.isNativePlatform()) {
        await Filesystem.writeFile({
          path: nativePath(track.id),
          data: await blobToBase64(blob),
          directory: Directory.Data,
          recursive: true,
        });
      } else {
        const cache = await caches.open(CACHE_NAME);
        const newResponse = new Response(blob, {
          status: 200,
          headers: {
            'Content-Type': response.headers.get('content-type') || 'audio/mpeg',
            'Content-Length': blob.size.toString(),
          },
        });
        await cache.put(`https://music-player.local/song/${track.id}`, newResponse);
      }
      if (onProgress) onProgress(1);

      const ids = downloadService.getDownloadedIds();
      if (!ids.includes(track.id)) downloadService.saveDownloadedIds([...ids, track.id]);
      return true;
    } catch (e) {
      console.error('Download failed:', e);
      return false;
    }
  },
  cacheTrack: async (track: { id: string; fileUrl?: string }, streamUrl?: string): Promise<boolean> => {
    try {
      if (await downloadService.isCached(track.id)) return true;

      const url = streamUrl || await streamService.getStreamUrl(track.id);
      if (!url) return false;
      const response = await fetch(url);
      if (!response.ok) return false;
      const blob = await response.blob();

      if (Capacitor.isNativePlatform()) {
        await Filesystem.writeFile({
          path: nativePath(track.id),
          data: await blobToBase64(blob),
          directory: Directory.Data,
          recursive: true,
        });
      } else {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(`https://music-player.local/song/${track.id}`, new Response(blob, {
          status: 200,
          headers: {
            'Content-Type': response.headers.get('content-type') || 'audio/mpeg',
            'Content-Length': blob.size.toString(),
          },
        }));
      }
      return true;
    } catch (error) {
      console.warn('[downloadService] Failed to cache current track:', error);
      return false;
    }
  },
  isCached: async (trackId: string | number): Promise<boolean> => {
    try {
      if (Capacitor.isNativePlatform()) {
        await Filesystem.stat({ path: nativePath(trackId), directory: Directory.Data });
        return true;
      }
      const cache = await caches.open(CACHE_NAME);
      const match = await cache.match(`https://music-player.local/song/${trackId}`);
      return !!match;
    } catch {
      return false;
    }
  },
  removeTrack: async (track: { id: string; fileUrl?: string }): Promise<boolean> => {
    if (Capacitor.isNativePlatform()) {
      await Filesystem.deleteFile({ path: nativePath(track.id), directory: Directory.Data }).catch(() => {});
    } else {
      const cache = await caches.open(CACHE_NAME);
      // Use the stable virtual HTTPS URL (not the temp stream URL which changes each session)
      await cache.delete(`https://music-player.local/song/${track.id}`);
    }
    const newIds = downloadService.getDownloadedIds().filter((id) => id !== track.id);
    downloadService.saveDownloadedIds(newIds);
    return true;
  },
  getLocalUrl: async (trackId: string | number): Promise<string> => {
    if (!Capacitor.isNativePlatform()) return `https://music-player.local/song/${trackId}`;
    const result = await Filesystem.getUri({ path: nativePath(trackId), directory: Directory.Data });
    return Capacitor.convertFileSrc(result.uri);
  },
};