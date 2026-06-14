import express from 'express';
import { addRecentlyPlayed, getRecentlyPlayed, clearRecentlyPlayed } from '../controllers/recentlyPlayedController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/add', addRecentlyPlayed);
router.get('/', getRecentlyPlayed);
router.delete('/', clearRecentlyPlayed);

export default router;