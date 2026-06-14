import React, { memo, useEffect, useState } from 'react';
import { Play, Heart, User, Loader2 } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { TRACKS, PLAYLISTS, Track, Playlist } from '../../data/musicCatalog';
import { useAuth } from '../../context/AuthContext';
import { homeApi, mapSongToTrack } from '../../services/apiClient';
import artistsData from '../../data/artists.json';

const PlayBadge = memo(function PlayBadge({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-2 right-2 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-[#1db954] opacity-0 shadow-xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-105"
    >
      <Play className="h-6 w-6 translate-x-0.5 fill-black text-black" />
    </button>
  );
});

const TrackCard = memo(function TrackCard({
  track,
  list,
  onPlay,
}: {
  track: Track;
  list: Track[];
  onPlay: (track: Track, list: Track[]) => void;
}) {
  return (
    <div
      onClick={() => onPlay(track, list)}
      className="group flex w-[140px] shrink-0 cursor-pointer flex-col gap-2 rounded-md bg-[#181818] p-3 transition-colors hover:bg-[#282828] sm:w-auto sm:p-4"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md shadow-lg">
        <div className="h-full w-full" style={{ background: track.gradient }} />
        <PlayBadge
          onClick={(e) => {
            e.stopPropagation();
            onPlay(track, list);
          }}
        />
      </div>
      <h3 className="truncate text-[13px] font-bold text-white">{track.title}</h3>
      <p className="truncate text-[11px] text-[#b3b3b3]">{track.artist}</p>
    </div>
  );
});

const PlaylistCard = memo(function PlaylistCard({
  playlist,
  onOpen,
  onPlay,
}: {
  playlist: Playlist;
  onOpen: (playlist: Playlist) => void;
  onPlay: (playlist: Playlist) => void;
}) {
  return (
    <div
      onClick={() => onOpen(playlist)}
      className="group flex w-[140px] shrink-0 cursor-pointer flex-col gap-2 rounded-md bg-[#181818] p-3 transition-colors hover:bg-[#282828] sm:w-auto sm:p-4"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md shadow-lg">
        <div className="h-full w-full" style={{ background: playlist.coverGradient }} />
        <PlayBadge
          onClick={(e) => {
            e.stopPropagation();
            onPlay(playlist);
          }}
        />
      </div>
      <h3 className="truncate text-[13px] font-bold text-white">{playlist.title}</h3>
      <p className="line-clamp-2 text-[11px] text-[#b3b3b3]">{playlist.description}</p>
    </div>
  );
});

const ArtistCard = memo(function ArtistCard({ artistName, onClick }: { artistName: string; onClick: () => void }) {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const searchNorm = normalize(artistName);
  const info = artistsData.find(a => {
    const nameNorm = normalize(a.name);
    return nameNorm === searchNorm || searchNorm.startsWith(nameNorm) || nameNorm.startsWith(searchNorm);
  });
  const cover = info?.image ? `url("${info.image}") center / cover no-repeat` : '#282828';

  return (
    <div
      onClick={onClick}
      className="group flex w-[140px] shrink-0 cursor-pointer flex-col items-center gap-3 rounded-md bg-[#181818] p-3 transition-colors hover:bg-[#282828] sm:w-auto sm:p-4"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-full shadow-lg" style={{ background: cover }}>
        {!info?.image && (
          <User className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/40 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1db954] shadow-xl hover:scale-105 active:scale-95">
            <Play className="h-6 w-6 translate-x-0.5 fill-black text-black" />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col text-center">
        <h3 className="truncate text-[13px] font-bold text-white">{artistName}</h3>
        <p className="text-[11px] text-[#b3b3b3]">Artist</p>
      </div>
    </div>
  );
});

export const HomeView: React.FC = () => {
  const { setView, playTrack, setSearchQuery } = usePlayer();
  const { isLoggedIn } = useAuth();
  const [homeData, setHomeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const openPlaylist = (playlist: Playlist) => setView('playlist', playlist);
  const playPlaylist = (playlist: Playlist) => {
    if (playlist.tracks.length) playTrack(playlist.tracks[0], playlist.tracks);
  };
  const playAnyTrack = (track: Track, list: Track[]) => playTrack(track, list);

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      homeApi.getHome()
        .then(res => {
          if (res.success) {
            setHomeData({
              recentlyPlayed: res.data.recentlyPlayed.map(mapSongToTrack),
              madeForYou: res.data.madeForYou.map(mapSongToTrack),
              trending: res.data.trending.map(mapSongToTrack),
              topArtists: res.data.topArtists,
              playlists: res.data.playlists.map((p: any) => {
                const tracks = p.songs.map(mapSongToTrack);
                return {
                  id: p._id,
                  title: p.name,
                  description: 'Custom playlist',
                  coverGradient: tracks[0]?.gradient || 'linear-gradient(135deg,#333,#111)',
                  primaryColor: tracks[0]?.color || '#282828',
                  tracks: tracks,
                  likes: 0
                };
              })
            });
          }
        })
        .catch(err => console.error('Failed to load home data', err))
        .finally(() => setLoading(false));
    } else {
      setHomeData(null);
      setLoading(false);
    }
  }, [isLoggedIn]);

  if (loading) {
    return (
      <div className="flex h-[80vh] w-full flex-col items-center justify-center text-[#b3b3b3]">
        <Loader2 className="h-10 w-10 animate-spin text-[#1db954]" />
      </div>
    );
  }

  const recentlyPlayed = homeData?.recentlyPlayed?.length > 0 ? homeData.recentlyPlayed : null;
  const madeForYou = homeData?.madeForYou?.length > 0 ? homeData.madeForYou : TRACKS.slice(6, 12);
  const trending = homeData?.trending?.length > 0 ? homeData.trending : TRACKS.slice(0, 6);
  const topArtists = homeData?.topArtists?.length > 0 ? homeData.topArtists : [];
  const playlists = homeData?.playlists?.length > 0 ? homeData.playlists : PLAYLISTS.slice(0, 4);
  const quickAccess = recentlyPlayed ? recentlyPlayed.slice(0, 5) : TRACKS.slice(0, 5);

  return (
    <div className="flex flex-col gap-5 px-4 py-3 pb-4 sm:gap-8 sm:px-6 sm:py-4 sm:pb-8">
      {/* Greeting */}
      <h1 className="text-[22px] font-bold text-white sm:text-3xl">{getGreeting()}</h1>

      {/* ── Quick Access Grid (Spotify mobile 2-col) ── */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3">
        {/* Liked Songs */}
        <div
          onClick={() => setView('liked-songs')}
          className="group relative flex cursor-pointer items-center overflow-hidden rounded bg-[#282828]/60 transition-colors hover:bg-[#393939]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-gradient-to-br from-[#450af5] to-[#c4efd9] sm:h-16 sm:w-16">
            <Heart className="h-4 w-4 fill-white text-white sm:h-5 sm:w-5" />
          </div>
          <span className="truncate px-2 text-[11px] font-bold text-white sm:px-3 sm:text-[13px]">
            Liked Songs
          </span>
        </div>

        {quickAccess.map((t: Track) => (
          <div
            key={`qa-${t.id}`}
            onClick={() => playAnyTrack(t, quickAccess)}
            className="group relative flex cursor-pointer items-center overflow-hidden rounded bg-[#282828]/60 transition-colors hover:bg-[#393939]"
          >
            <div
              className="h-12 w-12 shrink-0 sm:h-16 sm:w-16"
              style={{ background: t.gradient }}
            />
            <span className="truncate px-2 text-[11px] font-bold text-white sm:px-3 sm:text-[13px]">
              {t.title}
            </span>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1db954] shadow-md hover:scale-105 active:scale-95 sm:h-10 sm:w-10">
                <Play className="h-4 w-4 translate-x-0.5 fill-black text-black sm:h-5 sm:w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {recentlyPlayed && (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-white sm:text-2xl">Recently Played</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6 sm:overflow-visible sm:pb-0">
            {recentlyPlayed.map((t: Track) => (
              <TrackCard key={`recent-${t.id}`} track={t} list={recentlyPlayed} onPlay={playAnyTrack} />
            ))}
          </div>
        </section>
      )}

      {/* ── Made For You ── */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-white sm:text-2xl">Made For You</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6 sm:overflow-visible sm:pb-0">
          {madeForYou.map((t: Track) => (
            <TrackCard key={`m4u-${t.id}`} track={t} list={madeForYou} onPlay={playAnyTrack} />
          ))}
        </div>
      </section>

      {/* ── Trending ── */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-white sm:text-2xl">Trending Now</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6 sm:overflow-visible sm:pb-0">
          {trending.map((t: Track) => (
            <TrackCard key={`trend-${t.id}`} track={t} list={trending} onPlay={playAnyTrack} />
          ))}
        </div>
      </section>

      {/* ── Top Artists ── */}
      {topArtists.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-white sm:text-2xl">Your Top Artists</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6 sm:overflow-visible sm:pb-0">
            {topArtists.map((artist: string) => (
              <ArtistCard
                key={artist}
                artistName={artist}
                onClick={() => {
                  setSearchQuery(artist);
                  setView('artist');
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── User Playlists ── */}
      {playlists.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-white sm:text-2xl">Your Playlists</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6 sm:overflow-visible sm:pb-0">
            {playlists.map((pl: Playlist) => (
              <PlaylistCard key={pl.id} playlist={pl} onOpen={openPlaylist} onPlay={playPlaylist} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
