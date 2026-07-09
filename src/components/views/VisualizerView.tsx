import React, { useEffect, useState, useRef, useCallback } from 'react';
import { X, Users, Copy, Check, Radio, Activity } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { useAuth } from '../../context/AuthContext';
import { io, Socket } from 'socket.io-client';
import { TRACKS } from '../../data/musicCatalog';
import { audioEngine } from '../../services/audioEngine';

// @ts-ignore
const SOCKET_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

// ─── Sync Constants ──────────────────────────────────────────────────────────
const CLOCK_SYNC_EXCHANGES = 3;
const CLOCK_SYNC_ADAPTIVE_INTERVAL = 30000;  // 30s periodic re-sync
const LATENCY_PING_INTERVAL = 5000;          // 5s latency measurement
const LATENCY_WINDOW_SIZE = 5;               // sliding median window
const HOST_HEARTBEAT_STEADY = 600;           // ms between host sync emits (steady)
const HOST_HEARTBEAT_BURST = 150;            // ms between host sync emits (burst)
const HOST_BURST_DURATION = 3000;            // ms burst window after events

// Drift thresholds (ms)
const DRIFT_IGNORE = 30;
const DRIFT_SMALL = 80;
const DRIFT_MEDIUM = 150;
const DRIFT_LARGE = 300;
const DRIFT_SEEK = 500;

// Hysteresis: once in a correction state, stay until drift is below a lower threshold
const HYSTERESIS_LOCKED = 20;       // return to locked when drift < 20ms
const HYSTERESIS_SMALL = 60;        // return to small when drift < 60ms
const HYSTERESIS_MEDIUM = 120;      // return to medium when drift < 120ms

// Rate correction proportionality
const RATE_SMALL_MAX = 0.03;   // max ±0.03 for small drift
const RATE_MEDIUM_MAX = 0.06;  // max ±0.06 for medium drift
const RATE_LARGE_MAX = 0.10;   // max ±0.10 for large drift

// Network quality RTT thresholds (ms)
const NQ_EXCELLENT = 50;
const NQ_GOOD = 100;
const NQ_FAIR = 200;

type CorrectionMode = 'locked' | 'small' | 'medium' | 'large' | 'seeking';
type NetworkQuality = 'Excellent' | 'Good' | 'Fair' | 'Poor';

function median(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function computeJitter(samples: number[]): number {
  if (samples.length < 2) return 0;
  let sum = 0;
  for (let i = 1; i < samples.length; i++) {
    sum += Math.abs(samples[i] - samples[i - 1]);
  }
  return sum / (samples.length - 1);
}

export const VisualizerView: React.FC = () => {
  const { currentTrack, isPlaying, goBack, canGoBack, setView, currentTime, seek, playTrack, togglePlay, setIsPlaybackLocked, currentView } = usePlayer();
  const { user } = useAuth();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [shouldConnect, setShouldConnect] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>('');
  const [inputRoomId, setInputRoomId] = useState<string>('');
  const [isHost, setIsHost] = useState<boolean>(false);
  const [inRoom, setInRoom] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showDiagnostics, setShowDiagnostics] = useState<boolean>(false);

  const [guestId] = useState(() => 'guest_' + Math.random().toString(36).substr(2, 5));
  const userId = user?.id || guestId;

  // ─── Sync State Refs ───────────────────────────────────────────────────────
  const isSyncing = useRef(false);
  const isHostRef = useRef(false); // Synchronous ref — updated immediately in event handlers
  const stateRef = useRef({ isHost, currentTrackId: currentTrack.id, currentTime, isPlaying });
  const lastSeqNum = useRef(0);
  const prevSyncState = useRef({ songId: currentTrack.id, currentTime, isPlaying, lastUpdateTime: Date.now() });

  // Clock sync
  const clockOffset = useRef(0);         // serverTime - clientTime
  const lastClockSyncTime = useRef(0);
  const rttSamples = useRef<number[]>([]);
  const currentRTT = useRef(0);
  const avgRTT = useRef(0);
  const currentJitter = useRef(0);

  // Latency measurement
  const latencySamples = useRef<number[]>([]);
  const estimatedOneWayLatency = useRef(0);

  // Drift correction
  const correctionMode = useRef<CorrectionMode>('locked');
  const currentDrift = useRef(0);
  const hardSeekCount = useRef(0);
  const rateCorrections = useRef(0);
  const packetsReceived = useRef(0);
  const packetsDiscarded = useRef(0);
  const lastSyncTime = useRef(0);

  // Join stabilization (event-driven)
  const joinStabilized = useRef(false);
  const joinSyncApplied = useRef(false);
  const joinPlaybackStarted = useRef(false);

  // Network quality
  const networkQuality = useRef<NetworkQuality>('Good');

  // Host heartbeat
  const hostHeartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hostBurstUntil = useRef(0);

  // Rate recovery
  const rateRecoveryRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Diagnostics update trigger
  const [diagTick, setDiagTick] = useState(0);

  // Keep a stable ref of player functions to avoid socket re-renders
  const playerRefs = useRef({ playTrack, seek, togglePlay });
  useEffect(() => {
    playerRefs.current = { playTrack, seek, togglePlay };
  }, [playTrack, seek, togglePlay]);

  useEffect(() => {
    stateRef.current = { isHost, currentTrackId: currentTrack.id, currentTime, isPlaying };
    isHostRef.current = isHost;
  }, [isHost, currentTrack.id, currentTime, isPlaying]);

  useEffect(() => {
    setIsPlaybackLocked(inRoom && !isHost);
    return () => setIsPlaybackLocked(false);
  }, [inRoom, isHost, setIsPlaybackLocked]);

  useEffect(() => {
    if (currentView === 'visualizer') {
      setShouldConnect(true);
    }
  }, [currentView]);

  const handleClose = () => {
    if (canGoBack) goBack();
    else setView('home');
  };

  // ─── Clock Sync Logic ──────────────────────────────────────────────────────
  const runClockSync = useCallback((sock: Socket) => {
    let results: { rtt: number; offset: number }[] = [];
    let count = 0;

    const sendPing = () => {
      sock.emit('clock_sync_request', { clientSendTime: Date.now() });
    };

    const handler = (data: { clientSendTime: number; serverTime: number }) => {
      const now = Date.now();
      const rtt = now - data.clientSendTime;
      const oneWay = rtt / 2;
      const offset = data.serverTime + oneWay - now;
      results.push({ rtt, offset });
      count++;

      if (count < CLOCK_SYNC_EXCHANGES) {
        setTimeout(sendPing, 50);
      } else {
        sock.off('clock_sync_response', handler);
        // Use median RTT sample
        const medianRTT = median(results.map(r => r.rtt));
        const best = results.reduce((a, b) => Math.abs(a.rtt - medianRTT) < Math.abs(b.rtt - medianRTT) ? a : b);
        clockOffset.current = best.offset;
        currentRTT.current = best.rtt;

        // Update RTT tracking
        rttSamples.current.push(best.rtt);
        if (rttSamples.current.length > 10) rttSamples.current.shift();
        avgRTT.current = median(rttSamples.current);
        currentJitter.current = computeJitter(rttSamples.current);

        lastClockSyncTime.current = Date.now();
        updateNetworkQuality();
      }
    };

    sock.on('clock_sync_response', handler);
    sendPing();
  }, []);

  // ─── Adaptive Clock Re-sync ────────────────────────────────────────────────
  const shouldReSyncClock = useCallback(() => {
    const timeSinceLastSync = Date.now() - lastClockSyncTime.current;
    // Periodic: every 30s
    if (timeSinceLastSync > CLOCK_SYNC_ADAPTIVE_INTERVAL) return true;
    // RTT changed significantly (> 50% from average)
    if (avgRTT.current > 0 && Math.abs(currentRTT.current - avgRTT.current) > avgRTT.current * 0.5) return true;
    return false;
  }, []);

  // ─── Latency Measurement ───────────────────────────────────────────────────
  const startLatencyMeasurement = useCallback((sock: Socket) => {
    const pingHandler = (data: { clientSendTime: number }) => {
      const rtt = Date.now() - data.clientSendTime;
      const medianVal = median(latencySamples.current);

      // Discard outliers (> 2× median) if we have enough samples
      if (latencySamples.current.length >= 3 && rtt > medianVal * 2) {
        return;
      }

      latencySamples.current.push(rtt);
      if (latencySamples.current.length > LATENCY_WINDOW_SIZE) latencySamples.current.shift();
      estimatedOneWayLatency.current = median(latencySamples.current) / 2;

      // Update RTT tracking
      currentRTT.current = rtt;
      rttSamples.current.push(rtt);
      if (rttSamples.current.length > 10) rttSamples.current.shift();
      avgRTT.current = median(rttSamples.current);
      currentJitter.current = computeJitter(rttSamples.current);
      updateNetworkQuality();
    };

    sock.on('latency_pong', pingHandler);

    const interval = setInterval(() => {
      sock.emit('latency_ping', { clientSendTime: Date.now() });

      // Check if adaptive clock re-sync is needed
      if (shouldReSyncClock()) {
        runClockSync(sock);
      }
    }, LATENCY_PING_INTERVAL);

    return () => {
      clearInterval(interval);
      sock.off('latency_pong', pingHandler);
    };
  }, [runClockSync, shouldReSyncClock]);

  // ─── Network Quality ───────────────────────────────────────────────────────
  const updateNetworkQuality = () => {
    const rtt = avgRTT.current || currentRTT.current;
    const jitter = currentJitter.current;
    if (rtt < NQ_EXCELLENT && jitter < 15) {
      networkQuality.current = 'Excellent';
    } else if (rtt < NQ_GOOD && jitter < 30) {
      networkQuality.current = 'Good';
    } else if (rtt < NQ_FAIR && jitter < 60) {
      networkQuality.current = 'Fair';
    } else {
      networkQuality.current = 'Poor';
    }
  };

  // ─── Drift Correction Thresholds (adaptive to network quality) ─────────
  const getSeekThreshold = () => {
    switch (networkQuality.current) {
      case 'Excellent': return DRIFT_SEEK;
      case 'Good': return DRIFT_SEEK;
      case 'Fair': return DRIFT_SEEK * 1.5;
      case 'Poor': return DRIFT_SEEK * 2;
    }
  };

  // ─── Proportional Playback Rate Correction ─────────────────────────────────
  const applyDriftCorrection = useCallback((driftMs: number) => {
    const absDrift = Math.abs(driftMs);
    const seekThreshold = getSeekThreshold();
    const behind = driftMs > 0; // positive drift = participant is behind host

    // Determine correction mode with hysteresis
    const prevMode = correctionMode.current;
    let newMode: CorrectionMode = prevMode;

    if (absDrift >= seekThreshold) {
      newMode = 'seeking';
    } else if (absDrift >= DRIFT_LARGE) {
      if (prevMode !== 'seeking') newMode = 'large';
    } else if (absDrift >= DRIFT_MEDIUM) {
      if (prevMode === 'large' && absDrift > HYSTERESIS_MEDIUM) newMode = 'large';
      else if (prevMode !== 'seeking') newMode = 'medium';
    } else if (absDrift >= DRIFT_SMALL) {
      if (prevMode === 'medium' && absDrift > HYSTERESIS_SMALL) newMode = 'medium';
      else if (prevMode === 'large' && absDrift > HYSTERESIS_MEDIUM) newMode = 'large';
      else newMode = 'small';
    } else if (absDrift < DRIFT_IGNORE || (prevMode !== 'locked' && absDrift < HYSTERESIS_LOCKED)) {
      if (absDrift < HYSTERESIS_LOCKED) newMode = 'locked';
      else newMode = prevMode; // hysteresis: don't change
    } else {
      newMode = 'locked';
    }

    correctionMode.current = newMode;

    if (newMode === 'locked') {
      // Restore normal playback rate
      if (audioEngine.getPlaybackRate() !== 1.0) {
        audioEngine.setPlaybackRate(1.0);
      }
      return;
    }

    if (newMode === 'seeking') {
      // Hard seek — rare event
      hardSeekCount.current++;
      return; // Caller will handle the seek
    }

    // Proportional rate correction
    let maxCorrection: number;
    if (newMode === 'small') {
      // Map drift [30, 80] → correction [0.005, RATE_SMALL_MAX]
      const t = Math.min(1, (absDrift - DRIFT_IGNORE) / (DRIFT_SMALL - DRIFT_IGNORE));
      maxCorrection = 0.005 + t * (RATE_SMALL_MAX - 0.005);
    } else if (newMode === 'medium') {
      // Map drift [80, 150] → correction [RATE_SMALL_MAX, RATE_MEDIUM_MAX]
      const t = Math.min(1, (absDrift - DRIFT_SMALL) / (DRIFT_MEDIUM - DRIFT_SMALL));
      maxCorrection = RATE_SMALL_MAX + t * (RATE_MEDIUM_MAX - RATE_SMALL_MAX);
    } else {
      // Large: Map drift [150, 500] → correction [RATE_MEDIUM_MAX, RATE_LARGE_MAX]
      const t = Math.min(1, (absDrift - DRIFT_MEDIUM) / (DRIFT_SEEK - DRIFT_MEDIUM));
      maxCorrection = RATE_MEDIUM_MAX + t * (RATE_LARGE_MAX - RATE_MEDIUM_MAX);
    }

    const rate = behind ? 1 + maxCorrection : 1 - maxCorrection;
    const clampedRate = Math.max(0.85, Math.min(1.15, rate));
    audioEngine.setPlaybackRate(clampedRate);
    rateCorrections.current++;
  }, []);

  // ─── Rate Recovery (gradual return to 1.0) ─────────────────────────────────
  const startRateRecovery = useCallback(() => {
    if (rateRecoveryRef.current) return;
    rateRecoveryRef.current = setInterval(() => {
      const currentRate = audioEngine.getPlaybackRate();
      if (correctionMode.current === 'locked' && Math.abs(currentRate - 1.0) > 0.001) {
        // Ease back to 1.0
        const step = (1.0 - currentRate) * 0.3; // 30% of remaining difference per tick
        audioEngine.setPlaybackRate(currentRate + step);
      }
    }, 200);
  }, []);

  // ─── Diagnostics Update Timer ──────────────────────────────────────────────
  useEffect(() => {
    if (!showDiagnostics) return;
    const interval = setInterval(() => setDiagTick(t => t + 1), 500);
    return () => clearInterval(interval);
  }, [showDiagnostics]);

  // ─── Keyboard shortcut for diagnostics ─────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setShowDiagnostics(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // ─── Main Socket Connection ────────────────────────────────────────────────
  useEffect(() => {
    if (!shouldConnect) return;

    // Reset room state when user identity changes (e.g. Logging out)
    setInRoom(false);
    setIsHost(false);
    isHostRef.current = false;
    setRoomId('');
    setInputRoomId('');

    // Reset sync state
    lastSeqNum.current = 0;
    clockOffset.current = 0;
    correctionMode.current = 'locked';
    joinStabilized.current = false;
    joinSyncApplied.current = false;
    joinPlaybackStarted.current = false;
    hardSeekCount.current = 0;
    rateCorrections.current = 0;
    packetsReceived.current = 0;
    packetsDiscarded.current = 0;

    const token = localStorage.getItem('music_player_token');
    const newSocket = io(SOCKET_URL, {
      auth: { token: token || undefined }
    });
    setSocket(newSocket);

    // Run initial clock sync
    newSocket.on('connect', () => {
      runClockSync(newSocket);
    });

    // Start continuous latency measurement
    const cleanupLatency = startLatencyMeasurement(newSocket);

    newSocket.on('room_created', ({ roomId }) => {
      isHostRef.current = true; // Synchronous — prevents processing own sync_state
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
        isHostRef.current = true; // Synchronous
        setIsHost(true);
      }
    });

    // ─── Participant Sync Handler ────────────────────────────────────────
    newSocket.on('sync_state', (data: {
      songId: string;
      currentTime: number;
      isPlaying: boolean;
      hostTimestamp: number;
      playbackTimestamp: number;
      sequenceNumber: number;
    }) => {
      if (isHostRef.current) return; // Host dictates, doesn't listen (synchronous ref)

      packetsReceived.current++;
      lastSyncTime.current = Date.now();

      // Sequence number filtering: discard stale/duplicate packets
      // Gracefully handle missing sequenceNumber (backward compat with old server)
      if (data.sequenceNumber != null && data.sequenceNumber <= lastSeqNum.current) {
        packetsDiscarded.current++;
        return;
      }
      if (data.sequenceNumber != null) lastSeqNum.current = data.sequenceNumber;

      isSyncing.current = true;

      const { songId, currentTime: syncTime, isPlaying: syncIsPlaying, hostTimestamp } = data;
      let trackChanged = false;

      // Update song if different
      if (stateRef.current.currentTrackId !== songId && songId) {
        const track = TRACKS.find(t => t.id === songId);
        if (track) {
          playerRefs.current.playTrack(track, TRACKS, true);
          trackChanged = true;
        }
      }

      // ─── Predictive Position ─────────────────────────────────────────
      // Calculate where playback should currently be, accounting for
      // network transit delay and clock offset.
      // Fallback: if hostTimestamp is missing (old server), use syncTime directly.
      let predictedPosition: number;
      if (hostTimestamp != null && !isNaN(hostTimestamp)) {
        const adjustedNow = Date.now() + clockOffset.current;
        const packetAge = Math.max(0, adjustedNow - hostTimestamp);
        predictedPosition = syncIsPlaying
          ? syncTime + (packetAge / 1000)
          : syncTime;
      } else {
        // Fallback: no latency compensation, use raw position
        predictedPosition = syncTime;
      }

      // ─── Jitter Spike Filter ─────────────────────────────────────────
      // If predicted position diverges wildly from recent trend, skip
      const actualPosition = stateRef.current.currentTime;
      const driftMs = (predictedPosition - actualPosition) * 1000;

      // Store drift for diagnostics
      currentDrift.current = driftMs;

      // If track changed, always seek to predicted position
      if (trackChanged) {
        playerRefs.current.seek(predictedPosition, true);
        joinSyncApplied.current = true;
        // playTrack unconditionally starts playback, so if host is paused, we need to pause it immediately
        if (!syncIsPlaying) {
          playerRefs.current.togglePlay(true, false);
        }
      } else {
        // ─── Join Stabilization (event-driven) ───────────────────────
        if (!joinStabilized.current) {
          if (!joinSyncApplied.current) {
            // Apply initial sync
            playerRefs.current.seek(predictedPosition, true);
            joinSyncApplied.current = true;
          }
          // Check if playback has actually started and buffered
          if (joinSyncApplied.current) {
            const engineTime = audioEngine.getCurrentTime();
            if (engineTime > 0) {
              joinPlaybackStarted.current = true;
            }
            if (joinPlaybackStarted.current) {
              joinStabilized.current = true;
            }
          }
        } else {
          // ─── Normal Drift Correction ─────────────────────────────
          const absDrift = Math.abs(driftMs);

          // Jitter spike filter: only ignore if RTT itself spiked, not drift
          if (currentRTT.current > avgRTT.current * 4 && avgRTT.current > 0 && currentRTT.current > 1000) {
            packetsDiscarded.current++;
            isSyncing.current = false;
            setTimeout(() => { isSyncing.current = false; }, 100);
            return;
          }

          applyDriftCorrection(driftMs);

          if (correctionMode.current === 'seeking') {
            playerRefs.current.seek(predictedPosition, true);
            correctionMode.current = 'locked';
          }
        }
      }

      // Sync play/pause state
      // Account for trackChanged which artificially forces isPlaying to true in the audio engine
      const currentlyPlaying = trackChanged ? syncIsPlaying : stateRef.current.isPlaying;
      if (currentlyPlaying !== syncIsPlaying) {
        playerRefs.current.togglePlay(true, syncIsPlaying);
      }

      setTimeout(() => { isSyncing.current = false; }, 100);
    });

    newSocket.on('error', ({ message }) => {
      setError(message);
    });

    // Start rate recovery loop
    startRateRecovery();

    return () => {
      cleanupLatency();
      newSocket.disconnect();
      if (rateRecoveryRef.current) {
        clearInterval(rateRecoveryRef.current);
        rateRecoveryRef.current = null;
      }
      // Restore normal playback rate on disconnect
      audioEngine.setPlaybackRate(1.0);
    };
  }, [userId, shouldConnect]); // Removed context player functions from dependencies!

  // ─── Host Event-Based Sync (immediate, synchronous with React state) ─────
  // This useEffect fires whenever play/pause, song, or seek changes.
  // It emits the corresponding event IMMEDIATELY — no polling delay.
  useEffect(() => {
    if (!socket || !inRoom || !isHost || isSyncing.current) return;

    // Calculate expected time based on previous state
    let expectedTime = prevSyncState.current.currentTime;
    if (prevSyncState.current.isPlaying) {
      expectedTime += (Date.now() - prevSyncState.current.lastUpdateTime) / 1000;
    }

    const stateChanged =
      prevSyncState.current.songId !== currentTrack.id ||
      Math.abs(expectedTime - currentTime) > 1 ||
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
        lastUpdateTime: Date.now(),
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
      // Reset join stabilization for new room
      joinStabilized.current = false;
      joinSyncApplied.current = false;
      joinPlaybackStarted.current = false;
      lastSeqNum.current = 0;

      socket.emit('join_room', { roomId: inputRoomId, userId });
      setRoomId(inputRoomId);
      setInRoom(true);
      setIsHost(false);
      setError('');

      // Run immediate clock sync for the join
      runClockSync(socket);
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
    isHostRef.current = false;
    setRoomId('');
    setInputRoomId('');
    // Restore playback rate
    audioEngine.setPlaybackRate(1.0);
    correctionMode.current = 'locked';
  };

  // ─── Network Quality Color ─────────────────────────────────────────────────
  const nqColor = () => {
    switch (networkQuality.current) {
      case 'Excellent': return '#22c55e';
      case 'Good': return '#1db954';
      case 'Fair': return '#eab308';
      case 'Poor': return '#ef4444';
    }
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

      {/* Diagnostics toggle (top-right, below close) */}
      {inRoom && (
        <button
          onClick={() => setShowDiagnostics(prev => !prev)}
          title="Toggle Sync Diagnostics (Ctrl+Shift+D)"
          className={`absolute right-3 top-14 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 backdrop-blur-md transition-colors sm:right-6 sm:top-[4.5rem] sm:h-10 sm:w-10 ${showDiagnostics ? 'bg-[#1db954]/30 text-[#1db954]' : 'bg-black/40 text-white hover:bg-black/70'}`}
        >
          <Activity className="h-4 w-4" />
        </button>
      )}

      {/* ─── Diagnostics Overlay ─────────────────────────────────────────── */}
      {showDiagnostics && inRoom && (
        <div className="absolute left-3 bottom-3 z-30 rounded-lg border border-white/10 bg-black/80 p-3 backdrop-blur-xl text-[10px] font-mono text-white/80 sm:left-6 sm:bottom-6 sm:p-4 sm:text-xs min-w-[200px]">
          <div className="mb-2 flex items-center gap-2 text-[#1db954] font-bold text-[11px] sm:text-sm">
            <Activity className="h-3 w-3" /> Sync Diagnostics
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <span className="text-white/50">RTT</span>
            <span>{currentRTT.current}ms</span>
            <span className="text-white/50">Avg RTT</span>
            <span>{avgRTT.current.toFixed(0)}ms</span>
            <span className="text-white/50">Jitter</span>
            <span>{currentJitter.current.toFixed(1)}ms</span>
            <span className="text-white/50">Clock Offset</span>
            <span>{clockOffset.current.toFixed(0)}ms</span>
            <span className="text-white/50">Drift</span>
            <span style={{ color: Math.abs(currentDrift.current) > 100 ? '#ef4444' : Math.abs(currentDrift.current) > 50 ? '#eab308' : '#22c55e' }}>
              {currentDrift.current.toFixed(0)}ms
            </span>
            <span className="text-white/50">Rate</span>
            <span>{audioEngine.getPlaybackRate().toFixed(3)}</span>
            <span className="text-white/50">Mode</span>
            <span style={{ color: correctionMode.current === 'locked' ? '#22c55e' : correctionMode.current === 'seeking' ? '#ef4444' : '#eab308' }}>
              {correctionMode.current}
            </span>
            <span className="text-white/50">Seeks</span>
            <span>{hardSeekCount.current}</span>
            <span className="text-white/50">Rate Fixes</span>
            <span>{rateCorrections.current}</span>
            <span className="text-white/50">Last Sync</span>
            <span>{lastSyncTime.current ? `${((Date.now() - lastSyncTime.current) / 1000).toFixed(1)}s ago` : 'N/A'}</span>
            <span className="text-white/50">Seq #</span>
            <span>{lastSeqNum.current}</span>
            <span className="text-white/50">Packets</span>
            <span>{packetsReceived.current}</span>
            <span className="text-white/50">Discarded</span>
            <span>{packetsDiscarded.current}</span>
            <span className="text-white/50">Network</span>
            <span style={{ color: nqColor() }}>{networkQuality.current}</span>
          </div>
        </div>
      )}

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

            {/* Network quality badge */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: nqColor() }} />
              <span className="text-white/60">Network: </span>
              <span style={{ color: nqColor() }}>{networkQuality.current}</span>
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
