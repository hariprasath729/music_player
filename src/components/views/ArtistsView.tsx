import React, { useMemo } from 'react';
import { Play } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { TRACKS, Track } from '../../data/musicCatalog';
import artistsData from '../../data/artists.json';

export const ArtistsView: React.FC = () => {
  const { playTrack, setView, setSearchQuery } = usePlayer();

  const artists = useMemo(() => {
    const grouped = new Map<string, Track[]>();
    TRACKS.forEach((t) => {
      (t.artist || '').split(',').map(a => a.trim()).forEach((artistName) => {
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

  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-6">
      <h1 className="text-3xl font-bold text-white">Artists</h1>
      <p className="text-[#b3b3b3]">{artists.length} artists in your library</p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {artists.map(({ artist, tracks, cover }) => (
          <div
            key={artist}
            onClick={() => {
              setSearchQuery(artist);
              setView('artist');
            }}
            className="group flex flex-col items-center gap-3 rounded-lg bg-[#181818] p-4 transition-colors hover:bg-[#282828] cursor-pointer"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full sm:h-32 sm:w-32">
              <div className="h-full w-full" style={{ background: cover }} />
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40"
                onClick={(e) => { e.stopPropagation(); playTrack(tracks[0], tracks); }}
              >
                <Play className="h-8 w-8 fill-white text-white opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
            <div className="text-center">
              <p className="truncate text-sm font-bold text-white">{artist}</p>
              <p className="text-xs text-[#b3b3b3]">{tracks.length} songs</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
