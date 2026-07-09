/**
 * Stream Service
 * ---------------
 * The ONLY frontend component that communicates with /api/stream/request.
 * PlayerContext calls this service — it never touches the stream API directly.
 *
 * Responsibilities:
 *  - Request a temporary signed stream URL from the backend for a given songId
 *  - Cache valid URLs in memory (reuse until 30s before expiry)
 *  - Silently prefetch the next songs in the queue
 *  - Clear cache on logout
 *
 * Design contract:
 *  The URL this service returns is /api/stream/play/<token> — a backend URL.
 *  The real CDN URL never reaches the frontend.
 */

// ── Types ──────────────────────────────────────────────────────────────────

interface CacheEntry {
  streamUrl: string;
  expiresAt: number; // Unix ms timestamp
}

// ── Configuration ──────────────────────────────────────────────────────────

/** Refresh a token this many ms before it expires (30 seconds buffer). */
const REFRESH_BUFFER_MS = 30_000;

/** Backend base URL (resolves to the Express backend port). */
// @ts-ignore
const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

// ── In-Memory Cache ────────────────────────────────────────────────────────

const cache = new Map<string, CacheEntry>();

/** Prefetch jobs in-flight (avoid duplicate concurrent requests for the same song). */
const inFlight = new Map<string, Promise<string>>();

// ── Internal Helpers ────────────────────────────────────────────────────────

function isCacheValid(entry: CacheEntry): boolean {
  return entry.expiresAt - Date.now() > REFRESH_BUFFER_MS;
}

function getAuthToken(): string {
  try {
    const token = localStorage.getItem('music_player_token');
    if (token) return token;

    const raw = localStorage.getItem('music_player_auth_user');
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed.token || '';
    }
  } catch {
    // ignore
  }
  return '';
}

async function fetchStreamUrl(songId: string): Promise<string> {
  // Deduplicate concurrent requests for the same songId
  const existing = inFlight.get(songId);
  if (existing) return existing;

  const request = (async () => {
    const token = getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}/api/stream/request`, {
      method: 'POST',
      headers,
      credentials: 'include', // send session cookie / token
      body: JSON.stringify({ songId: Number(songId) }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Stream request failed: ${res.status}`);
    }

    const json = await res.json();
    const { streamUrl, expiresAt } = json.data ?? {};

    if (!streamUrl || !expiresAt) {
      throw new Error('Invalid stream response from server');
    }

    // Convert relative URL to absolute using API_BASE
    const absoluteStreamUrl = streamUrl.startsWith('http') ? streamUrl : `${API_BASE}${streamUrl}`;

    // Store in cache
    cache.set(songId, { streamUrl: absoluteStreamUrl, expiresAt });
    return absoluteStreamUrl;
  })();

  inFlight.set(songId, request);

  try {
    return await request;
  } finally {
    inFlight.delete(songId);
  }
}

// ── Public API ──────────────────────────────────────────────────────────────

/**
 * Returns a valid, temporary stream URL for the given songId.
 *
 * - Returns a cached URL if it's still valid (not expiring in < 30s)
 * - Otherwise, requests a fresh token from the backend
 *
 * The returned URL points to /api/stream/play/:token — never to the real CDN.
 */
export async function getStreamUrl(songId: string | number): Promise<string> {
  const key = String(songId);

  const cached = cache.get(key);
  if (cached && isCacheValid(cached)) {
    return cached.streamUrl;
  }

  return fetchStreamUrl(key);
}

/**
 * Silently prefetches the stream URL for the given songId.
 * Fire-and-forget — errors are swallowed (non-critical).
 * Called by PlayerContext after playback starts to warm up the next track.
 */
export function prefetch(songId: string | number | undefined): void {
  if (!songId && songId !== 0) return;
  const key = String(songId);

  // Skip if already cached and valid, or if already in flight
  if ((cache.get(key) && isCacheValid(cache.get(key)!)) || inFlight.has(key)) return;

  fetchStreamUrl(key).catch(() => {
    // Prefetch errors are non-fatal — the getStreamUrl() call at play time handles retries
  });
}

/**
 * Clears the entire URL cache.
 * Must be called on logout to prevent stale tokens from lingering in memory.
 */
export function clearStreamCache(): void {
  cache.clear();
  inFlight.clear();
}

// Exported as a namespace for convenience
const streamService = { getStreamUrl, prefetch, clearStreamCache };
export default streamService;
