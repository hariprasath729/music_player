﻿import React, { useEffect, useState, useRef } from 'react';
import { X, Users, Copy, Check, Radio } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { useAuth } from '../../context/AuthContext';
import { io, Socket } from 'socket.io-client';
import { TRACKS } from '../../data/musicCatalog';

// @ts-ignore
const SOCKET_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const socket = io(SOCKET_URL);


export const VisualizerView: React.FC = () => {
  const { currentTrack, isPlaying, goBack, canGoBack, setView, currentTime, seek, playTrack, togglePlay, setIsPlaybackLocked } = usePlayer();
  const { user } = useAuth();
  
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState<string>('');
  const [inputRoomId, setInputRoomId] = useState<string>('');
  const [isHost, setIsHost] = useState<boolean>(false);
  const [inRoom, setInRoom] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const [guestId] = useState(() => 'guest_' + Math.random().toString(36).substr(2, 5));
  const userId = user?.id || guestId;

  // Track previous state to avoid infinite loops
  const prevSyncState = useRef({ 
    songId: currentTrack.id, 
    currentTime, 
    isPlaying,
    lastUpdateTime: Date.now()
  });
  const isSyncing = useRef(false);
  const stateRef = useRef({ isHost, currentTrackId: currentTrack.id, currentTime, isPlaying });

  // Keep a stable ref of player functions to avoid socket re-renders
  const playerRefs = useRef({ playTrack, seek, togglePlay });
  useEffect(() => {
    playerRefs.current = { playTrack, seek, togglePlay };
  }, [playTrack, seek, togglePlay]);

  useEffect(() => {
    stateRef.current = { isHost, currentTrackId: currentTrack.id, currentTime, isPlaying };
  }, [isHost, currentTrack.id, currentTime, isPlaying]);

  useEffect(() => {
    setIsPlaybackLocked(inRoom && !isHost);
    return () => setIsPlaybackLocked(false);
  }, [inRoom, isHost, setIsPlaybackLocked]);

  const handleClose = () => {
    if (canGoBack) goBack();
    else setView('home');
  };

  useEffect(() => {
    // Reset room state when user identity changes (e.g. Logging out)
    setInRoom(false);
    setIsHost(false);
    setRoomId('');
    setInputRoomId('');

    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('room_created', ({ roomId }) => {
      setRoomId(roomId);
      setInRoom(true);
      setIsHost(true);
      setError('');
    });

    newSocket.on('user_joined', ({ userId }) => {
      console.log('User joined:', userId);
    });

    newSocket.on('host_transferred', ({ newHostId }) => {
      if (userId === newHostId) {
        setIsHost(true);
      }
    });

    newSocket.on('sync_state', ({ songId, currentTime: syncTime, isPlaying: syncIsPlaying, updatedAt }) => {
      if (stateRef.current.isHost) return; // Host dictates, doesn't listen to sync
      isSyncing.current = true;
      
      let updatedPlayingState = stateRef.current.isPlaying;
      let trackChanged = false;

      // Update song if different
      if (stateRef.current.currentTrackId !== songId && songId) {
        const track = TRACKS.find(t => t.id === songId);
        if (track) {
          playerRefs.current.playTrack(track, TRACKS, true); // Overrides the context lock
          updatedPlayingState = true;
          trackChanged = true;
        }
      }
      
      // Ignore device clock discrepancies by relying entirely on the server's synced time
      const targetTime = syncTime;
      
      // Only seek if drift > 0.5 seconds OR if we just forcefully changed the track
      if (trackChanged || Math.abs(stateRef.current.currentTime - targetTime) > 0.5) {
        playerRefs.current.seek(targetTime, true); // Overrides the context lock
      }
      
      if (updatedPlayingState !== syncIsPlaying) {
        playerRefs.current.togglePlay(true, syncIsPlaying); // Overrides the context lock
      }
      
      prevSyncState.current = { 
        songId, 
        currentTime: targetTime, 
        isPlaying: syncIsPlaying,
        lastUpdateTime: Date.now()
      };
      
      setTimeout(() => { isSyncing.current = false; }, 500);
    });

    newSocket.on('error', ({ message }) => {
      setError(message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId]); // Removed context player functions from dependencies!

  // Host sends sync events
  useEffect(() => {
    if (!socket || !inRoom || !isHost || isSyncing.current) return;

    // Calculate expected time based on previous state
    let expectedTime = prevSyncState.current.currentTime;
    if (prevSyncState.current.isPlaying) {
      expectedTime += (Date.now() - prevSyncState.current.lastUpdateTime) / 1000;
    }

    const stateChanged = 
      prevSyncState.current.songId !== currentTrack.id ||
      Math.abs(expectedTime - currentTime) > 1 || // Host drifted by > 1s from what we told the server
      prevSyncState.current.isPlaying !== isPlaying;

    if (stateChanged) {
      if (prevSyncState.current.songId !== currentTrack.id) {
        socket.emit('change_song', { roomId, userId, songId: currentTrack.id });
      } else if (prevSyncState.current.isPlaying !== isPlaying) {
        socket.emit(isPlaying ? 'play' : 'pause', { roomId, userId, currentTime });
      } else {
        socket.emit('seek', { roomId, userId, currentTime });
      }
      prevSyncState.current = { 
        songId: currentTrack.id, 
        currentTime, 
        isPlaying,
        lastUpdateTime: Date.now()
      };
    }
  }, [currentTrack.id, currentTime, isPlaying, inRoom, isHost, socket, roomId, userId]);

  const createRoom = () => {
    if (socket) {
      socket.emit('create_room', { 
        userId,
        songId: currentTrack.id,
        currentTime,
        isPlaying
      });
    }
  };

  const joinRoom = () => {
    if (socket && inputRoomId) {
      socket.emit('join_room', { roomId: inputRoomId, userId });
      setRoomId(inputRoomId);
      setInRoom(true);
      setIsHost(false);
      setError('');
    }
  };

  const copyRoomId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDisconnect = () => {
    if (socket && inRoom) {
      socket.emit('leave_room');
    }
    setInRoom(false);
    setIsHost(false);
    setRoomId('');
    setInputRoomId('');
  };

  return (
    <div className="relative flex h-full flex-col items-center overflow-y-auto overflow-x-hidden px-4 py-16 sm:py-8 select-none bg-[#121212]">
      <div
        className="absolute inset-0 opacity-20 blur-3xl transition-colors duration-1000"
        style={{ background: currentTrack.gradient }}
      />

      {/* Disable pointer events on player controls for listeners */}
      {inRoom && !isHost && (
        <style>
          {`
            /* Visually disable player controls so the listener knows they are locked */
            input[type="range"], .player-controls, button[aria-label="Play"], button[aria-label="Pause"], button[aria-label="Next"], button[aria-label="Previous"], button[aria-label="Shuffle"], button[aria-label="Repeat"] {
              pointer-events: none !important;
              opacity: 0.5 !important;
            }
          `}
        </style>
      )}

      {/* Status pill (top-left) */}
      <div className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md sm:left-6 sm:top-6 sm:px-4 sm:py-2">
        <Radio className="h-4 w-4 text-[#1db954]" />
        <span className="text-[11px] font-bold text-white sm:text-sm">Synk</span>
        <span className={`h-2 w-2 rounded-full ${inRoom ? "animate-pulse bg-[#1db954]" : "bg-red-500"}`} />
      </div>

      {/* Close button (top-right) */}
      <button
        onClick={handleClose}
        title="Close Synk"
        className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/70 sm:right-6 sm:top-6 sm:h-10 sm:w-10"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="z-10 my-auto flex w-full max-w-md shrink-0 flex-col items-center gap-6 rounded-xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1db954]/20 text-[#1db954]">
            <Users className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Synk Session</h2>
          <p className="mt-2 text-sm text-[#b3b3b3]">Listen to music together in real-time.</p>
        </div>

        {error && (
          <div className="w-full rounded-md bg-red-500/10 border border-red-500/50 p-3 text-center text-sm text-red-500">
            {error}
          </div>
        )}

        {!inRoom ? (
          <div className="flex w-full flex-col gap-4">
            <button
              onClick={createRoom}
              className="w-full rounded-full bg-[#1db954] py-3 font-bold text-black transition-transform hover:scale-105"
            >
              Start Session (Host)
            </button>
            
            <div className="flex items-center gap-2 text-sm text-[#b3b3b3]">
              <div className="h-px flex-1 bg-white/10" />
              <span>OR</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="flex w-full flex-col gap-2">
              <input
                type="text"
                placeholder="Enter Room Code"
                value={inputRoomId}
                onChange={(e) => setInputRoomId(e.target.value)}
                className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/40 focus:border-[#1db954] focus:outline-none focus:ring-1 focus:ring-[#1db954]"
              />
              <button
                onClick={joinRoom}
                disabled={!inputRoomId}
                className="w-full rounded-full bg-white py-3 font-bold text-black transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                Join Session
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-col items-center gap-2 rounded-lg bg-white/5 p-4 text-center">
              <span className="text-xs uppercase tracking-wider text-[#b3b3b3]">Room Code</span>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-mono font-bold tracking-widest text-white">{roomId}</span>
                <button
                  onClick={copyRoomId}
                  className="rounded-md bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                  title="Copy code"
                >
                  {copied ? <Check className="h-4 w-4 text-[#1db954]" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-[#1db954] animate-pulse" />
              <span className="text-white">
                {isHost ? 'You are hosting this session' : 'You are listening to the host'}
              </span>
            </div>

            <div className="mt-4 flex flex-col items-center gap-1 text-center">
              <img src={currentTrack.coverUrl} alt="Cover" className="mb-2 h-16 w-16 rounded-md shadow-lg" />
              <p className="font-bold text-white">{currentTrack.title}</p>
              <p className="text-xs text-[#b3b3b3]">{currentTrack.artist}</p>
            </div>

            <button
              onClick={handleDisconnect}
              className="mt-4 rounded-full border border-red-500/50 bg-red-500/10 px-8 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-500/20"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
