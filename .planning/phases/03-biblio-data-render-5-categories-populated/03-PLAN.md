---
phase: 03-biblio-data-render-5-categories-populated
plan: 01
subsystem: ui+data+governance
tags: [biblio, cards, data-driven, render, governance, legal, v2-backlog]

requires:
  - phase: 01-skeleton-chassis-visual-identity
    provides: "tokens, types, accent reservation, .toc/.mono/.lead utilities, 6-component contract (cards = 7th, reserved slot), mount point #biblio-grid"
  - phase: 02-d-couverte-content
    provides: "citation discipline pattern, outbound link safety (target=_blank rel=noopener noreferrer), footer derniere_maj refresh discipline"

provides:
  - "Filled <div id=\"biblio-grid\"> mount with 5 category <section>s + 35 cards (7/category) rendered from BIBLIO[]"
  - "Inline JS: BIBLIO_CATEGORIES[], BIBLIO[], renderCards() function, DOMContentLoaded mount"
  - "Inline CSS: card component (full-width editorial list), badge surface (--accent), freshness coloring (3 tiers)"
  - "qhse-cesi/LEGAL.md — link-curation policy + CPI L122-5 pedagogical exception"
  - ".planning/V2_BACKLOG.md — pre-seeded with UX-01..08, TOOL-01..03, Phase 2 v1.1 deferrals"
  - "Footer derniere_maj refreshed to Phase 3 ship date"

affects: [V1 closure — all 39 requirements satisfied]
---

# Phase 3 Plan 01 — Biblio data + render + governance

**Goal:** Close V1 by shipping the Biblio section (35 cards, 5 categories, data-driven render, provenance + freshness signals, Wayback fallback on officiel high-value cards) and the V1 governance scaffolding (LEGAL.md + V2_BACKLOG.md + derniere_maj footer).

**Seed list:** 35 cards pre-approved by owner ("j'approuve tout" 2026-05-15) — top 7 per category by priority then relevance, full list in `03-SEED-CANDIDATES.md` §Owner-approved 35.

**File budget:** `qhse-cesi/index.html` ≤ 1100 lines (currently 720). Phase 3 adds ~350-400 lines (CSS + JS + section markup). Separate files: `qhse-cesi/LEGAL.md` (≤ 80 lines), `.planning/V2_BACKLOG.md` (≤ 120 lines).

---

## Task list

### T-03-01 — Owner-approval gate (seed list)

**Status:** ✓ PRE-RESOLVED (owner replied "j'approuve tout" 2026-05-15, orchestrator picked 35 of 50 by priority rule).

**Verification:** `03-SEED-CANDIDATES.md` contains an `## Owner-approved 35` section listing exactly 35 candidates across 5 categories (7 each), each with `keep` marker.

---

### T-03-02 — Governance: write `qhse-cesi/LEGAL.md` (POLICY-01)

**Files:** `qhse-cesi/LEGAL.md` (NEW)

**Content (from 03-RESEARCH.md §LEGAL.md template):**
- Nature du site (personal link-curation tool, not a publication, not a host)
- Politique de non-hébergement des PDF (POLICY-03)
- Exception pédagogique française — CPI Article L122-5, 3°, e
- Propriété intellectuelle des ressources liées
- Demande de retrait (contact via GitHub Issues)
- Code source (GitHub link)
- Données personnelles (aucune collecte)

**Length cap:** ≤ 80 lignes markdown.

**Commit:** `✨ Phase 3: LEGAL.md — link-curation policy + CPI L122-5 (POLICY-01)`

---

### T-03-03 — Governance: write `.planning/V2_BACKLOG.md` (POLICY-02)

**Files:** `.planning/V2_BACKLOG.md` (NEW)

**Content (from 03-RESEARCH.md §V2_BACKLOG.md template):**
- v1.1 quick wins (target: 2-4 weeks of real use): scrollspy, filter chips, mark-as-read, Ctrl+K search, copy-link, reading-progress, sticky mini-TOC, visual salary bars
- v2 study tools (PROJECT.md hard constraint — V2 only after V1 lived in): flashcards (TOOL-01), QCM (TOOL-02), spaced repetition (TOOL-03)
- v2 reading & nav enhancements: light-mode toggle, auto link-checker GitHub Action
- Ideas explicitly rejected (NEVER built): AI chatbot, gamification, real-time embeds, accounts/auth, comments, carousels, analytics, multi-language, PWA shell, replacing the Trainer
- How to add to this backlog (process note)

**Length cap:** ≤ 120 lignes markdown.

**Commit:** `✨ Phase 3: V2_BACKLOG.md — deferred features pre-seeded (POLICY-02)`

---

### T-03-04 — CSS scaffolding for Biblio cards

**Files:** `qhse-cesi/index.html` (EDIT — extend `@layer components`)

**Adds:**
- `.biblio-section` — wrapper for each category `<section>` (heading + card list)
- `.biblio-list` — `<ul role="list">`, `list-style: none`, vertical stack with `gap`
- `.biblio-card` — full-width editorial row: padding, border-block-end hairline, hover focus state
- `.biblio-card__link` — `<a>` wrapping the card content, full-card click surface, `:focus-visible` outline using `--accent`
- `.biblio-card__head` — flex row: `[badge] + h3 title`
- `.biblio-card__badge` — `<span>` with `--accent` background OR text (one or the other, never both — WCAG AA), `text-transform: uppercase`, JetBrains Mono or Inter 600
- `.biblio-card__desc` — `<p>` description, `--ink-1`, `--measure: 68ch`, 2-3 lines max
- `.biblio-card__foot` — flex row justified between: domain (left, `--ink-2`) + lastChecked (right, mono, freshness-colored)
- `.biblio-card__date--fresh` (neutral ≤ 90 d, default `--ink-2`)
- `.biblio-card__date--warning` (90-180 d, custom warning token reusing existing palette)
- `.biblio-card__date--alert` (> 180 d, custom alert token reusing existing palette)
- `.biblio-card__note` — `<p class="biblio-card__note">`, italic, `--ink-2`, only rendered when `note` field is non-empty (community caveat)

**Constraints:**
- NO new fonts.
- NO new tokens beyond freshness warning/alert (reuse existing OKLCH palette family for consistency).
- Card uses `oklch(15% ...)` floor (D-05 — surface invariant).
- Badge surface uses `--accent`; cards do NOT use accent elsewhere.

**Verification:** grep for new classes; eyeball at 360 px + 768 px + 1440 px (manual sanity check during owner-verify).

**Commit:** `✨ Phase 3: CSS scaffolding for Biblio cards (BIBLIO-08 visual grouping)`

---

### T-03-05 — Inline JS: `BIBLIO_CATEGORIES[]` + `renderCards()` skeleton

**Files:** `qhse-cesi/index.html` (EDIT — extend inline `<script>` near end of body)

**Adds:**
- `const BIBLIO_CATEGORIES = [...]` — 5 entries (slug + heading + french label) in locked visual order
- `const BIBLIO = [...]` — EMPTY for now, filled by T-03-06
- Helper functions:
  - `getFreshnessClass(isoDate)` → returns `'fresh' | 'warning' | 'alert'` based on Date diff in days vs `Date.now()`
  - `escapeHtml(str)` → defensive escape (defense-in-depth; all strings are author-controlled but defense is cheap)
  - `formatDateFR(isoDate)` → returns `"15 mai 2026"` from `"2026-05-15"`
- `renderCards()` function:
  - Sort BIBLIO by `lastChecked` desc (per D-04): `BIBLIO.sort((a,b) => b.lastChecked.localeCompare(a.lastChecked))`
  - For each category in BIBLIO_CATEGORIES: filter BIBLIO by `category`, build `<section><h2><ul><li><a><article>...` markup
  - Mount via single `document.getElementById('biblio-grid').innerHTML = htmlString` (BIBLIO-02)
- `DOMContentLoaded` listener calls `renderCards()` exactly once

**Constraints:**
- Single innerHTML mount (BIBLIO-02).
- No per-card DOM mutation.
- No external lib.
- All `<a>` carry `target="_blank"` + `rel="noopener noreferrer"` (BIBLIO-07).

**Verification:** open page in browser, DevTools console should be clean, `#biblio-grid` should render 5 empty sections (no cards yet).

**Commit:** `✨ Phase 3: renderCards() skeleton + 5 empty category sections (BIBLIO-01, BIBLIO-02)`

---

### T-03-06 — Fill `BIBLIO[]` with 35 cards (BIBLIO-03 + BIBLIO-04 + BIBLIO-05 + BIBLIO-06 + BIBLIO-07 + BIBLIO-09)

**Files:** `qhse-cesi/index.html` (EDIT — extend the `BIBLIO` array in inline `<script>`)

**Adds 35 card objects** from `03-SEED-CANDIDATES.md` §Owner-approved 35:
- 7 officiel (RNCP, CESI Bordeaux, Légifrance R4121-1, Légifrance L4121-1, INRS ED 6322, INRS TMS, INRS routier)
- 7 communauté (r/cesi, r/cesi QHSE, r/cesi Bachelor, LinkedIn CESI Bordeaux, Diplomeo avis, Studyrama forum, YouTube CESI Officiel)
- 7 pédagogique (INRS YouTube, FUN-MOOC, INRS ED 6098, INRS RPS, INRS chimique, OPPBTP, EU-OSHA)
- 7 annales (Studocu CESI, Studocu Bachelor QHSE, Annabac DUERP, MASE, SST INRS, ICSI, BARPI)
- 7 outil-pro (AFNOR Boutique, Préventica, Apec HSE, Apec Qualité, FT H1502, FT H1302, CARSAT Aquitaine)

**Each card MUST include** (per BIBLIO-04 schema):
- `id` (kebab-case: `officiel-rncp-41446`, `communaute-reddit-cesi`, etc.)
- `title`, `url`, `description`, `category`, `source_type`, `tags[]`, `priority`, `lastChecked: "2026-05-15"`
- `archive_url` (mandatory on officiel high-value: RNCP, CESI Bordeaux, Légifrance × 2, INRS ED 6322; optional elsewhere)
- `note` (mandatory on communauté — default: `"Lire avec recul — témoignage individuel, non vérifié."` Optional elsewhere.)

**Verification:**
- `grep -c "id:" qhse-cesi/index.html` returns 35+ (after subtracting other id: occurrences)
- Each card category matches one of the 5 locked slugs
- Each communauté card has a non-empty `note`
- Each officiel high-value card has a non-empty `archive_url`

**Commit:** `✨ Phase 3: 35 Biblio cards filled in BIBLIO[] (BIBLIO-03 satisfied, V1 closes)`

---

### T-03-07 — Footer derniere_maj refresh (POLICY-04)

**Files:** `qhse-cesi/index.html` (EDIT — footer `<time>` element)

**Change:** `<time datetime="2026-05-14">14 mai 2026</time>` → `<time datetime="2026-05-15">15 mai 2026</time>` (or to the actual ship date if different).

**Verification:** `grep -E "datetime=\"2026-05-15\"" qhse-cesi/index.html` returns 1 hit.

**Commit:** `✨ Phase 3: footer derniere_maj → 2026-05-15 (POLICY-04)`

---

### T-03-08 — Owner-verify gate

**Status:** ⏸ pending after T-03-02..07 ship.

**Live URL:** `https://mes-apps-claude.vercel.app/qhse-cesi/`

**Mini-checklist** (owner runs on phone + desktop):

| # | Check | Pass? |
|---|-------|-------|
| 1 | 5 `<section id="biblio-*">` rendered in order officiel → communaute → pedago → annales → pro | [ ] |
| 2 | Each section shows exactly 7 cards | [ ] |
| 3 | Each card row has `[BADGE]` + title + 2-3 line description + footer `domain  date` | [ ] |
| 4 | Badge surface uses `--accent` (brass), text is one of OFFICIEL / PÉDAGOGIQUE / COMMUNAUTÉ / OUTIL-PRO / ANNALES | [ ] |
| 5 | `lastChecked` dates colored by age (today's dates = neutral) | [ ] |
| 6 | Communauté cards show a `note` italic in `--ink-2` saying "Lire avec recul" or similar | [ ] |
| 7 | Officiel cards on RNCP / CESI Bordeaux / Légifrance × 2 / INRS ED 6322 have an `archive_url` (verify in source or via dev tools — there should be a Wayback fallback link somewhere on the card OR in the card data) | [ ] |
| 8 | Click any card opens its URL in a new tab (`target="_blank"`) and the referrer is suppressed (`rel="noopener noreferrer"`) | [ ] |
| 9 | Card sort: most recently `lastChecked` card is at top of its category | [ ] |
| 10 | Footer shows `15 mai 2026` (or ship date) and links to GitHub repo | [ ] |
| 11 | `qhse-cesi/LEGAL.md` exists and mentions CPI L122-5 + no-PDF policy | [ ] |
| 12 | `.planning/V2_BACKLOG.md` exists and includes UX-01..08 + TOOL-01..03 | [ ] |
| 13 | `git ls-files '*.pdf'` (under qhse-cesi/) returns empty (POLICY-03) | [ ] |
| 14 | Page passes Lighthouse Accessibility ≥ 95 on live URL | [ ] |
| 15 | axe DevTools: zero critical | [ ] |
| 16 | Existing QHSE Trainer at `https://mes-apps-claude.vercel.app/` still loads (INFRA-03) | [ ] |

**Pass criterion:** all 16 ✓ → V1 complete, milestone closes.

---

## Phase-level verification gates (P-N)

| Gate | Check | Failing implies |
|------|-------|-----------------|
| P1 | `grep -c 'id="biblio-' qhse-cesi/index.html` ≥ 5 (after T-03-05) | BIBLIO-01 incomplete |
| P2 | `grep -c 'category:' qhse-cesi/index.html` ≥ 35 (after T-03-06) | BIBLIO-03 incomplete |
| P3 | `grep -c 'target="_blank" rel="noopener noreferrer"' qhse-cesi/index.html` ≥ 43 (8 Phase 2 + 35 Phase 3) | BIBLIO-07 incomplete |
| P4 | `grep -c 'oklch(0%\|#000' qhse-cesi/index.html` as a SURFACE color = 0 (D-05 relaxed) | shadow invariant violated |
| P5 | `test -f qhse-cesi/LEGAL.md` | POLICY-01 incomplete |
| P6 | `test -f .planning/V2_BACKLOG.md` | POLICY-02 incomplete |
| P7 | `git ls-files 'qhse-cesi/*.pdf'` empty | POLICY-03 violated |
| P8 | `grep 'datetime="2026-05-15"' qhse-cesi/index.html` returns 1 | POLICY-04 incomplete |
| P9 | `wc -l qhse-cesi/index.html` ≤ 1100 | file-size cap hit |
| P10 | Live URL responds 200 OK after final push | deploy broken |

---

## Risk register

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Card markup adds > 400 lines, file blows 1100-line cap | Medium | Each card object ~7 lines; 35 × 7 = 245 lines for BIBLIO[] + ~50 for renderCards + ~100 for CSS = ~395 lines budget. Within cap. |
| Some seed URLs 404 between research and exec | Low | Researcher probed URLs 2026-05-15 same day; cards include `archive_url` fallback on officiel high-value. |
| Communauté card descriptions feel promotional (LinkedIn, Reddit) | Medium | Copywriting Contract from UI-SPEC: factual not promotional. `note` field carries the "lire avec recul" caveat. |
| WCAG AA contrast on badge surface fails | Low | `--accent` text on dark surface tested in Phase 1; reuse the same pattern. |
| Cap exhaustion mid-phase | Medium | Tasks 02-07 sized for ≤ 1 commit each; if cap hits, completed tasks are pushed and resumable. |

---

*Phase 03 plan written: 2026-05-15 inline by orchestrator (Opus) after owner replied "j'approuve tout" — bypasses subagent spawn to conserve token budget.*
