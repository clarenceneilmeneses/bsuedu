"use client";

import { useState } from "react";
import { PHI } from "@/lib/activities";
import { ActivityCard, PrimaryButton, SaveStatus, useRecord } from "./shared";

export function GoldenRatio() {
  const [height, setHeight] = useState("");
  const [navel, setNavel] = useState("");
  const { record, ...save } = useRecord();

  const h = Number(height);
  const n = Number(navel);
  const valid = h >= 80 && h <= 230 && n >= 40 && n < h && h / n >= 1.2 && h / n <= 2.2;
  const ratio = valid ? h / n : null;
  const diff = ratio ? Math.abs(ratio - PHI) : null;
  // Map ratios 1.3–1.9 onto the track.
  const pos = (x: number) => `${Math.min(Math.max(((x - 1.3) / 0.6) * 100, 0), 100)}%`;

  const field = "mt-2 w-full border-[3px] border-ink bg-paper px-3 py-2 font-mono text-lg outline-none focus:bg-sun/20";

  return (
    <ActivityCard id="golden" tag="Mini research" title="Are You Golden? φ ≈ 1.618" topic="A · Math in Our World" color="sun">
      <p className="text-lg text-muted">
        A popular claim says the human body follows the golden ratio:{" "}
        <em className="text-ink">total height ÷ height of your navel from the floor ≈ 1.618</em>. Is it true? Measure
        yourself (in cm, no shoes) and help us test it with real data.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block font-semibold">
          Your height (cm)
          <input
            inputMode="decimal"
            value={height}
            onChange={(e) => setHeight(e.target.value.replace(/[^\d.]/g, "").slice(0, 5))}
            placeholder="e.g. 160"
            className={field}
          />
        </label>
        <label className="block font-semibold">
          Floor to navel (cm)
          <input
            inputMode="decimal"
            value={navel}
            onChange={(e) => setNavel(e.target.value.replace(/[^\d.]/g, "").slice(0, 5))}
            placeholder="e.g. 98"
            className={field}
          />
        </label>
      </div>

      {height && navel && !valid && (
        <p className="mt-4 border-2 border-ink bg-flame px-3 py-2 text-sm font-semibold">
          Those numbers look off. Check your measurements (navel height must be less than height).
        </p>
      )}

      {ratio && diff !== null && (
        <div className="mt-6 border-[3px] border-ink bg-mist p-5">
          <p className="text-3xl font-extrabold tracking-tight">
            {h} ÷ {n} = <span className="bg-sun px-1">{ratio.toFixed(3)}</span>
          </p>
          <div className="relative mt-9 h-4 border-2 border-ink bg-paper">
            <span className="absolute -top-7 -translate-x-1/2 text-sm font-extrabold" style={{ left: pos(PHI) }}>
              φ
            </span>
            <span className="absolute -top-1 h-5 w-1 -translate-x-1/2 bg-ink" style={{ left: pos(PHI) }} />
            <span
              className="absolute top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-ink bg-flame transition-all"
              style={{ left: pos(ratio) }}
            />
          </div>
          <div className="mt-1 flex justify-between font-mono text-xs">
            <span>1.3</span>
            <span>1.9</span>
          </div>
          <p className="mt-4">
            {diff <= 0.02
              ? "Wow, almost exactly golden!"
              : diff <= 0.05
                ? "Very close to the golden ratio."
                : `You're ${diff.toFixed(2)} away from φ. That's completely normal. Real bodies vary!`}
          </p>
        </div>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        {save.status !== "saved" && (
          <PrimaryButton
            disabled={!valid || save.pending}
            onClick={() => record({ activity: "golden-ratio", height: h, navel: n })}
          >
            Add my ratio to the research
          </PrimaryButton>
        )}
        <SaveStatus {...save} />
      </div>
    </ActivityCard>
  );
}
