import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Room from '../models/Room.js';
import User from '../models/User.js';
import BlacklistedToken from '../models/BlacklistedToken.js';
import { JWT_SECRET } from '../utils/jwtSecret.js';
import { securityEvent, SECURITY_EVENTS } from '../utils/logger.js';

// In-memory connection tracking per IP for rate limiting
const connectionsPerIp = new Map(); // IP -> connection times Array

// Cleanup connection times older than 1 minute
setInterval(() => {
  const now = Date.now();
  for (const [ip, times] of connectionsPerIp.entries()) {
    const validTimes = times.filter((t) => now - t < 60000);
    if (validTimes.length === 0) {
      connectionsPerIp.delete(ip);
    } else {
      connectionsPerIp.set(ip, validTimes);
    }
  }
}, 60000);

export default function synkHandler(io) {
  const activeSockets = new Map(); // Track connected users: socketId -> { userId, roomId, eventCount, lastReset }

  // Periodic Drift handling: broadcast sync_state for active rooms every 5s
  setInterval(async () => {
    try {
      const activeRooms = await Room.find({ isPlaying: true });
      for (const room of activeRooms) {
        const now = new Date();
        const elapsed = (now - room.updatedAt) / 1000;
        const currentEstimatedTime = room.currentTime + elapsed;

        io.to(room.roomId).emit('sync_state', {
          songId: room.currentSongId,
          currentTime: currentEstimatedTime,
          isPlaying: room.isPlaying,
          updatedAt: now
        });
      }
    } catch (err) {
      console.error('[socket] Error in periodic sync:', err);
    }
  }, 5000);

  // Periodic token validity check: disconnect sockets with expired or invalidated tokens
  setInterval(async () => {
    const now = Date.now();
    for (const [socketId, session] of activeSockets.entries()) {
      if (session.token) {
        try {
          const decoded = jwt.decode(session.token);
          if (decoded && decoded.exp * 1000 < now) {
            const socket = io.sockets.sockets.get(socketId);
            if (socket) {
              securityEvent(SECURITY_EVENTS.JWT_FAILURE, null, {
                ip: socket.handshake.address,
                details: 'JWT expired mid-session',
                userId: session.userId,
              });
              socket.emit('error', { message: 'Session expired. Please reconnect.' });
              socket.disconnect(true);
            }
            activeSockets.delete(socketId);
            continue;
          }

          // Check database to verify user status and tokenVersion
          if (decoded && decoded.id) {
            const user = await User.findById(decoded.id).select('tokenVersion isApproved');
            if (!user || !user.isApproved || (decoded.tokenVersion !== undefined && decoded.tokenVersion !== user.tokenVersion)) {
              const socket = io.sockets.sockets.get(socketId);
              if (socket) {
                securityEvent(SECURITY_EVENTS.UNAUTHORIZED_ACCESS, null, {
                  ip: socket.handshake.address,
                  details: 'User token version updated or user disapproved',
                  userId: session.userId,
                });
                socket.emit('error', { message: 'Unauthorized session' });
                socket.disconnect(true);
              }
              activeSockets.delete(socketId);
            }
          }
        } catch (e) {
          // Ignore DB fetch failures
        }
      }
    }
  }, 10000);

  // Socket.IO Handshake Middleware for JWT verification and connection rate limits
  io.use(async (socket, next) => {
    try {
      const ip = socket.handshake.address;

      // 1. Connection Rate Limiting per IP
      const now = Date.now();
      const times = connectionsPerIp.get(ip) || [];
      const recentConnections = times.filter((t) => now - t < 60000);
      if (recentConnections.length >= 10) {
        securityEvent(SECURITY_EVENTS.RATE_LIMIT, null, {
          ip,
          details: 'Socket.IO connection rate limit exceeded (> 10 connections/min)',
        });
        return next(new Error('Too many connections. Please try again later.'));
      }
      recentConnections.push(now);
      connectionsPerIp.set(ip, recentConnections);

      // 2. JWT Handshake Authentication
      const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1] || socket.handshake.query?.token;
      
      let decoded = null;
      if (token) {
        // If token provided, verify it strictly
        const isBlacklisted = await BlacklistedToken.findOne({ token });
        if (isBlacklisted) {
          securityEvent(SECURITY_EVENTS.JWT_FAILURE, null, { ip, details: 'Blacklisted token in socket handshake' });
          return next(new Error('Authentication failed'));
        }

        try {
          decoded = jwt.verify(token, JWT_SECRET, { issuer: 'music-player' });
          const user = await User.findById(decoded.id).select('tokenVersion isApproved');
          if (!user || !user.isApproved || (decoded.tokenVersion !== undefined && decoded.tokenVersion !== user.tokenVersion)) {
            securityEvent(SECURITY_EVENTS.JWT_FAILURE, null, { ip, details: 'Invalid user or tokenVersion in socket handshake' });
            return next(new Error('Authentication failed'));
          }
        } catch (err) {
          securityEvent(SECURITY_EVENTS.JWT_FAILURE, null, { ip, details: `Handshake token verify failed: ${err.message}` });
          return next(new Error('Authentication failed'));
        }
      }

      // Store decoded token details on socket
      socket.decodedToken = decoded;
      socket.rawToken = token;
      next();
    } catch (err) {
      console.error('[socket] Handshake error:', err);
      next(new Error('Server error'));
    }
  });

  io.on('connection', (socket) => {
    const ip = socket.handshake.address;

    // Track active connection
    const initialSession = {
      userId: socket.decodedToken?.id || 'guest_' + Math.random().toString(36).substring(2, 7),
      roomId: null,
      eventCount: 0,
      lastReset: Date.now(),
      token: socket.rawToken,
    };
    activeSockets.set(socket.id, initialSession);

    // Middleware-like function for Socket event validation
    const validateEvent = (eventName, data) => {
      const session = activeSockets.get(socket.id);
      if (!session) {
        socket.emit('error', { message: 'Session invalid' });
        socket.disconnect(true);
        return false;
      }

      // 1. Event Rate Limiting (max 15 events/second)
      const now = Date.now();
      if (now - session.lastReset > 1000) {
        session.eventCount = 0;
        session.lastReset = now;
      }
      session.eventCount++;
      if (session.eventCount > 15) {
        securityEvent(SECURITY_EVENTS.API_ABUSE, null, {
          ip,
          userId: session.userId,
          details: `Socket.IO event spam detected: ${eventName}`,
        });
        socket.emit('error', { message: 'Too many requests' });
        socket.disconnect(true);
        return false;
      }

      // 2. Payload size checking (max 10KB payload)
      const payloadStr = JSON.stringify(data || {});
      if (payloadStr.length > 10240) {
        securityEvent(SECURITY_EVENTS.API_ABUSE, null, {
          ip,
          userId: session.userId,
          details: `Socket.IO oversized payload: ${payloadStr.length} bytes`,
        });
        socket.emit('error', { message: 'Payload too large' });
        socket.disconnect(true);
        return false;
      }

      return true;
    };

    socket.on('create_room', async (data) => {
      if (!validateEvent('create_room', data)) return;
      
      try {
        const { songId, currentTime, isPlaying } = data || {};
        const session = activeSockets.get(socket.id);
        const userId = session.userId;

        // Force leave existing room if already in one
        if (session.roomId) {
          await handleLeave(socket.id);
        }

        const roomId = crypto.randomBytes(4).toString('hex');
        const room = new Room({
          roomId,
          hostId: userId,
          participants: [userId],
          currentSongId: songId ? String(songId).substring(0, 100) : null,
          currentTime: typeof currentTime === 'number' && !isNaN(currentTime) ? Math.max(0, currentTime) : 0,
          isPlaying: typeof isPlaying === 'boolean' ? isPlaying : false,
          updatedAt: new Date()
        });
        await room.save();

        socket.join(roomId);
        session.roomId = roomId;
        activeSockets.set(socket.id, session);

        socket.emit('room_created', { roomId });
      } catch (err) {
        console.error('[socket] Error creating room:', err);
        socket.emit('error', { message: 'Failed to create room' });
      }
    });

    socket.on('join_room', async (data) => {
      if (!validateEvent('join_room', data)) return;

      try {
        const { roomId } = data || {};
        const session = activeSockets.get(socket.id);
        const userId = session.userId;

        if (!roomId || typeof roomId !== 'string' || roomId.length > 100) {
          socket.emit('error', { message: 'Invalid room ID' });
          return;
        }

        // Leave current room if already in one
        if (session.roomId) {
          await handleLeave(socket.id);
        }

        const room = await Room.findOne({ roomId });
        if (!room) {
          socket.emit('error', { message: 'Room not found' });
          return;
        }

        // Room size check (max 10 participants)
        if (room.participants.length >= 10 && !room.participants.includes(userId)) {
          socket.emit('error', { message: 'Room is full (max 10 participants)' });
          return;
        }

        socket.join(roomId);
        session.roomId = roomId;
        activeSockets.set(socket.id, session);

        if (!room.participants.includes(userId)) {
          room.participants.push(userId);
          await room.save();
        }

        socket.to(roomId).emit('user_joined', { userId });

        socket.emit('sync_state', {
          songId: room.currentSongId,
          currentTime: room.currentTime,
          isPlaying: room.isPlaying,
          updatedAt: room.updatedAt
        });
      } catch (err) {
        console.error('[socket] Error joining room:', err);
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    const handleControlEvent = async (roomId, userId, action) => {
      try {
        if (!roomId || typeof roomId !== 'string' || roomId.length > 100) return;
        const room = await Room.findOne({ roomId });
        if (!room) {
          socket.emit('error', { message: 'Room not found' });
          return;
        }
        if (room.hostId !== userId) {
          socket.emit('error', { message: 'Only host can control playback' });
          return;
        }

        await action(room);
        room.updatedAt = new Date();
        await room.save();

        io.to(roomId).emit('sync_state', {
          songId: room.currentSongId,
          currentTime: room.currentTime,
          isPlaying: room.isPlaying,
          updatedAt: room.updatedAt
        });
      } catch (err) {
        console.error(`[socket] Error in control event:`, err);
      }
    };

    socket.on('play', (data) => {
      if (!validateEvent('play', data)) return;
      const { roomId, currentTime } = data || {};
      const session = activeSockets.get(socket.id);
      if (!session || session.roomId !== roomId) return;

      handleControlEvent(roomId, session.userId, (room) => {
        room.isPlaying = true;
        room.currentTime = typeof currentTime === 'number' && !isNaN(currentTime) ? Math.max(0, currentTime) : 0;
      });
    });

    socket.on('pause', (data) => {
      if (!validateEvent('pause', data)) return;
      const { roomId, currentTime } = data || {};
      const session = activeSockets.get(socket.id);
      if (!session || session.roomId !== roomId) return;

      handleControlEvent(roomId, session.userId, (room) => {
        room.isPlaying = false;
        room.currentTime = typeof currentTime === 'number' && !isNaN(currentTime) ? Math.max(0, currentTime) : 0;
      });
    });

    socket.on('seek', (data) => {
      if (!validateEvent('seek', data)) return;
      const { roomId, currentTime } = data || {};
      const session = activeSockets.get(socket.id);
      if (!session || session.roomId !== roomId) return;

      handleControlEvent(roomId, session.userId, (room) => {
        room.currentTime = typeof currentTime === 'number' && !isNaN(currentTime) ? Math.max(0, currentTime) : 0;
      });
    });

    socket.on('change_song', (data) => {
      if (!validateEvent('change_song', data)) return;
      const { roomId, songId } = data || {};
      const session = activeSockets.get(socket.id);
      if (!session || session.roomId !== roomId) return;

      handleControlEvent(roomId, session.userId, (room) => {
        room.currentSongId = songId ? String(songId).substring(0, 100) : null;
        room.currentTime = 0;
        room.isPlaying = true;
      });
    });

    const handleLeave = async (socketId) => {
      const session = activeSockets.get(socketId);
      if (session) {
        const { userId, roomId } = session;
        session.roomId = null;
        activeSockets.set(socketId, session);

        const s = io.sockets.sockets.get(socketId);
        if (s && roomId) s.leave(roomId);

        try {
          if (roomId) {
            const room = await Room.findOne({ roomId });
            if (room) {
              room.participants = room.participants.filter(id => id !== userId);

              if (room.participants.length === 0) {
                await Room.deleteOne({ roomId });
              } else if (room.hostId === userId) {
                // Transfer host role if original host disconnected
                room.hostId = room.participants[0];
                await room.save();
                io.to(roomId).emit('host_transferred', { newHostId: room.hostId });
              } else {
                await room.save();
              }
            }
          }
        } catch (err) {
          console.error('[socket] Error handling leave:', err);
        }
      }
    };

    socket.on('leave_room', (data) => {
      if (!validateEvent('leave_room', data)) return;
      handleLeave(socket.id);
    });

    socket.on('disconnect', () => {
      handleLeave(socket.id);
      activeSockets.delete(socket.id);
    });
  });
}
