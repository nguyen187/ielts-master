// Turns the artifact build (dist-artifact/) into one self-contained page for claude.ai:
// CSS and JS inlined, no <html>/<head>/<body> (the publisher adds the skeleton).
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'dist-artifact';
const html = readFileSync(join(dir, 'index.html'), 'utf8');

const cssHrefs = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map((m) => m[1]);
const jsSrcs = [...html.matchAll(/<script[^>]+type="module"[^>]+src="([^"]+)"/g)].map((m) => m[1]);
if (!jsSrcs.length) throw new Error('No module script found in dist-artifact/index.html');

const read = (p) => readFileSync(join(dir, p.replace(/^\.?\//, '')), 'utf8');
const css = cssHrefs.map(read).join('\n');
// a literal "</script" inside the bundle would end the inline script early
const js = jsSrcs.map(read).join('\n').replace(/<\/script/gi, '<\\/script')
  // a raw U+FFFD inside library string literals is rejected by the publisher; use the escape
  .replace(/\uFFFD/g, '\\uFFFD');

const page = `<title>IELTS Master</title>
<meta name="description" content="Free IELTS preparation: placement test, personal plan, practice in all four skills, mock tests, and Writing and Speaking graded by Claude.">
<style>
${css}
</style>
<div id="root"></div>
<script type="module">
${js}
</script>
`;
writeFileSync(join(dir, 'ielts-master.html'), page);
console.log(`dist-artifact/ielts-master.html  ${(page.length / 1024 / 1024).toFixed(2)} MB`);

// Offline speech-to-text: the Whisper model and the WebAssembly runtime are published next to the
// page under whisper/, split into parts below the artifact's per-file limit (src/lib/transcribe.ts).
import { mkdirSync, rmSync, existsSync, statSync } from 'node:fs';
const PART = 8 * 1024 * 1024;
const sources = {
  'config.json': '.whisper-cache/config.json',
  'generation_config.json': '.whisper-cache/generation_config.json',
  'preprocessor_config.json': '.whisper-cache/preprocessor_config.json',
  'tokenizer.json': '.whisper-cache/tokenizer.json',
  'tokenizer_config.json': '.whisper-cache/tokenizer_config.json',
  'onnx/encoder_model_quantized.onnx': '.whisper-cache/onnx/encoder_model_quantized.onnx',
  'onnx/decoder_model_merged_quantized.onnx': '.whisper-cache/onnx/decoder_model_merged_quantized.onnx',
  'ort-wasm-simd-threaded.wasm': 'node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.wasm',
};
const out = join(dir, 'whisper');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
const manifest = { files: {} };
let n = 0;
for (const [name, src] of Object.entries(sources)) {
  if (!existsSync(src)) throw new Error(`Missing ${src} — run: npm run fetch:whisper`);
  const buf = readFileSync(src);
  const parts = [];
  for (let at = 0; at < buf.length; at += PART) {
    const file = `p${String(n++).padStart(2, '0')}.wasm`; // .wasm: a type artifacts serve; read as raw bytes
    writeFileSync(join(out, file), buf.subarray(at, at + PART));
    parts.push(file);
  }
  manifest.files[name] = { parts, size: statSync(src).size };
}
writeFileSync(join(out, 'manifest.json'), JSON.stringify(manifest));
// the runtime's small JavaScript loader (imported by onnxruntime-web; see src/lib/transcribe.ts)
writeFileSync(join(out, 'ort-wasm-simd-threaded.mjs'), readFileSync('node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.mjs'));
console.log(`dist-artifact/whisper/  ${n} parts`);
