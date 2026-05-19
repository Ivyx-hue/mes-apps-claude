# Phase 2: Content Bank — Pattern Map

**Mapped:** 2026-05-17
**Files analyzed:** 2 (1 CREATE, 1 MODIFY)
**Analogs found:** 2 / 2 (role-match; no exact analog — greenfield data format)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `qhse-cesi/outils-data.js` | data-literal / store | batch (static array, consumer-filtered) | `qhse-cesi/index.html` lines 241–281 (`BIBLIO` array) | role-match (same project, same inline data-literal + provenance pattern; different schema shape) |
| `qhse-cesi/outils.html` | shell / integration point | request-response (static HTML, one `<script src>` addition) | `qhse-cesi/outils.html` lines 10–15 (`<link rel="stylesheet">` head block) | exact (same file; `<link>` → `<script src>` is the direct structural analog for external asset loading in this codebase) |

---

## Pattern Assignments

### `qhse-cesi/outils-data.js` (data-literal, batch / consumer-filtered)

**Analog:** `qhse-cesi/index.html` — `BIBLIO` array, lines 241–281

**Analog role:** `BIBLIO` is the only other hand-authored, inline, source-verified array literal in this codebase. It carries the same provenance discipline: every object has an `id`, a content-verified `url`, and a `lastChecked` date. It is consumed by downstream rendering code via `BIBLIO.filter(...)`. This maps directly to `window.BANK` consumed by P3/P4/P5 via `BANK.filter(i => i.theme === x)`.

**Key structural differences from BIBLIO (planner must note):**

| Dimension | `BIBLIO` (analog) | `window.BANK` (new file) |
|---|---|---|
| Declared as | `const BIBLIO = [...]` inside an IIFE inside `<script>` | `window.BANK = [...]` at top level of a standalone `.js` file |
| Scope | Local to the IIFE — not a global | Explicit `window.BANK` — must be a browser-evaluable global |
| Provenance field | `lastChecked: 'YYYY-MM-DD'` (flat string on each object) | `source: { authority, ref, url, verified }` (nested object per item) |
| Content verified by | curator eyeball + curl per feedback discipline | Same discipline; `verified` date set after curl + title check |
| Loaded by | Same file's inline `<script>` | External `<script src="outils-data.js">` in `outils.html` |

**Imports / file header pattern** — no analog exists for a standalone `.js` data file in this codebase. Pattern is greenfield. Use this shape (from RESEARCH.md schema + V2-ETUDE-SPEC.md):

```js
/* qhse-cesi/outils-data.js
 * Content bank — Phase 2.
 * window.BANK: array of study items (flashcards + QCM) covering the full Bachelor QHSE scope.
 * Schema: { id, type, theme, question, answer, choices?, correct?, explanation, source, difficulty }
 * Consumed by: P3 (Flashcards/SM-2), P4 (QCM/Tests), P5 (Fiches).
 * DO NOT import, require, or bundle — loaded via <script src> in outils.html.
 */
window.BANK = [
```

**Core data-literal pattern** (analog: `qhse-cesi/index.html` lines 242–244 — BIBLIO object shape):

```js
// BIBLIO pattern (analog — provenance + id + verified date on each object):
{ id:'officiel-rncp-41446', title:'Fiche RNCP 41446 — Bachelor QHSE',
  url:'https://www.francecompetences.fr/recherche/rncp/41446/',
  description:'...', category:'officiel', source_type:'officiel',
  tags:['RNCP','fiche','officiel','francecompetences'],
  priority:1, lastChecked:'2026-05-15', archive_url:'...' },
```

Copy the `id` + provenance + date discipline from BIBLIO. Adapt to the BANK schema shape from RESEARCH.md:

```js
// BANK flashcard item (from RESEARCH.md §Architecture Patterns):
{
  id: 'duerp-flashcard-001',
  type: 'flashcard',
  theme: 'duerp',
  question: "Quel article du Code du travail impose le DUERP ?",
  answer: "L'article R4121-1 du Code du travail impose à tout employeur de transcrire les résultats de l'évaluation des risques dans un Document Unique.",
  explanation: "Le DUERP est obligatoire dès le 1er salarié (R4121-1). Il doit être mis à jour au moins annuellement dans les entreprises de 11 salariés et plus. Conservation : 40 ans. (Légifrance : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000023795562)",
  source: {
    authority: 'INRS',
    ref: 'Art. R4121-1 Code du travail',
    url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
    verified: '2026-05-17'
  },
  difficulty: 1
},

// BANK QCM item:
{
  id: 'principes-generaux-qcm-001',
  type: 'qcm',
  theme: 'principes-generaux',
  question: "Quel est le 3e principe général de prévention au sens de l'article L4121-2 ?",
  answer: "Combattre les risques à la source.",
  choices: [
    "Éviter les risques",
    "Évaluer les risques qui ne peuvent pas être évités",
    "Combattre les risques à la source",
    "Adapter le travail à l'homme"
  ],
  correct: 2,
  explanation: "Ordre exact de L4121-2 : 1-Éviter, 2-Évaluer, 3-Combattre à la source, 4-Adapter. Distractor 0 et 1 sont les principes 1 et 2 ; distractor 3 est le principe 4.",
  source: {
    authority: 'INRS',
    ref: 'Art. L4121-2 Code du travail',
    url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
    verified: '2026-05-17'
  },
  difficulty: 2
},
```

**File close pattern** — no analog for a standalone `.js` data file. Use:

```js
]; // end window.BANK
// Total items: <N> — verified <date>
```

**Secondary analog: root `index.html` `modules` array** (lines 745–803)

The QHSE Trainer uses a deeper nested structure (`modules[].flashcards[{q,a}]` and `modules[].quiz[{q,choices,answer}]`). The BANK schema is flatter (one object per item, `type` field distinguishes flashcard/qcm). Do NOT copy the nested `modules` shape — the BANK schema is locked in V2-ETUDE-SPEC.md. The trainer's `quiz[].answer` is also an index into `choices` (same as BANK's `correct`), which confirms the 0-based index convention is already established in this codebase.

```js
// Root index.html line 759 — 0-based index convention already in use:
{q:"Combien de principes de management de la qualité définit l'ISO 9001 ?",
 choices:["5","6","7","8"], answer:2},
// BANK uses `correct` instead of `answer` for QCM items (locked schema).
```

**Provenance discipline pattern** (analog: `qhse-cesi/index.html` lines 125, 131, 151 — inline source citations):

```html
<!-- index.html line 125 — inline source + verified date pattern (owner-approved): -->
<span style="color: var(--ink-2)">(Source :
  <a href="https://candidat.francetravail.fr/metierscope/fiche-metier/H1502/..."
     target="_blank" rel="noopener noreferrer">France Travail, ROME <span class="mono">H1502</span></a>,
  données T1 2025, vérifié le <span class="mono">2026-05-14</span>)</span>

<!-- index.html line 151 — RNCP citation pattern: -->
<span style="color: var(--ink-2)">(Source : France Compétences,
  vérifié le <span class="mono">2026-05-14</span>)</span>
```

This is the rendering side. The data side equivalent is `source.authority` + `source.verified` on each BANK item — same discipline expressed as structured data rather than inline HTML.

---

### `qhse-cesi/outils.html` (shell, integration point — single `<script src>` addition)

**Analog:** `qhse-cesi/outils.html` lines 10–15 (existing `<link rel="stylesheet">` head block) — this is the direct structural analog for loading an external asset in `<head>`.

**Current `<head>` block** (outils.html lines 10–15 — exact current state):

```html
  <!-- Google Fonts: dual preconnect + single CSS2 stylesheet request (Fraunces + Inter + JetBrains Mono) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="chassis.css">
```

**Exact insertion point:** After line 15 (`<link rel="stylesheet" href="chassis.css">`), before `</head>` (line 16). The tag goes immediately after the CSS link so `window.BANK` is defined before the tab IIFE at lines 88–139 executes.

**Tag to insert** (one line, no attributes needed beyond `src`):

```html
  <script src="outils-data.js"></script>
```

**Resulting head block after modification** (lines 10–16):

```html
  <!-- Google Fonts: dual preconnect + single CSS2 stylesheet request (Fraunces + Inter + JetBrains Mono) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="chassis.css">
  <script src="outils-data.js"></script>
```

**No other changes to `outils.html`.** The tab IIFE at lines 88–139 is shell-only and does not reference `BANK` — it requires no modification in this phase. P3/P4/P5 will add their own `<script>` blocks or inline handlers that call `BANK.filter(...)`.

**Codebase note on `<script src>`:** Grep of all `*.html` files confirms zero existing `<script src=` tags in the entire codebase. This is the first external script load. The pattern is structurally identical to the existing `<link rel="stylesheet" href="chassis.css">` — a relative path to a sibling file in the same directory. No CDN, no integrity hash, no `defer`/`async` needed (data file has no DOM dependency; synchronous load before the IIFE is the correct and intentional order).

---

## Shared Patterns

### Provenance / Source Verification Discipline
**Source:** `qhse-cesi/index.html` (BIBLIO objects, lines 242–281) + memory `feedback_verify_links_before_ship.md`
**Apply to:** Every item in `window.BANK` — the `source.url` field on every object.

The pattern established in v1.0 (BIBLIO) and hardened by the `feedback_verify_links_before_ship` memory entry:
- Every external URL carries a `lastChecked` / `verified` date
- URLs must pass: HTTP 200 + non-generic `<title>` matching item topic + no soft-404 grep match
- SPAs (MétierScope, France compétences) require human browser eyeball — curl is insufficient
- `media.html?refINRS=` links are banned — use static `/risques/<slug>/ce-qu-il-faut-retenir.html` paths

### `id` Naming Convention
**Source:** `qhse-cesi/index.html` BIBLIO lines 242–280 (pattern: `<category>-<slug>`, e.g. `officiel-rncp-41446`, `pedago-inrs-tms`)
**Apply to:** BANK item `id` field.

BIBLIO uses `<category>-<slug>`. BANK uses `<theme>-<type>-NNN` (e.g. `duerp-flashcard-001`, `principes-generaux-qcm-001`) — same kebab-case, same compound structure, adapted to BANK's type + sequential number per CONTEXT.md Claude's Discretion.

### Zero-Build / No Module Syntax
**Source:** `qhse-cesi/index.html` lines 241 (`const BIBLIO = [`) and 189 (`<script>` block without `type="module"`)
**Apply to:** `outils-data.js` top-level declaration.

All JS in this codebase is plain ES5-safe syntax inside either an IIFE or a direct global assignment. No `export`, no `import`, no `require`. `window.BANK = [...]` is the correct pattern. The IIFE wrapper used in `outils.html` and `index.html` is intentionally NOT used in `outils-data.js` — the file's entire purpose is to expose `window.BANK` as a global.

### Atomic Commit per Batch
**Source:** memory `feedback_token_conscious_work.md` (project invariant)
**Apply to:** Each of the 6 authoring batches (A–F from RESEARCH.md).

Commit format per batch: `feat(bank): add <theme> batch (N items)` — commit and push after each batch, never accumulate all 200+ items before first commit.

---

## No Analog Found

| File | Role | Data Flow | Reason |
|---|---|---|---|
| `qhse-cesi/outils-data.js` (file format itself) | data-literal | batch | No standalone `.js` data file exists in this codebase. The `BIBLIO` array is the closest analog but lives inside an IIFE inside `index.html`. The `window.BANK = [...]` pattern as a standalone external file is greenfield — planner must use the RESEARCH.md schema directly for the file shape. |

---

## Metadata

**Analog search scope:** `qhse-cesi/` (index.html, outils.html), root `index.html`
**Files scanned:** 3 source files read in full
**Grep scope:** All `*.html` files in repo (confirmed: zero `<script src=` tags anywhere)
**Pattern extraction date:** 2026-05-17
