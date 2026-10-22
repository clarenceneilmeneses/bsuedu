import type { Metadata } from "next";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { BarChart } from "@/components/BarChart";
import { PageHero } from "@/components/PageHero";
import { PHI } from "@/lib/activities";
import { getStats, MIN_N, type Stats } from "@/lib/stats";

export const metadata: Metadata = { title: "What Did We Discover?" };

const accents = ["bg-pool", "bg-sun", "bg-leaf", "bg-flame", "bg-blush"];

function Finding({
  id,
  number,
  title,
  n,
  source,
  sourceHref,
  shows,
  means,
  caution,
  children,
}: {
  id?: string;
  number: number;
  title: string;
  n: number;
  source: string;
  sourceHref: string;
  shows: ReactNode;
  means: ReactNode;
  caution?: ReactNode;
  children: ReactNode;
}) {
  const enough = n >= MIN_N;
  return (
    <article id={id} className="box scroll-mt-24 bg-paper">
      <header
        className={`flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-ink px-5 py-4 sm:px-7 ${enough ? accents[number % accents.length] : "bg-mist"}`}
      >
        <div className="flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center border-[3px] border-ink bg-paper text-2xl font-extrabold">
            {number}
          </span>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">{title}</h2>
            <p className="text-sm">
              From{" "}
              <Link href={sourceHref} className="link font-semibold">
                {source}
              </Link>
            </p>
          </div>
        </div>
        <span className="border-2 border-ink bg-paper px-2.5 py-1 font-mono text-sm font-semibold">n = {n}</span>
      </header>
      {enough ? (
        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          <div className="p-5 sm:p-7">{children}</div>
          <div className="space-y-5 border-t-[3px] border-ink p-5 sm:p-7 lg:border-t-0 lg:border-l-[3px]">
            <div>
              <p className="inline-block bg-ink px-2 py-0.5 text-xs font-bold uppercase text-paper">What the data shows</p>
              <p className="mt-2">{shows}</p>
            </div>
            <div>
              <p className="inline-block bg-ink px-2 py-0.5 text-xs font-bold uppercase text-paper">Why it might be</p>
              <p className="mt-2">{means}</p>
            </div>
            {caution && (
              <p className="border-l-[6px] border-ink bg-mist p-3 text-sm">
                <strong>Careful:</strong> {caution}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="px-5 py-10 text-center sm:px-7">
          <p className="text-lg">
            We need at least {MIN_N} responses before stating a finding. We have <strong>{n}</strong> so far.
          </p>
          <Link
            href={sourceHref}
            className="mt-4 inline-flex border-[3px] border-ink bg-ink px-5 py-2.5 font-bold uppercase text-paper hover:bg-sun hover:text-ink"
          >
            Add your answer →
          </Link>
        </div>
      )}
    </article>
  );
}

const top = <T extends { value: number }>(xs: T[]) => [...xs].sort((a, b) => b.value - a.value)[0];
const bottom = <T extends { value: number }>(xs: T[]) => [...xs].sort((a, b) => a.value - b.value)[0];

function Findings({ s }: { s: Stats }) {
  const fib = s.hunt.items.find((i) => i.label === "Fibonacci")!;
  const hardestPattern = bottom(s.hunt.items);
  const easiestPattern = top(s.hunt.items);
  const hardestSymbol = bottom(s.quiz.items);
  const usedStrategies = s.polya.strategies.filter((x) => x.value > 0);
  const popularStrategy = top(s.polya.strategies);
  const bestStrategy = [...usedStrategies].filter((x) => x.value >= 2).sort((a, b) => b.success - a.success)[0];
  const topPlace = s.poll.where[0];
  const topType = s.types.items[0];
  const confGap = s.confVsQuiz.high.avg - s.confVsQuiz.low.avg;

  return (
    <div className="grid gap-8">
      <Finding
        number={1}
        title="Which patterns are easiest to spot?"
        n={s.hunt.n}
        source="Pattern Hunt"
        sourceHref="/interact#pattern-hunt"
        shows={
          <>
            {fib.value}% of visitors found the next Fibonacci number. The easiest pattern was{" "}
            <strong>{easiestPattern.label.toLowerCase()}</strong> ({easiestPattern.value}% correct) and the hardest was{" "}
            <strong>{hardestPattern.label.toLowerCase()}</strong> ({hardestPattern.value}%). Average score:{" "}
            {s.hunt.avg.toFixed(1)} of {s.hunt.max}.
          </>
        }
        means="Patterns with one fixed step (add 4, double it) can be checked with a single operation. Patterns that depend on two earlier terms (Fibonacci) or on a property of each number (primes) ask you to test a rule against several terms first."
        caution="These are first attempts only, from visitors who chose to play. That's a self-selected sample, not a random one."
      >
        <BarChart data={s.hunt.items} unit="%" max={100} />
      </Finding>

      <Finding
        number={2}
        title="How well do visitors speak the language of math?"
        n={s.quiz.n}
        source="Symbol Quiz"
        sourceHref="/interact#symbol-quiz"
        shows={
          <>
            The average score was <strong>{s.quiz.avg.toFixed(1)} out of {s.quiz.max}</strong> (
            {Math.round((s.quiz.avg / s.quiz.max) * 100)}%). The question most visitors missed was “{hardestSymbol.label}”, with
            only {hardestSymbol.value}% correct.
          </>
        }
        means="Symbols used in everyday school math (like f(x) or ∪) tend to be familiar, while quantifiers (∀, ∃) and the formal definition of a function are newer to most people. Like any language, the less a word is used, the harder it is to recall."
      >
        <BarChart data={s.quiz.items} unit="%" max={100} highlightTop={false} />
      </Finding>

      <Finding
        number={3}
        title="Which problem-solving strategy did visitors choose?"
        n={s.polya.n}
        source="Choose Your Strategy"
        sourceHref="/interact#polya"
        shows={
          <>
            {s.polya.correct}% of visitors got the handshake problem right (66). The most popular plan was{" "}
            <strong>{popularStrategy.label.toLowerCase()}</strong>.{" "}
            {bestStrategy && (
              <>
                Visitors who chose <strong>{bestStrategy.label.toLowerCase()}</strong> had the highest success rate (
                {bestStrategy.success}%).{" "}
              </>
            )}
            Average confidence was {s.polya.confRight.toFixed(1)}/5 for correct answers and {s.polya.confWrong.toFixed(1)}/5
            for wrong ones.
          </>
        }
        means="Strategies that organise the work (a table or a formula) leave less room for counting the same handshake twice, which is the most common mistake in this problem."
        caution="Visitors picked their own strategy, so this shows an association, not proof that a strategy causes success. People who already knew the formula may simply have picked it."
      >
        <BarChart data={s.polya.strategies.map((x) => ({ label: x.label, value: x.value, note: x.value ? `${x.success}% right` : undefined }))} />
      </Finding>

      <Finding
        id="poll"
        number={4}
        title="Where do people see math in daily life?"
        n={s.poll.n}
        source="Math-in-My-Life Poll"
        sourceHref="/interact#poll"
        shows={
          <>
            <strong>{topPlace.label}</strong> was the top answer ({topPlace.value} of {s.poll.n} votes).{" "}
            {s.poll.knewFib}% already knew Fibonacci numbers appear in plants, so {100 - s.poll.knewFib}% learned it here.
          </>
        }
        means={
          topPlace.label === "Budgeting & shopping"
            ? "Money is where math has immediate, personal consequences, so it is the math people notice most. Math in nature and phones is everywhere too, but it stays hidden until someone points it out."
            : `People notice math where they actively calculate. For our visitors that is ${topPlace.label.toLowerCase()}. Math hidden inside nature and apps is easy to miss until someone points it out.`
        }
      >
        <BarChart data={s.poll.where} />
        <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Math confidence (1–5)</p>
        <BarChart data={s.poll.confidence} highlightTop={false} />
      </Finding>

      <Finding
        number={5}
        title="Does confidence match performance?"
        n={s.confVsQuiz.n}
        source="Poll + Symbol Quiz (visitors who did both)"
        sourceHref="/interact#poll"
        shows={
          <>
            Visitors who rated their confidence 4–5 averaged <strong>{s.confVsQuiz.high.avg.toFixed(1)}</strong> on the
            symbol quiz (n = {s.confVsQuiz.high.n}); those who rated 1–2 averaged{" "}
            <strong>{s.confVsQuiz.low.avg.toFixed(1)}</strong> (n = {s.confVsQuiz.low.n}).{" "}
            {Math.abs(confGap) < 0.75
              ? "That's a small gap: confidence and quiz scores were close."
              : confGap > 0
                ? `Confident visitors scored about ${confGap.toFixed(1)} points higher.`
                : `Less confident visitors actually scored ${(-confGap).toFixed(1)} points higher!`}
          </>
        }
        means="Confidence often comes from practice, and practice builds skill, so the two tend to move together. But many people underrate themselves in math. A low self-rating doesn't always mean low ability."
        caution="Groups can be small. With only a few people in a group, one score can swing the average a lot."
      >
        <BarChart
          data={[
            { label: "Confidence 4–5", value: Number(s.confVsQuiz.high.avg.toFixed(1)) },
            { label: "Confidence 1–2", value: Number(s.confVsQuiz.low.avg.toFixed(1)) },
          ]}
          max={8}
          unit="/8"
        />
      </Finding>

      <Finding
        number={6}
        title="Is the human body really golden?"
        n={s.golden.n}
        source="Are You Golden? mini research"
        sourceHref="/math-in-action#golden"
        shows={
          <>
            The average height ÷ navel-height ratio was <strong>{s.golden.mean.toFixed(3)}</strong> (median{" "}
            {s.golden.median.toFixed(3)}), compared with φ = {PHI.toFixed(3)}. Only {s.golden.nearPhi}% of visitors were within
            0.05 of φ.
          </>
        }
        means="The average can land near 1.6, but individual bodies spread out on both sides. “The body follows the golden ratio” is an average-level approximation, not a rule each person obeys."
        caution="Self-measured data has errors (shoes, posture, where the navel is). Treat this as a class experiment, not a scientific study."
      >
        <BarChart data={s.golden.bins} />
      </Finding>

      <Finding
        number={7}
        title="What kind of mathematicians visit us?"
        n={s.types.n}
        source="Personality quiz"
        sourceHref="/interact#personality"
        shows={
          <>
            The most common result was <strong>{topType.label}</strong> ({topType.value} of {s.types.n}).
          </>
        }
        means="This is just for fun, but it shows something real: there is more than one way to be good at math. Spotting patterns, using precise language, reasoning and planning are all mathematical skills."
      >
        <BarChart data={s.types.items} />
      </Finding>
    </div>
  );
}

async function LiveFindings() {
  const s = await getStats();
  if (!s)
    return (
      <p className="box bg-mist p-8 text-center text-lg">
        The database isn&apos;t connected yet, so there&apos;s no data to show.
      </p>
    );
  return (
    <>
      <dl className="mb-12 grid grid-cols-3 gap-[3px] border-[3px] border-ink bg-ink">
        {[
          ["Unique visitors", s.totals.visitors, "bg-pool"],
          ["Answers collected", s.totals.responses, "bg-sun"],
          ["Wall posts", s.totals.wallPosts, "bg-blush"],
        ].map(([label, value, color]) => (
          <div key={label} className={`p-4 sm:p-7 ${color}`}>
            <dt className="text-xs font-bold uppercase sm:text-sm">{label}</dt>
            <dd className="mt-2 text-4xl font-extrabold tracking-tight sm:text-6xl">{value}</dd>
          </div>
        ))}
      </dl>
      <Findings s={s} />
    </>
  );
}

export default function DiscoverPage() {
  return (
    <>
      <PageHero number="05" eyebrow="What Did We Discover?" title="Our visitors, in numbers" color="ocean" art="chart">
        Every chart below is generated automatically from live visitor answers. We say what the data shows, then what it
        might mean, and we don&apos;t claim a cause without proof.
      </PageHero>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <Suspense fallback={<p className="py-20 text-center text-lg font-semibold">Crunching the numbers…</p>}>
          <LiveFindings />
        </Suspense>
      </div>
    </>
  );
}
