import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRecorder, RecorderPanel } from '../src/components/Speaking';

function Harness() {
  const r = useRecorder();
  return <RecorderPanel r={r} />;
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
});
