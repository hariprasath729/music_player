import mongoose from 'mongoose';

const downloadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  songs: [{ type: String }] // Array of song IDs
}, { timestamps: true });

export default mongoose.model('Download', downloadSchema);