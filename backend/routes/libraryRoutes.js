import express from 'express';
import { getLibrary, addDownload, removeDownload, toggleFollowArtist, toggleSaveAlbum } from '../controllers/libraryController.js';
import { protect } from '../middleware/auth.js';
import { userReadLimiter, userWriteLimiter } from '../middleware/rateLimiter.js';
import { downloadProtection } from '../middleware/streamProtection.js';

const router = express.Router();

router.use(protect); // Require authentication for all library interactions

router.get('/', userReadLimiter, getLibrary);
router.post('/download/add', userWriteLimiter, downloadProtection(), addDownload);
router.post('/download/remove', userWriteLimiter, removeDownload);
router.post('/artist/toggle', userWriteLimiter, toggleFollowArtist);
router.post('/album/toggle', userWriteLimiter, toggleSaveAlbum);

export default router;