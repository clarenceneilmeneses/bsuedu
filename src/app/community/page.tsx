import type { Metadata } from "next";
import { Suspense } from "react";
import { WallForm } from "@/components/activities/WallForm";
import { PageHero } from "@/components/PageHero";
import { getWallPosts } from "@/lib/stats";

export const metadata: Metadata = { title: "Math Community" };

const topicStyle: Record<string, { label: string; card: string }> = {
  general: { label: "💬 General", card: "bg-[#fff8e6] rotate-[-0.6deg]" },
  patterns: { label: "🌻 Patterns", card: "bg-[#fdeee0] rotate-[0.5deg]" },
  language: { label: "∈ Math language", card: "bg-[#f3ecf8] rotate-[-0.3deg]" },
  reasoning: { label: "🧩 Reasoning", card: "bg-[#e9f3ee] rotate-[0.7deg]" },
};

const dateFmt = new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", timeZone: "Asia/Manila" });

async function Wall() {
  const posts = await getWallPosts();
  if (!posts) return <p className="text-center text-muted">The wall isn&apos;t connected yet.</p>;
  if (!posts.length)
    return <p className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">The wall is empty. Be the first to write on it!</p>;
  return (
    <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {posts.map((p) => {
        const t = topicStyle[p.topic] ?? topicStyle.general;
        return (
          <li key={p.id} className={`mb-4 break-inside-avoid rounded-xl p-5 shadow-sm ring-1 ring-black/5 ${t.card}`}>
            <p className="whitespace-pre-wrap break-words text-ink">{p.message}</p>
            <div className="mt-3 flex items-center justify-between gap-2 text-xs text-muted">
              <span className="font-semibold text-maroon">— {p.name}</span>
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
      <PageHero number="06" eyebrow="Math Community" title="The Freedom Wall">
        Leave a thought, a question, a joke or a puzzle for the next visitor. Math is better shared.
      </PageHero>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <WallForm />
        </div>
        <div className="mt-12">
          <Suspense fallback={<p className="text-center text-muted">Loading the wall…</p>}>
            <Wall />
          </Suspense>
        </div>
      </div>
    </>
  );
}
