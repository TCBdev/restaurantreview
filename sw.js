// SERVICE WORKER SCRIPT REGISTERED IN JS/MAIN.JS. SERVICE WORKER INTERCEPTS NETWORK REQUESTS. 

const cacheName = 'restaurant-reviews-app-cache-v3';

const cacheAssets = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
];

/************************************
            INSTALL EVENT
************************************/

self.addEventListener('install', event => {
  console.log('Service Worker: Installed');
  event.waitUntil(
    caches // CACHE RESOURCES
    .open(cacheName)
    .then(cache => {
      console.log('Service Worker: Caching Files');
      cache.addAll(cacheAssets);
    })
    .then(() => self.skipWaiting())
  );
});

/************************************
            ACTIVATE EVENT
************************************/

self.addEventListener('activate', event => {
  console.log('Service Worker: Activated');
  //REMOVE OLD CACHE VERSIONS
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Cleared Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

/************************************
              FETCH EVENT
************************************/

self.addEventListener('fetch', event => {
  console.log('Sevice Worker: Fetching');
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});