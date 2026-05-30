# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (accessible on LAN via --host)
npm run build     # Production build → dist/
npm run lint      # ESLint
npm run preview   # Preview production build locally
npm run deploy    # Build + deploy to GitHub Pages (gh-pages -d dist)
```

No test suite is configured.

## Architecture

Single-page portfolio built with React 19 + Vite. No router — all sections are on one page separated by anchor links (`#top`, `#projects`, `#about`).

**App flow:**
1. `Welcome` component plays an intro animation; once done it sets `showMain = true`.
2. The main layout renders: `GlobalBackground` (canvas/CSS background), hamburger nav, header with `Title` + `MyStatus`, then three `FadeIn`-wrapped sections.

**Key files:**
- `src/App.jsx` — root component; owns all top-level state (active tab, carousel slide, menu open, welcome shown).
- `src/data/projects.js` — `projectsData` array; add new projects here. Each entry has `{ id, category, title, description, image, repoUrl }`. Categories are derived dynamically with `useMemo`, so adding a new `category` string auto-creates a group in the Projects section.
- `src/data/editorFiles.jsx` — content for the fake code-editor UI in the About section. Keys are tab filenames; values are the text content displayed.
- `src/components/FadeIn.jsx` — wraps children with Intersection Observer–based fade-in animation.
- `src/components/ProjectCard.jsx` — renders one project tile.
- `src/components/GlobalBackground.jsx` — animated background (Anime.js).

**Styling:** Vanilla CSS only (`src/index.css`, `src/App.css`, `src/components/Welcome.css`). Dark theme enforced globally.

**Static assets:** Images live in `public/images/` and are referenced as `./images/…` (not imported).

**Deployment:** GitHub Pages via `gh-pages`. The live site is at `https://Sh1n1230.github.io/Portfolio/`.
