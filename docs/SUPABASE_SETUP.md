# Enabling sign-in and cloud sync (Supabase)

Without these steps the app runs in **local-only mode** (progress stays in each browser). With them, learners can optionally sign in and their progress syncs across devices.

## 1. Create the project (≈5 minutes)
1. Go to https://supabase.com → **New project** (the free tier is enough to start). Pick a region close to your learners, e.g. Singapore for Vietnam.
2. **SQL Editor** → paste the contents of `supabase/migrations/0001_init.sql` → **Run**. This creates `progress`, `attempts` and `submissions` with Row Level Security, so each learner can only read and write their own rows.

## 2. Configure sign-in
**Authentication → URL Configuration**
- Site URL: `https://<github-user>.github.io/ielts-master/`
- Redirect URLs: add the Site URL and `http://localhost:5173/` for local development.

**Authentication → Providers**
- **Email** is on by default (magic link). For production, set up custom SMTP (Authentication → Emails), because the built-in sender is rate-limited.
- **Google** (optional): create an OAuth client in Google Cloud Console, add `https://<project-ref>.supabase.co/auth/v1/callback` as an authorised redirect URI, then paste the client ID and secret here.

## 3. Connect the app
**Project Settings → API** → copy the *Project URL* and the *anon public* key. The anon key is meant to be public; RLS protects the data. Never use the `service_role` key in the app.

- **Local:** `cp .env.example .env`, fill in both values, then `npm run dev`.
- **GitHub Pages:** in the repository, go to Settings → Secrets and variables → Actions → **Variables**, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then re-run the deploy workflow.

## How sync works
- On sign-in, the browser's progress is **merged** with the cloud copy (`src/lib/merge.ts`): results are unioned by id, assessed submissions win, deleted notes stay deleted, the most recently reviewed flashcard wins, and the most recently edited profile wins. Nothing done offline is lost.
- After that, every change is uploaded about 1.5 s later. The app re-syncs when the tab regains focus or the connection returns.
- The Anthropic API key, theme and voice settings are **never uploaded**.
- Learners can delete their cloud data from Settings → Account & sync.

## Useful queries (SQL Editor)
```sql
-- Active learners in the last 7 days
select count(distinct user_id) from attempts where created_at > now() - interval '7 days';
-- Hardest practice items (lowest average band)
select * from item_stats where attempts >= 10 order by avg_band asc limit 20;
```
