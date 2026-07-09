// Data Service Layer - abstracts data fetching for scalability
// Swaps transparently between the mock dataset and the live backend API.

import { TRACKS, PLAYLISTS, CATEGORIES } from '../data/musicCatalog';
import { fetchTracksFromBackend } from './apiClient';

// Toggle live backend usage via Vite env var `VITE_USE_BACKEND=true`.
// When the backend is unreachable, we gracefully fall back to mock data,
// so the UI/structure stays identical with or without real data.
const USE_BACKEND =
  (import.meta as unknown as { env?: { VITE_USE_BACKEND?: string } }).env?.VITE_USE_BACKEND === 'true';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  gradient: string;
  genre: 'synthwave' | 'lofi' | 'house' | 'ambient' | 'acoustic';
  lyrics?: string[];
  color: string;
  /** CDN .mp3 link for <audio> streaming (present when sourced from backend). */
  fileUrl?: string;
  /** CDN image link for album artwork (present when sourced from backend). */
  coverUrl?: string;
  _titleLower?: string;
  _artistLower?: string;
  _albumLower?: string;
  _titleCollapsed?: string;
  _artistCollapsed?: string;
  _albumCollapsed?: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverGradient: string;
  tracks: Track[];
  likes: string;
  followers: string;
  primaryColor: string;
}

export interface Category {
  id: string;
  title: string;
  color: string;
}

// Re-export types for convenience
export type { Track as TrackType, Playlist as PlaylistType, Category as CategoryType };

// Fetches tracks from the live backend when enabled, else mock data.
// Falls back to mock data automatically if the backend request fails.
export const getTracks = async (): Promise<Track[]> => {
  if (USE_BACKEND) {
    try {
      const tracks = await fetchTracksFromBackend();
      if (tracks.length) return tracks;
    } catch (err) {
      console.warn('[dataService] Backend unavailable, using mock data.', err);
    }
  }
  return new Promise(resolve => setTimeout(() => resolve([...TRACKS]), 100));
};

export const getPlaylists = async (): Promise<Playlist[]> => {
  return new Promise(resolve => setTimeout(() => resolve([...PLAYLISTS]), 100));
};

export const getCategories = async (): Promise<Category[]> => {
  return new Promise(resolve => setTimeout(() => resolve([...CATEGORIES]), 100));
};

// Future-ready functions for API integration
export const searchTracks = async (query: string): Promise<Track[]> => {
  const allTracks = await getTracks();
  return allTracks.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.artist.toLowerCase().includes(query.toLowerCase()) ||
    (t.album && t.album.toLowerCase().includes(query.toLowerCase()))
  );
};

export const getLikedTracks = async (): Promise<string[]> => {
  return ['track-1', 'track-3'];
};

export const toggleLikeTrack = async (): Promise<boolean> => {
  return true;
};