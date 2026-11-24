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

The static output uses relative links, so it works at both a GitHub Pages repository path and the eventual custom domain. Canonical and social URLs are set for `https://myfamilyorbit.uk` but the build is marked `noindex` until publication is explicitly prepared. `robots.txt` disallows all crawling in the review build.

## Configuration and publication

Edit [`site.config.json`](site.config.json) for the eventual Tally registration URL, contact email, verified sign-in URL, and canonical origin. Empty values deliberately produce an unavailable state or hide the link. Do not insert a real form until its privacy arrangements are approved. GA4 remains inactive; its future measurement ID is reserved in the config and a consent implementation must be reviewed before enabling it.

The build intentionally refuses `publicationApproved: true` while the legal pages are placeholders. Replacing those pages and removing the guard requires a separate owner-approved release change. The Pages workflow is manual (`workflow_dispatch`) and is provided for a later authorised release. Do not trigger it during review. The workflow has no push trigger. The repository must not be merged or published until the owner authorises release and the blockers in [`docs/publication-checklist.md`](docs/publication-checklist.md) are resolved.

## Sources

Product reference revision: `bjcooper23-19-2/my-family-orbit@546c34e5ae3e3ffe7c95482b612333cda0a87b3e`. The product repository was read only. Product screenshots are crops of its tracked synthetic demo screenshots in `docs/screenshots/issue-151/after-to-sort-390.png` and `docs/screenshots/issue-161/orbit-161-after-{capture,review}-390.png`. The synthetic demo banner remains visible. The JPEG founder image is an optimised copy of the user-supplied photograph; the original PNG is not included. Font licences are in `assets/fonts/`.
