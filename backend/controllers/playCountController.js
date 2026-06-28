import PlayCount from '../models/PlayCount.js';
import { log } from '../utils/logger.js';
import { capLimit } from '../middleware/queryProtection.js';

export const incrementPlayCount = async (req, res) => {
  try {
    const { songId } = req.body;
    if (!songId || typeof songId !== 'string' || songId.length > 100) {
      return res.status(400).json({ success: false, error: 'songId is required' });
    }

    const playCount = await PlayCount.findOneAndUpdate(
      { songId },
      { $inc: { count: 1 } },
      { new: true, upsert: true } // Auto-inserts if it's the first time
    );

    res.json({ success: true, data: playCount });
  } catch (error) {
    log('error', 'Increment play count failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const getTopSongs = async (req, res) => {
  try {
    // Cap limit to prevent abuse — max 100
    const limit = capLimit(req.query.limit, 20, 100);
    const topSongs = await PlayCount.find().sort({ count: -1 }).limit(limit);
    res.json({ success: true, data: topSongs });
  } catch (error) {
    log('error', 'Get top songs failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const getSongPlayCount = async (req, res) => {
  try {
    const { songId } = req.params;
    if (!songId || typeof songId !== 'string' || songId.length > 100) {
      return res.status(400).json({ success: false, error: 'Invalid request' });
    }

    const playCount = await PlayCount.findOne({ songId });
    res.json({ success: true, data: playCount || { songId, count: 0 } });
  } catch (error) {
    log('error', 'Get song play count failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};