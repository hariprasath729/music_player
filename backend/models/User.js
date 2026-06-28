import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional since Google users won't have one
  profilePic: { type: String },
  isVerified: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  authType: { type: String, enum: ['email', 'google'], default: 'email' },

  // Password reset + magic-login token (one-time use)
  // Note: Token may be stored hashed; keep expiry to enforce 15-minute validity.
  resetToken: { type: String, default: null },
  resetTokenExpiry: { type: Date, default: null },

  // Token version — incremented on password change to invalidate existing JWTs
  tokenVersion: { type: Number, default: 0 },

  // Brute-force tracking (persisted for cross-restart protection)
  failedLoginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date, default: null },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
