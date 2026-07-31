import mongoose from 'mongoose';

const listeningHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  songId: { type: String, required: true, index: true },
  playedAt: { type: Date, required: true, default: Date.now, index: true },
}, { timestamps: true });

listeningHistorySchema.index({ userId: 1, playedAt: -1 });
listeningHistorySchema.index({ userId: 1, songId: 1, playedAt: -1 });

export default mongoose.model('ListeningHistory', listeningHistorySchema);