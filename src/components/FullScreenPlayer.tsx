import React, { useState } from 'react';
import {
  ChevronDown,
  MoreHorizontal,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Share2,
  ListMusic,
  Volume2,
  VolumeX,
  Volume1,
  Plus,
  User,
  Disc,
  Download,
  CheckCircle2,
  Album,
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { PLAYLISTS } from '../data/musicCatalog';
import { TRACKS } from '../data/musicCatalog';
import artistsData from '../data/artists.json';

export const FullScreenPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    likedTracks,
    isFullScreen,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    setAddToPlaylistTrack,
    toggleFullScreen,
    toggleQueue,
    showToast,
    customPlaylists,
    addSongToPlaylist,
    setView,
    setSearchQuery,
    savedAlbums,
    toggleSaveAlbum,
    downloadedTracks,
    toggleDownload,
  } = usePlayer();

  const [showMenu, setShowMenu] = useState(false);

  if (!isFullScreen) return null;

  const isLiked = likedTracks.includes(currentTrack.id);
  const isDownloaded = downloadedTracks.includes(currentTrack.id);

  const fmt = (s: number) => {
    if (isNaN(s)) return '0:00';
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  };

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.4 ? Volume1 : Volume2;

  return (
    <div
      className="fixed inset-0 z-50 flex h-[100dvh] flex-col overflow-hidden select-none"
      style={{
        background: `
          radial-gradient(circle at 50% 8%, ${currentTrack.color}99 0%, ${currentTrack.color}44 28%, transparent 58%),
          linear-gradient(180deg, rgba(20,20,20,0.6) 0%, rgba(8,8,8,0.9) 60%, #000 100%)
        `,
      }}
    >
      {/* Full-screen glass overlay with album color tint */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[40px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-black/60" />
      
      {/* Large blurred album gradient in background */}
      <div
        className="pointer-events-none absolute left-1/2 top-[15%] h-[70vh] w-[85vw] max-w-[600px] -translate-x-1/2 rounded-full opacity-25 blur-[80px]"
        style={{ background: currentTrack.gradient }}
      />

      {/* ─── TOP BAR ─── */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-[env(safe-area-inset-top,12px)] pb-2 sm:pt-6">
        <button
          onClick={() => toggleFullScreen()}
          className="rounded-full p-1 text-white active:scale-90"
        >
          <ChevronDown className="h-7 w-7" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/60">
            Playing from playlist
          </span>
          <span
            onClick={() => {
              if (!currentTrack.album) return;
              const albumPlaylist = PLAYLISTS.find(p => p.title === currentTrack.album);
              if (albumPlaylist) {
                setView('playlist', albumPlaylist);
              } else {
                const albumTracks = TRACKS.filter(t => t.album === currentTrack.album);
                setView('playlist', {
                  id: `album-${currentTrack.album}`,
                  title: currentTrack.album,
                  description: `Album by ${currentTrack.artist}`,
                  coverGradient: currentTrack.gradient || '#282828',
                  primaryColor: currentTrack.color || '#282828',
                  tracks: albumTracks,
                  likes: 0
                } as any);
              }
              toggleFullScreen();
            }}
            className="max-w-[200px] truncate text-[13px] font-bold text-white hover:underline cursor-pointer"
          >
            {currentTrack.album || 'Single'}
          </span>
        </div>
        <button 
          onClick={() => setShowMenu(m => !m)}
          className="rounded-full p-1 text-white active:scale-90 hover:bg-white/10"
        >
          <MoreHorizontal className="h-6 w-6" />
        </button>
      </div>

      {/* ─── ALBUM ART (centered, flexible) ─── */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-8 py-4 sm:px-16">
        <div
          className="aspect-square w-full max-w-[min(85vw,420px)] rounded-lg border border-white/10 shadow-2xl shadow-black/50"
          style={{ background: currentTrack.gradient }}
        />
      </div>

      {/* ─── BOTTOM CONTROLS ─── */}
      <div className="relative z-10 flex flex-col gap-4 px-6 pb-[env(safe-area-inset-bottom,24px)] sm:px-12 sm:pb-10">
        {/* Title row */}
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-xl font-extrabold text-white sm:text-2xl">
              {currentTrack.title}
            </span>
            <span className="truncate text-sm font-medium text-white/60 sm:text-base">
              {currentTrack.artist.split(',').map((a, i) => (
                <React.Fragment key={i}>
                  {i > 0 && ', '}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery(a.trim());
                      setView('artist');
                      toggleFullScreen();
                    }}
                    className="hover:text-white hover:underline cursor-pointer transition-colors"
                  >
                    {a.trim()}
                  </span>
                </React.Fragment>
              ))}
            </span>
          </div>
          <div className="flex items-center gap-4 pl-4">
            <button
              onClick={() => toggleDownload(currentTrack)}
              className={`shrink-0 transition-transform hover:scale-110 ${isDownloaded ? 'text-[#1db954]' : 'text-white/60'}`}
              title={isDownloaded ? 'Remove download' : 'Download'}
            >
              {isDownloaded ? <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 text-[#1db954]" /> : <Download className="h-6 w-6 sm:h-7 sm:w-7" />}
            </button>
            <button
              onClick={() => setAddToPlaylistTrack(currentTrack)}
              className={`shrink-0 transition-transform hover:scale-110 ${isLiked ? 'text-[#1db954]' : 'text-white/60'}`}
            >
              <Heart className={`h-6 w-6 sm:h-7 sm:w-7 ${isLiked ? 'fill-[#1db954]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-1">
          <div className="group/bar relative flex h-3 cursor-pointer items-center">
            <input
              type="range"
              min={0}
              max={duration || 1}
              value={currentTime}
              onChange={(e) => seek(parseFloat(e.target.value))}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0"
            />
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/30 group-hover/bar:h-1.5">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              />
            </div>
            <div
              className="absolute h-3 w-3 rounded-full bg-white shadow-md"
              style={{ left: `calc(${(currentTime / (duration || 1)) * 100}% - 6px)` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-medium tabular-nums text-white/50">
            <span>{fmt(currentTime)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>

        {/* Transport controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => toggleShuffle()}
            className={`transition ${isShuffle ? 'text-[#1db954]' : 'text-white/60'}`}
          >
            <Shuffle className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button onClick={() => prevTrack()} className="text-white active:scale-90">
            <SkipBack className="h-8 w-8 fill-current sm:h-9 sm:w-9" />
          </button>
          <button
            onClick={() => togglePlay()}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white active:scale-95 sm:h-[72px] sm:w-[72px]"
          >
            {isPlaying ? (
              <Pause className="h-9 w-9 fill-black text-black sm:h-10 sm:w-10" />
            ) : (
              <Play className="h-9 w-9 translate-x-[2px] fill-black text-black sm:h-10 sm:w-10" />
            )}
          </button>
          <button onClick={() => nextTrack()} className="text-white active:scale-90">
            <SkipForward className="h-8 w-8 fill-current sm:h-9 sm:w-9" />
          </button>
          <button
            onClick={() => toggleRepeat()}
            className={`relative transition ${repeatMode !== 'off' ? 'text-[#1db954]' : 'text-white/60'}`}
          >
            <Repeat className="h-5 w-5 sm:h-6 sm:w-6" />
            {repeatMode === 'one' && (
              <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1db954] text-[8px] font-extrabold text-black">
                1
              </span>
            )}
          </button>
        </div>

        {/* Bottom utility row */}
        <div className="flex items-center justify-between pt-1 text-white/60">
          <button
            onClick={() => { navigator.clipboard?.writeText(`${window.location.origin}?track=${currentTrack.id}`); showToast('Link copied to clipboard', 'link'); }}
            className="rounded-full p-2 transition hover:bg-white/10 hover:text-white"
            title="Share"
          >
            <Share2 className="h-5 w-5" />
          </button>

          {/* Volume (desktop-only) */}
          <div className="hidden items-center gap-2 sm:flex">
            <button onClick={() => toggleMute()} className="rounded-full p-1 transition hover:bg-white/10 hover:text-white">
              <VolumeIcon className="h-5 w-5" />
            </button>
            <div className="group/vol relative flex h-3 w-24 cursor-pointer items-center">
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0"
              />
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
                <div className="h-full bg-white group-hover/vol:bg-[#1db954]" style={{ width: `${(isMuted ? 0 : volume) * 100}%` }} />
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              toggleFullScreen();
              toggleQueue();
            }}
            className="rounded-full p-2 transition hover:bg-white/10 hover:text-white"
            title="View queue"
          >
            <ListMusic className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ── 3-DOT DROPDOWN: fixed, always above every layer ── */}
      {showMenu && (
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setShowMenu(false)} />
          <div className="fixed right-4 top-16 z-[9999] w-60 overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e] shadow-2xl sm:right-6">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(`${window.location.origin}?track=${currentTrack.id}`);
                showToast('Link copied to clipboard', 'link');
                setShowMenu(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <Share2 className="h-4 w-4 shrink-0 text-white/70" />
              <span>Share</span>
            </button>
            {currentTrack.artist.split(',').map((a) => {
              const artistName = a.trim();
              const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
              const searchNorm = normalize(artistName);
              const artistInfo = artistsData.find(info => {
                const nameNorm = normalize(info.name);
                return nameNorm === searchNorm || searchNorm.startsWith(nameNorm) || nameNorm.startsWith(searchNorm);
              });
              return (
                <button
                  key={artistName}
                  onClick={() => {
                    setSearchQuery(artistName);
                    setView('artist');
                    toggleFullScreen();
                    setShowMenu(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  {artistInfo?.image ? (
                    <img src={artistInfo.image} alt={artistName} className="h-5 w-5 shrink-0 rounded-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 shrink-0 p-0.5 text-white/70" />
                  )}
                  <span className="truncate">Go to {artistName}</span>
                </button>
              );
            })}
            {currentTrack.album && (
              <button
                onClick={() => {
                  const albumPlaylist = PLAYLISTS.find(p => p.title === currentTrack.album);
                  if (albumPlaylist) {
                    setView('playlist', albumPlaylist);
                  } else {
                    const albumTracks = TRACKS.filter(t => t.album === currentTrack.album);
                    setView('playlist', {
                      id: `album-${currentTrack.album}`,
                      title: currentTrack.album,
                      description: `Album by ${currentTrack.artist}`,
                      coverGradient: currentTrack.gradient || '#282828',
                      primaryColor: currentTrack.color || '#282828',
                      tracks: albumTracks,
                      likes: 0
                    } as any);
                  }
                  toggleFullScreen();
                  setShowMenu(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <Album className="h-4 w-4 shrink-0 text-white/70" />
                <span className="truncate">Go to Album</span>
              </button>
            )}
            <button
              onClick={() => {
                if (!currentTrack.album) {
                  showToast('No album info', 'minus');
                  setShowMenu(false);
                  return;
                }
                toggleSaveAlbum(currentTrack.album);
                showToast(savedAlbums.includes(currentTrack.album) ? 'Removed Album' : 'Saved Album', 'check');
                setShowMenu(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <Disc className="h-4 w-4 shrink-0 text-white/70" />
              <span>{savedAlbums.includes(currentTrack.album) ? 'Remove Album from Library' : 'Save Album to Library'}</span>
            </button>
            {customPlaylists.length > 0 && (
              <>
                <div className="border-t border-white/10 px-4 pb-1 pt-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Add to playlist
                </div>
                {customPlaylists.slice(0, 5).map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => {
                      addSongToPlaylist(playlist.id, currentTrack.id);
                      showToast(`Added to "${playlist.title}"`, 'plus');
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    <Plus className="h-4 w-4 shrink-0 text-white/70" />
                    <span className="truncate">{playlist.title}</span>
                  </button>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
