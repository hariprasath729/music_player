import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  hostId: { type: String, required: true },
  participants: [{ type: String }],
  currentSongId: { type: String, default: null },
  currentTime: { type: Number, default: 0 },
  isPlaying: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Room', RoomSchema);