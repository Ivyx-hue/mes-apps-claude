---
phase: 01-shell-gateway
reviewed: 2026-05-17T14:59:21Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - qhse-cesi/chassis.css
  - qhse-cesi/index.html
  - qhse-cesi/outils.html
findings:
  critical: 0
  warning: 3
  info: 4
  total: 7
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-05-17T14:59:21Z
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Phase 1 "Shell & Gateway" was reviewed adversarially against its locked decisions and the governing constraint SHELL-04 (zero regression on the frozen v1.0 Hub).

**Verified-correct (no findings, intentional by design):**

- **D-01 verbatim extraction confirmed.** `chassis.css` is a byte-for-byte copy of the former inline `<style>` block from `index.html`, differing only by the stripped leading newline and trailing whitespace that lived inside the old `<style>...</style>` tags. CSS body is identical. No "dead CSS", "unused selector", de-dup, or formatting findings raised — verbatim preservation is the explicit requirement.
- **D-07/D-08/D-09 confirmed minimal.** Diffing `index.html` against base `0d5944e` shows the *only* markup changes are: (1) `<li hidden>` → `<li id="nav-outils">` for the Outils nav item, (2) `<section id="outils" ... hidden>` → un-hidden, (3) rewritten gateway copy + 4-item `<ul>` + same-tab `<a href="outils.html">`. The IIFE (sticky-shadow / scrollspy / burger / Phase-3 biblio data) and every other section are untouched. No regression to frozen Hub markup.
- **D-05 ARIA tablist structure is largely correct.** Roles (`tablist`/`tab`/`tabpanel`), `aria-selected`, `aria-controls`, `aria-labelledby`, initial roving `tabindex`, arrow/Home/End keyboard nav with correct wrap-around modular arithmetic, and `[hidden]` panel toggling are all wired correctly.
- Relative paths resolve correctly: `chassis.css`, `outils.html`, and `index.html` are all siblings in `qhse-cesi/`. Skip-link `#main` target exists in both pages.
- No injection/XSS surface in this phase's new code: the Phase-3 biblio block (pre-existing, not modified this phase) escapes all interpolated values via `esc()`; `outils.html` writes no `innerHTML`.

**Remaining concerns** are real defects in the new `outils.html` tab IIFE (focus/scroll/history side effects on page load) and a11y gaps, plus minor quality items. None are correctness/security blockers.

## Warnings

### WR-01: Tab IIFE steals focus and scrolls the page on every load

**File:** `qhse-cesi/outils.html:107` (called from `:123`)
**Issue:** `activate()` ends with an unconditional `tab.focus()`. On page load, line 123 calls `activate(initial)`, so the very first tab button receives programmatic focus on *every* visit — even a normal navigation from the Hub gateway link, with no user interaction. Because the focused element sits below the sticky header, the browser scrolls it into view, producing an unexpected jump and moving the user's focus away from the top of the document. Programmatic focus management should only occur in response to user-initiated activation (click / arrow key), never on initial render. This degrades keyboard and screen-reader UX and contradicts WAI-ARIA APG guidance ("on load, do not move focus").
**Fix:** Split focus out of `activate()`, or pass a flag:
```js
function activate(tab, { focus = true } = {}) {
  tabs.forEach(t => {
    const active = t === tab;
    t.setAttribute('aria-selected', String(active));
    t.tabIndex = active ? 0 : -1;
  });
  panels.forEach(p => { p.hidden = p.id !== tab.getAttribute('aria-controls'); });
  if (focus) tab.focus();
}
// click / keydown handlers call activate(tab)  (focus = true)
// initial restore must NOT focus or scroll:
activate(initial, { focus: false });
```

### WR-02: `location.hash` mutation on load pollutes URL and browser history

**File:** `qhse-cesi/outils.html:105` (executed via `:123`)
**Issue:** `activate()` assigns `location.hash = tab.id` unconditionally. On a fresh visit with no hash, `activate(tabs[0])` rewrites the URL to `outils.html#tab-flashcards` and pushes a new history entry, so the user's Back button returns to `outils.html` (no hash) instead of the Hub they came from — a navigation trap. Additionally, because `tab.id` (`tab-flashcards`) is a real element id, the assignment makes the browser scroll that element into view, compounding WR-01's jump. Hash should only be written on genuine user-initiated tab changes, and should use `history.replaceState` rather than mutating `location.hash` to avoid spurious history entries.
**Fix:** Remove the hash write from `activate()`. Write the hash only from the click/keydown paths, without a history push:
```js
function selectFromUser(tab) {
  activate(tab);                 // focus = true
  history.replaceState(null, '', '#' + tab.id);
}
tab.addEventListener('click', () => selectFromUser(tab));
// arrow/Home/End -> selectFromUser(targetTab)
// initial restore: activate(initial, { focus:false });  // no hash write
```

### WR-03: Tabpanels are not keyboard-focusable (a11y gap)

**File:** `qhse-cesi/outils.html:58,63,68,73`
**Issue:** Each `[role="tabpanel"]` contains only static text (a `<p class="placeholder">`) with no focusable child. Per WAI-ARIA APG, when a tabpanel has no focusable content it must carry `tabindex="0"` so keyboard-only and screen-reader users can move focus into the panel to read/scroll it after activating a tab. Without it, pressing Tab from the active tab skips past the panel content entirely to the footer, making the panel text unreachable by keyboard in the expected reading order.
**Fix:** Add `tabindex="0"` to every panel:
```html
<div role="tabpanel" id="panel-flashcards" aria-labelledby="tab-flashcards" tabindex="0">
<div role="tabpanel" id="panel-fiches" aria-labelledby="tab-fiches" tabindex="0" hidden>
<div role="tabpanel" id="panel-qcm" aria-labelledby="tab-qcm" tabindex="0" hidden>
<div role="tabpanel" id="panel-tests" aria-labelledby="tab-tests" tabindex="0" hidden>
```

## Info

### IN-01: Tab buttons missing `type` attribute

**File:** `qhse-cesi/outils.html:37,42,47,52`
**Issue:** `<button>` elements default to `type="submit"`. There is no `<form>` ancestor here so behavior is currently benign, but relying on the absence of a form is fragile and the default is a known foot-gun if these tabs are ever moved or wrapped. Explicit intent is preferable.
**Fix:** Add `type="button"` to each tab `<button>`.

### IN-02: `tab-shell` / `tab-list` carry no styling

**File:** `qhse-cesi/outils.html:34-35` (no matching rules in `qhse-cesi/chassis.css`)
**Issue:** `.tab-shell`, `.tab-list`, and the `[role="tab"]` / `[role="tabpanel"]` selectors have zero rules in `chassis.css`. The tablist renders as an unstyled bulleted list of default-styled buttons. This is consistent with Phase 1 being pure scaffolding, but the result is a visually raw shell — flagged for awareness, not as a regression (chassis.css is verbatim by D-01; tab styling was never specced into it). Subsequent phases or a follow-up should add scoped tab styling, ideally without breaking the chassis.css verbatim guarantee (e.g., a separate page-scoped `<style>` or a deliberate, documented chassis amendment).
**Fix:** Defer to a later phase; track that `outils.html` needs a tab-component style pass.

### IN-03: Dead `data-target=""` attribute on Outils nav link

**File:** `qhse-cesi/outils.html:27`
**Issue:** `<a href="index.html" data-target="">` carries an empty `data-target`. The scrollspy that consumes `data-target` lives only in `index.html`'s IIFE; `outils.html` has no code reading this attribute, so it is inert. Harmless but misleading — it implies a scrollspy contract that does not exist on this page.
**Fix:** Drop `data-target=""` from the Retour-au-Hub link, or leave it if intentional for cross-page consistency (low priority).

### IN-04: Pre-existing undefined `.mono` class (context only — not introduced this phase)

**File:** `qhse-cesi/index.html` (14 occurrences, e.g. `:62`, `:80`, `:150`)
**Issue:** `class="mono"` is used 14 times but `.mono` is not defined anywhere in `chassis.css` (only the `--font-mono` token and element selectors `code, kbd, samp, time[datetime]` exist). These spans therefore render in the body sans-serif font, not monospace. **This is pre-existing in the frozen v1.0 Hub** — the base commit `0d5944e` already used `.mono` 29 times with no `.mono` rule, and Phase 1's verbatim extraction (D-01) correctly preserved that state. It is recorded here as context, not as a defect introduced or fixable by this phase: flagging it as a chassis.css change would violate the SHELL-04 verbatim-preservation constraint. Recommend tracking as a separate frozen-Hub bug ticket outside this phase's scope.
**Fix:** Out of scope for Phase 1. If pursued later, add `.mono { font-family: var(--font-mono); }` as a deliberate, documented chassis amendment (post-freeze), not as part of verbatim extraction.

---

_Reviewed: 2026-05-17T14:59:21Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
