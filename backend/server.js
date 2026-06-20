import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import featureRoutes from './routes/index.js';
import synkHandler from './sockets/synkHandler.js';

(async () => {
  dotenv.config();

  const app = express();
  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: true,
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  const PORT = process.env.PORT || 5000;

  // CORS configuration
  app.use(cors({
    origin: true,
    credentials: true
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Simple root health check
  app.get('/', (req, res) =>
    res.send('Alive'));

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api', featureRoutes);

  // Health check
  app.get('/api/health', (req, res) =>
    res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() }));

  // Socket.io Handler
  synkHandler(io);

  // 404
  app.use((req, res) =>
    res.status(404).json({ success: false, error: 'Route not found', path: req.originalUrl }));

  // Error handler
  app.use((err, req, res, _next) => {
    console.error('[server] Error:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  });

  // Connect to DB then start server
  await connectDB();
  httpServer.listen(PORT, () => {
    console.log(`🎵 Backend API running → http://localhost:${PORT}`);
    console.log(`   Health check → http://localhost:${PORT}/api/health`);
  });
})();
