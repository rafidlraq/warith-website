import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyLink from "@/components/CopyLink";
import { content, isLocale, locales, pageSlugs, type Locale, type PageSlug } from "@/lib/content";

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
  const mailSubject = locale === "ar" ? "طلب حذف حساب وارث" : locale === "ku" ? "داواکاری سڕینەوەی هەژماری وارث" : locale === "fr" ? "Demande de suppression du compte Warith" : locale === "es" ? "Solicitud de eliminación de cuenta de Warith" : "Warith account deletion request";
  const mailBody = locale === "ar"
    ? "مرحباً فريق وارث،\n\nأرغب في تقديم طلب حذف حسابي.\nرقم الهاتف المرتبط بالحساب (مع رمز الدولة):\nاسم المستخدم (إن وجد):\n\nأرجو تأكيد استلام الطلب وإرشادي إلى الخطوات التالية.\n\nلن أرسل كلمة المرور أو رمز التحقق."
    : locale === "ku"
      ? "سڵاو تیمی وارث،\n\nدەمەوێت داوای سڕینەوەی هەژمارەکەم بکەم.\nژمارەی مۆبایلی پەیوەست بە هەژمار (لەگەڵ کۆدی وڵات):\nناوی بەکارهێنەر (ئەگەر هەیە):\n\nتکایە وەرگرتنی داواکارییەکە پشتڕاست بکەنەوە و هەنگاوەکانی دواترم پێ بڵێن.\n\nوشەی نهێنی یان کۆدی پشتڕاستکردنەوە نانێرم."
      : locale === "fr"
        ? "Bonjour l’équipe Warith,\n\nJe souhaite demander la suppression de mon compte.\nNuméro de téléphone associé au compte (avec indicatif du pays) :\nNom d’utilisateur (si disponible) :\n\nVeuillez confirmer la réception de ma demande et m’indiquer les prochaines étapes.\n\nJe ne communiquerai ni mot de passe ni code de vérification."
        : locale === "es"
          ? "Hola, equipo de Warith:\n\nQuiero solicitar la eliminación de mi cuenta.\nNúmero de teléfono asociado a la cuenta (con prefijo del país):\nNombre de usuario (si está disponible):\n\nPor favor, confirma la recepción de mi solicitud e indícame los siguientes pasos.\n\nNo incluiré mi contraseña ni mi código de verificación."
          : "Hello Warith Support,\n\nI would like to request deletion of my account.\nPhone number linked to the account (including country code):\nUsername (if available):\n\nPlease confirm receipt and advise on the next steps.\n\nI will not include my password or verification code.";
  const deletionEmail = `mailto:support@Warith.app?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  return (
    <div className="legal-page-wrap">
      <div className="legal-breadcrumb"><Link href={`/${locale}`}>{copy.nav.home}</Link><span>/</span><span>{page.title}</span></div>
      <article className="legal-article">
        <div className="legal-header">
          <div className="legal-heading-copy">
            <span className="section-kicker">WARITH / {slug.replaceAll("-", " ").toUpperCase()}</span>
            <h1>{page.title}</h1>
            <p className="legal-intro">{page.intro}</p>
          </div>
          <CopyLink label={copy.footer.copy} copiedLabel={copy.footer.copied} />
        </div>

        {slug === "delete-account" && (
          <section className="deletion-request-card" aria-label="External account deletion request">
            <div className="deletion-request-icon">↗</div>
            <div className="deletion-request-copy">
              <h2>{locale === "ar" ? "لا تستطيع الدخول إلى التطبيق؟" : locale === "ku" ? "ناتوانیت بچیتە ناو ئەپەکە؟" : locale === "fr" ? "Vous ne pouvez pas accéder à l’application ?" : locale === "es" ? "¿No puedes acceder a la aplicación?" : "Can't access the app?"}</h2>
              <p>{locale === "ar" ? "ابدأ طلب حذف خارجي بمراسلة فريق وارث. لا تحتاج إلى إعادة تثبيت التطبيق لتقديم الطلب." : locale === "ku" ? "داواکاری سڕینەوەی دەرەکی بە ناردنی ئیمەیڵ بۆ تیمی وارث دەستپێبکە؛ پێویست ناکات ئەپەکە دووبارە دابمەزرێنیت." : locale === "fr" ? "Commencez une demande externe en écrivant à l’équipe Warith. Vous n’avez pas besoin de réinstaller l’application." : locale === "es" ? "Inicia una solicitud externa escribiendo al equipo de Warith. No necesitas reinstalar la aplicación." : "Start an external deletion request by emailing the Warith team. You do not need to reinstall the app."}</p>
              <a className="button button-primary" href={deletionEmail}>{locale === "ar" ? "إرسال طلب حذف عبر البريد" : locale === "ku" ? "ناردنی داواکاری بە ئیمەیڵ" : locale === "fr" ? "Envoyer une demande par e-mail" : locale === "es" ? "Enviar solicitud por correo" : "Email a deletion request"}<span aria-hidden="true">↗</span></a>
            </div>
          </section>
        )}

        <div className="legal-content">
          {page.sections.map((section, index) => (
            <section className="legal-section" key={section.title} id={`section-${index + 1}`}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
              {section.steps && <ol>{section.steps.map((item) => <li key={item}>{item}</li>)}</ol>}
            </section>
          ))}
        </div>
        <div className="legal-bottom-actions">
          <Link className="button button-secondary" href={`/${locale}`}>← {copy.footer.back}</Link>
          <CopyLink label={copy.footer.copy} copiedLabel={copy.footer.copied} />
        </div>
      </article>
    </div>
  );
}
