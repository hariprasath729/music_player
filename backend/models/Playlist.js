import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true },
  songs: [{ type: String }] // Array of song IDs
}, { timestamps: true });

export default mongoose.model('Playlist', playlistSchema);