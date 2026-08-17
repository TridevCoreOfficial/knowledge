const CACHE = 'tridev-v7';
const ASSETS = ['./manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;
  const isCode = /\.(html|css|js)(\?|$)/.test(url) || url.endsWith('/') || url.includes('/knowledge');
  if (isCode) {
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        if (res.ok) caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(res => {
        const copy = res.clone();
        if (res.ok && url.startsWith(self.location.origin)) {
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }))
    );
  }
});
