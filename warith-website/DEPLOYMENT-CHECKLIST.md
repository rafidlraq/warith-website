# Warith website — go-live checklist

- [ ] Review all Arabic legal text and approve the final wording.
- [ ] Have the Kurdish, English, French and Spanish translations reviewed.
- [ ] Confirm that `support@Warith.app` is monitored and accepts messages.
- [ ] Confirm whether `947286` is the correct public support number and label it correctly.
- [ ] Confirm that the in-app deletion flow actually matches the 30-day period described.
- [ ] Connect the external account-deletion page to a real backend request endpoint or approved support workflow.
- [ ] Confirm data categories, vendors, retention periods, chat handling and children's safety controls against production behaviour.
- [ ] Push the project to GitHub and deploy it to Vercel.
- [ ] Add `warith.online` in Vercel and configure the exact DNS records Vercel provides.
- [ ] Verify HTTPS and test all 25 locale/page routes plus the root redirect.
- [ ] Test the copy-link buttons on mobile and desktop.
- [ ] Test that the deletion request email opens with the correct subject and body.
- [ ] Add `https://warith.online/ar/privacy-policy` (or the approved primary-language URL) as the privacy policy URL in Google Play Console.
- [ ] Add `https://warith.online/ar/delete-account` as the external account-deletion URL in Google Play Console.
- [ ] Add the child-safety URL to any applicable store declaration that requests it.
- [ ] Recheck sitemap: `https://warith.online/sitemap.xml` and robots: `https://warith.online/robots.txt`.
