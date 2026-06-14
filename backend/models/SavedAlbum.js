import mongoose from 'mongoose';

const savedAlbumSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  albumName: { type: String, required: true }
}, { timestamps: true });

// Prevent duplicate saves
savedAlbumSchema.index({ userId: 1, albumName: 1 }, { unique: true });

export default mongoose.model('SavedAlbum', savedAlbumSchema);