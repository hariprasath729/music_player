import React, { useState } from 'react';
import {
  Play, Pause, Heart, MoreHorizontal, ArrowDownCircle,
  Shuffle, MoreVertical, Plus, Share2, ListMusic, Check, Download, CheckCircle2,
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { Track } from '../../data/musicCatalog';

export const PlaylistView: React.FC = () => {
  const {
    activePlaylist, currentTrack, isPlaying, playTrack, togglePlay,
    likedTracks, setAddToPlaylistTrack, isShuffle,
    addToQueue, showToast, toggleQueue, setView, setSearchQuery,
    downloadedTracks, toggleDownload, downloadedPlaylists, togglePlaylistDownload
  } = usePlayer();

  const [contextMenu, setContextMenu] = useState<{ track: Track } | null>(null);
  const [playlistMenuOpen, setPlaylistMenuOpen] = useState(false);
  const [likedPlaylist, setLikedPlaylist] = useState(false);

  if (!activePlaylist) return null;
  const downloaded = downloadedPlaylists.includes(activePlaylist.id);

  const totalSeconds = activePlaylist.tracks.reduce((a, t) => a + t.duration, 0);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const isThisPlaying = isPlaying && activePlaylist.tracks.some((t) => t.id === currentTrack.id);

  const handleMasterPlay = () => {
    if (isThisPlaying) togglePlay();
    else if (activePlaylist.tracks.length > 0) {
      const inPlaylist = activePlaylist.tracks.find((t) => t.id === currentTrack.id);
      if (inPlaylist) togglePlay();
      else playTrack(activePlaylist.tracks[0], activePlaylist.tracks);
    }
  };

  const closeMenu = () => {
    setContextMenu(null);
    setPlaylistMenuOpen(false);
  };

  return (
    <div className="flex flex-col pb-4 select-none" onClick={closeMenu}>
      {/* ── HEADER ── */}
      <div
        className="flex flex-col items-center px-4 pt-4 pb-5 sm:flex-row sm:items-end sm:gap-6 sm:px-6 sm:pt-12 sm:pb-6"
        style={{ background: `linear-gradient(180deg, ${activePlaylist.primaryColor}aa 0%, ${activePlaylist.primaryColor}33 60%, #121212 100%)` }}
      >
        <div className="h-48 w-48 shrink-0 rounded-md shadow-2xl sm:h-56 sm:w-56" style={{ background: activePlaylist.coverGradient }} />
        <div className="mt-4 flex flex-col items-center text-center sm:mt-0 sm:items-start sm:text-left">
          <span className="hidden text-xs font-bold uppercase tracking-widest text-white/60 sm:block">Playlist</span>
          <h1 className="line-clamp-2 text-2xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl sm:py-1">
            {activePlaylist.title}
          </h1>
          <p className="mt-1 text-[13px] text-white/60 sm:text-sm">{activePlaylist.description}</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-1 text-[11px] text-white/50 sm:justify-start sm:text-sm">
            <span className="font-bold text-white">Music Player</span>
            <span>•</span>
            <span>{activePlaylist.likes} likes</span>
            <span>•</span>
            <span>{activePlaylist.tracks.length} songs, about {totalMinutes} min</span>
          </div>
        </div>
      </div>

      {/* ── ACTION BAR ── */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-5">
          {/* Like playlist */}
          <button
            onClick={() => setLikedPlaylist(p => !p)}
            className={`transition-transform hover:scale-110 ${likedPlaylist ? 'text-[#1db954]' : 'text-white/60 hover:text-white'}`}
            title={likedPlaylist ? 'Remove from library' : 'Save to library'}
          >
            <Heart className={`h-6 w-6 sm:h-7 sm:w-7 ${likedPlaylist ? 'fill-[#1db954]' : ''}`} />
          </button>

          {/* Download */}
          <button
            onClick={async () => {
              const isNowDownloaded = !downloaded;
              togglePlaylistDownload(activePlaylist.id, isNowDownloaded);
              if (isNowDownloaded) {
                showToast(`Downloading ${activePlaylist.title}...`, 'download');
                for (const t of activePlaylist.tracks) {
                  if (!downloadedTracks.includes(t.id)) await toggleDownload(t);
                }
                showToast(`Downloaded ${activePlaylist.title}`, 'check');
              }
            }}
            className={`transition-transform hover:scale-110 ${downloaded ? 'text-[#1db954]' : 'text-white/60 hover:text-white'}`}
            title={downloaded ? 'Remove download' : 'Download'}
          >
            {downloaded ? <Check className="h-6 w-6 sm:h-7 sm:w-7" /> : <ArrowDownCircle className="h-6 w-6 sm:h-7 sm:w-7" />}
          </button>

          {/* Share */}
          <button
            onClick={() => { navigator.clipboard?.writeText(window.location.href); showToast('Link copied to clipboard', 'link'); }}
            className="text-white/60 transition-transform hover:scale-110 hover:text-white"
            title="Share"
          >
            <Share2 className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>

          {/* Add all to queue */}
          <button
            onClick={() => { activePlaylist.tracks.forEach(t => addToQueue(t)); toggleQueue(); showToast(`Added ${activePlaylist.tracks.length} tracks to queue`, 'plus'); }}
            className="hidden text-white/60 transition-transform hover:scale-110 hover:text-white sm:block"
            title="Add all to queue"
          >
            <ListMusic className="h-6 w-6" />
          </button>

          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setPlaylistMenuOpen(m => !m); setContextMenu(null); }}
              className="text-white/60 transition-transform hover:scale-110 hover:text-white"
            >
              <MoreHorizontal className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>
            {playlistMenuOpen && (
              <>
                <div className="fixed inset-0 z-[99]" onClick={closeMenu} />
                <div className="absolute left-0 top-10 z-[100] max-h-80 w-64 overflow-y-auto rounded-xl bg-[#282828] shadow-2xl">
                  <button
                    onClick={() => {
                      setLikedPlaylist(p => !p);
                      showToast(likedPlaylist ? 'Removed from library' : 'Saved to library', 'check');
                      closeMenu();
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-[14px] text-[#b3b3b3] transition-colors hover:bg-[#3d3d3d] hover:text-white"
                  >
                    <Heart className={`h-4 w-4 ${likedPlaylist ? 'fill-[#1db954] text-[#1db954]' : ''}`} />
                    <span>{likedPlaylist ? 'Remove from library' : 'Save to library'}</span>
                  </button>
                  <div className="border-t border-white/10 px-4 pb-1 pt-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Go to Artist
                  </div>
                  {Array.from(new Set(activePlaylist.tracks.flatMap(t => t.artist.split(',').map(a => a.trim())))).map(artistName => (
                    <button
                      key={artistName}
                      onClick={() => {
                        setSearchQuery(artistName);
                        setView('artist');
                        closeMenu();
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-[14px] text-[#b3b3b3] transition-colors hover:bg-[#3d3d3d] hover:text-white"
                    >
                      <span className="truncate">{artistName}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => { if (!isShuffle && activePlaylist.tracks.length) { const shuffled = [...activePlaylist.tracks].sort(() => Math.random() - 0.5); playTrack(shuffled[0], shuffled); } }}
            className={`transition-transform hover:scale-110 ${isShuffle ? 'text-[#1db954]' : 'text-white/60 hover:text-white'}`}
            title="Shuffle play"
          >
            <Shuffle className="h-6 w-6" />
          </button>
          <button
            onClick={handleMasterPlay}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1db954] shadow-xl transition-transform hover:scale-105 active:scale-95 sm:h-14 sm:w-14"
            title={isThisPlaying ? 'Pause' : 'Play'}
          >
            {isThisPlaying
              ? <Pause className="h-6 w-6 fill-black text-black sm:h-7 sm:w-7" />
              : <Play className="h-6 w-6 translate-x-0.5 fill-black text-black sm:h-7 sm:w-7" />}
          </button>
        </div>
      </div>

      {/* ── TRACK LIST ── */}
      <div className="flex flex-col px-2 sm:px-6">
        {activePlaylist.tracks.map((track) => {
          const isCurrent = currentTrack.id === track.id;
          const isLiked = likedTracks.includes(track.id);
          const isMenuOpen = contextMenu?.track.id === track.id;
          const isDownloaded = downloadedTracks.includes(track.id);

          return (
            <div
              key={track.id}
              className={`group relative flex cursor-pointer items-center gap-3 rounded-md px-2 py-2.5 transition-colors sm:px-3 ${isCurrent ? 'bg-white/5' : 'hover:bg-white/5'}`}
              onClick={() => playTrack(track, activePlaylist.tracks)}
            >
              {/* Cover art */}
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded shadow sm:h-10 sm:w-10" style={{ background: track.gradient }}>
                {isCurrent ? (
                  <div className="flex h-full w-full items-end justify-center gap-[2px] bg-black/40 pb-2">
                    <div className="w-[3px] animate-wave-1 rounded-full bg-[#1db954]" />
                    <div className="w-[3px] animate-wave-2 rounded-full bg-[#1db954]" />
                    <div className="w-[3px] animate-wave-3 rounded-full bg-[#1db954]" />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                    <Play className="h-5 w-5 fill-white text-white" />
                  </div>
                )}
              </div>

              {/* Title & Artist */}
              <div className="flex min-w-0 flex-1 flex-col">
                <span className={`truncate text-[14px] font-medium ${isCurrent ? 'text-[#1db954]' : 'text-white'}`}>
                  {track.title}
                </span>
                <span className="truncate text-[12px] text-[#b3b3b3]">
                  {track.artist.split(',').map((a, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && ', '}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchQuery(a.trim());
                          setView('artist');
                        }}
                        className="hover:underline hover:text-white"
                      >
                        {a.trim()}
                      </span>
                    </React.Fragment>
                  ))}
                </span>
              </div>

              {/* Desktop: like + duration */}
              <div className="hidden items-center gap-3 sm:flex">
                <button
                  onClick={(e) => { e.stopPropagation(); setAddToPlaylistTrack(track); }}
                  className={`transition ${isLiked ? 'text-[#1db954]' : 'text-transparent group-hover:text-[#b3b3b3] hover:!text-white'}`}
                  title="Add to playlist"
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-[#1db954]' : ''}`} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); addToQueue(track); showToast(`Added to queue`, 'plus'); }}
                  className="text-transparent transition group-hover:text-[#b3b3b3] hover:!text-white"
                  title="Add to queue"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleDownload(track); }}
                  className={`transition ${isDownloaded ? 'text-[#1db954]' : 'text-transparent group-hover:text-[#b3b3b3] hover:!text-white'}`}
                  title={isDownloaded ? 'Remove download' : 'Download'}
                >
                  {isDownloaded ? <CheckCircle2 className="h-4 w-4 text-[#1db954]" /> : <Download className="h-4 w-4" />}
                </button>
                <span className="w-10 text-right text-[12px] tabular-nums text-[#b3b3b3]">
                  {Math.floor(track.duration / 60)}:{String(Math.floor(track.duration % 60)).padStart(2, '0')}
                </span>
              </div>

              {/* Mobile: 3-dot menu trigger */}
              <button
                onClick={(e) => { e.stopPropagation(); setContextMenu(isMenuOpen ? null : { track }); }}
                className="p-1 text-[#b3b3b3] sm:hidden"
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              {/* Context menu (mobile) */}
              {isMenuOpen && (
                <div
                  className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl bg-[#282828] shadow-2xl sm:hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                      onClick={() => { setAddToPlaylistTrack(track); closeMenu(); }}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-[14px] text-[#b3b3b3] transition-colors hover:bg-[#3d3d3d] hover:text-white active:bg-[#3d3d3d]"
                  >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-[#1db954] text-[#1db954]' : ''}`} />
                      <span>Add to playlist</span>
                  </button>
                  <button
                    onClick={() => { addToQueue(track); showToast('Added to queue', 'plus'); closeMenu(); }}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-[14px] text-[#b3b3b3] transition-colors hover:bg-[#3d3d3d] hover:text-white active:bg-[#3d3d3d]"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add to queue</span>
                  </button>
                  <button
                    onClick={() => { toggleDownload(track); closeMenu(); }}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-[14px] text-[#b3b3b3] transition-colors hover:bg-[#3d3d3d] hover:text-white active:bg-[#3d3d3d]"
                  >
                    {isDownloaded ? <CheckCircle2 className="h-4 w-4 text-[#1db954]" /> : <Download className="h-4 w-4" />}
                    <span className={isDownloaded ? 'text-[#1db954]' : ''}>{isDownloaded ? 'Remove download' : 'Download'}</span>
                  </button>
                  <button
                    onClick={() => { navigator.clipboard?.writeText(window.location.href); showToast('Link copied to clipboard', 'link'); closeMenu(); }}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-[14px] text-[#b3b3b3] transition-colors hover:bg-[#3d3d3d] hover:text-white active:bg-[#3d3d3d]"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
