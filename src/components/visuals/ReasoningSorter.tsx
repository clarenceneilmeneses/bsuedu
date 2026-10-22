"use client";

import { useState } from "react";

type Kind = "inductive" | "deductive";

const items: { text: string; kind: Kind; why: string }[] = [
  {
    text: "The sun has risen every day of my life, so it will rise tomorrow.",
    kind: "inductive",
    why: "A general conclusion from many observations. Very likely, but not proven.",
  },
  {
    text: "All mammals breathe air. A whale is a mammal. So a whale breathes air.",
    kind: "deductive",
    why: "A specific conclusion that must follow from general premises.",
  },
  {
    text: "1 + 3 = 4, 1 + 3 + 5 = 9, 1 + 3 + 5 + 7 = 16, so the first n odd numbers add up to n².",
    kind: "inductive",
    why: "A pattern turned into a conjecture. It happens to be true, but a proof is still needed.",
  },
  {
    text: "Every even number is divisible by 2. 1,024 is even. Therefore 1,024 is divisible by 2.",
    kind: "deductive",
    why: "Applies a general rule to one case, so the conclusion is guaranteed.",
  },
  {
    text: "My last three jeepney rides cost the same, so every jeepney ride costs the same.",
    kind: "inductive",
    why: "Generalising from a few cases. One longer ride is a counterexample.",
  },
];

export function ReasoningSorter() {
  const [answers, setAnswers] = useState<(Kind | null)[]>(() => items.map(() => null));
  const score = answers.filter((a, i) => a === items[i].kind).length;
  const done = answers.every(Boolean);

  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const a = answers[i];
        return (
          <div key={i} className="rounded-xl border border-line bg-white p-4">
            <p className="text-ink">“{it.text}”</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {(["inductive", "deductive"] as Kind[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  disabled={a !== null}
                  onClick={() => setAnswers((prev) => prev.map((x, j) => (j === i ? k : x)))}
                  className={`rounded-full border px-3 py-1 text-sm capitalize ${
                    a === null
                      ? "border-line hover:border-gold"
                      : k === it.kind
                        ? "border-emerald-700 bg-emerald-50 text-emerald-900"
                        : a === k
                          ? "border-red-700 bg-red-50 text-red-900"
                          : "border-line opacity-50"
                  }`}
                >
                  {k}
                </button>
              ))}
              {a && <span className="text-sm text-muted">{it.why}</span>}
            </div>
          </div>
        );
      })}
      {done && (
        <p className="font-display text-xl text-maroon">
          {score}/{items.length} sorted correctly.{" "}
          <button
            type="button"
            className="text-sm font-sans text-muted underline"
            onClick={() => setAnswers(items.map(() => null))}
          >
            reset
          </button>
        </p>
      )}
    </div>
  );
}
