# Stack Research — QHSE CESI Hub

**Domain:** Single-file static documentation / reading hub (vanilla HTML+CSS+JS, no build)
**Researched:** 2026-05-11
**Confidence:** HIGH

---

## TL;DR

Ship `/qhse-cesi/index.html` as **one self-contained file** with:

- A modern CSS reset (Comeau + Bell hybrid, ~25 lines, inline)
- **Inter** (body / UI) + **Fraunces** or **Lora** (headings, editorial feel) + **JetBrains Mono** (code / labels) — loaded via Google Fonts CSS2 with `display=swap` and a `preconnect` to `fonts.gstatic.com`
- **OKLCH** custom properties + `light-dark()` for theming, dark default via `<meta name="color-scheme" content="dark light">` and `color-scheme: dark light` on `:root`
- **Lucide** icons via inline SVG, version-pinned (no JS runtime — copy/paste the 10–15 SVG paths you actually use)
- **Modern CSS only**: `:has()`, container queries, subgrid, `clamp()` fluid type, `@scope` for section-scoped styles, `@starting-style` for entrance transitions, view transitions for in-page anchor navigation
- Zero JavaScript dependencies. ~6 lines of vanilla JS for the burger menu and smooth scroll.

The constraint isn't a limitation in 2026 — modern CSS does almost everything a framework used to. The temptation is to reach for Tailwind, Alpine, or htmx; **don't**. They violate the single-file rule and add nothing this project needs.

---

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

There is no install step. The entire stack is loaded via two `<link>` tags and two inline blocks.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark light">
  <title>QHSE CESI Hub</title>

  <!-- Fonts: preconnect + a single CSS2 call, display=swap to avoid FOIT -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <style>/* reset + tokens + components, inline */</style>
</head>
<body>
  <!-- content -->
  <script>/* ~30 lines: burger menu, smooth scroll, optional localStorage */</script>
</body>
</html>
```

---

## Typography Recommendation (the actual decision)

The QHSE Trainer sibling app uses **Bebas Neue + Space Mono + DM Sans** — condensed, industrial, terminal vibe. The Hub must look **distinctly different**: it's a *reading hub*, not a tool. Editorial, calm, generous whitespace.

| Role | Font | Weights | Rationale |
|------|------|---------|-----------|
| Headings | **Fraunces** (variable) | 400, 600, 700 | Modern variable serif with editorial / book personality. Optical sizing axis (`opsz` 9..144) makes large display headings feel sculpted. Sets clear visual contrast with QHSE Trainer's Bebas Neue. |
| Body / UI | **Inter** | 400, 500, 600, 700 | Industry standard for screen reading in 2026. Optimized metrics, excellent French diacritic coverage (essential — content is in French with `é à ç ê û ô î ï`). |
| Mono / labels / RNCP codes | **JetBrains Mono** | 400, 500 | Pairs naturally with Inter (same humanist heritage), readable for short technical strings (RNCP codes, ISO numbers, durations). |

**Alternative pairing** (lighter weight if Fraunces feels too "magazine"): swap Fraunces → **Lora**. Lora is a calmer book-serif, optimized for body text. Use this if early visual testing finds Fraunces draws too much attention to headings vs content.

**Single CSS2 request, ~85 KB woff2 total** — well within budget. Critical: include `display=swap` so text renders immediately with fallback while web font loads.

---

## Theming: Dark-First with OKLCH

Dark mode is the **default** (per PROJECT.md and user preference). Light mode should still work — modern users expect both, and `light-dark()` makes it trivial.

### Pattern

```css
:root {
  color-scheme: dark light;          /* dark wins by default, light available */

  /* OKLCH gives perceptually uniform shades — essential for dark mode
     where naive HSL produces muddy mid-greys. */
  --ink-1:  light-dark(oklch(20% 0.02 250), oklch(96% 0.01 250));  /* primary text */
  --ink-2:  light-dark(oklch(40% 0.02 250), oklch(76% 0.01 250));  /* secondary text */
  --ink-3:  light-dark(oklch(55% 0.02 250), oklch(58% 0.01 250));  /* muted */
  --bg-1:   light-dark(oklch(99% 0.005 250), oklch(14% 0.01 250)); /* page bg */
  --bg-2:   light-dark(oklch(96% 0.008 250), oklch(18% 0.012 250));/* surface */
  --border: light-dark(oklch(90% 0.01 250), oklch(28% 0.015 250));
  --accent: oklch(68% 0.18 145);     /* a calm green/teal — distinct from
                                        QHSE Trainer's lime #C8FF00 */
  --link:   light-dark(oklch(52% 0.18 250), oklch(76% 0.14 250));
}

@media (prefers-color-scheme: light) {
  /* `light-dark()` already handles this; this block stays empty unless
     you need to override something the function can't express. */
}
```

**Why OKLCH over hex/HSL:** in dark mode, hex/HSL palettes feel "off" because the human eye is non-linear in luminance. OKLCH's `L` channel is perceptually uniform, so a scale of `oklch(96/76/58/40/20% ...)` produces an evenly-spaced contrast ramp that "just works" in both schemes. The single-origin hue (`250` = blue-grey here) keeps the palette cohesive.

**Confidence note:** `light-dark()` reached Baseline May 2024 and is widely available in 2026; OKLCH is fully supported in all modern browsers since 2023. Both are production-safe.

---

## Modern CSS Features to Use

All of the following are **Baseline / widely available** in 2026 — they are not "experimental," they are the boring choice:

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

A pragmatic hybrid of Josh Comeau's and Andy Bell's resets, trimmed to ~25 lines for a single-file project:

```css
@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  * { margin: 0; }
  html { -webkit-text-size-adjust: 100%; }
  body { min-height: 100vh; min-height: 100dvh; line-height: 1.55; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
  img, picture, video, canvas, svg { display: block; max-width: 100%; }
  input, button, textarea, select { font: inherit; color: inherit; }
  p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }
  h1, h2, h3 { text-wrap: balance; line-height: 1.15; }
  p { text-wrap: pretty; }
  a { color: inherit; text-decoration-thickness: 1px; text-underline-offset: 0.2em; }
  ul, ol { padding: 0; list-style: none; }
  :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
  }
}
```

Notes:
- `text-wrap: balance` for headings and `text-wrap: pretty` for paragraphs are Baseline in 2026 and produce noticeably better line breaks with zero effort.
- `min-height: 100dvh` (dynamic viewport height) prevents mobile address bar jumps.
- The `prefers-reduced-motion` block is the only "ethics tax" you must pay — non-negotiable for an accessible reading hub.

---

## Icons: Inline SVG, Not the Runtime

The Hub will need ~10–15 distinct icons (external-link, book-open, search, menu, x, chevron-right, info, building-2, scale, hard-hat, link, calendar, graduation-cap, factory, file-text). For that count, the runtime UMD bundle is wasteful.

**Recommended approach:** copy the raw SVG paths from <https://lucide.dev/icons/> into a single `<svg>` symbol sprite at the top of `<body>`, then reference via `<svg><use href="#icon-search"/></svg>`.

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="icon-external-link" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
  </symbol>
  <!-- ...other icons -->
</svg>
```

Then anywhere in the page:
```html
<svg class="icon" aria-hidden="true"><use href="#icon-external-link"/></svg>
```

**Why not the runtime UMD?** `lucide@latest` is ~80 KB minified and exists to handle dynamic icon injection (`document.querySelectorAll('[data-lucide]')`). For a static page with 10–15 known icons, you ship 80 KB to save 30 seconds of copy/paste. Inline sprites also work offline, version themselves with the file, and inherit `currentColor` for free.

**If you must use the CDN runtime** (e.g., during prototyping):
```html
<script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
```
**Pin the version, never use `@latest`** — Lucide is on a fast release cadence and breaking changes happen.

---

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

---

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

---

## Stack Patterns by Variant

**If content grows beyond ~50 biblio cards:**
- Add a vanilla JS filter input (`<input type="search">` → `oninput` filters DOM via class toggle). ~15 lines.
- Do NOT reach for Fuse.js or a fuzzy-search library — `String.includes()` on a `.toLowerCase()` haystack covers 99% of personal-reference use cases.

**If V2 study tools land in this file:**
- Move to two files: `index.html` (Découverte) + `biblio.html`. Still no build, just two pages sharing a CSS file via `<link>`.
- Or split this into a Hub V2 that's separate from V1 reading mode entirely.
- Avoid SPAs — the GitHub Actions pipeline deploys static files, multi-page is free.

**If you want section-level URL persistence beyond hash anchors:**
- `history.replaceState()` on scroll into a section via `IntersectionObserver`. ~10 lines, no dependencies. Don't reach for routing libraries.

---

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

**Practical rule:** target the project's stated audience (modern evergreen browsers on mobile + desktop) and don't write fallback code for IE/legacy Edge — they're outside the support matrix per PROJECT.md.

---

## Implementation Sketch (the first 40 lines of CSS)

This is what the top of the `<style>` block should look like — drop-in starting point:

```css
@layer reset, tokens, base, components, utilities;

/* --- TOKENS ---------------------------------------------------------- */
@layer tokens {
  :root {
    color-scheme: dark light;

    --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
    --font-serif: 'Fraunces', Georgia, 'Times New Roman', serif;
    --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;

    --ink-1: light-dark(oklch(20% 0.02 250), oklch(96% 0.01 250));
    --ink-2: light-dark(oklch(42% 0.02 250), oklch(76% 0.01 250));
    --ink-3: light-dark(oklch(58% 0.02 250), oklch(58% 0.01 250));
    --bg-1:  light-dark(oklch(99% 0.005 250), oklch(13% 0.012 250));
    --bg-2:  light-dark(oklch(96% 0.008 250), oklch(17% 0.014 250));
    --border:light-dark(oklch(90% 0.01 250), oklch(26% 0.016 250));
    --accent: oklch(68% 0.16 165);   /* teal — distinct from Trainer's lime */
    --link:  light-dark(oklch(48% 0.18 250), oklch(78% 0.14 250));

    --radius: 0.5rem;
    --space-xs: 0.5rem; --space-s: 0.75rem; --space-m: 1rem;
    --space-l: 1.5rem; --space-xl: 2.5rem; --space-2xl: 4rem;
    --measure: 68ch;
  }
}

/* --- BASE ------------------------------------------------------------ */
@layer base {
  body { font-family: var(--font-sans); background: var(--bg-1); color: var(--ink-1); }
  h1, h2, h3 { font-family: var(--font-serif); font-weight: 600; letter-spacing: -0.01em; }
  h1 { font-size: clamp(2.25rem, 4vw + 1rem, 4rem); }
  h2 { font-size: clamp(1.75rem, 2vw + 1rem, 2.5rem); }
  h3 { font-size: clamp(1.25rem, 1vw + 0.9rem, 1.5rem); }
  p, li { max-width: var(--measure); color: var(--ink-2); }
  code, kbd { font-family: var(--font-mono); font-size: 0.9em; }
  a { color: var(--link); }
  a:hover { text-decoration-thickness: 2px; }
  html { scroll-behavior: smooth; }
  section { scroll-margin-top: 5rem; }
}
```

This is **~40 lines of CSS that already does the work of a 50 KB CSS framework**: tokens, typography scale, dark/light theming, accessible focus, smooth scroll with sticky-header offset. Everything else (components, utilities) layers on top without specificity conflicts because of `@layer`.

---

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

---
*Stack research for: single-file static reading hub*
*Researched: 2026-05-11*
