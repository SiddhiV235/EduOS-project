-- ─── Create courses table ───────────────────────────────────────────────────
create table if not exists public.courses (
  id          uuid primary key default gen_random_uuid(),
  title       text        not null,
  progress    integer     not null check (progress >= 0 and progress <= 100),
  icon_name   text        not null,
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security (so the anon key only reads, not writes)
alter table public.courses enable row level security;

-- Allow the anon role to read all courses (public read)
create policy "Public read access"
  on public.courses
  for select
  using (true);

-- ─── Seed data ───────────────────────────────────────────────────────────────
insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns',     75, 'Code2'),
  ('Machine Learning Foundations', 42, 'Brain'),
  ('Database Design & SQL',        91, 'Database'),
  ('TypeScript Deep Dive',         28, 'Layers');
