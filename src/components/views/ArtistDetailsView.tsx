import React, { useState } from 'react';
import {
  Play, Pause, Heart, MoreHorizontal, MoreVertical, Plus, Share2, Check, Download, CheckCircle2
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { TRACKS, Track } from '../../data/musicCatalog';
import artistsData from '../../data/artists.json';

export const ArtistDetailsView: React.FC = () => {
  const {
    searchQuery: artistName,
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    likedTracks,
    setAddToPlaylistTrack,
    addToQueue,
    showToast,
    downloadedTracks,
    toggleDownload,
    followedArtists,
    toggleFollowArtist,
  } = usePlayer();

  const [contextMenu, setContextMenu] = useState<{ track: Track } | null>(null);
  const isFollowing = followedArtists.includes(artistName || '');

  if (!artistName) return null;

  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const searchNorm = normalize(artistName);
  const artistInfo = artistsData.find(a => {
    const nameNorm = normalize(a.name);
    return nameNorm === searchNorm || searchNorm.startsWith(nameNorm) || nameNorm.startsWith(searchNorm);
  });
  
  // Find all tracks by this artist (handling comma-separated artists)
  const artistTracks = TRACKS.filter(t =>
    t.artist
      .split(',')
      .map(a => a.trim().toLowerCase())
      .includes(artistName.toLowerCase())
  );

  const albumScoreSuffix = '(original background score)';
  const normalizeForFilter = (s?: string) => (s ?? '').toLowerCase();

  // Exclude "Original Background Score" / "Side A" / "Side B" tracks from artist page
  const filteredArtistTracks = artistTracks.filter((t) => {
    const title = normalizeForFilter(t.title);
    const album = normalizeForFilter((t as any).album ?? (t as any).albumName ?? '');

    const combined = `${title} ${album}`;

    // Always hide Original Background Score variants
    if (combined.includes(albumScoreSuffix)) return false;

    // Also hide side A / side B BGM variants (common examples given by user)
    if ((combined.includes('side a') || combined.includes('side b')) || combined.includes('bgm')) {
      return false;
    }

    // Hide songs that contain "theme" in title/album
    if (combined.includes('theme')) return false;

    return true;
  });

  if (filteredArtistTracks.length === 0) return null;

  const isThisPlaying = isPlaying && filteredArtistTracks.some((t) => t.id === currentTrack.id);

  const handleMasterPlay = () => {
    if (isThisPlaying) togglePlay();
    else if (filteredArtistTracks.length > 0) {
      const inList = filteredArtistTracks.find((t) => t.id === currentTrack.id);
      if (inList) togglePlay();
      else playTrack(filteredArtistTracks[0], filteredArtistTracks);
    }
  };

  const closeMenu = () => setContextMenu(null);

  return (
    <div className="flex flex-col pb-4 select-none" onClick={closeMenu}>
      {/* ── HEADER ── */}
      <div
        className="flex flex-col items-center px-4 pt-4 pb-5 sm:flex-row sm:items-end sm:gap-6 sm:px-6 sm:pt-12 sm:pb-6"
        style={{ background: `linear-gradient(180deg, ${filteredArtistTracks[0]?.color || '#282828'}aa 0%, ${filteredArtistTracks[0]?.color || '#282828'}33 60%, #121212 100%)` }}
      >
        <div
          className="h-48 w-48 shrink-0 rounded-full shadow-2xl sm:h-56 sm:w-56"
          style={{ background: artistInfo?.image ? `url("${artistInfo.image}") center / cover no-repeat` : filteredArtistTracks[0]?.gradient }}
        />
        <div className="mt-4 flex flex-col items-center text-center sm:mt-0 sm:items-start sm:text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center h-5 w-5 bg-[#3d91f4] text-white rounded-full text-xs">
              <Check className="h-3 w-3" strokeWidth={3} />
            </div>
            <span className="text-sm font-medium text-white">Verified Artist</span>
          </div>
          <h1 className="line-clamp-2 text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-8xl sm:py-1">
            {artistName}
          </h1>
          <p className="mt-2 text-[13px] text-white/70 sm:text-sm">
            {(filteredArtistTracks.length * 12345).toLocaleString()} monthly listeners
          </p>
        </div>
      </div>

      {/* ── ACTION BAR ── */}
      <div className="flex items-center gap-6 px-4 py-4 sm:px-6">
        <button
          onClick={handleMasterPlay}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1db954] shadow-xl transition-transform hover:scale-105 active:scale-95 sm:h-14 sm:w-14"
          title={isThisPlaying ? 'Pause' : 'Play'}
        >
          {isThisPlaying
            ? <Pause className="h-6 w-6 fill-black text-black sm:h-7 sm:w-7" />
            : <Play className="h-6 w-6 translate-x-0.5 fill-black text-black sm:h-7 sm:w-7" />}
        </button>
        <button
          onClick={() => toggleFollowArtist(artistName)}
          className="rounded-full border border-white/30 px-4 py-1.5 text-sm font-bold text-white transition hover:border-white"
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
        <button className="text-white/60 transition-transform hover:scale-110 hover:text-white">
          <MoreHorizontal className="h-7 w-7 sm:h-8 sm:w-8" />
        </button>
      </div>

      {/* ── TRACK LIST ── */}
      <div className="flex flex-col px-2 sm:px-6">
        <h2 className="px-2 pb-4 text-xl font-bold text-white sm:px-0 mt-4">Popular</h2>
        {filteredArtistTracks.map((track) => {
          const isCurrent = currentTrack.id === track.id;
          const isLiked = likedTracks.includes(track.id);
          const isMenuOpen = contextMenu?.track.id === track.id;
          const isDownloaded = downloadedTracks.includes(track.id);

          return (
            <div
              key={track.id}
              className={`group relative flex cursor-pointer items-center gap-3 rounded-md px-2 py-2.5 transition-colors sm:px-3 ${isCurrent ? 'bg-white/5' : 'hover:bg-white/5'}`}
              onClick={() => playTrack(track, filteredArtistTracks)}
            >
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
              <div className="flex min-w-0 flex-1 flex-col">
                <span className={`truncate text-[14px] font-medium ${isCurrent ? 'text-[#1db954]' : 'text-white'}`}>{track.title}</span>
              </div>
              <div className="hidden items-center gap-3 sm:flex">
                <button onClick={(e) => { e.stopPropagation(); setAddToPlaylistTrack(track); }} className={`transition ${isLiked ? 'text-[#1db954]' : 'text-transparent group-hover:text-[#b3b3b3] hover:!text-white'}`} title="Add to playlist">
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-[#1db954]' : ''}`} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); addToQueue(track); showToast(`Added to queue`, 'plus'); }} className="text-transparent transition group-hover:text-[#b3b3b3] hover:!text-white">
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
              <button onClick={(e) => { e.stopPropagation(); setContextMenu(isMenuOpen ? null : { track }); }} className="p-1 text-[#b3b3b3] sm:hidden"><MoreVertical className="h-4 w-4" /></button>
              {isMenuOpen && (
                <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl bg-[#282828] shadow-2xl sm:hidden" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => { setAddToPlaylistTrack(track); closeMenu(); }} className="flex w-full items-center gap-3 px-4 py-3.5 text-[14px] text-[#b3b3b3] transition-colors hover:bg-[#3d3d3d] hover:text-white">
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-[#1db954] text-[#1db954]' : ''}`} /><span>Add to playlist</span>
                  </button>
                  <button onClick={() => { addToQueue(track); showToast('Added to queue', 'plus'); closeMenu(); }} className="flex w-full items-center gap-3 px-4 py-3.5 text-[14px] text-[#b3b3b3] transition-colors hover:bg-[#3d3d3d] hover:text-white"><Plus className="h-4 w-4" /><span>Add to queue</span></button>
                  <button
                    onClick={() => { toggleDownload(track); closeMenu(); }}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-[14px] text-[#b3b3b3] transition-colors hover:bg-[#3d3d3d] hover:text-white active:bg-[#3d3d3d]"
                  >
                    {isDownloaded ? <CheckCircle2 className="h-4 w-4 text-[#1db954]" /> : <Download className="h-4 w-4" />}
                    <span className={isDownloaded ? 'text-[#1db954]' : ''}>{isDownloaded ? 'Remove download' : 'Download'}</span>
                  </button>
                  <button onClick={() => { navigator.clipboard?.writeText(window.location.href); showToast('Copied', 'link'); closeMenu(); }} className="flex w-full items-center gap-3 px-4 py-3.5 text-[14px] text-[#b3b3b3] transition-colors hover:bg-[#3d3d3d] hover:text-white"><Share2 className="h-4 w-4" /><span>Share</span></button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};