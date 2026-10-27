/* offline-sync.js · مزامنة تعمل بلا إنترنت (Offline-first)
 *
 * 1) كل حدث (تحويل، أو فتح للتطبيق) يُحفظ أولاً في "صندوق صادر" على الجهاز (IndexedDB).
 * 2) عند توفر الإنترنت يُرسل الصندوق دفعات إلى الخادم، ويُحذف ما استلمه الخادم فقط.
 * 3) إعادة الإرسال آمنة: لكل حدث معرّف UUID يُولَّد على الجهاز، والخادم يتجاهل المكرَّر.
 * 4) لا يُرسل أي محتوى ملف ولا اسمه ولا بيانات شخصية، فقط بيانات وصفية مجمّعة.
 *
 * إن لم تُملأ الإعدادات في config.js (أو كانت ما زالت YOUR-...) يعمل التطبيق
 * بشكل طبيعي تماماً ولا يُرسل شيئاً.
 */
(function () {
  'use strict';

  const CFG = window.FC_CONFIG || {};
  const BASE = String(CFG.supabaseUrl || '').replace(/\/+$/, '');
  const KEY = String(CFG.supabaseAnonKey || '');
  const ENABLED = /^https:\/\/[^\s]+$/.test(BASE) && !BASE.includes('YOUR-') &&
                  KEY.length > 20 && !KEY.startsWith('YOUR-');

  const DB_NAME = 'fc-analytics', STORE = 'outbox';
  const BATCH = 100;             // أقصى عدد أحداث في الطلب الواحد
  const MAX_QUEUE = 5000;        // حماية من امتلاء التخزين على الجهاز
  const RPC_PATH = '/rest/v1/rpc/ingest_events';
  const INSTALL_KEY = 'fc_install_id';
  // مفاتيح Supabase القديمة JWT تُرسل كـ Bearer؛ المفاتيح الحديثة (sb_publishable_) تكفيها apikey.
  const AUTH = KEY.startsWith('eyJ') ? { Authorization: 'Bearer ' + KEY } : {};

  /* ---------- هوية التثبيت (معرّف عشوائي، ليس هوية شخص) ---------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (_) {} }
  };
  function uuid() {
    if (window.crypto && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const h = Array.from(b, x => x.toString(16).padStart(2, '0')).join('');
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
  }
  let installId = store.get(INSTALL_KEY);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(installId || '')) {
    installId = uuid();
    store.set(INSTALL_KEY, installId);
  }

  /* ---------- بناء الصف (مع تنظيف الحقول وتحديد أطوالها) ---------- */
  const platform = () => {
    try {
      const c = window.Capacitor;
      if (c && typeof c.getPlatform === 'function') return c.getPlatform();
    } catch (_) {}
    return 'web';
  };
  const txt = (v, n) => (v == null || v === '' ? null : String(v).slice(0, n));
  const int = (v, max) => {
    if (v == null || v === '') return null;
    const x = Math.round(Number(v));
    return Number.isFinite(x) ? Math.min(Math.max(x, 0), max) : null;
  };
  function makeRow(name, p) {
    p = p || {};
    return {
      id: uuid(),
      created_at: new Date().toISOString(),   // وقت الحدث على الجهاز (يبقى صحيحاً حتى لو تأخر الإرسال)
      install_id: installId,
      name,
      status: txt(p.status, 12),
      category: txt(p.category, 20),
      route: txt(p.route, 30),
      files: int(p.files, 100000),
      size_kb: int(p.sizeKb, 2000000000),
      duration_ms: int(p.durationMs, 2000000000),
      error_code: txt(p.errorCode, 40),
      platform: txt(platform(), 16),
      lang: txt(document.documentElement.lang || 'ar', 5),
      app_version: txt(CFG.appVersion, 16)
    };
  }

  /* ---------- الصندوق الصادر (IndexedDB) ---------- */
  let dbP = null;
  function openDb() {
    if (!dbP) {
      dbP = new Promise((resolve, reject) => {
        if (!window.indexedDB) return reject(new Error('IndexedDB unavailable'));
        const r = indexedDB.open(DB_NAME, 1);
        r.onupgradeneeded = () => {
          const os = r.result.createObjectStore(STORE, { keyPath: 'id' });
          os.createIndex('created_at', 'created_at');
        };
        r.onsuccess = () => resolve(r.result);
        r.onerror = () => reject(r.error);
      }).catch(err => { dbP = null; throw err; });
    }
    return dbP;
  }
  const reqP = r => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  const txP = tx => new Promise((res, rej) => {
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
    tx.onabort = () => rej(tx.error);
  });

  async function enqueue(row) {
    const db = await openDb();
    const count = await reqP(db.transaction(STORE).objectStore(STORE).count());
    if (count >= MAX_QUEUE) await dropOldest(db, count - MAX_QUEUE + 1);
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(row);
    await txP(tx);
  }
  async function dropOldest(db, n) {
    const tx = db.transaction(STORE, 'readwrite');
    const cur = tx.objectStore(STORE).index('created_at').openCursor();
    let left = n;
    await new Promise((res, rej) => {
      cur.onsuccess = () => {
        const c = cur.result;
        if (c && left > 0) { c.delete(); left--; c.continue(); } else res();
      };
      cur.onerror = () => rej(cur.error);
    });
    await txP(tx);
  }
  async function readBatch(db, n) {
    const out = [];
    const tx = db.transaction(STORE, 'readonly');
    await new Promise((res, rej) => {
      const cur = tx.objectStore(STORE).openCursor();
      cur.onsuccess = () => {
        const c = cur.result;
        if (c && out.length < n) { out.push(c.value); c.continue(); } else res();
      };
      cur.onerror = () => rej(cur.error);
    });
    return out;
  }
  async function deleteKeys(db, keys) {
    const tx = db.transaction(STORE, 'readwrite');
    const os = tx.objectStore(STORE);
    keys.forEach(k => os.delete(k));
    await txP(tx);
  }

  /* ---------- الإرسال ---------- */
  async function postRows(rows) {
    const res = await fetch(BASE + RPC_PATH, {
      method: 'POST',
      headers: { apikey: KEY, ...AUTH, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_rows: rows }),
      keepalive: true            // يكمل الإرسال حتى لو أُغلقت الصفحة
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
  }

  let flushing = null, retryMs = 0, retryTimer = null;
  function scheduleRetry() {
    // تراجع تدريجي: 30 ثانية ثم دقيقة ثم ... حتى 15 دقيقة كحد أقصى
    retryMs = Math.min(retryMs ? retryMs * 2 : 30 * 1000, 15 * 60 * 1000);
    clearTimeout(retryTimer);
    retryTimer = setTimeout(flush, retryMs);
  }
  async function sendQueue() {
    try {
      const db = await openDb();
      for (;;) {
        const rows = await readBatch(db, BATCH);
        if (!rows.length) break;
        await postRows(rows);                       // إن فشل تبقى الصفوف في الصندوق
        await deleteKeys(db, rows.map(r => r.id));  // تُحذف فقط بعد تأكيد الخادم
        retryMs = 0;
      }
    } catch (err) {
      scheduleRetry();                              // بلا إنترنت أو خادم مشغول: ننتظر ونعيد
    }
  }
  function flush() {
    if (!ENABLED) return Promise.resolve();
    if (!flushing) flushing = sendQueue().finally(() => { flushing = null; });
    return flushing;
  }

  /* ---------- الواجهة العامة ---------- */
  function track(name, props) {
    if (!ENABLED) return Promise.resolve(false);
    const row = makeRow(name, props);
    return enqueue(row)
      .then(() => { if (navigator.onLine !== false) flush(); return true; })
      .catch(async () => {
        // لا يعمل IndexedDB على هذا المتصفح؟ نحاول الإرسال المباشر للحدث الواحد
        try { await postRows([row]); return true; } catch (_) { return false; }
      });
  }

  window.addEventListener('online', () => { retryMs = 0; flush(); });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush();
  });
  setInterval(flush, 5 * 60 * 1000);
  setTimeout(() => { track('app_open'); }, 1500);

  // الواجهة الإلكترونية (Service Worker) للنسخة الويب فقط؛ تطبيق Android يحمل ملفاته داخله أصلاً.
  if (platform() === 'web' && 'serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
  }

  window.FCSync = { track, flush, enabled: ENABLED, installId: () => installId };
})();
