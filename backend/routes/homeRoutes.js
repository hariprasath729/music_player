import express from 'express';
import { getHomeData } from '../controllers/homeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getHomeData);

export default router;