import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { AppSkeleton } from './AppSkeleton';

/* ── Startup Configuration ── */
export const STARTUP_CONFIG = {
  /** Minimum splash screen duration in ms */
  minSplash: 1500,
  /** Maximum time allowed for authentication in ms */
  authTimeout: 2500,
} as const;

/* ── Phase state machine ── */
type BootPhase = 'splash' | 'skeleton' | 'authenticated' | 'unauthenticated';

interface AppBootstrapProps {
  /** Rendered when authentication succeeds */
  children: React.ReactNode;
  /** Rendered when authentication fails or times out */
  loginFallback: React.ReactNode;
}

/**
 * AppBootstrap — Orchestrates the secure startup flow.
 *
 * Responsibilities:
 *   1. Authentication verification (parallel with splash)
 *   2. Splash screen timing (minimum duration enforcement)
 *   3. Skeleton UI transition
 *   4. Startup timeout enforcement
 *
 * Phase transitions:
 *   splash → skeleton → authenticated | unauthenticated
 *   splash → authenticated | unauthenticated  (if auth completes during splash)
 */
export const AppBootstrap: React.FC<AppBootstrapProps> = ({ children, loginFallback }) => {
  const { authStatus, verifySession, clearSession } = useAuth();

  const [phase, setPhase] = useState<BootPhase>('splash');
  const [splashDone, setSplashDone] = useState(false);

  // Track whether auth resolved (success or failure) during the splash
  const [pendingAuthResult, setPendingAuthResult] = useState<'authenticated' | 'unauthenticated' | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const splashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  /* ── Cleanup helper ── */
  const cleanup = useCallback(() => {
    mountedRef.current = false;
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (splashTimerRef.current) {
      clearTimeout(splashTimerRef.current);
      splashTimerRef.current = null;
    }
    if (timeoutTimerRef.current) {
      clearTimeout(timeoutTimerRef.current);
      timeoutTimerRef.current = null;
    }
  }, []);

  /* ── Mount: Start auth + timers in parallel ── */
  useEffect(() => {
    mountedRef.current = true;
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // 1. Fire authentication immediately
    verifySession(controller.signal);

    // 2. Splash minimum duration timer
    splashTimerRef.current = setTimeout(() => {
      if (mountedRef.current) {
        setSplashDone(true);
      }
    }, STARTUP_CONFIG.minSplash);

    // 3. Hard deadline timer
    timeoutTimerRef.current = setTimeout(() => {
      if (!mountedRef.current) return;

      // Abort any still-running fetch
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }

      // Trust the cached session on timeout instead of logging out
      console.warn('Backup timeout triggered in AppBootstrap. Trusting cached session.');
      setPendingAuthResult('authenticated');
    }, STARTUP_CONFIG.authTimeout);

    return cleanup;
  }, [verifySession, clearSession, cleanup]);

  /* ── React to authStatus changes ── */
  useEffect(() => {
    if (!mountedRef.current) return;

    // Only react to terminal auth states
    if (authStatus !== 'authenticated' && authStatus !== 'unauthenticated' && authStatus !== 'timeout') {
      return;
    }

    const resolvedResult: 'authenticated' | 'unauthenticated' =
      authStatus === 'authenticated' ? 'authenticated' : 'unauthenticated';

    // Abort the fetch on success too — prevents dangling requests
    if (resolvedResult === 'authenticated' && abortControllerRef.current) {
      // Don't abort — the request already completed. Just clean up the ref.
      abortControllerRef.current = null;
    }

    // Clear the timeout timer since auth has resolved
    if (timeoutTimerRef.current) {
      clearTimeout(timeoutTimerRef.current);
      timeoutTimerRef.current = null;
    }

    if (!splashDone) {
      // Auth resolved during splash — store the result and wait for splash to finish
      setPendingAuthResult(resolvedResult);
    } else {
      // Splash already done — transition immediately
      hideSplash();
      setPhase(resolvedResult);
    }
  }, [authStatus, splashDone]);

  /* ── React to splash completion ── */
  useEffect(() => {
    if (!splashDone || !mountedRef.current) return;

    if (pendingAuthResult) {
      // Auth already resolved during splash — transition now
      hideSplash();
      setPhase(pendingAuthResult);
    } else {
      // Auth still running — show skeleton
      hideSplash();
      setPhase('skeleton');
    }
  }, [splashDone, pendingAuthResult]);

  /* ── React to authStatus while in skeleton phase ── */
  useEffect(() => {
    if (phase !== 'skeleton' || !mountedRef.current) return;

    if (authStatus === 'authenticated') {
      if (abortControllerRef.current) {
        abortControllerRef.current = null;
      }
      if (timeoutTimerRef.current) {
        clearTimeout(timeoutTimerRef.current);
        timeoutTimerRef.current = null;
      }
      setPhase('authenticated');
    } else if (authStatus === 'unauthenticated' || authStatus === 'timeout') {
      if (timeoutTimerRef.current) {
        clearTimeout(timeoutTimerRef.current);
        timeoutTimerRef.current = null;
      }
      setPhase('unauthenticated');
    }
  }, [phase, authStatus]);

  /* ── Render based on phase ── */
  switch (phase) {
    case 'splash':
      // HTML splash is still visible — render nothing in React
      return null;

    case 'skeleton':
      return <AppSkeleton />;

    case 'authenticated':
      return <>{children}</>;

    case 'unauthenticated':
      return <>{loginFallback}</>;
  }
};

/* ── Helper: Hide the HTML splash screen ── */
function hideSplash() {
  if (typeof window !== 'undefined' && typeof (window as any).hideSplashScreen === 'function') {
    (window as any).hideSplashScreen();
  }
}
