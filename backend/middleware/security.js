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
    'https://music-player-hp.vercel.app',
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

// Check if origin is a local network IP (e.g. 192.168.x.x, 10.x.x.x, 172.16-31.x.x, localhost)
function isLocalNetworkOrigin(origin) {
  if (!origin) return true;
  try {
    const url = new URL(origin);
    const hostname = url.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') return true;
    if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true;
    if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true;
    if (/^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true;
  } catch {
    return false;
  }
  return false;
}

// ── CORS Configuration ──
export function corsMiddleware() {
  const allowedOrigins = getAllowedOrigins();

  return (req, res, next) => {
    // Support Chrome Private Network Access (PNA) for local device interaction
    if (req.headers['access-control-request-private-network']) {
      res.setHeader('Access-Control-Allow-Private-Network', 'true');
    }

    const corsHandler = cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, server-to-server) or local network origins
        if (!origin || allowedOrigins.includes(origin) || isLocalNetworkOrigin(origin)) {
          return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'), false);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID', 'X-CSRF-Token', 'Access-Control-Request-Private-Network'],
      exposedHeaders: ['X-Request-ID', 'Retry-After', 'X-RateLimit-Remaining'],
      maxAge: 86400, // 24 hours preflight cache
    });

    corsHandler(req, res, next);
  };
}

/**
 * Get CORS options object for Socket.IO (needs origin list, not middleware).
 */
export function getSocketCorsOptions() {
  return {
    origin: (origin, callback) => {
      const allowedOrigins = getAllowedOrigins();
      if (!origin || allowedOrigins.includes(origin) || isLocalNetworkOrigin(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by Socket CORS'), false);
    },
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
