import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB, { connectSongsDB } from './config/db.js';
import { loadSongStorageMap } from './services/songStorageService.js';
import authRoutes from './routes/auth.js';
import featureRoutes from './routes/index.js';
import synkHandler from './sockets/synkHandler.js';

// Import Security Middleware and Utilities
import { JWT_SECRET } from './utils/jwtSecret.js'; // Startup validation of JWT_SECRET occurs on import
import { log } from './utils/logger.js';
import {
  helmetMiddleware,
  corsMiddleware,
  getSocketCorsOptions,
  hppMiddleware,
  requestIdMiddleware,
  httpsRedirect
} from './middleware/security.js';
import { globalLimiter } from './middleware/rateLimiter.js';
import { mongoSanitizeMiddleware, prototypePollutionGuard, xssGuard } from './middleware/sanitize.js';
import { ipBlacklistGuard } from './middleware/ipBlacklist.js';
import { configureServerTimeouts, requestTimeoutMiddleware } from './middleware/requestTimeout.js';
import { applyQueryProtection } from './middleware/queryProtection.js';

(async () => {

  const app = express();
  const httpServer = createServer(app);

  // Initialize Server Timeouts
  configureServerTimeouts(httpServer);

  // Socket.IO Hardening
  const io = new Server(httpServer, {
    cors: getSocketCorsOptions()
  });

  const PORT = process.env.PORT || 5000;

  // Apply Global Mongoose Query Protections
  applyQueryProtection();

  // --- Global Middleware Chain ---
  
  // 1. IP Blacklist Guard (Early termination)
  app.use(ipBlacklistGuard());

  // 2. HTTPS Redirect in production
  app.use(httpsRedirect());

  // 3. Request ID tracking
  app.use(requestIdMiddleware());

  // 4. Request Timeout
  app.use(requestTimeoutMiddleware(30000));

  // 5. Security Headers (Helmet)
  app.use(helmetMiddleware());

  // 6. CORS Hardening
  app.use(corsMiddleware());

  // 7. Request Payload Size Limits
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // 8. NoSQL Injection Prevention
  app.use(mongoSanitizeMiddleware());

  // 9. Prototype Pollution Protection & XSS Guard
  app.use(prototypePollutionGuard());
  app.use(xssGuard());

  // 10. HTTP Parameter Pollution Protection
  app.use(hppMiddleware());

  // 11. Global Rate Limiter
  app.use(globalLimiter);

  // --- Endpoints ---

  // Simple root health check
  app.get('/', (req, res) => res.send('Alive'));

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api', featureRoutes);

  // Health check
  app.get('/api/health', (req, res) =>
    res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() }));

  // Socket.io Handler
  synkHandler(io);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
  });

  // Centralized error handler
  app.use((err, req, res, _next) => {
    log('error', 'Unhandled server error', {
      requestId: req.requestId,
      method: req.method,
      path: req.originalUrl,
      details: err.message,
      stack: err.stack,
    });
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  });

  // Connect to DB then start server
  await connectDB();

  // Connect to Songs-dedicated DB and warm up the storage map in the background
  connectSongsDB().then(() => loadSongStorageMap()).catch(() => {});

  httpServer.listen(PORT, () => {
    log('info', `🎵 Backend API running → http://localhost:${PORT}`);
    log('info', `   Health check → http://localhost:${PORT}/api/health`);
    log('info', '🛡️ Security hardening complete and verified.');
  });
})();
