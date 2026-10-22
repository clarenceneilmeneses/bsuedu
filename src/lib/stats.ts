import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { supabase } from "./supabase";
import {
  PHI,
  mathTypes,
  patternHunt,
  polya,
  poll,
  reactions,
  shorts,
  symbolQuiz,
  type ActivityId,
  type MathType,
} from "./activities";

// Below this many responses we don't state a finding — too few to mean anything.
export const MIN_N = 5;

type Row = {
  activity: ActivityId;
  visitor_id: string;
  data: Record<string, unknown>;
  score: number | null;
  created_at: string;
};

export type Bar = { label: string; value: number; note?: string };

const pct = (part: number, whole: number) => (whole ? Math.round((part / whole) * 100) : 0);
const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const median = (xs: number[]) => {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

// One response per visitor: their first attempt (fair for quizzes) or latest (for opinions).
function perVisitor(rows: Row[], keep: "first" | "latest") {
  const map = new Map<string, Row>();
  for (const r of rows) if (keep === "latest" || !map.has(r.visitor_id)) map.set(r.visitor_id, r);
  return [...map.values()];
}

// cache() dedupes calls within one request (e.g. several tallies on the Shorts page).
export const getStats = cache(async function getStats() {
  await connection();
  if (!supabase) return null;

  const [{ data, error }, wall] = await Promise.all([
    supabase
      .from("activity_responses")
      .select("activity, visitor_id, data, score, created_at")
      .order("created_at", { ascending: true })
      .limit(10000),
    supabase.from("wall_posts").select("id", { count: "exact", head: true }).eq("hidden", false),
  ]);
  if (error) {
    console.error("getStats", error);
    return null;
  }

  const rows = (data ?? []) as Row[];
  const by = (a: ActivityId) => rows.filter((r) => r.activity === a);

  /* Symbol quiz */
  const quiz = perVisitor(by("symbol-quiz"), "first");
  const quizItems: Bar[] = symbolQuiz.map((q, i) => ({
    label: q.prompt.replace(/\s+/g, " "),
    value: pct(quiz.filter((r) => (r.data.correct as boolean[])?.[i]).length, quiz.length),
  }));
  const quizAvg = mean(quiz.map((r) => r.score ?? 0));

  /* Pattern hunt */
  const hunt = perVisitor(by("pattern-hunt"), "first");
  const huntItems: Bar[] = patternHunt.map((p, i) => ({
    label: p.name,
    value: pct(hunt.filter((r) => (r.data.correct as boolean[])?.[i]).length, hunt.length),
  }));

  /* Pólya strategy */
  const pol = perVisitor(by("polya-strategy"), "first");
  const polCorrect = pol.filter((r) => r.data.correct).length;
  const strategyItems = polya.strategies.map((s) => {
    const used = pol.filter((r) => r.data.strategy === s.id);
    return {
      label: s.label,
      value: used.length,
      success: pct(used.filter((r) => r.data.correct).length, used.length),
    };
  });

  /* Poll */
  const pl = perVisitor(by("math-poll"), "latest");
  const whereItems: Bar[] = poll.whereMath.options
    .map((o) => ({ label: o.label, value: pl.filter((r) => r.data.whereMath === o.id).length }))
    .sort((a, b) => b.value - a.value);
  const confidenceItems: Bar[] = poll.confidence.labels.map((label, i) => ({
    label: `${i + 1} · ${label}`,
    value: pl.filter((r) => r.data.confidence === i + 1).length,
  }));
  const topicItems: Bar[] = poll.topic.options.map((o) => ({
    label: o.label,
    value: pl.filter((r) => r.data.topic === o.id).length,
  }));
  const knewFib = pct(pl.filter((r) => r.data.knewFib === true).length, pl.length);

  /* Confidence vs quiz score (visitors who did both) */
  const confByVisitor = new Map(pl.map((r) => [r.visitor_id, r.data.confidence as number]));
  const paired = quiz.filter((r) => confByVisitor.has(r.visitor_id));
  const highConf = paired.filter((r) => confByVisitor.get(r.visitor_id)! >= 4).map((r) => r.score ?? 0);
  const lowConf = paired.filter((r) => confByVisitor.get(r.visitor_id)! <= 2).map((r) => r.score ?? 0);

  /* Personality types */
  const types = perVisitor(by("mathematician-type"), "latest");
  const typeItems: Bar[] = (Object.keys(mathTypes) as MathType[])
    .map((t) => ({ label: mathTypes[t].title, value: types.filter((r) => r.data.result === t).length }))
    .sort((a, b) => b.value - a.value);

  /* Golden ratio */
  const golden = perVisitor(by("golden-ratio"), "latest").map((r) => r.data.ratio as number);
  const bins: Bar[] = [{ label: "below 1.45", value: golden.filter((x) => x < 1.45).length }];
  for (let i = 0; i < 7; i++) {
    const lo = (145 + i * 5) / 100;
    const hi = (150 + i * 5) / 100;
    bins.push({
      label: `${lo.toFixed(2)}–${hi.toFixed(2)}`,
      value: golden.filter((x) => x >= lo && x < hi).length,
      note: PHI >= lo && PHI < hi ? "φ" : undefined,
    });
  }
  bins.push({ label: "1.80 and up", value: golden.filter((x) => x >= 1.8).length });
  const nearPhi = pct(golden.filter((x) => Math.abs(x - PHI) <= 0.05).length, golden.length);

  /* Shorts reactions: latest reaction per visitor per video */
  const reactRows = by("short-reaction");
  const latestReact = new Map<string, Row>();
  for (const r of reactRows) latestReact.set(`${r.visitor_id}:${r.data.video}`, r);
  const shortItems = shorts.map((v) => {
    const rs = [...latestReact.values()].filter((r) => r.data.video === v.id);
    return {
      id: v.id,
      title: v.title,
      total: rs.length,
      counts: Object.fromEntries(reactions.map((x) => [x.id, rs.filter((r) => r.data.reaction === x.id).length])),
    };
  });

  return {
    totals: {
      visitors: new Set(rows.map((r) => r.visitor_id)).size,
      responses: rows.length,
      wallPosts: wall.count ?? 0,
    },
    quiz: { n: quiz.length, avg: quizAvg, max: symbolQuiz.length, items: quizItems },
    hunt: { n: hunt.length, avg: mean(hunt.map((r) => r.score ?? 0)), max: patternHunt.length, items: huntItems },
    polya: {
      n: pol.length,
      correct: pct(polCorrect, pol.length),
      understood: pct(pol.filter((r) => r.data.understood).length, pol.length),
      strategies: strategyItems,
      confRight: mean(pol.filter((r) => r.data.correct).map((r) => r.data.confidence as number)),
      confWrong: mean(pol.filter((r) => !r.data.correct).map((r) => r.data.confidence as number)),
    },
    poll: { n: pl.length, where: whereItems, confidence: confidenceItems, topics: topicItems, knewFib },
    confVsQuiz: { n: paired.length, high: { n: highConf.length, avg: mean(highConf) }, low: { n: lowConf.length, avg: mean(lowConf) } },
    types: { n: types.length, items: typeItems },
    golden: { n: golden.length, mean: mean(golden), median: median(golden), nearPhi, bins },
    shorts: shortItems,
  };
});

export type Stats = NonNullable<Awaited<ReturnType<typeof getStats>>>;

export async function getWallPosts() {
  await connection();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("wall_posts")
    .select("id, name, message, topic, created_at")
    .eq("hidden", false)
    .order("created_at", { ascending: false })
    .limit(120);
  if (error) {
    console.error("getWallPosts", error);
    return null;
  }
  return data;
}
