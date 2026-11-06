import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages serves the app from /<repo>/ — set BASE_PATH in CI; local dev uses '/'.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    // offline speech-to-text only needs the plain WebAssembly runtime (one 11 MB .wasm), not WebGPU
    alias: [{ find: /^onnxruntime-web$/, replacement: 'onnxruntime-web/wasm' }],
  },
  // All study content ships in the main bundle on purpose (~360 kB gzip) so practice works without further requests.
  build: {
    chunkSizeWarningLimit: 1500,
    // the claude.ai artifact is one inlined page: keep lazily loaded code in the same file
    rollupOptions: process.env.VITE_TARGET === 'artifact' ? { output: { inlineDynamicImports: true } } : {},
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
} as never);
