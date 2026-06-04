const CACHE_VERSION = 'v2';
const CACHE_NAME = `optionswars-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  './',
  './index.html',
  './game.js',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isStatic = STATIC_ASSETS.some(a =>
    url.pathname.endsWith(a.replace('./', '/')) || url.pathname.endsWith(a)
  );

  if (isStatic) {
    // Cache-first: serve from cache, populate cache on miss
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        });
      })
    );
  } else {
    // Network-first: try network, fall back to cache
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
