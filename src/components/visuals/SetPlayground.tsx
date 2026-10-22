"use client";

import { useState } from "react";

const U = Array.from({ length: 12 }, (_, i) => i + 1);
const fmt = (xs: number[]) => (xs.length ? `{${xs.join(", ")}}` : "∅");

export function SetPlayground() {
  const [a, setA] = useState<number[]>([1, 2, 3, 4, 6]);
  const [b, setB] = useState<number[]>([2, 4, 6, 8, 10, 12]);

  const toggle = (set: number[], x: number) => (set.includes(x) ? set.filter((y) => y !== x) : [...set, x].sort((p, q) => p - q));

  const results = [
    { sym: "A ∪ B", name: "union: in A or B", set: U.filter((x) => a.includes(x) || b.includes(x)) },
    { sym: "A ∩ B", name: "intersection: in both", set: U.filter((x) => a.includes(x) && b.includes(x)) },
    { sym: "A − B", name: "difference: in A, not B", set: U.filter((x) => a.includes(x) && !b.includes(x)) },
    { sym: "A′", name: "complement: not in A", set: U.filter((x) => !a.includes(x)) },
  ];
  const subset = a.every((x) => b.includes(x));

  const row = (label: string, set: number[], setSet: (s: number[]) => void, tone: string) => (
    <div>
      <p className="mb-2 font-mono text-sm">
        <strong className="text-maroon">{label}</strong> = {fmt(set)}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {U.map((x) => (
          <button
            key={x}
            type="button"
            aria-pressed={set.includes(x)}
            onClick={() => setSet(toggle(set, x))}
            className={`size-9 rounded-lg border font-mono text-sm transition ${set.includes(x) ? tone : "border-line bg-white text-muted hover:border-gold"}`}
          >
            {x}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <p className="font-mono text-sm text-muted">U = {"{1, 2, …, 12}"} · tap numbers to put them in A or B</p>
      {row("A", a, setA, "border-maroon bg-maroon text-paper")}
      {row("B", b, setB, "border-gold bg-gold text-maroon-deep")}
      <div className="grid gap-2 sm:grid-cols-2">
        {results.map((r) => (
          <div key={r.sym} className="rounded-xl border border-line bg-white p-3">
            <p className="font-mono text-sm">
              <strong className="text-maroon">{r.sym}</strong> = {fmt(r.set)}
            </p>
            <p className="mt-0.5 text-xs text-muted">{r.name}</p>
          </div>
        ))}
      </div>
      <p className="text-sm">
        Is <span className="font-mono">A ⊆ B</span>?{" "}
        <strong className={subset ? "text-emerald-800" : "text-maroon"}>{subset ? "Yes" : "No"}</strong>
        <span className="text-muted">
          {subset ? ", every element of A is also in B." : `, because ${a.find((x) => !b.includes(x))} ∈ A but ∉ B.`}
        </span>
      </p>
    </div>
  );
}
