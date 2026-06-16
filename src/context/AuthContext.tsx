import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/* ─── Types ─────────────────────────────────────────────────── */
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
  login: (user: AuthUser) => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  sendOtp: (email: string) => Promise<void>;
  signup: (data: { email: string; password: string; name: string; otp?: string }) => Promise<void>;
  contactAdmin: (email: string, name: string, message: string) => Promise<void>;
  logout: () => void;
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
  login: () => {},
  loginWithEmail: async () => {},
  sendOtp: async () => {},
  signup: async () => {},
  contactAdmin: async () => {},
  logout: () => {},
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

  const storeSession = (newToken: string, newUser: AuthUser) => {
    setToken(newToken);
    setUser(newUser);
    setIsLoggedIn(true);
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, newToken);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
    } catch {}
  };

  const clearSession = () => {
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    } catch {}
  };

  const login = useCallback((newUser: AuthUser) => {
    storeSession(newUser.token || 'mock-token', newUser);
  }, []);

  const loginWithEmail = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    // Temporary frontend-only test access. This does not hit MongoDB.
    if (email.trim() === 'user@123' && password === '123') {
      storeSession('temporary-test-token', {
        id: 'temporary-user-123',
        name: 'Temporary User',
        email: 'user@123',
        profilePic: 'https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/72x72/1f3a7.png',
        token: 'temporary-test-token',
      });
      setIsLoading(false);
      return;
    }

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
        const timeRemaining = payload.exp * 1000 - Date.now();
        if (timeRemaining <= 0) {
          alert('The session expires relogin to continue , now logging out');
          logout();
        } else if (timeRemaining <= 2147483647) {
          // Only set the timeout if it falls within the 32-bit integer limit (~24.8 days)
          // otherwise setTimeout overflows and fires immediately.
          const timer = setTimeout(() => {
            alert('The session expires relogin to continue , now logging out');
            logout();
          }, timeRemaining);
          return () => clearTimeout(timer);
        }
      }
    } catch (err) {
      console.error('Failed to parse token for expiration', err);
    }
  }, [token, logout]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, error, login, loginWithEmail, sendOtp, signup, contactAdmin, logout, clearError, isPendingApproval, setIsPendingApproval }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
