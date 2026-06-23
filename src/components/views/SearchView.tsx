import React from 'react';
import { Play, Heart, Plus } from 'lucide-react';
import { usePlayer, isBgmOrScore } from '../../context/PlayerContext';
import { TRACKS, PLAYLISTS, CATEGORIES, Track } from '../../data/musicCatalog';
import { searchTracks, searchPlaylists } from '../../utils/search';

export const SearchView: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    playTrack,
    setView,
    likedTracks,
    toggleLike,
    addToQueue,
    showToast,
  } = usePlayer();

  const filteredTracks = searchTracks(TRACKS, searchQuery);
  const filteredPlaylists = searchPlaylists(PLAYLISTS, searchQuery);

  const topResult = filteredTracks[0];

  const handleSearchPlay = (track: Track) => {
    const validTracks = TRACKS.filter((t) => !isBgmOrScore(t));
    const upcoming = [...validTracks]
      .sort(() => 0.5 - Math.random())
      .slice(0, 50);
    playTrack(track, [track, ...upcoming.filter((t) => t.id !== track.id)]);
  };

  return (
    <div className="flex flex-col gap-5 px-4 py-2 pb-4 sm:gap-8 sm:px-6 sm:pb-8">
      {searchQuery.trim() === '' ? (
        /* ── BROWSE ALL ── */
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white sm:text-2xl">Browse all</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSearchQuery(cat.title)}
                className="relative aspect-[1.6] cursor-pointer overflow-hidden rounded-lg p-3 transition-transform active:scale-95 sm:aspect-square sm:p-4"
                style={{ backgroundColor: cat.color }}
              >
                <span className="relative z-10 text-[15px] font-bold text-white sm:text-lg">
                  {cat.title}
                </span>
                <div className="absolute -bottom-1 -right-3 h-16 w-16 rotate-[25deg] rounded-md bg-black/20 shadow sm:h-20 sm:w-20" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ── SEARCH RESULTS ── */
        <div className="flex flex-col gap-6">
          {/* Top result */}
          {topResult && (
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-white sm:text-2xl">Top result</h2>
              <div
                onClick={() => handleSearchPlay(topResult)}
                className="group relative flex cursor-pointer items-center gap-3 rounded-lg bg-[#181818] p-3 transition-colors hover:bg-[#282828] active:bg-[#282828] sm:h-64 sm:flex-col sm:items-start sm:justify-end sm:gap-4 sm:p-5"
              >
                <div className="h-14 w-14 shrink-0 rounded shadow-lg sm:h-24 sm:w-24" style={{ background: topResult.gradient }} />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <h3 className="truncate text-[16px] font-bold text-white sm:text-3xl">{topResult.title}</h3>
                  <p className="text-[12px] text-[#b3b3b3] sm:text-sm">
                    {topResult.artist} •{' '}
                    <span className="rounded-full bg-[#3d3d3d] px-2 py-0.5 text-[10px] font-bold uppercase text-white">Song</span>
                  </p>
                </div>
                {/* Play button (desktop hover) */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleSearchPlay(topResult); }}
                  className="absolute bottom-5 right-5 hidden h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-[#1db954] shadow-xl opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 sm:flex hover:scale-105"
                >
                  <Play className="h-6 w-6 translate-x-0.5 fill-black text-black" />
                </button>
              </div>
            </div>
          )}

          {/* Songs */}
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-white sm:text-2xl">Songs</h2>
            {filteredTracks.slice(0, 6).map((track) => {
              const isLiked = likedTracks.includes(track.id);

              return (
                <div
                  key={track.id}
                  onClick={() => handleSearchPlay(track)}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-1 py-2 transition-colors hover:bg-white/5 active:bg-white/5"
                >
                  <div className="h-11 w-11 shrink-0 rounded" style={{ background: track.gradient }} />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[14px] font-medium text-white">
                      {track.title}
                    </span>
                    <span className="truncate text-[12px] text-[#b3b3b3]">
                      {track.artist}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Like */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(track.id);
                        // Play only when explicitly touching Like
                        handleSearchPlay(track);
                      }}
                      className={`flex h-9 w-9 items-center justify-center rounded-full transition
                        ${isLiked ? 'text-[#1db954]' : 'text-white/60 hover:text-white'}`}
                      title={isLiked ? 'Liked' : 'Like'}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-[#1db954]' : ''}`} />
                    </button>

                    {/* Add to queue */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToQueue(track);
                        showToast('Added to queue', 'plus');
                        // Play only when explicitly touching + Add to queue
                        handleSearchPlay(track);
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition hover:text-white hover:bg-white/5"
                      title="Add to queue"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
            {filteredTracks.length === 0 && (
              <p className="py-4 text-sm text-[#b3b3b3]">No results found for "{searchQuery}"</p>
            )}
          </div>

          {/* Playlists */}
          {filteredPlaylists.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-white sm:text-2xl">Playlists</h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:pb-0 md:grid-cols-4 lg:grid-cols-6">
                {filteredPlaylists.map((pl) => (
                  <div
                    key={pl.id}
                    onClick={() => setView('playlist', pl)}
                    className="group flex w-[140px] shrink-0 cursor-pointer flex-col gap-2 rounded-md bg-[#181818] p-3 transition-colors hover:bg-[#282828] sm:w-auto sm:p-4"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-md shadow-lg">
                      <div className="h-full w-full" style={{ background: pl.coverGradient }} />
                      <button
                        onClick={(e) => { e.stopPropagation(); if (pl.tracks.length) playTrack(pl.tracks[0], pl.tracks); }}
                        className="absolute bottom-2 right-2 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-[#1db954] opacity-0 shadow-xl transition-all group-hover:translate-y-0 group-hover:opacity-100 hover:scale-105"
                      >
                        <Play className="h-5 w-5 translate-x-0.5 fill-black text-black" />
                      </button>
                    </div>
                    <h3 className="truncate text-[13px] font-bold text-white">{pl.title}</h3>
                    <p className="line-clamp-2 text-[11px] text-[#b3b3b3]">{pl.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredTracks.length === 0 && filteredPlaylists.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <p className="text-2xl font-bold text-white">No results found</p>
              <p className="text-[#b3b3b3]">Try different keywords or check the spelling</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 rounded-full bg-white px-6 py-2 text-sm font-bold text-black transition hover:scale-105"
              >
                Browse categories
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
