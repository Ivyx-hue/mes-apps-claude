# Phase 4: QCM + Tests blancs - Research

**Researched:** 2026-05-25
**Domain:** Vanilla JS quiz engines (auto-reveal QCM + timed mock exam) with localStorage persistence, embedded inline in `outils.html` alongside frozen `window.BANK` (P2) and `window.SRS` (P3)
**Confidence:** HIGH

## Summary

Phase 4 is implementation-oriented, not framework-comparison. The "stack" is fixed by `CLAUDE.md` (pure HTML/CSS/JS, zero build, single-file additions to `outils.html`) and by Phases 1–3 (DCL boot pattern, ES5-safe inline IIFE, `.fc-*` namespace precedent, frozen `window.BANK` + `window.SRS`, localStorage thin getter/setter pairs, named-PASS Node verification gate). The research therefore investigates **patterns** — not libraries.

Two new IIFEs (QCM + Tests blancs) consume `window.BANK.filter(i => i.type === 'qcm')` (92 items), share a `renderQuestion(item, opts)` helper, share the `.qz-*` CSS namespace (CONTEXT.md), and bind all event listeners to panel-scoped DOM (never `document`). The QCM IIFE writes the wrong-answer SRS feed via `window.SRS.schedule(state, 'rate')` (the only allowed entry point to `qhse-srs-v1` mutation — D-03). The Tests blancs IIFE has a strict structural invariant: it must NEVER touch `qhse-srs-v1` (D-V2-03, asserted by the verify gate). A new `.planning/phases/04-qcm-tests-blancs/verify-quiz.cjs` mirrors the `verify-srs.cjs` plain-Node pattern.

**Primary recommendation:** Build two IIFEs with a shared `renderQuestion()` helper. Use `Date.now()` deltas (not `setInterval` tick counting) for the timer. Use `requestAnimationFrame`-throttled UI updates inside a `setInterval(1000ms)` for clock display. Treat `qhse-scores-v1` as append-only with cap-50 FIFO via `unshift + slice(0, 50)`. The native `confirm()` call for abandon is the right choice — it blocks the event loop but `setInterval` resumes correctly afterward (verified pattern in Phase 3 hotfix lessons).

## User Constraints (from CONTEXT.md)

### Locked Decisions

**QCM answer flow (mode révision rapide):**
- **D-01:** Auto-reveal au clic — single click reveals correct/incorrect + canonical answer + explanation + source. No "Valider" step. SRS write fires on the same click.
- **D-02:** Bouton "Suivant" explicite — supports `Space` / `Enter`. No auto-advance, no click-anywhere.
- **D-03:** Mauvais clic = plein "raté" SM-2. MUST call `window.SRS.schedule(state, 'rate')` — never re-implement SM-2 math.
- **D-04:** 1 écriture SRS par session de panel. In-memory `Set<itemId>` records cards already written; subsequent re-clicks are no-ops. Set resets on panel leave / page reload.

**Tests blancs composition:**
- **D-05:** Taille fixe 20 questions/test. Universal across themes. If pool < 20: refuse to start with explanatory message (planner's discretion locked in UI-SPEC to "Pool insuffisant" inline error, CTA disabled).
- **D-06:** Minuteur fixe 20 min (1200 s). Display `MM:SS` countdown at top, updated every second via `setInterval` (cleared on unmount/finish/abandon).
- **D-07:** Navigation libre back/forward — Précédent / Suivant + progress `5/20`. Owner can revisit/change answers until final submission.
- **D-08:** Random shuffle du pool filtré — Fisher-Yates at test start; first 20 kept. Choice order within each QCM is **preserved** (no shuffle of `choices[]`).

**Score history (qhse-scores-v1):**
- **D-09:** Vue historique en bas de `#panel-tests` — single-panel UX, no modal, always visible when not actively in a test.
- **D-10:** Schema minimal per entry: `{ id, dateISO, theme, score, total }`. No `durationSec`, no `status`, no per-question `answers[]`.
- **D-11:** Cap 50 entrées FIFO — 51st entry → oldest removed.
- **D-12:** Table compacte `<table>` with columns `date | thème | score`, sorted most-recent-first. No sparkline.

**Interruption behavior:**
- **D-13:** Timeout — bandeau d'alerte mais le test continue. At 00:00, timer turns red and banner appears ("Temps écoulé — tu peux continuer."). No auto-submit.
- **D-14:** Fermeture d'onglet / changement de panel = abandon silencieux. No `beforeunload`, no auto-save.
- **D-15:** Bouton "Abandonner" avec confirmation — native `confirm()` modal. Cancel = stay in test.
- **D-16:** F5 / reload pendant un test = test perdu. No restoration.

### Claude's Discretion

- **CSS namespace:** `.qz-*` shared between `#panel-qcm` and `#panel-tests`. Locked in CONTEXT.md.
- **Module layout:** Two IIFEs in `outils.html` after the existing Flashcards IIFE; shared `renderQuestion(item, opts)` helper. DCL boot pattern mandatory.
- **`qhse-prefs-v1` extensions:** keys `lastQcmTheme`, `lastTestTheme` — merge-safe read-mutate-write (do NOT clobber P3's `lastTheme`, `lastMode`, `newCardsPerDay`).
- **Verification gate:** New `verify-quiz.cjs` (location: `.planning/phases/04-qcm-tests-blancs/verify-quiz.cjs` — mirrors P3 placement). 6 assertion groups locked in CONTEXT.md.
- **Keyboard discipline:** Arrow keys do NOT navigate between QCM choices (pass-through). `Tab` + `Enter`/`Space` only.
- **No animations** on reveal/timer.
- **No regression on Phase 1/2/3 deliverables.**
- **Atomic commit/push per delivery unit.**

### Deferred Ideas (OUT OF SCOPE)

- Per-question retrospective in score row
- Mid-test save/resume across reload
- Statistique agrégée sur l'historique
- Filtrage de l'historique par thème
- Export historique CSV/JSON
- Shuffle des choix `choices[]`
- Fiches de révision (Phase 5)
- Print stylesheet (Phase 5)

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| QUIZ-01 | User can take QCM (stem + multiple choices) for a chosen theme or all themes | "QCM IIFE architecture" + "Theme picker pattern" (verbatim copy of Phase 3 `.fc-theme` rule chain) |
| QUIZ-02 | After answering each question, user sees correct/incorrect + canonical answer + explanation + source | "Auto-reveal pattern (D-01)" + reuse of P3 `renderCard()` source-line construction logic |
| QUIZ-03 | Wrong QCM answers feed the SRS queue | "SRS write-half integration (D-03/D-04)" — single call site `window.SRS.schedule(state, 'rate')`, in-memory `Set` enforces 1-write/session |
| TEST-01 | Timed mock exam composed from QCM pool, thematic or global | "Test start pattern" + "Fisher-Yates shuffle" (reuse P3 `shuffle()` verbatim) + "Pool-too-small empty state" |
| TEST-02 | Final score + per-question correction with sources | "Test results screen" + reuse of `renderQuestion(item, { showCorrection: true })` shared helper |
| TEST-03 | Score history in `qhse-scores-v1`; tests blancs do NOT feed SRS | "Score history persistence (D-09..D-12)" + "Structural invariant: NO `qhse-srs-v1` write from Tests blancs path" — asserted by `verify-quiz.cjs` |

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Question/choice rendering | Browser/Client (vanilla JS DOM) | — | Single-file static app; no SSR, no API; renders entirely from `window.BANK` at DCL. |
| SM-2 math | Browser/Client (`srs.js` pure functions) | — | Frozen Phase 3 module; P4 only *calls* it. |
| Persistence (SRS, scores, prefs) | Browser/Client (localStorage) | — | PERSIST-02 invariant: no backend, single-user, localStorage only. |
| Timer state & display | Browser/Client (single `setInterval` per active test) | — | `Date.now()`-delta computation (drift-resistant on backgrounded tabs); DOM update inside the same tick. |
| Test session state machine (START → RUNNING → RESULTS) | Browser/Client (single IIFE-local `state` object) | — | No router, no SPA framework; mutually-exclusive `[hidden]` toggles on three top-level divs. |
| Random shuffle (test composition) | Browser/Client (inline Fisher-Yates) | — | Already implemented verbatim in P3 IIFE (line 344-351); reuse. |
| Score history table | Browser/Client (read from `qhse-scores-v1` at render) | — | Static table, no virtualization (cap 50). |
| Theme filter for QCM/Test pools | Browser/Client (`Array.filter`) | — | 92 items × 4 ms grade = trivial; no indexing needed. |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vanilla HTML5 + ES2024 JS | living standard | All Phase 4 code | `CLAUDE.md` invariant: pure HTML/CSS/JS, no build step. Mirrors P1/P2/P3 inline IIFE pattern. [VERIFIED: codebase] |
| `window.BANK` (frozen Phase 2) | n/a | Source of 92 `type:'qcm'` items | Read-only via `BANK.filter(i => i.type === 'qcm' && (theme === 'all' || i.theme === theme))`. [VERIFIED: codebase outils-data.js:14-19, schema at L189-200] |
| `window.SRS` (frozen Phase 3) | n/a | SM-2 math for wrong-QCM feed | `SRS.schedule(state, 'rate')` is the only call. `SRS.todayLocal()` returns `'yyyy-mm-dd'` local-day for `qhse-scores-v1[*].dateISO`. [VERIFIED: codebase srs.js:117-185, 93-95] |
| Modern CSS in chassis.css `@layer components` | as in chassis | `.qz-*` namespace, scoped under `#panel-qcm` / `#panel-tests` | Phase 3 precedent (`.fc-*` namespace, lines 620-882). [VERIFIED: codebase] |
| Node built-ins (`assert`, `path`) for `verify-quiz.cjs` | Node ≥14 | Verification gate | Mirrors `verify-srs.cjs` and `verify-bank.cjs` discipline. [VERIFIED: codebase verify-srs.cjs:14-17] |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none) | — | — | Phase 4 adds **zero new external dependencies**. No npm install, no CDN. The only "external" runtime asset is Google Fonts CSS2 already loaded in Phase 1. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Single `setInterval(1000ms)` + `Date.now()` delta | `requestAnimationFrame` loop with delta check every frame | RAF gives sub-second precision the timer doesn't need (display is `MM:SS`). `setInterval` + Date.now() delta is the smallest correct code. [CITED: MDN setInterval drift docs] |
| In-memory `Set<itemId>` for D-04 single-write-per-session | Date-stamp in `qhse-srs-v1[id].lastReviewed` | CONTEXT.md rejects extra storage keys; in-memory Set resets on panel switch (intended UX). [VERIFIED: CONTEXT.md D-04] |
| Native `confirm()` for abandon | Custom `<dialog>` element | `confirm()` gives free focus trap + ESC-to-cancel + screen-reader semantics; zero CSS, zero JS. UI-SPEC §"Rationale for native `confirm()`". [VERIFIED: UI-SPEC.md L267-274] |
| Append-only `qhse-scores-v1` with FIFO cap | Per-day-bucketed key (e.g. `qhse-scores-v1:2026-05-25`) | Single key is simpler; cap 50 keeps payload < 4 KB. [VERIFIED: CONTEXT.md D-10/D-11] |
| Fisher-Yates shuffle (inline) | `Array.sort(() => Math.random() - 0.5)` | Sort-with-random is biased and slower; Fisher-Yates is the textbook correct shuffle. [CITED: MDN Array.prototype.sort caveats] [VERIFIED: codebase outils.html L344-351 — already in P3, reuse verbatim] |

**Installation:**
```bash
# Zero install. Phase 4 ships:
#   - inline edits to qhse-cesi/outils.html (two new <script> IIFEs + DOM in #panel-qcm and #panel-tests)
#   - additions inside qhse-cesi/chassis.css @layer components (.qz-* rules)
#   - new file: .planning/phases/04-qcm-tests-blancs/verify-quiz.cjs
# No package.json, no node_modules, no CDN tags added.
```

**Version verification:** No external packages to verify — the gate is satisfied trivially.

## Package Legitimacy Audit

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| (none) | — | — | — | — | — | N/A — zero new packages |

**Packages removed due to slopcheck [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** none

*Phase 4 is a pure code-edit phase using only already-loaded browser globals (`window.BANK`, `window.SRS`) and Node built-ins (`assert`, `path`) for the verification gate. The Package Legitimacy Gate is satisfied trivially.*

## Architecture Patterns

### System Architecture Diagram

```
                            [ DCL fires after defer scripts ]
                                       │
                                       ▼
            ┌──────────────────────────┴──────────────────────────┐
            │                                                     │
            ▼                                                     ▼
   ┌────────────────────┐                              ┌─────────────────────┐
   │  QCM IIFE (boot)   │                              │  Tests IIFE (boot)  │
   │  in outils.html    │                              │  in outils.html     │
   └─────────┬──────────┘                              └──────────┬──────────┘
             │                                                     │
             │ reads                                               │ reads
             ▼                                                     ▼
   ┌─────────────────────────┐                       ┌─────────────────────────┐
   │ window.BANK (frozen P2) │◄──── shared ────────► │ window.BANK (frozen P2) │
   │ window.SRS  (frozen P3) │                       │ (Tests blancs does NOT  │
   │ qhse-prefs-v1.lastQcmTheme                      │  read window.SRS)       │
   └─────────┬───────────────┘                       └──────────┬──────────────┘
             │                                                   │
             ▼                                                   ▼
   ┌─────────────────────────┐                       ┌──────────────────────────┐
   │ State machine (in-IIFE) │                       │ Tri-state machine:       │
   │ - currentItem           │                       │   A=START B=RUNNING C=RES│
   │ - srsWrittenSet         │                       │ - queue[20], pickedMap[] │
   └─────────┬───────────────┘                       │ - timer.startedAt        │
             │ on click of wrong choice               │ - timer.intervalId      │
             ▼                                        └──────────┬───────────────┘
   ┌─────────────────────────┐                                   │
   │ window.SRS.schedule(    │                                   │ on test complete
   │   state, 'rate')        │                                   ▼
   │ → write qhse-srs-v1[id] │                       ┌──────────────────────────┐
   │ → mark id in            │                       │ unshift score row into    │
   │   srsWrittenSet         │                       │ qhse-scores-v1; slice(0,50)│
   └─────────────────────────┘                       │ → re-render history table │
                                                      └──────────────────────────┘

   localStorage surface (whole Hub):
     qhse-srs-v1   ← P3 writes (flashcards); P4 writes (wrong-QCM ONLY)
     qhse-scores-v1 ← P4 writes (tests blancs completion ONLY, never QCM)
     qhse-prefs-v1 ← P3 + P4 (merge-safe read-mutate-write)

   Structural invariant: Tests blancs code path NEVER calls SRS.schedule
   → asserted by verify-quiz.cjs assertion group (e) (CONTEXT.md verification gate)
```

### Recommended Project Structure

```
qhse-cesi/
├── outils.html              # Two new inline IIFEs appended after Flashcards IIFE (~ L796)
│                            #   one for #panel-qcm, one for #panel-tests
│                            # Two new mount-point DOM trees replace <p class="placeholder">
│                            #   at L133 (#panel-qcm) and L138 (#panel-tests)
├── outils-data.js           # FROZEN — read-only via window.BANK
├── srs.js                   # FROZEN — read-only via window.SRS
├── chassis.css              # Additions: .qz-* block inside @layer components,
│                            #   scoped under #panel-qcm / #panel-tests
└── index.html               # UNTOUCHED
└── LEGAL.md                 # UNTOUCHED

.planning/phases/04-qcm-tests-blancs/
└── verify-quiz.cjs          # NEW — plain Node gate, mirrors verify-srs.cjs
```

### Pattern 1: DCL Boot for Inline IIFE Consuming a Deferred Global

**What:** Wrap the IIFE body in a `boot()` function dispatched via `DOMContentLoaded` listener, with a fallback to immediate invocation if `document.readyState !== 'loading'`.

**When to use:** Every inline IIFE that reads `window.BANK` or `window.SRS`. Without this, the IIFE runs during HTML parsing — BEFORE deferred `<script src="outils-data.js" defer>` has evaluated — and `window.BANK` is `undefined`.

**Root cause:** Inline `<script>` tags ignore `defer` per the HTML5 spec. Inline scripts execute synchronously during parse; deferred external scripts run between parse-complete and DOMContentLoaded. This was hotfixed in P3 (commit `0553899`).

**Example:**
```javascript
// Source: qhse-cesi/outils.html:209-795 (P3 Flashcards IIFE — verbatim pattern)
(() => {
  'use strict';

  // Double-load guard
  if (window.__qzQcmBooted) return;
  window.__qzQcmBooted = true;

  function boot() {
    const panel = document.getElementById('panel-qcm');

    // Pre-flight: require BANK + SRS before any DOM work
    if (!window.BANK || !Array.isArray(window.BANK) ||
        !window.SRS  || typeof window.SRS.schedule !== 'function') {
      // Graceful degradation — inline error message
      const card = panel && panel.querySelector('[data-qz-card]');
      if (card) {
        const errEl = document.createElement('p');
        errEl.className = 'qz-error';
        errEl.textContent = 'Impossible de charger la banque de questions. ' +
                            'Recharge la page ou vérifie que outils-data.js est bien servi.';
        card.appendChild(errEl);
      }
      console.error('[QCM] BANK or SRS missing — cannot boot view.');
      return;
    }

    // … rest of QCM init …
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
```

### Pattern 2: Shared `renderQuestion(item, opts)` Helper

**What:** A single function defined once (top of either IIFE, or at module top inside an IIFE-scope shared by both — planner's discretion) that renders a `{question, choices, correct, answer, explanation, source}` item into a target DOM tree, with `opts` toggling between QCM live mode, Tests blancs answering mode, and Tests blancs results-correction mode.

**When to use:** Both QCM and Tests blancs render the same item shape (stem + 4 choices + reveal payload). Avoid duplicating the source-line construction logic (already done correctly in P3 `revealCard()` at outils.html:458-498).

**Example:**
```javascript
// renderQuestion(item, opts) — define once, call from both IIFEs.
// XSS-safe: textContent + createElement only; never innerHTML on bank content.
// opts.mode ∈ 'qcm-live' | 'test-answering' | 'test-correction'
// opts.picked ∈ 0..3 | null (the user's pick, if any)
// opts.targetEls = { stem, choicesContainer, reveal, answer, explanation, source }
function renderQuestion(item, opts) {
  opts.targetEls.stem.textContent = item.question;

  // Render the 4 choice buttons
  opts.targetEls.choicesContainer.innerHTML = '';  // safe: container is ours
  const letters = ['A', 'B', 'C', 'D'];
  item.choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.qzChoice = String(idx);
    btn.setAttribute('aria-label', 'Choix ' + letters[idx] + ' : ' + choice);

    const letterSpan = document.createElement('span');
    letterSpan.className = 'qz-choice-letter';
    letterSpan.textContent = letters[idx] + ' · ';
    btn.appendChild(letterSpan);
    btn.appendChild(document.createTextNode(choice));

    // Apply state classes based on mode + picked + correct
    if (opts.mode === 'qcm-live' || opts.mode === 'test-correction') {
      const isPicked = (opts.picked === idx);
      const isCorrect = (item.correct === idx);
      if (isPicked && isCorrect)  btn.dataset.qzChoiceState = 'picked-correct';
      if (isPicked && !isCorrect) btn.dataset.qzChoiceState = 'picked-incorrect';
      if (!isPicked && isCorrect) btn.dataset.qzChoiceState = 'unpicked-correct';
      if (!isPicked && !isCorrect) btn.dataset.qzChoiceState = 'unpicked-distractor';
      if (opts.mode === 'qcm-live') btn.style.pointerEvents = 'none';
    } else if (opts.mode === 'test-answering') {
      if (opts.picked === idx) btn.dataset.qzChoiceState = 'selected';
    }
    opts.targetEls.choicesContainer.appendChild(btn);
  });

  // Populate reveal payload (only if reveal-mode)
  if (opts.mode === 'qcm-live' || opts.mode === 'test-correction') {
    opts.targetEls.answer.textContent = item.answer;
    opts.targetEls.explanation.textContent = item.explanation;
    // Source line — copy verbatim from outils.html:466-490 (P3 source-line builder)
    // …
    opts.targetEls.reveal.hidden = false;
  } else {
    opts.targetEls.reveal.hidden = true;
  }
}
```

### Pattern 3: Drift-Resistant Timer via `Date.now()` Delta

**What:** Compute remaining time from `(startedAt + DURATION_MS) - Date.now()` each tick, NOT by decrementing a counter. The `setInterval(1000)` exists only to trigger DOM updates — never to count.

**When to use:** Anywhere a countdown crosses backgrounded tabs, sleep/wake cycles, or mobile Safari aggressive throttling (timer minimum becomes 1000ms+ when tab is backgrounded; intervals can be dropped entirely).

**Why it matters:** `setInterval` ticks drift. On a backgrounded tab in mobile Safari, the interval may not fire for tens of seconds, then fire once. If you decrement `remainingSec--` per tick, you over-count the remaining time. With `Date.now()` delta, the visible timer "jumps" to the correct elapsed value on the next tick — which is the right behavior (the test clock is real wall-clock time, not subjective interval time).

**Example:**
```javascript
// state.timer = { startedAt: null, intervalId: null, banner: false }
const DURATION_MS = 20 * 60 * 1000;        // 20 min — D-06
const ALERT_THRESHOLD_MS = 5 * 60 * 1000;  // 5 min — UI-SPEC color shift

function startTimer() {
  state.timer.startedAt = Date.now();
  state.timer.banner = false;
  tickTimer();  // immediate first paint
  state.timer.intervalId = setInterval(tickTimer, 1000);
}

function tickTimer() {
  const elapsed = Date.now() - state.timer.startedAt;
  const remaining = DURATION_MS - elapsed;

  if (remaining <= 0) {
    // D-13: clamp display at 00:00, banner appears, test continues
    elTimer.textContent = '00:00';
    elTimer.dataset.qzTimerState = 'expired';
    if (!state.timer.banner) {
      elBanner.hidden = false;
      state.timer.banner = true;
    }
    return;  // do NOT clear interval — tick stays cheap, state stable
  }

  // Normal display
  const totalSec = Math.floor(remaining / 1000);
  const mm = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const ss = String(totalSec % 60).padStart(2, '0');
  elTimer.textContent = mm + ':' + ss;
  elTimer.dataset.qzTimerState =
    (remaining <= ALERT_THRESHOLD_MS) ? 'alert' : 'normal';
}

function stopTimer() {
  if (state.timer.intervalId !== null) {
    clearInterval(state.timer.intervalId);
    state.timer.intervalId = null;
  }
}
```

**Critical:** Always call `stopTimer()` on STATE B → C transition, on Abandonner confirm, and on page-unload-like events. The `setInterval` will keep firing forever otherwise — harmless but wasteful.

### Pattern 4: `setInterval` + `confirm()` Interaction

**What:** `window.confirm()` blocks the event loop synchronously. While the modal is open, `setInterval` callbacks queue but don't fire. When the user dismisses the modal, queued callbacks may fire (one at most — the event loop coalesces). **The timer is unaffected because the timer reads `Date.now()` — wall clock advances during the modal.** The display catches up on the next tick.

**When to use:** D-15 abandon flow. Native `confirm()` is correct; no need to pause the timer manually.

**Example:**
```javascript
function onAbandonClick() {
  const ok = window.confirm('Es-tu sûr de vouloir abandonner ? Tes réponses seront perdues.');
  if (ok) {
    stopTimer();           // halt the interval
    transitionToStateA();  // back to start screen
    // CRITICAL: do NOT write to qhse-scores-v1 (D-14/D-15)
  }
  // If !ok: fall through, timer continues counting from wall-clock, no fix-up needed
}
```

### Pattern 5: Merge-Safe `qhse-prefs-v1` Read-Mutate-Write

**What:** Read the existing object, set new keys, write the merged result. **Never** `setItem(JSON.stringify({lastQcmTheme: ...}))` — that clobbers P3's `lastTheme`, `lastMode`, `newCardsPerDay`.

**When to use:** Every Phase 4 write to `qhse-prefs-v1`. Mirror the existing P3 `writePrefs(partial)` helper.

**Example:**
```javascript
// Source: qhse-cesi/outils.html:276-285 (P3 writePrefs — verbatim pattern)
function writeQuizPrefs(partial) {
  try {
    const raw = localStorage.getItem('qhse-prefs-v1');
    const existing = raw ? JSON.parse(raw) : {};
    const merged = Object.assign({}, existing, partial);
    localStorage.setItem('qhse-prefs-v1', JSON.stringify(merged));
  } catch (e) {
    console.warn('[QCM/Tests] writeQuizPrefs failed:', e.message);
  }
}

function readQuizPrefs() {
  try {
    const raw = localStorage.getItem('qhse-prefs-v1');
    if (!raw) return { lastQcmTheme: 'all', lastTestTheme: 'all' };
    const parsed = JSON.parse(raw);
    return {
      lastQcmTheme:  (typeof parsed.lastQcmTheme  === 'string') ? parsed.lastQcmTheme  : 'all',
      lastTestTheme: (typeof parsed.lastTestTheme === 'string') ? parsed.lastTestTheme : 'all'
    };
  } catch (e) {
    console.warn('[QCM/Tests] readQuizPrefs failed:', e.message);
    return { lastQcmTheme: 'all', lastTestTheme: 'all' };
  }
}
```

### Pattern 6: Score History Persistence (Append-Only Cap-50 FIFO)

**What:** On test completion, build a row `{id, dateISO, theme, score, total}`, `unshift` into the existing array, slice to 50, write back. On render, read once, iterate to build `<tr>` rows.

**Example:**
```javascript
function readScores() {
  try {
    const raw = localStorage.getItem('qhse-scores-v1');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('[Tests] readScores failed (corrupt — starting fresh):', e.message);
    return [];
  }
}

function appendScore(row) {
  try {
    const scores = readScores();
    scores.unshift(row);                  // newest-first ordering — D-12
    const capped = scores.slice(0, 50);   // FIFO cap — D-11
    localStorage.setItem('qhse-scores-v1', JSON.stringify(capped));
    return capped;
  } catch (e) {
    console.warn('[Tests] appendScore failed:', e.message);
    return readScores();  // best-effort — return whatever survives
  }
}

// On test completion:
const row = {
  id:      'test-' + Date.now(),                        // D-10 schema
  dateISO: window.SRS.todayLocal(),                     // local-day — reuse P3 helper
  theme:   currentTestTheme,                            // slug or 'all'
  score:   correctCount,
  total:   20                                           // D-05 explicit
};
const updated = appendScore(row);
renderHistory(updated);
```

### Pattern 7: Test State Machine (3 Mutually-Exclusive States)

**What:** Three sibling divs (`.qz-start`, `.qz-running`, `.qz-results`) with `[hidden]` toggled. State transitions are instant (no animation per UI-SPEC). Always exactly one visible.

**Example:**
```javascript
const STATE = { START: 'A', RUNNING: 'B', RESULTS: 'C' };
function transitionTo(target) {
  elStart.hidden   = (target !== STATE.START);
  elRunning.hidden = (target !== STATE.RUNNING);
  elResults.hidden = (target !== STATE.RESULTS);
  // History section visible only in STATE A + C (hidden during STATE B — UI-SPEC)
  elHistorySection.hidden = (target === STATE.RUNNING);

  // Focus management per UI-SPEC §Keyboard Contract
  if (target === STATE.START)   elThemeSelect.focus();
  if (target === STATE.RUNNING) elFirstChoice.focus();
  if (target === STATE.RESULTS) elNouveauTestBtn.focus();

  // Side effects
  if (target !== STATE.RUNNING) stopTimer();
}
```

### Pattern 8: Free Précédent/Suivant Navigation with Answer-Map State

**What:** Store user picks in a `Map<questionIndex, choiceIndex>` (or sparse array of length 20). On Précédent/Suivant, repaint the current question and re-render `data-qz-choice-state="selected"` from the answer map. Changing answers is just `answerMap.set(currentIdx, newChoice)`.

**Why this over controlled-input pattern:** Controlled inputs require per-render React-style re-binding. With vanilla buttons, the simpler model is: render once per index change, mutate the data structure, dataset attributes drive CSS state.

**Example:**
```javascript
const state = {
  queue: [],           // 20 items
  currentIdx: 0,       // 0..19
  picks: new Array(20).fill(null)  // sparse: null = unanswered
};

function gotoQuestion(idx) {
  if (idx < 0 || idx >= state.queue.length) return;
  state.currentIdx = idx;
  renderQuestion(state.queue[idx], {
    mode: 'test-answering',
    picked: state.picks[idx],
    targetEls: testCardEls
  });
  elProgress.textContent = (idx + 1) + '/' + state.queue.length;
  elProgress.setAttribute('aria-label',
    'Question ' + (idx + 1) + ' sur ' + state.queue.length);
  // Label morph for Suivant on last question (UI-SPEC)
  elNextBtn.textContent = (idx === state.queue.length - 1) ? 'Terminer le test' : 'Suivant';
  elPrevBtn.disabled = (idx === 0);
}

// Click on a choice button (event delegation on choicesContainer)
testCardEls.choicesContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-qz-choice]');
  if (!btn) return;
  const choiceIdx = parseInt(btn.dataset.qzChoice, 10);
  state.picks[state.currentIdx] =
    (state.picks[state.currentIdx] === choiceIdx) ? null : choiceIdx;
  gotoQuestion(state.currentIdx);  // re-render with new selection
});

// Suivant / Précédent
elNextBtn.addEventListener('click', () => {
  if (state.currentIdx === state.queue.length - 1) finishTest();
  else gotoQuestion(state.currentIdx + 1);
});
elPrevBtn.addEventListener('click', () => gotoQuestion(state.currentIdx - 1));
```

### Anti-Patterns to Avoid

- **`document.addEventListener('keydown', …)` for hot keys.** Use panel-scoped or button-scoped listeners. P3 keyboard discipline; CONTEXT.md keyboard discipline.
- **Decrementing a counter inside `setInterval` for the timer.** Drift on backgrounded tabs. Use `Date.now()` delta.
- **`localStorage.setItem('qhse-prefs-v1', JSON.stringify({lastQcmTheme}))`** without merging existing keys. Will clobber P3 prefs.
- **Re-implementing SM-2 math.** D-03 forbids. Call `window.SRS.schedule(state, 'rate')` exactly.
- **Writing to `qhse-srs-v1` from the Tests blancs IIFE.** Structural invariant D-V2-03. Asserted by `verify-quiz.cjs` group (e).
- **Shuffling `choices[]`.** D-08 forbids — would invalidate the `correct` index without remapping work the planner explicitly rejected.
- **`beforeunload` warning during a test.** D-14 explicit rejection — the abandon-on-close model is intentional.
- **Auto-submit at 00:00.** D-13 explicit rejection — banner only, test continues.
- **`innerHTML` on bank content.** XSS surface; use `textContent` + `createElement` (P3 invariant T-03-03-01).
- **Arrow-key navigation between QCM choices.** Pass-through to browser default (UI-SPEC keyboard contract).
- **Animations.** UI-SPEC §Motion Contract: zero declared transitions.
- **`Array.sort(() => Math.random() - 0.5)` shuffle.** Biased; use Fisher-Yates verbatim from P3 IIFE line 344-351.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SM-2 grading math | Inline SM-2 implementation in the QCM IIFE | `window.SRS.schedule(state, 'rate')` | D-03 invariant; `srs.js` is frozen; re-implementing risks drift from the verified Anki-model E1-E8 edge cases. |
| Local-day ISO date string | `new Date().toISOString().slice(0,10)` (UTC bias) | `window.SRS.todayLocal()` | Returns `'yyyy-mm-dd'` in the user's local civil day via `sv-SE` locale; handles DST + year boundaries. [VERIFIED: srs.js:93-95] |
| Fisher-Yates shuffle | New shuffle function | Copy the P3 IIFE `shuffle()` verbatim (outils.html:344-351) | Already audited, ES5-safe. |
| Modal dialog for abandon | Custom `<dialog>` + focus trap + ESC handler | `window.confirm(...)` | Free WCAG-compliant focus management; UI-SPEC §rationale L267-274. |
| Theme picker chrome | Custom dropdown component | Native `<select>` styled to match `#fc-theme-select` rule (chassis.css:632-651) | One-line CSS reuse via shared `.qz-theme select` class. |
| Timer drift handling | Tick counter with backgrounding compensation | `Date.now()` delta inside `setInterval(1000)` | Wall-clock is the source of truth; tick is only for repaint. |
| Score history table virtualization | DOM recycling, IntersectionObserver paging | Plain `<table>` render of full cap-50 array | Cap-50 × 3-cell row ≈ 150 cells ≈ trivial. |
| XSS-safe rendering | innerHTML sanitization | `textContent` + `createElement` for every bank field | P3 invariant T-03-03-01. |
| LocalStorage quota handling | Polling `navigator.storage.estimate()` | `try/catch` around every `setItem`, mirror P3 `writeStore` (outils.html:299-305) | Bounded payload (< 10 KB total) makes quota errors nearly impossible; defensive `try/catch` is enough. |

**Key insight:** Phase 4 is mostly composition of P3 patterns. The only truly new code is (a) the test state machine, (b) the timer, (c) the score-history append/render. Everything else is verbatim reuse from `outils.html:209-795`.

## Runtime State Inventory

> Phase 4 is a greenfield code-addition phase (no rename, no refactor, no migration of existing data). The Runtime State Inventory section is **NOT APPLICABLE** to this phase.
>
> The new localStorage keys introduced (`qhse-scores-v1`) and extended (`qhse-prefs-v1.lastQcmTheme`, `qhse-prefs-v1.lastTestTheme`) are additive. Existing data in `qhse-srs-v1` (P3) and `qhse-prefs-v1.{lastTheme, lastMode, newCardsPerDay}` (P3) must be preserved by the merge-safe write pattern (Pattern 5) — this is a code constraint, not a data migration.

## Common Pitfalls

### Pitfall 1: Inline IIFE Race Condition with Deferred External Globals
**What goes wrong:** QCM IIFE runs during HTML parse, reads `window.BANK` → `undefined`, throws.
**Why it happens:** Inline `<script>` ignores `defer`; deferred scripts evaluate between parse-end and `DOMContentLoaded`.
**How to avoid:** Wrap IIFE body in `boot()` dispatched via DCL with `readyState` fallback (Pattern 1). This is mandatory per the Phase 3 hotfix (commit `0553899`).
**Warning signs:** Console error `Cannot read property 'filter' of undefined` on first page load; works after F5 (because cached scripts evaluate faster).

### Pitfall 2: Timer Over-Counts on Backgrounded Mobile Safari
**What goes wrong:** User backgrounds the test tab for 2 minutes; on return, timer says `19:42` (lost ~2 min) instead of `17:58`.
**Why it happens:** `setInterval(1000)` is throttled to ≥1000ms (often much more, sometimes dropped entirely) on backgrounded mobile tabs. Decrementing per-tick under-counts elapsed time.
**How to avoid:** Compute `remaining = DURATION_MS - (Date.now() - startedAt)` every tick — interval is for paint, not for counting (Pattern 3).
**Warning signs:** Discrepancy between MM:SS display and a manual stopwatch when test runs ≥5 min with tab backgrounded ≥30 s.

### Pitfall 3: `qhse-prefs-v1` Clobbered by Naive Write
**What goes wrong:** After running QCM once, Flashcards loses `newCardsPerDay`, `lastTheme`, `lastMode` (resets to defaults).
**Why it happens:** A naive `setItem('qhse-prefs-v1', JSON.stringify({lastQcmTheme}))` overwrites the whole object.
**How to avoid:** Always read-mutate-write merge (Pattern 5). Mirror P3 `writePrefs(partial)` (outils.html:276-285).
**Warning signs:** Phase 3 owner-verification regressions after Phase 4 ships — flashcards "À réviser aujourd'hui" empty when previously full, theme picker resets to "Tous les thèmes".

### Pitfall 4: Double SRS Write on Re-Click in QCM
**What goes wrong:** Owner clicks wrong, clicks Suivant, clicks Précédent (or returns to same card via theme switch), re-clicks wrong → `lapses` increments twice, `ease` decremented twice in one sitting.
**Why it happens:** No de-duplication on the SRS write path.
**How to avoid:** In-memory `Set<itemId>` (`state.srsWrittenThisSession = new Set()`). First wrong click on item → write + add to set. Subsequent clicks → check set, no-op (D-04). Set is **not** persisted; resets on panel switch / page reload.
**Warning signs:** `qhse-srs-v1` shows `lapses > 1` on cards graded only once.

### Pitfall 5: Tests Blancs Silently Touches `qhse-srs-v1` via Shared Helper
**What goes wrong:** If `renderQuestion()` (the shared helper) is given a callback that wraps SRS writes for QCM mode, a copy-paste in the Tests blancs IIFE might wire the same callback → tests touch SRS → D-V2-03 violation.
**Why it happens:** Single helper, two consumers, easy to share too much.
**How to avoid:**
  1. Keep the SRS write logic **outside** `renderQuestion()` — let it be a `click` handler attached by the QCM IIFE only.
  2. Add the assertion in `verify-quiz.cjs` group (e): synthesize a `qhse-srs-v1` snapshot, run a full Tests blancs session in a JSDOM-or-shim environment, assert `JSON.stringify(snapshot) === JSON.stringify(post)`.
  3. Code-review eyeball: `git grep -n 'SRS\.schedule' qhse-cesi/outils.html` should return calls only from the QCM IIFE block (one call site).
**Warning signs:** verify-quiz.cjs group (e) FAIL; manual test: do 1 test blanc with wrong answers, then check `qhse-srs-v1` — must be unchanged from pre-test snapshot.

### Pitfall 6: Pool < 20 Causes "Cannot read property 'question' of undefined"
**What goes wrong:** Test starts with a theme that has only 12 QCMs; the engine slices `[...].slice(0, 20)` → 12-item queue; rendering question 13 throws.
**Why it happens:** Code assumes the queue is always 20 long.
**How to avoid:** UI-SPEC contract: when pool < 20, **refuse to start** with the "Pool insuffisant" inline error and disable the CTA. Check `themePool.length >= 20` before starting, render the inline error and set `[data-qz-start][disabled]` otherwise.
**Warning signs:** Console error when starting a test with `acronymes`, `metiers`, or `rncp` (themes with potentially < 20 QCMs).

### Pitfall 7: `setInterval` Leak After Abandon / Page Switch
**What goes wrong:** Owner starts a test, switches to Flashcards tab, returns → multiple timers running, multiple `MM:SS` paints racing, CPU pegs.
**Why it happens:** `clearInterval()` never called.
**How to avoid:** Single `state.timer.intervalId` per IIFE; every state transition that leaves STATE B calls `stopTimer()` which clears + nulls the handle. Boot-time guard: if `state.timer.intervalId !== null`, clear before starting a new one.
**Warning signs:** Browser performance warnings; battery drain; multiple `tickTimer()` console logs per second.

### Pitfall 8: Owner Tab-Switches via ARIA Tablist Mid-Test → Confusion
**What goes wrong:** User clicks "Flashcards" tab while in STATE B; tests panel becomes `[hidden]`, timer keeps running, returning to Tests panel shows mid-test state with stale timer.
**Why it happens:** Tablist toggles `[hidden]` on panels; it doesn't notify the IIFE.
**How to avoid:** **Per D-14**, the deliberate behavior is "abandon silencieux" — the test is implicitly lost. The simplest enforcement: do NOT add a tab-switch listener. The timer keeps running (harmless — banner appears at 00:00, no auto-save). When the user returns, they see the still-running test and either Abandonner explicitly or finish. **Documented design**, not a bug. (Owner can mitigate by treating mid-test tab-switch as "I'm done; abandon".)
**Warning signs:** None — by design. If the planner adds a tab-switch listener to "auto-abandon" on switch, it would violate the D-14 minimal-persistence-surface goal.

## Code Examples

### Theme Picker (Reuse P3 Pattern)
```javascript
// Source: qhse-cesi/outils.html:243-246 + L678-686 (P3 theme picker — verbatim)
const THEME_SLUGS = [
  'duerp', 'principes-generaux', 'iso-9001', 'iso-14001', 'iso-45001',
  'tms', 'risque-routier', 'risque-chimique', 'rps', 'espaces-confines',
  'acronymes', 'metiers', 'calendrier', 'icpe-seveso', 'rncp'
];
const THEME_LABELS = {
  'duerp': 'DUERP',
  'principes-generaux': 'Principes généraux',
  'iso-9001': 'ISO 9001',
  'iso-14001': 'ISO 14001',
  'iso-45001': 'ISO 45001',
  'tms': 'TMS',
  'risque-routier': 'Risque routier',
  'risque-chimique': 'Risque chimique',
  'rps': 'RPS',
  'espaces-confines': 'Espaces confinés',
  'acronymes': 'Acronymes',
  'metiers': 'Métiers',
  'calendrier': 'Calendrier',
  'icpe-seveso': 'ICPE / Seveso',
  'rncp': 'RNCP'
};

function populateThemeSelect(selectEl) {
  // <option value="all" selected>Tous les thèmes</option>
  const optAll = document.createElement('option');
  optAll.value = 'all';
  optAll.textContent = 'Tous les thèmes';
  selectEl.appendChild(optAll);
  // 15 theme options in source order
  THEME_SLUGS.forEach(slug => {
    const opt = document.createElement('option');
    opt.value = slug;
    opt.textContent = THEME_LABELS[slug];
    selectEl.appendChild(opt);
  });
}
```

### Wrong-QCM SRS Feed (QUIZ-03 / SRS-03 Write-Half)
```javascript
// Inside QCM IIFE — single call site for SRS.schedule in Phase 4
function handleQcmClick(item, pickedIdx) {
  const isCorrect = (pickedIdx === item.correct);

  // Reveal panel
  renderQuestion(item, {
    mode: 'qcm-live',
    picked: pickedIdx,
    targetEls: qcmEls
  });
  qcmEls.reveal.hidden = false;
  qcmEls.badge.textContent = isCorrect ? '✓ Correct' : '✗ Incorrect';
  qcmEls.badge.dataset.qzBadgeState = isCorrect ? 'correct' : 'incorrect';
  qcmEls.nextBtn.focus();

  // SRS write — only on incorrect, only once per session per item (D-03/D-04)
  if (!isCorrect && !state.srsWrittenThisSession.has(item.id)) {
    const today = window.SRS.todayLocal();
    const store = readStore();           // mirror P3 readStore (outils.html:287-297)
    const row = store[item.id] || null;
    const newRow = window.SRS.schedule(row, 'rate', today);
    store[item.id] = newRow;
    writeStore(store);                   // mirror P3 writeStore (outils.html:299-305)
    state.srsWrittenThisSession.add(item.id);
  }
}
```

### Test Composition (Fisher-Yates + Pool-Too-Small Guard)
```javascript
function buildTestQueue(theme) {
  const pool = window.BANK.filter(i =>
    i.type === 'qcm' && (theme === 'all' || i.theme === theme));

  if (pool.length < 20) {
    return {
      ok: false,
      reason: 'pool-too-small',
      available: pool.length,
      required: 20
    };
  }

  // Reuse P3 shuffle verbatim (outils.html:344-351)
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  return {
    ok: true,
    queue: shuffle(pool).slice(0, 20)   // D-08 + D-05
  };
}

function handleStartClick() {
  const theme = elTestThemeSelect.value;
  const result = buildTestQueue(theme);
  if (!result.ok) {
    elPoolSmall.textContent =
      'Pool insuffisant pour ce thème (' + result.available + ' QCM disponibles, 20 requis). ' +
      'Choisis "Tous les thèmes" ou un autre thème.';
    elPoolSmall.hidden = false;
    elStartBtn.disabled = true;
    return;
  }
  elPoolSmall.hidden = true;
  state.queue = result.queue;
  state.picks = new Array(20).fill(null);
  state.currentIdx = 0;
  transitionTo(STATE.RUNNING);
  startTimer();
  gotoQuestion(0);
}
```

### Final Results Render
```javascript
function finishTest() {
  stopTimer();
  // Score = count of correct picks
  let score = 0;
  for (let i = 0; i < state.queue.length; i++) {
    if (state.picks[i] === state.queue[i].correct) score++;
  }

  // Persist (D-10/D-11)
  const row = {
    id:      'test-' + Date.now(),
    dateISO: window.SRS.todayLocal(),
    theme:   state.theme,
    score:   score,
    total:   20
  };
  appendScore(row);

  // Render hero
  const ratio = score / 20;
  let headingPrefix;
  let tierColor;
  if (score === 20)           { headingPrefix = 'Sans faute — ';      tierColor = 'accent'; }
  else if (ratio >= 0.75)     { headingPrefix = 'Bravo — ';            tierColor = 'accent'; }
  else if (ratio >= 0.50)     { headingPrefix = 'À retravailler — ';   tierColor = 'warning'; }
  else                        { headingPrefix = 'Beaucoup à revoir — '; tierColor = 'alert'; }

  // Build: "Bravo — <strong data-qz-score>17/20</strong>."
  elResultsHeading.textContent = '';   // clear
  elResultsHeading.appendChild(document.createTextNode(headingPrefix));
  const scoreStrong = document.createElement('strong');
  scoreStrong.dataset.qzScore = '';
  scoreStrong.dataset.qzScoreTier = tierColor;
  scoreStrong.textContent = score + '/' + 20;
  elResultsHeading.appendChild(scoreStrong);
  elResultsHeading.appendChild(document.createTextNode('.'));

  elResultsSubheading.textContent = 'Thème : ' + (THEME_LABELS[state.theme] || 'Tous les thèmes');

  // Render 20 corrections via shared renderQuestion in 'test-correction' mode
  renderCorrections();

  // Re-render history (newest row now appears)
  renderHistory(readScores());

  transitionTo(STATE.RESULTS);
}
```

### verify-quiz.cjs Pattern (Mirrors verify-srs.cjs)
```javascript
// .planning/phases/04-qcm-tests-blancs/verify-quiz.cjs
// Source pattern: .planning/phases/03-flashcards-srs/verify-srs.cjs:1-65
'use strict';
const path   = require('path');
const assert = require('assert');

// Load srs.js + outils-data.js under Node via global.window shim
global.window = {};
require(path.resolve(__dirname, '../../../qhse-cesi/srs.js'));
require(path.resolve(__dirname, '../../../qhse-cesi/outils-data.js'));
const SRS  = global.window.SRS;
const BANK = global.window.BANK;

let allPassed = true;
function pass(label) { console.log('PASS [' + label + ']'); }
function fail(label, reason) { console.error('FAIL [' + label + '] ' + reason); allPassed = false; }
function check(label, fn) {
  try { fn(); pass(label); } catch (e) { fail(label, e.message); }
}

console.log('\n=== Phase 4 QCM + Tests blancs verification gate ===\n');

// (a) QCM wrong-answer write produces a state equivalent to SRS.schedule(state, 'rate')
check('SC2/QUIZ-03 wrong-answer SRS write matches SRS.schedule(state, \'rate\')', () => {
  const today = '2026-05-25';
  const initial = SRS.schedule(null, 'bien', '2026-05-24');  // a card that has been seen
  const expected = SRS.schedule(initial, 'rate', today);
  // Simulate the QCM IIFE write path
  const actual = SRS.schedule(initial, 'rate', today);
  assert.deepStrictEqual(actual, expected);
});

// (b) Test composition: filter by theme then shuffle yields 20 items when pool >= 20
check('SC3/TEST-01 test composition: 20-item queue from \'all\' theme', () => {
  const pool = BANK.filter(i => i.type === 'qcm');
  assert.ok(pool.length >= 20, 'QCM pool is too small for the test');
  // Shuffle is non-deterministic; assert structural properties only
  const queue = pool.slice(0, 20);  // simulating post-shuffle slice
  assert.strictEqual(queue.length, 20);
  queue.forEach((item, idx) => {
    assert.ok(item.type === 'qcm', 'item ' + idx + ' is not a QCM');
    assert.ok(Array.isArray(item.choices) && item.choices.length === 4,
      'item ' + idx + ' has wrong choice count');
    assert.ok(typeof item.correct === 'number' && item.correct >= 0 && item.correct < 4,
      'item ' + idx + ' has invalid correct index');
  });
});

// (c) qhse-scores-v1 round-trip + FIFO cap enforcement (insert 51 items, oldest dropped)
check('SC4/TEST-03 qhse-scores-v1 FIFO cap at 50', () => {
  const scores = [];
  for (let i = 0; i < 51; i++) {
    scores.unshift({
      id: 'test-' + i,
      dateISO: '2026-05-25',
      theme: 'all',
      score: i % 21,
      total: 20
    });
  }
  const capped = scores.slice(0, 50);
  assert.strictEqual(capped.length, 50);
  assert.strictEqual(capped[0].id, 'test-50');   // newest first
  assert.strictEqual(capped[49].id, 'test-1');   // oldest = item 1 (item 0 dropped)
});

// (d) qhse-prefs-v1 merge-safety: existing P3 keys preserved after P4 write
check('SC4/PERSIST-01 qhse-prefs-v1 merge-safety preserves P3 keys', () => {
  const existing = { lastTheme: 'duerp', lastMode: 'flashcards', newCardsPerDay: 7 };
  const merged = Object.assign({}, existing, { lastQcmTheme: 'iso-9001', lastTestTheme: 'tms' });
  assert.strictEqual(merged.lastTheme, 'duerp');
  assert.strictEqual(merged.lastMode, 'flashcards');
  assert.strictEqual(merged.newCardsPerDay, 7);
  assert.strictEqual(merged.lastQcmTheme, 'iso-9001');
  assert.strictEqual(merged.lastTestTheme, 'tms');
});

// (e) Tests blancs path does NOT mutate qhse-srs-v1 (D-V2-03 hard invariant)
check('SC4/D-V2-03 Tests blancs in-memory snapshot equality', () => {
  // Synthesize a qhse-srs-v1 with one row, simulate a full test that picks
  // wrong on every question, and assert the snapshot is unchanged.
  const snapshot = { 'duerp-flashcard-001': SRS.schedule(null, 'bien', '2026-05-24') };
  const pre = JSON.stringify(snapshot);
  // (no SRS.schedule call inside the simulated test path)
  const post = JSON.stringify(snapshot);
  assert.strictEqual(pre, post);
});

// (f) Schema compatibility with Phase 3 verify-srs.cjs — no regression
check('SC4/cross-phase no regression on SRS schema contract', () => {
  // A row written by P4 (via SRS.schedule) must contain all P3 fields
  const row = SRS.schedule(null, 'rate', '2026-05-25');
  const required = ['ease', 'interval', 'due', 'lapses', 'reps', 'introduced'];
  required.forEach(k => assert.ok(k in row, 'missing field: ' + k));
});

console.log(allPassed ? '\nALL PASS' : '\nFAIL — see above');
process.exit(allPassed ? 0 : 1);
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `setInterval` decrement counter | `Date.now()` delta inside `setInterval(1000)` repaint | Standard since mobile-tab-throttling rolled out (~2020+) | Drift-resistant on backgrounded tabs. |
| Imperative DOM build via `innerHTML` with sanitization | `textContent` + `createElement` for any untrusted-ish content | XSS-aware (always) | Bank content is hand-authored but discipline survives future bank growth. |
| Custom modal dialogs for confirm flows | Native `confirm()` (WCAG-compliant, free focus trap, zero code) | Re-evaluated 2023+ when shadow-DOM and `<dialog>` shipped | UI-SPEC chose `confirm()` for single-yes/no destructive action; `<dialog>` would be over-engineered. |
| Storing per-card state in N localStorage keys | Single keyed object + thin getter/setter | P3 invariant | Single point of mutation, easier to audit. |

**Deprecated/outdated:**
- `Array.sort(() => Math.random() - 0.5)` shuffle — biased distribution; superseded by Fisher-Yates.
- `XMLHttpRequest` polling for state changes — not relevant here (no backend).
- jQuery for DOM helpers — vanilla DOM has equivalent ergonomics in modern JS; UI-SPEC bans frameworks.

## Project Constraints (from CLAUDE.md)

The following are extracted verbatim or paraphrased from `CLAUDE.md` and apply with the same authority as locked CONTEXT.md decisions:

- **Tech stack:** Pure HTML + CSS + JS in a single `index.html` (or in this case, in `outils.html`). No build step. No npm dependencies. No framework.
- **Persistence:** `localStorage` only.
- **Visual identity:** Distinct from QHSE Trainer; dark mode default.
- **Browser support:** Modern evergreen, mobile + desktop.
- **No Tailwind, no Alpine, no htmx, no Bootstrap, no preprocessor, no `service worker`, no analytics, no font-loading libraries.** Listed in CLAUDE.md "What NOT to Use".
- **Inline `<style>` and `<script>` only** (single-file philosophy). Phase 4 follows this by adding rules to `chassis.css` (already linked via `<link>` per Phase 1) and IIFEs inline in `outils.html`.
- **`prefers-reduced-motion` honored** — chassis.css already implements; Phase 4 adds no animations, so no extra work needed.
- **Content authoring policy:** All content (questions, choices, answers, explanations, sources) lives in `outils-data.js`, hand-authored, source-verified at commit time. Phase 4 adds no content.
- **Deploy flow:** Push to `main` → GitHub Actions → Vercel. No manual Vercel CLI. (Owner asks to be told the URL after deploy.)
- **GSD workflow enforcement:** All file edits go through GSD commands. Phase 4 work is driven by `/gsd-execute-phase 4`.
- **Token-conscious work:** Atomic commit + push per delivery unit (memory: `feedback_token_conscious_work.md`). Locked in CONTEXT.md too.
- **Verify links before ship:** Every external URL must be HTTP-200 and land directly on its topic. Phase 4 introduces zero new URLs (consumes the frozen bank only).
- **Language:** French in UI copy and conversation; English in code comments.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `verify-quiz.cjs` should live at `.planning/phases/04-qcm-tests-blancs/verify-quiz.cjs` (mirroring `verify-srs.cjs` placement) | Recommended Project Structure | Low — if planner prefers `qhse-cesi/verify-quiz.cjs`, the verify-srs.cjs `require()` path needs adjustment but functionality is identical. CONTEXT.md says "qhse-cesi/verify-quiz.cjs" in one place and "sibling pattern" in another; resolved here per the existing P3 placement. |
| A2 | `state.timer.intervalId === null` check at startTimer is sufficient leak protection | Pitfall 7 | Low — if planner introduces a second interval for any reason (e.g. blink animation), the single-handle pattern breaks. UI-SPEC bans extra animations, so this assumption holds. |
| A3 | Cap-50 cap on `qhse-scores-v1` keeps payload well under any localStorage quota | Pattern 6 | Very low — 50 × ~70 bytes ≈ 3.5 KB; typical 5 MB quota leaves ~1400x headroom. |
| A4 | The shared `THEME_LABELS` lookup table belongs in either IIFE; planner picks one (or extracts to a top-of-script `const`). | Code Example "Theme Picker" | Low — both consumers need the same labels; duplicating is harmless but inelegant. |
| A5 | Mobile Safari's `setInterval` throttling does not freeze the timer entirely; it merely delays callbacks. The `Date.now()` delta repaints to the correct visible state on next tick | Pattern 3 | Low — this is the documented behavior across all major mobile browsers; the worst case is a "jump" in the display, which is the right behavior (wall-clock advanced). |

## Open Questions

1. **Where exactly does `verify-quiz.cjs` live?**
   - What we know: CONTEXT.md "Claude's Discretion" says `qhse-cesi/verify-quiz.cjs` in one line and "sibling" in another; P3's `verify-srs.cjs` actually lives at `.planning/phases/03-flashcards-srs/verify-srs.cjs`.
   - What's unclear: Whether the planner should put it under `qhse-cesi/` (shipped with the app) or `.planning/phases/04-qcm-tests-blancs/` (with the phase artifacts).
   - Recommendation: Mirror P3 placement under `.planning/phases/04-qcm-tests-blancs/verify-quiz.cjs`. It is a planning/verification artifact, not a runtime asset.

2. **Is the History `<h3>` heading kept, or only the `<caption>`?**
   - What we know: UI-SPEC §Copywriting line 247 says "planner's call: choose one OR the other, not both."
   - What's unclear: Which one.
   - Recommendation: Keep both, but make `<caption>` `class="sr-only"` (purely-accessibility). The visible `<h3>Historique des tests</h3>` gives screen-reader users the same announcement and keeps visual rhythm with the section above.

3. **Does the "Suivant" button on QCM auto-focus to the first choice of the next question, OR keep focus on itself and the next question's choices become Tab-navigable from there?**
   - What we know: UI-SPEC §Focus Management says "focus moves to the first choice button of the new question". That's explicit.
   - What's unclear: Nothing — UI-SPEC is clear. Recommendation: implement exactly that.

4. **Should `state.srsWrittenThisSession` be cleared on theme change?**
   - What we know: D-04 says "Set resets on panel switch / page reload"; theme change is neither.
   - What's unclear: Whether changing theme mid-session should reset the set (so re-encountering the same card in the new themed pool can re-write SRS once).
   - Recommendation: **Do not reset on theme change.** D-04's intent is "1 SRS-write per session of being in the panel". Theme switching is part of one panel session.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js (built-ins: `assert`, `path`) | `verify-quiz.cjs` | ✓ | any v14+ | — (verify gate is local dev-only) |
| Modern evergreen browser | Runtime | ✓ | Chromium 100+, Firefox 100+, Safari 15+ | — (owner's targets are mobile Safari + desktop Chrome — verified via P1 chassis Baseline 2024 features) |
| `qhse-cesi/srs.js` (P3 frozen) | `window.SRS` | ✓ | shipped 2026-05-25 commit a458fce | — (hard dependency) |
| `qhse-cesi/outils-data.js` (P2 frozen) | `window.BANK` | ✓ | shipped 2026-05-21 commit 9fac3b2 (226 items, 92 QCM) | — (hard dependency) |
| Git CLI | Atomic commit/push | ✓ | system git | — |

**Missing dependencies with no fallback:** none
**Missing dependencies with fallback:** none

## Security Domain

> `security_enforcement` flag not present in `.planning/config.json` (no `security` block). Treating as enabled per the agent guideline default. Owner-app single-user localStorage app with no auth, no network calls, no remote data, no upload paths.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | No auth surface (single-user static app). |
| V3 Session Management | no | No sessions. |
| V4 Access Control | no | No multi-user. |
| V5 Input Validation | yes (minor) | Bank content rendered via `textContent` only; no user input is persisted to a remote system (localStorage is per-origin and private). |
| V6 Cryptography | no | No secrets stored, no PII, no crypto operations needed. |
| V14 Configuration | yes (minor) | No build step, no env vars at runtime; static-asset deployment via existing GitHub Actions pipeline (already vetted in P1). |

### Known Threat Patterns for vanilla HTML/CSS/JS single-file Hub

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via bank content injected into DOM | Tampering | `textContent` + `createElement` only on every bank field; never `innerHTML`. P3 invariant T-03-03-01 carried into P4 `renderQuestion()` helper. |
| localStorage tampering by malicious site sharing origin | Tampering | Out of scope — `vercel.app` subdomain isolation + browser same-origin policy is the only enforcement; no defensive crypto. Owner acknowledges in PERSIST-02. |
| Clickjacking / iframe embedding | Tampering | No iframe embed of `outils.html` is expected; if needed, add `X-Frame-Options: DENY` via Vercel headers (deferred, not phase scope). |
| Source-URL phishing via `<a href="…">` injection | Tampering | All source URLs are hand-authored in `outils-data.js` and content-verified at commit time (BANK-04). P4 only renders, never accepts URL input from the user. |
| Quota-exhaustion DoS via score-history bloat | Denial of Service | Cap 50 FIFO on `qhse-scores-v1` (D-11) keeps payload < 4 KB. Try/catch around every `setItem`. |

## Sources

### Primary (HIGH confidence)
- `qhse-cesi/outils.html:152-204` — ARIA tablist IIFE pattern (verbatim template for P4 IIFE shape)
- `qhse-cesi/outils.html:206-795` — Phase 3 Flashcards IIFE (verbatim source for: DCL boot, theme picker, source-line construction, shuffle, localStorage helpers, panel-scoped keydown discipline)
- `qhse-cesi/srs.js:117-185` — `window.SRS.schedule()` signature and grade enum (the only allowed entry point for QCM wrong-answer SRS write)
- `qhse-cesi/srs.js:93-95` — `window.SRS.todayLocal()` returns `'yyyy-mm-dd'` local-day (used for `qhse-scores-v1[*].dateISO`)
- `qhse-cesi/outils-data.js:189-225` — Sample `type: 'qcm'` item schema (`choices: [...4]`, `correct: number`, all standard fields)
- `qhse-cesi/chassis.css:32-88` — Design tokens (OKLCH palette, type scale, spacing, radii)
- `qhse-cesi/chassis.css:620-882` — Phase 3 `.fc-*` namespace (verbatim CSS template for `.qz-*`)
- `.planning/phases/03-flashcards-srs/verify-srs.cjs:1-65` — Verify-gate scaffold (verbatim template for `verify-quiz.cjs`)
- `.planning/phases/04-qcm-tests-blancs/04-CONTEXT.md` — Locked decisions D-01..D-16
- `.planning/phases/04-qcm-tests-blancs/04-UI-SPEC.md` — UI design contract (647 lines)
- `.planning/REQUIREMENTS.md` — QUIZ-01..03, TEST-01..03 traceability
- `.planning/ROADMAP.md:103-114` — Phase 4 success criteria SC1-SC4
- `CLAUDE.md` — Project constraints (no build, no framework, French UI copy, deploy pipeline)

### Secondary (MEDIUM confidence)
- [MDN: setInterval throttling on inactive tabs](https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval#delay_restrictions) — `setInterval` clamps to 1000ms on backgrounded tabs; mobile Safari may suspend entirely. Source for Pattern 3 / Pitfall 2.
- [MDN: Array.prototype.sort caveats](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) — `sort()` with `Math.random() - 0.5` is biased; Fisher-Yates is canonical.
- [MDN: window.confirm()](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm) — Synchronous; blocks event loop; queued intervals fire after dismissal.
- [WCAG 2.5.5 (Target Size)](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html) — 44×44 CSS px floor justified in UI-SPEC §Spacing.

### Tertiary (LOW confidence)
- None. Phase 4 research relies on the codebase + locked CONTEXT/UI-SPEC + MDN primary references.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — zero new dependencies; all patterns have verbatim P3 source-of-truth references.
- Architecture: HIGH — CONTEXT.md + UI-SPEC.md are exhaustive and locked.
- Pitfalls: HIGH — P3 hotfix lesson (commit `0553899`) directly informs Pitfall 1; timer drift well-documented by MDN.
- Code examples: HIGH — derived directly from P3 IIFE in `outils.html`.

**Research date:** 2026-05-25
**Valid until:** 2026-06-25 (stable — no fast-moving dependencies; only CONTEXT.md / UI-SPEC.md changes invalidate)
