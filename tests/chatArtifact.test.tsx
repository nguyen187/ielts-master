import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// the claude.ai build: no microphone for the page, Claude on the viewer's account
vi.mock('../src/lib/artifact', async (orig) => ({ ...(await orig<typeof import('../src/lib/artifact')>()), IS_ARTIFACT: true }));
vi.mock('../src/lib/ai', async (orig) => ({ ...(await orig<typeof import('../src/lib/ai')>()), useAiAvailable: () => ({ available: true, via: 'claude', state: 'ready' }) }));
const reply = vi.fn();
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
    expect(screen.getByText(/đọc chính tả của máy/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Start the speaking test/ }));
    expect(spoken[0]).toMatch(/full name/);
    act(() => utter!.onend!());
    const box = screen.getByLabelText('Your message');
    expect(document.activeElement).toBe(box);
    expect(screen.getByText(/Your turn — speak/)).toBeInTheDocument();
    // the system's dictation types into the box in bursts
    fireEvent.change(box, { target: { value: 'My name is' } });
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });
    fireEvent.change(box, { target: { value: 'My name is Minh Anh' } });
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });
    expect(reply).not.toHaveBeenCalled();
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(reply).toHaveBeenCalledTimes(1);
    expect(reply.mock.calls[0][0].history).toEqual([{ role: 'user', content: 'My name is Minh Anh' }]);
    expect(await screen.findByText(/Where are you from/)).toBeInTheDocument();
    expect(spoken[1]).toMatch(/Where are you from/);
    vi.useRealTimers();
  });
});
