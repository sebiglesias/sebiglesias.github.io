const CACHE_NAME = 'site-static-v1';
const assetsToCache = [
    '/',
    '/index.html',
    '/css/bootstrap.min.css',
    '/js/jquery.min.js',
    '/images/logo.png',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching assets');
                cache.addAll(assetsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cacheResponse => {
            return cacheResponse || fetch(event.request);
        })
    );
});
