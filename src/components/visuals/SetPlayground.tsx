"use client";

import { useState } from "react";

const U = Array.from({ length: 12 }, (_, i) => i + 1);
const fmt = (xs: number[]) => (xs.length ? `{${xs.join(", ")}}` : "∅");

export function SetPlayground() {
  const [a, setA] = useState<number[]>([1, 2, 3, 4, 6]);
  const [b, setB] = useState<number[]>([2, 4, 6, 8, 10, 12]);

  const toggle = (set: number[], x: number) =>
    set.includes(x) ? set.filter((y) => y !== x) : [...set, x].sort((p, q) => p - q);

  const results = [
    { sym: "A ∪ B", name: "union: in A or B", set: U.filter((x) => a.includes(x) || b.includes(x)), color: "bg-leaf" },
    { sym: "A ∩ B", name: "intersection: in both", set: U.filter((x) => a.includes(x) && b.includes(x)), color: "bg-sun" },
    { sym: "A − B", name: "difference: in A, not B", set: U.filter((x) => a.includes(x) && !b.includes(x)), color: "bg-blush" },
    { sym: "A′", name: "complement: not in A", set: U.filter((x) => !a.includes(x)), color: "bg-mist" },
  ];
  const subset = a.every((x) => b.includes(x));

  const row = (label: string, set: number[], setSet: (s: number[]) => void, on: string) => (
    <div>
      <p className="mb-2 font-mono">
        <strong>{label}</strong> = {fmt(set)}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {U.map((x) => (
          <button
            key={x}
            type="button"
            aria-pressed={set.includes(x)}
            onClick={() => setSet(toggle(set, x))}
            className={`size-10 border-2 border-ink font-mono font-semibold transition ${set.includes(x) ? on : "bg-paper hover:bg-mist"}`}
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
      {row("A", a, setA, "bg-pool")}
      {row("B", b, setB, "bg-flame")}
      <div className="grid gap-3 sm:grid-cols-2">
        {results.map((r) => (
          <div key={r.sym} className={`border-[3px] border-ink p-3 ${r.color}`}>
            <p className="font-mono">
              <strong>{r.sym}</strong> = {fmt(r.set)}
            </p>
            <p className="mt-0.5 text-sm">{r.name}</p>
          </div>
        ))}
      </div>
      <p>
        Is <span className="font-mono">A ⊆ B</span>? <strong>{subset ? "Yes" : "No"}</strong>
        {subset ? ", every element of A is also in B." : `, because ${a.find((x) => !b.includes(x))} ∈ A but ∉ B.`}
      </p>
    </div>
  );
}
