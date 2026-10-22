"use client";

import { useState } from "react";
import { patternHunt } from "@/lib/activities";
import { ActivityCard, GhostButton, PrimaryButton, SaveStatus, useRecord } from "./shared";

export function PatternHunt() {
  const [guesses, setGuesses] = useState<string[]>(() => patternHunt.map(() => ""));
  const [checked, setChecked] = useState(false);
  const { record, reset, ...save } = useRecord();

  const filled = guesses.every((g) => g.trim() !== "" && Number.isInteger(Number(g)));
  const nums = guesses.map((g) => Number(g));
  const score = nums.filter((n, i) => n === patternHunt[i].next).length;

  function check() {
    setChecked(true);
    record({ activity: "pattern-hunt", guesses: nums });
  }

  function restart() {
    setGuesses(patternHunt.map(() => ""));
    setChecked(false);
    reset();
  }

  return (
    <ActivityCard id="pattern-hunt" tag="Activity 2 · Game" title="Pattern Hunt" topic="A · Math in Our World" color="leaf">
      <p className="mb-6 text-lg text-muted">
        Six sequences. One of them is the famous <strong className="text-ink">Fibonacci sequence</strong>. Type the next
        number in each, then check your answers.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {patternHunt.map((p, i) => {
          const right = checked && nums[i] === p.next;
          const bg = !checked ? "bg-paper" : right ? "bg-leaf" : "bg-flame";
          return (
            <div key={p.id} className={`border-[3px] border-ink p-4 ${bg}`}>
              <div className="flex flex-wrap items-center gap-2 font-mono text-lg font-semibold">
                {p.terms.map((t, j) => (
                  <span key={j} className="border-2 border-ink bg-paper px-2 py-0.5">
                    {t}
                  </span>
                ))}
                <label className="sr-only" htmlFor={`ph-${p.id}`}>
                  Next number in sequence {i + 1}
                </label>
                <input
                  id={`ph-${p.id}`}
                  inputMode="numeric"
                  value={guesses[i]}
                  disabled={checked}
                  onChange={(e) =>
                    setGuesses((g) => g.map((x, j) => (j === i ? e.target.value.replace(/[^\d-]/g, "") : x)))
                  }
                  placeholder="?"
                  className="w-20 border-[3px] border-ink bg-sun px-2 py-0.5 text-center outline-none placeholder:text-ink focus:bg-paper"
                />
              </div>
              {checked && (
                <p className="mt-3 text-sm">
                  <strong>{right ? "✓ Correct. " : `✗ It's ${p.next}. `}</strong>
                  {p.name}: {p.rule}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-4">
        {!checked ? (
          <PrimaryButton onClick={check} disabled={!filled}>
            Check my answers
          </PrimaryButton>
        ) : (
          <>
            <p className="text-2xl font-extrabold tracking-tight">
              You found {score} of {patternHunt.length} patterns.
            </p>
            <GhostButton onClick={restart}>Play again</GhostButton>
          </>
        )}
        <SaveStatus {...save} />
      </div>
    </ActivityCard>
  );
}
