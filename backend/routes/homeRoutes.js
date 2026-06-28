import express from 'express';
import { getHomeData, recordSkipAvoid } from '../controllers/homeController.js';
import { protect } from '../middleware/auth.js';
import { userReadLimiter, userWriteLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.get('/', protect, userReadLimiter, getHomeData);
router.post('/skip-avoid', protect, userWriteLimiter, recordSkipAvoid);

export default router;
