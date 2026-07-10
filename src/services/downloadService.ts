import streamService from './streamService';

const CACHE_NAME = 'music-player-songs-v1';
const DOWNLOADS_KEY = 'music_player_downloads';
const DOWNLOADED_PLAYLISTS_KEY = 'music_player_downloaded_playlists';

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

      const cache = await caches.open(CACHE_NAME);
      const newResponse = new Response(blob, {
        status: 200,
        headers: {
          'Content-Type': response.headers.get('content-type') || 'audio/mpeg',
          'Content-Length': blob.size.toString(),
        },
      });
      await cache.put(`https://music-player.local/song/${track.id}`, newResponse);
      if (onProgress) onProgress(1);

      const ids = downloadService.getDownloadedIds();
      if (!ids.includes(track.id)) downloadService.saveDownloadedIds([...ids, track.id]);
      return true;
    } catch (e) {
      console.error('Download failed:', e);
      return false;
    }
  },
  isCached: async (trackId: string | number): Promise<boolean> => {
    try {
      const cache = await caches.open(CACHE_NAME);
      const match = await cache.match(`https://music-player.local/song/${trackId}`);
      return !!match;
    } catch {
      return false;
    }
  },
  removeTrack: async (track: { id: string; fileUrl?: string }): Promise<boolean> => {
    const cache = await caches.open(CACHE_NAME);
    // Use the stable virtual HTTPS URL (not the temp stream URL which changes each session)
    await cache.delete(`https://music-player.local/song/${track.id}`);
    const newIds = downloadService.getDownloadedIds().filter((id) => id !== track.id);
    downloadService.saveDownloadedIds(newIds);
    return true;
  },
};