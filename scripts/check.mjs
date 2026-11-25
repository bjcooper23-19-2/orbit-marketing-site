import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { pages } from '../src/site.mjs';
import { company } from '../src/legal.mjs';
const config = JSON.parse(await readFile('site.config.json', 'utf8'));
const origin = config.canonicalOrigin.replace(/\/$/, '');
let checks = 0;
const titles = new Set();
const descriptions = new Set();
const one = (html, pattern, label) => {
  const matches = [...html.matchAll(pattern)];
  if (matches.length !== 1 || !matches[0][1]) throw new Error(`Expected one ${label}.`);
  return matches[0][1];
};
for (const page of pages) {
  const directory = path.resolve('dist', page.slug);
  const html = await readFile(path.join(directory, 'index.html'), 'utf8');
  const robotsMeta = config.publicationApproved && page.indexable ? 'index, follow' : 'noindex, nofollow';
  for (const pattern of [/<main id="main">/, /<h1[ >]/, /<title>[^<]+<\/title>/, /<meta name="description"/, /<link rel="canonical"/, /<meta property="og:image"/, new RegExp(`<meta name="robots" content="${robotsMeta}">`)]) {
    if (!pattern.test(html)) throw new Error(`${page.slug || 'home'}: missing ${pattern}`);
    checks++;
  }
  const title = one(html, /<title>([^<]+)<\/title>/g, `${page.slug || 'home'} title`);
  const description = one(html, /<meta name="description" content="([^"]+)"/g, `${page.slug || 'home'} description`);
  if (titles.has(title) || descriptions.has(description)) throw new Error(`${page.slug || 'home'}: duplicate metadata`);
  if (/[—]/.test(title + description)) throw new Error(`${page.slug || 'home'}: em dash in metadata`);
  titles.add(title); descriptions.add(description); checks += 2;
  for (const [label, pattern, expected] of [
    ['Open Graph title', /<meta property="og:title" content="([^"]+)"/g, title],
    ['Open Graph description', /<meta property="og:description" content="([^"]+)"/g, description],
    ['Twitter title', /<meta name="twitter:title" content="([^"]+)"/g, title],
    ['Twitter description', /<meta name="twitter:description" content="([^"]+)"/g, description]
  ]) {
    if (one(html, pattern, `${page.slug || 'home'} ${label}`) !== expected) throw new Error(`${page.slug || 'home'}: ${label} differs from page metadata`);
    checks++;
  }
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (page.slug ? jsonLd.length !== 0 : jsonLd.length !== 1) throw new Error(`${page.slug || 'home'}: unexpected structured data`);
  if (!page.slug) {
    const data = JSON.parse(jsonLd[0][1]);
    const graph = data['@graph'];
    const organisation = graph?.find(item => item['@type'] === 'Organization');
    const website = graph?.find(item => item['@type'] === 'WebSite');
    if (data['@context'] !== 'https://schema.org' || graph.length !== 2 ||
      organisation?.['@id'] !== `${origin}/#organization` || organisation.name !== company.name ||
      organisation.legalName !== company.name || organisation.url !== `${origin}/` ||
      organisation.email !== config.contactEmail || organisation.brand?.['@type'] !== 'Brand' ||
      organisation.brand.name !== 'Orbit' || website?.['@id'] !== `${origin}/#website` ||
      website.name !== 'Orbit' || website.url !== `${origin}/` || website.inLanguage !== 'en-GB' ||
      website.publisher?.['@id'] !== organisation['@id']) throw new Error('Home: invalid Organization or WebSite structured data');
    checks++;
  }
  const canonical = `${origin}/${page.slug ? `${page.slug}/` : ''}`;
  if (!html.includes(`<link rel="canonical" href="${canonical}">`) || !html.includes(`<meta property="og:url" content="${canonical}">`) || !html.includes(`<meta property="og:image" content="${origin}/assets/images/social-share.png">`) || !html.includes(`<meta name="twitter:image" content="${origin}/assets/images/social-share.png">`)) throw new Error(`${page.slug || 'home'}: incorrect canonical or social URL`);
  checks++;
  if (!html.includes(company.name) || !html.includes(company.number) || !html.includes('Orbit. A Nineteen Point Two product.')) throw new Error(`${page.slug || 'home'}: missing statutory footer`);
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
const sitemapBody = sitemap.match(/^<\?xml version="1\.0" encoding="UTF-8"\?><urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">([\s\S]*)<\/urlset>$/)?.[1];
if (sitemapBody === undefined) throw new Error('sitemap has an invalid XML wrapper.');
const entries = [...sitemapBody.matchAll(/<url><loc>([^<]+)<\/loc><\/url>/g)];
if (entries.map(entry => entry[0]).join('') !== sitemapBody) throw new Error('sitemap contains invalid XML entries.');
const expectedUrls = new Set(pages.filter(page => config.publicationApproved && page.indexable).map(page => `${origin}/${page.slug ? `${page.slug}/` : ''}`));
const actualUrls = entries.map(entry => entry[1]);
if (actualUrls.length !== expectedUrls.size || new Set(actualUrls).size !== actualUrls.length) throw new Error('sitemap contains missing or duplicate URLs.');
for (const url of actualUrls) {
  if (!expectedUrls.has(url)) throw new Error(`sitemap contains a non-indexable or non-canonical URL: ${url}`);
  const pathname = new URL(url).pathname;
  await access(path.resolve('dist', `.${pathname}`, 'index.html'));
  checks++;
}
for (const asset of ['dist/assets/images/social-share.png', 'dist/assets/images/founder.jpg', 'dist/assets/images/orbit-demo-capture.png', 'dist/assets/images/orbit-demo-review.png', 'dist/assets/images/orbit-demo-to-sort.png', 'dist/assets/fonts/newsreader.ttf', 'dist/assets/fonts/dm-sans.woff2', 'dist/robots.txt', 'dist/sitemap.xml']) { await access(asset); checks++; }
const robots = await readFile('dist/robots.txt', 'utf8');
const expectedRobots = `User-agent: *\n${config.publicationApproved ? 'Allow' : 'Disallow'}: /\nSitemap: ${origin}/sitemap.xml\n`;
if (robots !== expectedRobots) throw new Error('robots.txt has incorrect crawl rules or sitemap URL.');
console.log(`Checked ${pages.length} pages, local links and assets (${checks} checks).`);
