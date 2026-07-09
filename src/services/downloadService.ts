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
    let url = track.fileUrl;

    // If there's no permanent fileUrl (new secure architecture), request one via the stream service.
    // The stream URL is a backend redirect — caches.put() will follow the redirect and store the CDN response.
    if (!url) {
      try {
        url = await streamService.getStreamUrl(track.id);
      } catch {
        return false;
      }
    }
    if (!url) return false;

    try {
      const response = await fetch(url);
      if (!response.ok) return false;

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;

      // If content-length is missing or it's an opaque CORS response, simulate the progress smoothly
      if (total === 0 || response.type === 'opaque') {
        let simulatedProgress = 0;
        const interval = setInterval(() => {
          simulatedProgress += 0.08;
          if (simulatedProgress >= 0.95) {
            simulatedProgress = 0.95;
            clearInterval(interval);
          }
          if (onProgress) onProgress(simulatedProgress);
        }, 120);

        const cache = await caches.open(CACHE_NAME);
        await cache.put(`https://music-player.local/song/${track.id}`, response.clone());
        clearInterval(interval);
        if (onProgress) onProgress(1);

        const ids = downloadService.getDownloadedIds();
        if (!ids.includes(track.id)) downloadService.saveDownloadedIds([...ids, track.id]);
        return true;
      }

      // Read response body as stream to get real progress
      const reader = response.body ? response.body.getReader() : null;
      if (!reader) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(`https://music-player.local/song/${track.id}`, response.clone());
        if (onProgress) onProgress(1);
        const ids = downloadService.getDownloadedIds();
        if (!ids.includes(track.id)) downloadService.saveDownloadedIds([...ids, track.id]);
        return true;
      }

      let receivedLength = 0;
      const chunks: Uint8Array[] = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          receivedLength += value.length;
          if (onProgress) {
            onProgress(receivedLength / total);
          }
        }
      }

      // Reconstruct full response from chunks
      const chunksAll = new Uint8Array(receivedLength);
      let position = 0;
      for (const chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }

      const blob = new Blob([chunksAll], { type: response.headers.get('content-type') || 'audio/mpeg' });
      const cache = await caches.open(CACHE_NAME);
      const newResponse = new Response(blob, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
      await cache.put(`https://music-player.local/song/${track.id}`, newResponse);

      const ids = downloadService.getDownloadedIds();
      if (!ids.includes(track.id)) downloadService.saveDownloadedIds([...ids, track.id]);
      return true;
    } catch (e) {
      console.error('Download failed:', e);
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