import React from 'react';
import { X } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export const LyricsView: React.FC = () => {
  const { currentTrack, goBack, canGoBack, setView } = usePlayer();

  const lyrics = currentTrack.lyrics || [
    'Looks like there are no synced lyrics for this track yet.',
    'Enjoy the pure instrumental frequencies!',
  ];

  const handleClose = () => {
    if (canGoBack) goBack();
    else setView('home');
  };

  return (
    <div
      className="relative flex flex-col gap-5 px-5 py-6 pb-4 sm:gap-8 sm:px-8 sm:py-12 sm:pb-8"
      style={{
        background: `radial-gradient(circle at top left, ${currentTrack.color}22, transparent 60%)`,
      }}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        title="Close lyrics"
        className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/70 sm:right-6 sm:top-6 sm:h-10 sm:w-10"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4 pr-12 sm:gap-4 sm:pb-6">
        <div
          className="h-12 w-12 shrink-0 rounded shadow-md sm:h-16 sm:w-16"
          style={{ background: currentTrack.gradient }}
        />
        <div className="flex min-w-0 flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#b3b3b3]">
            Now Playing
          </span>
          <h1 className="truncate text-lg font-extrabold text-white sm:text-2xl">
            {currentTrack.title}
          </h1>
          <h2 className="truncate text-[13px] text-[#b3b3b3] sm:text-sm">
            {currentTrack.artist}
          </h2>
        </div>
      </div>

      {/* Lyrics */}
      <div className="flex max-w-3xl flex-col gap-4 sm:gap-6">
        {lyrics.map((line, idx) => {
          if (!line) return <div key={idx} className="h-3" />;
          return (
            <p
              key={idx}
              className="cursor-pointer text-xl font-bold text-white/60 transition-colors hover:text-white sm:text-4xl"
            >
              {line}
            </p>
          );
        })}
      </div>

      <div className="mt-auto border-t border-white/5 pt-8 text-[11px] text-[#b3b3b3]">
        Lyrics provided for illustrative enjoyment.
      </div>
    </div>
  );
};
