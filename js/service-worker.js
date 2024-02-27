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
    '/img/maskable_icon_x512.png',
    '/img/maskable_icon_x384.png',
    '/img/maskable_icon_x192.png',
    '/img/maskable_icon_x128.png',
    '/img/maskable_icon_x96.png',
    '/img/maskable_icon_x72.png',
    '/img/maskable_icon_x48.png',
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
