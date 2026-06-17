import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

if ('serviceWorker' in navigator) {
  // This variable will be used to store the version of the new service worker.
  // The 'pwa-update-available' event will set this, and the 'controllerchange'
  // event will read it to know which version was just activated.
  let newWorkerVersion: string | undefined;
  window.addEventListener('pwa-update-available', (e) => {
    newWorkerVersion = (e as CustomEvent).detail?.version;
  });

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('Service Worker Registered');

      const notifyUpdate = (worker: ServiceWorker) => {
        // If user already clicked "Update Now", don't re-trigger the update UI
        // while suppression is active.
        if (sessionStorage.getItem('pwa-suppress-update-ui') === 'true') return;

        const channel = new MessageChannel();
        channel.port1.onmessage = (event) => {
          const version = event.data?.version || 'unknown';

          const updatedVersion = sessionStorage.getItem('pwa-updated-version');
          const pwaUpdated = sessionStorage.getItem('pwa-updated') === 'true';

          // If we've already updated and the SW reports the same version, suppress UI.
          if (updatedVersion && updatedVersion === version) return;

          // If the app has already been marked as updated, but updatedVersion wasn't
          // written yet (race on manual refresh), write it now and suppress.
          if (pwaUpdated) {
            if (!updatedVersion) sessionStorage.setItem('pwa-updated-version', version);
            return;
          }

          window.dispatchEvent(
            new CustomEvent('pwa-update-available', { detail: { worker, version } })
          );
        };
        worker.postMessage({ type: 'GET_VERSION' }, [channel.port2]);
      };

      // Check if there is already a waiting worker
      if (registration.waiting) {
        notifyUpdate(registration.waiting);
      }

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') notifyUpdate(newWorker);
          });
        }
      });
    }).catch(err => console.log('ServiceWorker registration failed:', err));

    let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;

        // Mark update success exactly once (used by toast + to suppress re-notification)
        sessionStorage.setItem('pwa-updated', 'true');

        // Determine the activated SW version deterministically instead of relying on
        // the timing of the in-memory `newWorkerVersion` variable.
        const controller = navigator.serviceWorker.controller;
        if (controller) {
          const channel = new MessageChannel();
          channel.port1.onmessage = (event) => {
            const version = event.data?.version;
            if (version) sessionStorage.setItem('pwa-updated-version', version);

            // Reload into the new controlled client once
            window.location.reload();
          };

          controller.postMessage({ type: 'GET_VERSION' }, [channel.port2]);
        } else {
          // Fallback: still suppress UI + reload even if controller is not available.
          window.location.reload();
        }

        // Suppress "update available" UI after Update Now
        sessionStorage.setItem('pwa-suppress-update-ui', 'true');
      });
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
