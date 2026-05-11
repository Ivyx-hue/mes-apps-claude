# Project Research Summary

**Project:** QHSE CESI Hub
**Domain:** Single-file static reading hub — personal academic programme overview + curated link library (vanilla HTML/CSS/JS, no build, deployed at `/qhse-cesi/`)
**Researched:** 2026-05-11
**Confidence:** HIGH

## Executive Summary

The QHSE CESI Hub is a single-user, read-first reference site whose closest cultural reference points are GitHub awesome-lists, academic personal homepages, and Material-for-MkDocs reference docs — not LMS templates or "learning platforms". All four research files converge on the same shape: one self-contained `index.html` with inline `<style>` and `<script>`, two content sections (Découverte + Biblio) anchored from a sticky top nav, deployed as-is through the existing GitHub Actions pipeline. The technical constraint ("no build, no deps, no framework") is not a limitation in 2026: modern vanilla CSS (`@layer`, nesting, `clamp`, container queries, `:has()`, `light-dark()`, OKLCH) covers every feature a framework would historically have justified, and the entire JS surface area for V1 is ~30 lines (burger menu, smooth-scroll fallback, optional scrollspy).

The recommended approach is opinionated and narrow: dark-first editorial visual identity (Fraunces + Inter + JetBrains Mono via Google Fonts CSS2, OKLCH tokens, warm-paper palette distinct from the Trainer's industrial-lime aesthetic); a data-driven Biblio (`BIBLIO_CATEGORIES` + `BIBLIO[]` arrays with stable `id`, `category`, `source_type`, `lastChecked`, `priority`, optional `archive_url`) rendered once via `innerHTML`; plain semantic HTML for the singleton Découverte prose; an IIFE-wrapped script with `Hub` / `Nav` namespaces and a reserved-but-`hidden` `<section id="outils">` placeholder for V2. V1 ships exactly the table-stakes feature set (sticky nav, smooth scroll with `scroll-padding-top`, burger menu, 5-category Biblio with link cards, Découverte content, print stylesheet, distinct dark identity) and explicitly defers scrollspy, filter chips, mark-as-read, and Ctrl+K search to v1.1+ once real usage signals need.

The risk surface is editorial more than technical. Link rot (~5%/year baseline), survivorship bias on Reddit/LinkedIn testimonials, conflation of generic CESI content with Bordeaux-specific reality, and the French pedagogical-exception copyright rules (which forbid hosting annales PDFs on a public Vercel deployment) are first-class constraints — they must be baked into the card schema and the hosting policy from day one, not retrofitted. The technical pitfalls are real but mechanical: dark-mode WCAG contrast (avoid pure `#000`, validate via axe), FART on theme load (inline `<head>` script), sticky-nav anchor offset (`scroll-padding-top`), single-file rot (>2000 lines = refactor trigger), and the always-lurking scope creep into V2 study tools (Trainer-style QCM/flashcards already exist elsewhere — the Hub must not absorb them).

## Key Findings

### Recommended Stack

The stack is "modern vanilla, version-pinned at the CDN edge, zero runtime dependencies." A single `index.html` ships everything via two `<link>` tags (preconnect + Google Fonts CSS2) and two inline blocks (`<style>`, `<script>`). No Tailwind, no Alpine, no htmx, no preprocessor, no PWA, no analytics. The Google Fonts request is one CSS2 call (~85 KB woff2 total) with `display=swap` to guarantee FOUT-not-FOIT. Icons ship as an inline Lucide SVG sprite (10–15 symbols, copy-pasted from `lucide.dev`), not the 80 KB UMD runtime.

**Core technologies:**
- **Plain HTML5** — semantic document structure; mirrors the existing Trainer pattern in the repo
- **Modern CSS in one inline `<style>` block** — `@layer reset/tokens/base/components/utilities`, CSS nesting, `clamp()` fluid type, `:has()` for CSS-only burger menu, container queries, subgrid for card grids, `@starting-style` for entrance animations, `text-wrap: balance/pretty` (all Baseline 2026)
- **OKLCH tokens + `light-dark()`** — perceptually-uniform dark/light palette with `color-scheme: dark light` on `:root` and `<meta name="color-scheme" content="dark light">`; dark is the default, light is free
- **Vanilla ES2024 JS in one inline `<script>`** — ~30 lines: burger toggle, scroll-to-anchor delegation, optional `IntersectionObserver` scrollspy in v1.1
- **Google Fonts CSS2** — **Fraunces** (display, variable, `opsz` 9..144) + **Inter** (body/UI) + **JetBrains Mono** (RNCP codes, ISO numbers); explicitly different families than the Trainer's Bebas Neue + Space Mono + DM Sans
- **Lucide static SVG sprite** (version-pinned `lucide@0.460.0`) — inline `<symbol>` definitions, referenced via `<use href="#icon-…">`
- **Existing GitHub Actions → Vercel pipeline** — push to `main`, live at `/qhse-cesi/` in ~60s; `.github/workflows/deploy.yml` is untouched

**Explicit "do not use" list:** Tailwind (any), Alpine/htmx/petite-vue, Sass/PostCSS, Bootstrap/Pico/Bulma, highlight.js, Lucide UMD runtime, ESM imports from esm.sh/skypack, runtime Markdown→HTML, font-loading JS, service workers/PWA tooling, analytics. Each was considered and rejected — see STACK.md "What NOT to Use".

### Expected Features

The reference patterns are awesome-list READMEs (categorical scannability), academicpages-style single-page anchored sites, and MkDocs Material (sticky nav + scrollspy + on-this-page). The owner does not need onboarding, gamification, or engagement — they need fast retrieval, trust signals, and zero friction.

**Must have (table stakes — without these the site is annoying):**
- Sticky top nav with anchor links to each main section
- Native smooth scroll + `scroll-padding-top` (the gotcha most sites miss)
- Mobile burger menu (CSS `:has()` + hidden checkbox, or ~15 lines JS) that **auto-closes on link click before the scroll fires**
- Responsive layout with one breakpoint (~720–768 px); dark mode default, no toggle in V1
- 5 Biblio categories rendered with semantic `<section>` + `<h2>` headings and stable `id` anchors
- Link card unit: title + 1-line description + source domain + category badge + `lastChecked` date + external-link icon
- Every outbound `<a>` carries `target="_blank" rel="noopener noreferrer"`
- Découverte section with: 1-minute pitch, programme par année, RNCP blocs, calendrier alternance, métiers + salary ranges
- Bookmarkable URLs (`#decouverte`, `#biblio-officiel`, etc.)
- Print stylesheet (`@media print`, expanded URLs as footnotes via `a[href]::after`)
- Distinct visual identity from the QHSE Trainer (see "Phase 1 gate" below)

**Should have (genuinely improve study experience — sequence after V1 ships and use begins):**
- Scrollspy active-section highlight in nav (`IntersectionObserver`, ~30 lines vanilla) — defining UX feature of MkDocs/Bootstrap docs, but only valuable once page is long enough
- Per-category filter chips on Biblio (toggle `display` via `data-category`) — once Biblio > 30 links
- Mark-as-read toggle + reading-progress bar (localStorage keyed on `data-id`) — once owner is in active study
- `data-added` / `lastChecked` date badges visible on every card (trust signal against silent rot)
- Visual category color-coding (one CSS class per category)
- Salary ranges shown as horizontal bars (min/median/max) rather than numbers alone
- Mini-TOC inside Découverte section
- Copy-link button per card (`navigator.clipboard.writeText`)
- In-page Ctrl+K search (substring filter, no fuzzy lib) — once Biblio > 60 links

**Defer to v2+ (PROJECT.md "Out of Scope"):**
- Flashcard tool / QCM / quiz (Trainer already covers these; the Hub links to it, does not absorb it)
- Auto link-checker / dead-link scanner (handled as quarterly manual ritual, or a future GitHub Action)
- Personal annotation layer (notes per link)
- Cross-device sync via JSON export/import
- Light-mode toggle (CSS `prefers-color-scheme` respect is enough for V1)

**Never (anti-features, documented):**
- AI chatbot pasted on top of the curated hub (destroys the trust premise)
- Gamification (XP, badges, streaks)
- Real-time Reddit / RSS embeds (breaks offline, breaks on API token expiry, defeats curation)
- User accounts / auth / backend sync
- Comments / discussion threads
- Carousels / sliders
- Analytics / heat-maps (CNIL exposure, no audience anyway)
- Newsletter signup, social share buttons

### Architecture Approach

One `index.html`, four ordered concerns: `<head>` (meta + fonts) → inline `<style>` (layered cascade) → `<body>` (semantic landmarks: `<header>` sticky nav, `<main>` with `<section>` × 4, `<footer>`) → inline `<script>` (IIFE-wrapped: DATA → RENDERERS → CONTROLLERS → BOOT). Découverte prose lives as hand-written semantic HTML (one-off, greppable); Biblio cards live as a data array rendered via a pure `renderCard(item) → string` function and mounted once via `innerHTML`. Event handling is delegated (one listener on `<main>` reading `data-action` / `data-target`), so no inline `onclick=""` and no global functions. The `<section id="outils" hidden>` placeholder reserves the V2 URL and namespace from day one; flipping V2 live is removing one `hidden` attribute.

**Major components:**
1. **Design tokens (`:root` in `@layer tokens`)** — single source for color (`--ink-*`, `--bg-*`, `--accent`, `--link` via `light-dark()` + OKLCH), spacing (T-shirt scale), type families, radius, measure
2. **Layered CSS (`@layer reset, tokens, base, components, utilities`)** — kills specificity wars; order of appearance = priority
3. **Semantic HTML landmarks** — `<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<article>` for cards, `<footer>`; skip-link to `#main`
4. **Data modules** — `BIBLIO_CATEGORIES[]` (5 ordered buckets with `id`, `label`, `icon`) + `BIBLIO[]` (flat array, each item carries `id`, `title`, `url`, `description`, `category`, `source_type`, `tags[]`, `priority`, `lastChecked`, optional `archive_url`, optional `note`) + `DECOUVERTE{}` (structured: pitch, programmeParAnnee, blocsRncp, calendrierAlternance, metiers)
5. **Pure renderers** — `renderCard`, `renderCategory`, `renderBiblio`, `renderDecouverte` (data in, HTML string out; never mutate, never touch DOM directly)
6. **Controllers as namespaces** — `Hub` (mount), `Nav` (active state + delegated click), reserved `Outils` stub for V2; cross-namespace talk is explicit method calls only, no shared mutable state
7. **`Storage` helper** (single try/catch surface over `localStorage`) — unused in V1 but reserved; V2 study tools will need it
8. **Reserved `<section id="outils" hidden>`** + matching empty CSS layer comment block + matching `Outils` JS namespace stub — V2 slots in without restructuring V1

**Canonical Biblio item shape (load-bearing — all downstream agents reference this exact schema):**
```js
{
  id: 'inrs-ed-6155-tms',                // kebab-case, stable, drives data-id + anchor + future favorites
  title: 'ED 6155 — Prévention des TMS',
  url: 'https://www.inrs.fr/media.html?refINRS=ED%206155',
  description: 'Guide INRS pour la prévention des troubles musculo-squelettiques.',
  category: 'pedago',                    // must match a BIBLIO_CATEGORIES.id
  source_type: 'officiel',               // officiel | pédagogique | communauté | outil-pro | annales (drives provenance badge)
  tags: ['INRS', 'TMS', 'prévention'],
  priority: 1,                           // 1 = pinned at top of category, 5 = lowest
  lastChecked: '2026-05-11',             // ISO date, rendered as <time>, ages visually (orange >90d, red >180d)
  archive_url: null,                     // optional Wayback fallback for high-value links
  note: null,                            // optional caveat ("paywall", "lien parfois lent", date+context for témoignages)
}
```

### Critical Pitfalls

1. **Silent link rot (~5%/year baseline; 54% of curated reference lists have a dead link)** — store `lastChecked` per card and render it visibly; ship a `?verify=1` dev-mode mass-link-check tool for quarterly audits; cache Wayback `archive_url` for high-value links (RNCP fiche, official CESI page, INRS dossiers); prefer permalinks (Légifrance article ID, INRS ED reference, ISO standard number) over deep nav paths.
2. **Mixing official sources with forum chatter** — every card carries a `source_type` enum (`officiel | pédagogique | communauté | outil-pro | annales`); `officiel` gets a verified badge, `communauté` gets an explicit "Témoignage individuel — lire avec recul" caveat plus date + role context; never render community and official cards as visually identical.
3. **Conflating CESI Bordeaux with generic CESI / generic Bachelor QHSE** — every Découverte fact carries explicit `source` + `as_of` ("Source: programme CESI Bordeaux 2026-2027, vérifié le 11/05/2026"); cite the RNCP fiche by **number** (RNCP35365) + version date, not by search URL; never copy-paste content from another campus without explicit "(générique CESI, non spécifique Bordeaux)" annotation.
4. **Hosting copyrighted PDFs of annales / corrigés** — French pedagogical exception is narrowly scoped to institutional intranets and excludes public Vercel hosting. **No `.pdf` files in `/qhse-cesi/`, ever.** Link only, prefer official sources, tag paywall aggregators with `note: 'paywall'`. Add a `LEGAL.md` clarifying the hub is a link-curation tool, not a content host. Once a copyrighted PDF lands in git history, removing it is a `git filter-repo` exercise.
5. **Scope creep into V2 study tools** — V1 = read-only Découverte + Biblio. Zero QCM / flashcard / quiz code in `index.html`. Any feature idea arriving during V1 goes into `V2_BACKLOG.md`, not into the file. The Trainer is a separate product the Hub *links to*, not a thing the Hub absorbs.
6. **Dark mode failing WCAG AA contrast** — never `#000` background (use `#0f1115` / `#121212` or the OKLCH `oklch(13% 0.012 250)` from STACK.md); body text contrast ≥ 4.5:1; explicit 3 px `:focus-visible` outline with offset; run axe DevTools and Lighthouse before declaring V1 shipped.
7. **Sticky-nav anchor offset + burger menu staying open** — `html { scroll-padding-top: 4rem; scroll-behavior: smooth; }` + matching `scroll-margin-top` on each `<section>`; burger menu JS closes synchronously *before* the anchor navigation proceeds; test on real iOS Safari + Android Chrome, not just DevTools emulation.
8. **Single-file rot past ~2000 lines** — keep content in a `<script type="application/json" id="content-data">` block or in the JS data arrays; HTML body remains structural-only; if `index.html` exceeds 2000 lines, refactor (still single-file: dedupe via render functions, collapse Découverte prose into structured data).
9. **FART (Flash of inAccurate coloR Theme) — if a light/dark toggle ever ships** — toggle JS must be a synchronous inline script in `<head>` before any CSS, setting `document.documentElement.dataset.theme` from `localStorage`; never let CSS `body.dark` get set post-DOMContentLoaded. Not strictly applicable to V1 (dark-only, no toggle), but pre-empt it before V1.1.

## Implications for Roadmap

Based on combined research, V1 should be **3 phases**, each independently deployable through the existing pipeline. V1.1+ enhancements are a separate roadmap, not part of the initial ship.

### Phase 1: Visual identity decision + skeleton chassis

**Rationale:** STACK and FEATURES both flag that the warm-dark editorial identity is the *one open owner decision* gating everything downstream — once tokens are chosen, every component layers on top without rework. ARCHITECTURE says the layout chassis (sticky nav + smooth scroll + burger menu + anchors + skip-link) is bug-prone and must be debugged before content noise lands on top. Doing both in Phase 1 means the rest is mechanical.

**Delivers:**
- Owner-approved palette + typography decision (recommended starting point: warm dark `#1a1814` background / `#e8e2d4` text / `#c9a96e` accent **or** the OKLCH equivalent from STACK.md; Fraunces + Inter + JetBrains Mono via Google Fonts CSS2) — **this is an owner gate, not a research output, surface it explicitly**
- `index.html` skeleton at `/qhse-cesi/` deployed to Vercel
- `<head>` with charset/viewport/`color-scheme`/preconnect + Fonts CSS2 link
- Inline `<style>` with `@layer reset/tokens/base/components/utilities`, OKLCH tokens, `light-dark()` palette, type scale (`clamp()`), reset
- Inline Lucide SVG sprite (~10 icons)
- `<header>` sticky nav with anchor links, CSS-only burger menu (`:has()` + hidden checkbox), skip-link
- 4 empty `<section>` shells (`#accueil`, `#decouverte`, `#biblio`, `#outils hidden`) with `aria-labelledby` headings
- `html { scroll-behavior: smooth; scroll-padding-top: 4rem; }` + `section { scroll-margin-top: 4rem; }`
- `prefers-reduced-motion` reset
- Verified-clean Lighthouse / axe pass on the empty shell

**Addresses (FEATURES P1):** sticky nav, smooth scroll + `scroll-padding-top`, burger menu, responsive layout, dark default, section IDs + bookmarkable URLs, distinct visual identity, deploys to `/qhse-cesi/`.

**Avoids (PITFALLS):** #6 dark-mode WCAG (token decisions made *before* content), #7 sticky-nav anchor offset (`scroll-padding-top` + `scroll-margin-top` from day one), #8 burger-menu-stays-open (closes synchronously on link click).

**Owner gate:** visual identity sign-off before any content goes in.

---

### Phase 2: Découverte content (the "what is this formation" half)

**Rationale:** ARCHITECTURE recommends doing content while CSS is still uncluttered — the heaviest cognitive lift is writing, not coding. PITFALLS #3 says every Découverte fact must carry `source` + `as_of` from the first paragraph; retrofitting provenance is painful. Découverte before Biblio because the section structure is bespoke (one-off semantic HTML, no render function needed) and validates the typography decisions on real long-form text.

**Delivers:**
- 1-minute pitch (~150 words) inside `#accueil` / top of `#decouverte`
- `#decouverte` subsections: programme par année, RNCP blocs (cited by RNCP number + version date), calendrier alternance, métiers + salary ranges (cited by Apec / France Travail / INSEE, never aggregators)
- Mini-TOC inside Découverte (hand-coded `<ul>` of in-section anchors)
- Each fact carries inline `source` + `as_of`; nothing unsourced
- Salary ranges optionally as visual bars (P2 feature — defer if time-pressured)
- Print stylesheet (`@media print`, `a[href]::after { content: " (" attr(href) ")" }`)
- Mobile + desktop typography QA (line length ~60–80ch, line-height ~1.55–1.65, `text-wrap: balance` on h1–h3, `text-wrap: pretty` on `<p>`)

**Uses (STACK):** `clamp()` type scale, `text-wrap: balance/pretty`, `@scope` for section-local styles, `--measure: 68ch`.

**Implements (ARCHITECTURE):** Pattern 2 (hand-written HTML for singletons), semantic landmarks.

**Avoids (PITFALLS):** #3 generic-CESI conflation (Bordeaux-specific only, or labelled), #9 copyrighted content (text-only sourcing, no scanned PDFs).

---

### Phase 3: Biblio data layer + render + 5 categories populated

**Rationale:** Biblio is where the architecture's data-driven pattern earns its keep. Get `renderCard` right with 3 entries per category first (15 cards total), then bulk-add. FEATURES says ship table-stakes Biblio only — no filter chips, no mark-as-read, no Ctrl+K search; defer all of those to v1.1 once the Biblio is large enough to justify them.

**Delivers:**
- `BIBLIO_CATEGORIES[]` (5 ordered: officiel, communauté, pedago, annales, pro)
- `BIBLIO[]` populated to ≥5 verified cards per category (≥25 total), each carrying the full canonical schema (`id`, `title`, `url`, `description`, `category`, `source_type`, `tags`, `priority`, `lastChecked`, optional `archive_url`, optional `note`)
- Pure renderers (`renderCard`, `renderCategory`, `renderBiblio`) and one-shot `innerHTML` mount inside IIFE
- Each card: title, 1-line description, source domain, category badge, `source_type` provenance badge (verified for officiel, "lire avec recul" for communauté), `lastChecked` age indicator (greys/oranges/reds with age)
- All outbound links: `target="_blank" rel="noopener noreferrer"`
- Delegated click listener on `<main>` (no inline `onclick`)
- `LEGAL.md` in `/qhse-cesi/` documenting the link-curation policy
- `V2_BACKLOG.md` in `.planning/` created and pre-seeded with deferred features
- Footer with `derniere_maj` ISO date + repo link
- Final QA pass against "Looks Done But Isn't" checklist (PITFALLS)

**Uses (STACK):** OKLCH category accent colors, container queries on card grid (one card layout works in 1/2/3-column), subgrid for card meta alignment, inline Lucide icons (external-link, book-open, building-2, hard-hat, scale).

**Implements (ARCHITECTURE):** Pattern 1 (data-driven content), Pattern 3 (event delegation), Pattern 5 (CSS custom properties).

**Avoids (PITFALLS):** #1 link rot (visible `lastChecked`, optional `archive_url`), #2 source-type mixing (provenance badges baked into schema), #4 PDF hosting (`git ls-files '*.pdf'` returns empty under `/qhse-cesi/`; `LEGAL.md` documents policy), #5 scope creep (`V2_BACKLOG.md` catches "while I'm at it" ideas).

---

### Phase Ordering Rationale

- **Skeleton before content** because layout bugs (sticky positioning, smooth scroll, burger menu, anchor offsets) are bug-prone and faster to diagnose on an empty page than under 25 cards and a 1500-word pitch.
- **Découverte before Biblio** because Découverte is hand-written prose (no render pipeline needed, validates typography on real long-form text); Biblio is a data + render system (different mental model, finishes faster once the prose section is locked in).
- **5×5 Biblio cards before any v1.1 enhancements** because PROJECT.md `Out of Scope` is explicit: "interactive study tools deferred to V2 once V1 reading hub is shipped and validated in real study sessions" — and FEATURES restates this: ship the table-stakes feature set, validate in 2–3 weeks of real use, *then* add scrollspy / filter chips / mark-as-read / search.
- **Visual identity is an owner gate at Phase 1, not a discovery in Phase 3** — STACK and FEATURES both flag a concrete recommendation (warm-dark editorial) but it's the one decision the research can't make alone.

### Research Flags

**Phases that should NOT need a `/gsd-research-phase` pass during planning** (well-documented patterns, this synthesis already covers them):
- **Phase 1 (skeleton)** — modern-CSS-only chassis is exhaustively documented in STACK.md; the only Phase 1 unknown is the owner's palette preference, which is a decision, not research.
- **Phase 3 (Biblio render + 5-category populate)** — data-driven render pattern is mechanical; the architecture file gives the exact code shape.

**Phases that MAY benefit from a lightweight research pass during planning:**
- **Phase 2 (Découverte content)** — most of the work is **content research**, not technical research: pulling RNCP fiche number + version date, CESI Bordeaux 2026-2027 module list, métiers salary ranges from Apec / France Travail. This is a content-acquisition phase, not a build phase. The planner should treat it as such and budget content-gathering time.
- **Future v1.1 (scrollspy, filter chips, mark-as-read)** — each is ~30–40 lines of vanilla JS; FEATURES + ARCHITECTURE describe the exact pattern (`IntersectionObserver`, `data-category` filter, localStorage `Storage` helper). One research pass before v1.1 is plenty.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies are Baseline / Widely Available in 2026; sources are canonical (MDN, web.dev, Comeau, Piccalilli, Evil Martians). No experimental features in the recommended set. |
| Features | MEDIUM-HIGH | Reference patterns (awesome-list, academicpages, MkDocs) are well-established; the V1/v1.1 boundary is opinionated but explicitly grounded in PROJECT.md `Out of Scope` and validated by solo-dev scope-creep research. Visual identity recommendation is a concrete proposal, not a validated decision — flagged as an owner gate. |
| Architecture | HIGH | Pattern is directly observed in the working sibling app (`index.html` Trainer), with anti-patterns documented from its actual pain points. No speculative components. |
| Pitfalls | HIGH | All 9 critical pitfalls are backed by published research (link-rot studies, WCAG, French pedagogical-exception law, FART pattern docs, solo-dev scope-creep case studies). Editorial pitfalls (#1–#3, #9) are domain-specific to French QHSE content and have explicit, actionable mitigations baked into the card schema. |

**Overall confidence:** HIGH

### Gaps to Address

- **Visual identity sign-off (warm-dark editorial palette + Fraunces/Inter/JetBrains Mono).** FEATURES proposes a concrete `#1a1814` / `#e8e2d4` / `#c9a96e` triple; STACK proposes the OKLCH equivalent. Owner has not yet picked between them or proposed a third direction. **Resolve at Phase 1 kickoff, not mid-build.**
- **Source list for Découverte content.** CESI Bordeaux Bachelor QHSE programme URL, RNCP fiche number, ECTS breakdown, alternance rhythm specifics, métiers/salary citations — the *technical* approach is settled, but the *content acquisition* is content-research work that belongs in Phase 2 planning (not in this technical synthesis). Treat Phase 2 as half content-gathering, half writing.
- **Initial Biblio seed list (≥5 per category × 5 categories = ≥25 links) with verified URLs + `lastChecked` dates.** Research mentions the sources (INRS, Légifrance, AIDA, France Compétences, Reddit r/cesi, LinkedIn témoignages, YouTube channels, Studocu) but does not enumerate specific permalinks. **Belongs in Phase 3 content-acquisition, owner-driven.**
- **Whether to ship a light-mode toggle in V1.** PITFALLS argues for it on accessibility grounds (library / outdoor study); FEATURES argues against it as YAGNI for a single-user dark-preferring owner. Defer the decision to v1.1 unless owner explicitly wants it — `prefers-color-scheme` respect via CSS is enough for V1.

## Sources

### Primary (HIGH confidence)

- **MDN Web Docs** — `light-dark()`, `prefers-color-scheme`, OKLCH, `IntersectionObserver`, `<section>` + `aria-labelledby`, `prefers-reduced-motion`, `localStorage`, anchor link patterns
- **web.dev** — color-scheme-dependent colors with `light-dark()`
- **Josh W. Comeau — A Modern CSS Reset** (canonical, updated March 2026)
- **Piccalilli (Andy Bell)** — fluid typography with `clamp`, modern reset patterns
- **Evil Martians — OKLCH in CSS** (in-production case study)
- **LogRocket — Container queries in 2026**, **modern-css.com — What's New in CSS 2026**, **nerdy.dev — CSS Features for 2026**
- **Lucide — vanilla JS usage guide** (icon sprite pattern)
- **Material for MkDocs — navigation setup** (gold standard for sticky nav + scrollspy)
- **Nielsen Norman Group — In-Page Links for Content Navigation**
- **GitHub — sindresorhus/awesome, awesome-selfhosted** (canonical curated-list patterns)
- **Académie de Normandie / ENSSIB / Ministère de l'Education nationale** — French pedagogical exception scope (annales PDF hosting policy)
- **France Compétences — RNCP vademecum** (citing fiches by number + version date)
- **CSS-Tricks — Flash of inAccurate coloR Theme (FART)** prevention pattern
- **BoIA — Offering a Dark Mode Doesn't Satisfy WCAG** (SC 1.4.3 applies to both themes)
- **Ahrefs link rot study** (~5%/year), **Pew Research on Link Rot**, **Wikipedia link rot baseline** (54% of curated lists have ≥1 dead link)
- Direct observation of the sibling `index.html` (QHSE Trainer) in the same repo — informs architecture anti-patterns from a real working file

### Secondary (MEDIUM confidence)

- **NN/G — Dark Mode: Issues to Avoid**, **Designer's Guide to Dark Mode Accessibility** — UX-side dark-mode pitfalls
- **academicpages.github.io** — single-page personal academic site pattern
- **bram.us — Smooth Scrolling Sticky ScrollSpy Navigation** (vanilla JS scrollspy reference)
- **Designli / Medium — Scope creep in solo dev projects** (V2-backlog discipline)
- **Tex Admissions / Scientific American / LinkedIn** — survivorship bias on student forums (Reddit r/cesi caveat policy)
- **MIT News — AI chatbots provide less-accurate information to vulnerable users** (rejecting AI chatbot anti-feature)

### Tertiary (validate during implementation)

- **Specific INRS ED / TJ document permalinks**, **CESI Bordeaux Bachelor QHSE 2026-2027 programme URL**, **RNCP fiche number for the current Bachelor QHSE** — owner-verified at Phase 2 / Phase 3 content acquisition; do not commit a card without `lastChecked` filled in from a real verification action

---

*Research completed: 2026-05-11*
*Ready for roadmap: yes*
*Detailed research: [STACK.md](./STACK.md) · [FEATURES.md](./FEATURES.md) · [ARCHITECTURE.md](./ARCHITECTURE.md) · [PITFALLS.md](./PITFALLS.md)*
