// Hardcode the version here. Update this string to trigger a new app update!
const CACHE_NAME = "music-player-v12.2.7";

// Files to cache (basic UI)
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/logo.png"
];

// Install → cache core files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Bypass HTTP cache during install to guarantee we get the latest assets
      for (const asset of ASSETS_TO_CACHE) {
        try {
          const response = await fetch(asset, { cache: "reload" });
          if (response.ok) await cache.put(asset, response);
        } catch (err) {
          console.warn("Failed to cache:", asset, err);
        }
      }
    })
  );
});

// Activate → clean old caches (delete all versioned caches from this app)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Clean old caches
      const keys = await caches.keys();
      await Promise.all(
        keys.map(key => {
          if ((key.startsWith("music-player-") || key === "music-player") && key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
      // Take control of all clients
      await self.clients.claim();
    })()
  );
});

// Listen for update triggers from the UI
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  } else if (event.data && event.data.type === "GET_VERSION") {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Fetch strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Bypass Service Worker for external CDNs and media files
  // This prevents CORS errors and avoids caching large audio files
  if (
    url.hostname.includes("cdn.jsdelivr.net") ||
    url.hostname.includes("raw.githubusercontent.com") ||
    url.pathname.endsWith(".mp3") ||
    url.pathname.endsWith(".wav")
  ) {
    return; // Let the browser handle the request directly
  }

  // 2. HTML pages → network first (ensures we get the latest asset hashes from Vite)
  if (request.mode === "navigate") {
    event.respondWith(
      // Force bypass HTTP cache to ensure we get the absolute latest HTML
      fetch(request.url, { cache: "reload" })
        .then((res) => {
          const responseToCache = res.clone();
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
            return res;
          });
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/index.html')))
    );
    return;
  }

  // 3. API calls → network first
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request)
        .catch((err) => {
          console.warn("API fetch failed, attempting cache fallback:", err);
          return caches.match(request).then((cached) => {
            if (cached) return cached;
            return new Response(
              JSON.stringify({ success: false, error: "Network error or offline" }),
              { status: 503, headers: { "Content-Type": "application/json" } }
            );
          });
        })
    );
    return;
  }

  // 4. Local Static files → cache first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      
      return fetch(request)
        .then((res) => {
          // Only cache valid, local responses (prevents caching opaque CORS errors)
          if (!res || res.status !== 200 || res.type !== "basic") {
            return res;
          }
          const responseToCache = res.clone();
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
            return res;
          });
        })
        .catch((err) => {
          console.warn("Fetch failed for static asset:", request.url, err);
          // Graceful fallback for offline situations
          return new Response("Offline", { status: 503, statusText: "Service Unavailable" });
        });
    })
  );
});