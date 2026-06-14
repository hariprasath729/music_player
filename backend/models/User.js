import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional since Google users won't have one
  profilePic: { type: String },
  isVerified: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  authType: { type: String, enum: ['email', 'google'], default: 'email' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);