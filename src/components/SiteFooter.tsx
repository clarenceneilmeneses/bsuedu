import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t-[3px] border-ink bg-ink text-paper">
      <div className="grid md:grid-cols-[1.2fr_2fr]">
        <div className="border-b-[3px] border-paper/20 p-8 md:border-r-[3px] md:border-b-0">
          <p className="text-3xl font-extrabold uppercase leading-none tracking-tight">
            Math <span className="text-sun">in</span>
            <br />
            Motion
          </p>
          <p className="mt-4 max-w-sm text-paper/75">{site.tagline}</p>
          <p className="mt-8 text-sm text-paper/60">
            {site.course}
            <br />
            {site.instructor} · {site.school}
          </p>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-4">
          {nav.map((item, i) => (
            <li key={item.href} className="border-b border-r border-paper/15">
              <Link href={item.href} className="flex h-full flex-col gap-1 p-5 hover:bg-paper hover:text-ink">
                <span className="font-mono text-xs opacity-60">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-bold uppercase">{item.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
