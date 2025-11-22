const CACHE_NAME = 'salon-india-pwa-v1'; // कैश का नाम
const urlsToCache = [
  '/', // रूट फ़ोल्डर (वेबसाइट का मुख्य पेज)
  '/index.html', // मुख्य HTML फ़ाइल
  '/manifest.json', // PWA की जानकारी
  '/images/icon-192x192.png', // Icon फ़ाइल 1 (नया जोड़ा गया)
  '/images/icon-512x512.png', // Icon फ़ाइल 2 (नया जोड़ा गया)
  // अपनी वेबसाइट की सभी ज़रूरी CSS, JS और Images यहाँ जोड़ें
];

// 1. इंस्टॉलेशन: सभी फ़ाइलों को कैश करें
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. फ़ेच: कैश से जवाब दें, नेटवर्क से नहीं
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // अगर कैश में जवाब है, तो उसे रिटर्न करें
        if (response) {
          return response;
        }
        // नहीं तो नेटवर्क से फ़ेच करें
        return fetch(event.request);
      })
  );
});

// 3. एक्टिवेशन: पुराने कैश हटाएँ
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
