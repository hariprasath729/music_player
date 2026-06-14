/**
 * Song Routes
 * -----------
 * Maps HTTP endpoints to controllers, applying validation middleware.
 *
 *   GET    /songs        → list all songs (supports ?search=)
 *   GET    /songs/:id    → get one song
 *   POST   /songs        → create song (metadata only)
 *   PUT    /songs/:id    → update song
 *   DELETE /songs/:id    → delete song
 */

import { Router } from 'express';
import {
  listSongs,
  getSong,
  createSong,
  updateSong,
  deleteSong,
} from '../controllers/songController.js';
import {
  validateCreate,
  validateUpdate,
  validateId,
} from '../middleware/validateSong.js';

const router = Router();

router.get('/', listSongs);
router.get('/:id', validateId, getSong);
router.post('/', validateCreate, createSong);
router.put('/:id', validateId, validateUpdate, updateSong);
router.delete('/:id', validateId, deleteSong);

export default router;
