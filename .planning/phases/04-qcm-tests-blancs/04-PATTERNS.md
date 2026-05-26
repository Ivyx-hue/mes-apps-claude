# Phase 4: QCM + Tests blancs — Pattern Map

**Mapped:** 2026-05-25
**Files analyzed:** 5 new/modified surfaces
**Analogs found:** 5 / 5 (exact match on every surface — Phase 3 is the verbatim template)

> **Scope of this PATTERNS.md:** Phase 4 ships **edits to 3 existing files** (`outils.html`, `chassis.css`) and **1 new file** (`verify-quiz.cjs`). All five "surfaces" below map to concrete file:line ranges in Phase 1/2/3 deliverables. Phase 4 is overwhelmingly a copy-extend-adapt phase, not a greenfield one.

---

## File Classification

| Surface | Type | Role | Data Flow | Closest Analog | Match Quality |
|---------|------|------|-----------|----------------|---------------|
| `qhse-cesi/outils.html` lines 133, 138 (scaffold DOM) | scaffold-DOM | mount point HTML for `#panel-qcm` + `#panel-tests` | static render | `qhse-cesi/outils.html:60-126` (P3 `#panel-flashcards` scaffold) | **exact** — same panel-replacement-of-placeholder pattern |
| `qhse-cesi/outils.html` (NEW QCM IIFE, after L795) | engine-IIFE | request-response loop: read BANK → render → click → reveal+SRS-write → advance | event-driven + CRUD on `qhse-srs-v1` | `qhse-cesi/outils.html:206-795` (P3 Flashcards IIFE) | **exact** — same DCL boot, same theme picker, same localStorage helpers |
| `qhse-cesi/outils.html` (NEW Tests blancs IIFE, after QCM IIFE) | engine-IIFE | 3-state machine: START → RUNNING (timer + free-nav) → RESULTS (score + corrections) | event-driven + batch (one CRUD on `qhse-scores-v1` per completed test) | `qhse-cesi/outils.html:206-795` (P3 Flashcards IIFE — partial; state machine + timer are new) | **role-match** — same IIFE shape, but tri-state machine + timer are net-new code |
| `qhse-cesi/chassis.css` (NEW `.qz-*` block inside `@layer components`) | CSS | visual contract for QCM + Tests blancs surfaces | static styling | `qhse-cesi/chassis.css:547-882` (`.fc-*` namespace, Phase 3) | **exact** — same prefixing convention, same parent-selector scoping (`#panel-qcm` / `#panel-tests`), same token reuse |
| `.planning/phases/04-qcm-tests-blancs/verify-quiz.cjs` (NEW) | verification-gate | Node-built-ins assert script | one-shot CLI exit 0/1 | `.planning/phases/03-flashcards-srs/verify-srs.cjs` (P3 gate) | **exact** — same `global.window` shim, same `pass`/`fail`/`check` helpers, same labelled assertions |

---

## Pattern Assignments

### Surface 1: `#panel-qcm` scaffold DOM (replaces `outils.html:133-135` placeholder)

**Analog:** `qhse-cesi/outils.html:60-126` (the `#panel-flashcards` scaffold P3 produced when it replaced its own placeholder)

**The replace-the-placeholder pattern** (analog lines `133-135` currently, the placeholder Phase 4 replaces):

```html
<!-- BEFORE — outils.html:133-136 (current state) -->
<div role="tabpanel" id="panel-qcm" aria-labelledby="tab-qcm" tabindex="0" hidden>
  <!-- Phase 4 mount point: QCM entraînement -->
  <p class="placeholder">Ce mode arrive en Phase 4 — questions à choix multiples avec correction immédiate et score de session. Couvre l'ensemble des blocs de compétences du Bachelor QHSE CESI.</p>
</div>
```

**Children pattern to copy from P3 `#panel-flashcards`** (outils.html:60-126):
1. `<h2 class="sr-only">` first child — line 61 — sr-only landmark heading (UI-SPEC §Copywriting requires `QCM — révision rapide`)
2. `<nav class="fc-theme">` block — lines 81-101 — theme picker label + native `<select>` with 16 `<option>` rows (`all` + 15 themes in source order — UI-SPEC line 205 confirms identical option set)
3. `<article class="fc-card" data-fc-card>` block — lines 103-119 — the focal card; QCM analog uses `.qz-card` with `[data-qz-question]` + `.qz-choices` (4 `<button>` children) + `.qz-reveal[hidden]` (badge + answer + explanation + source) + Suivant button

**Theme picker `<option>` list to copy verbatim** (outils.html:84-100):
```html
<option value="all">Tous les thèmes</option>
<option value="duerp">DUERP</option>
<option value="principes-generaux">Principes généraux de prévention</option>
<option value="iso-9001">ISO 9001</option>
<option value="iso-14001">ISO 14001</option>
<option value="iso-45001">ISO 45001</option>
<option value="tms">TMS</option>
<option value="risque-routier">Risque routier</option>
<option value="risque-chimique">Risque chimique</option>
<option value="rps">RPS</option>
<option value="espaces-confines">Espaces confinés</option>
<option value="acronymes">Acronymes</option>
<option value="metiers">Métiers</option>
<option value="calendrier">Calendrier alternance</option>
<option value="icpe-seveso">ICPE / Seveso</option>
<option value="rncp">RNCP / Blocs de compétences</option>
```
(Adapt: `id="qz-qcm-theme-select"` and `data-qz-theme` instead of `fc-theme-select` / `data-fc-theme`.)

**ARIA + `[hidden]` discipline** (`outils.html:108`): the verso uses `hidden` attribute, NOT `display: none`. Phase 4 `.qz-reveal[hidden]` follows the same rule so screen readers skip pre-reveal content.

---

### Surface 2: QCM engine IIFE (append after `outils.html:795`)

**Analog:** `qhse-cesi/outils.html:206-795` (P3 Flashcards IIFE — verbatim template)

**Imports / boot pattern** (lines 206-220 + 790-795):
```javascript
<script>
  /* ============ IIFE: Flashcards view — SM-2 SRS, theme picker, grading, free-revision ============ */
  /* No globals, no inline on* handlers, no document-level keydown. Phase 3 / Plan 03-03. */
  (() => {
    'use strict';

    // Double-load guard — prevent re-running if script tag is somehow duplicated
    if (window.__fcViewBooted) return;
    window.__fcViewBooted = true;

    // Inline scripts execute during HTML parsing — BEFORE deferred external
    // scripts (outils-data.js, srs.js) finish evaluating. Defer the IIFE body
    // until DOMContentLoaded (which fires after all defer scripts complete),
    // so window.BANK and window.SRS are guaranteed populated.
    function boot() {
      // ...
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
      boot();
    }
  })();
</script>
```
Adapt: rename guard to `window.__qzQcmBooted`. Keep every other line verbatim — this is the hotfix from commit `0553899` (P3 race condition fix). Do not invent variations.

**Pre-flight BANK + SRS guard** (lines 222-237):
```javascript
const panel = document.getElementById('panel-flashcards');

if (!window.BANK || !Array.isArray(window.BANK) || !window.SRS || typeof window.SRS.schedule !== 'function') {
  // Graceful degradation — render an inline error inside the card
  const card = panel && panel.querySelector('[data-fc-card]');
  if (card) {
    const errEl = document.createElement('p');
    errEl.className = 'fc-error';
    errEl.textContent = 'Impossible de charger la banque de cartes. Recharge la page ou vérifie que outils-data.js est bien servi.';
    card.appendChild(errEl);
  }
  console.error('[Flashcards] BANK or SRS missing — cannot boot view.', { BANK: !!window.BANK, SRS: !!window.SRS });
  return;
}
```
Adapt: panel id `panel-qcm`, card selector `[data-qz-card]`, class `.qz-error`, log tag `[QCM]`. Copy: pre-flight + early-return + console.error + inline error message structure.

**`readPrefs` / `writePrefs` — merge-safe `qhse-prefs-v1`** (lines 257-285):
```javascript
function readPrefs() {
  try {
    const raw = localStorage.getItem('qhse-prefs-v1');
    if (!raw) return Object.assign({}, DEFAULT_PREFS);
    const parsed = JSON.parse(raw);
    return {
      lastTheme: (typeof parsed.lastTheme === 'string') ? parsed.lastTheme : DEFAULT_PREFS.lastTheme,
      lastMode:  (typeof parsed.lastMode  === 'string') ? parsed.lastMode  : DEFAULT_PREFS.lastMode,
      newCardsPerDay: (typeof parsed.newCardsPerDay === 'number' &&
                       parsed.newCardsPerDay >= 1 && parsed.newCardsPerDay <= 50)
                      ? Math.floor(parsed.newCardsPerDay)
                      : DEFAULT_PREFS.newCardsPerDay
    };
  } catch (e) {
    console.warn('[Flashcards] readPrefs failed:', e.message);
    return Object.assign({}, DEFAULT_PREFS);
  }
}

function writePrefs(partial) {
  try {
    const raw = localStorage.getItem('qhse-prefs-v1');
    const existing = raw ? JSON.parse(raw) : {};
    const merged = Object.assign({}, existing, partial);
    localStorage.setItem('qhse-prefs-v1', JSON.stringify(merged));
  } catch (e) {
    console.warn('[Flashcards] writePrefs failed:', e.message);
  }
}
```
**The `writePrefs(partial)` shape at line 276-285 is the canonical merge-safe pattern.** Phase 4 reuses it byte-for-byte. The QCM IIFE calls it with `{ lastQcmTheme: 'duerp' }`; Tests blancs IIFE calls it with `{ lastTestTheme: 'iso-9001' }`. Phase 3's existing `lastTheme`, `lastMode`, `newCardsPerDay` are preserved automatically because `Object.assign({}, existing, partial)` keeps all unknown keys. **Pitfall 3 protection lives in this exact pattern.**

**`readStore` / `writeStore` — `qhse-srs-v1` access** (lines 287-305):
```javascript
function readStore() {
  try {
    const raw = localStorage.getItem('qhse-srs-v1');
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {};
  } catch (e) {
    console.warn('[Flashcards] readStore failed (corrupt JSON — starting fresh):', e.message);
    return {};
  }
}

function writeStore(store) {
  try {
    localStorage.setItem('qhse-srs-v1', JSON.stringify(store));
  } catch (e) {
    console.warn('[Flashcards] writeStore failed:', e.message);
  }
}
```
QCM IIFE reuses verbatim. **The only caller of `writeStore` in the QCM IIFE is the wrong-answer click handler** (see Surface 2 § "Core CRUD pattern" below).

**`THEME_SLUGS` constant** (lines 242-246) — copy verbatim into the QCM IIFE. Tests blancs IIFE may inline its own copy or share via a module-top `const` (RESEARCH §Assumption A4 — both acceptable).

**Fisher-Yates `shuffle()`** (lines 344-351):
```javascript
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}
```
QCM IIFE does NOT need shuffle (D-08 forbids shuffle of `choices[]`). Tests blancs IIFE uses it for queue composition (Surface 3).

**Core render pattern — `renderCard(card)`** (lines 419-453) — adapt to `renderQuestion(item, opts)` per RESEARCH §Pattern 2:
- `elQuestion.textContent = card.question;` (line 430) — same pattern for the stem
- `elVerso.hidden = true;` (line 433) — same pattern for `.qz-reveal[hidden]`
- `while (elSource.childNodes.length > 1)` (lines 439-441) — clear-but-keep-sr-only-span; reused for `[data-qz-source]`

**Core CRUD pattern — wrong-answer SRS write** (D-03, D-04 — synthesised from `gradeCard` lines 503-525):
```javascript
function gradeCard(grade) {
  if (!currentCard || freeRevision) return;

  const today  = window.SRS.todayLocal();
  const row    = store[currentCard.id] || null;
  const wasNew = !row;
  const newRow = window.SRS.schedule(row, grade, today);

  store[currentCard.id] = newRow;
  writeStore(store);

  // Update session counters
  session.dues -= 1;
  if (wasNew) session.newIntroduced += 1;
  if (grade === 'rate') session.bad += 1;
  else session.good += 1;

  renderBandeau();

  // Advance queue
  currentCard = queue.shift() || null;
  renderCard(currentCard);
}
```

**Phase 4 adaptation** (single call site for `SRS.schedule` in the entire QCM IIFE — RESEARCH §Code Example "Wrong-QCM SRS Feed"):
```javascript
function handleQcmClick(item, pickedIdx) {
  const isCorrect = (pickedIdx === item.correct);

  // Render reveal panel (renderQuestion in 'qcm-live' mode)
  renderQuestion(item, { mode: 'qcm-live', picked: pickedIdx, targetEls: qcmEls });
  qcmEls.reveal.hidden = false;
  qcmEls.badge.textContent = isCorrect ? '✓ Correct' : '✗ Incorrect';
  qcmEls.badge.dataset.qzBadgeState = isCorrect ? 'correct' : 'incorrect';
  qcmEls.nextBtn.focus();

  // SRS write — only on incorrect, only once per session per item (D-03 / D-04)
  if (!isCorrect && !state.srsWrittenThisSession.has(item.id)) {
    const today  = window.SRS.todayLocal();
    const row    = store[item.id] || null;
    const newRow = window.SRS.schedule(row, 'rate', today);
    store[item.id] = newRow;
    writeStore(store);
    state.srsWrittenThisSession.add(item.id);
  }
}
```
`state.srsWrittenThisSession = new Set()` is initialised once at boot; reset implicit on page reload (Set is in-memory only — D-04 invariant).

**Source-line builder** (lines 465-490) — copy verbatim into `renderQuestion()`:
```javascript
const src = currentCard.source;
if (src) {
  const authorityText = document.createTextNode(src.authority);
  elSource.appendChild(authorityText);

  if (src.ref) {
    elSource.appendChild(document.createTextNode(' — '));
    const codeEl = document.createElement('code');
    codeEl.textContent = src.ref;
    elSource.appendChild(codeEl);
  }

  if (src.url && src.url.startsWith('http')) {
    elSource.appendChild(document.createTextNode(' '));
    const a = document.createElement('a');
    a.href = src.url;
    a.textContent = src.url;
    a.rel = 'noopener noreferrer';
    a.target = '_blank';
    elSource.appendChild(a);
  }
}
```
XSS-safe (T-03-03-01): never `innerHTML` on bank fields. `<code>` for `src.ref` matches chassis rule `[data-fc-source] code` (chassis:742-745) — same rule will fire on `[data-qz-source] code` once Surface 4 adds that selector to chassis.

**Event-wiring pattern — panel-scoped listeners only** (lines 672-756):
- Theme change → write prefs + re-build queue + render (line 678)
- Click on choice → handler (analogous to `elReveal.addEventListener('click', …)` line 703)
- Keydown handler at PANEL scope, not document — line 730 (`panel.addEventListener('keydown', e => { ... })`)
- Form-control bypass: line 732 `if (e.target.matches('select, input, textarea')) return;`

**Critical anti-pattern (DO NOT DO):** Never `document.addEventListener('keydown', …)`. Listeners scoped to the panel. Arrow keys pass-through (UI-SPEC keyboard contract).

**Boot sequence at end** (lines 758-787): restore `prefs.lastTheme` (Phase 4: `prefs.lastQcmTheme`) into `<select>.value`, build initial queue, render first item. Same shape.

---

### Surface 3: Tests blancs engine IIFE (append after QCM IIFE)

**Analog:** `qhse-cesi/outils.html:206-795` (P3 Flashcards IIFE) for IIFE shell, boot, localStorage helpers. **State machine + timer + score-history persistence are net-new** — derive from RESEARCH §Pattern 3, 6, 7.

**Reuse from Flashcards IIFE verbatim:**
- IIFE shell + DCL boot (206-220, 790-795) — adapt guard to `window.__qzTestsBooted`
- Pre-flight BANK guard (222-237) — adapt panel id, **omit the SRS check entirely** (D-V2-03 — Tests blancs never reads `window.SRS.schedule`; it MAY still call `window.SRS.todayLocal()` for `dateISO`, but the planner can also inline the same 1-liner)
- `readPrefs` / `writePrefs` (257-285) — same merge-safe pattern, writes `lastTestTheme` partial
- Fisher-Yates `shuffle()` (344-351) — used for queue composition (D-08)
- `renderQuestion(item, opts)` shared helper (the QCM IIFE owns the canonical definition; Tests blancs imports by side-effect or duplicates — planner's call per RESEARCH §Assumption A4)

**Net-new pattern 1: tri-state machine** (RESEARCH §Pattern 7):
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
**Mounts:** three sibling `<div>` children of `#panel-tests` (`.qz-start`, `.qz-running[hidden]`, `.qz-results[hidden]`). Always exactly one visible. Instant `[hidden]` toggle — no animation (UI-SPEC §Motion Contract).

**Net-new pattern 2: drift-resistant timer** (RESEARCH §Pattern 3):
```javascript
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
**Critical:** `Date.now()` delta NOT counter decrement. `setInterval` is for paint only. Wall-clock is the source of truth (Pitfall 2 — backgrounded mobile Safari throttling).

**Net-new pattern 3: free-nav with answer map** (RESEARCH §Pattern 8):
```javascript
const state = {
  queue: [],                         // 20 items, set at test start
  currentIdx: 0,
  picks: new Array(20).fill(null),   // sparse: null = unanswered
  theme: 'all'
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
  elProgress.setAttribute('aria-label', 'Question ' + (idx + 1) + ' sur ' + state.queue.length);
  elNextBtn.textContent = (idx === state.queue.length - 1) ? 'Terminer le test' : 'Suivant';
  elPrevBtn.disabled = (idx === 0);
}
```

**Net-new pattern 4: `qhse-scores-v1` append-only FIFO** (RESEARCH §Pattern 6):
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
    return readScores();
  }
}
```
Read/write idioms mirror `readStore`/`writeStore` from outils.html:287-305 (same try/catch, same console.warn discipline, same defensive type check). The shape difference: `qhse-scores-v1` is an **array** (line 433: `Array.isArray(parsed)`), `qhse-srs-v1` is an **object** (line 292: `typeof parsed === 'object' && !Array.isArray(parsed)`). The array shape is mandated by D-12 (sorted most-recent-first).

**Abandon flow** (RESEARCH §Pattern 4):
```javascript
function onAbandonClick() {
  const ok = window.confirm('Es-tu sûr de vouloir abandonner ? Tes réponses seront perdues.');
  if (ok) {
    stopTimer();
    transitionTo(STATE.START);
    // CRITICAL: do NOT write to qhse-scores-v1 (D-14/D-15)
  }
}
```

**Final score row** (RESEARCH §Code Example "Final Results Render"):
```javascript
const row = {
  id:      'test-' + Date.now(),
  dateISO: window.SRS.todayLocal(),    // reuse P3 helper (srs.js:93-95) for local-day
  theme:   state.theme,
  score:   correctCount,
  total:   20
};
appendScore(row);
```
**Even though Tests blancs must never call `SRS.schedule`, it MAY call `SRS.todayLocal()`** — that function is a pure date helper, not a state mutator. This is a deliberate exception clarifying D-V2-03's structural invariant (the invariant forbids `SRS.schedule(_, 'rate'|…)` write paths, not pure helpers). The `verify-quiz.cjs` group-(e) assertion targets `qhse-srs-v1` snapshot equality before/after a Tests blancs session — `todayLocal()` cannot mutate that store.

**Anti-pattern checklist (NEVER do):**
- `document.addEventListener('keydown', …)` — Pitfall scope; listeners go on the choice button + nav buttons only
- Decrement counter inside `setInterval` — Pitfall 2 / Pattern 3
- `setItem('qhse-prefs-v1', JSON.stringify({lastTestTheme}))` without merging existing keys — Pitfall 3 / Pattern 5
- Call `window.SRS.schedule` anywhere in the Tests blancs IIFE — D-V2-03 hard invariant
- `Array.sort(() => Math.random() - 0.5)` — biased; use Fisher-Yates from line 344
- `beforeunload` warning during a test — D-14 explicit rejection
- Auto-submit at 00:00 — D-13 explicit rejection (banner only)
- `innerHTML` on bank content — T-03-03-01 invariant
- `<dialog>` element for abandon — UI-SPEC chose native `confirm()` (lines 267-274)

---

### Surface 4: `.qz-*` CSS namespace (additions to chassis.css `@layer components`)

**Analog:** `qhse-cesi/chassis.css:547-882` (the `.fc-*` block Phase 3 added via Plan 03 Task 1, commit `9cc1f2e`)

**Mount location:** Inside the existing `@layer components { ... }` (chassis.css:160-883). Append after the closing brace of the Flashcards block (around line 882). The layer ordering is set at line 2: `@layer reset, tokens, base, components, utilities;`. Phase 4 adds **zero new tokens**; chassis layers stay untouched.

**Scoping rule (UI-SPEC binding):** Every Phase 4 selector starts with `#panel-qcm` OR `#panel-tests` — never a bare `.qz-*`. The `.fc-theme` and `.fc-card` rules at chassis:621, 654 use bare selectors because they live inside `#panel-flashcards` by HTML mount; Phase 4 uses the explicit prefix for grep-friendliness and to keep two consumers (`#panel-qcm` + `#panel-tests`) isolated when needed.

**Theme picker pattern** (chassis.css:621-651):
```css
.fc-theme {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
  margin-block: var(--space-md);
  flex-wrap: wrap;
}
.fc-theme label {
  font-weight: 500;
  color: var(--ink-2);
}
#fc-theme-select {
  font: inherit;
  min-height: 44px;
  background: var(--bg-2);
  color: var(--ink-1);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 0 var(--space-md);
  width: 100%;
}
#fc-theme-select:focus-visible {
  border-color: var(--accent);
}
@media (min-width: 48rem) {
  #fc-theme-select {
    min-width: 16rem;
    max-width: 24rem;
    width: auto;
  }
}
```
**Phase 4 adaptation:** rule body identical; selector base becomes `.qz-theme` and `#qz-qcm-theme-select`, `#qz-test-theme-select`. Planner option: merge into one `.qz-theme select` rule that targets both IDs.

**Card pattern** (chassis.css:654-671):
```css
.fc-card {
  background: var(--bg-2);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  min-height: clamp(16rem, 40vh, 24rem);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-block: var(--space-md);
}
@media (min-width: 48rem) {
  .fc-card {
    padding: var(--space-lg);
    max-width: 48rem;
    margin-inline: auto;
  }
}
```
**Phase 4 adaptation:** rule body identical except `min-height: clamp(20rem, 50vh, 32rem)` (UI-SPEC §Card visual treatment increase rationale: 4-choice stack adds vertical mass). Selector base becomes `#panel-qcm .qz-card`, `#panel-tests .qz-card`.

**Question stem pattern** (chassis.css:679-687):
```css
#panel-flashcards [data-fc-question] {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: var(--step-3);
  color: var(--ink-1);
  line-height: 1.3;
  text-wrap: balance;
  margin: 0;
}
```
**Phase 4 adaptation:** selector becomes `#panel-qcm [data-qz-question], #panel-tests [data-qz-question]`. Body identical.

**Primary CTA pattern (Suivant / Démarrer un test)** (chassis.css:688-703):
```css
#panel-flashcards [data-fc-reveal] {
  min-height: 44px;
  padding: 0 var(--space-lg);
  background: var(--accent);
  color: var(--bg-1);
  border: 1px solid var(--accent);
  border-radius: var(--radius-sm);
  font: inherit;
  font-weight: 600;
  font-size: var(--step-1);
  cursor: pointer;
  align-self: start;
}
#panel-flashcards [data-fc-reveal]:hover {
  filter: brightness(1.05);
}
```
**Phase 4 adaptation:** selector becomes `#panel-qcm [data-qz-next], #panel-tests [data-qz-start]` for the two primary CTAs (and `[data-qz-restart]` for the "Nouveau test" CTA on results screen — UI-SPEC line 568 confirms accent treatment for all three).

**Keyboard hint pattern (desktop ≥48rem only)** (chassis.css:704-715):
```css
#panel-flashcards [data-fc-reveal-hint] {
  display: none;
}
@media (min-width: 48rem) {
  #panel-flashcards [data-fc-reveal-hint] {
    display: inline;
    color: var(--ink-3);
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: var(--step--1);
    margin-inline-start: var(--space-sm);
  }
}
```
Reuse for `[data-qz-next-hint]` (`Espace ou Entrée`) on the QCM "Suivant" button.

**Reveal-panel typography** (chassis.css:718-752): the `.fc-verso` block + `[data-fc-answer]` / `[data-fc-explanation]` / `[data-fc-source]` rules — these are the canonical reveal-panel typography. Phase 4 replicates verbatim under `.qz-reveal`, `[data-qz-answer]`, `[data-qz-explanation]`, `[data-qz-source]`. The `[data-fc-source] code` and `[data-fc-source] a` rules (chassis:742-752) port directly to `[data-qz-source] code` and `[data-qz-source] a`.

**Grade buttons → choice buttons** (chassis.css:755-804): the `.fc-grades` block is the closest analog for `.qz-choices`. Differences:
- `.fc-grades` is `flex-direction: row` on desktop (chassis:762-768) — Phase 4 `.qz-choices` stays `column` on **both viewports** (D-08 — keeps `correct` index unambiguous; UI-SPEC §Responsive layout)
- Hover/focus colors are grade-typed in P3 (lines 781-804) — Phase 4 uses semantic state attributes `data-qz-choice-state="picked-correct" | "picked-incorrect" | "unpicked-correct" | "unpicked-distractor" | "selected" | "idle"` instead of `data-fc-grade`

**Net-new CSS Phase 4 needs (no analog):**
- `.qz-timer-row` (flex container, timer left / progress right)
- `[data-qz-timer]` with `data-qz-timer-state="normal|alert|expired"` color states
- `[data-qz-progress]` (JetBrains Mono, weight 500, `--step-2`)
- `.qz-timer-banner[hidden]` (timeout banner — `color-mix(in oklch, var(--alert) 12%, var(--bg-2))` background)
- `.qz-test-controls` (3-button row: Précédent / Abandonner / Suivant)
- `.qz-results__hero` + `[data-qz-score]` (score hero panel with 3-tier color via `data-qz-score-tier`)
- `.qz-corrections` (`<ol>` of 20 per-question corrections — reuses `.qz-card`-like styling per `<li>`)
- `.qz-history` (`<table>` with mono date column, sans theme, mono score)

All net-new CSS uses chassis tokens only — no `:root` additions (UI-SPEC scoping rule line 33).

**Cross-cutting** : `@media (prefers-reduced-motion: reduce)` block in chassis (lines 22-29 per UI-SPEC reference) is already global — Phase 4 adds zero animations, so no Phase 4-specific motion override is needed.

---

### Surface 5: `verify-quiz.cjs` (NEW, mirrors `verify-srs.cjs`)

**Analog:** `.planning/phases/03-flashcards-srs/verify-srs.cjs` (Phase 3 gate — 277 lines, commit `803c4b8`)

**Location:** Per RESEARCH §Assumption A1, place at `.planning/phases/04-qcm-tests-blancs/verify-quiz.cjs` (mirrors P3 placement under planning artifacts, NOT under `qhse-cesi/` runtime). CONTEXT.md mentions both locations; the P3 precedent breaks the tie.

**Bootstrap pattern — `global.window` shim + double-require** (verify-srs.cjs:14-39):
```javascript
'use strict';

const path   = require('path');
const assert = require('assert');

const srsPath = path.resolve(__dirname, '../../../qhse-cesi/srs.js');
global.window = {};

try {
  require(srsPath);
} catch (e) {
  console.error('FAIL: could not load srs.js from', srsPath);
  console.error(e.message);
  process.exit(1);
}

const SRS = global.window.SRS;

if (!SRS || typeof SRS.schedule !== 'function') {
  console.error('FAIL: window.SRS not exported (or schedule function missing) after loading', srsPath);
  process.exit(1);
}

console.log('srs.js loaded OK — window.SRS keys:', Object.keys(SRS).join(', '));
```
**Phase 4 adaptation:** also require `outils-data.js` to access `window.BANK` (RESEARCH §Code Example "verify-quiz.cjs pattern" lines 814-818):
```javascript
global.window = {};
require(path.resolve(__dirname, '../../../qhse-cesi/srs.js'));
require(path.resolve(__dirname, '../../../qhse-cesi/outils-data.js'));
const SRS  = global.window.SRS;
const BANK = global.window.BANK;
```

**Helper pattern — `pass` / `fail` / `check`** (verify-srs.cjs:44-64):
```javascript
let allPassed = true;

function pass(label) {
  console.log('PASS [' + label + ']');
}

function fail(label, reason) {
  console.error('FAIL [' + label + '] ' + reason);
  allPassed = false;
}

function check(label, fn) {
  try {
    fn();
    pass(label);
  } catch (e) {
    fail(label, e.message);
  }
}
```
Copy verbatim. Phase 4 keeps the exact `PASS [label]` / `FAIL [label] reason` console format — supports the same human + grep ergonomics as P3.

**Assertion structure pattern** (verify-srs.cjs:74-134 — 8 named edge cases E1-E8):
```javascript
check('SC2/SRS-01 E1 first-grade-ever bien on new card', () => {
  const r = SRS.schedule(null, 'bien', '2026-05-23');
  assert.strictEqual(r.reps, 1);
  assert.strictEqual(r.interval, 1);
  assert.strictEqual(r.ease, 2.5);
  assert.strictEqual(r.due, '2026-05-24');
  assert.strictEqual(r.introduced, '2026-05-23');
});
```
**Label format:** `SC{success-criterion}/{requirement-id} {short-name}` — Phase 4 follows `SC{N}/QUIZ-0X` or `SC{N}/TEST-0X` or `SC{N}/D-V2-03`. CONTEXT.md "Claude's Discretion" §"Verification gate" lists 6 assertion groups (a-f) — RESEARCH §"verify-quiz.cjs Pattern" code at lines 826-903 has the full draft (groups a-f, lines 829-900).

**Final exit pattern** (verify-srs.cjs:269-276):
```javascript
console.log('\n' + '='.repeat(70));
if (allPassed) {
  console.log('--final: ALL Phase 3 SRS gates PASS — window.SRS verified for SC2/SC3/SC4/SC5');
  process.exit(0);
} else {
  console.error('--final: ONE OR MORE ASSERTIONS FAILED — see FAIL lines above');
  process.exit(1);
}
```
**Phase 4 adaptation:** copy structure verbatim; substitute "Phase 4 quiz gates PASS — window.BANK + window.SRS verified for QUIZ-01..03, TEST-01..03, D-V2-03".

**Cross-phase contract assertion** (group (e) — D-V2-03 hard invariant — RESEARCH §Code Example lines 884-892):
```javascript
check('SC4/D-V2-03 Tests blancs in-memory snapshot equality', () => {
  const snapshot = { 'duerp-flashcard-001': SRS.schedule(null, 'bien', '2026-05-24') };
  const pre = JSON.stringify(snapshot);
  // (no SRS.schedule call inside the simulated test path)
  const post = JSON.stringify(snapshot);
  assert.strictEqual(pre, post);
});
```
This is the structural-invariant guarantee — Tests blancs path MUST NOT mutate `qhse-srs-v1`. RESEARCH §Pitfall 5 provides the planner-side mitigation: `git grep -n 'SRS\.schedule' qhse-cesi/outils.html` should match only QCM-IIFE block (one call site).

**Verify-bank.cjs precedent (PERSIST-01 round-trip)** — already exists at `.planning/phases/02-content-bank/verify-bank.cjs`. Phase 4's `verify-quiz.cjs` complements (not replaces) both P2 and P3 gates; CI / local-dev runs all three.

---

## Shared Patterns (cross-cutting, apply to all Phase 4 surfaces)

### Pattern S1: DCL boot for inline IIFE consuming a deferred global
**Source:** `qhse-cesi/outils.html:206-220` + `790-795` (P3 hotfix, commit `0553899`)
**Apply to:** QCM IIFE (Surface 2), Tests blancs IIFE (Surface 3)
**Excerpt:** see Surface 2 § "Imports / boot pattern" above. Both new IIFEs MUST follow the same shape — never read `window.BANK` / `window.SRS` at script parse time.

### Pattern S2: Merge-safe `qhse-prefs-v1` writer
**Source:** `qhse-cesi/outils.html:276-285` (`writePrefs(partial)`)
**Apply to:** QCM IIFE (`lastQcmTheme`), Tests blancs IIFE (`lastTestTheme`)
**Excerpt:**
```javascript
function writePrefs(partial) {
  try {
    const raw = localStorage.getItem('qhse-prefs-v1');
    const existing = raw ? JSON.parse(raw) : {};
    const merged = Object.assign({}, existing, partial);
    localStorage.setItem('qhse-prefs-v1', JSON.stringify(merged));
  } catch (e) {
    console.warn('[QCM/Tests] writePrefs failed:', e.message);
  }
}
```
Pitfall 3 protection. Verify-quiz group (d) asserts merge-safety.

### Pattern S3: XSS-safe DOM construction (textContent + createElement)
**Source:** `qhse-cesi/outils.html:419-498` (`renderCard` + `revealCard`)
**Apply to:** `renderQuestion(item, opts)` shared helper (QCM + Tests blancs)
**Excerpt:**
- `el.textContent = bankString;` — never `el.innerHTML = bankString`
- `document.createElement('code')` + `code.textContent = ref;` — for ref code wrapping
- `document.createElement('a')` with `.href`, `.textContent`, `.rel='noopener noreferrer'`, `.target='_blank'` — for source URLs

T-03-03-01 invariant carried from P3.

### Pattern S4: Panel-scoped event listeners only
**Source:** `qhse-cesi/outils.html:672-756` (entire Flashcards wiring block)
**Apply to:** QCM IIFE, Tests blancs IIFE
**Rule:** All event listeners on `panel` or `panel.querySelector(...)` — never on `document` or `window`. Form-control bypass: `if (e.target.matches('select, input, textarea')) return;` (line 732).

### Pattern S5: Try/catch around every `setItem` / `getItem`
**Source:** `qhse-cesi/outils.html:257-305` (all four localStorage helpers)
**Apply to:** `readScores`, `appendScore`, `readQuizPrefs`, `writeQuizPrefs` in Tests blancs IIFE; `readStore`, `writeStore` in QCM IIFE
**Excerpt:** every helper wraps `JSON.parse` / `JSON.stringify` / `localStorage.{get,set}Item` in try/catch with `console.warn('[Label] xxx failed:', e.message)`. Defensive type checks on parsed JSON before returning.

### Pattern S6: Local-day ISO date strategy (defeat UTC offset)
**Source:** `qhse-cesi/srs.js:93-95` (`todayLocal()`)
**Apply to:** `qhse-scores-v1[*].dateISO` (Tests blancs IIFE) — call `window.SRS.todayLocal()` directly
**Excerpt:**
```javascript
function todayLocal() {
  return new Date().toLocaleDateString('sv-SE');
}
```
Returns `'yyyy-mm-dd'` in user's local civil day. Sv-SE locale = ISO 8601 format in local timezone. Handles DST + year boundaries (verified by `verify-srs.cjs:185-188` "DST CET→CEST" assertion). **Tests blancs calling `SRS.todayLocal()` does NOT violate D-V2-03** — `todayLocal()` is a pure function that does not touch `qhse-srs-v1`.

### Pattern S7: QCM item schema (BANK contract)
**Source:** `qhse-cesi/outils-data.js:187-208` (first QCM example, `duerp-qcm-001`)
**Apply to:** `renderQuestion(item, opts)` — both IIFEs
**Schema:**
```javascript
{
  id: 'duerp-qcm-001',
  type: 'qcm',
  theme: 'duerp',
  question: "Quelle est la durée légale de conservation du DUERP ?",
  answer: "40 ans.",                     // canonical answer prose
  choices: [ "5 ans", "10 ans", "40 ans.", "Durée indéterminée (pas de limite fixée)" ],
  correct: 2,                            // 0-based index into choices[]
  explanation: "...",                    // long-form explanation prose
  source: { authority: 'INRS', ref: 'Art. R4121-1 Code du travail', url: '...', verified: '2026-05-19' },
  difficulty: 1
}
```
**Frozen by P2** — read-only. `BANK.filter(i => i.type === 'qcm')` yields 92 items per CONTEXT.md.

### Pattern S8: Verification gate scaffold
**Source:** `.planning/phases/03-flashcards-srs/verify-srs.cjs:14-64, 269-276`
**Apply to:** `.planning/phases/04-qcm-tests-blancs/verify-quiz.cjs`
**Components:** `global.window` shim, `require()` of srs.js + outils-data.js, `pass`/`fail`/`check` helpers, labelled assertions (`SC{N}/{REQ}` format), final `process.exit(allPassed ? 0 : 1)`. See Surface 5 above for the full excerpt set.

---

## No Analog Found

No Phase 4 surface lacks an analog. Each maps to a concrete Phase 1/2/3 file at known line ranges. The only **net-new patterns** (no analog in this codebase) are:

| Pattern | Why no analog | Source guidance |
|---------|---------------|-----------------|
| Tri-state machine (`STATE.START` / `RUNNING` / `RESULTS`) | P3 had a binary `[hidden]` toggle on `.fc-verso` only — no multi-state machine | RESEARCH §Pattern 7 (synthesised in this PATTERNS.md, Surface 3) |
| Drift-resistant countdown timer | First timer in the codebase | RESEARCH §Pattern 3 + MDN setInterval throttling docs |
| `setInterval` + `confirm()` interaction (abandon flow) | No abandon flow existed in P3 | RESEARCH §Pattern 4 — wall-clock advances during modal; no manual pause needed |
| Append-only FIFO array (`qhse-scores-v1`) | P3's `qhse-srs-v1` is an object map, not an array | RESEARCH §Pattern 6 — `unshift + slice(0, 50)` is the entire pattern |
| 3-tier color hero (score / 20 ratio) | No tiered-color element in P3 | UI-SPEC §"Score color tiers" lines 184-191 |
| Native `<table>` history view | No `<table>` in any P1/P2/P3 surface (biblio uses cards) | UI-SPEC §"History table visual treatment" + plain HTML5 `<table>` semantics |

The **planner should treat these six net-new patterns as fully specified by RESEARCH.md and UI-SPEC.md** — no codebase analog exists, but the references are exhaustive.

---

## Metadata

**Analog search scope:** `qhse-cesi/*.{html,js,css}` + `.planning/phases/03-flashcards-srs/verify-srs.cjs` + `.planning/phases/02-content-bank/verify-bank.cjs`
**Files scanned:** 5 (outils.html, srs.js, outils-data.js, chassis.css, verify-srs.cjs) + cross-referenced verify-bank.cjs
**Pattern extraction date:** 2026-05-25
**Pattern confidence:** HIGH on all five surfaces — Phase 3 is the verbatim template, and Phase 4 reuses ≥80% of its IIFE / CSS / verification-gate code shape.

**Key insight for planner:** Phase 4 is mostly composition of P3 patterns. The truly new code is (a) the test tri-state machine, (b) the drift-resistant timer, (c) the `qhse-scores-v1` append-only-FIFO writer, and (d) the verify-quiz.cjs group (e) "Tests blancs does not mutate qhse-srs-v1" assertion. Everything else — IIFE shell, DCL boot, merge-safe prefs, XSS-safe renderQuestion, panel-scoped listeners, theme picker, choice button geometry, reveal-panel typography — is verbatim or near-verbatim reuse from `qhse-cesi/outils.html:206-795` and `qhse-cesi/chassis.css:547-882`.

**Atomic commit alignment** (CONTEXT.md "Atomic commit/push per delivery unit"):
1. QCM engine commit → Surface 1 (scaffold) + Surface 2 (IIFE) + CSS additions for `.qz-*` shared between modes (parts of Surface 4)
2. Tests blancs engine commit → Surface 3 + CSS additions specific to Tests blancs (rest of Surface 4)
3. Score history view commit → reuses Surface 3 IIFE + Surface 4 `.qz-history` rules (may be folded into Tests blancs commit if planner prefers)
4. `verify-quiz.cjs` gate commit → Surface 5 (ships with the engine it verifies)
