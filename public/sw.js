/* Aakrikada service worker: page loads network-first (so demo updates show up), falls back to cache, then offline page. */
const V='v2', SHELL='aakrikada-shell-'+V, RUN='aakrikada-run-'+V;
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL).then(c=>c.addAll(['/','/offline.html','/manifest.webmanifest','/icons/icon-192.png','/icons/icon.svg'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>![SHELL,RUN].includes(x)).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET')return; const u=new URL(r.url);
  if(u.origin===location.origin&&u.pathname.startsWith('/api/'))return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(SHELL).then(x=>x.put('/',c));return res}).catch(async()=>(await caches.match('/'))||(await caches.match('/offline.html'))));return;
  }
  const ok=u.origin===location.origin||u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com';
  if(!ok)return;
  e.respondWith(caches.open(RUN).then(async c=>{const hit=await c.match(r);const net=fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone());return res}).catch(()=>hit);return hit||net}));
});
