/* ==========================================================================
   AZOLLA EGYPT - Service Worker (100% Offline Cache & Network-First Strategy)
   ========================================================================== */

const CACHE_NAME = 'azolla-mobile-v2.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/mobile.css',
  './js/mobile-app.js',
  './manifest.json',
  './favicon.ico',
  './favicon.png',
  './assets/images/logo_azolla.png',
  './assets/images/logo_sgp.jpg',
  './assets/images/logo_gef.jpg',
  './assets/images/logo_undp.jpg',
  './assets/images/logo_ngohub.png',
  './assets/images/field_farm_large.jpg',
  './assets/images/field_rooftop_basin.jpg',
  './assets/images/field_macro_azolla.jpg',
  './assets/images/qr_simulator.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Some assets could not be cached on install:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to update cache
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return networkResponse;
      }).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});
