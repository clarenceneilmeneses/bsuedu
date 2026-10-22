import type { ReactElement } from "react";
import { fibonacciLayout } from "@/lib/fibonacci";

export type ArtKind = "fibonacci" | "symbols" | "sequence" | "sunflower" | "chart" | "wall" | "play" | "venn";

const INK = "var(--ink)";
const palette = ["var(--sun)", "var(--pool)", "var(--flame)", "var(--leaf)", "var(--ocean)", "var(--paper)", "var(--sun)"];
const f = (n: number) => n.toFixed(2);

const backgrounds: Record<ArtKind, string> = {
  fibonacci: "var(--blush)",
  symbols: "var(--mist)",
  sequence: "var(--sun)",
  sunflower: "var(--blush)",
  chart: "var(--mist)",
  wall: "var(--pool)",
  play: "var(--flame)",
  venn: "var(--paper)",
};

function Fibonacci() {
  const { squares, box } = fibonacciLayout(7);
  const k = 25;
  const tx = 300 - (box.minX + box.w / 2) * k;
  const ty = 250 - (box.minY + box.h / 2) * k;
  return (
    <g transform={`translate(${f(tx)} ${f(ty)}) scale(${k})`}>
      {squares.map((q, i) => (
        <rect key={i} x={q.x} y={q.y} width={q.s} height={q.s} fill={palette[i % palette.length]} stroke={INK} strokeWidth={4 / k} />
      ))}
      <path d={squares.map((q) => q.arc).join(" ")} fill="none" stroke={INK} strokeWidth={7 / k} strokeLinecap="round" />
    </g>
  );
}

function Symbols() {
  const glyphs = ["∈", "∀", "φ", "∑", "∩", "∃", "π", "⇒", "∅"];
  const fills = ["var(--pool)", "var(--paper)", "var(--sun)", "var(--flame)", "var(--leaf)", "var(--paper)", "var(--ocean)", "var(--blush)", "var(--sun)"];
  return (
    <g>
      {glyphs.map((g, i) => {
        const x = 75 + (i % 3) * 155;
        const y = 25 + Math.floor(i / 3) * 155;
        const dark = fills[i] === "var(--ocean)";
        return (
          <g key={g}>
            <rect x={x} y={y} width="140" height="140" fill={fills[i]} stroke={INK} strokeWidth="4" />
            <text
              x={x + 70}
              y={y + 72}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="84"
              fontWeight="800"
              fill={dark ? "var(--paper)" : INK}
            >
              {g}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Sequence() {
  const vals = [1, 1, 2, 3, 5, 8, 13];
  const fills = ["var(--pool)", "var(--leaf)", "var(--flame)", "var(--paper)", "var(--ocean)", "var(--blush)"];
  return (
    <g>
      <line x1="40" y1="450" x2="560" y2="450" stroke={INK} strokeWidth="5" />
      {vals.map((v, i) => {
        const h = (v / 13) * 340;
        const x = 54 + i * 72;
        const last = i === vals.length - 1;
        return (
          <g key={i}>
            <rect
              x={x}
              y={450 - h}
              width="60"
              height={h}
              fill={last ? "none" : fills[i % fills.length]}
              stroke={INK}
              strokeWidth="4"
              strokeDasharray={last ? "12 9" : undefined}
            />
            <text x={x + 30} y={450 - h - 18} textAnchor="middle" fontSize={last ? 56 : 30} fontWeight="800" fill={INK}>
              {last ? "?" : v}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Flower() {
  const seeds = Array.from({ length: 210 }, (_, i) => {
    const r = 10.2 * Math.sqrt(i + 0.5);
    const t = i * 2.39996;
    return { x: 300 + r * Math.cos(t), y: 250 + r * Math.sin(t), i };
  });
  return (
    <g>
      {Array.from({ length: 21 }, (_, i) => (
        <ellipse
          key={i}
          cx="300"
          cy="105"
          rx="34"
          ry="96"
          fill={i % 2 ? "var(--sun)" : "var(--flame)"}
          stroke={INK}
          strokeWidth="4"
          transform={`rotate(${f((360 / 21) * i)} 300 250)`}
        />
      ))}
      <circle cx="300" cy="250" r="158" fill="var(--ocean)" stroke={INK} strokeWidth="5" />
      {seeds.map((s) => (
        <circle key={s.i} cx={f(s.x)} cy={f(s.y)} r={f(3 + s.i / 70)} fill={s.i % 8 === 0 ? "var(--sun)" : "var(--leaf)"} />
      ))}
    </g>
  );
}

function Chart() {
  const bars = [190, 270, 140, 330, 230];
  const fills = ["var(--pool)", "var(--flame)", "var(--leaf)", "var(--sun)", "var(--blush)"];
  return (
    <g>
      <circle cx="455" cy="120" r="78" fill="var(--paper)" stroke={INK} strokeWidth="4" />
      <path d="M455 120 L455 42 A78 78 0 0 1 529 144 Z" fill="var(--flame)" stroke={INK} strokeWidth="4" />
      <path d="M455 120 L529 144 A78 78 0 0 1 400 175 Z" fill="var(--sun)" stroke={INK} strokeWidth="4" />
      {bars.map((h, i) => (
        <rect key={i} x={70 + i * 66} y={450 - h} width="50" height={h} fill={fills[i]} stroke={INK} strokeWidth="4" />
      ))}
      <path d="M50 60 L50 450 L560 450" fill="none" stroke={INK} strokeWidth="5" />
      <polyline
        points="95,300 161,220 227,330 293,150 359,240"
        fill="none"
        stroke={INK}
        strokeWidth="4"
        strokeDasharray="10 8"
      />
    </g>
  );
}

function Wall() {
  const notes = [
    { x: 70, y: 60, r: -6, c: "var(--sun)", t: "φ!" },
    { x: 250, y: 40, r: 4, c: "var(--paper)", t: "∀x" },
    { x: 410, y: 80, r: -3, c: "var(--blush)", t: "1,1,2…" },
    { x: 110, y: 260, r: 5, c: "var(--leaf)", t: "Why?" },
    { x: 300, y: 250, r: -5, c: "var(--flame)", t: "∴ 66" },
  ];
  return (
    <g>
      {notes.map((n) => (
        <g key={n.t} transform={`rotate(${n.r} ${n.x + 80} ${n.y + 80})`}>
          <rect x={n.x} y={n.y} width="160" height="160" fill={n.c} stroke={INK} strokeWidth="4" />
          <text x={n.x + 18} y={n.y + 58} fontSize="40" fontWeight="800" fill={INK}>
            {n.t}
          </text>
          <line x1={n.x + 18} y1={n.y + 98} x2={n.x + 140} y2={n.y + 98} stroke={INK} strokeWidth="4" />
          <line x1={n.x + 18} y1={n.y + 124} x2={n.x + 110} y2={n.y + 124} stroke={INK} strokeWidth="4" />
        </g>
      ))}
    </g>
  );
}

function Play() {
  return (
    <g>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={30 + i * 95} y="30" width="70" height="44" fill="var(--paper)" stroke={INK} strokeWidth="4" />
          <rect x={30 + i * 95} y="426" width="70" height="44" fill="var(--paper)" stroke={INK} strokeWidth="4" />
        </g>
      ))}
      <circle cx="300" cy="250" r="140" fill="var(--sun)" stroke={INK} strokeWidth="5" />
      <path d="M262 175 L392 250 L262 325 Z" fill={INK} />
    </g>
  );
}

function Venn() {
  return (
    <g style={{ mixBlendMode: "multiply" }}>
      <circle cx="230" cy="200" r="140" fill="var(--pool)" stroke={INK} strokeWidth="4" />
      <circle cx="370" cy="200" r="140" fill="var(--sun)" stroke={INK} strokeWidth="4" style={{ mixBlendMode: "multiply" }} />
      <circle cx="300" cy="320" r="140" fill="var(--blush)" stroke={INK} strokeWidth="4" style={{ mixBlendMode: "multiply" }} />
      {[
        ["A", 170, 160],
        ["B", 430, 160],
        ["C", 300, 410],
      ].map(([t, x, y]) => (
        <text key={t} x={x} y={y} textAnchor="middle" fontSize="48" fontWeight="800" fill={INK}>
          {t}
        </text>
      ))}
    </g>
  );
}

const art: Record<ArtKind, () => ReactElement> = {
  fibonacci: Fibonacci,
  symbols: Symbols,
  sequence: Sequence,
  sunflower: Flower,
  chart: Chart,
  wall: Wall,
  play: Play,
  venn: Venn,
};

export function HeroArt({ kind }: { kind: ArtKind }) {
  const Art = art[kind];
  return (
    <svg
      viewBox="0 0 600 500"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 size-full"
      style={{ background: backgrounds[kind] }}
      aria-hidden
    >
      <Art />
    </svg>
  );
}
