# Phase 5: Fiches de révision — Research

**Researched:** 2026-05-27
**Domain:** Static printable revision sheets — vanilla HTML/CSS/JS extension of `outils.html`
**Confidence:** HIGH (entire stack and every required pattern already exists in this repo from Phases 1–4)

## Summary

Phase 5 is a **copy-extend-adapt** phase, not greenfield. Every architectural primitive Phase 5 needs has shipped in Phases 1–4: the IIFE shell, the merge-safe `writePrefs`, the `createElement`+`textContent` XSS-safe source-line builder, the parent-scoped CSS namespace pattern (`#panel-qcm .qz-*`), the `@media print` skeleton that already handles 90% of FICHE-02, and the verify gate scaffold. No new library, no new browser API, no new architectural concept is introduced.

The work breaks into four orthogonal slabs: (1) a `.fi-*` CSS block appended to `chassis.css @layer components` immediately after the `.qz-*` block (line 1411), (2) a `#panel-fiches` DOM scaffold replacing the placeholder at `outils.html:128-131`, (3) a fourth IIFE — `__fiBooted` — appended after the Tests blancs IIFE following the verbatim Phase 4 shell, (4) a new `qhse-cesi/fiches-data.js` containing 15 `window.FICHES[]` entries (one per BANK theme), wired into `outils.html` via `<script src="./fiches-data.js" defer>`. Optionally a fifth slab — `verify-fiches.cjs` mirroring `verify-quiz.cjs` — codifies the read-only invariant (DEC-09).

The largest unknown is **not technical** — it is **content authoring volume**. 15 fiches × 6 sections × authored French prose with verified citations is substantial work and must be batched (the planner should mirror Phase 2's 7-wave batching cadence rather than attempting all 15 fiches in one plan).

**Primary recommendation:** Wave 1 ships the CSS + scaffold + empty `fiches-data.js` skeleton + IIFE. Waves 2–N (one wave per 2–3 fiches, mirroring Phase 2's batch cadence) author the prose. Final wave ships `verify-fiches.cjs` + integration smoke test. **Do not attempt fiche authoring inside the same plan as the IIFE/CSS plumbing** — the verification surfaces are completely different (mechanical for plumbing, link-content-verification for prose).

## User Constraints (from CONTEXT.md)

### Locked Decisions

**DEC-01 — Découpage: 1 fiche per BANK theme = 15 fiches** (slugs: `duerp` · `principes-generaux` · `iso-9001` · `iso-14001` · `iso-45001` · `tms` · `risque-routier` · `risque-chimique` · `rps` · `espaces-confines` · `acronymes` · `metiers` · `calendrier` · `icpe-seveso` · `rncp`). No `all` option.

**DEC-02 — Source du contenu: Hybride** — newly-authored Découverte-style intro prose + a "Questions clés" recap of 5–10 editorially-selected BANK items per theme (via `selectedIds[]`).

**DEC-03 — Structure interne: Template fixe à 6 sections** — TL;DR · Définitions · Cadre légal · Démarche · Pièges fréquents · Sources. Same order, every fiche. Hard cap 3 A4 pages including bibliography.

**DEC-04 — Navigation: theme picker `<select>` + single-fiche-at-a-time render** + in-fiche ToC anchor nav (no sidebar, no accordion). `lastFicheTheme` persisted to `qhse-prefs-v1` via merge-safe writer.

**DEC-05 — IIFE pattern: verbatim Phase 4 shell** — `'use strict'`, `__fiBooted` double-load guard, DCL boot, panel-scoped event listeners, no `document.addEventListener('keydown')`, no `.innerHTML` on bank/fiche content (Pattern S3 / XSS-safe).

**DEC-06 — CSS namespace: `.fi-*` block** appended to `chassis.css @layer components` after the `.qz-*` block (line 1411). Reuses existing chassis tokens (zero new `:root` properties). No animations. No `!important`.

**DEC-07 — Print integration: Ctrl+P only** — no JS `window.print()` button. Two new print rules only: per-fiche `page-break-before` and panel-isolation hide rules.

**DEC-08 — Source line builder: reused verbatim** from `qhse-cesi/outils.html:1226-1248` — `createElement('code')` for ref, `createElement('a', { rel: 'noopener noreferrer' })` for URL, `textContent` for prose. Same Pattern S3 XSS gate.

**DEC-09 — `qhse-srs-v1` and `qhse-scores-v1` are NEVER touched** by the Fiches IIFE (read-only surface). Verifiable via snapshot equality in a future `verify-fiches.cjs`.

### Claude's Discretion

The 9 DEC items already absorbed every discretion area Phase 5 surfaced. Remaining freedoms for the planner:

1. **Plan splitting** — whether to ship as 1 plan (low feasibility given content volume) or 4–7 plans (Phase 2 batching analog).
2. **`fiches-data.js` location decision** — confirm DEC implication "a new `qhse-cesi/fiches-data.js`" vs. inlining the array inside the IIFE. RESEARCH recommends the separate file (see §Architecture Patterns Pattern P2).
3. **Optional in-fiche ToC currentSection highlight** (IntersectionObserver) — UI-SPEC does NOT require this; recommend deferral.
4. **Whether to ship `verify-fiches.cjs`** — recommend yes (mirrors Phase 3/4 discipline; codifies DEC-09).
5. **Plan-2 onwards content batching cadence** — mirror Phase 2's batches A–F structure.

### Deferred Ideas (OUT OF SCOPE)

- Per-bloc RNCP fiches (re-cut along a second axis the rest of the app doesn't use).
- Recto-verso A4 split (too rigid for variable-density themes).
- Free-form per-fiche structure (loses scannability).
- Pure BANK concatenation OR pure new-prose authoring (rejected source models).
- Full-text search across all 15 fiches (defer to v2.1 backlog).
- "Imprimer toutes les fiches" button (browser-native multi-print handles it).
- Owner-editable margin annotations saved to localStorage (defeats static printable model).
- Modifying or adding to BANK or Découverte/Biblio content (frozen by Phases 2 + v1.0).
- Touching root QHSE Trainer at repo root (frozen sibling — D-V2-01 invariant).
- Cross-linking between fiches ("voir aussi fiche DUERP") — deferrable; planner MAY add cheap `<a href="#panel-fiches" data-fi-target="duerp">` links if effort is trivial.

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FICHE-01 | User can read one structured révision sheet per major theme — condensed sourced summary with inline citations, Découverte-style provenance | UI-SPEC §Layout (composition diagram lines 217–296); §Copywriting (6 fixed section headings); §Data Contract (FICHES[] schema lines 497–512). Content data flow: `window.FICHES.find(f => f.slug === selectedTheme)` → IIFE renders 6-section template + `selectedIds[]` resolves to BANK Questions clés via `selectedIds.map(id => window.BANK.find(b => b.id === id))`. |
| FICHE-02 | Fiches are printable with clean print stylesheet (reusing v1.0 print rules — sticky nav removed, link URLs as footnotes) | Chassis `@media print` block (lines 1460–1489) **already** handles 8 of 11 rules Phase 5 needs (header hide, light scheme, Fraunces headings, external link footnote expansion, `h2::after` hide, `section break-inside`, etc.). UI-SPEC §Print Contract enumerates the exact 7 new rules to append (lines 402–457). |

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Static fiche content (15 fiches × 6 sections) | Static file (`fiches-data.js`) | — | Hand-authored at commit time; no runtime generation per PERSIST-02 |
| Fiche selection state (which theme is active) | Browser (in-memory + localStorage) | — | Single-user, no server; mirrors Phase 3/4 pattern |
| Fiche render (DOM construction) | Browser (IIFE) | — | Same tier as Phase 3/4 — inline `<script>` inside `outils.html` |
| BANK Questions clés resolution | Browser (IIFE reads `window.BANK`) | — | `window.BANK` is a global from `outils-data.js` defer-loaded by `<script src>` |
| Theme preference persistence | Browser localStorage (`qhse-prefs-v1.lastFicheTheme`) | — | Merge-safe write only; reads on boot |
| Print rendering | Browser CSS (`@media print` in `chassis.css`) | — | No JS involved; pure stylesheet extension |
| Verification (DEC-09 invariant) | Node CLI gate (`verify-fiches.cjs`, optional) | — | Mirrors `verify-quiz.cjs`; built-ins only, no npm deps |
| Deployment | GitHub Actions → Vercel | — | Existing pipeline at `.github/workflows/deploy.yml`; do not modify |

No backend tier. No CDN tier (Google Fonts and Lucide deliberately not used in Phase 5 — `<details>` triangle is browser-native).

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| HTML5 / ES2024 vanilla JS | living standard | DOM + IIFE | Project invariant (CLAUDE.md "no build step"); mirrors Phases 1–4 verbatim |
| Modern CSS (`@layer`, nesting, `light-dark()`, `:has()`, container queries) | Baseline 2024 | All styling | Already in use in `chassis.css`; no new feature needed |
| Browser `<details>/<summary>` | HTML5, Baseline since 2022 | Questions clés expand/collapse | Zero JS, zero a11y work, browser-native keyboard handling |
| Browser `position: sticky` | Baseline since 2020 | In-fiche ToC sticky on desktop | Zero JS, compositor-driven |
| Browser native anchor links + `scroll-behavior: smooth` | Baseline since 2020 | ToC navigation | Already enabled in `chassis.css :92` (`html { scroll-behavior: smooth; scroll-padding-top: var(--header-h); }`) |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Google Fonts CSS2 API | n/a (HTTP) | Fraunces + Inter + JetBrains Mono | **Already loaded** by `outils.html:10-13`; do not re-add |
| Node built-ins (`assert`, `path`) | Node 18+ | `verify-fiches.cjs` gate | Mirrors `verify-quiz.cjs:1-12`; no npm deps |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vanilla IIFE | Alpine.js / Petite-Vue via CDN | BANNED by CLAUDE.md tech stack ("Avoid Alpine.js / htmx / petite-vue"). Phase 5 has near-zero interactive state (one `<select>`, native `<details>`). |
| Inline `<script>` in `outils.html` | External `fiches.js` | Phase 5 IIFE will be ~300–500 LOC. Inline keeps the single-file-per-page pattern consistent with P3/P4. **Verdict: stay inline.** `fiches-data.js` is the only new external file. |
| `<script src="./fiches-data.js" defer>` for content | Inline `FICHES` array inside IIFE | Separate file mirrors `outils-data.js` pattern; allows authoring waves to touch only `fiches-data.js` without diff noise in `outils.html`. **Verdict: separate file.** |
| Verify gate via Node | Browser-based smoke test | Phase 3/4 precedent: every read/write contract gets a Node gate that exits 0/1. Mirrors `verify-srs.cjs` + `verify-quiz.cjs`. |

**Installation:** none. Zero new npm packages. Zero new CDN dependencies. Zero new global JS files except `qhse-cesi/fiches-data.js`.

## Package Legitimacy Audit

**Not applicable.** Phase 5 installs zero external packages. The entire dependency surface is:
- Browser-native APIs (HTML5, ES2024, CSS L4)
- Google Fonts (already loaded from Phase 1 via `<link>` in `outils.html:10-13`)
- Node built-ins (`assert`, `path`) for the optional verify gate

No npm registry interaction at any point. CLAUDE.md project invariant: "No build step. No npm dependencies." [VERIFIED: project CLAUDE.md, also enforced by `outils.html` already loading via `<script src>` not `import`]

## Architecture Patterns

### System Architecture Diagram

```
                  outils.html (Phase 5 mounted in #panel-fiches)
                              ▲
                              │ inline <script> IIFE
                              │ (~300–500 LOC, after Tests IIFE)
                              ▼
        ┌─────────────────────────────────────────────┐
        │  __fiBooted IIFE (DCL-deferred boot)        │
        │  Pre-flight: BANK + FICHES presence guards  │
        └─────────────────────────────────────────────┘
            │             │              │           │
            ▼             ▼              ▼           ▼
       readPrefs()   onThemeChange   renderFiche  Empty/Error
       (merge-safe)     (writePrefs    (DOM clear   states
                         + render)     + appendChild  (.fi-empty
                                       per section)   / .fi-error)
            │                              │
            ▼                              ▼
   localStorage:                    window.FICHES.find(slug)
   qhse-prefs-v1                    + window.BANK.filter(...)
   (lastFicheTheme)                  for selectedIds[] resolution
                                              │
                                              ▼
                                    DOM tree per UI-SPEC:
                                    article.fi-fiche
                                      > header (title + meta)
                                      > section × 6 (TL;DR / Defs /
                                        Cadre / Démarche [+ QA list] /
                                        Pièges / Sources)

  Loaded by outils.html via <script src defer> in this order:
    1. outils-data.js     → window.BANK   (existing, Phase 2)
    2. srs.js             → window.SRS    (existing, Phase 3; Phase 5 reads nothing)
    3. fiches-data.js     → window.FICHES (NEW, Phase 5)
    4. Inline IIFEs       (existing P3/P4 + NEW Fiches IIFE)

  Print path: pure CSS, no JS.
    Ctrl+P → browser triggers @media print → chassis.css §7 rules apply
           → existing rules + 7 new Phase 5 rules per UI-SPEC §Print Contract
```

### Component Responsibilities

| File | Responsibility | Change Scope |
|------|---------------|--------------|
| `qhse-cesi/outils.html:10-17` (head `<script src>`s) | Add `<script src="./fiches-data.js" defer></script>` after the `srs.js` line | **EDIT — 1 line added** |
| `qhse-cesi/outils.html:128-131` (#panel-fiches placeholder) | Replace placeholder with full scaffold DOM per UI-SPEC §Composition (theme picker + ToC + fiche article container) | **EDIT — ~30 lines replacing 4** |
| `qhse-cesi/outils.html` (after Tests IIFE, line ~1957) | Append new `__fiBooted` IIFE | **EDIT — ~300–500 lines appended** |
| `qhse-cesi/chassis.css:1411` (end of `.qz-*` block, inside `@layer components`) | Append `.fi-*` CSS namespace block per UI-SPEC §Layout / §Color / §Typography | **EDIT — ~150–250 lines appended inside the existing `@layer components { }` brace** |
| `qhse-cesi/chassis.css:1489` (end of `@media print` block) | Append 7 new print rules per UI-SPEC §Print Contract | **EDIT — ~30 lines appended inside the existing `@media print { }` brace** |
| `qhse-cesi/fiches-data.js` | NEW FILE — `window.FICHES[]` array of 15 fiche objects per UI-SPEC §Data Contract schema | **NEW — ~1500–2500 lines (similar density to `outils-data.js`)** |
| `.planning/phases/05-fiches-de-r-vision/verify-fiches.cjs` (optional) | NEW FILE — Node gate codifying DEC-09 read-only invariant + FICHES schema + selectedIds resolvability | **NEW — ~250–350 lines mirroring `verify-quiz.cjs`** |

### Recommended Project Structure

No new directory. All changes within existing `qhse-cesi/` and `.planning/phases/05-fiches-de-r-vision/`:

```
qhse-cesi/
├── outils.html       # EDIT — scaffold + IIFE + script src
├── outils-data.js    # READ-ONLY (Phase 2 frozen)
├── srs.js            # READ-ONLY (Phase 3 frozen) — Phase 5 reads NOTHING
├── chassis.css       # EDIT — .fi-* block + 7 print rules
├── fiches-data.js    # NEW — window.FICHES[]
└── LEGAL.md          # READ-ONLY

.planning/phases/05-fiches-de-r-vision/
├── 05-CONTEXT.md          # frozen (DEC-01..DEC-09)
├── 05-UI-SPEC.md          # frozen (approved 2026-05-27)
├── 05-DISCUSSION-LOG.md   # frozen
├── 05-RESEARCH.md         # THIS FILE
├── 05-PATTERNS.md         # next agent (gsd-pattern-mapper) — recommended
├── 05-XX-PLAN.md          # gsd-planner output
└── verify-fiches.cjs      # optional, if planner ships a verify gate
```

### Pattern P1: IIFE Shell — VERBATIM from Phase 4

Phase 5 IIFE follows the **exact** Phase 4 QCM/Tests shell. Adapt only the names; do not invent variations.

```javascript
// Source: qhse-cesi/outils.html:914-947 (QCM IIFE), tested in production
<script>
  /* ============ IIFE: Fiches de révision — read-only fiche reader ============ */
  /* No globals, no inline on* handlers, no document-level keydown. Phase 5 / Plan 05-XX. */
  (() => {
    'use strict';

    // Double-load guard — unique guard name per IIFE
    if (window.__fiBooted) return;
    window.__fiBooted = true;

    // Inline scripts execute during HTML parsing — BEFORE deferred external
    // scripts (outils-data.js, fiches-data.js) finish evaluating. Defer the IIFE
    // body until DOMContentLoaded so window.BANK and window.FICHES are populated.
    // (Same race-condition hotfix pattern as commit 0553899.)
    function boot() {
      const panel = document.getElementById('panel-fiches');
      if (!panel) {
        console.warn('[Fiches] #panel-fiches not found — cannot boot view.');
        return;
      }

      if (!window.BANK || !Array.isArray(window.BANK) ||
          !window.FICHES || !Array.isArray(window.FICHES)) {
        // Graceful degradation — inline error in panel
        const errEl = document.createElement('p');
        errEl.className = 'fi-error';
        errEl.textContent = 'Impossible de charger les données. Recharge la page ou vérifie que outils-data.js et fiches-data.js sont bien servis.';
        panel.appendChild(errEl);
        console.error('[Fiches] BANK or FICHES missing — cannot boot view.',
          { BANK: !!window.BANK, FICHES: !!window.FICHES });
        return;
      }

      // ... pickFicheBySlug, renderFiche, onThemeChange, wire events ...
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
      boot();
    }
  })();
</script>
```

**Why this is the only acceptable shape:**
- The DCL deferral is the **hotfix from commit `0553899`** for the race condition where inline scripts run before deferred external scripts. Phase 3 originally shipped without this and broke. Do not omit.
- The guard name `__fiBooted` is namespace-distinct from `__fcViewBooted` (P3) and `__qzQcmBooted` / `__qzTestsBooted` (P4). Two IIFEs with the same guard silently no-op the second one.
- Pre-flight guard is **mandatory** — both BANK and FICHES presence + Array.isArray are checked. Graceful degradation renders an error message, never throws.
- `window.SRS` is **never read** (DEC-09; Fiches is read-only).

### Pattern P2: `fiches-data.js` Schema — mirrors `outils-data.js`

```javascript
// Source: synthesized from UI-SPEC §Data Contract (lines 497-512) + outils-data.js header
/* qhse-cesi/fiches-data.js
 * Fiches de révision — Phase 5.
 * window.FICHES: array of 15 revision-sheet objects, one per BANK theme (DEC-01).
 * Schema: { slug, title, tldr, definitions[], cadreLegal, demarche, selectedIds[], pieges[], sources[] }
 * Consumed by: P5 Fiches IIFE in outils.html.
 * DO NOT import, require, or bundle — loaded via <script src> in outils.html.
 *
 * Idempotent double-load guard (WR-04 pattern from outils-data.js:14-18).
 */
if (window.FICHES && window.FICHES.length) {
  if (typeof console !== 'undefined' && console.warn) {
    console.warn('fiches-data.js loaded twice — keeping the first FICHES');
  }
} else {
window.FICHES = [
  {
    slug: 'duerp',
    title: 'DUERP',
    tldr: "Le Document Unique d'Évaluation des Risques Professionnels (DUERP) …",
    definitions: [
      { term: 'DUERP', value: "Document Unique d'Évaluation des Risques Professionnels …" },
      // …
    ],
    cadreLegal: "<p>L'obligation est posée par <span class=\"fi-cite\">L4121-1 du Code du travail …</span></p>",
    demarche: "<p>Étape 1 : <strong>unités de travail</strong> …</p>",
    selectedIds: [
      'duerp-flashcard-001', 'duerp-flashcard-002', 'duerp-qcm-001',
      // 5–10 ids editorially picked from BANK.filter(i => i.theme === 'duerp')
    ],
    pieges: [
      "R4121-1 (DUERP) ≠ L4121-3 (mise à jour) ≠ L4121-1 (obligation générale).",
      // …
    ],
    sources: [
      { authority: 'INRS', ref: 'Dossier DUERP', url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html' },
      { authority: 'Légifrance', ref: 'R4121-1', url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000023795562' },
      // …
    ],
  },
  // … 14 more fiches, one per BANK theme slug
];
}
```

**Schema invariants (the planner MUST enforce in `verify-fiches.cjs` if shipped):**
- `FICHES.length === 15`
- Every `slug` ∈ the 15 BANK theme slugs (no `'all'`, no novel slugs)
- Every `selectedIds[i]` exists in `window.BANK` AND its `theme === fiche.slug` (cross-reference integrity)
- Every `sources[i].url` content-verified per `feedback_verify_links_before_ship.md` (real `<title>` + topic match + soft-404 grep)
- `selectedIds.length` ∈ [5, 10] per UI-SPEC

### Pattern P3: Source Line Builder — VERBATIM port

```javascript
// Source: qhse-cesi/outils.html:1226-1248 (QCM IIFE renderReveal source-line block)
// Reuse for: .fi-qa-source elements AND .fi-cite inline citations inside prose.
// Reuse for: .fi-sources-list <li> bibliography entries.

function appendSourceLine(targetEl, src) {
  if (!src) return;
  targetEl.appendChild(document.createTextNode(src.authority));
  if (src.ref) {
    targetEl.appendChild(document.createTextNode(' — '));
    const codeEl = document.createElement('code');
    codeEl.textContent = src.ref;
    targetEl.appendChild(codeEl);
  }
  if (src.url && src.url.startsWith('http')) {
    targetEl.appendChild(document.createTextNode(' '));
    const a = document.createElement('a');
    a.href = src.url;
    a.textContent = src.url;
    a.rel = 'noopener noreferrer';
    a.target = '_blank';
    targetEl.appendChild(a);
  }
}
```

**Why verbatim:** This builder is XSS-safe via `textContent` only, ships `rel="noopener noreferrer"` to neutralize `target="_blank"` tabnabbing, and is already proven across 92 QCM source-line renders in Phase 4 production. Inventing a Phase 5 variant would be regression-prone.

### Pattern P4: Merge-Safe `writePrefs` — VERBATIM from Phase 4

```javascript
// Source: qhse-cesi/outils.html:987-996 (QCM IIFE writePrefs)
// Pattern S2 / merge-safe — preserves P3 keys (lastTheme, lastMode, newCardsPerDay)
// and P4 keys (lastQcmTheme, lastTestTheme) when Phase 5 writes lastFicheTheme.

function writePrefs(partial) {
  try {
    const raw = localStorage.getItem('qhse-prefs-v1');
    const existing = raw ? JSON.parse(raw) : {};
    const merged = Object.assign({}, existing, partial);
    localStorage.setItem('qhse-prefs-v1', JSON.stringify(merged));
  } catch (e) {
    console.warn('[Fiches] writePrefs failed:', e.message);
  }
}

const DEFAULT_PREFS = { lastFicheTheme: 'duerp' };

function readPrefs() {
  try {
    const raw = localStorage.getItem('qhse-prefs-v1');
    if (!raw) return Object.assign({}, DEFAULT_PREFS);
    const parsed = JSON.parse(raw);
    return {
      lastFicheTheme: (typeof parsed.lastFicheTheme === 'string')
        ? parsed.lastFicheTheme
        : DEFAULT_PREFS.lastFicheTheme
    };
  } catch (e) {
    console.warn('[Fiches] readPrefs failed:', e.message);
    return Object.assign({}, DEFAULT_PREFS);
  }
}
```

**Why merge-safe:** A naive `setItem('qhse-prefs-v1', JSON.stringify({lastFicheTheme: ...}))` would **silently delete** the Phase 3 + Phase 4 keys. The merge-safe writer is the contract `verify-quiz.cjs` group (d) already enforces; `verify-fiches.cjs` should extend it to assert `lastTheme`, `lastMode`, `newCardsPerDay`, `lastQcmTheme`, `lastTestTheme`, AND `lastFicheTheme` survive a Phase 5 write.

### Pattern P5: CSS Namespace — VERBATIM from Phase 4

```css
/* Source: qhse-cesi/chassis.css:883-1411 (.qz-* block, full reference) */
/* Append the .fi-* block immediately after line 1411, INSIDE @layer components { } */

@layer components {
  /* … existing reset, base, .fc-*, .qz-* blocks … */

  /* ============ Phase 5 — Fiches de révision (.fi-*) ============ */

  #panel-fiches .fi-theme,
  #panel-fiches .fi-theme label {
    /* parent-selector scoped — every selector starts with #panel-fiches */
  }

  #panel-fiches .fi-fiche {
    background: var(--bg-2);                /* DEC reuse — no new token */
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    /* … per UI-SPEC §Layout */
  }

  /* … 6-section styling, ToC, fi-qa, fi-cite, fi-sources-list, fi-empty, fi-error … */
}
```

**Discipline (DEC-06 + UI-SPEC §Scoping rule, both binding):**
- Every selector starts with `#panel-fiches` (parent scoping) — never a bare `.fi-*`.
- Zero new `:root` custom properties.
- Zero `!important` (except where required by the print panel-isolation rules, mirroring chassis line 1463 precedent).
- No animations / transitions.
- Block is **purely additive** — diff must show 0 deletions in chassis.css.

### Pattern P6: In-Fiche ToC — Anchor IDs + scroll-margin-top

In-fiche ToC uses **stable section `id`s** baked into the rendered DOM:

```html
<section id="fi-s-tldr" data-fi-section="tldr">…</section>
<section id="fi-s-defs" data-fi-section="definitions">…</section>
<section id="fi-s-cadre" data-fi-section="cadre-legal">…</section>
<section id="fi-s-demarche" data-fi-section="demarche">…</section>
<section id="fi-s-pieges" data-fi-section="pieges">…</section>
<section id="fi-s-sources" data-fi-section="sources">…</section>
```

```css
/* chassis.css ALREADY provides scroll-padding-top */
/* :92  html { scroll-behavior: smooth; scroll-padding-top: var(--header-h); } */
/* No additional scroll-margin-top needed — the chassis html-level rule covers it. */
```

**ID collision risk:** Because only ONE fiche is in the DOM at a time (DEC-04 / UI-SPEC §Composition: "instant DOM replace ... only one fiche is in the DOM at a time"), the same six IDs (`fi-s-tldr`, `fi-s-defs`, etc.) can be reused across all 15 fiches without collision. **No need to namespace IDs by slug** (e.g., `fi-s-duerp-tldr`). This is the correct simpler choice. [VERIFIED: UI-SPEC line 331 "only one fiche is in the DOM at a time"]

**IntersectionObserver "current section" highlight:** UI-SPEC explicitly does NOT require this for V1 (the ToC is described as a passive anchor nav with hover/focus states only). Defer to v2.1.

### Pattern P7: `<details>` Forced-Open in Print

```css
/* Source: synthesized from UI-SPEC §Print Contract (lines 425-432) */
@media print {
  /* … existing chassis §7 rules … */

  /* Force all Questions clés <details> open — readability in paper */
  #panel-fiches details.fi-qa { display: block; }
  #panel-fiches details.fi-qa > summary {
    display: block;
    font-weight: 600;
    list-style: none;            /* remove disclosure triangle */
  }
  #panel-fiches details.fi-qa > summary::before { content: none; }  /* remove CSS ▸ triangle */
}
```

**Why not `[open]` attribute injection from JS:** would be a write side-effect on theme change (open state varies per session); CSS forcing display semantics is cleaner and survives user reload. The chassis `@media print` block already has the discipline of CSS-only print transforms — no JS triggers `window.print()` (DEC-07).

### Anti-Patterns to Avoid

- **Bare `.fi-*` selectors** (without `#panel-fiches` prefix) — pollutes other panels and violates UI-SPEC §Scoping rule line 33.
- **New `:root` custom properties** — chassis tokens are FROZEN. Use existing tokens or reject the design.
- **`innerHTML` on BANK or FICHES content** — Pattern S3 / XSS rule. Even though content is hand-authored and committed, the discipline matches Phases 3/4. Use `createElement` + `textContent`. Exception: the `cadreLegal` and `demarche` fields MAY use a whitelist setHTML pattern (UI-SPEC line 514) but the IIFE must own the whitelist (`<p>`, `<strong>`, `<em>`, `<span class="fi-cite">`, `<a>`, `<code>`, `<ul>`, `<li>` only) and reject any other tags via parse-and-filter.
- **Document-level keydown listeners** — same discipline as P3/P4. All listeners scoped to `#panel-fiches`.
- **Calling `window.SRS.schedule()`** or writing to `qhse-srs-v1` / `qhse-scores-v1` — violates DEC-09. Read-only surface.
- **A `window.print()` button** — DEC-07 / UI-SPEC line 459. Ctrl+P only.
- **Touching the placeholder text-only edit pattern** — Phase 4 Plan 02 §Task 1 established the full-replace pattern (4 placeholder lines → ~30 lines of scaffold). Phase 5 follows this.
- **Inventing a new IIFE shell shape** — every prior phase has had reviewers flag custom variations. The Phase 4 shell is the verbatim template.
- **Sourcing intro prose without inline citations** — Découverte v1.0 invariant carried to Phase 5. Every regulatory claim cites an authority in the format `(INRS — Dossier risque chimique)`.
- **Authoring new external URLs without `feedback_verify_links_before_ship.md` verification** — every new URL must have `verified` date and real `<title>` + topic match + soft-404 grep BEFORE ship.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Expand/collapse for Questions clés | Custom JS toggle + ARIA `aria-expanded` + button event handler | Native `<details>/<summary>` | Browser handles keyboard, ARIA, focus, animation deferral, reduced-motion automatically. UI-SPEC §Keyboard Contract confirms zero custom handlers. |
| Sticky in-fiche ToC | JS `scroll` event + `getBoundingClientRect` calc | CSS `position: sticky; top: var(--header-h)` | Baseline since 2020, compositor-driven, zero JS, zero performance cost. |
| Smooth scroll to ToC anchor | JS `scrollTo({ behavior: 'smooth' })` | Native anchor `<a href="#fi-s-tldr">` + chassis `html { scroll-behavior: smooth }` | Already enabled at `chassis.css:92`. Zero JS. |
| Print stylesheet | JS-driven "print mode" toggle | CSS `@media print { }` extending chassis §7 | The chassis already handles header hide, light scheme, footnote expansion. Phase 5 adds 7 rules max. |
| Theme picker | Custom button group + click handlers + ARIA listbox | Native `<select>` with `change` event | Mirrors P3/P4 picker; zero a11y work; mobile native UI; keyboard arrows handled by browser. |
| Markdown → HTML conversion of intro prose | `marked` / `markdown-it` runtime library | Author content directly as HTML in `fiches-data.js` | CLAUDE.md tech stack explicitly bans runtime markdown libs. Hand-authored HTML strings are committed verbatim; the planner reviews them on commit. |
| Inline regulatory ref pretty-printing (e.g., R4121-1 → "Code du travail Article R. 4121-1") | Custom formatter function | Just type the long form into the prose | 226 BANK items already use the natural French verbose form. No regularization needed. |
| Fuzzy search across fiches | Fuse.js / Lunr.js | None — out of scope for V1 (deferred to v2.1) | DEC-04 picker is `<select>` only. |
| Lucide icons | UMD runtime bundle from CDN | None — no icons in Phase 5 | UI-SPEC §Design System "Icon library: none". `<details>` triangle is browser-native. CLAUDE.md tech stack: "Lucide UMD runtime bundle ... avoid". |
| PWA / service worker for offline fiche access | Workbox / sw-toolbox | None — browser HTTP cache + Vercel edge caching | CLAUDE.md tech stack: "Service workers / offline-first PWA tooling ... out of scope". |

**Key insight:** Phase 5's correct architecture is `<select>` + native `<details>` + CSS `position: sticky` + CSS `@media print`. Every "feature" the planner might be tempted to engineer in JS (toggle animations, scrollspy, current-section highlight, search) has been deliberately scoped out by DEC-04 / UI-SPEC §Motion Contract / UI-SPEC §Composition. The IIFE's job is render + persist preferences, nothing more.

## Common Pitfalls

### Pitfall 1: IIFE Race Condition — Inline Script Before Deferred Scripts

**What goes wrong:** Inline `<script>` blocks execute during HTML parsing, **before** deferred external scripts (`outils-data.js`, `srs.js`, `fiches-data.js`) finish evaluating. Without protection, the IIFE reads `window.BANK = undefined` and throws.
**Why it happens:** HTML spec dictates inline scripts are parser-blocking, while `defer` external scripts run after the document is parsed.
**How to avoid:** Wrap the IIFE body in a `boot()` function and gate it on `document.readyState`:
```javascript
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
```
This is the verbatim hotfix from commit `0553899` (Phase 3 hotfix, owner-verified 2026-05-25). [VERIFIED: present at `outils.html:903-904`, `outils.html:1371-1372`, `outils.html:1950-1951`]
**Warning signs:** `console.error('[Fiches] BANK missing')` on first load; works after a hard reload (because deferred scripts cache).

### Pitfall 2: `writePrefs` Silently Clobbers Sibling IIFE Keys

**What goes wrong:** A naive `localStorage.setItem('qhse-prefs-v1', JSON.stringify({lastFicheTheme: 'duerp'}))` deletes `lastTheme`, `lastMode`, `newCardsPerDay`, `lastQcmTheme`, `lastTestTheme`. Owner switches between Fiches and Flashcards and loses their last theme.
**Why it happens:** `setItem` is whole-value replacement, not merge.
**How to avoid:** Always read → spread → write (Pattern S2 / Pattern P4 above). `verify-fiches.cjs` should add a group asserting `lastTheme`, `lastMode`, `newCardsPerDay`, `lastQcmTheme`, `lastTestTheme` survive a Phase 5 write — extends `verify-quiz.cjs:236-273` group (d).
**Warning signs:** Owner reports "my flashcards forgot my last theme after I used Fiches."

### Pitfall 3: ID Collision Between Multi-Fiche Renders

**What goes wrong:** If a future change pre-renders all 15 fiches as siblings with `[hidden]` toggles, the six `fi-s-*` IDs would collide 15× and only the first would be a valid anchor target.
**Why it happens:** HTML IDs must be unique per document.
**How to avoid:** UI-SPEC line 331 mandates single-fiche-at-a-time DOM (instant `innerHTML` clear + `appendChild`). DO NOT silently switch to `[hidden]` pre-rendering. If a future redesign needs multi-fiche DOM, IDs must become `fi-s-${slug}-${section}`.
**Warning signs:** ToC clicks scroll to a different fiche's section.

### Pitfall 4: Print Forces `<details>` Open via `display: block` But Native Triangle Stays Visible

**What goes wrong:** Without `list-style: none` and `::before { content: none }`, the native disclosure triangle prints alongside the question stem.
**Why it happens:** `<summary>` natively renders a `▾` / `▸` triangle via `list-style` or `::marker`.
**How to avoid:** UI-SPEC §Print Contract lines 427-432 spec the three rules explicitly. The IIFE prepends a CSS `▸` via `::before` in screen mode — must be cancelled in print.
**Warning signs:** Print preview shows two triangles per question, or one triangle prints to the right of the question stem.

### Pitfall 5: External Link Footnote Expansion on Internal Anchors

**What goes wrong:** Chassis rule `a[href^="http"]::after { content: " (" attr(href) ")" }` (line 1477) expands ALL external `<a>` URLs in print — but ToC anchors `<a href="#fi-s-tldr">` are internal anchors that start with `#`, NOT `http`. **Already safe.**
**Why it happens / why it's safe:** The CSS attribute selector `[href^="http"]` is specifically scoped to http(s) URLs. ToC anchors will print as plain text (good). Source URLs will print as footnotes (good).
**How to avoid:** No action needed. Test by printing a fiche with both ToC links and source URLs — only the source URLs should show footnote expansion.
**Warning signs:** Hash-only ToC links print with `(#fi-s-tldr)` footnotes — would indicate someone changed the selector to `a::after` (regression).

### Pitfall 6: HTML String Fields (`cadreLegal`, `demarche`) Bypass Pattern S3

**What goes wrong:** UI-SPEC §Data Contract line 514 permits LIMITED HTML in `cadreLegal` and `demarche` fields (so authors can use `<p>`, `<strong>`, `<em>`, `<span class="fi-cite">`, `<a>`, `<code>`, `<ul>`, `<li>`). The IIFE will need to inject these as HTML, not textContent. Naive `innerHTML = field` reopens XSS.
**Why it happens:** Pattern S3 prohibits raw `innerHTML` on un-trusted content; while FICHES is hand-authored and committed (low risk), the discipline must hold.
**How to avoid:** Two options for the planner to choose:
  1. **Parse-and-filter approach:** parse the field into a DocumentFragment, walk it, reject any non-whitelisted tag/attribute, append surviving nodes.
  2. **Author content as structured data instead of HTML strings:** convert `cadreLegal` to an array of paragraph objects (`[{type: 'p', children: [{type: 'text', value: '...'}, {type: 'cite', authority: 'INRS', ref: '...', url: '...'}, ...]}]`) and render via `createElement`. More authoring work but zero XSS surface.
The planner should pick one approach and the verifier should test it (`verify-fiches.cjs` could inject a `<script>` into a FICHES copy and assert the IIFE strips it).
**Warning signs:** A FICHES author accidentally pastes an `onclick` handler or `<iframe>` — should be stripped, not rendered.

### Pitfall 7: `selectedIds[]` Drift After BANK Edit

**What goes wrong:** A `selectedIds: ['duerp-flashcard-001', ...]` references BANK items by id. If a future BANK edit renames/removes an id, the Fiches IIFE's `selectedIds.map(id => BANK.find(b => b.id === id))` returns `undefined` and either renders an empty `<details>` or crashes.
**Why it happens:** Loose cross-reference between two static files.
**How to avoid:** `verify-fiches.cjs` must assert every `selectedIds[i]` resolves to a BANK item AND that item's `theme === fiche.slug` (catches cross-theme reference errors). Same gate idea as `verify-quiz.cjs` group (f) cross-schema check.
**Warning signs:** Console warns "Question clé id ‹X› not found in BANK" — Phase 5 IIFE should `console.warn` and skip rather than crash.

### Pitfall 8: Authoring 15 × 6 Sections in One Plan Without Batching

**What goes wrong:** Planner attempts to ship all 15 fiches in one PLAN.md task; the executor produces 1500+ lines of French prose in one commit; the reviewer can't possibly content-verify all source URLs in one pass; the owner waits hours and approves untested content.
**Why it happens:** Phase 5 LOOKS like one phase but content authoring scales with N fiches not with code complexity.
**How to avoid:** Mirror Phase 2's 7-wave batch structure (Batch A–F, then final integration). Suggested split:
  - Plan 05-01 — CSS namespace + scaffold DOM + IIFE skeleton + empty fiches-data.js shell (1 plan)
  - Plans 05-02..05-N — content authoring batches of 2–3 fiches each (e.g., 02 = duerp+principes-generaux+iso-45001; 03 = iso-9001+iso-14001+tms; etc.)
  - Plan 05-final — `verify-fiches.cjs` + integration smoke test + tab-shell wiring smoke test
**Warning signs:** Plan 05-01 has 2000+ line action steps; planner combines "implement CSS" and "author all DUERP prose" in the same task.

## Runtime State Inventory

**Skipped — Phase 5 is greenfield, not a rename/refactor/migration.**

The only runtime state Phase 5 introduces is one new localStorage key in an existing JSON blob: `qhse-prefs-v1.lastFicheTheme`. The merge-safe write pattern (Pattern P4) handles this without state migration.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — Phase 5 introduces no new localStorage keys. Only adds a property to existing `qhse-prefs-v1` JSON. | None |
| Live service config | None — no external services touched | None |
| OS-registered state | None | None |
| Secrets / env vars | None | None |
| Build artifacts | None (no build step) | None |

## Common Operations — Code Examples

### Operation: Boot the IIFE with race-condition protection

```javascript
// Source: qhse-cesi/outils.html:898-905 (Flashcards IIFE boot pattern, verbatim)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
```

### Operation: Build a fiche section programmatically (XSS-safe)

```javascript
// Source: synthesized from qhse-cesi/outils.html:1187-1248 (QCM renderReveal pattern)
function buildDefinitionsSection(definitions) {
  const section = document.createElement('section');
  section.id = 'fi-s-defs';
  section.dataset.fiSection = 'definitions';

  const h3 = document.createElement('h3');
  h3.textContent = 'Définitions';
  section.appendChild(h3);

  const dl = document.createElement('dl');
  for (const { term, value } of definitions) {
    const dt = document.createElement('dt');
    dt.textContent = term;          // textContent — XSS-safe
    const dd = document.createElement('dd');
    dd.textContent = value;         // textContent — XSS-safe
    dl.appendChild(dt);
    dl.appendChild(dd);
  }
  section.appendChild(dl);
  return section;
}
```

### Operation: Resolve `selectedIds[]` to Questions clés `<details>` blocks

```javascript
// Source: synthesized from UI-SPEC §Layout Contract + outils.html:1226-1248
function buildQuestionsCles(selectedIds) {
  const container = document.createElement('div');
  container.className = 'fi-qa-list';

  for (const id of selectedIds) {
    const item = window.BANK.find(b => b.id === id);
    if (!item) {
      console.warn('[Fiches] selectedIds entry not in BANK — skipping:', id);
      continue;
    }
    const details = document.createElement('details');
    details.className = 'fi-qa';

    const summary = document.createElement('summary');
    summary.textContent = item.question;
    details.appendChild(summary);

    const answer = document.createElement('p');
    answer.className = 'fi-qa-answer';
    answer.textContent = item.answer;
    details.appendChild(answer);

    const explanation = document.createElement('p');
    explanation.className = 'fi-qa-explanation';
    explanation.textContent = item.explanation;
    details.appendChild(explanation);

    const sourceP = document.createElement('p');
    sourceP.className = 'fi-qa-source';
    appendSourceLine(sourceP, item.source);  // Pattern P3 — VERBATIM port
    details.appendChild(sourceP);

    container.appendChild(details);
  }
  return container;
}
```

### Operation: Re-render fiche on theme change with focus management

```javascript
// Source: synthesized from UI-SPEC §Focus Management line 356-357 + QCM IIFE pattern
function onThemeChange(event) {
  const slug = event.target.value;
  const fiche = window.FICHES.find(f => f.slug === slug);
  if (!fiche) {
    renderEmptyState(slug);
    return;
  }

  // Clear previous fiche from DOM
  const existing = panel.querySelector('article.fi-fiche');
  if (existing) existing.remove();

  // Build + insert new fiche
  const article = buildFiche(fiche);
  panel.appendChild(article);

  // Persist (merge-safe)
  writePrefs({ lastFicheTheme: slug });

  // Move focus to fiche title (tabindex="-1") for screen-reader announcement
  const title = article.querySelector('.fi-title');
  if (title) title.focus();
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Sass / PostCSS for nested CSS | Native CSS Nesting + `@layer` | Baseline 2023 | Phase 5 stays vanilla; no build step regression. |
| JS-driven dark mode toggle | `light-dark()` + `<meta name="color-scheme">` | Baseline May 2024 | Already in chassis.css; Phase 5 reuses, doesn't reintroduce |
| BEM class naming (`.fi-fiche__title--featured`) | `@scope` for section-scoped styles | Baseline (Firefox shipped 2026) | Phase 5 uses parent-selector scoping (`#panel-fiches .fi-*`) not `@scope` — keeps consistency with `.qz-*` discipline. `@scope` would be cleaner but mid-phase migration is out of scope. |
| Custom expand/collapse widgets | Native `<details>/<summary>` | Baseline since 2022 | Phase 5 uses native; zero JS for expand UI |
| Pre-baked scroll-spy with IntersectionObserver | UI-SPEC explicitly defers | — | V1 ships passive ToC; current-section highlight is v2.1 backlog |
| Web Font Loader / Fontaine JS | `display=swap` + `preconnect` | Baseline 2019 | Already in `outils.html:10-13`; Phase 5 reuses |

**Deprecated/outdated:**
- jQuery: never used in this repo. Phase 5 does not introduce it.
- `XMLHttpRequest` polling for state: no Phase 5 use case (no server).
- IE11 compatibility: dropped at v1.0 (modern evergreen only).

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Pattern P6: same six `fi-s-*` section IDs across all 15 fiches do not collide because only one fiche is in the DOM at a time. | Pattern P6 | If a future planner pre-renders all 15 fiches as siblings with `[hidden]` toggles, the IDs collide silently. **Verified via UI-SPEC line 331** but the assumption is a single-DOM-fiche binding — planner must not silently change this. [VERIFIED via UI-SPEC line 331] — moved to verified. |
| A2 | Phase 5 IIFE will be 300–500 LOC total. | Standard Stack / Component Responsibilities | Significant under-estimate would suggest decomposing into helpers / a `fiches.js` external file. The QCM IIFE is ~470 LOC and the Tests IIFE is ~580 LOC — Phase 5 should be smaller (read-only, no state machine) so the estimate stands. [ASSUMED — by analogy to QCM/Tests IIFE sizes in `outils.html`]. |
| A3 | `fiches-data.js` will be 1500–2500 lines (similar density to `outils-data.js` 4397 lines for 226 items). | Component Responsibilities | If actual line count is much higher, batching cadence (8 plans) may be too few. Each fiche has 6 sections × French prose × bibliography = a 100–170-line object. 15 × 130 ≈ 1950. [ASSUMED — extrapolation from `outils-data.js` density and UI-SPEC component count]. |
| A4 | The hand-authored intro prose for 15 fiches is realistic for a single owner to author within the milestone (not a multi-week blocker). | Pitfall 8 / Summary | Authoring quality and link verification time may extend Phase 5 timeline. Owner is the only author. Phase 2 spent ~5 days authoring 226 BANK items; Phase 5 authoring is comparable in volume (intro prose × 15 ≈ 50% of BANK effort). [ASSUMED — by analogy to Phase 2 cadence]. |
| A5 | All 15 BANK themes have ≥5 QCM items to satisfy "5–10 Questions clés per fiche" minimum. | Architecture / FICHE-01 | If false, some fiches need flashcard fallback in `selectedIds[]`. [VERIFIED via `node -e` BANK count: minimum is 5 QCM items per theme (`risque-routier`, `espaces-confines`, `metiers`, `calendrier`, `icpe-seveso`, `rncp`); recommended pool includes both QCM and flashcard types for editorial flexibility. |
| A6 | `verify-fiches.cjs` is in-scope for Phase 5 (mirrors P3/P4 discipline). | Standard Stack / Summary | CONTEXT.md DEC-09 says "Verifiable via verify-quiz.cjs-style snapshot equality if a future Plan 05-XX verify-fiches.cjs is added" — explicitly leaves the decision to planning. Planner may decide it's not worth the effort. RESEARCH recommends YES. [ASSUMED — recommended; final call belongs to planner]. |
| A7 | The `cadreLegal` + `demarche` HTML strings need an XSS whitelist filter because Pattern S3 (no raw innerHTML) applies even to committed content. | Pitfall 6 | Owner may decide that committed, single-author content does not warrant the discipline (the planner could choose option 2 — structured data — instead). [ASSUMED — discipline carried from P3/P4 reviews]. |

**A1 verified during research** — see UI-SPEC line 331 explicit binding. Moving from ASSUMED to VERIFIED.

## Open Questions

1. **Should Phase 5 ship `verify-fiches.cjs`?**
   - What we know: CONTEXT.md DEC-09 defers the decision; Phase 3 and Phase 4 both ship verify gates and the discipline has caught real bugs (e.g., merge-safe regression in P4 reviews).
   - What's unclear: Effort vs. value tradeoff for a read-only surface. The gate would assert (a) FICHES schema, (b) every `selectedIds[i]` resolves in BANK, (c) `qhse-prefs-v1` merge-safety extended to `lastFicheTheme`, (d) DEC-09 invariant (snapshot of `qhse-srs-v1` + `qhse-scores-v1` is byte-equal before and after a simulated theme change).
   - Recommendation: **Ship it.** ~250 LOC, mirrors `verify-quiz.cjs` skeleton, catches three real regression classes (cross-ref drift, prefs clobber, accidental SRS write).

2. **Should `fiches-data.js` use HTML strings or structured data for `cadreLegal` / `demarche`?**
   - What we know: UI-SPEC §Data Contract permits HTML strings with a whitelist; structured-data option (e.g., AST-style `[{type: 'p', children: [...]}]`) is a XSS-zero alternative.
   - What's unclear: Authoring ergonomics. HTML strings are faster to write but require an in-IIFE whitelist filter (~50 LOC + tests). Structured data requires more verbose authoring but renders via pure `createElement` (zero filter).
   - Recommendation: HTML strings with a whitelist filter for V1 (faster authoring); revisit if a future reviewer flags concerns. The whitelist is small (8 tags) so the filter is ~30 LOC.

3. **What's the right plan-batching cadence?**
   - What we know: Phase 2 used 7 plans (1 scaffold + 6 content waves). Phase 5's content volume is ~50–60% of Phase 2.
   - What's unclear: Whether 4 plans (scaffold + 3 content batches × 5 fiches) or 6 plans (scaffold + 5 content batches × 3 fiches + verify) is the right cadence.
   - Recommendation: 6 plans, mirroring P2 closely. Smaller batches = better link verification per commit.

4. **Should the in-fiche ToC use `<ol>` or `<ul>`?**
   - What we know: UI-SPEC §Composition diagram uses `<ol>` (line 226).
   - What's unclear: Semantic correctness. The 6 sections do have a deliberate order (TL;DR first, Sources last), so `<ol>` is correct.
   - Recommendation: Use `<ol>` as UI-SPEC indicates. No further question.

5. **Should the Fiches IIFE expose anything on `window`?**
   - What we know: P3 exposed `window.SRS` (because Node verify gates need it). P4 exposed nothing (engine is private). Phase 5 has no SM-2-style pure math.
   - What's unclear: Whether a future `verify-fiches.cjs` would need to call into IIFE helpers.
   - Recommendation: Expose nothing. The IIFE is private; verify-fiches.cjs replicates the resolver logic (`window.FICHES.find(...)` + BANK lookup) directly. Mirrors `verify-quiz.cjs` which replicates `buildQueue` rather than importing it.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Optional `verify-fiches.cjs` gate | ✓ (Phase 3 + Phase 4 verify gates already use it) | v18+ | — |
| Modern browser (Chrome, Firefox, Safari) | Runtime + `<details>` + `position: sticky` + `light-dark()` + `@layer` | ✓ (project target per CLAUDE.md "modern evergreen browsers") | latest 2026 | — |
| Google Fonts (Fraunces, Inter, JetBrains Mono) | Typography | ✓ — already loaded by `outils.html:10-13` | n/a | Browser fallback chain in chassis tokens (`Georgia`, `system-ui`, `ui-monospace`) — already declared |
| Git + GitHub Actions + Vercel | Deploy pipeline | ✓ (existing) | n/a | — |
| `npm` / external packages | none | n/a | n/a | n/a (project bans npm deps) |

**Missing dependencies with no fallback:** none.

**Missing dependencies with fallback:** none.

## Validation Architecture

> Phase 5 has no `.planning/config.json` `nyquist_validation` declaration (assumed enabled per default).

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Node.js built-ins (`assert`, `path`) + browser DevTools console for IIFE smoke |
| Config file | none (script-only) — mirrors `verify-srs.cjs` / `verify-quiz.cjs` |
| Quick run command | `node .planning/phases/05-fiches-de-r-vision/verify-fiches.cjs` |
| Full suite command | `node .planning/phases/03-flashcards-srs/verify-srs.cjs && node .planning/phases/04-qcm-tests-blancs/verify-quiz.cjs && node .planning/phases/05-fiches-de-r-vision/verify-fiches.cjs` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FICHE-01 | All 15 fiches load, render 6 sections, resolve `selectedIds` to BANK | unit (cross-ref) | `node verify-fiches.cjs` group (a) | ❌ Wave 0 — `verify-fiches.cjs` to be created |
| FICHE-01 | `qhse-prefs-v1.lastFicheTheme` round-trips, preserves sibling keys | unit (storage) | `node verify-fiches.cjs` group (b) | ❌ Wave 0 |
| FICHE-01 | DEC-09 read-only — `qhse-srs-v1` + `qhse-scores-v1` snapshot equality after simulated theme change | unit (invariant) | `node verify-fiches.cjs` group (c) | ❌ Wave 0 |
| FICHE-01 | Every `selectedIds[i]` ∈ BANK AND `BANK[id].theme === fiche.slug` | unit (cross-ref) | `node verify-fiches.cjs` group (d) | ❌ Wave 0 |
| FICHE-01 | FICHES schema — 15 entries, each has all required fields | unit (schema) | `node verify-fiches.cjs` group (e) | ❌ Wave 0 |
| FICHE-02 | All `sources[].url` and `selectedIds[i].source.url` content-verified | manual-only | per `feedback_verify_links_before_ship.md` | manual gate at ship |
| FICHE-02 | Print preview shows fiche cleanly: no header, no ToC, all `<details>` open, external URLs as footnotes | manual-only (Ctrl+P in browser) | `Browser: Ctrl+P; visually inspect each fiche` | manual gate |
| FICHE-01 / FICHE-02 | Tab-shell wiring — clicking Fiches tab loads fiche; Ctrl+P prints correctly | smoke (browser console) | `Browser: open outils.html, click Fiches tab, select theme, Ctrl+P` | manual gate at end-of-phase |

### Sampling Rate
- **Per task commit:** `node verify-fiches.cjs` (if exists in current wave) + manual link verification for any newly-authored fiche prose.
- **Per wave merge:** Full triple-gate: `verify-srs.cjs` && `verify-quiz.cjs` && `verify-fiches.cjs`.
- **Phase gate:** All three gates green + manual browser smoke (Ctrl+P print preview on all 15 fiches) before `/gsd-verify-work` or owner UAT.

### Wave 0 Gaps
- [ ] `.planning/phases/05-fiches-de-r-vision/verify-fiches.cjs` — new gate covering all FICHE-01 + DEC-09 contracts (mirrors `verify-quiz.cjs` skeleton)
- [ ] No framework install needed (Node built-ins only)
- [ ] No additional infra — `node` is already required by Phase 3/4 verify gates and present in the dev environment

## Security Domain

> `security_enforcement` is implicit/absent in `.planning/config.json`. Treating as enabled per researcher protocol.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | n/a — no auth (PERSIST-02: single-user, no accounts) |
| V3 Session Management | no | n/a — no sessions |
| V4 Access Control | no | n/a — public static page; no privileged actions |
| V5 Input Validation | **yes** | Whitelist filter on `cadreLegal` + `demarche` HTML strings; `createElement` + `textContent` for all other FICHES string fields (Pattern S3); BANK is read-only and source-verified at commit time |
| V6 Cryptography | no | n/a — no secrets, no PII, no crypto |
| V10 Malicious Code | **yes** | Whitelist DOM injection (cf. Pitfall 6); no inline `on*=` handlers; no `eval` / `new Function`; CSP-compatible code (though no CSP header is set by Vercel by default) |
| V14 Configuration | **yes** | `target="_blank"` always paired with `rel="noopener noreferrer"` on every external link (Pattern P3); inherited from BANK source-line builder |

### Known Threat Patterns for vanilla HTML/CSS/JS + localStorage stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via `innerHTML` on user-mutable strings | Tampering / Elevation | `createElement` + `textContent` (Pattern S3); whitelist filter for the two HTML-string fields (Pitfall 6); FICHES content is committed, not runtime-input — risk is regression-only |
| Reverse-tabnabbing via `target="_blank"` | Tampering | `rel="noopener noreferrer"` on every external `<a>` (Pattern P3 — already enforced) |
| localStorage corruption (manual mutation or storage cap) | DoS | Try/catch around every `JSON.parse` and `setItem`; graceful fallback to `DEFAULT_PREFS`; `verify-fiches.cjs` group (b) asserts round-trip |
| Cross-IIFE prefs clobber (silent data loss) | Tampering (data integrity) | Merge-safe `writePrefs` (Pattern P4); `verify-fiches.cjs` group (b) asserts sibling keys survive |
| Accidental SRS / scores mutation (DEC-09 violation) | Tampering | Code search for `qhse-srs-v1` and `qhse-scores-v1` in Fiches IIFE returns zero results; `verify-fiches.cjs` group (c) asserts snapshot equality |
| Broken / SEO-spam / phishing links in `sources` | Information disclosure / Tampering | Content-verification pipeline per `feedback_verify_links_before_ship.md` — every URL verified before commit |

## Sources

### Primary (HIGH confidence — repository files I inspected this session)
- [VERIFIED: file] `C:\Users\Lasmoles\mes-apps-claude\.planning\phases\05-fiches-de-r-vision\05-CONTEXT.md` — DEC-01..DEC-09 locked decisions
- [VERIFIED: file] `C:\Users\Lasmoles\mes-apps-claude\.planning\phases\05-fiches-de-r-vision\05-UI-SPEC.md` — approved UI contract, all 6 dimensions PASS
- [VERIFIED: file] `C:\Users\Lasmoles\mes-apps-claude\.planning\REQUIREMENTS.md` — FICHE-01, FICHE-02 lines 52–54
- [VERIFIED: file] `C:\Users\Lasmoles\mes-apps-claude\.planning\ROADMAP.md` — Phase 5 section, SC1+SC2
- [VERIFIED: file] `C:\Users\Lasmoles\mes-apps-claude\qhse-cesi\outils.html` — mount point at lines 128–131, IIFE shells at 269/323/915/1382/1950, source-line builder at 1226–1248
- [VERIFIED: file] `C:\Users\Lasmoles\mes-apps-claude\qhse-cesi\outils-data.js` — BANK schema and theme distribution (226 items, 15 themes, all ≥5 QCM)
- [VERIFIED: file] `C:\Users\Lasmoles\mes-apps-claude\qhse-cesi\chassis.css` — `@layer components` ends at 1411 (`.qz-*` block), `@media print` ends at 1489, tokens at 32–88
- [VERIFIED: file] `C:\Users\Lasmoles\mes-apps-claude\.planning\phases\04-qcm-tests-blancs\04-PATTERNS.md` — established IIFE + namespace + verify gate templates
- [VERIFIED: file] `C:\Users\Lasmoles\mes-apps-claude\.planning\phases\04-qcm-tests-blancs\verify-quiz.cjs` — 6-group assertion pattern + `global.window` shim + `pass`/`fail`/`check` helpers
- [VERIFIED: tool] `node -e` BANK count: total 226 items, theme distribution validates all 15 themes ≥5 QCM items

### Secondary (HIGH confidence — project documentation / chassis-validated)
- [VERIFIED: file] `C:\Users\Lasmoles\mes-apps-claude\CLAUDE.md` — single-file HTML invariant, no build step, no npm deps, dark default, French
- [CITED: in CLAUDE.md] MDN — `light-dark()` function (Baseline May 2024) — chassis.css already uses this
- [CITED: in CLAUDE.md] MDN — `<details>` / `<summary>` (Baseline since 2022)
- [CITED: in CLAUDE.md] MDN — `position: sticky` (Baseline since 2020)

### Tertiary (training-data — not session-verified)
- none — every claim is grounded in repository files inspected this session.

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** — every primitive already in production via Phases 1–4
- Architecture: **HIGH** — UI-SPEC explicitly locks DOM shape; Pattern P1–P7 verbatim from existing IIFEs
- Pitfalls: **HIGH** — pitfalls 1, 2, 4, 5 are documented hotfixes / production lessons from prior phases; pitfalls 3, 6, 7, 8 are forward-looking but grounded in DEC-09 + UI-SPEC bindings
- Print contract: **HIGH** — chassis §7 already validated in production; Phase 5 adds 7 rules per UI-SPEC

**Research date:** 2026-05-27
**Valid until:** 2026-06-27 (30 days — stable stack, no fast-moving dependencies)

---

## RESEARCH COMPLETE

**Phase:** 5 — Fiches de révision
**Confidence:** HIGH

### Key Findings
- **Phase 5 is copy-extend-adapt, not greenfield** — every needed primitive (IIFE shell, CSS namespace pattern, source-line builder, merge-safe writePrefs, verify-gate skeleton, `@media print` chassis) already exists from Phases 1–4 and is referenced by file:line in this RESEARCH.
- **Content volume is the dominant risk, not code complexity** — 15 fiches × 6 sections × French prose × verified citations ≈ Phase 2 effort scale. Mirror Phase 2's 6–7-wave batching cadence.
- **DEC-09 invariant (read-only — no SRS / scores write) needs a verifier** — `verify-fiches.cjs` mirroring `verify-quiz.cjs` group (e) is ~250 LOC and catches three real regression classes (cross-ref drift, prefs clobber, accidental SRS write).
- **`<details>` + `position: sticky` + native anchor links + `@media print` extend chassis perfectly** — Phase 5 needs zero new JS for expand/collapse, sticky ToC, smooth scroll, or print mode. All four are pure CSS / browser-native.
- **Every BANK theme has ≥5 QCM items** (verified via Node), satisfying the "5–10 Questions clés per fiche" minimum without flashcard fallback.

### File Created
`C:\Users\Lasmoles\mes-apps-claude\.planning\phases\05-fiches-de-r-vision\05-RESEARCH.md`

### Confidence Assessment
| Area | Level | Reason |
|------|-------|--------|
| Standard Stack | HIGH | Every dependency already in production |
| Architecture | HIGH | UI-SPEC locks DOM, Patterns are verbatim from P3/P4 |
| Pitfalls | HIGH | Documented hotfixes + forward-looking pitfalls grounded in bindings |
| Print | HIGH | Chassis §7 covers 8 of 11 needed rules; Phase 5 adds 7 |
| Verify gate | HIGH | `verify-quiz.cjs` is a near-exact template |
| Content authoring | MEDIUM | Volume estimate (1500–2500 LOC fiches-data.js) is extrapolation, not measurement |

### Open Questions for Planner
1. Ship `verify-fiches.cjs` or skip? (RESEARCH recommends ship)
2. HTML-strings + whitelist filter vs. structured-data for `cadreLegal` / `demarche` fields? (RESEARCH recommends HTML strings + whitelist)
3. 4-plan or 6-plan batching cadence? (RESEARCH recommends 6 plans, mirroring Phase 2)

### Ready for Planning
Research complete. Recommended next agent: `gsd-pattern-mapper` for `05-PATTERNS.md` (concrete file:line mapping), then `gsd-planner` for `05-XX-PLAN.md` files with the 6-plan cadence.

*Phase: 05-fiches-de-r-vision*
*Research date: 2026-05-27*
