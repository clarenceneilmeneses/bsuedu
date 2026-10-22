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

const memberColors = ["bg-pool", "bg-sun", "bg-leaf", "bg-flame", "bg-blush"];

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
      <PageHero number="08" eyebrow="About the Project" title="Who made this, and how" color="sun" art="venn">
        {site.course} · {site.instructor} · {site.school}
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle kicker="The group" title="Credits">
          {site.section}. Supports <strong className="text-ink">ILO 2</strong>: using mathematics as a language.
        </SectionTitle>
        <ul className="mt-10 grid grid-cols-2 gap-[3px] border-[3px] border-ink bg-ink sm:grid-cols-3 lg:grid-cols-5">
          {site.members.map((m, i) => (
            <li key={m.name} className="bg-paper p-5">
              <div
                className={`grid size-16 place-items-center border-[3px] border-ink text-3xl font-extrabold ${memberColors[i % memberColors.length]}`}
              >
                {m.name.charAt(0)}
              </div>
              <p className="mt-4 text-lg font-extrabold">{m.name}</p>
              <p className="mt-1 text-sm text-muted">{m.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y-[3px] border-ink bg-mist py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle kicker="Requirements" title="Must-have checklist">
            Every required item, and where to find it on the site.
          </SectionTitle>
          <ul className="mt-10 grid gap-[3px] border-[3px] border-ink bg-ink md:grid-cols-3">
            {checklist.map(([item, how, href]) => (
              <li key={item} className="bg-paper">
                <Link href={href} className="flex h-full gap-3 p-5 transition-colors hover:bg-leaf">
                  <span className="grid size-7 shrink-0 place-items-center border-2 border-ink bg-leaf text-sm font-bold" aria-hidden>
                    ✓
                  </span>
                  <span>
                    <span className="block font-extrabold">{item}</span>
                    <span className="mt-0.5 block text-sm text-muted">{how}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="ai" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
        <SectionTitle kicker="Using AI the right way" title="How we used AI">
          “AI can help the mathematician. It cannot replace the mathematician.” Here is exactly what AI did, and what we
          checked.
        </SectionTitle>
        <div className="box mt-10 overflow-x-auto bg-paper">
          <table className="w-full min-w-[640px] text-left">
            <thead className="border-b-[3px] border-ink bg-pool text-sm font-bold uppercase">
              <tr>
                <th className="px-5 py-3">Task</th>
                <th className="px-5 py-3">Tool</th>
                <th className="px-5 py-3">What AI did</th>
                <th className="px-5 py-3">What we checked</th>
              </tr>
            </thead>
            <tbody>
              {aiUses.map((u) => (
                <tr key={u.task} className="border-t-2 border-ink align-top first:border-t-0">
                  <td className="px-5 py-4 font-extrabold">{u.task}</td>
                  <td className="px-5 py-4 text-muted">{u.tool}</td>
                  <td className="px-5 py-4">{u.did}</td>
                  <td className="px-5 py-4">{u.checked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="sources" className="scroll-mt-24 border-t-[3px] border-ink bg-mist py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle kicker="References" title="Sources" />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="box bg-paper">
              <h3 className="border-b-[3px] border-ink bg-sun px-5 py-3 text-lg font-extrabold">Books & documents</h3>
              <ul className="divide-y-2 divide-ink">
                {sources.map((s) => (
                  <li key={s} className="px-5 py-3 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="box bg-paper">
              <h3 className="border-b-[3px] border-ink bg-flame px-5 py-3 text-lg font-extrabold">Videos</h3>
              <ul className="divide-y-2 divide-ink">
                {shorts.map((v) => (
                  <li key={v.id} className="px-5 py-3 text-sm">
                    {v.by}. <em>{v.title}</em>. YouTube.{" "}
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} className="link break-all" target="_blank" rel="noreferrer">
                      youtube.com/watch?v={v.id}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="border-t-[3px] border-ink px-5 py-3 text-sm">
                <strong>Built with:</strong> Next.js · Supabase (database) · Vercel (hosting) · GitHub (code)
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
