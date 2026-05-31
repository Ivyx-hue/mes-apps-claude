---
phase: 05-fiches-de-r-vision
reviewed: 2026-05-31T15:50:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - qhse-cesi/chassis.css
  - qhse-cesi/fiches-data.js
  - qhse-cesi/outils.html
findings:
  critical: 2
  warning: 5
  info: 4
  total: 11
status: issues_found
---

# Phase 5: Code Review Report

**Reviewed:** 2026-05-31T15:50:00Z
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Phase 5 ships a 15-fiche reading hub bolted onto `#panel-fiches`. The IIFE is correctly bounded (`__fiBooted` guard), respects DEC-09 (no SRS/scores writes — grep confirms no `qhse-srs-v1`/`qhse-scores-v1` writes inside the Fiches IIFE block), and the `safeSetHTML` DOMParser whitelist + universal `rel="noopener noreferrer"` on every renderer-emitted anchor are correct as designed. Content payload is exhaustive, traceable, and well-deduplicated post-GAP-1.

Two BLOCKERs were found that affect the rendered output, both in the **CSS/HTML contract between chassis.css and the IIFE renderer**:

1. **The IIFE never sets the `fi-section` class on the `<section>` elements it builds** — only `dataset.fiSection`. Every `#panel-fiches .fi-section …` rule in chassis.css (≈80 lines spanning typography, lists, separators, and print headings) silently fails to match. The article renders, but with the wrong type scale, no inter-section separators, and no print-specific section h3 underline. The DOM is structurally correct; only the styling hooks are missing.
2. **The print rule meant to force `<details>` open does not actually reveal the answer/explanation/source paragraphs.** Setting `details { display: block }` does not override the browser UA rule that hides non-summary children of unopened `<details>`. Printing a fiche the user hasn't manually expanded yields ToC-collapsed Questions clés.

Plus five WARNINGs (live-region thrash on theme change, unsafe XSS-adjacent assumption on `srcNode.tagName` for non-HTML namespaces, `outline:none` accessibility regression, anchor-href permissive scheme check, double-load guard fails on empty array) and four INFOs (duplicated title in meta line, slug-validation tautology, leftover pre-rendered scaffold article, `aria-live` overused for full DOM swap).

The owner has already done UAT; visually these defects are subtle (sections still render, just without the bespoke type ramp and section dividers), which is consistent with no UAT failure being reported.

## Critical Issues

### CR-01: Renderer never emits the `fi-section` class — most Phase 5 section CSS is dead

**File:** `qhse-cesi/outils.html:2183-2339` (six `build*Section` functions) and `qhse-cesi/chassis.css:1536-1617, 1829-1833, 1851`
**Issue:** The IIFE builds each fiche section with `section.dataset.fiSection = '…'` only — it never sets `section.className = 'fi-section'`. Every selector in chassis.css scoped to `#panel-fiches .fi-section` (typography for paragraphs, `dl`/`dt`/`dd`, `ul`/`li`, `h3`/`h4`, the accent underline under section h3, the inter-section border separator at line 1613, and the print-only section h3 underline at line 1829 and font-size at line 1851) silently fails to apply. The HTML scaffold (line 153) declares `data-fi-toc`/`data-fi-active-fiche` but the renderer's section nodes have no class hook. Consequence: sections inherit only base typography from `@layer base` (`section`, `h3`, `p`) — the bespoke fiche type scale, list bullet spacing, separator between sections, and the print h3 rule are all inert. Visual evidence is subtle (the page still renders) but the design contract is broken.
**Fix:** Add a single line in each `build*Section()` (or refactor into a helper), e.g. in `buildTldrSection`:
```javascript
function buildTldrSection(tldr) {
  const section = document.createElement('section');
  section.className = 'fi-section';            // <-- add this
  section.id = 'fi-s-tldr';
  section.dataset.fiSection = 'tldr';
  // …
}
```
Apply to all six builders: `buildTldrSection`, `buildDefinitionsSection`, `buildCadreLegalSection`, `buildDemarcheSection`, `buildPiegesSection`, `buildSourcesSection`. Alternatively, change the CSS selectors from `.fi-section` to `[data-fi-section]` if you prefer to keep the renderer unchanged — but pick one contract and make CSS + JS agree.

---

### CR-02: Print rule does not actually open `<details>` — Questions clés answers stay hidden on paper

**File:** `qhse-cesi/chassis.css:1819-1826`
**Issue:** The "Force all `<details>` open in print" block sets `details.fi-qa { display: block }` and `summary { display: block; list-style: none }`. This does NOT open the `<details>` — browsers hide non-summary children of an unopened `<details>` via UA stylesheet, regardless of `display: block` on the parent. The summary remains visible, but the `.fi-qa-answer`, `.fi-qa-explanation`, and `.fi-qa-source` paragraphs print only for `<details>` the user manually opened before invoking print. The whole point of the print path is to make the fiche self-contained on A4; today, half the Questions clés content is silently dropped from the printout.
**Fix:** Either reveal children via CSS:
```css
#panel-fiches details.fi-qa > * {
  display: block !important;
}
#panel-fiches details.fi-qa > summary::before { content: none; }
```
or, more robustly, set the `open` attribute on every `<details>` programmatically before printing via a `window.matchMedia('print').addListener` or a `beforeprint` handler in the IIFE:
```javascript
window.addEventListener('beforeprint', () => {
  panel.querySelectorAll('details.fi-qa').forEach(d => d.dataset.fiPrevOpen = d.open ? '1' : '0');
  panel.querySelectorAll('details.fi-qa').forEach(d => d.open = true);
});
window.addEventListener('afterprint', () => {
  panel.querySelectorAll('details.fi-qa').forEach(d => {
    if (d.dataset.fiPrevOpen === '0') d.open = false;
    delete d.dataset.fiPrevOpen;
  });
});
```
The CSS-only fix is the simpler patch; the JS approach preserves the marker triangle and is more accessible if Reader Mode/screen reader uses print stylesheet.

## Warnings

### WR-01: `aria-live="polite"` + full `<article>` swap announces the entire fiche on every theme change

**File:** `qhse-cesi/outils.html:2360-2376` (`buildFiche` sets `aria-live="polite"` on the new article) and `2382-2427` (`renderFiche` removes/appends the whole article on each theme switch)
**Issue:** Each theme change calls `existing.remove()` then `panel.appendChild(buildFiche(fiche))`, swapping ~5-10 KB of text content. Because the new node has `aria-live="polite"` from the moment it's attached, AT software (NVDA, JAWS, VoiceOver) may announce the entire definition list, cadre légal, démarche, pièges, and sources — every theme change becomes a multi-minute monologue. The intent of `aria-live` is to announce *changes*, not the initial content of a freshly-mounted region. Combined with `aria-atomic="false"` this is the worst-case configuration: AT may announce additions piecemeal.
**Fix:** Move `aria-live` to the pre-rendered scaffold `<article>` in the HTML (where it persists across swaps and only announces real diffs), or drop the live region entirely and rely on the focus move to `.fi-title` (already implemented) to signal the change. Recommended:
```html
<!-- outils.html line 158 -->
<article class="fi-fiche" data-fi-active-fiche></article>
```
and remove the three `setAttribute('aria-live'/'aria-atomic')` calls in `buildFiche`. The focus move to `tabindex=-1` h2 already gives non-visual users the cue they need.

---

### WR-02: `safeSetHTML` calls `srcNode.tagName.toLowerCase()` without guarding against SVG/MathML nodes

**File:** `qhse-cesi/outils.html:2077`
**Issue:** `DOMParser.parseFromString(..., 'text/html')` does not parse arbitrary SVG, but it DOES allow `<svg>`, `<math>`, and other foreign-content elements inline in HTML. For foreign-namespaced elements, `tagName` is case-sensitive (and may include a namespace prefix), so `tagName.toLowerCase()` won't necessarily match the lower-case names in `ALLOWED_TAGS`. Today this is benign because curated content in `fiches-data.js` has no SVG/MathML; but a copy-paste from an INRS HTML source containing inline `<svg>` would silently drop into the "inline children" branch (treated as not allowed) and could surface unexpected content. Defense-in-depth: check `nodeType === ELEMENT_NODE` AND namespace `=== 'http://www.w3.org/1999/xhtml'` (or use `localName` instead of `tagName`).
**Fix:**
```javascript
if (srcNode.nodeType !== Node.ELEMENT_NODE) return null;
if (srcNode.namespaceURI && srcNode.namespaceURI !== 'http://www.w3.org/1999/xhtml') {
  // Reject non-HTML namespaces wholesale — no SVG/MathML smuggling
  return null;
}
const tag = srcNode.localName;  // localName is always lowercase for HTML
```
Also use `localName` rather than `tagName.toLowerCase()` to avoid the case-sensitivity gotcha entirely.

---

### WR-03: `outline: none` on `.biblio-card__link:hover, :focus-visible` removes the focus ring before re-adding it

**File:** `qhse-cesi/chassis.css:404-412`
**Issue:** The hover/focus-visible rule at line 404-408 sets `outline: none`, then the focus-visible-only rule at 409-412 re-applies an outline. Because `:hover` and `:focus-visible` are combined in the first selector, a keyboard user who tabs to a card and then mouses over it will lose their focus ring (the second `outline: 2px solid` re-applies it, but for a brief moment between hover-without-focus and focus-with-hover the user-agent's focus ring is suppressed). This is an accessibility regression and was likely a copy-paste error. Out-of-scope per phase notes ("rest of chassis.css… OUT OF SCOPE"), so flagging as Warning rather than Blocker — but if it was touched in Phase 5 the same hand should clean it up.
**Fix:**
```css
.biblio-card__link:hover {
  background-color: var(--bg-2);
}
.biblio-card__link:focus-visible {
  background-color: var(--bg-2);
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```
Note: this file region (`.biblio-*`) is flagged as out of scope for Phase 5 — leaving the finding for the next biblio touchup, do not include in P5 fix.

---

### WR-04: `appendSourceLine` accepts any URL starting with `http` — allows `http:foo` or `httpx://`

**File:** `qhse-cesi/outils.html:2123`
**Issue:** `src.url.startsWith('http')` is true for `httpx://malicious`, `http:dangerous-no-slashes`, even `http` as a literal. Today all fiche source URLs are well-formed `https://…` per `fiches-data.js`, but the guard is weaker than the one used in `safeSetHTML` (which correctly checks `/^https?:\/\//`). Inconsistency between the two URL filters is a defect-in-waiting if a future fiche author types `http:…` or paste-fixes a typo.
**Fix:**
```javascript
if (src.url && /^https?:\/\//.test(src.url)) {
  // …existing anchor build…
}
```
Apply the same regex used by `safeSetHTML` for symmetric strictness.

---

### WR-05: Double-load guard fails open when `window.FICHES = []`

**File:** `qhse-cesi/fiches-data.js:25-29`
**Issue:** `if (window.FICHES && window.FICHES.length)` — if a prior script set `window.FICHES = []` (empty array — possible during partial loads, dev tooling, test stubs, or future code that pre-allocates the global), the guard FAILS because `[].length === 0` is falsy. The second load then assigns a brand-new array, clobbering any external markers attached to the empty one. The header comment promises "first FICHES wins" but the implementation only protects against the case where the first FICHES has content. Fix is one character.
**Fix:**
```javascript
if (Array.isArray(window.FICHES)) {
  if (typeof console !== 'undefined' && console.warn) {
    console.warn('fiches-data.js loaded twice — keeping the first FICHES');
  }
} else {
  window.FICHES = [ /* … */ ];
}
```
Or simpler: `if (window.FICHES)` (any prior truthy/array assignment wins).

## Info

### IN-01: `fi-meta` line duplicates the fiche title that was just rendered immediately above

**File:** `qhse-cesi/outils.html:2173`
**Issue:** `meta.textContent = fiche.title + ' · ' + fiche.selectedIds.length + ' questions clés'` — the `<h2 class="fi-title">` directly above already shows `fiche.title`. The meta line reads, for example, "DUERP · 8 questions clés" right under the "DUERP" heading. The title repetition is purely noise; the metric ("N questions clés") is the only signal.
**Fix:**
```javascript
meta.textContent = fiche.selectedIds.length + ' questions clés';
```

---

### IN-02: Pre-rendered scaffold `<article class="fi-fiche" data-fi-active-fiche>` is removed and never re-used

**File:** `qhse-cesi/outils.html:158` and `outils.html:2386-2388`
**Issue:** The HTML pre-renders an empty `<article class="fi-fiche" data-fi-active-fiche aria-live="polite" aria-atomic="false">`. On boot, `renderFiche()` calls `panel.querySelector('article.fi-fiche')` and `existing.remove()`, then appends a freshly-built article. The pre-rendered node has no purpose other than to be removed milliseconds after parsing. Remove it from the HTML scaffold (saves a flash of empty article during boot and simplifies the contract).
**Fix:** Delete line 158 from the scaffold:
```html
<!-- outils.html -->
<nav class="fi-toc" aria-label="Sommaire de la fiche" data-fi-toc>
  <h3 class="sr-only">Dans cette fiche</h3>
  <ol></ol>
</nav>
<!-- Phase 5 Fiches engine — IIFE appended after Tests blancs IIFE -->
```
(If you keep it for graceful "no-JS" degradation, document that intent in a comment.)

---

### IN-03: Slug-fallback tautology — `themeSelect.value = slug; if (themeSelect.value !== slug) …`

**File:** `qhse-cesi/outils.html:2452-2459`
**Issue:** The pattern relies on a `<select>` rejecting unknown values (returns empty string when assigned a non-matching value), then comparing. It works, but it's idiomatic-by-accident — the fallback chain `slug = 'duerp'; themeSelect.value = slug` doesn't validate that 'duerp' actually exists in the options list either (it does today; future renames bite). Cleaner to derive the valid set from the options once and validate against it.
**Fix:**
```javascript
const validSlugs = new Set(Array.from(themeSelect.options).map(o => o.value));
let slug = validSlugs.has(prefs.lastFicheTheme) ? prefs.lastFicheTheme : 'duerp';
themeSelect.value = slug;
```
Same behavior, intent explicit.

---

### IN-04: Wave 5 sources cite "Légifrance — Art. L6113-1" with a stable URL while the fiche prose explicitly notes Légifrance is anti-bot

**File:** `qhse-cesi/fiches-data.js:1282-1285` (rncp fiche sources) and the `cadreLegal` prose at line 1250 which states "Légifrance, non hyperlié, anti-bot"
**Issue:** The `cadreLegal` body explains why Légifrance is not hyperlinked inline (anti-bot, can't be curl-verified), yet the canonical `sources[]` array at the bottom of the same fiche DOES hyperlink to Légifrance with the `LEGIARTI…` slug. This is internally inconsistent — either the URL is reachable enough to ship in `sources[]` (in which case the prose justification is misleading) or it isn't (and `sources[]` shouldn't include it). Recommend either dropping the Légifrance URL from `sources[]` and replacing with a curl-verified mirror, or removing the "anti-bot" caveat from the prose. Same pattern repeats in `icpe-seveso` and `calendrier` fiches.
**Fix:** Reconcile prose with `sources[]`. Suggested wording for the prose:
```
(<code>Art. L6113-1</code> du Code du travail — Légifrance).
```
and keep the Légifrance link in `sources[]`. Or remove the Légifrance entries from `sources[]` if the verify gate cannot reach them.

---

_Reviewed: 2026-05-31T15:50:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
