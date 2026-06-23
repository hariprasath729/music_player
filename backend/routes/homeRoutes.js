import express from 'express';
import { getHomeData, recordSkipAvoid } from '../controllers/homeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getHomeData);
router.post('/skip-avoid', protect, recordSkipAvoid);

export default router;
