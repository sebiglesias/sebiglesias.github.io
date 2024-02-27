const CACHE_NAME = 'site-static-v1'
const assetsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/css/bootstrap.css',
    '/css/button.css',
    '/css/img.css',
    '/css/layout.css',
    '/js/bootstrap.js',
    '/img/favicon.ico',
    '/img/me.jpg',
    '/img/icon-512x512.png',
    '/assets/en/cv.pdf',
    '/assets/es/cv.pdf'
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                cache.addAll(assetsToCache);
            })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cacheResponse => {
            return cacheResponse || fetch(event.request);
        })
    )
})
