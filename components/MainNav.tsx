"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function MainNav({ items, label }: { items: { href: string; label: string }[]; label: string }) {
    const pathname = (usePathname() || "").replace(/\/$/, "");
    const ref = useRef<HTMLElement>(null);

    // On small screens the nav scrolls horizontally: keep the current page in view.
    useEffect(() => {
        const active = ref.current?.querySelector<HTMLElement>("[aria-current='page']");
        active?.scrollIntoView({ inline: "center", block: "nearest" });
    }, [pathname]);

    return (
        <nav className="main-nav" aria-label={label} ref={ref}>
            {items.map((item) => (
                <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}