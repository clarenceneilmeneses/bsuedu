import type { Bar } from "@/lib/stats";

// Horizontal bar chart drawn with plain HTML so it is readable on any screen.
export function BarChart({
  data,
  unit = "",
  max,
  highlightTop = true,
}: {
  data: Bar[];
  unit?: string;
  max?: number;
  highlightTop?: boolean;
}) {
  const top = Math.max(...data.map((d) => d.value), 0);
  const scale = max ?? (top || 1);
  return (
    <ul className="grid gap-2.5">
      {data.map((d) => {
        const isTop = highlightTop && top > 0 && d.value === top;
        return (
          <li key={d.label} className="grid gap-1 text-sm sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-center sm:gap-3">
            <span className="truncate text-ink/80" title={d.label}>
              {d.label}
              {d.note && <span className="ml-1.5 rounded bg-gold/20 px-1 font-mono text-xs text-maroon">{d.note}</span>}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-5 flex-1 overflow-hidden rounded-sm bg-line/60">
                <span
                  className={`bar-fill block h-full rounded-sm ${isTop ? "bg-maroon" : "bg-gold"}`}
                  style={{ width: `${Math.max((d.value / scale) * 100, d.value ? 2 : 0)}%` }}
                />
              </span>
              <span className="w-12 text-right font-mono tabular-nums text-ink">
                {d.value}
                {unit}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
