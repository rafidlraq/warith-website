import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MainNav from "@/components/MainNav";
import { content, isLocale, locales, pageSlugs, type Locale } from "@/lib/content";
import { SITE_DOMAIN, SUPPORT_EMAIL, ui } from "@/lib/ui";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const copy = content[locale];
  const navItems = [
    { href: `/${locale}`, label: copy.nav.home },
    { href: `/${locale}/privacy-policy`, label: copy.nav.privacy },
    { href: `/${locale}/terms`, label: copy.nav.terms },
    { href: `/${locale}/child-safety`, label: copy.nav.safety },
    { href: `/${locale}/delete-account`, label: copy.nav.deletion },
  ];

  return (
    <div className="site" lang={locale} dir={copy.direction}>
      <a className="skip-link" href="#content">
        {ui[locale].skip}
      </a>

      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href={`/${locale}`} aria-label="Warith">
            Warith
          </Link>
          <MainNav items={navItems} label="Main navigation" />
          <LanguageSwitcher current={locale} label={copy.nav.language} />
        </div>
      </header>

      <main id="content">{children}</main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand-block">
            <Link className="brand brand-footer" href={`/${locale}`}>
              Warith
            </Link>
            <p>{copy.footer.description}</p>
          </div>
          <div className="footer-links-block">
            <h2>{copy.footer.links}</h2>
            <div className="footer-links">
              {pageSlugs.map((slug) => (
                <Link key={slug} href={`/${locale}/${slug}`}>
                  {copy.homeCards.find((card) => card.slug === slug)?.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="footer-contact">
            <h2>{copy.footer.contact}</h2>
            <a className="mail-link" href={`mailto:${SUPPORT_EMAIL}`} dir="ltr">
              {SUPPORT_EMAIL}
            </a>
            <span dir="ltr">{SITE_DOMAIN}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Warith. {copy.footer.rights}
          </span>
          <span>{copy.footer.lastUpdated}</span>
        </div>
      </footer>
    </div>
  );
}