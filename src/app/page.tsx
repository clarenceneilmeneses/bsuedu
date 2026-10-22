import Link from "next/link";
import { Suspense } from "react";
import { HeroArt } from "@/components/HeroArt";
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
    color: "bg-leaf",
  },
  {
    letter: "B",
    title: "Math Language & Symbols",
    items: "Symbols · Sets · Functions & relations",
    href: "/explore#language",
    glyph: "∀x ∈ A",
    color: "bg-pool",
  },
  {
    letter: "C",
    title: "Problem Solving & Reasoning",
    items: "Inductive & deductive · Pólya's 4 steps · Puzzles",
    href: "/explore#reasoning",
    glyph: "2, 4, 8, 16, ?",
    color: "bg-flame",
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
  { title: "Symbol Quiz", kind: "Quiz", href: "/interact#symbol-quiz", hover: "hover:bg-pool" },
  { title: "Pattern Hunt", kind: "Game", href: "/interact#pattern-hunt", hover: "hover:bg-leaf" },
  { title: "Choose Your Strategy", kind: "Reasoning", href: "/interact#polya", hover: "hover:bg-flame" },
  { title: "Math-in-My-Life Poll", kind: "Survey", href: "/interact#poll", hover: "hover:bg-sun" },
  { title: "What Kind of Mathematician?", kind: "Personality quiz", href: "/interact#personality", hover: "hover:bg-blush" },
  { title: "Are You Golden?", kind: "Mini research", href: "/math-in-action#golden", hover: "hover:bg-sun" },
  { title: "Freedom Wall", kind: "Community", href: "/community", hover: "hover:bg-pool" },
  { title: "Math Shorts", kind: "Videos", href: "/shorts", hover: "hover:bg-leaf" },
];

async function LiveCount() {
  const stats = await getStats();
  if (!stats) return null;
  return (
    <p className="mt-8 inline-flex flex-wrap items-center gap-2 border-[3px] border-ink bg-paper px-4 py-2 font-semibold">
      <span className="relative flex size-3">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-flame opacity-75" />
        <span className="relative inline-flex size-3 rounded-full border-2 border-ink bg-flame" />
      </span>
      <span className="font-mono">{stats.totals.visitors}</span> {stats.totals.visitors === 1 ? "visitor" : "visitors"} ·{" "}
      <span className="font-mono">{stats.totals.responses}</span> {stats.totals.responses === 1 ? "answer" : "answers"} so far
    </p>
  );
}

export default function Home() {
  return (
    <>
      <section className="grid border-b-[3px] border-ink md:grid-cols-2">
        <div className="bg-pool px-5 py-14 sm:px-10 md:py-24 lg:px-16">
          <p className="text-sm font-bold uppercase tracking-wide">{site.course}</p>
          <h1 className="mt-6 text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-7xl">
            Don&apos;t just read math. Play with it.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed">
            Hunt for patterns, decode math symbols, crack puzzles, and vote. Every answer you give becomes data, and we turn
            that data into real findings about how people think about math.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/interact"
              className="border-[3px] border-ink bg-ink px-6 py-3 font-bold uppercase text-paper hover:bg-sun hover:text-ink"
            >
              Start playing →
            </Link>
            <Link href="/explore" className="border-[3px] border-ink bg-paper px-6 py-3 font-bold uppercase hover:bg-sun">
              Explore the math
            </Link>
          </div>
          <Suspense fallback={null}>
            <LiveCount />
          </Suspense>
        </div>
        <div className="relative min-h-72 border-t-[3px] border-ink md:border-t-0 md:border-l-[3px]">
          <HeroArt kind="fibonacci" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle kicker="How this site works" title="From a math idea to real data">
          Our site follows the same path a mathematician does.
        </SectionTitle>
        <ol className="mt-10 grid border-[3px] border-ink sm:grid-cols-5">
          {flow.map((f, i) => (
            <li key={f.step} className={`border-ink ${i > 0 ? "border-t-[3px] sm:border-t-0 sm:border-l-[3px]" : ""}`}>
              <Link href={f.href} className="flex h-full flex-col p-5 transition-colors hover:bg-sun">
                <span className="font-mono text-sm font-semibold">0{i + 1}</span>
                <span className="mt-2 text-xl font-extrabold leading-tight">{f.step}</span>
                <span className="mt-1 text-sm text-muted">{f.text}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid border-y-[3px] border-ink md:grid-cols-3">
        {topics.map((t, i) => (
          <Link
            key={t.letter}
            href={t.href}
            className={`group flex flex-col justify-between gap-10 p-8 sm:p-10 ${t.color} ${
              i > 0 ? "border-t-[3px] border-ink md:border-t-0 md:border-l-[3px]" : ""
            }`}
          >
            <span className="inline-block self-start border-[3px] border-ink bg-paper px-3 py-2 font-mono text-2xl font-semibold">
              {t.glyph}
            </span>
            <span>
              <span className="block text-sm font-bold uppercase">Topic {t.letter}</span>
              <span className="mt-1 block text-3xl font-extrabold leading-tight tracking-tight group-hover:underline">
                {t.title}
              </span>
              <span className="mt-2 block">{t.items}</span>
            </span>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle kicker="Things to do" title="Eight ways to think like a mathematician">
          Pick any. Each one takes about two minutes.
        </SectionTitle>
        <ul className="mt-10 grid border-l-[3px] border-t-[3px] border-ink sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((a) => (
            <li key={a.title} className="border-r-[3px] border-b-[3px] border-ink">
              <Link href={a.href} className={`flex h-full min-h-32 flex-col justify-between gap-4 p-5 transition-colors ${a.hover}`}>
                <span className="text-xs font-bold uppercase">{a.kind}</span>
                <span className="flex items-end justify-between gap-3 text-xl font-extrabold leading-tight">
                  {a.title}
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y-[3px] border-ink bg-sun px-4 py-16">
        <blockquote className="mx-auto max-w-4xl text-center text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          “Not the prettiest website, but one that makes visitors think like mathematicians.”
        </blockquote>
      </section>
    </>
  );
}
