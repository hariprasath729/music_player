import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    let appVersion = 'unknown';

    try {
      // Append timestamp to completely bypass Service Worker and HTTP caches
      const res = await fetch(`/manifest.json?t=${Date.now()}`);
      if (res.ok) {
        const manifest = await res.json();
        if (manifest?.version) appVersion = String(manifest.version);
      }
    } catch (e) {
      console.warn('Failed to read manifest version', e);
    }

    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('Service Worker Registered');
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              window.dispatchEvent(
                new CustomEvent('pwa-update-available', { detail: { worker: newWorker, version: appVersion } })
              );
            }
          });
        }
      });
    }).catch(err => console.log('ServiceWorker registration failed:', err));

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        sessionStorage.setItem('pwa-updated', 'true');
        sessionStorage.setItem('pwa-updated-version', appVersion);
        sessionStorage.setItem('pwa-suppress-update-ui', 'true');
        window.location.reload();
        refreshing = true;
      }
    });
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
