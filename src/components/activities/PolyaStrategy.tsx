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
    <ActivityCard id="polya" tag="Activity 3 · Reasoning" title="Choose Your Strategy" topic="C · Problem Solving">
      <ol className="mb-6 grid grid-cols-4 gap-2" aria-label="Pólya's four steps">
        {steps.map((s, i) => (
          <li key={s} className="text-center">
            <div className={`h-1.5 rounded-full ${i <= step - (step === 4 ? 1 : 0) ? "bg-gold" : "bg-line"}`} />
            <p className={`mt-1.5 text-xs ${i === step ? "font-semibold text-maroon" : "text-muted"}`}>
              {i + 1}. {s}
            </p>
          </li>
        ))}
      </ol>

      <blockquote className="rounded-xl border-l-4 border-gold bg-paper p-4 font-display text-lg text-ink sm:text-xl">
        🤝 {polya.problem}
      </blockquote>

      {step === 0 && (
        <div className="mt-6">
          <p className="font-semibold">{polya.understand.prompt}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {polya.understand.choices.map((c, i) => (
              <ChoiceButton key={c} selected={understood === i} onClick={() => setUnderstood(i)}>
                {c}
              </ChoiceButton>
            ))}
          </div>
          {understood !== null && (
            <p className="mt-3 text-sm text-muted">
              {understood === polya.understand.answer
                ? "Exactly. Every handshake is one pair of people."
                : "Hmm, think again: one handshake = one pair of people. We're counting pairs."}
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
        <div className="mt-6">
          <p className="font-semibold">Step 2 · Devise a plan. Which strategy will you use?</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
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
        <div className="mt-6">
          <p className="font-semibold">Step 3 · Carry out the plan.</p>
          <p className="mt-2 rounded-lg bg-gold/10 p-3 text-sm">
            <strong>Hint for “{chosen.label}”:</strong> {chosen.hint}
          </p>
          <label className="mt-4 block text-sm font-medium" htmlFor="polya-answer">
            How many handshakes?
          </label>
          <input
            id="polya-answer"
            inputMode="numeric"
            value={answer}
            onChange={(e) => setAnswer(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="mt-1 w-40 rounded-lg border-2 border-gold/60 bg-white px-3 py-2 font-mono text-lg outline-none focus:border-maroon"
          />
          <div className="mt-5">
            <PrimaryButton disabled={!answer} onClick={() => setStep(3)}>
              Next: look back →
            </PrimaryButton>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6">
          <p className="font-semibold">Step 4 · Look back. How sure are you that {answer} is right?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => finish(c)}
                className="hex grid size-14 place-items-center bg-gold/20 font-display text-xl text-maroon transition hover:bg-gold"
              >
                {c}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">1 = pure guess · 5 = I could prove it</p>
        </div>
      )}

      {step === 4 && (
        <div className="mt-6 space-y-4">
          <p className={`font-display text-2xl ${correct ? "text-emerald-800" : "text-maroon"}`}>
            {correct ? `Yes, ${polya.answer} handshakes! 🎉` : `You said ${answer}. The answer is ${polya.answer}.`}
          </p>
          <p className="text-ink/80">{polya.solution}</p>
          <p className="text-sm text-muted">
            You used <strong>{chosen?.label.toLowerCase()}</strong> with confidence {confidence}/5. On the findings page we
            compare which strategies led visitors to the right answer most often.
          </p>
          <SaveStatus {...save} />
          <GhostButton onClick={restart}>Try a different strategy</GhostButton>
        </div>
      )}
    </ActivityCard>
  );
}
