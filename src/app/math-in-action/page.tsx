import type { Metadata } from "next";
import { GoldenRatio } from "@/components/activities/GoldenRatio";
import { PageHero, SectionTitle } from "@/components/PageHero";
import { FareFunction } from "@/components/visuals/FareFunction";
import { Sunflower } from "@/components/visuals/Sunflower";

export const metadata: Metadata = { title: "Math in Action" };

const careers = [
  { who: "Nurses", how: "Compute medicine dosages from body weight: a function with zero room for error." },
  { who: "Engineers", how: "Model loads on bridges and buildings with functions and safety factors." },
  { who: "Data analysts", how: "Use sets and logic to filter millions of records: customers who bought A ∩ B." },
  { who: "Game developers", how: "Use patterns, probability and coordinate geometry in every frame." },
  { who: "Small business owners", how: "Use ratios and percentages to price products and track profit." },
  { who: "Programmers", how: "Write if-then logic, the same deductive reasoning from Topic C." },
];

export default function MathInActionPage() {
  return (
    <>
      <PageHero number="04" eyebrow="Math in Action" title="Math is already running your day">
        Real-world uses of patterns, functions, sets and problem solving, with things you can try right now.
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle kicker="Patterns in nature · Topic A" title="Why sunflowers love 137.5°">
          A sunflower adds seeds one at a time, each turned by the same angle from the last. Which angle packs the most
          seeds? Drag the slider and find out.
        </SectionTitle>
        <div className="mt-8 rounded-2xl border border-line bg-card p-6 sm:p-8">
          <Sunflower />
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="mx-auto max-w-4xl px-4">
          <GoldenRatio />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle kicker="Functions · Topic B" title="Your commute is a function">
          Distance goes in, fare comes out. Move the slider to see a piecewise function at work.
        </SectionTitle>
        <div className="mt-8 rounded-2xl border border-line bg-card p-6 sm:p-8">
          <FareFunction />
        </div>
      </section>

      <section className="bg-maroon-deep py-16 text-paper">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Problem solving · Topic C</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Pólya at the grocery store</h2>
          <p className="mt-3 max-w-2xl text-paper/80">
            <em>“I have ₱500 for 5 days of lunch and fare. Fare is ₱26 a day. How much can I spend on lunch each day?”</em>
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Understand", "Unknown: daily lunch budget. Given: ₱500 total, 5 days, ₱26 fare per day."],
              ["Plan", "Take out all the fare first, then share what's left equally across the days."],
              ["Carry out", "Fare: 5 × ₱26 = ₱130. Left: ₱500 − ₱130 = ₱370. Per day: ₱370 ÷ 5 = ₱74."],
              ["Look back", "Check: 5 × (₱74 + ₱26) = 5 × ₱100 = ₱500 ✓. Same method works for any budget."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-2xl border border-gold/30 bg-white/5 p-5">
                <span className="font-mono text-sm text-gold">Step {i + 1}</span>
                <p className="mt-1 font-display text-xl text-gold-soft">{t}</p>
                <p className="mt-2 text-sm text-paper/80">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle kicker="Careers" title="Who uses this math at work?" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((c) => (
            <li key={c.who} className="rounded-2xl border border-line bg-card p-5">
              <p className="font-display text-lg font-semibold text-maroon">{c.who}</p>
              <p className="mt-1 text-sm text-ink/80">{c.how}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
