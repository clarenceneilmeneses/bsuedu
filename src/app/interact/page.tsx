import type { Metadata } from "next";
import Link from "next/link";
import { MathPoll } from "@/components/activities/MathPoll";
import { PatternHunt } from "@/components/activities/PatternHunt";
import { PersonalityQuiz } from "@/components/activities/PersonalityQuiz";
import { PolyaStrategy } from "@/components/activities/PolyaStrategy";
import { SymbolQuiz } from "@/components/activities/SymbolQuiz";
import { JumpBar, PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Interact" };

export default function InteractPage() {
  return (
    <>
      <PageHero number="03" eyebrow="Interact" title="Your turn. Play, answer, vote, solve." color="flame" art="sequence">
        Five activities. Your answers are saved anonymously (no names, no logins) and power the charts on{" "}
        <Link href="/discover" className="link font-bold">
          What Did We Discover?
        </Link>
      </PageHero>

      <JumpBar
        label="Activities"
        items={[
          { href: "#symbol-quiz", label: "1 · Quiz" },
          { href: "#pattern-hunt", label: "2 · Game" },
          { href: "#polya", label: "3 · Reasoning" },
          { href: "#poll", label: "4 · Survey" },
          { href: "#personality", label: "5 · Personality quiz" },
          { href: "/math-in-action#golden", label: "+ Golden ratio research" },
          { href: "/community", label: "+ Freedom wall" },
        ]}
      />

      <div className="mx-auto grid max-w-4xl gap-12 px-4 py-14">
        <SymbolQuiz />
        <PatternHunt />
        <PolyaStrategy />
        <MathPoll />
        <PersonalityQuiz />
      </div>
    </>
  );
}
