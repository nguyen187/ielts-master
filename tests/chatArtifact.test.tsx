import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// the claude.ai build: no microphone for the page, Claude on the viewer's account
vi.mock('../src/lib/artifact', async (orig) => ({ ...(await orig<typeof import('../src/lib/artifact')>()), IS_ARTIFACT: true }));
vi.mock('../src/lib/ai', async (orig) => ({ ...(await orig<typeof import('../src/lib/ai')>()), useAiAvailable: () => ({ available: true, via: 'claude', state: 'ready' }) }));
const reply = vi.fn();
const transcribe = vi.fn();
vi.mock('../src/lib/transcribe', () => ({ transcribe: (f: Blob, p: unknown) => transcribe(f, p), preloadTranscriber: () => undefined }));
vi.mock('../src/lib/chat', async (orig) => ({ ...(await orig<typeof import('../src/lib/chat')>()), chatReply: (o: unknown) => reply(o) }));

import AiChat from '../src/pages/AiChat';

beforeEach(() => {
  localStorage.clear();
  reply.mockReset();
  Element.prototype.scrollIntoView = () => undefined;
});

describe('voice test on claude.ai (artifact)', () => {
  it('reads the question aloud, takes the dictated answer and sends it after a pause', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const spoken: string[] = [];
    let utter: { onend?: () => void } | null = null;
    (globalThis as Record<string, unknown>).SpeechSynthesisUtterance = class {
      text: string;
      constructor(t: string) {
        this.text = t;
      }
    };
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: { speak: (u: { text: string; onend?: () => void }) => { spoken.push(u.text); utter = u; }, cancel: () => undefined, getVoices: () => [] },
    });
    reply.mockResolvedValue('Thank you. Where are you from?');
    render(
      <MemoryRouter initialEntries={['/chat']}>
        <AiChat />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Bạn trả lời bằng giọng nói theo 1 trong 2 cách/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Start the speaking test/ }));
    expect(spoken[0]).toMatch(/full name/);
    act(() => utter!.onend!());
    const box = screen.getByLabelText('Your message');
    expect(document.activeElement).toBe(box);
    expect(screen.getByText(/Your turn — speak/)).toBeInTheDocument();
    // the system's dictation types into the box in bursts
    fireEvent.change(box, { target: { value: 'My name is' } });
    for (let i = 0; i < 5; i++)
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
    fireEvent.change(box, { target: { value: 'My name is Minh Anh' } });
    for (let i = 0; i < 5; i++)
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
    expect(reply).not.toHaveBeenCalled();
    // the box is checked every 0.3 s; it goes about 3 s after the last words
    let ticks = 0;
    for (; ticks < 20 && !reply.mock.calls.length; ticks++)
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
    expect(ticks).toBeLessThanOrEqual(8);
    expect(reply).toHaveBeenCalledTimes(1);
    expect(reply.mock.calls[0][0].history).toEqual([{ role: 'user', content: 'My name is Minh Anh' }]);
    expect(await screen.findByText(/Where are you from/)).toBeInTheDocument();
    expect(spoken[1]).toMatch(/Where are you from/);
    vi.useRealTimers();
  });

  it('still works when the browser never reports the end of speech and dictation skips change events', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    (globalThis as Record<string, unknown>).SpeechSynthesisUtterance = class {
      text: string;
      constructor(t: string) {
        this.text = t;
      }
    };
    // speaks nothing and never calls onstart / onend (what a sandboxed frame can do)
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: { speak: () => undefined, cancel: () => undefined, getVoices: () => [], speaking: false } });
    reply.mockResolvedValue('Thank you.');
    render(
      <MemoryRouter initialEntries={['/chat']}>
        <AiChat />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Start the speaking test/ }));
    expect(screen.getByText(/Examiner is speaking/)).toBeInTheDocument();
    for (let i = 0; i < 8; i++)
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
    expect(screen.getByText(/Your turn — speak now/)).toBeInTheDocument();
    // after a while with nothing heard, explain how to turn dictation on
    for (let i = 0; i < 22; i++)
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
    expect(screen.getByText(/Chưa nghe thấy gì/)).toBeInTheDocument();
    // dictation writes straight into the box (no input/change event)
    (screen.getByLabelText('Your message') as HTMLTextAreaElement).value = 'My name is Bao';
    for (let i = 0; i < 16 && !reply.mock.calls.length; i++)
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
    expect(reply.mock.calls[0][0].history).toEqual([{ role: 'user', content: 'My name is Bao' }]);
    vi.useRealTimers();
  });

  it('records with the device, transcribes offline and sends the words', async () => {
    reply.mockResolvedValue('Thank you. Do you work or study?');
    transcribe.mockImplementation(async (_f: Blob, progress: (s: string, f?: number) => void) => {
      progress('loading', 0.5);
      return { text: 'My name is Linh and I study economics.', seconds: 4 };
    });
    render(
      <MemoryRouter initialEntries={['/chat']}>
        <AiChat />
      </MemoryRouter>,
    );
    expect(screen.getByRole('button', { name: /Record answer/ })).toBeEnabled();
    const input = screen.getByLabelText('Recording of your answer') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [new File(['x'], 'answer.m4a', { type: 'audio/mp4' })] } });
    expect(await screen.findByText(/Do you work or study/)).toBeInTheDocument();
    expect(transcribe).toHaveBeenCalledTimes(1);
    expect(reply.mock.calls[0][0].history).toEqual([{ role: 'user', content: 'My name is Linh and I study economics.' }]);
  });

  it('explains when nothing was recognised in the recording', async () => {
    transcribe.mockResolvedValue({ text: '', seconds: 3 });
    render(
      <MemoryRouter initialEntries={['/chat']}>
        <AiChat />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByLabelText('Recording of your answer'), { target: { files: [new File(['x'], 'a.m4a')] } });
    expect(await screen.findByText(/No words were recognised/)).toBeInTheDocument();
    expect(reply).not.toHaveBeenCalled();
  });
});
