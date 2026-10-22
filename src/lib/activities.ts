// Content and scoring for every interactive activity.
// Shared by the client (to render) and the server (to validate and score).

export type ActivityId =
  | "symbol-quiz"
  | "pattern-hunt"
  | "polya-strategy"
  | "math-poll"
  | "mathematician-type"
  | "golden-ratio"
  | "short-reaction";

/* ---------- B. Math Language & Symbols: Symbol Quiz ---------- */

export const symbolQuiz = [
  {
    id: "element",
    prompt: "What does  x ∈ A  mean?",
    choices: ["x is an element of set A", "x is a subset of set A", "A has no element x", "x is equal to A"],
    answer: 0,
    why: "∈ is read “is an element of”. Its opposite is ∉.",
  },
  {
    id: "forall",
    prompt: "How do you read  ∀x ?",
    choices: ["There exists an x", "For all x", "x is not true", "x approaches infinity"],
    answer: 1,
    why: "∀ is the universal quantifier: “for all” or “for every”.",
  },
  {
    id: "exists",
    prompt: "Translate:  ∃x ∈ ℝ such that x² = 4",
    choices: [
      "Every real number squared is 4",
      "No real number squared is 4",
      "There is a real number whose square is 4",
      "x must be equal to 4",
    ],
    answer: 2,
    why: "∃ means “there exists”. x = 2 (or −2) works, so the statement is true.",
  },
  {
    id: "intersection",
    prompt: "A = {1, 2, 3} and B = {2, 3, 4}. What is A ∩ B?",
    choices: ["{1, 2, 3, 4}", "{2, 3}", "{1, 4}", "∅ (empty set)"],
    answer: 1,
    why: "∩ (intersection) keeps only the elements found in both sets.",
  },
  {
    id: "union",
    prompt: "Using the same sets, what is A ∪ B?",
    choices: ["{1, 2, 3, 4}", "{2, 3}", "{1, 2, 3, 2, 3, 4}", "{1, 4}"],
    answer: 0,
    why: "∪ (union) combines both sets. Repeated elements are listed once.",
  },
  {
    id: "subset",
    prompt: "A ⊆ B is true when…",
    choices: [
      "A and B share at least one element",
      "B has more elements than A",
      "Every element of A is also in B",
      "A and B have no elements in common",
    ],
    answer: 2,
    why: "⊆ means “is a subset of”: nothing in A is missing from B.",
  },
  {
    id: "function",
    prompt: "Which relation is a function?",
    choices: [
      "{(1, a), (1, b), (2, c)}",
      "{(1, a), (2, b), (3, a)}",
      "{(2, a), (2, b), (2, c)}",
      "{(1, a), (2, b), (1, c)}",
    ],
    answer: 1,
    why: "A function gives each input exactly one output. Two inputs may share an output, but one input can't have two.",
  },
  {
    id: "evaluate",
    prompt: "If f(x) = 2x + 3, what is f(4)?",
    choices: ["9", "14", "11", "8"],
    answer: 2,
    why: "Substitute: 2(4) + 3 = 8 + 3 = 11.",
  },
] as const;

export function scoreSymbolQuiz(answers: number[]) {
  return symbolQuiz.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);
}

/* ---------- A. Math in Our World: Pattern Hunt ---------- */

export const patternHunt = [
  { id: "fibonacci", name: "Fibonacci", terms: [1, 1, 2, 3, 5, 8], next: 13, rule: "Add the two previous terms." },
  { id: "squares", name: "Square numbers", terms: [1, 4, 9, 16, 25], next: 36, rule: "n² — 1², 2², 3², …" },
  { id: "geometric", name: "Doubling (geometric)", terms: [3, 6, 12, 24], next: 48, rule: "Multiply by 2 each time." },
  { id: "triangular", name: "Triangular numbers", terms: [1, 3, 6, 10, 15], next: 21, rule: "Add 2, then 3, then 4, then 5, then 6…" },
  { id: "arithmetic", name: "Arithmetic", terms: [7, 11, 15, 19], next: 23, rule: "Add 4 each time." },
  { id: "primes", name: "Prime numbers", terms: [2, 3, 5, 7, 11], next: 13, rule: "Numbers with exactly two factors: 1 and itself." },
] as const;

export function scorePatternHunt(guesses: number[]) {
  const correct = patternHunt.map((p, i) => guesses[i] === p.next);
  return { correct, score: correct.filter(Boolean).length };
}

/* ---------- C. Problem Solving & Reasoning: Choose Your Strategy ---------- */

export const polya = {
  problem:
    "12 classmates meet at a reunion. Every person shakes hands exactly once with every other person. How many handshakes happen?",
  answer: 66,
  understand: {
    prompt: "Step 1 · Understand the problem. What are we really looking for?",
    choices: [
      "The number of people at the reunion",
      "The number of different pairs of people",
      "How many hands each person shakes",
      "How long the handshakes take",
    ],
    answer: 1,
  },
  strategies: [
    { id: "diagram", label: "Draw a diagram", hint: "Draw 12 dots in a circle and connect every pair. Count the lines." },
    { id: "pattern", label: "Make a table & find a pattern", hint: "2 people → 1, 3 → 3, 4 → 6, 5 → 10… What are you adding each time?" },
    { id: "formula", label: "Use a formula", hint: "Each of n people shakes n − 1 hands, but each handshake is counted twice." },
    { id: "guess", label: "Guess and check", hint: "Make a guess, then test it with a smaller group you can count by hand." },
  ],
  solution:
    "Each of the 12 people shakes 11 hands: 12 × 11 = 132. But every handshake involves two people, so it was counted twice: 132 ÷ 2 = 66. In general, n people make n(n − 1)/2 handshakes.",
} as const;

export type StrategyId = (typeof polya.strategies)[number]["id"];

/* ---------- Survey / Poll ---------- */

export const poll = {
  whereMath: {
    prompt: "Where do you use math the most in daily life?",
    options: [
      { id: "budget", label: "Budgeting & shopping" },
      { id: "cooking", label: "Cooking & recipes" },
      { id: "commute", label: "Commuting & travel" },
      { id: "games", label: "Games & sports" },
      { id: "nature", label: "Noticing nature & art" },
      { id: "phone", label: "Phones, apps & social media" },
    ],
  },
  confidence: {
    prompt: "How confident are you in math?",
    labels: ["Not at all", "A little", "Okay", "Fairly", "Very"],
  },
  knewFib: {
    prompt: "Before today, did you know Fibonacci numbers appear in flowers and pinecones?",
  },
  topic: {
    prompt: "Which topic do you find most interesting?",
    options: [
      { id: "patterns", label: "Patterns & Fibonacci" },
      { id: "language", label: "Math language & symbols" },
      { id: "reasoning", label: "Problem solving & reasoning" },
    ],
  },
} as const;

/* ---------- Personality Quiz: What kind of mathematician are you? ---------- */

export type MathType = "pattern" | "language" | "logic" | "strategist";

export const mathTypes: Record<MathType, { title: string; blurb: string; hero: string }> = {
  pattern: {
    title: "The Pattern Seeker",
    blurb: "You spot repetition everywhere: in tiles, songs, sunflowers and schedules. You learn by noticing.",
    hero: "Like Leonardo of Pisa (Fibonacci), who popularised the famous rabbit sequence.",
  },
  language: {
    title: "The Symbol Speaker",
    blurb: "You love saying big ideas in few, precise symbols. To you, math is a language with grammar.",
    hero: "Like Georg Cantor, who gave us the language of sets.",
  },
  logic: {
    title: "The Logician",
    blurb: "You need to know why. A claim isn't true for you until it's proven step by step.",
    hero: "Like Euclid, who built geometry from a handful of axioms.",
  },
  strategist: {
    title: "The Strategist",
    blurb: "You see a puzzle and start planning. You try, check, adjust, and try again.",
    hero: "Like George Pólya, who wrote How to Solve It.",
  },
};

export const personalityQuiz: { prompt: string; options: { label: string; type: MathType }[] }[] = [
  {
    prompt: "You walk into a room with a strange tiled floor. You…",
    options: [
      { label: "Look for the repeating unit", type: "pattern" },
      { label: "Try to name the shapes precisely", type: "language" },
      { label: "Wonder if the tiles could ever run out", type: "logic" },
      { label: "Estimate how many tiles it took", type: "strategist" },
    ],
  },
  {
    prompt: "Your favourite kind of puzzle is…",
    options: [
      { label: "“What comes next?” sequences", type: "pattern" },
      { label: "Codes and ciphers", type: "language" },
      { label: "Who's-lying logic puzzles", type: "logic" },
      { label: "Escape rooms", type: "strategist" },
    ],
  },
  {
    prompt: "In a group project you're the one who…",
    options: [
      { label: "Notices what keeps going wrong", type: "pattern" },
      { label: "Writes it all up clearly", type: "language" },
      { label: "Checks if the argument holds up", type: "logic" },
      { label: "Makes the plan and the timeline", type: "strategist" },
    ],
  },
  {
    prompt: "A friend says “all cats are black”. You…",
    options: [
      { label: "Think of all the cats you've seen", type: "pattern" },
      { label: "Ask what they mean by “all”", type: "language" },
      { label: "Find one counterexample", type: "logic" },
      { label: "Plan a quick survey of cats", type: "strategist" },
    ],
  },
  {
    prompt: "Pick a symbol:",
    options: [
      { label: "φ (the golden ratio)", type: "pattern" },
      { label: "∈ (is an element of)", type: "language" },
      { label: "∴ (therefore)", type: "logic" },
      { label: "→ (next step)", type: "strategist" },
    ],
  },
];

export function personalityResult(picks: MathType[]): MathType {
  const order: MathType[] = ["pattern", "language", "logic", "strategist"];
  const counts = Object.fromEntries(order.map((t) => [t, 0])) as Record<MathType, number>;
  for (const p of picks) counts[p]++;
  // Ties go to the type picked on the latest question among the tied ones.
  const max = Math.max(...order.map((t) => counts[t]));
  for (let i = picks.length - 1; i >= 0; i--) if (counts[picks[i]] === max) return picks[i];
  return "pattern";
}

/* ---------- Math in Action: Golden Ratio mini-research ---------- */

export const PHI = (1 + Math.sqrt(5)) / 2;

/* ---------- Math Shorts ---------- */

export const reactions = [
  { id: "mindblown", label: "Mind-blown", emoji: "🤯" },
  { id: "learned", label: "Learned something", emoji: "💡" },
  { id: "confused", label: "Still confused", emoji: "🤔" },
] as const;

export type ReactionId = (typeof reactions)[number]["id"];

export const shorts = [
  {
    id: "kkGeOWYOFoA",
    title: "Nature by Numbers",
    by: "Cristóbal Vila",
    topic: "A · Math in Our World",
    note: "Fibonacci, the golden ratio and Voronoi patterns animated in nature. No narration, just math.",
  },
  {
    id: "SjSHVDfXHQ4",
    title: "The magic of Fibonacci numbers",
    by: "Arthur Benjamin · TED",
    topic: "A · Math in Our World",
    note: "Why the Fibonacci sequence hides so many surprising patterns.",
  },
  {
    id: "wTlw7fNcO-0",
    title: "The Fibonacci Sequence: Nature's Code",
    by: "SciShow",
    topic: "A · Math in Our World",
    note: "Where Fibonacci really shows up in plants, and where the claims go too far.",
  },
  {
    id: "2SUvWfNJSsM",
    title: "Binary, Hanoi and Sierpinski, part 1",
    by: "3Blue1Brown",
    topic: "B · Math Language & Symbols",
    note: "How counting in binary is secretly the solution to a famous puzzle.",
  },
  {
    id: "ADR7dUoVh_c",
    title: "Can you solve the river crossing riddle?",
    by: "Lisa Winer · TED-Ed",
    topic: "C · Problem Solving & Reasoning",
    note: "Pause before the answer and try Pólya's four steps yourself.",
  },
  {
    id: "N5vJSNXPEwA",
    title: "Can you solve the prisoner hat riddle?",
    by: "Alex Gendler · TED-Ed",
    topic: "C · Problem Solving & Reasoning",
    note: "A classic deductive reasoning puzzle about parity.",
  },
] as const;
