# CLAUDE.md — Context for Claude Code

This file gives Claude Code full context on this project so every session starts instantly without re-explaining anything.

---

## Project Overview

Apps built with Claude, deployed automatically to Vercel. The goal is: Claude generates code → pushes to GitHub → Vercel deploys → user gets a live URL. Zero manual steps for the user.

## Owner

- GitHub username: `Ivyx-hue`
- Location: Lot-et-Garonne, France
- Background: QHSE Bachelor student at CESI Bordeaux (alternance), former electrician on nuclear sites (habilitations B1V, BR, H1V, SCN1, CSQ, RP1), accounting background (BTS CGO)

---

## Stack

| Service | URL / ID |
|---------|----------|
| GitHub repo | https://github.com/Ivyx-hue/mes-apps-claude |
| Vercel production | https://mes-apps-claude.vercel.app |
| Supabase project | https://gbriufihpknyyajoujdu.supabase.co |
| Supabase region | eu-west-3 (Paris) |

### Vercel env variables (already configured)
- `NEXT_PUBLIC_SUPABASE_URL` = https://gbriufihpknyyajoujdu.supabase.co
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = see Supabase dashboard → Settings → API Keys

---

## Deploy Pipeline

```
Claude generates code
        ↓
git clone https://<TOKEN>@github.com/Ivyx-hue/mes-apps-claude.git
        ↓
copy file(s) into repo
        ↓
git add . && git commit -m "🚀 Deploy: <app-name>"
        ↓
git push origin main
        ↓
Vercel auto-deploys (GitHub Actions workflow already configured)
        ↓
Live at https://mes-apps-claude.vercel.app (~60 seconds)
```

### GitHub Actions workflow
Already configured at `.github/workflows/deploy.yml`. Do not modify.

### GitHub Token
- Scope: `repo` + `workflow`
- Expiry: 90 days (ask user to regenerate if expired)
- The user provides the token at the start of each session
- Never log or expose the token in output

---

## Current Apps

### QHSE Trainer (`index.html`)
- Flashcards + QCM to prepare for Bachelor QHSE at CESI
- 5 modules: ISO norms, DUERP, TMS, Risque Routier, Acronymes
- Pure HTML/CSS/JS, no dependencies, localStorage for progress
- Live at: https://mes-apps-claude.vercel.app

---

## How to Deploy a New App

1. Generate the app as a single `index.html` (HTML + CSS + JS inline)
2. Clone the repo using the GitHub token provided by the user
3. Replace or add the file in the repo
4. Push to main
5. Announce the URL to the user

For multi-app support in the future: use subdirectories + Vercel rewrites.

---

## User Preferences

- Language: French in conversation, English in code/comments
- Style: direct, collaborative, no unnecessary explanations
- Interaction: user uses Wispr Flow (voice), so keep prompts concise
- Apps should work on mobile and desktop
- Dark mode preferred for UI

---

## Skills Installed

- `deploy-vercel` — auto-deploy skill (see above pipeline)

---

## Notes for Claude Code

- Always `git pull` before pushing to avoid conflicts
- Commit messages in format: `🚀 Deploy: <app-name>` or `✨ Feature: <description>`
- The user does NOT want to run any commands manually — Claude handles everything
- When token is missing, ask: "J'ai besoin de ton token GitHub (ghp_...) pour déployer."

<!-- GSD:project-start source:PROJECT.md -->
## Project

**QHSE CESI Hub**

A personal study companion website that aggregates everything I need to know about the Bachelor QHSE at CESI Bordeaux — official programme, RNCP blocs de compétences, curated external resources (Reddit, INRS, ISO norms, past exam material), and reference links. Built as a single-user reading hub so I can "survoler la formation" before the rentrée and stay organized during it.

**Core Value:** Have one trustworthy place that answers "what is this formation, what will I study, and where do I find the best resources" — without having to dig through scattered sources every time.

### Constraints

- **Tech stack**: Pure HTML + CSS + JS in a single `index.html` file. No build step, no npm dependencies, no framework. Persistence via `localStorage` only if needed.
- **Location**: `/qhse-cesi/index.html` inside the existing `mes-apps-claude` repo. Must not break the existing QHSE Trainer at the repo root.
- **Browser support**: Modern evergreen browsers on mobile + desktop. Dark mode is the default theme.
- **Content policy**: All resource links must be curated and verifiable. No scraping at runtime — content is baked into the HTML and updated manually via git commits.
- **Visual identity**: Must be distinct from the QHSE Trainer's "Industrial Safety Terminal" aesthetic. Each app in this repo has its own personality.
- **Deploy flow**: Every change ships through the existing GitHub Actions pipeline. No manual Vercel CLI usage.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## TL;DR
- A modern CSS reset (Comeau + Bell hybrid, ~25 lines, inline)
- **Inter** (body / UI) + **Fraunces** or **Lora** (headings, editorial feel) + **JetBrains Mono** (code / labels) — loaded via Google Fonts CSS2 with `display=swap` and a `preconnect` to `fonts.gstatic.com`
- **OKLCH** custom properties + `light-dark()` for theming, dark default via `<meta name="color-scheme" content="dark light">` and `color-scheme: dark light` on `:root`
- **Lucide** icons via inline SVG, version-pinned (no JS runtime — copy/paste the 10–15 SVG paths you actually use)
- **Modern CSS only**: `:has()`, container queries, subgrid, `clamp()` fluid type, `@scope` for section-scoped styles, `@starting-style` for entrance transitions, view transitions for in-page anchor navigation
- Zero JavaScript dependencies. ~6 lines of vanilla JS for the burger menu and smooth scroll.
## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Plain HTML5 | living standard | Document structure | Native, zero runtime, mirrors existing `index.html` pattern in this repo |
| Modern CSS (one inline `<style>`) | CSS Color L4, CSS Nesting, `@layer`, `@scope`, `light-dark()`, container queries, subgrid | All styling, theming, layout, motion | All needed primitives are Baseline in 2026; eliminates the historical reasons to reach for Sass/Tailwind |
| Vanilla JS (one inline `<script>`) | ES2024 | Burger menu toggle, smooth scroll fallback, optional `localStorage` "last-read section" marker | The page is ~95% static content — no state machine needed. Mirrors the working pattern in repo's existing `index.html` |
### Supporting Libraries (CDN-only, optional, version-pinned)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Google Fonts CSS2 API | n/a (HTTP) | Web fonts | Always — `<link>` to `fonts.googleapis.com/css2?...&display=swap` with `preconnect` to `fonts.gstatic.com` |
| Lucide static SVG | `lucide@0.460.0` (pin a recent stable) | UI icons (search, external-link, book-open, etc.) | **Inline the 10–15 SVGs you use** — do NOT load the runtime UMD bundle. The runtime adds ~30 KB for a feature you don't need (DOM mutation observer). |
| highlight.js | **Do not include in V1** | Syntax highlighting for code blocks | Only if/when you embed code snippets (Python, R, SQL). V1 is policy/norm/text content — no code. Defer. |
### Development "Tools"
| Tool | Purpose | Notes |
|------|---------|-------|
| Browser devtools | Iterate on styles | Live-edit CSS in DevTools, paste back into the file. Standard workflow for single-file projects. |
| Existing GitHub Actions pipeline | Deploy | Already configured at `.github/workflows/deploy.yml`. Push to `main`, live in ~60s at `/qhse-cesi/`. Do not touch. |
## "Installation"
## Typography Recommendation (the actual decision)
| Role | Font | Weights | Rationale |
|------|------|---------|-----------|
| Headings | **Fraunces** (variable) | 400, 600, 700 | Modern variable serif with editorial / book personality. Optical sizing axis (`opsz` 9..144) makes large display headings feel sculpted. Sets clear visual contrast with QHSE Trainer's Bebas Neue. |
| Body / UI | **Inter** | 400, 500, 600, 700 | Industry standard for screen reading in 2026. Optimized metrics, excellent French diacritic coverage (essential — content is in French with `é à ç ê û ô î ï`). |
| Mono / labels / RNCP codes | **JetBrains Mono** | 400, 500 | Pairs naturally with Inter (same humanist heritage), readable for short technical strings (RNCP codes, ISO numbers, durations). |
## Theming: Dark-First with OKLCH
### Pattern
## Modern CSS Features to Use
| Feature | Where you'll use it |
|---------|---------------------|
| **CSS Nesting** | Component blocks (`.card { & h3 { ... } }`) — inline `<style>` stays readable without a preprocessor |
| **`@layer reset, base, components, utilities`** | Eliminates the cascade-specificity wars; reset always loses to component styles regardless of selector |
| **`@scope` for sections** | `.biblio` and `.decouverte` get isolated styles without BEM gymnastics. `@scope (.biblio) { a { color: var(--accent); } }` |
| **`clamp()` fluid type** | `h1 { font-size: clamp(2rem, 4vw + 1rem, 4.5rem); }` — no media queries needed for type scale |
| **`:has()`** | `nav:has(:checked) { ... }` enables a CSS-only burger menu via a hidden checkbox — saves ~10 lines of JS |
| **Container queries** | Resource cards adapt to their column width (`@container (min-width: 24rem)`), not the viewport — same card works in 1-col mobile, 2-col tablet, 3-col desktop |
| **Subgrid** | Card grids where titles, descriptions, and metadata align across rows of the parent grid |
| **`@starting-style`** | Section reveal animations without JS: cards fade-in on first render with pure CSS |
| **View transitions** | `@view-transition { navigation: auto; }` — even though this is a single page, hash-anchor navigation can use the SPA-style API for tiny crossfades between sections |
| **`scroll-behavior: smooth`** + **`scroll-margin-top`** | Native smooth-scroll for anchor nav with offset for the sticky header — zero JS |
## Minimal CSS Reset (paste this verbatim)
- `text-wrap: balance` for headings and `text-wrap: pretty` for paragraphs are Baseline in 2026 and produce noticeably better line breaks with zero effort.
- `min-height: 100dvh` (dynamic viewport height) prevents mobile address bar jumps.
- The `prefers-reduced-motion` block is the only "ethics tax" you must pay — non-negotiable for an accessible reading hub.
## Icons: Inline SVG, Not the Runtime
## Alternatives Considered
| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Inline `<style>` block | External `qhse-cesi.css` file | If the CSS grows beyond ~600 lines, splitting becomes ergonomically worth it. Still no build step — just a second `<link>`. Not needed for V1. |
| Fraunces + Inter | Lora + Inter | If Fraunces feels too editorial / draws attention away from content during real reading sessions |
| Inline Lucide SVG sprite | Lucide UMD runtime via CDN | Only during early prototyping when you're still deciding which icons to use. Always migrate to sprites before merging. |
| OKLCH + `light-dark()` | Plain hex + `prefers-color-scheme` media query | If you discover a deployment target that doesn't render OKLCH (none expected on modern evergreen browsers in 2026). Same colors, ~3x more lines of CSS. |
| `@scope` for section styles | BEM class naming (`.biblio__card--featured`) | If `@scope` proves awkward for some specific nesting case. BEM is the proven fallback. |
| Vanilla JS (~30 lines) | Alpine.js via CDN | **Never** for V1 — see "What NOT to Use." Alpine becomes justifiable only if interactive state grows beyond the burger menu (deferred to V2). |
| Native `scroll-behavior: smooth` | A smooth-scroll polyfill | Never — Baseline since 2020, works everywhere. |
## What NOT to Use
| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **Tailwind (any version, including the Play CDN)** | Violates the single-file philosophy in spirit even when delivered via CDN: ships ~3 MB of utility classes you mostly don't use; couples the design to a framework's conventions; obscures the CSS so future-you (or Claude) can't read the file without `tailwind.config.js` context. Modern vanilla CSS (`@layer`, nesting, `clamp`, container queries) eliminates every reason Tailwind existed. | Vanilla CSS with `@layer` + custom properties |
| **Alpine.js / htmx / petite-vue** | Tempting because they're "small frameworks via CDN" — but V1 has near-zero interactive state (one burger menu, smooth scroll). They solve a problem you don't have, and once in, every future feature gets bent through their idioms. | ~30 lines of vanilla JS, or pure CSS with `:has()` and a hidden checkbox |
| **Sass / PostCSS / any preprocessor** | Requires a build step. The project hard constraint is "no build step." CSS nesting + `@layer` + custom properties cover every feature you'd reach for Sass for. | Native CSS nesting and custom properties |
| **Bootstrap / Pico / Bulma / any classed CSS framework** | Imposes a visual identity that fights the "distinct from QHSE Trainer" goal. Adds 30–200 KB of styles you'll override anyway. | Hand-rolled CSS — the file is already going to be ~800 lines, framework "savings" disappear when you customize |
| **highlight.js / Prism (V1)** | V1 content is regulatory text, norms, links, definitions — no code snippets. Adding a syntax highlighter for content you won't have wastes ~50 KB and a script tag. | Defer to V2. When/if code snippets appear, revisit. |
| **Lucide UMD runtime bundle** | 80 KB for a feature (dynamic icon DOM injection) that a static page doesn't need. | Inline SVG sprite with the 10–15 icons you actually use |
| **`<script type="module">` from `esm.sh` / `cdn.skypack.dev`** | Tempting to pull in tiny ESM helpers ("just a fuzzy-search lib for the biblio"). Each one adds a network request, a third-party trust relationship, and a vector for future breakage. The biblio has <50 items — a `filter()` call on an array is enough. | Inline JS, inline data |
| **Markdown → HTML conversion at runtime** (Marked, markdown-it via CDN) | Tempting for the long-form "Découverte" section. But you'd still author French content in the HTML file anyway. Conversion at runtime adds a library; conversion at authoring time costs nothing. | Author content directly in HTML (semantic `<article>`, `<section>`, `<h2>`, `<p>`, `<dl>` for definitions) |
| **Font-loading JS libraries** (Web Font Loader, Fontaine) | Google Fonts with `display=swap` + `preconnect` already gives FOUT not FOIT, which is the correct UX. No JS needed. | The two `<link rel="preconnect">` tags above |
| **Service workers / offline-first PWA tooling** | Out of scope for V1. The site is small enough that the browser cache handles repeat visits. PWA adds complexity that pays back only at scale. | Browser's default HTTP cache + Vercel's edge caching |
| **Vercel Analytics / Plausible / any analytics** | Single-user personal tool. Privacy + simplicity dictate no analytics. | Nothing |
## Stack Patterns by Variant
- Add a vanilla JS filter input (`<input type="search">` → `oninput` filters DOM via class toggle). ~15 lines.
- Do NOT reach for Fuse.js or a fuzzy-search library — `String.includes()` on a `.toLowerCase()` haystack covers 99% of personal-reference use cases.
- Move to two files: `index.html` (Découverte) + `biblio.html`. Still no build, just two pages sharing a CSS file via `<link>`.
- Or split this into a Hub V2 that's separate from V1 reading mode entirely.
- Avoid SPAs — the GitHub Actions pipeline deploys static files, multi-page is free.
- `history.replaceState()` on scroll into a section via `IntersectionObserver`. ~10 lines, no dependencies. Don't reach for routing libraries.
## Version Compatibility / Browser Support
| Feature | Status as of May 2026 | Risk |
|---------|----------------------|------|
| `light-dark()` | Baseline (May 2024), Widely Available Nov 2026 | None on modern evergreen browsers |
| OKLCH colors | Fully supported (Chrome/Edge/Firefox/Safari since 2023) | None |
| CSS Nesting | Baseline 2023 | None |
| `:has()` | Baseline 2023, 100% support 2026 | None |
| Container queries | Baseline 2023 | None for size queries; style queries still partial — avoid |
| Subgrid | Baseline Widely Available March 2026 | None |
| `@scope` | Shipped in Firefox 2026 (last holdout) | Newly Baseline — safe but very new. Have a fallback (BEM-style class) if you discover an edge case |
| `@starting-style` | Baseline Newly Available (Chrome 117+, Safari 17.5+, Firefox 129+) | Safe; if it fails, the element just appears without the entrance animation — graceful degradation |
| View transitions (SPA) | Baseline (Chrome/Edge/Safari/Firefox) | Safe |
| View transitions (cross-document) | Newly Available — use with progressive enhancement | If unsupported, navigation works without the crossfade — no functional loss |
| `text-wrap: balance` / `pretty` | Baseline 2024 | None |
| Native `<dialog>` (if needed) | Baseline 2022 | None |
## Implementation Sketch (the first 40 lines of CSS)
## Sources
- [Josh W. Comeau — A Modern CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/) — HIGH confidence (canonical, updated March 2026)
- [Andy Bell — modern CSS reset patterns via Piccalilli](https://piccalil.li/blog/fluid-typography-with-css-clamp/) — HIGH confidence
- [MDN — `light-dark()` CSS function](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) — HIGH confidence (Baseline May 2024, widely available Nov 2026)
- [web.dev — color-scheme-dependent colors with `light-dark()`](https://web.dev/articles/light-dark) — HIGH confidence
- [MDN — `prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) — HIGH confidence
- [Evil Martians — OKLCH in CSS: why we moved from RGB and HSL](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) — HIGH confidence (in-production case study)
- [LogRocket — Container queries in 2026: Powerful, but not a silver bullet](https://blog.logrocket.com/container-queries-2026/) — HIGH confidence (current)
- [zenn.dev — CSS Subgrid Now Supported in All Browsers](https://zenn.dev/tonkotsuboy_com/articles/css-subgrid-all-browsers?locale=en) — HIGH confidence (confirms March 2026 Baseline)
- [modern-css.com — What's New in CSS 2026](https://modern-css.com/whats-new-in-css-2026/) — MEDIUM confidence (current overview, multiple features verified independently)
- [nerdy.dev — 4 CSS Features Every Front-End Developer Should Know In 2026](https://nerdy.dev/4-css-features-every-front-end-developer-should-know-in-2026) — MEDIUM confidence
- [Lucide — vanilla JS usage guide](https://lucide.dev/guide/lucide) — HIGH confidence
- [Tobias Ahlin — Responsive type scales with composable CSS utilities](https://tobiasahlin.com/blog/responsive-fluid-css-type-scales/) — HIGH confidence
- [Piccalilli — Fluid typography with CSS clamp](https://piccalil.li/blog/fluid-typography-with-css-clamp/) — HIGH confidence
- Google Fonts CSS2 API — verified via direct construction of the request URL against `fonts.googleapis.com/css2` syntax (documented behavior)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
