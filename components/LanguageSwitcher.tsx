"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { locales, content, type Locale } from "@/lib/content";

export default function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname() || `/${current}`;
  const segments = pathname.split("/").filter(Boolean);
  const remainder = segments.slice(1).join("/");
  const menu = useRef<HTMLDetailsElement>(null);

  // Close the menu on outside click or Escape.
  useEffect(() => {
    const close = () => menu.current?.removeAttribute("open");
    const onClick = (event: MouseEvent) => {
      if (menu.current && !menu.current.contains(event.target as Node)) close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <details className="lang-menu" ref={menu}>
      <summary aria-label={label}>
        <span>{content[current].localeName}</span>
        <svg className="lang-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <ul className="lang-list">
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={`/${locale}${remainder ? `/${remainder}` : ""}`}
              lang={locale}
              hrefLang={locale}
              aria-current={current === locale ? "true" : undefined}
            >
              {content[locale].localeName}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}