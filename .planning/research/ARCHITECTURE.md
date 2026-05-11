# Architecture Research

**Domain:** Single-file vanilla web page (HTML + CSS + JS in one `index.html`), personal study hub
**Researched:** 2026-05-11
**Confidence:** HIGH

## Standard Architecture

### System Overview

A single `index.html` file containing four ordered concerns. Reading from top to bottom:

```
┌─────────────────────────────────────────────────────────────┐
│                    <head> — META + TYPOGRAPHY               │
│  charset · viewport · title · Google Fonts <link>           │
├─────────────────────────────────────────────────────────────┤
│              <style> — CSS (layered cascade)                │
│  @layer tokens · base · layout · components · utilities     │
├─────────────────────────────────────────────────────────────┤
│           <body> — HTML (semantic landmarks)                │
│  <header> nav  →  <main>                                    │
│     ├── <section #accueil>      (Landing / hero)            │
│     ├── <section #decouverte>   (Programme · RNCP · etc.)   │
│     ├── <section #biblio>       (Link cards, 5 categories)  │
│     └── <section #outils>       (RESERVED for V2, empty)    │
│  <footer> credits + last updated                            │
├─────────────────────────────────────────────────────────────┤
│              <script> — JS (IIFE namespace)                 │
│  DATA (inline JSON arrays) → RENDER → BIND (delegation)     │
└─────────────────────────────────────────────────────────────┘
```

The QHSE Trainer sister app (`index.html` at repo root, 1000 lines) validates this pattern: tokens at the top of `<style>`, components below, single `<script>` at the bottom with one `state` object and named functions. What scales poorly there is hand-written nested HTML for views and `onclick="..."` attributes everywhere — both are fixed in the recommendations below.

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Design tokens | Single source for colors, spacing, type | `:root { --bg, --fg, --accent, --space-* }` |
| Base layer | Reset + typography defaults | `* { box-sizing }`, `html { scroll-behavior: smooth }` |
| Layout primitives | Page-level grid/flow | `.container`, `.stack`, `.grid-cards` |
| Components | Self-contained UI blocks | `.nav`, `.hero`, `.card`, `.tag`, `.toc` |
| Utilities | Single-purpose escape hatches | `.sr-only`, `.no-wrap`, `.muted` |
| Data modules | Content as JSON arrays | `const BIBLIO = [...]`, `const DECOUVERTE = {...}` |
| Renderers | Pure functions: data → DOM string | `renderBiblio()`, `renderCard()` |
| Controllers | Event delegation + nav state | `App.init()`, single `click` listener on `<main>` |

## Recommended In-File Structure

```
index.html
├── <head>
│   ├── meta charset/viewport
│   ├── <title>QHSE CESI Hub</title>
│   ├── Google Fonts preconnect + link (pick fonts distinct from Trainer)
│   └── <style> ──────────────────────────────────────────────
│       │ /* ============ 1. TOKENS ============ */
│       │ :root { --color-*, --space-*, --radius-*, --font-* }
│       │
│       │ /* ============ 2. RESET / BASE ============ */
│       │ *, *::before, *::after { box-sizing }
│       │ body { font, bg, color }
│       │ a, h1..h6, p defaults
│       │
│       │ /* ============ 3. LAYOUT ============ */
│       │ .container, .stack, .grid
│       │
│       │ /* ============ 4. COMPONENTS ============ */
│       │ /* -- Nav -- */
│       │ /* -- Hero -- */
│       │ /* -- Section heading -- */
│       │ /* -- Card (biblio) -- */
│       │ /* -- Tag / Category pill -- */
│       │ /* -- TOC -- */
│       │
│       │ /* ============ 5. UTILITIES ============ */
│       │ .sr-only, .muted, .mono
│       │
│       │ /* ============ 6. RESPONSIVE ============ */
│       │ @media (max-width: 720px) { ... }
│       └──────────────────────────────────────────────
├── <body>
│   ├── <a class="skip-link" href="#main">Skip to content</a>
│   ├── <header role="banner">  ← sticky nav with anchor links + burger
│   ├── <main id="main">
│   │   ├── <section id="accueil"    aria-labelledby="h-accueil">
│   │   ├── <section id="decouverte" aria-labelledby="h-decouverte">
│   │   ├── <section id="biblio"     aria-labelledby="h-biblio">
│   │   └── <section id="outils"     aria-labelledby="h-outils" hidden>
│   │        ← RESERVED for V2, kept hidden in V1
│   └── <footer>last updated · github link</footer>
└── <script> ──────────────────────────────────────────────
    │ (() => {
    │   'use strict';
    │
    │   /* ============ 1. DATA ============ */
    │   const DECOUVERTE = { ... };
    │   const BIBLIO     = [ ... ];
    │
    │   /* ============ 2. RENDERERS (pure: data → string) ============ */
    │   const renderCard       = (item) => `<article class="card">...</article>`;
    │   const renderCategory   = (cat, items) => `...`;
    │   const renderBiblio     = () => BIBLIO_CATEGORIES.map(...).join('');
    │   const renderDecouverte = () => `...`;
    │
    │   /* ============ 3. CONTROLLERS ============ */
    │   const Nav   = { init() {...}, setActive(id) {...} };
    │   const Hub   = { init() {...}, mount() {...} };
    │
    │   /* ============ 4. V2 NAMESPACE (placeholder) ============ */
    │   const Outils = { init() { /* TODO V2 */ } };
    │
    │   /* ============ 5. BOOT ============ */
    │   document.addEventListener('DOMContentLoaded', () => {
    │     Hub.mount();
    │     Nav.init();
    │   });
    │ })();
    └──────────────────────────────────────────────
```

### Structure Rationale

- **Commented banner sections (`/* ===== N. NAME ===== */`):** lets you `Ctrl+F` to any layer in seconds. The Trainer uses `/* ── HEADER ── */` headers and it works well at 650 lines of CSS; the numbered scheme scales further.
- **CSS layered cascade (tokens → base → layout → components → utilities → responsive):** prevents specificity wars without needing `@layer` (which works in evergreen browsers but is unnecessary at this size). Order of appearance = priority for ties.
- **HTML uses real landmarks (`<header>`, `<main>`, `<section>`, `<footer>`) with `aria-labelledby`:** screen readers + browser reader mode work for free; helps anchor-link UX and SEO even on a personal hub.
- **Reserved `#outils` section, `hidden` attribute:** V2 has a stable URL (`/qhse-cesi/#outils`) the moment V1 ships. Anchor exists; visibility flips later.
- **IIFE around the script (`(() => { ... })()`):** keeps every name out of `window`. Trainer leaks ~15 globals (`renderHome`, `modules`, `state`...) and uses `onclick="goHome()"` — that's the constraint that fails when V2 adds a second feature module. Avoid it from day one.
- **Data at the top, renderers in the middle, controllers at the bottom:** matches reading order — data first answers "what" before "how".

## Architectural Patterns

### Pattern 1: Data-Driven Content (JSON arrays → rendered HTML)

**What:** Biblio cards and Découverte blocks live as JS data structures; renderer functions produce HTML strings; a single `innerHTML =` assignment mounts each section.

**When to use:** Any repeating element (5+ link cards per category × 5 categories = 25+ cards). Editing a link should be one line in the data array, not hunting through HTML.

**Trade-offs:**
- Pros: one source of truth, easy to add fields (e.g. `lastChecked`) globally, content review = scanning a data array
- Cons: no HTML on page load until JS runs (mitigated by inline script — runs in <50ms), search engines index slightly later (not relevant for a personal hub)

**Example:**
```js
const renderCard = (item) => `
  <article class="card" data-tags="${item.tags.join(' ')}">
    <a href="${item.url}" target="_blank" rel="noopener" class="card__link">
      <h3 class="card__title">${item.title}</h3>
      <p class="card__desc">${item.description}</p>
      <div class="card__meta">
        ${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        <time class="card__date" datetime="${item.lastChecked}">
          vérifié ${item.lastChecked}
        </time>
      </a>
    </article>
`;

document.getElementById('biblio-grid').innerHTML =
  BIBLIO_CATEGORIES.map(renderCategory).join('');
```

### Pattern 2: Hand-written HTML for Singletons

**What:** The hero, intro paragraphs, and section headings stay as plain HTML in `<body>`. Only repeating content goes through renderers.

**When to use:** One-off blocks. The 1-minute pitch isn't a list — make it readable HTML so the content is greppable and editable without running JS.

**Trade-offs:**
- Pros: zero indirection for prose, copy-paste friendly, works without JS
- Cons: tempting to grow these blocks until they should have been data — set a rule: 3+ similar elements = move to data

### Pattern 3: Event Delegation (one listener per concern)

**What:** Instead of `onclick="goSection('biblio')"` on every nav link, attach one listener to the nav `<ul>` and read `data-target` from the clicked element.

**When to use:** Always for nav + cards. The Trainer's inline `onclick` handlers are why its functions must be global — fixing this fixes the namespace problem in one move.

**Trade-offs:**
- Pros: handlers work for nodes added later, no global function requirement, IIFE-safe
- Cons: slightly more setup code (15 lines vs 0), needs `data-*` attributes on triggers

**Example:**
```js
document.querySelector('.nav__list').addEventListener('click', (e) => {
  const link = e.target.closest('[data-target]');
  if (!link) return;
  e.preventDefault();
  const id = link.dataset.target;
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  Nav.setActive(id);
});
```

### Pattern 4: BEM-ish Naming (no preprocessor needed)

**What:** `.block__element--modifier`. Use it consistently, but don't enforce strictly — `.muted`, `.container` stay simple.

**When to use:** Components with multiple parts (`.card`, `.card__title`, `.card__meta`, `.card--featured`). Trainer uses `.module-card`, `.module-num`, `.module-title` — same idea, slightly inconsistent. Pick `__` and `--` and stick to it.

**Trade-offs:**
- Pros: zero name collisions, grep-able, no `@layer` complexity
- Cons: longer class names — fine here, file is one file

### Pattern 5: CSS Custom Properties for Theming

**What:** All design decisions (color, spacing, type, radius) live as `--*` variables on `:root`. Components reference variables, never raw values.

**When to use:** Always. Lets you redesign visual identity without touching components — critical given the constraint "must be visually distinct from QHSE Trainer".

**Example:**
```css
:root {
  /* Color — pick something contrastive to Trainer's lime/black */
  --color-bg:        #0E1525;   /* deep navy, not black */
  --color-surface:   #182238;
  --color-border:    #2A3654;
  --color-fg:        #E8EDF7;
  --color-muted:     #8896B2;
  --color-accent:    #FF9F4A;   /* warm amber, not cold lime */
  --color-accent-soft: rgba(255,159,74,0.12);

  /* Spacing scale (4px base, T-shirt sizes) */
  --space-1: 0.25rem;  --space-2: 0.5rem;  --space-3: 0.75rem;
  --space-4: 1rem;     --space-5: 1.5rem;  --space-6: 2rem;
  --space-7: 3rem;     --space-8: 4rem;

  /* Type — different family from Trainer */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace;

  /* Radius — soft, not sharp like Trainer */
  --radius-sm: 6px;  --radius-md: 10px;  --radius-lg: 18px;
}
```

## Data Flow

### Page Load Flow

```
HTML parsed
    ↓
<style> applied (FOUC-free since CSS is inline)
    ↓
DOMContentLoaded fires
    ↓
Hub.mount() runs:
    ├── renderDecouverte()   →  #decouverte .innerHTML = ...
    └── renderBiblio()       →  #biblio     .innerHTML = ...
    ↓
Nav.init() attaches one delegated listener + IntersectionObserver for scrollspy
    ↓
Page interactive (target: <100ms on mid-range mobile)
```

### Biblio Data Schema

This is the schema. Concrete example, not "TBD":

```js
/**
 * BIBLIO_CATEGORIES — ordered list of the 5 category buckets.
 * Order here = display order on the page.
 */
const BIBLIO_CATEGORIES = [
  { id: 'officiel',   label: 'Sources officielles',           icon: '🏛️' },
  { id: 'communaute', label: 'Communauté & retours d\'XP',    icon: '💬' },
  { id: 'pedago',     label: 'Contenu pédagogique',           icon: '📚' },
  { id: 'annales',    label: 'Anciens sujets & annales',      icon: '📝' },
  { id: 'pro',        label: 'Outils pros & veille',          icon: '🔧' },
];

/**
 * BIBLIO — flat array of link items. Each item declares its category
 * via `category` (must match a BIBLIO_CATEGORIES.id).
 */
const BIBLIO = [
  {
    id: 'cesi-bachelor-qhse',
    title: 'Bachelor QHSE — CESI Bordeaux',
    url: 'https://www.cesi.fr/formation/bachelor-qhse/',
    description: 'Page officielle de la formation : programme, RNCP, modalités d\'alternance, frais.',
    category: 'officiel',
    tags: ['CESI', 'programme', 'RNCP'],
    priority: 1,                      // 1 = pinned at top of category, 5 = lowest
    lastChecked: '2026-05-11',        // ISO date, manual update via git commit
    note: null,                       // optional: caveat, "lien parfois lent", etc.
  },
  {
    id: 'rncp-fiche',
    title: 'Fiche RNCP — Bachelor QHSE',
    url: 'https://www.francecompetences.fr/recherche/rncp/...',
    description: 'Blocs de compétences officiels, modalités d\'évaluation, équivalences.',
    category: 'officiel',
    tags: ['RNCP', 'blocs', 'France Compétences'],
    priority: 1,
    lastChecked: '2026-05-11',
    note: null,
  },
  {
    id: 'reddit-cesi',
    title: 'r/cesi — discussions Bachelor QHSE',
    url: 'https://www.reddit.com/r/cesi/search/?q=qhse',
    description: 'Témoignages d\'alternants, alertes sur la charge, conseils rentrée.',
    category: 'communaute',
    tags: ['Reddit', 'témoignages', 'alternance'],
    priority: 2,
    lastChecked: '2026-05-11',
    note: 'Volume modéré — filtrer par "QHSE" ou "Bachelor".',
  },
  // ... 20-30 more entries across all 5 categories
];
```

**Schema rules:**
- `id`: kebab-case, unique, used for `data-id` on the rendered card and for any future "favorite" feature.
- `category`: one of `BIBLIO_CATEGORIES.id`. A runtime assert (`console.warn` if not found) catches typos.
- `tags`: 1–4 short labels. Drives optional client-side filter in V2.
- `priority`: integer 1–5. `BIBLIO.filter(...).sort((a,b) => a.priority - b.priority)` before render gives stable ordering.
- `lastChecked`: ISO `YYYY-MM-DD`. Renders as `<time datetime="...">`. Manual — bumped when you re-verify the link.
- `note`: nullable string, rendered as a small caveat under the description.

### Découverte Data Shape

Less repetitive than Biblio; one structured object is enough:

```js
const DECOUVERTE = {
  pitch: 'Le Bachelor QHSE forme en 1 an...',  // 60-second intro, ~150 words
  programmeParAnnee: [
    { annee: 'Année 1', modules: ['Module 1', 'Module 2', ...] },
    // Bachelor is 1-year post-BTS/BUT — one entry suffices, kept as array
    // for forward-compat with multi-year programs
  ],
  blocsRncp: [
    { code: 'RNCP38XXX-BC01', titre: 'Bloc 1 — ...', competences: ['...'] },
    // 4–5 blocs
  ],
  calendrierAlternance: {
    rythme: '1 semaine école / 3 semaines entreprise',
    rentree: '2026-09-15',
    fin: '2027-09-XX',
  },
  metiers: [
    { titre: 'Animateur QHSE', salaireMin: 28000, salaireMax: 35000, note: 'Junior' },
    // 4–6 entries
  ],
};
```

## Suggested Build Order (V1)

Each step ends in a state you can deploy and visually verify. The pipeline is ~60s to live, so use it.

| # | Step | What you build | How you verify | Why this order |
|---|------|----------------|----------------|----------------|
| 1 | **Skeleton + nav** | `<head>` with fonts, `<header>` with anchor links to 4 sections, 4 empty `<section>` shells with IDs and headings, `:root` tokens, `.container`, base typography. Burger menu CSS-only via checkbox hack or simple JS toggle. | Open in browser: header sticks, clicking nav scrolls smoothly to the right section. Resize to 360px — burger menu works. Dark theme readable. | Establishes the layout chassis. Nothing later works without smooth-scroll anchors and a responsive shell. Bug-prone things (sticky positioning, smooth scroll, burger menu) get sorted before content noise. |
| 2 | **Découverte content** | Write the 1-minute pitch, programme, RNCP blocs, alternance rhythm, métiers tables as **plain HTML** inside `#decouverte`. Style headings, lists, definition pairs. | Read it on phone + desktop. Long-form is comfortable, no horizontal scroll, line length feels right (60–80ch). | Content is the heaviest cognitive lift — do it while CSS is uncluttered. Plain HTML keeps it greppable. You'll be tempted to over-engineer — resist; it's text. |
| 3 | **Biblio data + render** | Declare `BIBLIO_CATEGORIES` and `BIBLIO` arrays with at least 3 entries per category (15 total). Write `renderCard`, `renderCategory`, mount via `innerHTML`. Style `.card`, `.tag`, `.card__meta`. | Cards appear under correct category headings. Tags render. `lastChecked` shows as a relative-ish date. Empty category renders gracefully (or is hidden). | The pattern matters more than the content here — once `renderCard` is good, adding 30 more links is just data entry. Start with 3 per category to find rendering bugs cheaply. |
| 4 | **Polish — scrollspy + active nav + footer** | IntersectionObserver flags the visible section; nav highlights the matching link. Footer shows last commit / "last updated YYYY-MM-DD". `prefers-reduced-motion` disables smooth scroll. | Scroll through the page — nav active state tracks correctly. Reduced-motion OS setting kills smooth scroll. Lighthouse ≥ 95 in all 4 categories. | Polish before responsive QA — fixing layout bugs that scrollspy reveals is easier in desktop view first. |
| 5 | **Responsive + dark-mode QA + accessibility pass** | Test 360px / 768px / 1280px / 1920px. Check focus rings on every interactive element. Run axe DevTools. Add `skip-link`. Verify all `<a>` to external sites have `target="_blank" rel="noopener"`. | axe: 0 violations. Tab through the page — focus is always visible, order is logical. iOS Safari + Chrome Android tested. Contrast ratios ≥ 4.5 for body, ≥ 3 for large text. | This is the only step where you can't "see" success without intentional checks. Doing it last means fixing one set of issues, not five rounds. |

**Stop conditions between steps:** if step N fails verification, do not start step N+1. The Trainer was shipped clean because each phase (home → module → flashcard → quiz) was verifiable in isolation; reproduce that discipline.

## V2 Extensibility — How to Keep It Cleanly Addable

1. **Reserve `<section id="outils" hidden aria-labelledby="h-outils">` from day one.** Add the nav link with `hidden` too. When V2 starts, you remove two `hidden` attributes and the URL `/qhse-cesi/#outils` becomes live. No layout shift, no nav restructure.

2. **Use a `Outils` JS namespace stub.** Even an empty `const Outils = { init() {} };` block reserves the mental space. V2 adds methods to that object — no risk of name collisions with V1 internals (`Hub`, `Nav`).

3. **Keep V1 data structures opaque from V2's perspective.** Don't import `BIBLIO` into V2 logic directly — if V2 needs to reuse a link, copy the reference into its own data structure. Loose coupling = V2 can be refactored without touching V1.

4. **Single shared persistence helper.** Wrap `localStorage` once: `const Storage = { get(key, fallback), set(key, value) }`. V1 may not need it; V2 study tools certainly will (flashcard progress, last-visited resource). Adding this in V1 polish is cheap insurance.

5. **CSS layer for V2 components, defined empty.** Add `/* ============ 4b. V2 COMPONENTS (outils) ============ */` as an empty section right after components. V2 styles land there — they slot into the cascade at the right specificity automatically.

6. **Document the contract at the top of `<script>`.** A 5-line comment block: "V1 namespaces: Hub, Nav. V2 reserved: Outils. Data: DECOUVERTE, BIBLIO. Mount point: #outils." Future-you (or future-Claude reading this file) finds the seams in seconds.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0–1,500 lines total | Current single-file architecture is ideal. No changes needed. |
| 1,500–3,000 lines (post-V2) | Still single file. Tighten naming, move long prose blocks to data arrays if they become repetitive. Consider extracting a `data.js` only if reload-during-edit becomes annoying — but that breaks the no-build rule. |
| 3,000–5,000 lines | Time to split: `index.html` for shell, separate `<script src="hub.js" defer>` and `<link rel="stylesheet" href="hub.css">`. Still no build step. Vercel serves them statically. |
| 5,000+ lines | Reconsider — if you need a SPA router, you've outgrown anchored sections. Migrate to a multi-page setup (`/qhse-cesi/decouverte.html`, `/qhse-cesi/biblio.html`, etc.) or introduce a small framework (Astro = closest match to current philosophy). |

### Scaling Priorities

1. **First bottleneck — file readability, not performance.** A single 1500-line file is fine for the browser; it gets uncomfortable for a human editor when the script section passes ~600 lines. The fix is mechanical (split into 3 files), not architectural.
2. **Second bottleneck — content review burden.** When the Biblio crosses ~60 cards, a search/filter UI becomes valuable. That's a V2+ feature, addable via the reserved namespace pattern above.
3. **Non-bottleneck — render performance.** Even 200 cards rendered via `innerHTML` once at load is sub-frame on any mobile device. Don't pre-optimize.

## Anti-Patterns

### Anti-Pattern 1: `onclick="..."` Inline Handlers Everywhere

**What people do:** `<button onclick="goHome()">` × 20 in the HTML. Forces every handler to be a global function. (See Trainer's `goHome`, `goModule`, `startMode`, `flipCard`, etc. — 12+ globals.)

**Why it's wrong:** Breaks IIFE encapsulation, name collisions with V2 are guaranteed, content security policies forbid it, and grepping for "where is this called from" requires hunting strings.

**Do this instead:** One delegated listener per top-level container, dispatching on `data-action`:
```html
<button data-action="goto" data-target="biblio">Bibliothèque</button>
```
```js
main.addEventListener('click', (e) => {
  const t = e.target.closest('[data-action]');
  if (!t) return;
  const action = actions[t.dataset.action];
  action && action(t.dataset);
});
```

### Anti-Pattern 2: Hand-written HTML for Repeating Cards

**What people do:** Copy-paste `<div class="card">...</div>` 25 times in the source, edit each one by hand.

**Why it's wrong:** Adding a field (e.g. `lastChecked`) is 25 edits. Re-ordering categories is a refactor. Reviewing the link list requires reading HTML. A typo in one card's class name renders silently broken.

**Do this instead:** Data array + render function. One edit to `renderCard` updates every card.

### Anti-Pattern 3: One Mega-`state` Object Mutated From Everywhere

**What people do:** `let state = { everything }` and every function reads/writes properties directly (Trainer pattern).

**Why it's wrong:** V1 → V2 is the moment this hurts. V2 study tools want their own state shape; if they mutate the same global, debugging "who set `cardIndex` to NaN" becomes archaeology.

**Do this instead:** Namespace state inside each controller. `const Nav = { state: { activeId: null }, ... }`. `const Outils = { state: { ... } }`. Cross-namespace communication via explicit method calls only.

### Anti-Pattern 4: Non-Semantic `<div>` Soup

**What people do:** `<div class="nav">`, `<div class="section">`, `<div class="footer">`.

**Why it's wrong:** Reader mode breaks. Screen readers can't navigate by landmarks. SEO loses structural signals. `:focus-visible` on skip links can't find the right target.

**Do this instead:** `<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<article>` for cards, `<footer>`. Cost: zero. Benefit: free a11y wins, free SEO, future-you doesn't have to refactor.

### Anti-Pattern 5: CSS Specificity by ID

**What people do:** `#biblio .card { ... }` to "make sure it applies".

**Why it's wrong:** Specificity 0,1,1,0 vs 0,0,1,0 — you've now locked yourself out of overriding with utility classes. Compounds across the file.

**Do this instead:** Class-only selectors. Single layer, ordered top-to-bottom. If you need to scope, use a parent class: `.biblio .card`. Reserve IDs for anchors and JS hooks (`getElementById`).

### Anti-Pattern 6: Reading From `localStorage` Before DOM Ready

**What people do:** Top-level `const progress = JSON.parse(localStorage.getItem(...) || '{}')`. Crashes if JSON is corrupt; runs before error handling exists.

**Why it's wrong:** First-load corruption (or quota-exceeded in private browsing) takes down the whole script.

**Do this instead:** Wrap in a `Storage` helper with try/catch and a `fallback` default. Read inside `init()`, not at parse time.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Google Fonts | `<link rel="preconnect">` + `<link rel="stylesheet">` in `<head>` | Pick **different families** than the Trainer (Bebas Neue + Space Mono + DM Sans) to enforce distinct identity. Suggest: `Fraunces` (display) + `Inter` (body) + `JetBrains Mono` (code/meta). |
| Vercel | Push to `main` → auto-deploy via existing GitHub Action | Hub lives at `/qhse-cesi/index.html`. Do not modify `.github/workflows/deploy.yml`. |
| External links (INRS, Reddit, France Compétences...) | `<a href="..." target="_blank" rel="noopener noreferrer">` | `noopener` prevents tab-napping. `noreferrer` is optional but tidier. Renderer enforces it — never write `<a>` by hand for biblio. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Data ↔ Renderers | Pure: data in, string out | Renderers never mutate data, never read DOM. Easy to test mentally. |
| Renderers ↔ DOM | One-shot `innerHTML =` at mount | Re-renders are rare in V1 (no interactivity changes layout). V2 may need finer-grained updates. |
| V1 (Hub) ↔ V2 (Outils) | Explicit method calls only | No shared mutable state. If V2 needs V1 data, it gets a deep copy. |
| Page ↔ Storage | Through `Storage` helper only | Single try/catch surface. Easy to add migration logic for V2 schemas. |

## Sources

- Existing `index.html` at repo root (QHSE Trainer) — direct observation, structural review (HIGH confidence: source code)
- MDN — `<section>`, `aria-labelledby`, `IntersectionObserver`, `prefers-reduced-motion` (HIGH confidence: official spec)
- WAI-ARIA Authoring Practices — landmark roles and skip links (HIGH confidence: official)
- BEM methodology (bem.info) — naming convention (HIGH confidence: well-established)
- Personal observation of the Trainer's pain points (global `onclick`, hand-written view HTML, single mega-state) — applied as anti-patterns above (HIGH confidence: read in source)

---
*Architecture research for: single-file vanilla web page, personal study hub*
*Researched: 2026-05-11*
