---
phase: 02-content-bank
reviewed: 2026-05-20T13:40:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - qhse-cesi/outils-data.js
  - qhse-cesi/outils.html
findings:
  critical: 0
  warning: 4
  info: 5
  total: 9
status: resolved
fixed: 2026-05-21
fix_summary:
  WR-01: resolved
  WR-02: resolved
  WR-03: resolved
  WR-04: resolved
  IN-01..IN-05: not_addressed (out of fix scope)
---

# Phase 2: Code Review Report

**Reviewed:** 2026-05-20T13:40:00Z
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found

## Summary

Reviewed the two source files added/modified in Phase 2:

- `qhse-cesi/outils-data.js` — 4356 lines, 226 items, ~258 KB, declares `window.BANK`.
- `qhse-cesi/outils.html` — single 1-line change (`<script src="outils-data.js"></script>` in `<head>`) closing SHELL-05.

The structural gate (`verify-bank.cjs --final`) was re-confirmed during review: the file parses cleanly under a `vm` sandbox, all 226 items satisfy the locked schema, no duplicate `id`s, every `difficulty` is integer in `[1,3]`, every QCM `correct` is in range, all 92 QCM items have exactly 4 unique non-empty choices, all `source.url` values are HTTPS without whitespace, all `verified` dates are `YYYY-MM-DD` and `<= today`, no template literals, no `eval`, no `=>`, no `import/export` (the only matches are in the file header comment), no BOM, no CRLF, no non-printable controls, and no HTML / `<script>` / `on*=` tokens are smuggled inside content strings.

So Critical-tier defects are absent. The findings below are narrative-quality issues the structural gate cannot catch: schema-internal redundancy that the renderer will have to arbitrate, drift between section-banner comments and actual item counts, near-duplicate questions that will surface twice in a randomized session, lack of a double-load guard, missing `defer`, and a handful of maintainability nits. All findings are fallow / Warning or Info tier and none block ship.

## Narrative Findings (AI reviewer)

## Warnings

### WR-01: `answer` field diverges from `choices[correct]` in 17 QCM items — renderer will have to pick one

**Status: RESOLVED** (2026-05-21, commit 2f33f68). The verifier recount found 79 affected QCM items (56 trailing-punctuation/whitespace diffs, 23 richer-paraphrase diffs), not 17. `answer` is the canonical truth and was never rewritten; instead `choices[correct]` was normalized to exactly equal `answer` in all 79 items. The `correct` index already pointed at the right choice in every case — **0 genuine authoring bugs, 0 unresolved items**. Every QCM item now satisfies `choices[correct] === answer` (exact string equality). No duplicate choices introduced.

**File:** `qhse-cesi/outils-data.js` (17 QCM items across 9 themes)
**Issue:**
For QCM-type items the schema carries both `answer` (free-form canonical answer) and `choices[correct]` (the displayed choice marked correct). In 17 of 92 QCM items these two strings disagree in non-trivial ways — the `answer` is typically a richer paraphrase or adds parenthetical clarifications absent from the choice. Affected ids:

- `duerp-qcm-004` — A: `Préparer la démarche (définir le périmètre, les acteurs, les ressources).` vs C: `Préparer la démarche (périmètre, acteurs, ressources)`
- `duerp-qcm-008` — A: `Elle a étendu la conservation du DUERP à 40 ans…` vs C: `Elle a étendu la conservation à 40 ans et rendu le Papripact obligatoire ≥ 50 salariés`
- `principes-generaux-qcm-008`, `iso-45001-qcm-007`, `iso-45001-qcm-008`, `iso-9001-qcm-006`, `iso-14001-qcm-004`, `iso-14001-qcm-006`, `tms-qcm-005`, `risque-routier-qcm-003`, `rps-qcm-001`, `rps-qcm-002`, `rps-qcm-003`, `rps-qcm-004`, `risque-chimique-qcm-002`, `acronymes-qcm-004`, `rncp-qcm-003` — same pattern.

For Phase 4 (QCM module) and Phase 5 (Fiches), there is no contract today that defines which field the renderer displays at "reveal" time. If the QCM module shows `answer` after a click, the user sees a string that doesn't match the option they were forced to pick — which reads like a content bug to a student.

Concretely: in `iso-9001-qcm-006` the option says `…éliminer la cause pour éviter la récurrence` while the `answer` is truncated mid-clause in the source (`L'action corrective élimine l…`) — the Fiches view would show a different sentence than the QCM view.

**Fix:**
Decide a single canonical contract before Phase 4 ships and add a structural assertion to `verify-bank.cjs`. Two options:

Option A — `answer` MUST equal `choices[correct]` verbatim for QCM:
```js
// In verify-bank.cjs
if (item.type === 'qcm' && item.answer !== item.choices[item.correct]) {
  fail('QCM ' + item.id + ': answer disagrees with choices[correct]');
}
```
Then run a one-shot script that rewrites the 17 items' `answer` to mirror `choices[correct]`.

Option B — `answer` is the long-form gloss, `choices[correct]` is the short-form option; the renderer always shows `choices[correct]` for the "correct" highlight and uses `answer` only inside Fiches. Document this in the file header schema comment and assert that for QCM, `answer.toLowerCase()` must contain `choices[correct].toLowerCase()` (or vice versa) — block the case where they share zero substring overlap.

Either way, lock the choice in the schema comment at the top of `outils-data.js`.

### WR-02: Section-banner counts drift from real item counts (1 wrong header, 4 missing headers)

**Status: RESOLVED** (2026-05-21, commit b407877). The `acronymes` banner was corrected to `26 items — 20 flashcards + 6 QCM`. Full section banners were inserted for `risque-chimique`, `espaces-confines`, `metiers`, and `rncp`, matching the existing THEME/Authority/Ref format. All 15 themes now have exactly one banner whose item/flashcard/QCM counts match the actual data.

**File:** `qhse-cesi/outils-data.js`
**Issue:**
The file uses block-comment "section banners" of the form:
```
/* =========================================================
 * THEME: <theme> (<N> items — <Nf> flashcards + <Nq> QCM)
 * ...
 * ========================================================= */
```
After Batch F appended deferred acronymes and added late themes, four discrepancies exist:

| Theme | Banner says | Actually contains |
|---|---|---|
| `acronymes` (line 3414) | 20 items (14 fc + 6 qcm) | 26 items (20 fc + 6 qcm) |
| `risque-chimique` | (no banner) | 18 items (10 fc + 8 qcm) |
| `espaces-confines` | (no banner) | 12 items (7 fc + 5 qcm) |
| `metiers` | (no banner) | 12 items (7 fc + 5 qcm) |
| `rncp` | (no banner) | 13 items (8 fc + 5 qcm) |

The banner is the only in-file documentation of intent; readers (and you in 6 months) will trust it. Today these comments lie. For `acronymes` specifically, the banner claims 14 flashcards when the section contains 20 — a 30 % undercount.

**Fix:**
1. Update the `acronymes` banner at line 3414 to read `26 items — 20 flashcards + 6 QCM`.
2. Insert section banners before the first item of `risque-chimique`, `espaces-confines`, `metiers`, `rncp`, matching the existing format (incl. the `Authority:` / `Ref:` lines used by other sections).
3. Add a verification step to `verify-bank.cjs` that scans these banners with the regex `/THEME:\s*([a-z0-9-]+)\s*\((\d+)\s*items\s*—\s*(\d+)\s*flashcards?\s*\+\s*(\d+)\s*QCM/g` and asserts every theme has exactly one banner whose numbers match the actual counts. That stops this drift from re-occurring on every future batch.

### WR-03: Two question texts are duplicated across flashcard/QCM modes — same session can show both

**Status: RESOLVED** (2026-05-21, commit 7017d02). Both QCM questions were reworded to a distinct study angle on the same topic (the flashcard came first in source order and kept its wording), still backed by the same content-verified `source.url`: `iso-45001-qcm-001` now asks which pre-ISO referential was superseded; `iso-14001-qcm-003` now asks what the notion of "obligation de conformité" recovers. Answers and choices were left unchanged. Zero duplicate question texts remain (case-insensitive, trimmed).

**File:** `qhse-cesi/outils-data.js`
**Issue:**
Two question strings appear verbatim (case-insensitive, trimmed) in two different items each:

- `Quelle norme ISO 45001:2018 remplace-t-elle ?` — used by `iso-45001-flashcard-001` and `iso-45001-qcm-001`.
- `Qu'est-ce qu'une 'obligation de conformité' dans ISO 14001:2015 ?` — used by `iso-14001-flashcard-004` and `iso-14001-qcm-003`.

These are intentional pairings (same concept, two study modes) — that is fine for Fiches and for the standalone Flashcards/QCM tabs. But Phase 4 ships "Tests blancs" (mixed-mode timed tests, per the placeholder in `outils.html:74-77`), and any test session that draws from the full bank without de-duping on `question` text will surface the same question twice in the same session — once as a flashcard prompt, once as a QCM. That is a content bug from the student's perspective.

**Fix:**
Either (a) rephrase one item of each pair so the question text differs (e.g. flashcard asks "Quelle est la norme à laquelle ISO 45001 se substitue ?"), or (b) lock the contract: when building a Tests-blanc session, group by `question.trim().toLowerCase()` and pick at most one item per group. Document the chosen approach in the file header. If (a) is chosen now, add to `verify-bank.cjs` an assertion that question texts are globally unique:
```js
const qs = new Map();
BANK.forEach(it => {
  const k = it.question.trim().toLowerCase();
  if (qs.has(k)) fail('Duplicate question: ' + it.id + ' and ' + qs.get(k));
  qs.set(k, it.id);
});
```

### WR-04: `<script src="outils-data.js">` is render-blocking, no `defer`, and has no double-load guard

**Status: RESOLVED** (2026-05-21, commit 289240b). `defer` was added to the `<script src="outils-data.js">` tag in `outils.html`. In `outils-data.js`, the `window.BANK` assignment was wrapped in an ES5-safe idempotent double-load guard (first BANK wins, `console.warn` on a second include) and the bank is deep-frozen post-assignment (array + items + `source` + `choices`). No IIFE was introduced — `window.BANK` remains a plain global readable as the bare identifier `BANK` in the browser console. The `verify-bank.cjs` SHELL-05 assertion was relaxed to a regex accepting an optional `defer`/`async` attribute so the gate stays green.

**File:** `qhse-cesi/outils.html:16` and `qhse-cesi/outils-data.js:8`
**Issue:**
Two related issues at the wiring boundary:

1. `outils.html:16` loads a 258 KB synchronous script in `<head>` ahead of all content. With no `defer` or `async`, the browser must parse and execute the entire 4356-line BANK before continuing to render the body. The IIFE at `outils.html:88-140` (tab controller) does not depend on `window.BANK` — it would be safe to defer the data script. On a mobile connection this turns a page that should render in <100 ms into a page that waits for ~260 KB of synchronous JS before the first paint. The structural gate cannot catch this — it is a wiring-quality issue.

2. `outils-data.js:8` unconditionally executes `window.BANK = [ … ]`. If the script is ever included twice (e.g. a future template includes it via `<script>` and a Phase 3 module imports it via another `<script>`), the second load silently overwrites any modifications, freezes, or markers downstream code may have attached. This is a foot-gun: nothing visible breaks, but session state can vanish.

**Fix:**

For (1), change `outils.html:16` from:
```html
<script src="outils-data.js"></script>
```
to:
```html
<script src="outils-data.js" defer></script>
```
This keeps DOM ordering (BANK is still defined before any later deferred consumer module that imports it), but lets HTML parsing continue while the data is fetched. Phase 3+ consumer modules must also use `defer` (deferred scripts execute in source order, so the consumer will see `window.BANK` populated).

For (2), wrap the assignment in `outils-data.js:8` with an idempotent guard:
```js
window.BANK = window.BANK || [
  // ... existing items
];
```
And consider freezing post-assignment so accidental mutation from consumer code surfaces loudly:
```js
if (typeof Object.freeze === 'function') {
  Object.freeze(window.BANK);
  window.BANK.forEach(function (it) { Object.freeze(it); if (it.source) Object.freeze(it.source); if (it.choices) Object.freeze(it.choices); });
}
```
ES5-safe; matches the file's stated "ES5-safe, no IIFE" constraint.

## Info

### IN-01: `'use strict'` is absent from `outils-data.js`

**File:** `qhse-cesi/outils-data.js:1`
**Issue:**
The file is a top-level data declaration, so strict-mode would catch any accidental implicit globals introduced by a future refactor (e.g. a stray `BANK = [...]` without `window.`) immediately rather than silently polluting `window`. The IIFE in `outils.html:91` already uses `'use strict'`; the data file does not.

**Fix:**
Prepend `'use strict';` on the line immediately after the header comment (still ES5-safe). Cost: zero. Benefit: future stray identifiers throw instead of leaking.

### IN-02: 4 acronym flashcards have answers shorter than 30 characters

**File:** `qhse-cesi/outils-data.js`
**Issue:**
`acronymes-flashcard-015` (`Répertoire National des Certifications Professionnelles.`) and `acronymes-flashcard-017` (`Validation des Acquis de l'Expérience.`) are bare expansions with no commentary. Compared to siblings like `acronymes-flashcard-002` (EvRP, ~250 chars) and `acronymes-flashcard-007` (ATEX, ~260 chars), they read as half-finished. Two further short cases (`iso-45001-qcm-002` answer `§5.4`, `iso-45001-qcm-004` answer `2018`) are legitimate single-token QCM answers — flagging only for the Fiches renderer, which may render these as 4-character paragraphs.

**Fix:**
Optional content polish. Add one sentence of context (what RNCP is for, what VAE allows) to match the corpus average. No code change required.

### IN-03: Section comments duplicate `Authority:` / `Ref:` info already on each item

**File:** `qhse-cesi/outils-data.js:10-14`, `:361-365`, etc.
**Issue:**
Each section banner declares a single `Authority:` and `Ref:` block — but every individual item also carries its own `source.authority` and `source.ref` (correctly). When the per-item value diverges from the banner (e.g. several `iso-9001` items cite `ISO Online Browsing Platform` while the section banner cites `INRS`), the banner becomes misleading. This is fallow documentation drift, not a correctness issue, since rendering will use the per-item value.

**Fix:**
Either drop the `Authority:` / `Ref:` lines from section banners (keep only the theme name and counts), or generate the banners from the actual data via a tiny script invoked from `verify-bank.cjs`. Recommend the former — it removes a source of truth that's hard to keep in sync.

### IN-04: Schema is hand-rolled JS literal — no JSON Schema / TypeScript definition shipped

**File:** `qhse-cesi/outils-data.js:4`
**Issue:**
The schema is documented as a comment (`{ id, type, theme, question, answer, choices?, correct?, explanation, source, difficulty }`). Phase 3/4/5 consumer code will encode this shape in its own types and inevitably drift. `verify-bank.cjs` does the runtime check but its rules aren't reusable from app code.

**Fix:**
Add a tiny `qhse-cesi/outils-schema.js` exporting a plain `BANK_ITEM_KEYS` array + a `validateItem(item)` helper, then have `verify-bank.cjs` import it. Phase 3 then uses the same validator for in-browser sanity (e.g. on a corrupted localStorage roundtrip). Defer to Phase 3 if scope is tight.

### IN-05: Banner comment on line 6 contains `<script>` literal — false-positive trigger for grep-based static analyzers

**File:** `qhse-cesi/outils-data.js:6`
**Issue:**
```
 * DO NOT import, require, or bundle — loaded via <script src> in outils.html.
```
Any CI step that greps for raw `<script` tokens in a `.js` file (as a sanity check for injected HTML) will flag this line. Not a bug — purely a hygiene nit for future tooling.

**Fix:**
Rephrase: `loaded via a <script src=...> tag in outils.html` → `loaded via the script tag in outils.html`. One-line edit.

---

_Reviewed: 2026-05-20T13:40:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
