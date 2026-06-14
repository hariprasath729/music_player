import Playlist from '../models/Playlist.js';
import mongoose from 'mongoose';

export const createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, error: 'Name is required' });
    }

    const playlist = await Playlist.create({
      userId,
      name: name.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Playlist created',
      data: playlist,
    });
  } catch (error) {
    console.error('Create playlist error:', error);
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

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ success: false, error: 'Playlist not found' });
    }

    if (playlist.userId.toString() !== userId) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
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
    console.error('Add song error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const userId = req.user.id;

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
    console.error('Remove song error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const getUserPlaylists = async (req, res) => {
  try {
    const userId = req.user.id;
    const playlists = await Playlist.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: playlists });
  } catch (error) {
    console.error('Get playlists error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ success: false, error: 'Playlist not found' });
    }
    if (playlist.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }
    res.json({ success: true, data: playlist });
  } catch (error) {
    console.error('Get playlist error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ success: false, error: 'Playlist not found' });
    }
    if (playlist.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }
    await playlist.deleteOne();
    res.json({ success: true, message: 'Playlist deleted' });
  } catch (error) {
    console.error('Delete playlist error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
