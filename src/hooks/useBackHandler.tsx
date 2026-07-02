import { useEffect, useRef, useCallback } from 'react';

type BackHandlerOptions = {
  customBackHandler: (stack: string[]) => string | void;
};

type UseBackHandlerReturn = {
  pushScreen: (id: string) => void;
  resetHistory: () => void;
};

export function useBackHandler({ customBackHandler }: BackHandlerOptions): UseBackHandlerReturn {
  // Internal stack tracking our app navigation
  const appHistory = useRef<string[]>([]);

  // Push a new screen identifier onto our stack and into the browser history
  const pushScreen = useCallback((screenId: string) => {
    // Avoid duplicate pushes for the same screen consecutively
    const last = appHistory.current[appHistory.current.length - 1];
    if (last === screenId) return;
    appHistory.current.push(screenId);
    // Push a new state so that back button creates a popstate event later
    window.history.pushState({ screen: screenId }, '', window.location.href);
  }, []);

  // Reset the dummy entries – useful on unload or when navigating away from the app
  const resetHistory = useCallback(() => {
    // Clear our internal stack
    appHistory.current = [];
    // Replace the current history entry with a clean state (no dummy entries)
    window.history.replaceState({}, '', window.location.href);
  }, []);

  // Popstate handler: browser already moved back, we now reconcile UI state
  const popHandler = useCallback(() => {
    // If we are currently handling a programmatic/cleanup history pop, ignore it.
    if ((window as any).__blockPopState) return;

    // Remove the most recent entry (the one we just backed out of)
    appHistory.current.pop();
    // Let the custom handler decide what to do with the remaining stack
    const signal = customBackHandler(appHistory.current);
    // If the custom handler signals an exit, we simply do nothing here – the native wrapper can act on the signal.
    if (signal === 'EXIT_APP') {
      // No further history manipulation; let the app exit or show a toast.
    } else {
      // If we still have entries, pushState again to keep the URL in sync (optional)
      if (appHistory.current.length > 0) {
        const current = appHistory.current[appHistory.current.length - 1];
        window.history.pushState({ screen: current }, '', window.location.href);
      }
    }
  }, [customBackHandler]);

  // Register popstate on mount, clean up on unmount
  useEffect(() => {
    window.addEventListener('popstate', popHandler);
    return () => {
      window.removeEventListener('popstate', popHandler);
    };
  }, [popHandler]);

  // Ensure we clean dummy history when the page unloads (e.g., full refresh)
  useEffect(() => {
    const beforeUnload = () => {
      resetHistory();
    };
    window.addEventListener('beforeunload', beforeUnload);
    return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [resetHistory]);

  return { pushScreen, resetHistory };
}
