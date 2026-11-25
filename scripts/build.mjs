import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import path from 'node:path';
import { pages, shell } from '../src/site.mjs';

const config = JSON.parse(await readFile('site.config.json', 'utf8'));
if (config.publicationApproved && (!config.legalApproved || !config.publicationDate)) throw new Error('Published builds require approved legal content and a publication date.');
if (!/^https:\/\/[^\s]+$/.test(config.registrationUrl)) throw new Error('registrationUrl must be an HTTPS URL.');
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail)) throw new Error('contactEmail must be a valid email address.');
if (config.signInUrl && !/^https:\/\/[^\s]+$/.test(config.signInUrl)) throw new Error('signInUrl must be an HTTPS URL.');
await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets', { recursive: true });
await cp('assets', 'dist/assets', { recursive: true });
await cp('src/styles.css', 'dist/assets/styles.css');
await cp('src/site.js', 'dist/assets/site.js');
for (const page of pages) {
  const depth = page.slug ? '../' : './';
  const dir = path.join('dist', page.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), shell(page, config, depth));
}
const origin = config.canonicalOrigin.replace(/\/$/, '');
const publicPages = pages.filter(page => config.publicationApproved && page.indexable);
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicPages.map(page => `<url><loc>${origin}/${page.slug ? `${page.slug}/` : ''}</loc></url>`).join('')}</urlset>`);
await writeFile('dist/robots.txt', `User-agent: *\n${config.publicationApproved ? 'Allow' : 'Disallow'}: /\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Built ${pages.length} pages in dist/ (${config.publicationApproved ? 'publication approved' : 'review only, noindex'}).`);
