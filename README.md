# Math in Motion

Interactive math website for **GED 102 · Mathematics in the Modern World**. Visitors play, answer, vote, solve and share; every answer is stored in Supabase and turned into live findings.

Built with Next.js (App Router), Supabase and Tailwind CSS, hosted on Vercel.

## Pages

| # | Page | Path | What's there |
|---|------|------|--------------|
| 1 | Home | `/` | Intro, call-to-action, live visitor counter |
| 2 | Explore Math | `/explore` | Lessons on topics A, B, C + Fibonacci spiral, set playground, reasoning sorter |
| 3 | Interact | `/interact` | Symbol Quiz, Pattern Hunt, Choose Your Strategy (Pólya), Poll, Personality Quiz |
| 4 | Math in Action | `/math-in-action` | Sunflower golden angle, golden-ratio mini research, fare function, budgeting |
| 5 | What Did We Discover? | `/discover` | 7 auto-generated findings with charts and interpretation |
| 6 | Math Community | `/community` | Freedom wall |
| 7 | Math Shorts | `/shorts` | 6 curated videos + our own interactive animation, with reactions |
| 8 | About the Project | `/about` | Credits, checklist, AI disclosure, sources |

## Setup

1. In Supabase, open **SQL Editor**, paste `supabase/schema.sql`, and run it.
2. Copy `.env.example` to `.env.local` and fill in `SUPABASE_URL` and `SUPABASE_SECRET_KEY`.
3. `npm install` then `npm run dev`.

On Vercel, add the same two environment variables in **Project → Settings → Environment Variables**.

## Editing

- Group names, section and roles: `src/lib/site.ts`
- Quiz questions, patterns, poll options, videos: `src/lib/activities.ts`
- Moderating the freedom wall: in Supabase **Table Editor → wall_posts**, set `hidden` to `true` on a post.

## Security

The secret key is only used on the server (`src/lib/supabase.ts` imports `server-only`). Row Level Security is enabled with no public policies, so the publishable key can't read or write the tables directly. All answers are validated and scored on the server in `src/app/actions.ts`.
