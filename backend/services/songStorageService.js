/**
 * Song Storage Service
 * --------------------
 * The ONLY component that knows how to resolve a songId into its real audio location.
 *
 * Abstraction strategy:
 *   - Primary source: MongoDB (SONGS_METADATA cluster)
 *   - Falling back to MongoDB is critical. There is no local JSON file.
 *
 * The streaming controller never accesses storage directly.
 */

import { log } from '../utils/logger.js';

// ── In-memory URL map (populated from MongoDB at startup) ──
let urlMap = new Map(); // songId (number) → url (string)
let isLoaded = false;

/**
 * Loads the URL map from MongoDB.
 * Called once at startup. Additional calls are no-ops once loaded.
 */
export async function loadSongStorageMap() {
  if (isLoaded) return;

  try {
    const { getSongsDb } = await import('../config/db.js');
    const songsDb = getSongsDb();

    if (songsDb && songsDb.readyState === 1) {
      const { getSongModel } = await import('../models/Song.js');
      const Song = getSongModel();
      const songs = await Song.find({}, 'songId url').lean();

      if (songs.length > 0) {
        urlMap = new Map(songs.map(s => [s.songId, s.url]));
        isLoaded = true;
        log('info', `[songStorageService] Loaded ${urlMap.size} song URLs from MongoDB`);
        return;
      }
    }
  } catch (err) {
    log('error', '[songStorageService] Failed to load song storage map from MongoDB', { details: err.message });
  }
}

/**
 * Returns the real audio URL for a given songId.
 * Returns null if not found or if the map hasn't been loaded.
 */
export async function getStorageLocation(songId) {
  if (!isLoaded) {
    await loadSongStorageMap();
  }

  const numId = Number(songId);
  if (isNaN(numId)) return null;

  return urlMap.get(numId) || null;
}

/**
 * Returns the size of the URL map.
 */
export function getMapSize() {
  return urlMap.size;
}

/**
 * Forces a reload of the URL map from the database.
 */
export async function reloadSongStorageMap() {
  isLoaded = false;
  await loadSongStorageMap();
}
