import express from 'express';
import { addHistoryEntry, getHistoryEntries, clearHistoryEntries, removeHistoryEntry } from '../controllers/historyController.js';
import { protect } from '../middleware/auth.js';
import { userWriteLimiter, userReadLimiter, telemetryLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(protect);

router.post('/', telemetryLimiter, addHistoryEntry);
router.get('/', userReadLimiter, getHistoryEntries);
router.delete('/', userWriteLimiter, clearHistoryEntries);
router.delete('/:id', userWriteLimiter, removeHistoryEntry);

export default router;