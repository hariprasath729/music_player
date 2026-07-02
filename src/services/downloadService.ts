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
  downloadTrack: async (track: { id: string; fileUrl?: string }): Promise<boolean> => {
    if (!track.fileUrl) return false;
    try {
      const cache = await caches.open(CACHE_NAME);
      const response = await fetch(track.fileUrl);
      if (response.ok || response.type === 'opaque') {
        await cache.put(track.fileUrl, response);
        const ids = downloadService.getDownloadedIds();
        if (!ids.includes(track.id)) downloadService.saveDownloadedIds([...ids, track.id]);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  },
  removeTrack: async (track: { id: string; fileUrl?: string }): Promise<boolean> => {
    if (!track.fileUrl) return false;
    const cache = await caches.open(CACHE_NAME);
    await cache.delete(track.fileUrl);
    const newIds = downloadService.getDownloadedIds().filter((id) => id !== track.id);
    downloadService.saveDownloadedIds(newIds);
    return true;
  },
};