/**
 * Build script.
 *
 * 1. Bundles `src/render.ts` (the page template + content) and runs it in Node to
 *    emit a fully static `dist/index.html` — no client-side rendering, so the page
 *    is complete for search engines and readable without JavaScript.
 * 2. Bundles `src/runtime/main.ts` to `dist/assets/main.js` for menu, dialog,
 *    active-link and reveal behaviour.
 * 3. Copies everything in `static/` to `dist/assets/` (stylesheet, CV PDF, images).
 *
 * Run with: npm run build
 */
import { build } from 'esbuild';
import { mkdir, readdir, copyFile, readFile, writeFile, rm, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'docs');
const assets = path.join(dist, 'assets');
const tmp = path.join(root, '.build');

async function copyDir(from, to) {
  if (!existsSync(from)) return [];
  await mkdir(to, { recursive: true });
  const entries = await readdir(from, { withFileTypes: true });
  const copied = [];
  for (const entry of entries) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copied.push(...(await copyDir(src, dest)));
    } else {
      await copyFile(src, dest);
      copied.push(entry.name);
    }
  }
  return copied;
}

async function run() {
  await rm(dist, { recursive: true, force: true });
  await rm(tmp, { recursive: true, force: true });
  await mkdir(assets, { recursive: true });
  await mkdir(tmp, { recursive: true });

  // 1. Render the page.
  const rendererPath = path.join(tmp, 'render.mjs');
  await build({
    entryPoints: [path.join(root, 'src/render.ts')],
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node18',
    outfile: rendererPath,
    logLevel: 'warning',
  });
  const { renderPage } = await import(pathToFileURL(rendererPath).href);
  const html = renderPage();
  await writeFile(path.join(dist, 'index.html'), html, 'utf8');

  // 2. Bundle the runtime.
  await build({
    entryPoints: [path.join(root, 'src/runtime/main.ts')],
    bundle: true,
    format: 'iife',
    target: ['es2019'],
    minify: true,
    outfile: path.join(assets, 'main.js'),
    logLevel: 'warning',
  });

  // 3. Copy static assets.
  const copied = await copyDir(path.join(root, 'static'), assets);

  // 4. Convenience build: one self-contained file with CSS and JS inlined.
  //    Handy for previewing or emailing; `dist/index.html` is the real site.
  const css = await readFile(path.join(assets, 'styles.css'), 'utf8');
  const js = await readFile(path.join(assets, 'main.js'), 'utf8');
  const standalone = html
    .replace(
      '<link rel="stylesheet" href="assets/styles.css" />',
      `<style>\n${css}\n</style>`,
    )
    .replace('<script src="assets/main.js" defer></script>', `<script>\n${js}\n</script>`);
  await writeFile(
    path.join(dist, 'portfolio-standalone.html'),
    standalone,
    'utf8',
  );

  await rm(tmp, { recursive: true, force: true });

  const size = (await stat(path.join(dist, 'index.html'))).size;
  console.log(`built dist/index.html (${(size / 1024).toFixed(1)} kB)`);
  console.log(`assets: ${copied.join(', ')}, main.js`);

  const cvPresent = copied.some((f) => f.toLowerCase().endsWith('.pdf'));
  if (!cvPresent) {
    console.warn(
      '\n  NOTE: no PDF found in static/. CV download controls are omitted.\n' +
        '  Add Mostafa-Atef-Mohamed-CV.pdf to static/ and set `cv` in src/content.ts to enable them.\n',
    );
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
