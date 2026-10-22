"use client";

import { useRef, useState, useTransition } from "react";
import { postToWall } from "@/app/actions";
import { getVisitorId } from "@/lib/visitor";

const prompts = [
  "Where did you see math today?",
  "What surprised you on this site?",
  "Share a math joke, tip, or puzzle!",
  "What finally made a math idea click for you?",
];

export function WallForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const [promptIndex, setPromptIndex] = useState(0);

  function submit(formData: FormData) {
    startTransition(async () => {
      try {
        const res = await postToWall(getVisitorId(), formData);
        if (res.ok) {
          formRef.current?.reset();
          setMessage("");
          setResult({ ok: true, text: "Posted to the wall! 🎉" });
        } else setResult({ ok: false, text: res.error });
      } catch {
        setResult({ ok: false, text: "Network problem. Please try again." });
      }
    });
  }

  return (
    <form ref={formRef} action={submit} className="rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6">
      <p className="font-display text-2xl text-maroon">Write on the wall</p>
      <p className="mt-1 text-sm text-muted">
        Prompt: {prompts[promptIndex]}{" "}
        <button
          type="button"
          onClick={() => setPromptIndex((i) => (i + 1) % prompts.length)}
          className="text-maroon underline decoration-gold underline-offset-2"
        >
          another
        </button>
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="sr-only">Your name</span>
          <input
            name="name"
            maxLength={40}
            placeholder="Your name or nickname (optional)"
            className="w-full rounded-lg border-2 border-line bg-white px-3 py-2 outline-none focus:border-maroon"
          />
        </label>
        <label className="block">
          <span className="sr-only">Topic</span>
          <select
            name="topic"
            defaultValue="general"
            className="w-full rounded-lg border-2 border-line bg-white px-3 py-2 outline-none focus:border-maroon"
          >
            <option value="general">💬 General</option>
            <option value="patterns">🌻 Patterns</option>
            <option value="language">∈ Math language</option>
            <option value="reasoning">🧩 Reasoning</option>
          </select>
        </label>
      </div>
      <label className="mt-3 block">
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          required
          maxLength={280}
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message…"
          className="w-full resize-none rounded-lg border-2 border-line bg-white px-3 py-2 outline-none focus:border-maroon"
        />
      </label>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <span className={`font-mono text-xs ${message.length > 260 ? "text-red-800" : "text-muted"}`}>{message.length}/280</span>
        <div className="flex items-center gap-3">
          {result && <span className={`text-sm ${result.ok ? "text-emerald-800" : "text-red-800"}`}>{result.text}</span>}
          <button
            type="submit"
            disabled={pending || message.trim().length < 2}
            className="rounded-full bg-maroon px-5 py-2.5 font-semibold text-paper hover:bg-maroon-soft disabled:opacity-40"
          >
            {pending ? "Posting…" : "Post it"}
          </button>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted">Be kind. Posts are public and may be removed by the group if they break the rules.</p>
    </form>
  );
}
