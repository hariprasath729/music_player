import { sanitizeString } from '../utils/sanitizeHtml.js';
import { loadSongsFromCatalog } from '../utils/catalogLoader.js';

let songsData = [];

const loadData = async () => {
  try {
    songsData = await loadSongsFromCatalog();
  } catch (error) {
    console.error('Failed to load catalog', error.message);
  }
};

loadData();

export const searchSongs = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ success: true, data: [] });

    // Sanitize and limit query length
    const sanitized = sanitizeString(q, 200);
    if (!sanitized) return res.json({ success: true, data: [] });

    const query = sanitized.toLowerCase();

    const results = songsData.filter(song => 
      (song.title && song.title.toLowerCase().includes(query)) ||
      (song.artist && song.artist.toLowerCase().includes(query))
    ).slice(0, 20); // Cap results to 20 to prevent data flooding

    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const getGenres = async (req, res) => {
  res.json({ success: true, data: [...new Set(songsData.map(s => s.genre).filter(Boolean))] });
};

export const getArtists = async (req, res) => {
  res.json({ success: true, data: [...new Set(songsData.map(s => s.artist).filter(Boolean))] });
};