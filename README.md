# Orbit marketing site

A lightweight static site for Orbit, with four core pages: Home, Why Orbit, How it works and Our story. The site is separate from the Orbit application. It uses the approved Orbit mark, self-hosted DM Sans and Newsreader, and the founder photograph supplied for this project.

## Development

Requires Node 20 or newer. There are no runtime dependencies.

```sh
npm run build
npm run check
npm run preview
```

Open `http://localhost:4173/`. The `dev` command serves the most recent build; run `npm run build` again after edits. Generated files are in `dist/` and are not committed.

The static output uses relative links, so it works at both a GitHub Pages repository path and the intended custom domain. Canonical and social URLs are set for `https://myfamilyorbit.uk`. The production build allows indexing of public pages; registration and contact retain page-level `noindex` settings.

## Configuration and publication

[`site.config.json`](site.config.json) holds the confirmed Tally registration URL, public contact email and canonical origin. Registration actions open the external Tally form; no form, database or mail service is embedded in this site. The optional sign-in URL is still empty and its link stays hidden. GA4 remains inactive; its future measurement ID loads no script and requires a reviewed consent implementation before use.

The owner has approved the Privacy Policy and Website Terms of Use. `legalApproved` and `publicationApproved` are true, and the publication date is 25 November 2026. Change that date before deployment if the site goes live later. GitHub Pages is enabled with GitHub Actions as its source, but the repository custom domain is not configured. The Pages workflow is manual (`workflow_dispatch`) with no push trigger. Do not run it, merge, change DNS or publish without separate owner authorisation. See the [publication checklist](docs/publication-checklist.md), [readiness handover](docs/publication-readiness.md) and [supplier and privacy operations record](docs/supplier-privacy-operations.md).

## Sources

Product reference revision: `bjcooper23-19-2/my-family-orbit@546c34e5ae3e3ffe7c95482b612333cda0a87b3e`. The product repository was read only. Product screenshots are crops of its tracked synthetic demo screenshots in `docs/screenshots/issue-151/after-to-sort-390.png` and `docs/screenshots/issue-161/orbit-161-after-{capture,review}-390.png`. The synthetic demo banner remains visible. The JPEG founder image is an optimised copy of the user-supplied photograph; the original PNG is not included. Font licences are in `assets/fonts/`.
