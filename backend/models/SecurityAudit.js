import mongoose from 'mongoose';

const securityAuditSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  action: {
    type: String,
    required: true,
    enum: [
      'LOGIN', 'LOGIN_FAILED', 'LOGOUT', 'OAUTH_LOGIN', 'REGISTER',
      'PASSWORD_CHANGE', 'PASSWORD_RESET_REQUEST', 'PASSWORD_RESET_COMPLETE',
      'MAGIC_LOGIN', 'PROFILE_UPDATE', 'ACCOUNT_DELETION', 'PLAYLIST_DELETION',
      'ACCOUNT_LOCKED', 'ACCOUNT_UNLOCKED',
    ],
    index: true,
  },
  ip: { type: String, default: 'unknown' },
  userAgent: { type: String, default: 'unknown' },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 90 * 24 * 60 * 60, // Auto-delete after 90 days
  },
});

// Compound index for efficient user-specific queries
securityAuditSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('SecurityAudit', securityAuditSchema);
