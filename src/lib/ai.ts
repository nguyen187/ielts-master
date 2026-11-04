/**
 * Optional AI examiner. Runs entirely in the learner's browser with THEIR OWN Anthropic API key
 * (stored only in localStorage on their device). Nothing is sent anywhere else.
 */
import Anthropic from '@anthropic-ai/sdk';
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod';
import { z } from 'zod';

const MODEL = 'claude-opus-5-5';

const Criterion = z.object({
  band: z.number().describe('Band 0-9 in steps of 0.5'),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
});

const WritingFeedback = z.object({
  tr: Criterion.describe('Task Achievement (Task 1) or Task Response (Task 2)'),
  cc: Criterion.describe('Coherence and Cohesion'),
  lr: Criterion.describe('Lexical Resource'),
  gra: Criterion.describe('Grammatical Range and Accuracy'),
  overall: z.number(),
  summary: z.string().describe('2-3 sentence overall verdict'),
  corrections: z.array(z.object({ original: z.string(), corrected: z.string(), explanation: z.string() })).describe('Up to 10 most important error corrections, quoting the original exactly'),
  nextSteps: z.array(z.string()).describe('3 concrete actions to reach the next half band'),
  improvedParagraph: z.string().describe('The weakest paragraph rewritten at roughly one band higher, keeping the candidate ideas'),
});
export type WritingFeedback = z.infer<typeof WritingFeedback>;

const SpeakingFeedback = z.object({
  fc: Criterion.describe('Fluency and Coherence'),
  lr: Criterion.describe('Lexical Resource'),
  gra: Criterion.describe('Grammatical Range and Accuracy'),
  p: Criterion.describe('Pronunciation — judged only from transcript evidence; say so explicitly'),
  overall: z.number(),
  summary: z.string(),
  betterPhrases: z.array(z.object({ said: z.string(), better: z.string() })).describe('Up to 8 upgrades of phrases the candidate actually said'),
  nextSteps: z.array(z.string()),
});
export type SpeakingFeedback = z.infer<typeof SpeakingFeedback>;

const SYSTEM = `You are a senior, certified IELTS examiner. Assess strictly and consistently with the public IELTS band descriptors — do not inflate scores to be encouraging. Each criterion band is a whole or half band. Overall = mean of the four criteria rounded down to the nearest half band. Key caps you must respect: Task 1 Academic with no clear overview → TA max 5; under-length responses are penalised in TA/TR; memorised or off-topic responses are penalised heavily. Feedback must be specific, quote the candidate's own words, and be actionable for a learner (many are Vietnamese — note typical L1 issues such as articles, plural -s, word form, tense consistency).`;

function client(apiKey: string) {
  return new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
}

async function run<T>(apiKey: string, schema: z.ZodType<T>, prompt: string): Promise<T> {
  const res = await client(apiKey).beta.messages.parse({
    model: MODEL,
    max_tokens: 16000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system: SYSTEM,
    output_config: { effort: 'medium', format: betaZodOutputFormat(schema as never) },
    messages: [{ role: 'user', content: prompt }],
  });
  if (res.stop_reason === 'refusal') throw new Error('The AI examiner declined to assess this text.');
  if (!res.parsed_output) throw new Error('Could not read the AI response. Please try again.');
  return res.parsed_output as T;
}

export async function gradeWriting(apiKey: string, opts: { task: 1 | 2; module: string; prompt: string; visualDescription?: string; essay: string }): Promise<WritingFeedback> {
  const words = opts.essay.trim().split(/\s+/).length;
  return run(
    apiKey,
    WritingFeedback,
    `IELTS ${opts.module === 'general' ? 'General Training' : 'Academic'} Writing Task ${opts.task}.

QUESTION:
${opts.prompt}
${opts.visualDescription ? `\nDATA SHOWN IN THE VISUAL (for checking accuracy):\n${opts.visualDescription}\n` : ''}
CANDIDATE RESPONSE (${words} words):
"""
${opts.essay}
"""

Assess this response on the four criteria.`,
  );
}

export async function gradeSpeaking(apiKey: string, opts: { part: number; questions: string[]; transcript: string; seconds: number }): Promise<SpeakingFeedback> {
  return run(
    apiKey,
    SpeakingFeedback,
    `IELTS Speaking Part ${opts.part}. Questions asked:
${opts.questions.map((q) => `- ${q}`).join('\n')}

Automatic speech-recognition transcript of the candidate (${opts.seconds} seconds of speech; ASR may drop fillers and mishear words — do not penalise obvious ASR errors):
"""
${opts.transcript}
"""

Assess the candidate on the four speaking criteria.`,
  );
}

export function describeError(e: unknown): string {
  if (e instanceof Anthropic.AuthenticationError) return 'Invalid API key. Check it in Settings.';
  if (e instanceof Anthropic.RateLimitError) return 'Rate limited by the API — wait a minute and try again.';
  if (e instanceof Anthropic.APIConnectionError) return 'Network error — check your connection.';
  if (e instanceof Anthropic.APIError) return `API error: ${e.message}`;
  return e instanceof Error ? e.message : 'Unknown error';
}
