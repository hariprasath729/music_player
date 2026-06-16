import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Like from '../models/Like.js';
import Playlist from '../models/Playlist.js';
import RecentlyPlayed from '../models/RecentlyPlayed.js';
import PlayCount from '../models/PlayCount.js';
import FollowedArtist from '../models/FollowedArtist.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let songsCatalog = [];

const loadCatalog = async () => {
  try {
    const dataPath = path.join(__dirname, '../data/songs_metadata.json');
    const fileContent = await fs.readFile(dataPath, 'utf-8');
    songsCatalog = JSON.parse(fileContent);
  } catch (error) {
    console.error('Failed to load songs_metadata.json for Home data mapping', error);
  }
};

loadCatalog();

const getFullSong = (songId) => songsCatalog.find(s => String(s.id) === String(songId));

export const getHomeData = async (req, res) => {
  try {
    const userId = req.user.id;

    const [likes, playlists, recentlyPlayed, playCounts, followedArtists] = await Promise.all([
      Like.find({ userId }),
      Playlist.find({ userId }).sort({ createdAt: -1 }).limit(10),
      RecentlyPlayed.findOne({ userId }),
      PlayCount.find().sort({ count: -1 }).limit(20),
      FollowedArtist.find({ userId })
    ]);

    // 1. Recently Played (Limit to 10)
    const recentSongs = (recentlyPlayed?.songs || [])
      .slice(0, 10)
      .map(r => getFullSong(r.songId))
      .filter(Boolean);

    // 2. Trending
    let trending = playCounts.map(p => getFullSong(p.songId)).filter(Boolean);
    if (trending.length < 5) {
      trending = [...songsCatalog].sort(() => 0.5 - Math.random()).slice(0, 20); // Fallback
    }

    // 3. Made For You (Recommendation MVP)
    const likedIds = likes.map(l => String(l.songId));
    
    // Use all available recently played songs to get a better idea of their listening habits
    const allRecentSongs = (recentlyPlayed?.songs || [])
      .map(r => getFullSong(r.songId))
      .filter(Boolean);
    const recentIds = allRecentSongs.map(s => String(s.id));
    
    const baseIds = new Set([...likedIds, ...recentIds]);
    
    const preferredArtists = new Set();
    baseIds.forEach(id => {
      const song = getFullSong(id);
      if (song && song.artist) song.artist.split(',').forEach(a => preferredArtists.add(a.trim()));
    });
    
    // Add explicitly followed artists
    if (followedArtists && followedArtists.length > 0) {
      followedArtists.forEach(f => {
        if (f.artistName) f.artistName.split(',').forEach(a => preferredArtists.add(a.trim()));
      });
    }

    let madeForYou = songsCatalog.filter(s => 
      s && s.artist && !baseIds.has(String(s.id)) && s.artist.split(',').some(a => preferredArtists.has(a.trim()))
    ).sort(() => 0.5 - Math.random()).slice(0, 20);

    // Fallback to general mix if user doesn't have enough history to base off yet
    if (madeForYou.length < 5) madeForYou = [...songsCatalog].filter(s => s && s.id && !baseIds.has(String(s.id))).sort(() => 0.5 - Math.random()).slice(0, 20);

    // 4. Top Artists
    const topArtistsMap = new Map();
    [...recentSongs, ...trending].forEach(song => {
      if (song && song.artist) song.artist.split(',').forEach(a => topArtistsMap.set(a.trim(), (topArtistsMap.get(a.trim()) || 0) + 1));
    });
    const topArtists = Array.from(topArtistsMap.entries()).sort((a, b) => b[1] - a[1]).map(entry => entry[0]).slice(0, 10);

    // 5. User Playlists
    const mappedPlaylists = playlists.map(p => ({ ...p.toObject(), songs: p.songs.map(getFullSong).filter(Boolean) }));

    res.json({
      success: true,
      data: { recentlyPlayed: recentSongs, madeForYou, trending, topArtists, playlists: mappedPlaylists }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};