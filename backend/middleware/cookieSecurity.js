/**
 * Cookie Security Infrastructure (Future-Ready)
 * ------------------------------------------------
 * Prepared for migration from localStorage JWT to HttpOnly cookie auth.
 * Currently dormant — activated via COOKIE_AUTH_ENABLED env var.
 */

import crypto from 'crypto';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
};

/**
 * Set a secure auth cookie.
 * @param {import('express').Response} res
 * @param {string} name
 * @param {string} value
 * @param {number} [maxAgeMs=7*24*60*60*1000] - Default 7 days
 */
export function setSecureCookie(res, name, value, maxAgeMs = 7 * 24 * 60 * 60 * 1000) {
  res.cookie(name, value, {
    ...COOKIE_OPTIONS,
    maxAge: maxAgeMs,
  });
}

/**
 * Clear a secure cookie.
 * @param {import('express').Response} res
 * @param {string} name
 */
export function clearSecureCookie(res, name) {
  res.clearCookie(name, COOKIE_OPTIONS);
}

/**
 * Set a refresh token cookie (longer-lived).
 * @param {import('express').Response} res
 * @param {string} refreshToken
 */
export function setRefreshTokenCookie(res, refreshToken) {
  setSecureCookie(res, 'refresh_token', refreshToken, 30 * 24 * 60 * 60 * 1000); // 30 days
}

/**
 * Generate a CSRF token.
 * @returns {string}
 */
export function generateCsrfToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * CSRF protection middleware (dormant — activated when cookie auth is enabled).
 */
export function csrfProtection() {
  return (req, res, next) => {
    // Only active when cookie-based auth is enabled
    if (process.env.COOKIE_AUTH_ENABLED !== 'true') {
      return next();
    }

    // Skip for safe methods
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      return next();
    }

    const csrfToken = req.headers['x-csrf-token'] || req.body?._csrf;
    const sessionToken = req.cookies?.csrf_token;

    if (!csrfToken || !sessionToken || csrfToken !== sessionToken) {
      return res.status(403).json({ success: false, error: 'Invalid CSRF token' });
    }

    next();
  };
}

/**
 * Cookie rotation: set new cookie with extended expiry.
 * @param {import('express').Response} res
 * @param {string} name
 * @param {string} value
 * @param {number} maxAgeMs
 */
export function rotateCookie(res, name, value, maxAgeMs) {
  clearSecureCookie(res, name);
  setSecureCookie(res, name, value, maxAgeMs);
}
