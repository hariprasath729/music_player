import { Router } from 'express';
import playlistRoutes from './playlist.js';
import likeRoutes from './like.js';
import recentlyPlayedRoutes from './recentlyPlayed.js';
import searchRoutes from './search.js';
import playRoutes from './play.js';
import roomRoutes from './roomRoutes.js';
import libraryRoutes from './libraryRoutes.js';
import homeRoutes from './homeRoutes.js';
import profileRoutes from './profile.js';
import streamRoutes from './stream.js';

const router = Router();

router.use('/playlist', playlistRoutes);
router.use('/like', likeRoutes);
router.use('/recently-played', recentlyPlayedRoutes);
router.use('/search', searchRoutes);
router.use('/play', playRoutes);
router.use('/room', roomRoutes);
router.use('/library', libraryRoutes);
router.use('/home', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/stream', streamRoutes);

export default router;
