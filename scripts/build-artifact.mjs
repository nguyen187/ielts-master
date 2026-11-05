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
