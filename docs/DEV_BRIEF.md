# Developer brief — IELTS Master

Stack: Vite 8 + React 19 + TypeScript (strict) + Tailwind v4 + react-router-dom 7 + Vitest/Testing Library. Client-only app; all learner data in localStorage via `src/lib/store.ts`.

## Ground rules
- Only edit the files you own (listed in your task). Shared files (`src/lib/*`, `src/components/*`, `src/App.tsx`, `src/content/*`) are owned by the tech lead — if you need a change there, put a small helper inside your own page file instead, or report it.
- Read before coding: `src/content/types.ts`, `src/content/index.ts` (content accessors), `src/lib/store.ts` (state + actions), `src/lib/scoring.ts`, `src/lib/progress.ts`, `src/lib/writingAnalysis.ts`, `src/lib/speech.ts`, `src/lib/ai.ts`, `src/lib/srs.ts`, `src/components/ui.tsx` (PageHeader, BandBadge, ProgressBar, Stat, Empty, Tabs, Modal, Markdown, useTimer, TimerBadge, DifficultyChip, SKILL_META), `src/components/Visual.tsx` (VisualView, describeVisual), `src/components/Questions.tsx`, `src/index.css` (utility classes: card, btn-primary, btn-secondary, btn-ghost, btn-danger, input, label, chip, h1, h2, muted, prose-lite).
- Look at `src/pages/ReadingTest.tsx` / `ReadingList.tsx` (once present) for page conventions.
- UI language: English, with short Vietnamese hints where they help Vietnamese learners (e.g. a "Mẹo" line). Mobile-first responsive, dark mode (`dark:` variants), accessible labels (aria-label on inputs, buttons with text).
- Every page must handle an unknown id gracefully (Empty component + link back).
- Record learner activity through store actions (addAttempt, addWriting, updateWriting, addSpeaking, updateSpeaking, setSrsCard, addError, markGuideRead, updateSettings…) so the dashboard planner and progress page see it.
- Quality gate before you report: `npx tsc --noEmit` has zero errors in your files, and `npx vitest run` passes. Write at least one Testing Library test per page you own in `tests/pages/<Page>.test.tsx` (wrap in MemoryRouter; use routes when the page reads params).
- No new npm dependencies.
