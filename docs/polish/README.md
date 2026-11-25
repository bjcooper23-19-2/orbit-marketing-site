# Visual polish evidence

The before images record the buyer-led `main` build (PR #2); the after images record this local static build. Home and How it works were inspected at 375, 390, 768, 1024 and 1440px. There was no horizontal overflow at those widths.

| Page | Before | After |
| --- | --- | --- |
| Home, mobile | [375px](../refinement/home-after-375.jpg) | [375px](home-after-375.jpg) |
| Home, desktop | [1440px](../refinement/home-after-1440.jpg) | [1440px](home-after-1440.jpg) |
| How it works, mobile | [375px](../refinement/how-after-375.jpg) | [375px](how-after-375.jpg) |
| How it works, desktop | [1440px](../refinement/how-after-1440.jpg) | [1440px](how-after-1440.jpg) |

The collage now has three more small fragments across its desktop transition and a full-width lower fade. Its mobile fade extends through a slightly taller opening visual. On How it works, the new headline is direct and the top and step spacing is tighter.

## Product screenshot audit

| Tracked Orbit demo image | Before | After |
| --- | --- | --- |
| Review | Home, unframed; How it works, unframed | Home, phone frame |
| Things to sort | Home and How it works, phone frame | Home, phone frame |
| Capture | How it works, phone frame | How it works, phone frame beside the steps |

Each of the three existing genuine demo screens now appears once. The screenshot files remain unchanged, including their demo banners. A tracked Week screen was considered but made the walkthrough unnecessarily long; the existing set gave a cleaner, distinct presentation without introducing another asset. No product application, infrastructure, analytics, registration or legal content was changed.

Verification: `npm run build`, `npm run check` (326 checks) and `git diff --check` passed.
