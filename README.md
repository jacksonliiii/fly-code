# Interview Drills

A Duolingo-style web app for keeping up with big-tech technical interview topics in short, digestible quiz sessions — no coding required.

## What it is

- **184 questions across 23 topics**: DS&A patterns (two pointers, sliding window, backtracking, DP, graphs, heaps, tries, union-find...), Big-O/bit manipulation, system design (scalability, caching, databases, distributed systems, API design), and behavioral interview prep (STAR method, Amazon-style leadership principles scenarios).
- **Duolingo-like learning path**: topics are grouped into color-coded units with a winding path of nodes you tap to start a lesson.
- **Spaced repetition**: every answer updates a lightweight SM-2 schedule. The Review tab surfaces exactly the questions due for review, so weak topics resurface right before you'd forget them.
- **Local-only progress**: everything is stored in the browser's `localStorage` — no backend, no account, works great on your phone.

## Running it

```bash
npm install
npm run dev
```

Then open the printed URL. To use it on your phone, run `npm run dev -- --host` and open the printed network URL from your phone (on the same Wi-Fi), or deploy the built `dist/` folder (`npm run build`) to any static host (Vercel, Netlify, GitHub Pages, etc.) for anywhere access.

## Project structure

- `src/data/topics.ts` — topic/category metadata
- `src/data/questions.ts` — the question bank
- `src/lib/srs.ts` — spaced repetition (SM-2-lite) scheduling
- `src/lib/storage.ts` — localStorage persistence
- `src/components/` — Home (path map), Lesson session, Review, Stats
