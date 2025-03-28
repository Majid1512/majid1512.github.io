importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
);




const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  './', // Cache the main HTML file
  './index.html',
  './css/style.css',
  // './script.js',
  './manifest.json',
  './icons/icon-192x192.png' // Add all your assets
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Serve from cache if available
      }
      return fetch(event.request); // Otherwise, fetch from network
    })
  );
});