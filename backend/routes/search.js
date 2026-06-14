import express from 'express';
import { searchSongs, getGenres, getArtists } from '../controllers/searchController.js';

const router = express.Router();

router.get('/', searchSongs);
router.get('/genres', getGenres);
router.get('/artists', getArtists);

export default router;