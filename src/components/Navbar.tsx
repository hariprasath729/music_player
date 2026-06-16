import React, { useState, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, Search, Bell, User, Settings, X, Radio,
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext'; // Replace with real toast in production
export const Navbar: React.FC = () => {
  const {
    currentView, setView, searchQuery, setSearchQuery,
    canGoBack, canGoForward, goBack, goForward, showToast,
    
  } = usePlayer();
  const { user, logout } = useAuth();

  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      showToast("App installation is not supported by your browser or it's already installed. Try using Chrome or check your browser menu for 'Add to Home Screen'.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    // We've used the prompt, and can't use it again, throw it away
    if (outcome === 'accepted') setDeferredPrompt(null);
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-transparent px-4 py-2 select-none sm:bg-[#121212]/90 sm:px-6 sm:backdrop-blur-md md:h-16">

      {/* ─── MOBILE HEADER ─── */}
      <div className="flex w-full items-center justify-between md:hidden">
        {currentView === 'search' ? (
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#121212]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to listen to?"
              className="w-full rounded-md bg-white py-2.5 pl-10 pr-10 text-[14px] font-medium text-[#121212] placeholder-[#757575] focus:outline-none"
              autoFocus
            />
            {searchQuery.length > 0 && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#757575]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ) : currentView === 'playlist' ? (
          <button
            onClick={goBack}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#535353] text-white"
                onClick={() => setShowProfile(p => !p)}
              >
                <User className="h-4 w-4" />
              </div>
              {(currentView === 'home' || currentView === 'library') && (
                <MobileFilterPills />
              )}
            </div>
            <div className="flex items-center gap-4">
            <button onClick={() => setView('visualizer')} title="Synk Session">
              <Radio className="h-5 w-5 text-white" />
            </button>
              <button onClick={() => alert('Notifications coming soon!')}>
                <Bell className="h-5 w-5 text-white" />
              </button>
              <div className="relative flex items-center">
                <button onClick={() => setShowSettings(s => !s)}>
                  <Settings className="h-5 w-5 text-white" />
                </button>
                {showSettings && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)} />
                    <div className="absolute right-0 top-10 z-50 w-48 overflow-hidden rounded-md bg-[#282828] shadow-2xl">
                      
                      <button
                        onClick={() => { handleInstallClick(); setShowSettings(false); }}
                        className="w-full px-4 py-3 text-left text-sm font-bold text-[#1db954] transition-colors hover:bg-[#3d3d3d]"
                      >
                        Install App
                      </button>
                      <button
                        onClick={() => { alert('More settings coming soon!'); setShowSettings(false); }}
                        className="w-full px-4 py-3 text-left text-sm text-[#b3b3b3] transition-colors hover:bg-[#3d3d3d] hover:text-white"
                      >
                        General Settings
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ─── DESKTOP HEADER ─── */}
      <div className="hidden w-full items-center justify-between md:flex">
        <div className="flex items-center gap-2">
          {/* Back */}
          <button
            onClick={goBack}
            disabled={!canGoBack}
            className={`flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-all
              ${canGoBack ? 'opacity-100 hover:bg-black/80' : 'cursor-not-allowed opacity-40'}`}
            title="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Forward */}
          <button
            onClick={goForward}
            disabled={!canGoForward}
            className={`flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-all
              ${canGoForward ? 'opacity-100 hover:bg-black/80' : 'cursor-not-allowed opacity-40'}`}
            title="Go forward"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Search inline */}
          {currentView === 'search' && (
            <div className="relative ml-4">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a7a7a7]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you want to play?"
                className="w-80 rounded-full border-2 border-transparent bg-[#242424] py-2 pl-10 pr-10 text-sm text-white placeholder-[#a7a7a7] transition-all focus:border-white focus:outline-none"
                autoFocus
              />
              {searchQuery.length > 0 && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a7a7a7] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 text-sm font-bold">
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-1 rounded-full bg-[#1db954] px-4 py-1.5 text-xs text-black transition-transform hover:scale-[1.04]"
          >
            <span>Install App</span>
          </button>
          <button
            onClick={() => setView('visualizer')}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-[#a7a7a7] transition-colors hover:text-white"
            title="Synk Session"
          >
            <Radio className="h-4 w-4" />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-[#a7a7a7] transition-colors hover:text-white"
          >
            <Bell className="h-4 w-4" />
          </button>
          <div
            onClick={() => setShowProfile(p => !p)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#333] bg-[#282828] text-white transition-transform hover:scale-105"
            title="Account"
          >
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Profile dropdown */}
      {showProfile && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
          <div className="absolute left-4 top-14 z-50 w-52 overflow-hidden rounded-md bg-[#282828] shadow-2xl md:left-auto md:right-6">
            {user && (
              <div className="border-b border-white/10 px-4 py-3">
                <p className="truncate text-sm font-bold text-white">{user.name}</p>
                <p className="truncate text-xs text-[#b3b3b3]">{user.email}</p>
              </div>
            )}
            {[
              
              { label: 'Profile', view: 'profile' },
              { label: 'Synk Session', view: 'visualizer' },
              { label: 'Log out', view: 'logout' },
            ].map(({ label, view }) => (
              <button
                key={label}
                onClick={() => {
                  setShowProfile(false);
                  if (view === 'profile') setView('profile');
                  else if (view === 'visualizer') setView('visualizer');
                  else if (view === 'logout') logout();
                }}
                className="w-full px-4 py-3 text-left text-sm text-[#b3b3b3] transition-colors hover:bg-[#3d3d3d] hover:text-white"
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </header>
  );
};

/* Filter pills shown on mobile home/library */
const MobileFilterPills: React.FC = () => {
  const { setView } = usePlayer();
  const pills = [
    { label: 'All', view: 'library' },
    { label: 'Albums', view: 'all-songs' },
    { label: 'Artists', view: 'artists' },
  ];
  return (
    <div className="flex gap-2">
      {pills.map(({ label, view }) => (
        <button
          key={label}
          onClick={() => setView(view as any)}
          className="rounded-full bg-[#2a2a2a] px-3 py-1 text-[12px] font-bold text-white transition-colors hover:bg-[#3d3d3d]"
        >
          {label}
        </button>
      ))}
    </div>
  );
};
