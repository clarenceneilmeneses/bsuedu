import Link from "next/link";
import { Suspense } from "react";
import { SectionTitle } from "@/components/PageHero";
import { getStats } from "@/lib/stats";
import { site } from "@/lib/site";

const topics = [
  {
    letter: "A",
    title: "Math in Our World",
    items: "Patterns · Fibonacci · Math in daily life",
    href: "/explore#world",
    glyph: "1, 1, 2, 3, 5, 8",
  },
  {
    letter: "B",
    title: "Math Language & Symbols",
    items: "Symbols · Sets · Functions & relations",
    href: "/explore#language",
    glyph: "∀x ∈ A",
  },
  {
    letter: "C",
    title: "Problem Solving & Reasoning",
    items: "Inductive & deductive · Pólya's 4 steps · Puzzles",
    href: "/explore#reasoning",
    glyph: "2, 4, 8, 16, ?",
  },
];

const flow = [
  { step: "Math idea", href: "/explore", text: "Learn the big ideas" },
  { step: "Explain it", href: "/explore", text: "Interactive lessons" },
  { step: "You interact", href: "/interact", text: "Quiz, game, poll, puzzle" },
  { step: "We collect data", href: "/discover", text: "Every answer counts" },
  { step: "We interpret it", href: "/discover", text: "Live findings" },
];

const activities = [
  { title: "Symbol Quiz", kind: "Quiz", href: "/interact#symbol-quiz" },
  { title: "Pattern Hunt", kind: "Game", href: "/interact#pattern-hunt" },
  { title: "Choose Your Strategy", kind: "Reasoning", href: "/interact#polya" },
  { title: "Math-in-My-Life Poll", kind: "Survey", href: "/interact#poll" },
  { title: "What Kind of Mathematician?", kind: "Personality quiz", href: "/interact#personality" },
  { title: "Are You Golden?", kind: "Mini research", href: "/math-in-action#golden" },
  { title: "Freedom Wall", kind: "Community", href: "/community" },
  { title: "Math Shorts", kind: "Videos", href: "/shorts" },
];

async function LiveCount() {
  const stats = await getStats();
  if (!stats) return null;
  return (
    <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-paper/90">
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full bg-gold" />
      </span>
      <strong className="font-mono">{stats.totals.visitors}</strong> visitors have answered{" "}
      <strong className="font-mono">{stats.totals.responses}</strong> times so far
    </p>
  );
}

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-maroon text-paper">
        <div className="grid-paper-dark absolute inset-0" aria-hidden />
        <svg
          viewBox="0 0 400 400"
          className="absolute -right-28 -top-10 hidden w-[36rem] opacity-30 md:block"
          aria-hidden
        >
          {Array.from({ length: 260 }, (_, i) => {
            const r = 11.5 * Math.sqrt(i + 0.5);
            const t = i * 2.39996;
            return (
              <circle
                key={i}
                cx={(200 + r * Math.cos(t)).toFixed(2)}
                cy={(200 + r * Math.sin(t)).toFixed(2)}
                r={(2 + i / 90).toFixed(2)}
                fill="var(--gold)"
              />
            );
          })}
        </svg>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-soft">{site.course}</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
            Don&apos;t just read math.
            <span className="block text-gold-soft">Play with it.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/85">
            Hunt for patterns, decode math symbols, crack puzzles, and vote. Every answer you give becomes data, and we turn
            that data into real findings about how people think about math.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/interact"
              className="rounded-full bg-gold px-6 py-3 font-semibold text-maroon-deep shadow-lg shadow-black/20 transition hover:bg-gold-soft"
            >
              Start playing →
            </Link>
            <Link href="/explore" className="rounded-full border border-paper/40 px-6 py-3 font-semibold hover:bg-white/10">
              Explore the math
            </Link>
          </div>
          <Suspense fallback={null}>
            <LiveCount />
          </Suspense>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle kicker="How this site works" title="From a math idea to real data">
          Our site follows the same path a mathematician does.
        </SectionTitle>
        <ol className="mt-8 grid gap-3 sm:grid-cols-5">
          {flow.map((f, i) => (
            <li key={f.step}>
              <Link
                href={f.href}
                className="group flex h-full flex-col rounded-xl border border-line bg-card p-4 transition hover:-translate-y-0.5 hover:border-gold hover:shadow"
              >
                <span className="font-mono text-xs text-gold">0{i + 1}</span>
                <span className="mt-1 font-display text-lg font-semibold text-maroon">{f.step}</span>
                <span className="mt-1 text-sm text-muted">{f.text}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-maroon-deep py-16 text-paper">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Three topics</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">What you&apos;ll explore</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {topics.map((t) => (
              <Link key={t.letter} href={t.href} className="group text-center">
                <div className="hex mx-auto grid size-44 place-items-center bg-gold p-1.5 transition group-hover:scale-105">
                  <div className="hex grid size-full place-items-center bg-paper">
                    <span className="px-6 font-mono text-lg text-maroon">{t.glyph}</span>
                  </div>
                </div>
                <p className="mt-5 font-display text-xl text-gold-soft">
                  {t.letter}. {t.title}
                </p>
                <p className="mt-1 text-sm text-paper/70">{t.items}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle kicker="Things to do" title="Eight ways to think like a mathematician">
          Pick any. Each one takes about two minutes.
        </SectionTitle>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((a) => (
            <li key={a.title}>
              <Link
                href={a.href}
                className="flex h-full items-start justify-between gap-3 rounded-xl border border-line bg-card p-4 transition hover:border-gold hover:bg-gold/5"
              >
                <span>
                  <span className="block text-xs uppercase tracking-wider text-gold">{a.kind}</span>
                  <span className="mt-1 block font-semibold text-ink">{a.title}</span>
                </span>
                <span className="text-maroon" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <blockquote className="mt-12 border-l-4 border-gold pl-5 font-display text-2xl italic text-maroon sm:text-3xl">
          “Not the prettiest website, but one that makes visitors think like mathematicians.”
        </blockquote>
      </section>
    </>
  );
}
