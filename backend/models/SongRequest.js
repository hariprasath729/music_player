import mongoose from 'mongoose';

const songRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  songs: {
    type: [String],
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 24 * 60 * 60 // 30 days TTL
  }
});

export default mongoose.model('SongRequest', songRequestSchema);
