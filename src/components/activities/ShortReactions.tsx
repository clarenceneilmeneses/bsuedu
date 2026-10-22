"use client";

import { useState } from "react";
import { reactions, type ReactionId } from "@/lib/activities";
import { useRecord } from "./shared";

export function ShortReactions({ video }: { video: string }) {
  const [chosen, setChosen] = useState<ReactionId | null>(null);
  const { record, pending, status } = useRecord();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted">How was it?</span>
      {reactions.map((r) => (
        <button
          key={r.id}
          type="button"
          disabled={pending}
          aria-pressed={chosen === r.id}
          onClick={() => {
            setChosen(r.id);
            record({ activity: "short-reaction", video, reaction: r.id });
          }}
          className={`rounded-full border px-3 py-1 text-sm transition ${
            chosen === r.id ? "border-maroon bg-maroon text-paper" : "border-line bg-white hover:border-gold"
          }`}
        >
          <span aria-hidden>{r.emoji}</span> {r.label}
        </button>
      ))}
      {status === "saved" && <span className="text-xs text-emerald-800">Thanks!</span>}
      {status === "error" && <span className="text-xs text-red-800">Not saved</span>}
    </div>
  );
}
