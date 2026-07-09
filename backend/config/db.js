import mongoose from 'mongoose';
import { log } from '../utils/logger.js';

// ── Secondary connection for the Songs-dedicated cluster ──
let songsConnection = null;

export function getSongsDb() {
  return songsConnection;
}

export async function connectSongsDB() {
  const songsURI = process.env.SONGS_METADATA;
  if (!songsURI) {
    console.warn('[songsDB] SONGS_METADATA not set — song URL lookups will use JSON fallback.');
    return;
  }
  try {
    songsConnection = mongoose.createConnection(songsURI + '/songs', {
      serverSelectionTimeoutMS: 6000,
      maxPoolSize: 5,
    });
    songsConnection.on('connected', () => {
      console.log('[songsDB] ✅ Songs DB connected');
    });
    songsConnection.on('error', (err) => {
      console.error('[songsDB] Connection error:', err.message);
    });
  } catch (err) {
    console.warn('[songsDB] Failed to connect, will use JSON fallback:', err.message);
  }
}

// ── Primary connection (main app DB) ──
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error('❌ MONGO_URI environment variable is required.');
      throw new Error('MONGO_URI not defined');
    }

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
    });

    if (process.env.NODE_ENV !== 'production') {
      log('info', `✅ MongoDB Connected: ${conn.connection.host}`);
    } else {
      log('info', '✅ Database connection established.');
    }

    mongoose.connection.on('error', (err) => {
      log('error', 'MongoDB connection error', { details: err.message });
    });

    mongoose.connection.on('disconnected', () => {
      log('warn', 'MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      log('info', 'MongoDB connection closed.');
      process.exit(0);
    });
  } catch (error) {
    log('error', 'Database connection failed', { details: error.message });
    console.log('⚠️  Server will continue running, but database operations will fail');
  }
};

export default connectDB;
