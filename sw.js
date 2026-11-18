// Offline-Speicher für "Erbe des Piratenkönigs". Bei neuer Spielversion VERSION erhöhen.
const VERSION='piratenkoenig-v217';
const FILES=['./','index.html','manifest.webmanifest','apple-touch-icon.png','icons/icon-192.png','icons/icon-512.png','icons/icon-1024.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSION).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Erst online versuchen (damit Updates ankommen), sonst aus dem Speicher
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(VERSION).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))))});
