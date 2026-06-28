/**
 * Music Streaming Backend — Entry Point
 * -------------------------------------
 * Lightweight Express API that serves SONG METADATA only.
 * Audio streams directly from CDN — backend never proxies audio.
 *
 * Run:  node server/index.js
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import songsRouter from './routes/songs.js';

const app = express();
const PORT = process.env.PORT || 4000;

// --- Global middleware ---

// 1. Security Headers (Helmet)
app.use(helmet({
  contentSecurityPolicy: false, // API server, no browser-rendered HTML expected
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// 2. CORS Hardening (Whitelist frontend origins)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://music-player-psi-sepia.vercel.app',
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
}));

// 3. Payload size limiting
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 4. Rate Limiting (max 100 requests per minute per IP)
app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
}));

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${ms}ms)`);
  });
  next();
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'music-metadata-api', time: new Date().toISOString() });
});

// API routes
app.use('/songs', songsRouter);

// 404 handler (hide path)
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Centralized error handler (hide details)
app.use((err, _req, res, _next) => {
  console.error('[error]', err);
  res.status(500).json({ error: 'Internal server error' });
});

const httpServer = app.listen(PORT, () => {
  console.log(`🎵 Music metadata API running at http://localhost:${PORT}`);
  console.log(`   GET    /songs`);
  console.log(`   GET    /songs/:id`);
  console.log(`   POST   /songs`);
  console.log(`   PUT    /songs/:id`);
  console.log(`   DELETE /songs/:id`);
});

// Configure Server Timeouts to protect against slow-client attacks
httpServer.headersTimeout = 10000;  // 10 seconds
httpServer.requestTimeout = 30000;  // 30 seconds
httpServer.keepAliveTimeout = 65000; // 65 seconds

export default app;
