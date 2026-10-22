export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <polygon points="10,2 30,2 40,20 30,38 10,38 0,20" fill="var(--gold)" />
      <polygon points="11.5,5 28.5,5 36.5,20 28.5,35 11.5,35 3.5,20" fill="var(--maroon)" />
      <text x="20" y="27" textAnchor="middle" fontSize="20" fontFamily="var(--font-display)" fill="var(--gold-soft)">
        φ
      </text>
    </svg>
  );
}
