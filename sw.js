self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("cleanapp").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/add.html",
        "/report.html",
        "/style.css",
        "/script.js",
        "/manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
