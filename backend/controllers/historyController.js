import ListeningHistory from '../models/ListeningHistory.js';
import { log } from '../utils/logger.js';

const toIsoDate = (date) => date.toISOString().slice(0, 10);

const formatTime = (date) => new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
}).format(date);

const formatDayLabel = (date) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const inputDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((today.getTime() - inputDay.getTime()) / 86400000);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays >= 2 && diffDays <= 6) {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  }
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
};

const formatEntry = (entry) => {
  const playedAt = new Date(entry.playedAt);
  return {
    id: String(entry._id),
    songId: String(entry.songId),
    playedAt: playedAt.toISOString(),
    date: toIsoDate(playedAt),
    day: formatDayLabel(playedAt),
    time: formatTime(playedAt),
  };
};

export const addHistoryEntry = async (req, res) => {
  try {
    const userId = req.user.id;
    const { songId, playedAt } = req.body || {};

    if (!songId || (typeof songId !== 'string' && typeof songId !== 'number')) {
      return res.status(400).json({ success: false, error: 'songId is required' });
    }

    const entry = await ListeningHistory.create({
      userId,
      songId: String(songId),
      playedAt: playedAt ? new Date(playedAt) : new Date(),
    });

    return res.json({ success: true, message: 'History entry added', data: formatEntry(entry) });
  } catch (error) {
    log('error', 'Add history entry failed', { details: error.message });
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const getHistoryEntries = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = Math.max(parseInt(req.query.page || '1', 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || '100', 10) || 100, 1), 200);
    const sort = req.query.sort === 'oldest' ? 1 : -1;
    const skip = (page - 1) * limit;

    const [entries, total] = await Promise.all([
      ListeningHistory.find({ userId }).sort({ playedAt: sort, _id: sort }).skip(skip).limit(limit + 1),
      ListeningHistory.countDocuments({ userId }),
    ]);

    const hasMore = entries.length > limit;
    const pageEntries = hasMore ? entries.slice(0, limit) : entries;

    return res.json({
      success: true,
      data: pageEntries.map(formatEntry),
      meta: { page, limit, total, hasMore },
    });
  } catch (error) {
    log('error', 'Get history entries failed', { details: error.message });
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const removeHistoryEntry = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ success: false, error: 'History entry id is required' });
    }

    const deleted = await ListeningHistory.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'History entry not found' });
    }

    return res.json({ success: true, message: 'History entry removed' });
  } catch (error) {
    log('error', 'Remove history entry failed', { details: error.message });
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const clearHistoryEntries = async (req, res) => {
  try {
    const userId = req.user.id;
    await ListeningHistory.deleteMany({ userId });
    return res.json({ success: true, message: 'History cleared' });
  } catch (error) {
    log('error', 'Clear history failed', { details: error.message });
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
