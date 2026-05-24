# Phase 3: Flashcards + SRS — Pattern Map

**Mapped:** 2026-05-23
**Files analyzed:** 4 (2 new + 2 modify)
**Analogs found:** 4 / 4 (all exact-match in role + data-flow within this single-page-app codebase)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `qhse-cesi/srs.js` (NEW) | utility / pure-function module | transform (pure in → pure out) | `qhse-cesi/outils-data.js` | exact (defer-loaded vanilla JS attached to `window`, no DOM, dual-runtime: browser + Node `require`) |
| `qhse-cesi/outils.html` (MODIFY) | view / component mount + controller (inline IIFE) | event-driven request-response (click/keydown → state mutation → re-render) | `outils.html:88–139` ARIA tablist IIFE | exact (same `'use strict'` IIFE shape, panel-scoped listeners, `[hidden]` toggle, `history.replaceState`-style discipline) |
| `qhse-cesi/chassis.css` (MODIFY — additive) | config / design-token consumer (component layer) | static / style cascade | `chassis.css:361–488` `.biblio-*` block inside `@layer components` | exact (panel-scoped flat-class namespace, OKLCH token reuse, no new `:root` properties) |
| `.planning/phases/03-flashcards-srs/verify-srs.cjs` (NEW) | test / verification gate (CLI) | batch (load module → assert → exit 0/1) | `.planning/phases/02-content-bank/verify-bank.cjs` | exact (Node script, plain `require`, `global.window={}` shim, ROADMAP SCs as named `check()` calls) |

---

## Pattern Assignments

### `qhse-cesi/srs.js` (NEW — pure-function scheduler module)

**Analog:** `qhse-cesi/outils-data.js` (the only other file that attaches a vanilla global to `window` and is `defer`-loaded by `outils.html`)

**Header / loadability contract pattern** (mirror of `outils-data.js:1–18`):
```js
/* qhse-cesi/srs.js
 * SM-2 spaced-repetition scheduler — Phase 3.
 * window.SRS: { schedule, isDue, addDays, todayLocal, filterDue, countNew,
 *               DEFAULTS, GRADE }
 * Pure functions only — no DOM, no localStorage, no Date.now() inside math
 * (today is injected). Verifiable from Node via `global.window = {};
 * require('./srs.js')` — same dual-runtime contract as outils-data.js.
 *
 * Consumed by: outils.html Flashcards view IIFE (P3),
 *              QCM view IIFE (P4 SRS-03 write-half).
 * DO NOT import, require from a bundler, or wrap in ESM — loaded via
 * <script src="srs.js" defer> in outils.html.
 *
 * Idempotent double-load guard (mirrors outils-data.js WR-04):
 * if window.SRS already exists, keep the first version.
 */
if (window.SRS && window.SRS.schedule) {
  if (typeof console !== 'undefined' && console.warn) {
    console.warn('srs.js loaded twice — keeping the first SRS');
  }
} else {
  window.SRS = (function () {
    'use strict';
    // ...pure functions, constants...
    return {
      schedule: schedule,
      isDue: isDue,
      addDays: addDays,
      todayLocal: todayLocal,
      filterDue: filterDue,
      countNew: countNew,
      DEFAULTS: Object.freeze({ /* EASE_INIT, EASE_FLOOR, ... */ }),
      GRADE: Object.freeze({ RATE: 'rate', DUR: 'dur', BIEN: 'bien', FACILE: 'facile' })
    };
  })();
}
```

**Script-tag wiring pattern** (mirror of `outils.html:16`):
```html
<script src="outils-data.js" defer></script>
<script src="srs.js" defer></script>   <!-- add immediately after — same line, same attribute -->
```
Both scripts use `defer` so they execute in document order before `DOMContentLoaded`. `window.BANK` and `window.SRS` are both guaranteed ready when the inline view IIFE runs at end-of-body.

**Anti-patterns to avoid:**
- NO `import` / `export` / `<script type="module">` (PERSIST-02 invariant — see RESEARCH §Standard Stack).
- NO `require('...')` or CommonJS calls inside `srs.js` itself; the file is loaded by `<script src>` in the browser. `verify-srs.cjs` is the *only* `require` consumer.
- NO `localStorage`, no `Date.now()`, no `new Date()` inside the math functions — `today` MUST be a parameter so the verify-srs assertions are deterministic (RESEARCH §2.6).
- NO IIFE without the double-load guard wrapper — `outils-data.js:14–18` sets the precedent (WR-04). Two loads must not overwrite an in-flight `window.SRS`.
- NO side-effecting key on the exported `window.SRS` object — RESEARCH §5.3 explicitly assertions `forbidden = allKeys.filter(k => /persist|save|write|store|set/i.test(k))` must be empty. Persistence lives in the view IIFE, not the module.

---

### `qhse-cesi/outils.html` (MODIFY — inject Flashcards view IIFE + DOM)

**Analog:** the existing ARIA tablist IIFE at `outils.html:88–139` (`'use strict'`, no globals, panel-scoped listeners, `[hidden]` toggle, `history.replaceState` for hash sync, no inline `on*` handlers).

**IIFE shell pattern** (mirror of `outils.html:88–139`):
```html
<script>
  /* ============ IIFE: ARIA tablist — arrow-key nav, aria-selected, [hidden] toggle, hash sync ============ */
  /* No globals, no inline on* handlers. D-05 / project convention. */
  (() => {
    'use strict';
    const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
    const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
    function activate(tab, opts) {
      const setFocus = !!(opts && opts.setFocus);
      const syncHash = !!(opts && opts.syncHash);
      tabs.forEach(t => {
        const active = t === tab;
        t.setAttribute('aria-selected', String(active));
        t.tabIndex = active ? 0 : -1;
      });
      panels.forEach(p => {
        p.hidden = p.id !== tab.getAttribute('aria-controls');
      });
      if (syncHash) {
        history.replaceState(null, '', '#' + tab.id);
      }
      if (setFocus) {
        tab.focus();
      }
    }
    // ...event wiring...
  })();
</script>
```
The Flashcards view IIFE must adopt this exact shell: `(() => { 'use strict'; ... })()`, all locals via `const`/`let`, no globals leaked, no inline `on*=` attributes in the markup it injects.

**Panel-scoped listener pattern** (mirror of `outils.html:123–131` — tab-button-scoped keydown, NOT `document`):
```js
tabs.forEach(tab => {
  tab.addEventListener('click', () => activate(tab, userOpts));
  tab.addEventListener('keydown', e => {
    const idx = tabs.indexOf(e.currentTarget);
    if (e.key === 'ArrowRight') { e.preventDefault(); activate(tabs[(idx + 1) % tabs.length], userOpts); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); activate(tabs[(idx - 1 + tabs.length) % tabs.length], userOpts); }
    // ...
  });
});
```
Flashcards keydown listeners must bind to `#panel-flashcards` (or the reveal button / grade-button container inside it) — NEVER `document.addEventListener('keydown', ...)`. This prevents Phase 4 QCM and Phase 5 fiches from competing for the same digit keys. The gate pattern (`if (verso.hidden) return`) and the form-control bypass (`if (e.target.matches('select, input, textarea')) return`) come from RESEARCH §3.3.

**Hash / history hygiene pattern** (mirror of `outils.html:111–115` `history.replaceState` over `location.hash=`):
- Mode-change inside the Flashcards view (e.g. entering / leaving free-revision) MUST NOT call `location.hash = …`. It must use `history.replaceState(null, '', '#…')` if URL state is needed at all (default: no URL state for sub-modes — free-revision is a transient session flag).
- Initial load MUST be side-effect-free (no scroll-jump, no focus steal). The existing tablist IIFE notes this explicitly with `userOpts = { setFocus: true, syncHash: true }` only for user-initiated events, and the initial `activate(initial)` call passes no opts.

**Mount-point preservation pattern** (RESEARCH §8.2):
- The `<div role="tabpanel" id="panel-flashcards" aria-labelledby="tab-flashcards" tabindex="0">` wrapper at `outils.html:59` MUST stay intact. The existing tablist IIFE finds it by id (line 95). The Flashcards view replaces the inner `<p class="placeholder">` only.
- Suggested DOM tree to inject — see RESEARCH §8.3. Use `data-fc-*` attributes (e.g. `data-fc-reveal`, `data-fc-grade="rate"`) as JS hooks; reserve `.fc-*` classes for CSS styling (matches the existing `aria-controls` vs class-name separation in the tablist IIFE).

**Anti-patterns to avoid:**
- NO `import` / `<script type="module">`.
- NO inline `onclick="..."` / `onkeydown="..."` attributes in the injected markup — the tablist IIFE establishes the "all listeners via `addEventListener`" convention.
- NO `document.addEventListener('keydown', ...)` — must be scoped to `#panel-flashcards` or descendants (RESEARCH §3.1, §3.3).
- NO direct `localStorage.getItem('qhse-prefs-v1')` scattered across the IIFE. CONTEXT.md §code_context "Established Patterns" says "thin getter/setter pair; no direct `localStorage.getItem` scattered". Pair functions `readPrefs()` / `writePrefs(partial)` and `readStore()` / `writeStore(store)` live at the top of the view IIFE — every read/write goes through them. (Concrete shape: RESEARCH §4.1 + §4.2.)
- NO `localStorage.setItem('qhse-prefs-v1', JSON.stringify({lastTheme: 'duerp'}))` without merge — that wipes out `lastMode` and `newCardsPerDay` written by other phases. Always `Object.assign({}, existing, partial)` first (RESEARCH §4.1).
- NO mutation of `window.BANK` — Phase 2 froze the array (`Object.freeze`). Work on a filtered/mapped copy.
- NO `new Date(yyyymmdd)` parse of the `due` string — that parses as UTC midnight and gives the wrong civil day in France (RESEARCH §2.3). Use the `(year, monthIndex, day)` constructor form.
- NO `flip` / `card-stack` / `progress-bar` animations — UI-SPEC §Motion contract: "Zero declared transitions in Phase 3."
- NO removal or edit of the existing tablist IIFE (`outils.html:88–139`) — append a new `<script>` block AFTER it. CONTEXT.md: "existing ARIA tablist IIFE untouched".

---

### `qhse-cesi/chassis.css` (MODIFY — additive `.fc-*` block inside `@layer components`)

**Analog:** the `.biblio-*` namespace block at `chassis.css:361–488`. It is the only existing per-component prefixed namespace in the chassis and was added in Phase 1 as a "Phase 3 component slot — full-width editorial list" comment — i.e. it pre-establishes the exact pattern Phase 3 must follow for `.fc-*`.

**Append location** (the closing brace of `@layer components` is line 546). Insert the `.fc-*` block immediately BEFORE the `.toc` rules at line 519, or AFTER them but still inside the layer. Either ordering is correct because the chassis already relies on `@layer` for specificity discipline, not source order.

**Token reuse + flat-class namespace pattern** (mirror of `chassis.css:421–434` `.biblio-card__badge`):
```css
/* -- Biblio cards (Phase 3 component slot — full-width editorial list, D-03) -- */
.biblio-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
.biblio-card__badge {
  display: inline-block;
  background: var(--accent-soft);
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 0.1em 0.55em;
  border-radius: var(--radius-sm);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: var(--step--1);
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}
.biblio-card__title {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: var(--step-2);
  color: var(--ink-1);
  text-wrap: balance;
  margin: 0;
}
```
Adopt:
- Flat class names with `__` modifier convention (`.fc-card`, `.fc-card__recto`, `.fc-bandeau__dues`).
- 100% custom-property values — every color, every spacing, every radius, every font-size is `var(--…)`. The biblio block introduces zero new tokens.
- Direct family literals (`'Fraunces', Georgia, serif`) where chassis declares no `--font-*` token for that exact role; otherwise the chassis `--font-sans/serif/mono` aliases (referenced in the print block at `chassis.css:604–607` and the body rule at `chassis.css:97`).

**Focus-ring + hover pattern** (mirror of `chassis.css:404–412` `.biblio-card__link`):
```css
.biblio-card__link:hover,
.biblio-card__link:focus-visible {
  background-color: var(--bg-2);
  outline: none;
}
.biblio-card__link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```
Reuse this exact `:focus-visible` ring formula on every Flashcards focusable (reveal button, grade buttons, theme select, réglages input, free-revision CTA). Do NOT redefine focus styling — chassis-base `:focus-visible` rule at line 143 (`outline: 3px solid var(--focus-ring)`) covers the global case; only override locally when the accent color reads better against the component background.

**Optional `@scope` alternative** (UI-SPEC §Scoping rule):
```css
@scope (#panel-flashcards) {
  .fc-card { ... }   /* implicit parent #panel-flashcards */
}
```
RESEARCH §8.4 recommends prefixed-selector style for chassis consistency. Use `@scope` only if a name collision with biblio classes ever arises (none anticipated since prefix is distinct).

**Anti-patterns to avoid:**
- NO new `:root` custom properties. UI-SPEC §Scoping rule binding: "DO NOT add new `:root` custom properties. Reuse existing tokens." (Available tokens enumerated at `chassis.css:43–86`: `--bg-1/2`, `--ink-1/2/3`, `--accent`, `--accent-soft`, `--success`, `--warning`, `--alert`, `--border-subtle`, `--focus-ring`, `--space-xs/sm/md/lg/xl/2xl/3xl`, `--radius-sm/md/lg`, `--step--1/0/1/2/3/4/5`.)
- NO modification of existing rules. CONTEXT.md §decisions: "chassis.css untouched (any new components added inline-scoped to `panel-flashcards`)". Phase 3 is *additive only* — every Phase-3 rule is a brand-new selector inside `@layer components`. Touching any existing `.biblio-*`, `.tab-*`, `header`, `footer`, `.toc`, `:root`, or `@layer tokens` rule is a regression on Phase 1/2.
- NO new media queries beyond reusing the existing `48rem` breakpoint (UI-SPEC §Responsive layout). Mobile-first selectors followed by one `@media (min-width: 48rem)` block — same shape as `chassis.css:563–568`.
- NO new font-family declarations and NO new Google-Fonts request. The CSS2 link at `outils.html:13` already loads Fraunces 400/600/700, Inter 400/500/600/700, JetBrains Mono 400/500. UI-SPEC §Design System binding: "No new fonts, no font weights beyond 400/500/600/700 already declared."
- NO `transition`, no `@keyframes`, no `animation`. UI-SPEC §Motion contract: "Zero declared transitions in Phase 3." Chassis already has `prefers-reduced-motion` belt-and-suspenders at `chassis.css:22–29` — adding animations would create work the chassis must guard against.
- NO selectors outside `#panel-flashcards` scope (no global `body { ... }`, no `* { ... }` resets, no `button { ... }` overrides). Every Phase-3 selector starts with `#panel-flashcards` or `.fc-`.

---

### `.planning/phases/03-flashcards-srs/verify-srs.cjs` (NEW — Node gate)

**Analog:** `.planning/phases/02-content-bank/verify-bank.cjs` (Node script, plain `require`, `global.window={}` shim, named PASS/FAIL output, `--final` mode, exit 0/1).

**Module-load shim pattern** (mirror of `verify-bank.cjs:14–34`):
```js
'use strict';
const path   = require('path');
const fs     = require('fs');

// Load the bank from the repo root (3 levels up from .planning/phases/02-content-bank/)
const bankPath = path.resolve(__dirname, '../../../qhse-cesi/outils-data.js');
global.window = {};

try {
  require(bankPath);
} catch (e) {
  console.error('FAIL: could not load outils-data.js from', bankPath);
  console.error(e.message);
  process.exit(1);
}

if (!Array.isArray(window.BANK)) {
  console.error('FAIL: window.BANK is not an array after loading', bankPath);
  process.exit(1);
}
```
Adopt verbatim. Phase-3 substitutions:
- `bankPath` → `srsPath` = `path.resolve(__dirname, '../../../qhse-cesi/srs.js')`.
- `Array.isArray(window.BANK)` → `typeof window.SRS === 'object' && typeof window.SRS.schedule === 'function'`.
- Fail message: `'FAIL: window.SRS not exported (or schedule function missing) after loading'`.

**Named-check pattern** (mirror of `verify-bank.cjs:148–157` `pass()/fail()`, also RESEARCH §6.2 shape):
```js
function pass(label) {
  console.log('PASS [' + label + ']');
}
function fail(label, reason) {
  console.error('FAIL [' + label + '] ' + reason);
  allPassed = false;
}
```
Use as the wrapper around every assertion. Naming convention `SC{n}/{REQ-ID}` (e.g. `SC2/SRS-01`) so each PASS line traceably maps back to ROADMAP success criteria.

**Per-criterion assertion block pattern** (mirror of `verify-bank.cjs:160–171` SC1):
```js
// ------------------------------------------------------------------
// SC1 / BANK-01: BANK.length >= 200 (warn if < 210, hard-FAIL if < 200)
// ------------------------------------------------------------------
if (!Array.isArray(BANK)) {
  fail('SC1/BANK-01', 'window.BANK is not an array');
} else if (BANK.length < 200) {
  fail('SC1/BANK-01', 'BANK.length=' + BANK.length + ' is below minimum 200');
} else {
  if (BANK.length < 210) {
    console.log('WARN [SC1/BANK-01] BANK.length=' + BANK.length + ' passes hard minimum (>=200) but is below research target (>=210)');
  }
  pass('SC1/BANK-01 BANK.length=' + BANK.length + ' >= 200');
}
```
Each Phase-3 success criterion gets its own commented banner + assertion block. The five required gate sections (CONTEXT.md "Verification gate" Claude's-discretion item + RESEARCH §6.2) are:
- **(a)** SM-2 math — 8 edge cases E1–E8 from RESEARCH §1.3 (use the executable check() examples in RESEARCH §6.2 lines 563–608 verbatim).
- **(b)** Schema round-trip — `JSON.stringify` / `JSON.parse` of a `qhse-srs-v1` store + `assert.deepStrictEqual`. RESEARCH §6.2 lines 612–618.
- **(c)** Due-date filtering — `isDue()` on past/today/future + `addDays()` across leap-year and CET/CEST DST boundary. RESEARCH §6.2 lines 624–634.
- **(d)** `newCardsPerDay` cap — simulate the view's intro loop with `cap=10` against 15 candidate cards; assert `introducedCount === 10`. RESEARCH §6.2 lines 639–655.
- **(e)** Free-revision purity — `Object.keys(SRS).filter(k => /persist|save|write|store|set/i.test(k))` must be empty. RESEARCH §6.2 lines 658–663.

**Final exit pattern** (mirror of `verify-bank.cjs:443–450`):
```js
console.log('\n' + '='.repeat(70));
if (allPassed) {
  console.log('--final: ALL ROADMAP SC1-5 PASS — window.SRS verified');
  process.exit(0);
} else {
  console.error('--final: ONE OR MORE ASSERTIONS FAILED — see FAIL lines above');
  process.exit(1);
}
```

**Anti-patterns to avoid:**
- NO `npm install`, no test-runner dependency (Jest, Vitest, Mocha) — `verify-bank.cjs` uses only Node built-ins (`assert`, `path`, `fs`). `verify-srs.cjs` must follow.
- NO `import` — file extension is `.cjs` for a reason; CommonJS is the contract that matches the `.cjs` Phase-2 precedent.
- NO browser-only APIs assumed. `localStorage` does NOT exist in Node — when asserting "schema round-trip" (gate b), simulate persistence with `JSON.stringify` / `JSON.parse`, never `global.localStorage`.
- NO `new Date()` inside assertions — pass `today` as a literal string (`'2026-05-23'`) so DST / wall-clock changes never flake the gate.
- NO calls to `SRS` functions that pass `undefined` for `today` — the scheduler signature is `schedule(row, grade, today)`; the verify script is the canonical injection point for date.
- NO `process.exit(0)` reached if any `fail()` was recorded — must check `allPassed` (the mutable flag) before final exit, exactly as `verify-bank.cjs:444`.
- NO modification to `verify-bank.cjs` itself (still ships Phase 2's gate untouched; Phase 3 adds a sibling script).

---

## Shared Patterns

These cross-cutting patterns apply to MULTIPLE Phase-3 files and must be applied consistently.

### Idempotent double-load guard (cross-file: `srs.js` + repeat-safe view)
**Source:** `qhse-cesi/outils-data.js:14–18`
**Apply to:** `srs.js` (top of file), the Flashcards view IIFE (boot guard if it ever re-runs)
```js
if (window.BANK && window.BANK.length) {
  if (typeof console !== 'undefined' && console.warn) {
    console.warn('outils-data.js loaded twice — keeping the first BANK');
  }
} else {
  window.BANK = [ /* ... */ ];
}
```
Originated from WR-04 (see CONTEXT.md observation 479 4:26p). Two `<script>` tags pointing at the same file (browser cache anomaly, manual reload during dev) must not silently overwrite an in-flight global.

### `'use strict'` IIFE + no globals (cross-file: every JS surface)
**Source:** `qhse-cesi/outils.html:91–92` tablist IIFE
**Apply to:** `srs.js` interior, the Flashcards view IIFE, the (future P4) QCM IIFE
```js
(() => {
  'use strict';
  // all locals via const/let; nothing leaks to window unless via explicit window.SRS assignment
})();
```

### Defer-loaded global module + Node `require` shim (cross-file: `srs.js` + `verify-srs.cjs`)
**Source:** `outils-data.js` (defer-loaded) + `verify-bank.cjs:21` (`global.window = {};`)
**Apply to:** the symmetric pair `srs.js` + `verify-srs.cjs`. The browser sees `<script src="srs.js" defer>`; Node sees `global.window = {}; require('./srs.js'); const SRS = global.window.SRS;`. The module file is identical in both runtimes — its purity is what makes this work.

### Merge-safe localStorage writes (single-source-of-truth pair)
**Source:** RESEARCH §4.1 (newly authored from project invariants — no existing analog because Phase 1/2 never wrote to localStorage)
**Apply to:** the Flashcards view IIFE — `readPrefs()` / `writePrefs(partial)` / `readStore()` / `writeStore(store)` must be the ONLY four functions that touch `localStorage` in the entire codebase.
```js
function writePrefs(partial) {
  try {
    var raw = localStorage.getItem('qhse-prefs-v1');
    var existing = raw ? JSON.parse(raw) : {};
    var merged = Object.assign({}, existing, partial);   // shallow merge — sufficient
    localStorage.setItem('qhse-prefs-v1', JSON.stringify(merged));
  } catch (e) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('qhse-prefs-v1 write failed:', e.message);
    }
  }
}
```
Forward-compatible with P4 (`lastQuizTheme`, `qcmShowExplanation`) and P5 (`lastFiche`): unknown keys in `existing` survive the `Object.assign` shallow merge untouched.

### Panel-scoped event listeners (never `document`)
**Source:** `outils.html:123–131` (tablist `keydown` is on each tab button, NOT `document`)
**Apply to:** every Flashcards listener — reveal click, grade click, keyboard digits, tap-to-reveal. Bind to `#panel-flashcards` or one of its descendants. Phase 4 and Phase 5 will rely on this isolation to bind THEIR digit / space keys without collision.

### Atomic commit per delivery unit (cross-cutting discipline)
**Source:** `feedback_token_conscious_work.md` (user memory) + CONTEXT.md §code_context "Established Patterns" + verify-bank.cjs commit history (Wave 1 → Wave 4)
**Apply to:** all four Phase-3 files. Recommended commit slicing (per CONTEXT.md §decisions, also RESEARCH §Project Constraints):
1. `srs.js` (pure scheduler) — 1 commit.
2. Flashcards view inline IIFE in `outils.html` + DOM scaffold + `.fc-*` CSS — 1 commit.
3. `verify-srs.cjs` — 1 commit (in the same delivery unit as srs.js if convenient).
4. Integration polish / accessibility pass — 1 commit.

Never one giant uncommitted patch — owner hits weekly token cap mid-task; commit/push aggressively so the next session can resume from the last green state.

---

## No Analog Found

None. All four target files have direct analogs in the codebase. Phase 1 (shell) supplied the IIFE pattern; Phase 2 (content bank) supplied the defer-loaded-global pattern and the Node-verify pattern; the `.biblio-*` block in chassis.css was added in Phase 1 explicitly as "Phase 3 component slot" — i.e. the patternsetters anticipated this phase.

---

## Metadata

**Analog search scope:** `qhse-cesi/` (4 source files) + `.planning/phases/02-content-bank/` (verifier sibling). Searched for: IIFE patterns, `window.*` global attach patterns, localStorage usage (none pre-Phase-3 — confirming the four `readPrefs/writePrefs/readStore/writeStore` functions Phase 3 introduces will be the codebase's first localStorage callsites), Node `require` shim patterns, OKLCH token consumers, `@layer components` namespace patterns.

**Files scanned:** 5 (outils-data.js, outils.html, chassis.css, verify-bank.cjs, plus index.html spot-check confirmed no relevant analogs at repo root).

**Pattern extraction date:** 2026-05-23

## PATTERN MAPPING COMPLETE
