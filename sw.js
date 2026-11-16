const CACHE_NAME = 'scaledive-v10'; // غيرنا الرقم عشان نمسح الكاش القديم
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './launchericon-192x192.png',
  './launchericon-512x512.png',
  './logo.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => { if (key !== CACHE_NAME) return caches.delete(key); }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
