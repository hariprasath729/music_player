﻿import crypto from 'crypto';
import Room from '../models/Room.js';

export default function synkHandler(io) {
  const activeSockets = new Map(); // Track connected users

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

  io.on('connection', (socket) => {
    console.log(`[socket] User connected: ${socket.id}`);

    socket.on('create_room', async ({ userId, songId, currentTime, isPlaying }) => {
      try {
        const roomId = crypto.randomBytes(4).toString('hex');
        const room = new Room({
          roomId,
          hostId: userId,
          participants: [userId],
          currentSongId: songId || null,
          currentTime: currentTime || 0,
          isPlaying: isPlaying || false,
          updatedAt: new Date()
        });
        await room.save();
        
        socket.join(roomId);
        activeSockets.set(socket.id, { userId, roomId });
        socket.emit('room_created', { roomId });
        console.log(`[socket] User ${userId} created room ${roomId}`);
      } catch (err) {
        console.error('[socket] Error creating room:', err);
        socket.emit('error', { message: 'Failed to create room' });
      }
    });

    socket.on('join_room', async ({ roomId, userId }) => {
      try {
        const room = await Room.findOne({ roomId });
        if (!room) {
          socket.emit('error', { message: 'Room not found' });
          return;
        }

        socket.join(roomId);
        activeSockets.set(socket.id, { userId, roomId });
        console.log(`[socket] User ${userId} joined room ${roomId}`);

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

    // Core Action Validations
    const handleControlEvent = async (roomId, userId, action) => {
      try {
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

    socket.on('play', ({ roomId, userId, currentTime }) => {
      handleControlEvent(roomId, userId, (room) => {
        room.isPlaying = true;
        room.currentTime = currentTime;
      });
    });

    socket.on('pause', ({ roomId, userId, currentTime }) => {
      handleControlEvent(roomId, userId, (room) => {
        room.isPlaying = false;
        room.currentTime = currentTime;
      });
    });

    socket.on('seek', ({ roomId, userId, currentTime }) => {
      handleControlEvent(roomId, userId, (room) => {
        room.currentTime = currentTime;
      });
    });

    socket.on('change_song', ({ roomId, userId, songId }) => {
      handleControlEvent(roomId, userId, (room) => {
        room.currentSongId = songId;
        room.currentTime = 0;
        room.isPlaying = true;
      });
    });

    const handleLeave = async (socketId) => {
      const session = activeSockets.get(socketId);
      if (session) {
        const { userId, roomId } = session;
        activeSockets.delete(socketId);
        
        const s = io.sockets.sockets.get(socketId);
        if (s) s.leave(roomId);

        try {
          const room = await Room.findOne({ roomId });
          if (room) {
            room.participants = room.participants.filter(id => id !== userId);
            
            if (room.participants.length === 0) {
              await Room.deleteOne({ roomId });
              console.log(`[socket] Room ${roomId} deleted (empty)`);
            } else if (room.hostId === userId) {
              // Transfer host role if original host disconnected
              room.hostId = room.participants[0];
              await room.save();
              io.to(roomId).emit('host_transferred', { newHostId: room.hostId });
              console.log(`[socket] Room ${roomId} host transferred to ${room.hostId}`);
            } else {
              await room.save();
            }
          }
        } catch (err) {
          console.error('[socket] Error handling leave:', err);
        }
      }
    };

    socket.on('leave_room', () => handleLeave(socket.id));

    socket.on('disconnect', () => {
      console.log(`[socket] User disconnected: ${socket.id}`);
      handleLeave(socket.id);
    });
  });
}
