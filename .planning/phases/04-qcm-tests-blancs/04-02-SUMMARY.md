---
phase: 04-qcm-tests-blancs
plan: 02
type: execute
wave: 2
status: complete
completed: 2026-05-27
files_modified:
  - qhse-cesi/outils.html
lines_added: 506
lines_removed: 2
requirements_addressed: [QUIZ-01, QUIZ-02, QUIZ-03, SRS-03]
commit: 1dfc90c2c550590979aff3861d830e87e547c3a7
deploy_url: https://mes-apps-claude.vercel.app/qhse-cesi/outils.html
---

# Phase 4 Plan 02 — outils.html: QCM révision rapide engine

## One-liner

Shipped the QCM révision rapide mode inside `#panel-qcm` of `outils.html` — replaced the placeholder DOM with a real scaffold (theme picker + `.qz-card` + 4 choice slots + hidden reveal panel + Suivant) and appended a new IIFE after the Phase 3 Flashcards IIFE that wires auto-reveal-on-click feedback, single-write-per-session SRS error feed, and explicit-Suivant advance — closing QUIZ-01 + QUIZ-02 + QUIZ-03 + the write-half of SRS-03.

## What shipped

**Single file modified:** `qhse-cesi/outils.html` (796 → 1302 lines; +506 insertions, −2 deletions).

**Two regions touched (atomic):**

| # | Region | Before | After |
|---|--------|--------|-------|
| 1 | `#panel-qcm` block (lines 133-136 pre-edit) | One `<p class="placeholder">` | `<h2 class="sr-only">` + `<nav class="qz-theme">` with 16-option select + `<article class="qz-card">` with `[data-qz-question]`, `[data-qz-choices]`, `[data-qz-reveal][hidden]`, `[data-qz-badge]`, `[data-qz-answer]`, `[data-qz-explanation]`, `[data-qz-source]`, `[data-qz-next][hidden]` |
| 2 | After Phase 3 Flashcards `</script>`, before `</body>` | (nothing) | New `<script>` IIFE — boot/guard, pre-flight BANK+SRS check, merge-safe prefs, `buildPool`, `renderQuestion`, `renderReveal`, `onChoiceClick` (single `SRS.schedule(...,'rate',...)` call site), `onNextClick`, `onThemeChange`, `ensureScaffold` (re-mount after `renderEmpty`) |

## IIFE anatomy

| Element | Line(s) | Notes |
|---------|---------|-------|
| Banner comment | 836 | `IIFE: QCM révision rapide — auto-reveal click → SRS wrong-feed → Suivant advance` |
| Double-load guard | 842-843 | `if (window.__qzQcmBooted) return; window.__qzQcmBooted = true;` (unique name; never reuses `__fcViewBooted`) |
| DCL boot | ~1290-1296 | `if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true }); else boot();` — same pattern as Phase 3 hotfix `0553899` |
| Pre-flight BANK+SRS guard | 858-872 | Renders inline `Impossible de charger la banque de questions...` `<p class="qz-error">` on missing globals; never white-screens |
| Merge-safe `readPrefs/writePrefs` | 882-958 | Reads whole `qhse-prefs-v1`, returns all keys (including Phase 3 `lastTheme/lastMode/newCardsPerDay`), writes via `Object.assign({}, existing, partial)` so the QCM `writePrefs({ lastQcmTheme })` call cannot clobber Phase 3 prefs |
| `buildPool(theme)` | (in IIFE) | `BANK.filter(i => i.type === 'qcm' && (theme === 'all' || i.theme === theme))` — no choice shuffling (D-08); pool kept in natural BANK order |
| Single SRS write call site | **1205** | `const newRow = window.SRS.schedule(existingRow, 'rate', today);` — the only `SRS.schedule` call in this IIFE; guarded by `!isCorrect && !state.srsWrittenThisSession.has(item.id)` per D-03 + D-04 |
| Source line builder | (in `renderReveal`) | `createElement('code')` + `createElement('a', { rel: 'noopener noreferrer' })` + `textContent` only — zero `innerHTML` on bank fields (Pattern S3 / T-04-02-01 XSS gate) |
| Theme pref write | 1229 | `writePrefs({ lastQcmTheme: state.theme });` — the only `writePrefs` call in the IIFE |
| Panel-scoped event wiring | 1266-1268 | `themeSelect.change`, `choices.click` (delegated), `nextBtn.click` — zero document-level keydown listeners |
| `ensureScaffold()` re-bind | 1041-1042 | Re-wires choices+next listeners on the freshly-cloned scaffold after `renderEmpty` ran — original listeners are on detached nodes (GC-eligible); no double-bind on live DOM |

## Automated grep gates — ALL PASS

| Gate | Expected | Actual |
|------|----------|--------|
| `window.__qzQcmBooted` occurrences | 2 (guard + assignment) | **2** ✓ |
| `document.readyState === 'loading'` occurrences | ≥ 2 (Flashcards + QCM) | **2** ✓ |
| `SRS.schedule(` total occurrences | 2 (Flashcards line 546 + QCM line 1205) | **2** ✓ |
| `SRS.schedule(...'rate'...)` in QCM IIFE | ≥ 1 | **1** ✓ (line 1205) |
| `srsWrittenThisSession` references | ≥ 3 (Set decl + has + add) | **6** ✓ |
| `lastQcmTheme` references | ≥ 1 | **6** ✓ |
| `Object.assign({}, existing, partial)` (merge-safe writer) | ≥ 1 | **1** ✓ |
| `document.addEventListener('keydown'` real listeners | 0 | **0** ✓ (only match is in a comment forbidding the pattern) |
| `.innerHTML =` on bank content | 0 | **0** ✓ |
| `createElement('code'\|'a')` (Pattern S3 source builders) | ≥ 2 | **4** ✓ |
| Phase 4 QCM placeholder text removed | 0 | **0** ✓ |
| Phase 4 Tests placeholder text intact | 1 (will be removed in Plan 04-03) | **1** ✓ |
| Phase 5 fiches placeholder text intact | 1 | **1** ✓ |

## Regression verification

- **Phase 3 verify-srs.cjs:** `node .planning/phases/03-flashcards-srs/verify-srs.cjs` → exit 0, **20/20 PASS** (all SC2/SC3/SC4/SC5 + PERSIST-01 gates). Frozen `window.SRS` schema untouched.
- **No structural collateral:** the only edits to `outils.html` are inside `#panel-qcm` and inside a brand-new `<script>` block at end-of-body. `#panel-fiches`, `#panel-flashcards`, `#panel-tests`, the tablist, the Phase 3 Flashcards IIFE, and the ARIA tablist IIFE are byte-identical (`git diff` confirms changes only in the QCM region + the appended IIFE).
- **Shared globals safe:** the IIFE only READS `window.BANK` and CALLS `window.SRS.schedule` — never assigns to either. `qhse-srs-v1` schema written is exactly whatever `SRS.schedule()` returns (no shape drift). `qhse-prefs-v1` adds the new `lastQcmTheme` key via Object.assign merge — Phase 3 keys preserved.

## Manual smoke test (deferred to owner / live deploy)

Plan 04-02 calls for a live browser walkthrough on the deployed URL. I cannot drive a browser from here; the structural gates above are green and Phase 3 regression is mechanically verified. Owner should walk:

1. Open `https://mes-apps-claude.vercel.app/qhse-cesi/outils.html` → QCM tab.
2. Pick any theme → first question + 4 choices appear.
3. Click a wrong choice → ✗ Incorrect badge, canonical answer, explanation, source render instantly (no animation).
4. DevTools → Application → Local Storage → confirm `qhse-srs-v1` has a fresh row with `interval = 1`, `lapses ≥ 1`, `due = todayLocal()+1`.
5. Click Suivant (or press Space/Enter on it) → next question appears.
6. Switch theme → confirm `qhse-prefs-v1.lastQcmTheme === <picked slug>` AND `qhse-prefs-v1.lastTheme / lastMode / newCardsPerDay` still present.
7. Switch to Flashcards → confirm Phase 3 mode still works identically.

## Commit + deploy

- **Commit SHA:** `1dfc90c2c550590979aff3861d830e87e547c3a7`
- **Commit message:** `🚀 Phase 4 Plan 02 — outils.html: QCM révision rapide engine (QUIZ-01/02/03 + SRS-03 write-half)`
- **Push:** `main` → `3f8e6e4..1dfc90c` (2026-05-27 ~09:40 CET)
- **Deploy:** Vercel auto-deploy live ~60s after push at `https://mes-apps-claude.vercel.app/qhse-cesi/outils.html`

## Deviations from plan

None significant. One implementation choice worth noting:

- **`ensureScaffold()` rather than re-mounting via `innerHTML` strings:** Plan 04-02 §Task 2 step 11 suggested either cloning the original card children at boot OR re-writing the scaffold inner HTML on theme change. The shipped IIFE takes the clone-fragment-at-boot path: a `DocumentFragment` snapshot of `els.card.children` is captured before any render runs, and `ensureScaffold()` (called from `onThemeChange` before `renderQuestion`) re-clones from that snapshot if `renderEmpty` had wiped the card. This keeps zero `innerHTML` writes anywhere — the Pattern S3 XSS gate stays clean even on the empty-pool-recovery path.

## Known stubs / deferred

- **Manual smoke test** — see §Manual smoke test above.
- **Tests blancs panel (`#panel-tests`)** — still shows the placeholder `Ce mode arrive en Phase 4 — tests blancs chronométrés.` Plan 04-03 will replace it and add the timed-exam IIFE.
- **`verify-quiz.cjs` gate** — Plan 04-04 will add a Node assertion suite covering all six verification groups across Plans 02 + 03 (single SRS call site per IIFE, merge-safe prefs writers, XSS-safe source builders, etc.).

## Threat flags

None new. Plan threat model items T-04-02-01..09 + T-04-02-SC all mitigated or accepted as written:

- T-04-02-01 (XSS on bank prose) — `mitigate`: source line built with `createElement` + `textContent`; grep gate `.innerHTML =` returns 0.
- T-04-02-02 (qhse-srs-v1 schema drift) — `mitigate`: only `window.SRS.schedule()` returns rows; Phase 4 writes the whole returned object; Phase 3 verify-srs.cjs still PASS post-edit.
- T-04-02-03 (qhse-prefs-v1 Phase 3 key clobber) — `mitigate`: `Object.assign({}, existing, partial)` merge verified present.
- T-04-02-04 (wrong-QCM double-penalty) — `mitigate`: `state.srsWrittenThisSession` Set blocks re-writes within one panel session.
- T-04-02-05..08 — `accept`: single-user app; localStorage owner-only; quota implausible at 226 keys × ~80 bytes.
- T-04-02-09 (garbage `lastQcmTheme` in prefs) — `mitigate`: `readPrefs` type-checks; unknown slug → empty pool → `renderEmpty()` shows no-pool message; no crash.

## Self-check: PASSED

- File `qhse-cesi/outils.html` modified (1302 lines, +506 / −2).
- `#panel-qcm` placeholder removed; 16-option theme picker + `[data-qz-card]` scaffold present.
- New IIFE present, single `SRS.schedule(...'rate'...)` call site, single `writePrefs({ lastQcmTheme: ... })` call.
- Zero `document.addEventListener('keydown')` real listeners; zero `.innerHTML =` writes on bank content.
- Phase 3 verify-srs.cjs still exits 0 (20/20 PASS).
- Committed as `1dfc90c` and pushed to `main`; Vercel deploy in flight.
