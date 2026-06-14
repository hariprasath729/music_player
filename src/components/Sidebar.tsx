import React, { useState } from 'react';
import { Home, Search, Library, Plus, Heart, Pin, PanelLeftClose, PanelLeft, Music } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { PLAYLISTS, TRACKS } from '../data/musicCatalog';

type LibraryFilter = 'Playlists' | 'Music';

export const Sidebar: React.FC = () => {
  const { currentView, setView, activePlaylist, likedTracks, currentTrack, playTrack } = usePlayer();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filter, setFilter] = useState<LibraryFilter>('Playlists');

  return (
    <aside
      className={`hidden h-full flex-col gap-2 bg-[#121212] p-2 text-sm font-medium text-[#b3b3b3] select-none md:flex transition-[width] duration-300 ease-in-out shrink-0 ${
        isCollapsed ? 'w-[80px]' : 'w-64'
      }`}
    >
      {/* Top Nav Box */}
      <div className="bg-[#121212] rounded-lg px-2 py-2 flex flex-col gap-1">
        <button
          onClick={() => setView('home')}
          className={`flex items-center gap-4 px-3 py-3 rounded-md transition-colors hover:text-white ${
            currentView === 'home' ? 'text-white' : ''
          } ${isCollapsed ? 'justify-center' : ''}`}
          title="Home"
        >
          <Home className="w-6 h-6 shrink-0" />
          {!isCollapsed && <span className="font-bold animate-fade-in truncate">Home</span>}
        </button>

        <button
          onClick={() => setView('search')}
          className={`flex items-center gap-4 px-3 py-3 rounded-md transition-colors hover:text-white ${
            currentView === 'search' ? 'text-white' : ''
          } ${isCollapsed ? 'justify-center' : ''}`}
          title="Search"
        >
          <Search className="w-6 h-6 shrink-0" />
          {!isCollapsed && <span className="font-bold animate-fade-in truncate">Search</span>}
        </button>
      </div>

      {/* Library Box */}
      <div className="bg-[#121212] rounded-lg flex-1 flex flex-col overflow-hidden">
        {/* Library Header */}
        <div className={`px-3 py-3 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <button
            onClick={() => setView('library')}
            className={`flex items-center gap-3 transition-colors hover:text-white ${
              currentView === 'library' ? 'text-white' : ''
            }`}
            title="Your Library"
          >
            <Library className="w-6 h-6 shrink-0" />
            {!isCollapsed && <span className="font-bold animate-fade-in truncate">Your Library</span>}
          </button>

          {!isCollapsed && (
            <div className="flex items-center gap-1">
              <button
                className="p-1.5 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-colors"
                title="Create playlist or folder"
              >
                <Plus className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-1.5 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-colors"
                title="Collapse sidebar"
              >
                <PanelLeftClose className="w-5 h-5" />
              </button>
            </div>
          )}
          {isCollapsed && (
            <button
              onClick={() => setIsCollapsed(false)}
              className="p-1.5 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-colors"
              title="Expand sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills (functional) */}
        {!isCollapsed && (
          <div className="px-4 py-2 flex gap-2 animate-fade-in">
            <button
              onClick={() => setFilter('Playlists')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                filter === 'Playlists'
                  ? 'bg-white text-black'
                  : 'bg-[#232323] text-white hover:bg-[#2a2a2a]'
              }`}
            >
              Playlists
            </button>
            <button
              onClick={() => setFilter('Music')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                filter === 'Music'
                  ? 'bg-white text-black'
                  : 'bg-[#232323] text-white hover:bg-[#2a2a2a]'
              }`}
            >
              Music
            </button>
          </div>
        )}

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
          {filter === 'Playlists' && (
            <>
              {/* Liked Songs */}
              <button
                onClick={() => setView('liked-songs')}
                className={`w-full flex items-center gap-3 p-1.5 rounded-md hover:bg-[#1a1a1a] transition-colors text-left ${
                  currentView === 'liked-songs' ? 'bg-[#232323] text-white' : ''
                } ${isCollapsed ? 'justify-center' : ''}`}
                title="Liked Songs"
              >
                <div className="w-12 h-12 rounded flex items-center justify-center bg-gradient-to-br from-[#450af5] to-[#c4efd9] text-white shrink-0 shadow-md">
                  <Heart className="w-6 h-6 fill-white" />
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col overflow-hidden animate-fade-in">
                    <span className="text-white font-bold truncate">Liked Songs</span>
                    <span className="text-xs text-[#a7a7a7] flex items-center gap-1">
                      <Pin className="w-3 h-3 fill-[#1db954] text-[#1db954]" /> Playlist • {likedTracks.length} songs
                    </span>
                  </div>
                )}
              </button>

              {/* Preset Playlists */}
              {PLAYLISTS.map((playlist) => {
                const isActive = currentView === 'playlist' && activePlaylist?.id === playlist.id;
                return (
                  <button
                    key={playlist.id}
                    onClick={() => setView('playlist', playlist)}
                    className={`w-full flex items-center gap-3 p-1.5 rounded-md hover:bg-[#1a1a1a] transition-colors text-left ${
                      isActive ? 'bg-[#232323] text-white' : ''
                    } ${isCollapsed ? 'justify-center' : ''}`}
                    title={`${playlist.title} • ${playlist.tracks.length} tracks`}
                  >
                    <div
                      className="w-12 h-12 rounded shrink-0 shadow-md"
                      style={{ background: playlist.coverGradient }}
                    />
                    {!isCollapsed && (
                      <div className="flex flex-col overflow-hidden animate-fade-in">
                        <span className={`font-bold truncate ${isActive ? 'text-[#1db954]' : 'text-white'}`}>
                          {playlist.title}
                        </span>
                        <span className="text-xs text-[#a7a7a7] truncate">
                          Playlist • {playlist.tracks.length} tracks
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </>
          )}

          {filter === 'Music' && (
            <>
              {TRACKS.map((track) => {
                const isCurrent = currentTrack.id === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => playTrack(track, TRACKS)}
                    className={`w-full flex items-center gap-3 p-1.5 rounded-md hover:bg-[#1a1a1a] transition-colors text-left ${
                      isCurrent ? 'bg-[#232323]' : ''
                    } ${isCollapsed ? 'justify-center' : ''}`}
                    title={`${track.title} • ${track.artist}`}
                  >
                    <div className="relative w-12 h-12 rounded shrink-0 shadow-md overflow-hidden" style={{ background: track.gradient }}>
                      {isCurrent && (
                        <div className="absolute inset-0 flex items-end justify-center gap-[2px] bg-black/40 pb-1.5">
                          <div className="w-[3px] animate-wave-1 rounded-full bg-[#1db954]" />
                          <div className="w-[3px] animate-wave-2 rounded-full bg-[#1db954]" />
                          <div className="w-[3px] animate-wave-3 rounded-full bg-[#1db954]" />
                        </div>
                      )}
                    </div>
                    {!isCollapsed && (
                      <div className="flex flex-col overflow-hidden animate-fade-in">
                        <span className={`font-bold truncate ${isCurrent ? 'text-[#1db954]' : 'text-white'}`}>
                          {track.title}
                        </span>
                        <span className="text-xs text-[#a7a7a7] flex items-center gap-1 truncate">
                          <Music className="w-3 h-3 shrink-0" /> {track.artist}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>
    </aside>
  );
};
