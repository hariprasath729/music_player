import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

/* ─── Types ─────────────────────────────────────────────────── */
export type AuthStatus = 'idle' | 'checking' | 'authenticated' | 'unauthenticated' | 'timeout';
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  profilePic?: string;
  token?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  authStatus: AuthStatus;
  verifySession: (signal?: AbortSignal) => Promise<void>;
  login: (user: AuthUser) => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  sendOtp: (email: string) => Promise<void>;
  signup: (data: { email: string; password: string; name: string; otp?: string }) => Promise<void>;

  // Forgot password / reset / magic login
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  verifyToken: (token: string) => Promise<{ valid: boolean }>;
  magicLogin: (token: string) => Promise<void>;

  contactAdmin: (email: string, name: string, message: string) => Promise<void>;
  requestSong: (songs: string[] | string) => Promise<void>;
  logout: () => void;
  clearSession: () => void;
  clearError: () => void;
  isPendingApproval: boolean;
  setIsPendingApproval: (val: boolean) => void;
}

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '') + '/api';
const AUTH_USER_KEY = 'music_player_auth_user';
const AUTH_TOKEN_KEY = 'music_player_token';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
  authStatus: 'idle',
  verifySession: async () => {},
  login: () => {},
  loginWithEmail: async () => {},
  sendOtp: async () => {},
  signup: async () => {},

  // Forgot password / reset / magic login
  forgotPassword: async () => {},
  resetPassword: async () => {},
  verifyToken: async () => ({ valid: false }),
  magicLogin: async () => {},
  contactAdmin: async () => {},
  requestSong: async () => {},
  logout: () => {},
  clearSession: () => {},
  clearError: () => {},
  isPendingApproval: false,
  setIsPendingApproval: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });
  const [token, setToken] = useState<string | null>(() => {
    try { return localStorage.getItem(AUTH_TOKEN_KEY); } catch { return null; }
  });
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPendingApproval, setIsPendingApproval] = useState(false);
  const [authStatus, setAuthStatus] = useState<AuthStatus>('idle');
  const verifyAbortRef = useRef<AbortController | null>(null);

  const storeSession = (newToken: string, newUser: AuthUser) => {
    setToken(newToken);
    setUser(newUser);
    setIsLoggedIn(true);
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, newToken);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
    } catch {}
  };

  const clearSession = useCallback(() => {
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    } catch {}
  }, []);

  const login = useCallback((newUser: AuthUser) => {
    storeSession(newUser.token || 'mock-token', newUser);
    setAuthStatus('authenticated');
  }, []);

  /* ─── Session Verification (called by AppBootstrap during startup) ─── */
  const isTokenExpired = useCallback((tok: string): boolean => {
    try {
      const parts = tok.split('.');
      if (parts.length !== 3) return false;
      const payload = JSON.parse(atob(parts[1]));
      if (payload.exp) {
        return payload.exp * 1000 <= Date.now();
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const verifySession = useCallback(async (signal?: AbortSignal) => {
    // Clean up any previous in-flight verification
    if (verifyAbortRef.current) {
      verifyAbortRef.current.abort();
    }

    const storedToken = (() => {
      try { return localStorage.getItem(AUTH_TOKEN_KEY); } catch { return null; }
    })();

    // No token at all → unauthenticated immediately
    if (!storedToken) {
      setAuthStatus('unauthenticated');
      return;
    }

    // Temporary test user bypass — no backend to verify against
    if (storedToken === 'temporary-test-token') {
      setAuthStatus('authenticated');
      return;
    }

    // Check token validity before doing anything else
    if (isTokenExpired(storedToken)) {
      try {
        localStorage.setItem('auth_session_expired_toast', 'true');
      } catch {}
      clearSession();
      setAuthStatus('unauthenticated');
      return;
    }

    // If offline, trust the cached token immediately without checking with the backend/DB
    if (!navigator.onLine) {
      console.log('App is offline. Trusting cached session without DB check.');
      setAuthStatus('authenticated');
      return;
    }

    setAuthStatus('checking');

    // Set up a local abort controller for the fetch so we can timeout locally
    const localAbortController = new AbortController();
    
    // Propagate the external signal abort if it occurs
    const onExternalAbort = () => {
      localAbortController.abort();
    };
    if (signal) {
      signal.addEventListener('abort', onExternalAbort);
    }

    // Set up a local timeout of 2.5 seconds to race the fetch
    const timeoutId = setTimeout(() => {
      localAbortController.abort();
    }, 2500);

    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        signal: localAbortController.signal,
      });

      clearTimeout(timeoutId);
      if (signal) {
        signal.removeEventListener('abort', onExternalAbort);
      }

      // If aborted by external cleanup/unmount, don't change state
      if (signal?.aborted) return;

      // 401, 403, and 404 explicitly mean the user doesn't exist or is not authorized anymore.
      // In these cases, we must clear the session.
      if (res.status === 401 || res.status === 403 || res.status === 404) {
        try {
          localStorage.setItem('auth_session_expired_toast', 'true');
        } catch {}
        clearSession();
        setAuthStatus('unauthenticated');
        return;
      }

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const json = await res.json();
      const verifiedUser = json.user;

      if (!verifiedUser) {
        clearSession();
        setAuthStatus('unauthenticated');
        return;
      }

      // Refresh local session with the verified backend data
      storeSession(storedToken, {
        id: verifiedUser.id,
        name: verifiedUser.name,
        email: verifiedUser.email,
        profilePic: verifiedUser.profilePic,
        token: storedToken,
      });
      setAuthStatus('authenticated');
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      if (signal) {
        signal.removeEventListener('abort', onExternalAbort);
      }

      // If externally aborted (e.g. component unmounted), return without setting state
      if (signal?.aborted) {
        return;
      }

      // Distinguish a local timeout abort from external abort
      const isTimeout = err instanceof DOMException && err.name === 'AbortError' && !signal?.aborted;

      // Trust cached session on network error, server error (500), or timeout since the local token is valid and unexpired
      const isNetworkError =
        isTimeout ||
        !navigator.onLine ||
        (err instanceof TypeError) ||
        (err instanceof Error && err.message.includes('Server returned'));

      if (isNetworkError) {
        console.warn(
          isTimeout
            ? 'Session verification timed out. Trusting cached session.'
            : 'Network/Server error verifying session. Trusting cached session.',
          err
        );
        setAuthStatus('authenticated');
        return;
      }

      // Unexpected error - log out as fallback
      clearSession();
      setAuthStatus('unauthenticated');
    }
  }, [clearSession, isTokenExpired]);

  const loginWithEmail = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok && !json.success) throw new Error(json.error || json.message || 'Login failed');
      
      // Adapt to either { success: true, data: { token, user } } OR direct { token, user }
      const responseToken = json.data?.token || json.token;
      const responseUser = json.data?.user || json.user;
      
      if (!responseToken || !responseUser) throw new Error('Invalid response format from server');
      storeSession(responseToken, responseUser);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      if (msg.includes('Waiting for admin approval')) {
        setIsPendingApproval(true);
      } else if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('network')) {
        setError('Network/CORS error. Ensure the backend has the "cors" package enabled for all origins.');
      } else {
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendOtp = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok && !json.success) throw new Error(json.error || json.message || 'Failed to send OTP');
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (data: { email: string; password: string; name: string; otp?: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok && !json.success) throw new Error(json.error || json.message || 'Signup failed');
      
      // Adapt to either { success: true, data: { token, user } } OR direct { token, user }
      const responseToken = json.data?.token || json.token;
      const responseUser = json.data?.user || json.user;
      
      if (!responseToken || !responseUser) throw new Error('Invalid response format from server');
      storeSession(responseToken, responseUser);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Signup failed';
      if (msg.includes('Waiting for admin approval')) {
        setIsPendingApproval(true);
      } else if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('network')) {
        setError('Network/CORS error. Ensure the backend has the "cors" package enabled for all origins.');
      } else {
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok && !json.success) throw new Error(json.error || json.message || 'Failed to request reset link');
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (token: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok && !json.success) throw new Error(json.error || json.message || 'Failed to reset password');
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = useCallback(async (token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/verify-token?token=${encodeURIComponent(token)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || json?.message || 'Failed to verify token');
      return { valid: !!json.valid };
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const magicLogin = useCallback(async (token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/magic-login?token=${encodeURIComponent(token)}`, {
        method: 'GET',
      });

      // Backend may redirect; if so, browser will handle. If it returns JSON, we parse.
      let json: any = null;
      try { json = await res.json(); } catch {}

      // If backend returns token/user JSON:
      const responseToken = json?.data?.token || json?.token;
      const responseUser = json?.data?.user || json?.user;

      if (res.ok && responseToken && responseUser) {
        storeSession(responseToken, responseUser);
        return;
      }

      // Otherwise just ensure status is OK
      if (!res.ok) {
        throw new Error(json?.error || json?.message || 'Magic login failed');
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const contactAdmin = useCallback(async (email: string, name: string, message: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/contact-admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, message }),
      });
      const json = await res.json();
      if (!res.ok && !json.success) throw new Error(json.error || json.message || 'Failed to send message');
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const requestSong = useCallback(async (songs: string[] | string) => {
    setIsLoading(true);
    setError(null);

    try {
      const tokenLocal = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!tokenLocal) throw new Error('Not authenticated');

      const res = await fetch(`${API_URL}/auth/request-song`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenLocal}`,
        },
        body: JSON.stringify({ songs }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok && !json.success) throw new Error(json.error || json.message || 'Failed to send song request');
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      if (token) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch { /* server might be down, still clear local session */ }
    setIsPendingApproval(false);
    clearSession();
  }, [token]);

  const clearError = useCallback(() => setError(null), []);

  useEffect(() => { setIsLoggedIn(!!user); }, [user]);

  useEffect(() => {
    if (!token) return;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return;
      const payload = JSON.parse(atob(parts[1]));
      if (payload.exp) {
        const checkExpiry = () => {
          const timeRemaining = payload.exp * 1000 - Date.now();
          if (timeRemaining <= 0) {
            try {
              localStorage.setItem('auth_session_expired_toast', 'true');
            } catch {}
            logout();
            return true;
          }
          return false;
        };

        // Check immediately
        if (checkExpiry()) return;

        // Set up interval to check every 30 seconds
        const interval = setInterval(checkExpiry, 30000);
        return () => clearInterval(interval);
      }
    } catch (err) {
      console.error('Failed to parse token for expiration', err);
    }
  }, [token, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        error,
        authStatus,
        verifySession,
        login,
        loginWithEmail,
        sendOtp,
        signup,
        forgotPassword,
        resetPassword,
        verifyToken,
        magicLogin,
        contactAdmin,
        requestSong,
        logout,
        clearSession,
        clearError,
        isPendingApproval,
        setIsPendingApproval,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
