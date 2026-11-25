import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { pages } from '../src/site.mjs';
import { company } from '../src/legal.mjs';
const config = JSON.parse(await readFile('site.config.json', 'utf8'));
const origin = config.canonicalOrigin.replace(/\/$/, '');
let checks = 0;
const titles = new Set();
const descriptions = new Set();
for (const page of pages) {
  const directory = path.resolve('dist', page.slug);
  const html = await readFile(path.join(directory, 'index.html'), 'utf8');
  const robotsMeta = config.publicationApproved && page.indexable ? 'index, follow' : 'noindex, nofollow';
  for (const pattern of [/<main id="main">/, /<h1[ >]/, /<title>[^<]+<\/title>/, /<meta name="description"/, /<link rel="canonical"/, /<meta property="og:image"/, new RegExp(`<meta name="robots" content="${robotsMeta}">`)]) {
    if (!pattern.test(html)) throw new Error(`${page.slug || 'home'}: missing ${pattern}`);
    checks++;
  }
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  if (titles.has(title) || descriptions.has(description)) throw new Error(`${page.slug || 'home'}: duplicate metadata`);
  titles.add(title); descriptions.add(description); checks += 2;
  const canonical = `${origin}/${page.slug ? `${page.slug}/` : ''}`;
  if (!html.includes(`<link rel="canonical" href="${canonical}">`) || !html.includes(`<meta property="og:url" content="${canonical}">`) || !html.includes(`<meta property="og:image" content="${origin}/assets/images/social-share.png">`) || !html.includes(`<meta name="twitter:image" content="${origin}/assets/images/social-share.png">`)) throw new Error(`${page.slug || 'home'}: incorrect canonical or social URL`);
  checks++;
  if (!html.includes(company.name) || !html.includes(company.number) || !html.includes('© 2026 Orbit. A Nineteen Point Two product.')) throw new Error(`${page.slug || 'home'}: missing statutory footer`);
  checks++;
  for (const slug of ['privacy', 'terms']) {
    if (!html.includes(`href="${page.slug ? '../' : './'}${slug}/"`)) throw new Error(`${page.slug || 'home'}: missing ${slug} footer link`);
    checks++;
  }
  let registrationLinks = 0;
  for (const anchor of html.matchAll(/<a\b([^>]*?)>([\s\S]*?)<\/a>/g)) {
    if (!/register (your )?interest/i.test(anchor[2].replace(/<[^>]+>/g, ' '))) continue;
    registrationLinks++;
    if (!anchor[1].includes(`href="${config.registrationUrl}"`)) throw new Error(`${page.slug || 'home'}: registration CTA does not use configured Tally URL`);
  }
  if (!registrationLinks) throw new Error(`${page.slug || 'home'}: no registration CTA`);
  checks += registrationLinks;
  if (/Registration is not open yet|Contact details are being prepared|information is being prepared/.test(html)) throw new Error(`${page.slug || 'home'}: stale unavailable state`);
  checks++;
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const absolute = path.resolve(directory, target.split('#')[0]);
    if (!absolute.startsWith(path.resolve('dist'))) throw new Error(`Link escaped dist: ${target}`);
    try { await access(absolute); } catch { throw new Error(`${page.slug || 'home'}: missing ${target}`); }
    checks++;
  }
}
for (const slug of ['privacy', 'terms']) {
  const html = await readFile(path.join('dist', slug, 'index.html'), 'utf8');
  if (!html.includes(`mailto:${config.contactEmail}`) || !html.includes(company.office.replace('&', '&amp;')) || !html.includes(`Last updated: ${config.publicationDate}`)) throw new Error(`${slug}: missing operator contact details or publication date`);
  checks++;
}
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
for (const page of pages.filter(page => page.indexable)) {
  const url = `${origin}/${page.slug ? `${page.slug}/` : ''}`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) throw new Error(`sitemap missing ${url}`);
  checks++;
}
for (const asset of ['dist/assets/images/social-share.png', 'dist/assets/images/founder.jpg', 'dist/assets/images/orbit-demo-to-sort.png', 'dist/assets/fonts/newsreader.ttf', 'dist/assets/fonts/dm-sans.woff2', 'dist/robots.txt', 'dist/sitemap.xml']) { await access(asset); checks++; }
const robots = await readFile('dist/robots.txt', 'utf8');
if (config.publicationApproved) {
  if (!robots.includes('Allow: /') || !robots.includes(`Sitemap: ${origin}/sitemap.xml`) || robots.includes('Disallow: /')) throw new Error('Published build must allow indexing.');
} else if (!robots.includes('Disallow: /')) throw new Error('Review build must block indexing.');
console.log(`Checked ${pages.length} pages, local links and assets (${checks} checks).`);
