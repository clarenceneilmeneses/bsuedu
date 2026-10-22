import type { Metadata } from "next";
import { Suspense } from "react";
import { ShortReactions } from "@/components/activities/ShortReactions";
import { PageHero } from "@/components/PageHero";
import { Sunflower } from "@/components/visuals/Sunflower";
import { reactions, shorts } from "@/lib/activities";
import { getStats } from "@/lib/stats";

export const metadata: Metadata = { title: "Math Shorts" };

const topicColor: Record<string, string> = {
  A: "bg-leaf",
  B: "bg-pool",
  C: "bg-flame",
};

async function ReactionTally({ video }: { video: string }) {
  const s = await getStats();
  const row = s?.shorts.find((x) => x.id === video);
  if (!row || !row.total) return null;
  return (
    <p className="font-mono text-sm">
      {reactions.map((r) => `${r.emoji} ${row.counts[r.id] ?? 0}`).join("   ")}
    </p>
  );
}

export default function ShortsPage() {
  return (
    <>
      <PageHero number="07" eyebrow="Math Shorts" title="Math in a few minutes" color="pool" art="play">
        Short videos we picked for each topic, plus one we made ourselves. React to each so we know what worked.
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-14">
        <section className="box bg-paper">
          <div className="border-b-[3px] border-ink bg-sun px-5 py-5 sm:px-8">
            <p className="text-xs font-bold uppercase">Our own short · interactive</p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">One angle, a whole sunflower</h2>
            <p className="mt-2 max-w-2xl">
              Built in code by our group. Each dot is a seed, turned by the same angle from the last. Change the angle and
              watch order fall apart.
            </p>
          </div>
          <div className="p-5 sm:p-8">
            <Sunflower seeds={360} />
          </div>
        </section>

        <ul className="mt-14 grid gap-8 md:grid-cols-2">
          {shorts.map((v) => (
            <li key={v.id} className="box flex flex-col bg-paper">
              <div className="aspect-video border-b-[3px] border-ink bg-ink">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="size-full"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className={`self-start border-2 border-ink px-2 py-0.5 text-xs font-bold uppercase ${topicColor[v.topic[0]]}`}>
                  {v.topic}
                </p>
                <h2 className="text-xl font-extrabold tracking-tight">{v.title}</h2>
                <p className="text-sm font-semibold">{v.by}</p>
                <p className="text-muted">{v.note}</p>
                <div className="mt-auto space-y-2 border-t-2 border-ink pt-4">
                  <ShortReactions video={v.id} />
                  <Suspense fallback={null}>
                    <ReactionTally video={v.id} />
                  </Suspense>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
