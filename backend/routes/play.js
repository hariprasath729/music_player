import express from 'express';
import { incrementPlayCount, getTopSongs, getSongPlayCount } from '../controllers/playCountController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/top-songs', getTopSongs);
router.get('/:songId', getSongPlayCount);
router.post('/', protect, incrementPlayCount);

export default router;