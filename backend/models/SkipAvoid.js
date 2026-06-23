import mongoose from 'mongoose';

const SkipAvoidSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    songId: { type: String, required: true, index: true },
    skippedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: false }
);

// Prevent duplicates per user/song only with our “recent window” logic (optional)
// We intentionally don't enforce strict unique constraint, because we want expiration behavior.
SkipAvoidSchema.index({ userId: 1, songId: 1, skippedAt: -1 });

export default mongoose.model('SkipAvoid', SkipAvoidSchema);
