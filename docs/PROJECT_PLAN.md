# Project plan & delivery record — IELTS Master

## 1. Objective
Give any learner a free, self-serve path from their current level to their target IELTS band. Measure progress honestly and say when a target is not realistic.

**Success criteria (Definition of Done for v1)**
- Covers all four skills plus vocabulary, grammar and strategy, with original content in exam format.
- Placement test → plan → practice → mock → progress loop works end to end with no backend.
- Every answer key passes the automated content QA gate.
- Typecheck clean, all automated tests green, production build succeeds.
- Usable on a 375 px phone and in dark mode; no horizontal overflow.

## 2. Team & workstreams (RACI-lite)
| Role | Owner | Responsibility |
|---|---|---|
| Engagement lead / tech lead | Lead agent | Architecture, content contract, core engine (scoring, planner, store, speech, AI), Reading/Listening/Mock/Home/Onboarding pages, integration, QA sign-off |
| Content: Reading A / B | Content agents | r01–r06, r07–r12 |
| Content: Listening A / B | Content agents | Tests 1–2, 3–4 |
| Content: Writing T1 / T2 | Content agents | 12 Task 1 items, 15 Task 2 items with band 6 and band 8–9 models |
| Content: Speaking | Content agent | Part 1 topics, cue cards, Part 3 |
| Content: Vocabulary | Content agent | 450 entries with Vietnamese meanings |
| Content: Grammar & diagnostic | Content agent | 16 lessons, 30-item placement test |
| Content: Guides | Content agent | 29 strategy guides |
| Frontend dev A | Dev agent | Writing pages, band descriptors |
| Frontend dev B | Dev agent | Vocabulary, Grammar, Guides, Progress, Settings |

Briefs: `docs/CONTENT_BRIEF.md` (content standards), `docs/DEV_BRIEF.md` (engineering standards).

## 3. Phases
1. **Mobilise:** stack, content contract (`src/content/types.ts`), QA gate.
2. **Build (parallel):** 10 content workstreams and core engine; then 2 frontend workstreams and lead pages.
3. **Integrate & verify:** browser QA of every route, unit and page tests, defect fixing.
4. **Handover:** README, this record, known limitations.

## 4. Quality assurance
| Layer | How |
|---|---|
| Content QA gate | `tests/content.test.ts`: unique ids, continuous numbering, valid MCQ letters, TFNG/YNNG values and matching keys, gap answers found verbatim in passage or script, model-answer lengths, Task 1 data consistency |
| Content self-audit | Each writer re-checked every key against the source and reported concerns (see §6) |
| Unit tests | `tests/lib.test.ts`: answer normalisation, band tables, IELTS rounding, SRS intervals, essay analysis, diagnostic scoring, feasibility, phases, daily plan, band estimation, export/import, streaks |
| Page tests | `tests/pages.test.tsx`: landing vs dashboard, onboarding, reading grading, empty-submission guard, filters, speaking without mic APIs, unknown ids, smoke render of all main pages |
| Browser QA | All 22 routes render with no console errors; checked: placement → plan, reading submit, writing feedback, flashcards, progress, listening TTS (distinct voice per speaker), full mock flow and numbering, dark mode, 375 px mobile overflow scan |

## 5. Defects found & fixed during QA
| # | Defect | Fix |
|---|---|---|
| D1 | Tailwind v4 rejected `@apply` of custom classes (blank app) | Converted component classes to `@utility` |
| D2 | `useSyncExternalStore` unsubscribe returned a boolean, crashing React | Unsubscribe returns void |
| D3 | "Next passage" kept previous answers | Test pages keyed by id |
| D4 | Empty submissions recorded band 0 and dragged estimates down | Don't record empty attempts; estimator ignores band 0; mock records only attempted sections |
| D5 | SRS due dates one day early in UTC+ time zones (e.g. Vietnam) | Local-date arithmetic |
| D6 | "people thinks" not flagged | Added agreement rule |
| D7 | Landing page claimed offline support that doesn't exist | Copy corrected |

## 6. RAID log
| Type | Item | Status / mitigation |
|---|---|---|
| Risk | Heuristic writing estimate may over- or under-score | Clearly labelled; self-assessment and AI examiner offered; auto results weighted 0.5 in estimates |
| Risk | TTS voice quality varies by browser/OS | Voice matching by accent and gender, pitch separation fallback, browser guidance in UI |
| Risk | Real-world facts in some passages/lectures unverified (dates, statistics) | Hedged in text; fact-check recommended before public launch |
| Assumption | Hours-per-half-band model (20–60 h depending on level) | Rule of thumb from guided learning hours; shown as estimate |
| Issue | GT reading has only 2 long texts | Mock uses an academic passage for slot 3; add GT short texts in v1.1 |
| Issue | Mock reading = 39 questions | Scaled to /40; add a 14-question passage in v1.1 |
| Dependency | Optional Anthropic API key for AI grading | App fully usable without it |

## 7. Backlog (v1.1+)
- More content: 2 more listening tests, GT Section 1–2 short texts, 10 more Task 2 prompts.
- Text highlighting in reading passages; answer-sheet transfer practice for paper-based tests.
- PWA / offline caching; cloud sync with optional accounts.
- Pre-recorded human audio for listening.
