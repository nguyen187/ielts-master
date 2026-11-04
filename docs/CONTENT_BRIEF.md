# Content brief (all content writers)

Project: **IELTS Master** — a free web app that takes a learner from diagnostic test to target band.
Content lives in `src/content/data/*.ts` and MUST conform to `src/content/types.ts` (read it first).

## Non-negotiable rules
1. **100% original.** Never copy or closely paraphrase Cambridge IELTS, British Council, IDP, ielts-simon or any published material. Invent your own passages, scripts, prompts, samples.
2. **Exam-authentic.** Match real IELTS format, length, register, question types, instructions wording and difficulty.
3. **Every answer must be provably correct.** After writing each question, re-read the source text and confirm: the evidence exists, the answer obeys the word limit, distractors are wrong for a stated reason, NOT GIVEN really is not given. Explanations must cite the evidence.
4. **Gap answers** must appear verbatim in the passage/script (for listening, as spoken), obey the word limit, and list acceptable variants (singular/plural if both fit, digits and words for numbers, hyphen/no hyphen, British/American spelling).
5. **Question ids** are globally unique: prefix with the item id (e.g. `r03-q7`, `l2-p3-q4`). Group ids likewise (`r03-g2`).
6. Numbering: reading passages number questions 1..N (N = 12–14) continuously across groups; listening sections number 1..10.
7. Write the file as `import type {...} from '../types';` then `export const <name>: Type[] = [...]`. No other imports, no runtime code.
8. Validate: `npm run typecheck:content` (fix only errors in YOUR file) and, if present, `npx vitest run tests/content.test.ts`.
9. Do not edit any file other than the one assigned to you.
