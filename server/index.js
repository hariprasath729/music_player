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
import songsRouter from './routes/songs.js';

const app = express();
const PORT = process.env.PORT || 4000;

// --- Global middleware ---
app.use(cors());
app.use(express.json());

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

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.originalUrl });
});

// Centralized error handler
app.use((err, _req, res, _next) => {
  console.error('[error]', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🎵 Music metadata API running at http://localhost:${PORT}`);
  console.log(`   GET    /songs`);
  console.log(`   GET    /songs/:id`);
  console.log(`   POST   /songs`);
  console.log(`   PUT    /songs/:id`);
  console.log(`   DELETE /songs/:id`);
});

export default app;
