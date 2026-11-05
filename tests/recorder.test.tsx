import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRecorder, RecorderPanel } from '../src/components/Speaking';

function Harness() {
  const r = useRecorder();
  return (
    <>
      <RecorderPanel r={r} />
      <button disabled={r.recording || !r.hasAnswer}>Next</button>
    </>
  );
}

describe('RecorderPanel', () => {
  it('when the microphone is blocked it stays editable so the learner can type', async () => {
    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: { getUserMedia: () => Promise.reject(new DOMException('denied', 'NotAllowedError')) },
    });
    (globalThis as { MediaRecorder?: unknown }).MediaRecorder = class {};
    render(<Harness />);
    fireEvent.click(screen.getByRole('button', { name: /record answer/i }));
    await waitFor(() => expect(screen.getByText(/microphone access was blocked/i)).toBeInTheDocument());
    expect(screen.queryByText(/REC/)).not.toBeInTheDocument();
    const box = screen.getByLabelText(/transcript/i) as HTMLTextAreaElement;
    expect(box.readOnly).toBe(false);
    fireEvent.change(box, { target: { value: 'I usually sleep seven hours.' } });
    expect(box.value).toBe('I usually sleep seven hours.');
  });

  it('without a transcript, a finished recording still lets the learner continue and explains why', async () => {
    const track = { stop: () => undefined };
    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: { getUserMedia: async () => ({ getTracks: () => [track] }) },
    });
    (globalThis as { MediaRecorder?: unknown }).MediaRecorder = class {
      mimeType = 'audio/webm';
      ondataavailable: ((e: { data: Blob }) => void) | null = null;
      onstop: (() => void) | null = null;
      start() {}
      stop() {
        this.ondataavailable?.({ data: new Blob(['x']) });
        this.onstop?.();
      }
    };
    URL.createObjectURL = () => 'blob:fake';
    render(<Harness />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /record answer/i }));
    fireEvent.click(await screen.findByRole('button', { name: /stop/i }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled());
    await waitFor(() => expect(screen.getByText(/recording is saved/i)).toBeInTheDocument(), { timeout: 3000 });
  });
});
