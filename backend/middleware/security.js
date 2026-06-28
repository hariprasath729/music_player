/**
 * Core Security Middleware
 * -------------------------
 * Helmet, CORS whitelist, payload limits, HPP, request ID, HTTPS redirect,
 * enhanced security headers (COOP, CORP).
 */

import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import crypto from 'crypto';

// ── Allowed Origins ──
function getAllowedOrigins() {
  const defaults = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5000',
    'https://music-player-psi-sepia.vercel.app',
    'https://music-player-z1db.onrender.com',
  ];

  const envOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(Boolean)
    : [];

  const frontendUrl = process.env.FRONTEND_URL;
  if (frontendUrl && !defaults.includes(frontendUrl) && !envOrigins.includes(frontendUrl)) {
    envOrigins.push(frontendUrl);
  }

  return [...new Set([...defaults, ...envOrigins])];
}

// ── Helmet Configuration ──
export function helmetMiddleware() {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for email template responses
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'", 'https:'],
        frameSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
      },
    },
    crossOriginOpenerPolicy: { policy: 'same-origin' },
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow cross-origin resource loading for API
    crossOriginEmbedderPolicy: false, // Disabled — can break cross-origin audio/image loading
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    xContentTypeOptions: true,  // nosniff
    xFrameOptions: { action: 'deny' },
    xPoweredBy: false, // Remove X-Powered-By
    permissionsPolicy: {
      features: {
        camera: [],
        microphone: [],
        geolocation: [],
        payment: [],
      },
    },
  });
}

// ── CORS Configuration ──
export function corsMiddleware() {
  const allowedOrigins = getAllowedOrigins();

  return cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID', 'X-CSRF-Token'],
    exposedHeaders: ['X-Request-ID', 'Retry-After', 'X-RateLimit-Remaining'],
    maxAge: 86400, // 24 hours preflight cache
  });
}

/**
 * Get CORS options object for Socket.IO (needs origin list, not middleware).
 */
export function getSocketCorsOptions() {
  return {
    origin: getAllowedOrigins(),
    methods: ['GET', 'POST'],
    credentials: true,
  };
}

// ── HPP Middleware ──
export function hppMiddleware() {
  return hpp();
}

// ── Request ID Middleware ──
export function requestIdMiddleware() {
  return (req, res, next) => {
    req.requestId = req.headers['x-request-id'] || crypto.randomUUID();
    res.setHeader('X-Request-ID', req.requestId);
    next();
  };
}

// ── HTTPS Redirect (Production Only) ──
export function httpsRedirect() {
  return (req, res, next) => {
    if (
      process.env.NODE_ENV === 'production' &&
      req.headers['x-forwarded-proto'] &&
      req.headers['x-forwarded-proto'] !== 'https'
    ) {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  };
}

export { getAllowedOrigins };
