/**
 * Input Sanitization Middleware
 * ------------------------------
 * Prevents NoSQL injection, prototype pollution, and XSS.
 */

import mongoSanitize from 'express-mongo-sanitize';
import { securityEvent, SECURITY_EVENTS } from '../utils/logger.js';

// ── MongoDB Sanitization ──
export function mongoSanitizeMiddleware() {
  return mongoSanitize({
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
      securityEvent(SECURITY_EVENTS.NOSQL_INJECTION, req, {
        details: `NoSQL injection attempt blocked in ${key}`,
      });
    },
  });
}

// ── Prototype Pollution Protection ──
const DANGEROUS_KEYS = ['__proto__', 'constructor', 'prototype'];

function checkForPollution(obj, path = '') {
  if (obj === null || typeof obj !== 'object') return false;
  for (const key of Object.keys(obj)) {
    if (DANGEROUS_KEYS.includes(key)) return true;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (checkForPollution(obj[key], `${path}.${key}`)) return true;
    }
  }
  return false;
}

export function prototypePollutionGuard() {
  return (req, res, next) => {
    const targets = [req.body, req.query, req.params];
    for (const target of targets) {
      if (target && checkForPollution(target)) {
        securityEvent(SECURITY_EVENTS.PROTOTYPE_POLLUTION, req, {
          details: 'Prototype pollution attempt blocked',
        });
        return res.status(400).json({ success: false, error: 'Invalid request' });
      }
    }
    next();
  };
}

// ── XSS / Injection Pattern Detection ──
const SUSPICIOUS_PATTERNS = [
  /<script\b[^>]*>/i,
  /javascript\s*:/i,
  /on\w+\s*=\s*["']/i,      // onclick="...", onerror='...'
  /\beval\s*\(/i,
  /\bFunction\s*\(/i,
  /document\s*\.\s*(cookie|location|write)/i,
  /window\s*\.\s*location/i,
  /data\s*:\s*text\/html/i,
  /vbscript\s*:/i,
];

function containsXSS(value) {
  if (typeof value !== 'string') return false;
  return SUSPICIOUS_PATTERNS.some((p) => p.test(value));
}

function scanForXSS(obj) {
  if (typeof obj === 'string') return containsXSS(obj);
  if (obj === null || typeof obj !== 'object') return false;
  for (const val of Object.values(obj)) {
    if (scanForXSS(val)) return true;
  }
  return false;
}

export function xssGuard() {
  return (req, res, next) => {
    if (scanForXSS(req.body) || scanForXSS(req.query)) {
      securityEvent(SECURITY_EVENTS.XSS_ATTEMPT, req, {
        details: 'XSS attempt blocked',
      });
      return res.status(400).json({ success: false, error: 'Invalid request' });
    }
    next();
  };
}
