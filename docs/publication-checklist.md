# Publication checklist

PR #1 contains the approved website and legal text. `legalApproved` is true and `publicationDate` is prepared as **25 November 2026**. This date is valid only if publication occurs that day. `publicationApproved` remains false; pages are `noindex, nofollow`, `robots.txt` disallows crawling, and the build rejects a publication flag. The Pages workflow is manual. Do not merge, deploy, change DNS or publish without separate authorisation.

## Confirmed

- [x] Design, copy, founder image, product screenshots, privacy policy, terms, statutory footer and public contact approved.
- [x] Tally registration and explicit consent recording, field naming, owner notifications and thank-you experience tested; inbound `hello@myfamilyorbit.uk` delivery verified.
- [x] Annual registration-list reviews and up to 12 months' retention for resolved enquiries approved; the director owns privacy requests, withdrawals, deletion and reviews.
- [x] ICO data protection fee paid. Google Workspace CDPA accepted on 25 November 2026. Tally's business use, Cloudflare's company billing account and GitHub's director-operated personal account recorded in the [supplier and operations record](supplier-privacy-operations.md).
- [x] GitHub Pages enabled with GitHub Actions as source and domain ownership verified at account level. The repository custom domain is not yet configured.
- [x] Cloudflare DNS exported and reviewed. The application domain and production invitation, notification and authentication links were checked. Existing application, email-routing and Resend records must be preserved.
- [x] Canonical, social and sitemap URLs prepared for `https://myfamilyorbit.uk`; prior [desktop and mobile visual evidence](review/README.md) remains applicable.

## Before an authorised publication

- [ ] Confirm publication will occur on 25 November 2026; otherwise change `publicationDate` before release. Obtain explicit approval to remove the publication and indexing guards, merge, deploy and alter DNS.
- [ ] Configure the repository custom domain in Pages, verify HTTPS and apply the reviewed Cloudflare web-routing and rollback plan only under separate authorisation.
- [ ] After deployment, verify the published privacy and terms pages, Tally privacy and return links, registration and contact links, `www`, app access, representative desktop/mobile pages, sitemap and live cookie/storage behaviour.

## Ongoing controls

- [ ] Carry out the approved annual registration-list review and 12-month resolved-enquiry deletion; log and answer privacy requests and consent withdrawals.
- [ ] Before sending update emails, provide a simple opt-out in each message and maintain a suppression record. Outbound Gmail and GA4 remain deferred.
- [ ] Revisit supplier roles, terms and transfer arrangements if accounts, hosting or data flows change. GitHub Pages' processing role on this personal account is not conclusively classified in the [supplier record](supplier-privacy-operations.md); its published DPA must not be claimed for this account.
