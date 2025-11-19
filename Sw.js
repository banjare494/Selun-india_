// PWA caching ke liye naam aur version define kiya
const CACHE_NAME = 'salon-india-cache-v1';

// Vo files jinhe offline access ke liye cache karna hai (Offline files)
// Agar aapki files ke naam alag hain, to yahan zaroor badal dein!
const urlsToCache = [
  '/',                     // Home page ka mukhya address
  '/index.html',           // Home page file
  '/manifest.json',        // Manifest file ka address
  '/css/style.css',        // Agar aapke paas yeh file hai
  '/js/main.js',           // Agar aapke paas yeh file hai
  '/images/icon-192x192.png', // Icon file
  '/images/icon-512x512.png' // Bada icon file
];

// Jab Service Worker Install hoga, tab files ko browser mein save (cache) kar dega
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Jab user kuch kholega, tab pehle save ki hui files mein dekhega
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
        if (response) {
          return response; // Agar save ki hui file mil gayi
        }
        return fetch(event.request); // Agar nahi mili, tab internet se laao
    })
  );
});

// Purane version ke caches ko saaf karna
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
