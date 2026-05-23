# Phase 3: Flashcards + SRS - Context

**Gathered:** 2026-05-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the **Flashcards** study mode on top of the frozen Phase 2 bank, backed by a **standard SM-2 scheduler** with `localStorage` persistence — such that the owner reviews due cards, self-grades on 4 levels, and returns the next day to find the queue correctly advanced.

Covers requirements **FLASH-01, FLASH-02, SRS-01, SRS-02, SRS-04, PERSIST-01** (plus the data-shape half of **SRS-03**: the per-card store must be QCM-feedable from Phase 4 without breaking changes). The QCM-error feed itself is implemented in Phase 4 — not this phase.

**In scope:** flashcard rendering inside `panel-flashcards`, SM-2 scheduler module, `qhse-srs-v1` per-card state, `qhse-prefs-v1` (last theme/mode/`newCardsPerDay`), theme picker, "À réviser aujourd'hui" surfacing, end-of-session empty-queue UX with optional "révision libre" mode.

**NOT in scope:** QCM engine, tests blancs, score history, fiches, print styles, runtime AI, backend. The bank itself is **frozen** (Object.freeze in Phase 2) — Phase 3 reads `window.BANK`, never mutates it. SRS state lives in its own `localStorage` keyspace.

</domain>

<decisions>
## Implementation Decisions

### Card pool composition
- **D-01:** Flashcards mode reads **the entire 226-item bank**, not only `type==='flashcard'`. For QCM items, the recto/verso mapping is: `question` → recto, `answer` → verso; `choices`/`correct` are **ignored** in this mode (they remain Phase 4's territory). Rationale: doubles the pool for SRS exposure; the same exam fact gets drilled twice (rapid recall in P3, choice-discrimination in P4). Per-card SRS state is keyed on `item.id`, so a P4 wrong answer and a P3 grade later collapse to the same row.
- **D-02:** **Verso uniforme** for both native flashcards and QCM-repackaged cards: `answer` + `explanation` + `source` shown together, no badge distinguishing the two. For QCMs, the existing `explanation` field already says "pourquoi chaque distracteur est faux" — that's exam-prep value and stays visible.

### New-card introduction pacing
- **D-03:** **Cap fixe `newCardsPerDay = 10`** — toutes thèmes confondus. Conservative profile (Anki default is 20). Rationale: 226 items / 10 ≈ 23 days to introduce the whole bank once, sustainable for alternance schedule + voice-input owner. Avoids the "binge then drown" failure mode of uncapped intro.
- **D-04:** The cap is **owner-adjustable**, persisted in `qhse-prefs-v1` under key `newCardsPerDay`. A small "Réglages" control inside the Flashcards panel sets it (number input, range 1–50). Default = 10 on first visit. Spec D-V2-04 (`qhse-prefs-v1` stores last theme/mode) extends naturally to also store this scheduler knob.

### Queue surfacing
- **D-05:** **Bandeau compteur permanent** at the top of the flashcard view — no separate entry screen. Format: `5/12 dues · 3/10 nouvelles` (decrements per grade). Owner enters directly into the first card; the bandeau gives at-a-glance load awareness without an extra click. Decision rejected the entry screen ("Tu as N cartes — Commencer") because it adds friction for a single-user daily workflow.
- **D-06:** **Empty-queue end-of-session UX:** "Bravo — file vide pour aujourd'hui. Prochaine carte due le [date]. (12 validées · 2 à retravailler.)" + a discrete button **"Continuer en révision libre"**. Free-revision mode pulls random items from the filtered pool but **does NOT touch SM-2 state** (pure read-only mode for pre-exam cram sessions). The SM-2 protection is non-negotiable: cramming must not pollute the scheduler.

### SM-2 calibration
- **D-07:** **Stock Anki SM-2 defaults** (owner did not select this gray area; locked by Claude's discretion):
  - Initial ease factor: `2.5`
  - First "bien" interval: `1 day`
  - Second "bien" interval: `6 days`
  - Subsequent intervals: `interval * ease` rounded up
  - Ease floor: `1.3`
  - Lapse ("raté"): interval reset to `1 day`, ease decreased by `0.20`
  - "Dur": interval × 1.2, ease decreased by `0.15`
  - "Bien": standard advance (ease unchanged)
  - "Facile": interval × ease × 1.3 (bonus), ease increased by `0.15`
- These defaults are **constants in the SRS module**, not exposed in UI. If real use surfaces a calibration issue, revisit in a later milestone — out of P3 scope.

### Claude's Discretion
- **Reveal + grade interaction (gray area not selected for discussion):** Keyboard shortcuts on desktop — `Space`/`Enter` reveals verso; `1`/`2`/`3`/`4` grade as raté/dur/bien/facile. Touch: tap-the-card to reveal, then tap a grade button. No flip animation in P3 (chassis.css honours `prefers-reduced-motion`; a flip would be noise here). Button order left-to-right matches keyboard digit order. Inspired by the project's ARIA-tabs keyboard discipline from Phase 1.
- **Theme picker UI:** Compact `<select>` dropdown listing the 15 themes + a leading "Tous les thèmes" option, mounted at the top of `panel-flashcards`. Persisted to `qhse-prefs-v1.lastTheme`. Chip-row UI rejected (too dense on mobile with 16 entries).
- **`qhse-srs-v1` schema (per-card row, keyed by item id):**
  ```js
  {
    ease: 2.5,              // float, floor 1.3
    interval: 0,            // days until next due (0 = new/unstudied)
    due: '2026-05-23',      // ISO date string (yyyy-mm-dd) — date math is local-day, not ms
    lapses: 0,              // total "raté" count
    reps: 0,                // total successful reviews
    introduced: '2026-05-23' // first time the card entered the queue (used to enforce newCardsPerDay)
  }
  ```
  The store is `{ [itemId]: row }` under `qhse-srs-v1`. `introduced` is the field Phase 4 wrong-QCM-feed will check to decide whether the card counts toward the daily new-card cap. Schema is forward-compatible with P4 wiring.
- **`qhse-prefs-v1` schema:**
  ```js
  { lastTheme: 'all', lastMode: 'flashcards', newCardsPerDay: 10 }
  ```
  Other Phase 4/5 modes will extend this object with their own keys.
- **Module layout:** Inline `<script>` in `outils.html` for the Flashcards engine (consistent with the existing tab IIFE pattern). Two clearly delimited IIFEs: SRS scheduler (pure functions, no DOM), Flashcards view (DOM + state). No build, no module system. The SRS scheduler is pure enough to verify with a Node.js `verify-srs.cjs` script (same pattern as Phase 2's `verify-bank.cjs`).
- **Verification gate:** `verify-srs.cjs` asserts (a) SM-2 math against a known-grade sequence, (b) localStorage schema round-trip, (c) due-date filtering for the "À réviser aujourd'hui" view, (d) `newCardsPerDay` cap enforcement, (e) free-revision mode does not mutate state. Mirrors the Phase 2 `--final` gate discipline.
- **No regression on Phase 1/2 deliverables:** existing ARIA tablist IIFE untouched; `outils-data.js` not modified; chassis.css untouched (any new components added inline-scoped to `panel-flashcards` to avoid polluting the shared chassis).
- Atomic commit/push per batch (D-V2 token-conscious discipline carried over).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Authoritative milestone design (read first — locked, do not re-litigate)
- `.planning/V2-ETUDE-SPEC.md` — owner-approved locked decisions D-V2-01..06. **Spaced repetition section** is the authoritative spec: SM-2, 4 grades raté/dur/bien/facile, the three localStorage keys (`qhse-srs-v1` per-card, `qhse-scores-v1` test history — P4 only, `qhse-prefs-v1` last theme/mode), "À réviser aujourd'hui" view, "flashcards + wrong QCM feed the SRS queue; tests blancs do not". **Content bank section** is the schema source of truth (item shape, frozen contract).

### Phase scope & requirements
- `.planning/ROADMAP.md` § Phase 3 — phase goal + 5 owner-verifiable success criteria (theme picker → recto → reveal verso, 4 grades persisting to `qhse-srs-v1`, due-today view, reload-survives test, raté immediately re-queues).
- `.planning/REQUIREMENTS.md` — FLASH-01, FLASH-02, SRS-01..04, PERSIST-01 (full text + traceability). Note: SRS-03 is jointly satisfied with Phase 4; Phase 3 ships the *schema* that Phase 4 will write into.

### Architecture / integration target
- `.planning/phases/01-shell-gateway/01-CONTEXT.md` — Phase 1 decisions: ARIA tablist IIFE pattern, `[hidden]` toggle, hash sync, dated placeholders (`panel-flashcards` is the mount slot), zero-build invariant.
- `.planning/phases/02-content-bank/02-CONTEXT.md` — Phase 2 decisions: 15-theme closed vocabulary (D-01), item schema D-10..D-13, immutability contract (Object.freeze) — **Phase 3 reads, never mutates**.
- `qhse-cesi/outils.html` — the page Phase 3 extends. The Flashcards engine goes inline in this file (new IIFE after the existing tab IIFE) and mounts into `#panel-flashcards`, replacing the placeholder `<p>`.
- `qhse-cesi/outils-data.js` — the frozen `window.BANK` consumed by Phase 3. **Read-only** dependency.
- `qhse-cesi/chassis.css` — token/layer system. Phase 3 components added inline-scoped via `@scope (#panel-flashcards) { ... }` or as panel-prefixed classes to avoid polluting the shared chassis.

### Discipline (binding for this phase)
- `C:\Users\Lasmoles\.claude\projects\C--Users-Lasmoles-mes-apps-claude\memory\feedback_token_conscious_work.md` — atomic commit/push per unit of work; never one giant uncommitted file.
- `.planning/phases/02-content-bank/verify-bank.cjs` — pattern reference for the new `verify-srs.cjs` (Node.js, plain `require`, exit 0/1, ROADMAP success criteria as assertions).
- `qhse-cesi/LEGAL.md` — link-only / no `.pdf` rules unchanged (P3 introduces no new external content; sources rendered come from the frozen bank).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`window.BANK` (frozen, 226 items)** — the entire content pool, immutable. Read once, filter by `theme`, map to a `cards[]` working array. ES5-safe — already loaded with `defer` so DOMContentLoaded is the safe boot point.
- **Existing ARIA tablist IIFE in `outils.html` (lines 88–139)** — the architectural template for Phase 3's two new IIFEs. Same conventions: `'use strict'`, no globals, `[hidden]` toggle, `history.replaceState` (not `location.hash =`) to avoid history pollution / scroll-jump (WR-01/WR-02 fix).
- **`#panel-flashcards` mount point** (`outils.html:59-62`) — the placeholder `<p class="placeholder">…arrive en Phase 3…</p>` is the only DOM to replace. The surrounding `<div role="tabpanel">` and tablist wiring stay untouched.
- **`@layer components` in chassis.css** — the place to add new Flashcards-specific component rules if needed, gated by `#panel-flashcards` parent selector or `@scope` to keep them local.
- **chassis.css `.placeholder`, OKLCH tokens, Fraunces/Inter/JetBrains Mono** — visual identity reused for free. Verso panel uses `--ink-2` for explanation prose, mono for `source.ref` / article numbers; recto uses Fraunces for emphasis.
- **chassis.css `@media (prefers-reduced-motion: reduce)`** — already in place; any flip/fade in Flashcards must respect it (currently no flip planned).

### Established Patterns
- **Zero build, vanilla JS, ES5-safe** (PERSIST-02 invariant). Phase 3 module is inline `<script>` in `outils.html`, same as the ARIA tab IIFE. No `import`, no `<script type="module">`, no bundler.
- **Atomic commit per delivery unit** (token-conscious discipline). SRS scheduler → 1 commit; Flashcards view → 1 commit; verify-srs.cjs + CI gate → 1 commit; integration polish → 1 commit. Never one giant patch.
- **Verification-gate-first** (`verify-bank.cjs` precedent). `verify-srs.cjs` is the executable ROADMAP success-criteria contract; ships in the same commit that ships the code it verifies.
- **localStorage as the only persistence** (PERSIST-02). All state mutates through a thin getter/setter pair; no direct `localStorage.getItem` scattered across the codebase.

### Integration Points
- `outils.html` `#panel-flashcards` — the only DOM mount point. No edits to other panels.
- `qhse-prefs-v1` — Phase 3 writes `{ lastTheme, lastMode, newCardsPerDay }`. Phase 4/5 extend this object (P4: probably `lastQuizTheme`, `qcmShowExplanation`; P5: `lastFiche`). Schema must be merge-safe (read existing object, mutate keys, write back — not `setItem(stringify({...}))`).
- `qhse-srs-v1` — Phase 3 writes `{ [itemId]: { ease, interval, due, lapses, reps, introduced } }`. Phase 4 SRS-03 implementation will read+write the same store using the same `itemId`-keyed shape; the `introduced` field is the cross-phase contract.
- Deploy: push `main` → GitHub Actions → Vercel; live at `…/qhse-cesi/outils.html` (~60s). Root QHSE Trainer + Hub reading content remain untouched (SHELL-04 invariant).

</code_context>

<specifics>
## Specific Ideas

- "Bandeau permanent, pas d'écran d'entrée" (owner) — the daily study workflow should be friction-free; the owner already knows he's studying when he opens the tab. Don't make him click twice.
- "Révision libre quand la file est vide" (owner) — pre-exam cram needs to be possible without polluting the scheduler. The mode-protection here is the same instinct as the Phase 2 immutability contract: the SRS state is a long-lived asset, never sacrificed for short-term convenience.
- "Pool entier en flashcards" (owner) — the 226 items are all exam-relevant; arbitrarily walling off QCMs from rapid recall would waste content. The QCM/flashcard distinction is presentation-mode, not content-eligibility.
- Owner is a Bachelor QHSE alternant with strong industrial/regulatory vocabulary (ex-nuclear electrician). Card prose register stays exam-grade (already enforced by the frozen bank); the UI layer just renders it. No vulgarization, no tooltips explaining acronyms — the bank's `explanation` field already does that.

</specifics>

<deferred>
## Deferred Ideas

- **SM-2 calibration overrides (UI-exposed)** — if stock Anki defaults prove too aggressive/conservative in real use, expose ease/intervals in a dev panel or `window.SRS_CONFIG` console override. Not in P3; revisit only if there's a felt problem.
- **Card-history / per-card grade log** — could power retrospective analytics ("which cards I miss most"). Not in scope; the SRS row has `lapses`/`reps` counters which are sufficient for the SM-2 algorithm.
- **Cross-theme weighting / interleaving** — research suggests interleaved practice beats blocked practice. Current decision: respect the owner's theme selection (single theme or "Tous"); within "Tous", random shuffle of due cards (no theme-clustering, no theme-rotation algorithm). Tunable later if exam results suggest otherwise.
- **PWA / offline / install prompt** — out of v2.0 scope (V2_BACKLOG.md territory).
- **Wrong QCM answers feeding SRS queue (SRS-03 write half)** — Phase 4 by design. P3 ships the *schema* (`introduced`-field contract); P4 ships the *write path* from QCM mode.
- **Tests blancs not feeding SRS** — Phase 4 enforces this at the QCM/test boundary; nothing for P3 to implement.
- **Fiches de révision** — Phase 5.

None of the above is scope creep — all are explicitly later phases in the locked roadmap or explicit deferrals.

</deferred>

---

*Phase: 3-flashcards-srs*
*Context gathered: 2026-05-23*
