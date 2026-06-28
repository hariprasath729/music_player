/**
 * Structured Security Logger & Audit Dashboard
 * ----------------------------------------------
 * JSON-formatted logs for monitoring integration.
 * Tracks security events with in-memory counters.
 * 
 * NEVER logs: passwords, tokens, secrets, full request bodies.
 */

const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3, security: 4 };

const SECURITY_EVENTS = {
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  OAUTH_LOGIN: 'OAUTH_LOGIN',
  PASSWORD_RESET: 'PASSWORD_RESET',
  MAGIC_LOGIN: 'MAGIC_LOGIN',
  JWT_FAILURE: 'JWT_FAILURE',
  RATE_LIMIT: 'RATE_LIMIT',
  IP_BLOCKED: 'IP_BLOCKED',
  SUSPICIOUS_PAYLOAD: 'SUSPICIOUS_PAYLOAD',
  UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
  API_ABUSE: 'API_ABUSE',
  BRUTE_FORCE: 'BRUTE_FORCE',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  INVALID_INPUT: 'INVALID_INPUT',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  NOSQL_INJECTION: 'NOSQL_INJECTION',
  XSS_ATTEMPT: 'XSS_ATTEMPT',
  PROTOTYPE_POLLUTION: 'PROTOTYPE_POLLUTION',
};

// ── In-memory security metrics (audit dashboard) ──
const metrics = {
  successfulLogins: 0,
  failedLogins: 0,
  oauthLogins: 0,
  passwordResets: 0,
  magicLinkLogins: 0,
  jwtFailures: 0,
  rateLimitViolations: 0,
  blockedRequests: 0,
  suspiciousPayloads: 0,
  unauthorizedAccess: 0,
  apiAbuse: 0,
  startTime: Date.now(),
  topOffendingIPs: new Map(), // IP -> count
};

function incrementIPCounter(ip) {
  if (!ip) return;
  const current = metrics.topOffendingIPs.get(ip) || 0;
  metrics.topOffendingIPs.set(ip, current + 1);
  // Keep map bounded to top 100
  if (metrics.topOffendingIPs.size > 100) {
    const entries = [...metrics.topOffendingIPs.entries()].sort((a, b) => b[1] - a[1]).slice(0, 50);
    metrics.topOffendingIPs = new Map(entries);
  }
}

function updateMetrics(event, ip) {
  switch (event) {
    case SECURITY_EVENTS.AUTH_SUCCESS: metrics.successfulLogins++; break;
    case SECURITY_EVENTS.AUTH_FAILURE: metrics.failedLogins++; incrementIPCounter(ip); break;
    case SECURITY_EVENTS.OAUTH_LOGIN: metrics.oauthLogins++; break;
    case SECURITY_EVENTS.PASSWORD_RESET: metrics.passwordResets++; break;
    case SECURITY_EVENTS.MAGIC_LOGIN: metrics.magicLinkLogins++; break;
    case SECURITY_EVENTS.JWT_FAILURE: metrics.jwtFailures++; incrementIPCounter(ip); break;
    case SECURITY_EVENTS.RATE_LIMIT: metrics.rateLimitViolations++; incrementIPCounter(ip); break;
    case SECURITY_EVENTS.IP_BLOCKED: metrics.blockedRequests++; incrementIPCounter(ip); break;
    case SECURITY_EVENTS.SUSPICIOUS_PAYLOAD: metrics.suspiciousPayloads++; incrementIPCounter(ip); break;
    case SECURITY_EVENTS.UNAUTHORIZED_ACCESS: metrics.unauthorizedAccess++; incrementIPCounter(ip); break;
    case SECURITY_EVENTS.API_ABUSE: metrics.apiAbuse++; incrementIPCounter(ip); break;
    case SECURITY_EVENTS.BRUTE_FORCE: metrics.failedLogins++; incrementIPCounter(ip); break;
    case SECURITY_EVENTS.NOSQL_INJECTION: metrics.suspiciousPayloads++; incrementIPCounter(ip); break;
    case SECURITY_EVENTS.XSS_ATTEMPT: metrics.suspiciousPayloads++; incrementIPCounter(ip); break;
    case SECURITY_EVENTS.PROTOTYPE_POLLUTION: metrics.suspiciousPayloads++; incrementIPCounter(ip); break;
  }
}

function getClientIP(req) {
  if (!req) return 'unknown';
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.connection?.remoteAddress
    || req.socket?.remoteAddress
    || 'unknown';
}

/**
 * Create a structured log entry.
 * @param {'debug'|'info'|'warn'|'error'|'security'} level
 * @param {string} message
 * @param {object} [context]
 */
function log(level, message, context = {}) {
  const minLevel = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug');
  if (LOG_LEVELS[level] < LOG_LEVELS[minLevel]) return;

  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(context.requestId && { requestId: context.requestId }),
    ...(context.ip && { ip: context.ip }),
    ...(context.userId && { userId: context.userId }),
    ...(context.userAgent && { userAgent: context.userAgent }),
    ...(context.event && { event: context.event }),
    ...(context.method && { method: context.method }),
    ...(context.path && { path: context.path }),
    ...(context.statusCode && { statusCode: context.statusCode }),
    ...(context.details && { details: context.details }),
    ...(context.duration && { duration: context.duration }),
  };

  // Use structured JSON in production, readable in dev
  if (process.env.NODE_ENV === 'production') {
    console[level === 'error' || level === 'security' ? 'error' : level === 'warn' ? 'warn' : 'log'](
      JSON.stringify(entry)
    );
  } else {
    const prefix = level === 'security' ? '🛡️' : level === 'error' ? '❌' : level === 'warn' ? '⚠️' : 'ℹ️';
    console[level === 'error' || level === 'security' ? 'error' : level === 'warn' ? 'warn' : 'log'](
      `${prefix} [${level.toUpperCase()}] ${message}`,
      Object.keys(context).length > 0 ? context : ''
    );
  }
}

/**
 * Log a security event.
 * @param {string} event - One of SECURITY_EVENTS
 * @param {object} req - Express request (or null)
 * @param {object} [extra] - Additional non-sensitive context
 */
function securityEvent(event, req, extra = {}) {
  const ip = req ? getClientIP(req) : extra.ip || 'unknown';
  updateMetrics(event, ip);

  log('security', `Security event: ${event}`, {
    event,
    ip,
    requestId: req?.requestId,
    userId: req?.user?.id || extra.userId,
    userAgent: req?.headers?.['user-agent']?.substring(0, 200),
    method: req?.method,
    path: req?.originalUrl?.split('?')[0], // strip query params for safety
    ...extra,
  });
}

/**
 * Get current security metrics snapshot.
 */
function getMetrics() {
  const uptimeSeconds = Math.floor((Date.now() - metrics.startTime) / 1000);
  const topIPs = [...metrics.topOffendingIPs.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([ip, count]) => ({ ip, count }));

  return {
    uptime: uptimeSeconds,
    successfulLogins: metrics.successfulLogins,
    failedLogins: metrics.failedLogins,
    oauthLogins: metrics.oauthLogins,
    passwordResets: metrics.passwordResets,
    magicLinkLogins: metrics.magicLinkLogins,
    jwtFailures: metrics.jwtFailures,
    rateLimitViolations: metrics.rateLimitViolations,
    blockedRequests: metrics.blockedRequests,
    suspiciousPayloads: metrics.suspiciousPayloads,
    unauthorizedAccess: metrics.unauthorizedAccess,
    apiAbuse: metrics.apiAbuse,
    topOffendingIPs: topIPs,
  };
}

// Periodic metrics summary (every 5 minutes in production)
if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    const m = getMetrics();
    log('info', 'Security metrics summary', { details: m });
  }, 5 * 60 * 1000);
}

export { log, securityEvent, getMetrics, getClientIP, SECURITY_EVENTS };
