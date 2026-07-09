import express from 'express';
import { getHomeData, recordSkipAvoid } from '../controllers/homeController.js';
import { protect } from '../middleware/auth.js';
import { userReadLimiter, telemetryLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.get('/', protect, userReadLimiter, getHomeData);
router.post('/skip-avoid', protect, telemetryLimiter, recordSkipAvoid);

export default router;
