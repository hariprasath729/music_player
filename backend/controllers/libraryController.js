import Like from '../models/Like.js';
import Playlist from '../models/Playlist.js';
import RecentlyPlayed from '../models/RecentlyPlayed.js';
import Download from '../models/Download.js';
import FollowedArtist from '../models/FollowedArtist.js';
import SavedAlbum from '../models/SavedAlbum.js';
import { log } from '../utils/logger.js';
import { sanitizeString } from '../utils/sanitizeHtml.js';
import { loadSongsFromCatalog } from '../utils/catalogLoader.js';

// In-memory cache for fast mapping
let songsCatalog = [];

const loadCatalog = async () => {
  try {
    songsCatalog = await loadSongsFromCatalog();
  } catch (error) {
    console.error('Failed to load catalog for Library mapping', error.message);
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
      Like.find({ userId }).sort({ createdAt: -1 }).limit(500),
      Playlist.find({ userId }).sort({ createdAt: -1 }).limit(50),
      RecentlyPlayed.findOne({ userId }),
      Download.findOne({ userId }),
      FollowedArtist.find({ userId }).sort({ createdAt: -1 }).limit(200),
      SavedAlbum.find({ userId }).sort({ createdAt: -1 }).limit(200)
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
    log('error', 'Get library failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// --- ARTISTS & ALBUMS ---

export const toggleFollowArtist = async (req, res) => {
  try {
    const { artistName } = req.body;
    const userId = req.user.id;

    if (!artistName || typeof artistName !== 'string' || artistName.length > 200) {
      return res.status(400).json({ success: false, error: 'Artist name is required' });
    }

    const sanitizedName = sanitizeString(artistName, 200);

    const exists = await FollowedArtist.findOne({ userId, artistName: sanitizedName });
    if (exists) {
      await FollowedArtist.deleteOne({ _id: exists._id });
      res.json({ success: true, isFollowing: false });
    } else {
      await FollowedArtist.create({ userId, artistName: sanitizedName });
      res.json({ success: true, isFollowing: true });
    }
  } catch (error) {
    log('error', 'Toggle follow artist failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const toggleSaveAlbum = async (req, res) => {
  try {
    const { albumName } = req.body;
    const userId = req.user.id;

    if (!albumName || typeof albumName !== 'string' || albumName.length > 200) {
      return res.status(400).json({ success: false, error: 'Album name is required' });
    }

    const sanitizedName = sanitizeString(albumName, 200);

    const exists = await SavedAlbum.findOne({ userId, albumName: sanitizedName });
    if (exists) {
      await SavedAlbum.deleteOne({ _id: exists._id });
      res.json({ success: true, isSaved: false });
    } else {
      await SavedAlbum.create({ userId, albumName: sanitizedName });
      res.json({ success: true, isSaved: true });
    }
  } catch (error) {
    log('error', 'Toggle save album failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// --- DOWNLOADS API ---

export const addDownload = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id;
    if (!songId || typeof songId !== 'string' || songId.length > 100) {
      return res.status(400).json({ success: false, error: 'songId is required' });
    }

    const download = await Download.findOneAndUpdate({ userId }, { $addToSet: { songs: songId } }, { new: true, upsert: true });
    res.json({ success: true, data: download.songs });
  } catch (error) {
    log('error', 'Add download failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const removeDownload = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id;

    if (!songId || typeof songId !== 'string' || songId.length > 100) {
      return res.status(400).json({ success: false, error: 'songId is required' });
    }

    const download = await Download.findOneAndUpdate({ userId }, { $pull: { songs: songId } }, { new: true });
    res.json({ success: true, data: download ? download.songs : [] });
  } catch (error) {
    log('error', 'Remove download failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};