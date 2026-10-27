const CACHE_NAME = 'kellem-school-app-logo-v2';
const APP_FILES = [
  './', './index.html', './styles.css', './script.js', './manifest.webmanifest',
  './assets/app-icon-192.png', './assets/app-icon-512.png',
  './assets/school-office.jpg', './assets/school-campus.jpg', './assets/community-group.jpg',
  './assets/school-office-front.jpg', './assets/portrait-1.jpg', './assets/school-statue.jpg',
  './assets/bilisuma-yadasa-beka.png', './assets/classrooms.jpg',
  './assets/school-building-1.jpg', './assets/school-gate.jpg', './assets/english-club-learning.jpg'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response && response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)); }
    return response;
  }).catch(() => caches.match('./index.html'))));
});
