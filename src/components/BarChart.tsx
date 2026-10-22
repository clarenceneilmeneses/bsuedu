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
    <ul className="grid gap-3">
      {data.map((d) => {
        const isTop = highlightTop && top > 0 && d.value === top;
        return (
          <li key={d.label} className="grid gap-1 text-sm sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-center sm:gap-3">
            <span className="truncate font-medium" title={d.label}>
              {d.label}
              {d.note && <span className="ml-1.5 border border-ink bg-sun px-1 font-mono text-xs">{d.note}</span>}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-6 flex-1 border-2 border-ink bg-paper">
                <span
                  className={`bar-fill block h-full ${isTop ? "bg-flame" : "bg-pool"} ${d.value ? "border-r-2 border-ink" : ""}`}
                  style={{ width: `${Math.min((d.value / scale) * 100, 100)}%` }}
                />
              </span>
              <span className="w-12 text-right font-mono font-semibold tabular-nums">
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
