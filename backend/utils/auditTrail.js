/**
 * User Security Audit Trail
 * --------------------------
 * Records account-level security events to MongoDB.
 * Never stores passwords, tokens, or secrets.
 */

import SecurityAudit from '../models/SecurityAudit.js';
import { getClientIP } from './logger.js';

export const AUDIT_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT',
  OAUTH_LOGIN: 'OAUTH_LOGIN',
  REGISTER: 'REGISTER',
  PASSWORD_CHANGE: 'PASSWORD_CHANGE',
  PASSWORD_RESET_REQUEST: 'PASSWORD_RESET_REQUEST',
  PASSWORD_RESET_COMPLETE: 'PASSWORD_RESET_COMPLETE',
  MAGIC_LOGIN: 'MAGIC_LOGIN',
  PROFILE_UPDATE: 'PROFILE_UPDATE',
  ACCOUNT_DELETION: 'ACCOUNT_DELETION',
  PLAYLIST_DELETION: 'PLAYLIST_DELETION',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  ACCOUNT_UNLOCKED: 'ACCOUNT_UNLOCKED',
};

/**
 * Record a security audit event.
 * @param {object} params
 * @param {string} params.userId - MongoDB user ID
 * @param {string} params.action - One of AUDIT_ACTIONS
 * @param {object} [params.req] - Express request object (for IP/UA extraction)
 * @param {object} [params.metadata] - Additional non-sensitive context
 */
export async function recordAudit({ userId, action, req, metadata = {} }) {
  try {
    // Strip any potentially sensitive fields from metadata
    const safeMeta = { ...metadata };
    delete safeMeta.password;
    delete safeMeta.token;
    delete safeMeta.secret;
    delete safeMeta.otp;
    delete safeMeta.resetToken;

    await SecurityAudit.create({
      userId,
      action,
      ip: req ? getClientIP(req) : metadata.ip || 'unknown',
      userAgent: req?.headers?.['user-agent']?.substring(0, 300) || 'unknown',
      metadata: safeMeta,
    });
  } catch (err) {
    // Audit trail failures should never crash the app
    console.error('[auditTrail] Failed to record audit event:', err.message);
  }
}

/**
 * Get audit history for a user.
 * @param {string} userId
 * @param {object} [options]
 * @param {number} [options.limit=50]
 * @param {number} [options.skip=0]
 * @returns {Promise<Array>}
 */
export async function getUserAuditHistory(userId, { limit = 50, skip = 0 } = {}) {
  try {
    return await SecurityAudit.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Math.min(limit, 100))
      .select('-__v')
      .lean();
  } catch (err) {
    console.error('[auditTrail] Failed to fetch audit history:', err.message);
    return [];
  }
}
