// عامل الخدمة: يحفظ اللعبة كاملة على الجهاز عند أول زيارة، فتعمل بعدها دون إنترنت.
// الطريقة: يُعرض المحفوظ فوراً، ويُحدَّث في الخلفية حين يتوفر الاتصال (فيظهر أي تعديل منشور في المرة التالية).
// غيّر V فقط إن أضفت ملفاً جديداً إلى FILES أو حذفت واحداً.
const V = 'asawir-v1';
const FILES = ['./', 'index.html', 'style.css', 'game.js', 'audio-data.js', 'images-data.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  // ملفات اللعبة وخطوط Google فقط؛ أي طلب آخر يمر كما هو
  if (r.method !== 'GET' || !(u.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))) return;
  e.respondWith(caches.open(V).then(async c => {
    const hit = await c.match(r, { ignoreSearch: u.origin === location.origin });
    const net = fetch(r).then(res => {
      if (res.ok || res.type === 'opaque') c.put(r, res.clone());
      return res;
    }).catch(() => hit || (r.mode === 'navigate' ? c.match('index.html') : Response.error()));
    if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
    return net;
  }));
});
