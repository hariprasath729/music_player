import React, { useState, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, Search, Bell, User, Settings, X, Radio,
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext'; // Replace with real toast in production

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

export const Navbar: React.FC = () => {
  const {
    currentView, setView, searchQuery, setSearchQuery,
    canGoBack, canGoForward, goBack, goForward, showToast,
    
  } = usePlayer();
  const { user, logout } = useAuth(); // Replace with real toast in production

  const [activeDropdown, setActiveDropdown] = useState<'profile' | 'notifications' | 'settings' | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [updateWorker, setUpdateWorker] = useState<ServiceWorker | null>(null);
  const [updateVersion, setUpdateVersion] = useState<string>('unknown');

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      // After we reload following an update, suppress showing the update UI again.
      if (sessionStorage.getItem('pwa-suppress-update-ui') === 'true') {
        sessionStorage.removeItem('pwa-suppress-update-ui');
        setUpdateWorker(null);
        setUpdateVersion('unknown');
        return;
      }

      const detail = (e as CustomEvent).detail;

      // Backward compatible: if detail is the ServiceWorker itself
      if (detail && typeof (detail as any).postMessage === 'function') {
        setUpdateWorker(detail as ServiceWorker);
        setUpdateVersion('unknown');
        return;
      }

      const payload = detail as { worker?: ServiceWorker; version?: string } | null | undefined;
      setUpdateWorker(payload?.worker ?? null);
      setUpdateVersion(payload?.version ? String(payload.version) : 'unknown');
    };
    window.addEventListener('pwa-update-available', handleUpdate);
    return () => window.removeEventListener('pwa-update-available', handleUpdate);
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

  const applyUpdate = () => {
    if (updateWorker) {
      updateWorker.postMessage({ type: 'SKIP_WAITING' });
    }
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
                onClick={() => setActiveDropdown(d => d === 'profile' ? null : 'profile')}
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
              <button onClick={() => setActiveDropdown(d => d === 'notifications' ? null : 'notifications')} className="relative">
                <Bell className="h-5 w-5 text-white" />
                {updateWorker && <div className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border border-black"></div>}
              </button>
              <div className="relative flex items-center">
                <button onClick={() => setActiveDropdown(d => d === 'settings' ? null : 'settings')}>
                  <Settings className="h-5 w-5 text-white" />
                </button>
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
            onClick={() => setActiveDropdown(d => d === 'notifications' ? null : 'notifications')}
            className="relative flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-[#a7a7a7] transition-colors hover:text-white"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {updateWorker && <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border-2 border-black/60"></div>}
          </button>
          <div
          onClick={() => setActiveDropdown(d => d === 'profile' ? null : 'profile')}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#333] bg-[#282828] text-white transition-transform hover:scale-105"
            title="Account"
          >
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Dropdowns */}
      {activeDropdown && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
          {activeDropdown === 'profile' && (
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
                    setActiveDropdown(null);
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
          )}
          {activeDropdown === 'notifications' && (
            <div className="absolute right-4 top-14 z-50 w-80 max-w-[90vw] overflow-hidden rounded-lg bg-[#282828] shadow-2xl">
              <div className="p-4 border-b border-white/10">
                <h3 className="font-bold text-white">Notifications</h3>
              </div>
              <div className="flex flex-col p-2">
                {updateWorker ? (
                  <div className="p-3 rounded-md bg-white/5">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold text-white">New version {updateVersion} is available</p>
                      <button
                        onClick={() => {
                          setUpdateWorker(null);
                          setUpdateVersion('unknown');
                        }}
                        className="text-xs text-[#b3b3b3] hover:text-white"
                      >
                        Dismiss
                      </button>
                    </div>
                    <p className="text-xs text-[#b3b3b3] mt-1 mb-3">
                      Update to the latest version for new features and improvements.
                    </p>
                    <button
                      onClick={() => {
                        applyUpdate();
                        setActiveDropdown(null);
                      }}
                      className="w-full rounded-md bg-[#1db954] py-2 text-sm font-bold text-black transition hover:scale-105"
                    >
                      Update Now
                    </button>
                  </div>
                ) : (
                  <p className="py-8 text-center text-sm text-[#b3b3b3]">No new notifications</p>
                )}
              </div>
            </div>
          )}
          {activeDropdown === 'settings' && (
            <div className="absolute right-0 top-10 z-50 w-48 overflow-hidden rounded-md bg-[#282828] shadow-2xl">
              <button onClick={() => { handleInstallClick(); setActiveDropdown(null); }} className="w-full px-4 py-3 text-left text-sm font-bold text-[#1db954] transition-colors hover:bg-[#3d3d3d]">
                Install App
              </button>
              <button onClick={() => { alert('More settings coming soon!'); setActiveDropdown(null); }} className="w-full px-4 py-3 text-left text-sm text-[#b3b3b3] transition-colors hover:bg-[#3d3d3d] hover:text-white">
                General Settings
              </button>
            </div>
          )}
        </>
      )}
    </header>
  );
};
