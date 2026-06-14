import { Router } from 'express';
import Room from '../models/Room.js';
import { protect as auth } from '../middleware/auth.js';

const router = Router();

// Get room details
router.get('/:roomId', auth, async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.roomId }).populate('participants', 'username email');
    if (!room) {
      return res.status(404).json({ success: false, error: 'Room not found' });
    }
    res.json({ success: true, data: room });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;
