# Visual review evidence

Captured from the local static build in headless Chrome on 24 November 2026. Full-page images include the navigation, page body and footer. Product screenshots use only the product repository's synthetic demo data. The review build was not published.

| Page | Mobile, 375 px | Desktop, 1440 px |
|---|---|---|
| Home | [View](home-375.png) | [View](home-1440.png) |
| Why Orbit | [View](why-orbit-375.png) | [View](why-orbit-1440.png) |
| How it works | [View](how-it-works-375.png) | [View](how-it-works-1440.png) |
| Our story | [View](our-story-375.png) | [View](our-story-1440.png) |

Focused refinement captures: [hero desktop](home-hero-1440.png), [hero mobile](home-hero-375.png), [founder desktop](home-founder-1440.png), and [founder mobile](home-founder-375.png). The homepage hero now has sixteen information fragments on desktop and twelve on mobile. Ben looks into the copy from the right on desktop.

Additional measured layouts: 390, 768 and 1024 px. No horizontal overflow or broken images at any reviewed width. Mobile menu open/close and Escape dismissal passed. Local links and assets passed `npm run check` (256 checks). See `docs/publication-checklist.md` for remaining blockers.
