/**
 * Song Repository — Dynamic Catalog Loader
 * ----------------------------------------
 * This repository dynamically parses the single source of truth for
 * metadata (`src/data/musicCatalog.ts`) to avoid duplicate JSON data files.
 *
 * To scale to a database later, replace internals here.
 */

import { loadSongsFromCatalog } from '../utils/catalogLoader.js';

// In-memory cache for fast reads.
let cache = null;

function normalizeCdnUrl(url) {
  return typeof url === 'string'
    ? url
        .replace('songs_list_1@main_1', 'songs_list_1')
        .replace('songs_list_1@main', 'songs_list_1')
    : url;
}

function normalizeSong(song) {
  return {
    id: song.id,
    title: song.title,
    artist: song.artist ?? 'Unknown',
    album: song.album ?? null,
    duration: song.duration ?? 0,
    file_url: normalizeCdnUrl(song.file_url || song.url),
    cover_url: normalizeCdnUrl(song.cover_url || song.cover || null),
    created_at: song.created_at ?? new Date().toISOString(),
  };
}

async function loadCache() {
  if (cache) return cache;
  try {
    const raw = await loadSongsFromCatalog();
    cache = raw.map(normalizeSong);
  } catch (err) {
    console.error('[songRepository] Failed to load data from musicCatalog:', err);
    cache = [];
  }
  return cache;
}

async function persist() {
  // Read-only catalog fallback, writing disabled
}

function nextId() {
  if (!cache || cache.length === 0) return 1;
  return Math.max(...cache.map((s) => s.id)) + 1;
}

export const songRepository = {
  /** Returns all songs (optionally filtered by a search term). */
  async findAll({ search } = {}) {
    const songs = await loadCache();
    if (!search) return [...songs];
    const q = search.toLowerCase();
    return songs.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q) ||
        (s.album && s.album.toLowerCase().includes(q))
    );
  },

  /** Returns a single song by numeric id, or null. */
  async findById(id) {
    const songs = await loadCache();
    return songs.find((s) => s.id === id) || null;
  },

  /** Creates a new song in memory. */
  async create(data) {
    await loadCache();
    const song = normalizeSong({
      id: nextId(),
      title: data.title,
      artist: data.artist ?? 'Unknown',
      album: data.album ?? null,
      duration: data.duration ?? 0,
      file_url: data.file_url || data.url,
      cover_url: data.cover_url || data.cover || null,
      created_at: new Date().toISOString(),
    });
    cache.push(song);
    await persist();
    return song;
  },

  /** Partially updates an existing song in memory. */
  async update(id, data) {
    await loadCache();
    const idx = cache.findIndex((s) => s.id === id);
    if (idx === -1) return null;

    const existing = cache[idx];
    const updated = {
      ...existing,
      ...('title' in data ? { title: data.title } : {}),
      ...('artist' in data ? { artist: data.artist } : {}),
      ...('album' in data ? { album: data.album } : {}),
      ...('duration' in data ? { duration: data.duration } : {}),
      ...('file_url' in data ? { file_url: normalizeCdnUrl(data.file_url) } : {}),
      ...('url' in data ? { file_url: normalizeCdnUrl(data.url) } : {}),
      ...('cover_url' in data ? { cover_url: normalizeCdnUrl(data.cover_url) } : {}),
      ...('cover' in data ? { cover_url: normalizeCdnUrl(data.cover) } : {}),
      id: existing.id,
      created_at: existing.created_at,
    };
    cache[idx] = updated;
    await persist();
    return updated;
  },

  /** Deletes a song by id in memory. */
  async remove(id) {
    await loadCache();
    const idx = cache.findIndex((s) => s.id === id);
    if (idx === -1) return false;
    cache.splice(idx, 1);
    await persist();
    return true;
  },
};
