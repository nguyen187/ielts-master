import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { emptyState, resetState } from '../src/lib/store';

const reply = vi.fn();
vi.mock('../src/lib/chat', async (orig) => ({ ...(await orig<typeof import('../src/lib/chat')>()), chatReply: (o: unknown) => reply(o) }));

import AiChat, { splitFix } from '../src/pages/AiChat';
import { loadChat } from '../src/lib/chat';

const withKey = () => resetState({ ...emptyState(), settings: { ...emptyState().settings, apiKey: 'test-key' } });
const page = (path = '/chat?mode=partner') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AiChat />
    </MemoryRouter>,
  );

beforeEach(() => {
  localStorage.clear();
  resetState(emptyState());
  reply.mockReset();
  Element.prototype.scrollIntoView = () => undefined;
});

describe('chat with AI', () => {
  it('asks for an API key before chatting on the web build', () => {
    page();
    expect(screen.getByText(/add your own Anthropic API key/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Your message'), { target: { value: 'Hello' } });
    expect(screen.getByRole('button', { name: /send/i })).toBeDisabled();
  });

  it('sends the conversation, streams the reply and shows corrections apart', async () => {
    withKey();
    reply.mockImplementation(async (o: { onText: (t: string) => void; history: { content: string }[]; mode: string }) => {
      o.onText('That sounds');
      return 'That sounds lovely! Why do you like it?\n\n✏️ "I am live in Hanoi" → "I live in Hanoi" (no "am" with a verb)';
    });
    page();
    expect(screen.getByText(/your English speaking partner/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Your message'), { target: { value: 'I am live in Hanoi' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(await screen.findByText(/Why do you like it/)).toBeInTheDocument();
    expect(screen.getByText('I am live in Hanoi')).toBeInTheDocument();
    expect(screen.getByText(/no "am" with a verb/)).toBeInTheDocument();
    expect(reply.mock.calls[0][0]).toMatchObject({ mode: 'partner', apiKey: 'test-key', history: [{ role: 'user', content: 'I am live in Hanoi' }] });
    expect(loadChat('partner')).toHaveLength(2);
  });

  it('keeps a separate conversation per mode and can start over', async () => {
    withKey();
    reply.mockResolvedValue('Okay.');
    page();
    fireEvent.change(screen.getByLabelText('Your message'), { target: { value: 'Hi' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    await screen.findByText('Okay.');
    fireEvent.click(screen.getByRole('tab', { name: /Mock test/ }));
    expect(screen.getByText(/I’ll be your examiner today/)).toBeInTheDocument();
    expect(screen.queryByText('Okay.')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: /Speaking partner/ }));
    expect(screen.getByText('Okay.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /New chat/ }));
    expect(screen.queryByText('Okay.')).not.toBeInTheDocument();
    expect(loadChat('partner')).toHaveLength(0);
  });

  it('shows the error and lets the learner retry without duplicating the message', async () => {
    withKey();
    reply.mockRejectedValueOnce(new Error('Network error — check your connection.')).mockResolvedValueOnce('Back again.');
    page();
    fireEvent.change(screen.getByLabelText('Your message'), { target: { value: 'Hello there' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(await screen.findByText(/Network error/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(await screen.findByText('Back again.')).toBeInTheDocument();
    expect(screen.getAllByText('Hello there')).toHaveLength(1);
    expect(reply.mock.calls[1][0].history).toHaveLength(1);
  });

  it('opens on the AI examiner mock test by default', () => {
    withKey();
    page('/chat');
    expect(screen.getByText(/I’ll be your examiner today/)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Mock test/, selected: true })).toBeInTheDocument();
  });

  it('runs a hands-free voice test: speaks the question, listens, sends after a pause, speaks the reply', async () => {
    withKey();
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const spoken: string[] = [];
    let utter: { onend?: () => void } | null = null;
    (globalThis as Record<string, unknown>).SpeechSynthesisUtterance = class {
      text: string;
      onend?: () => void;
      constructor(t: string) {
        this.text = t;
      }
    };
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: { speak: (u: { text: string; onend?: () => void }) => { spoken.push(u.text); utter = u; }, cancel: () => undefined, getVoices: () => [] },
    });
    let rec: { onresult: ((e: unknown) => void) | null; started: number } | null = null;
    (window as unknown as Record<string, unknown>).webkitSpeechRecognition = class {
      onresult: ((e: unknown) => void) | null = null;
      onend = null;
      onerror = null;
      started = 0;
      constructor() {
        rec = this as never;
      }
      start() {
        this.started++;
      }
      stop() {}
    };
    reply.mockResolvedValue('Thank you. Do you work or are you a student?');
    page('/chat?mode=examiner');
    fireEvent.click(screen.getByRole('button', { name: /Start the speaking test/ }));
    expect(spoken[0]).toMatch(/Can you tell me your full name/);
    expect(screen.getByText(/Examiner is speaking/)).toBeInTheDocument();
    act(() => utter!.onend!()); // question finished → mic opens
    expect(screen.getByText(/Listening — speak now/)).toBeInTheDocument();
    act(() => rec!.onresult!({ resultIndex: 0, results: [Object.assign([{ transcript: 'My name is Linh', confidence: 0.9 }], { isFinal: true })] }));
    expect(reply).not.toHaveBeenCalled();
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    expect(reply).toHaveBeenCalledTimes(1);
    expect(reply.mock.calls[0][0].history).toEqual([{ role: 'user', content: 'My name is Linh' }]);
    expect(await screen.findByText(/Do you work or are you a student/)).toBeInTheDocument();
    expect(spoken[1]).toMatch(/Do you work or are you a student/);
    fireEvent.click(screen.getByRole('button', { name: /End/ }));
    expect(screen.getByRole('button', { name: /Continue the speaking test/ })).toBeInTheDocument();
    vi.useRealTimers();
    delete (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
  });

  it('splits the correction paragraph from the reply', () => {
    expect(splitFix('Nice!\n\n✏️ fix')).toEqual(['Nice!', '✏️ fix']);
    expect(splitFix('No fixes here.')).toEqual(['No fixes here.', '']);
  });
});

import { overallBand, parseReport } from '../src/lib/chat';
describe('speaking score', () => {
  it('rounds the overall band the IELTS way', () => {
    expect(overallBand([6, 6, 6, 6.5])).toBe(6); // 6.125
    expect(overallBand([6, 6, 6.5, 6.5])).toBe(6.5); // 6.25
    expect(overallBand([6.5, 6.5, 7, 7])).toBe(7); // 6.75
    expect(overallBand([7, 7, 7, 6.5])).toBe(7); // 6.875
  });
  it('reads and clamps the grader JSON', () => {
    const r = parseReport('```json\n{"bands":{"fc":"7","lr":9.7,"gra":5.3,"p":null},"strengths":["a"],"upgrades":[{"said":"x"}]}\n```', 3, 40);
    expect(r.bands).toEqual({ fc: 7, lr: 9, gra: 5.5, p: 0 });
    expect(r.upgrades).toEqual([]);
    expect(r.answers).toBe(3);
  });
});
