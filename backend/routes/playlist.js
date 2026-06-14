import express from 'express';
import { createPlaylist, addSongToPlaylist, removeSongFromPlaylist, getUserPlaylists, getPlaylistById, deletePlaylist } from '../controllers/playlistController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // Require authentication

router.post('/create', createPlaylist);
router.post('/add', addSongToPlaylist);
router.post('/remove', removeSongFromPlaylist);
router.get('/', getUserPlaylists);
router.get('/:id', getPlaylistById);
router.delete('/:id', deletePlaylist);

export default router;