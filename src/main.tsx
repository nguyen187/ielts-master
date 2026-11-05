import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { initCloud } from './lib/cloud';
import { IS_ARTIFACT, initArtifact } from './lib/artifact';
import { initArtifactSync } from './lib/artifactSync';

initCloud();
initArtifact();
initArtifactSync();

// claude.ai only passes a plain #name to artifacts, so routes live in memory there
const Router = ({ children }: { children: React.ReactNode }) =>
  IS_ARTIFACT ? <MemoryRouter>{children}</MemoryRouter> : <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>{children}</BrowserRouter>;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);
