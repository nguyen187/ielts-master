import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../src/App';
import { emptyState, getState, resetState } from '../src/lib/store';
import { readingPassages, cueCards, speakingPart1 } from '../src/content';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </MemoryRouter>,
  );
}

const profile = () => ({ name: 'Linh', module: 'academic' as const, targetBand: 7, examDate: '2099-01-01', hoursPerDay: 2, startBands: { listening: 6, reading: 6, writing: 5.5, speaking: 5.5 }, createdAt: new Date().toISOString() });

beforeEach(() => {
  localStorage.clear();
  resetState(emptyState());
  window.scrollTo = () => undefined;
});

describe('home', () => {
  it('shows the landing page for new visitors', () => {
    renderAt('/');
    expect(screen.getByText(/Reach your target IELTS band/)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /find my level/i }).length).toBeGreaterThan(0);
  });
  it('shows a daily plan once a profile exists', () => {
    resetState({ ...emptyState(), profile: profile() });
    renderAt('/');
    expect(screen.getByText(/Today's plan/)).toBeInTheDocument();
    expect(screen.getByText(/Estimated bands vs target/)).toBeInTheDocument();
    const box = screen.getAllByRole('checkbox')[0];
    fireEvent.click(box);
    expect(Object.values(getState().planDone).flat().length).toBe(1);
  });
});

describe('onboarding', () => {
  it('creates a profile from self-reported scores', () => {
    renderAt('/start');
    fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: 'An' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    fireEvent.click(screen.getByRole('button', { name: /I have an IELTS score/ }));
    fireEvent.click(screen.getByRole('button', { name: /See my plan/ }));
    expect(screen.getByTestId('feasibility')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Create my plan/ }));
    expect(getState().profile?.name).toBe('An');
  });
});

describe('reading practice', () => {
  it('grades a passage, records the attempt and shows explanations', () => {
    const p = readingPassages[0];
    renderAt(`/reading/${p.id}`);
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    // answer the first TFNG / matching / mcq question correctly where possible
    const first = p.groups[0];
    const q = first.questions[0];
    if (first.type === 'matching') fireEvent.change(screen.getByLabelText(`Question ${q.number}`), { target: { value: q.answer[0] } });
    else if (first.type === 'gap') fireEvent.change(screen.getByLabelText(`Question ${q.number}`), { target: { value: q.answer[0] } });
    fireEvent.click(screen.getAllByRole('button', { name: /Submit/ })[0]);
    expect(screen.getByText(/Estimated band/i)).toBeInTheDocument();
    expect(getState().attempts.filter((a) => a.kind === 'reading')).toHaveLength(1);
    expect(screen.getAllByText(q.explanation).length).toBeGreaterThan(0);
  });
  it('does not record an empty submission', () => {
    renderAt(`/reading/${readingPassages[1].id}`);
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    fireEvent.click(screen.getAllByRole('button', { name: /Submit/ })[0]);
    expect(getState().attempts).toHaveLength(0);
  });
  it('filters the list by question type', () => {
    renderAt('/reading');
    const all = screen.getAllByRole('link').filter((l) => l.getAttribute('href')?.startsWith('/reading/')).length;
    fireEvent.change(screen.getByLabelText('Question type'), { target: { value: 'ynng' } });
    const ynng = screen.getAllByRole('link').filter((l) => l.getAttribute('href')?.startsWith('/reading/')).length;
    expect(ynng).toBeGreaterThan(0);
    expect(ynng).toBeLessThan(all);
  });
});

describe('speaking (no microphone / speech APIs in test env)', () => {
  it('lists cue cards and opens one', () => {
    renderAt('/speaking');
    expect(screen.getByText(cueCards[0].topic)).toBeInTheDocument();
    renderAt(`/speaking/card/${cueCards[0].id}`);
    expect(screen.getAllByText(cueCards[0].prompt).length).toBeGreaterThan(0);
  });
  it('part 1 lets the learner type an answer and see the sample', async () => {
    const t = speakingPart1[0];
    renderAt(`/speaking/part1/${t.id}`);
    for (let i = 0; i < t.questions.length; i++) {
      await screen.findByText(new RegExp(`Question ${i + 1} of`));
      fireEvent.change(screen.getByLabelText(/Transcript/), { target: { value: 'I am a student and I really enjoy learning about computers because they are useful.' } });
      fireEvent.click(screen.getByRole('button', { name: i < t.questions.length - 1 ? /Next question/ : /Finish/ }));
    }
    expect(await screen.findByText(/Band 8 sample/)).toBeInTheDocument();
    expect(getState().speaking).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: /Save self-assessment/ }));
    expect(getState().speaking[0].band).toBe(6);
  });
});

describe('robustness', () => {
  it('handles unknown ids and routes', () => {
    renderAt('/reading/nope');
    expect(screen.getByText(/Passage not found/)).toBeInTheDocument();
  });
  it('renders every main page without crashing', () => {
    resetState({ ...emptyState(), profile: profile() });
    for (const path of ['/writing', '/vocabulary', '/grammar', '/guides', '/progress', '/settings', '/descriptors', '/listening', '/mock', '/speaking/mock']) {
      const { unmount, container } = renderAt(path);
      expect(within(container).getAllByRole('heading').length, path).toBeGreaterThan(0);
      unmount();
    }
  });
});

describe('speaking navigation', () => {
  it('Next is never stuck: an unanswered question can be skipped', async () => {
    const t = speakingPart1[0];
    renderAt(`/speaking/part1/${t.id}`);
    const skip = screen.getByRole('button', { name: /Skip question/ });
    expect(skip).toBeEnabled();
    fireEvent.click(skip);
    expect(await screen.findByText(/Question 2 of/)).toBeInTheDocument();
  });
});
