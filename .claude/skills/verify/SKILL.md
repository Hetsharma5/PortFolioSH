---
name: verify
description: Build, serve, and drive the portfolio site to verify changes end-to-end with screenshots.
---

# Verifying the portfolio site

Single-page React 19 + Vite + TypeScript static site. No backend, no tests — verification is
visual/behavioral via a headless browser.

## Build & serve

```powershell
npm run build      # tsc --noEmit && vite build  → dist/
npm run preview    # serves dist/ at http://localhost:4173 (run in background)
```

`npm run dev` (port 5173) also works for iteration, but verify against the production build.

## Drive it

Playwright is a devDependency and uses the system Edge browser — no browser download needed:
`chromium.launch({ channel: "msedge", headless: true })`.

A full driver script exists from the original build (session scratchpad `verify.mjs`); rewrite or
reuse the pattern. Note for scripts living outside the repo: resolve playwright via
`createRequire("E:/fable 5/package.json")("playwright")`.

Flows worth driving after a change:
- Intro loader: shows once per context ("Initializing investigation..."), gone after ~2.4s;
  wait it out before interacting. Skipped entirely under `reducedMotion: "reduce"`.
- Hero renders at 1440×900 and 390×844; screenshot both.
- Step-scroll the full page (`window.scrollTo({ behavior: "instant" })` + ~150ms waits) so every
  IntersectionObserver `Reveal` fires, then check `opacity === 1` on section content.
- Scrollspy: park a section ~30% from viewport top, assert `aria-current="true"` on its
  `header nav a[href="#id"]` (nav ids: about, toolkit, cases, experience, lab, contact).
- Command palette: `Control+k` opens input placeholder "Search case files...", garbage query
  shows "Case Not Found", typing a section + Enter navigates there.
- Easter eggs: type `221b` → `document.documentElement` gains class `investigation` + toast;
  type `sudo solve` → toast; Konami (↑↑↓↓←→←→ba) → "DEVELOPER NOTES" dialog; dblclick the SH
  logo → "HIDDEN STATS" dialog. Close with the exact-match "Close File" button or Escape.
- Mobile drawer: click `aria-label="Open menu"`, assert links visible, click one → drawer closes
  and the page scrolls to the section.
- Copy-email button in #contact flips to "Copied!" (grant `clipboard-read`/`clipboard-write`).
- Back-to-top button appears after ~600px scroll, returns `scrollY` to 0.
- No horizontal overflow: `scrollWidth - clientWidth === 0` at 1440 / 390 / 360.
- `reducedMotion: "reduce"` context: content must be visible immediately (reveals disabled).

## Gotchas

- CSS `scroll-behavior: smooth` applies to programmatic scrolls — use `behavior: "instant"` in
  `evaluate()` for deterministic positions, and wait ~800ms after clicks that trigger smooth scroll.
- The mobile drawer must stay OUTSIDE the `<header>` element in `Navbar.tsx`: the header's
  `backdrop-filter` makes it the containing block for fixed descendants and collapses the drawer
  to zero height (this was a real bug once).
- Screenshots of below-the-fold sections are blank unless you scrolled them into view first
  (reveals start at opacity 0).
