/**
 * Input Validation Middleware
 * ----------------------------
 * Reusable validators for request body, query, and route params.
 * Uses the 'validator' library for email/URL checks.
 */

import validatorLib from 'validator';
import mongoose from 'mongoose';
import { securityEvent, SECURITY_EVENTS } from '../utils/logger.js';
import { sanitizeString } from '../utils/sanitizeHtml.js';

// ── ObjectId Validator ──
export function validateObjectId(...paramNames) {
  return (req, res, next) => {
    for (const param of paramNames) {
      const value = req.params[param];
      if (value && !mongoose.Types.ObjectId.isValid(value)) {
        securityEvent(SECURITY_EVENTS.INVALID_INPUT, req, {
          details: `Invalid ObjectId for ${param}: ${String(value).substring(0, 50)}`,
        });
        return res.status(400).json({ success: false, error: 'Invalid request' });
      }
    }
    next();
  };
}

// ── Schema-based Body Validator ──

/**
 * @typedef {object} FieldSchema
 * @property {boolean} [required]
 * @property {'string'|'number'|'boolean'|'email'|'url'|'array'} type
 * @property {number} [minLength]
 * @property {number} [maxLength]
 * @property {number} [min]
 * @property {number} [max]
 * @property {boolean} [sanitize] - Strip HTML from string values
 * @property {RegExp} [pattern]
 */

/**
 * Validate request body against a schema.
 * @param {Object<string, FieldSchema>} schema
 * @param {object} [options]
 * @param {boolean} [options.stripUnknown=true] - Remove fields not in schema
 */
export function validateBody(schema, options = {}) {
  const { stripUnknown = true } = options;

  return (req, res, next) => {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ success: false, error: 'Request body is required' });
    }

    const errors = [];
    const sanitized = {};

    // Check for unexpected fields
    if (stripUnknown) {
      for (const key of Object.keys(req.body)) {
        if (!(key in schema)) {
          // Silently strip unknown properties
          continue;
        }
      }
    }

    for (const [field, rules] of Object.entries(schema)) {
      let value = req.body[field];

      // Required check
      if (rules.required && (value === undefined || value === null || value === '')) {
        errors.push(`${field} is required`);
        continue;
      }

      if (value === undefined || value === null) {
        continue; // Optional field not provided
      }

      // Type checks
      switch (rules.type) {
        case 'string':
          if (typeof value !== 'string') {
            errors.push(`${field} must be a string`);
            continue;
          }
          value = value.trim();
          if (rules.sanitize) value = sanitizeString(value, rules.maxLength || 500);
          if (rules.minLength && value.length < rules.minLength) {
            errors.push(`${field} must be at least ${rules.minLength} characters`);
          }
          if (rules.maxLength && value.length > rules.maxLength) {
            errors.push(`${field} must be at most ${rules.maxLength} characters`);
          }
          if (rules.pattern && !rules.pattern.test(value)) {
            errors.push(`${field} format is invalid`);
          }
          break;

        case 'email':
          if (typeof value !== 'string' || !validatorLib.isEmail(value)) {
            errors.push(`${field} must be a valid email address`);
            continue;
          }
          value = validatorLib.normalizeEmail(value);
          break;

        case 'url':
          if (typeof value !== 'string' || !validatorLib.isURL(value, { protocols: ['http', 'https'] })) {
            errors.push(`${field} must be a valid URL`);
          }
          break;

        case 'number':
          if (typeof value !== 'number' || isNaN(value)) {
            errors.push(`${field} must be a number`);
            continue;
          }
          if (rules.min !== undefined && value < rules.min) errors.push(`${field} must be at least ${rules.min}`);
          if (rules.max !== undefined && value > rules.max) errors.push(`${field} must be at most ${rules.max}`);
          break;

        case 'boolean':
          if (typeof value !== 'boolean') {
            errors.push(`${field} must be a boolean`);
          }
          break;

        case 'array':
          if (!Array.isArray(value)) {
            errors.push(`${field} must be an array`);
            continue;
          }
          if (rules.maxLength && value.length > rules.maxLength) {
            errors.push(`${field} must have at most ${rules.maxLength} items`);
          }
          break;
      }

      sanitized[field] = value;
    }

    if (errors.length > 0) {
      securityEvent(SECURITY_EVENTS.INVALID_INPUT, req, { details: errors.join(', ') });
      return res.status(400).json({ success: false, error: 'Validation failed' });
    }

    // Replace body with sanitized version (only known fields)
    if (stripUnknown) {
      req.body = sanitized;
    }
    next();
  };
}

/**
 * Validate query parameters.
 * @param {Object<string, FieldSchema>} schema
 */
export function validateQuery(schema) {
  return (req, res, next) => {
    for (const [field, rules] of Object.entries(schema)) {
      let value = req.query[field];
      if (value === undefined) {
        if (rules.required) {
          return res.status(400).json({ success: false, error: 'Validation failed' });
        }
        continue;
      }

      if (rules.type === 'string') {
        if (typeof value !== 'string') {
          return res.status(400).json({ success: false, error: 'Validation failed' });
        }
        if (rules.maxLength && value.length > rules.maxLength) {
          req.query[field] = value.substring(0, rules.maxLength);
        }
        if (rules.sanitize) {
          req.query[field] = sanitizeString(value, rules.maxLength || 200);
        }
      }
    }
    next();
  };
}

// ── Pre-built Validation Schemas ──

export const schemas = {
  login: {
    email: { required: true, type: 'email' },
    password: { required: true, type: 'string', minLength: 1, maxLength: 128 },
  },
  sendOtp: {
    email: { required: true, type: 'email' },
  },
  verifyOtp: {
    email: { required: true, type: 'email' },
    otp: { required: true, type: 'string', minLength: 6, maxLength: 6, pattern: /^\d{6}$/ },
    name: { required: false, type: 'string', minLength: 2, maxLength: 50, sanitize: true },
    password: { required: false, type: 'string', minLength: 6, maxLength: 128 },
  },
  googleLogin: {
    credential: { required: true, type: 'string', minLength: 1, maxLength: 5000 },
  },
  forgotPassword: {
    email: { required: true, type: 'email' },
  },
  resetPassword: {
    token: { required: true, type: 'string', minLength: 1, maxLength: 256 },
    newPassword: { required: true, type: 'string', minLength: 6, maxLength: 128 },
  },
  contactAdmin: {
    email: { required: true, type: 'email' },
    name: { required: false, type: 'string', minLength: 2, maxLength: 100, sanitize: true },
    message: { required: true, type: 'string', minLength: 1, maxLength: 2000, sanitize: true },
  },
  requestSong: {
    songs: { required: true, type: 'array', maxLength: 20 },
  },
  createPlaylist: {
    name: { required: true, type: 'string', minLength: 1, maxLength: 100, sanitize: true },
  },
  songId: {
    songId: { required: true, type: 'string', minLength: 1, maxLength: 100 },
  },
  playlistSong: {
    playlistId: { required: true, type: 'string', minLength: 1, maxLength: 100 },
    songId: { required: true, type: 'string', minLength: 1, maxLength: 100 },
  },
  profileUpdate: {
    name: { required: false, type: 'string', minLength: 2, maxLength: 50, sanitize: true },
    profilePic: { required: false, type: 'url' },
  },
  artistToggle: {
    artistName: { required: true, type: 'string', minLength: 1, maxLength: 200, sanitize: true },
  },
  albumToggle: {
    albumName: { required: true, type: 'string', minLength: 1, maxLength: 200, sanitize: true },
  },
  searchQuery: {
    q: { required: false, type: 'string', maxLength: 200, sanitize: true },
  },
};

// ── Password Strength Validator ──
export function validatePasswordStrength(password) {
  if (typeof password !== 'string') return false;
  if (password.length < 6) return false;
  if (password.length > 128) return false;
  return true;
}
