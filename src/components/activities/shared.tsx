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
  if (pending) return <p className="text-sm text-muted">Saving your answer…</p>;
  if (status === "saved")
    return (
      <p className="text-sm text-emerald-800">
        ✓ Saved! Your answer is now part of our{" "}
        <Link href="/discover" className="font-semibold underline decoration-gold underline-offset-2">
          live findings
        </Link>
        .
      </p>
    );
  if (status === "error") return <p className="text-sm text-red-800">{error}</p>;
  return null;
}

export function ActivityCard({
  id,
  tag,
  title,
  topic,
  children,
}: {
  id: string;
  tag: string;
  title: string;
  topic: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-card shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-paper/60 px-5 py-4 sm:px-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{tag}</p>
          <h3 className="font-display text-2xl font-semibold text-maroon">{title}</h3>
        </div>
        <span className="rounded-full bg-maroon/10 px-3 py-1 text-xs font-medium text-maroon">{topic}</span>
      </header>
      <div className="px-5 py-6 sm:px-7">{children}</div>
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
      ? "border-emerald-700 bg-emerald-50 text-emerald-900"
      : state === "wrong"
        ? "border-red-700 bg-red-50 text-red-900"
        : selected
          ? "border-maroon bg-maroon text-paper"
          : "border-line bg-white hover:border-gold hover:bg-gold/10";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`w-full rounded-xl border-2 px-4 py-3 text-left transition-colors disabled:cursor-default ${look}`}
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
      className="inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-2.5 font-semibold text-paper shadow-sm transition hover:bg-maroon-soft disabled:cursor-not-allowed disabled:opacity-40"
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
      className="rounded-full border border-maroon/30 px-4 py-2 text-sm font-medium text-maroon hover:bg-maroon/5"
    >
      {children}
    </button>
  );
}
