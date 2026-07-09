import express from 'express';
import { requestStreamToken, playStream } from '../controllers/streamController.js';
import { protect } from '../middleware/auth.js';
import { streamLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

/**
 * POST /api/stream/request
 * Protected: requires valid JWT (logged-in user).
 * Rate-limited: prevents automated scraping.
 * Body: { songId: string | number }
 */
router.post('/request', protect, streamLimiter, requestStreamToken);

/**
 * GET /api/stream/play/:token
 * No auth middleware here — the JWT in the path IS the auth.
 * The token was already issued to an authenticated user above.
 * Rate-limited to stop brute-force token guessing.
 */
router.get('/play/:token', streamLimiter, playStream);

export default router;
