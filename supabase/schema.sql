-- Math in Motion — database schema
-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- All reads/writes go through the Next.js server using the secret key, so RLS is
-- enabled with NO public policies: the publishable/anon key cannot touch these tables.

create table if not exists public.activity_responses (
  id          bigint generated always as identity primary key,
  activity    text        not null check (activity in (
                'symbol-quiz', 'pattern-hunt', 'polya-strategy',
                'math-poll', 'mathematician-type', 'golden-ratio', 'short-reaction')),
  visitor_id  uuid        not null,
  data        jsonb       not null default '{}'::jsonb,
  score       int,
  max_score   int,
  created_at  timestamptz not null default now()
);

create index if not exists activity_responses_activity_idx
  on public.activity_responses (activity, created_at desc);

create table if not exists public.wall_posts (
  id          bigint generated always as identity primary key,
  visitor_id  uuid        not null,
  name        text        not null check (char_length(name) between 1 and 40),
  message     text        not null check (char_length(message) between 1 and 280),
  topic       text        not null default 'general'
                check (topic in ('general', 'patterns', 'language', 'reasoning')),
  hidden      boolean     not null default false,  -- set true in the dashboard to moderate a post
  created_at  timestamptz not null default now()
);

create index if not exists wall_posts_created_idx
  on public.wall_posts (created_at desc);

alter table public.activity_responses enable row level security;
alter table public.wall_posts         enable row level security;
