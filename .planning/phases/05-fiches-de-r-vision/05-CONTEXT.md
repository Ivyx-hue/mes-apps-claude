# Phase 5: Fiches de révision — Context

**Gathered:** 2026-05-27
**Status:** Ready for planning
**Source:** /gsd-discuss-phase 5 (3 gray areas resolved)
**Phase requirements:** FICHE-01, FICHE-02

<domain>
## Phase Boundary

Ship a **Fiches de révision** mode inside `#panel-fiches` of `outils.html` — one printable structured revision sheet per BANK theme, condensed sourced summary of the Hub content, inline citations consistent with the Découverte v1.0 provenance style, printable via the existing `@media print` rules in `chassis.css` (Section 7, lines 1460+).

**In scope:**
- DOM scaffold for `#panel-fiches` replacing the existing placeholder.
- An IIFE inside `outils.html` (same pattern as Phase 3 `.fc-*` and Phase 4 `.qz-*` IIFEs) that lists/picks/renders fiches and integrates with the existing print rules.
- A `.fi-*` CSS namespace block appended to `chassis.css @layer components` (additive, mirrors P3/P4 chassis discipline).
- 15 fiches authored — one per BANK theme (see Décision DEC-01) — each following a fixed template (DEC-03), sourced from a hybrid of new long-form intro prose + a "Questions clés" recap of relevant BANK items (DEC-02).
- Print stylesheet refinement only as needed: page-break rules per fiche, hide non-active panels and Hub nav. The 90% of print discipline is already shipped in `chassis.css` § 7.

**Out of scope (deferred):**
- Per-bloc RNCP fiches (alternative découpage rejected — see `<deferred>`).
- Recto-verso A4 split layout (alternative structure rejected — see `<deferred>`).
- Free-form per-fiche structure (alternative structure rejected — see `<deferred>`).
- Pure BANK concatenation OR pure new-prose authoring (alternative sources rejected — see `<deferred>`).
- A SPA-style search/index across fiches (deferred to v2.1 if asked).
- Modifying or adding to the BANK or to Découverte/Biblio content (frozen by Phases 2 + v1.0).
- Touching root QHSE Trainer (frozen sibling — D-V2-01 invariant).

</domain>

<decisions>
## Implementation Decisions

### Découpage des fiches — DEC-01: 1 fiche par thème BANK (15 fiches)

15 fiches, one per BANK theme, slugs matching the existing 16-option theme picker used by QCM (Plan 04-02) and Tests blancs (Plan 04-03) **minus** `all`:

```
duerp · principes-generaux · iso-9001 · iso-14001 · iso-45001 · tms ·
risque-routier · risque-chimique · rps · espaces-confines · acronymes ·
metiers · calendrier · icpe-seveso · rncp
```

**Why this découpage (not "1 par bloc RNCP" suggested by the placeholder):** the existing theme vocabulary is the project's working unit. Phases 2/3/4 picker, BANK filtering, prefs (`lastTheme`, `lastQcmTheme`, `lastTestTheme`) all use this 15-theme axis. Aligning Fiches on the same axis keeps the four study modes mentally interchangeable: pick `iso-45001` in Flashcards → switch to QCM → switch to Tests blancs → switch to Fiches and read the matching synthesis. Per-bloc RNCP fiches would re-cut the same content along a second axis and force the owner to mentally translate between two vocabularies.

**Implication for navigation:** the Fiches picker uses the same 15-theme list, minus the `all` option (a single global fiche makes no sense; the user picks one theme at a time). This becomes DEC-04 (Claude's Discretion) and matches the Phase 3/4 single-fiche-at-a-time render pattern.

### Source du contenu — DEC-02: Hybride intro long-form + "Questions clés" BANK

Each fiche has **two main content blocks**:

1. **Intro long-form** — newly-authored prose written in the Découverte v1.0 style (dense paragraphs, inline source citations with `<authority> — <ref>` syntax, links matching the Biblio safety pattern `target="_blank" rel="noopener noreferrer"`). Anchors the "what is this theme, why does it matter for the Bachelor QHSE" framing. Source claims here MUST cite the same authorities used in BANK (INRS, service-public.fr, ameli, Wikipedia FR for ISO norms, francecompetences.fr for RNCP) — no new authorities introduced.

2. **Questions clés (BANK recycle)** — 5 to 10 selected BANK items from the theme's pool (`window.BANK.filter(i => i.theme === <slug>)`), rendered in Q/R format: `<question stem>` → `<canonical answer>` → `<explanation>` → `<source line>`. Selection is **editorial** (author picks the most exam-relevant items, not algorithmic). Recycles 50% of Phase 2's effort into Phase 5 with zero duplication risk — the same item is used for active recall (QCM/Flashcards) AND passive reading (Fiches). One item may appear in flashcard, QCM, AND fiche surfaces; that's by design.

**Why this hybrid:**
- Pure long-form (rejected): duplicates BANK effort, risks source drift between Découverte/Fiches and BANK.
- Pure BANK concat (rejected): produces hachée prose, redundant with QCM corrections — fiches need narrative scaffolding to read as a single piece.
- Texte minimal + liens (rejected): a "fiche" that just points elsewhere is a Biblio card, not a fiche.

**Implication for the IIFE:** rendering pulls intro prose from a static `FICHES[]` array baked into the IIFE source (or a new `qhse-cesi/fiches-data.js` file mirroring `outils-data.js` — to be decided at planning, no architectural difference) and pulls the "Questions clés" by `window.BANK.filter(...)`. **No new SM-2 mutation, no `qhse-scores-v1` write.** Fiches are pure reading content (D-V2-04 read-only invariant for this surface).

### Structure interne d'une fiche — DEC-03: Template fixe identique sur toutes les fiches

Every fiche uses the same 6-section template, in this order:

1. **TL;DR** — 2-3 sentence summary of what the theme is and why it matters for the exam.
2. **Définitions** — key acronyms, terms, and concepts. Bullet list or `<dl>` definition list. Anchor for cross-fiche consistency (the same acronym, defined the same way everywhere).
3. **Cadre légal / normatif** — relevant Code du Travail articles, ISO norms, INRS dossiers, decrees, etc. With inline source citations.
4. **Démarche / méthode** — actionable steps or the structured approach (e.g. for DUERP: how to build it; for TMS: how to assess and prevent).
5. **Pièges fréquents** — common confusions or exam traps (e.g. "harcèlement moral = L1152-1, pas L1153-1" from the existing RPS QCM distractor learning).
6. **Sources** — bibliography list of every authority cited in the fiche, deduplicated, with full URLs (rendered as footnotes by the existing `chassis.css @media print` rule).

**Why fixed template (not free-form, not recto-verso, not table-dominant):**
- Predictability: the owner knows where to find what across 15 fiches.
- Print parity: same A4 layout everywhere, no surprises in printer preview.
- Scannability: section h2/h3 anchor points enable owner to navigate within a fiche via Ctrl+F in print preview.
- Cross-fiche comparison: easy to scan section 5 (Pièges) across all 15 fiches as a final-week revision tactic.
- The recto-verso alternative was rejected: too rigid for variable-density themes (acronymes has 30+ definitions, calendrier has 1 table); free-form was rejected: loses scannability; table-dominant was rejected: TMS/RPS need contextual prose.

**Section length budget:** each fiche targets 1-2 A4 pages in print preview (default font sizes from `chassis.css @media print`). Hard cap: 3 pages including bibliography. Themes with thin material (e.g. `metiers`, `calendrier`) may run 1 page only — that's fine; consistency in template ≠ consistency in length.

### Claude's Discretion

Areas not in the discussed gray areas, decided by Claude during planning per Phase 3/4 precedent:

- **DEC-04 — Navigation UX inside `#panel-fiches`**: theme picker `<select>` at the top (matching `[data-qz-qcm-theme]` and `[data-qz-test-theme]` shapes from Plans 04-02 + 04-03), single fiche rendered in the main panel at a time, **no** sidebar ToC sticky, **no** accordion-all. `lastFicheTheme` persisted to `qhse-prefs-v1` via merge-safe writer that preserves P3 + Plan 02 + Plan 03 keys. Optional in-fiche ToC (anchors to the 6 template sections) rendered at the top of each fiche. This carries forward the Phase 3/4 panel-scoped IIFE discipline.
- **DEC-05 — IIFE pattern**: same shell as Plans 03 and 04-02/03 — `'use strict'`, `__qzFichesBooted` (or `__fiFichesBooted` — namespace TBD) double-load guard, DCL boot, panel-scoped event listeners, no document-level keydown, no `.innerHTML` on bank/fiche content (createElement + textContent only, Pattern S3 / XSS-safe).
- **DEC-06 — CSS namespace**: a `.fi-*` block appended to `chassis.css @layer components` (after the Phase 4 `.qz-*` block at line 1411), reusing existing chassis tokens (zero new `:root` properties), no animations, no `!important`. Mirrors Plan 04-01's discipline exactly.
- **DEC-07 — Print integration**: chassis.css § 7 (lines 1460+) already handles burger/skip-link hiding, light color-scheme forcing, Fraunces headings, external-URL footnote expansion. Phase 5 adds two new rules only: (a) `#panel-fiches .fi-fiche { page-break-before: always; }` for multi-fiche print runs, (b) hiding the other 3 panels (`#panel-flashcards, #panel-qcm, #panel-tests`) and the tab list when the Fiches panel is active. The "imprimer cette fiche" UX is **Ctrl+P only** (native browser) — no JS `window.print()` button (avoids cluttering the panel; users who print already know the shortcut).
- **DEC-08 — Source line builder**: reused verbatim from Plan 04-02/04-03 — `createElement('code')` for the ref, `createElement('a', { rel: 'noopener noreferrer' })` for the URL, `textContent` for the prose. Same Pattern S3 XSS gate.
- **DEC-09 — `qhse-srs-v1` and `qhse-scores-v1` are NEVER touched by the Fiches IIFE** (read-only surface, like Tests blancs for the SRS store but extended also to scores). Verifiable via verify-quiz.cjs-style snapshot equality if a future Plan 05-XX verify-fiches.cjs is added.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher + planner) MUST read these before planning or implementing.**

### Roadmap + requirements (authoritative scope)
- `.planning/ROADMAP.md` — Phase 5 section (goal + 2 SCs)
- `.planning/REQUIREMENTS.md` — FICHE-01, FICHE-02 (lines 52-54)
- `.planning/V2-ETUDE-SPEC.md` — locked v2.0 scope; "Fiches de révision" paragraph (line 57); D-V2-01..06 invariants

### Prior phase contracts (must not regress)
- `.planning/phases/02-content-bank/02-CONTEXT.md` — `window.BANK` schema + theme slug vocabulary (the 15 themes Fiches consumes)
- `.planning/phases/03-flashcards-srs/03-CONTEXT.md` — `window.SRS` frozen contract (Fiches MUST NOT call `SRS.schedule`); `qhse-prefs-v1` shape (`lastTheme/lastMode/newCardsPerDay`)
- `.planning/phases/04-qcm-tests-blancs/04-CONTEXT.md` — D-V2-03 invariant; merge-safe `writePrefs` pattern; IIFE discipline (DCL boot, double-load guard, panel-scoped listeners); `lastQcmTheme` + `lastTestTheme` keys to preserve
- `.planning/phases/04-qcm-tests-blancs/04-01-PLAN.md` — `.qz-*` CSS namespace template (mirror discipline for `.fi-*`)
- `.planning/phases/04-qcm-tests-blancs/04-02-PLAN.md` §Task 2 — IIFE shell pattern (banner, guard, DCL boot, helpers, event wiring)
- `.planning/phases/04-qcm-tests-blancs/04-04-PLAN.md` — verify-quiz.cjs pattern (if Phase 5 ships a verify gate)

### Runtime source files
- `qhse-cesi/outils.html` — `#panel-fiches` mount point (lines 128-131); ARIA tablist IIFE; existing Phase 3/4 IIFEs as scaffolding analog
- `qhse-cesi/outils-data.js` — `window.BANK` (226 items, 15 themes, frozen)
- `qhse-cesi/srs.js` — `window.SRS` (frozen Phase 3 contract); Phase 5 reads nothing from this, but the file is loaded under Node by any future verify gate
- `qhse-cesi/chassis.css` — `@layer components` (Phase 5 `.fi-*` extension point, immediately after the `.qz-*` block at line 1411); **`@media print` rules at lines 1460-~1500** (already does 90% of FICHE-02 work)

### Découverte v1.0 prose reference (style guide for new intro prose)
- `qhse-cesi/index.html` — `#decouverte` section and its inline citation style (the model Fiches' new long-form intros should mirror; same `<authority> — <ref>` syntax, same link safety, same Fraunces+Inter rhythm)

### Memory + policy
- `feedback_verify_links_before_ship.md` — every new URL cited in fiche intros must be content-verified (real `<title>` + topic match + soft-404 grep) before ship. HTTP-status audits banned.
- `qhse-cesi/LEGAL.md` — no PDF under `/qhse-cesi/`; pedagogical-link-only policy

</canonical_refs>

<specifics>
## Specific Ideas

- **Theme picker DOM**: copy the `<nav class="qz-theme">` + `<label>` + `<select id="qz-fiche-theme-select" data-qz-fiche-theme>` shape from Plans 04-02/04-03, with the 15-option list (no `all`). Use a `.fi-theme` class for namespacing parity.
- **Fiche container DOM**: a single `<article class="fi-fiche" data-fi-active-fiche>` rendered in the main panel area; six `<section>` children per the DEC-03 template, each with a stable `data-fi-section="tldr|definitions|cadre-legal|demarche|pieges|sources"` attribute. Section headings = `<h3>`; sub-headings inside a section = `<h4>` (anchors for the in-fiche optional ToC).
- **Source inline citations** in intro long-form: `(INRS — Dossier risque chimique)` rendered as `<span class="fi-cite"><a href="..." target="_blank" rel="noopener noreferrer">INRS — Dossier risque chimique</a></span>`. The `chassis.css @media print a[href^="http"]::after` rule auto-expands the URL in print.
- **"Questions clés" rendering**: each BANK item becomes a `<details class="fi-qa">` collapsed by default in screen mode (saves vertical space; owner expands what they want to drill), but **forced open in print** via a `@media print { .fi-qa { … } .fi-qa[open] { … } details.fi-qa > summary { … } }` rule (TBD at planning — the existing chassis.css print block doesn't currently handle `<details>`).
- **Default fiche on first load**: `prefs.lastFicheTheme || 'duerp'` (DUERP is the most exam-cited theme per Phase 2 RESEARCH; defaulting there matches "what an alternant opens first on Sunday night"). Falls back gracefully if the slug is stale (renders empty-state or `'duerp'`).
- **In-fiche ToC** (optional, decided at planning): a small `<nav class="fi-toc">` at the top of each fiche listing the 6 sections as anchor links. Cheap to render, sticky-positioned via CSS at the top of the fiche container on viewports ≥48rem. Print-hidden via `chassis.css @media print { nav { display: none } }` (already shipped).
- **Authoring tooling**: the 15 fiches' intro prose may live as a JS array `FICHES = [{slug, title, tldr, intro, ...}]` in a new `qhse-cesi/fiches-data.js` (parallel to `outils-data.js`) wired into `outils.html` via `<script src="./fiches-data.js" defer></script>`. Decision deferred to planning — could also be JS-embedded in the IIFE if the prose stays small.
- **No `q\hse-fiches-v1` or new localStorage key**: Fiches is read-only; only `qhse-prefs-v1.lastFicheTheme` is written (merge-safe pattern from Plans 04-02/03).

</specifics>

<deferred>
## Deferred Ideas (rejected alternatives — record so future-me knows why)

### Découpage alternatives rejected
- **1 fiche par bloc RNCP (4 fiches)** — appealing per the existing placeholder hint, but re-cuts the same content along a second axis the rest of the app doesn't use. Would force the owner to mentally translate `BC02 SMI` ↔ `iso-9001, iso-14001, iso-45001` every time. If RNCP-level review is ever needed, a single `rncp` BANK theme already exists and gets its own fiche under DEC-01.
- **Hybride RNCP + sous-sections par thème** — densest option but combinatorial complexity at authoring time (each thème ends up duplicated across its bloc + standalone fiche).
- **Sélection éditoriale (8-10 fiches)** — would force a hierarchy ("important" vs "less important") that doesn't reflect exam reality where any theme can be tested.

### Source alternatives rejected
- **Pure long-form rédaction** — duplicates Phase 2 effort; risks source-citation drift between Découverte/Fiches and BANK.
- **Pure BANK concat** — produces choppy prose, redundant with QCM corrections that already show answer+explanation+source. Loss of narrative scaffolding.
- **Texte minimal + liens internes** — a "fiche" that just points to Découverte/Biblio is structurally a Biblio card, not a fiche. Removes the value (= "give me a single piece I can print and revise").

### Structure alternatives rejected
- **Recto-verso A4 différencié** — too rigid for variable-density themes. `acronymes` has 30+ definitions and wants the verso for them; `calendrier` has one table and would leave the verso half-empty.
- **Free-form long-form** — loses scannability and cross-fiche comparison.
- **Tableau-récap dominant** — works for `acronymes`/`calendrier`/`rncp` but not for `duerp`/`rps`/`tms` which require contextual prose.

### Out-of-scope ideas captured for v2.1 or backlog
- Full-text search across all 15 fiches (would be useful but is a v2.1 feature — push to `.planning/V2_BACKLOG.md` if asked).
- "Imprimer toutes les fiches en un PDF" button → 15 × 1-3 pages = potentially 30+ pages, browser native print handles this if user selects all panels visible. Skip the button.
- Owner-editable fiche notes (margin annotations saved to localStorage) → out of scope; defeats the "static printable" model.
- Cross-linking between fiches ("voir aussi fiche DUERP") → would be nice; deferrable, planner can add inline `<a href="#panel-fiches" data-fi-target="duerp">` links if cheap.
- A `verify-fiches.cjs` Node gate codifying the FICHE-01/02 contract (snapshot equality on `qhse-srs-v1` + `qhse-scores-v1` from a Fiches IIFE simulation). Decision deferred to planner — likely a Plan 05-04 if Phase 5 follows the 4-plan shape of Phase 4.

</deferred>

---

*Phase: 05-fiches-de-r-vision*
*Context gathered: 2026-05-27 via /gsd-discuss-phase 5*
