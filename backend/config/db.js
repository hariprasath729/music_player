import mongoose from 'mongoose';
import { log } from '../utils/logger.js';

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
