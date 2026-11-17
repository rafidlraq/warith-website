import Link from "next/link";
import { notFound } from "next/navigation";
import { content, isLocale, type Locale } from "@/lib/content";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const copy = content[locale];

  return (
    <>
      <section className="hero-section">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-dot" />{copy.hero.eyebrow}</div>
          <h1>{copy.hero.title.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1>
          <p className="hero-description">{copy.hero.description}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href={`/${locale}/privacy-policy`}>{copy.hero.primary}<span aria-hidden="true">↗</span></Link>
            <Link className="button button-secondary" href={`/${locale}/delete-account`}>{copy.hero.secondary}</Link>
          </div>
          <div className="hero-features">
            {copy.hero.features.map((feature) => <span key={feature}><span className="feature-check">✓</span>{feature}</span>)}
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-panel panel-main">
            <div className="panel-top"><span className="panel-dot" /><span className="panel-line" /></div>
            <div className="panel-title-line" />
            <div className="panel-course"><span className="course-symbol">W</span><span><i /><b /></span></div>
            <div className="panel-course panel-course-muted"><span className="course-symbol">✦</span><span><i /><b /></span></div>
            <div className="panel-progress"><span /></div>
            <div className="panel-caption" />
          </div>
          <div className="floating-card floating-card-top"><span className="floating-icon">✓</span><span><b /><i /></span></div>
          <div className="floating-card floating-card-bottom"><span className="floating-bubble">✦</span><span><b /><i /></span></div>
          <div className="visual-spark spark-one">✦</div><div className="visual-spark spark-two">·</div>
        </div>
      </section>

      <section className="intro-strip">
        <div className="intro-strip-inner">
          <span className="intro-mark">W</span>
          <p>{copy.tagline}</p>
          <span className="intro-domain">warith.online</span>
        </div>
      </section>

      <section className="resources-section">
        <div className="section-heading">
          <span className="section-kicker">WARITH / INFORMATION</span>
          <h2>{locale === "ar" ? "كل ما تحتاج إلى معرفته" : locale === "ku" ? "هەموو ئەوەی پێویستتە بیزانیت" : locale === "fr" ? "Toutes les informations essentielles" : locale === "es" ? "Toda la información que necesitas" : "Everything you need to know"}</h2>
          <p>{locale === "ar" ? "روابط واضحة ومباشرة للسياسات والمعلومات الأساسية الخاصة بتطبيق وارث." : locale === "ku" ? "بەستەری ڕوون بۆ سیاسەت و زانیارییە بنەڕەتییەکانی ئەپی وارث." : locale === "fr" ? "Des liens directs vers les politiques et les informations essentielles de Warith." : locale === "es" ? "Enlaces directos a las políticas y la información esencial de Warith." : "Direct links to Warith policies and essential information."}</p>
        </div>
        <div className="resource-grid">
          {copy.homeCards.map((card, index) => (
            <Link className="resource-card" href={`/${locale}/${card.slug}`} key={card.slug}>
              <div className="resource-card-top"><span className={`resource-icon resource-icon-${index + 1}`}>{["◈", "≡", "⌂", "↗"][index]}</span><span className="card-arrow">↗</span></div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className="resource-action">{card.action}<span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="support-banner">
        <div><span className="section-kicker">NEED HELP?</span><h2>{locale === "ar" ? "نحن هنا لمساعدتك" : locale === "ku" ? "ئێمە لێرەین بۆ یارمەتیدانت" : locale === "fr" ? "Nous sommes là pour vous aider" : locale === "es" ? "Estamos aquí para ayudarte" : "We are here to help"}</h2><p>{locale === "ar" ? "للاستفسارات والدعم، تواصل مع فريق وارث." : locale === "ku" ? "بۆ پرسیار و پشتگیری، پەیوەندی بە تیمی وارث بکە." : locale === "fr" ? "Pour toute question ou assistance, contactez l’équipe Warith." : locale === "es" ? "Para consultas y asistencia, contacta con el equipo de Warith." : "For questions and support, contact the Warith team."}</p></div>
        <a className="support-email" href="mailto:support@Warith.app">support@Warith.app <span>↗</span></a>
      </section>
    </>
  );
}
