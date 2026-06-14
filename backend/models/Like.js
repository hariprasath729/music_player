import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  songId: { type: String, required: true }
}, { timestamps: true });

// Prevent duplicate likes via compound index
likeSchema.index({ userId: 1, songId: 1 }, { unique: true });

export default mongoose.model('Like', likeSchema);