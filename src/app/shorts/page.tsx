import type { Metadata } from "next";
import { Suspense } from "react";
import { ShortReactions } from "@/components/activities/ShortReactions";
import { PageHero } from "@/components/PageHero";
import { Sunflower } from "@/components/visuals/Sunflower";
import { reactions, shorts } from "@/lib/activities";
import { getStats } from "@/lib/stats";

export const metadata: Metadata = { title: "Math Shorts" };

async function ReactionTally({ video }: { video: string }) {
  const s = await getStats();
  const row = s?.shorts.find((x) => x.id === video);
  if (!row || !row.total) return null;
  return (
    <p className="text-xs text-muted">
      {reactions.map((r) => `${r.emoji} ${row.counts[r.id] ?? 0}`).join("  ·  ")}
    </p>
  );
}

export default function ShortsPage() {
  return (
    <>
      <PageHero number="07" eyebrow="Math Shorts" title="Math in a few minutes">
        Short videos we picked for each topic, plus one we made ourselves. React to each so we know what worked.
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <section className="overflow-hidden rounded-2xl bg-maroon-deep p-6 text-paper sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Our own short · interactive</p>
          <h2 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">One angle, a whole sunflower</h2>
          <p className="mt-2 mb-6 max-w-2xl text-paper/80">
            Built in code by our group. Each dot is a seed, turned by the same angle from the last. Change the angle and
            watch order fall apart.
          </p>
          <div className="rounded-xl bg-paper p-5 text-ink">
            <Sunflower seeds={360} />
          </div>
        </section>

        <ul className="mt-12 grid gap-8 md:grid-cols-2">
          {shorts.map((v) => (
            <li key={v.id} className="overflow-hidden rounded-2xl border border-line bg-card shadow-sm">
              <div className="aspect-video bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="size-full"
                />
              </div>
              <div className="space-y-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">{v.topic}</p>
                <h2 className="font-display text-xl font-semibold text-maroon">{v.title}</h2>
                <p className="text-sm text-muted">{v.by}</p>
                <p className="text-sm text-ink/80">{v.note}</p>
                <div className="pt-2">
                  <ShortReactions video={v.id} />
                </div>
                <Suspense fallback={null}>
                  <ReactionTally video={v.id} />
                </Suspense>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
