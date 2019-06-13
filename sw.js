const cacheName = 'ajb-cache-v1';
const resourcesToPrecache = [
  '/',
  'index.html',
  '/images/favicon.ico',
  '/main.js',
  '/js/vue2.6.10.js',
  '/js/clock.js',
  '/css/main.css'
];

self.addEventListener('install', event => {
  // from YouTube: https://www.youtube.com/watch?v=dXuvT4oollQ&list=PLNYkxOF6rcIB2xHBZ7opgc2Mv009X87Hh&index=4
  // console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(resourcesToPrecache);
      })
  );
});

self.addEventListener('activate', event => {
  // console.log('Activate event!');
});

self.addEventListener('fetch', event => {
  // console.log('Fetch intercepted for: ', event.request.url);
  // see if we have a cached response or fetch a fresh request
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});