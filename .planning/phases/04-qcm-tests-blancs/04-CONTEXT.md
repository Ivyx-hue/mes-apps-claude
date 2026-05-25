# Phase 4: QCM + Tests blancs - Context

**Gathered:** 2026-05-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the **QCM (mode révision rapide)** and **Tests blancs chronométrés** study modes on top of the frozen Phase 2 bank, integrate the **wrong-QCM SRS write path** into the Phase 3 `qhse-srs-v1` store, and ship a **persistent score history** under `qhse-scores-v1` — without touching `srs.js`, `outils-data.js`, the Flashcards engine, or the v1.0 Hub reading surfaces.

Covers requirements **QUIZ-01, QUIZ-02, QUIZ-03** (QCM mode + wrong-answer SRS feed), **TEST-01, TEST-02, TEST-03** (timed mock exams + score history with strict no-SRS isolation), and closes the write-half of **SRS-03** (Phase 3 shipped the schema; Phase 4 writes wrong-QCM into it).

**In scope:** QCM engine inside `#panel-qcm` (auto-reveal on click, "Suivant" advance, wrong → full SM-2 "raté" write to `qhse-srs-v1`), Tests blancs engine inside `#panel-tests` (fixed 20-question random shuffle, fixed 20-min countdown, free back/forward navigation, abandon button with confirmation, final score + per-question correction with sources), `qhse-scores-v1` per-session history (cap 50 FIFO, compact table view at bottom of `#panel-tests`), `qhse-prefs-v1` extensions for last-theme-per-mode.

**NOT in scope:** Modifying `srs.js` (frozen Phase 3 — read-only via `window.SRS.schedule`), modifying `outils-data.js` (frozen Phase 2 — read-only via `window.BANK`), modifying the Flashcards IIFE, fiches de révision (Phase 5), print stylesheet (Phase 5), runtime AI generation, backend, multi-user, leaderboard, analytics, per-question retrospective inside the score row, mid-test save/resume across reload (deliberate — see D-12), Tests blancs ever writing to `qhse-srs-v1` (D-V2-03 hard invariant).

</domain>

<decisions>
## Implementation Decisions

### QCM answer flow (mode révision rapide)
- **D-01:** **Auto-reveal au clic** — single click on a choice immediately reveals correct/incorrect + canonical answer + explanation + source. No "Valider" intermediate step. Matches the Flashcards rhythm (1 click = 1 action). Implication: the wrong-answer SRS write fires on the same click (no separate validation event).
- **D-02:** **Bouton "Suivant" explicite** to advance to the next question — supports `Space` / `Enter` keyboard shortcuts (matches Flashcards reveal key). No auto-advance, no click-anywhere-on-verso. Owner reads explanation and source at their own pace.
- **D-03:** **Mauvais clic = plein "raté" SM-2** — wrong answer in QCM mode writes to `qhse-srs-v1[itemId]` with the exact semantics of the Flashcards "raté" button: `interval` reset to `1` day, `ease` -= `0.20` (floor 1.3), `lapses += 1`, `due` = today + 1, `reps` unchanged. Implementation MUST call `window.SRS.schedule(state, 'rate')` — never re-implement SM-2 math. (Closes the SRS-03 write-half cross-phase contract.)
- **D-04:** **1 écriture SRS par session de panel** — when the user opens `#panel-qcm`, a per-session in-memory `Set<itemId>` records which cards have already written to `qhse-srs-v1`. Subsequent clicks (re-attempt on same card, or re-reveal navigation) are SRS-no-ops. The set resets when the panel is left (tab switch) or page reloaded. Avoids double-penalty if the owner re-attempts the same card in a single sitting.

### Tests blancs composition
- **D-05:** **Taille fixe : 20 questions / test**. Universal across themes ("Tous les thèmes" or any single theme). If the chosen theme pool < 20, draw all available items + fill from "Tous" (or: if pool < 20, refuse to start with explanatory message — planner's call; lock the 20-question target).
- **D-06:** **Minuteur fixe 20 minutes** (1200 seconds) — 1 minute per question. Display `MM:SS` countdown at the top of the test view, updated every second via `setInterval` (cleared on unmount/finish/abandon).
- **D-07:** **Navigation libre back/forward** — Précédent / Suivant buttons + progress indicator `5/20`. Owner can revisit and change answers until final submission. No mid-test lock.
- **D-08:** **Random shuffle du pool filtré** — at test start, the QCM pool is filtered by theme then shuffled (Fisher-Yates), first 20 items kept. Choice order within each QCM is **preserved** (no shuffle of `choices[]`; `correct` index stays valid). Each session = fresh shuffle.

### Score history (qhse-scores-v1)
- **D-09:** **Vue historique en bas de `#panel-tests`** — below the "Démarrer un test" / "Test en cours" / "Résultats" UI, a persistent "Historique" section. Single-panel UX, no modal, no sub-tab. Always visible when not actively in a test.
- **D-10:** **Schema minimal** par entrée :
  ```js
  {
    id: 'test-1716638400000',     // timestamp ms as ID
    dateISO: '2026-05-25',         // local-day, same date strategy as qhse-srs-v1.due (RESEARCH §local-day)
    theme: 'duerp' | 'all',        // theme slug or 'all'
    score: 17,                     // count of correct
    total: 20                      // always 20 under D-05 but explicit for future-flexibility
  }
  ```
  No `durationSec`, no `status`, no per-question `answers[]`. SRS already traces wrong-QCM lapses; the score history is a coarse-grained "comment je m'améliore par thème" record.
- **D-11:** **Cap 50 entrées FIFO** — when adding the 51st entry, the oldest is removed. Keeps localStorage footprint bounded (~3KB max). Visual list stays scannable.
- **D-12:** **Table compacte** : `<table>` with columns `date | thème | score` (e.g., `17/20`), sorted most-recent-first. No card grid, no sparkline, no inline graph. Coherent with the Hub's editorial-dense identity.

### Interruption behavior
- **D-13:** **Timeout : bandeau d'alerte mais le test continue** — at `00:00`, the timer turns red and a banner appears ("Temps écoulé"), but the test does NOT auto-submit. Owner can keep answering. When they finish manually, the saved score row has its `dateISO` and the over-time fact is implicit (no explicit `overtime` field — keeping D-10 schema minimal). Tolerant by default; less examen-strict but more aligned with the personal-study use case.
- **D-14:** **Fermeture d'onglet / changement de panel = abandon silencieux** — no `beforeunload` warning, no auto-save of test state, no write to `qhse-scores-v1`. The test is lost. Phase 4 deliberately does NOT introduce a `qhse-test-in-progress` key — keeps the persistence surface minimal and avoids timer-cheating via tab-pause.
- **D-15:** **Bouton "Abandonner" avec confirmation** — visible during the test (next to Précédent/Suivant or in a corner). Click → native `confirm()` modal "Es-tu sûr ? Tes réponses seront perdues" → confirm = return to the test start screen, no write. Cancel = stay in test.
- **D-16:** **F5 / reload pendant un test = test perdu, retour à l'accueil panel** — coherent with D-14. No restoration, no warning dialog. Simplifies the engine state machine.

### Claude's Discretion
- **CSS namespace:** Phase 3 established `.fc-*` for Flashcards. Phase 4 uses `.qz-*` (shared "quiz" prefix covering both QCM and Tests blancs) since the rendering of a question + 4 choices is identical between the two modes — diverging only on the wrapper (auto-reveal vs select+navigation). One CSS namespace, two IIFE consumers. Alternative `@scope (#panel-qcm)` / `@scope (#panel-tests)` rejected for tooling-grep friendliness.
- **Module layout in `outils.html`:** Two new IIFEs added inline after the existing Flashcards IIFE — one for QCM, one for Tests blancs. Both share a small inline helper `renderQuestion(item, opts)` defined once. All consume `window.BANK`, `window.SRS`, and own `localStorage` helpers via thin getter/setter pairs (no scattered `localStorage.getItem`). DCL boot pattern mandatory (Phase 3 hotfix lesson).
- **`qhse-prefs-v1` extensions:** P4 adds keys `lastQcmTheme` (string, default `'all'`) and `lastTestTheme` (string, default `'all'`). Schema must be **merge-safe** (read existing object, set new keys, write back — never `setItem(stringify({lastQcmTheme: ...}))` which would clobber P3's `newCardsPerDay` and `lastTheme`).
- **Verification gate:** New `qhse-cesi/verify-quiz.cjs` mirrors `verify-srs.cjs` pattern (plain Node `require`, exit 0/1, named PASS assertions). Asserts:
  1. QCM wrong-answer write produces a state equivalent to `window.SRS.schedule(state, 'rate')` against synthetic fixtures
  2. Test composition: filter by theme then shuffle yields 20 items when pool ≥ 20
  3. `qhse-scores-v1` round-trip + FIFO cap enforcement (insert 51 items, oldest dropped)
  4. `qhse-prefs-v1` merge-safety (existing P3 keys preserved after P4 write)
  5. Tests blancs path does NOT mutate `qhse-srs-v1` (D-V2-03 invariant) — assertion against an in-memory store snapshot
  6. Schema compatibility with Phase 3 `verify-srs.cjs` — no regression on the SRS contract
- **Keyboard discipline:** Arrow keys do NOT navigate between QCM choices (would collide with browser default tab traversal). `Tab` moves focus naturally; `Enter`/`Space` on a focused choice button selects it. In Tests blancs, `Tab`/`Shift-Tab` move through Précédent/Suivant/choices.
- **No animations on reveal/timer** — `chassis.css` already honours `prefers-reduced-motion`; reveal is an instant visual state change (background colour + check/cross icon).
- **No regression on Phase 1/2/3 deliverables:** Flashcards IIFE untouched, `srs.js` untouched, `outils-data.js` untouched, `verify-srs.cjs` untouched, chassis.css receives only `.qz-*` additions (gated under `#panel-qcm`, `#panel-tests` parent selectors).
- **Atomic commit/push per delivery unit** (D-V2 token-conscious discipline carried over): QCM engine = 1 commit, Tests blancs engine = 1 commit, score history view = 1 commit, verify-quiz.cjs gate = 1 commit (shipped with the engine it verifies).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Authoritative milestone design (read first — locked, do not re-litigate)
- `.planning/V2-ETUDE-SPEC.md` — owner-approved locked decisions D-V2-01..06. **Spaced repetition section** locks: `qhse-srs-v1` per-card store, `qhse-scores-v1` test history, `qhse-prefs-v1` last theme/mode. "Flashcards self-grades and QCM wrong answers feed the SRS queue. Tests blancs do not." — this sentence is the cross-phase invariant Phase 4 enforces.

### Phase scope & requirements
- `.planning/ROADMAP.md` § Phase 4 — phase goal + 4 owner-verifiable success criteria (QCM with feedback, wrong-QCM → SRS, tests blancs with countdown + per-question correction, score history with `qhse-scores-v1` + tests-blancs-do-not-touch-qhse-srs-v1 isolation proof).
- `.planning/REQUIREMENTS.md` — QUIZ-01..03, TEST-01..03 (full text + traceability). Note: SRS-03 write-half completion lives here (P3 shipped the schema, P4 writes the wrong-QCM path).

### Architecture / integration target (read-only dependencies)
- `.planning/phases/01-shell-gateway/01-CONTEXT.md` — Phase 1 decisions: ARIA tablist IIFE pattern, `[hidden]` toggle, hash sync, dated placeholders. `panel-qcm` and `panel-tests` are the mount slots (D-06).
- `.planning/phases/02-content-bank/02-CONTEXT.md` — Phase 2 decisions: 15-theme closed vocabulary, item schema, immutability contract (Object.freeze). P4 reads `window.BANK.filter(i => i.type === 'qcm' && (theme === 'all' || i.theme === theme))`, never mutates.
- `.planning/phases/03-flashcards-srs/03-CONTEXT.md` — Phase 3 decisions: `qhse-srs-v1` schema with `introduced` field (the cross-phase contract Phase 4 must respect); `window.SRS` API surface (use `SRS.schedule(state, 'rate')` for wrong-QCM, never re-implement SM-2 math); local-day ISO date strategy for `due`; DCL boot pattern for inline IIFE consuming `window.BANK`.
- `qhse-cesi/outils.html` — the page Phase 4 extends. Two new IIFEs after the existing Flashcards IIFE; mount points are `#panel-qcm` (line 133) and `#panel-tests` (line 138), each currently containing a `<p class="placeholder">` to be replaced.
- `qhse-cesi/outils-data.js` — the frozen `window.BANK` consumed by Phase 4. **Read-only** dependency. 92 items where `type === 'qcm'`.
- `qhse-cesi/srs.js` — frozen Phase 3 module. **Read-only** dependency. Use `window.SRS.schedule(state, grade)` where `grade ∈ {'rate', 'hard', 'good', 'easy'}` and `state` is the per-card row from `qhse-srs-v1`.
- `qhse-cesi/chassis.css` — token/layer system. Phase 4 components added inline-scoped via `.qz-*` classes gated under `#panel-qcm` / `#panel-tests` parent selectors to keep them local.

### Discipline (binding for this phase)
- `C:\Users\Lasmoles\.claude\projects\C--Users-Lasmoles-mes-apps-claude\memory\feedback_token_conscious_work.md` — atomic commit/push per unit of work.
- `qhse-cesi/verify-srs.cjs` — pattern reference for the new `verify-quiz.cjs` gate (plain Node, named PASS assertions, exit 0/1, ROADMAP success criteria as assertions). Must NOT be modified — Phase 4 ships a sibling, not a replacement.
- `qhse-cesi/LEGAL.md` — link-only / no `.pdf` rules. Phase 4 introduces no new external content (consumes the frozen bank only).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`window.BANK` (frozen, 226 items, 92 of which are `type:'qcm'`)** — the content pool. ES5-safe, loaded with `defer`. Read-only; filter by theme + type for QCM mode (`BANK.filter(i => i.type === 'qcm' && (theme === 'all' || i.theme === theme))`), then `slice(0,20)` after shuffle for Tests blancs.
- **`window.SRS` (frozen Phase 3 API)** — `SRS.schedule(state, grade)` with `grade ∈ {'rate', 'hard', 'good', 'easy'}` returns the next state. P4 calls `SRS.schedule(currentState, 'rate')` on wrong QCM clicks. Never re-implements SM-2.
- **Existing ARIA tablist IIFE in `outils.html`** — architectural template. Same conventions: `'use strict'`, no globals, `[hidden]` toggle, `history.replaceState`. P4's two new IIFEs follow the same shape.
- **Flashcards IIFE in `outils.html` (Phase 3)** — closest analog for IIFE structure: theme picker, render function, state-update loop, DCL boot. P4's QCM IIFE reuses theme-picker code shape (compact `<select>` with the 15 themes + "Tous").
- **`#panel-qcm` (outils.html:133) and `#panel-tests` (outils.html:138)** — mount points. Each currently contains a single placeholder `<p>` to replace. The surrounding `<div role="tabpanel">` and tab wiring stay untouched.
- **`@layer components` in chassis.css** — the place for `.qz-*` rules if any survive the `#panel-qcm`/`#panel-tests` parent-selector scoping.
- **chassis.css `@media (prefers-reduced-motion: reduce)`** — already in place; no flips/fades planned but any future motion must respect it.
- **chassis.css OKLCH tokens + Fraunces/Inter/JetBrains Mono** — visual identity reused. Question stem uses Fraunces for emphasis, choice buttons use Inter, correct/incorrect badges and `source.ref` use JetBrains Mono.

### Established Patterns
- **Zero build, vanilla JS, ES5-safe** (PERSIST-02 invariant). Phase 4 modules are inline `<script>` in `outils.html`, same as the ARIA tab IIFE and Flashcards IIFE.
- **DCL boot for inline IIFE consuming a deferred global** (Phase 3 hotfix lesson `0553899`). Both new IIFEs wrap their `boot()` body in a `DOMContentLoaded` listener (or fire immediately if `document.readyState !== 'loading'`) — never read `window.BANK` / `window.SRS` at script parse time.
- **Atomic commit per delivery unit** (token-conscious discipline). One commit per: QCM engine, Tests blancs engine, score history view, verify-quiz.cjs gate. Never one giant patch.
- **Verification-gate-first** (`verify-bank.cjs`, `verify-srs.cjs` precedent). `verify-quiz.cjs` is the executable ROADMAP success-criteria contract; ships in the same commit that ships the code it verifies.
- **localStorage as the only persistence** (PERSIST-02). All state mutates through thin getter/setter pairs scoped per IIFE; no direct `localStorage.getItem` scattered across the codebase.
- **Local-day date strategy** (Phase 3 RESEARCH §local-day). `dateISO` strings use `(year, monthIndex, day)` Date constructor to defeat UTC offset issues. P4 `qhse-scores-v1[*].dateISO` reuses this exact discipline (probably extract a helper if it isn't already exported by srs.js).

### Integration Points
- `outils.html` `#panel-qcm` and `#panel-tests` — the only DOM mount points for new code. No edits to other panels.
- `qhse-srs-v1` — Phase 4 calls `SRS.schedule(state, 'rate')` and writes the result back to `qhse-srs-v1[itemId]` on wrong QCM clicks (QUIZ-03 / SRS-03 write-half). The `introduced` field is read (to check if this card was already in the queue) and preserved through the update. Tests blancs NEVER touch this key (D-V2-03, asserted by `verify-quiz.cjs`).
- `qhse-prefs-v1` — Phase 4 merge-adds `lastQcmTheme`, `lastTestTheme`. Read existing object, mutate keys, write back. Schema must remain backward-compatible with Phase 3's `{ lastTheme, lastMode, newCardsPerDay }`.
- `qhse-scores-v1` — Phase 4 writes per-completed-test session rows `{id, dateISO, theme, score, total}` with FIFO cap 50. Read on score-history view render, sorted newest-first.
- Deploy: push `main` → GitHub Actions → Vercel; live at `…/qhse-cesi/outils.html` (~60s). Root QHSE Trainer + Hub reading content + Flashcards P3 remain untouched (SHELL-04 invariant + zero-regression on P3).

</code_context>

<specifics>
## Specific Ideas

- "Auto-reveal au clic" (owner) — the QCM révision rapide rhythm should match the Flashcards 1-click-1-action cadence; "Valider" buttons add a friction the daily-study workflow doesn't need.
- "Plein 'raté' SM-2 sur mauvais clic" (owner) — wrong-QCM weight equals wrong-flashcard weight; the SRS doesn't distinguish between presentation modes, only between correct recall and not-correct recall. Honours the cross-phase contract: `qhse-srs-v1` is mode-agnostic.
- "1 écriture par session de panel" (owner) — protects the SRS from double-penalty if the owner re-reviews the same card in a single sitting; in-memory `Set<itemId>` is the simplest enforcement mechanism (no extra localStorage key needed).
- "20 questions, 20 minutes, navigation libre" (owner) — examen-realistic baseline. The 1 min/question calibration matches typical CESI QCM exam pacing. Free back/forward navigation respects how examens really work (you can return to skipped questions).
- "Bandeau d'alerte mais le test continue à 0:00" (owner) — tolerant timer; the user-study purpose is mastery, not time-pressure simulation. The timer is feedback, not a guillotine.
- "Abandon silencieux" (owner) — no `beforeunload`, no auto-save. Simplifies the engine; tab-close = test lost, no record. The owner doesn't want a polluted history with "abandoned" entries — only completed tests count.
- "Cap 50 FIFO" (owner) — bounded localStorage footprint + scannable history. At 1 test/day that's 50 days of recent records, which is the right zoom for tracking pre-rentrée progress.
- "Table compacte (date | thème | score)" (owner) — matches the editorial dense identity of the Hub (Découverte / Biblio); a sparkline or card grid would feel out-of-place.
- Owner is a Bachelor QHSE alternant with strong industrial/regulatory vocabulary; the QCM content is exam-grade prose from the frozen bank — UI layer just renders it. No tooltips on acronyms (the `explanation` field handles that), no vulgarization.

</specifics>

<deferred>
## Deferred Ideas

- **Per-question retrospective in score row** — saving each `{itemId, picked, correct}` would enable "which QCMs I missed in this test" view. Considered and rejected for D-10; SRS already traces wrong-QCM lapses via `qhse-srs-v1`. Could be revisited in a later milestone if exam-review workflow needs richer retrospectives.
- **Mid-test save/resume across reload** — would require a `qhse-test-in-progress` key and timer pause logic. Rejected for D-14/D-16 (timer-cheating surface + engine complexity). Stays out of scope.
- **Statistique agrégée sur l'historique** — average score per theme, trend lines, week-over-week. Could compute on-render from the 50-entry cap. Not needed for v2.0; revisit in a hypothetical v2.1 if real use surfaces the need.
- **Filtrage de l'historique par thème** — drop-down filter above the table. Trivial extension when cap 50 grows tight. Not needed in v2.0 ship.
- **Export historique (CSV / JSON)** — manual data extraction for offline study. Out of v2.0 scope; localStorage inspection from devtools suffices for single-user.
- **Shuffle des choix `choices[]` (option order randomization)** — rejected for D-08; the existing `correct` index would need dynamic remapping and verify-quiz.cjs assertions get harder. Could be added later if memorize-by-position becomes a felt problem.
- **Fiches de révision** — Phase 5.
- **Print stylesheet** — Phase 5.

None of the above is scope creep — all are explicit deferrals or later phases in the locked roadmap.

</deferred>

---

*Phase: 4-qcm-tests-blancs*
*Context gathered: 2026-05-25*
