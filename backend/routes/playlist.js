import express from 'express';
import { createPlaylist, addSongToPlaylist, removeSongFromPlaylist, getUserPlaylists, getPlaylistById, deletePlaylist } from '../controllers/playlistController.js';
import { protect } from '../middleware/auth.js';
import { userWriteLimiter, userReadLimiter } from '../middleware/rateLimiter.js';
import { validateBody, validateObjectId, schemas } from '../middleware/validate.js';

const router = express.Router();

router.use(protect); // Require authentication

router.post('/create', userWriteLimiter, validateBody(schemas.createPlaylist), createPlaylist);
router.post('/add', userWriteLimiter, validateBody(schemas.playlistSong), addSongToPlaylist);
router.post('/remove', userWriteLimiter, validateBody(schemas.playlistSong), removeSongFromPlaylist);
router.get('/', userReadLimiter, getUserPlaylists);
router.get('/:id', userReadLimiter, validateObjectId('id'), getPlaylistById);
router.delete('/:id', userWriteLimiter, validateObjectId('id'), deletePlaylist);

export default router;