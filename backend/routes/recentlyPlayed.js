import express from 'express';
import { addRecentlyPlayed, getRecentlyPlayed, clearRecentlyPlayed } from '../controllers/recentlyPlayedController.js';
import { protect } from '../middleware/auth.js';
import { userWriteLimiter, userReadLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(protect);

router.post('/add', userWriteLimiter, addRecentlyPlayed);
router.get('/', userReadLimiter, getRecentlyPlayed);
router.delete('/', userWriteLimiter, clearRecentlyPlayed);

export default router;