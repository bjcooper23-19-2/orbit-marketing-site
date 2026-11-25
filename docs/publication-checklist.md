# Publication checklist

PR #1 is a review build. `publicationApproved` and `legalApproved` remain `false`; every page is `noindex, nofollow`, `robots.txt` disallows crawling, and the build rejects `publicationApproved: true`. Do not run the manual Pages workflow, merge, repoint DNS or publish without separate owner approval. The [readiness handover](publication-readiness.md) records evidence and exact release steps.

## Complete in this PR

- [x] Approved creative, founder image, product screenshots and page structure preserved.
- [x] Central Tally URL `https://tally.so/r/4aKZqO` used by registration links; public form visibly has a required email field, required consent checkbox, privacy link and configured return URL. No submission was made.
- [x] `hello@myfamilyorbit.uk` configured for contact and legal links; owner reports inbound routing tested. Outbound Gmail setup is deferred and is not a website publication blocker.
- [x] Owner-provided Privacy Policy and Website Terms of Use drafted into distinct pages with company details; `legalApproved` remains `false`.
- [x] Statutory operator information added to the shared footer; privacy and terms links remain available on every page.
- [x] Canonical, social and sitemap URLs prepared for `https://myfamilyorbit.uk`; the review build stays blocked from indexing.
- [x] Build, site checks and local Chrome review at 375, 390, 768, 1024 and 1440 px completed; visual evidence refreshed.

## Required before an authorised release

- [ ] Obtain explicit owner approval of the final legal text and operational arrangements. Set `legalApproved: true` only then; set `publicationDate` to the actual publication date at release. The draft currently shows `[actual publication date]`.
- [ ] Verify processor contracts and relevant international transfer safeguards for GitHub, Cloudflare, Tally and Google Workspace; record the actual data flows and lawful arrangements.
- [ ] Inspect Tally admin settings and a test submission for timestamped consent evidence, consent wording/version, data export/deletion and redirect behaviour. Review the public consent control's generic `Confirm` label and `Untitled checkboxes field` legend.
- [ ] Confirm the live cookie and storage behaviour of the deployed marketing site and Tally form. The local site has no analytics or advertising scripts; the current Cloudflare-served apex sets a security cookie. Assess whether any optional technology needs consent.
- [ ] Establish an annual interest-list review, 12-month resolved-enquiry deletion process, a privacy-request handling process and a suppression/unsubscribe process before sending updates.
- [ ] Complete the [ICO data protection fee self-assessment](https://ico.org.uk/for-organisations/data-protection-fee/data-protection-fee-self-assessment/) and record the outcome.
- [ ] Resolve the domain routing conflict: the apex, `www`, `/privacy/` and `/terms/` currently redirect to `app.myfamilyorbit.uk`. Confirm the impact on application links and choose the marketing-site cutover and rollback plan before touching Cloudflare DNS.
- [ ] Enable GitHub Pages with GitHub Actions as its source, verify the domain, deploy only after release approval, and then configure the custom domain and HTTPS. Preserve existing email, Resend and application DNS records.
- [ ] Verify the live privacy link from Tally, Tally's return destination, all marketing routes, `www` behaviour, email routing, app access and social previews after the authorised cutover.
- [ ] Complete a separate owner-approved release change that removes the unconditional publication guard and review indexing block only after these checks. Authorise merge, deployment and DNS changes separately.
