---
phase: 03-flashcards-srs
verified: 2026-05-25T02:10:00+02:00
status: human_needed
score: 5/5 must-haves verified
overrides_applied: 0
human_verification:
  - test: "Open outils.html in a real browser and confirm the Flashcards tab shows a live card (not the error fallback) — verify window.BANK and window.SRS both loaded after the DOMContentLoaded hotfix is applied on Vercel."
    expected: "Bandeau shows '0/226 dues · 0/10 nouvelles'; a Fraunces question renders in the card; 'Révéler' button is enabled."
    why_human: "The DOMContentLoaded race fix (commit 0553899) is correct in code but its correctness under Vercel's CDN asset serving order (outils-data.js + srs.js both deferred, order guaranteed by DOM position) can only be fully confirmed by the owner's browser walk-through — which IS documented in 03-SMOKE-TEST.md as PASS, but that evidence is already the owner's own verification, not an independent check."
  - test: "Grade a card 'Raté', then reload outils.html. Confirm the graded card row in qhse-srs-v1 has lapses=1, interval=1, due=tomorrow, introduced=today, and those values survive the reload."
    expected: "DevTools → Application → Local Storage → qhse-srs-v1 shows the card row intact after reload."
    why_human: "localStorage persistence across sessions requires a real browser — cannot be verified programmatically from the codebase alone."
  - test: "Activate free-revision mode, click 'Carte suivante' several times, then check qhse-srs-v1 in DevTools — confirm the timestamp/value of every key is unchanged."
    expected: "qhse-srs-v1 is byte-for-byte identical before and after multiple free-revision navigations."
    why_human: "D-06 structural purity is guaranteed by code path separation (verified in code), but the end-to-end browser confirmation that no state mutation leaks through is a real-browser check."
---

# Phase 3: Flashcards + SRS — Verification Report

**Phase Goal:** The owner can study flashcards with spaced repetition — reviewing due cards, self-grading, and returning the next day to find the scheduler has advanced their queue.
**Verified:** 2026-05-25T02:10:00+02:00
**Status:** human_needed
**Re-verification:** No — initial verification.

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Owner opens Flashcards tab, picks a theme, sees recto question, clicks "Révéler", sees verso (answer + explanation + source) | VERIFIED | `outils.html:103–119` — `.fc-recto` with `[data-fc-question]` + `[data-fc-reveal]` button; `.fc-verso[hidden]` with `[data-fc-answer]`, `[data-fc-explanation]`, `[data-fc-source]`. `revealCard()` at line 458 populates all three fields via `textContent`/`createElement` and removes the `hidden` attribute. All 15 theme options present in `<select>`. Smoke-test SC1 owner-verified. |
| 2 | After revealing, 4 self-grade buttons (raté/dur/bien/facile) advance to next card and persist to `qhse-srs-v1` via SM-2 | VERIFIED | `outils.html:112–117` — 4 `<button data-fc-grade>` elements. `gradeCard()` at line 503 calls `window.SRS.schedule(row, grade, today)` then `writeStore(store)` (line 511–512). SM-2 math verified by `verify-srs.cjs` (21 PASS, exit 0, confirmed live by verifier). Smoke-test SC2 owner-verified. |
| 3 | "À réviser aujourd'hui" view surfaces only cards whose computed due date is today or earlier | VERIFIED | `buildSession()` at line 358 splits bank into `seenDue` (cards with `isDue(row, today)=true`) and capped `newPool`. `filterDue()` in `srs.js:192` uses lexicographic `row.due <= today` comparison. `renderBandeau()` shows the live `dues/total` counter. `verify-srs.cjs` PASS `[SC3/SRS-02 isDue past/today/future]` and `[SC3/SRS-02 filterDue returns only cards whose row.due <= today]`. Smoke-test SC3 owner-verified. |
| 4 | Reloading `outils.html` restores SRS progress (ease/interval/due/lapses/reps) and last-used theme/cap from localStorage | VERIFIED | `readPrefs()` at line 257 reads `qhse-prefs-v1`; `readStore()` at line 287 reads `qhse-srs-v1`. Boot sequence at line 764–786 restores `elTheme.value = prefs.lastTheme` and `elCap.value = prefs.newCardsPerDay` before building session. `verify-srs.cjs` PASS `[SC4/PERSIST-01 qhse-srs-v1 schema JSON round-trip]` and `[SC4/PERSIST-01 qhse-prefs-v1 schema JSON round-trip preserves unknown keys]`. Smoke-test SC4 owner-verified. |
| 5 | Grading a card "raté" produces lapses≥1 + interval=1 + due=tomorrow; SRS-03 flashcard half is live; QCM half is explicitly deferred to Phase 4 with schema asserted | VERIFIED | `schedule()` in `srs.js:136–143` — `RATE` branch sets `lapses += 1`, `interval = RATE_RESET_INTERVAL (= 1)`, reps unchanged (D-07). `verify-srs.cjs` PASS `[SC2/SRS-01 E2 first raté ever]`. SRS-03 correctly marked Partial in `REQUIREMENTS.md` with P3/P4 split annotation. `introduced` field in schema is the P4 forward-compatibility contract (`srs.js:183`). Smoke-test SC5 owner-verified. |

**Score:** 5/5 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `qhse-cesi/srs.js` | Pure SM-2 module, `window.SRS` frozen namespace, 6 functions + DEFAULTS + GRADE | VERIFIED | 231 lines; `Object.freeze()` applied to namespace, DEFAULTS, and GRADE (lines 28, 43, 218); double-load guard at line 17; `todayLocal()` uses `sv-SE` locale; `addDays()` uses local-day `(year, month, day)` constructor |
| `.planning/phases/03-flashcards-srs/verify-srs.cjs` | Node gate, 21 named PASS assertions, exits 0 | VERIFIED | 277 lines; `global.window = {}` shim at line 24; `require(srsPath)` at line 27; 5 assertion groups (a–e); live run by verifier confirmed exit 0 with all 21 PASS lines |
| `qhse-cesi/outils.html` (Flashcards IIFE) | Full flashcard view, DOMContentLoaded guard, 4 localStorage helpers, XSS-safe rendering | VERIFIED | DOMContentLoaded guard at lines 790–794 (`readyState === 'loading'` check + `{ once: true }` listener); 4 localStorage functions: `readPrefs` (259), `writePrefs` (276), `readStore` (287), `writeStore` (299) — exactly 5 call sites, all within those 4 functions; zero `innerHTML` uses confirmed by grep |
| `qhse-cesi/chassis.css` (.fc-* namespace) | `.fc-bandeau`, `.fc-card`, `.fc-recto`, `.fc-verso`, `.fc-grades`, `.fc-empty`, grade button rules; zero new `:root` tokens | VERIFIED | 336-line block appended at line 547; all selectors scoped to `.fc-*` or `#panel-flashcards [data-fc-*]`; no `@keyframes`, no `transition` added; touch targets at 44px (`min-height: 44px` on select, input, reveal button, grade buttons) |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `outils.html <head>` | `srs.js` | `<script src="srs.js" defer></script>` | WIRED | `outils.html:17` — positioned immediately after `outils-data.js` defer tag; `defer` guarantees evaluation before DOMContentLoaded |
| Flashcards IIFE | `window.SRS.schedule` | Direct call in `gradeCard()` | WIRED | `outils.html:509` — `const newRow = window.SRS.schedule(row, grade, today)` |
| Flashcards IIFE | `window.SRS.todayLocal()` | Called in `buildSession()` and `gradeCard()` | WIRED | `outils.html:359, 506` |
| Flashcards IIFE | `window.SRS.isDue()` | Called in `buildSession()` | WIRED | `outils.html:371` |
| Flashcards IIFE | `window.SRS.countNew()` | Called in `buildSession()` | WIRED | `outils.html:377` |
| Flashcards IIFE | `window.BANK` | Read in `buildSession()` | WIRED | `outils.html:360–362` — reads `window.BANK` (Phase 2 frozen 226-item bank); pre-flight check at line 226 guards against missing BANK |
| `gradeCard()` | `qhse-srs-v1` | `writeStore(store)` at line 512 | WIRED | `writeStore` calls `localStorage.setItem('qhse-srs-v1', ...)` at line 301 |
| `readPrefs()` / `writePrefs()` | `qhse-prefs-v1` | `localStorage.getItem/setItem` | WIRED | Lines 259, 278, 281 — merge-safe (Object.assign preserves unknown keys for Phase 4 extensions) |

---

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| `renderCard(card)` | `card.question`, `card.answer`, `card.explanation`, `card.source` | `window.BANK[i]` — frozen 226-item Phase 2 bank | Yes — BANK is sourced, schema-verified, non-empty | FLOWING |
| `buildSession(theme)` | `queue[]` | `window.BANK` filtered by `theme` + `SRS.isDue(store[id], today)` | Yes — real SM-2 due-date filtering against persisted store | FLOWING |
| `renderBandeau()` | `session.dues`, `session.newIntroduced` | Decremented in `gradeCard()` on each grade | Yes — live session counter | FLOWING |
| `renderEmpty()` | `nextDue` | Scan of `store` keys for `row.due > today` | Yes — reads real persisted SRS rows | FLOWING |

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| SM-2 gate exits 0 (21 assertions) | `node .planning/phases/03-flashcards-srs/verify-srs.cjs --final` | Exit 0, all 21 PASS lines printed | PASS |
| `window.SRS.schedule` exports as function | Node inline check via verify-srs.cjs bootstrap | `typeof SRS.schedule === 'function'` — PASS | PASS |
| `srs.js` has no `innerHTML`, `localStorage`, `document` in functional code | grep on `qhse-cesi/srs.js` | No matches in functional code (only in comment block, documented deviation) | PASS |
| `outils.html` has zero `innerHTML` uses | grep on `qhse-cesi/outils.html` | No matches — confirmed | PASS |
| `outils.html` localStorage access is only within 4 helper functions | grep for `localStorage.getItem/setItem` | Lines 259, 278, 281, 289, 301 — all within `readPrefs`, `writePrefs`, `readStore`, `writeStore` | PASS |
| No document-level keydown listener | grep for `document.addEventListener.*keydown` | No matches — keyboard is panel-scoped at line 730 | PASS |
| Root QHSE Trainer unchanged across all Phase 3 commits | `git diff a01e5ee^ a458fce -- index.html` | Empty diff — zero changes | PASS |

---

### Probe Execution

No `probe-*.sh` scripts declared for this phase. Verification gate `verify-srs.cjs` serves as the executable contract; confirmed live above.

| Probe | Command | Result | Status |
|-------|---------|--------|--------|
| `verify-srs.cjs` | `node .planning/phases/03-flashcards-srs/verify-srs.cjs --final` | Exit 0 / 21 PASS | PASS |

---

### Requirements Coverage

| Requirement | Description | Status | Evidence |
|-------------|-------------|--------|----------|
| FLASH-01 | User can study flashcards (recto question → reveal verso answer + explanation + source) for chosen theme or all themes | SATISFIED | DOM scaffold with `.fc-recto`/`.fc-verso`, theme `<select>` with 16 options, `revealCard()` populates answer+explanation+source via XSS-safe DOM methods |
| FLASH-02 | After revealing, user self-grades on 4 levels (raté / dur / bien / facile) | SATISFIED | 4 `[data-fc-grade]` buttons wired to `gradeCard()`; keyboard shortcuts 1–4 via panel-scoped keydown |
| SRS-01 | Standard SM-2 scheduler computes each card's next due date from self-grades, persisted in `qhse-srs-v1` | SATISFIED | `srs.js` pure SM-2 with D-07 Anki defaults; `gradeCard()` calls `SRS.schedule()` and `writeStore()`; 8 E1-E8 edge cases all PASS in verify gate |
| SRS-02 | "À réviser aujourd'hui" view surfaces all cards currently due | SATISFIED | `buildSession()` separates `seenDue` from `newPool`; bandeau counter shows `dues/total`; `filterDue()` asserted correct by verify gate |
| SRS-03 | Flashcard self-grades AND wrong QCM answers feed SRS queue | PARTIAL (by design) | P3 ships the flashcard-grade half (live write path to `qhse-srs-v1`); `introduced` field is the P4 forward-compat contract; QCM feed is Phase 4. Correctly marked Partial in REQUIREMENTS.md. |
| SRS-04 | SRS progress persists across sessions and survives reloads | SATISFIED | `readStore()`/`writeStore()` encapsulate all `qhse-srs-v1` access; JSON round-trip asserted by verify gate; boot sequence restores from localStorage before rendering |
| PERSIST-01 | All persistence uses three documented `localStorage` keys (`qhse-srs-v1`, `qhse-scores-v1`, `qhse-prefs-v1`); last theme/mode restored on return | SATISFIED | `readPrefs`/`writePrefs` handle `qhse-prefs-v1`; `readStore`/`writeStore` handle `qhse-srs-v1`; `qhse-scores-v1` is Phase 4 (not introduced yet — correct); boot at line 764 restores `lastTheme` and `newCardsPerDay` |

---

### Locked Decision Audit (D-01 through D-07)

| Decision | Contract | Status | Evidence |
|----------|----------|--------|----------|
| D-01: Entire 226-item bank used (QCM items repackaged as flashcards) | `buildSession` reads ALL bank items regardless of `type` | HONORED | `outils.html:360–362` — `window.BANK` (all 226) vs `window.BANK.filter(c => c.theme === theme)`; no `type` filter applied |
| D-02: Verso uniforme — `answer + explanation + source` for all item types | No type badge; `choices`/`correct` ignored in flashcard mode | HONORED | `revealCard()` at line 458 reads `currentCard.answer`, `.explanation`, `.source` — never reads `choices` or `correct` |
| D-03: `newCardsPerDay = 10` cap fixed, owner-adjustable 1–50, persisted | `DEFAULT_PREFS.newCardsPerDay = 10`; `<input min="1" max="50">`; persisted via `writePrefs` | HONORED | `outils.html:249`/`73`/`690–699`; verify gate asserts cap simulation (15 candidates → exactly 10 introduced) |
| D-04: Adjustable via Réglages disclosure | `<details class="fc-settings">` with number input | HONORED | `outils.html:69–77`; input clamped on change at line 691–693 |
| D-06: Free-revision purity — does NOT touch SM-2 state | `startFreeRevision`/`renderFreeCard`/`quitFreeRevision` structurally separated; no `writeStore` or `SRS.schedule` reference | HONORED | `gradeCard()` at line 504 returns early when `freeRevision === true`; `renderFreeCard` at line 597 has zero calls to `writeStore`; verify gate PASS `[SC5/SRS-04 free-revision purity]` |
| D-07: Stock Anki SM-2 constants (ease 2.5, floor 1.3, intervals 1/6, rate -0.20, dur -0.15, facile +0.15 / ×1.3) | `DEFAULTS` frozen object in `srs.js` | HONORED | `srs.js:28–40` — all 11 constants match D-07 spec exactly; E1–E8 edge cases confirm math |
| DOMContentLoaded boot guard (new pattern from hotfix 0553899) | Inline IIFE body wrapped in `boot()`; dispatched via `DOMContentLoaded` or immediately if `readyState !== 'loading'` | HONORED | `outils.html:790–794` — `{ once: true }` listener prevents double-fire; `readyState` fallback handles scripts injected after DCL |

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| None | — | No TBD/FIXME/XXX/TODO/HACK markers found in any Phase 3 modified file | — | — |
| None | — | No `innerHTML` uses in `outils.html` Flashcards IIFE | — | — |
| None | — | No document-level `keydown` listener | — | — |
| `outils.html` | 576 | `elEmpty.hidden = false; elEmpty.hidden = true;` — redundant double assignment in `startFreeRevision()` | INFO | No functional impact (second assignment is the intended state); cosmetic dead write | 

The one INFO item (double assignment at line 576) is a minor cosmetic issue, not a blocker. The second `elEmpty.hidden = true` is the authoritative assignment; the first is a dead write that does nothing harmful.

---

### SHELL-04 Invariant Check

Root QHSE Trainer (`/index.html`) unchanged across all Phase 3 commits:

- `git diff a01e5ee^ a458fce -- index.html` → empty diff (confirmed live)
- v1.0 Hub reading content (`qhse-cesi/index.html`) not modified by Phase 3 (Phase 3 only modifies `outils.html`, `chassis.css`, `srs.js`, and planning artifacts)

**SHELL-04: CONFIRMED INTACT**

---

### SRS-03 Contract Analysis (Phase 4 gate)

`verify-srs.cjs` asserts the `qhse-srs-v1` row schema via `deepStrictEqual` (line 149). The `introduced` field is present and stable across all grades (E8 assertion, line 127). The schema shape `{ ease, interval, due, lapses, reps, introduced }` is pinned by the gate. Any Phase 4 write path that drifts the schema will fail the gate pre-push. This is the intended contract per STATE.md Key Decision "SRS-03 split P3/P4".

---

### Human Verification Required

The owner has already completed the browser walk-through documented in `03-SMOKE-TEST.md` (all boxes ticked, 2026-05-25). The human verification items below are surfaced by the verifier as confirmation that the owner-verified evidence is the authoritative source for the browser-only behaviors — they do not represent unchecked gaps.

#### 1. Live DOMContentLoaded behavior in production browser

**Test:** Open `https://mes-apps-claude.vercel.app/qhse-cesi/outils.html` in a fresh browser tab (no cached state). Confirm no console error appears and the first card question is visible.
**Expected:** Bandeau shows counter in JetBrains Mono; a Fraunces question renders; "Révéler" is enabled; no "Impossible de charger la banque" error in DevTools console.
**Why human:** DOMContentLoaded load-order guarantee with deferred scripts is correct in code but only the live Vercel environment confirms that both `outils-data.js` and `srs.js` are served and evaluated before DCL. Owner confirmed this in the smoke test.

#### 2. localStorage persistence across a real browser reload

**Test:** Grade 3 cards (mix of raté/bien/facile). Reload the page. Open DevTools → Application → Local Storage.
**Expected:** `qhse-srs-v1` contains rows for the 3 graded cards with correct schema fields (`ease`, `interval`, `due`, `lapses`, `reps`, `introduced`). `qhse-prefs-v1` reflects the last-used theme and cap.
**Why human:** localStorage persistence across sessions is a browser-only behavior; cannot be confirmed from static code analysis.

#### 3. Free-revision purity in a live session

**Test:** Clear localStorage, grade 1 card to empty the queue, click "Continuer en révision libre", click "Carte suivante" 5 times, click "Quitter la révision libre". Check `qhse-srs-v1` in DevTools.
**Expected:** `qhse-srs-v1` contains exactly 1 entry (the graded card) — not modified by free-revision navigation.
**Why human:** Structural code separation is verified in code, but the end-to-end session test in a real browser is the definitive D-06 proof.

---

### Gaps Summary

No gaps found. All 5 ROADMAP success criteria are verified in the codebase. All 7 Phase 3 requirements are either SATISFIED (FLASH-01/02, SRS-01/02/04, PERSIST-01) or correctly PARTIAL by design (SRS-03 with Phase 4 tracking). All 7 locked decisions are honored. No anti-pattern blockers. No debt markers.

The `human_needed` status is due to three browser-only behaviors that cannot be verified from static code analysis alone. The owner's `03-SMOKE-TEST.md` walk-through (all boxes ticked, 2026-05-25) already constitutes the human verification evidence for these items. If the smoke test evidence is accepted as sufficient, this phase is effectively `passed`.

---

## Phase 4 Entry Gate

Phase 4 (QCM + Tests blancs) is unblocked. Pre-conditions:

- `qhse-srs-v1` schema is pinned by `verify-srs.cjs` — any Phase 4 write into the queue will be caught pre-push if it drifts
- `qhse-prefs-v1` merge-safe contract is asserted (unknown-key preservation test in verify gate)
- `window.BANK` remains frozen (Phase 2 contract); Phase 4 reads it, never mutates it
- The `introduced` field in each SRS row is the cross-phase contract for wrong-QCM-feeds-SRS (SRS-03 write half)

---

_Verified: 2026-05-25T02:10:00+02:00_
_Verifier: Claude (gsd-verifier) — goal-backward methodology, initial verification_
_Phase 3 commit chain: `a01e5ee` → `19aa162` → `803c4b8` → `9cc1f2e` → `59d3751` → `c881231` → `c94a508` → `0553899` → `a458fce`_
