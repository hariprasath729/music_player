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

/** POST /songs */
export async function createSong(req, res, next) {
  try {
    const song = await songRepository.create(req.body);
    res.status(201).json(song);
  } catch (err) {
    next(err);
  }
}

/** PUT /songs/:id */
export async function updateSong(req, res, next) {
  try {
    const updated = await songRepository.update(req.songId, req.body);
    if (!updated) return res.status(404).json({ error: 'Song not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

/** DELETE /songs/:id */
export async function deleteSong(req, res, next) {
  try {
    const ok = await songRepository.remove(req.songId);
    if (!ok) return res.status(404).json({ error: 'Song not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
