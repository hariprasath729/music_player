/**
 * Automatic IP Blacklisting with Progressive Penalties
 * ------------------------------------------------------
 * Tracks threat scores per IP. Automatically blocks repeat offenders.
 * 
 * Scoring events: brute-force, invalid JWT, injection, XSS, rate-limit violations.
 * Penalties: 1st → 15 min, 2nd → 1 hour, 3rd+ → 24 hours.
 */

import { log, securityEvent, SECURITY_EVENTS } from '../utils/logger.js';

// In-memory store: IP -> { score, offenseCount, blockedUntil, lastEvent }
const ipStore = new Map();

const SCORE_THRESHOLD = 10;  // Score at which IP gets blocked
const SCORE_DECAY_MS = 30 * 60 * 1000; // Scores decay after 30 minutes of inactivity

const PENALTY_DURATIONS = [
  15 * 60 * 1000,       // 1st offense: 15 minutes
  60 * 60 * 1000,       // 2nd offense: 1 hour
  24 * 60 * 60 * 1000,  // 3rd+ offense: 24 hours
];

const SCORE_WEIGHTS = {
  brute_force: 5,
  invalid_jwt: 2,
  nosql_injection: 8,
  xss_attempt: 8,
  prototype_pollution: 8,
  rate_limit: 1,
  suspicious_payload: 4,
  malicious_pattern: 6,
};

// Cleanup stale entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipStore.entries()) {
    if (now - data.lastEvent > 24 * 60 * 60 * 1000) {
      ipStore.delete(ip);
    }
  }
}, 15 * 60 * 1000);

/**
 * Add threat score to an IP.
 * @param {string} ip
 * @param {string} reason - Key from SCORE_WEIGHTS
 * @param {object} [req] - Express request for logging
 */
export function addThreatScore(ip, reason, req = null) {
  if (!ip || ip === 'unknown') return;

  let data = ipStore.get(ip) || { score: 0, offenseCount: 0, blockedUntil: null, lastEvent: Date.now() };

  // Decay old scores
  const elapsed = Date.now() - data.lastEvent;
  if (elapsed > SCORE_DECAY_MS) {
    data.score = Math.max(0, data.score - Math.floor(elapsed / SCORE_DECAY_MS) * 3);
  }

  const weight = SCORE_WEIGHTS[reason] || 1;
  data.score += weight;
  data.lastEvent = Date.now();

  // Check if threshold exceeded
  if (data.score >= SCORE_THRESHOLD && (!data.blockedUntil || Date.now() >= data.blockedUntil)) {
    const penaltyIndex = Math.min(data.offenseCount, PENALTY_DURATIONS.length - 1);
    const duration = PENALTY_DURATIONS[penaltyIndex];
    data.blockedUntil = Date.now() + duration;
    data.offenseCount++;
    data.score = 0; // Reset score after blocking

    const durationStr = duration >= 3600000
      ? `${duration / 3600000} hour(s)`
      : `${duration / 60000} minute(s)`;

    log('security', `IP blacklisted: ${ip} for ${durationStr} (offense #${data.offenseCount})`, {
      ip, reason, event: SECURITY_EVENTS.IP_BLOCKED,
    });
  }

  ipStore.set(ip, data);
}

/**
 * Check if an IP is currently blacklisted.
 * @param {string} ip
 * @returns {{ blocked: boolean, retryAfter?: number }}
 */
export function isIPBlocked(ip) {
  if (!ip || ip === 'unknown') return { blocked: false };

  const data = ipStore.get(ip);
  if (!data || !data.blockedUntil) return { blocked: false };

  if (Date.now() < data.blockedUntil) {
    const retryAfter = Math.ceil((data.blockedUntil - Date.now()) / 1000);
    return { blocked: true, retryAfter };
  }

  return { blocked: false };
}

/**
 * Express middleware: Check IP blacklist before processing requests.
 */
export function ipBlacklistGuard() {
  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
      || req.connection?.remoteAddress
      || req.socket?.remoteAddress
      || 'unknown';

    const { blocked, retryAfter } = isIPBlocked(ip);
    if (blocked) {
      securityEvent(SECURITY_EVENTS.IP_BLOCKED, req, {
        details: 'Request blocked by IP blacklist',
      });
      res.set('Retry-After', String(retryAfter));
      return res.status(403).json({
        success: false,
        error: 'Access denied. Please try again later.',
      });
    }
    next();
  };
}

export { SCORE_WEIGHTS };
