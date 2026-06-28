import React, { useState } from 'react';
import { Play, Pause, Heart, MoreHorizontal, MoreVertical, Plus, Share2, Download, CheckCircle2 } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { TRACKS, Track } from '../../data/musicCatalog';

export const LikedSongsView: React.FC = () => {
  const {
    currentTrack, isPlaying, playTrack, togglePlay,
    likedTracks, setAddToPlaylistTrack,
    addToQueue, showToast, setView, setSearchQuery,
    downloadedTracks,
    toggleDownload,
  } = usePlayer();

  const [contextMenu, setContextMenu] = useState<{ track: Track } | null>(null);

  const likedSongs = TRACKS.filter(t => likedTracks.includes(t.id));
  const totalSeconds = likedSongs.reduce((a, t) => a + t.duration, 0);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const isThisPlaying = isPlaying && likedSongs.some(t => t.id === currentTrack.id);

  const handleMasterPlay = () => {
    if (likedSongs.length === 0) return;
    if (isThisPlaying) togglePlay();
    else {
      const inLiked = likedSongs.find(t => t.id === currentTrack.id);
      if (inLiked) togglePlay();
      else playTrack(likedSongs[0], likedSongs);
    }
  };

  const closeMenu = () => setContextMenu(null);

  return (
    <div className="flex flex-col pb-4 select-none" onClick={closeMenu}>
      {/* ── HEADER ── */}
      <div
        className="flex flex-col items-center px-4 pt-4 pb-5 sm:flex-row sm:items-end sm:gap-6 sm:px-6 sm:pt-12 sm:pb-6"
        style={{
          background: 'linear-gradient(180deg, #5e2ea8aa 0%, #5e2ea833 60%, #121212 100%)'
        }}
      >
        <div
          className="h-48 w-48 shrink-0 rounded-md shadow-2xl flex items-center justify-center sm:h-56 sm:w-56"
          style={{
            background: 'linear-gradient(135deg, #450af5 0%, #c4efd9 100%)'
          }}
        >
          <Heart className="h-20 w-20 fill-white text-white sm:h-24 sm:w-24" />
        </div>
        <div className="mt-4 flex flex-col items-center text-center sm:mt-0 sm:items-start sm:text-left">
          <span className="hidden text-xs font-bold uppercase tracking-widest text-white/60 sm:block">Playlist</span>
          <h1 className="line-clamp-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl sm:py-1">
            Liked Songs
          </h1>
          <p className="mt-1 text-[13px] text-white/60 sm:text-sm">Your favorite tracks, all in one place</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-1 text-[11px] text-white/50 sm:justify-start sm:text-sm">
            <span className="font-bold text-white">You</span>
            <span>•</span>
            <span>{likedSongs.length} songs{totalMinutes > 0 && `, about ${totalMinutes} min`}</span>
          </div>
        </div>
      </div>

      {/* ── ACTION BAR ── */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-5">
          <button className="text-white/60 transition-transform hover:scale-110 hover:text-white">
            <MoreHorizontal className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>
        </div>

        <div className="flex items-center gap-4">
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
        {likedSongs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Heart className="h-16 w-16 text-[#b3b3b3] mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Songs you like will appear here</h2>
            <p className="text-[#b3b3b3] mb-6">Save songs by tapping the heart icon.</p>
            <button
              onClick={() => setView('search')}
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-black transition-transform hover:scale-105"
            >
              Find songs
            </button>
          </div>
        ) : (
          likedSongs.map((track) => {
            const isCurrent = currentTrack.id === track.id;
            const isMenuOpen = contextMenu?.track.id === track.id;
            const isDownloaded = downloadedTracks.includes(track.id);

            return (
              <div
                key={track.id}
                className={`group relative flex cursor-pointer items-center gap-3 rounded-md px-2 py-2.5 transition-colors sm:px-3 ${isCurrent ? 'bg-white/5' : 'hover:bg-white/5'}`}
                onClick={() => playTrack(track, likedSongs)}
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
                    {(track.artist || '').split(',').map((a, i) => (
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

                {/* Desktop: like + add to queue + duration */}
                <div className="hidden items-center gap-3 sm:flex">
                  <button
                    onClick={(e) => { e.stopPropagation(); setAddToPlaylistTrack(track); }}
                    className="text-[#1db954] transition hover:scale-110"
                    title="Add to playlist"
                  >
                    <Heart className="h-4 w-4 fill-[#1db954]" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); addToQueue(track); showToast('Added to queue', 'plus'); }}
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
                      <Heart className="h-4 w-4 fill-[#1db954] text-[#1db954]" />
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
          })
        )}
      </div>
    </div>
  );
};
