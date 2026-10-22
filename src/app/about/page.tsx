import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionTitle } from "@/components/PageHero";
import { shorts } from "@/lib/activities";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About the Project" };

const checklist = [
  ["3+ math topics", "Patterns & Fibonacci, Math language & sets & functions, Reasoning & Pólya", "/explore"],
  ["3+ interactive activities", "Symbol Quiz, Pattern Hunt, Choose Your Strategy, Poll, Personality Quiz, Golden Ratio, Freedom Wall", "/interact"],
  ["1+ real-world use", "Sunflower packing, commute fare function, budgeting with Pólya, careers", "/math-in-action"],
  ["1+ reasoning activity", "Choose Your Strategy (handshake problem) + Inductive or Deductive sorter", "/interact#polya"],
  ["1+ multimedia part", "Six curated videos + our own interactive sunflower animation", "/shorts"],
  ["Something made with AI", "Site code, quiz drafts and chart logic (see AI disclosure below)", "#ai"],
  ["Sources & references", "Listed below", "#sources"],
  ["3+ data findings", "Seven live findings generated from visitor data", "/discover"],
  ["Final talk & live demo", "This live website", "/"],
];

const aiUses = [
  {
    task: "Coding the website",
    tool: "Claude (Anthropic) via Claude Code",
    did: "Generated the Next.js pages, interactive components, database schema and the code that turns answers into charts.",
    checked: "We tested every activity, checked that answers save correctly, and reviewed the page text.",
  },
  {
    task: "Drafting quiz questions & explanations",
    tool: "Claude (Anthropic)",
    did: "Suggested questions for the Symbol Quiz, Pattern Hunt and personality quiz.",
    checked: "We solved every question ourselves and checked each answer key against our GED 102 notes.",
  },
  {
    task: "Writing finding interpretations",
    tool: "Claude (Anthropic)",
    did: "Drafted the “Why it might be” text templates on the findings page.",
    checked: "We rewrote claims so they describe associations, not causes, and added cautions about sample size.",
  },
];

const sources = [
  "Aufmann, R. N., Lockwood, J. S., Nation, R. D., & Clegg, D. K. Mathematical Excursions. Cengage Learning.",
  "Pólya, G. (1945). How to Solve It: A New Aspect of Mathematical Method. Princeton University Press.",
  "Devlin, K. (1994). Mathematics: The Science of Patterns. Scientific American Library.",
  "Livio, M. (2002). The Golden Ratio: The Story of Phi, the World's Most Astonishing Number. Broadway Books.",
  "Sigler, L. E. (2002). Fibonacci's Liber Abaci (English translation). Springer.",
  "Commission on Higher Education. GE Course: Mathematics in the Modern World (CMO No. 20, s. 2013).",
];

export default function AboutPage() {
  return (
    <>
      <PageHero number="08" eyebrow="About the Project" title="Who made this, and how">
        {site.course} · {site.instructor} · {site.school}
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle kicker="The group" title="Credits">
          {site.section}. Supports <strong className="text-ink">ILO 2</strong>: using mathematics as a language.
        </SectionTitle>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {site.members.map((m) => (
            <li key={m.name} className="rounded-2xl border border-line bg-card p-5 text-center">
              <div className="hex mx-auto grid size-16 place-items-center bg-maroon font-display text-2xl text-gold-soft">
                {m.name.charAt(0)}
              </div>
              <p className="mt-3 font-semibold text-ink">{m.name}</p>
              <p className="mt-1 text-xs text-muted">{m.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-card py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle kicker="Requirements" title="Must-have checklist">
            Every required item, and where to find it on the site.
          </SectionTitle>
          <ul className="mt-8 grid gap-3 md:grid-cols-3">
            {checklist.map(([item, how, href]) => (
              <li key={item}>
                <Link href={href} className="flex h-full gap-3 rounded-xl border border-line bg-paper p-4 hover:border-gold">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-maroon text-xs text-paper" aria-hidden>
                    ✓
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{item}</span>
                    <span className="mt-0.5 block text-sm text-muted">{how}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="ai" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16">
        <SectionTitle kicker="Using AI the right way" title="How we used AI">
          “AI can help the mathematician. It cannot replace the mathematician.” Here is exactly what AI did, and what we
          checked.
        </SectionTitle>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-maroon text-paper">
              <tr>
                <th className="px-4 py-3">Task</th>
                <th className="px-4 py-3">Tool</th>
                <th className="px-4 py-3">What AI did</th>
                <th className="px-4 py-3">What we checked</th>
              </tr>
            </thead>
            <tbody>
              {aiUses.map((u) => (
                <tr key={u.task} className="border-t border-line bg-white align-top">
                  <td className="px-4 py-3 font-semibold text-maroon">{u.task}</td>
                  <td className="px-4 py-3 text-muted">{u.tool}</td>
                  <td className="px-4 py-3">{u.did}</td>
                  <td className="px-4 py-3">{u.checked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="sources" className="bg-card py-16">
        <div className="mx-auto max-w-6xl scroll-mt-24 px-4">
          <SectionTitle kicker="References" title="Sources" />
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-display text-lg font-semibold text-maroon">Books & documents</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink/80">
                {sources.map((s) => (
                  <li key={s} className="border-l-2 border-gold pl-3">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-maroon">Videos</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink/80">
                {shorts.map((v) => (
                  <li key={v.id} className="border-l-2 border-gold pl-3">
                    {v.by}. <em>{v.title}</em>. YouTube.{" "}
                    <a
                      href={`https://www.youtube.com/watch?v=${v.id}`}
                      className="text-maroon underline decoration-gold underline-offset-2"
                      target="_blank"
                      rel="noreferrer"
                    >
                      youtube.com/watch?v={v.id}
                    </a>
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 font-display text-lg font-semibold text-maroon">Built with</h3>
              <p className="mt-2 text-sm text-ink/80">Next.js · Supabase (database) · Vercel (hosting) · GitHub (code)</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
