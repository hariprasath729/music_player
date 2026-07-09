import React, { useState } from 'react';
import { Search, X, ArrowLeft, Download, CheckCircle2 } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { TRACKS, PLAYLISTS } from '../../data/musicCatalog';
import { CircularDownloadButton } from '../CircularDownloadButton';

export const DownloadsView: React.FC = () => {
  const {
    playTrack,
    setView,
    currentTrack,
    customPlaylists,
    downloadedTracks,
    downloadedPlaylists,
    toggleDownload,
    downloadProgress,
  } = usePlayer();

  const [searchOpen, setSearchOpen] = useState(false);
  const [downloadSearch, setDownloadSearch] = useState('');
  const [downloadTab, setDownloadTab] = useState<'Songs' | 'Playlists'>('Songs');

  const renderRow = (
    title: string,
    subtitle: string,
    cover: string,
    onClick: () => void,
    highlight = false,
    right?: React.ReactNode,
    isCircle = false
  ) => (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/5 active:bg-white/5 sm:px-6 w-full text-left"
    >
      <div className={`h-14 w-14 shrink-0 shadow sm:h-16 sm:w-16 ${isCircle ? 'rounded-full' : 'rounded'}`} style={{ background: cover }} />
      <div className="flex min-w-0 flex-1 flex-col text-left">
        <span className={`truncate text-[15px] font-bold ${highlight ? 'text-[#1db954]' : 'text-white'}`}>{title}</span>
        <span className="truncate text-[12px] text-[#b3b3b3]">{subtitle}</span>
      </div>
      {right}
    </button>
  );

  return (
    <div className="flex flex-col pb-24 select-none min-h-full bg-gradient-to-b from-[#181818] to-[#121212]">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('home')}
            className="rounded-full bg-black/40 p-2 text-white/70 hover:text-white transition-colors"
            title="Back to Home"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-[22px] font-bold text-white sm:text-3xl flex items-center gap-2">
            Downloads
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSearchOpen((s) => !s);
              setDownloadSearch('');
            }}
            className="text-[#b3b3b3] transition hover:text-white p-2 rounded-full hover:bg-white/5"
            title="Search downloads"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      {searchOpen && (
        <div className="relative px-4 py-3 sm:px-6 bg-black/10">
          <input
            type="text"
            placeholder="Search within downloads..."
            value={downloadSearch}
            onChange={(e) => setDownloadSearch(e.target.value)}
            className="w-full rounded-md bg-[#2a2a2a] py-2 pl-4 pr-10 text-sm text-white placeholder-[#7f7f7f] focus:outline-none focus:ring-1 focus:ring-[#1db954]"
            autoFocus
          />
          {downloadSearch && (
            <button
              onClick={() => setDownloadSearch('')}
              className="absolute right-8 top-1/2 -translate-y-1/2 text-[#b3b3b3] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* TABS */}
      <div className="flex gap-6 border-b border-[#282828] px-4 pt-4 sm:px-6 bg-black/5">
        <button
          onClick={() => setDownloadTab('Songs')}
          className={`pb-3 text-sm font-bold transition-colors relative ${downloadTab === 'Songs' ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}
        >
          Songs ({downloadedTracks.length})
          {downloadTab === 'Songs' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1db954]" />}
        </button>
        <button
          onClick={() => setDownloadTab('Playlists')}
          className={`pb-3 text-sm font-bold transition-colors relative ${downloadTab === 'Playlists' ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}
        >
          Playlists ({downloadedPlaylists.length})
          {downloadTab === 'Playlists' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1db954]" />}
        </button>
      </div>

      {/* LIST CONTENT */}
      <div className="flex flex-col pt-2">
        {downloadTab === 'Songs' && (
          downloadedTracks.length > 0 ? (
            (() => {
              const matchedSongs = TRACKS.filter((t) => downloadedTracks.includes(t.id))
                .filter((t) =>
                  (t.title || '').toLowerCase().includes(downloadSearch.toLowerCase()) ||
                  (t.artist || '').toLowerCase().includes(downloadSearch.toLowerCase()) ||
                  (t.album || '').toLowerCase().includes(downloadSearch.toLowerCase())
                );

              if (matchedSongs.length === 0) {
                return (
                  <div className="py-12 text-center text-[#b3b3b3]">
                    <p className="text-base">No matching downloaded songs found</p>
                  </div>
                );
              }

              return matchedSongs.map((t, idx) => (
                <React.Fragment key={`downloads-song-${t.id}-${idx}`}>
                  {renderRow(
                    t.title,
                    `${t.artist} • ${t.album}`,
                    t.gradient || '#282828',
                    () => playTrack(t, matchedSongs),
                    t.id === currentTrack.id,
                    <CircularDownloadButton
                      isDownloaded={true}
                      progress={downloadProgress[t.id]}
                      onClick={(e) => { e.stopPropagation(); toggleDownload(t); }}
                      className="text-[#1db954]"
                      size={16}
                    />
                  )}
                </React.Fragment>
              ));
            })()
          ) : (
            <div className="py-20 text-center text-[#b3b3b3] px-4">
              <Download className="h-12 w-12 text-white/20 mx-auto mb-4" />
              <p className="text-lg font-bold text-white">No downloaded songs</p>
              <p className="mt-1 text-sm max-w-xs mx-auto text-white/50">Songs you download for offline playback will appear here.</p>
            </div>
          )
        )}

        {downloadTab === 'Playlists' && (
          downloadedPlaylists.length > 0 ? (
            (() => {
              const matchedPlaylists = [...PLAYLISTS, ...customPlaylists]
                .filter((p) => downloadedPlaylists.includes(p.id))
                .filter((p) => (p.title || '').toLowerCase().includes(downloadSearch.toLowerCase()));

              if (matchedPlaylists.length === 0) {
                return (
                  <div className="py-12 text-center text-[#b3b3b3]">
                    <p className="text-base">No matching downloaded playlists found</p>
                  </div>
                );
              }

              return matchedPlaylists.map((pl, idx) => {
                const songs = ('tracks' in pl) ? (pl as any).tracks : TRACKS.filter(t => (pl as any).songIds.includes(t.id));
                const cover = ('coverGradient' in pl) ? (pl as any).coverGradient : (songs[0]?.gradient || 'linear-gradient(135deg,#333,#111)');
                return (
                  <React.Fragment key={`downloads-pl-${pl.id}-${idx}`}>
                    {renderRow(
                      pl.title,
                      `Playlist • ${songs.length} songs`,
                      cover,
                      () => setView('playlist', pl as any),
                      false,
                      <CheckCircle2 className="h-4 w-4 text-[#1db954] shrink-0" />
                    )}
                  </React.Fragment>
                );
              });
            })()
          ) : (
            <div className="py-20 text-center text-[#b3b3b3] px-4">
              <Download className="h-12 w-12 text-white/20 mx-auto mb-4" />
              <p className="text-lg font-bold text-white">No downloaded playlists</p>
              <p className="mt-1 text-sm max-w-xs mx-auto text-white/50">Playlists you download for offline playback will appear here.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
