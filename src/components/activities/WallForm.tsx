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

const field = "w-full border-[3px] border-ink bg-paper px-3 py-2.5 outline-none focus:bg-sun/20";

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
    <form ref={formRef} action={submit} className="box bg-paper">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-[3px] border-ink bg-sun px-5 py-4 sm:px-6">
        <p className="text-2xl font-extrabold tracking-tight">Write on the wall</p>
        <button
          type="button"
          onClick={() => setPromptIndex((i) => (i + 1) % prompts.length)}
          className="border-2 border-ink bg-paper px-2.5 py-1 text-xs font-bold uppercase hover:bg-pool"
        >
          New prompt ↻
        </button>
      </div>
      <div className="p-5 sm:p-6">
        <p className="font-semibold">Prompt: {prompts[promptIndex]}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="block">
            <span className="sr-only">Your name</span>
            <input name="name" maxLength={40} placeholder="Your name or nickname (optional)" className={field} />
          </label>
          <label className="block">
            <span className="sr-only">Topic</span>
            <select name="topic" defaultValue="general" className={field}>
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
            className={`${field} resize-none`}
          />
        </label>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <span className={`font-mono text-sm ${message.length > 260 ? "bg-flame px-1" : ""}`}>{message.length}/280</span>
          <div className="flex flex-wrap items-center gap-3">
            {result && (
              <span className={`border-2 border-ink px-2 py-1 text-sm font-semibold ${result.ok ? "bg-leaf" : "bg-flame"}`}>
                {result.text}
              </span>
            )}
            <button
              type="submit"
              disabled={pending || message.trim().length < 2}
              className="border-[3px] border-ink bg-ink px-5 py-2.5 font-bold uppercase text-paper hover:bg-sun hover:text-ink disabled:opacity-30 disabled:hover:bg-ink disabled:hover:text-paper"
            >
              {pending ? "Posting…" : "Post it"}
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">Be kind. Posts are public and may be removed by the group if they break the rules.</p>
      </div>
    </form>
  );
}
