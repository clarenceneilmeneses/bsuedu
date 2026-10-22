import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { JumpBar, PageHero, SectionTitle } from "@/components/PageHero";
import { FibonacciSpiral } from "@/components/visuals/FibonacciSpiral";
import { ReasoningSorter } from "@/components/visuals/ReasoningSorter";
import { SetPlayground } from "@/components/visuals/SetPlayground";

export const metadata: Metadata = { title: "Explore Math" };

const symbols = [
  ["∈", "is an element of", "3 ∈ {1, 2, 3}"],
  ["∉", "is not an element of", "5 ∉ {1, 2, 3}"],
  ["⊆", "is a subset of", "{1, 2} ⊆ {1, 2, 3}"],
  ["∪", "union (or)", "{1} ∪ {2} = {1, 2}"],
  ["∩", "intersection (and)", "{1, 2} ∩ {2, 3} = {2}"],
  ["∅", "the empty set", "{cats that are dogs} = ∅"],
  ["∀", "for all / for every", "∀x ∈ ℝ, x² ≥ 0"],
  ["∃", "there exists", "∃x ∈ ℕ, x + 2 = 5"],
  ["⇒", "implies (if … then)", "x = 2 ⇒ x² = 4"],
  ["⇔", "if and only if", "x + 1 = 3 ⇔ x = 2"],
  ["ℕ ℤ ℚ ℝ", "natural, integer, rational, real numbers", "−2 ∈ ℤ but −2 ∉ ℕ"],
  ["f(x)", "the output of function f for input x", "f(x) = 2x + 3"],
];

const polyaSteps = [
  { title: "Understand the problem", text: "What is unknown? What is given? Can you restate it in your own words or draw it?", color: "bg-pool" },
  { title: "Devise a plan", text: "Pick a strategy: draw a diagram, make a table, look for a pattern, work backwards, guess and check, use a formula.", color: "bg-sun" },
  { title: "Carry out the plan", text: "Work patiently and check each step. If the plan stalls, go back and try another one.", color: "bg-leaf" },
  { title: "Look back", text: "Does the answer make sense? Can you check it another way? Does the method solve other problems?", color: "bg-flame" },
];

function Card({ title, color = "bg-paper", children }: { title: string; color?: string; children: ReactNode }) {
  return (
    <article className="box bg-paper">
      <h3 className={`border-b-[3px] border-ink px-5 py-3 text-xl font-extrabold tracking-tight ${color}`}>{title}</h3>
      <div className="space-y-3 p-5">{children}</div>
    </article>
  );
}

function Lab({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <div className="box mt-10 bg-paper">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-[3px] border-ink bg-ink px-5 py-4 text-paper sm:px-8">
        <h3 className="text-2xl font-extrabold tracking-tight">{title}</h3>
        <span className="text-xs font-bold uppercase text-sun">Interactive</span>
      </div>
      <div className="p-5 sm:p-8">
        <p className="mb-6 text-lg text-muted">{intro}</p>
        {children}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <>
      <PageHero number="02" eyebrow="Explore Math" title="Three big ideas, one way of thinking" color="sun" art="symbols">
        Short lessons with things to touch. Read a little, play a little, then test yourself on the{" "}
        <Link href="/interact" className="link font-bold">
          Interact
        </Link>{" "}
        page.
      </PageHero>

      <JumpBar
        label="Topics"
        items={[
          { href: "#world", label: "A · Math in Our World" },
          { href: "#language", label: "B · Math Language & Symbols" },
          { href: "#reasoning", label: "C · Problem Solving & Reasoning" },
        ]}
      />

      {/* A. Math in Our World */}
      <section id="world" className="mx-auto max-w-6xl scroll-mt-36 px-4 py-20">
        <SectionTitle kicker="Topic A" title="Math in Our World">
          Mathematics is the study of patterns: in numbers, shapes, nature and everyday life.
        </SectionTitle>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <Card title="What is a pattern?" color="bg-leaf">
            <p>
              A pattern is a regularity we can describe and predict: the stripes of a zebra, the hexagons of a honeycomb,
              the rhythm of a song, the rise and fall of jeepney traffic each day. Finding the rule behind a pattern lets us
              predict what comes next.
            </p>
          </Card>
          <Card title="The Fibonacci sequence" color="bg-sun">
            <p>Start with 1 and 1. Each next number is the sum of the two before it:</p>
            <p className="border-2 border-ink bg-mist p-3 text-center font-mono text-sm font-semibold">
              Fₙ = Fₙ₋₁ + Fₙ₋₂
              <br />
              1, 1, 2, 3, 5, 8, 13, 21, 34, 55, …
            </p>
            <p className="text-sm text-muted">
              Leonardo of Pisa (Fibonacci) described it in 1202 in <em>Liber Abaci</em> with a puzzle about breeding rabbits.
            </p>
          </Card>
          <Card title="Where does it show up?" color="bg-blush">
            <ul className="space-y-1.5">
              <li>🌻 Sunflower heads often show 34 and 55 spirals</li>
              <li>🌲 Pinecones: commonly 8 and 13 spirals</li>
              <li>🌸 Petal counts: lilies 3, buttercups 5, cosmos 8</li>
              <li>🍍 Pineapples: 8, 13 and 21 rows of scales</li>
            </ul>
            <p className="text-sm text-muted">
              Careful: not <em>everything</em> is Fibonacci. Many viral claims (like the Mona Lisa) are exaggerated. A
              mathematician checks.
            </p>
          </Card>
        </div>

        <Lab
          title="Build the golden spiral"
          intro="Squares with Fibonacci side lengths fit together perfectly. Draw a quarter circle in each and a spiral appears."
        >
          <FibonacciSpiral />
        </Lab>
      </section>

      {/* B. Math Language & Symbols */}
      <section id="language" className="scroll-mt-36 border-y-[3px] border-ink bg-mist py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle kicker="Topic B" title="Math Language & Symbols">
            Mathematics has its own language. It is <strong className="text-ink">precise</strong> (no ambiguity),{" "}
            <strong className="text-ink">concise</strong> (says a lot in a little) and{" "}
            <strong className="text-ink">powerful</strong> (expresses complex ideas simply).
          </SectionTitle>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Card title="Expressions vs. sentences" color="bg-pool">
              <p>
                Like English has nouns and sentences, math has <strong>expressions</strong> (names of objects, like{" "}
                <span className="font-mono">2x + 3</span>) and <strong>sentences</strong> (complete thoughts that are true or
                false, like <span className="font-mono">2x + 3 = 11</span>).
              </p>
              <p className="text-sm text-muted">Tip: a math sentence has a “verb” such as =, &lt;, ≥, ∈ or ⊆.</p>
            </Card>
            <Card title="Relations & functions" color="bg-sun">
              <p>
                A <strong>relation</strong> is any set of ordered pairs, like {"{(Ana, 18), (Ben, 19)}"}. A{" "}
                <strong>function</strong> is a relation where each input has <em>exactly one</em> output.
              </p>
              <p className="text-sm text-muted">
                Your student number → your name is a function. Your name → your subjects is not (one name, many subjects).
              </p>
            </Card>
          </div>

          <div className="box mt-10 overflow-hidden bg-paper">
            <table className="w-full text-left">
              <caption className="border-b-[3px] border-ink bg-pool px-5 py-3 text-left text-xl font-extrabold">
                Symbol dictionary
              </caption>
              <thead className="border-b-[3px] border-ink text-xs font-bold uppercase">
                <tr>
                  <th className="px-5 py-2.5">Symbol</th>
                  <th className="px-5 py-2.5">Read as</th>
                  <th className="hidden px-5 py-2.5 sm:table-cell">Example</th>
                </tr>
              </thead>
              <tbody>
                {symbols.map(([sym, read, ex]) => (
                  <tr key={sym} className="border-t-2 border-ink first:border-t-0 hover:bg-sun/30">
                    <td className="px-5 py-3 font-mono text-xl font-bold">{sym}</td>
                    <td className="px-5 py-3 font-medium">
                      {read}
                      <span className="mt-0.5 block font-mono text-xs text-muted sm:hidden">{ex}</span>
                    </td>
                    <td className="hidden px-5 py-3 font-mono text-sm text-muted sm:table-cell">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Lab
            title="Set playground"
            intro="A set is a well-defined collection of objects. Build two sets and watch the operations update."
          >
            <SetPlayground />
          </Lab>
        </div>
      </section>

      {/* C. Problem Solving & Reasoning */}
      <section id="reasoning" className="mx-auto max-w-6xl scroll-mt-36 px-4 py-20">
        <SectionTitle kicker="Topic C" title="Problem Solving & Reasoning">
          Mathematicians don&apos;t just compute. They reason, and they have a plan for problems they&apos;ve never seen.
        </SectionTitle>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Card title="Inductive reasoning" color="bg-leaf">
            <p>
              From <strong>specific examples</strong> to a <strong>general conjecture</strong>. Useful for discovering
              patterns, but a conjecture can be wrong.
            </p>
            <p className="border-2 border-ink bg-mist p-3 text-sm">
              Join points on a circle with every chord. The regions go 1, 2, 4, 8, 16… so 6 points give 32?{" "}
              <strong>No, 31.</strong> One counterexample breaks the pattern.
            </p>
          </Card>
          <Card title="Deductive reasoning" color="bg-flame">
            <p>
              From <strong>general facts</strong> to a <strong>specific conclusion</strong> that must be true. This is how
              proofs work.
            </p>
            <p className="border-2 border-ink bg-mist p-3 text-sm">
              The sum of two even numbers is even: 2a + 2b = 2(a + b), which is 2 × something.{" "}
              <strong>Always true, no exceptions.</strong>
            </p>
          </Card>
        </div>

        <Lab title="Inductive or deductive? You decide." intro="Sort each argument.">
          <ReasoningSorter />
        </Lab>

        <div className="mt-16">
          <h3 className="text-3xl font-extrabold tracking-tight">Pólya&apos;s 4 steps to problem solving</h3>
          <p className="mt-1 text-lg text-muted">From George Pólya&apos;s classic book <em>How to Solve It</em> (1945).</p>
          <ol className="mt-8 grid gap-[3px] border-[3px] border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
            {polyaSteps.map((s, i) => (
              <li
                key={s.title}
                className={`p-6 ${s.color}`}
              >
                <span className="grid size-12 place-items-center border-[3px] border-ink bg-paper text-2xl font-extrabold">{i + 1}</span>
                <p className="mt-4 text-xl font-extrabold leading-tight">{s.title}</p>
                <p className="mt-2">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8">
            <Link
              href="/interact#polya"
              className="inline-flex border-[3px] border-ink bg-ink px-6 py-3 font-bold uppercase text-paper hover:bg-sun hover:text-ink"
            >
              Try Pólya&apos;s steps on a real puzzle →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
