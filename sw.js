const C='ws-v2';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','menu.json','manifest.webmanifest'])))});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
 if(u.origin===location.origin&&u.pathname.includes('/images/')){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const c=n.clone();caches.open(C).then(x=>x.put(e.request,c));return n})));return}
 if(u.origin===location.origin){e.respondWith(fetch(e.request).then(n=>{const c=n.clone();caches.open(C).then(x=>x.put(e.request.url.split('?')[0],c));return n}).catch(()=>caches.match(e.request.url.split('?')[0]).then(r=>r||caches.match('./'))))}});
