import Like from '../models/Like.js';
import Playlist from '../models/Playlist.js';
import RecentlyPlayed from '../models/RecentlyPlayed.js';
import PlayCount from '../models/PlayCount.js';
import FollowedArtist from '../models/FollowedArtist.js';
import SkipAvoid from '../models/SkipAvoid.js';
import { log } from '../utils/logger.js';
import { loadSongsFromCatalog } from '../utils/catalogLoader.js';

let songsCatalog = [];

const loadCatalog = async () => {
  try {
    songsCatalog = await loadSongsFromCatalog();
  } catch (error) {
    console.error('Failed to load catalog for Home data mapping', error.message);
  }
};

loadCatalog();

const getFullSong = (songId) => songsCatalog.find(s => String(s.id) === String(songId));

export const recordSkipAvoid = async (req, res) => {
  try {
    const userId = req.user.id;
    const { songId } = req.body || {};

    if (!songId || typeof songId !== 'string' || songId.length > 100) {
      return res.status(400).json({ success: false, error: 'songId is required' });
    }

    // Optional short-window de-dupe (avoids writing many rows if user spams next)
    // If there's an existing record for the same song within the last 1 hour, skip creating another.
    const ONE_HOUR_MS = 60 * 60 * 1000;
    const recentCutoff = new Date(Date.now() - ONE_HOUR_MS);

    const existing = await SkipAvoid.findOne({
      userId,
      songId: String(songId),
      skippedAt: { $gte: recentCutoff }
    });

    if (existing) {
      return res.json({ success: true, message: 'Skip already recorded recently' });
    }

    await SkipAvoid.create({
      userId,
      songId: String(songId),
      skippedAt: new Date()
    });

    return res.json({ success: true });
  } catch (error) {
    log('error', 'recordSkipAvoid failed', { details: error.message });
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

const dailyRandomSort = (songs, userId) => {
  if (!songs || !songs.length) return [];
  const todayStr = new Date().toISOString().split('T')[0];
  const songsWithHashes = songs.map(s => {
    if (!s) return { song: s, hash: 0 };
    const songId = s.id || '';
    const key = `${userId}_${songId}_${todayStr}`;
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return { song: s, hash };
  });
  
  return songsWithHashes
    .sort((a, b) => a.hash - b.hash)
    .map(x => x.song);
};

export const getHomeData = async (req, res) => {
  try {
    const userId = req.user.id;

    const [likes, playlists, recentlyPlayed, playCounts, followedArtists, skipAvoid] = await Promise.all([
      Like.find({ userId }),
      Playlist.find({ userId }).sort({ createdAt: -1 }).limit(10),
      RecentlyPlayed.findOne({ userId }),
      PlayCount.find().sort({ count: -1 }).limit(20),
      FollowedArtist.find({ userId }),
      SkipAvoid.find({ userId })
    ]);

    // 1. Recently Played (Limit to 10)
    const recentSongs = (recentlyPlayed?.songs || [])
      .slice(0, 10)
      .map(r => getFullSong(r.songId))
      .filter(Boolean);

    // 2. Trending
    let trending = playCounts.map(p => getFullSong(p.songId)).filter(Boolean);
    if (trending.length < 5) {
      trending = dailyRandomSort([...songsCatalog], userId).slice(0, 20); // Fallback
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

    // 3b. Skip-Avoid filter (skip quickly within first 5s -> exclude for 7 days)
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    const cutoff = new Date(Date.now() - SEVEN_DAYS_MS);
    const skippedQuicklyIds = new Set(
      (skipAvoid || [])
        .filter((r) => r?.skippedAt && new Date(r.skippedAt) >= cutoff)
        .map((r) => String(r.songId))
    );

    const filteredMadeForYou = songsCatalog.filter(s =>
      s &&
      s.artist &&
      !baseIds.has(String(s.id)) &&
      !skippedQuicklyIds.has(String(s.id)) &&
      s.artist.split(',').some(a => preferredArtists.has(a.trim()))
    );
    let madeForYou = dailyRandomSort(filteredMadeForYou, userId).slice(0, 20);

    // Fallback to general mix if user doesn't have enough history to base off yet
    if (madeForYou.length < 5) {
      const fallbackMadeForYou = [...songsCatalog]
        .filter(s => s && s.id && !baseIds.has(String(s.id)) && !skippedQuicklyIds.has(String(s.id)));
      madeForYou = dailyRandomSort(fallbackMadeForYou, userId).slice(0, 20);
    }

    // Additionally filter trending fallback/results for the same avoidance window.
    trending = trending.filter((t) => t && t.id && !skippedQuicklyIds.has(String(t.id)));
    if (trending.length < 5) {
      const fallbackTrending = [...songsCatalog]
        .filter(s => s && s.id && !skippedQuicklyIds.has(String(s.id)));
      trending = dailyRandomSort(fallbackTrending, userId).slice(0, 20);
    }

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
    log('error', 'getHomeData failed', { details: error.message });
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
