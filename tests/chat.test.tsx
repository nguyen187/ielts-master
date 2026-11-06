import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { emptyState, resetState } from '../src/lib/store';

const reply = vi.fn();
vi.mock('../src/lib/chat', async (orig) => ({ ...(await orig<typeof import('../src/lib/chat')>()), chatReply: (o: unknown) => reply(o) }));

import AiChat, { splitFix } from '../src/pages/AiChat';
import { loadChat } from '../src/lib/chat';

const withKey = () => resetState({ ...emptyState(), settings: { ...emptyState().settings, apiKey: 'test-key' } });
const page = () =>
  render(
    <MemoryRouter>
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
    fireEvent.click(screen.getByRole('tab', { name: /IELTS examiner/ }));
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

  it('splits the correction paragraph from the reply', () => {
    expect(splitFix('Nice!\n\n✏️ fix')).toEqual(['Nice!', '✏️ fix']);
    expect(splitFix('No fixes here.')).toEqual(['No fixes here.', '']);
  });
});
