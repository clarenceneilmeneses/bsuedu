import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionTitle } from "@/components/PageHero";
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
  { title: "Understand the problem", text: "What is unknown? What is given? Can you restate it in your own words or draw it?" },
  { title: "Devise a plan", text: "Pick a strategy: draw a diagram, make a table, look for a pattern, work backwards, guess and check, use a formula." },
  { title: "Carry out the plan", text: "Work patiently and check each step. If the plan stalls, go back and try another one." },
  { title: "Look back", text: "Does the answer make sense? Can you check it another way? Does the method solve other problems?" },
];

export default function ExplorePage() {
  return (
    <>
      <PageHero number="02" eyebrow="Explore Math" title="Three big ideas, one way of thinking">
        Short lessons with things to touch. Read a little, play a little, then test yourself on the{" "}
        <Link href="/interact" className="text-gold-soft underline underline-offset-4">
          Interact
        </Link>{" "}
        page.
      </PageHero>

      <nav className="sticky top-[61px] z-30 border-b border-line bg-paper/90 backdrop-blur" aria-label="Topics">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 text-sm">
          {[
            ["#world", "A · Math in Our World"],
            ["#language", "B · Math Language & Symbols"],
            ["#reasoning", "C · Problem Solving & Reasoning"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="whitespace-nowrap rounded-full px-3 py-1.5 text-maroon hover:bg-maroon/10">
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* A. Math in Our World */}
      <section id="world" className="mx-auto max-w-6xl scroll-mt-32 px-4 py-16">
        <SectionTitle kicker="Topic A" title="Math in Our World">
          Mathematics is the study of patterns: in numbers, shapes, nature and everyday life.
        </SectionTitle>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <article className="rounded-2xl border border-line bg-card p-6">
            <h3 className="font-display text-xl font-semibold text-maroon">What is a pattern?</h3>
            <p className="mt-2 text-ink/80">
              A pattern is a regularity we can describe and predict: the stripes of a zebra, the hexagons of a honeycomb,
              the rhythm of a song, the rise and fall of jeepney traffic each day. Finding the rule behind a pattern lets us
              predict what comes next.
            </p>
          </article>
          <article className="rounded-2xl border border-line bg-card p-6">
            <h3 className="font-display text-xl font-semibold text-maroon">The Fibonacci sequence</h3>
            <p className="mt-2 text-ink/80">Start with 1 and 1. Each next number is the sum of the two before it:</p>
            <p className="mt-3 rounded-lg bg-paper p-3 text-center font-mono text-sm">
              Fₙ = Fₙ₋₁ + Fₙ₋₂
              <br />
              1, 1, 2, 3, 5, 8, 13, 21, 34, 55, …
            </p>
            <p className="mt-3 text-sm text-muted">
              Leonardo of Pisa (Fibonacci) described it in 1202 in <em>Liber Abaci</em> with a puzzle about breeding rabbits.
            </p>
          </article>
          <article className="rounded-2xl border border-line bg-card p-6">
            <h3 className="font-display text-xl font-semibold text-maroon">Where does it show up?</h3>
            <ul className="mt-2 space-y-1.5 text-ink/80">
              <li>🌻 Sunflower heads often show 34 and 55 spirals</li>
              <li>🌲 Pinecones: commonly 8 and 13 spirals</li>
              <li>🌸 Petal counts: lilies 3, buttercups 5, cosmos 8</li>
              <li>🍍 Pineapples: 8, 13 and 21 rows of scales</li>
            </ul>
            <p className="mt-3 text-sm text-muted">
              Careful: not <em>everything</em> is Fibonacci. Many viral claims (like the Mona Lisa) are exaggerated. A
              mathematician checks.
            </p>
          </article>
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-card p-6 sm:p-8">
          <h3 className="font-display text-2xl font-semibold text-maroon">Build the golden spiral</h3>
          <p className="mt-1 mb-6 text-muted">
            Squares with Fibonacci side lengths fit together perfectly. Draw a quarter circle in each and a spiral appears.
          </p>
          <FibonacciSpiral />
        </div>
      </section>

      {/* B. Math Language & Symbols */}
      <section id="language" className="scroll-mt-32 bg-card py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle kicker="Topic B" title="Math Language & Symbols">
            Mathematics has its own language. It is <strong className="text-ink">precise</strong> (no ambiguity),{" "}
            <strong className="text-ink">concise</strong> (says a lot in a little) and{" "}
            <strong className="text-ink">powerful</strong> (expresses complex ideas simply).
          </SectionTitle>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-paper p-6">
              <h3 className="font-display text-xl font-semibold text-maroon">Expressions vs. sentences</h3>
              <p className="mt-2 text-ink/80">
                Like English has nouns and sentences, math has <strong>expressions</strong> (names of objects, like{" "}
                <span className="font-mono">2x + 3</span>) and <strong>sentences</strong> (complete thoughts that are true or
                false, like <span className="font-mono">2x + 3 = 11</span>).
              </p>
              <p className="mt-3 text-sm text-muted">
                Tip: a math sentence has a “verb” such as =, &lt;, ≥, ∈ or ⊆.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6">
              <h3 className="font-display text-xl font-semibold text-maroon">Relations & functions</h3>
              <p className="mt-2 text-ink/80">
                A <strong>relation</strong> is any set of ordered pairs, like {"{(Ana, 18), (Ben, 19)}"}. A{" "}
                <strong>function</strong> is a relation where each input has <em>exactly one</em> output.
              </p>
              <p className="mt-3 text-sm text-muted">
                Your student number → your name is a function. Your name → your subjects is not (one name, many subjects).
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <caption className="bg-maroon px-4 py-3 text-left font-display text-lg text-paper">Symbol dictionary</caption>
              <thead className="bg-paper text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-2">Symbol</th>
                  <th className="px-4 py-2">Read as</th>
                  <th className="hidden px-4 py-2 sm:table-cell">Example</th>
                </tr>
              </thead>
              <tbody>
                {symbols.map(([sym, read, ex]) => (
                  <tr key={sym} className="border-t border-line bg-white">
                    <td className="px-4 py-2.5 font-mono text-lg text-maroon">{sym}</td>
                    <td className="px-4 py-2.5">
                      {read}
                      <span className="mt-0.5 block font-mono text-xs text-muted sm:hidden">{ex}</span>
                    </td>
                    <td className="hidden px-4 py-2.5 font-mono text-muted sm:table-cell">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-paper p-6 sm:p-8">
            <h3 className="font-display text-2xl font-semibold text-maroon">Set playground</h3>
            <p className="mt-1 mb-6 text-muted">
              A set is a well-defined collection of objects. Build two sets and watch the operations update.
            </p>
            <SetPlayground />
          </div>
        </div>
      </section>

      {/* C. Problem Solving & Reasoning */}
      <section id="reasoning" className="mx-auto max-w-6xl scroll-mt-32 px-4 py-16">
        <SectionTitle kicker="Topic C" title="Problem Solving & Reasoning">
          Mathematicians don&apos;t just compute. They reason, and they have a plan for problems they&apos;ve never seen.
        </SectionTitle>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-card p-6">
            <h3 className="font-display text-xl font-semibold text-maroon">Inductive reasoning</h3>
            <p className="mt-2 text-ink/80">
              From <strong>specific examples</strong> to a <strong>general conjecture</strong>. Useful for discovering
              patterns, but a conjecture can be wrong.
            </p>
            <p className="mt-3 rounded-lg bg-paper p-3 text-sm">
              Join points on a circle with every chord. The regions go 1, 2, 4, 8, 16… so 6 points give 32? <br />
              <strong>No, 31.</strong> One counterexample breaks the pattern.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-card p-6">
            <h3 className="font-display text-xl font-semibold text-maroon">Deductive reasoning</h3>
            <p className="mt-2 text-ink/80">
              From <strong>general facts</strong> to a <strong>specific conclusion</strong> that must be true. This is how
              proofs work.
            </p>
            <p className="mt-3 rounded-lg bg-paper p-3 text-sm">
              The sum of two even numbers is even: 2a + 2b = 2(a + b), which is 2 × something.{" "}
              <strong>Always true, no exceptions.</strong>
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-card p-6 sm:p-8">
          <h3 className="font-display text-2xl font-semibold text-maroon">Inductive or deductive? You decide.</h3>
          <p className="mt-1 mb-6 text-muted">Sort each argument.</p>
          <ReasoningSorter />
        </div>

        <div className="mt-8">
          <h3 className="font-display text-2xl font-semibold text-maroon">Pólya&apos;s 4 steps to problem solving</h3>
          <p className="mt-1 text-muted">From George Pólya&apos;s classic book <em>How to Solve It</em> (1945).</p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {polyaSteps.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl bg-maroon p-5 text-paper">
                <span className="hex grid size-10 place-items-center bg-gold font-display text-lg text-maroon-deep">{i + 1}</span>
                <p className="mt-3 font-display text-lg text-gold-soft">{s.title}</p>
                <p className="mt-1 text-sm text-paper/80">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6">
            <Link
              href="/interact#polya"
              className="inline-flex rounded-full bg-gold px-5 py-2.5 font-semibold text-maroon-deep hover:bg-gold-soft"
            >
              Try Pólya&apos;s steps on a real puzzle →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
