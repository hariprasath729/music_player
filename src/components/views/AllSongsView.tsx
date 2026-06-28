import React from 'react';
import { Heart, Download, CheckCircle2 } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { TRACKS } from '../../data/musicCatalog';

export const AllSongsView: React.FC = () => {
  const { currentTrack, isPlaying, playTrack, setAddToPlaylistTrack, likedTracks, setView, setSearchQuery, downloadedTracks, toggleDownload } = usePlayer();

  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-6">
      <h1 className="text-3xl font-bold text-white">All Songs</h1>
      <p className="text-[#b3b3b3]">{TRACKS.length} tracks in your library</p>

      <div className="flex flex-col gap-2">
        {TRACKS.map((track) => {
          const isCurrent = currentTrack.id === track.id;
          const isLiked = likedTracks.includes(track.id);
          const isDownloaded = downloadedTracks.includes(track.id);

          return (
            <div
              key={track.id}
              onClick={() => playTrack(track, TRACKS)}
              className={`group flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors ${
                isCurrent ? 'bg-white/5' : 'hover:bg-white/5'
              } cursor-pointer`}
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded">
                <div className="h-full w-full" style={{ background: track.gradient }} />
                {isCurrent && isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <div className="flex items-end gap-[2px] h-4">
                      <div className="w-[3px] animate-wave-1 rounded-full bg-[#1db954]" />
                      <div className="w-[3px] animate-wave-2 rounded-full bg-[#1db954]" />
                      <div className="w-[3px] animate-wave-3 rounded-full bg-[#1db954]" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <span className={`truncate text-sm font-medium ${isCurrent ? 'text-[#1db954]' : 'text-white'}`}>
                  {track.title}
                </span>
                <span className="truncate text-xs text-[#b3b3b3]">
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

              <button
                onClick={(e) => { e.stopPropagation(); setAddToPlaylistTrack(track); }}
                className={`p-2 rounded-full transition ${isLiked ? 'text-[#1db954]' : 'text-[#b3b3b3] hover:text-white'}`}
                title="Add to playlist"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-[#1db954]' : ''}`} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); toggleDownload(track); }}
                className={`p-2 rounded-full transition ${isDownloaded ? 'text-[#1db954]' : 'text-[#b3b3b3] hover:text-white'}`}
                title={isDownloaded ? 'Remove download' : 'Download'}
              >
                {isDownloaded ? <CheckCircle2 className="h-4 w-4 text-[#1db954]" /> : <Download className="h-4 w-4" />}
              </button>

              <span className="w-12 text-right text-xs text-[#b3b3b3] tabular-nums">
                {Math.floor(track.duration / 60)}:{String(Math.floor(track.duration % 60)).padStart(2, '0')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
