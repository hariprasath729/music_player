import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Like from '../models/Like.js';
import Playlist from '../models/Playlist.js';
import RecentlyPlayed from '../models/RecentlyPlayed.js';
import Download from '../models/Download.js';
import FollowedArtist from '../models/FollowedArtist.js';
import SavedAlbum from '../models/SavedAlbum.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory cache for fast mapping
let songsCatalog = [];

const loadCatalog = async () => {
  try {
    const dataPath = path.join(__dirname, '../data/songs_metadata.json');
    const fileContent = await fs.readFile(dataPath, 'utf-8');
    songsCatalog = JSON.parse(fileContent);
  } catch (error) {
    console.error('Failed to load songs_metadata.json for Library mapping', error);
  }
};

loadCatalog();

const getFullSong = (songId) => {
  return songsCatalog.find((s) => String(s.id) === String(songId) || String(s._id) === String(songId));
};

export const getLibrary = async (req, res) => {
  try {
    const userId = req.user.id;

    const [likes, playlists, recentlyPlayed, downloads, followed, saved] = await Promise.all([
      Like.find({ userId }).sort({ createdAt: -1 }),
      Playlist.find({ userId }).sort({ createdAt: -1 }),
      RecentlyPlayed.findOne({ userId }),
      Download.findOne({ userId }),
      FollowedArtist.find({ userId }).sort({ createdAt: -1 }),
      SavedAlbum.find({ userId }).sort({ createdAt: -1 })
    ]);

    // Map raw DB song IDs to full song objects from the master catalog
    const likedSongs = likes.map((l) => getFullSong(l.songId)).filter(Boolean);
    
    const mappedPlaylists = playlists.map((p) => ({
      ...p.toObject(),
      songs: p.songs.map(getFullSong).filter(Boolean)
    }));

    const recentSongs = (recentlyPlayed?.songs || []).map((r) => {
      const song = getFullSong(r.songId);
      return song ? { ...song, playedAt: r.playedAt } : null;
    }).filter(Boolean);
    const downloadedSongs = (downloads?.songs || []).map(getFullSong).filter(Boolean);
    const followedArtists = followed.map(f => f.artistName);
    const savedAlbums = saved.map(s => s.albumName);

    res.json({
      success: true,
      data: {
        likedSongs,
        playlists: mappedPlaylists,
        downloads: downloadedSongs,
        recentlyPlayed: recentSongs,
        followedArtists,
        savedAlbums
      }
    });
  } catch (error) {
    console.error('Get library error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// --- ARTISTS & ALBUMS ---

export const toggleFollowArtist = async (req, res) => {
  try {
    const { artistName } = req.body;
    const userId = req.user.id;
    const exists = await FollowedArtist.findOne({ userId, artistName });
    if (exists) {
      await FollowedArtist.deleteOne({ _id: exists._id });
      res.json({ success: true, isFollowing: false });
    } else {
      await FollowedArtist.create({ userId, artistName });
      res.json({ success: true, isFollowing: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const toggleSaveAlbum = async (req, res) => {
  try {
    const { albumName } = req.body;
    const userId = req.user.id;
    const exists = await SavedAlbum.findOne({ userId, albumName });
    if (exists) {
      await SavedAlbum.deleteOne({ _id: exists._id });
      res.json({ success: true, isSaved: false });
    } else {
      await SavedAlbum.create({ userId, albumName });
      res.json({ success: true, isSaved: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// --- DOWNLOADS API ---

export const addDownload = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id;
    if (!songId) return res.status(400).json({ success: false, error: 'songId is required' });

    const download = await Download.findOneAndUpdate({ userId }, { $addToSet: { songs: songId } }, { new: true, upsert: true });
    res.json({ success: true, data: download.songs });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const removeDownload = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id;
    const download = await Download.findOneAndUpdate({ userId }, { $pull: { songs: songId } }, { new: true });
    res.json({ success: true, data: download ? download.songs : [] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};