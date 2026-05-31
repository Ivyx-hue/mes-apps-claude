---
phase: 05-fiches-de-r-vision
fixed_at: 2026-05-31T17:18:00+02:00
review_path: .planning/phases/05-fiches-de-r-vision/05-REVIEW.md
iteration: 1
findings_in_scope: 7
fixed: 6
skipped: 1
status: partial
---

# Phase 5: Code Review Fix Report

**Fixed at:** 2026-05-31T17:18:00+02:00
**Source review:** `.planning/phases/05-fiches-de-r-vision/05-REVIEW.md`
**Iteration:** 1

**Summary:**
- Findings in scope (CR + WR, Info excluded): 7
- Fixed: 6
- Skipped: 1 (explicitly out of scope per REVIEW.md body)

Regression check after every fix:
- Phase 5 `verify-fiches.cjs`: PASS (all 6 groups a–f)
- Phase 3 `verify-srs.cjs`: PASS
- Phase 4 `verify-quiz.cjs`: PASS
- DEC-09 invariant: confirmed — Fiches IIFE (line 1995+) does not write `qhse-srs-v1` or `qhse-scores-v1`. Only `qhse-prefs-v1` is touched (merge-safe writer at lines 2045–2054).
- `innerHTML = ...` grep on outils.html: 0 matches — XSS hygiene preserved.

## Fixed Issues

### CR-01: Renderer never emits the `fi-section` class — most Phase 5 section CSS is dead

**Files modified:** `qhse-cesi/outils.html`
**Commit:** `aa4dfdb`
**Applied fix:** Added `section.className = 'fi-section'` next to the existing `section.dataset.fiSection = '…'` assignment in all six `build*Section()` functions: `buildTldrSection` (line 2184), `buildDefinitionsSection` (line 2204), `buildCadreLegalSection` (line 2231), `buildDemarcheSection` (line 2293), `buildPiegesSection` (line 2319), `buildSourcesSection` (line 2343). No renderer refactor; ~80 lines of dormant chassis.css `#panel-fiches .fi-section …` rules now apply (typography ramp, list bullet spacing, inter-section separator, print h3 underline).

### CR-02: Print rule does not actually open `<details>` — Questions clés answers stay hidden on paper

**Files modified:** `qhse-cesi/chassis.css`
**Commit:** `cb3b9b6`
**Applied fix:** CSS-only patch in the `@media print` block at lines 1819–1832. Added explicit `#panel-fiches details.fi-qa > * { display: block !important; }` so every direct child (summary + `.fi-qa-answer` + `.fi-qa-explanation` + `.fi-qa-source`) renders on paper, regardless of the `<details>`'s `open` state. The UA stylesheet hides non-summary children based on internal magic that ignores `display` on the parent — forcing children directly is the smallest reliable fix. Kept the existing `summary` rule for `font-weight` + `list-style` but dropped its now-redundant `display: block`. Added a comment explaining why. Preferred CSS over a `beforeprint` JS handler to stay consistent with the project's no-JS-dependency print path and Reader Mode compatibility. Print preview consideration: the `summary::before { content: none }` was already present, so the new rule does not reintroduce the unicode triangle marker.

**Note: requires human verification of print output** — a print preview (Ctrl+P) on a fiche that has all `<details>` collapsed should now show the full Q+A+explanation+source content, not just the question summaries. The verify gate cannot exercise print stylesheets.

### WR-01: `aria-live="polite"` + full `<article>` swap announces the entire fiche on every theme change

**Files modified:** `qhse-cesi/outils.html`
**Commit:** `1806808`
**Applied fix:** Removed the two `setAttribute('aria-live', 'polite')` / `setAttribute('aria-atomic', 'false')` calls from `buildFiche()` (line ~2364), and stripped the matching `aria-live="polite" aria-atomic="false"` attributes from the pre-rendered scaffold `<article>` at line 158. Both code paths now share the same a11y contract: the article carries no live-region semantics, so NVDA/JAWS/VoiceOver no longer announce the full ~5–10 KB fiche payload on every theme switch. The existing focus move to `h2.fi-title` (tabindex=-1) in `renderFiche()` still cues non-visual users on the change. Added a multi-line comment explaining the rationale.

### WR-02: `safeSetHTML` calls `srcNode.tagName.toLowerCase()` without guarding against SVG/MathML nodes

**Files modified:** `qhse-cesi/outils.html`
**Commit:** `f19d11b`
**Applied fix:** Inside `cloneAllowed()`, after the existing `ELEMENT_NODE` check, added a namespace guard that returns `null` for any node whose `namespaceURI` is set and is not `http://www.w3.org/1999/xhtml` — drops `<svg>` / `<math>` foreign content wholesale. Replaced `srcNode.tagName.toLowerCase()` with `srcNode.localName` (always lowercase for HTML) to remove the case-sensitivity gotcha. Defense-in-depth — today's `fiches-data.js` has no SVG, but a future paste from an INRS HTML source would have been silently re-inlined under the previous code path.

### WR-04: `appendSourceLine` accepts any URL starting with `http` — allows `http:foo` or `httpx://`

**Files modified:** `qhse-cesi/outils.html`
**Commit:** `3007229`
**Applied fix:** Replaced `src.url.startsWith('http')` with `/^https?:\/\//.test(src.url)` in the Fiches `appendSourceLine()` at line 2132 — matches the strict regex `safeSetHTML` uses for anchor hrefs. Symmetric strictness across the IIFE. The two earlier copies of the same pattern at lines 624 (Flashcards IIFE) and 1269 (QCM IIFE) are Phase 3 / Phase 4 code and out of scope for this Phase 5 review-fix run; flagging for a future cleanup but not patched here.

### WR-05: Double-load guard fails open when `window.FICHES = []`

**Files modified:** `qhse-cesi/fiches-data.js`
**Commit:** `c606831`
**Applied fix:** Replaced `if (window.FICHES && window.FICHES.length)` with `if (Array.isArray(window.FICHES))` at line 25. Now any prior array assignment (including an empty one set by dev tooling, a test stub, or future pre-allocation code) wins — fulfilling the "first FICHES wins" promise in the header comment. Added an inline comment recording the rationale. `node -c` syntax check passes.

## Skipped Issues

### WR-03: `outline: none` on `.biblio-card__link:hover, :focus-visible` removes the focus ring before re-adding it

**File:** `qhse-cesi/chassis.css:404-412`
**Reason:** Skipped — out of scope. The REVIEW.md body explicitly notes this region (`.biblio-*`) is "OUT OF SCOPE" for Phase 5 ("rest of chassis.css… OUT OF SCOPE") and the finding's Fix section closes with: *"Note: this file region (`.biblio-*`) is flagged as out of scope for Phase 5 — leaving the finding for the next biblio touchup, do not include in P5 fix."* The orchestrator prompt also explicitly listed WR-03 as the "skip — out of scope" example. Recorded for the next biblio touchup; no code change in this iteration.
**Original issue:** A keyboard user who tabs to a biblio card and then mouses over it briefly loses the focus ring because `:hover` and `:focus-visible` are combined in a rule that sets `outline: none` before the focus-visible-only rule re-applies it. Accessibility regression, likely a copy-paste error.

---

_Fixed: 2026-05-31T17:18:00+02:00_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
