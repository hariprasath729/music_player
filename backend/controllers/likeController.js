import Like from '../models/Like.js';

export const likeSong = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id;

    if (!songId) return res.status(400).json({ success: false, error: 'songId is required' });

    const existingLike = await Like.findOne({ userId, songId });
    if (existingLike) {
      return res.status(400).json({ success: false, error: 'Song already liked' });
    }

    const like = await Like.create({ userId, songId });
    res.status(201).json({ success: true, message: 'Song liked', data: like });
  } catch (error) {
    console.error('Like error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const unlikeSong = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id;

    if (!songId) return res.status(400).json({ success: false, error: 'songId is required' });

    const deleted = await Like.findOneAndDelete({ userId, songId });
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Like not found' });
    }

    res.json({ success: true, message: 'Song unliked' });
  } catch (error) {
    console.error('Unlike error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const getLikes = async (req, res) => {
  try {
    const userId = req.user.id;
    const likes = await Like.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: likes });
  } catch (error) {
    console.error('Get likes error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const checkLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const { songId } = req.params;
    const like = await Like.findOne({ userId, songId });
    res.json({ success: true, isLiked: !!like });
  } catch (error) {
    console.error('Check like error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};