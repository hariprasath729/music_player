/**
 * Song Routes
 * -----------
 * Maps HTTP endpoints to controllers, applying validation middleware.
 *
 *   GET    /songs        → list all songs (supports ?search=)
 *   GET    /songs/:id    → get one song
 */

import { Router } from 'express';
import {
  listSongs,
  getSong,
} from '../controllers/songController.js';
import {
  validateId,
} from '../middleware/validateSong.js';

const router = Router();

router.get('/', listSongs);
router.get('/:id', validateId, getSong);

export default router;
