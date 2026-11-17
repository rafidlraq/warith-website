"use client";

import { usePathname } from "next/navigation";
import { locales, content, type Locale } from "@/lib/content";

export default function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname() || `/${current}`;
  const segments = pathname.split("/").filter(Boolean);
  const remainder = segments.slice(1).join("/");

  return (
    <div className="language-switcher">
      <span className="language-label">{label}</span>
      <div className="language-options" aria-label={label}>
        {locales.map((locale) => (
          <a
            key={locale}
            href={`/${locale}${remainder ? `/${remainder}` : ""}`}
            lang={locale}
            aria-current={current === locale ? "page" : undefined}
            className={current === locale ? "language-active" : ""}
            title={content[locale].localeName}
          >
            {locale.toUpperCase()}
          </a>
        ))}
      </div>
    </div>
  );
}
