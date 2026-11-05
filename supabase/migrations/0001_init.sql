-- IELTS Master — sync schema
-- Run in Supabase: Dashboard → SQL Editor → paste → Run (or `supabase db push`).

-- 1) Full learner state, one row per user (source of truth for cross-device sync)
create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  state      jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2) Append-only practice results, for analytics and future teacher dashboards
create table if not exists public.attempts (
  id          text not null,
  user_id     uuid not null references auth.users (id) on delete cascade,
  kind        text not null check (kind in ('listening','reading','writing','speaking','mock','diagnostic','grammar')),
  item_id     text not null,
  title       text not null,
  score       int,
  total       int,
  band        numeric(3,1),
  bands       jsonb,
  by_type     jsonb,
  minutes     int,
  created_at  timestamptz not null,
  primary key (user_id, id)
);
create index if not exists attempts_user_created on public.attempts (user_id, created_at desc);
create index if not exists attempts_item on public.attempts (item_id);

-- 3) Writing & speaking submissions (text kept for review / teacher feedback)
create table if not exists public.submissions (
  id          text not null,
  user_id     uuid not null references auth.users (id) on delete cascade,
  skill       text not null check (skill in ('writing','speaking')),
  item_id     text not null,
  text        text not null,
  band        numeric(3,1),
  criteria    jsonb,
  source      text,
  created_at  timestamptz not null,
  primary key (user_id, id)
);

-- Row Level Security: every learner can only see and change their own rows
alter table public.progress    enable row level security;
alter table public.attempts    enable row level security;
alter table public.submissions enable row level security;

drop policy if exists "own progress" on public.progress;
create policy "own progress" on public.progress
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "own attempts" on public.attempts;
create policy "own attempts" on public.attempts
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "own submissions" on public.submissions;
create policy "own submissions" on public.submissions
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Aggregate, anonymous question-item statistics for the content team (no personal data exposed)
create or replace view public.item_stats with (security_invoker = true) as
  select item_id, kind, count(*) as attempts, round(avg(band), 2) as avg_band
  from public.attempts group by item_id, kind;
