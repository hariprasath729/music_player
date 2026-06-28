/**
 * Download & Streaming Abuse Protection
 * ----------------------------------------
 * Per-user and per-IP download rate limiting.
 * Prevents automated scraping and bandwidth abuse.
 */

import { securityEvent, SECURITY_EVENTS, getClientIP } from '../utils/logger.js';

// In-memory stores
const userDownloads = new Map();  // userId -> { count, windowStart }
const ipDownloads = new Map();    // IP -> { count, windowStart }

const MAX_DOWNLOADS_PER_HOUR = parseInt(process.env.MAX_DOWNLOADS_PER_HOUR) || 50;
const MAX_DOWNLOADS_PER_IP_HOUR = parseInt(process.env.MAX_DOWNLOADS_PER_IP_HOUR) || 100;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour window

// Cleanup every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of userDownloads.entries()) {
    if (now - data.windowStart > WINDOW_MS * 2) userDownloads.delete(key);
  }
  for (const [key, data] of ipDownloads.entries()) {
    if (now - data.windowStart > WINDOW_MS * 2) ipDownloads.delete(key);
  }
}, 30 * 60 * 1000);

function checkAndIncrement(store, key, maxCount) {
  const now = Date.now();
  let data = store.get(key);

  if (!data || now - data.windowStart > WINDOW_MS) {
    data = { count: 0, windowStart: now };
  }

  data.count++;
  store.set(key, data);

  return data.count <= maxCount;
}

/**
 * Middleware: Protect download/stream endpoints from abuse.
 */
export function downloadProtection() {
  return (req, res, next) => {
    const userId = req.user?.id;
    const ip = getClientIP(req);

    // Per-user check
    if (userId) {
      if (!checkAndIncrement(userDownloads, userId, MAX_DOWNLOADS_PER_HOUR)) {
        securityEvent(SECURITY_EVENTS.API_ABUSE, req, {
          details: `User download limit exceeded (${MAX_DOWNLOADS_PER_HOUR}/hr)`,
          userId,
        });
        return res.status(429).json({
          success: false,
          error: 'Download limit exceeded. Please try again later.',
        });
      }
    }

    // Per-IP check
    if (!checkAndIncrement(ipDownloads, ip, MAX_DOWNLOADS_PER_IP_HOUR)) {
      securityEvent(SECURITY_EVENTS.API_ABUSE, req, {
        details: `IP download limit exceeded (${MAX_DOWNLOADS_PER_IP_HOUR}/hr)`,
      });
      return res.status(429).json({
        success: false,
        error: 'Download limit exceeded. Please try again later.',
      });
    }

    next();
  };
}
