import React from 'react';
import { Home, Search, Library, Download } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export const MobileNav: React.FC = () => {
  const { currentView, setView, showToast, activeFilter, setActiveFilter } = usePlayer();

  const items = [
    { label: 'Home', icon: Home, view: 'home' as const },
    { label: 'Search', icon: Search, view: 'search' as const },
    { label: 'Library', icon: Library, view: 'library' as const }
  ];

  return (
    <nav className="flex border-t border-[#282828] bg-gradient-to-t from-black to-[#121212] md:hidden">
      {items.map(({ label, icon: Icon, view }) => {
        const active =
          currentView === view ||
          (view === 'library' && currentView === 'playlist') ||
          (view === 'library' && currentView === 'liked-songs');

        return (
          <button
            key={view}
            onClick={() => setView(view)}
            className={`flex flex-1 flex-col items-center justify-center gap-[2px] py-2.5 text-[10px] font-semibold tracking-wide transition-colors ${
              active ? 'text-white' : 'text-[#b3b3b3]'
            }`}
          >
            <Icon className="h-6 w-6" strokeWidth={active ? 2.5 : 1.5} />
            <span>{label}</span>
          </button>
        );
      })}

      <button
        onClick={() => {
          setActiveFilter('Downloaded');
          setView('library');
        }}
        className={`flex flex-1 flex-col items-center justify-center gap-[2px] py-2.5 text-[10px] font-semibold tracking-wide transition-colors ${
          currentView === 'library' && activeFilter === 'Downloaded' ? 'text-white' : 'text-[#b3b3b3]'
        } hover:text-white`}
      >
        <Download className="h-6 w-6" strokeWidth={currentView === 'library' && activeFilter === 'Downloaded' ? 2.5 : 1.5} />
        <span>Downloads</span>
      </button>
    </nav>
  );
};
