# Warith official website

A multilingual Next.js App Router website for Warith, prepared for deployment on Vercel and the custom domain `warith.online`.

## Included

- Arabic (`ar`), Kurdish (`ku`), English (`en`), French (`fr`) and Spanish (`es`).
- Separate, directly addressable pages for the home page, privacy policy, terms of use, child safety standards and account deletion.
- Right-to-left layout for Arabic and Kurdish; left-to-right layout for English, French and Spanish.
- Copy-current-page-URL buttons on legal pages.
- A language switcher that keeps the visitor on the equivalent page in the selected language.
- Responsive layout, page metadata, `robots.txt` and `sitemap.xml`.
- An external account-deletion email action so users who no longer have the app can contact Warith without reinstalling it.

## Design system

- Primary colour `#0090FD`; centred blue "Warith" wordmark, pill navigation with a blue active state, language dropdown, soft-blue wave behind each page title.
- Every policy section is a numbered card (blue badge + tinted header band). Styles live in `app/globals.css`; all spacing uses logical properties so RTL (ar, ku) and LTR (en, fr, es) share one stylesheet.
- Page content stays in `lib/content.ts`; shared UI strings (subtitles, help block, deletion e-mail template) are in `lib/ui.ts`. The support contact is the e-mail `support@warith.app` only (`SUPPORT_EMAIL` in `lib/ui.ts`); no support phone number is published.
- Fonts (Inter + Noto Sans Arabic) are loaded with `next/font/google` and self-hosted at build time.

## Routes

For each language (`ar`, `ku`, `en`, `fr`, `es`):

- `/{locale}` — Home
- `/{locale}/privacy-policy` — Privacy policy
- `/{locale}/terms` — Terms of use
- `/{locale}/child-safety` — Child safety standards
- `/{locale}/delete-account` — Account deletion

The root route `/` redirects to `/ar`.

## Requirements

- Node.js 20.9 or newer.
- npm 10 or a compatible package manager.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Deploy to Vercel using GitHub

1. Create a GitHub repository, for example `warith-website`.
2. Upload the contents of this folder to the repository root (do not upload the ZIP file as the repository contents).
3. In Vercel, select **Add New → Project**, import the `warith-website` repository and keep the detected Next.js defaults.
4. Deploy. Vercel will provide a temporary `*.vercel.app` URL for testing.
5. In the project, open **Settings → Domains** and add `warith.online`. Add `www.warith.online` too if you want the `www` hostname.
6. In the DNS provider that manages `warith.online`, add the exact DNS records Vercel displays for the project. Do not copy records from an old setup or guess a target; Vercel may show different records depending on the domain and account configuration.
7. Wait for Vercel to verify the DNS records and issue HTTPS. Set a preferred primary domain and redirect the other hostname to it if desired.
8. Test `/ar`, `/en`, `/ku`, `/fr`, `/es` and each legal page on the deployed domain.

## Account deletion integration — important before Google Play submission

The deletion page includes an external `mailto:` action addressed to `support@warith.app`. It opens a pre-filled email draft; the user must send that email from an email app or webmail. This is an interim contact path, not an automated web submission. This starter project does **not** connect to the Warith production database and does not itself delete accounts. Before relying on this page for Google Play account-deletion compliance, connect a real web request form or a verified support intake endpoint that can receive requests even when the app is uninstalled.

For a fully automated and auditable deletion flow, connect the external form/action to a real account-deletion request endpoint in the Warith backend. The endpoint must authenticate or safely verify the requester, create a traceable deletion request, prevent abuse, support cancellation during the stated 30-day period if that remains the actual product policy, and trigger deletion of the account data when due. Do not invent an API URL: obtain the actual route and request schema from the backend implementation, then wire it in. Update the public wording if the backend's real behaviour differs.

Google Play requires an externally accessible web resource that lets users initiate account deletion without having to reinstall the app, as well as an in-app deletion path. See the official policy references below.

## Legal and policy review before publication

The supplied policy content has been organised and translated for the website. The English, Kurdish, French and Spanish texts are working translations, not certified legal translations. Have the final versions reviewed by the responsible legal and privacy stakeholders. Verify that every statement matches the app and backend in production, especially data collected, chat retention, third-party processors, wallet/top-up behaviour, the 30-day recovery process, child-safety reporting and actual deletion timing.

## Brand and contact details

- Product: Warith
- Domain: `warith.online`
- Support email: `support@warith.app`
- Primary colour: `#0090FD`
- Secondary colour: `#6BD2FF`

## Official deployment and policy references

- Next.js deployment: https://nextjs.org/docs/app/getting-started/deploying
- Vercel custom domains: https://vercel.com/docs/domains/set-up-custom-domain
- Google Play account deletion requirements: https://support.google.com/googleplay/android-developer/answer/13327111

See [`ROUTES.md`](./ROUTES.md) for the complete 25-route language matrix.