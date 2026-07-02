import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Analytics } from "@vercel/analytics/react";
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
      console.log('[PWA] Service Worker Registered');

      // Force-check for updates on page load
      registration.update().then(() => {
        console.log('[PWA] Programmatic update check completed');
      }).catch((err) => {
        console.warn('[PWA] update check failed:', err);
      });

      const notifyUpdate = (worker: ServiceWorker) => {
        console.log('[PWA] notifyUpdate called. Worker state:', worker.state);
        const suppress = sessionStorage.getItem('pwa-suppress-update-ui');
        console.log('[PWA] pwa-suppress-update-ui flag:', suppress);
        if (suppress === 'true') return;

        let resolved = false;

        const dispatch = (version: string) => {
          if (resolved) return;
          resolved = true;

          const updatedVersion = sessionStorage.getItem('pwa-updated-version');
          const pwaUpdated = sessionStorage.getItem('pwa-updated') === 'true';
          console.log('[PWA] dispatch called with version:', version, { updatedVersion, pwaUpdated });

          // If we've already updated to this version, suppress UI.
          if (updatedVersion && updatedVersion === version) {
            console.log('[PWA] Suppressing update UI because version matches updatedVersion:', version);
            return;
          }

          // If the app has already been marked as updated, but updatedVersion wasn't
          // written yet (race on manual refresh), write it now and suppress.
          if (pwaUpdated) {
            console.log('[PWA] App is already marked as updated, saving version and returning');
            if (!updatedVersion && version !== 'unknown') {
              sessionStorage.setItem('pwa-updated-version', version);
            }
            return;
          }

          console.log('[PWA] Dispatching pwa-update-available custom event now!');
          // Persist update flag so it survives HMR / page reloads
          sessionStorage.setItem('pwa-update-pending', 'true');
          sessionStorage.setItem('pwa-update-pending-version', version);
          window.dispatchEvent(
            new CustomEvent('pwa-update-available', { detail: { worker, version } })
          );
        };

        const channel = new MessageChannel();
        channel.port1.onmessage = (event) => {
          const version = event.data?.version || 'unknown';
          console.log('[PWA] Received version reply from worker:', version);
          dispatch(version);
        };

        try {
          console.log('[PWA] Sending GET_VERSION message to worker');
          worker.postMessage({ type: 'GET_VERSION' }, [channel.port2]);
        } catch (err) {
          console.warn('[PWA] Failed to postMessage to waiting worker:', err);
          dispatch('unknown');
        }

        // Fallback: if worker doesn't reply within 150ms (e.g. asleep/waiting), show the update prompt anyway
        setTimeout(() => {
          console.log('[PWA] Timeout fallback triggered (no response from worker in 150ms)');
          dispatch('unknown');
        }, 150);
      };

      // Check if there is already a waiting worker
      if (registration.waiting) {
        console.log('[PWA] Found waiting worker on load:', registration.waiting);
        notifyUpdate(registration.waiting);
      }

      // Check if there is a pending update flag from a prior page load/HMR reload
      if (sessionStorage.getItem('pwa-update-pending') === 'true') {
        const pendingVersion = sessionStorage.getItem('pwa-update-pending-version') || 'unknown';
        console.log('[PWA] Found pending update from prior reload, version:', pendingVersion);
        // Only dispatch if we have a waiting worker to attach
        if (registration.waiting) {
          window.dispatchEvent(
            new CustomEvent('pwa-update-available', { detail: { worker: registration.waiting, version: pendingVersion } })
          );
        }
      }

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('[PWA] updatefound event. Installing worker:', newWorker);
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            console.log('[PWA] Installing worker state changed to:', newWorker.state);
            if (newWorker.state === 'installed') {
              const isUpdate = !!navigator.serviceWorker.controller || !!registration.active;
              console.log('[PWA] Worker reached installed. isUpdate:', isUpdate, {
                controller: !!navigator.serviceWorker.controller,
                active: !!registration.active
              });
              if (isUpdate) {
                notifyUpdate(newWorker);
              }
            }
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
        // Clear pending update flag so banner doesn't re-show after reload
        sessionStorage.removeItem('pwa-update-pending');
        sessionStorage.removeItem('pwa-update-pending-version');

        // Determine the activated SW version deterministically instead of relying on
        // the timing of the in-memory `newWorkerVersion` variable.
        const controller = navigator.serviceWorker.controller;
        if (controller) {
          const channel = new MessageChannel();
          channel.port1.onmessage = (event) => {
            const version = event.data?.version;
            if (version) sessionStorage.setItem('pwa-updated-version', String(version));

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
    <Analytics />
  </StrictMode>
);
