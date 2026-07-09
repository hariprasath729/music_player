import mongoose from 'mongoose';
import { getSongsDb } from '../config/db.js';

const songSchema = new mongoose.Schema({
  songId:   { type: Number, required: true, unique: true, index: true },
  title:    { type: String, required: true },
  artist:   { type: String, default: 'Unknown' },
  album:    { type: String, default: null },
  duration: { type: Number, default: 0 },
  cover:    { type: String, default: null },
  // Private — only backend reads this.
  url:      { type: String, required: true },
}, { timestamps: false });

/**
 * Returns the Song model compiled on the secondary songsConnection (if available),
 * falling back to the default mongoose connection. Compiled lazily so it gets the
 * correct connection when called at query-time.
 */
export function getSongModel() {
  const conn = getSongsDb();
  if (conn) {
    return conn.models.Song || conn.model('Song', songSchema);
  }
  return mongoose.models.Song || mongoose.model('Song', songSchema);
}

// Fallback default export (compiled on default mongoose connection)
export default mongoose.models.Song || mongoose.model('Song', songSchema);
