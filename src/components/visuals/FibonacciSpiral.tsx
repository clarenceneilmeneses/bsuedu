"use client";

import { useState } from "react";

type Dir = "up" | "right" | "down" | "left";
const DIRS: Dir[] = ["up", "right", "down", "left"];

// Lays out Fibonacci squares in a spiral and returns each square plus the arc drawn inside it.
function layout(count: number) {
  const fib = [1, 1];
  while (fib.length < count) fib.push(fib[fib.length - 1] + fib[fib.length - 2]);

  const squares: { x: number; y: number; s: number; arc: string }[] = [];
  let minX = 0, minY = 0, maxX = 1, maxY = 1;

  for (let i = 0; i < count; i++) {
    const s = fib[i];
    const dir = DIRS[i % 4];
    let x = 0, y = 0;
    if (i > 0) {
      if (dir === "right") [x, y] = [maxX, minY];
      if (dir === "down") [x, y] = [minX, maxY];
      if (dir === "left") [x, y] = [minX - s, minY];
      if (dir === "up") [x, y] = [minX, minY - s];
    }
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + s);
    maxY = Math.max(maxY, y + s);

    const [from, to] = {
      up: [[x, y + s], [x + s, y]],
      right: [[x, y], [x + s, y + s]],
      down: [[x + s, y], [x, y + s]],
      left: [[x + s, y + s], [x, y]],
    }[dir];
    squares.push({ x, y, s, arc: `M ${from[0]} ${from[1]} A ${s} ${s} 0 0 1 ${to[0]} ${to[1]}` });
  }
  return { squares, box: { minX, minY, w: maxX - minX, h: maxY - minY }, fib: fib.slice(0, count) };
}

export function FibonacciSpiral() {
  const [n, setN] = useState(8);
  const { squares, box, fib } = layout(n);
  const pad = Math.max(box.w, box.h) * 0.04;
  const ratio = n > 1 ? fib[n - 1] / fib[n - 2] : 1;

  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
      <svg
        viewBox={`${box.minX - pad} ${box.minY - pad} ${box.w + pad * 2} ${box.h + pad * 2}`}
        className="aspect-[1.6] w-full rounded-xl bg-paper"
        role="img"
        aria-label={`Fibonacci spiral built from ${n} squares`}
      >
        {squares.map((q, i) => (
          <g key={i}>
            <rect
              x={q.x}
              y={q.y}
              width={q.s}
              height={q.s}
              fill={i === n - 1 ? "rgb(201 154 46 / 0.25)" : "rgb(110 15 18 / 0.04)"}
              stroke="var(--maroon)"
              strokeWidth={Math.max(box.w, box.h) / 300}
            />
            {q.s >= Math.max(box.w, box.h) / 14 && (
              <text
                x={q.x + q.s / 2}
                y={q.y + q.s / 2}
                fontSize={q.s / 3.2}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--maroon)"
                opacity={0.55}
                fontFamily="var(--font-mono)"
              >
                {q.s}
              </text>
            )}
          </g>
        ))}
        <path
          d={squares.map((q) => q.arc).join(" ")}
          fill="none"
          stroke="var(--gold)"
          strokeWidth={Math.max(box.w, box.h) / 110}
          strokeLinecap="round"
        />
      </svg>

      <div>
        <label htmlFor="fib-n" className="text-sm font-medium">
          Number of squares: <span className="font-mono text-maroon">{n}</span>
        </label>
        <input
          id="fib-n"
          type="range"
          min={2}
          max={12}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="mt-2 w-full accent-[var(--maroon)]"
        />
        <p className="mt-4 font-mono text-sm leading-relaxed text-ink/80">{fib.join(", ")}</p>
        <div className="mt-4 rounded-xl border border-line bg-white p-4">
          <p className="text-sm text-muted">Ratio of the last two squares</p>
          <p className="mt-1 font-display text-2xl text-maroon">
            {fib[n - 1]} ÷ {fib[n - 2]} = {ratio.toFixed(6)}
          </p>
          <p className="mt-1 text-sm text-muted">
            Slide right and watch it settle on <strong className="text-ink">φ ≈ 1.618034</strong>, the golden ratio.
          </p>
        </div>
      </div>
    </div>
  );
}
