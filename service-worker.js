// Install Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        '/offline.html'
      ]);
    })
  );
});

// Intercept network requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return the cached response if it is available
        if (response) {
          return response;
        }

        // If the response is not in the cache, try to fetch it from the network
        return fetch(event.request)
          .then((response) => {
            // If the response is successful, add it to the cache and return it
            if (response.status === 200) {
              const responseToCache = response.clone();
              caches.open(cacheName)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              return response;
            }

            // If the response fails and the user is offline, respond with the cached offline page
            if (!navigator.onLine) {
              return caches.match('offline.html');
            }

            // If the response fails and the user is online, return the original response
            return response;
          });
      })
  );
});