import type { Metadata } from "next";
import { Suspense } from "react";
import { WallForm } from "@/components/activities/WallForm";
import { PageHero } from "@/components/PageHero";
import { getWallPosts } from "@/lib/stats";

export const metadata: Metadata = { title: "Math Community" };

const topicStyle: Record<string, { label: string; card: string }> = {
  general: { label: "💬 General", card: "bg-sun -rotate-1" },
  patterns: { label: "🌻 Patterns", card: "bg-leaf rotate-1" },
  language: { label: "∈ Math language", card: "bg-pool -rotate-[0.5deg]" },
  reasoning: { label: "🧩 Reasoning", card: "bg-blush rotate-[0.6deg]" },
};

const dateFmt = new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", timeZone: "Asia/Manila" });

async function Wall() {
  const posts = await getWallPosts();
  if (!posts) return <p className="box bg-mist p-8 text-center text-lg">The wall isn&apos;t connected yet.</p>;
  if (!posts.length)
    return (
      <p className="border-[3px] border-dashed border-ink p-12 text-center text-lg font-semibold">
        The wall is empty. Be the first to write on it!
      </p>
    );
  return (
    <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
      {posts.map((p) => {
        const t = topicStyle[p.topic] ?? topicStyle.general;
        return (
          <li key={p.id} className={`mb-5 break-inside-avoid border-[3px] border-ink p-5 ${t.card}`}>
            <p className="whitespace-pre-wrap break-words text-lg font-medium">{p.message}</p>
            <div className="mt-4 flex items-center justify-between gap-2 border-t-2 border-ink pt-2 text-sm">
              <span className="font-bold">— {p.name}</span>
              <span>
                {t.label} · {dateFmt.format(new Date(p.created_at))}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function CommunityPage() {
  return (
    <>
      <PageHero number="06" eyebrow="Math Community" title="The Freedom Wall" color="blush" art="wall">
        Leave a thought, a question, a joke or a puzzle for the next visitor. Math is better shared.
      </PageHero>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="mx-auto max-w-2xl">
          <WallForm />
        </div>
        <div className="mt-16">
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight">What visitors are saying</h2>
          <Suspense fallback={<p className="text-center font-semibold">Loading the wall…</p>}>
            <Wall />
          </Suspense>
        </div>
      </div>
    </>
  );
}
