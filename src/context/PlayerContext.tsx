import React, { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Track, Playlist, TRACKS } from '../data/musicCatalog';
import { audioEngine } from '../services/audioEngine';
import { playlistApi, likeApi, recentlyPlayedApi, playCountApi, libraryApi, mapSongToTrack, homeApi } from '../services/apiClient';
import { useAuth } from './AuthContext';
import { downloadService } from '../services/downloadService';
import { X, Check, Plus, Heart, ListMusic } from 'lucide-react';

export type RepeatMode = 'off' | 'all' | 'one';
export type ViewType =
  | 'home'
  | 'search'
  | 'library'
  | 'playlist'
  | 'liked-songs'
  | 'lyrics'
  | 'visualizer'
  | 'profile'
  | 'all-songs'
  | 'artists'
  | 'artist'
  | 'request-song';

export interface ToastMessage {
  id: number;
  text: string;
  icon?: string;
}

export const isBgmOrScore = (track: Track): boolean => {
  const albumName = (track.album || '').toLowerCase();
  const titleName = (track.title || '').toLowerCase();
  return (
    albumName.includes('(original background score)') ||
    albumName.includes('bgm') ||
    albumName.includes('side a') ||
    albumName.includes('side b') ||
    albumName.includes('instrumental') ||
    albumName.includes('theme') ||
    titleName.includes('theme') ||
    titleName.includes('instrumental') 
  );
};

export interface CustomPlaylist {
  id: string;
  title: string;
  description: string;
  songIds: string[];
  createdAt: string;
}

interface PlayerContextType {
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  queue: Track[];
  history: Track[];
  isShuffle: boolean;
  repeatMode: RepeatMode;
  currentView: ViewType;
  activePlaylist: Playlist | null;
  likedTracks: string[];
  isFullScreen: boolean;
  searchQuery: string;
  isQueueOpen: boolean;
  isFullScreenMenuOpen: boolean;
  toasts: ToastMessage[];
  canGoBack: boolean;
  canGoForward: boolean;
  activeFilter: string;
  customPlaylists: CustomPlaylist[];
  isPlaybackLocked: boolean;

  playbackRate: number;
  setPlaybackRate: (rate: number) => void;
  sleepTimerRemaining: number | null;
  setSleepTimer: (minutes: number | null) => void;

  setIsPlaybackLocked: (locked: boolean) => void;
  playTrack: (track: Track, contextTracks?: Track[], force?: boolean) => void;
  togglePlay: (force?: boolean, forceState?: boolean) => void;
  nextTrack: (force?: boolean) => void;
  prevTrack: (force?: boolean) => void;
  seek: (time: number, force?: boolean) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  reorderQueue: (startIndex: number, endIndex: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleLike: (trackId: string) => void;
  setView: (view: ViewType, playlist?: Playlist | null) => void;
  toggleFullScreen: () => void;
  setSearchQuery: (query: string) => void;
  toggleQueue: () => void;
  setIsFullScreenMenuOpen: (open: boolean) => void;
  showToast: (text: string, icon?: string) => void;
  goBack: () => void;
  goForward: () => void;
  setActiveFilter: (f: string) => void;
  createPlaylist: (title: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  renamePlaylist: (playlistId: string, title: string) => void;
  deletePlaylist: (playlistId: string) => void;
  downloadedTracks: string[];
  toggleDownload: (track: Track) => Promise<void>;
  downloadedPlaylists: string[];
  togglePlaylistDownload: (playlistId: string, isDownloaded: boolean) => void;
  followedArtists: string[];
  toggleFollowArtist: (artistName: string) => void;
  savedAlbums: string[];
  toggleSaveAlbum: (albumName: string) => void;
  addToPlaylistTrack: Track | null;
  setAddToPlaylistTrack: (track: Track | null) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const LAST_TRACK_KEY = 'music_player_last_track';
const PLAYER_SETTINGS_KEY = 'music_player_settings';

const EMPTY_TRACK: Track = {
  id: '' ,
  title: 'No song selected',
  artist: 'Unknown',
  album: '',
  duration: 0,
  genre: '' as any,
  color: '#282828',
  gradient: 'linear-gradient(135deg, #282828, #121212)',
  fileUrl: '',
  coverUrl: ''
};

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track>(EMPTY_TRACK);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const [queue, setQueue] = useState<Track[]>([]);
  const [history, setHistory] = useState<Track[]>(() => {
    try { return JSON.parse(localStorage.getItem('music_player_history') || '[]'); } catch { return []; }
  });
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');

  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);
  const [likedTracks, setLikedTracks] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('music_player_liked_tracks') || '[]'); } catch { return []; }
  });
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isQueueOpen, setIsQueueOpen] = useState<boolean>(false);
  const [isFullScreenMenuOpen, setIsFullScreenMenuOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [viewStack, setViewStack] = useState<{ view: ViewType; playlist: Playlist | null }[]>([{ view: 'home', playlist: null }]);
  const [viewStackIndex, setViewStackIndex] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [customPlaylists, setCustomPlaylists] = useState<CustomPlaylist[]>([]);
  const [isPlaybackLocked, setIsPlaybackLocked] = useState<boolean>(false);
  const [playbackRate, setPlaybackRateState] = useState<number>(1);
  const [sleepTimerEnd, setSleepTimerEnd] = useState<number | null>(null);
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState<number | null>(null);
  const [addToPlaylistTrack, setAddToPlaylistTrack] = useState<Track | null>(null);
  const [newPlTitle, setNewPlTitle] = useState('');
  const [downloadedTracks, setDownloadedTracks] = useState<string[]>([]);
  const [downloadedPlaylists, setDownloadedPlaylists] = useState<string[]>([]);
  const [followedArtists, setFollowedArtists] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('music_player_followed_artists') || '[]'); } catch { return []; }
  });
  const [savedAlbums, setSavedAlbums] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('music_player_saved_albums') || '[]'); } catch { return []; }
  });

  const { isLoggedIn, user } = useAuth();
  const prevVolumeRef = useRef<number>(0.7);
  const toastIdRef = useRef<number>(0);
  const preloadAudioRef = useRef<HTMLAudioElement | null>(null);

  const lastClickPos = useRef<{ x: number; y: number } | null>(null);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});

  // Stop any active media when the player shell unmounts (for example on logout).
  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  useEffect(() => {
    downloadService.init();
    setDownloadedTracks(downloadService.getDownloadedIds());
    setDownloadedPlaylists(downloadService.getDownloadedPlaylists());
  }, []);

  // Global input tracker for popup positioning
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      lastClickPos.current = { x: e.clientX, y: e.clientY };
    };
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.code === 'KeyL') lastClickPos.current = null;
    };
    document.addEventListener('mousedown', handleGlobalClick, true);
    document.addEventListener('keydown', handleGlobalKey, true);
    return () => {
      document.removeEventListener('mousedown', handleGlobalClick, true);
      document.removeEventListener('keydown', handleGlobalKey, true);
    };
  }, []);

  // Check for PWA update flag on load
  useEffect(() => {
    if (sessionStorage.getItem('pwa-updated') === 'true') {
      const v = sessionStorage.getItem('pwa-updated-version');

      showToast(
        v ? `Version ${v} updated successfully` : 'Version updated successfully',
        'check'
      );

      sessionStorage.removeItem('pwa-updated');
      // Keep `pwa-updated-version` so we don't re-show the same
      // “update available” notification after a manual refresh.

      // Clear suppression AFTER the update UI has had time to settle.
      // If we clear it synchronously, the app can re-render and re-open
      // the "update available" UI during the same refresh cycle.
      window.setTimeout(() => {
        sessionStorage.removeItem('pwa-suppress-update-ui');
      }, 1000);
    }
  }, []);
  useEffect(() => {
    if (addToPlaylistTrack && lastClickPos.current) {
      const { x, y } = lastClickPos.current;
      const isRight = x > window.innerWidth / 2;
      const isBottom = y > window.innerHeight / 2;
      setPopupStyle({ position: 'fixed', ...(isBottom ? { bottom: window.innerHeight - y + 15 } : { top: y + 15 }), ...(isRight ? { right: window.innerWidth - x - 15 } : { left: x - 15 }), zIndex: 10000 });
    } else if (addToPlaylistTrack) {
      setPopupStyle({ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10000 });
    }
  }, [addToPlaylistTrack]);

  // Load persistent local settings
  useEffect(() => {
    try {
      const storedLastTrack = localStorage.getItem(LAST_TRACK_KEY);
      if (storedLastTrack) {
        const parsed = JSON.parse(storedLastTrack) as any;
        if (parsed.track) {
          setCurrentTrack(parsed.track);
          setDuration(parsed.track.duration);
          setCurrentTime(parsed.time || 0);
        } else if (parsed.trackId) {
          const match = TRACKS.find((t) => String(t.id) === String(parsed.trackId));
          if (match) {
            setCurrentTrack(match);
            setDuration(match.duration);
            setCurrentTime(parsed.time || 0);
          }
        }
      }

      const storedSettings = localStorage.getItem(PLAYER_SETTINGS_KEY);
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings) as { volume?: number; isShuffle?: boolean; repeatMode?: RepeatMode; playbackRate?: number };
        if (typeof parsed.volume === 'number') setVolumeState(parsed.volume);
        if (typeof parsed.isShuffle === 'boolean') setIsShuffle(parsed.isShuffle);
        if (parsed.repeatMode) setRepeatMode(parsed.repeatMode);
        if (typeof parsed.playbackRate === 'number') {
          setPlaybackRateState(parsed.playbackRate);
          if (typeof (audioEngine as any).setPlaybackRate === 'function') (audioEngine as any).setPlaybackRate(parsed.playbackRate);
        }
      }
    } catch (err) {
      console.warn('[PlayerContext] Failed to load localStorage state', err);
    }
  }, []);

  // Sync with Backend when Auth State Changes
  useEffect(() => {
    // isLoggedIn is safely restored from localStorage, wait for it before fetching!
    if (isLoggedIn) {
      libraryApi.getLibrary().then((res) => {
        if (res.success && res.data) {
          setLikedTracks(res.data.likedSongs?.map((s: any) => String(s._id || s.id)) || []);
          setCustomPlaylists(res.data.playlists?.map((p: any) => ({
            id: p._id,
            title: p.name,
            description: 'Custom playlist',
            songIds: p.songs?.map((s: any) => String(s._id || s.id)) || [],
            createdAt: p.createdAt,
          })));
          setHistory(res.data.recentlyPlayed?.map((s: any) => ({ ...mapSongToTrack(s), playedAt: s.playedAt })) || []);
          setFollowedArtists(res.data.followedArtists || []);
          setSavedAlbums(res.data.savedAlbums || []);

          // Resume the user's last listened song if one exists
          if (res.data.recentlyPlayed.length > 0) {
            const mappedRecent = { ...mapSongToTrack(res.data.recentlyPlayed[0]), playedAt: res.data.recentlyPlayed[0].playedAt };
            setCurrentTrack(prev => prev.id === '' ? (mappedRecent as Track) : prev);
          }
        }
      }).catch(err => console.error("Library sync failed", err));
    } else {
      // Clear user data on logout
      setLikedTracks([]);
      setCustomPlaylists([]);
      setHistory([]);
      setQueue([]);
      setActivePlaylist(null);
      setFollowedArtists([]);
      setSavedAlbums([]);
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    localStorage.setItem('music_player_liked_tracks', JSON.stringify(likedTracks));
  }, [likedTracks]);

  useEffect(() => {
    localStorage.setItem('music_player_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('music_player_followed_artists', JSON.stringify(followedArtists));
  }, [followedArtists]);

  useEffect(() => {
    localStorage.setItem('music_player_saved_albums', JSON.stringify(savedAlbums));
  }, [savedAlbums]);

  // Persist the last track for resume
  useEffect(() => {
    if (currentTrack.id !== '') {
      localStorage.setItem(LAST_TRACK_KEY, JSON.stringify({ track: currentTrack, time: currentTime }));
    }
  }, [currentTrack, currentTime]);



  // Sync playback time
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        const t = audioEngine.getCurrentTime();
        const realDuration = audioEngine.getDuration();
        setCurrentTime(t);
        if (realDuration > 0 && Math.abs(realDuration - duration) > 0.5) {
          setDuration(realDuration);
          // Update the track object globally so the real duration shows up everywhere else
          if (currentTrack) currentTrack.duration = realDuration;
        }
        if (audioEngine.hasEnded() || (realDuration > 0 && t >= realDuration - 0.15)) {
          handleTrackEnd();
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, duration, queue, repeatMode]);

  // Preload next song for instant playback
  useEffect(() => {
    const next = queue[0];
    if (next?.fileUrl) {
      const audio = new Audio(next.fileUrl);
      audio.preload = 'auto';
      audio.onloadedmetadata = () => {
        if (audio.duration && audio.duration > 0 && next) {
          next.duration = audio.duration;
        }
      };
      preloadAudioRef.current = audio;
    }
  }, [queue]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          if (e.shiftKey) nextTrack();
          else seek(currentTime + 10);
          break;
        case 'ArrowLeft':
          if (e.shiftKey) prevTrack();
          else seek(currentTime - 10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.05));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.05));
          break;
        case 'KeyM':
          toggleMute();
          break;
        case 'KeyS':
          toggleShuffle();
          break;
        case 'KeyR':
          toggleRepeat();
          break;
        case 'KeyL':
          if (currentTrack.id !== '') setAddToPlaylistTrack(currentTrack);
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentTime, volume, currentTrack, likedTracks]); // added likedTracks

  const handleTrackEnd = () => {
    if (isPlaybackLocked) return; // Prevent listeners from auto-advancing tracks locally
    if (currentTrack.id === '') return;
    if (repeatMode === 'one') {
      audioEngine.play(currentTrack.genre, currentTrack.duration, 0, currentTrack.fileUrl);
      setCurrentTime(0);
    } else {
      nextTrack();
    }
  };

  const playTrack = (track: Track, contextTracks?: Track[], force: boolean = false) => {
    if (isPlaybackLocked && !force) return;
    if (contextTracks) {
      const trackIndex = contextTracks.findIndex((t) => t.id === track.id);
      if (trackIndex !== -1) {
        let upcoming = contextTracks.slice(trackIndex + 1);
        if (isShuffle) upcoming = [...upcoming].sort(() => 0.5 - Math.random());
        setQueue(upcoming);
      }
    }

    const now = new Date().toISOString();
    setHistory((prev) => {
      // Prevent consecutive duplicate in local history too
      if (prev.length > 0 && prev[0].id === track.id) {
        const newPrev = [...prev];
        newPrev[0] = { ...track, playedAt: now } as any;
        return newPrev;
      }
      return [{ ...track, playedAt: now } as any, ...prev.filter((t) => t.id !== track.id)].slice(0, 20);
    });
    setCurrentTrack(track);
    setDuration(track.duration);
    setCurrentTime(0);
    setIsPlaying(true);
    
    // Sync recently played & play count with backend
    if (isLoggedIn) {
      recentlyPlayedApi.add(track.id).catch(err => console.error("Failed to log play", err));
      playCountApi.increment(track.id).catch(err => console.error("Failed to increment count", err));
    }

    audioEngine.play(track.genre, track.duration, 0, track.fileUrl);
    audioEngine.setVolume(isMuted ? 0 : volume);
    if (typeof (audioEngine as any).setPlaybackRate === 'function') {
      (audioEngine as any).setPlaybackRate(playbackRate);
    }
  };

  const togglePlay = useCallback((force: boolean = false, forceState?: boolean) => {
    if (isPlaybackLocked && !force) return;
    if (currentTrack.id === '') return;
    
    const nextState = forceState !== undefined ? forceState : !isPlaying;

    if (!nextState) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      audioEngine.play(currentTrack.genre, currentTrack.duration, currentTime, currentTrack.fileUrl);
      audioEngine.setVolume(isMuted ? 0 : volume);
      if (typeof (audioEngine as any).setPlaybackRate === 'function') {
        (audioEngine as any).setPlaybackRate(playbackRate);
      }
      setIsPlaying(true);
    }
  }, [isPlaybackLocked, currentTrack.id, isPlaying, isMuted, volume, playbackRate, currentTime]);

  const nextTrack = useCallback((force: boolean = false) => {
    if (isPlaybackLocked && !force) return;

    // Skip quickly tracking: user pressed Next/skip while played < 5s
    if (isLoggedIn && currentTrack.id !== '' && currentTime < 5) {
      homeApi
        .recordSkipAvoid(currentTrack.id)
        .catch(() => {
          // non-blocking / best-effort
        });
    }

    if (queue.length > 0) {
      const next = queue[0];
      setQueue((prev) => prev.slice(1));
      playTrack(next, undefined, force);
    } else if (repeatMode === 'all') {
      const sourceList = activePlaylist ? activePlaylist.tracks : TRACKS.filter(t => !isBgmOrScore(t));
      if (sourceList.length > 0) {
        let nextList = [...sourceList];
        if (isShuffle) nextList = nextList.sort(() => 0.5 - Math.random());
        const next = nextList[0];
        setQueue(nextList.slice(1));
        playTrack(next, undefined, force);
      }
    } else {
      // Queue ended (queue empty).
      // Requirement: never fall back to deterministic "top of list" order (id/title sorted).
      // Even when repeatMode is 'off', pick a random next track and seed the remaining queue randomly.
      const sourceList = activePlaylist ? activePlaylist.tracks : TRACKS;

      // Exclude BGMs/score and the currently playing track (avoid immediate duplicates).
      const validTracks = sourceList.filter((t) => !isBgmOrScore(t) && t.id !== currentTrack.id);

      if (validTracks.length > 0) {
        // Always randomize for the "queue empty" fallback (independent of isShuffle).
        // Use random index instead of taking first element.
        const randomIndex = Math.floor(Math.random() * validTracks.length);
        const next = validTracks[randomIndex];

        // Seed remaining queue: remove `next` then shuffle the rest and cap.
        const rest = validTracks.filter((t) => t.id !== next.id);
        const remaining = [...rest].sort(() => Math.random() - 0.5).slice(0, 19);

        setQueue(remaining.length > 0 ? remaining : [next]); // ensures queue isn't empty in UI
        playTrack(next, undefined as any, force);
      } else {
        audioEngine.stop();
        setIsPlaying(false);
        setCurrentTime(0);
      }
    }
  }, [isPlaybackLocked, queue, repeatMode, isShuffle, activePlaylist, currentTrack.id, currentTime, playbackRate]);

  const prevTrack = useCallback((force: boolean = false) => {
    if (isPlaybackLocked && !force) return;
    if (currentTrack.id === '') return;
    if (currentTime > 3) {
          seek(0, force);
        } else if (history.length > 1) {
          const prev = history[1];
          setHistory((h) => h.slice(2));
      setQueue((q) => [currentTrack, ...q]);
          playTrack(prev, undefined, force);
    } else {
          seek(0, force);
    }
  }, [isPlaybackLocked, currentTrack.id, currentTime, history]);

  const seek = (time: number, force: boolean = false) => {
    if (isPlaybackLocked && !force) return;
    if (currentTrack.id === '') return;
    const clampedTime = Math.max(0, time);
    setCurrentTime(clampedTime);
    audioEngine.seek(clampedTime);
  };

  const setVolume = (vol: number) => {
    const clamped = Math.max(0, Math.min(vol, 1));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) setIsMuted(false);
    audioEngine.setVolume(isMuted ? 0 : clamped);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setVolume(volume);
    } else {
      prevVolumeRef.current = volume;
      setIsMuted(true);
      audioEngine.setVolume(0);
    }
  };

  const addToQueue = (track: Track) => setQueue((prev) => [...prev, track]);
  const removeFromQueue = (index: number) => setQueue((prev) => prev.filter((_, i) => i !== index));
  const clearQueue = () => setQueue([]);

  const reorderQueue = (startIndex: number, endIndex: number) => {
    setQueue((prev) => {
      const result = [...prev];
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const toggleShuffle = () => {
    setIsShuffle((prev) => {
      const nextShuffle = !prev;
      if (nextShuffle) setQueue((q) => [...q].sort(() => 0.5 - Math.random()));
      return nextShuffle;
    });
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => (prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off'));
  };

  const toggleLike = async (trackId: string) => {
    if (!isLoggedIn) {
      showToast('Log in to like songs', 'error');
      return;
    }
    const isLiked = likedTracks.includes(trackId);
    
    // Optimistic UI update
    setLikedTracks((prev) => (isLiked ? prev.filter((id) => id !== trackId) : [...prev, trackId]));

    try {
      if (isLiked) {
        await likeApi.unlike(trackId);
      } else {
        await likeApi.like(trackId);
      }
    } catch (err: any) {
      console.error('Failed to sync like:', err);
      const errMsg = err?.message || '';

      if (!isLiked && errMsg.toLowerCase().includes('already liked')) {
        // We wanted to like it, backend says it's already liked.
        // Our optimistic update was correct, don't revert.
      } else if (isLiked && errMsg.toLowerCase().includes('not found')) {
        // We wanted to unlike it, backend says it's not found (already unliked).
        // Our optimistic update was correct, don't revert.
      } else {
        // Revert on real failure
        setLikedTracks((prev) => (!isLiked ? prev.filter((id) => id !== trackId) : [...prev, trackId]));
        showToast('Action failed', 'error');
      }
    }
  };

  const setView = (view: ViewType, playlist?: Playlist | null) => {
    setCurrentView(view);
    const pl = playlist !== undefined ? playlist : activePlaylist;
    if (playlist !== undefined) setActivePlaylist(playlist);

    setViewStack((prev) => {
      const truncated = prev.slice(0, viewStackIndex + 1);
      return [...truncated, { view, playlist: pl ?? null }];
    });

    setViewStackIndex((prev) => prev + 1);

    // Push dummy history state to enable native swipe-back gestures for view navigation only.
    // This must NOT be used as control flow; it only enables swipe-back popstate events.
    window.history.pushState({ view }, '', window.location.href);
  };

  const goBack = () => {
    if (viewStackIndex <= 0) return;
    const newIdx = viewStackIndex - 1;
    const entry = viewStack[newIdx];
    setCurrentView(entry.view);
    if (entry.playlist !== null) setActivePlaylist(entry.playlist);
    setViewStackIndex(newIdx);
  };

  const goForward = () => {
    if (viewStackIndex >= viewStack.length - 1) return;
    const newIdx = viewStackIndex + 1;
    const entry = viewStack[newIdx];
    setCurrentView(entry.view);
    if (entry.playlist !== null) setActivePlaylist(entry.playlist);
    setViewStackIndex(newIdx);
  };

  const showToast = (text: string, icon?: string) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev.slice(-2), { id, text, icon }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
  };

  // Sleep Timer countdown logic
  useEffect(() => {
    if (sleepTimerEnd) {
      const updateRemaining = () => {
        const remaining = sleepTimerEnd - Date.now();
        if (remaining <= 0) {
          setSleepTimerEnd(null);
          setSleepTimerRemaining(null);
          audioEngine.pause();
          setIsPlaying(false);
          showToast('Sleep timer ended', 'moon');
        } else {
          setSleepTimerRemaining(Math.ceil(remaining / 60000));
        }
      };
      updateRemaining();
      const interval = window.setInterval(updateRemaining, 1000);
      return () => window.clearInterval(interval);
    } else {
      setSleepTimerRemaining(null);
    }
  }, [sleepTimerEnd]);

  const setSleepTimer = (minutes: number | null) => {
    setSleepTimerEnd(minutes === null ? null : Date.now() + minutes * 60000);
    showToast(minutes === null ? 'Sleep timer canceled' : `Sleep timer set for ${minutes} minutes`, 'clock');
  };

  const setPlaybackRate = (rate: number) => {
    setPlaybackRateState(rate);
    if (typeof (audioEngine as any).setPlaybackRate === 'function') {
      (audioEngine as any).setPlaybackRate(rate);
    }
    showToast(`Speed set to ${rate}x`, 'zap');
  };

  const toggleFullScreen = () => setIsFullScreen((prev) => !prev);
  const toggleQueue = () => setIsQueueOpen((prev) => !prev);

  const NAV_ROOT_EXIT_WINDOW_MS = 2000;
  const lastRootBackPressAtRef = useRef<number | null>(null);

  // Hardware back + native swipe-back:
  // - Only affect internal view navigation (viewStack).
  // - If an overlay is open (fullscreen player / queue), do NOT navigate views.
  // - At root (Home): double-press back to exit. First press shows toast and stays.
  useEffect(() => {
    const onPopState = () => {
      // If an overlay is open, do nothing here. Overlays have their own back handling.
      if (isFullScreen || isQueueOpen || isFullScreenMenuOpen) return;

      // Internal navigation stack handling
      if (viewStackIndex > 0) {
        // Compute target BEFORE mutating state
        const newIdx = viewStackIndex - 1;
        const target = viewStack[newIdx]?.view ?? 'home';

        goBack();

        // Re-push a dummy history state so swipe-back continues to work for the view stack
        // without reloading/navigating to external routes.
        window.history.pushState({ view: target }, '', window.location.href);
        return;
      }

      // Root behavior: double-press to exit
      const now = Date.now();
      const last = lastRootBackPressAtRef.current;

      if (last && now - last <= NAV_ROOT_EXIT_WINDOW_MS) {
        // Second press: allow native exit / default behavior
        return;
      }

      lastRootBackPressAtRef.current = now;
      showToast('Press back again to exit', 'info');

      // Cancel the exit by re-pushing root state
      window.history.pushState({ view: 'home' }, '', window.location.href);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [isFullScreen, isQueueOpen, viewStackIndex, viewStack, goBack]);

  const createPlaylist = async (title: string): Promise<string | undefined> => {
    const trimmed = title.trim();
    if (!trimmed) return undefined;
    
    if (!isLoggedIn) {
      showToast('Log in to create playlists');
      return undefined;
    }

    try {
      const res = await playlistApi.create(trimmed);
      if (res.success && res.data) {
        const playlist: CustomPlaylist = {
          id: res.data._id,
          title: res.data.name,
          description: 'Custom playlist',
          songIds: [],
          createdAt: res.data.createdAt,
        };
        setCustomPlaylists((prev) => [playlist, ...prev]);
        showToast('Playlist created', 'check');
        return res.data._id;
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to create playlist');
    }
    return undefined;
  };

  const addSongToPlaylist = async (playlistId: string, songId: string) => {
    if (!isLoggedIn) return;
    try {
      const res = await playlistApi.addSong(playlistId, songId);
      if (res.success) {
        setCustomPlaylists((prev) =>
          prev.map((p) =>
            p.id === playlistId && !p.songIds.includes(songId)
              ? { ...p, songIds: [...p.songIds, songId] }
              : p
          )
        );
        showToast('Added to playlist', 'plus');
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to add song');
    }
  };

  const removeSongFromPlaylist = async (playlistId: string, songId: string) => {
    if (!isLoggedIn) return;
    try {
      const res = await playlistApi.removeSong(playlistId, songId);
      if (res.success) {
        setCustomPlaylists((prev) =>
          prev.map((p) =>
            p.id === playlistId ? { ...p, songIds: p.songIds.filter((id) => id !== songId) } : p
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renamePlaylist = (playlistId: string, title: string) => {
    // Basic local rename, can add backend API if needed
    setCustomPlaylists((prev) =>
      prev.map((p) => (p.id === playlistId ? { ...p, title: title.trim() || p.title } : p))
    );
  };

  const deletePlaylist = async (playlistId: string) => {
    if (!isLoggedIn) return;
    try {
      const res = await playlistApi.delete(playlistId);
      if (res.success) {
        setCustomPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
        showToast('Playlist deleted', 'check');
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to delete playlist');
    }
  };

  const toggleDownload = async (track: Track) => {
    const isDownloaded = downloadedTracks.includes(track.id);
    
    // Optimistic UI update
    setDownloadedTracks((prev) => 
      isDownloaded ? prev.filter((id) => id !== track.id) : [...prev, track.id]
    );

    if (isDownloaded) {
      const success = await downloadService.removeTrack(track);
      if (success) {
        showToast('Removed from downloads', 'minus');
      } else {
        setDownloadedTracks((prev) => [...prev, track.id]);
        showToast('Failed to remove download', 'error');
      }
    } else {
      showToast('Downloading...', 'download');
      const success = await downloadService.downloadTrack(track);
      if (success) {
        showToast('Download complete', 'check');
      } else {
        setDownloadedTracks((prev) => prev.filter((id) => id !== track.id));
        showToast('Download failed', 'error');
      }
    }
  };

  const togglePlaylistDownload = (playlistId: string, isDownloaded: boolean) => {
    setDownloadedPlaylists((prev) => {
      const updated = isDownloaded
        ? [...prev.filter((id) => id !== playlistId), playlistId]
        : prev.filter((id) => id !== playlistId);
      downloadService.saveDownloadedPlaylists(updated);
      return updated;
    });
  };

  const toggleFollowArtist = async (artistName: string) => {
    if (!artistName) return;
    const isFollowing = followedArtists.includes(artistName);
    setFollowedArtists((prev) => isFollowing ? prev.filter(a => a !== artistName) : [...prev, artistName]);
    if (isLoggedIn) {
      libraryApi.toggleFollowArtist(artistName).catch(() => setFollowedArtists((prev) => !isFollowing ? prev.filter(a => a !== artistName) : [...prev, artistName]));
    }
  };

  const toggleSaveAlbum = async (albumName: string) => {
    if (!albumName) return;
    const isSaved = savedAlbums.includes(albumName);
    setSavedAlbums((prev) => isSaved ? prev.filter(a => a !== albumName) : [...prev, albumName]);
    if (isLoggedIn) {
      libraryApi.toggleSaveAlbum(albumName).catch(() => setSavedAlbums((prev) => !isSaved ? prev.filter(a => a !== albumName) : [...prev, albumName]));
    }
  };

  const handleCreatePlaylist = async () => {
    if (!newPlTitle.trim() || !addToPlaylistTrack) return;
    const newId = await createPlaylist(newPlTitle);
    if (newId) {
      addSongToPlaylist(newId, addToPlaylistTrack.id);
    }
    setNewPlTitle('');
    setAddToPlaylistTrack(null);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Media Session API integration (OS lock screen / BT / headset / media keys)
  // Centralized here so it stays tightly coupled with global player state.
  // ─────────────────────────────────────────────────────────────────────────────
  const togglePlayRef = useRef(togglePlay);
  const nextTrackRef = useRef(nextTrack);
  const prevTrackRef = useRef(prevTrack);

  // Keep refs up-to-date with latest PlayerContext callbacks to prevent stale closures.
  togglePlayRef.current = togglePlay;
  nextTrackRef.current = nextTrack;
  prevTrackRef.current = prevTrack;

  const mediaSessionActive = useRef<boolean>(false);

  // Register Media Session handlers exactly once when a valid track is loaded,
  // and keep them registered for the duration of the track's existence.
  useEffect(() => {
    const ms = (navigator as any)?.mediaSession as MediaSession | undefined;
    if (!ms || typeof ms.setActionHandler !== 'function') return;

    const hasValidTrack = currentTrack && currentTrack.id !== '';

    if (hasValidTrack && !mediaSessionActive.current) {
      const safe = (fn: () => void) => {
        try {
          fn();
        } catch (err) {
          console.error('[mediaSession] handler error:', err);
        }
      };

      ms.setActionHandler('play', () => safe(() => togglePlayRef.current()));
      ms.setActionHandler('pause', () => safe(() => togglePlayRef.current()));
      ms.setActionHandler('previoustrack', () => safe(() => prevTrackRef.current()));
      ms.setActionHandler('nexttrack', () => safe(() => nextTrackRef.current()));

      mediaSessionActive.current = true;
    } else if (!hasValidTrack && mediaSessionActive.current) {
      try {
        ms.setActionHandler('play', null);
        ms.setActionHandler('pause', null);
        ms.setActionHandler('previoustrack', null);
        ms.setActionHandler('nexttrack', null);
      } catch (err) {
        console.error('[mediaSession] unregister error:', err);
      }
      mediaSessionActive.current = false;
    }

    return () => {
      // Cleanup on unmount
      if (mediaSessionActive.current) {
        try {
          ms.setActionHandler('play', null);
          ms.setActionHandler('pause', null);
          ms.setActionHandler('previoustrack', null);
          ms.setActionHandler('nexttrack', null);
        } catch {
          // no-op
        }
        mediaSessionActive.current = false;
      }
    };
  }, [currentTrack.id]);

  // Sync playback state with Media Session
  useEffect(() => {
    const ms = (navigator as any)?.mediaSession as MediaSession | undefined;
    if (!ms) return;

    try {
      if (currentTrack && currentTrack.id !== '') {
        ms.playbackState = isPlaying ? 'playing' : 'paused';
      } else {
        ms.playbackState = 'none';
      }
    } catch {
      // ignore
    }
  }, [isPlaying, currentTrack.id]);

  // Update Media Session metadata when track changes
  useEffect(() => {
    const ms = (navigator as any)?.mediaSession as MediaSession | undefined;
    if (!ms) return;

    if (currentTrack && currentTrack.id !== '') {
      const title = currentTrack.title || 'Unknown';
      const artist = currentTrack.artist || 'Unknown';
      const album = currentTrack.album || '';

      const coverUrl = (currentTrack as any).coverUrl as string | undefined;
      const artwork = coverUrl
        ? [
            { src: coverUrl, sizes: '96x96', type: 'image/jpeg' },
            { src: coverUrl, sizes: '128x128', type: 'image/jpeg' },
            { src: coverUrl, sizes: '192x192', type: 'image/jpeg' },
            { src: coverUrl, sizes: '256x256', type: 'image/jpeg' },
            { src: coverUrl, sizes: '384x384', type: 'image/jpeg' },
            { src: coverUrl, sizes: '512x512', type: 'image/jpeg' },
          ]
        : [];

      try {
        ms.metadata = new MediaMetadata({
          title,
          artist,
          album,
          artwork,
        });
      } catch {
        // If MediaMetadata construction fails, degrade gracefully.
      }
    } else {
      try {
        ms.metadata = null;
      } catch {
        // ignore
      }
    }
  }, [currentTrack]);

  const value = useMemo(
    () => ({
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      volume,
      isMuted,
      queue,
      history,
      isShuffle,
      repeatMode,
      currentView,
      activePlaylist,
      likedTracks,
      isFullScreen,
      isPlaybackLocked,
      setIsPlaybackLocked,
      playTrack,
      togglePlay,
      nextTrack,
      prevTrack,
      seek,
      setVolume,
      toggleMute,
      addToQueue,
      removeFromQueue,
      clearQueue,
      reorderQueue,
      toggleShuffle,
      toggleRepeat,
      toggleLike,
      setView,
      toggleFullScreen,
      searchQuery,
      setSearchQuery,
      isQueueOpen,
      isFullScreenMenuOpen,
      toggleQueue,
      setIsFullScreenMenuOpen,
      toasts,
      canGoBack: viewStackIndex > 0,
      canGoForward: viewStackIndex < viewStack.length - 1,
      showToast,
      goBack,
      goForward,
      activeFilter,
      setActiveFilter,
      playbackRate,
      setPlaybackRate,
      sleepTimerRemaining,
      setSleepTimer,
      customPlaylists,
      createPlaylist,
      addSongToPlaylist,
      removeSongFromPlaylist,
      renamePlaylist,
      deletePlaylist,
      downloadedTracks,
      toggleDownload,
      downloadedPlaylists,
      togglePlaylistDownload,
      followedArtists,
      toggleFollowArtist,
      savedAlbums,
      toggleSaveAlbum,
      addToPlaylistTrack,
      setAddToPlaylistTrack,
    }),
    [
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      volume,
      isMuted,
      queue,
      history,
      isShuffle,
      repeatMode,
      currentView,
      activePlaylist,
      likedTracks,
      isFullScreen,
      searchQuery,
      isQueueOpen,
      toasts,
      viewStackIndex,
      viewStack.length,
      activeFilter,
      playbackRate,
      sleepTimerRemaining,
      customPlaylists,
      isPlaybackLocked,
      downloadedTracks,
      downloadedPlaylists,
      followedArtists,
      savedAlbums,
      addToPlaylistTrack,
    ]
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
      {addToPlaylistTrack && (
        <>
          <div className="fixed inset-0 z-[9999]" onClick={() => setAddToPlaylistTrack(null)} />
          <div className="flex w-64 flex-col overflow-hidden rounded-xl bg-[#282828] shadow-2xl border border-white/10 select-none" style={popupStyle}>
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-sm font-bold text-white">
              <span>Add to playlist</span>
              <button onClick={() => setAddToPlaylistTrack(null)} className="text-[#b3b3b3] hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col p-1.5 max-h-[50vh] overflow-y-auto scrollbar-none">
              <div className="flex items-center gap-2 p-1.5 pb-2">
                <input 
                  type="text" 
                  placeholder="New playlist" 
                  value={newPlTitle}
                  onChange={(e) => setNewPlTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreatePlaylist()}
                  className="flex-1 rounded bg-[#121212] px-2.5 py-1.5 text-xs text-white outline-none border border-white/10 focus:border-[#1db954]"
                />
                <button 
                  onClick={handleCreatePlaylist}
                  disabled={!newPlTitle.trim()}
                  className="rounded bg-[#1db954] p-1.5 text-black disabled:opacity-50 transition-transform hover:scale-105 active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="h-px w-full bg-white/5 my-1 shrink-0" />
              
              <button 
                onClick={() => { toggleLike(addToPlaylistTrack.id); setAddToPlaylistTrack(null); }} 
                className="group flex w-full items-center gap-2.5 rounded-md p-1.5 hover:bg-white/10 transition-colors"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded shadow-sm bg-gradient-to-br from-[#450af5] to-[#c4efd9]">
                  <Heart className="h-4 w-4 fill-white text-white" />
                </div>
                <span className="text-xs font-bold text-white">Liked Songs</span>
                {likedTracks.includes(addToPlaylistTrack.id) && (
                  <Check className="ml-auto h-4 w-4 text-[#1db954]" />
                )}
              </button>

              {customPlaylists.map(pl => {
                const isInPl = pl.songIds.includes(addToPlaylistTrack.id);
                return (
                  <button 
                    key={pl.id}
                    onClick={() => {
                      if (isInPl) removeSongFromPlaylist(pl.id, addToPlaylistTrack.id);
                      else addSongToPlaylist(pl.id, addToPlaylistTrack.id);
                      setAddToPlaylistTrack(null);
                    }} 
                    className="group flex w-full items-center gap-2.5 rounded-md p-1.5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded shadow-sm bg-[#333]">
                      <ListMusic className="h-4 w-4 text-[#b3b3b3]" />
                    </div>
                    <span className="text-xs font-bold text-white truncate">{pl.title}</span>
                    {isInPl && (
                      <Check className="ml-auto h-4 w-4 text-[#1db954] shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within a PlayerProvider');
  return context;
};
