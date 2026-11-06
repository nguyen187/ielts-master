# IELTS Master

A free, end-to-end IELTS preparation web app. It takes a learner from a placement test to their target band: diagnostic → personalised daily plan → practice in all four skills → full mock tests → band tracking.

All learning content is original. No account is needed: progress is stored in the learner's browser. Optionally, connect Supabase so learners can sign in (email link or Google) and sync progress across devices. See [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md).

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # 108 tests: content QA, core logic, sync/merge, page flows, AI chat
npm run build      # typecheck + production build in dist/
npm run build:artifact  # single-file claude.ai Artifact build in dist-artifact/ielts-master.html
```

Deploy `dist/` to any static host (Netlify, Vercel, GitHub Pages, S3). Configure an SPA fallback so unknown paths serve `index.html`.

## What's inside

| Area | Content | Features |
|---|---|---|
| Placement & plan | 30-item test (bands 4.5–8.5) | Starting bands; honest feasibility check (hours needed vs available, suggested exam date); 3-phase plan (foundation → skills → exam simulation → taper); daily tasks weighted by skill gap and staleness |
| Listening | 4 full tests, 16 parts, 160 questions | Browser text-to-speech with a different voice per speaker and accent matching; exam mode (play once, 30 s preview); transcript with answers highlighted |
| Reading | 12 passages (10 Academic, 2 GT), every question type | 20-minute timer, filters by question type/level, evidence-based explanations, accuracy by question type |
| Writing | 12 Task 1 (9 Academic charts/process/map, 3 GT letters), 15 Task 2 | SVG chart rendering, timer, autosaved drafts, instant feedback (overview, position, linking, repetition, common Vietnamese-learner errors), self-assessment with descriptors, band 6 vs band 8–9 models with examiner comments, optional AI examiner |
| Speaking | 24 Part 1 topics, 30 cue cards with Part 3 | Questions read aloud, 1-minute prep + 2-minute timer, recording + playback, live transcript, **automatic offline band per criterion** (no key needed), band 8 samples, self/AI assessment, full speaking mock |
| Vocabulary | 450 words/phrases, 18 topics, Vietnamese meanings | Spaced-repetition flashcards (SM-2), browse, quiz, pronunciation |
| Grammar | 16 lessons, 128 exercises | Common Vietnamese-learner mistakes, auto-checked exercises |
| Guides | 29 strategy guides | Method, traps, worked examples, Vietnamese summary |
| Mock test | Listening 40 + Reading 3 passages + Writing 2 tasks | Real timings, auto-submit, per-skill and overall band with official rounding, full review |
| Progress | – | Band history chart, accuracy by question type, error log, activity heat-strip, export/import |

### AI examiner (optional)
Writing and Speaking can be graded by Claude (`claude-opus-5-5`) with structured, criterion-by-criterion feedback. Learners paste **their own** Anthropic API key in Settings. The key stays in `localStorage`, and requests go straight from the browser to the Anthropic API. Without a key, everything else still works.

### claude.ai Artifact edition
`npm run build:artifact` produces one self-contained page for claude.ai. There, Writing and Speaking are graded by Claude on the **learner's own Claude account** (no API key; the page asks once for permission), and each learner's progress is saved privately in the artifact's database (`progress/{self}`). Artifacts cannot use the microphone, so Speaking uses the keyboard's dictation while the app times the answer. Supabase sync is disabled in this build.

### Chat with AI
`/chat` is a streaming conversation with Claude in three modes: **Speaking partner** (natural chat with short ✏️ corrections after each turn), **IELTS examiner** (a full Part 1→2→3 test, then estimated bands; type "end test" to finish early) and **Ask a tutor** (grammar, vocabulary and strategy questions, in Vietnamese or English). Voice input uses the browser's speech recognition and replies can be read aloud. It runs on the learner's API key on the web and on their Claude account in the artifact; each mode's conversation is kept on the device (`src/lib/chat.ts`).

## Architecture

```
src/
  content/types.ts      content contract (all data typed)
  content/data/*.ts     original content, one file per workstream
  content/index.ts      content discovery (import.meta.glob) + accessors
  content/descriptors.ts plain-language band descriptors (paraphrased)
  lib/scoring.ts        answer normalisation, band tables, IELTS rounding
  lib/planner.ts        feasibility, phases, daily task generation
  lib/progress.ts       band estimation from recent results
  lib/srs.ts            spaced repetition
  lib/writingAnalysis.ts offline essay & speech analysis
  lib/speakingScore.ts  automatic speaking band (fluency, vocabulary, grammar, recogniser clarity)
  lib/speech.ts         TTS player, speech recognition, recording
  lib/ai.ts             optional Claude examiner (browser, user key)
  lib/store.ts          localStorage state + actions
  lib/merge.ts          conflict-free merge of two learner states
  lib/cloud.ts          optional Supabase auth + sync (enabled by VITE_SUPABASE_* env)
supabase/migrations/    SQL schema with Row Level Security
  components/, pages/   UI (React 19, Tailwind v4)
tests/
  content.test.ts       content QA gate (ids, numbering, answer keys present in source text)
  lib.test.ts           unit tests for scoring, planner, SRS, analysis, store
  pages.test.tsx        page-flow tests (Testing Library)
```

## Known limitations
- Band estimates are indicative. Reading and listening practice sets are scaled to /40; Writing "instant feedback" is heuristic. Use self-assessment or the AI examiner for writing and speaking.
- Listening audio quality depends on the voices installed in the browser. Chrome, Edge and Safari give the best results.
- General Training reading has 2 GT long texts; the GT mock fills the third slot with an easier academic passage.
- Full reading mock has 39 questions (3 × 13) instead of 40; bands are scaled.
- Without Supabase configured, data lives in one browser (Settings → Export to back it up). With Supabase, signed-in learners sync across devices.

Not affiliated with the British Council, IDP or Cambridge University Press & Assessment.
