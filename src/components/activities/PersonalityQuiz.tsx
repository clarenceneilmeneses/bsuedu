"use client";

import { useState } from "react";
import { mathTypes, personalityQuiz, personalityResult, type MathType } from "@/lib/activities";
import { ActivityCard, ChoiceButton, GhostButton, SaveStatus, useRecord } from "./shared";

const typeColor: Record<MathType, string> = {
  pattern: "bg-leaf",
  language: "bg-pool",
  logic: "bg-sun",
  strategist: "bg-flame",
};

export function PersonalityQuiz() {
  const [picks, setPicks] = useState<MathType[]>([]);
  const { record, reset, ...save } = useRecord();

  const done = picks.length === personalityQuiz.length;
  const q = personalityQuiz[Math.min(picks.length, personalityQuiz.length - 1)];
  const resultType = done ? personalityResult(picks) : null;
  const result = resultType ? mathTypes[resultType] : null;

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
      color="blush"
    >
      {!done ? (
        <div>
          <p className="font-mono text-sm font-semibold">
            Question {picks.length + 1} of {personalityQuiz.length}
          </p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{q.prompt}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {q.options.map((o) => (
              <ChoiceButton key={o.label} onClick={() => pick(o.type)}>
                {o.label}
              </ChoiceButton>
            ))}
          </div>
          {picks.length > 0 && (
            <div className="mt-5">
              <GhostButton onClick={() => setPicks((p) => p.slice(0, -1))}>← Back</GhostButton>
            </div>
          )}
        </div>
      ) : (
        result &&
        resultType && (
          <div className={`border-[3px] border-ink p-6 sm:p-8 ${typeColor[resultType]}`}>
            <p className="text-sm font-bold uppercase">You are…</p>
            <p className="mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl">{result.title}</p>
            <p className="mt-4 max-w-xl text-lg">{result.blurb}</p>
            <p className="mt-2 font-semibold italic">{result.hero}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <SaveStatus {...save} />
              <GhostButton
                onClick={() => {
                  setPicks([]);
                  reset();
                }}
              >
                Take it again
              </GhostButton>
            </div>
          </div>
        )
      )}
    </ActivityCard>
  );
}
