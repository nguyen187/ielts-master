import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages serves the app from /<repo>/ — set BASE_PATH in CI; local dev uses '/'.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  // All study content ships in the main bundle on purpose (~360 kB gzip) so practice works without further requests.
  build: { chunkSizeWarningLimit: 1500 },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
} as never);
