import express from 'express';
import { getLibrary, addDownload, removeDownload, toggleFollowArtist, toggleSaveAlbum } from '../controllers/libraryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // Require authentication for all library interactions

router.get('/', getLibrary);
router.post('/download/add', addDownload);
router.post('/download/remove', removeDownload);
router.post('/artist/toggle', toggleFollowArtist);
router.post('/album/toggle', toggleSaveAlbum);

export default router;