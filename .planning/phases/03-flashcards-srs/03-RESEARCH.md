# Phase 3: Flashcards + SRS — Research

**Researched:** 2026-05-23
**Domain:** Spaced-repetition scheduler (SM-2), localStorage persistence, ARIA tabpanel keyboard interaction, pure-functional verification in Node
**Confidence:** HIGH (canonical SM-2 paper consulted; existing project patterns audited)

## Summary

Phase 3 mounts a flashcards study mode inside the existing `#panel-flashcards` ARIA tabpanel of `outils.html`, backed by a standard SM-2 scheduler persisted in `localStorage` under `qhse-srs-v1` and `qhse-prefs-v1`. CONTEXT.md locks the design (stock Anki SM-2 defaults, 4 grades, due-date filtering, `newCardsPerDay = 10` cap, read-only free-revision mode). This research surfaces the **implementation knowledge** the planner needs to slice that design into tasks: exact SM-2 formulas with edge cases, the local-day date strategy, ARIA-tabpanel keyboard layering, merge-safe localStorage writes, the structurally-enforced free-revision pattern, the pure-functional scheduler module that `verify-srs.cjs` can exercise without a DOM, the bandeau counter math, and the DOM mount lifecycle.

**Primary recommendation:** Build the SRS as **two cleanly separated IIFEs** sharing only a global `window.SRS` namespace — a pure-functional scheduler (no DOM, no `localStorage`, no `Date.now()` reads inside the math) and a Flashcards view (DOM + state). The scheduler is `require()`-able by `verify-srs.cjs` because it never touches the DOM or globals beyond reading inputs and returning outputs. Persistence and date-of-today are injected by the view IIFE — this single architectural choice gives every other concern (verifiability, free-revision read-only, schema-version safety) a natural home.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FLASH-01 | Study flashcards (recto → reveal verso = answer + explanation + source) per theme or all themes | §1 SM-2 algorithm (grade-driven advance), §3 keyboard interaction (Space/Enter reveals), §8 DOM mount pattern (theme picker in `#panel-flashcards`) |
| FLASH-02 | After revealing, self-grade on 4 levels (raté/dur/bien/facile) | §1 grade button → grade-int mapping, §3 1/2/3/4 keyboard binding, §7 bandeau decrement on grade |
| SRS-01 | SM-2 scheduler persists per-card `{ ease, interval, due, lapses, reps }` in `qhse-srs-v1` | §1 SM-2 formulas, §4 localStorage round-trip pattern, §6 schema round-trip assertion |
| SRS-02 | "À réviser aujourd'hui" surfaces all cards currently due | §2 local-day date arithmetic (`toLocaleDateString('sv-SE')` strategy), §6 due-filter assertion, §7 dues counter math |
| SRS-03 | Schema half — Phase 3 ships the per-card row shape that Phase 4 wrong-QCM writes into | §1 schema, §4 `introduced` field cross-phase contract, §6 forward-compat assertion |
| SRS-04 | SRS progress survives reload | §4 localStorage round-trip, §6 reload assertion, §5 free-revision must not mutate the round-trip data |
| PERSIST-01 | Three documented localStorage keys; last theme/mode restored on return | §4 merge-safe writes for `qhse-prefs-v1`, §4 schema-version forward tolerance, §6 prefs round-trip |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Single-file HTML, zero build, no npm deps** — Phase 3 ships inline `<script>` in `outils.html`. No `<script type="module">`, no `import`, no bundler.
- **ES5-safe vanilla JS** — IE11 not a target, but no ES2020+ chained optional (`?.`) or `??` if it can be avoided cheaply; the existing IIFE uses arrow functions and `Array.from`, so ES2015+ is fine. No `async/await` needed.
- **Atomic commits per delivery unit** — scheduler / view / verify-srs / polish each get their own commit + push.
- **Link discipline** — Phase 3 introduces no new external content (sources come from the frozen bank), so no new URL audits needed.
- **No backend, no accounts, no runtime AI** — localStorage only.
- **Dark mode default, mobile + desktop** — Flashcards UI must respect chassis tokens and `prefers-reduced-motion`.
- **Deploy via push to main → Vercel** — no CI changes; `verify-srs.cjs` runs locally before push (mirrors `verify-bank.cjs`).

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Flashcards reads the entire 226-item bank (not only `type==='flashcard'`); QCM items repackage as `question → recto`, `answer → verso`, `choices`/`correct` ignored. Per-card SRS state is keyed on `item.id`.
- **D-02:** Verso uniforme = `answer` + `explanation` + `source`, no type badge.
- **D-03:** `newCardsPerDay = 10` default (toutes thèmes confondues).
- **D-04:** Cap is owner-adjustable (range 1–50) via a number input in the Flashcards panel; persisted in `qhse-prefs-v1.newCardsPerDay`.
- **D-05:** Bandeau permanent en haut du panneau : `dues/total · new/cap` (decrements per grade). No separate entry screen.
- **D-06:** Empty queue → "Bravo — file vide… Continuer en révision libre" button. Free-revision is **read-only**, must NOT mutate SM-2 state.
- **D-07:** Stock Anki defaults — ease init 2.5, ease floor 1.3, I(1)=1, I(2)=6, I(n)=I(n-1)×ease; raté = interval reset to 1d and ease -0.20; dur = interval×1.2 ease -0.15; bien = standard advance (ease unchanged); facile = interval×ease×1.3 ease +0.15. SM-2 constants live in the scheduler module, not exposed in UI.
- **Schema `qhse-srs-v1`:** `{ [itemId]: { ease, interval, due (ISO yyyy-mm-dd), lapses, reps, introduced } }`.
- **Schema `qhse-prefs-v1`:** `{ lastTheme, lastMode, newCardsPerDay }` — merge-safe writes (read → mutate → write).
- **Verify gate `verify-srs.cjs`:** (a) SM-2 math, (b) localStorage round-trip, (c) due-date filtering, (d) `newCardsPerDay` cap, (e) free-revision no-mutation.

### Claude's Discretion
- Reveal + grade interaction details (Space/Enter to reveal; 1/2/3/4 to grade); tap-the-card on touch; no flip animation in P3; left-to-right button order matches digit order.
- Theme picker UI: compact `<select>` with "Tous les thèmes" + 15 themes; persisted to `qhse-prefs-v1.lastTheme`.
- Module layout: two inline IIFEs (scheduler pure-functional, view DOM-bound).
- Cross-theme weighting / interleaving within "Tous": random shuffle of due cards (no clustering, no rotation algorithm).

### Deferred Ideas (OUT OF SCOPE)
- SM-2 calibration override UI (`window.SRS_CONFIG` console hook etc.)
- Per-card grade-history log
- PWA / offline / install prompt
- Wrong QCM answers feeding SRS — **Phase 4 by design**; P3 ships only the **schema** (`introduced`-field contract).
- Tests blancs not feeding SRS — Phase 4 enforces.
- Fiches de révision — Phase 5.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| SM-2 math (next interval/ease from grade) | Pure JS module (`window.SRS`) | — | No DOM, no I/O — must be `require()`-able by Node for verify-srs.cjs |
| Per-card state read/write | Browser localStorage (`qhse-srs-v1`) | — | Single-user, no backend; the project invariant (PERSIST-02) |
| Today-of-the-user (date-of-record) | Browser (system clock, local TZ) | — | "Day" is the user's local civil day, not UTC |
| Card pool filter (theme, due-today) | Browser (in-memory filter over frozen `window.BANK`) | — | Pool is 226 items, trivially fast; bank is immutable |
| Free-revision random pull | Browser (in-memory random sample) | — | Read-only path: must not call the scheduler's persist function |
| Bandeau counter math | Browser (derived from pool + store + today) | — | Reactive derivation; never persisted independently |
| Keyboard input (reveal, grade, theme change) | Browser DOM event listeners (scoped to `#panel-flashcards`) | — | ARIA tablist handlers live at the tab level; flashcard handlers live inside the panel — no overlap |
| Verification of scheduler purity | Node CLI (`verify-srs.cjs`) | — | Same pattern as `verify-bank.cjs`; runs locally pre-push |

---

## 1. SM-2 Algorithm — Exact Formulas and Edge Cases

### 1.1 Canonical SuperMemo SM-2 (1990s reference)

The grade scale q ∈ {0..5} drives two outputs per repetition: the new E-Factor (ease) and the next interval. [CITED: supermemo.com/en/blog/application-of-a-computer-to-improve-the-results-obtained-in-working-with-the-supermemo-method]

```
EF' := EF + (0.1 − (5 − q) × (0.08 + (5 − q) × 0.02))
if EF' < 1.3 then EF' := 1.3

I(1) := 1                       // first successful interval, in days
I(2) := 6                       // second successful interval
I(n) := ceil(I(n-1) × EF')      // n > 2

if q < 3:
  // failed — reset repetition counter; do NOT modify EF in the canonical paper
  // (Anki's variant DOES modify EF on lapses — see §1.3)
  n := 0
  I := 1
```

### 1.2 D-07 grade-button → SM-2 mapping (the project's binding contract)

CONTEXT.md D-07 commits to **Anki-style** behaviour (4 buttons, all four mutate ease), not pure SuperMemo (5 grades, only success-grades touch ease). The Anki variant is what's locked. Below is D-07 translated to executable pseudo-code that the scheduler module implements verbatim:

```js
// Grade enum (string keys to avoid magic numbers in calling code)
const GRADE = { RATE: 'rate', DUR: 'dur', BIEN: 'bien', FACILE: 'facile' };

// Constants (D-07)
const EASE_INIT       = 2.5;
const EASE_FLOOR      = 1.3;
const FIRST_INTERVAL  = 1;     // I(1) in days
const SECOND_INTERVAL = 6;     // I(2) in days
const RATE_RESET_INTERVAL = 1; // lapse re-introduces card as if new
const RATE_EASE_DELTA     = -0.20;
const DUR_INTERVAL_MULT   = 1.2;
const DUR_EASE_DELTA      = -0.15;
const BIEN_EASE_DELTA     = 0;   // standard advance
const FACILE_BONUS_MULT   = 1.3;
const FACILE_EASE_DELTA   = +0.15;

// Pure function. row = current per-card row; grade ∈ GRADE; today = 'yyyy-mm-dd'.
// Returns a NEW row (does not mutate input).
function schedule(row, grade, today) {
  const r   = row || { ease: EASE_INIT, interval: 0, due: today, lapses: 0, reps: 0, introduced: null };
  const isNew = (r.reps === 0 && r.lapses === 0);

  let ease     = r.ease;
  let interval = r.interval;
  let lapses   = r.lapses;
  let reps     = r.reps;

  switch (grade) {
    case GRADE.RATE:
      lapses  += 1;
      ease     = Math.max(EASE_FLOOR, ease + RATE_EASE_DELTA);
      interval = RATE_RESET_INTERVAL;       // 1 day — card is due tomorrow
      // reps NOT incremented (a lapse is not a successful rep)
      break;

    case GRADE.DUR:
      reps    += 1;
      ease     = Math.max(EASE_FLOOR, ease + DUR_EASE_DELTA);
      interval = (reps === 1) ? FIRST_INTERVAL
               : (reps === 2) ? SECOND_INTERVAL
               : Math.ceil(interval * DUR_INTERVAL_MULT);
      break;

    case GRADE.BIEN:
      reps    += 1;
      // ease unchanged
      interval = (reps === 1) ? FIRST_INTERVAL
               : (reps === 2) ? SECOND_INTERVAL
               : Math.ceil(interval * ease);
      break;

    case GRADE.FACILE:
      reps    += 1;
      ease     = ease + FACILE_EASE_DELTA;   // no floor needed (positive delta)
      interval = (reps === 1) ? Math.ceil(FIRST_INTERVAL * FACILE_BONUS_MULT)
               : (reps === 2) ? Math.ceil(SECOND_INTERVAL * FACILE_BONUS_MULT)
               : Math.ceil(interval * ease * FACILE_BONUS_MULT);
      break;

    default:
      throw new Error('schedule: unknown grade ' + grade);
  }

  return {
    ease:       ease,
    interval:   interval,
    due:        addDays(today, interval),     // see §2 for addDays
    lapses:     lapses,
    reps:       reps,
    introduced: r.introduced || (isNew ? today : null)
  };
}
```

### 1.3 Edge cases the planner MUST instruct executors to handle

| # | Edge case | Behaviour | Why it matters |
|---|-----------|-----------|----------------|
| E1 | **First grade ever on a card** (no row in store yet) | `row = null` → defaults applied; `reps=0, interval=0`. Grade fires schedule(): if "raté", new row has `lapses=1, reps=0, interval=1`. If "bien", new row has `reps=1, interval=1`. `introduced=today`. | Without this default, the scheduler can't distinguish "new card" from "card to lapse" |
| E2 | **First "raté" before any successful rep** | `lapses=1, reps=0, interval=1, ease=2.5−0.20=2.30`. Card re-queues for tomorrow (NOT today — interval=1 means "due in 1 day"). | If you mistakenly set interval=0, the card stays in today's queue → infinite re-queue loop during one session [ASSUMED] |
| E3 | **Repeated "raté" (already lapsed)** | Each "raté" applies `-0.20` to ease, clamped at floor 1.3. Interval stays at 1 (already at reset minimum). | Hot-loop card slowly bottoms out at ease=1.3, doesn't go negative |
| E4 | **"Raté" when interval was 0** (i.e., grading a NEW card as raté immediately) | Same as E2 — interval becomes 1, lapses=1. | This is the "I press raté on a card I've never seen" path; the scheduler must accept this without `interval` going to negative |
| E5 | **Ease floor reached** | Ease clamped at 1.3 on rate/dur. Even if interval keeps growing, ease no longer falls. | Without `Math.max(EASE_FLOOR, ...)`, ease could go negative and intervals collapse to 0 |
| E6 | **`I(n) × ease` rounding** | `Math.ceil()` per canonical SuperMemo paper. Never round down (would shrink the queue) or `Math.round()` (introduces banker's rounding asymmetry). | Anki uses ceil — matches user expectation that "2.5×6 = 15 days" not 14 |
| E7 | **"Facile" on a brand-new card** | `reps=1, interval=ceil(1×1.3)=2, ease=2.65`. Card jumps over normal I(1)=1 progression. | Owner uses "facile" to fast-track cards they already know — the bonus must propagate from rep 1 |
| E8 | **`introduced` field on lapses** | Stays unchanged on subsequent grades. Only set on the **first** time `row.reps===0 && row.lapses===0`. | Phase 4 wrong-QCM feed checks `introduced` to count against the daily cap — must be stable identity |

### 1.4 Stock-Anki vs pure-SuperMemo divergence — what D-07 commits to

| Behavior | Pure SuperMemo SM-2 | Anki (D-07 lock) | Rationale |
|----------|---------------------|------------------|-----------|
| Grade scale | 0–5 (six) | 4 (raté/dur/bien/facile) | Anki's UI simplification — locked in CONTEXT.md |
| Ease change on fail | EF unchanged | -0.20 on raté | Anki penalizes harder; matches owner-familiar Anki defaults |
| "Hard" button | Not in SM-2 | "Dur" exists, ease -0.15, interval × 1.2 | Anki extension |
| "Easy" bonus | Not in SM-2 | "Facile" applies × 1.3 bonus and +0.15 ease | Anki extension |
| Failure reset | reps := 0, restart I(1)=1 | interval := 1, lapses += 1, reps unchanged in our model | D-07 says "interval reset to 1", does NOT say "reset reps counter". Implication: a card that was at reps=5 and gets raté'd stays at reps=5 in the row (matches Anki's "lapses" being a separate counter from "reviews"). |

**Decision the planner must surface in a task description (NOT re-litigate):** D-07 leaves the "do reps decrement on raté?" question implicit. The pseudo-code above commits to **reps unchanged on raté, lapses += 1**. If owner-verification reveals this is wrong, swap to `reps := 0` on raté. Either choice is defensible; planner picks one and `verify-srs.cjs` asserts it explicitly. **Recommendation: keep reps unchanged on raté.** This matches Anki's data model where "lapses" and "reps" are independent counters and lets `reps>0 || lapses>0` reliably mean "this card has been seen before".

---

## 2. Date Arithmetic — Local-Day Strategy (the pitfall section)

### 2.1 The trap

`Date` objects in JavaScript are millisecond timestamps with implicit UTC under the hood. `new Date().toISOString().slice(0,10)` looks like it gives "today" but it gives **today-in-UTC**, which is **yesterday's date** between 00:00 and ~02:00 local time in France (CET/CEST). For an owner who studies at 23:50, this means cards due "today" don't show up; cards graded at 00:30 get marked as due "yesterday + interval".

### 2.2 Recommended strategy (HIGH confidence, verified)

Store `due` as a `yyyy-mm-dd` **local-civil-day string**, not a timestamp. Compute "today" via Swedish locale (ISO 8601 by default in `Intl`):

```js
function todayLocal() {
  // 'sv-SE' renders dates as 'yyyy-mm-dd' by default, using the LOCAL timezone.
  // This is the canonical browser-supported way to get the user's local civil day.
  return new Date().toLocaleDateString('sv-SE');
}
```

Why `sv-SE` and not `fr-FR`? `fr-FR` returns `"23/05/2026"` (DD/MM/YYYY). `en-CA` also returns ISO format but is less universally cited. `sv-SE` is the standard JS-stackoverflow incantation. [VERIFIED: MDN Intl.DateTimeFormat; widely cross-referenced]

### 2.3 `addDays(today, n)` for computing `due`

```js
function addDays(yyyymmdd, n) {
  // Parse 'yyyy-mm-dd' as LOCAL (not UTC). 'new Date("2026-05-23")' parses as UTC midnight.
  // Constructor with explicit (year, monthIndex, day) parses as local — this is the trick.
  const parts = yyyymmdd.split('-');
  const d = new Date(+parts[0], +parts[1] - 1, +parts[2]);
  d.setDate(d.getDate() + n);
  // Re-format as 'yyyy-mm-dd' via the same local convention
  const y  = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  return y + '-' + mo + '-' + da;
}
```

**Why not `new Date(yyyymmdd)` + setDate**? `new Date("2026-05-23")` parses as UTC midnight per ES spec — when you then call `getDate()` in France, you get **22** half the day. The `(year, month, day)` constructor form is the only safe parse for "ISO date but local day". [VERIFIED: ECMA-262 §21.4.3.2 Date.parse, well-documented pitfall]

### 2.4 DST transitions

`Date.prototype.setDate(d + n)` correctly handles DST: it's a calendar-day operation, not a millisecond add. Adding 1 day across the spring-forward boundary (last Sunday of March in CET) still moves to the next calendar day. No special-casing needed. [VERIFIED: ECMA-262 Date semantics]

The pitfall to avoid: **do not** compute `new Date(timestamp + n * 86400000)` — that's milliseconds, which breaks across DST (you land on 23:00 the next day twice a year, then string-format extracts the wrong civil day).

### 2.5 "Is card X due today?"

```js
function isDue(row, today) {
  // String comparison works because 'yyyy-mm-dd' sorts lexicographically === chronologically.
  return row.due <= today;
}
```

That's it. No parsing, no `Date` allocation. This is the property that makes the `yyyy-mm-dd` string choice pay off — the filter loop over 226 cards is dirt-cheap. [VERIFIED: ISO 8601 date strings are sortable]

### 2.6 What `verify-srs.cjs` needs

Node's `Date` shares the same semantics. The verify script must:
- Pass an injected `today` parameter to `schedule()` instead of letting it read `new Date()` — this is how to test "raté on 2026-05-23 schedules to 2026-05-24" deterministically.
- Test the addDays roll-over: addDays('2026-12-31', 1) === '2027-01-01' (year boundary), addDays('2026-02-28', 1) === '2026-03-01' (leap-year-adjacent), addDays('2024-02-28', 1) === '2024-02-29' (leap year).
- Test DST-adjacent: addDays('2026-03-28', 2) === '2026-03-30' (CET → CEST transition is Sunday 2026-03-29).

---

## 3. Keyboard Interaction Inside an ARIA Tabpanel

### 3.1 The conflict question

The existing tablist IIFE (outils.html lines 88–139) listens for `ArrowLeft/ArrowRight/Home/End` **on the tab buttons themselves** (`tab.addEventListener('keydown', ...)`). Once focus moves into `#panel-flashcards`, those handlers don't fire — the event target is no longer a tab button. So there is **no conflict** as long as flashcard handlers are attached inside the panel, not at `document` level. [VERIFIED: outils.html:125 `tab.addEventListener('keydown', e => ...)`]

### 3.2 WAI-ARIA APG guidance

> "When the tab list contains the focus, moves focus to the next element in the page tab sequence outside the tablist, which is the tabpanel unless the first element containing meaningful content inside the tabpanel is focusable."

> "Interactive widgets should follow standard keyboard patterns for their component type, separate from tab navigation." [CITED: w3.org/WAI/ARIA/apg/patterns/tabs/]

Translation for Phase 3: attach the flashcard keyboard listener to the **reveal button** (when verso is hidden) and to the **grade-button container** (when verso is showing). Do NOT attach to `document` — that would steal keystrokes from the other panels' future engines (P4 QCM, P5 fiches search).

### 3.3 Recommended pattern

```js
// Inside the Flashcards view IIFE
const panel    = document.getElementById('panel-flashcards');
const recto    = panel.querySelector('[data-fc-recto]');
const verso    = panel.querySelector('[data-fc-verso]');
const revealBtn  = panel.querySelector('[data-fc-reveal]');
const gradeBtns  = panel.querySelectorAll('[data-fc-grade]');  // 4 buttons, [data-fc-grade="rate"] etc.

// Reveal flow — listener on the reveal button itself
revealBtn.addEventListener('click', revealCard);
revealBtn.addEventListener('keydown', function(e) {
  // Space and Enter trigger default button behavior; no need to handle explicitly
  // BUT some browsers (older Safari) treat Space differently — defensive:
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    revealCard();
  }
});

// Grade flow — delegate keydown to the panel BUT only when verso visible
panel.addEventListener('keydown', function(e) {
  // Gate: only handle digits when the verso is showing
  if (verso.hidden) return;
  // Don't swallow keys when focus is in the theme picker / number input
  if (e.target.matches('select, input, textarea')) return;

  switch (e.key) {
    case '1': e.preventDefault(); gradeCard('rate');   break;
    case '2': e.preventDefault(); gradeCard('dur');    break;
    case '3': e.preventDefault(); gradeCard('bien');   break;
    case '4': e.preventDefault(); gradeCard('facile'); break;
  }
});

gradeBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    gradeCard(btn.dataset.fcGrade);
  });
});
```

**Key design choices:**
- Panel-scoped listener (`panel.addEventListener`), not `document` — keeps Phase 4/5 engines free to bind their own digit keys.
- Gate by `verso.hidden` — Space/Enter only matters before reveal; digits only matter after.
- `e.target.matches('select, input, textarea')` — owner adjusting `newCardsPerDay` in the number input shouldn't trigger a grade. [VERIFIED: standard DOM pattern]
- `e.preventDefault()` so the digit keys don't end up in form inputs accidentally.

### 3.4 Focus management after a grade

After `gradeCard()`:
1. Re-hide verso (`verso.hidden = true`).
2. Render the next card's recto.
3. **Move focus to `revealBtn`** (`revealBtn.focus()`).

This is the WAI-ARIA "active item gets focus" pattern — the reveal button is the next thing the owner will interact with, and keyboard-only users would otherwise have to Tab back to it. [CITED: w3.org/WAI/ARIA/apg/practices/keyboard-interface/]

Edge case: when the queue empties, focus needs somewhere to go. Move focus to the "Continuer en révision libre" button if rendered, else to the bandeau (give the bandeau `tabindex="-1"` and focus it).

### 3.5 Why this won't break the existing ARIA tablist

The existing tablist IIFE's `keydown` listener is bound to **each tab button**, not `document` or `panel`. When the owner is interacting with flashcards, focus is inside `#panel-flashcards`, not on a tab. The events flow:

```
keydown on reveal-button
  → handler runs on reveal-button (Space/Enter)
  → e.stopPropagation() NOT called → event bubbles to panel
  → panel handler runs (gate: verso.hidden=true → return early — no double-fire)
  → event continues bubbling to body/document → no other listeners → nothing happens
```

The panel's keydown gate (`if (verso.hidden) return` for digits; reveal logic only on the button) makes double-firing impossible. [VERIFIED by reading outils.html:88–139]

---

## 4. localStorage Robustness

### 4.1 Merge-safe writes for `qhse-prefs-v1`

Naive bug: `localStorage.setItem('qhse-prefs-v1', JSON.stringify({ lastTheme: 'duerp' }))` — this **wipes out** `lastMode` and `newCardsPerDay`. CONTEXT.md explicitly requires merge-safe (read → mutate → write).

```js
function readPrefs() {
  try {
    var raw = localStorage.getItem('qhse-prefs-v1');
    if (!raw) return { lastTheme: 'all', lastMode: 'flashcards', newCardsPerDay: 10 };
    var parsed = JSON.parse(raw);
    // Forward-compat: tolerate missing keys (a v2 might add new ones; an older session might lack some)
    return {
      lastTheme:       (typeof parsed.lastTheme === 'string') ? parsed.lastTheme : 'all',
      lastMode:        (typeof parsed.lastMode === 'string') ? parsed.lastMode : 'flashcards',
      newCardsPerDay:  (typeof parsed.newCardsPerDay === 'number' && parsed.newCardsPerDay >= 1 && parsed.newCardsPerDay <= 50)
                         ? parsed.newCardsPerDay : 10
      // Future phases (P4/P5) extend with their own keys — spread them through
      // The pattern: explicitly hydrate THE keys this phase cares about; leave others in 'parsed' untouched.
    };
  } catch (e) {
    // Corrupt JSON, quota error, security exception (private browsing) — fall back to defaults
    return { lastTheme: 'all', lastMode: 'flashcards', newCardsPerDay: 10 };
  }
}

function writePrefs(partial) {
  try {
    var raw = localStorage.getItem('qhse-prefs-v1');
    var existing = raw ? JSON.parse(raw) : {};
    var merged = Object.assign({}, existing, partial);   // shallow merge — sufficient (schema is flat)
    localStorage.setItem('qhse-prefs-v1', JSON.stringify(merged));
  } catch (e) {
    // Swallow quota errors silently — prefs are nice-to-have, not load-bearing
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('qhse-prefs-v1 write failed:', e.message);
    }
  }
}

// Usage
writePrefs({ lastTheme: 'duerp' });  // does NOT clobber lastMode / newCardsPerDay
```

[VERIFIED: standard JS pattern for merge-safe localStorage; `Object.assign` is the simplest viable merge]

### 4.2 Robust reads for `qhse-srs-v1`

```js
function readStore() {
  try {
    var raw = localStorage.getItem('qhse-srs-v1');
    if (!raw) return {};                  // first visit
    var parsed = JSON.parse(raw);
    return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {};
  } catch (e) {
    return {};                             // corrupt JSON → start fresh; do NOT throw
  }
}

function writeStore(store) {
  try {
    localStorage.setItem('qhse-srs-v1', JSON.stringify(store));
  } catch (e) {
    // QuotaExceededError or SecurityError (private mode) — surface to console but don't crash
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('qhse-srs-v1 write failed:', e.message);
    }
  }
}
```

**Quota behaviour:** browsers typically grant ~5–10 MB per origin. With 226 cards × ~120 bytes per row JSON ≈ 27 KB — three orders of magnitude under the cap. Quota errors realistically only happen in Safari private mode (where `localStorage` quota is sometimes 0). The graceful-degradation pattern above keeps the UI working even if writes silently fail — owner's session-in-progress stays intact, but the next reload resets state. Acceptable for v1; a banner could surface this if it ever happens in practice. [ASSUMED: Safari private-mode quota=0 is older-version behaviour; verify if needed]

### 4.3 Schema-version forward tolerance

The `-v1` suffix is the project's chosen migration hook. Phase 3 reads only `qhse-prefs-v1` and `qhse-srs-v1`. If a future Phase 4/5 introduces incompatible schema, it would write to `qhse-prefs-v2`. Phase 3 reads of v1 are forward-compatible IF:
- Missing fields fall back to defaults (see `readPrefs` above).
- Unknown keys are preserved on writes (the `Object.assign` shallow-merge in writePrefs naturally does this — re-read raw, only overwrite the keys Phase 3 owns).

**Recommendation for the planner:** add a comment block at the top of the scheduler IIFE listing the v1 schema explicitly, and a comment on writePrefs noting "do not destructure-spread; preserve unknown keys for future-phase compat".

### 4.4 First-visit (empty store) bootstrap

On first load:
- `readStore()` returns `{}`.
- The Flashcards view filters `window.BANK` by theme = "all" (default) — gets all 226 items.
- The "dues today" filter: a card with no row in the store is treated as **new** (interval 0, no due date). New cards are intro'd up to the `newCardsPerDay` cap.
- Bandeau on first visit: `0/0 dues · 0/10 nouvelles` initially, climbing as the owner grades cards. (See §7 for exact counter rules.)

---

## 5. Free-Revision Read-Only Mode

### 5.1 The risk

A single flag `if (isFreeRevision) skipPersist()` sprinkled through the code is fragile — one missed branch and free-revision silently corrupts the SM-2 store. CONTEXT.md says "structurally prevent SRS state mutation (not just a flag check)."

### 5.2 Recommended pattern: separate code path

The cleanest structural guarantee is **two functions that don't share the write path**:

```js
// SCHEDULER MODULE — pure functions
window.SRS = {
  schedule: function(row, grade, today) { /* pure — returns new row */ },
  isDue:    function(row, today)        { /* pure — boolean */ },
  // ... no persist function here; persistence is the view's responsibility
};

// VIEW MODULE — two distinct study loops

function studyDueQueue() {
  // The ONLY path that calls writeStore()
  function gradeCard(grade) {
    var row    = store[currentCard.id] || null;
    var newRow = window.SRS.schedule(row, grade, todayLocal());
    store[currentCard.id] = newRow;
    writeStore(store);                          // <-- persist
    advanceQueue();
  }
  // ...
}

function studyFreeRevision(pool) {
  // No grade buttons rendered at all — just "Carte suivante" advances.
  // There is no call site for writeStore() in this code path.
  function nextRandomCard() {
    currentCard = pool[Math.floor(Math.random() * pool.length)];
    renderRecto(currentCard);
  }
  // ...
}
```

**Why this is structurally safer than a flag check:** the free-revision function literally does not reference `writeStore`, `store[id] = ...`, or `window.SRS.schedule`. A static reader (or an `eslint-disable` scan) can confirm by grep alone that free-revision touches no persistence. The reviewer doesn't have to trust a `if (mode === 'free') return` to be reached on every branch.

### 5.3 `verify-srs.cjs` assertion (free-revision purity)

```js
// In verify-srs.cjs
const snapshot = JSON.parse(JSON.stringify(initialStore));
window.SRS.shuffleFreeRevisionPool(items);    // or whatever the pure API is
const after = JSON.parse(JSON.stringify(initialStore));
assert.deepStrictEqual(after, snapshot, 'free-revision mode mutated the store');
```

Since the free-revision flow is DOM-bound (it renders cards, listens to "next" clicks), the verify script can only test the **scheduler-side guarantee** — that no SRS functions are called from any free-revision code path. The cheapest way: export the free-revision module to be a function that takes a pool and returns an iterator, and assert that calling it never invokes a spy on `writeStore`. Simpler alternative: assert that `window.SRS` has NO `persist`/`save`/`write` function at all — persistence is purely the view's concern, and the view's free-revision function structurally doesn't call it.

**Recommendation:** the planner should write tasks such that the **scheduler module exposes zero side-effecting functions**. Persistence lives in the view. This makes the verify-srs assertion trivially provable by inspection of `window.SRS`.

---

## 6. `verify-srs.cjs` Design

### 6.1 Mirror of `verify-bank.cjs`

Same pattern: Node script, plain `require`, `global.window = {}` to shim, exit 0/1, ROADMAP success criteria as named assertions.

The challenge: `outils.html` is HTML — Node can't `require` it. **Solution: extract the scheduler into a tiny separate file** OR keep it inline AND have `verify-srs.cjs` use a regex/`vm` trick to extract the IIFE source and eval it. The first option is far cleaner.

**Recommended file layout:**

```
qhse-cesi/
  outils.html              # adds <script src="srs.js"> before the inline view IIFE
  outils-data.js           # frozen (Phase 2)
  srs.js                   # NEW — pure-functional scheduler module, attaches window.SRS
  chassis.css              # unchanged
.planning/phases/03-flashcards-srs/
  verify-srs.cjs           # NEW — loads srs.js via require, runs assertions
```

`srs.js` is one file, ~80 lines, all pure functions, no DOM. Mirrors how `outils-data.js` exposes `window.BANK`: `srs.js` exposes `window.SRS = { schedule, isDue, addDays, todayLocal, GRADE, EASE_INIT, EASE_FLOOR, ... }`. Loadable in Node by shimming `global.window = {}` then `require('./srs.js')`.

The view code (`<script>` block in outils.html) is NOT verified by Node — that's owner-verification (Success Criterion 1: "owner opens flashcards tab, sees recto, clicks reveal…"). What Node verifies is the math.

### 6.2 Assertion structure (mirrors verify-bank.cjs `--final` mode)

```js
#!/usr/bin/env node
'use strict';

const path   = require('path');
const assert = require('assert');

// Load scheduler under Node
global.window = {};
require(path.resolve(__dirname, '../../../qhse-cesi/srs.js'));
const SRS = global.window.SRS;
if (!SRS) { console.error('FAIL: window.SRS not exported'); process.exit(1); }

let pass = 0, fail = 0;
function check(label, fn) {
  try { fn(); console.log('PASS [' + label + ']'); pass++; }
  catch (e) { console.error('FAIL [' + label + '] ' + e.message); fail++; }
}

// ---- (a) SM-2 math — 8 named edge cases from §1.3 ----

check('E1 first grade ever — bien on new card → reps=1, interval=1, ease=2.5', () => {
  const r = SRS.schedule(null, 'bien', '2026-05-23');
  assert.strictEqual(r.reps, 1);
  assert.strictEqual(r.interval, 1);
  assert.strictEqual(r.ease, 2.5);
  assert.strictEqual(r.due, '2026-05-24');
  assert.strictEqual(r.introduced, '2026-05-23');
});

check('E2 first raté ever → lapses=1, reps=0, interval=1, ease=2.30, due=tomorrow', () => {
  const r = SRS.schedule(null, 'rate', '2026-05-23');
  assert.strictEqual(r.lapses, 1);
  assert.strictEqual(r.reps, 0);
  assert.strictEqual(r.interval, 1);
  assert.strictEqual(Math.abs(r.ease - 2.30) < 1e-9, true);
  assert.strictEqual(r.due, '2026-05-24');
});

check('E5 ease floor — 10 consecutive raté grades → ease bottoms at 1.3, not negative', () => {
  let row = null;
  for (let i = 0; i < 10; i++) row = SRS.schedule(row, 'rate', '2026-05-23');
  assert.strictEqual(row.ease, 1.3);
});

check('E7 facile on new card → reps=1, interval=2 (ceil(1*1.3)), ease=2.65', () => {
  const r = SRS.schedule(null, 'facile', '2026-05-23');
  assert.strictEqual(r.reps, 1);
  assert.strictEqual(r.interval, 2);
  assert.strictEqual(Math.abs(r.ease - 2.65) < 1e-9, true);
});

check('E6 rounding — bien on rep 3 with ease 2.5, interval 6 → ceil(6*2.5)=15', () => {
  // After two "bien" grades: reps=2, interval=6, ease=2.5
  let row = { ease: 2.5, interval: 6, due: '2026-05-23', lapses: 0, reps: 2, introduced: '2026-05-20' };
  const r = SRS.schedule(row, 'bien', '2026-05-23');
  assert.strictEqual(r.interval, 15);
});

check('E8 introduced field stable across grades', () => {
  let row = SRS.schedule(null, 'bien', '2026-05-23');
  assert.strictEqual(row.introduced, '2026-05-23');
  row = SRS.schedule(row, 'rate', '2026-05-24');
  assert.strictEqual(row.introduced, '2026-05-23');  // unchanged
  row = SRS.schedule(row, 'bien', '2026-05-25');
  assert.strictEqual(row.introduced, '2026-05-23');  // still unchanged
});

// ---- (b) localStorage schema round-trip ----

check('Schema round-trip — write then re-read yields identical object', () => {
  // Simulate writeStore / readStore against a JSON.stringify/parse round-trip
  const store = {
    'duerp-flashcard-001': { ease: 2.5, interval: 6, due: '2026-05-29', lapses: 0, reps: 2, introduced: '2026-05-22' }
  };
  const roundtripped = JSON.parse(JSON.stringify(store));
  assert.deepStrictEqual(roundtripped, store);
});

// ---- (c) Due-date filtering ----

check('isDue — today >= due is due; today < due is not', () => {
  assert.strictEqual(SRS.isDue({ due: '2026-05-23' }, '2026-05-23'), true);   // today exactly
  assert.strictEqual(SRS.isDue({ due: '2026-05-20' }, '2026-05-23'), true);   // overdue
  assert.strictEqual(SRS.isDue({ due: '2026-05-24' }, '2026-05-23'), false);  // future
});

check('Date arithmetic — addDays across leap year and DST', () => {
  assert.strictEqual(SRS.addDays('2026-12-31', 1), '2027-01-01');
  assert.strictEqual(SRS.addDays('2024-02-28', 1), '2024-02-29');  // leap year
  assert.strictEqual(SRS.addDays('2026-02-28', 1), '2026-03-01');  // non-leap
  assert.strictEqual(SRS.addDays('2026-03-28', 2), '2026-03-30');  // CET → CEST
});

// ---- (d) newCardsPerDay cap enforcement ----
// NOTE: the cap lives in the VIEW layer (which decides whether to introduce a new card).
// The scheduler module provides a helper:
check('newCardsPerDay cap — introducing 15 cards with cap=10 introduces only 10', () => {
  const today = '2026-05-23';
  let store = {};
  const cap = 10;
  // Simulate introducing 15 new cards
  let introducedToday = 0;
  for (let i = 0; i < 15; i++) {
    const cardId = 'card-' + i;
    // The view's logic — only intro if under cap AND card has no row
    if (introducedToday < cap && !store[cardId]) {
      store[cardId] = SRS.schedule(null, 'bien', today);
      if (store[cardId].introduced === today) introducedToday++;
    }
  }
  const introducedCount = Object.keys(store).filter(id => store[id].introduced === today).length;
  assert.strictEqual(introducedCount, 10);
});

// ---- (e) Free-revision mode does not mutate the store ----
check('Free-revision purity — window.SRS has no persist function', () => {
  // Structural assertion: persistence is the view's job; SRS module exposes only pure functions.
  const allKeys = Object.keys(SRS);
  const forbidden = allKeys.filter(k => /persist|save|write|store|set/i.test(k));
  assert.strictEqual(forbidden.length, 0, 'window.SRS exposes side-effecting key(s): ' + forbidden.join(','));
});

console.log('\n' + (fail === 0 ? 'PASS' : 'FAIL') + ': ' + pass + ' passed, ' + fail + ' failed');
process.exit(fail === 0 ? 0 : 1);
```

### 6.3 Why the cap assertion lives at the view-logic level

The cap is a **policy** (a UI concern: don't show more than N new cards/day), not a math invariant. The scheduler can't enforce it because the scheduler only knows about one card at a time. So the verify script simulates the view's loop: "for each new card I'd introduce, ask the scheduler; record the result; stop calling once the cap is hit." This is the cheapest way to verify the cap without booting a browser.

### 6.4 Integration with the existing `--final` discipline

`verify-srs.cjs --final` should run ALL of (a)–(e) and exit 0 only if everything passes. The plan-level commit that ships srs.js + verify-srs.cjs should run the `--final` gate as the executable success-criteria contract — same pattern as Phase 2.

---

## 7. Bandeau Counter Math

CONTEXT.md D-05 specifies format `dues/total · new/cap` decrementing per grade. The exact semantics aren't spelled out — here are the rules the planner must commit to:

### 7.1 Definitions

| Counter | What it means | When it decrements |
|---------|---------------|---------------------|
| **dues** | Cards in the filtered pool that are currently due (`row.due <= today`) AND have been studied at least once (`reps > 0 || lapses > 0`) | Decrements by 1 each time a card with `interval > 0` is graded — because the card's new `due` is now in the future, removing it from today's due-set. **Exception: raté.** A "raté" sets `interval=1`, so `due` becomes tomorrow. Card leaves the dues set today — counter still decrements. The owner-visible "12 validées · 2 à retravailler" message in the empty-queue UX shows the breakdown. |
| **total** | The denominator — total dues at the start of the session for this theme | Static for the session. Computed once when the theme is selected. Recomputed when theme changes. |
| **new** | Cards introduced today so far (cards where `introduced === today`) | Increments by 1 each time a card with no prior row is graded (any grade — including raté). Cap-checked against `cap`. |
| **cap** | `newCardsPerDay` from prefs (1–50, default 10) | Static for the session unless owner changes it via the number input — then recomputed. |

### 7.2 The "is new" definition

A card is "new" the first time it's graded — i.e., when entering `schedule()` with `row === null` (no entry in the store yet). This is the **only** moment `introduced` is set. CONTEXT.md schema example shows `introduced: '2026-05-23'` for a card. **The view-layer rule:** before pulling a card from the queue, check `if (!store[card.id]) { /* new card path */ }`. If under cap, render it; on grade, the scheduler sets `introduced=today`. If at cap, skip it (push back to the new-pool for tomorrow).

### 7.3 Edge case: card graded "raté" — does dues counter increment again?

**No.** The card was due today (`due <= today`), got graded raté, new `due = today + 1 = tomorrow`. Card is no longer due today, so it stays OUT of today's dues. The dues counter decremented by 1 on the grade, period. The card will reappear in tomorrow's queue. (If the owner reloads later today, the bandeau still shows the post-grade state — the card is no longer due today.)

This matches Anki's behaviour: a lapse moves to the relearning queue for tomorrow, doesn't re-fire in today's review queue. [VERIFIED: Anki manual, lapse handling]

### 7.4 Pool composition algorithm (the view's per-session setup)

```js
function buildSession(bank, store, today, theme, cap) {
  // 1. Filter to theme (or all)
  var themedPool = (theme === 'all') ? bank : bank.filter(function(c) { return c.theme === theme; });

  // 2. Split into seen and new
  var seenDue = [];
  var newPool = [];
  for (var i = 0; i < themedPool.length; i++) {
    var card = themedPool[i];
    var row  = store[card.id];
    if (!row) {
      newPool.push(card);
    } else if (row.due <= today) {
      seenDue.push(card);
    }
  }

  // 3. Apply newCardsPerDay cap — already-introduced-today count
  var introducedToday = 0;
  for (var id in store) {
    if (store[id].introduced === today) introducedToday++;
  }
  var newSlots = Math.max(0, cap - introducedToday);
  var newToShow = newPool.slice(0, newSlots);

  // 4. Shuffle for interleaving (CONTEXT.md: random shuffle, no clustering)
  return shuffle(seenDue.concat(newToShow));
}
```

### 7.5 Bandeau initial render

```
dues = seenDue.length
total = seenDue.length    // dues at session start
new = 0
cap = prefs.newCardsPerDay
```

After each grade:
- If the card was from `newPool` (had no row pre-grade) → `new += 1`.
- Always → `dues -= 1` (since the card was in today's queue at session start).

**Pitfall: re-entering the panel mid-session.** If the owner switches to another tab and back, the session is lost — re-build by re-filtering. The bandeau shows a fresh snapshot. The introduced-today count is read from `store` and remains correct because it's derived data.

---

## 8. DOM Mount + Event Delegation Lifecycle

### 8.1 When to initialize

`outils-data.js` loads with `defer` (outils.html:16), so `window.BANK` is guaranteed available by DOMContentLoaded. The existing tablist IIFE runs at `</body>` (lines 88–139) **without** wrapping in `DOMContentLoaded` — it runs synchronously after parsing because the script tag is at the end of body.

**Two options for Phase 3:**

**(A) Eager init at end-of-body (matches existing pattern)**
```html
<script>
  /* ============ IIFE: ARIA tablist ============ */
  (() => { 'use strict'; /* existing code */ })();
</script>
<script>
  /* ============ IIFE: Flashcards view ============ */
  (() => { 'use strict'; /* new code — runs immediately */ })();
</script>
```
Pro: consistent with existing pattern; predictable.
Con: builds the entire Flashcards UI even if owner never opens the flashcards tab. But: ~226 cards filter is sub-millisecond; mount cost is trivial.

**(B) Lazy init on first tab activation**
Use a one-shot listener on the flashcards tab button that runs the init IIFE once.
Pro: zero work until needed.
Con: adds state coupling between the tablist IIFE and the view IIFE; verifier work is harder.

**Recommendation: option (A).** Cost is negligible (one DOM read of `window.BANK`, one localStorage read), consistency with the existing pattern is more valuable, and `verify-srs.cjs` doesn't care because it only tests `srs.js` (pure module).

### 8.2 Mount point and existing markup

`outils.html:59–62`:
```html
<div role="tabpanel" id="panel-flashcards" aria-labelledby="tab-flashcards" tabindex="0">
  <!-- Phase 3 mount point: Flashcards + SM-2 spaced repetition -->
  <p class="placeholder">Ce mode arrive en Phase 3…</p>
</div>
```

The Flashcards IIFE clears the `<p class="placeholder">` and injects its own DOM. **Do NOT remove the `<div role="tabpanel">` wrapper** — that's the ARIA mount boundary and the existing tablist IIFE references it by id.

### 8.3 Suggested DOM structure (inside the tabpanel)

```html
<div role="tabpanel" id="panel-flashcards" aria-labelledby="tab-flashcards" tabindex="0">
  <header class="fc-bandeau">
    <span class="fc-bandeau__dues" data-fc-dues>0/0</span> dues ·
    <span class="fc-bandeau__new" data-fc-new>0/10</span> nouvelles
    <details class="fc-settings">
      <summary>Réglages</summary>
      <label>Cartes nouvelles/jour
        <input type="number" min="1" max="50" data-fc-cap>
      </label>
    </details>
  </header>

  <nav class="fc-theme">
    <label for="fc-theme-select">Thème</label>
    <select id="fc-theme-select" data-fc-theme>
      <option value="all">Tous les thèmes</option>
      <option value="duerp">DUERP</option>
      <!-- ...15 themes -->
    </select>
  </nav>

  <article class="fc-card" data-fc-card>
    <section class="fc-recto" data-fc-recto>
      <h2 data-fc-question></h2>
      <button type="button" data-fc-reveal>Révéler</button>
    </section>
    <section class="fc-verso" data-fc-verso hidden>
      <p class="fc-answer" data-fc-answer></p>
      <p class="fc-explanation" data-fc-explanation></p>
      <p class="fc-source" data-fc-source></p>
      <div class="fc-grades">
        <button type="button" data-fc-grade="rate">1 · Raté</button>
        <button type="button" data-fc-grade="dur">2 · Dur</button>
        <button type="button" data-fc-grade="bien">3 · Bien</button>
        <button type="button" data-fc-grade="facile">4 · Facile</button>
      </div>
    </section>
  </article>

  <div class="fc-empty" data-fc-empty hidden>
    <p>Bravo — file vide pour aujourd'hui. Prochaine carte due le <time data-fc-next-due></time>.</p>
    <button type="button" data-fc-free-revision>Continuer en révision libre</button>
  </div>
</div>
```

[Uses `data-fc-*` attributes for JS hooks → no class-name coupling with chassis.css styling concerns. Same pattern the existing tablist IIFE uses (`aria-controls`).]

### 8.4 CSS scoping

CONTEXT.md says new rules must be scoped to `#panel-flashcards` to avoid polluting the chassis. Two options:

**(i) Inline `<style>` in outils.html, prefixed selectors** — `#panel-flashcards .fc-card { ... }`. Mirrors the chassis's `@layer components` discipline.

**(ii) Native CSS `@scope`** — `@scope (#panel-flashcards) { .fc-card { ... } }`. Cleaner but `@scope` is newly Baseline; chassis.css doesn't currently use it (chassis uses `@layer`).

**Recommendation: (i) prefixed selectors inside `@layer components` in chassis.css** — most consistent with the existing chassis architecture, no new CSS feature dependency, easy to grep ("show me all flashcards CSS" = grep `#panel-flashcards`). Acceptable trade: a small amount of selector specificity. The chassis's existing biblio cards already follow this pattern (lines 361–501 of chassis.css are biblio-scoped).

---

## Standard Stack

### Core (project-locked)

| Tech | Version | Purpose | Why |
|------|---------|---------|-----|
| Vanilla JS (ES2015+) | n/a | Two inline IIFEs + one `srs.js` module file | PERSIST-02 invariant; matches existing tablist IIFE pattern [VERIFIED: outils.html:88–139] |
| `localStorage` Web API | spec | Persistence of `qhse-srs-v1`, `qhse-prefs-v1` | Spec-locked: D-V2-04, PERSIST-01 |
| `Intl.DateTimeFormat` (built-in) | spec | `todayLocal()` via `toLocaleDateString('sv-SE')` | Cross-browser local-civil-day; no library needed [VERIFIED: MDN] |
| Node.js (verify only) | 18+ (already used for verify-bank.cjs) | Run `verify-srs.cjs` locally pre-push | Mirrors Phase 2; not shipped to runtime |

### Supporting

None. No SM-2 npm package, no date library, no DOM library. Stock everything.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Hand-rolled `addDays` + `toLocaleDateString('sv-SE')` | `date-fns` or `dayjs` | Both excellent libraries (~6 KB minified); **rejected** because zero-deps is a hard project invariant. The ~15 lines of vanilla date code cover every case Phase 3 needs. |
| Hand-rolled SM-2 in `srs.js` | `ts-fsrs` (Anki's current default) or `supermemo` (npm) | FSRS is materially better than SM-2 — but CONTEXT.md D-07 explicitly locks Anki SM-2 defaults, and any npm dep violates project rules. Hand-rolled is the only path. |
| Two inline IIFEs + `srs.js` file | Three inline IIFEs (scheduler in outils.html) | If scheduler is inline, `verify-srs.cjs` has to extract it via regex/vm.runInNewContext — fragile. A separate `srs.js` file is the cleanest separation and matches the `outils-data.js` precedent. |

## Package Legitimacy Audit

Phase 3 installs **zero** external packages. No npm install runs. No new CDN dependencies. The only "external" things touched are:
- Google Fonts CSS2 (already loaded via outils.html — unchanged).
- `Intl` / `localStorage` / `Date` browser-native APIs.

Slopcheck N/A. The Package Legitimacy Gate is satisfied trivially (no packages to verify). The planner's task descriptions should not introduce `npm install` or `<script src="https://cdn.…">`.

## Architecture Patterns

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────┐
│  outils.html  (the page)                                           │
│                                                                    │
│  <head>                                                            │
│    <link rel="stylesheet" href="chassis.css">      ─── styles ───┐ │
│    <script src="outils-data.js" defer>              ─── data ───┐│ │
│    <script src="srs.js" defer>                  ─── scheduler ─┐││ │
│  </head>                                                       │││ │
│                                                                │││ │
│  <body>                                                        │││ │
│    ┌──────────────────────────────────────────────────────────┘││ │
│    │  ARIA tablist (existing IIFE) — owns the 4-tab switching   ││ │
│    │  ↓                                                          ││ │
│    │  ┌────────────────────────────────────────────────────────┐ ││ │
│    │  │  #panel-flashcards (NEW Phase 3 content)               │ ││ │
│    │  │                                                         │ ││ │
│    │  │  Flashcards view IIFE (NEW)  ──reads──→ window.BANK    │─┘│ │
│    │  │     │                        ──calls──→ window.SRS    │──┘ │
│    │  │     │                                                  │    │
│    │  │     ├── Bandeau (dues/cap counter)                    │    │
│    │  │     ├── Theme picker (<select>)                       │    │
│    │  │     ├── Card area (recto / verso / 4 grade buttons)   │    │
│    │  │     └── Empty-queue + free-revision button            │    │
│    │  │                                                         │    │
│    │  │  ↓ on grade                                            │    │
│    │  │  newRow = window.SRS.schedule(oldRow, grade, today)    │    │
│    │  │  store[id] = newRow                                    │    │
│    │  │  localStorage.setItem('qhse-srs-v1', JSON.stringify(…))│    │
│    │  └────────────────────────────────────────────────────────┘    │
│    │                                                                │
│    │  #panel-fiches, #panel-qcm, #panel-tests (untouched)           │
│    └────────────────────────────────────────────────────────────────┘
│  </body>                                                            │
└────────────────────────────────────────────────────────────────────┘

Verification path (NOT shipped to browser):
  .planning/phases/03-flashcards-srs/verify-srs.cjs
     ── require ──→ qhse-cesi/srs.js  ── runs pure-function assertions
```

### Recommended Project Structure

```
qhse-cesi/
├── chassis.css          # +~80 lines of #panel-flashcards-scoped rules
├── outils.html          # +~150 lines (markup) + ~120 lines (inline view IIFE)
├── outils-data.js       # UNTOUCHED (frozen Phase 2)
└── srs.js               # NEW — ~80 lines, pure-functional scheduler module

.planning/phases/03-flashcards-srs/
├── 03-CONTEXT.md
├── 03-RESEARCH.md       # this file
└── verify-srs.cjs       # NEW — ~100 lines, mirrors verify-bank.cjs structure
```

### Pattern 1: Pure-functional module exported via `window`

**What:** No imports, no requires, no side effects at module load. Assigns to `window.SRS = { ... }` at the bottom.

**When to use:** Any logic that needs to be verifiable in Node and consumable in the browser, in the zero-build constraint.

**Example:**
```js
// srs.js — runs in browser AND in Node via require()
(function() {
  'use strict';

  var EASE_INIT  = 2.5;
  var EASE_FLOOR = 1.3;
  // ... constants

  function schedule(row, grade, today) { /* pure */ }
  function isDue(row, today) { return row.due <= today; }
  function addDays(yyyymmdd, n) { /* pure */ }
  function todayLocal() { return new Date().toLocaleDateString('sv-SE'); }

  // Browser: window.SRS = …
  // Node:    global.window assigned by test runner; window.SRS = …
  window.SRS = {
    schedule: schedule,
    isDue:    isDue,
    addDays:  addDays,
    todayLocal: todayLocal,
    EASE_INIT: EASE_INIT,
    EASE_FLOOR: EASE_FLOOR,
    GRADE: { RATE: 'rate', DUR: 'dur', BIEN: 'bien', FACILE: 'facile' }
  };
})();
```

### Pattern 2: Two-IIFE separation (scheduler vs view)

The scheduler IIFE in `srs.js` exposes pure functions. The view IIFE in `outils.html` does DOM, localStorage, and event handling. They share only `window.SRS` and `window.BANK` (read-only).

**This is the key architectural choice.** Everything else (verify-ability, free-revision purity, atomic commits) falls out of it cleanly.

### Anti-Patterns to Avoid

- **`document.addEventListener('keydown', …)` for grade keys** — pollutes the global key namespace; will collide with Phase 4 QCM's digit-key answer selection. Scope to the panel.
- **`new Date(due).getTime() <= Date.now()` for due-check** — UTC parsing bug (§2). Use string comparison.
- **`localStorage.setItem('qhse-prefs-v1', JSON.stringify({ lastTheme }))`** — clobbers other prefs. Use merge-safe write (§4.1).
- **A `mode === 'free'` flag inside the grade handler** — flag-based read-only is fragile; use separate code paths (§5).
- **Modifying `window.BANK` items** — bank is `Object.freeze`d in Phase 2. Any attempt throws in strict mode. Treat as read-only.
- **Storing `due` as a millisecond timestamp** — opaque, breaks across DST, can't be eyeball-debugged in DevTools. Use `yyyy-mm-dd` strings.
- **Calling `SRS.schedule()` from the free-revision code path** — the scheduler is the persistence trigger. Free-revision must not invoke it.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Today-in-local-timezone | Manual offset math from `Date.getTimezoneOffset()` | `new Date().toLocaleDateString('sv-SE')` | Browser-native, DST-correct, one-liner [VERIFIED: MDN Intl.DateTimeFormat] |
| Day-of-week arithmetic for DST | Adding 86,400,000 ms to a timestamp | `d.setDate(d.getDate() + n)` | `setDate` is calendar-aware, handles DST correctly [VERIFIED: ECMA-262 §21.4] |
| Random shuffle of cards array | Manual swap-with-random-index | `array.sort(() => Math.random() - 0.5)` (acceptable for n=226) OR Fisher–Yates if rigor matters | n=226 is small; `Math.random()-0.5` sort bias is below human perception. Fisher–Yates is the principled choice if `verify-srs.cjs` needs deterministic seeding — but the verify gate doesn't test shuffle. |
| JSON parse with fallback | Custom try-catch sprinkled at every read site | One central `readStore()` / `readPrefs()` helper | DRY; tests one error path, not five. |
| ARIA tab keyboard interaction | New tabpanel keyboard listener at document level | Reuse the existing tablist IIFE's pattern; scope new listeners to `#panel-flashcards` | Existing pattern is correct (§3); don't reinvent. |
| Schema version migration | Auto-detecting v0/v1/v2 stores at read time | Define the `-v1` schema rigidly; future phases bump to `-v2` if breaking | Forward-compat via field-tolerance only (§4.3); no runtime migration in Phase 3. |

**Key insight:** SM-2 is small enough to hand-roll (~80 lines), but EVERY peripheral concern (dates, persistence, keyboard, DOM) has a standard browser-native solution. The "hand-roll" temptation is highest on dates — resist it.

## Common Pitfalls

### Pitfall 1: UTC midnight vs local-day off-by-one

**What goes wrong:** Cards graded between 00:00 and 02:00 CEST get `due = today_utc + interval`, which is `today_local + interval - 1`. The owner studies before bed at 23:50, grades a card "bien" (1-day interval), comes back tomorrow morning at 09:00 — card is already overdue by a day, the bandeau shows it as "due" again.

**Why it happens:** `new Date().toISOString().slice(0,10)` returns UTC date, not local. The Date constructor parses `"2026-05-23"` as UTC midnight.

**How to avoid:** Always go through `toLocaleDateString('sv-SE')` for "today" and the `(year, month, day)` constructor form for parsing.

**Warning signs:** Test `addDays('2026-12-31', 1)` in the local timezone — if it returns `'2026-12-31'` you have a UTC bug.

### Pitfall 2: Wiping prefs on partial writes

**What goes wrong:** Theme picker write replaces the whole `qhse-prefs-v1` object, dropping `newCardsPerDay` and `lastMode`. Owner sets cap to 5, comes back, cap is back to 10.

**Why it happens:** `localStorage.setItem(key, JSON.stringify(partialObject))` is destructive.

**How to avoid:** Always read-then-write (§4.1 merge-safe pattern).

**Warning signs:** Write any pref, then DevTools → Application → Local Storage; the value should be the **full** object, not just the field you wrote.

### Pitfall 3: Free-revision mutating SRS state

**What goes wrong:** Owner crams the night before the exam in free-revision; thinks "j'utilise pour réviser, ça va pas mal corrompre la SRS"; doesn't realise that a forgotten `if (mode !== 'free')` branch let one grade slip through, resetting ease on 30 mature cards.

**Why it happens:** A boolean flag is a runtime check; one missed code path = data corruption.

**How to avoid:** Structural separation (§5) — free-revision is a different function that doesn't reference `writeStore` or `SRS.schedule`. Grep-provable purity.

**Warning signs:** `verify-srs.cjs` asserts `window.SRS` exposes no persist function; the view's free-revision function should not appear in a grep for `writeStore`.

### Pitfall 4: Stealing keystrokes from Phase 4 QCM

**What goes wrong:** Phase 3's keydown listener bound to `document` swallows `1/2/3/4` even when the active tab is QCM. Phase 4's QCM answer keys break.

**Why it happens:** Global listeners outlive the active tab.

**How to avoid:** Scope listener to `#panel-flashcards` (§3.3). Use `panel.addEventListener`, not `document.addEventListener`.

**Warning signs:** When QCM ships in Phase 4, integration testing should explicitly verify that pressing `1` while in QCM doesn't trigger a phantom flashcard grade.

### Pitfall 5: Ease drift below sensible bounds

**What goes wrong:** A pathological loop of "raté" → ease drops 0.20 per grade. Without floor, ease goes negative; intervals become negative; cards never queue properly again.

**Why it happens:** Forgetting the `Math.max(EASE_FLOOR, ...)` clamp.

**How to avoid:** Wrap every ease mutation in `clampEase()` (or inline `Math.max`). `verify-srs.cjs` E5 assertion catches this.

**Warning signs:** A card row in localStorage with `ease < 1.3` is a smoking gun.

### Pitfall 6: New-card cap counted wrong across reloads

**What goes wrong:** Owner studies 10 new cards, hits the cap, the bandeau shows `10/10 nouvelles`. They reload; the cap resets to 0/10 and they introduce another 10.

**Why it happens:** Counting "introduced today" from session state instead of from the store.

**How to avoid:** Always derive `introducedToday` from `Object.keys(store).filter(id => store[id].introduced === today).length`. Never store the counter — it's derived.

**Warning signs:** Reload mid-session and check the bandeau — the `new/cap` numerator must NOT reset.

### Pitfall 7: `Math.round` instead of `Math.ceil` for intervals

**What goes wrong:** `Math.round(6 * 2.5) = 15` (OK), but `Math.round(2 * 1.4) = 3` while `Math.ceil(2 * 1.4) = 3` (same here). Drift accumulates over many small intervals: `Math.round(1.5) = 2` but JS banker's rounding can give `Math.round(2.5) = 2` (Wait — JS `Math.round` rounds half-up, not banker's. Still, `ceil` is the canonical SM-2 choice).

**Why it happens:** Plausible alternative that "feels" symmetric.

**How to avoid:** Canonical SuperMemo paper says ceil. Stick with it. `verify-srs.cjs` E6 asserts the ceil value.

## Runtime State Inventory

> Phase 3 is a **greenfield mount** inside an existing panel. There is no existing flashcard state to migrate. Section included for completeness.

| Category | Items found | Action required |
|----------|-------------|------------------|
| Stored data | **None** — `qhse-srs-v1` and `qhse-prefs-v1` are new keys, not in use before Phase 3. (Verified by grep of repo for `qhse-srs`, `qhse-prefs` — only appears in spec/CONTEXT docs.) | None — Phase 3 writes fresh keys |
| Live service config | None — no external services involved | None |
| OS-registered state | None | None |
| Secrets/env vars | None — no auth, no API keys | None |
| Build artifacts | None — zero build | None |

The only runtime state that exists at Phase 3 start is `window.BANK` (frozen, read-only). No cleanup, no migration.

## Code Examples

Verified patterns referenced above; complete drop-in snippets.

### Example 1: The `srs.js` skeleton (planner can give this to executors verbatim)

```js
/* qhse-cesi/srs.js — Phase 3 SM-2 scheduler.
 * Pure-functional module. No DOM, no localStorage, no Date.now() calls inside math.
 * Loaded by browser via <script src="srs.js" defer>;
 * loaded by Node via require() in verify-srs.cjs.
 * Exposes window.SRS — read-only API.
 */
(function() {
  'use strict';

  var EASE_INIT       = 2.5;
  var EASE_FLOOR      = 1.3;
  var FIRST_INTERVAL  = 1;
  var SECOND_INTERVAL = 6;
  var RATE_RESET_INTERVAL = 1;
  var RATE_EASE_DELTA     = -0.20;
  var DUR_INTERVAL_MULT   = 1.2;
  var DUR_EASE_DELTA      = -0.15;
  var FACILE_BONUS_MULT   = 1.3;
  var FACILE_EASE_DELTA   = +0.15;

  var GRADE = { RATE: 'rate', DUR: 'dur', BIEN: 'bien', FACILE: 'facile' };

  function clampEase(e) { return Math.max(EASE_FLOOR, e); }

  function todayLocal() {
    return new Date().toLocaleDateString('sv-SE');  // 'yyyy-mm-dd' local
  }

  function addDays(yyyymmdd, n) {
    var p = yyyymmdd.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    d.setDate(d.getDate() + n);
    return d.getFullYear() + '-'
         + String(d.getMonth() + 1).padStart(2, '0') + '-'
         + String(d.getDate()).padStart(2, '0');
  }

  function isDue(row, today) {
    return row.due <= today;
  }

  function schedule(row, grade, today) {
    var r = row || { ease: EASE_INIT, interval: 0, due: today, lapses: 0, reps: 0, introduced: null };
    var isNew = (r.reps === 0 && r.lapses === 0);
    var ease = r.ease, interval = r.interval, lapses = r.lapses, reps = r.reps;

    if (grade === GRADE.RATE) {
      lapses += 1;
      ease = clampEase(ease + RATE_EASE_DELTA);
      interval = RATE_RESET_INTERVAL;
    } else if (grade === GRADE.DUR) {
      reps += 1;
      ease = clampEase(ease + DUR_EASE_DELTA);
      interval = (reps === 1) ? FIRST_INTERVAL
               : (reps === 2) ? SECOND_INTERVAL
               : Math.ceil(interval * DUR_INTERVAL_MULT);
    } else if (grade === GRADE.BIEN) {
      reps += 1;
      interval = (reps === 1) ? FIRST_INTERVAL
               : (reps === 2) ? SECOND_INTERVAL
               : Math.ceil(interval * ease);
    } else if (grade === GRADE.FACILE) {
      reps += 1;
      ease = ease + FACILE_EASE_DELTA;
      interval = (reps === 1) ? Math.ceil(FIRST_INTERVAL * FACILE_BONUS_MULT)
               : (reps === 2) ? Math.ceil(SECOND_INTERVAL * FACILE_BONUS_MULT)
               : Math.ceil(interval * ease * FACILE_BONUS_MULT);
    } else {
      throw new Error('SRS.schedule: unknown grade "' + grade + '"');
    }

    return {
      ease:       ease,
      interval:   interval,
      due:        addDays(today, interval),
      lapses:     lapses,
      reps:       reps,
      introduced: r.introduced || (isNew ? today : null)
    };
  }

  window.SRS = {
    schedule:   schedule,
    isDue:      isDue,
    addDays:    addDays,
    todayLocal: todayLocal,
    GRADE:      GRADE,
    EASE_INIT:  EASE_INIT,
    EASE_FLOOR: EASE_FLOOR
  };
})();
```

### Example 2: The view's grade handler (compact, illustrative)

```js
// Inside the Flashcards view IIFE, after DOM is built and bound:
function gradeCard(grade) {
  var card    = currentCard;            // closure over the visible card
  var row     = store[card.id] || null;
  var newRow  = window.SRS.schedule(row, grade, today);
  store[card.id] = newRow;
  writeStore(store);

  // Counter updates
  duesRemaining -= 1;
  if (!row) newToday += 1;              // it was new (no prior row)
  renderBandeau();

  advanceQueue();                       // pull next card, render, focus revealBtn
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| SM-2 (1990s SuperMemo) | FSRS (Free Spaced Repetition Scheduler) | Anki default switched 2024 | FSRS uses machine-learning to predict recall probability; ~20% fewer reviews for same retention. **Phase 3 deliberately uses SM-2** (D-07 lock) — FSRS would be over-engineered for a single-user 226-card deck and breaks the "owner can predict the scheduler" mental model. [CITED: docs.ankiweb.net/deck-options.html] |
| `localStorage` for SRS state | IndexedDB | Available since 2015 | IndexedDB is async and structured, but for 226 items × ~120 bytes = 27 KB, localStorage's sync API is simpler and sufficient. Project invariant (PERSIST-02) reinforces localStorage. |
| Inline `<style>` only | CSS `@scope` and `@layer` | Baseline 2024–2026 | chassis.css already uses `@layer`; `@scope` is available but `#panel-flashcards`-prefixed selectors achieve the same isolation with broader support. |

**Deprecated/outdated:**
- Heuristic ease-factor formulas pre-SM-2 (Leitner box pure-counting, no per-card EF). Not applicable here.
- jQuery for DOM manipulation. We use vanilla `addEventListener` / `querySelector`.

## Assumptions Log

| # | Claim | Section | Risk if wrong |
|---|-------|---------|---------------|
| A1 | E2: interval=1 on first raté (NOT interval=0). | §1.3 | If `interval=0` is intended (Anki's relearning steps include a same-session re-show), cards would re-fire in today's queue. **Mitigation:** the planner should make this an explicit task description point and let the owner test in P3 owner-verification. CONTEXT.md D-07 says "interval reset to 1 day" — committing to 1, not 0. |
| A2 | "Raté" leaves `reps` unchanged. | §1.4 | If owner-verify reveals lapses should reset reps to 0, swap. Either choice is defensible; verify-srs.cjs asserts the chosen behaviour explicitly so it's obvious which is in force. |
| A3 | Safari private-mode `localStorage` quota = 0. | §4.2 | Modern Safari may have changed this. If true, the graceful-degradation pattern in `writeStore` covers it. If false (and quota is non-zero in all modern Safari), the pattern is still correct — just one fewer code path exercised. |
| A4 | `Math.random()-0.5 sort` is acceptable for n=226 shuffle. | "Don't Hand-Roll" table | Bias is mathematically present (~5% deviation from uniform). For a daily-study shuffle the owner sees, imperceptible. If the planner wants rigor, Fisher–Yates is 6 lines. |

**If owner pushes back on any of A1–A4 during verification, the fix is local (`srs.js` only) — no downstream impact.**

## Open Questions

1. **Does the owner want a "skip card for now" button?**
   - What we know: CONTEXT.md doesn't list one; 4 grades only.
   - What's unclear: Use case where the owner doesn't want to grade now (mid-session interruption, ambiguous card).
   - Recommendation: **Don't add it in P3.** If the owner skips a card by reloading the page, the queue rebuilds — the card is still due. That's a valid escape hatch without extra UI.

2. **Show interval / next-due-date inside the verso?**
   - What we know: Owner is technically minded (ex-electrician, accounting BTS) — might appreciate seeing "Si tu réponds 'bien', cette carte revient dans 6 jours". Anki shows this.
   - What's unclear: Whether it adds cognitive load or value at exam-prep stage.
   - Recommendation: Show the next-interval next to each grade button (e.g., `1 · Raté (1j)`, `2 · Dur (2j)`, `3 · Bien (6j)`, `4 · Facile (8j)`). Small change, big mental-model gain. **Flag for planner discretion — not in CONTEXT.md.**

3. **What happens when `newCardsPerDay` is reduced mid-day?**
   - What we know: Owner can change the cap via number input.
   - What's unclear: If 10 new cards introduced, owner drops cap to 5 — do those 10 stay introduced (yes, `introduced` is immutable per E8) but no further new cards enter until tomorrow? Or rollback?
   - Recommendation: **Cap is a forward-looking gate.** Cards already introduced today stay introduced (can't un-introduce). New cards stop entering until `introducedToday < cap`. Simplest possible interpretation. Planner adds this to a task note.

4. **Touch-tap-to-reveal: same element as the verso card body?**
   - What we know: CONTEXT.md "tap-the-card to reveal".
   - What's unclear: Does the whole card get a click handler, or just a "Révéler" button (with the card body being tappable as a fallback)?
   - Recommendation: Render an explicit "Révéler" button (keyboard accessibility — `tabindex=0` by default on `<button>`) AND attach a click handler to the recto container that also calls `revealCard()`. Best of both worlds.

## Environment Availability

| Dependency | Required by | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | `verify-srs.cjs` | ✓ | (used by existing verify-bank.cjs) | None — required for the verify gate |
| Modern evergreen browser | Runtime | ✓ | Chrome/Edge/Firefox/Safari current | None needed |
| `localStorage` | Persistence | ✓ | Spec-baseline 2009+ | None — Safari private mode degrades to zero quota; graceful warn pattern (§4.2) |
| `Intl.DateTimeFormat` with `'sv-SE'` | Local-day strings | ✓ | Baseline 2017+ | None — universal |
| `Object.freeze` | Bank immutability | ✓ | Baseline 2011+ | Already in use (Phase 2) |

No external services, no API calls, no fonts beyond the ones already loaded (Fraunces + Inter + JetBrains Mono).

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node-builtin `assert` (no test runner; same pattern as `verify-bank.cjs`) |
| Config file | None — single `.cjs` script |
| Quick run command | `node .planning/phases/03-flashcards-srs/verify-srs.cjs` |
| Full suite command | `node .planning/phases/03-flashcards-srs/verify-srs.cjs --final` |
| Phase gate | `--final` must exit 0 before push to main |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|--------------|
| FLASH-01 | Reveal verso = answer + explanation + source | manual (DOM-bound) | Owner-verify: open tab, click reveal | N/A — owner gate |
| FLASH-02 | 4 grade buttons advance and record | manual + scheduler unit | Owner-verify + `verify-srs.cjs` E1/E2 | ❌ Wave 0: verify-srs.cjs |
| SRS-01 | SM-2 math correct | unit | `verify-srs.cjs` E1–E8 | ❌ Wave 0: verify-srs.cjs + srs.js |
| SRS-02 | Due-today filter | unit | `verify-srs.cjs` isDue assertions | ❌ Wave 0 |
| SRS-03 | Per-card row shape ready for P4 wrong-QCM feed | unit | `verify-srs.cjs` schema round-trip | ❌ Wave 0 |
| SRS-04 | Reload preserves state | manual + unit | Owner: reload mid-session; verify: JSON round-trip identity | ❌ Wave 0 |
| PERSIST-01 | Three keys documented, merge-safe | manual + grep | Owner-verify console keys; planner doc-asserts the prefs merge-safe write pattern | N/A — owner + code review |

### Sampling rate
- **Per task commit:** `node verify-srs.cjs` (quick — math + schema only)
- **Per wave merge:** `node verify-srs.cjs --final` (math + schema + cap + free-revision + date arithmetic)
- **Phase gate:** `--final` green AND owner-verify checklist signed off

### Wave 0 gaps
- [ ] `qhse-cesi/srs.js` — the scheduler module (does not exist yet)
- [ ] `.planning/phases/03-flashcards-srs/verify-srs.cjs` — the verifier
- [ ] No test framework install needed — Node `assert` is built-in

## Security Domain

### Applicable ASVS Categories

Phase 3 is single-user, client-only, no auth, no network calls, no user-supplied input beyond a number-input range (1–50) and a `<select>` of pre-defined themes. Most ASVS categories are N/A.

| ASVS Category | Applies | Standard Control |
|---------------|---------|------------------|
| V2 Authentication | No | No accounts |
| V3 Session Management | No | No sessions |
| V4 Access Control | No | Single-user |
| V5 Input Validation | Yes (light) | `newCardsPerDay` clamped to integer in [1, 50] before persist; `lastTheme` validated against the 15 known slugs + 'all'; corrupt JSON in localStorage falls back to defaults (§4) |
| V6 Cryptography | No | No secrets, no signing |
| V8 Data Protection | No (light) | localStorage is per-origin-isolated by browser; no PII (only grade history) |
| V14 Configuration | No | No build, no env vars |

### Known threat patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Corrupted localStorage (manual edit or unrelated app bug) | Tampering (low — owner is the only "attacker") | Tolerant reads (§4.2): JSON parse in try-catch, schema validation on field types, fallback to defaults |
| XSS via `window.BANK` content rendered into innerHTML | Tampering / Injection | Use `textContent` (not `innerHTML`) for `question` / `answer` / `explanation`. The `source.url` is the only field that becomes an `<a href>` — and the bank is hand-authored + verified (BANK-04), so the trust boundary is at commit time. **Planner instruction:** render with `textContent`, never `innerHTML`. |
| Quota exhaustion (denial-of-service) | DoS (vanishingly unlikely at 27 KB / 5 MB) | writeStore catches exceptions, surfaces warn, continues; session continues in-memory |

The only real attention-needed item is **`textContent` discipline** when rendering bank content. The planner should call this out in the rendering task description.

## Sources

### Primary (HIGH confidence)
- [SuperMemo — Application of a computer to improve the results obtained in working with the SuperMemo method](https://www.supermemo.com/en/blog/application-of-a-computer-to-improve-the-results-obtained-in-working-with-the-supermemo-method) — Canonical SM-2 paper (Wozniak, 1990); the EF formula and I(1)=1, I(2)=6, ceil rounding all sourced here. [VERIFIED via WebFetch 2026-05-23]
- [WAI-ARIA APG — Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) — guidance on focus management between tablist and tabpanel; basis for §3.2. [VERIFIED via WebFetch 2026-05-23]
- `qhse-cesi/outils.html` lines 88–139 — the existing tablist IIFE pattern; basis for the two-IIFE / scoped-listener architecture. [VERIFIED by direct read]
- `qhse-cesi/outils-data.js` lines 1–80 — the bank's `window.BANK` shape and idempotent-double-load pattern; the model for `window.SRS` exposure. [VERIFIED by direct read]
- `.planning/phases/02-content-bank/verify-bank.cjs` — the verifier pattern that `verify-srs.cjs` mirrors. [VERIFIED by direct read]

### Secondary (MEDIUM confidence)
- [Anki Manual — Deck Options / Lapses](https://docs.ankiweb.net/deck-options.html) — confirms Anki SM-2 variant behaviour (4 grades, lapse → relearning queue, default ease 2.5). [VERIFIED via WebFetch — note: the official manual doesn't enumerate every default numerically, hence the SuperMemo paper is the primary source.]
- MDN — `Intl.DateTimeFormat`, `Date.prototype.setDate`, `Date.parse` ECMA-262 §21.4. [Well-documented behaviour; cross-referenced]

### Tertiary (LOW confidence — flagged for verification only if disputed)
- A3 assumption about Safari private-mode quota = 0 — based on older reports; current behaviour may differ. The fallback pattern (§4.2) is correct regardless.
- A4 `Math.random()-0.5` shuffle bias — well-documented in JS community discussions; for n=226 single-user, imperceptible.

## Metadata

**Confidence breakdown:**
- SM-2 algorithm: HIGH — canonical SuperMemo paper consulted; D-07 calibration locked in CONTEXT.md.
- Date arithmetic: HIGH — ECMA-262 semantics verified; `toLocaleDateString('sv-SE')` is the standard incantation.
- ARIA tabpanel keyboard: HIGH — existing tablist code audited; APG pattern confirmed.
- localStorage robustness: HIGH — standard patterns; verify-srs.cjs assertions cover the failure modes.
- Free-revision purity: HIGH — structural separation is grep-provable.
- `verify-srs.cjs` design: HIGH — direct mirror of verify-bank.cjs, same `--final` discipline.
- Bandeau math: MEDIUM — algorithm clear from spec, but a few edge cases (cap reduction mid-day, reload mid-session) flagged as open questions for planner discretion.
- DOM mount lifecycle: HIGH — matches existing tablist IIFE pattern.

**Research date:** 2026-05-23
**Valid until:** 2026-06-23 (30 days; SM-2 is decades-stable, browser APIs are baseline, project stack is locked).

## RESEARCH COMPLETE
