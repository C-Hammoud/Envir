/**
 * GitHub Pages has no server fallback for client-side routes (/admin, /project/…).
 * Serving 404.html as the custom not-found page loads the same SPA shell as index.html
 * so React Router can handle the path.
 */
import { copyFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const indexHtml = resolve(root, 'dist', 'index.html');
const notFoundHtml = resolve(root, 'dist', '404.html');

if (!existsSync(indexHtml)) {
  console.error('copy-spa-404: dist/index.html missing — run vite build first.');
  process.exit(1);
}

copyFileSync(indexHtml, notFoundHtml);
console.log('copy-spa-404: dist/index.html → dist/404.html');
