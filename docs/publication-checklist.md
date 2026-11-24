# Publication checklist

The current build is for owner review only. It is not ready for public publication.

- [ ] Approve the four core pages and the founder photograph for public use.
- [ ] Supply the final Tally URL, confirm its email-only fields and review its privacy wording; set `registrationUrl`.
- [ ] Supply and verify the public contact address; set `contactEmail`.
- [ ] Verify the current application address before adding a sign-in link.
- [ ] Confirm the marketing site's data controller/contact, hosting and processor details, form handling, retention, user rights and any actual tracking. Write and approve distinct marketing-site Privacy and Terms pages. The present pages are explicit placeholders and `legalApproved` must remain false.
- [ ] Decide whether GA4 is needed; if so, supply a measurement ID and implement a reviewed consent flow that loads nothing before consent. The ID currently loads no script.
- [ ] Verify Cloudflare DNS, apex/`www` behaviour, current app hosting and email forwarding. Do not move or remove existing records while preparing the site.
- [ ] Confirm `myfamilyorbit.uk` is the final canonical origin and check social artwork in real link previews.
- [ ] Decide whether the available synthetic demo screenshots are suitable for public use or provide newer privacy-safe captures. They currently contain fictional names and a visible demo banner.
- [ ] Replace the legal placeholders, then remove the hard publication guard and the review `noindex`/robots block only after all legal and operational work is complete, with an explicit owner-approved release change.
- [ ] Authorise merge, Pages deployment and DNS changes separately. No current workflow runs on push.
