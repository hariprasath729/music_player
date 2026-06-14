import PlayCount from '../models/PlayCount.js';

export const incrementPlayCount = async (req, res) => {
  try {
    const { songId } = req.body;
    if (!songId) return res.status(400).json({ success: false, error: 'songId is required' });

    const playCount = await PlayCount.findOneAndUpdate(
      { songId },
      { $inc: { count: 1 } },
      { new: true, upsert: true } // Auto-inserts if it's the first time
    );

    res.json({ success: true, data: playCount });
  } catch (error) {
    console.error('Increment play count error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const getTopSongs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const topSongs = await PlayCount.find().sort({ count: -1 }).limit(limit);
    res.json({ success: true, data: topSongs });
  } catch (error) {
    console.error('Get top songs error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const getSongPlayCount = async (req, res) => {
  try {
    const { songId } = req.params;
    const playCount = await PlayCount.findOne({ songId });
    res.json({ success: true, data: playCount || { songId, count: 0 } });
  } catch (error) {
    console.error('Get song play count error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};