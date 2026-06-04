---
name: testing-reaction-arcade
description: Run and test the Reaction Arcade app (Reaction Battle + Box Catch games) end-to-end. Use when verifying UI or game-logic changes in this repo.
---

# Testing Reaction Arcade

React + Vite static site, no backend, no secrets required.

## Run locally
```bash
npm install
npm run dev   # http://localhost:5173
npm run build # production build (this is what CI runs)
```
There is no lint or unit-test script in package.json. PR-level CI is not configured — the GitHub Pages deploy workflow only runs on push to `main`.

## App structure
- `src/App.jsx` — shell: header + game selector ("⚡ Reaction Battle", "📦 Box Catch").
- `src/ReactionGame.jsx` — original reaction-time game (click when screen turns green).
- `src/BoxCatchGame.jsx` + `src/boxCatchUtils.js` — Box Catch game and its difficulty/stat helpers.

## Box Catch behavior to verify
- Click "📦 Box Catch" → Start → a box appears at a random spot; click it to score.
- Tracks Score, Misses, Avg Reaction (ms), and a localStorage Best score (`boxCatchBestScore`).
- Adaptive difficulty (`getDifficulty(score, misses)` in boxCatchUtils.js):
  - `score > 10` → Medium (interval 1500→1000ms)
  - `score > 20` → Hard (→700ms)
  - `misses > 5` → step one level slower
  - Live badge reads "Difficulty: Easy | Medium | Hard".

## Important: tool-latency workaround
The box auto-jumps every 0.7–1.5s, which is faster than computer-use tool latency (~5s/action). Clicking boxes reliably via the computer tool is otherwise impossible. Two good approaches:
1. **Verify difficulty logic deterministically** with a tiny Node script importing `getDifficulty` from `./src/boxCatchUtils.js` (module is ESM; package.json has `"type":"module"`). Assert exact label/interval for boundary cases (10, 11, 20, 21, misses>5).
2. **For the UI recording**, temporarily raise only the box *lifetime* (the `interval` values returned by `getDifficulty`) to a large constant (e.g. 12000ms) so boxes stay clickable. This does NOT affect the score/misses threshold logic, so the Easy→Medium badge transition at score 11 is still genuine. Revert the edit afterward (Vite HMR picks it up live).

To show a Miss, just wait without clicking until the box lifetime expires.

## Regression check
After any refactor, switch back to "⚡ Reaction Battle" and play one round (click area → wait for green → click) to confirm the original game still records a time and updates the leaderboard.

## Devin Secrets Needed
None.
