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

// ─── In-Memory Room Sync State ───────────────────────────────────────────────
// Primary source of truth for real-time sync. MongoDB is used only for
// persistence, recovery, analytics, and room lifecycle.
const roomSyncState = new Map();
// Structure per room:
// {
//   songId, currentTime, isPlaying, updatedAt (ms timestamp),
//   sequenceNumber, hostId, participants: Set,
//   heartbeatMode: 'steady' | 'burst', burstUntil: 0
// }

function createRoomState(roomId, hostId, songId, currentTime, isPlaying) {
  const state = {
    roomId,
    hostId,
    participants: new Set([hostId]),
    songId: songId || null,
    currentTime: typeof currentTime === 'number' && !isNaN(currentTime) ? Math.max(0, currentTime) : 0,
    isPlaying: typeof isPlaying === 'boolean' ? isPlaying : false,
    updatedAt: Date.now(),
    sequenceNumber: 0,
    heartbeatMode: 'steady',
    burstUntil: 0,
  };
  roomSyncState.set(roomId, state);
  return state;
}

function getEstimatedTime(state) {
  if (!state.isPlaying) return state.currentTime;
  const elapsed = (Date.now() - state.updatedAt) / 1000;
  return state.currentTime + elapsed;
}

function buildSyncPayload(state) {
  state.sequenceNumber++;
  const now = Date.now();
  return {
    songId: state.songId,
    currentTime: getEstimatedTime(state),
    isPlaying: state.isPlaying,
    hostTimestamp: now,
    playbackTimestamp: state.updatedAt,
    sequenceNumber: state.sequenceNumber,
  };
}

function triggerBurst(state) {
  state.heartbeatMode = 'burst';
  state.burstUntil = Date.now() + 3000; // 3s burst window after events
}

// ─── Periodic DB Checkpoint (every 5s) ───────────────────────────────────────
setInterval(async () => {
  for (const [roomId, state] of roomSyncState.entries()) {
    try {
      await Room.updateOne(
        { roomId },
        {
          currentSongId: state.songId,
          currentTime: getEstimatedTime(state),
          isPlaying: state.isPlaying,
          updatedAt: new Date(state.updatedAt),
        }
      );
    } catch (err) {
      // Non-critical — best effort persistence
    }
  }
}, 5000);

export default function synkHandler(io) {
  const activeSockets = new Map(); // Track connected users: socketId -> { userId, roomId, eventCount, lastReset }

  // ─── Adaptive Heartbeat ──────────────────────────────────────────────────
  // Runs every 100ms but only emits based on each room's heartbeat mode:
  //   steady: every 600ms (within 500-700ms range)
  //   burst:  every 150ms (within 100-200ms range) for 3s after events
  const heartbeatCounters = new Map(); // roomId -> lastEmitTime
  setInterval(() => {
    const now = Date.now();
    for (const [roomId, state] of roomSyncState.entries()) {
      // Auto-transition burst → steady when burst window expires
      if (state.heartbeatMode === 'burst' && now >= state.burstUntil) {
        state.heartbeatMode = 'steady';
      }

      const interval = state.heartbeatMode === 'burst' ? 150 : 600;
      const lastEmit = heartbeatCounters.get(roomId) || 0;

      if (now - lastEmit >= interval) {
        heartbeatCounters.set(roomId, now);
        const payload = buildSyncPayload(state);
        io.to(roomId).emit('sync_state', payload);
      }
    }
  }, 100);

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

      // 1. Event Rate Limiting (max 30 events/second — increased for sync traffic)
      const now = Date.now();
      if (now - session.lastReset > 1000) {
        session.eventCount = 0;
        session.lastReset = now;
      }
      session.eventCount++;
      if (session.eventCount > 30) {
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

    // ─── Clock Synchronization (NTP-style) ─────────────────────────────────
    socket.on('clock_sync_request', (data) => {
      // Lightweight — skip full validateEvent to avoid rate limit pressure
      socket.emit('clock_sync_response', {
        clientSendTime: data?.clientSendTime,
        serverTime: Date.now(),
      });
    });

    // ─── Latency Ping/Pong ─────────────────────────────────────────────────
    socket.on('latency_ping', (data) => {
      socket.emit('latency_pong', {
        clientSendTime: data?.clientSendTime,
      });
    });

    // ─── Room Creation ─────────────────────────────────────────────────────
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

        // Create in-memory sync state
        createRoomState(roomId, userId, songId ? String(songId).substring(0, 100) : null, currentTime, isPlaying);

        socket.join(roomId);
        session.roomId = roomId;
        activeSockets.set(socket.id, session);

        socket.emit('room_created', { roomId });
      } catch (err) {
        console.error('[socket] Error creating room:', err);
        socket.emit('error', { message: 'Failed to create room' });
      }
    });

    // ─── Room Joining ──────────────────────────────────────────────────────
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

        // Update in-memory state
        let state = roomSyncState.get(roomId);
        if (!state) {
          // Rebuild from DB if not in memory (e.g., server restart)
          state = createRoomState(roomId, room.hostId, room.currentSongId, room.currentTime, room.isPlaying);
          for (const p of room.participants) state.participants.add(p);
        } else {
          state.participants.add(userId);
        }

        // Trigger burst mode for rapid sync of the new joiner
        triggerBurst(state);

        socket.to(roomId).emit('user_joined', { userId });

        // Send immediate sync to the joining participant
        const payload = buildSyncPayload(state);
        socket.emit('sync_state', payload);
      } catch (err) {
        console.error('[socket] Error joining room:', err);
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    // ─── Host Control Events ───────────────────────────────────────────────
    const handleControlEvent = async (roomId, userId, action) => {
      try {
        if (!roomId || typeof roomId !== 'string' || roomId.length > 100) return;

        // Check in-memory state first for host validation
        const state = roomSyncState.get(roomId);
        if (!state) {
          socket.emit('error', { message: 'Room not found' });
          return;
        }
        if (state.hostId !== userId) {
          socket.emit('error', { message: 'Only host can control playback' });
          return;
        }

        // Apply mutation to in-memory state
        action(state);
        state.updatedAt = Date.now();

        // Trigger burst mode for rapid re-sync after control event
        triggerBurst(state);

        // Emit immediately to all participants (event-based sync)
        const payload = buildSyncPayload(state);
        io.to(roomId).emit('sync_state', payload);

        // Persist to DB on important events (async, non-blocking)
        Room.updateOne(
          { roomId },
          {
            currentSongId: state.songId,
            currentTime: state.currentTime,
            isPlaying: state.isPlaying,
            updatedAt: new Date(state.updatedAt),
          }
        ).catch(() => {});
      } catch (err) {
        console.error(`[socket] Error in control event:`, err);
      }
    };

    socket.on('play', (data) => {
      if (!validateEvent('play', data)) return;
      const { roomId, currentTime } = data || {};
      const session = activeSockets.get(socket.id);
      if (!session || session.roomId !== roomId) return;

      handleControlEvent(roomId, session.userId, (state) => {
        state.isPlaying = true;
        state.currentTime = typeof currentTime === 'number' && !isNaN(currentTime) ? Math.max(0, currentTime) : 0;
      });
    });

    socket.on('pause', (data) => {
      if (!validateEvent('pause', data)) return;
      const { roomId, currentTime } = data || {};
      const session = activeSockets.get(socket.id);
      if (!session || session.roomId !== roomId) return;

      handleControlEvent(roomId, session.userId, (state) => {
        state.isPlaying = false;
        state.currentTime = typeof currentTime === 'number' && !isNaN(currentTime) ? Math.max(0, currentTime) : 0;
      });
    });

    socket.on('seek', (data) => {
      if (!validateEvent('seek', data)) return;
      const { roomId, currentTime } = data || {};
      const session = activeSockets.get(socket.id);
      if (!session || session.roomId !== roomId) return;

      handleControlEvent(roomId, session.userId, (state) => {
        state.currentTime = typeof currentTime === 'number' && !isNaN(currentTime) ? Math.max(0, currentTime) : 0;
      });
    });

    socket.on('change_song', (data) => {
      if (!validateEvent('change_song', data)) return;
      const { roomId, songId } = data || {};
      const session = activeSockets.get(socket.id);
      if (!session || session.roomId !== roomId) return;

      handleControlEvent(roomId, session.userId, (state) => {
        state.songId = songId ? String(songId).substring(0, 100) : null;
        state.currentTime = 0;
        state.isPlaying = true;
      });
    });

    // ─── Leave / Disconnect ────────────────────────────────────────────────
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
            // Update in-memory state
            const state = roomSyncState.get(roomId);
            if (state) {
              state.participants.delete(userId);
              if (state.participants.size === 0) {
                roomSyncState.delete(roomId);
                heartbeatCounters.delete(roomId);
              } else if (state.hostId === userId) {
                // Transfer host
                state.hostId = [...state.participants][0];
                io.to(roomId).emit('host_transferred', { newHostId: state.hostId });
              }
            }

            // Update DB
            const room = await Room.findOne({ roomId });
            if (room) {
              room.participants = room.participants.filter(id => id !== userId);

              if (room.participants.length === 0) {
                await Room.deleteOne({ roomId });
              } else if (room.hostId === userId) {
                // Transfer host role if original host disconnected
                room.hostId = room.participants[0];
                await room.save();
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
