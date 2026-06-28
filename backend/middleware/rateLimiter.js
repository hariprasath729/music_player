/**
 * Tiered Rate Limiting
 * ---------------------
 * Different limits for different endpoint categories.
 * Returns proper 429 with Retry-After header.
 */

import rateLimit from 'express-rate-limit';
import { securityEvent, SECURITY_EVENTS, getClientIP } from '../utils/logger.js';

function createLimiter(options) {
  const { name, ...rateLimitOptions } = options;
  return rateLimit({
    standardHeaders: true,  // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false,   // Disable `X-RateLimit-*` headers
    keyGenerator: rateLimitOptions.keyGenerator || ((req) => getClientIP(req)),
    handler: (req, res) => {
      securityEvent(SECURITY_EVENTS.RATE_LIMIT, req, {
        details: `Rate limit exceeded: ${name || 'unknown'}`,
      });
      res.status(429).json({
        success: false,
        error: 'Too many requests. Please try again later.',
      });
    },
    ...rateLimitOptions,
  });
}

// ── Auth Strict: login, register, OTP, forgot-password ──
export const authStrictLimiter = createLimiter({
  name: 'auth-strict',
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many authentication attempts. Please try again in 15 minutes.',
});

// ── Auth Sensitive: magic-login, reset-password, verify-token ──
export const authSensitiveLimiter = createLimiter({
  name: 'auth-sensitive',
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
});

// ── User Writes: playlist create, like, follow, download ──
export const userWriteLimiter = createLimiter({
  name: 'user-write',
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  keyGenerator: (req) => req.user?.id || getClientIP(req),
});

// ── User Reads: library, home, recently-played ──
export const userReadLimiter = createLimiter({
  name: 'user-read',
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  keyGenerator: (req) => req.user?.id || getClientIP(req),
});

// ── Public APIs: search, genres, artists, play count reads ──
export const publicLimiter = createLimiter({
  name: 'public',
  windowMs: 60 * 1000, // 1 minute
  max: 100,
});

// ── Global Fallback ──
export const globalLimiter = createLimiter({
  name: 'global',
  windowMs: 60 * 1000, // 1 minute
  max: 200,
});

// ── Contact / Admin Messages (prevent spam) ──
export const contactLimiter = createLimiter({
  name: 'contact',
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
});
