"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/30 bg-maroon-deep/95 text-paper backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo className="size-9" />
          <span className="font-display text-lg font-semibold tracking-tight">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {nav.slice(1).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active ? "bg-gold font-semibold text-maroon-deep" : "text-paper/80 hover:bg-white/10 hover:text-paper"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="rounded-md p-2 hover:bg-white/10 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-white/10 px-4 pb-4 xl:hidden" aria-label="Main">
          <ol className="grid gap-1 pt-2 sm:grid-cols-2">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    pathname === item.href ? "bg-gold font-semibold text-maroon-deep" : "hover:bg-white/10"
                  }`}
                >
                  <span className="font-mono text-xs opacity-60">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </header>
  );
}
