/* admin.js · لوحة الإدارة
 * - تسجيل دخول المشرف عبر Supabase Auth (بريد + كلمة مرور).
 * - جلب الملخص من دالة قاعدة البيانات dashboard_summary (تتحقق من صلاحية المشرف داخل قاعدة البيانات).
 * - رسوم SVG بلا مكتبات خارجية، وكل النصوص القادمة من الخادم تُعرض كنص عادي (لا innerHTML).
 */
(function () {
  'use strict';

  const CFG = window.FC_CONFIG || {};
  const BASE = String(CFG.supabaseUrl || '').replace(/\/+$/, '');
  const KEY = String(CFG.supabaseAnonKey || '');
  const CONFIGURED = /^https:\/\/[^\s]+$/.test(BASE) && !BASE.includes('YOUR-') &&
                     KEY.length > 20 && !KEY.startsWith('YOUR-');
  const SESSION_KEY = 'fc_admin_session';
  const THEME_KEY = 'fc_admin_theme';
  const REFRESH_MS = 60 * 1000;
  const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const LABELS = {
    cat: { image: 'صور', video: 'فيديو', audio: 'صوت', pdf: 'PDF', docx: 'Word', text: 'نص', sheet: 'جداول' },
    status: { ok: 'ناجح', partial: 'جزئي', failed: 'فشل', cancelled: 'ملغى' },
    event: { convert: 'تحويل', app_open: 'فتح التطبيق' },
    platform: { web: 'ويب', android: 'Android', ios: 'iOS' },
    lang: { ar: 'العربية', en: 'English' }
  };

  /* ---------------- أدوات عامة ---------------- */
  const $ = sel => document.querySelector(sel);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (_) {} },
    del(k) { try { localStorage.removeItem(k); } catch (_) {} }
  };

  // el('div', {class: 'x', text: 'نص'}, child1, [child2, child3])
  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = String(v);
      else n.setAttribute(k, v === true ? '' : String(v));
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      n.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
    }
    return n;
  }
  function svg(tag, attrs, text) {
    const n = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v != null && v !== false) n.setAttribute(k, String(v));
    }
    if (text != null) n.textContent = String(text);
    return n;
  }

  const numFmt = new Intl.NumberFormat('en-US');
  const decFmt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });
  const fmt = v => (v == null ? '—' : numFmt.format(v));
  const fmtPct = v => (v == null ? '—' : `${decFmt.format(v)}%`);
  const fmtMs = v => {
    if (v == null) return '—';
    return v < 1000 ? `${fmt(v)} ms` : `${decFmt.format(v / 1000)} s`;
  };
  const fmtKb = v => {
    if (v == null) return '—';
    return v >= 1024 ? `${decFmt.format(v / 1024)} MB` : `${fmt(v)} KB`;
  };
  const dateFmt = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: TZ
  });
  const dayLabel = d => `${d.slice(8, 10)}/${d.slice(5, 7)}`;
  const hourLabel = h => String(h).padStart(2, '0');
  const routeLabel = r => String(r || '').toUpperCase().replace('>', ' → ');
  const days = () => Number($('#rangeSel').value) || 30;

  function niceCeil(v) {
    const p = Math.pow(10, Math.floor(Math.log10(Math.max(v, 1))));
    const f = v / p;
    return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p;
  }

  /* ---------------- الاتصال بـ Supabase ---------------- */
  async function api(path, opt) {
    opt = opt || {};
    const headers = { apikey: KEY };
    if (opt.token) headers.Authorization = 'Bearer ' + opt.token;
    if (opt.body !== undefined) headers['Content-Type'] = 'application/json';
    const res = await fetch(BASE + path, {
      method: opt.method || 'GET',
      headers,
      body: opt.body !== undefined ? JSON.stringify(opt.body) : undefined,
      cache: 'no-store'
    });
    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch (_) { data = text; }
    if (!res.ok) {
      const err = new Error((data && (data.msg || data.message || data.error_description || data.error)) || ('HTTP ' + res.status));
      err.status = res.status;
      throw err;
    }
    return data;
  }

  /* ---------------- الجلسة ---------------- */
  let session = null;
  let loading = false;
  let timer = null;

  function loadSession() {
    try {
      const s = JSON.parse(store.get(SESSION_KEY));
      return s && s.refresh_token ? s : null;
    } catch (_) { return null; }
  }
  function saveSession(raw) {
    session = {
      access_token: raw.access_token,
      refresh_token: raw.refresh_token,
      expires_at: Math.floor(Date.now() / 1000) + (raw.expires_in || 3600),
      email: (raw.user && raw.user.email) || (session && session.email) || ''
    };
    store.set(SESSION_KEY, JSON.stringify(session));
  }
  function authError() {
    const e = new Error('session expired');
    e.auth = true;
    return e;
  }
  async function getToken(force) {
    if (!session) throw authError();
    if (force || session.expires_at - 60 <= Date.now() / 1000) {
      try {
        const raw = await api('/auth/v1/token?grant_type=refresh_token', {
          method: 'POST', body: { refresh_token: session.refresh_token }
        });
        saveSession(raw);
      } catch (e) {
        if (e.status >= 400 && e.status < 500) { logout(); throw authError(); }
        throw e; // شبكة غير متاحة: نحاول لاحقاً دون تسجيل خروج
      }
    }
    return session.access_token;
  }

  /* ---------------- جلب البيانات وعرضها ---------------- */
  const fetchSummary = token => api('/rest/v1/rpc/dashboard_summary', {
    method: 'POST', token, body: { p_days: days(), p_tz: TZ }
  });

  async function refresh() {
    if (loading || !session) return;
    loading = true;
    setStatus('load');
    try {
      let token = await getToken();
      let data;
      try {
        data = await fetchSummary(token);
      } catch (e) {
        if (e.status !== 401) throw e;
        token = await getToken(true);
        data = await fetchSummary(token);
      }
      render(data);
      setStatus('ok');
    } catch (e) {
      if (e.auth) return;
      if (e.status === 403 || /not an admin/i.test(e.message || '')) {
        logout();
        showLoginError('هذا الحساب ليس مشرفاً على اللوحة.');
        return;
      }
      setStatus('err', e.message || 'تعذّر الاتصال');
    } finally {
      loading = false;
    }
  }

  function setStatus(kind, msg) {
    const dot = $('#statusDot');
    const txt = $('#statusText');
    dot.className = 'dot ' + (kind === 'ok' ? 'ok' : kind === 'err' ? 'err' : '');
    if (kind === 'ok') txt.textContent = `آخر تحديث: ${dateFmt.format(new Date())}`;
    else if (kind === 'err') txt.textContent = `تعذّر تحديث البيانات: ${msg}`;
    else txt.textContent = 'جارٍ تحديث البيانات…';
  }

  function render(d) {
    renderKpis(d);
    renderDaily(d.daily || []);
    donut($('#chartCategory'), d.by_category || [], n => LABELS.cat[n] || n);
    hbars($('#chartRoutes'), d.top_routes || [], routeLabel, 'لا توجد تحويلات في هذه الفترة');
    hourChart($('#chartHours'), d.by_hour || []);
    $('#tzNote').textContent = `بتوقيت ${TZ}`;
    donut($('#chartPlatform'), d.by_platform || [], n => LABELS.platform[n] || n);
    donut($('#chartLang'), d.by_lang || [], n => LABELS.lang[n] || n);
    hbars($('#chartVersion'), d.by_version || [], n => n, 'لا توجد بيانات');
    hbars($('#errorsBox'), d.errors || [], n => n, 'لا توجد أخطاء خلال هذه الفترة 👍');
    renderRecent(d.recent || []);
  }

  function renderKpis(d) {
    const t = d.totals || {};
    const cards = [
      { label: 'عمليات التحويل', value: fmt(t.jobs), sub: `منذ البداية: ${fmt(t.all_jobs)}` },
      {
        label: 'نسبة النجاح', value: fmtPct(t.success_rate),
        sub: `فشل ${fmt(t.failed)} · ملغاة ${fmt(t.cancelled)}`,
        tone: t.success_rate != null && t.success_rate < 90 ? 'warn' : ''
      },
      { label: 'الملفات المعالجة', value: fmt(t.files), sub: `حجم الإدخال ${decFmt.format(t.data_mb || 0)} MB` },
      { label: 'الأجهزة النشطة', value: fmt(t.devices), sub: `منذ البداية: ${fmt(t.devices_all)} جهاز` },
      { label: 'فتحات التطبيق', value: fmt(t.launches), sub: `متوسط زمن التحويل ${fmtMs(t.avg_duration_ms)}` },
      {
        label: 'عمليات وصلت متأخرة', value: fmt(t.late_synced),
        sub: 'أُجريت بلا إنترنت ثم أُرسلت لاحقاً', tone: 'info'
      }
    ];
    $('#kpis').replaceChildren(...cards.map(c =>
      el('div', { class: 'kpi ' + (c.tone || '') },
        el('div', { class: 'kpi-label', text: c.label }),
        el('div', { class: 'kpi-value', text: c.value }),
        el('div', { class: 'kpi-sub', text: c.sub })
      )
    ));
  }

  /* ---------------- الرسوم ---------------- */
  function empty(host, msg) {
    host.replaceChildren(el('p', { class: 'empty', text: msg || 'لا توجد بيانات في هذه الفترة' }));
  }

  // أعمدة مكدّسة (تحويلات يومية / حسب الساعة)
  function stackedBars(host, items, series, label) {
    const total = items.reduce((s, it) => s + it.parts.reduce((a, b) => a + (b || 0), 0), 0);
    if (!total) return empty(host);

    const W = 640, H = 230, padL = 40, padR = 8, padT = 10, padB = 26;
    const innerW = W - padL - padR, innerH = H - padT - padB;
    const max = niceCeil(Math.max(...items.map(it => it.parts.reduce((a, b) => a + (b || 0), 0))));
    const y = v => padT + innerH - (v / max) * innerH;

    const root = svg('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': label });
    for (let i = 0; i <= 4; i++) {
      const v = (max * i) / 4;
      root.append(svg('line', { x1: padL, x2: W - padR, y1: y(v), y2: y(v), class: 'gridline' }));
      root.append(svg('text', { x: padL - 6, y: y(v) + 4, 'text-anchor': 'end', class: 'axis' }, fmt(v)));
    }

    const slot = innerW / items.length;
    const bw = Math.max(2, Math.min(28, slot * 0.68));
    const step = Math.ceil(items.length / 10);
    items.forEach((it, i) => {
      const x = padL + i * slot + (slot - bw) / 2;
      let acc = 0;
      series.forEach((s, j) => {
        const v = it.parts[j] || 0;
        if (!v) return;
        const rect = svg('rect', {
          x, y: y(acc + v), width: bw, height: (v / max) * innerH, rx: 2, class: s.cls
        });
        rect.append(svg('title', null, `${it.title} · ${s.label}: ${fmt(v)}`));
        root.append(rect);
        acc += v;
      });
      if (i % step === 0) {
        root.append(svg('text', { x: x + bw / 2, y: H - 7, 'text-anchor': 'middle', class: 'axis' }, it.label));
      }
    });

    host.replaceChildren(root);
  }

  function renderDaily(rows) {
    const series = [
      { key: 'ok', label: LABELS.status.ok, cls: 'bar-ok' },
      { key: 'partial', label: LABELS.status.partial, cls: 'bar-partial' },
      { key: 'failed', label: LABELS.status.failed, cls: 'bar-failed' },
      { key: 'cancelled', label: LABELS.status.cancelled, cls: 'bar-cancel' }
    ];
    $('#dailyLegend').replaceChildren(...series.map(s =>
      el('span', null, el('i', { class: 'dot-k ' + s.cls }), s.label)
    ));
    stackedBars($('#chartDaily'), rows.map(r => ({
      label: dayLabel(r.day),
      title: r.day,
      parts: series.map(s => r[s.key])
    })), series, 'عدد التحويلات يومياً');
  }

  function hourChart(host, rows) {
    stackedBars(host, rows.map(r => ({
      label: hourLabel(r.hour), title: `${hourLabel(r.hour)}:00`, parts: [r.count]
    })), [{ label: 'تحويلات', cls: 'bar-main' }], 'التحويلات حسب الساعة');
  }

  // حلقة نسبية مع مفتاح
  function donut(host, items, nameOf) {
    const total = items.reduce((s, x) => s + (x.count || 0), 0);
    if (!total) return empty(host);

    const R = 42, C = 2 * Math.PI * R;
    let offset = 0;
    const root = svg('svg', { viewBox: '0 0 120 120', class: 'donut', role: 'img', 'aria-label': 'توزيع' });
    root.append(svg('circle', { cx: 60, cy: 60, r: R, class: 'donut-bg' }));
    const ring = svg('g', { transform: 'rotate(-90 60 60)' });
    items.forEach((it, i) => {
      const len = (it.count / total) * C;
      const seg = svg('circle', {
        cx: 60, cy: 60, r: R, class: 'seg k' + (i % 8),
        'stroke-dasharray': `${len} ${C - len}`, 'stroke-dashoffset': -offset
      });
      seg.append(svg('title', null, `${nameOf(it.name)}: ${fmt(it.count)}`));
      ring.append(seg);
      offset += len;
    });
    root.append(ring);
    root.append(svg('text', { x: 60, y: 58, 'text-anchor': 'middle', class: 'donut-total' }, fmt(total)));
    root.append(svg('text', { x: 60, y: 73, 'text-anchor': 'middle', class: 'donut-sub' }, 'إجمالي'));

    const list = el('ul', { class: 'legend-list' }, items.map((it, i) =>
      el('li', null,
        el('i', { class: 'dot-k k' + (i % 8) }),
        el('span', { class: 'lg-name', text: nameOf(it.name) }),
        el('span', { class: 'lg-val', text: `${fmt(it.count)} · ${Math.round((it.count / total) * 100)}%` })
      )
    ));
    host.replaceChildren(el('div', { class: 'donut-wrap' }, root, list));
  }

  // قائمة أشرطة أفقية
  function hbars(host, items, nameOf, emptyMsg) {
    if (!items.length) return empty(host, emptyMsg);
    const max = Math.max(...items.map(x => x.count || 0)) || 1;
    host.replaceChildren(el('ul', { class: 'hbars' }, items.map((it, i) => {
      const fill = el('div', { class: 'hb-fill k' + (i % 8) });
      fill.style.width = `${((it.count || 0) / max) * 100}%`;   // CSSOM، لا سمة style
      return el('li', null,
        el('div', { class: 'hb-top' },
          el('span', { class: 'hb-name ltr', dir: 'ltr', text: nameOf(it.name) }),
          el('span', { class: 'hb-val', text: fmt(it.count) })),
        el('div', { class: 'hb-track' }, fill));
    })));
  }

  /* ---------------- جدول آخر العمليات ---------------- */
  function statusBadge(s) {
    if (!s) return el('span', { class: 'muted', text: '—' });
    return el('span', { class: 'badge ' + s, text: LABELS.status[s] || s });
  }
  function lagText(r) {
    const mins = (Date.parse(r.received_at) - Date.parse(r.created_at)) / 60000;
    if (!Number.isFinite(mins) || mins < 1) return 'فوري';
    if (mins < 60) return `${Math.round(mins)} دقيقة`;
    if (mins < 1440) return `${decFmt.format(mins / 60)} ساعة`;
    return `${decFmt.format(mins / 1440)} يوم`;
  }
  function renderRecent(rows) {
    const body = $('#recentBody');
    if (!rows.length) {
      body.replaceChildren(el('tr', null, el('td', { colspan: 10, class: 'empty', text: 'لا توجد عمليات بعد' })));
      return;
    }
    body.replaceChildren(...rows.map(r => el('tr', null,
      el('td', { text: dateFmt.format(new Date(r.created_at)) }),
      el('td', { text: LABELS.event[r.name] || r.name }),
      el('td', { class: 'ltr', dir: 'ltr', text: r.route ? routeLabel(r.route) : (LABELS.cat[r.category] || r.category || '—') }),
      el('td', null, statusBadge(r.status)),
      el('td', { text: fmt(r.files) }),
      el('td', { text: fmtKb(r.size_kb) }),
      el('td', { text: fmtMs(r.duration_ms) }),
      el('td', { text: LABELS.platform[r.platform] || r.platform || '—' }),
      el('td', { class: 'ltr', dir: 'ltr', text: r.app_version || '—' }),
      el('td', { text: lagText(r) })
    )));
  }

  /* ---------------- تصدير CSV ---------------- */
  async function exportCsv() {
    const btn = $('#exportBtn');
    btn.disabled = true;
    toast('جارٍ تجهيز الملف…');
    try {
      const token = await getToken();
      const since = new Date(Date.now() - days() * 86400000).toISOString();
      const cols = ['created_at', 'received_at', 'install_id', 'name', 'status', 'category', 'route',
                    'files', 'size_kb', 'duration_ms', 'error_code', 'platform', 'lang', 'app_version'];
      const pageSize = 1000, maxRows = 50000;
      const rows = [];
      for (let offset = 0; offset < maxRows; offset += pageSize) {
        const path = `/rest/v1/events?select=${cols.join(',')}` +
          `&created_at=gte.${encodeURIComponent(since)}&order=created_at.desc,id.desc` +
          `&limit=${pageSize}&offset=${offset}`;
        const chunk = await api(path, { token });
        rows.push(...chunk);
        if (chunk.length < pageSize) break;
      }
      downloadCsv(rows, cols);
      toast(`تم تصدير ${fmt(rows.length)} صفاً`);
    } catch (e) {
      toast('تعذّر التصدير: ' + (e.message || ''), 'error');
    } finally {
      btn.disabled = false;
    }
  }
  function downloadCsv(rows, cols) {
    const esc = v => {
      let s = v == null ? '' : String(v);
      if (/^[=+\-@]/.test(s)) s = "'" + s;          // منع حقن الصيغ في Excel
      return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    const lines = [cols.join(',')].concat(rows.map(r => cols.map(c => esc(r[c])).join(',')));
    const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = el('a', { href: url, download: `events-${new Date().toISOString().slice(0, 10)}.csv` });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  /* ---------------- الواجهة: الدخول والخروج والمظهر ---------------- */
  let toastT = null;
  function toast(msg, type) {
    const t = $('#toast');
    t.textContent = msg;
    t.className = 'toast show ' + (type || '');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('show'), 3800);
  }
  function showLoginError(msg) {
    const e = $('#loginError');
    e.textContent = msg;
    e.hidden = !msg;
  }
  function showLogin() {
    clearInterval(timer);
    timer = null;
    $('#appView').hidden = true;
    $('#loginView').hidden = false;
    $('#password').value = '';
  }
  function showApp() {
    $('#loginView').hidden = true;
    $('#appView').hidden = false;
    $('#tzLabel').textContent = TZ;
    clearInterval(timer);
    timer = setInterval(() => { if (!document.hidden) refresh(); }, REFRESH_MS);
  }
  function logout() {
    session = null;
    store.del(SESSION_KEY);
    showLogin();
  }

  async function onLogin(ev) {
    ev.preventDefault();
    showLoginError('');
    const email = $('#email').value.trim();
    const password = $('#password').value;
    if (!email || !password) return showLoginError('أدخل البريد وكلمة المرور.');
    const btn = $('#loginBtn');
    btn.disabled = true;
    btn.textContent = 'جارٍ الدخول…';
    try {
      const raw = await api('/auth/v1/token?grant_type=password', {
        method: 'POST', body: { email, password }
      });
      saveSession(raw);
      showApp();
      refresh();
    } catch (e) {
      const msg = /invalid login/i.test(e.message || '') ? 'البريد أو كلمة المرور غير صحيحة.'
                : e.status ? 'تعذّر تسجيل الدخول: ' + e.message
                : 'تعذّر الاتصال بالخادم. تحقق من الإنترنت.';
      showLoginError(msg);
    } finally {
      btn.disabled = false;
      btn.textContent = 'دخول';
    }
  }

  function applyTheme(t) {
    if (t) document.documentElement.dataset.theme = t;
    else delete document.documentElement.dataset.theme;
    $('#themeBtn').textContent = isDark() ? '☀' : '🌙';
  }
  function isDark() {
    const t = document.documentElement.dataset.theme;
    return t === 'dark' || (t !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function toggleTheme() {
    const next = isDark() ? 'light' : 'dark';
    store.set(THEME_KEY, next);
    applyTheme(next);
  }

  function init() {
    applyTheme(store.get(THEME_KEY));
    $('#loginForm').addEventListener('submit', onLogin);
    $('#rangeSel').addEventListener('change', refresh);
    $('#refreshBtn').addEventListener('click', refresh);
    $('#logoutBtn').addEventListener('click', logout);
    $('#exportBtn').addEventListener('click', exportCsv);
    $('#themeBtn').addEventListener('click', toggleTheme);
    document.addEventListener('visibilitychange', () => { if (!document.hidden && session) refresh(); });

    if (!CONFIGURED) {
      $('#loginView').hidden = false;
      $('#loginForm').querySelectorAll('input, button').forEach(x => { x.disabled = true; });
      showLoginError('لم تُضبط إعدادات Supabase بعد: افتح ملف config.js وأدخل الرابط والمفتاح، ثم أعد النشر.');
      return;
    }
    session = loadSession();
    if (session) {
      showApp();
      refresh();
    } else {
      showLogin();
    }
  }

  init();
})();
