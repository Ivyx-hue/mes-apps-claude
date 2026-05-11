---
phase: 01-skeleton-chassis-visual-identity
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - qhse-cesi/index.html
autonomous: false
requirements:
  - INFRA-01
  - INFRA-02
  - INFRA-03
  - IDENT-01
  - IDENT-02
  - IDENT-03
  - IDENT-04
  - IDENT-05
  - CHASSIS-01
  - CHASSIS-02
  - CHASSIS-03
  - CHASSIS-04
  - CHASSIS-05
  - CHASSIS-06
  - CHASSIS-07
  - CHASSIS-08
  - CHASSIS-09
  - CHASSIS-10
tags:
  - chassis
  - walking-skeleton
  - visual-identity
  - vanilla-html
  - oklch
  - sticky-nav
  - burger-menu
  - print-stylesheet

must_haves:
  truths:
    - "The owner opens https://mes-apps-claude.vercel.app/qhse-cesi/ on phone and desktop and the page renders with a warm-dark editorial identity (Fraunces headlines, Inter body, JetBrains Mono mono, cream-on-dim-paper, brass accent) that is visibly distinct from the existing QHSE Trainer at the repo root."
    - "Clicking any item in the top nav scrolls smoothly to the target section and the section h2 lands cleanly below the sticky 4rem nav bar (not hidden under it), on both phone and desktop."
    - "On mobile (≤ 767 px) the nav collapses into a 44×44 burger; tapping the burger opens the menu; tapping any link inside the menu closes the menu synchronously BEFORE the anchor scroll fires; the section heading lands below the nav."
    - "Pressing Tab from a cold page load reveals an 'Aller au contenu principal' skip-link as the first focusable element; pressing Enter moves focus into <main>; every interactive element shows a visible 3px blue focus ring on a dark background."
    - "Direct-hit anchor URLs (https://mes-apps-claude.vercel.app/qhse-cesi/#decouverte, #biblio, #accueil) load directly to the correct section with the heading below the sticky bar."
    - "Ctrl+P (or Print to PDF) renders the page with the sticky header, burger label, and skip-link hidden; external https links expand as monospace footnotes via a[href]::after; body is black on white."
    - "A reserved <section id='outils' hidden> placeholder exists in the DOM along with a matching <li hidden> nav entry — Phase V2 only needs to remove the two hidden attributes."
    - "The existing QHSE Trainer at the repo root (`/`) loads unchanged after the hub deploys."
    - "Chrome Lighthouse Accessibility on the deployed empty shell is ≥ 95 and axe DevTools reports zero critical issues; no text fails WCAG 4.5:1 contrast against the dark background."
    - "prefers-reduced-motion: reduce disables scroll-behavior: smooth and all CSS transitions site-wide."
  artifacts:
    - path: "qhse-cesi/index.html"
      provides: "Single-file static skeleton — full HTML + inline CSS (with @layer reset, tokens, base, components, utilities + OKLCH/light-dark tokens + print stylesheet + reduced-motion override) + inline IIFE-wrapped JS for burger-close-on-tap + scrollspy."
      min_lines: 350
      contains: "color-scheme: dark light"
      contains_2: "@layer reset, tokens, base, components, utilities"
      contains_3: "scroll-padding-top: var(--header-h)"
      contains_4: "section id=\"outils\""
      contains_5: "@media print"
      contains_6: "prefers-reduced-motion"
    - path: ".planning/phases/01-skeleton-chassis-visual-identity/01-SKELETON.md"
      provides: "Walking-skeleton description: the end-to-end pipeline proof, architectural decisions locked, definition of done."
      contains: "Walking Skeleton"
  key_links:
    - from: "qhse-cesi/index.html (sticky <header>)"
      to: "<main> + four <section> elements"
      via: "anchor links with data-target + scroll-padding-top: var(--header-h) on <html> + scroll-margin-top: var(--header-h) on every <section> AND every <h2> inside <section>"
      pattern: "scroll-(padding|margin)-top: var\\(--header-h\\)"
    - from: "qhse-cesi/index.html nav burger (mobile)"
      to: "<nav> menu open/close + native anchor scroll"
      via: "CSS-only :has(:checked) for open/close; ~5-line delegated JS click listener on .nav__list that sets #nav-toggle.checked=false synchronously WITHOUT preventDefault so native anchor navigation fires after"
      pattern: "nav:has\\(.*:checked\\)"
    - from: "qhse-cesi/index.html (Google Fonts CSS2 link in <head>)"
      to: "Fraunces + Inter + JetBrains Mono served via fonts.googleapis.com"
      via: "single CSS2 <link> with preconnect to fonts.googleapis.com AND fonts.gstatic.com, display=swap"
      pattern: "fonts\\.googleapis\\.com/css2.*Fraunces.*Inter.*JetBrains\\+Mono.*display=swap"
    - from: "qhse-cesi/index.html (IIFE scrollspy block, ≤ 15 LOC)"
      to: "active class on .nav__list a"
      via: "single IntersectionObserver observing the four <section> elements; toggles aria-current='location' on the matching nav <a>"
      pattern: "IntersectionObserver"
    - from: "git push origin main"
      to: "https://mes-apps-claude.vercel.app/qhse-cesi/ live"
      via: ".github/workflows/deploy.yml (UNCHANGED — do not modify)"
      pattern: "qhse-cesi/index\\.html (in commit) → live URL responds 200"
---

## Phase Goal

**As a** Bachelor QHSE student preparing rentrée at CESI Bordeaux, **I want to** open a single trustworthy URL on my phone or laptop that already looks and feels like the final reading hub — warm-dark editorial identity, smooth-scrolling sticky nav, mobile burger menu, four named sections — even though only the chassis is in place, **so that** every subsequent phase ships content into a known-working visual frame without re-litigating typography, palette, navigation behaviour, or deploy pipeline.

<objective>
Build and deploy `qhse-cesi/index.html` — the walking-skeleton chassis for the QHSE CESI Hub. Single file, no build step, no framework. The shell renders correctly at https://mes-apps-claude.vercel.app/qhse-cesi/ with the owner-approved warm-dark editorial identity (Fraunces + Inter + JetBrains Mono, brass accent on dim-paper background) and four section shells (Accueil, Découverte, Biblio, Outils-reserved-hidden). Sticky nav with `scroll-padding-top` offset works; mobile burger closes synchronously before the scroll fires; skip-link is the first focusable element; print stylesheet hides chrome and expands external URLs; `prefers-reduced-motion` disables motion; the existing QHSE Trainer at the repo root remains untouched.

Purpose:
- Lock the visual identity, layout chassis, and accessibility floor BEFORE any content lands — bug-prone things (sticky positioning, smooth-scroll offsets, burger-stays-open, focus visibility on dark backgrounds) are cheaper to debug on an empty page than under 25 cards plus 1500 words of prose.
- Prove the deploy pipeline end-to-end on a new subdirectory (this is Phase 1 of a new project — until a `qhse-cesi/index.html` actually serves at the live URL, the rest of the roadmap is theoretical).
- Reserve the V2 surface (`<section id="outils" hidden>` + `<li hidden>` nav entry) so V2 work is `attribute removal`, not page restructure.

Output:
- `qhse-cesi/index.html` (≥ 350 lines) at the repo root subdirectory, committed and pushed to `main`, auto-deployed by the existing GitHub Actions workflow.
- `.planning/phases/01-skeleton-chassis-visual-identity/01-SKELETON.md` — the walking-skeleton description (already written by the planner; executor does not edit).
- A live, owner-verified URL at https://mes-apps-claude.vercel.app/qhse-cesi/.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md
@.planning/STATE.md
@.planning/research/SUMMARY.md
@.planning/research/STACK.md
@.planning/research/ARCHITECTURE.md
@.planning/research/PITFALLS.md
@.planning/research/FEATURES.md
@.planning/phases/01-skeleton-chassis-visual-identity/01-UI-SPEC.md
@.planning/phases/01-skeleton-chassis-visual-identity/01-SKELETON.md
@CLAUDE.md

<negative_reference>
The existing `/index.html` at the repo ROOT (QHSE Trainer — Bebas Neue + lime + dot-grid + black background) is what the Hub must look NOTHING like. Do NOT copy its `:root` tokens, do NOT copy its `body::before` dot-grid pseudo-element, do NOT copy its English UI strings, do NOT copy its global `onclick=` handlers or hardcoded `<div>` markup, do NOT copy its non-OKLCH hex palette. Read it once if you need to confirm it exists and works at `/`, then close the file.

The Hub uses different fonts (Fraunces / Inter / JetBrains Mono), different palette (warm-dark cream-on-paper, brass accent — NEVER lime, NEVER pure `#000`), different mood (editorial library, NOT industrial terminal), French UI throughout (the Trainer has some English), IIFE-encapsulated JS with delegated listeners (the Trainer leaks globals), and zero texture/grid background.
</negative_reference>

<interfaces>
<!-- Token, type, and component contracts extracted verbatim from UI-SPEC.md.
     The executor MUST use these exact values. Do NOT re-derive, do NOT
     paraphrase, do NOT introduce new tokens. -->

**Single Google Fonts request (verbatim — place in `<head>`):**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**CSS layer order (verbatim — first statement in `<style>`):**

```css
@layer reset, tokens, base, components, utilities;
```

**Color tokens (`@layer tokens` — exact values from UI-SPEC §Color):**

```css
:root {
  color-scheme: dark light;

  --font-serif: 'Fraunces', Georgia, 'Times New Roman', ui-serif, serif;
  --font-sans:  'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono:  'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;

  --bg-1: light-dark(oklch(98% 0.008 70), oklch(15% 0.012 65));
  --bg-2: light-dark(oklch(95% 0.012 70), oklch(19% 0.014 65));
  --ink-1: light-dark(oklch(22% 0.015 70), oklch(94% 0.012 75));
  --ink-2: light-dark(oklch(40% 0.012 70), oklch(72% 0.014 70));
  --ink-3: light-dark(oklch(55% 0.010 70), oklch(54% 0.011 70));
  --accent: oklch(74% 0.10 78);
  --accent-soft: oklch(74% 0.10 78 / 0.12);
  --link: oklch(74% 0.10 78);
  --link-hover: oklch(82% 0.11 78);
  --focus-ring: oklch(82% 0.18 250);
  --border-subtle: light-dark(oklch(90% 0.008 70), oklch(26% 0.014 65));

  /* Phase 3 will use --success, --warning, --alert — declare them in
     Phase 1 already, so the token surface is locked: */
  --success: oklch(70% 0.13 145);
  --warning: oklch(74% 0.13 70);
  --alert:   oklch(64% 0.18 30);

  /* Spacing (all multiples of 4) */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;

  /* Layout */
  --header-h: 4rem;
  --container-max: 72rem;
  --measure: 68ch;
}
```

**Type scale (`@layer base` — exact `clamp()` values from UI-SPEC §Typography):**

```css
--step-5:  clamp(2.25rem, 4vw + 1rem, 4rem);       /* h1, display */
--step-4:  clamp(1.75rem, 2vw + 1rem, 2.5rem);     /* h2, section */
--step-3:  clamp(1.25rem, 1vw + 0.9rem, 1.5rem);   /* h3, subsection */
--step-2:  clamp(1.0625rem, 0.4vw + 1rem, 1.125rem); /* lead paragraph */
--step-1:  1rem;       /* body */
--step-0:  0.875rem;   /* nav, label, footer */
--step--1: 0.75rem;    /* eyebrow, caption */
```

**Component contracts (HTML skeleton — adapt classes/IDs verbatim):**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark light">
  <title>QHSE CESI Hub — Bachelor QHSE CESI Bordeaux</title>
  <!-- Google Fonts links here (see above) -->
  <style>/* see CSS contract */</style>
</head>
<body>
  <a class="skip-link" href="#main">Aller au contenu principal</a>

  <header role="banner">
    <a class="brand" href="#accueil">QHSE&nbsp;<em>CESI</em></a>
    <input type="checkbox" id="nav-toggle" class="nav-toggle" aria-label="Ouvrir le menu">
    <label for="nav-toggle" class="burger" aria-hidden="true">
      <!-- Inline Lucide 'menu' SVG when unchecked; CSS swaps to 'x' when :checked -->
    </label>
    <nav aria-label="Navigation principale">
      <ul class="nav__list">
        <li><a href="#accueil" data-target="accueil">Accueil</a></li>
        <li><a href="#decouverte" data-target="decouverte">Découverte</a></li>
        <li><a href="#biblio" data-target="biblio">Biblio</a></li>
        <li hidden><a href="#outils" data-target="outils">Outils</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">
    <section id="accueil" aria-labelledby="h-accueil">
      <p class="eyebrow">01 / ACCUEIL</p>
      <h1 id="h-accueil">Une formation, mes ressources, un seul onglet.</h1>
      <p class="lead">Un point d'entrée personnel pour le Bachelor QHSE de CESI Bordeaux : la formation en un survol, et les meilleures ressources externes regroupées au même endroit.</p>
    </section>

    <section id="decouverte" aria-labelledby="h-decouverte">
      <p class="eyebrow">02 / DÉCOUVERTE</p>
      <h2 id="h-decouverte">La formation, en un survol</h2>
      <p class="placeholder">En cours de constitution — première publication prévue Phase 2.</p>
    </section>

    <section id="biblio" aria-labelledby="h-biblio">
      <p class="eyebrow">03 / BIBLIO</p>
      <h2 id="h-biblio">Les meilleures ressources, classées et datées</h2>
      <p class="placeholder">En cours de constitution — première publication prévue Phase 3.</p>
      <div id="biblio-grid"><!-- Phase 3 renders cards into this mount point --></div>
    </section>

    <section id="outils" aria-labelledby="h-outils" hidden>
      <p class="eyebrow">04 / OUTILS</p>
      <h2 id="h-outils">Outils — réservé V2</h2>
    </section>
  </main>

  <footer role="contentinfo">
    <p>QHSE CESI Hub — dernière mise à jour <time datetime="2026-05-11">11 mai 2026</time></p>
    <p><a href="https://github.com/Ivyx-hue/mes-apps-claude" target="_blank" rel="noopener noreferrer">Code source sur GitHub</a></p>
  </footer>

  <script>
    /* IIFE — no globals leak. See CSS/JS contract for scrollspy + burger-close handler. */
  </script>
</body>
</html>
```
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Author the single-file chassis qhse-cesi/index.html (full implementation, deploy-ready)</name>
  <files>qhse-cesi/index.html</files>
  <read_first>
    - `.planning/phases/01-skeleton-chassis-visual-identity/01-UI-SPEC.md` (PRIMARY DESIGN CONTRACT — all six dimensions are owner-approved; the executor implements verbatim, never paraphrases)
    - `.planning/phases/01-skeleton-chassis-visual-identity/01-SKELETON.md` (walking-skeleton scope; what NOT to ship)
    - `.planning/research/STACK.md` §"Typography Recommendation", §"Theming: Dark-First with OKLCH", §"Minimal CSS Reset (paste this verbatim)" (lines ~146-170), §"Icons: Inline SVG, Not the Runtime"
    - `.planning/research/ARCHITECTURE.md` §"Recommended In-File Structure" (the 6 numbered CSS banners + IIFE structure with DATA → RENDERERS → CONTROLLERS — though Phase 1 has zero DATA/RENDERERS yet, scaffold the comment banners so Phase 2/3 slot in)
    - `.planning/research/PITFALLS.md` Pitfall 6 (dark-mode WCAG), Pitfall 7 (FART — N/A since no toggle, but no inline `<head>` script either), Pitfall 8 (sticky-nav anchor offset + burger-close-before-scroll), Pitfall 9 (no PDFs — N/A in this task)
    - `CLAUDE.md` §"User Preferences" (French in UI, English in code comments), §"Deploy Pipeline" (NEVER modify `.github/workflows/deploy.yml`)
    - The existing `/index.html` at the repo root — ONLY to confirm it works and to internalize what NOT to do (do not copy any of its tokens, fonts, classes, or JS patterns; see `<negative_reference>` in plan context)
  </read_first>
  <action>
    Create `qhse-cesi/index.html` from scratch. Single file, inline `<style>`, inline `<script>`. The file must be self-contained — no external CSS, no external JS, only the two Google Fonts `<link>` tags. Target ≥ 350 lines, ≤ 800 lines (the 2000-line refactor trigger lives in PITFALLS — Phase 1 chassis should be ~400-600 lines).

    **Structure of the file (top to bottom — use the numbered comment banners verbatim so Ctrl+F lands in seconds):**

    ```
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <!-- meta: charset, viewport, color-scheme, title -->
      <!-- Google Fonts: two preconnect <link>s + one CSS2 stylesheet <link> (verbatim from <interfaces>) -->
      <style>
        /* ============ 1. RESET (@layer reset) ============ */
        /* ============ 2. TOKENS (@layer tokens) ============ */
        /* ============ 3. BASE (@layer base) ============ */
        /* ============ 4. COMPONENTS (@layer components) ============ */
        /*    -- Skip-link -- */
        /*    -- Sticky header / nav -- */
        /*    -- Burger menu (mobile) -- */
        /*    -- Section heading + eyebrow + h2 underline -- */
        /*    -- Section shells -- */
        /*    -- Footer -- */
        /*    -- (Mini-TOC reserved CSS for Phase 2; element NOT rendered) -- */
        /* ============ 5. UTILITIES (@layer utilities) ============ */
        /*    -- .sr-only -- */
        /* ============ 6. RESPONSIVE (one breakpoint at 48rem) ============ */
        /* ============ 7. PRINT (@media print) ============ */
      </style>
    </head>
    <body>
      <!-- Skip-link (first focusable) -->
      <!-- <header role="banner"> with brand + checkbox + burger label + <nav> -->
      <!-- Sentinel <div> immediately after </header>, before <main>, used by IntersectionObserver to add --shadow-sticky to header on scroll -->
      <!-- <main id="main"> with four <section> elements (Accueil, Découverte, Biblio, Outils[hidden]) -->
      <!-- <footer role="contentinfo"> -->
      <script>
        /* ============ IIFE: scrollspy + burger-close-on-tap ============ */
      </script>
    </body>
    </html>
    ```

    **1. RESET layer (`@layer reset`)** — paste the modern reset from STACK.md lines ~150-169 verbatim (Comeau + Bell hybrid: `box-sizing: border-box`, `* { margin: 0 }`, `body { min-height: 100dvh; line-height: 1.55 }`, `img/video/svg display: block`, `input/button font: inherit`, `h1/h2/h3 { text-wrap: balance; line-height: 1.15 }`, `p { text-wrap: pretty }`, `a { color: inherit; text-decoration-thickness: 1px; text-underline-offset: 0.2em }`, `ul,ol { padding: 0; list-style: none }`, `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px }` — but OVERRIDE this last rule in the components layer to use `--focus-ring` (blue) at 3px width with 2px offset per UI-SPEC). Include the `@media (prefers-reduced-motion: reduce)` block setting `animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important;` (CHASSIS-09).

    **2. TOKENS layer (`@layer tokens`)** — paste the `:root { ... }` block from `<interfaces>` verbatim. ALL color values OKLCH via `light-dark()`. Declare `--success`, `--warning`, `--alert` now even though Phase 1 doesn't use them — this locks the token surface so Phase 3 doesn't bikeshed (IDENT-03: "all components consume tokens, no hard-coded colors").

    **3. BASE layer (`@layer base`)** — type-scale custom properties (`--step-5` through `--step--1`), then global element styles:
    - `body { font-family: var(--font-sans); background: var(--bg-1); color: var(--ink-1); font-size: var(--step-1); line-height: 1.6; }`
    - `h1 { font-family: var(--font-serif); font-weight: 600; font-size: var(--step-5); letter-spacing: -0.01em; line-height: 1.1; }`
    - `h2 { font-family: var(--font-serif); font-weight: 600; font-size: var(--step-4); letter-spacing: -0.01em; line-height: 1.15; }`
    - `h3 { font-family: var(--font-serif); font-weight: 600; font-size: var(--step-3); line-height: 1.2; }`
    - `p, li, blockquote, dd { max-width: var(--measure); color: var(--ink-1); }`
    - `code, kbd, samp, time[datetime] { font-family: var(--font-mono); font-size: 0.9em; }`
    - `a { color: var(--link); text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 0.2em; transition: text-decoration-thickness 80ms ease-out; }`
    - `a:hover { color: var(--link-hover); text-decoration-thickness: 2px; }`
    - `:focus-visible { outline: 3px solid var(--focus-ring); outline-offset: 2px; border-radius: var(--radius-sm); }`
    - `html { scroll-behavior: smooth; scroll-padding-top: var(--header-h); }`
    - `section { scroll-margin-top: var(--header-h); padding-block: var(--space-2xl) var(--space-xl); }`
    - `section > h2 { scroll-margin-top: var(--header-h); }` (belt-and-suspenders for iOS Safari per UI-SPEC §Layout Grid)

    **4. COMPONENTS layer (`@layer components`)** — six components only, in this order:

    a. **`.skip-link`** — verbatim from UI-SPEC §Component 1. Visually hidden default (`clip-path: inset(50%); position: absolute; width: 1px; height: 1px; overflow: hidden;` or equivalent off-screen technique). On `:focus-visible`, snaps to `top: var(--space-sm); left: var(--space-sm);` with `background: var(--bg-2); color: var(--ink-1); padding: var(--space-sm) var(--space-md); border: 2px solid var(--accent); border-radius: var(--radius-sm); z-index: 1000; clip-path: none; width: auto; height: auto;`. Copy: `Aller au contenu principal`.

    b. **Sticky header (`header[role="banner"]`)** — `position: sticky; top: 0; z-index: 100; height: var(--header-h);` plus `background: color-mix(in oklch, var(--bg-2) 88%, transparent); backdrop-filter: blur(12px) saturate(120%);` with `@supports not (backdrop-filter: blur(1px)) { header { background: var(--bg-2); } }`. Bottom border `1px solid var(--border-subtle)`. Internal `display: flex; align-items: center; justify-content: space-between; padding-inline: clamp(1rem, 4vw, 2rem); max-width: var(--container-max); margin-inline: auto;`. On `.is-scrolled` class (toggled by JS — see below), add `box-shadow: 0 1px 0 0 var(--border-subtle), 0 12px 24px -16px oklch(0% 0 0 / 0.45);` with `transition: box-shadow 200ms ease-out;`.

       The `.brand` link inside is `font-family: var(--font-serif); font-weight: 600; font-size: var(--step-1); letter-spacing: -0.01em; color: var(--ink-1); text-decoration: none;`. The `<em>` inside the brand is `color: var(--accent); font-style: normal;`.

    c. **Nav (`.nav__list`)** — desktop default (≥ 48rem): `display: flex; gap: var(--space-sm); list-style: none;`. Each `a` is `font-family: var(--font-sans); font-weight: 500; font-size: var(--step-0); color: var(--ink-2); text-decoration: none; padding: var(--space-sm) var(--space-md); border-radius: var(--radius-sm); transition: background-color 120ms ease-out, color 120ms ease-out; position: relative;`. `a:hover { color: var(--ink-1); background: var(--accent-soft); }`. **Active state** triggered by `aria-current="location"` (set by scrollspy JS) AND by `:target` (no-JS fallback): `.nav__list a[aria-current="location"], .nav__list :target a { color: var(--accent); }` and add a 2px accent underline via `::after { content: ""; position: absolute; bottom: -1px; left: var(--space-md); right: var(--space-md); height: 2px; background: var(--accent); }`.

    d. **Burger menu — CSS-only via `:has()`** (mobile, ≤ 47.99rem):
       - `.nav-toggle { position: absolute; clip-path: inset(50%); }` — hidden checkbox, but reachable by `:has()` selector.
       - `.burger` label: `display: none;` on desktop, `display: grid; place-items: center; width: 44px; height: 44px; cursor: pointer; color: var(--ink-1);` on mobile. Inline two Lucide SVGs (24×24) stacked, both `position: absolute`. Show the `menu` icon when `#nav-toggle:not(:checked)` (default), and the `x` icon when `#nav-toggle:checked`. Implement via `.burger svg { display: none; } .burger .icon-menu { display: block; } .nav-toggle:checked ~ .burger .icon-menu { display: none; } .nav-toggle:checked ~ .burger .icon-close { display: block; }`.
       - Default-closed: `nav .nav__list { display: none; }` on mobile.
       - Open: `nav:has(#nav-toggle:checked) .nav__list { display: flex; flex-direction: column; position: fixed; inset: var(--header-h) 0 0 0; background: var(--bg-1); padding: var(--space-xl); gap: var(--space-md); }` with each link upsized to `font-size: var(--step-2)` for tap comfort.
       - **`aria-label` alternation — CSS-only path (UI-checker recommendation #2)**: Use a screen-reader-only `<span class="sr-only">` inside the `<label>` (NOT on the checkbox itself) whose text content depends on `:has(:checked)` state via two stacked `<span>` elements. Concrete pattern: inside the `<label class="burger">`, include `<span class="sr-only" data-state="closed">Ouvrir le menu</span><span class="sr-only" data-state="open">Fermer le menu</span>`, plus CSS `.burger [data-state="open"] { display: none; } .nav-toggle:checked ~ .burger [data-state="closed"] { display: none; } .nav-toggle:checked ~ .burger [data-state="open"] { display: inline; }`. The `aria-label` on the checkbox itself stays the static `Ouvrir le menu` (fallback for screen readers that don't honor visually-hidden text — both layers are belt-and-suspenders). **Do NOT add JavaScript to mirror the `aria-label` — that path is explicitly forbidden** per UI-checker recommendation #2.

    e. **Section heading pattern** — `.eyebrow { font-family: var(--font-sans); font-weight: 500; font-size: var(--step--1); color: var(--ink-2); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-sm); }`. `h2 { margin-bottom: var(--space-lg); position: relative; }`. `h2::after { content: ""; display: block; width: 2.5em; height: 2px; background: var(--accent); margin-top: var(--space-sm); }`. `.lead { font-size: var(--step-2); line-height: 1.65; color: var(--ink-1); }`. `.placeholder { color: var(--ink-2); font-style: italic; }`.

    f. **Footer** — `footer { background: var(--bg-2); border-top: 1px solid var(--border-subtle); padding-block: var(--space-2xl); padding-inline: clamp(1rem, 4vw, 2rem); margin-top: var(--space-3xl); }`. Inside: `max-width: var(--container-max); margin-inline: auto; color: var(--ink-2); font-size: var(--step-0);`. The `<time>` element inside is inline `var(--font-mono)`.

    g. **Mini-TOC reserved CSS** (NOT rendered in Phase 1, but CSS is written so Phase 2 inherits): `.toc { background: var(--bg-2); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-md) var(--space-lg); } .toc ol { display: flex; flex-direction: column; gap: var(--space-sm); list-style: none; padding: 0; } .toc a { font-size: var(--step-0); color: var(--ink-2); text-decoration: none; padding-inline-start: var(--space-md); border-inline-start: 2px solid transparent; } .toc a:hover, .toc a[aria-current="true"] { color: var(--ink-1); border-inline-start-color: var(--accent); }`. (This is Phase 2's consumer; ship the CSS, don't ship a `.toc` element.)

    **5. UTILITIES layer (`@layer utilities`)** — only `.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }`. No others.

    **6. RESPONSIVE** — wrap the desktop-nav rules and the burger-hidden rules so the breakpoint is single-sourced: `@media (max-width: 47.99rem) { .burger { display: grid; } .nav__list { display: none; } }`. Above 48rem, the burger is `display: none;` and the `.nav__list` is `display: flex;` (already the default). Adjust section vertical padding to `padding-block: var(--space-3xl) var(--space-2xl);` for ≥ 48rem.

    **7. PRINT (`@media print`)** — paste from UI-SPEC §Print Stylesheet verbatim. Hide `header, .skip-link, .nav-toggle, .burger`. Force `:root { color-scheme: light; }` and `body { background: #fff; color: #000; }`. Expand `a[href^="http"]::after { content: " (" attr(href) ")"; font-family: var(--font-mono); font-size: 0.85em; color: #444; word-break: break-all; }`. Hide `h2::after { display: none; }`. Lift the `--measure` constraint: `p, li { max-width: none; }`. Prevent section splitting: `section { break-inside: avoid-page; }`. **Internal anchors do NOT expand** — only `a[href^="http"]`, not `a[href^="#"]` (CHASSIS-06).

    **HTML body** — exactly the structure from `<interfaces>`:
    - Skip-link (first focusable, before `<header>`).
    - `<header role="banner">` with `.brand`, hidden checkbox `#nav-toggle`, `.burger` label (containing the two stacked Lucide SVGs + the two sr-only spans), and `<nav aria-label="Navigation principale">` with `<ul class="nav__list">` of four items (the fourth `<li>` carries `hidden` for the Outils placeholder).
    - A sentinel `<div id="header-sentinel" aria-hidden="true" style="height:1px;margin-top:-1px;"></div>` immediately after `</header>`, before `<main>` (used by IntersectionObserver to toggle `.is-scrolled` on header — NOT a scroll-event listener per UI-SPEC).
    - `<main id="main">` with four `<section>` elements as in `<interfaces>`. The Outils section carries `hidden` AND the matching nav `<li>` also carries `hidden`.
    - Empty mount point `<div id="biblio-grid"></div>` inside `#biblio` for Phase 3.
    - `<footer role="contentinfo">` with the dernière maj `<time>` and the GitHub link (`target="_blank" rel="noopener noreferrer"`).

    **Inline Lucide SVGs** — paste the two icons from `lucide.dev/icons/`, version-pinned mentally to `lucide@0.460.0`. The `menu` icon (three horizontal lines) and the `x` icon (close). Inline SVG, `width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`. Class them `icon-menu` and `icon-close` so the CSS swap rules above work.

    **JS — IIFE, no globals, ≤ 30 lines total.** Place at end of `<body>`:

    ```js
    (() => {
      'use strict';

      // (A) Sticky-header shadow on scroll past 16px. Uses IntersectionObserver
      //     on the sentinel <div> right after </header>. No scroll-event listener.
      const sentinel = document.getElementById('header-sentinel');
      const header = document.querySelector('header[role="banner"]');
      if (sentinel && header) {
        new IntersectionObserver(
          ([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting),
          { rootMargin: '-16px 0px 0px 0px', threshold: 0 }
        ).observe(sentinel);
      }

      // (B) Scrollspy — active-nav highlight via aria-current.
      //     LOCKED at ≤ 15 LOC (UI-checker recommendation #1). Shares this
      //     IIFE — NO separate global listener, NO setTimeout, NO scroll event.
      const navLinks = document.querySelectorAll('.nav__list a[data-target]');
      const sections = document.querySelectorAll('main > section[id]:not([hidden])');
      if (navLinks.length && sections.length) {
        const setActive = (id) => navLinks.forEach(a =>
          a.toggleAttribute('aria-current', a.dataset.target === id) &&
          (a.getAttribute('aria-current') === '' && a.setAttribute('aria-current', 'location'))
        );
        new IntersectionObserver(
          (entries) => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
          { rootMargin: `-${parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) * 16 + 1}px 0px -60% 0px`, threshold: 0 }
        ).forEach || sections.forEach(s => {
          // IntersectionObserver doesn't have forEach — fall through to direct observe
        });
        const spy = new IntersectionObserver(
          (entries) => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
          { rootMargin: '-64px 0px -60% 0px', threshold: 0 }
        );
        sections.forEach(s => spy.observe(s));
      }

      // (C) Burger close-on-link-tap. Delegated listener on .nav__list.
      //     Closes synchronously BEFORE the browser's native anchor scroll
      //     fires — does NOT preventDefault (PITFALLS #8).
      const navList = document.querySelector('.nav__list');
      const toggle = document.getElementById('nav-toggle');
      if (navList && toggle) {
        navList.addEventListener('click', (e) => {
          if (e.target.closest('a[data-target]')) toggle.checked = false;
        });
      }
    })();
    ```

    Tighten the scrollspy block to ≤ 15 LOC — the explanatory comment above is informational; the actual JS for block (B) should be the second `IntersectionObserver` block (the working one), discarding the false start. Final shape:

    ```js
    const navLinks = document.querySelectorAll('.nav__list a[data-target]');
    const sections = document.querySelectorAll('main > section[id]:not([hidden])');
    if (navLinks.length && sections.length) {
      const setActive = (id) => navLinks.forEach(a =>
        a.dataset.target === id
          ? a.setAttribute('aria-current', 'location')
          : a.removeAttribute('aria-current')
      );
      new IntersectionObserver(
        (entries) => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
        { rootMargin: '-64px 0px -60% 0px', threshold: 0 }
      ).observe.bind(null);
      const spy = new IntersectionObserver(
        (entries) => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
        { rootMargin: '-64px 0px -60% 0px', threshold: 0 }
      );
      sections.forEach(s => spy.observe(s));
    }
    ```

    Final scrollspy LOC counted (excluding blank lines and the surrounding `if`): the inner body is 8 LOC. Comfortably under the 15-LOC ceiling.

    **HTML hygiene gates (executor MUST self-verify before declaring task done):**
    - `lang="fr"` on `<html>`.
    - `<meta name="color-scheme" content="dark light">` in `<head>`.
    - Skip-link is the very first child of `<body>`.
    - Every external `<a>` (currently only the GitHub link in the footer) has `target="_blank" rel="noopener noreferrer"`.
    - No inline `onclick=`, no `javascript:` URLs, no `<script src="...">` other than the Google Fonts `<link>` (which is `<link>`, not `<script>` — just confirming no third-party JS).
    - No `#000` literal anywhere in CSS (`grep -n "#000\\|oklch(0%" qhse-cesi/index.html` must be empty). The shadow value `oklch(0% 0 0 / 0.45)` IS allowed (it's a shadow alpha, not a background).
    - The string `starting-style` does NOT appear anywhere in the file (UI-checker recommendation #3 — zero entrance-animation CSS, not even commented).
    - The string `aria-label` on the `.burger` label does NOT mirror state via JavaScript — only the static `aria-label` on the checkbox + the CSS-swapped sr-only spans (UI-checker recommendation #2).

    **Comments policy:** English in code comments per CLAUDE.md User Preferences. UI strings (visible to user) in French. Use the numbered banner format from ARCHITECTURE.md (`/* ============ 1. RESET ============ */`).
  </action>
  <verify>
    <automated>
      # All checks run from the repo root. Each must pass before moving on.

      # 1. File exists and is non-trivially sized (UI-SPEC chassis ≥ 350 lines).
      test -f qhse-cesi/index.html && \
        [ "$(wc -l < qhse-cesi/index.html)" -ge 350 ] && \
        [ "$(wc -l < qhse-cesi/index.html)" -le 1000 ]

      # 2. No #000 anywhere, no pure-black oklch.
      ! grep -E '#000\b|oklch\(\s*0%' qhse-cesi/index.html | grep -v 'oklch\(0% 0 0 / 0\.45\)' | grep -q .

      # 3. No @starting-style ANYWHERE (not even commented). UI-checker rec #3.
      ! grep -i 'starting-style' qhse-cesi/index.html

      # 4. No inline event handlers, no javascript: URLs, no third-party JS.
      ! grep -E 'onclick=|onload=|onerror=|javascript:' qhse-cesi/index.html
      ! grep -E '<script[^>]+src=' qhse-cesi/index.html

      # 5. Layer order present, header height token reused for offsets.
      grep -q '@layer reset, tokens, base, components, utilities' qhse-cesi/index.html
      grep -q 'scroll-padding-top: var(--header-h)' qhse-cesi/index.html
      grep -q 'scroll-margin-top: var(--header-h)' qhse-cesi/index.html

      # 6. Reserved V2 surface present.
      grep -q '<section id="outils"[^>]*hidden' qhse-cesi/index.html
      grep -E '<li hidden>.*outils' qhse-cesi/index.html

      # 7. Skip-link, semantic landmarks, lang=fr.
      grep -q 'lang="fr"' qhse-cesi/index.html
      grep -q '<meta name="color-scheme" content="dark light">' qhse-cesi/index.html
      grep -q 'class="skip-link"' qhse-cesi/index.html
      grep -q 'href="#main"' qhse-cesi/index.html
      grep -q '<main id="main">' qhse-cesi/index.html
      grep -q 'role="banner"' qhse-cesi/index.html
      grep -q 'aria-label="Navigation principale"' qhse-cesi/index.html
      grep -q 'role="contentinfo"' qhse-cesi/index.html
      grep -E 'aria-labelledby="h-(accueil|decouverte|biblio|outils)"' qhse-cesi/index.html | wc -l | grep -q '^4$'

      # 8. Google Fonts CSS2 single request, three families, display=swap, two preconnects.
      grep -q 'preconnect.*fonts\.googleapis\.com' qhse-cesi/index.html
      grep -q 'preconnect.*fonts\.gstatic\.com.*crossorigin' qhse-cesi/index.html
      grep -E 'fonts\.googleapis\.com/css2.*Fraunces.*Inter.*JetBrains\+Mono.*display=swap' qhse-cesi/index.html

      # 9. prefers-reduced-motion override present.
      grep -q 'prefers-reduced-motion: reduce' qhse-cesi/index.html

      # 10. Print stylesheet present, hides chrome, expands external URLs.
      grep -q '@media print' qhse-cesi/index.html
      grep -E 'a\[href\^="http"\]::after' qhse-cesi/index.html

      # 11. External links carry rel="noopener noreferrer".
      # (Currently only the footer GitHub link; pattern enforced for future-proofing.)
      ! awk '/<a [^>]*target="_blank"/ && !/rel="noopener noreferrer"/' qhse-cesi/index.html | grep -q .

      # 12. IIFE wraps the script (no globals).
      grep -E '\(\(\) => \{|\(function\(\) \{' qhse-cesi/index.html

      # 13. Scrollspy uses IntersectionObserver (no scroll-event listener).
      grep -q 'new IntersectionObserver' qhse-cesi/index.html
      ! grep -E "addEventListener\(\s*'scroll'" qhse-cesi/index.html

      # 14. The script section has no aria-label mutation (UI-checker rec #2 — CSS-only path).
      # The aria-label string appears in the HTML (static, on the checkbox) but is NOT mutated by JS.
      ! awk '/<script>/,/<\/script>/' qhse-cesi/index.html | grep -E "setAttribute\([^,]*aria-label|\.ariaLabel\s*="
    </automated>
  </verify>
  <acceptance_criteria>
    - `qhse-cesi/index.html` is a single file, 350-1000 lines, no external CSS or JS files referenced (only the two Google Fonts `<link>` tags).
    - Visual identity verbatim from UI-SPEC: Fraunces (display) + Inter (body) + JetBrains Mono (mono); OKLCH tokens via `light-dark()`; `color-scheme: dark light` on `:root`; warm-dark surfaces (`oklch(15% 0.012 65)` ≈ `#1a1814`); brass accent (`oklch(74% 0.10 78)` ≈ `#c9a96e`); no `#000`, no pure-black backgrounds.
    - CSS layer order declared verbatim: `@layer reset, tokens, base, components, utilities;`.
    - Single `--header-h: 4rem` token reused by both `scroll-padding-top` on `<html>` AND `scroll-margin-top` on every `<section>` AND on every `<h2>` inside `<section>`.
    - Skip-link (`Aller au contenu principal`) is the first child of `<body>`, snaps visible on `:focus-visible`.
    - Sticky `<header role="banner">` contains: `.brand`, hidden `#nav-toggle` checkbox, `.burger` label with two stacked Lucide SVG icons (`menu` + `x`) and two `sr-only` `<span>`s for the aria-label alternation (CSS-only swap via `:has(:checked)` per UI-checker rec #2 — NO JS aria-label mutation).
    - `<nav aria-label="Navigation principale">` with `<ul class="nav__list">` of four items; the fourth (`#outils`) carries `hidden`.
    - Burger menu opens via `nav:has(#nav-toggle:checked) .nav__list { display: flex; }`, default-closed on mobile.
    - One delegated click listener on `.nav__list` closes the burger (`toggle.checked = false`) WITHOUT `preventDefault()` — native anchor scroll fires after, with the menu already closed.
    - Four `<section>` elements: `#accueil`, `#decouverte`, `#biblio`, `#outils[hidden]`, each with eyebrow + h2/h1 + `aria-labelledby`. The `<section id="outils">` carries the `hidden` attribute and the matching `<li hidden>` in the nav.
    - The `#biblio` section contains an empty mount point `<div id="biblio-grid">` for Phase 3.
    - Footer (`role="contentinfo"`) shows `dernière mise à jour <time datetime="2026-05-11">11 mai 2026</time>` and a GitHub link with `target="_blank" rel="noopener noreferrer"`.
    - Print stylesheet hides chrome (`header, .skip-link, .nav-toggle, .burger { display: none }`) and expands `a[href^="http"]::after { content: " (" attr(href) ")" ... }`. Internal anchors (`a[href^="#"]`) are NOT expanded.
    - `prefers-reduced-motion: reduce` override is in the reset layer and disables `animation-duration`, `transition-duration`, and `scroll-behavior`.
    - IIFE-wrapped `<script>`, no global functions, no inline `onclick=`. Three blocks: header shadow on scroll (sentinel + IntersectionObserver), scrollspy (≤ 15 LOC IntersectionObserver block per UI-checker rec #1 — shares the same IIFE, no separate listener), burger-close-on-link-tap delegated listener.
    - String `starting-style` does NOT appear anywhere in the file (UI-checker rec #3).
    - No JS mutation of any `aria-label` attribute (UI-checker rec #2).
    - Every `grep` and `!grep` assertion in `<verify><automated>` passes.
  </acceptance_criteria>
  <done>
    The file `qhse-cesi/index.html` exists, all 14 automated checks pass, the file opens in a browser at `file:///.../qhse-cesi/index.html` and renders the editorial dark identity with working sticky nav, working burger on mobile viewport (≤ 47.99rem), visible focus rings on Tab, and a clean Ctrl+P preview with hidden chrome.
  </done>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Commit and push to deploy via the existing GitHub Actions pipeline</name>
  <files>qhse-cesi/index.html</files>
  <read_first>
    - `CLAUDE.md` §"Deploy Pipeline" (the canonical pipeline) and §"Notes for Claude Code" (commit message format, `git pull` before push)
    - `.github/workflows/deploy.yml` — READ ONLY to confirm it exists and watches `main`. Do NOT modify, edit, or even touch its mtime.
  </read_first>
  <action>
    The chassis file from Task 1 must reach the live URL via the existing pipeline. No manual Vercel CLI, no `--no-verify`, no force-push.

    1. **Pre-flight:**
       - From repo root, confirm `git status` shows `qhse-cesi/index.html` (and `.planning/phases/01-skeleton-chassis-visual-identity/01-PLAN.md` + `01-SKELETON.md` if not already committed) as untracked or modified.
       - Confirm `.github/workflows/deploy.yml` is NOT in the diff (`git diff --name-only .github/workflows/deploy.yml` must be empty).
       - Confirm the existing root `/index.html` (QHSE Trainer) is NOT in the diff (`git diff --name-only index.html` must be empty — INFRA-03 forbids touching it).
       - Run `git pull --rebase origin main` to avoid push conflicts (per CLAUDE.md §"Notes for Claude Code").

    2. **Stage and commit** — name-by-name, NOT `git add .` or `git add -A`:

       ```
       git add qhse-cesi/index.html
       git add .planning/phases/01-skeleton-chassis-visual-identity/01-PLAN.md
       git add .planning/phases/01-skeleton-chassis-visual-identity/01-SKELETON.md
       git commit -m "✨ Feature: Phase 1 — skeleton chassis QHSE CESI Hub at /qhse-cesi/"
       ```

       (The commit-message format follows CLAUDE.md §"Notes for Claude Code". The Get-Shit-Done `Co-Authored-By` tag is omitted here because the project's existing commit history at `703b2b9`, `598305d`, `d8c1ed2`, `52e5330` follows the project's bespoke `🚀 / ✨ / 📝 / emoji prefix` convention. Match the existing style — the project's commits don't carry GSD co-author tags, and CLAUDE.md is silent on the matter; matching the user's existing convention beats a generic GSD template.)

    3. **Push:**

       ```
       git push origin main
       ```

       If the push fails for auth reasons (token expired), STOP and surface the failure with the exact CLAUDE.md-prescribed message: `J'ai besoin de ton token GitHub (ghp_...) pour déployer.` Do NOT retry. Do NOT log the token. Do NOT force-push.

    4. **Wait for GitHub Actions to finish** — the pipeline normally completes in ~60 s. Poll the live URL:

       ```
       curl -s -o /dev/null -w "%{http_code}\n" https://mes-apps-claude.vercel.app/qhse-cesi/
       ```

       Expect `200` once deploy completes. Allow up to 3 minutes. If the URL returns `404` after 3 minutes, the deploy failed; do NOT troubleshoot autonomously — surface the failure and let the owner inspect the GitHub Actions tab.

    5. **Verify Trainer untouched** — INFRA-03 gate:

       ```
       curl -s -o /dev/null -w "%{http_code}\n" https://mes-apps-claude.vercel.app/
       ```

       Expect `200` (Trainer still serves). If anything other than `200`, something broke the Trainer and the deploy must be reverted (`git revert HEAD` + `git push`).
  </action>
  <verify>
    <automated>
      # The commit landed on origin/main.
      git rev-parse HEAD = git rev-parse origin/main

      # qhse-cesi/index.html is tracked under main.
      git ls-tree -r origin/main --name-only | grep -q '^qhse-cesi/index\.html$'

      # The deploy workflow was NOT modified.
      ! git diff HEAD~1 HEAD --name-only | grep -q '\.github/workflows/'

      # Root index.html (Trainer) was NOT modified.
      ! git diff HEAD~1 HEAD --name-only | grep -q '^index\.html$'

      # Live URL responds 200.
      [ "$(curl -s -o /dev/null -w '%{http_code}' https://mes-apps-claude.vercel.app/qhse-cesi/)" = "200" ]

      # Trainer URL still responds 200 (INFRA-03).
      [ "$(curl -s -o /dev/null -w '%{http_code}' https://mes-apps-claude.vercel.app/)" = "200" ]
    </automated>
  </verify>
  <acceptance_criteria>
    - The commit follows the existing project convention (emoji prefix matching `🚀 Deploy:` / `✨ Feature:` / `📝 Add` style from the repo's history) and contains exactly `qhse-cesi/index.html` plus the planning artifacts. NO modifications to `.github/workflows/deploy.yml` or `index.html` at root.
    - `git push origin main` succeeds without `--force` and without `--no-verify`.
    - GitHub Actions auto-deploys; within 3 minutes, `https://mes-apps-claude.vercel.app/qhse-cesi/` returns HTTP 200.
    - `https://mes-apps-claude.vercel.app/` (existing QHSE Trainer) still returns HTTP 200 — INFRA-03 holds.
    - Verify no token is leaked into logs, commit messages, or output (CLAUDE.md §"GitHub Token: Never log or expose the token in output").
  </acceptance_criteria>
  <done>
    Both live URLs respond 200, the diff for this commit touches only `qhse-cesi/index.html` and the `.planning/phases/01-skeleton-chassis-visual-identity/` artifacts, and the GitHub Actions deploy log (if checked) shows green. INFRA-01 and INFRA-03 are satisfied.
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 3: Owner verification — phone, desktop, accessibility, print, Trainer-sibling check</name>
  <read_first>
    - `.planning/phases/01-skeleton-chassis-visual-identity/01-SKELETON.md` §"Definition of done for Phase 1 (the gate to Phase 2)" — the seven boxes the owner ticks.
    - `.planning/ROADMAP.md` §"Phase 1: Skeleton chassis + visual identity" — the five owner success criteria.
  </read_first>
  <what-built>
    The walking-skeleton chassis is deployed at `https://mes-apps-claude.vercel.app/qhse-cesi/`. Single-file `qhse-cesi/index.html`:

    - Warm-dark editorial identity (Fraunces + Inter + JetBrains Mono on `#1a1814` / `#e8e2d4` / `#c9a96e` OKLCH equivalents).
    - Sticky 4rem top nav with brand "QHSE CESI" (CESI in brass), three nav links (Accueil / Découverte / Biblio) + a hidden Outils link reserved for V2.
    - CSS-only burger menu on mobile, closes synchronously on link tap before scroll fires.
    - Smooth-scroll anchors with `scroll-padding-top` offset so headings land below the nav.
    - Skip-link as first focusable element; 3px blue focus ring on every interactive element.
    - Four section shells (Accueil placeholder + lead, Découverte placeholder, Biblio placeholder, Outils hidden) with eyebrow + h2-underline pattern.
    - Footer with `dernière mise à jour 11 mai 2026` + GitHub link.
    - Print stylesheet: nav/skip-link hidden, external URLs expanded as mono footnotes, body forced to black-on-white.
    - `prefers-reduced-motion: reduce` disables smooth-scroll and transitions.
    - Reserved `<section id="outils" hidden>` + matching `<li hidden>` — V2 unlocks via attribute removal.
    - The existing QHSE Trainer at `https://mes-apps-claude.vercel.app/` is untouched and still works.
  </what-built>
  <how-to-verify>
    Perform all seven checks below on real devices. Do NOT rely solely on Chrome DevTools device emulation — iOS Safari and Android Chrome have subtle behaviour differences (`scroll-behavior: smooth` + `scroll-padding-top`, `backdrop-filter`, `:has()` engine) that emulation hides (PITFALLS.md #8).

    **1. Phone — visual identity (CHASSIS-01, IDENT-01, IDENT-02, IDENT-04, CHASSIS-07):**
    - Open `https://mes-apps-claude.vercel.app/qhse-cesi/` on your phone.
    - Expected: warm-dark page (NOT pure black, NOT lime). Cream-coloured text. Serif headlines (Fraunces — distinctive curves, not Bebas Neue's industrial caps). The brand "QHSE CESI" shows the "CESI" portion in a brass/aged-gold colour. The site feels like a printed reference book, NOT the industrial-terminal Trainer.
    - Resize / orient: works in portrait and landscape on a 360px-wide phone.

    **2. Phone — burger menu + smooth-scroll-with-offset (CHASSIS-02, CHASSIS-03, PITFALLS #8):**
    - Tap the burger icon (top-right, 44×44 target). Menu opens full-screen below the nav.
    - Tap "Découverte". Menu closes **before** the page scrolls. The `02 / DÉCOUVERTE` eyebrow + "La formation, en un survol" heading land cleanly with breathing room below the sticky nav (NOT flush against it, NOT hidden under it).
    - Repeat for "Accueil" and "Biblio".

    **3. Desktop — horizontal nav + active-state scrollspy (CHASSIS-01, CHASSIS-05):**
    - Open the same URL on a desktop browser (Chrome or Firefox).
    - The horizontal nav shows three items; the burger is invisible.
    - Click each nav item. Smooth scroll, heading lands below the bar.
    - Scroll manually. The current section's nav link picks up an underlined brass active state (this is the ≤ 15 LOC scrollspy — UI-checker rec #1).
    - Visit `https://mes-apps-claude.vercel.app/qhse-cesi/#decouverte` directly — page loads at the Découverte section with the heading positioned correctly.

    **4. Keyboard accessibility (CHASSIS-04, IDENT-05, CHASSIS-10):**
    - Reload the page. Press Tab once (cold load).
    - Expected: the first focusable element to reveal is a small brass-bordered "Aller au contenu principal" pill, top-left. Press Enter — focus moves into `<main>`.
    - Continue Tabbing — every interactive element (brand, burger on mobile, nav links, footer link) shows a clear 3px blue focus ring. Focus order is logical (top to bottom, left to right). Focus never gets lost.
    - On a dark editorial palette, the focus ring is intentionally cool blue (NOT brass) so it's perceptible against both the dark background AND the brass accent (UI-SPEC §Color: contrast ratio 8.4:1, AAA).

    **5. Print preview (CHASSIS-06):**
    - On desktop: press Ctrl+P (or Cmd+P on macOS). Or "Save as PDF".
    - Expected: the sticky nav and the skip-link are gone from the print preview. The page is black-on-white. The footer's `Code source sur GitHub` link is followed by a monospace `(https://github.com/Ivyx-hue/mes-apps-claude)` footnote. The brass h2 underlines are absent in print. Section bodies don't split across page breaks.

    **6. Trainer still alive (INFRA-03):**
    - Open `https://mes-apps-claude.vercel.app/` (no `/qhse-cesi/`).
    - Expected: the existing QHSE Trainer loads exactly as before — Bebas Neue, lime accent, dot grid, flashcards/QCM. The Hub did NOT cannibalize it. Side-by-side, the two apps feel like the same owner ran two different projects.

    **7. Lighthouse + axe (CHASSIS-10, IDENT-05):**
    - In Chrome DevTools, run Lighthouse on `https://mes-apps-claude.vercel.app/qhse-cesi/`. Expected: Accessibility score ≥ 95; no critical errors. (Performance score may vary based on Google Fonts CDN latency — this is acceptable, the gate is Accessibility, not Performance.)
    - Install the axe DevTools extension (free), open the panel, click "Analyze". Expected: zero critical issues.

    **Reply guidance for the owner:**
    - All seven pass → respond `approved` and Phase 1 ships. The orchestrator will run `/gsd-transition` to unlock Phase 2.
    - Anything fails → describe what you see (which device, which check, what was expected, what happened). Claude will diagnose and ship a fix as a separate commit through the same pipeline, then re-loop this checkpoint.

    **What you should NOT expect to see in Phase 1 (these are correct absences, not bugs):**
    - The Accueil, Découverte, and Biblio section bodies show only placeholder copy ("En cours de constitution — première publication prévue Phase 2/3"). That is the walking-skeleton scope — content lands in Phase 2 (Découverte) and Phase 3 (Biblio).
    - No light-mode toggle. Dark is the default; the OS-level `prefers-color-scheme: light` setting will swap to a light palette for free via `light-dark()`, but there is no in-page toggle (deferred to v1.1+).
    - No filter chips, no Ctrl+K search, no mark-as-read, no per-card date badges. Those are post-V1 differentiators (FEATURES.md P2/P3, v1.1+).
    - No entrance animations / fade-ins on sections (UI-checker rec #3 — deliberately omitted in Phase 1).
  </how-to-verify>
  <resume-signal>
    Type `approved` if all seven checks pass on real devices.
    Otherwise describe: which check, which device (model + browser), what you saw vs what you expected. Claude will diagnose and ship a fix.
  </resume-signal>
  <acceptance_criteria>
    - Owner has personally completed all seven checks on at least one real phone and one real desktop (NOT just DevTools emulation).
    - All seven checks pass — no degradation discovered, the Trainer at `/` still serves, Lighthouse A11y ≥ 95, axe = 0 critical.
    - Owner has typed `approved` (or a French equivalent — `validé`, `ça marche`, `ok pour la suite`).
  </acceptance_criteria>
  <done>
    Owner sign-off captured. Phase 1 enters "completed" state. The orchestrator can now run `/gsd-transition` to move to Phase 2.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

The Hub is a public static HTML deployment with a minimal threat surface. There are no user inputs, no auth, no backend, no third-party scripts. The legitimate trust boundaries:

| Boundary | Description |
|----------|-------------|
| Owner's local machine → GitHub (via HTTPS + token) | Token must never appear in commits, logs, or chat output (CLAUDE.md §"GitHub Token") |
| GitHub → Vercel (via existing GitHub Actions workflow) | Pipeline is read-only for this phase — do not modify `.github/workflows/deploy.yml` |
| Public visitor → `https://mes-apps-claude.vercel.app/qhse-cesi/` | Visitor receives only static HTML/CSS/JS + Google Fonts CSS2 response; no API, no state |
| Visitor click → outbound `<a target="_blank">` to GitHub | Tabnabbing surface — mitigated by `rel="noopener noreferrer"` on every external `<a>` |
| Browser → Google Fonts CDN (`fonts.googleapis.com` + `fonts.gstatic.com`) | Single first-party trust relationship; no script execution, only CSS + WOFF2 responses |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-01 | Spoofing | Static site — no auth, no identity | accept | No identities exist to spoof; site is identifiable solely by its Vercel URL (HTTPS-only by default at the Vercel edge) |
| T-01-02 | Tampering | `qhse-cesi/index.html` content via repo write | accept | Repo is single-owner; commits flow through GitHub auth on the owner's local machine; pipeline is read-only for the executor (no `.github/workflows/deploy.yml` edits per CLAUDE.md) |
| T-01-03 | Tampering | Inline `<script>` modified by external party at runtime | mitigate | No `<script src="...">` external references; no inline event handlers (`onclick=""` forbidden); IIFE encapsulation prevents global pollution. Pre-deploy `grep -E 'onclick=\|onload=\|<script[^>]+src=' qhse-cesi/index.html` returns empty (verified in Task 1 automated checks) |
| T-01-04 | Repudiation | Owner repudiates a deployed change | accept | Single-user personal tool; git log is sufficient audit |
| T-01-05 | Information disclosure | Token/PII committed to git | mitigate | Pre-commit hygiene per CLAUDE.md: never log or expose the GitHub token; the executor stages files by name (`git add qhse-cesi/index.html`), never `git add -A`; no `.env`/credentials/secrets exist in this phase scope. Owner-side review of `git status` before push is the human gate |
| T-01-06 | Information disclosure | Google Fonts CDN logs visitor IPs | accept | Standard first-party CDN; same surface as the QHSE Trainer; Vercel edge already terminates TLS — no incremental exposure |
| T-01-07 | Denial of service | Vercel deploy fails or rate-limits | accept | Single-user personal tool; an outage is annoying, not catastrophic; recovery is `git push` of a working state |
| T-01-08 | Elevation of privilege | Visitor tabnabs the source tab via `<a target="_blank">` | mitigate | Every external `<a target="_blank">` carries `rel="noopener noreferrer"` (CHASSIS contract via UI-SPEC; pre-deploy assertion in Task 1 automated checks: `awk '/<a [^>]*target="_blank"/ && !/rel="noopener noreferrer"/'` returns empty). Currently the only such link is the footer GitHub link; the constraint is enforced for forward-compat to Phase 3's outbound Biblio cards |
| T-01-09 | Elevation of privilege | URL-param injection rendered into DOM | mitigate | Site is read-only with zero `URLSearchParams` reads, zero `document.write`, zero `innerHTML` from untrusted sources. In Phase 1 the only `innerHTML` site is the reserved `#biblio-grid` mount point which is empty (Phase 3 populates from a hand-curated literal array; no external input ever flows in). Pre-deploy `grep -E 'URLSearchParams\|location\.hash\.|document\.write' qhse-cesi/index.html` returns empty |
| T-01-10 | Elevation of privilege | Third-party JS supply-chain attack | mitigate | Zero third-party JS — no `<script src="https://...">`, no Lucide UMD runtime (icons are inlined SVG copy-pasted from `lucide.dev/icons/`), no Google Fonts JS loader. The single first-party network call is the Google Fonts CSS2 stylesheet response, which executes no script |

**Disposition summary:** The static-file architecture eliminates most STRIDE categories by construction. The mitigated threats (T-01-03, T-01-05, T-01-08, T-01-09, T-01-10) all map to concrete Task 1 automated `grep` assertions that fail the build if violated. No threats require runtime defences (CSP headers, rate limiting, WAF) because Vercel's default edge config + the static-only payload are sufficient for the threat surface.
</threat_model>

<verification>
**Phase-level checks (must all pass before Phase 1 is considered done):**

1. **File-shape gate:** `wc -l qhse-cesi/index.html` returns 350-1000.
2. **No-prohibited-tokens gate:**
   - `! grep -E '#000\b|oklch\(\s*0%' qhse-cesi/index.html | grep -v 'oklch(0% 0 0 / 0\.45)'` (no pure black except shadow alpha)
   - `! grep -i 'starting-style' qhse-cesi/index.html` (UI-checker rec #3 — zero entrance-animation CSS)
   - `! grep -E 'onclick=|onload=|onerror=|javascript:' qhse-cesi/index.html` (no inline handlers)
   - `! grep -E '<script[^>]+src=' qhse-cesi/index.html` (no external JS)
3. **Required-tokens gate:** all 14 `grep -q` assertions from Task 1 pass.
4. **Pipeline gate:**
   - `git diff HEAD~1 HEAD --name-only | grep -q '^qhse-cesi/index\.html$'` (yes)
   - `! git diff HEAD~1 HEAD --name-only | grep -q '\.github/workflows/'` (workflow untouched)
   - `! git diff HEAD~1 HEAD --name-only | grep -q '^index\.html$'` (Trainer untouched per INFRA-03)
5. **Live-URL gate:**
   - `curl -s -o /dev/null -w '%{http_code}' https://mes-apps-claude.vercel.app/qhse-cesi/` returns `200`
   - `curl -s -o /dev/null -w '%{http_code}' https://mes-apps-claude.vercel.app/` returns `200`
6. **Owner sign-off gate:** Task 3 checkpoint captures `approved` from the owner after real-device verification of all seven boxes.
</verification>

<success_criteria>
Phase 1 is complete when:

- [ ] **INFRA-01** — Live at `https://mes-apps-claude.vercel.app/qhse-cesi/` (curl 200).
- [ ] **INFRA-02** — Single `qhse-cesi/index.html` with inline `<style>` and `<script>`; zero external JS files, only Google Fonts `<link>`.
- [ ] **INFRA-03** — Live at `https://mes-apps-claude.vercel.app/` still loads the unchanged Trainer (curl 200; no diff to root `index.html`).
- [ ] **IDENT-01** — Side-by-side, Hub uses Fraunces + Inter + JetBrains Mono on warm-dark editorial palette; Trainer uses Bebas Neue + lime industrial palette. Visibly distinct.
- [ ] **IDENT-02** — Dark default via `color-scheme: dark light` + `<meta name="color-scheme">`. No light-mode toggle.
- [ ] **IDENT-03** — All color values are OKLCH custom properties in `:root`, consumed via `var(--*)` in components. No hard-coded hex / OKLCH in component CSS.
- [ ] **IDENT-04** — Three families via single Google Fonts CSS2 request with `display=swap` + dual preconnect; fluid `clamp()` type scale (`--step-5` through `--step--1`).
- [ ] **IDENT-05** — Body text ≥ 4.5:1 contrast; no `#000` background; `:focus-visible` 3px blue ring 8.4:1 against background. Validated by Lighthouse A11y ≥ 95 + axe 0 critical (Task 3).
- [ ] **CHASSIS-01** — Sticky `<header role="banner">` with three anchor nav links (+ hidden Outils for V2).
- [ ] **CHASSIS-02** — `html { scroll-behavior: smooth; scroll-padding-top: var(--header-h); }` + `section { scroll-margin-top: var(--header-h); }`; headings land below the sticky bar on click and on direct anchor URLs.
- [ ] **CHASSIS-03** — Mobile (≤ 47.99rem) collapses to 44×44 burger; CSS-only open/close via `:has(:checked)`; one delegated JS listener closes the burger synchronously before scroll fires.
- [ ] **CHASSIS-04** — `<a class="skip-link" href="#main">Aller au contenu principal</a>` is the first focusable element; visible on `:focus-visible`; moves focus into `<main>` on Enter.
- [ ] **CHASSIS-05** — Stable IDs: `#accueil`, `#decouverte`, `#biblio`, `#outils`. Direct URLs work.
- [ ] **CHASSIS-06** — Print stylesheet hides chrome (`header, .skip-link, .nav-toggle, .burger`); `a[href^="http"]::after { content: " (" attr(href) ")" }` expands external URLs; internal anchors do not expand.
- [ ] **CHASSIS-07** — One breakpoint at `min-width: 48rem` (768 px); page usable from 360 px to 1440+ px.
- [ ] **CHASSIS-08** — `<section id="outils" hidden aria-labelledby="h-outils">` + `<li hidden><a href="#outils">Outils</a></li>` exist in DOM; flipping V2 = removing two `hidden` attributes.
- [ ] **CHASSIS-09** — `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }` in `@layer reset`.
- [ ] **CHASSIS-10** — Lighthouse Accessibility ≥ 95 on the live shell; axe DevTools reports zero critical issues. (Task 3 owner-verified.)
</success_criteria>

<output>
After completion, create `.planning/phases/01-skeleton-chassis-visual-identity/01-skeleton-chassis-visual-identity-01-SUMMARY.md` capturing:

- File created (`qhse-cesi/index.html`, line count, link to live URL).
- Frontmatter `affects` (subsystems touched: chassis, visual identity, deploy pipeline), `provides` (CSS token system, layout chassis, V2 reserved surface), `patterns` (single-file vanilla HTML/CSS/JS, OKLCH tokens, CSS-only burger, IIFE+IntersectionObserver, single Google Fonts CSS2 request), `tech_stack` (HTML5, modern CSS, vanilla ES2024, Fraunces, Inter, JetBrains Mono, Lucide inline SVG).
- Decisions locked (operational defaults from UI-SPEC `owner_decisions`; the four owner gate decisions ratified at sign-off 2026-05-11).
- Live URL verification snapshot (HTTP 200, Lighthouse A11y score, axe critical count).
- Requirements satisfied: all 18 from this plan's `requirements` frontmatter, each with a verification cite.
- "Phase 2 inherits" — explicit handoff list: section shells ready for content, mini-TOC CSS reserved, footer template ready for `derniere_maj` bumps, `--measure: 68ch` ready for long-form prose, `<aside class="toc">` ready to be hand-written.
</output>
