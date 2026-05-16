# Phase 1: Shell & Gateway - Context

**Gathered:** 2026-05-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Deployable walking skeleton for the v2.0 "Étude" study surface: extract the shared chassis CSS, scaffold an empty 4-tab `outils.html`, and un-hide the reserved `#outils` gateway in the Hub — with **zero visual/functional regression** on the v1.0 Hub (Accueil/Découverte/Biblio) and the frozen root QHSE Trainer.

Covers requirements **SHELL-01..05, PERSIST-02**. No study-mode logic, no content bank, no SM-2 — those are Phases 2–5. This phase ships the structure the later phases plug into.

</domain>

<decisions>
## Implementation Decisions

### chassis.css extraction
- **D-01:** Extract the inline `<style>` block (`qhse-cesi/index.html` lines 15–640, ~626 lines) **verbatim** into a new `qhse-cesi/chassis.css`. No reorganization, no rule cleanup, no renaming — byte-identical move so v1.0 visual output is provably unchanged (SHELL-04 hard constraint).
- **D-02:** Both `index.html` and `outils.html` reference it via a single `<link rel="stylesheet" href="chassis.css">`. No build step, no preprocessor (PERSIST-02 / spec D-V2-05).
- **D-03:** Page-specific rules (Biblio cards, Découverte prose) live in `chassis.css` too and are simply unused on `outils.html` — accepted as harmless dead CSS (~few KB). Splitting shared-vs-specific was explicitly rejected: classification risk → v1.0 regression, which SHELL-04 forbids.

### outils.html tab shell
- **D-04:** 4 tabs in locked order: **Flashcards · Fiches de révision · QCM · Tests blancs**.
- **D-05:** Tab switching = **minimal vanilla JS + proper ARIA tab pattern** (`role="tablist"/"tab"/"tabpanel"`, `aria-selected`, arrow-key navigation, `[hidden]` toggle on panels, `location.hash` sync). Rationale: `outils.html` is inherently a JS app (P3–P5 add SM-2, timers, localStorage); a CSS-only radio-hack would fight ARIA correctness and PERSIST-01's "restore last mode". This is a deliberate, scoped departure from the v1.0 chassis's CSS-only philosophy — it applies to `outils.html` only; the Hub's CSS-only burger/scrollspy stay untouched.
- **D-06:** Each empty tab panel in Phase 1 shows a dated placeholder (e.g. "Mode Flashcards — arrive en Phase 3"). The deployed P1 skeleton must read as intentional and be owner-verifiable, not look broken/unfinished.

### #outils Hub gateway
- **D-07:** Un-hide the two reserved `hidden` attributes: the nav `<li hidden>` at `index.html:674` and `<section id="outils" … hidden>` at `index.html:793`. This is the *only* structural edit to the frozen v1.0 `index.html` besides the `chassis.css` `<link>` swap (spec Architecture §Hub gateway).
- **D-08:** Replace the section's placeholder copy ("Réservé V2 — flipping the two hidden attributes unlocks this surface.") with a short editorial paragraph + a mini-list naming the 4 modes + a primary link/button to `outils.html`. Tone consistent with Découverte/Biblio.
- **D-09:** The link to `outils.html` opens in the **same tab** (internal Hub navigation). The v1.0 `target="_blank" rel="noopener noreferrer"` rule applies to *external* links only — `outils.html` is part of the same site.

### Claude's Discretion
- **Navigation model (gray area not selected for discussion):** Keep the existing in-page anchor pattern — the nav "Outils" item stays `href="#outils"` (consistent with every other Hub nav item), smooth-scrolls to the `#outils` section, and that section contains the primary link to `outils.html`. Cross-document view transitions between the single-page Hub and `outils.html` are an **optional progressive enhancement**, not required for P1 (plain link is the baseline; if added, must degrade gracefully).
- Exact placeholder wording, ARIA label strings, and the gateway paragraph copy are at Claude's discretion within the tone/structure decided above.
- Whether the tab JS lives inline in `outils.html` or is a tiny separate file: planner's call (no build step either way; spec names `outils-data.js` for the content bank specifically, not for shell JS).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Authoritative milestone design (read first)
- `.planning/V2-ETUDE-SPEC.md` — owner-approved, locked decisions D-V2-01..06; the **Architecture** section specifies the `chassis.css` / `outils.html` / `outils-data.js` split, zero build, and the Hub-gateway un-hide path (`index.html:674` + `:793`). MUST read before planning. Do not re-litigate its locked decisions.

### Phase scope & requirements
- `.planning/ROADMAP.md` — Phase 1 "Shell & Gateway" goal + 5 success criteria (owner-verifiable against the live URL)
- `.planning/REQUIREMENTS.md` — SHELL-01..05, PERSIST-02 (full text + traceability)

### v1.0 design contract to preserve (visual coherence + zero regression)
- `.planning/milestones/v1.0-phases/01-skeleton-chassis-visual-identity/01-CONTEXT.md` — v1.0 chassis decisions: warm-dark OKLCH palette, Fraunces+Inter+JetBrains Mono, CSS-only burger/scrollspy, print stylesheet, the reserved `#outils` placeholder rationale
- `.planning/milestones/v1.0-ROADMAP.md` — v1.0 Phase 1 success criteria the chassis must keep satisfying after extraction

### File being refactored
- `qhse-cesi/index.html` — single-file v1.0 Hub (944 lines). Landmarks: `<style>` block lines **15–640**; CSS-only burger lines ~650–680; reserved nav `<li hidden>` line **674**; `<section id="outils" … hidden>` line **793** (placeholder copy line ~796); `<script>` block line **807**; scrollspy `IntersectionObserver` line ~825.

### Discipline (forward-looking; mostly P2 but PERSIST-02 invariant)
- `C:\Users\Lasmoles\.claude\projects\C--Users-Lasmoles-mes-apps-claude\memory\feedback_verify_links_before_ship.md` — content-verified URL discipline; relevant when the gateway/placeholders reference anything external (none expected in P1) and binding for the P2 content bank.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Entire v1.0 chassis CSS** (`index.html` l.15–640): tokens, reset, type scale, components, utilities — becomes `chassis.css` unchanged; `outils.html` inherits the full visual identity for free.
- **CSS-only burger nav pattern** (hidden checkbox + label, `:has()`/`:checked`, JS only sets `checked=false` on link tap): the Hub keeps this as-is. `outils.html` does NOT reuse it for tabs (D-05 chose JS+ARIA tabs instead).
- **Reserved un-hide points already designed in v1.0**: nav `<li hidden>` (l.674, `href="#outils" data-target="outils"`) and `<section id="outils" … hidden>` (l.793) with explicit placeholder text confirming "flipping the two hidden attributes unlocks this surface." The unlock path is pre-engineered — Phase 1 executes it, doesn't invent it.
- **Print stylesheet rules** in the chassis (move with the verbatim extraction) — reused later by Fiches (Phase 5); no P1 action beyond keeping them in `chassis.css`.

### Established Patterns
- Single-file, zero-build, no-deps, dark-default, mobile+desktop. v2.0 relaxes "single file" → multi-file (`chassis.css`, `outils.html`, `outils-data.js`) but **keeps zero build** (PERSIST-02).
- All Hub nav items are in-page hash anchors (`href="#..."`) with smooth scroll + `scroll-margin-top`; the `#outils` item must stay consistent with this.
- Citation/provenance + content-verified-URL discipline is a project invariant (binds the P2 content bank, not P1's structural work).

### Integration Points
- `chassis.css` `<link>` added to `index.html` `<head>` (replacing the inline `<style>`) and to the new `outils.html` `<head>`.
- Two `hidden` attribute removals in `index.html` (l.674, l.793) + gateway section copy rewrite — the only edits to the frozen v1.0 page besides the `<link>` swap.
- `outils.html` tab shell is the mount surface Phases 3–5 plug their engines into; the dated placeholders mark exactly where.
- Deploy unchanged: push to `main` → GitHub Actions → Vercel; live at `…/qhse-cesi/` and new `…/qhse-cesi/outils.html` (~60s). Root QHSE Trainer untouched.

</code_context>

<specifics>
## Specific Ideas

- "Clean refactor, not a rewrite" (spec wording) — the chassis extraction must be provably non-mutating: a diff of rendered v1.0 pages before/after should be empty.
- Empty tabs should say which phase brings them online ("arrive en Phase 3/4/5") so the owner-verify of the P1 skeleton is unambiguous.
- Gateway copy should feel like the rest of the Hub's editorial voice, not a generic "Coming soon" banner.

</specifics>

<deferred>
## Deferred Ideas

- **Cross-document view transitions** between the Hub and `outils.html` — optional progressive enhancement; revisit if desired during a polish pass, not required for P1.
- All study-mode behavior (flashcard rendering, SM-2 scheduler, QCM engine, timed tests, fiches, localStorage) — Phases 3–5 by design.
- The 200+ sourced content bank (`outils-data.js`) — Phase 2.

None of the above is scope creep — all are explicitly later phases in the locked roadmap.

</deferred>

---

*Phase: 1-shell-gateway*
*Context gathered: 2026-05-16*
