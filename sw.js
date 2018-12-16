// Service worker script (service worker is registered in js/main.js). Using to cache resources on service worker install. Service worker intercepts network requests. This script mainly listens for events

// Not placing this file in js folder because for security reasons, a service worker can only control the pages that are in its same directory or its subdirectories (must cache assets outside of js folder)

// Must work with service worker to pick up changes to CSS, etc., by changing service worker so browser treats updated service worker as new version, which gets its own install event in which it fetches assets (including updated ones) and places them in a new cache, which isn't automatic (have to change name of cache). Create new cache as not to disrupt one already being used by old service worker and pages it controls. Delete old cache once old service worker is released
const cacheName = 'restaurant-reviews-app-cache-v1';

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

// INSTALL EVENT

self.addEventListener('install', event => {
  console.log('Service Worker: Installed');
  event.waitUntil(
    caches
    .open(cacheName)
    .then(cache => {
      console.log('Service Worker: Caching Files');
      cache.addAll(cacheAssets);
    })
    .then(() => self.skipWaiting())
  );
});

// ACTIVATE EVENT

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

// FETCH EVENT

self.addEventListener('fetch', event => {
  console.log('Sevice Worker: Fetching');
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});