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

  return (
    <ActivityCard id="golden" tag="Mini research" title="Are You Golden? φ ≈ 1.618" topic="A · Math in Our World">
      <p className="text-muted">
        A popular claim says the human body follows the golden ratio:{" "}
        <em>total height ÷ height of your navel from the floor ≈ 1.618</em>. Is it true? Measure yourself (in cm, no shoes)
        and help us test it with real data.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">Your height (cm)</span>
          <input
            inputMode="decimal"
            value={height}
            onChange={(e) => setHeight(e.target.value.replace(/[^\d.]/g, "").slice(0, 5))}
            placeholder="e.g. 160"
            className="mt-1 w-full rounded-lg border-2 border-gold/60 bg-white px-3 py-2 font-mono outline-none focus:border-maroon"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Floor to navel (cm)</span>
          <input
            inputMode="decimal"
            value={navel}
            onChange={(e) => setNavel(e.target.value.replace(/[^\d.]/g, "").slice(0, 5))}
            placeholder="e.g. 98"
            className="mt-1 w-full rounded-lg border-2 border-gold/60 bg-white px-3 py-2 font-mono outline-none focus:border-maroon"
          />
        </label>
      </div>

      {height && navel && !valid && (
        <p className="mt-3 text-sm text-red-800">Those numbers look off. Check your measurements (navel height must be less than height).</p>
      )}

      {ratio && diff !== null && (
        <div className="mt-6 rounded-xl bg-paper p-5">
          <p className="font-display text-3xl text-maroon">
            {h} ÷ {n} = <strong>{ratio.toFixed(3)}</strong>
          </p>
          <div className="relative mt-6 h-2 rounded-full bg-line">
            <span className="absolute -top-6 -translate-x-1/2 text-xs font-semibold text-gold" style={{ left: pos(PHI) }}>
              φ
            </span>
            <span className="absolute top-1/2 h-5 w-0.5 -translate-y-1/2 bg-gold" style={{ left: pos(PHI) }} />
            <span
              className="hex absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 bg-maroon transition-all"
              style={{ left: pos(ratio) }}
            />
          </div>
          <div className="mt-1 flex justify-between font-mono text-xs text-muted">
            <span>1.3</span>
            <span>1.9</span>
          </div>
          <p className="mt-3 text-sm text-ink/80">
            {diff <= 0.02
              ? "Wow, almost exactly golden!"
              : diff <= 0.05
                ? "Very close to the golden ratio."
                : `You're ${diff.toFixed(2)} away from φ. That's completely normal. Real bodies vary!`}
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
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
