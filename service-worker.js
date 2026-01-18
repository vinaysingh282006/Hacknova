const CACHE_NAME = 'hacknova-cache-v1';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',

  '/css/styles.css',
  '/css/air.css',
  '/css/water.css',
  '/css/light.css',

  '/js/main.js',
  '/js/script.js',
  '/js/air.js',
  '/js/air-3d.js',
  '/js/water.js',
  '/js/light.js',

  '/ecopulse-logo.png'
];

/* Install: cache core assets */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

/* Activate: clean old caches */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

/* Fetch: serve from cache when offline */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(cached =>
          cached || caches.match('/offline.html')
        )
      )
  );
});
