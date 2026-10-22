"use client";

import { useState } from "react";
import { mathTypes, personalityQuiz, personalityResult, type MathType } from "@/lib/activities";
import { ActivityCard, ChoiceButton, GhostButton, SaveStatus, useRecord } from "./shared";

export function PersonalityQuiz() {
  const [picks, setPicks] = useState<MathType[]>([]);
  const { record, reset, ...save } = useRecord();

  const done = picks.length === personalityQuiz.length;
  const q = personalityQuiz[Math.min(picks.length, personalityQuiz.length - 1)];
  const result = done ? mathTypes[personalityResult(picks)] : null;

  function pick(t: MathType) {
    const all = [...picks, t];
    setPicks(all);
    if (all.length === personalityQuiz.length) record({ activity: "mathematician-type", picks: all });
  }

  return (
    <ActivityCard
      id="personality"
      tag="Activity 5 · Personality quiz"
      title="What Kind of Mathematician Are You?"
      topic="A · B · C"
    >
      {!done ? (
        <div>
          <p className="font-mono text-xs text-muted">
            Question {picks.length + 1} of {personalityQuiz.length}
          </p>
          <p className="mt-1 font-display text-xl sm:text-2xl">{q.prompt}</p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {q.options.map((o) => (
              <ChoiceButton key={o.label} onClick={() => pick(o.type)}>
                {o.label}
              </ChoiceButton>
            ))}
          </div>
        </div>
      ) : (
        result && (
          <div className="relative overflow-hidden rounded-2xl bg-maroon p-6 text-paper sm:p-8">
            <div className="hex absolute -right-10 -top-10 size-40 bg-gold/20" aria-hidden />
            <p className="text-sm uppercase tracking-[0.18em] text-gold-soft">You are…</p>
            <p className="mt-1 font-display text-4xl font-semibold">{result.title}</p>
            <p className="mt-3 max-w-xl text-paper/85">{result.blurb}</p>
            <p className="mt-2 text-sm italic text-gold-soft">{result.hero}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 [&_p]:text-paper/90 [&_a]:text-gold-soft">
              <SaveStatus {...save} />
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => {
                  setPicks([]);
                  reset();
                }}
                className="rounded-full border border-gold/60 px-4 py-2 text-sm text-gold-soft hover:bg-white/10"
              >
                Take it again
              </button>
            </div>
          </div>
        )
      )}
      {!done && picks.length > 0 && (
        <div className="mt-4">
          <GhostButton onClick={() => setPicks((p) => p.slice(0, -1))}>← Back</GhostButton>
        </div>
      )}
    </ActivityCard>
  );
}
