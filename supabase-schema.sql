-- =====================================================================
-- محول الملفات · الإحصائيات ولوحة الإدارة (Supabase / PostgreSQL)
--
-- طريقة التشغيل: Supabase → SQL Editor → New query → الصق الملف كله → Run
-- آمن لإعادة التشغيل أكثر من مرة.
--
-- ما يُخزَّن: بيانات وصفية فقط (نوع العملية، عدد الملفات، المدة، المنصة...).
-- لا يُخزَّن أبداً: محتوى الملفات، أسماؤها، أو أي بيانات شخصية.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1) المشرفون: من يحق له رؤية اللوحة.
--    لا توجد سياسات (policies) على هذا الجدول عمداً: لا يقرؤه أحد عبر الـAPI.
-- ---------------------------------------------------------------------
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;


-- ---------------------------------------------------------------------
-- 2) الأحداث: صف واحد لكل تحويل (أو لكل فتح للتطبيق).
-- ---------------------------------------------------------------------
create table if not exists public.events (
  id          uuid primary key,                      -- يولّده الجهاز؛ يمنع تكرار الصف عند إعادة الإرسال
  created_at  timestamptz not null,                  -- وقت حدوث العملية على الجهاز
  received_at timestamptz not null default now(),    -- وقت وصولها للخادم (الفرق بينهما = تأخير الأوفلاين)
  install_id  uuid        not null,                  -- معرّف عشوائي لكل تثبيت، وليس لشخص
  name        text        not null check (name in ('app_open', 'convert')),
  status      text        check (status in ('ok', 'partial', 'failed', 'cancelled')),
  category    text        check (char_length(category) <= 20),     -- image, video, audio, pdf, docx, text, sheet
  route       text        check (char_length(route) <= 30),        -- مثال: heic>jpg
  files       integer     check (files between 0 and 100000),
  size_kb     integer     check (size_kb between 0 and 2000000000),
  duration_ms integer     check (duration_ms between 0 and 2000000000),
  error_code  text        check (char_length(error_code) <= 40),
  platform    text        check (char_length(platform) <= 16),     -- web, android, ios
  lang        text        check (char_length(lang) <= 5),
  app_version text        check (char_length(app_version) <= 16)
);

create index if not exists events_created_at_idx on public.events (created_at desc);
create index if not exists events_install_idx    on public.events (install_id);

alter table public.events enable row level security;
-- لا يملك الجهاز (anon) أي صلاحية على الجدول مباشرة؛ الإضافة تتم عبر الدالة ingest_events.
revoke all on public.events from anon, authenticated;
-- المشرف المسجَّل فقط يقرأ (السياسة في القسم 4 بعد إنشاء دالة is_admin()).
grant select on public.events to authenticated;


-- ---------------------------------------------------------------------
-- 3) استقبال الأحداث من التطبيق (يُستدعى من الجهاز بمفتاح anon فقط).
--    - تقبل دفعة حتى 500 صف، وتتخطى الصف الفاسد بدل رفض الدفعة كلها.
--    - تقص النصوص الطويلة بدل الرفض، وتحصر الأرقام في نطاق آمن.
--    - "on conflict do nothing": إعادة إرسال نفس الدفعة لا تكرّر شيئاً.
-- ---------------------------------------------------------------------
create or replace function public.ingest_events(p_rows jsonb)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  if p_rows is null or jsonb_typeof(p_rows) <> 'array' or jsonb_array_length(p_rows) > 500 then
    raise exception 'invalid payload' using errcode = '22023';
  end if;

  insert into public.events (
    id, created_at, install_id, name, status, category, route, files,
    size_kb, duration_ms, error_code, platform, lang, app_version
  )
  select
    r.id,
    r.created_at,
    r.install_id,
    r.name,
    r.status,
    left(r.category, 20),
    left(r.route, 30),
    least(greatest(r.files, 0), 100000)::integer,
    least(greatest(r.size_kb, 0), 2000000000)::integer,
    least(greatest(r.duration_ms, 0), 2000000000)::integer,
    left(r.error_code, 40),
    left(r.platform, 16),
    left(r.lang, 5),
    left(r.app_version, 16)
  from jsonb_to_recordset(p_rows) as r(
    id uuid, created_at timestamptz, install_id uuid, name text, status text,
    category text, route text, files numeric, size_kb numeric, duration_ms numeric,
    error_code text, platform text, lang text, app_version text
  )
  where r.id is not null
    and r.created_at is not null
    and r.install_id is not null
    and r.name in ('app_open', 'convert')
    and (r.status is null or r.status in ('ok', 'partial', 'failed', 'cancelled'))
  on conflict (id) do nothing;

  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

revoke execute on function public.ingest_events(jsonb) from public;
grant execute on function public.ingest_events(jsonb) to anon, authenticated;


-- ---------------------------------------------------------------------
-- 4) دالة التحقق: هل المستخدم الحالي مشرف؟
-- ---------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins a where a.user_id = auth.uid());
$$;

revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "admins read events" on public.events;
create policy "admins read events"
  on public.events for select
  to authenticated
  using (public.is_admin());


-- ---------------------------------------------------------------------
-- 5) ملخص اللوحة: دالة واحدة ترجع كل الأرقام بصيغة JSON.
--    p_days: عدد الأيام (1 - 365)، p_tz: المنطقة الزمنية للمشرف.
-- ---------------------------------------------------------------------
create or replace function public.dashboard_summary(p_days integer default 30, p_tz text default 'UTC')
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_days   integer := greatest(1, least(coalesce(p_days, 30), 365));
  v_tz     text    := case when exists (select 1 from pg_catalog.pg_timezone_names n where n.name = p_tz)
                           then p_tz else 'UTC' end;
  v_from   timestamptz := pg_catalog.now() - make_interval(days => v_days);
  v_today  date    := (pg_catalog.now() at time zone v_tz)::date;
  v_result jsonb;
begin
  if not public.is_admin() then
    raise exception 'not an admin' using errcode = '42501';
  end if;

  with p as (
    select * from public.events where created_at >= v_from
  ),
  c as (
    select * from p where name = 'convert'
  )
  select jsonb_build_object(
    'generated_at', pg_catalog.now(),
    'days', v_days,
    'timezone', v_tz,

    'totals', jsonb_build_object(
      'all_jobs',        (select count(*) from public.events where name = 'convert'),
      'jobs',            (select count(*) from c),
      'files',           (select coalesce(sum(files), 0) from c),
      'ok',              (select count(*) from c where status = 'ok'),
      'partial',         (select count(*) from c where status = 'partial'),
      'failed',          (select count(*) from c where status = 'failed'),
      'cancelled',       (select count(*) from c where status = 'cancelled'),
      'success_rate',    (select round(100.0 * count(*) filter (where status in ('ok', 'partial')) / nullif(count(*), 0), 1) from c),
      'avg_duration_ms', (select round(avg(duration_ms)) from c where status in ('ok', 'partial')),
      'data_mb',         (select round(coalesce(sum(size_kb), 0) / 1024.0, 1) from c),
      'devices',         (select count(distinct install_id) from p),
      'devices_all',     (select count(distinct install_id) from public.events),
      'launches',        (select count(*) from p where name = 'app_open'),
      'late_synced',     (select count(*) from p where received_at - created_at > interval '10 minutes')
    ),

    'daily', (
      select coalesce(jsonb_agg(jsonb_build_object(
               'day',       to_char(g.day::date, 'YYYY-MM-DD'),
               'ok',        coalesce(a.ok, 0),
               'partial',   coalesce(a.partial, 0),
               'failed',    coalesce(a.failed, 0),
               'cancelled', coalesce(a.cancelled, 0),
               'launches',  coalesce(a.launches, 0)
             ) order by g.day), '[]'::jsonb)
      from generate_series((v_today - (v_days - 1))::timestamp, v_today::timestamp, interval '1 day') as g(day)
      left join (
        select (created_at at time zone v_tz)::date                                   as day,
               count(*) filter (where name = 'convert' and status = 'ok')             as ok,
               count(*) filter (where name = 'convert' and status = 'partial')        as partial,
               count(*) filter (where name = 'convert' and status = 'failed')         as failed,
               count(*) filter (where name = 'convert' and status = 'cancelled')      as cancelled,
               count(*) filter (where name = 'app_open')                              as launches
        from p
        group by 1
      ) a on a.day = g.day::date
    ),

    'by_hour', (
      select jsonb_agg(jsonb_build_object('hour', h, 'count', coalesce(x.n, 0)) order by h)
      from generate_series(0, 23) as h
      left join (
        select extract(hour from created_at at time zone v_tz)::int as hh, count(*) as n
        from c
        group by 1
      ) x on x.hh = h
    ),

    'by_category', (
      select coalesce(jsonb_agg(jsonb_build_object('name', s.category, 'count', s.n) order by s.n desc), '[]'::jsonb)
      from (select category, count(*) as n from c where category is not null group by category) s
    ),

    'top_routes', (
      select coalesce(jsonb_agg(jsonb_build_object('name', s.route, 'count', s.n) order by s.n desc), '[]'::jsonb)
      from (select route, count(*) as n from c where route is not null group by route order by n desc limit 10) s
    ),

    'errors', (
      select coalesce(jsonb_agg(jsonb_build_object('name', s.error_code, 'count', s.n) order by s.n desc), '[]'::jsonb)
      from (select error_code, count(*) as n from c where error_code is not null group by error_code order by n desc limit 10) s
    ),

    'by_platform', (
      select coalesce(jsonb_agg(jsonb_build_object('name', s.platform, 'count', s.n) order by s.n desc), '[]'::jsonb)
      from (select platform, count(distinct install_id) as n from p where platform is not null group by platform) s
    ),

    'by_lang', (
      select coalesce(jsonb_agg(jsonb_build_object('name', s.lang, 'count', s.n) order by s.n desc), '[]'::jsonb)
      from (select lang, count(distinct install_id) as n from p where lang is not null group by lang) s
    ),

    'by_version', (
      select coalesce(jsonb_agg(jsonb_build_object('name', s.app_version, 'count', s.n) order by s.n desc), '[]'::jsonb)
      from (select app_version, count(distinct install_id) as n from p where app_version is not null group by app_version) s
    ),

    'recent', (
      select coalesce(jsonb_agg(to_jsonb(r) order by r.created_at desc), '[]'::jsonb)
      from (
        select created_at, received_at, name, status, category, route, files, size_kb,
               duration_ms, error_code, platform, lang, app_version
        from public.events
        order by created_at desc
        limit 100
      ) r
    )
  ) into v_result
  from (select 1) as one;

  return v_result;
end;
$$;

revoke execute on function public.dashboard_summary(integer, text) from public, anon;
grant execute on function public.dashboard_summary(integer, text) to authenticated;


-- ---------------------------------------------------------------------
-- 6) تنظيف البيانات القديمة (لحماية حد 500 MB في الخطة المجانية).
--    مثال: select public.purge_events(365);   ← يحذف ما عمره أكثر من سنة
-- ---------------------------------------------------------------------
create or replace function public.purge_events(p_keep_days integer default 365)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_deleted integer;
begin
  if not public.is_admin() then
    raise exception 'not an admin' using errcode = '42501';
  end if;

  delete from public.events
  where created_at < pg_catalog.now() - make_interval(days => greatest(30, coalesce(p_keep_days, 365)));

  get diagnostics v_deleted = row_count;
  return v_deleted;
end;
$$;

revoke execute on function public.purge_events(integer) from public, anon;
grant execute on function public.purge_events(integer) to authenticated;


-- ---------------------------------------------------------------------
-- 7) إضافة أول مشرف:
--    أ) Authentication → Users → Add user → Create new user
--       (أدخل بريدك وكلمة مرور قوية، وفعّل Auto Confirm User)
--    ب) شغّل هذا الأمر بعد تغيير البريد:
-- ---------------------------------------------------------------------
-- insert into public.admins (user_id)
-- select id from auth.users where email = 'you@example.com'
-- on conflict (user_id) do nothing;
