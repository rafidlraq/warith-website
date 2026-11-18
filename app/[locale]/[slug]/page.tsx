import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyLink from "@/components/CopyLink";
import Rich from "@/components/Rich";
import { content, isLocale, locales, pageSlugs, type Locale, type PageSlug } from "@/lib/content";
import { SUPPORT_EMAIL, splitHeading, ui } from "@/lib/ui";

export function generateStaticParams(_options: { params: { locale: string } }) {
  return pageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam) || !pageSlugs.includes(slug as PageSlug)) return {};
  const page = content[localeParam].pages[slug as PageSlug];
  return {
    title: page.title,
    description: page.intro,
    alternates: {
      canonical: `/${localeParam}/${slug}`,
      languages: Object.fromEntries(locales.map((locale) => [locale, `/${locale}/${slug}`])),
    },
  };
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug: slugParam } = await params;
  if (!isLocale(localeParam) || !pageSlugs.includes(slugParam as PageSlug)) notFound();
  const locale = localeParam as Locale;
  const slug = slugParam as PageSlug;
  const copy = content[locale];
  const page = copy.pages[slug];
  const text = ui[locale];
  const deletionEmail = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(text.mail.subject)}&body=${encodeURIComponent(text.mail.body)}`;

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1>{page.title}</h1>
          <p className="page-subtitle" dir="ltr">
            {text.subtitles[slug]}
          </p>
          <p className="page-intro">{page.intro}</p>
          <div className="page-meta">
            <span className="meta-chip">{copy.footer.lastUpdated}</span>
            <CopyLink label={copy.footer.copy} copiedLabel={copy.footer.copied} />
          </div>
        </div>
      </section>

      <div className="cards">
        {slug === "delete-account" && (
          <section className="card card-accent" aria-labelledby="external-deletion-title">
            <div className="card-head">
              <span className="card-badge" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2" />
                  <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h2 id="external-deletion-title">{text.deleteCard.title}</h2>
            </div>
            <div className="card-body">
              <p>{text.deleteCard.text}</p>
              <a className="button button-primary" href={deletionEmail}>
                {text.deleteCard.button}
              </a>
            </div>
          </section>
        )}

        {page.sections.map((section, index) => {
          const heading = splitHeading(section.title, index + 1);
          return (
            <section className="card" key={section.title} id={`section-${index + 1}`} aria-labelledby={`section-title-${index + 1}`}>
              <div className="card-head">
                <span className="card-badge" aria-hidden="true">
                  {heading.number}
                </span>
                <h2 id={`section-title-${index + 1}`}>{heading.text}</h2>
              </div>
              <div className="card-body">
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>
                    <Rich text={paragraph} />
                  </p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>
                        <Rich text={item} />
                      </li>
                    ))}
                  </ul>
                )}
                {section.steps && (
                  <ol>
                    {section.steps.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                )}
              </div>
            </section>
          );
        })}

        <div className="page-actions">
          <Link className="button button-secondary" href={`/${locale}`}>
            <span className="arrow arrow-back" aria-hidden="true">
              →
            </span>
            {copy.footer.back}
          </Link>
          <CopyLink label={copy.footer.copy} copiedLabel={copy.footer.copied} />
        </div>
      </div>
    </>
  );
}