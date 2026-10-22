"use client";

import { useState } from "react";
import { reactions, type ReactionId } from "@/lib/activities";
import { useRecord } from "./shared";

export function ShortReactions({ video }: { video: string }) {
  const [chosen, setChosen] = useState<ReactionId | null>(null);
  const { record, pending, status } = useRecord();

  return (
    <div className="flex flex-wrap items-center gap-2">
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
          className={`border-2 border-ink px-3 py-1 text-sm font-semibold transition ${
            chosen === r.id ? "bg-sun" : "bg-paper hover:bg-pool/30"
          }`}
        >
          <span aria-hidden>{r.emoji}</span> {r.label}
        </button>
      ))}
      {status === "saved" && <span className="text-sm font-semibold">Thanks!</span>}
      {status === "error" && <span className="text-sm font-semibold">Not saved</span>}
    </div>
  );
}
