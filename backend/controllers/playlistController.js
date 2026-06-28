import Playlist from '../models/Playlist.js';
import mongoose from 'mongoose';
import { log } from '../utils/logger.js';
import { sanitizeString } from '../utils/sanitizeHtml.js';
import { recordAudit, AUDIT_ACTIONS } from '../utils/auditTrail.js';

const MAX_PLAYLISTS_PER_USER = 50;
const MAX_SONGS_PER_PLAYLIST = 500;
const MAX_NAME_LENGTH = 100;

export const createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ success: false, error: 'Name is required' });
    }

    const sanitizedName = sanitizeString(name, MAX_NAME_LENGTH);
    if (!sanitizedName) {
      return res.status(400).json({ success: false, error: 'Invalid playlist name' });
    }

    // Check playlist limit per user
    const existingCount = await Playlist.countDocuments({ userId });
    if (existingCount >= MAX_PLAYLISTS_PER_USER) {
      return res.status(400).json({ success: false, error: `Maximum ${MAX_PLAYLISTS_PER_USER} playlists allowed` });
    }

    const playlist = await Playlist.create({
      userId,
      name: sanitizedName,
    });

    res.status(201).json({
      success: true,
      message: 'Playlist created',
      data: playlist,
    });
  } catch (error) {
    log('error', 'Create playlist failed', { details: error.message, userId: req.user?.id });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const userId = req.user.id;

    if (!playlistId || !songId) {
      return res.status(400).json({ success: false, error: 'playlistId and songId required' });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
      return res.status(400).json({ success: false, error: 'Invalid request' });
    }

    // Validate songId length
    if (typeof songId !== 'string' || songId.length > 100) {
      return res.status(400).json({ success: false, error: 'Invalid request' });
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ success: false, error: 'Playlist not found' });
    }

    if (playlist.userId.toString() !== userId) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    // Check max songs per playlist
    if (playlist.songs.length >= MAX_SONGS_PER_PLAYLIST) {
      return res.status(400).json({ success: false, error: `Maximum ${MAX_SONGS_PER_PLAYLIST} songs per playlist` });
    }

    if (playlist.songs.some(id => id.toString() === songId)) {
      return res.status(400).json({ success: false, error: 'Song already in playlist' });
    }

    playlist.songs.push(songId);
    await playlist.save();

    res.json({
      success: true,
      message: 'Song added to playlist',
      data: playlist,
    });
  } catch (error) {
    log('error', 'Add song to playlist failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const userId = req.user.id;

    if (!playlistId || !songId) {
      return res.status(400).json({ success: false, error: 'playlistId and songId required' });
    }

    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
      return res.status(400).json({ success: false, error: 'Invalid request' });
    }

    if (typeof songId !== 'string' || songId.length > 100) {
      return res.status(400).json({ success: false, error: 'Invalid request' });
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ success: false, error: 'Playlist not found' });
    }

    if (playlist.userId.toString() !== userId) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    playlist.songs = playlist.songs.filter(id => id.toString() !== songId);
    await playlist.save();

    res.json({
      success: true,
      message: 'Song removed from playlist',
      data: playlist,
    });
  } catch (error) {
    log('error', 'Remove song from playlist failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const getUserPlaylists = async (req, res) => {
  try {
    const userId = req.user.id;
    const playlists = await Playlist.find({ userId }).sort({ createdAt: -1 }).limit(MAX_PLAYLISTS_PER_USER);
    res.json({ success: true, data: playlists });
  } catch (error) {
    log('error', 'Get playlists failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const getPlaylistById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, error: 'Invalid request' });
    }

    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ success: false, error: 'Playlist not found' });
    }
    if (playlist.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }
    res.json({ success: true, data: playlist });
  } catch (error) {
    log('error', 'Get playlist failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, error: 'Invalid request' });
    }

    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ success: false, error: 'Playlist not found' });
    }
    if (playlist.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }
    await playlist.deleteOne();

    await recordAudit({ userId: req.user.id, action: AUDIT_ACTIONS.PLAYLIST_DELETION, req, metadata: { playlistId: req.params.id } });

    res.json({ success: true, message: 'Playlist deleted' });
  } catch (error) {
    log('error', 'Delete playlist failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
