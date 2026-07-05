# SH — Het Sharma's Portfolio

A premium, dark, case-file-themed personal portfolio built with **React 19 + Vite + TypeScript**.
The brand: **SH** — software engineer, digital problem solver, curious investigator. No UI
libraries, no animation libraries — design tokens, CSS Modules, and one IntersectionObserver.
~79 kB gzipped JS (mostly React itself).

## Quick start

```bash
npm install
npm run dev        # dev server → http://localhost:5173
npm run build      # typecheck + production build → dist/
npm run preview    # serve the production build → http://localhost:4173
```

## Editing your content

**All content lives in `src/data/` — you never touch a component to update the site.**

| File | Section it controls |
| --- | --- |
| `src/data/profile.ts` | Name, roles, statement, email, socials, footer quote |
| `src/data/about.ts` | About story + the "Subject Profile" dossier card |
| `src/data/toolkit.ts` | Investigation Toolkit categories and tags |
| `src/data/cases.ts` | Case Files — number, mission, challenges, outcome, links |
| `src/data/chapters.ts` | Field Experience chapter timeline |
| `src/data/education.ts` | Education |
| `src/data/lab.ts` | Cyber Lab interest topics (framed as self-learning) |
| `src/data/gaming.ts` | Current Side Quest save-file cards |
| `src/data/achievements.ts` | Achievements stat cards |
| `src/data/nav.ts` | Navbar + command-palette sections |

Also update the meta/OG tags, canonical URL, and JSON-LD in `index.html` before deploying,
and replace the placeholder social/repo URLs in the data files.

### Case visuals

Case cards use hand-drawn CSS mock screens (`CaseVisual.tsx`) so the site ships with zero image
assets. To use real screenshots, replace `<CaseVisual …>` in
`src/components/sections/CaseFiles.tsx` with `<img src="…" alt="…" loading="lazy" />`.

## Hidden interactions

None interfere with normal use; all respect keyboard focus and reduced motion.

- **Ctrl/⌘ + K** — command palette ("Search case files...")
- Type **`221B`** — Investigation Mode: the emerald accent flips to deep amber (one CSS class)
- Type **`sudo solve`** — a sympathetic message from the terminal
- **Konami code** (↑↑↓↓←→←→BA) — Developer Notes
- **Double-click the SH logo** — Hidden Stats

## Design system

Everything derives from tokens in `src/styles/global.css`:

- **Colors** — deep black `#060708`, charcoal surfaces, one emerald accent `#3ecf8e`
  (`--accent`, `--accent-rgb`, tint/glow variants). Investigation Mode overrides the same
  variables under `:root.investigation`.
- **Type** — Space Grotesk (display), Inter (body), JetBrains Mono (case labels, file numbers).
- **Motion** — one-time intro loader ("Analyzing..."), scroll reveals that fire once, drifting
  network lines in the hero, 150–250 ms hovers. Fully disabled under `prefers-reduced-motion`.

## Structure

```
src/
├─ data/           ← your content (edit these)
├─ styles/         ← global tokens, reset, keyframes
├─ hooks/          ← useScrollSpy, useScrolled
├─ icons/          ← inline SVG icon set (no icon library)
├─ lib/bus.ts      ← tiny pub/sub for palette/toasts/easter eggs
└─ components/
   ├─ ui/          ← Reveal, Button, SectionHeading, Tag, GlassCard
   ├─ layout/      ← Navbar, Footer, BackToTop
   ├─ system/      ← IntroLoader, CommandPalette, Toaster, Modal, EasterEggs
   └─ sections/    ← Hero, About, Toolkit, CaseFiles, Experience, Education,
                     CyberLab, Gaming, Achievements, Contact
```

## Deploying

`npm run build` produces a static `dist/` — host anywhere (Vercel, Netlify, GitHub Pages,
Cloudflare Pages). Update the canonical/OG URLs in `index.html` and add a real 1200×630
`public/og.png` (the tag is ready to uncomment).
