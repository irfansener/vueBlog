self.addEventListener('install', e => {
  let timeStamp = Date.now();
  e.waitUntil(
    caches.open('vue').then(cache => {
      return cache.addAll([
        `/`,
        `https://cdn.bootcss.com/font-awesome/4.4.0/css/font-awesome.css?timestamp=${timeStamp}`,
        `/static/img/home-bg.afbd595.jpg?timestamp=${timeStamp}`,
        `https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css?timestamp=${timeStamp}`,
        `/app.js?timestamp=${timeStamp}`
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});