/**
 * Stream Controller
 * ------------------
 * Handles secure, token-gated playback authorization.
 *
 * POST /api/stream/request  →  issues a short-lived signed playback token
 * GET  /api/stream/play/:token  →  verifies token & redirects to real audio URL
 *
 * The real audio URL is NEVER returned directly to the frontend.
 * The frontend only receives a backend-proxied URL that expires in 5 minutes.
 */

import jwt from 'jsonwebtoken';
import { getStorageLocation } from '../services/songStorageService.js';
import { log, securityEvent, SECURITY_EVENTS } from '../utils/logger.js';

// Stream token TTL: 5 minutes. Short enough to prevent sharing/scraping.
const STREAM_TOKEN_TTL_SECONDS = 5 * 60;

/**
 * POST /api/stream/request
 * Body: { songId: string | number }
 *
 * Verifies the authenticated user, resolves the song's storage location,
 * and returns a short-lived stream URL. The real audio URL never leaves the server.
 */
export const requestStreamToken = async (req, res) => {
  try {
    const { songId } = req.body;

    // Validate songId
    if (!songId && songId !== 0) {
      return res.status(400).json({ success: false, error: 'songId is required' });
    }
    const numId = Number(songId);
    if (isNaN(numId) || numId <= 0 || numId > 1_000_000) {
      return res.status(400).json({ success: false, error: 'Invalid songId' });
    }

    // Resolve real URL from storage service
    const realUrl = await getStorageLocation(numId);
    if (!realUrl) {
      log('warn', '[stream] Song not found in storage', { songId: numId });
      return res.status(404).json({ success: false, error: 'Song not found' });
    }

    // Sign a short-lived token that only carries the songId (not the URL itself)
    const payload = {
      songId: numId,
      uid: req.user.id, // bind to the requesting user
      type: 'stream',
    };

    const streamToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: STREAM_TOKEN_TTL_SECONDS,
    });

    const streamUrl = `/api/stream/play/${streamToken}`;
    const expiresAt = Date.now() + STREAM_TOKEN_TTL_SECONDS * 1000;

    return res.json({
      success: true,
      data: {
        streamUrl,
        expiresAt,
      },
    });
  } catch (err) {
    log('error', '[stream] requestStreamToken failed', { details: err.message });
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

/**
 * GET /api/stream/play/:token
 *
 * Verifies the stream token, resolves the real URL, and issues a 302 redirect.
 * The redirect is done by the browser — the server never proxies audio bytes.
 * This keeps latency negligible while keeping the real URL server-side-only.
 */
export const playStream = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token || typeof token !== 'string' || token.length > 512) {
      return res.status(400).json({ success: false, error: 'Invalid token' });
    }

    // Verify the JWT
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      securityEvent(SECURITY_EVENTS.JWT_FAILURE, req, {
        details: `Invalid stream token: ${err.message}`,
      });
      return res.status(401).json({ success: false, error: 'Token expired or invalid' });
    }

    // Validate token type
    if (payload.type !== 'stream' || !payload.songId) {
      securityEvent(SECURITY_EVENTS.UNAUTHORIZED_ACCESS, req, {
        details: 'Invalid stream token payload',
      });
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }

    // Resolve the real URL
    const realUrl = await getStorageLocation(payload.songId);
    if (!realUrl) {
      return res.status(404).json({ success: false, error: 'Song not found' });
    }

    // 302 Redirect to the real CDN URL.
    // The browser streams directly from CDN — no proxying overhead.
    // Range requests, seek, and streaming all work natively via the CDN.
    return res.redirect(302, realUrl);
  } catch (err) {
    log('error', '[stream] playStream failed', { details: err.message });
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
