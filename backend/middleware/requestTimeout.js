/**
 * Request Timeout Protection
 * ----------------------------
 * Terminates slow-client (slowloris) attacks safely.
 */

/**
 * Configure HTTP server timeouts.
 * Call after httpServer is created.
 * @param {import('http').Server} httpServer
 */
export function configureServerTimeouts(httpServer) {
  // Time allowed for the client to send the full request headers
  httpServer.headersTimeout = 10000; // 10 seconds

  // Keep-alive timeout — how long to keep idle connections open
  httpServer.keepAliveTimeout = 65000; // 65 seconds (> typical LB timeout of 60s)

  // Maximum time to receive the complete request
  httpServer.requestTimeout = 30000; // 30 seconds

  // Overall socket timeout (fallback)
  httpServer.timeout = 120000; // 2 minutes
}

/**
 * Express middleware: enforce per-request processing timeout.
 * @param {number} [timeoutMs=30000] - Maximum processing time in ms
 */
export function requestTimeoutMiddleware(timeoutMs = 30000) {
  return (req, res, next) => {
    const timer = setTimeout(() => {
      if (!res.headersSent) {
        res.status(408).json({ success: false, error: 'Request timeout' });
      }
    }, timeoutMs);

    // Clear timeout when response finishes
    res.on('finish', () => clearTimeout(timer));
    res.on('close', () => clearTimeout(timer));

    next();
  };
}
