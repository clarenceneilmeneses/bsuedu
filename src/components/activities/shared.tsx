"use client";

import Link from "next/link";
import { useState, useTransition, type ReactNode } from "react";
import { recordResponse } from "@/app/actions";
import { getVisitorId } from "@/lib/visitor";

type Submission = Parameters<typeof recordResponse>[1];

export function useRecord() {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  function record(submission: Submission) {
    startTransition(async () => {
      try {
        const res = await recordResponse(getVisitorId(), submission);
        if (res.ok) setStatus("saved");
        else {
          setStatus("error");
          setError(res.error);
        }
      } catch {
        setStatus("error");
        setError("Network problem. Your answer wasn't saved.");
      }
    });
  }

  function reset() {
    setStatus("idle");
    setError("");
  }

  return { record, reset, pending, status, error };
}

export function SaveStatus({ pending, status, error }: { pending: boolean; status: string; error: string }) {
  if (pending) return <p className="text-sm font-medium">Saving your answer…</p>;
  if (status === "saved")
    return (
      <p className="border-2 border-ink bg-leaf px-3 py-1.5 text-sm font-semibold">
        ✓ Saved! It&apos;s now part of our{" "}
        <Link href="/discover" className="link">
          live findings
        </Link>
        .
      </p>
    );
  if (status === "error") return <p className="border-2 border-ink bg-flame px-3 py-1.5 text-sm font-semibold">{error}</p>;
  return null;
}

const tagColors = {
  pool: "bg-pool",
  sun: "bg-sun",
  leaf: "bg-leaf",
  flame: "bg-flame",
  blush: "bg-blush",
} as const;

export function ActivityCard({
  id,
  tag,
  title,
  topic,
  color = "pool",
  children,
}: {
  id: string;
  tag: string;
  title: string;
  topic: string;
  color?: keyof typeof tagColors;
  children: ReactNode;
}) {
  return (
    <section id={id} className="box scroll-mt-36 bg-paper">
      <header className={`flex flex-wrap items-end justify-between gap-3 border-b-[3px] border-ink px-5 py-5 sm:px-8 ${tagColors[color]}`}>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide">{tag}</p>
          <h3 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h3>
        </div>
        <span className="border-2 border-ink bg-paper px-2.5 py-1 text-xs font-bold uppercase">{topic}</span>
      </header>
      <div className="px-5 py-7 sm:px-8">{children}</div>
    </section>
  );
}

export function ChoiceButton({
  selected,
  state,
  onClick,
  disabled,
  children,
}: {
  selected?: boolean;
  state?: "right" | "wrong";
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  const look =
    state === "right"
      ? "bg-leaf"
      : state === "wrong"
        ? "bg-flame"
        : selected
          ? "bg-sun"
          : "bg-paper hover:bg-pool/25";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`w-full border-2 border-ink px-4 py-3 text-left font-medium transition-colors disabled:cursor-default ${look}`}
    >
      {children}
    </button>
  );
}

export function PrimaryButton({
  children,
  disabled,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 border-[3px] border-ink bg-ink px-5 py-2.5 font-bold uppercase tracking-tight text-paper transition hover:bg-sun hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-ink disabled:hover:text-paper"
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-[3px] border-ink bg-paper px-4 py-2 text-sm font-bold uppercase hover:bg-pool"
    >
      {children}
    </button>
  );
}
