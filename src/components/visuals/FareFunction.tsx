"use client";

import { useState } from "react";

// Example rates only. Real fares are set by the LTFRB and change over time.
const BASE = 13;
const BASE_KM = 4;
const PER_KM = 1.8;
const MAX_KM = 20;

const fare = (d: number) => BASE + PER_KM * Math.max(0, Math.ceil(d) - BASE_KM);

export function FareFunction() {
  const [d, setD] = useState(7);
  const W = 320, H = 160;
  const x = (km: number) => (km / MAX_KM) * W;
  const maxFare = fare(MAX_KM);
  const y = (f: number) => H - (f / maxFare) * (H - 10);

  // Step function: flat inside each km, jumps at each whole km after the base distance.
  let path = `M 0 ${y(BASE)} L ${x(BASE_KM)} ${y(BASE)}`;
  for (let k = BASE_KM; k < MAX_KM; k++) path += ` L ${x(k)} ${y(fare(k + 1))} L ${x(k + 1)} ${y(fare(k + 1))}`;

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-center">
      <div>
        <p className="rounded-xl bg-paper p-4 font-mono text-sm leading-relaxed">
          f(d) = {BASE} + {PER_KM} · max(0, ⌈d⌉ − {BASE_KM})
        </p>
        <label htmlFor="fare-d" className="mt-4 block text-sm font-medium">
          Distance d = <span className="font-mono text-maroon">{d.toFixed(1)} km</span>
        </label>
        <input
          id="fare-d"
          type="range"
          min={0.5}
          max={MAX_KM}
          step={0.5}
          value={d}
          onChange={(e) => setD(Number(e.target.value))}
          className="mt-2 w-full accent-[var(--maroon)]"
        />
        <p className="mt-3 font-display text-3xl text-maroon">f({d}) = ₱{fare(d).toFixed(2)}</p>
        <p className="mt-2 text-sm text-muted">
          Every input distance gives exactly <strong>one</strong> fare, which is what makes it a function. It is
          piecewise: flat for the first {BASE_KM} km, then it steps up at every new kilometre. (Example rates only, not an
          official fare matrix.)
        </p>
      </div>
      <svg viewBox={`-28 -6 ${W + 40} ${H + 30}`} className="w-full" role="img" aria-label="Graph of fare against distance">
        <line x1="0" y1={H} x2={W} y2={H} stroke="var(--muted)" strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2={H} stroke="var(--muted)" strokeWidth="1" />
        {[0, 5, 10, 15, 20].map((k) => (
          <text key={k} x={x(k)} y={H + 16} fontSize="10" textAnchor="middle" fill="var(--muted)">
            {k} km
          </text>
        ))}
        {[BASE, Math.round(maxFare)].map((f) => (
          <text key={f} x={-6} y={y(f)} fontSize="10" textAnchor="end" dominantBaseline="middle" fill="var(--muted)">
            ₱{f}
          </text>
        ))}
        <path d={path} fill="none" stroke="var(--gold)" strokeWidth="2.5" />
        <line x1={x(d)} y1={H} x2={x(d)} y2={y(fare(d))} stroke="var(--maroon)" strokeDasharray="3 3" />
        <circle cx={x(d)} cy={y(fare(d))} r="5" fill="var(--maroon)" />
      </svg>
    </div>
  );
}
