"use client";

import { useState } from "react";
import { polya, type StrategyId } from "@/lib/activities";
import { ActivityCard, ChoiceButton, GhostButton, PrimaryButton, SaveStatus, useRecord } from "./shared";

const steps = ["Understand", "Plan", "Carry out", "Look back"];

export function PolyaStrategy() {
  const [step, setStep] = useState(0);
  const [understood, setUnderstood] = useState<number | null>(null);
  const [strategy, setStrategy] = useState<StrategyId | null>(null);
  const [answer, setAnswer] = useState("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const { record, reset, ...save } = useRecord();

  const chosen = polya.strategies.find((s) => s.id === strategy);
  const correct = Number(answer) === polya.answer;

  function finish(c: number) {
    setConfidence(c);
    setStep(4);
    record({
      activity: "polya-strategy",
      understood: understood!,
      strategy: strategy!,
      answer: Number(answer),
      confidence: c,
    });
  }

  function restart() {
    setStep(0);
    setUnderstood(null);
    setStrategy(null);
    setAnswer("");
    setConfidence(null);
    reset();
  }

  return (
    <ActivityCard id="polya" tag="Activity 3 · Reasoning" title="Choose Your Strategy" topic="C · Problem Solving" color="flame">
      <ol className="mb-6 grid grid-cols-4 border-[3px] border-ink" aria-label="Pólya's four steps">
        {steps.map((s, i) => {
          const reached = step === 4 || i <= step;
          return (
            <li
              key={s}
              aria-current={i === step ? "step" : undefined}
              className={`border-ink px-2 py-2 text-center text-xs font-bold uppercase sm:text-sm ${i > 0 ? "border-l-[3px]" : ""} ${
                i === step ? "bg-sun" : reached ? "bg-leaf" : "bg-paper"
              }`}
            >
              <span className="font-mono">{i + 1}</span> {s}
            </li>
          );
        })}
      </ol>

      <blockquote className="border-[3px] border-ink bg-mist p-5 text-xl font-bold leading-snug sm:text-2xl">
        🤝 {polya.problem}
      </blockquote>

      {step === 0 && (
        <div className="mt-7">
          <p className="font-bold">{polya.understand.prompt}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {polya.understand.choices.map((c, i) => (
              <ChoiceButton key={c} selected={understood === i} onClick={() => setUnderstood(i)}>
                {c}
              </ChoiceButton>
            ))}
          </div>
          {understood !== null && (
            <p className="mt-3 text-muted">
              {understood === polya.understand.answer
                ? "Exactly. Every handshake is one pair of people."
                : "Think again: one handshake = one pair of people. We're counting pairs."}
            </p>
          )}
          <div className="mt-5">
            <PrimaryButton disabled={understood === null} onClick={() => setStep(1)}>
              Next: make a plan →
            </PrimaryButton>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="mt-7">
          <p className="font-bold">Step 2 · Devise a plan. Which strategy will you use?</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {polya.strategies.map((s) => (
              <ChoiceButton key={s.id} selected={strategy === s.id} onClick={() => setStrategy(s.id)}>
                {s.label}
              </ChoiceButton>
            ))}
          </div>
          <div className="mt-5">
            <PrimaryButton disabled={!strategy} onClick={() => setStep(2)}>
              Next: solve it →
            </PrimaryButton>
          </div>
        </div>
      )}

      {step === 2 && chosen && (
        <div className="mt-7">
          <p className="font-bold">Step 3 · Carry out the plan.</p>
          <p className="mt-3 border-l-[6px] border-ink bg-sun/40 p-3">
            <strong>Hint for “{chosen.label}”:</strong> {chosen.hint}
          </p>
          <label className="mt-5 block font-semibold" htmlFor="polya-answer">
            How many handshakes?
          </label>
          <input
            id="polya-answer"
            inputMode="numeric"
            value={answer}
            onChange={(e) => setAnswer(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="mt-2 w-44 border-[3px] border-ink bg-paper px-3 py-2 font-mono text-xl outline-none focus:bg-sun/20"
          />
          <div className="mt-5">
            <PrimaryButton disabled={!answer} onClick={() => setStep(3)}>
              Next: look back →
            </PrimaryButton>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-7">
          <p className="font-bold">Step 4 · Look back. How sure are you that {answer} is right?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => finish(c)}
                className="grid size-14 place-items-center border-[3px] border-ink bg-paper text-2xl font-extrabold transition hover:bg-sun"
              >
                {c}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted">1 = pure guess · 5 = I could prove it</p>
        </div>
      )}

      {step === 4 && (
        <div className="mt-7 space-y-4">
          <p className={`inline-block border-[3px] border-ink px-3 py-1 text-2xl font-extrabold ${correct ? "bg-leaf" : "bg-sun"}`}>
            {correct ? `Yes, ${polya.answer} handshakes! 🎉` : `You said ${answer}. The answer is ${polya.answer}.`}
          </p>
          <p className="text-lg">{polya.solution}</p>
          <p className="text-muted">
            You used <strong className="text-ink">{chosen?.label.toLowerCase()}</strong> with confidence {confidence}/5. On the
            findings page we compare which strategies led visitors to the right answer most often.
          </p>
          <SaveStatus {...save} />
          <GhostButton onClick={restart}>Try a different strategy</GhostButton>
        </div>
      )}
    </ActivityCard>
  );
}
