"use client";

import { useState } from "react";
import { fibonacciLayout } from "@/lib/fibonacci";

const fills = ["var(--sun)", "var(--pool)", "var(--flame)", "var(--leaf)", "var(--blush)", "var(--paper)"];

export function FibonacciSpiral() {
  const [n, setN] = useState(8);
  const { squares, box, fib } = fibonacciLayout(n);
  const size = Math.max(box.w, box.h);
  const pad = size * 0.03;
  const ratio = n > 1 ? fib[n - 1] / fib[n - 2] : 1;

  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
      <svg
        viewBox={`${box.minX - pad} ${box.minY - pad} ${box.w + pad * 2} ${box.h + pad * 2}`}
        className="aspect-[1.6] w-full border-[3px] border-ink bg-paper"
        role="img"
        aria-label={`Fibonacci spiral built from ${n} squares`}
      >
        {squares.map((q, i) => (
          <g key={i}>
            <rect x={q.x} y={q.y} width={q.s} height={q.s} fill={fills[i % fills.length]} stroke="var(--ink)" strokeWidth={size / 160} />
            {q.s >= size / 14 && (
              <text
                x={q.x + q.s / 2}
                y={q.y + q.s / 2}
                fontSize={q.s / 3}
                fontWeight={800}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--ink)"
              >
                {q.s}
              </text>
            )}
          </g>
        ))}
        <path
          d={squares.map((q) => q.arc).join(" ")}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={size / 80}
          strokeLinecap="round"
        />
      </svg>

      <div>
        <label htmlFor="fib-n" className="font-bold uppercase">
          Number of squares: <span className="font-mono">{n}</span>
        </label>
        <input
          id="fib-n"
          type="range"
          min={2}
          max={12}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="mt-2 w-full accent-[var(--ink)]"
        />
        <p className="mt-4 font-mono text-sm leading-relaxed">{fib.join(", ")}</p>
        <div className="mt-4 border-[3px] border-ink bg-sun p-4">
          <p className="text-sm font-bold uppercase">Ratio of the last two squares</p>
          <p className="mt-1 text-2xl font-extrabold">
            {fib[n - 1]} ÷ {fib[n - 2]} = {ratio.toFixed(6)}
          </p>
          <p className="mt-1 text-sm">
            Slide right and watch it settle on <strong>φ ≈ 1.618034</strong>, the golden ratio.
          </p>
        </div>
      </div>
    </div>
  );
}
