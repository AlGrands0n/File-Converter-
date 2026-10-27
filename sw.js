/* sw.js · Service Worker: يجعل التطبيق يفتح ويعمل بلا إنترنت بعد أول استخدام متصل.
 *
 * - ملفات الموقع نفسه: stale-while-revalidate (تظهر المحفوظة فوراً، وتتحدّث في الخلفية).
 * - المكتبات من CDN (unpkg / cdnjs / jsdelivr): تُحفظ عند أول استخدام، فيعمل PDF وWord وExcel
 *   والفيديو (FFmpeg) بلا إنترنت بعد ذلك.
 * - أي شيء آخر (مثل Supabase) يذهب إلى الشبكة مباشرة ولا يُحفظ أبداً.
 *
 * عند تحديث الملفات على الموقع تصل النسخة الجديدة في الفتحة التالية.
 */
const CACHE = 'fc-shell-2.0.1';
const SHELL = ['./', './index.html', './styles.css', './config.js', './offline-sync.js', './app.js'];
const CDN_HOSTS = ['unpkg.com', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const own = url.origin === self.location.origin;
  if (!own && !CDN_HOSTS.includes(url.hostname)) return;   // Supabase وغيره: الشبكة مباشرة
  event.respondWith(staleWhileRevalidate(req, own));
});

async function staleWhileRevalidate(req, own) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req);
  const network = fetch(req)
    .then(res => {
      // الاستجابات المعتمة (opaque) من CDN عند تحميل السكربتات مقبولة للحفظ
      if (res.ok || res.type === 'opaque') cache.put(req, res.clone()).catch(() => {});
      return res;
    })
    .catch(() => null);

  if (cached) return cached;
  const fresh = await network;
  if (fresh) return fresh;
  if (own && req.mode === 'navigate') return (await cache.match('./index.html')) || Response.error();
  return Response.error();
}
