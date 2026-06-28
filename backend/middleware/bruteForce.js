/**
 * Brute-Force Protection & Account Lockout
 * ------------------------------------------
 * Tracks failed login attempts per email with progressive lockout.
 * In-memory store with automatic TTL cleanup.
 */

import { securityEvent, SECURITY_EVENTS } from '../utils/logger.js';

// In-memory store: email -> { attempts, lockUntil, lastAttempt }
const attempts = new Map();

// Cleanup stale entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [email, data] of attempts.entries()) {
    // Remove entries that haven't been touched in 2 hours
    if (now - data.lastAttempt > 2 * 60 * 60 * 1000) {
      attempts.delete(email);
    }
  }
}, 10 * 60 * 1000);

const LOCKOUT_THRESHOLDS = [
  { maxAttempts: 5, lockDurationMs: 15 * 60 * 1000 },  // 5 attempts → 15 min lock
  { maxAttempts: 10, lockDurationMs: 60 * 60 * 1000 },   // 10 attempts → 1 hour lock
  { maxAttempts: 20, lockDurationMs: 24 * 60 * 60 * 1000 }, // 20 attempts → 24 hour lock
];

/**
 * Check if an email is currently locked out.
 * @param {string} email
 * @returns {{ locked: boolean, retryAfter?: number }}
 */
export function isAccountLocked(email) {
  const normalized = email?.toLowerCase?.();
  if (!normalized) return { locked: false };

  const data = attempts.get(normalized);
  if (!data || !data.lockUntil) return { locked: false };

  if (Date.now() < data.lockUntil) {
    const retryAfter = Math.ceil((data.lockUntil - Date.now()) / 1000);
    return { locked: true, retryAfter };
  }

  // Lock expired but keep attempt count for progressive lockout
  return { locked: false };
}

/**
 * Record a failed login attempt.
 * @param {string} email
 * @param {object} req - Express request
 */
export function recordFailedAttempt(email, req) {
  const normalized = email?.toLowerCase?.();
  if (!normalized) return;

  let data = attempts.get(normalized) || { attempts: 0, lockUntil: null, lastAttempt: 0 };
  data.attempts++;
  data.lastAttempt = Date.now();

  // Find the appropriate lockout threshold
  for (let i = LOCKOUT_THRESHOLDS.length - 1; i >= 0; i--) {
    const threshold = LOCKOUT_THRESHOLDS[i];
    if (data.attempts >= threshold.maxAttempts) {
      data.lockUntil = Date.now() + threshold.lockDurationMs;
      securityEvent(SECURITY_EVENTS.ACCOUNT_LOCKED, req, {
        details: `Account locked after ${data.attempts} failed attempts`,
        userId: normalized,
      });
      break;
    }
  }

  if (data.attempts < LOCKOUT_THRESHOLDS[0].maxAttempts) {
    securityEvent(SECURITY_EVENTS.AUTH_FAILURE, req, {
      details: `Failed login attempt ${data.attempts}/${LOCKOUT_THRESHOLDS[0].maxAttempts}`,
    });
  }

  attempts.set(normalized, data);
}

/**
 * Reset failed attempts on successful login.
 * @param {string} email
 */
export function resetAttempts(email) {
  const normalized = email?.toLowerCase?.();
  if (normalized) attempts.delete(normalized);
}

/**
 * Express middleware that checks brute-force lockout before processing login.
 */
export function bruteForceGuard() {
  return (req, res, next) => {
    const email = req.body?.email;
    if (!email) return next();

    const { locked, retryAfter } = isAccountLocked(email);
    if (locked) {
      securityEvent(SECURITY_EVENTS.BRUTE_FORCE, req, {
        details: `Blocked login attempt for locked account`,
      });
      res.set('Retry-After', String(retryAfter));
      return res.status(429).json({
        success: false,
        error: 'Too many failed login attempts. Please try again later.',
      });
    }
    next();
  };
}
