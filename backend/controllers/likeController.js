import Like from '../models/Like.js';
import { log } from '../utils/logger.js';

export const likeSong = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id;

    if (!songId || typeof songId !== 'string' || songId.length > 100) {
      return res.status(400).json({ success: false, error: 'songId is required' });
    }

    const existingLike = await Like.findOne({ userId, songId });
    if (existingLike) {
      return res.status(400).json({ success: false, error: 'Song already liked' });
    }

    const like = await Like.create({ userId, songId });
    res.status(201).json({ success: true, message: 'Song liked', data: like });
  } catch (error) {
    log('error', 'Like failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const unlikeSong = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id;

    if (!songId || typeof songId !== 'string' || songId.length > 100) {
      return res.status(400).json({ success: false, error: 'songId is required' });
    }

    const deleted = await Like.findOneAndDelete({ userId, songId });
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Like not found' });
    }

    res.json({ success: true, message: 'Song unliked' });
  } catch (error) {
    log('error', 'Unlike failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const getLikes = async (req, res) => {
  try {
    const userId = req.user.id;
    const likes = await Like.find({ userId }).sort({ createdAt: -1 }).limit(500);
    res.json({ success: true, data: likes });
  } catch (error) {
    log('error', 'Get likes failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const checkLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const { songId } = req.params;

    if (!songId || typeof songId !== 'string' || songId.length > 100) {
      return res.status(400).json({ success: false, error: 'Invalid request' });
    }

    const like = await Like.findOne({ userId, songId });
    res.json({ success: true, isLiked: !!like });
  } catch (error) {
    log('error', 'Check like failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};