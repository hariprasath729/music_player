import RecentlyPlayed from '../models/RecentlyPlayed.js';
import { log } from '../utils/logger.js';

export const addRecentlyPlayed = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id;

    if (!songId || typeof songId !== 'string' || songId.length > 100) {
      return res.status(400).json({ success: false, error: 'songId is required' });
    }

    let history = await RecentlyPlayed.findOne({ userId });

    if (!history) {
      history = await RecentlyPlayed.create({
        userId,
        songs: [{ songId, playedAt: new Date() }]
      });
    } else {
      // If the last played song is exactly the same, just update the timestamp
      if (history.songs.length > 0 && history.songs[0].songId === songId) {
        history.songs[0].playedAt = new Date();
      } else {
        history.songs = history.songs.filter(s => s.songId !== songId);
        history.songs.unshift({ songId, playedAt: new Date() });
        
        // Enforce the 25 limit policy
        if (history.songs.length > 25) {
          history.songs = history.songs.slice(0, 25);
        }
      }
      await history.save();
    }

    res.json({ success: true, message: 'Added to recently played' });
  } catch (error) {
    log('error', 'Add recently played failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const getRecentlyPlayed = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await RecentlyPlayed.findOne({ userId });
    res.json({ success: true, data: history ? history.songs : [] });
  } catch (error) {
    log('error', 'Get recently played failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const clearRecentlyPlayed = async (req, res) => {
  try {
    const userId = req.user.id;
    await RecentlyPlayed.findOneAndDelete({ userId });
    res.json({ success: true, message: 'Recently played cleared' });
  } catch (error) {
    log('error', 'Clear recently played failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};