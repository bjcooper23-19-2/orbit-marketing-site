import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { pages } from '../src/site.mjs';
let checks = 0;
for (const page of pages) {
  const directory = path.resolve('dist', page.slug);
  const html = await readFile(path.join(directory, 'index.html'), 'utf8');
  for (const pattern of [/<main id="main">/, /<h1[ >]/, /<title>[^<]+<\/title>/, /<meta name="description"/, /<link rel="canonical"/, /<meta property="og:image"/, /<meta name="robots" content="noindex, nofollow"/]) {
    if (!pattern.test(html)) throw new Error(`${page.slug || 'home'}: missing ${pattern}`);
    checks++;
  }
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const absolute = path.resolve(directory, target.split('#')[0]);
    if (!absolute.startsWith(path.resolve('dist'))) throw new Error(`Link escaped dist: ${target}`);
    try { await access(absolute); } catch { throw new Error(`${page.slug || 'home'}: missing ${target}`); }
    checks++;
  }
}
for (const asset of ['dist/assets/images/social-share.png', 'dist/assets/images/founder.jpg', 'dist/assets/images/orbit-demo-to-sort.png', 'dist/assets/fonts/newsreader.ttf', 'dist/assets/fonts/dm-sans.woff2', 'dist/robots.txt', 'dist/sitemap.xml']) { await access(asset); checks++; }
const robots = await readFile('dist/robots.txt', 'utf8');
if (!robots.includes('Disallow: /')) throw new Error('Review build must block indexing.');
console.log(`Checked ${pages.length} pages, local links and assets (${checks} checks).`);
