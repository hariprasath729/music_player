import mongoose from 'mongoose';

const playCountSchema = new mongoose.Schema({
  songId: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('PlayCount', playCountSchema);