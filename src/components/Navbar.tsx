import React, { useState, useEffect } from 'react';
import {
  Search, Bell, User, Settings, X, Radio,
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext'; // Replace with real toast in production
import { notificationsApi, InAppNotification } from '../services/apiClient';

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
    currentView, setView, searchQuery, setSearchQuery, showToast,
    setIsProfileModalOpen,
  } = usePlayer();
  const { user, logout } = useAuth(); // Replace with real toast in production

  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Sync local search when global searchQuery changes from categories/artists
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Debounce propagating local search changes to global search query
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== searchQuery) {
        setSearchQuery(localSearch);
      }
    }, 250);
    return () => clearTimeout(handler);
  }, [localSearch, searchQuery, setSearchQuery]);

  const [activeDropdown, setActiveDropdown] = useState<'profile' | 'notifications' | 'settings' | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(() =>
    // Pick up the prompt captured early in index.html (before React mounted)
    (window as any).__pwaInstallPrompt ?? null
  );
  const [isAppInstalled, setIsAppInstalled] = useState(() =>
    // Hide if already running in standalone/PWA mode
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
  const [updateWorker, setUpdateWorker] = useState<ServiceWorker | null>(null);
  const [updateVersion, setUpdateVersion] = useState<string>('unknown');

  const [notifications, setNotifications] = useState<InAppNotification[]>([]);

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const res = await notificationsApi.getNotifications();
      if (res.success && res.data) {
        setNotifications(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const handleDismissNotification = async (id: string) => {
    try {
      const res = await notificationsApi.deleteNotification(id);
      if (res.success) {
        setNotifications(prev => prev.filter(n => n._id !== id));
        showToast('Notification dismissed');
      }
    } catch (error) {
      console.error('Failed to dismiss notification:', error);
      showToast('Failed to dismiss notification');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  useEffect(() => {
    if (activeDropdown === 'notifications') {
      fetchNotifications();
    }
  }, [activeDropdown]);

  useEffect(() => {
    if (!user) return;
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    // Sync from global in case the event fired between index.html and our mount
    if ((window as any).__pwaInstallPrompt) {
      setDeferredPrompt((window as any).__pwaInstallPrompt);
      setIsAppInstalled(false);
    }

    // index.html captures beforeinstallprompt early and fires this custom event
    const handlePromptReady = () => {
      const prompt = (window as any).__pwaInstallPrompt;
      if (prompt) {
        setDeferredPrompt(prompt);
        setIsAppInstalled(false);
      }
    };
    const handleAppInstalled = () => {
      (window as any).__pwaInstallPrompt = null;
      setDeferredPrompt(null);
      setIsAppInstalled(true);
    };
    window.addEventListener('pwa-install-prompt-ready', handlePromptReady);
    window.addEventListener('pwa-app-installed', handleAppInstalled);
    return () => {
      window.removeEventListener('pwa-install-prompt-ready', handlePromptReady);
      window.removeEventListener('pwa-app-installed', handleAppInstalled);
    };
  }, []);

  // If we've already updated, make sure the bell notification UI is hidden on mount.
  // Otherwise, check for a pending update flag that survived a page reload / HMR.
  useEffect(() => {
    if (sessionStorage.getItem('pwa-updated') === 'true') {
      setUpdateWorker(null);
      setUpdateVersion('unknown');
      return;
    }

    // Check for a persisted "update pending" flag (set in main.tsx, survives reloads)
    if (sessionStorage.getItem('pwa-update-pending') === 'true') {
      const pendingVersion = sessionStorage.getItem('pwa-update-pending-version') || 'unknown';
      console.log('[PWA Navbar] Found pwa-update-pending on mount, version:', pendingVersion);
      setUpdateVersion(pendingVersion);

      // Try to get the actual waiting worker from the SW registration
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          if (registration.waiting) {
            console.log('[PWA Navbar] Hydrated waiting worker from registration');
            setUpdateWorker(registration.waiting);
          } else {
            console.log('[PWA Navbar] No waiting worker found, but showing banner anyway');
            // Create a minimal proxy that sends SKIP_WAITING to the controller
            setUpdateWorker(navigator.serviceWorker.controller as ServiceWorker);
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      console.log('[PWA Navbar] handleUpdate triggered with detail:', detail);
      const payload = detail as { worker?: ServiceWorker; version?: string } | null | undefined;

      const incomingVersion =
        payload?.version !== undefined && payload?.version !== null
          ? String(payload.version)
          : undefined;

      const alreadyUpdated = sessionStorage.getItem('pwa-updated') === 'true';
      const updatedVersion = sessionStorage.getItem('pwa-updated-version');
      console.log('[PWA Navbar] Session storage status:', { alreadyUpdated, updatedVersion, incomingVersion });

      // If we've already applied this exact version, never reopen the UI.
      if (alreadyUpdated && updatedVersion && incomingVersion && updatedVersion === incomingVersion) {
        console.log('[PWA Navbar] Suppressing notification: version already updated');
        return;
      }

      // Suppression prevents "update available" UI from reappearing after Update Now.
      // Do NOT clear the flag here; PlayerContext will clear it after the "updated" toast,
      // otherwise the UI can immediately re-open on the next update event during reload.
      if (sessionStorage.getItem('pwa-suppress-update-ui') === 'true') {
        console.log('[PWA Navbar] Suppressing notification: pwa-suppress-update-ui is true');
        return;
      }

      // Backward compatible: if detail is the ServiceWorker itself
      if (detail && typeof (detail as any).postMessage === 'function') {
        setUpdateWorker(detail as ServiceWorker);
        setUpdateVersion('unknown');
        return;
      }

      setUpdateWorker(payload?.worker ?? null);
      setUpdateVersion(incomingVersion ?? 'unknown');
    };
    window.addEventListener('pwa-update-available', handleUpdate);
    return () => window.removeEventListener('pwa-update-available', handleUpdate);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    // We've used the prompt, and can't use it again, throw it away
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsAppInstalled(true);
    }
  };

  // Show install button only when a prompt is available and app isn't installed
  const showInstallButton = !isAppInstalled && !!deferredPrompt;

  const applyUpdate = () => {
    if (updateWorker) {
      updateWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  return (
    <>
      {updateWorker && (
        <div className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between bg-[#1db954] px-4 py-2.5 text-xs font-bold text-black shadow-xl md:text-sm">
          <span className="truncate">New version {updateVersion !== 'unknown' ? updateVersion : ''} is available! Update to get the latest features.</span>
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={() => {
                sessionStorage.setItem('pwa-suppress-update-ui', 'true');
                sessionStorage.removeItem('pwa-update-pending');
                sessionStorage.removeItem('pwa-update-pending-version');
                applyUpdate();
                setUpdateWorker(null);
                setUpdateVersion('unknown');
              }}
              className="rounded-full bg-black px-4 py-1.5 text-xs font-bold text-white transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              Update Now
            </button>
            <button
              onClick={() => {
                // Only hide the banner for this session — keep sessionStorage
                // flags so the notification reappears on the next refresh/login.
                setUpdateWorker(null);
                setUpdateVersion('unknown');
              }}
              className="text-xs font-bold text-black/70 hover:text-black cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-transparent px-4 py-2 select-none sm:bg-[#121212]/90 sm:px-6 sm:backdrop-blur-md md:h-16">

      {/* ─── MOBILE HEADER ─── */}
      <div className="flex w-full items-center justify-between md:hidden">
        {currentView === 'search' ? (
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#121212]" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="What do you want to listen to?"
              className="w-full rounded-md bg-white py-2.5 pl-10 pr-10 text-[14px] font-medium text-[#121212] placeholder-[#757575] focus:outline-none"
              autoFocus
            />
            {localSearch.length > 0 && (
              <button
                onClick={() => {
                  setLocalSearch('');
                  setSearchQuery('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#757575]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ) : currentView === 'playlist' ? (
          <div className="w-8" />
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
                {(updateWorker || notifications.length > 0) && <div className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border border-black"></div>}
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
          {/* Search inline */}
          {currentView === 'search' && (
            <div className="relative ml-4">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a7a7a7]" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="What do you want to play?"
                className="w-80 rounded-full border-2 border-transparent bg-[#242424] py-2 pl-10 pr-10 text-sm text-white placeholder-[#a7a7a7] transition-all focus:border-white focus:outline-none"
                autoFocus
              />
              {localSearch.length > 0 && (
                <button
                  onClick={() => {
                    setLocalSearch('');
                    setSearchQuery('');
                  }}
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
          {showInstallButton && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1 rounded-full bg-[#1db954] px-4 py-1.5 text-xs text-black transition-transform hover:scale-[1.04]"
            >
              <span>Install App</span>
            </button>
          )}
          <button 
          onClick={() => setView('play-area')}
          className="flex items-center gap-1 rounded-full bg-black px-4 py-1.5 text-xs text-[#a7a7a7] transition-transform hover:scale-[1.04]"
            >
            <span>Play Area</span>
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
            {(updateWorker || notifications.length > 0) && <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border-2 border-black/60"></div>}
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
                { label: 'Log out', view: 'logout' },
              ].map(({ label, view }) => (
                <button
                  key={label}
                  onClick={() => {
                    setActiveDropdown(null);
                    if (view === 'profile') setIsProfileModalOpen(true);
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
              <div className="flex flex-col p-2 gap-2 max-h-[300px] overflow-y-auto">
                {updateWorker && (
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
                        // Suppress update-available UI from reappearing after the update is requested.
                        sessionStorage.setItem('pwa-suppress-update-ui', 'true');

                        // Tell the new worker to activate immediately.
                        applyUpdate();

                        // Immediately hide the notification UI.
                        setUpdateWorker(null);
                        setUpdateVersion('unknown');
                        setActiveDropdown(null);
                      }}
                      className="w-full rounded-md bg-[#1db954] py-2 text-sm font-bold text-black transition hover:scale-105"
                    >
                      Update Now
                    </button>
                  </div>
                )}

                {notifications.map((notif) => (
                  <div key={notif._id} className="p-3 rounded-md bg-white/5 flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="text-sm text-white">{notif.message}</p>
                      <span className="text-[10px] text-[#b3b3b3]">
                        {new Date(notif.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDismissNotification(notif._id)}
                      className="text-xs text-[#b3b3b3] hover:text-white mt-0.5"
                      title="Dismiss"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}

                {!updateWorker && notifications.length === 0 && (
                  <p className="py-8 text-center text-sm text-[#b3b3b3]">No new notifications</p>
                )}
              </div>
            </div>
          )}
          {activeDropdown === 'settings' && (
            <div className="absolute right-0 top-10 z-50 w-48 overflow-hidden rounded-md bg-[#282828] shadow-2xl">
              {showInstallButton && (
                <button onClick={() => { handleInstallClick(); setActiveDropdown(null); }} className="w-full px-4 py-3 text-left text-sm font-bold text-[#1db954] transition-colors hover:bg-[#3d3d3d]">
                  Install App
                </button>
              )}
              <button
                onClick={() => {
                  setActiveDropdown(null);
                  setView('request-song' as any);
                }}
                className="w-full px-4 py-3 text-left text-sm font-bold text-[#1db954] transition-colors hover:bg-[#3d3d3d] hover:text-white"
              >
                Request a Song
              </button>
              <button
                onClick={() => {
                  setView('play-area');
                  setActiveDropdown(null);
                }}
                className="w-full px-4 py-3 text-left text-sm font-bold text-[#1db954] transition-colors hover:bg-[#3d3d3d] hover:text-white"
              >
                Play Area
              </button>
              <button
                onClick={() =>{showToast('General settings coming soon!');
                  setActiveDropdown(null);
                }}
                className="w-full px-4 py-3 text-left text-sm text-[#b3b3b3] transition-colors hover:bg-[#3d3d3d] hover:text-white"
              >
                General Settings
              </button>
            </div>
          )}
        </>
      )}
    </header>
    </>
  );
};
