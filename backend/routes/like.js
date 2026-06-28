import express from 'express';
import { likeSong, unlikeSong, getLikes, checkLike } from '../controllers/likeController.js';
import { protect } from '../middleware/auth.js';
import { userWriteLimiter, userReadLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(protect);

router.post('/', userWriteLimiter, likeSong);
router.post('/unlike', userWriteLimiter, unlikeSong);
router.get('/', userReadLimiter, getLikes);
router.get('/check/:songId', userReadLimiter, checkLike);

export default router;