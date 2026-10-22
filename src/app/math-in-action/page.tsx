import type { Metadata } from "next";
import { GoldenRatio } from "@/components/activities/GoldenRatio";
import { PageHero, SectionTitle } from "@/components/PageHero";
import { FareFunction } from "@/components/visuals/FareFunction";
import { Sunflower } from "@/components/visuals/Sunflower";

export const metadata: Metadata = { title: "Math in Action" };

const careers = [
  { who: "Nurses", how: "Compute medicine dosages from body weight: a function with zero room for error.", color: "hover:bg-pool" },
  { who: "Engineers", how: "Model loads on bridges and buildings with functions and safety factors.", color: "hover:bg-sun" },
  { who: "Data analysts", how: "Use sets and logic to filter millions of records: customers who bought A ∩ B.", color: "hover:bg-leaf" },
  { who: "Game developers", how: "Use patterns, probability and coordinate geometry in every frame.", color: "hover:bg-flame" },
  { who: "Small business owners", how: "Use ratios and percentages to price products and track profit.", color: "hover:bg-blush" },
  { who: "Programmers", how: "Write if-then logic, the same deductive reasoning from Topic C.", color: "hover:bg-pool" },
];

const budget = [
  ["Understand", "Unknown: daily lunch budget. Given: ₱500 total, 5 days, ₱26 fare per day.", "bg-pool"],
  ["Plan", "Take out all the fare first, then share what's left equally across the days.", "bg-sun"],
  ["Carry out", "Fare: 5 × ₱26 = ₱130. Left: ₱500 − ₱130 = ₱370. Per day: ₱370 ÷ 5 = ₱74.", "bg-leaf"],
  ["Look back", "Check: 5 × (₱74 + ₱26) = 5 × ₱100 = ₱500 ✓. Same method works for any budget.", "bg-flame"],
];

export default function MathInActionPage() {
  return (
    <>
      <PageHero number="04" eyebrow="Math in Action" title="Math is already running your day" color="leaf" art="sunflower">
        Real-world uses of patterns, functions, sets and problem solving, with things you can try right now.
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle kicker="Patterns in nature · Topic A" title="Why sunflowers love 137.5°">
          A sunflower adds seeds one at a time, each turned by the same angle from the last. Which angle packs the most
          seeds? Drag the slider and find out.
        </SectionTitle>
        <div className="box mt-10 bg-paper p-5 sm:p-8">
          <Sunflower />
        </div>
      </section>

      <section className="border-y-[3px] border-ink bg-mist py-20">
        <div className="mx-auto max-w-4xl px-4">
          <GoldenRatio />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle kicker="Functions · Topic B" title="Your commute is a function">
          Distance goes in, fare comes out. Move the slider to see a piecewise function at work.
        </SectionTitle>
        <div className="box mt-10 bg-paper p-5 sm:p-8">
          <FareFunction />
        </div>
      </section>

      <section className="border-y-[3px] border-ink">
        <div className="border-b-[3px] border-ink bg-ink px-4 py-14 text-paper">
          <div className="mx-auto max-w-6xl">
            <p className="inline-block border-2 border-paper bg-sun px-2 py-0.5 text-xs font-bold uppercase text-ink">
              Problem solving · Topic C
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">Pólya at the grocery store</h2>
            <p className="mt-4 max-w-2xl text-lg text-paper/85">
              <em>“I have ₱500 for 5 days of lunch and fare. Fare is ₱26 a day. How much can I spend on lunch each day?”</em>
            </p>
          </div>
        </div>
        <ol className="grid gap-[3px] bg-ink sm:grid-cols-2 lg:grid-cols-4">
          {budget.map(([t, d, c], i) => (
            <li key={t} className={`p-7 ${c}`}>
              <span className="font-mono text-sm font-semibold">Step {i + 1}</span>
              <p className="mt-1 text-2xl font-extrabold">{t}</p>
              <p className="mt-2">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle kicker="Careers" title="Who uses this math at work?" />
        <ul className="mt-10 grid border-l-[3px] border-t-[3px] border-ink sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((c) => (
            <li key={c.who} className={`border-r-[3px] border-b-[3px] border-ink p-6 transition-colors ${c.color}`}>
              <p className="text-xl font-extrabold">{c.who}</p>
              <p className="mt-2">{c.how}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
