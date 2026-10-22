import type { ReactNode } from "react";
import { HeroArt, type ArtKind } from "./HeroArt";

const panel = {
  pool: "bg-pool text-ink",
  sun: "bg-sun text-ink",
  leaf: "bg-leaf text-ink",
  flame: "bg-flame text-ink",
  blush: "bg-blush text-ink",
  ocean: "bg-ocean text-paper",
} as const;

export type PanelColor = keyof typeof panel;

// Split hero: a solid colour block with the text, and a flat illustration beside it.
export function PageHero({
  number,
  eyebrow,
  title,
  color,
  art,
  children,
}: {
  number: string;
  eyebrow: string;
  title: ReactNode;
  color: PanelColor;
  art: ArtKind;
  children?: ReactNode;
}) {
  return (
    <section className="grid border-b-[3px] border-ink md:grid-cols-2">
      <div className={`${panel[color]} px-5 py-12 sm:px-10 md:py-20 lg:px-16`}>
        <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide">
          <span className="grid h-8 min-w-8 place-items-center border-2 border-current px-1 font-mono text-xs">{number}</span>
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">{title}</h1>
        {children && <div className="mt-6 max-w-xl text-lg leading-relaxed">{children}</div>}
      </div>
      <div className="relative min-h-64 border-t-[3px] border-ink md:min-h-full md:border-t-0 md:border-l-[3px]">
        <HeroArt kind={art} />
      </div>
    </section>
  );
}

export function SectionTitle({ kicker, title, children }: { kicker?: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="max-w-3xl">
      {kicker && (
        <p className="inline-block border-2 border-ink bg-sun px-2 py-0.5 text-xs font-bold uppercase tracking-wide">{kicker}</p>
      )}
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h2>
      {children && <div className="mt-4 text-lg leading-relaxed text-muted">{children}</div>}
    </div>
  );
}

// Boxed "jump to" bar, styled like a filter bar.
export function JumpBar({ label = "Jump to", items }: { label?: string; items: { href: string; label: string }[] }) {
  return (
    <div className="sticky top-[75px] z-30 border-b-[3px] border-ink bg-paper">
      <nav className="mx-auto flex max-w-6xl items-center gap-3 overflow-x-auto px-4 py-3" aria-label={label}>
        <span className="shrink-0 text-sm font-extrabold uppercase">{label}</span>
        {items.map((it) => (
          <a
            key={it.href}
            href={it.href}
            className="shrink-0 border-2 border-ink px-3 py-1.5 text-sm font-semibold whitespace-nowrap hover:bg-sun"
          >
            {it.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
