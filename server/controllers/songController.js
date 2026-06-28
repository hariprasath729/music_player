/**
 * Song Controller
 * ----------------
 * Pure request/response handlers. Delegates all storage work to the
 * repository, so swapping the data source never touches this file.
 */

import { songRepository } from '../storage/songRepository.js';

/** GET /songs  (optional ?search=term) */
export async function listSongs(req, res, next) {
  try {
    const { search } = req.query;
    const songs = await songRepository.findAll({ search });
    res.json(songs);
  } catch (err) {
    next(err);
  }
}

/** GET /songs/:id */
export async function getSong(req, res, next) {
  try {
    const song = await songRepository.findById(req.songId);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.json(song);
  } catch (err) {
    next(err);
  }
}
