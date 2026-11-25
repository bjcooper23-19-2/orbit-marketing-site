# Orbit marketing site instructions

This repository contains only the public marketing website. Treat `../Orbit/my-family-orbit` as a read-only reference for product behaviour, terms, logo and approved assets; do not change the product repository or its infrastructure. Product source revision for this build: `546c34e5ae3e3ffe7c95482b612333cda0a87b3e`.

Follow Investigate → Implement → Release. Use the shared UI/UX Pro Max skill for material interface work and No AI Slop for final public copy. Keep the site static, fast, accessible and mobile first. Preserve the approved Orbit logo geometry, palette, typefaces, headline, tagline and Capture → Reduce → Sort → Clear story. Distinguish current product behaviour from the evening preparation and shared-calendar goals still under validation. Use British English.

Do not add authentication, databases, child-facing flows, analytics before consent, speculative integrations or fabricated product screens. Keep registration, contact and sign-in destinations centrally configured. Privacy and terms are owner-approved content. The production build is dated 25 November 2026 and must match the actual release date. Never merge without explicit owner approval. Owner approval to merge into `main` also approves publication through the automatic GitHub Pages workflow. Manual redeployment requires explicit owner approval. Changes to the custom domain or DNS require separate explicit owner approval.

Run `npm run build` and `npm run check`, then inspect rendered pages at 375, 390, 768, 1024 and 1440 px. Review `docs/publication-checklist.md` before any release conversation.
