import { Capacitor } from '@capacitor/core';

const configuredUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const nativeFallback = 'https://music-player-z1db.onrender.com';
const browserFallback = 'http://localhost:5000';
const isLocalhostUrl = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(configuredUrl);

// Vite loads .env into every build, so a local VITE_API_URL must never leak
// into a production bundle. Development uses the local backend; production
// uses Render unless an explicit non-local API URL was configured.
export const BACKEND_URL = import.meta.env.DEV
  ? configuredUrl || browserFallback
  : (!configuredUrl || isLocalhostUrl ? nativeFallback : configuredUrl);
