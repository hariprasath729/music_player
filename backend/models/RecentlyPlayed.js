import mongoose from 'mongoose';

const recentlyPlayedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  songs: [{
    songId: { type: String, required: true },
    playedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.model('RecentlyPlayed', recentlyPlayedSchema);