---
phase: 03-flashcards-srs
plan: 03
subsystem: ui
tags: [flashcards, srs, sm2, localstorage, aria, vanilla-js, css-components]

# Dependency graph
requires:
  - phase: 03-01
    provides: window.SRS scheduler (schedule/isDue/addDays/todayLocal/filterDue/countNew + DEFAULTS + GRADE)
  - phase: 03-02
    provides: verify-srs.cjs gate confirming SRS contract
  - phase: 02-content-bank
    provides: window.BANK frozen 226-item array (read-only)
  - phase: 01-shell-gateway
    provides: ARIA tablist + #panel-flashcards mount point in outils.html

provides:
  - Flashcards view IIFE in outils.html: DOM scaffold + SM-2 grading + theme picker + réglages + bandeau counters + empty-queue UX + free-revision mode
  - .fc-* CSS namespace appended to chassis.css @layer components (bandeau, card, recto, verso, grades, empty, free controls)
  - qhse-srs-v1 localStorage store (per-card SM-2 rows with introduced field for Phase 4 SRS-03)
  - qhse-prefs-v1 localStorage store (lastTheme, lastMode, newCardsPerDay — merge-safe for Phase 4/5)

affects:
  - 03-04 (polish plan: may reference IIFE structure and .fc-* selectors)
  - 04-qcm (SRS-03 write-half reads qhse-srs-v1 introduced field)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Flashcards view IIFE: 'use strict' IIFE with double-load guard, panel-scoped listeners, readPrefs/writePrefs/readStore/writeStore as only 4 localStorage access points"
    - "XSS-safe DOM rendering: textContent + createElement + appendChild, zero innerHTML uses anywhere in IIFE"
    - "Free-revision structural separation: startFreeRevision/renderFreeCard/quitFreeRevision never reference writeStore or SRS.schedule (T-03-03-06)"
    - "Additive CSS: .fc-* namespace appended before @layer components closing brace, zero deleted lines, no new :root tokens"
    - "D-06 empty-queue UX: scan store for minimum due > today for next-due date display"
    - "buildSession: seenDue + capped newPool (SRS.countNew cap enforcement) shuffled via Fisher-Yates"

key-files:
  created: []
  modified:
    - qhse-cesi/outils.html
    - qhse-cesi/chassis.css

key-decisions:
  - "D-01 honored: entire 226-item bank used (QCM items repackaged question→recto, answer→verso)"
  - "D-02 honored: verso uniforme = answer + explanation + source for all card types, no type badge"
  - "D-03 honored: DEFAULT_PREFS.newCardsPerDay = 10, owner-adjustable 1-50 via Réglages, persisted"
  - "D-06 honored: free-revision structurally separated — startFreeRevision/renderFreeCard own code path with no writeStore reference"
  - "localStorage encapsulated in exactly 4 functions (5 call sites total, well within <=8 limit)"
  - "comment text containing 'innerHTML' auto-fixed to remove the word and satisfy zero-innerHTML acceptance check"

patterns-established:
  - "Flashcards IIFE: panel-scoped keydown with verso.hidden gate + form-control bypass (e.target.matches('select,input,textarea'))"
  - "source.url rendered via a.href = url (not string interpolation) — T-03-03-07 belt-and-suspenders"
  - "Free-revision banner injected via createElement+insertBefore, not innerHTML"

requirements-completed:
  - FLASH-01
  - FLASH-02
  - SRS-02
  - SRS-03
  - SRS-04
  - PERSIST-01

# Metrics
duration: 45min
completed: 2026-05-25
---

# Phase 03 Plan 03: Flashcards View Summary

**Full SM-2 flashcard review view wired in outils.html: theme picker, recto/verso reveal, 4-grade SM-2 scheduling persisted to qhse-srs-v1, bandeau counters, empty-queue panel with free-revision mode, and .fc-* CSS namespace appended to chassis.css**

## Performance

- **Duration:** ~45 min
- **Started:** 2026-05-25T00:29:00Z
- **Completed:** 2026-05-25T01:15:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Appended 336-line `.fc-*` CSS namespace to `chassis.css` inside `@layer components` — zero deleted lines, no new `:root` tokens, no transitions or `@keyframes`, all 6 touch-target floors at 44px minimum height
- Replaced `#panel-flashcards` placeholder with full DOM scaffold: bandeau with JetBrains Mono counters + Réglages `<details>` disclosure, `.fc-theme` nav with 16 options (all + 15 slugs in locked source order), `.fc-card` article with recto/verso sections and 4 grade buttons, `.fc-empty` empty-queue panel
- Added `<script src="srs.js" defer></script>` in `<head>` immediately after outils-data.js tag
- Implemented complete Flashcards view IIFE: `readPrefs/writePrefs/readStore/writeStore` as the only 4 localStorage-touching functions (5 call sites total), `buildSession` with seenDue + capped-newPool + Fisher-Yates shuffle, `gradeCard` calling `SRS.schedule` and persisting to `qhse-srs-v1`, `renderBandeau` with dues/new counters and sr-only live region
- Free-revision mode structurally separated: `startFreeRevision/renderFreeCard/quitFreeRevision` never reference `writeStore` or `SRS.schedule` (T-03-03-06 structural guarantee)
- XSS guard verified: zero `innerHTML` uses — all bank content rendered via `textContent`/`createElement`/`appendChild` (T-03-03-01)
- Existing tablist IIFE at lines 88–139 fully intact, panel wrapper attributes byte-identical

## Task Commits

1. **Task 1: .fc-* CSS namespace** — `9cc1f2e` (feat)
2. **Task 2: outils.html DOM scaffold + Flashcards IIFE** — `59d3751` (feat)

## Files Created/Modified

- `qhse-cesi/chassis.css` — Appended `/* === Flashcards (Phase 3) === */` block with all `.fc-*` component rules inside `@layer components` before the closing brace (was line 546)
- `qhse-cesi/outils.html` — Added `srs.js` script tag; replaced placeholder with DOM scaffold; appended Flashcards view IIFE after tablist IIFE

## Decisions Made

- Free-revision controls (`Carte suivante` + `Quitter la révision libre`) are created via `createElement` and injected into `.fc-verso` on first `startFreeRevision()` call — hidden/shown on subsequent calls — avoids innerHTML
- `renderCard()` re-hides `fc-grades` and hides any existing free-revision controls on each card advance, keeping recto/verso state consistent
- Boot sequence restores `select.value` and `elCap.value` from prefs BEFORE event wiring so no spurious `change` fires on load
- When `buildSession` returns an empty queue but the themed pool is non-empty, `renderEmpty()` is called (correct: all cards are future-due); when the themed pool itself is empty, an inline "no cards" message is shown
- `data-state` attribute on `[data-fc-dues]` drives the CSS color via `[data-state="has-dues"]` and `[data-state="zero"]` selectors

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed 'innerHTML' from a code comment**
- **Found during:** Task 2 (XSS innerHTML acceptance check)
- **Issue:** Comment text `// renderCard(card) — XSS-safe: textContent only, no innerHTML` contained the literal word `innerHTML`, causing the zero-innerHTML acceptance check to report 1 occurrence
- **Fix:** Rewrote comment to `// renderCard(card) — XSS-safe: textContent + createElement only (T-03-03-01)`
- **Files modified:** `qhse-cesi/outils.html`
- **Verification:** `node -e "... (h.match(/innerHTML/g)||[]).length ... === 0"` passes
- **Committed in:** `59d3751` (part of Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — comment text false-positive)
**Impact on plan:** Trivial cosmetic fix. No behavior change. Required to satisfy the zero-innerHTML acceptance criterion.

## Issues Encountered

- Task 1 acceptance check for `:root {` in the fc-* block produced a false positive because the checker scanned everything from the banner comment to EOF, capturing a pre-existing `:root { color-scheme: light; }` in the print media block (below `@layer components`). The fc-* block itself introduces no `:root` declarations — confirmed by inspection and the non-regression `git diff --unified=0` zero-deletions gate.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes at trust boundaries. The plan's threat register covers all new surface:
- T-03-03-01 (XSS via bank content): mitigated — zero `innerHTML` uses
- T-03-03-02 (QuotaExceededError): mitigated — `writeStore`/`writePrefs` wrapped in try/catch
- T-03-03-03 (corrupt localStorage JSON): mitigated — `readStore`/`readPrefs` wrap JSON.parse in try/catch
- T-03-03-06 (free-revision bypass): mitigated — structural code path separation confirmed
- T-03-03-07 (javascript: URL in source.url): mitigated — `url.startsWith('http')` guard before `a.href = url`

## Known Stubs

None. The view is fully wired: `window.BANK` is the 226-item frozen bank (Phase 2), `window.SRS` provides all SM-2 math (Phase 3 Plan 01), `qhse-srs-v1` persists per-card state, `qhse-prefs-v1` persists user preferences. No placeholder data, no hardcoded empty values.

## User Setup Required

None — no external service configuration required. Changes auto-deploy via GitHub Actions → Vercel on push to main (already pushed: commits `9cc1f2e` + `59d3751`).

## Next Phase Readiness

- ROADMAP SC1–SC5 are fully satisfied by this plan: recto/verso reveal (SC1), 4-grade SM-2 persist (SC2), dues-today filter (SC3), reload-survives (SC4), raté re-queues tomorrow (SC5)
- Phase 4 QCM can write wrong-answer data into `qhse-srs-v1` using the same `item.id` key and the `introduced` field contract is in place (SRS-03 schema half shipped)
- Plan 03-04 (polish) can reference `.fc-*` CSS selectors and the IIFE export structure directly — no architectural changes needed

## Self-Check: PASSED

- `qhse-cesi/chassis.css` contains `.fc-card`, `.fc-bandeau`, `.fc-grades`, `.fc-empty`, `[data-fc-reveal]`, banner comment exactly once, no motion rules in fc-* block
- `qhse-cesi/outils.html` contains `<script src="srs.js" defer></script>`, all 15 theme slugs, grade buttons, `window.SRS`, `window.BANK`, `qhse-srs-v1`, `qhse-prefs-v1`, zero `innerHTML` uses, zero document-level keydown, 5 localStorage call sites (≤8 limit), tablist IIFE intact, panel wrapper byte-identical
- Commits verified: `9cc1f2e` (chassis.css), `59d3751` (outils.html)
- Both pushed to `main` (remote: `803c4b8..59d3751`)

---
*Phase: 03-flashcards-srs*
*Completed: 2026-05-25*
