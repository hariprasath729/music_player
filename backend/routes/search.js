import express from 'express';
import { searchSongs, getGenres, getArtists } from '../controllers/searchController.js';
import { publicLimiter } from '../middleware/rateLimiter.js';
import { validateQuery, schemas } from '../middleware/validate.js';

const router = express.Router();

router.get('/', publicLimiter, validateQuery(schemas.searchQuery), searchSongs);
router.get('/genres', publicLimiter, getGenres);
router.get('/artists', publicLimiter, getArtists);

export default router;