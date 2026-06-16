const CACHE_NAME = "music-player-v55";

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
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate → clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Listen for update triggers from the UI
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Fetch strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // API calls → network first
  if (request.url.includes("/api/")) {
    event.respondWith(
      fetch(request)
        .then((res) => res)
        .catch(() => caches.match(request))
    );
    return;
  }

  // Static files → cache first
  event.respondWith(
    caches.match(request).then((cached) => {
      return (
        cached ||
        fetch(request).then((res) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, res.clone());
            return res;
          });
        })
      );
    })
  );
});