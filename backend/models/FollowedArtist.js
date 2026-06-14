import mongoose from 'mongoose';

const followedArtistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  artistName: { type: String, required: true }
}, { timestamps: true });

// Prevent duplicate follows
followedArtistSchema.index({ userId: 1, artistName: 1 }, { unique: true });

export default mongoose.model('FollowedArtist', followedArtistSchema);