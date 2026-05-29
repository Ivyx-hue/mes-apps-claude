---
phase: 05-fiches-de-r-vision
plan: 01
type: execute
wave: 1
status: complete
completed: 2026-05-29
duration_min: ~40
files_modified:
  - qhse-cesi/chassis.css
  - qhse-cesi/outils.html
files_created:
  - qhse-cesi/fiches-data.js
lines_added: 397
selectors_introduced: 51_scoped
tokens_added: 0
requirements_addressed: []
# Plumbing plan. Closes no requirement on its own; underpins FICHE-01 + FICHE-02 (content arrives in Plans 05-02..05-05).
---

# Phase 5 Plan 01 — Plumbing: `.fi-*` CSS + `#panel-fiches` scaffold + Fiches IIFE shell + `fiches-data.js` skeleton

## One-liner

Shipped the static structural foundation for Phase 5: a `#panel-fiches`-scoped `.fi-*` CSS block + 8 print rules + 4 locked print typography overrides + conditional `@page` in `chassis.css`; the 15-option theme picker scaffold + `__fiBooted` IIFE shell (DCL boot, pre-flight check, merge-safe prefs, empty-state `renderFiche` stub) in `outils.html`; and the `window.FICHES = []` skeleton in a new `fiches-data.js` — so Waves 2-5 can author fiche content against a finished, byte-stable renderer contract.

## What shipped

| File | Change | Commit |
|------|--------|--------|
| `qhse-cesi/chassis.css` | +366 lines (`.fi-*` block + print extensions + `@page`) | `6c901b9` (Task 1) |
| `qhse-cesi/outils.html` | +185 / −2 (head wiring + 15-option scaffold + Fiches IIFE) | `a5f1a43` (Task 2) |
| `qhse-cesi/fiches-data.js` | new file, 31 lines (`window.FICHES = []` + WR-04 guard) | `a5f1a43` (Task 2) |

**Task 1 — chassis.css (`6c901b9`):** `.fi-*` component block inside `@layer components` (banner `/* ============ Phase 5 — Fiches de révision (.fi-*) ============ */`), all 51 selectors `#panel-fiches`-prefixed, zero new `:root` tokens, zero animations/transitions. `@media print` extended with the 8 LOCKED numbered rules (panel isolation, per-fiche page-break, details force-open, section underline restore, sources page-break, flat-white card) + the 4 LOCKED print typography overrides (`11pt` body, `1.5rem` fi-title, `1.15rem` h3, `0.8em` fi-cite) + conditional `@page { margin: 1cm; size: A4 portrait; }` (was absent — UI-SPEC line 457 resolves to ADD).

**Task 2 — outils.html + fiches-data.js (`a5f1a43`):**
- `<head>`: `<script src="fiches-data.js" defer>` after `srs.js` (load order outils-data → srs → fiches-data).
- `#panel-fiches`: placeholder replaced with scaffold — `<h2 class="sr-only">`, `nav.fi-theme` with `<select id="fi-theme-select">` carrying **15 options, no `all`** (DEC-01), `nav.fi-toc` placeholder, single `<article data-fi-active-fiche aria-live="polite">`.
- New `<script>` after the Tests IIFE: `__fiBooted` double-load guard, DCL-deferred `boot()` (Pitfall-1 hotfix pattern from `0553899`), pre-flight `BANK`/`FICHES` check with French error path, `DEFAULT_PREFS = { lastFicheTheme: 'duerp' }`, merge-safe `readPrefs`/`writePrefs` (`Object.assign({}, existing, partial)`), empty-state `renderFiche(slug)` stub, panel-scoped `onThemeChange` wiring only, boot-time merge-safe `lastFicheTheme` materialization. Zero `SRS.schedule` calls, zero new SRS/scores store references (DEC-09).
- `fiches-data.js`: WR-04 idempotent double-load guard mirroring `outils-data.js`; ships `window.FICHES = []` (content in 05-02..05-05).

## Verification (all gates PASS)

**Task 1 — chassis.css:**

| Gate | Result |
|------|--------|
| `.fi-*` banner exactly once | PASS (1) |
| Bare `.fi-*` selectors | PASS (0 — all `#panel-fiches`-scoped) |
| Scoped `#panel-fiches .fi-*` selectors | PASS (51 ≥ 20) |
| `@page` + `size: A4 portrait` | PASS (1 / 1; was 0 pre-edit) |
| Print typography: `11pt` / `fi-title 1.5rem` / `h3 1.15rem` / `fi-cite 0.8em` | PASS (1 each) |
| `page-break-before: always` | PASS (2 ≥ 2) |
| `details.fi-qa` states / `min-height: 44px` | PASS (9 / 13) |

**Task 2 — outils.html + fiches-data.js:**

| Gate | Result |
|------|--------|
| `script src="fiches-data.js" defer` | PASS (1) |
| `id="fi-theme-select"` | PASS (1) |
| `<option>` count in picker | PASS (15, no `all`) |
| single `<article data-fi-active-fiche>` element | PASS (1 element; grep=2 counts the JS `querySelector('[data-fi-active-fiche]')` too) |
| `__fiBooted` | PASS (2 — check + set) |
| `SRS.schedule(` file-wide | PASS (2 — Phase 3 + Phase 4 only; Fiches adds 0) |
| DEC-09 baseline-delta `qhse-srs-v1` | PASS (PRE=4, NOW=4) |
| DEC-09 baseline-delta `qhse-scores-v1` | PASS (PRE=2, NOW=2) |
| `lastFicheTheme` | PASS (7 ≥ 4) |
| real document-keydown handlers in Fiches IIFE | PASS (0 — the 3 `document.addEventListener('keydown'` grep hits are all `// NEVER …` anti-pattern reminder comments, one per QCM/Tests/Fiches IIFE; zero real handlers) |
| `fiches-data.js` `window.FICHES` / `loaded twice` | PASS (6 / 1) |
| Node load `node -e "…require('./qhse-cesi/fiches-data.js')…"` | PASS — prints `true 0` |

**Regression:**

| Gate | Result |
|------|--------|
| `node .planning/phases/03-flashcards-srs/verify-srs.cjs` | PASS — exit 0 |
| `node .planning/phases/04-qcm-tests-blancs/verify-quiz.cjs` | PASS — exit 0 |

## Commit + deploy

- **Task 1:** `6c901b9` — `feat(05-01): append .fi-* CSS namespace block + print rules + @page to chassis.css`
- **Task 2:** `a5f1a43` — `feat(05-01): wire fiches-data.js skeleton + #panel-fiches scaffold + __fiBooted IIFE shell`
- **Deploy:** `https://mes-apps-claude.vercel.app/qhse-cesi/outils.html` (auto-deploys ~60s after push; Fiches tab shows the 15-option picker + empty-state message, no console errors).

## Deviations from Plan

**Worktree isolation malfunction + mid-task session-limit recovery.** The Wave 1 executor was dispatched as a `gsd-executor` subagent with `isolation="worktree"`, but the worktree did not isolate: Task 1's commit (`6c901b9`) landed directly on `main` while the worktree branch (`worktree-agent-a17f50b11969b8ef5`) stayed empty at base and locked. The agent then hit a session token limit mid-Task-2 — `outils.html` was fully edited but left **uncommitted**, and `fiches-data.js` (Edit 4) was never created. On the next session the orchestrator recovered inline (within the GSD workflow): created the missing `fiches-data.js` skeleton per the plan's Edit 4 spec, re-ran the full gate suite + regression gates against the recovered working tree, committed Task 2 atomically (`a5f1a43`), and force-removed the stale worktree. No work was lost; the final tree matches the plan exactly.

The plan objective described "three artifacts land in one atomic commit"; the per-task structure (Task 1 / Task 2) and the executor's behavior produced two commits (`6c901b9` chassis + `a5f1a43` outils+data) — standard GSD per-task atomicity, no functional impact.

## Known Stubs

- `renderFiche(slug)` ships the **empty-state path only** — when `window.FICHES` is empty (Wave 1) or no slug matches, it renders `<p class="fi-empty">Aucune fiche disponible…`. The full 6-section renderer + ToC injector arrives in Plan 05-02 and is then byte-stable through 05-05.
- `nav.fi-toc > ol` ships empty; the IIFE re-renders its anchor links per-fiche starting in 05-02.
- `window.FICHES = []` — the 15-fiche literal is authored in 05-02..05-05.

## Threat Flags

None unmitigated. T-05-01-01 (writePrefs clobber) mitigated via merge-safe `Object.assign`; T-05-01-02 (FICHES→innerHTML) N/A in Wave 1 (FICHES empty; empty-state path uses `createElement`+`textContent`); T-05-01-04 (DEC-09 SRS/scores mutation) mitigated — zero `SRS.schedule`, baseline-delta gates hold (srs-v1 PRE=NOW=4, scores-v1 PRE=NOW=2). verify-fiches.cjs (Plan 05-06) will codify these as runtime assertions.

## Self-Check: PASSED

- 2 files modified (`chassis.css`, `outils.html`) + 1 created (`fiches-data.js`).
- Both task commits present on `main` (`6c901b9`, `a5f1a43`).
- All Task 1 + Task 2 grep gates pass; Node FICHES load prints `true 0`.
- Phase 3 verify-srs.cjs + Phase 4 verify-quiz.cjs both exit 0 (zero regression).
- DEC-09 store-isolation invariant holds (no new SRS/scores references).
- Stale worktree removed; tree clean except unrelated `.claude/settings.local.json`.
