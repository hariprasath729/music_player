/**
 * Backend API Client
 * -------------------
 * Talks to the live Express + MongoDB backend (backend/).
 * Maps the backend Song model → the frontend Track model.
 */

import type { Track } from './dataService';
import { AuthUser } from '../context/AuthContext';

// @ts-ignore
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

console.log("🛠️ Frontend is trying to connect to Backend at:", API_URL);

export interface BackendSong {
  id?: number | string;
  _id?: string;
  title: string;
  artist: string;
  album?: string | null;
  duration?: number;
  file_url?: string;
  cover_url?: string | null;
  url?: string;
  cover?: string | null;
  created_at?: string;
}

const GRADIENTS = [
  'linear-gradient(135deg, #ff007a 0%, #7928ca 100%)',
  'radial-gradient(circle at 20% 20%, #f7bb97 0%, #dd5e89 100%)',
  'linear-gradient(45deg, #00f2fe 0%, #4facfe 100%)',
  'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(to right bottom, #d4a373 0%, #faedcd 50%, #ccd5ae 100%)',
  'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
];
const COLORS = ['#ff007a', '#dd5e89', '#00f2fe', '#8ec5fc', '#d4a373', '#30cfd0'];

const AUTH_USER_KEY = 'music_player_auth_user';
const AUTH_TOKEN_KEY = 'music_player_token';

function getAuthToken(): string {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) return token;

    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AuthUser;
      return parsed.token || '';
    }
  } catch {
    // ignore
  }
  return '';
}

export function mapSongToTrack(song: BackendSong): Track {
  const songIdString = String(song._id || song.id || Date.now());
  const numId = parseInt(songIdString, 10) || songIdString.charCodeAt(0) || 1;
  const idx = Math.abs(numId) % GRADIENTS.length;

  const fileUrl = song.file_url || song.url || '';
  const coverUrl = song.cover_url || song.cover || '';

  const coverGradient = coverUrl ? `url("${coverUrl}") center / cover no-repeat` : GRADIENTS[idx];

  return {
    id: songIdString,
    title: song.title || 'Untitled',
    artist: song.artist || 'Unknown',
    album: song.album || 'Single',
    duration: song.duration || 180,
    gradient: coverGradient,
    genre: 'ambient',
    color: COLORS[idx],
    ...(fileUrl ? { fileUrl } : {}),
    ...(coverUrl ? { coverUrl } : {}),
  } as Track;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || body.message || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ── Auth APIs ──
export const authApi = {
  googleLogin: (credential: string) =>
    request<{ success: boolean; token: string; user: { id: string; name: string; email: string; profilePic: string } }>('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential }),
    }),
  getMe: () =>
    request<{ success: boolean; user: { id: string; name: string; email: string; profilePic: string } }>('/api/auth/me'),
};

// ── Playlist APIs ──
export interface MongoPlaylist {
  _id: string;
  userId: string;
  name: string;
  songs: string[];
  createdAt: string;
  updatedAt: string;
}

export const playlistApi = {
  create: (name: string) =>
    request<{ success: boolean; message: string; data: MongoPlaylist }>('/api/playlist/create', {
      method: 'POST',
      body: JSON.stringify({ name }),
    }),
  addSong: (playlistId: string, songId: string) =>
    request<{ success: boolean; message: string; data: MongoPlaylist }>('/api/playlist/add', {
      method: 'POST',
      body: JSON.stringify({ playlistId, songId }),
    }),
  removeSong: (playlistId: string, songId: string) =>
    request<{ success: boolean; message: string; data: MongoPlaylist }>('/api/playlist/remove', {
      method: 'POST',
      body: JSON.stringify({ playlistId, songId }),
    }),
  getUserPlaylists: () =>
    request<{ success: boolean; data: MongoPlaylist[] }>('/api/playlist'),
  getById: (id: string) =>
    request<{ success: boolean; data: MongoPlaylist }>(`/api/playlist/${id}`),
  delete: (id: string) =>
    request<{ success: boolean; message: string }>(`/api/playlist/${id}`, { method: 'DELETE' }),
};

// ── Like APIs ──
export interface MongoLike {
  _id: string;
  userId: string;
  songId: string;
  createdAt: string;
}

export const likeApi = {
  like: (songId: string) =>
    request<{ success: boolean; message: string; data: MongoLike }>('/api/like', {
      method: 'POST',
      body: JSON.stringify({ songId }),
    }),
  unlike: (songId: string) =>
    request<{ success: boolean; message: string }>('/api/like/unlike', {
      method: 'POST',
      body: JSON.stringify({ songId }),
    }),
  getUserLikes: () =>
    request<{ success: boolean; data: MongoLike[] }>('/api/like'),
  checkLike: (songId: string) =>
    request<{ success: boolean; isLiked: boolean }>(`/api/like/check/${songId}`),
};

// ── Recently Played APIs ──
export const recentlyPlayedApi = {
  add: (songId: string) =>
    request<{ success: boolean; message: string }>('/api/recently-played/add', {
      method: 'POST',
      body: JSON.stringify({ songId }),
    }),
  get: () =>
    request<{ success: boolean; data: { songId: string; playedAt?: string }[] }>('/api/recently-played'),
  clear: () =>
    request<{ success: boolean; message: string }>('/api/recently-played', { method: 'DELETE' }),
};

// ── Play Count APIs ──
export const playCountApi = {
  increment: (songId: string) =>
    request<{ success: boolean }>('/api/play', {
      method: 'POST',
      body: JSON.stringify({ songId }),
    }),
  getTopSongs: (limit = 20) =>
    request<{ success: boolean; data: { songId: string; count: number }[] }>(`/api/play/top-songs?limit=${limit}`),
  getCount: (songId: string) =>
    request<{ success: boolean; data: { songId: string; count: number } }>(`/api/play/${songId}`),
};

// ── Unified Library APIs ──
export const libraryApi = {
  getLibrary: () => request<{ success: boolean; data: any }>('/api/library'),
  toggleFollowArtist: (artistName: string) => request<{ success: boolean; isFollowing: boolean }>('/api/library/artist/toggle', {
    method: 'POST',
    body: JSON.stringify({ artistName }),
  }),
  toggleSaveAlbum: (albumName: string) => request<{ success: boolean; isSaved: boolean }>('/api/library/album/toggle', {
    method: 'POST',
    body: JSON.stringify({ albumName }),
  })
};

// ── Home APIs ──
export const homeApi = {
  getHome: () => request<{ success: boolean; data: any }>('/api/home'),
  recordSkipAvoid: (songId: string) =>
    request<{ success: boolean; message?: string }>('/api/home/skip-avoid', {
      method: 'POST',
      body: JSON.stringify({ songId }),
    }),
};

// ── Search & Metadata APIs ──
export const searchBackendApi = {
  searchSongs: (query: string) =>
    request<{ success: boolean; data: BackendSong[] }>(`/api/search?q=${encodeURIComponent(query)}`),
  getGenres: () =>
    request<{ success: boolean; data: string[] }>('/api/search/genres'),
  getArtists: () =>
    request<{ success: boolean; data: string[] }>('/api/search/artists'),
};

export const songsApi = {
  list: (search?: string) =>
    request<BackendSong[]>(`/songs${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  get: (id: number) => request<BackendSong>(`/songs/${id}`),
};

export async function fetchTracksFromBackend(search?: string): Promise<Track[]> {
  const songs = await songsApi.list(search);
  return songs.map(mapSongToTrack);
}

// ── In-App Notification APIs ──
export interface InAppNotification {
  _id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const notificationsApi = {
  getNotifications: () =>
    request<{ success: boolean; data: InAppNotification[] }>('/api/auth/notifications'),
  deleteNotification: (id: string) =>
    request<{ success: boolean; message: string }>(`/api/auth/notifications/${id}`, {
      method: 'DELETE',
    }),
};
