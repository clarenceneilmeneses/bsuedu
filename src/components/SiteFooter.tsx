import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-maroon-deep text-paper/80">
      <div className="h-1.5 bg-gradient-to-r from-gold via-gold-soft to-gold" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-2xl text-paper">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm">{site.tagline}</p>
          <p className="mt-6 text-xs leading-relaxed text-paper/60">
            {site.course} · {site.instructor}
            <br />
            {site.school}
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-gold-soft">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
