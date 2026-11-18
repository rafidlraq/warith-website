import type { Locale, PageSlug } from "./content";

export const SUPPORT_EMAIL = "support@warith.app";
export const SITE_DOMAIN = "warith.online";

type Ui = {
    skip: string;
    homeHeading: string;
    homeSub: string;
    helpTitle: string;
    helpText: string;
    helpAction: string;
    deleteCard: { title: string; text: string; button: string };
    mail: { subject: string; body: string };
    subtitles: Record<PageSlug | "home", string>;
};

const arabicNames: Ui["subtitles"] = {
    home: "وارث — الموقع الرسمي",
    "privacy-policy": "وارث — سياسة الخصوصية",
    terms: "وارث — الشروط والأحكام",
    "child-safety": "وارث — سياسة سلامة الأطفال",
    "delete-account": "وارث — حذف الحساب والبيانات",
};

const englishNames: Ui["subtitles"] = {
    home: "Warith — Official Website",
    "privacy-policy": "Warith — Privacy Policy",
    terms: "Warith — Terms of Use",
    "child-safety": "Warith — Child Safety Policy",
    "delete-account": "Warith — Delete Account and Data",
};

export const ui: Record<Locale, Ui> = {
    ar: {
        skip: "تخطي إلى المحتوى",
        homeHeading: "كل ما تحتاج إلى معرفته",
        homeSub: "روابط واضحة ومباشرة للسياسات والمعلومات الأساسية الخاصة بتطبيق وارث.",
        helpTitle: "نحن هنا لمساعدتك",
        helpText: "للاستفسارات والدعم، تواصل مع فريق وارث عبر البريد الإلكتروني:",
        helpAction: "راسلنا",
        deleteCard: {
            title: "لا تستطيع الدخول إلى التطبيق؟",
            text: "ابدأ طلب حذف خارجي بمراسلة فريق وارث. لا تحتاج إلى إعادة تثبيت التطبيق لتقديم الطلب.",
            button: "إرسال طلب حذف عبر البريد",
        },
        mail: {
            subject: "طلب حذف حساب وارث",
            body: "مرحباً فريق وارث،\n\nأرغب في تقديم طلب حذف حسابي.\nرقم الهاتف المرتبط بالحساب (مع رمز الدولة):\nاسم المستخدم (إن وجد):\n\nأرجو تأكيد استلام الطلب وإرشادي إلى الخطوات التالية.\n\nلن أرسل كلمة المرور أو رمز التحقق.",
        },
        subtitles: englishNames,
    },
    ku: {
        skip: "بازدان بۆ ناوەڕۆک",
        homeHeading: "هەموو ئەوەی پێویستتە بیزانیت",
        homeSub: "بەستەری ڕوون بۆ سیاسەت و زانیارییە بنەڕەتییەکانی ئەپی وارث.",
        helpTitle: "ئێمە لێرەین بۆ یارمەتیدانت",
        helpText: "بۆ پرسیار و پشتگیری، پەیوەندی بە تیمی وارث بکە لە ڕێگەی ئیمەیڵەوە:",
        helpAction: "نامەمان بۆ بنێرە",
        deleteCard: {
            title: "ناتوانیت بچیتە ناو ئەپەکە؟",
            text: "داواکاری سڕینەوەی دەرەکی بە ناردنی ئیمەیڵ بۆ تیمی وارث دەستپێبکە؛ پێویست ناکات ئەپەکە دووبارە دابمەزرێنیت.",
            button: "ناردنی داواکاری بە ئیمەیڵ",
        },
        mail: {
            subject: "داواکاری سڕینەوەی هەژماری وارث",
            body: "سڵاو تیمی وارث،\n\nدەمەوێت داوای سڕینەوەی هەژمارەکەم بکەم.\nژمارەی مۆبایلی پەیوەست بە هەژمار (لەگەڵ کۆدی وڵات):\nناوی بەکارهێنەر (ئەگەر هەیە):\n\nتکایە وەرگرتنی داواکارییەکە پشتڕاست بکەنەوە و هەنگاوەکانی دواترم پێ بڵێن.\n\nوشەی نهێنی یان کۆدی پشتڕاستکردنەوە نانێرم.",
        },
        subtitles: englishNames,
    },
    en: {
        skip: "Skip to content",
        homeHeading: "Everything you need to know",
        homeSub: "Direct links to Warith policies and essential information.",
        helpTitle: "We are here to help",
        helpText: "For questions and support, contact the Warith team by email:",
        helpAction: "Email us",
        deleteCard: {
            title: "Can't access the app?",
            text: "Start an external deletion request by emailing the Warith team. You do not need to reinstall the app.",
            button: "Email a deletion request",
        },
        mail: {
            subject: "Warith account deletion request",
            body: "Hello Warith Support,\n\nI would like to request deletion of my account.\nPhone number linked to the account (including country code):\nUsername (if available):\n\nPlease confirm receipt and advise on the next steps.\n\nI will not include my password or verification code.",
        },
        subtitles: arabicNames,
    },
    fr: {
        skip: "Aller au contenu",
        homeHeading: "Toutes les informations essentielles",
        homeSub: "Des liens directs vers les politiques et les informations essentielles de Warith.",
        helpTitle: "Nous sommes là pour vous aider",
        helpText: "Pour toute question ou assistance, contactez l’équipe Warith par e-mail :",
        helpAction: "Nous écrire",
        deleteCard: {
            title: "Vous ne pouvez pas accéder à l’application ?",
            text: "Commencez une demande externe en écrivant à l’équipe Warith. Vous n’avez pas besoin de réinstaller l’application.",
            button: "Envoyer une demande par e-mail",
        },
        mail: {
            subject: "Demande de suppression du compte Warith",
            body: "Bonjour l’équipe Warith,\n\nJe souhaite demander la suppression de mon compte.\nNuméro de téléphone associé au compte (avec indicatif du pays) :\nNom d’utilisateur (si disponible) :\n\nVeuillez confirmer la réception de ma demande et m’indiquer les prochaines étapes.\n\nJe ne communiquerai ni mot de passe ni code de vérification.",
        },
        subtitles: arabicNames,
    },
    es: {
        skip: "Saltar al contenido",
        homeHeading: "Toda la información que necesitas",
        homeSub: "Enlaces directos a las políticas y la información esencial de Warith.",
        helpTitle: "Estamos aquí para ayudarte",
        helpText: "Para consultas y asistencia, contacta con el equipo de Warith por correo electrónico:",
        helpAction: "Escríbenos",
        deleteCard: {
            title: "¿No puedes acceder a la aplicación?",
            text: "Inicia una solicitud externa escribiendo al equipo de Warith. No necesitas reinstalar la aplicación.",
            button: "Enviar solicitud por correo",
        },
        mail: {
            subject: "Solicitud de eliminación de cuenta de Warith",
            body: "Hola, equipo de Warith:\n\nQuiero solicitar la eliminación de mi cuenta.\nNúmero de teléfono asociado a la cuenta (con prefijo del país):\nNombre de usuario (si está disponible):\n\nPor favor, confirma la recepción de mi solicitud e indícame los siguientes pasos.\n\nNo incluiré mi contraseña ni mi código de verificación.",
        },
        subtitles: arabicNames,
    },
};

/** Split "3. Title" into its number and clean title. */
export function splitHeading(title: string, fallback: number) {
    const match = title.match(/^\s*(\d+)\.\s*(.+)$/);
    return match ? { number: match[1], text: match[2] } : { number: String(fallback), text: title };
}

const EMAIL = /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;

/** Split a string into plain parts and e-mail parts so e-mails can be rendered as links. */
export function splitEmails(text: string): { value: string; email: boolean }[] {
    return text
        .split(EMAIL)
        .filter(Boolean)
        .map((value) => ({ value, email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value) }));
}