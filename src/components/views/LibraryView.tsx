import React, { useMemo, useState } from 'react';
import { Plus, Search, ArrowDownUp, X, Trash2, Pencil } from 'lucide-react';
import { usePlayer, isBgmOrScore } from '../../context/PlayerContext';
import { TRACKS, PLAYLISTS } from '../../data/musicCatalog';
import artistsData from '../../data/artists.json';

type SortMode = 'Recents' | 'A-Z' | 'Creator';
type FilterMode = 'All' | 'Playlists' | 'Artists' | 'Albums' | 'Downloaded' | 'Recently Played';

export const LibraryView: React.FC = () => {
  const {
    likedTracks,
    playTrack,
    setView,
    currentTrack,
    isPlaying,
    customPlaylists,
    createPlaylist,
    deletePlaylist,
    renamePlaylist,
    setSearchQuery,
    history,
    downloadedTracks,
    toggleDownload,
    downloadedPlaylists,
    followedArtists,
    savedAlbums,
    activeFilter,
    setActiveFilter,
  } = usePlayer();

  const filter = (activeFilter as FilterMode) || 'All';
  const setFilter = setActiveFilter;
  const [sort, setSort] = useState<SortMode>('Recents');
  const [searchOpen, setSearchOpen] = useState(false);
  const [librarySearch, setLibrarySearch] = useState('');
  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [downloadTab, setDownloadTab] = useState<'Songs' | 'Playlists'>('Songs');

  const savedTracks = TRACKS.filter((t) => likedTracks.includes(t.id));
  const albums = useMemo(() => {
    const grouped = new Map<string, (typeof TRACKS)[number][]>();
    TRACKS.forEach((t) => {
      if (!t.album) return;
      if (!grouped.has(t.album)) grouped.set(t.album, []);
      grouped.get(t.album)!.push(t);
    });
    return Array.from(grouped.entries()).map(([album, tracks]) => ({
      album,
      tracks,
      cover: tracks[0]?.gradient,
      artist: tracks[0]?.artist,
    }));
  }, []);

  const artists = useMemo(() => {
    const grouped = new Map<string, (typeof TRACKS)[number][]>();
    TRACKS.forEach((t) => {
      if (isBgmOrScore(t)) return;
      t.artist.split(',').map(a => a.trim()).forEach((artistName) => {
        if (!grouped.has(artistName)) grouped.set(artistName, []);
        grouped.get(artistName)!.push(t);
      });
    });
    return Array.from(grouped.entries()).map(([artist, tracks]) => {
      const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
      const searchNorm = normalize(artist);
      const info = artistsData.find(a => {
        const nameNorm = normalize(a.name);
        return nameNorm === searchNorm || searchNorm.startsWith(nameNorm) || nameNorm.startsWith(searchNorm);
      });
      return {
        artist,
        tracks,
        cover: info?.image ? `url("${info.image}") center / cover no-repeat` : tracks[0]?.gradient,
      };
    });
  }, []);

  let filteredPlaylists = [...customPlaylists];
  if (librarySearch) {
    filteredPlaylists = filteredPlaylists.filter((p) => (p.title || '').toLowerCase().includes(librarySearch.toLowerCase()));
  }
  if (sort === 'A-Z') filteredPlaylists = filteredPlaylists.sort((a, b) => a.title.localeCompare(b.title));

  const filters: FilterMode[] = ['All', 'Playlists', 'Artists', 'Albums', 'Downloaded', 'Recently Played'];
  const sorts: SortMode[] = ['Recents', 'A-Z', 'Creator'];

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
      className="flex items-center gap-3 px-4 py-2 transition-colors hover:bg-white/5 active:bg-white/5 sm:px-6"
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
    <div className="flex flex-col pb-4 select-none">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-2 sm:px-6 sm:py-4">
        <h1 className="text-[22px] font-bold text-white sm:text-3xl">Your Library</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSearchOpen((s) => !s);
              setLibrarySearch('');
            }}
            className="text-[#b3b3b3] transition hover:text-white"
            title="Search library"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowCreate((s) => !s)}
            className="text-[#b3b3b3] transition hover:text-white"
            title="Create playlist"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Create playlist inline */}
      {showCreate && (
        <div className="px-4 pb-3 sm:px-6">
          <div className="flex gap-2 rounded-xl bg-[#1d1d1d] p-2">
            <input
              value={newPlaylistTitle}
              onChange={(e) => setNewPlaylistTitle(e.target.value)}
              placeholder="New playlist name"
              className="flex-1 rounded-lg bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-[#777]"
            />
            <button
              onClick={() => {
                if (!newPlaylistTitle.trim()) return;
                createPlaylist(newPlaylistTitle);
                setNewPlaylistTitle('');
                setShowCreate(false);
              }}
              className="rounded-lg bg-[#1db954] px-4 py-2 text-sm font-bold text-black transition hover:brightness-110"
            >
              Create
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      {searchOpen && (
        <div className="relative px-4 pb-2 sm:px-6">
          <Search className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-[#757575] sm:left-9" />
          <input
            type="text"
            value={librarySearch}
            onChange={(e) => setLibrarySearch(e.target.value)}
            placeholder="Find in your library"
            className="w-full rounded-md bg-[#2a2a2a] py-2.5 pl-9 pr-9 text-[14px] text-white placeholder-[#757575] focus:outline-none focus:ring-1 focus:ring-white"
            autoFocus
          />
          {librarySearch && (
            <button onClick={() => setLibrarySearch('')} className="absolute right-7 top-1/2 -translate-y-1/2 text-[#757575] sm:right-9">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-none sm:px-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-bold transition-colors ${
              filter === f ? 'bg-white text-black' : 'bg-[#2a2a2a] text-white hover:bg-[#3d3d3d]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Sort row */}
      <div className="flex items-center justify-between px-4 py-1 sm:px-6">
        <div className="flex gap-1">
          {sorts.map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-medium transition-colors ${
                sort === s ? 'bg-[#2a2a2a] text-white' : 'text-[#b3b3b3] hover:text-white'
              }`}
            >
              {sort === s && <ArrowDownUp className="h-3 w-3" />}
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* LIST */}
      <div className="flex flex-col">
        {(filter === 'All' || filter === 'Playlists') && (
          <>
            {renderRow(
              'Liked Songs',
              `Playlist • ${savedTracks.length} songs`,
              'linear-gradient(to bottom right, #450af5, #c4efd9)',
              () => setView('liked-songs'),
              currentTrack.id !== '' && savedTracks.some((t) => t.id === currentTrack.id)
            )}

            {filteredPlaylists.map((pl) => {
              const songs = TRACKS.filter((t) => pl.songIds.includes(t.id));
              return renderRow(
                pl.title,
                `Custom playlist • ${songs.length} songs`,
                songs[0]?.gradient || 'linear-gradient(135deg,#333,#111)',
                () => songs.length && playTrack(songs[0], songs),
                false,
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const title = prompt('Rename playlist', pl.title);
                      if (title) renamePlaylist(pl.id, title);
                    }}
                    className="rounded-full p-1 text-[#b3b3b3] hover:bg-white/10 hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete playlist "${pl.title}"?`)) deletePlaylist(pl.id);
                    }}
                    className="rounded-full p-1 text-[#b3b3b3] hover:bg-white/10 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </>
        )}

        {filter === 'Recently Played' && (
          history.length > 0 ? (history as any[])
            .filter((t) =>
              (t.title || '').toLowerCase().includes(librarySearch.toLowerCase()) ||
              (t.artist || '').toLowerCase().includes(librarySearch.toLowerCase()) ||
              (t.album || '').toLowerCase().includes(librarySearch.toLowerCase())
            )
            .map((t, idx) => {
              const dateStr = t.playedAt 
                ? new Date(t.playedAt).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) 
                : '';
              const subtitle = `${t.artist} • ${t.album}${dateStr ? ` • ${dateStr}` : ''}`;
              return (
                <React.Fragment key={`recent-${t.id}-${idx}`}>
                  {renderRow(t.title, subtitle, t.gradient || '#282828', () => playTrack(t, history), t.id === currentTrack.id)}
                </React.Fragment>
              );
            }) : (
            <div className="py-12 text-center text-[#b3b3b3]">
              <p className="text-lg font-bold text-white">No recent activity</p>
              <p className="mt-1 text-sm">Songs you play will appear here</p>
            </div>
          )
        )}

        {filter === 'Artists' && artists.filter(a => followedArtists.includes(a.artist)).length === 0 && (
          <div className="py-12 text-center text-[#b3b3b3]">
            <p className="text-lg font-bold text-white">No followed artists</p>
            <p className="mt-1 text-sm">Artists you follow will appear here</p>
          </div>
        )}

        {(filter === 'All' || filter === 'Artists') &&
          artists
            .filter((a) => a.artist && followedArtists.includes(a.artist))
            .filter((a) => (a.artist || '').toLowerCase().includes(librarySearch.toLowerCase()))
            .map((a) =>
              <React.Fragment key={`artist-${a.artist}`}>
                {renderRow(
                a.artist,
                `Artist • ${a.tracks.length} songs`,
                a.cover,
                () => {
                  setSearchQuery(a.artist);
                  setView('artist');
                },
                false,
                undefined,
                true
              )
                }
              </React.Fragment>
            )}

        {filter === 'Albums' && albums.filter(a => savedAlbums.includes(a.album)).length === 0 && (
          <div className="py-12 text-center text-[#b3b3b3]">
            <p className="text-lg font-bold text-white">No saved albums</p>
            <p className="mt-1 text-sm">Albums you save will appear here</p>
          </div>
        )}

        {(filter === 'All' || filter === 'Albums') &&
          albums
            .filter((a) => a.album && savedAlbums.includes(a.album))
            .filter((a) => (a.album || '').toLowerCase().includes(librarySearch.toLowerCase()))
            .map((a) =>
              <React.Fragment key={`album-${a.album}`}>
                {renderRow(
                a.album,
                `Album • ${a.artist}`,
                  a.cover || '#282828',
                () => {
                  const albumPlaylist = PLAYLISTS.find((p) => p.title === a.album);
                    if (albumPlaylist) {
                      setView('playlist', albumPlaylist);
                    } else {
                      setView('playlist', {
                        id: `album-${a.album}`,
                        title: a.album,
                        description: `Album by ${a.artist}`,
                        coverGradient: a.cover || '#282828',
                        primaryColor: a.tracks[0]?.color || '#282828',
                        tracks: a.tracks,
                        likes: 0
                      } as any);
                    }
                }
              )
                }
              </React.Fragment>
            )}

        {(filter === 'Downloaded') && (
          <div className="flex flex-col">
            <div className="flex gap-6 border-b border-[#282828] px-4 pt-2 sm:px-6">
              <button
                onClick={() => setDownloadTab('Songs')}
                className={`pb-3 text-sm font-bold transition-colors ${downloadTab === 'Songs' ? 'border-b-2 border-[#1db954] text-white' : 'text-[#b3b3b3] hover:text-white'}`}
              >
                Songs
              </button>
              <button
                onClick={() => setDownloadTab('Playlists')}
                className={`pb-3 text-sm font-bold transition-colors ${downloadTab === 'Playlists' ? 'border-b-2 border-[#1db954] text-white' : 'text-[#b3b3b3] hover:text-white'}`}
              >
                Playlists
              </button>
            </div>

            <div className="pt-2">
              {downloadTab === 'Songs' && (
                downloadedTracks.length > 0 ? (
                  TRACKS.filter((t) => downloadedTracks.includes(t.id))
                    .filter((t) =>
                      (t.title || '').toLowerCase().includes(librarySearch.toLowerCase()) ||
                      (t.artist || '').toLowerCase().includes(librarySearch.toLowerCase()) ||
                      (t.album || '').toLowerCase().includes(librarySearch.toLowerCase())
                    )
                    .map((t, idx) => (
                      <React.Fragment key={`downloaded-${t.id}-${idx}`}>
                        {renderRow(t.title, `${t.artist} • ${t.album}`, t.gradient || '#282828', () => playTrack(t, TRACKS.filter(tr => downloadedTracks.includes(tr.id))), t.id === currentTrack.id)}
                      </React.Fragment>
                    ))
                ) : (
                  <div className="py-12 text-center text-[#b3b3b3]">
                    <p className="text-lg font-bold text-white">No downloaded songs</p>
                    <p className="mt-1 text-sm">Songs you download will appear here</p>
                  </div>
                )
              )}

              {downloadTab === 'Playlists' && (
                downloadedPlaylists.length > 0 ? (
                  [...PLAYLISTS, ...customPlaylists]
                    .filter((p) => downloadedPlaylists.includes(p.id))
                    .filter((p) => (p.title || '').toLowerCase().includes(librarySearch.toLowerCase()))
                    .map((pl, idx) => {
                      const songs = ('tracks' in pl) ? (pl as any).tracks : TRACKS.filter(t => (pl as any).songIds.includes(t.id));
                      const cover = ('coverGradient' in pl) ? (pl as any).coverGradient : (songs[0]?.gradient || 'linear-gradient(135deg,#333,#111)');
                      return (
                        <React.Fragment key={`downloaded-pl-${pl.id}-${idx}`}>
                          {renderRow(pl.title, `Playlist • ${songs.length} songs`, cover, () => setView('playlist', pl as any))}
                        </React.Fragment>
                      );
                    })
                ) : (
                  <div className="py-12 text-center text-[#b3b3b3]">
                    <p className="text-lg font-bold text-white">No downloaded playlists</p>
                    <p className="mt-1 text-sm">Playlists you download will appear here</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
