"use server";

import { refresh } from "next/cache";
import { supabase } from "@/lib/supabase";
import {
  mathTypes,
  patternHunt,
  personalityQuiz,
  personalityResult,
  polya,
  poll,
  reactions,
  scorePatternHunt,
  scoreSymbolQuiz,
  shorts,
  symbolQuiz,
  type MathType,
} from "@/lib/activities";

export type ActionResult = { ok: true } | { ok: false; error: string };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const isInt = (v: unknown, min: number, max: number): v is number =>
  Number.isInteger(v) && (v as number) >= min && (v as number) <= max;

const oneOf = <T extends string>(v: unknown, ids: readonly T[]): v is T =>
  typeof v === "string" && (ids as readonly string[]).includes(v);

type Submission =
  | { activity: "symbol-quiz"; answers: number[] }
  | { activity: "pattern-hunt"; guesses: number[] }
  | { activity: "polya-strategy"; understood: number; strategy: string; answer: number; confidence: number }
  | { activity: "math-poll"; whereMath: string; confidence: number; knewFib: boolean; topic: string }
  | { activity: "mathematician-type"; picks: string[] }
  | { activity: "golden-ratio"; height: number; navel: number }
  | { activity: "short-reaction"; video: string; reaction: string };

type Row = { data: Record<string, unknown>; score?: number; max_score?: number };

// Validates the raw submission and turns it into the row we store. Scores are
// always computed here on the server so visitors can't post fake results.
function toRow(s: Submission): Row | null {
  switch (s.activity) {
    case "symbol-quiz": {
      const a = s.answers;
      if (!Array.isArray(a) || a.length !== symbolQuiz.length || !a.every((x) => isInt(x, 0, 3))) return null;
      const correct = symbolQuiz.map((q, i) => a[i] === q.answer);
      return { data: { answers: a, correct }, score: scoreSymbolQuiz(a), max_score: symbolQuiz.length };
    }
    case "pattern-hunt": {
      const g = s.guesses;
      if (!Array.isArray(g) || g.length !== patternHunt.length || !g.every((x) => isInt(x, -1e6, 1e6))) return null;
      const { correct, score } = scorePatternHunt(g);
      return { data: { guesses: g, correct }, score, max_score: patternHunt.length };
    }
    case "polya-strategy": {
      const ids = polya.strategies.map((x) => x.id);
      if (!isInt(s.understood, 0, 3) || !oneOf(s.strategy, ids) || !isInt(s.answer, 0, 1e6) || !isInt(s.confidence, 1, 5))
        return null;
      const correct = s.answer === polya.answer;
      return {
        data: {
          understood: s.understood === polya.understand.answer,
          strategy: s.strategy,
          answer: s.answer,
          correct,
          confidence: s.confidence,
        },
        score: correct ? 1 : 0,
        max_score: 1,
      };
    }
    case "math-poll": {
      if (
        !oneOf(s.whereMath, poll.whereMath.options.map((o) => o.id)) ||
        !isInt(s.confidence, 1, 5) ||
        typeof s.knewFib !== "boolean" ||
        !oneOf(s.topic, poll.topic.options.map((o) => o.id))
      )
        return null;
      return { data: { whereMath: s.whereMath, confidence: s.confidence, knewFib: s.knewFib, topic: s.topic } };
    }
    case "mathematician-type": {
      const types = Object.keys(mathTypes) as MathType[];
      const p = s.picks;
      if (!Array.isArray(p) || p.length !== personalityQuiz.length || !p.every((x) => oneOf(x, types))) return null;
      return { data: { picks: p, result: personalityResult(p as MathType[]) } };
    }
    case "golden-ratio": {
      const { height, navel } = s;
      if (typeof height !== "number" || typeof navel !== "number") return null;
      if (!(height >= 80 && height <= 230 && navel >= 40 && navel < height)) return null;
      const ratio = Math.round((height / navel) * 1000) / 1000;
      if (ratio < 1.2 || ratio > 2.2) return null; // almost certainly a typo
      return { data: { height, navel, ratio } };
    }
    case "short-reaction": {
      if (!oneOf(s.video, shorts.map((v) => v.id)) || !oneOf(s.reaction, reactions.map((r) => r.id))) return null;
      return { data: { video: s.video, reaction: s.reaction } };
    }
    default:
      return null;
  }
}

export async function recordResponse(visitorId: string, submission: Submission): Promise<ActionResult> {
  if (!UUID.test(visitorId)) return { ok: false, error: "Invalid visitor." };
  const row = toRow(submission);
  if (!row) return { ok: false, error: "That answer doesn't look right. Please check and try again." };
  if (!supabase) return { ok: false, error: "The database isn't connected yet." };

  const { error } = await supabase.from("activity_responses").insert({
    activity: submission.activity,
    visitor_id: visitorId,
    ...row,
  });
  if (error) {
    console.error("recordResponse", error);
    return { ok: false, error: "Couldn't save your answer. Please try again." };
  }
  return { ok: true };
}

/* ---------- Freedom wall ---------- */

const BLOCKED = /\b(fuck|shit|bitch|putang|puta|gago|tangina|bobo|tanga)\w*/i;
const TOPICS = ["general", "patterns", "language", "reasoning"] as const;

export async function postToWall(visitorId: string, formData: FormData): Promise<ActionResult> {
  if (!UUID.test(visitorId)) return { ok: false, error: "Invalid visitor." };
  const name = String(formData.get("name") ?? "").trim().slice(0, 40) || "Anonymous mathematician";
  const message = String(formData.get("message") ?? "").trim();
  const topic = String(formData.get("topic") ?? "general");

  if (message.length < 2) return { ok: false, error: "Write a message first." };
  if (message.length > 280) return { ok: false, error: "Keep it under 280 characters." };
  if (!oneOf(topic, TOPICS)) return { ok: false, error: "Pick a topic." };
  if (BLOCKED.test(message) || BLOCKED.test(name)) return { ok: false, error: "Let's keep the wall kind. Please rephrase." };
  if (!supabase) return { ok: false, error: "The database isn't connected yet." };

  // Light spam guard: one post per visitor every 30 seconds.
  const since = new Date(Date.now() - 30_000).toISOString();
  const { count } = await supabase
    .from("wall_posts")
    .select("id", { count: "exact", head: true })
    .eq("visitor_id", visitorId)
    .gte("created_at", since);
  if (count) return { ok: false, error: "You just posted! Wait a few seconds before posting again." };

  const { error } = await supabase.from("wall_posts").insert({ visitor_id: visitorId, name, message, topic });
  if (error) {
    console.error("postToWall", error);
    return { ok: false, error: "Couldn't post your message. Please try again." };
  }
  refresh();
  return { ok: true };
}
