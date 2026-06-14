import express from 'express';
import { likeSong, unlikeSong, getLikes, checkLike } from '../controllers/likeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', likeSong);
router.post('/unlike', unlikeSong);
router.get('/', getLikes);
router.get('/check/:songId', checkLike);

export default router;