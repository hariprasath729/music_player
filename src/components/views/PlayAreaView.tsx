import React from 'react';
import { X } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import SplashCursor from '../SplashCursor';

export const PlayAreaView: React.FC = () => {
  const { setView } = usePlayer();

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen bg-black select-none overflow-hidden">
      {/* Splash Cursor drawing canvas */}
      <SplashCursor
        SIM_RESOLUTION={128}
        DYE_RESOLUTION={1440}
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
      />

      {/* Simple X close button in the top-left corner */}
      <button
        onClick={() => setView('home')}
        className="absolute left-6 top-6 z-[10000] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:scale-105 active:scale-95"
        title="Close Play Area"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  );
};
