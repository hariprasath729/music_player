import express from 'express';
import { incrementPlayCount, getTopSongs, getSongPlayCount } from '../controllers/playCountController.js';
import { protect } from '../middleware/auth.js';
import { publicLimiter, userWriteLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.get('/top-songs', publicLimiter, getTopSongs);
router.get('/:songId', publicLimiter, getSongPlayCount);
router.post('/', protect, userWriteLimiter, incrementPlayCount);

export default router;