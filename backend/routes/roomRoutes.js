import { Router } from 'express';
import Room from '../models/Room.js';
import { protect as auth } from '../middleware/auth.js';
import { userReadLimiter } from '../middleware/rateLimiter.js';
import { log } from '../utils/logger.js';

const router = Router();

// Get room details
router.get('/:roomId', auth, userReadLimiter, async (req, res) => {
  try {
    const { roomId } = req.params;
    if (!roomId || typeof roomId !== 'string' || roomId.length > 100) {
      return res.status(400).json({ success: false, error: 'Invalid room ID' });
    }

    const room = await Room.findOne({ roomId }).populate('participants', 'name email profilePic');
    if (!room) {
      return res.status(404).json({ success: false, error: 'Room not found' });
    }
    res.json({ success: true, data: room });
  } catch (err) {
    log('error', 'Get room details failed', { details: err.message });
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

export default router;
