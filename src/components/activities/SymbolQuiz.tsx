"use client";

import Link from "next/link";
import { useState } from "react";
import { symbolQuiz } from "@/lib/activities";
import { ActivityCard, ChoiceButton, GhostButton, PrimaryButton, SaveStatus, useRecord } from "./shared";

export function SymbolQuiz() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const { record, reset, ...save } = useRecord();

  const index = answers.length;
  const done = index === symbolQuiz.length;
  const q = symbolQuiz[Math.min(index, symbolQuiz.length - 1)];
  const score = answers.filter((a, i) => a === symbolQuiz[i].answer).length;

  function next() {
    if (picked === null) return;
    const all = [...answers, picked];
    setAnswers(all);
    setPicked(null);
    if (all.length === symbolQuiz.length) record({ activity: "symbol-quiz", answers: all });
  }

  function restart() {
    setAnswers([]);
    setPicked(null);
    reset();
  }

  return (
    <ActivityCard
      id="symbol-quiz"
      tag="Activity 1 · Quiz"
      title="Speak Math: The Symbol Quiz"
      topic="B · Language & Symbols"
      color="pool"
    >
      {!done ? (
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="h-4 flex-1 border-2 border-ink">
              <div className="h-full bg-sun transition-all" style={{ width: `${(index / symbolQuiz.length) * 100}%` }} />
            </div>
            <span className="font-mono text-sm font-semibold">
              {index + 1}/{symbolQuiz.length}
            </span>
          </div>
          <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">{q.prompt}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {q.choices.map((c, i) => (
              <ChoiceButton
                key={c}
                disabled={picked !== null}
                onClick={() => setPicked(i)}
                state={picked === null ? undefined : i === q.answer ? "right" : i === picked ? "wrong" : undefined}
              >
                {c}
              </ChoiceButton>
            ))}
          </div>
          {picked !== null && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-[3px] border-ink bg-mist p-4">
              <p>
                <strong>{picked === q.answer ? "Correct! " : "Not quite. "}</strong>
                {q.why}
              </p>
              <PrimaryButton onClick={next}>{index + 1 === symbolQuiz.length ? "See my score" : "Next →"}</PrimaryButton>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="grid size-40 place-items-center border-[3px] border-ink bg-sun">
            <div className="text-center">
              <p className="text-5xl font-extrabold">
                {score}/{symbolQuiz.length}
              </p>
              <p className="text-xs font-bold uppercase">score</p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-3xl font-extrabold tracking-tight">
              {score === symbolQuiz.length
                ? "Fluent in math! 🎓"
                : score >= 6
                  ? "You speak math well."
                  : score >= 4
                    ? "Conversational. Keep practising!"
                    : "Every language takes practice."}
            </p>
            <p className="text-muted">
              Math symbols are a language: short, precise and the same in every country. Review them on{" "}
              <Link href="/explore#language" className="link font-semibold text-ink">
                Explore Math
              </Link>
              .
            </p>
            <SaveStatus {...save} />
            <GhostButton onClick={restart}>Try again</GhostButton>
          </div>
        </div>
      )}
    </ActivityCard>
  );
}
