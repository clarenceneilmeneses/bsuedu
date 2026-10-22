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
    <ActivityCard id="symbol-quiz" tag="Activity 1 · Quiz" title="Speak Math: The Symbol Quiz" topic="B · Language & Symbols">
      {!done ? (
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-1.5 flex-1 rounded-full bg-line">
              <div
                className="h-full rounded-full bg-gold transition-all"
                style={{ width: `${(index / symbolQuiz.length) * 100}%` }}
              />
            </div>
            <span className="font-mono text-xs text-muted">
              {index + 1}/{symbolQuiz.length}
            </span>
          </div>
          <p className="font-display text-xl text-ink sm:text-2xl">{q.prompt}</p>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
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
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-paper p-4">
              <p className="text-sm">
                <strong className={picked === q.answer ? "text-emerald-800" : "text-red-800"}>
                  {picked === q.answer ? "Correct! " : "Not quite. "}
                </strong>
                {q.why}
              </p>
              <PrimaryButton onClick={next}>{index + 1 === symbolQuiz.length ? "See my score" : "Next →"}</PrimaryButton>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="hex grid size-36 place-items-center bg-maroon text-paper">
            <div className="text-center">
              <p className="font-display text-4xl font-semibold">
                {score}/{symbolQuiz.length}
              </p>
              <p className="text-xs uppercase tracking-widest text-gold-soft">score</p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-display text-2xl text-maroon">
              {score === symbolQuiz.length
                ? "Fluent in math! 🎓"
                : score >= 6
                  ? "You speak math well."
                  : score >= 4
                    ? "Conversational. Keep practising!"
                    : "Every language takes practice."}
            </p>
            <p className="text-muted">
              Math symbols are a language: short, precise and the same in every country. Review them on the{" "}
              <Link href="/explore#language" className="underline decoration-gold underline-offset-2">
                Explore Math
              </Link>{" "}
              page.
            </p>
            <SaveStatus {...save} />
            <GhostButton onClick={restart}>Try again</GhostButton>
          </div>
        </div>
      )}
    </ActivityCard>
  );
}
