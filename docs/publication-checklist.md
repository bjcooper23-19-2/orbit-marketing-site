# Publication checklist

PR #1 contains the owner-approved design, Privacy Policy and Website Terms of Use. `legalApproved` is true. The publication date is blank; `publicationApproved` is false. Every page remains `noindex, nofollow`, `robots.txt` disallows crawling, and the build rejects `publicationApproved: true`. The Pages workflow runs only by manual dispatch. Do not merge, deploy, change DNS or publish without separate release authorisation. See the [readiness handover](publication-readiness.md).

## Confirmed by the owner

- [x] Design, privacy policy and terms approved; operator details and statutory footer are present on all pages.
- [x] Tally registration, explicit consent recording, consent field naming, owner notifications and thank-you experience tested. The central URL is `https://tally.so/r/4aKZqO`.
- [x] Inbound delivery to `hello@myfamilyorbit.uk` tested.
- [x] Annual interest-list reviews and up to 12 months' retention for resolved general enquiries approved.
- [x] ICO data protection fee paid for Nineteen Point Two Limited.
- [x] GitHub domain ownership verified; existing Cloudflare DNS exported and reviewed.
- [x] GitHub Pages enabled with GitHub Actions as the deployment source; the repository custom domain is still unset.
- [x] `app.myfamilyorbit.uk` confirmed as the primary application domain. Production household invitation and notification links point there; source-level and live authentication dependency checks are complete.
- [x] Canonical, social and sitemap URLs prepared for `https://myfamilyorbit.uk`. Earlier build, site checks and desktop/mobile visual evidence are in [review evidence](review/README.md).

## Owner checks before publication

- [ ] Record which processing terms cover Nineteen Point Two Limited's actual GitHub Pages, Cloudflare, Tally and Google Workspace accounts, and the applicable UK international transfer routes. Tally publishes a DPA incorporated into professional account terms; verify the account belongs to the legal operator. Confirm Cloudflare's DPA, Google Workspace's CDPA and GitHub's applicable terms in the actual accounts. See [processor review](publication-readiness.md#processor-and-transfer-review).
- [ ] Assign responsibility for the `hello@` privacy inbox and record a simple process to locate, export and delete Tally registrations and resolved enquiries, handle withdrawal and rights requests, and carry out the approved retention reviews. This can be manual; no new system is needed.
- [ ] Set `publicationDate` to the actual publication date and obtain explicit approval for the release change that removes the publication and indexing guards.

## At the separately authorised cutover

- [ ] Configure the repository custom domain and HTTPS, then follow the recorded Cloudflare routing and rollback plan. Preserve application, email-routing and Resend records.
- [ ] Check the published privacy and terms pages, Tally privacy and return links, registration and contact links, `www` behaviour, app access and representative desktop/mobile pages. Inspect actual deployed cookies and storage; add consent only if optional technologies are found.

## Ongoing after publication

- [ ] Carry out annual registration-list reviews and deletion of resolved enquiries at the approved interval; respond to privacy requests and record outcomes.
- [ ] Before sending Orbit update emails, provide a simple opt-out in each message and maintain a suppression record. Outbound Gmail configuration and GA4 remain deferred.
- [ ] Recheck provider terms, subprocessors, transfers and cookie behaviour when services or data flows change.
