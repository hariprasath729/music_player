import React from 'react';
import { Play, Pause, SkipForward } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { MarqueeText } from './MarqueeText';

export const MiniPlayer: React.FC = () => {
  const {
    currentTrack, isPlaying, togglePlay, toggleFullScreen,
    currentTime, duration, nextTrack,
    setView, setSearchQuery
  } = usePlayer();

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="mx-2 mb-1 md:hidden">
      <div
        className="relative overflow-hidden rounded-xl shadow-lg"
        style={{ backgroundColor: currentTrack.color + '55', backdropFilter: 'blur(24px)' }}
      >
        {/* Thin progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/15">
          <div
            className="h-full bg-white transition-[width] duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-3 px-3 py-2.5">
          {/* Album art → tap opens fullscreen */}
          <div
            onClick={toggleFullScreen}
            className="h-11 w-11 shrink-0 cursor-pointer rounded-lg shadow-md"
            style={{ background: currentTrack.gradient }}
          />

          {/* Title/artist → tap opens fullscreen */}
          <div className="flex min-w-0 flex-1 cursor-pointer flex-col overflow-hidden" onClick={toggleFullScreen}>
            <MarqueeText className="text-[14px] font-bold text-white leading-tight">
              {currentTrack.title}
            </MarqueeText>
            <MarqueeText className="text-[12px] text-white/60 leading-tight">
              {currentTrack.artist.split(',').map((a, i) => (
                <React.Fragment key={i}>
                  {i > 0 && ', '}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery(a.trim());
                      setView('artist');
                    }}
                    className="hover:underline hover:text-white cursor-pointer"
                  >
                    {a.trim()}
                  </span>
                </React.Fragment>
              ))}
            </MarqueeText>
          </div>

          {/* Play / Pause */}
          <button
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            className="shrink-0 rounded-full p-1.5 text-white transition active:scale-90"
          >
            {isPlaying
              ? <Pause className="h-7 w-7 fill-white" />
              : <Play className="h-7 w-7 fill-white translate-x-0.5" />}
          </button>

          {/* Skip next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextTrack(); }}
            className="shrink-0 rounded-full p-1.5 text-white transition active:scale-90"
          >
            <SkipForward className="h-6 w-6 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
