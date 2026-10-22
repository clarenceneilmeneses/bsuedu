"use client";

import { useState } from "react";

const GOLDEN_ANGLE = 137.508;
const presets = [
  { label: "90°", angle: 90 },
  { label: "120°", angle: 120 },
  { label: "137.0°", angle: 137 },
  { label: "Golden 137.5°", angle: GOLDEN_ANGLE },
];

// Phyllotaxis: seed i sits at angle i·θ and radius √i, the model sunflowers follow.
export function Sunflower({ seeds = 420 }: { seeds?: number }) {
  const [angle, setAngle] = useState(GOLDEN_ANGLE);
  const rad = (angle * Math.PI) / 180;
  const isGolden = Math.abs(angle - GOLDEN_ANGLE) < 0.01;

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <svg
        viewBox="-110 -110 220 220"
        className="mx-auto w-full max-w-sm border-[3px] border-ink bg-blush"
        role="img"
        aria-label={`Seeds placed at ${angle}° apart`}
      >
        <circle r="104" fill="var(--ocean)" stroke="var(--ink)" strokeWidth="2.5" />
        {Array.from({ length: seeds }, (_, i) => {
          const r = 4.9 * Math.sqrt(i + 0.5);
          return (
            <circle
              key={i}
              cx={(r * Math.cos(i * rad)).toFixed(2)}
              cy={(r * Math.sin(i * rad)).toFixed(2)}
              r={(2.1 + i / seeds).toFixed(2)}
              fill={i % 21 === 0 ? "var(--flame)" : "var(--sun)"}
            />
          );
        })}
      </svg>
      <div>
        <p className="font-bold uppercase">
          Turn between seeds: <span className="font-mono">{angle.toFixed(3)}°</span>
        </p>
        <input
          type="range"
          aria-label="Angle between seeds"
          min={85}
          max={145}
          step={0.001}
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="mt-2 w-full accent-[var(--ink)]"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setAngle(p.angle)}
              className={`border-2 border-ink px-3 py-1 text-sm font-semibold ${
                Math.abs(angle - p.angle) < 0.001 ? "bg-sun" : "bg-paper hover:bg-pool/30"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <p className="mt-4">
          {isGolden
            ? "At the golden angle (360° ÷ φ² ≈ 137.5°) seeds never line up, so they pack with no wasted space. Count the spirals: you'll find Fibonacci numbers like 21, 34 and 55."
            : "At this angle, seeds line up in straight spokes or clumps, leaving gaps. Nature 'chose' the angle that wastes the least space."}
        </p>
      </div>
    </div>
  );
}
