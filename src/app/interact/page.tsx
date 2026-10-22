import type { Metadata } from "next";
import Link from "next/link";
import { MathPoll } from "@/components/activities/MathPoll";
import { PatternHunt } from "@/components/activities/PatternHunt";
import { PersonalityQuiz } from "@/components/activities/PersonalityQuiz";
import { PolyaStrategy } from "@/components/activities/PolyaStrategy";
import { SymbolQuiz } from "@/components/activities/SymbolQuiz";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Interact" };

const jump = [
  ["#symbol-quiz", "Quiz"],
  ["#pattern-hunt", "Game"],
  ["#polya", "Reasoning"],
  ["#poll", "Survey"],
  ["#personality", "Personality quiz"],
];

export default function InteractPage() {
  return (
    <>
      <PageHero number="03" eyebrow="Interact" title="Your turn. Play, answer, vote, solve.">
        Five activities. Your answers are saved anonymously (no names, no logins) and power the charts on{" "}
        <Link href="/discover" className="text-gold-soft underline underline-offset-4">
          What Did We Discover?
        </Link>
      </PageHero>

      <nav className="sticky top-[61px] z-30 border-b border-line bg-paper/90 backdrop-blur" aria-label="Activities">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 text-sm">
          {jump.map(([href, label], i) => (
            <a key={href} href={href} className="whitespace-nowrap rounded-full px-3 py-1.5 text-maroon hover:bg-maroon/10">
              <span className="font-mono text-xs text-gold">{i + 1}</span> {label}
            </a>
          ))}
          <Link href="/math-in-action#golden" className="whitespace-nowrap rounded-full px-3 py-1.5 text-maroon hover:bg-maroon/10">
            <span className="font-mono text-xs text-gold">+</span> Golden ratio research
          </Link>
          <Link href="/community" className="whitespace-nowrap rounded-full px-3 py-1.5 text-maroon hover:bg-maroon/10">
            <span className="font-mono text-xs text-gold">+</span> Freedom wall
          </Link>
        </div>
      </nav>

      <div className="mx-auto grid max-w-4xl gap-10 px-4 py-12">
        <SymbolQuiz />
        <PatternHunt />
        <PolyaStrategy />
        <MathPoll />
        <PersonalityQuiz />
      </div>
    </>
  );
}
