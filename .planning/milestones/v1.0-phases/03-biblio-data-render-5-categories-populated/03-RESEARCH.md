# Phase 3: Biblio data + render + 5 categories populated — Research

**Researched:** 2026-05-15
**Domain:** Single-file static HTML + inline JS data-driven render of a curated bibliographic library (5 categories × 7 cards = 35 cards) + governance scaffolding (`LEGAL.md`, `V2_BACKLOG.md`, `derniere_maj` footer refresh).
**Confidence:** HIGH (chassis frozen Phase 1, citation/outbound pattern established Phase 2, schema + sort + layout already locked in CONTEXT.md D-01..D-05, ~50 candidate URLs probed live + Wayback API queried).

---

## Summary

Phase 3 closes V1. It fills the `<div id="biblio-grid">` mount point at `qhse-cesi/index.html:659` with a data-driven render of 35 link cards across 5 locked categories (`officiel`, `communaute`, `pedago`, `annales`, `pro`), and ships the policy scaffolding that POLICY-01..04 require: `qhse-cesi/LEGAL.md` (link-curation framing + French pedagogical-exception acknowledgement), `.planning/V2_BACKLOG.md` (every deferred V1 idea pre-seeded), and a `derniere_maj` footer date that refreshes on every commit changing rendered HTML.

The chassis is locked. Phase 3 introduces **exactly one new component slot** reserved during Phase 1 UI-SPEC — the Biblio card — and uses the already-declared `--accent` token (brass, OKLCH) for badge surfaces. No new tokens, no new fonts, no new CSS layers, no new JS dependencies. The render path is one `innerHTML` mount on `DOMContentLoaded`, no per-card DOM mutation. Sort is one line of `Array.prototype.sort` on ISO `lastChecked` strings.

The hard gate before `/gsd-execute-phase 3` runs is the **owner-approve seed list**: this RESEARCH.md is paired with `03-SEED-CANDIDATES.md` (~50 candidates), and the owner edits that file in place to lock the final 35 before any card-render task starts.

**Primary recommendation:** Implement as 3 distinct sub-deliverables in this order — (1) governance files (LEGAL.md + V2_BACKLOG.md) ship first because they have zero scope risk; (2) inline data arrays + `renderCards()` function + CSS for the editorial list layout; (3) footer date refresh + commit. The seed-approve gate sits between research and execution, not inside it.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01 — Card distribution: 7 cards × 5 categories = 35 total.** Owner explicitly chose symmetric over reference-weighted. If a category genuinely cannot produce 7 vetted cards, researcher flags shortfall during plan-phase rather than padding.
- **D-02 — Seed-list strategy: researcher proposes ~50 candidates in `03-SEED-CANDIDATES.md`; owner picks/cuts to 35 BEFORE `/gsd-execute-phase 3` runs.** Hard gate. No card-render task starts until owner replies "seed approuvé". Reject criteria honoured: no `.pdf` URLs (POLICY-03), no aggregators (Glassdoor, Indeed, HelloWork, Talent.com, JobiJoba), no paywalled-without-alternative, no URLs that 404 at research time.
- **D-03 — Card layout: full-width editorial list, 1-column at every breakpoint (mobile + desktop).** Each row: `[provenance badge] Titre (h3 Fraunces 600 step-2) + description (2-3 lignes, body Inter, --measure: 68ch) + footer (domain in --ink-2 + lastChecked in JetBrains Mono age-coloured)`. No 2-col or 3-col grid.
- **D-03b — Sticky card semantics:** whole card is clickable `<a>` wrapping `<article>` (or equivalent), `target="_blank" rel="noopener noreferrer"` on every card.
- **D-03c — Cards inside a category render inside `<ul role="list">` with `list-style: none`** to preserve screen-reader semantics.
- **D-04 — Intra-category sort: `lastChecked` descending** via `Array.prototype.sort((a,b) => b.lastChecked.localeCompare(a.lastChecked))` over ISO `YYYY-MM-DD` strings (lexicographic = chronological).
- **D-04b — `priority` field stays in schema but is NOT used for V1 sort.** V1 role: metadata only, hint for the seed-list curator, future V2 enablement.
- **D-05 — Black-floor invariant relaxed to SURFACE colors only.** `oklch(0%` / `#000` forbidden as `background`, `background-color`, `color`, `border-color`, or any non-shadow property. Inside `box-shadow`, `filter: drop-shadow`, `outline-color` with alpha < 1 — allowed. The existing line 230 shadow stays.

### Claude's Discretion

- **Category accent colors (BIBLIO-08):** single shared `--accent` for every badge surface; the badge LABEL is the visual differentiator (`OFFICIEL`, `PÉDAGOGIQUE`, `COMMUNAUTÉ`, `OUTIL-PRO`, `ANNALES`).
- **`archive_url` policy (BIBLIO-09):** mandatory when `source_type: officiel` AND URL is a versioned reference (RNCP fiche, France Compétences fiche, CESI Bordeaux formation page, INRS dossier, Légifrance article). Optional elsewhere.
- **`note` field usage:** mandatory when `source_type: communauté` (renders the "lire avec recul" caveat from BIBLIO-05). Default text: `Lire avec recul — témoignage individuel, non vérifié.` Optional for all other source types.
- **Card mount strategy:** single inline `<script>` at end of `<body>`, listener on `DOMContentLoaded` calls `renderCards()` once, builds one `innerHTML` string, assigns to `#biblio-grid`. No per-card DOM mutation. No inline `onclick=""`.
- **`renderCard()` and data location:** `BIBLIO_CATEGORIES[]`, `BIBLIO[]`, and `renderCard(item)` live INLINE in `qhse-cesi/index.html`. NOT separate `.js` files.
- **`tags[]` V1 usage:** populated by researcher, NOT visually rendered in V1. Reserved for V2 filter chips (UX-02).
- **`LEGAL.md` location/content (POLICY-01):** path `qhse-cesi/LEGAL.md`, ≤ 80 lines French markdown.
- **`V2_BACKLOG.md` location/content (POLICY-02):** path `.planning/V2_BACKLOG.md`, pre-seeded with UX-01..08 + TOOL-01..03 + Phase 2 v1.1 deferrals (sticky mini-TOC, visual salary bars, reverse RNCP mapping).
- **`derniere_maj` footer:** replaces current `<time datetime="2026-05-14">14 mai 2026</time>` with Phase 3 ship date. Refresh on every Phase 3 commit that changes rendered HTML.
- **Category visual order (top → bottom):** `officiel` → `communaute` → `pedago` → `annales` → `pro`.
- **Category `<section>` IDs:** `<section id="biblio-<slug>" aria-labelledby="h-biblio-<slug>">` with `<h2 id="h-biblio-<slug>">`. Slugs locked: `officiel`, `communaute`, `pedago`, `annales`, `pro`.

### Deferred Ideas (OUT OF SCOPE for Phase 3)

- **UX-01** Scrollspy / active-section highlight → V2
- **UX-02** Filter chips per category → V2 (V1 ships `tags[]` populated; chips are V2 add)
- **UX-03** Mark-as-read toggle → V2 (uses localStorage)
- **UX-04** In-page Ctrl+K search → V2
- **UX-05** Copy-link button per card → V2
- **UX-06** Reading-progress bar on Découverte → V2
- **UX-07** Light-mode toggle → V2
- **UX-08** Automated link-checker GitHub Action → V2
- **TOOL-01..03** Flashcards / QCM / spaced-repetition → V2 (PROJECT.md hard constraint)
- **Sticky mini-TOC** → v1.1
- **Visual salary bars** → v1.1
- **Reverse RNCP-bloc → modules mapping** → deferred (not adopted)

All of the above land in `.planning/V2_BACKLOG.md` as part of POLICY-02 deliverable.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| **BIBLIO-01** | 5 link categories rendered with semantic `<section>` + `<h2>` headings and stable `id` anchors: `officiel`, `communaute`, `pedago`, `annales`, `pro` | Locked slugs per D-01. Render uses `<section id="biblio-<slug>" aria-labelledby="h-biblio-<slug>">` per Claude's Discretion in CONTEXT.md. Category visual order locked: `officiel` → `communaute` → `pedago` → `annales` → `pro`. |
| **BIBLIO-02** | Content data-driven — `BIBLIO_CATEGORIES[]` + `BIBLIO[]` arrays + pure `renderCard(item)` function, single `innerHTML` mount; no inline `onclick=""`, no hand-duplicated card HTML | Architecture pattern from `.planning/research/ARCHITECTURE.md` Pattern 1 + 2 + 3. Mount strategy explicit in CONTEXT.md Claude's Discretion. |
| **BIBLIO-03** | ≥ 5 cards per category, ≥ 35 cards total (owner-bumped from 25 → 35) | D-01: 7 × 5 = 35. Seed list proposes ~50 candidates so owner has slack to drop. |
| **BIBLIO-04** | Canonical schema per card: `id`, `title`, `url`, `description`, `category`, `source_type`, `tags`, `priority`, `lastChecked`, optional `archive_url`, optional `note` | Schema example in CONTEXT.md §Specific Ideas. `archive_url` mandatory on officiel high-value (per Claude's Discretion); `note` mandatory on communauté. |
| **BIBLIO-05** | Each card visibly shows `source_type` as provenance badge: `officiel`, `pédagogique`, `communauté` (with "lire avec recul" caveat), `outil-pro`, `annales` | Badge wording locked in CONTEXT.md §Specific Ideas: `OFFICIEL`, `PÉDAGOGIQUE`, `COMMUNAUTÉ`, `OUTIL-PRO`, `ANNALES`. Communauté caveat rendered via `note` field. |
| **BIBLIO-06** | Each card visibly shows `lastChecked` date with age-based color: neutral ≤ 90 d, warning 90-180 d, alert > 180 d | Tokens `--success` (neutral fresh), `--warning`, `--alert` already declared in Phase 1 UI-SPEC token table (lines 140-142). JetBrains Mono for date rendering. |
| **BIBLIO-07** | Every outbound `<a>` opens in new tab with `target="_blank" rel="noopener noreferrer"` | Pattern established Phase 2 (8 outbound URLs). `renderCard()` hard-codes both attributes — never write `<a>` by hand for cards. |
| **BIBLIO-08** | A category badge + category accent visually groups cards inside each section | Per Claude's Discretion: single shared `--accent`; the badge LABEL is the differentiator. NOT five accent variants. |
| **BIBLIO-09** | High-value cards (RNCP fiche, official CESI page, INRS dossiers) include `archive_url` (Wayback) as rot-resistance backup | Researcher fetched Wayback snapshots via API (see §Code Examples below). Mandatory on officiel high-value per D-02 reject criteria + Claude's Discretion. |
| **POLICY-01** | `LEGAL.md` inside `/qhse-cesi/` documents link-curation tool status, no third-party PDF hosting, pedagogical exception scope | Path `qhse-cesi/LEGAL.md`. Content drafted in §Code Examples below; executor writes. |
| **POLICY-02** | `V2_BACKLOG.md` in `.planning/` pre-seeded with all deferred features | Path `.planning/V2_BACKLOG.md`. Content drafted in §Code Examples below. Source: UX-01..08 + TOOL-01..03 + Phase 2 v1.1 deferrals. |
| **POLICY-03** | No `.pdf` files committed under `/qhse-cesi/` — verified by `git ls-files '*.pdf'` returning empty | Reject criterion baked into seed-list rules (no `.pdf` URLs allowed in any card). Verification gate: `git ls-files 'qhse-cesi/*.pdf'` must return empty. |
| **POLICY-04** | Footer shows `derniere_maj` (ISO date) + GitHub repo link for transparency | Footer markup already in place (line 671). Phase 3 refreshes the `<time>` to ship date. |
</phase_requirements>

---

## Architectural Responsibility Map

The Hub is a single-tier static site — no API, no backend, no DB. The capabilities below map to **subsystems inside the single `qhse-cesi/index.html` file** plus two sibling governance files.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Card data declaration (`BIBLIO_CATEGORIES[]`, `BIBLIO[]`) | Inline `<script>` (data layer) | — | Single source of truth, sits with renderer to keep edits coupled. |
| Pure render function (`renderCard(item)`) | Inline `<script>` (render layer) | — | Pattern 1 from ARCHITECTURE.md — data in, HTML string out, never reads DOM. |
| Sort + grouping by category | Inline `<script>` (render layer) | — | `BIBLIO.sort(...)` runs once at render time; result is grouped by category via `BIBLIO_CATEGORIES.map(...)`. |
| Mount (`innerHTML =`) | Inline `<script>` (controller layer) | — | One assignment to `#biblio-grid.innerHTML`, fires on `DOMContentLoaded`. |
| Card CSS (badge, list layout, age-coloured date) | Inline `<style>` (`@layer components`) | — | Single new component in V1 chassis. Reserved slot from Phase 1. |
| Badge accent color | Inline `<style>` token reference | — | `--accent` already declared; no new tokens. |
| Age-coloured `lastChecked` rendering | Inline `<style>` + render-time class assignment | Inline `<script>` (computes age class from ISO date) | Pure JS computes `daysSince(lastChecked)` → maps to `.fresh` / `.aging` / `.stale` class → CSS rule binds class to token (`--success` / `--warning` / `--alert`). |
| Outbound link safety | `renderCard()` hard-coded attrs | — | `target="_blank" rel="noopener noreferrer"` is template literal, never user-edited. |
| `LEGAL.md` (POLICY-01) | Sibling file `qhse-cesi/LEGAL.md` | — | Markdown, not HTML — separate file makes POLICY-03 (no PDF hosting) declaration discoverable to anyone browsing the repo. |
| `V2_BACKLOG.md` (POLICY-02) | Sibling file `.planning/V2_BACKLOG.md` | — | Lives in planning dir alongside REQUIREMENTS / STATE — not deployed to Vercel. |
| `derniere_maj` footer refresh (POLICY-04) | Inline HTML edit on `<time>` element | — | One-line edit on every commit changing rendered HTML. Discipline, not automation. |

**No tier reassignment required** — Phase 3 fits entirely within the established single-file pattern. The two new sibling files (`LEGAL.md`, `V2_BACKLOG.md`) are non-HTML governance artefacts and do not affect the rendered Vercel deploy beyond being part of the git history.

---

## Standard Stack

### Core (already in the file — no additions)

| Capability | Implementation | Why Standard |
|------------|---------------|--------------|
| Inline HTML5 | `<section>`, `<article>`, `<ul role="list">`, `<a>`, `<time>` | Semantic landmarks already used Phase 1+2. Card is the seventh component slot reserved during Phase 1 UI-SPEC. |
| Inline CSS in `@layer components` | New `.card-list`, `.card`, `.badge`, `.card__meta`, `.card__date` rules | Phase 1 cascade order `reset, tokens, base, components, utilities` — card styles live in `components`. |
| Inline ES2024 JS in IIFE | New `BIBLIO_CATEGORIES[]`, `BIBLIO[]`, `renderCards()` | IIFE already exists at `qhse-cesi/index.html:679`. Append new functions inside it. |
| Google Fonts CSS2 | Fraunces + Inter + JetBrains Mono already loaded | No font additions — JetBrains Mono is already used for RNCP codes + dates in Phase 2; same role for Biblio `lastChecked` + domain. |

### Supporting (NONE — vanilla vanilla)

No new libraries. No `highlight.js`, no `marked`, no `lucide` UMD runtime, no `alpine`, no `htmx`. The architecture for this project is a hard constraint (INFRA-02): single `index.html`, no build step, no npm. Phase 3 honours it.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `innerHTML` single mount | `document.createElement` loop per card | Mutation-per-card adds ~30 lines for zero functional benefit on 35 cards. innerHTML wins for read-only static data. |
| Inline JSON in `<script>` | `<script type="application/json" id="biblio-data">` block + `JSON.parse` at boot | JSON literal avoids comments, slightly cleaner. Tradeoff: cannot use JS comments inside `BIBLIO[]` to annotate cards during editing. **Recommendation:** stick with JS literal arrays — easier to maintain by hand. |
| Per-category `--accent-{slug}` tokens | Single `--accent` shared by all badges | Five new tokens would re-open Phase 1 token contract (`tokens declared once in :root`) and require WCAG AA contrast re-validation on each variant. Locked: single `--accent`, badge LABEL differentiates. |
| Wayback `archive_url` mandatory on every card | Mandatory only on `source_type: officiel` high-value | Wayback snapshots have variable coverage (France Compétences fiche RNCP41446 returns empty `archived_snapshots: {}` despite being a HIGH-value reference). Forcing mandatory everywhere blocks too many cards. |

**Installation:** Nothing to install. All Phase 3 work edits files already in the repo.

**Version verification:** No package versions to check — Phase 3 ships zero new third-party dependencies.

---

## Architecture Patterns

### System Architecture Diagram

```
Page load (HTML parsed)
    ↓
<head> CSS applied (no FOUC — inline style)
    ↓
<body> rendered:
    ├── <header> sticky nav
    ├── <main>
    │     ├── <section #accueil>      (Phase 2 content — frozen)
    │     ├── <section #decouverte>   (Phase 2 content — frozen)
    │     ├── <section #biblio>       (Phase 3 fills body):
    │     │     ├── <p class="eyebrow">03 / BIBLIO</p>
    │     │     ├── <h2 id="h-biblio">Les meilleures ressources, classées et datées</h2>
    │     │     └── <div id="biblio-grid">           ← mount point line 659
    │     └── <section #outils hidden>               (V2 reserved)
    └── <footer> with refreshed <time datetime=...>  ← POLICY-04
    ↓
DOMContentLoaded fires
    ↓
IIFE runs renderCards():
    ├── (1) BIBLIO.sort((a,b) => b.lastChecked.localeCompare(a.lastChecked))
    ├── (2) BIBLIO_CATEGORIES.map(cat => {
    │           const items = BIBLIO.filter(c => c.category === cat.id);
    │           return renderCategorySection(cat, items);
    │       }).join('')
    ├── (3) document.getElementById('biblio-grid').innerHTML = ...
    │           (single assignment — no per-card DOM mutation)
    └── (4) For each card, age-class computed from lastChecked:
              daysSince(d) → 'fresh' | 'aging' | 'stale'
              → CSS binds .stale → --alert, .aging → --warning, .fresh → --success
    ↓
Page interactive (target: <50ms post-DOMContentLoaded on mid-range mobile)
    ↓
Card click → native <a> navigation → target="_blank" opens new tab
   (no JS interception, no preventDefault, browser handles middle-click + cmd-click correctly)
```

### Recommended Project Structure

```
mes-apps-claude/
├── qhse-cesi/
│   ├── index.html          ← Phase 3 edits: +400 lines (CSS + data + render + section markup)
│   └── LEGAL.md            ← NEW (POLICY-01) ~60-80 lines French markdown
└── .planning/
    └── V2_BACKLOG.md       ← NEW (POLICY-02) pre-seeded with UX-01..08 + TOOL-01..03 + v1.1 deferrals
```

No directories added. No build outputs. Vercel deploys `qhse-cesi/` as-is.

### Pattern 1: Data-Driven Render (BIBLIO-02)

**What:** Two inline arrays + one pure render function + one innerHTML mount.

**When to use:** Whenever ≥ 3 repeating elements share a shape. 35 cards × 5 categories = textbook fit.

**Example:**
```js
// Inline inside the existing IIFE at qhse-cesi/index.html:679
const BIBLIO_CATEGORIES = [
  { id: 'officiel',   slug: 'officiel',   label: 'Sources officielles',
    h2: 'Sources officielles',                      badge: 'OFFICIEL' },
  { id: 'communaute', slug: 'communaute', label: 'Communauté & retours d’expérience',
    h2: 'Communauté & retours d’expérience', badge: 'COMMUNAUTÉ' },
  { id: 'pedago',     slug: 'pedago',     label: 'Contenu pédagogique',
    h2: 'Contenu pédagogique',                 badge: 'PÉDAGOGIQUE' },
  { id: 'annales',    slug: 'annales',    label: 'Annales & sujets',
    h2: 'Annales & sujets',                         badge: 'ANNALES' },
  { id: 'pro',        slug: 'pro',        label: 'Outils pros & veille',
    h2: 'Outils pros & veille',                     badge: 'OUTIL-PRO' },
];

const BIBLIO = [
  {
    id: 'officiel-rncp-41446',
    title: 'Fiche RNCP 41446 — Bachelor QHSE',
    url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
    description: 'Fiche officielle France Compétences — blocs de compétences, niveau 6, certificateur CESI.',
    category: 'officiel',
    source_type: 'officiel',
    tags: ['RNCP', 'fiche', 'francecompetences', 'niveau-6'],
    priority: 1,
    lastChecked: '2026-05-15',
    archive_url: '',   // empty: Wayback API returned no snapshot at research time — owner must trigger archive before exec
    note: null,
  },
  // ... 34 more entries, all 5 categories represented
];

const daysSince = (isoDate) => {
  const ms = Date.now() - new Date(isoDate).getTime();
  return Math.floor(ms / 86400000);
};

const ageClass = (isoDate) => {
  const d = daysSince(isoDate);
  if (d <= 90) return 'fresh';
  if (d <= 180) return 'aging';
  return 'stale';
};

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

const domainOf = (url) => {
  try { return new URL(url).host.replace(/^www\./, ''); }
  catch { return ''; }
};

const renderCard = (item, badge) => `
  <li role="listitem">
    <a class="card" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">
      <article>
        <span class="badge">${escapeHtml(badge)}</span>
        <h3 class="card__title">${escapeHtml(item.title)}</h3>
        <p class="card__desc">${escapeHtml(item.description)}</p>
        ${item.note ? `<p class="card__note">${escapeHtml(item.note)}</p>` : ''}
        <div class="card__meta">
          <span class="card__domain">${escapeHtml(domainOf(item.url))}</span>
          <time class="card__date mono ${ageClass(item.lastChecked)}"
                datetime="${escapeHtml(item.lastChecked)}">vérifié le ${escapeHtml(item.lastChecked)}</time>
        </div>
      </article>
    </a>
  </li>
`;

const renderCategorySection = (cat, items) => `
  <section id="biblio-${cat.slug}" aria-labelledby="h-biblio-${cat.slug}">
    <h2 id="h-biblio-${cat.slug}" class="biblio__cat-h2">${escapeHtml(cat.h2)}</h2>
    <ul role="list" class="card-list">
      ${items.map(item => renderCard(item, cat.badge)).join('')}
    </ul>
  </section>
`;

const renderCards = () => {
  const sorted = [...BIBLIO].sort((a, b) => b.lastChecked.localeCompare(a.lastChecked));
  const mount = document.getElementById('biblio-grid');
  if (!mount) return;
  mount.innerHTML = BIBLIO_CATEGORIES
    .map(cat => renderCategorySection(cat, sorted.filter(c => c.category === cat.id)))
    .join('');
};

// inside the existing IIFE — add one line after the burger-close block:
document.addEventListener('DOMContentLoaded', renderCards);
```

### Pattern 2: Editorial List Layout (D-03)

**What:** `<ul role="list">` per category, each `<li>` is a clickable card row. 1-column at every breakpoint.

**Example CSS (extends the existing line 369 `#biblio-grid` rule):**
```css
/* -- Biblio card list (Phase 3) -- */
#biblio-grid > section + section { margin-top: var(--space-2xl); }
.biblio__cat-h2 {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: var(--step-3);
  color: var(--ink-1);
  margin-bottom: var(--space-lg);
  scroll-margin-top: var(--header-h);
}
.card-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
.card {
  display: block;
  background: var(--bg-2);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-lg);
  text-decoration: none;
  color: var(--ink-1);
  transition: border-color 120ms ease-out;
}
.card:hover { border-color: var(--accent); }
.card:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
}
.badge {
  display: inline-block;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: var(--step--1);
  letter-spacing: 0.08em;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-sm);
}
.card__title {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: var(--step-2);
  color: var(--ink-1);
  margin: 0 0 var(--space-sm) 0;
  line-height: 1.3;
  text-wrap: balance;
}
.card__desc {
  font-family: var(--font-sans);
  font-size: var(--step-1);
  color: var(--ink-1);
  margin: 0;
  max-width: 68ch;
  line-height: 1.55;
}
.card__note {
  font-family: var(--font-sans);
  font-size: var(--step-0);
  color: var(--ink-2);
  font-style: italic;
  margin: var(--space-sm) 0 0 0;
}
.card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-md);
  margin-top: var(--space-sm);
  font-size: var(--step--1);
}
.card__domain { color: var(--ink-2); }
.card__date { font-family: var(--font-mono); }
.card__date.fresh { color: var(--success); }
.card__date.aging { color: var(--warning); }
.card__date.stale { color: var(--alert); }
```

### Pattern 3: Single innerHTML Mount

Already shown in Pattern 1. The mount is a single `mount.innerHTML = ...` assignment. No per-card append, no DocumentFragment, no MutationObserver. 35 cards render in one frame.

### Anti-Patterns to Avoid

- **Per-category `--accent-{slug}` tokens** — violates Phase 1 token contract; locked decision is single shared `--accent`.
- **`document.createElement` loops** — adds 30+ LOC for zero benefit on static data of this size.
- **Inline `onclick=""` on cards** — explicitly forbidden by BIBLIO-02. Whole `<a>` is the click target.
- **2-col or 3-col grid** — D-03 locks 1-column at every breakpoint.
- **Sort by `priority`** — D-04b locks `priority` as metadata-only; sort by `lastChecked` desc.
- **PDF URLs in any card** — POLICY-03 + seed-list reject criterion. Link to the page that hosts the PDF, not the PDF itself.
- **Aggregator domains** (Glassdoor / Indeed / HelloWork / Talent.com / JobiJoba) — Phase 2 D-03 extends here.
- **English fallback titles** — French throughout per Phase 1 Copywriting Contract.
- **Animated `box-shadow` on hover** — PITFALLS.md "Performance Traps". Card hover uses `border-color` transition only.
- **Mass-`fetch()` of card URLs at render time** — `?verify=1` dev tool is deferred to V2 (UX-08).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Date age computation | Custom date library, `dayjs`, `date-fns` | `Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)` | ISO dates, day-precision, ~3 lines. No dependency needed. |
| HTML escaping in template strings | A templating library | Inline `escapeHtml(s)` 5-line helper | Card content is researcher-controlled French text — `<>&"'` replacement is sufficient. |
| Domain extraction from URL | regex parsing | Native `new URL(url).host.replace(/^www\./, '')` | Browser-built URL parser, handles edge cases. |
| Wayback Machine snapshot fetch at runtime | `fetch('https://archive.org/wayback/available?...')` on every card | Pre-fetch during research → bake static `archive_url` strings into the data | Runtime fetch breaks offline, CORS-blocks, adds latency. Snapshot URLs are stable. |
| Outbound link safety | A "safe link" helper | Hard-code `target="_blank" rel="noopener noreferrer"` in `renderCard()` | One literal string, zero edge cases, verifiable by `grep`. |
| Category sort/group | A "groupBy" utility | One `BIBLIO_CATEGORIES.map(cat => sorted.filter(c => c.category === cat.id))` chain | 35 items × 5 categories = trivial; native Array methods. |
| Markdown for `LEGAL.md` | A markdown renderer | Plain `.md` file — GitHub renders it; Vercel serves it raw | Renders on the GitHub UI for transparency; Vercel does not need to render it. |

**Key insight:** This phase has zero need for runtime dependencies. Every problem is solved by either a one-liner of vanilla JS/CSS or a baked-in static value. The single-file constraint is not just a deploy convenience — it is the architectural advantage that lets the seed-list owner verify every byte of the data layer by reading one file.

---

## Runtime State Inventory

> Phase 3 is greenfield content within an existing chassis. No rename / refactor / migration involved.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — no database, no localStorage in V1, no IndexedDB | — |
| Live service config | None — Vercel deploys static files, no service config | — |
| OS-registered state | None — no background jobs, no scheduled tasks, no systemd units | — |
| Secrets/env vars | None — no API keys, no auth. GitHub deploy token is project-level and not Phase-3-scoped | — |
| Build artifacts | None — no build step (INFRA-02) | — |

**Pre-existing carry-forward:** The `<time datetime="2026-05-14">14 mai 2026</time>` value at `qhse-cesi/index.html:671` must be refreshed to the Phase 3 ship date on every commit that changes rendered HTML (POLICY-04). This is discipline, not runtime state. Single source of truth — there is no `derniere_maj` in any other location.

---

## Common Pitfalls

### Pitfall 1: Wayback snapshot absent for the most-important URL (RNCP41446)
**What goes wrong:** Researcher pre-fetches `archive_url` for all officiel cards, but `archive.org/wayback/available?url=https://www.francecompetences.fr/recherche/rncp/41446/` returns `{"archived_snapshots": {}}` — empty. BIBLIO-09 mandates `archive_url` on "RNCP fiche" but Wayback has not yet captured it.
**Why it happens:** France Compétences only became authoritative on RNCP41446 in 2025-10. Wayback indexer has not crawled it. Same risk for any very-recently-published reference.
**How to avoid:** During Phase 3 task 1 (seed list), trigger a manual archive via `https://web.archive.org/save/https://www.francecompetences.fr/recherche/rncp/41446/` BEFORE executor renders the card. Same goes for the CESI Bordeaux formation page if its Wayback returns empty. Owner-action gate — the researcher in this RESEARCH.md flags the URL with an `**Action requise**: pousser une snapshot Wayback avant l'exec phase.` annotation in `03-SEED-CANDIDATES.md`.
**Warning signs:** Empty `archive_url: ""` on any `source_type: officiel` high-value card at seed-approve time. Reject criterion: card should not ship without either an `archive_url` OR an explicit researcher note saying "Wayback snapshot pushed manually on YYYY-MM-DD".

### Pitfall 2: `lastChecked` desc sort breaks if any card has a wrong-shape date
**What goes wrong:** A card has `lastChecked: "2026-05"` (year-month only, no day) or `"15/05/2026"` (French format). `localeCompare` is lexicographic — wrong-shape strings sort to wrong positions; the most-recent card ends up at the bottom of its category.
**Why it happens:** Owner edits a date during seed-approve and forgets the day part, or pastes a French-formatted date from a verification spreadsheet.
**How to avoid:** Schema rule: `lastChecked` is ALWAYS `YYYY-MM-DD`, 10 characters. Add a runtime validator at the top of `renderCards()`:
```js
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
BIBLIO.forEach(c => {
  if (!ISO_DATE.test(c.lastChecked)) {
    console.warn('[biblio] invalid lastChecked', c.id, c.lastChecked);
  }
});
```
Console-warn (not throw) — graceful degradation. The card still renders; the warning tells future-Claude where to look.
**Warning signs:** A card visually out of order in its category despite being recently verified. Console shows the warning.

### Pitfall 3: Black-floor invariant trips on Phase 3 shadow if executor opportunistically "fixes" line 230
**What goes wrong:** Executor sees the Phase 1 `oklch(0% 0 0 / 0.45)` at line 230, thinks Phase 3 should clean it up, "fixes" it, then breaks the Phase 1 chassis pattern. Or worse — Phase 3 introduces a new shadow that uses surface-color `oklch(0%`.
**Why it happens:** D-05 relaxation might be misread as "remove all `oklch(0%`" instead of "allow inside `box-shadow` with alpha".
**How to avoid:** Verification gate language in PLAN.md: `oklch(0%` / `#000` is forbidden as a value of `background`, `background-color`, `color`, `border-color`, `outline-color` (without alpha), or `caret-color`. Inside `box-shadow`, `filter: drop-shadow`, or `outline-color` with alpha < 1, it is allowed. The line 230 shadow stays untouched. Phase 3 cards use `box-shadow: none` (per Phase 1 Shadow contract — editorial flat).
**Warning signs:** A Phase 3 commit modifies line 230. A new CSS rule introduced in Phase 3 has `background: oklch(0%...)` or `color: #000`.

### Pitfall 4: File-size cap (≤ 1100 lines) breached silently
**What goes wrong:** Phase 3 adds ~400 lines (CSS + data + render + section markup); current 720 + 400 = 1120 > 1100 cap.
**Why it happens:** 35 card entries × ~10 lines each (id/title/url/description/category/source_type/tags/priority/lastChecked/archive_url) = ~350 lines just for `BIBLIO[]`. Plus CSS and render. Easily overshoots.
**How to avoid:** Compact the data structure during executor render: one card per ~6 lines, not 10. Use single-line objects where possible:
```js
{ id: 'officiel-rncp-41446', title: 'Fiche RNCP 41446 — Bachelor QHSE',
  url: 'https://www.francecompetences.fr/recherche/rncp/41446/',
  description: '...', category: 'officiel', source_type: 'officiel',
  tags: ['RNCP','fiche','francecompetences'], priority: 1,
  lastChecked: '2026-05-15', archive_url: '', note: null },
```
Approximate budget: 35 × 7 = ~245 lines for `BIBLIO[]`. Plus ~30 for `BIBLIO_CATEGORIES[]` + ~60 for `renderCard()` + helpers + ~80 for CSS = ~415 total. Should fit ≤ 1100 with care.
**Warning signs:** Pre-deploy `wc -l qhse-cesi/index.html` returns > 1100. Plan-checker rejects.

### Pitfall 5: Accent surface count breaches "single new component slot" Phase 1 invariant
**What goes wrong:** Card hover, focus-ring, badge background, badge text, "more" pseudo-link inside card all use `--accent`. Phase 1 reserved exactly four accent slots (link, active nav, h2 underline, Phase 3 badges) — adding a fifth violates the reservation.
**Why it happens:** Hover-state styling temptation; "accent border on card" temptation; "Featured / pinned" card variant temptation (D-04b mentions priority could drive a `--radius-lg` "featured" variant — STAY AWAY in V1).
**How to avoid:** Card uses `--accent` ONLY on the badge surface (background tint = `--accent-soft`, text = `--accent`). Card hover uses `border-color: var(--accent)` — this is an existing accent slot (Pattern 1 component contract: "1 px solid `--border-subtle` … `:hover` border colour `--accent`"). Already declared for buttons (V2-reserved); applying it to cards is the same idiom, NOT a new accent surface.
**Warning signs:** A 5th use of `var(--accent)` in a card-related CSS rule. A "featured" card variant. Accent applied as a background fill (not a tint).

### Pitfall 6: Communauté card missing `note` field
**What goes wrong:** A Reddit or LinkedIn card lands in `BIBLIO[]` without a `note`. Renderer outputs the card without the "lire avec recul" caveat. BIBLIO-05 acceptance silently fails.
**Why it happens:** Owner picks a Reddit card during seed-approve, forgets to add the default note from the template.
**How to avoid:** Render-time guard:
```js
const renderCard = (item, badge) => {
  if (item.source_type === 'communauté' && !item.note) {
    console.warn('[biblio] communauté card missing note', item.id);
    item = { ...item, note: 'Lire avec recul — témoignage individuel, non vérifié.' };
  }
  // ... existing render
};
```
The seed-list template should pre-populate `note` for every communauté candidate, but the runtime fallback is the safety net.
**Warning signs:** A communauté card with no italicized caveat row visible on the page.

### Pitfall 7: Subsection anchors `#biblio-officiel` etc. are NOT in the top nav, but ARE bookmarkable
**What goes wrong:** Owner shares `https://mes-apps-claude.vercel.app/qhse-cesi/#biblio-pedago` with a peer. The peer's browser loads, sees the page, but the deep anchor is hidden under the sticky header.
**Why it happens:** `scroll-margin-top: var(--header-h)` is declared on `<section>` in `@layer base` (Phase 1 chassis), but `.biblio__cat-h2` (the heading inside the new sub-sections) also needs explicit `scroll-margin-top` per Phase 1 belt-and-suspenders rule for iOS Safari.
**How to avoid:** Add `scroll-margin-top: var(--header-h);` to both the new `<section id="biblio-{slug}">` (inherits from base) and to `.biblio__cat-h2`. Pattern matches the Phase 2 `<h3>` sub-anchor pattern (Découverte sub-sections `#dec-pitch`, `#dec-programme`, etc. already do this).
**Warning signs:** Deep-anchor link lands with the heading partially under the sticky nav. Test on real iOS Safari before phase close.

---

## Code Examples

Verified patterns the executor will reference. All snippets target inline placement inside `qhse-cesi/index.html`.

### Wayback availability API (researcher pre-fetch)

```
GET https://archive.org/wayback/available?url=<encoded-original-url>

Response shape:
{
  "url": "<original>",
  "archived_snapshots": {
    "closest": {
      "url": "http://web.archive.org/web/YYYYMMDDhhmmss/<original>",
      "timestamp": "YYYYMMDDhhmmss",
      "available": true,
      "status": "200"
    }
  }
}

Empty snapshot case (e.g., RNCP41446 at research time):
{
  "url": "<original>",
  "archived_snapshots": {}
}
```

**Probed results (2026-05-15):**

| URL | Snapshot found | Wayback URL |
|-----|-----------|-------------|
| `https://www.francecompetences.fr/recherche/rncp/41446/` | **NO** | — (researcher MUST trigger manual `save` before exec) |
| `https://bordeaux.cesi.fr/formations-alternance-qse/` | YES (2026-02-11) | `https://web.archive.org/web/20260211102433/https://bordeaux.cesi.fr/formations-alternance-qse/` |
| `https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038610196` (R4121-1 DUERP) | YES (2025-02-15) | `https://web.archive.org/web/20250215163208/https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038610196` |
| `https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035640828` (L4121-1) | YES (2025-03-10) | `https://web.archive.org/web/20250310085855/https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035640828` |
| `https://www.inrs.fr/media.html?refINRS=ED%206322` (DUERP) | YES (2025-12-08) | `https://web.archive.org/web/20251208170229/https://www.inrs.fr/media.html?refINRS=ED%206322` |
| `https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html` | YES (2026-05-04) | `https://web.archive.org/web/20260504152728/https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html` |
| `https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html` | YES (2026-05-04) | `https://web.archive.org/web/20260504152728/https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html` |
| `https://aida.ineris.fr/` | YES (2026-05-09) | `https://web.archive.org/web/20260509144200/https://aida.ineris.fr/` |
| `https://www.iso.org/standard/63787.html` (ISO 45001) | YES (2026-05-14) | `https://web.archive.org/web/20260514001358/https://www.iso.org/standard/63787.html` |
| `https://www.iso.org/standard/60857.html` (ISO 14001:2015) | YES (2026-05-14) | `https://web.archive.org/web/20260514001359/https://www.iso.org/standard/60857.html` |
| `https://www.iso.org/standard/62085.html` (ISO 9001:2015) | NO | — |

### `LEGAL.md` template (POLICY-01 — French, ≤ 80 lines)

```markdown
# Mentions légales — QHSE CESI Hub

**Dernière mise à jour : 2026-05-15**

## Nature du site

QHSE CESI Hub est un outil de curation de liens personnel, à usage unique, conçu
par un étudiant en Bachelor QHSE à CESI Bordeaux pour son propre parcours d'apprentissage.

Ce n'est :
- **Pas** une publication commerciale.
- **Pas** un hébergeur de contenus de tiers.
- **Pas** une base de données exhaustive de documents protégés.
- **Pas** un service ouvert aux contributions externes.

## Politique de non-hébergement des PDF

Aucun fichier `.pdf` n'est hébergé sous `/qhse-cesi/`. Le site renvoie uniquement
vers les pages d'origine qui hébergent ces documents (INRS, Légifrance,
France Compétences, CESI Bordeaux, AIDA, ISO, etc.). Cette politique est vérifiable
via `git ls-files 'qhse-cesi/*.pdf'` qui doit retourner une liste vide.

## Exception pédagogique française

Ce site cite — sous forme de descriptions courtes (≤ 120 caractères par carte) — le titre,
le contexte et l'objet de chaque ressource liée, à des fins d'illustration de l'enseignement
et de la recherche, dans le cadre prévu par l'article L122-5, 3°, e du Code de la
propriété intellectuelle (exception pédagogique).

Cette exception est interprétée strictement : aucun extrait substantiel d'œuvre
protégée n'est reproduit. Les contenus liés restent la propriété de leurs ayants droit
respectifs.

## Propriété intellectuelle des ressources liées

Tous les contenus liés depuis ce site demeurent la propriété de leurs titulaires
respectifs (CESI, France Compétences, INRS, Légifrance, AIDA, ISO, Apec, France Travail,
Reddit, LinkedIn, etc.). Aucun droit de propriété ne nous est attribué par
le fait de référencer ces ressources.

## Demande de retrait

Si un titulaire de droits estime qu'un lien doit être retiré, il peut ouvrir une
issue ou une pull request sur le dépôt GitHub. Les liens sont retirés sous 7 jours.

## Code source

Le code source de ce site est disponible publiquement sur GitHub :
[Ivyx-hue/mes-apps-claude](https://github.com/Ivyx-hue/mes-apps-claude).

## Données personnelles

Ce site n'utilise pas de cookies, ne collecte aucune donnée personnelle, n'embarque
aucun script de tracking, aucun outil d'analytics, et aucune balise tierce.
Une visite ne laisse aucune trace côté serveur autre que les logs techniques
standards de Vercel.

---

*Document maintenu manuellement à chaque mise à jour du site.*
```

### `V2_BACKLOG.md` template (POLICY-02 — pre-seeded with all deferred V1 ideas)

```markdown
# V2 Backlog — QHSE CESI Hub

**Pre-seeded:** 2026-05-15 at Phase 3 ship time.
**Purpose:** Capture every "while I'm at it" idea deferred from V1 so no idea is lost.

## v1.1 — Quick wins (target: after 2-4 weeks of real use)

| ID | Title | Originated in | Reason deferred | Complexity |
|----|-------|---------------|-----------------|------------|
| UX-01 | Scrollspy / active-section highlight in sticky nav (IntersectionObserver) | REQUIREMENTS.md §v2 | Phase 1 already wires the JS skeleton; V1 doesn't need it yet | LOW (~30 lines JS) |
| UX-02 | Filter chips per Biblio category | REQUIREMENTS.md §v2 | V1 ships `tags[]` populated but visually unused; chips are V2 add | LOW (~25 lines JS) |
| UX-06 | Reading-progress bar on Découverte | REQUIREMENTS.md §v2 | Real use signal needed before designing | LOW |
| (no-id) | Sticky mini-TOC on desktop scroll for Découverte | Phase 2 deferral | Static inline mini-TOC may be enough — wait for signal | MEDIUM (re-validate scroll-margin) |
| (no-id) | Visual salary bars (mini-histograms) on Métiers section | Phase 2 deferral | Text ranges proved readable in Phase 2 owner-verify | LOW |

## v2 — Study tools (PROJECT.md hard constraint: V2 only after V1 lived in)

| ID | Title | Originated in | Reason deferred | Complexity |
|----|-------|---------------|-----------------|------------|
| TOOL-01 | Flashcards trainer (Découverte + Biblio key facts) | REQUIREMENTS.md §v2 | Need real study sessions to design well | MEDIUM-HIGH |
| TOOL-02 | QCM mode (multiple-choice quiz) per module | REQUIREMENTS.md §v2 | Same — need real study data | MEDIUM |
| TOOL-03 | Spaced-repetition scheduling with localStorage progress | REQUIREMENTS.md §v2 | Builds on TOOL-01 | MEDIUM |

## v2 — Reading & navigation enhancements

| ID | Title | Originated in | Reason deferred | Complexity |
|----|-------|---------------|-----------------|------------|
| UX-03 | Mark-as-read toggle per card (localStorage) | REQUIREMENTS.md §v2 | V1 reading hub is short enough to navigate without it | LOW |
| UX-04 | In-page Ctrl+K search (substring filter over titles + tags) | REQUIREMENTS.md §v2 | Useful once Biblio passes ~60 cards | MEDIUM (~40 lines JS) |
| UX-05 | Copy-link button per Biblio card (`navigator.clipboard`) | REQUIREMENTS.md §v2 | Hub is single-user; share-flow is rare | LOW |
| UX-07 | Optional light-mode toggle with inline `<head>` FART-prevention script | REQUIREMENTS.md §v2 | Owner prefers dark; no demand signal | LOW |
| UX-08 | Auto link-checker as GitHub Action | REQUIREMENTS.md §v2 | V1 ships manual `?verify=1` ritual; CI is overkill until Biblio is large | MEDIUM (CI workflow) |

## Ideas considered and explicitly rejected (NOT deferred, NEVER built)

| Idea | Reason rejected |
|------|------------------|
| AI chatbot on top of the hub | Destroys "curated trustworthy source" premise (PROJECT.md §Out of Scope + research) |
| Gamification (XP / badges / streaks) | Single reader who already wants to read — no engagement problem |
| Real-time Reddit / RSS / API embeds | Breaks offline; breaks when tokens expire; defeats curation |
| User accounts / auth / backend sync | Single-user static site |
| Comments / discussion under cards | No audience |
| Carousels / sliders | 15 years of NN/G evidence against; this is a reference doc |
| Analytics / heat-maps / tracking | CNIL exposure, no audience |
| PDF hosting of annales / corrigés | Outside the French pedagogical exception (POLICY-01 + POLICY-03) |
| Multi-language UI | Content + owner are French |
| Reverse RNCP-bloc → modules mapping | Doubles maintenance surface for marginal value (Phase 2 D-deferred) |

---

## How to add to this backlog

When a "while I'm at it" idea arrives during V1 or v1.1 work:

1. Open this file.
2. Add a row to the appropriate section (v1.1 quick wins, or v2).
3. Fill: title, originating phase, reason deferred, expected complexity.
4. Commit with message `docs(backlog): defer <idea>`.
5. Return to the in-flight work.

Never implement, never prototype, never "just sketch it" during V1.

---

*Backlog is the discipline that lets V1 ship.*
```

### Render-time validators (defensive but lightweight)

```js
// Inside renderCards(), before sort + mount:
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
BIBLIO.forEach(c => {
  if (!ISO_DATE.test(c.lastChecked))
    console.warn('[biblio] invalid lastChecked', c.id, c.lastChecked);
  if (c.source_type === 'officiel' &&
      ['fiche-rncp', 'cesi-bordeaux', 'inrs-dossier', 'legifrance'].some(k => c.id.includes(k)) &&
      !c.archive_url)
    console.warn('[biblio] officiel high-value card missing archive_url', c.id);
  if (c.source_type === 'communauté' && !c.note)
    console.warn('[biblio] communauté card missing note', c.id);
});
```

---

## State of the Art

| Old approach | Current approach | When changed | Impact |
|--------------|------------------|--------------|--------|
| Wikipedia-style flat list of "useful links" | Categorized + provenance-badged + dated cards | 2020s curated-list pattern (sindresorhus/awesome influence) | Reader can weight reliability at a glance |
| Inline `target="_blank"` without `rel` | `target="_blank" rel="noopener noreferrer"` mandatory | Post-2019 tab-napping disclosure | Already established Phase 2; mirror here |
| Hand-duplicated card HTML | Data-driven render via JS template literal | Since `innerHTML` + ES6 template literals are stable everywhere | One edit to `renderCard()` touches all 35 cards |
| `box-shadow` lift on hover | Border-color shift on hover | Editorial register (Phase 1 motion contract — flat) + PITFALLS.md performance traps | Avoids mobile scroll jank |
| Wayback `archive_url` per source | Wayback per HIGH-value reference only | This phase (D-02 + Claude's Discretion) | Pragmatic — Wayback coverage is uneven; require it where it matters most |

**Deprecated / not applicable here:**
- **Sass / PostCSS / build tools** — INFRA-02 hard constraint, single-file.
- **highlight.js / Prism** — no code snippets in V1 biblio content.
- **Lucide UMD runtime bundle** — Phase 1 ships inline SVGs; Phase 3 may use `external-link` Lucide icon (already in `interactionStates` per UI-SPEC line 344) but NOT the runtime.

---

## Assumptions Log

| # | Claim | Section | Risk if wrong |
|---|-------|---------|---------------|
| A1 | The `--success` / `--warning` / `--alert` tokens declared in Phase 1 (UI-SPEC lines 140-142, "Phase 3 only" annotations) are still present in `qhse-cesi/index.html` and unchanged | Pattern 2 (CSS) | If tokens were removed during Phase 2, Phase 3 must re-declare them OR Phase 3 ships without age-coloring (BIBLIO-06 fails). Mitigation: grep `qhse-cesi/index.html` for `--success`, `--warning`, `--alert` during plan-phase task 0; if missing, add task to re-declare from UI-SPEC values. |
| A2 | The `#biblio-grid` mount point at line 659 has not drifted | Architecture diagram | Verified at research time (read confirmed line 659 contains `<div id="biblio-grid"><!-- Phase 3 renders cards into this mount point. --></div>`). Plan-checker should re-verify before exec. |
| A3 | `<p class="placeholder">En cours de constitution — première publication prévue Phase 3.</p>` at line 658 will be REMOVED during Phase 3, not preserved | Architecture diagram | Locked — the placeholder text was Phase 1 chassis copy explicitly meant to be replaced. Renderer mounts inside `#biblio-grid`; the `<p class="placeholder">` is a sibling that should be deleted from the markup. |
| A4 | Owner's seed-list approval will happen within reasonable time (~1 week) | D-02 gate | If approval drags, the `lastChecked: 2026-05-15` on every card ages naturally — cards stay in the "neutral fresh" band (≤ 90 d) for ~3 months regardless of approval delay. No mitigation needed unless approval slips > 90 days. |
| A5 | Each non-snapshotted officiel high-value URL can be Wayback-saved manually via `https://web.archive.org/save/<url>` during Phase 3 task 1 | Pitfall 1 | Wayback Save Page Now is publicly available and unauthenticated; very low risk of failure. Fallback if `save` fails: ship the card with `archive_url: ""` and a researcher note documenting the Wayback save attempt — does not block Phase 3 ship. |
| A6 | The owner approves the locked badge wording (`OFFICIEL`, `PÉDAGOGIQUE`, `COMMUNAUTÉ`, `OUTIL-PRO`, `ANNALES`) | BIBLIO-05 | CONTEXT.md §Specific Ideas locks these. If owner changes wording during owner-verify, it's a string-edit only — no impact on schema or render. |

**Confidence:** All assumptions HIGH except A4 (timing dependency on owner, unmeasurable) and A5 (Wayback Save Page Now is a one-off network call — if it fails the worst case is a missing `archive_url`, which is a soft degradation).

---

## Open Questions

1. **What's the live URL for the current CESI Bordeaux Bachelor QHSE page (vs the formations-alternance-qse catalogue)?**
   - What we know: Phase 2 verified `https://bordeaux.cesi.fr/formations-alternance-qse/` returns 200 and contains the Bachelor RQSE listing. This URL is in `#dec-sources`.
   - What's unclear: CESI may also publish a dedicated `/bachelor-qhse/` or `/bachelor-rqse/` page deeper in the site that's more specific to the formation (vs the catalogue).
   - Recommendation: Use the catalogue URL — it has a verified Wayback snapshot AND is the same URL already cited in Phase 2. Adding the deeper page is a Phase 3 owner-verify check ("est-ce que tu connais une URL plus profonde sur CESI Bordeaux pour la Bachelor QHSE ?").

2. **Reddit r/cesi — pick 3-5 threads or link the subreddit root?**
   - What we know: r/cesi exists at `reddit.com/r/cesi`. Specific threads can `[removed]` overnight.
   - What's unclear: Whether a subreddit-root link is "enough provenance" for the communauté category.
   - Recommendation: Link 3-5 specific permalink threads + 1 LinkedIn témoignage + 1 YouTube témoignage = 5 cards. Add 2 more from CESI/CESI Bordeaux alumni LinkedIn posts (public, dated). Owner will verify each at seed-approve.

3. **Annales category — does Studocu's CESI / Bachelor QHSE index actually return real content?**
   - What we know: Studocu hosts user-uploaded summaries; some are CESI-tagged.
   - What's unclear: Whether the URL structure is stable, whether content is paywalled, whether the documents are within the pedagogical exception scope.
   - Recommendation: Seed-list proposes a Studocu CESI index URL with `note: "Inscription requise — qualité non vérifiée"` (PITFALL-9 pattern). Owner can cut at seed-approve if uncomfortable.

4. **`outil-pro` category — does Préventica still exist as a 2026 active site/salon?**
   - What we know: Préventica was active in 2024-2025 as France's main prevention/sécurité salon.
   - What's unclear: 2026 site activity at research time — researcher's WebFetch did not verify in real-time.
   - Recommendation: Seed-list proposes the canonical URL; researcher flags as "verify live before exec phase" in the seed list. Worst case: owner drops the card and adds another pro-tool.

---

## Environment Availability

> No external services or runtimes required. Phase 3 is code/config only.

| Dependency | Required by | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Modern evergreen browser (Chrome / Firefox / Safari) | Owner viewing | Always | — | — |
| Wayback Machine availability API | Researcher only, at seed time | Probed live during research (4 successful calls + 2 returned empty) | n/a | If API down: skip optional `archive_url`, ship card without it. Mandatory officiel cases: trigger manual `web.archive.org/save/<url>` |
| Vercel GitHub Actions pipeline | Deploy step | YES — Phase 1+2 verified working | — | — |
| GitHub token (`ghp_...`) for git push | Deploy commit | Provided per-session by owner | per session | If expired: owner regenerates (90-day rotation) |

**Missing dependencies with no fallback:** None.
**Missing dependencies with fallback:** Wayback availability API (if it fails at exec time, ship without optional `archive_url`; mandatory officiel cards block ship until manual save succeeds).

---

## Validation Architecture

> `workflow.nyquist_validation` configuration not detected in `.planning/config.json`. Phase 1+2 validated via manual + axe DevTools + visual checklist + owner-verify gate. Phase 3 follows the same pattern.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None (vanilla HTML/CSS/JS, INFRA-02 no-build constraint) |
| Config file | None |
| Quick run command | `python -m http.server 8000 -d qhse-cesi` (local preview) + manual scroll |
| Full suite command | Same + axe DevTools browser extension + Chrome Lighthouse + grep-based phase-level invariant checks |
| Phase gate | Owner-verify against live URL `https://mes-apps-claude.vercel.app/qhse-cesi/` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test type | Automated command | File exists? |
|--------|----------|-----------|-------------------|--------------|
| BIBLIO-01 | 5 categories with stable IDs | grep | `grep -cE 'id="biblio-(officiel|communaute|pedago|annales|pro)"' qhse-cesi/index.html` returns ≥ 5 | YES |
| BIBLIO-02 | Data-driven render, no inline onclick | grep | `grep -cE 'onclick=' qhse-cesi/index.html` returns 0 | YES |
| BIBLIO-02 | `BIBLIO_CATEGORIES`, `BIBLIO`, `renderCard` present | grep | `grep -cE '\b(BIBLIO_CATEGORIES|BIBLIO|renderCard)\b' qhse-cesi/index.html` returns ≥ 3 | YES |
| BIBLIO-03 | ≥ 35 cards | grep | `grep -cE "id: '(officiel|communaute|pedago|annales|pro)-" qhse-cesi/index.html` returns ≥ 35 | YES |
| BIBLIO-03 | ≥ 7 per category | grep + count | one grep per category prefix returns ≥ 7 each | YES |
| BIBLIO-04 | All required schema fields present | grep | Sample 3 cards by `id`, verify all 9 required fields | YES (visual) |
| BIBLIO-05 | All 5 badges rendered | visual + grep | `grep -cE '>(OFFICIEL|PÉDAGOGIQUE|COMMUNAUTÉ|OUTIL-PRO|ANNALES)<' rendered.html` returns ≥ 5 | rendered output |
| BIBLIO-06 | Age coloring applied | visual | Open page, inspect `.card__date` class names (.fresh / .aging / .stale) | rendered |
| BIBLIO-07 | All outbound `<a>` have `target="_blank" rel="noopener noreferrer"` | grep | `grep -cE 'target="_blank" rel="noopener noreferrer"' qhse-cesi/index.html` returns ≥ 35 (was 8 in Phase 2) | YES |
| BIBLIO-08 | Category badges visually group cards | visual | Open page, scroll each category, verify badge appears on every card | rendered |
| BIBLIO-09 | High-value cards have `archive_url` | grep + visual | Filter `BIBLIO` for `source_type: 'officiel'` + high-value `id` patterns, verify `archive_url` is non-empty | YES |
| POLICY-01 | `qhse-cesi/LEGAL.md` exists with required clauses | grep | `test -f qhse-cesi/LEGAL.md && grep -cE 'p(é\|e)dagogique\|hébergeur\|propri(é\|e)t(é\|e)' qhse-cesi/LEGAL.md` returns ≥ 3 | NEW (Phase 3 creates) |
| POLICY-02 | `.planning/V2_BACKLOG.md` exists with all deferred IDs | grep | `test -f .planning/V2_BACKLOG.md && grep -cE 'UX-(01\|02\|03\|04\|05\|06\|07\|08)\|TOOL-(01\|02\|03)' .planning/V2_BACKLOG.md` returns ≥ 11 | NEW (Phase 3 creates) |
| POLICY-03 | No PDFs under `/qhse-cesi/` | git | `git ls-files 'qhse-cesi/*.pdf'` returns empty | YES (gate) |
| POLICY-04 | Footer `<time>` reflects Phase 3 ship date | grep | `grep -E '<time datetime="2026-05-[12][0-9]"' qhse-cesi/index.html` returns 1 (date matches commit date) | YES |

### Sampling Rate

- **Per task commit:** Browser open of `qhse-cesi/index.html` (or live URL after deploy), visual scroll, devtools console for warnings, grep one BIBLIO-* invariant.
- **Per phase merge:** Full grep suite (all 14 above) + axe DevTools (zero critical) + Lighthouse (Accessibility ≥ 95) + iOS Safari + Android Chrome real-device test.
- **Phase gate:** Owner-verify checklist on live URL (mirror Phase 2's 27-point pattern).

### Wave 0 Gaps

- [ ] Manual Wayback `save` for `https://www.francecompetences.fr/recherche/rncp/41446/` (and any other officiel high-value URL whose Wayback `archived_snapshots` is empty at seed-approve time). Owner-action or executor task 1 step.
- [ ] Verify A1 assumption: `--success`, `--warning`, `--alert` tokens still declared in `qhse-cesi/index.html`. If missing, planner adds re-declare task.
- [ ] No test framework install — vanilla project, no `jest` / `vitest` / `playwright`.

---

## Security Domain

> Phase 3 is a static read-only page with outbound links. OWASP categories largely don't apply. Applicable controls below.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|------------------|
| V2 Authentication | NO | No auth surface |
| V3 Session Management | NO | No sessions |
| V4 Access Control | NO | Public read-only |
| V5 Input Validation | YES (one surface) | Outbound URLs are researcher-curated. `renderCard()` HTML-escapes via `escapeHtml()` helper to prevent any injection from a malformed card title or description. No user input — escaping is belt-and-suspenders. |
| V6 Cryptography | NO | No crypto, no secrets |
| V7 Error Handling | YES (low) | Render-time validators `console.warn` only — never throw, never break the page |
| V8 Data Protection | YES | No user data, no PII. POLICY-01 LEGAL.md statement of zero-collection |
| V9 Communications | YES | All outbound `<a>` use HTTPS only (verify via `grep -cE 'href="http://' qhse-cesi/index.html` returns 0) + `target="_blank" rel="noopener noreferrer"` mandatory |
| V10 Malicious Code | NO | No `<script>` from CDN, no third-party JS, no eval |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|--------------------|
| Tab-napping via `target="_blank"` without `rel="noopener noreferrer"` | Tampering | Hard-coded in `renderCard()` template literal; verified by grep |
| XSS via card content (low likelihood — researcher-controlled) | Tampering | `escapeHtml()` on every interpolated string in `renderCard()` |
| Mixed content (HTTP in href) | Tampering | All seed URLs verified HTTPS at research time; verification gate `grep -E 'href="http://'` returns 0 |
| Hot-linking third-party assets (logos) | Spoofing | Skip logos entirely in V1; pure text + badge surfaces (already in chassis) |
| Cookie / fingerprint via third-party embed (Reddit, LinkedIn) | Information disclosure | Plain `<a>` links only, no iframes, no embeds (PITFALL-OWASP) |
| Hosting copyrighted material (annales PDFs) | Repudiation | POLICY-03 hard rule + POLICY-01 LEGAL.md statement + seed-list reject criterion |

---

## Sources

### Primary (HIGH confidence)

- `.planning/phases/03-biblio-data-render-5-categories-populated/03-CONTEXT.md` — D-01..D-05 locked decisions + 9 Claude's Discretion items
- `.planning/phases/01-skeleton-chassis-visual-identity/01-UI-SPEC.md` — token contract, component contract, accent reservation, Copywriting Contract
- `.planning/phases/02-d-couverte-content/02-SUMMARY.md` — citation discipline pattern, 8 outbound `target="_blank" rel="noopener noreferrer"` baseline
- `.planning/research/PITFALLS.md` — link rot, source-mixing, scope creep, PDF hosting, dark-mode contrast, anchor-link offset (Phase 1+2 already address most)
- `.planning/research/ARCHITECTURE.md` — Pattern 1 (data-driven), Pattern 3 (event delegation), data schema example, V2 namespace stub
- `.planning/research/FEATURES.md` — anti-features list (no AI chatbot, no gamification, no real-time feeds, no light toggle, no service worker)
- `.planning/REQUIREMENTS.md` §Biblio + §Policy & Trust — BIBLIO-01..09 + POLICY-01..04 acceptance criteria
- `qhse-cesi/index.html` (720 lines) — mount point line 659, CSS placeholder line 369, footer time line 671, IIFE line 679, eyebrow line 656
- Wayback Machine availability API — `https://archive.org/wayback/available?url=<URL>` — probed live for 11 URLs (snapshots returned for 9 of 11)

### Secondary (MEDIUM confidence)

- France Compétences fiche RNCP41446 — verified live in Phase 2; **no Wayback snapshot yet** — researcher action required
- ISO 9001:2015 standard page `https://www.iso.org/standard/62085.html` — no Wayback snapshot returned (seed list will probe again at exec)
- CESI Bordeaux catalogue page — verified live in Phase 2 (`https://bordeaux.cesi.fr/formations-alternance-qse/`), Wayback snapshot present 2026-02-11

### Tertiary (LOW confidence — owner verifies)

- Studocu CESI / Bachelor QHSE index pages — exist but quality + paywall + scope vary; flag at seed-approve
- Préventica 2026 — site existence assumed from 2024-2025 prior knowledge; verify live before exec
- Reddit r/cesi specific permalink threads — must be picked freshly during seed-approve (threads age rapidly)
- LinkedIn public posts from CESI Bordeaux alumni — discoverable but URL stability is poor

---

## Metadata

**Confidence breakdown:**
- User constraints: HIGH — CONTEXT.md is unambiguous
- Phase requirements: HIGH — 13 IDs each map to a verifiable artefact
- Standard stack: HIGH — no new dependencies, all chassis tokens reused
- Architecture: HIGH — Pattern 1 from ARCHITECTURE.md, validated by Phase 2 outbound link discipline
- Pitfalls: HIGH — most predicted by `.planning/research/PITFALLS.md`; Phase 3 specifics (Wayback gap, file-size cap, communauté note default) flagged
- Seed-list URLs: MEDIUM — Wayback probed for 11 high-value URLs; ~40 more URLs in 03-SEED-CANDIDATES.md are listed without runtime probing (owner verifies during seed-approve)
- LEGAL.md template: HIGH — drafted per Claude's Discretion guidance, references CPI L122-5 explicitly
- V2_BACKLOG.md template: HIGH — pre-seeded with every UX-* and TOOL-* ID from REQUIREMENTS.md plus Phase 2 v1.1 deferrals

**Research date:** 2026-05-15
**Valid until:** 2026-08-15 (90 days) — Wayback snapshots may age; Reddit thread permalinks may decay; quarterly link-verification ritual (deferred from Phase 2) is now in scope for V1 maintenance starting Phase 3 ship + 90 d.

---

*Research consumed by `gsd-planner` for Phase 3 PLAN.md. Owner approves `03-SEED-CANDIDATES.md` to unlock `/gsd-execute-phase 3`.*
