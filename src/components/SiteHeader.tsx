"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-paper">
      <div className="flex h-[72px] items-stretch">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center border-r-[3px] border-ink px-4 hover:bg-sun sm:px-5"
          aria-label="Math in Motion home"
        >
          <Logo />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 px-4 xl:flex" aria-label="Main">
          {nav.slice(1).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap px-3 py-2 text-[15px] font-bold uppercase tracking-tight ${
                  active ? "underline decoration-[3px] underline-offset-[10px]" : "hover:underline hover:decoration-2 hover:underline-offset-[10px]"
                }`}
              >
                {item.short}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-stretch border-l-[3px] border-ink xl:ml-0">
          <Link
            href="/interact"
            className="hidden items-center gap-2 px-6 text-[15px] font-bold uppercase hover:bg-pool sm:flex"
          >
            <span aria-hidden className="grid size-7 place-items-center rounded-full border-2 border-ink text-xs">
              ▶
            </span>
            Play now
          </Link>
          <button
            type="button"
            className="flex items-center px-5 hover:bg-sun sm:border-l-[3px] sm:border-ink xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t-[3px] border-ink xl:hidden" aria-label="Main">
          <ol className="grid sm:grid-cols-2">
            {nav.map((item, i) => (
              <li key={item.href} className="border-b-2 border-ink sm:odd:border-r-2">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`flex items-center gap-4 px-5 py-4 text-lg font-bold uppercase ${
                    pathname === item.href ? "bg-sun" : "hover:bg-pool"
                  }`}
                >
                  <span className="font-mono text-sm font-normal">{String(i + 1).padStart(2, "0")}</span>
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
