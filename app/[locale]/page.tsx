import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { content, isLocale, locales, type Locale } from "@/lib/content";
import { SUPPORT_EMAIL, ui } from "@/lib/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: { absolute: `Warith | وارث — ${content[locale].tagline}` },
    description: content[locale].hero.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((code) => [code, `/${code}`])),
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const copy = content[locale];
  const text = ui[locale];

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1>
            {copy.hero.title.split("\n").map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p className="page-subtitle" dir="ltr">
            {text.subtitles.home}
          </p>
          <p className="page-intro">{copy.hero.description}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href={`/${locale}/privacy-policy`}>
              {copy.hero.primary}
            </Link>
            <Link className="button button-secondary" href={`/${locale}/delete-account`}>
              {copy.hero.secondary}
            </Link>
          </div>
          <ul className="chips">
            {copy.hero.features.map((feature) => (
              <li key={feature}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="cards">
        <div className="section-heading">
          <h2>{text.homeHeading}</h2>
          <p>{text.homeSub}</p>
        </div>

        <div className="card-grid">
          {copy.homeCards.map((card, index) => (
            <Link className="card card-link" href={`/${locale}/${card.slug}`} key={card.slug}>
              <div className="card-head">
                <span className="card-badge" aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{card.title}</h3>
              </div>
              <div className="card-body">
                <p>{card.description}</p>
                <span className="card-action">
                  {card.action}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <section className="card" aria-labelledby="help-title">
          <div className="card-head">
            <span className="card-badge" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2" />
                <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h2 id="help-title">{text.helpTitle}</h2>
          </div>
          <div className="card-body">
            <p>{text.helpText}</p>
            <p>
              <a className="mail-link" href={`mailto:${SUPPORT_EMAIL}`} dir="ltr">
                {SUPPORT_EMAIL}
              </a>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}