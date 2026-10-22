import type { ReactNode } from "react";

export function PageHero({
  number,
  eyebrow,
  title,
  children,
}: {
  number: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-maroon text-paper">
      <div className="grid-paper-dark absolute inset-0" aria-hidden />
      <div className="hex absolute -right-24 top-1/2 hidden size-96 -translate-y-1/2 bg-gold/15 md:block" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-gold-soft">
          <span className="hex grid size-8 place-items-center bg-gold font-mono text-xs text-maroon-deep">{number}</span>
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          {title}
        </h1>
        {children && <div className="mt-5 max-w-2xl text-lg text-paper/80">{children}</div>}
      </div>
    </section>
  );
}

export function SectionTitle({ kicker, title, children }: { kicker?: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      {kicker && <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">{kicker}</p>}
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-maroon sm:text-4xl">{title}</h2>
      {children && <div className="mt-3 text-muted">{children}</div>}
    </div>
  );
}
