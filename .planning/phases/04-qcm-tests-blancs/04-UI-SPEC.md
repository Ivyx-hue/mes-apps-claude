---
phase: 4
slug: qcm-tests-blancs
status: draft
shadcn_initialized: false
preset: none
created: 2026-05-25
---

# Phase 4 — UI Design Contract (QCM + Tests blancs)

> Visual + interaction contract for the new surfaces mounted inside `#panel-qcm` and `#panel-tests` of `outils.html`.
> The design system (chassis.css, tokens, fonts, layer order) is **FROZEN** from Phases 1–3 and is **not re-designed here**.
> Phase 3 `03-UI-SPEC.md` is the authoritative pattern reference — Phase 4 reuses the same OKLCH tokens, the same Fraunces/Inter/JetBrains Mono typography hierarchy, the same component shadow/radius primitives, and the same animation discipline (zero declared transitions; reveal is an instant `[hidden]` toggle).
> This contract locks only the new components Phase 4 adds: the **QCM engine** (theme picker → stem → 4 choices → auto-reveal panel → "Suivant"), the **Tests blancs engine** (start screen → timer + progress + Précédent/Suivant/Abandonner → final results screen), and the **score history table** at the bottom of `#panel-tests`.
> All new CSS lives inside `@layer components` in `chassis.css`, gated by `#panel-qcm` / `#panel-tests` parent selectors and prefixed `.qz-*` (CONTEXT.md decision). **No chassis tokens are added.** **No chassis tokens are mutated.**

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none (vanilla HTML + CSS + JS — project invariant PERSIST-02 / CLAUDE.md "no build step") |
| Preset | not applicable |
| Component library | none (hand-authored components prefixed `.qz-*`, scoped to `#panel-qcm` / `#panel-tests`) |
| Icon library | none — Phase 4 ships **no icon library**. Two text glyphs are reused: `✓` (U+2713) and `✗` (U+2717) for correct / incorrect badges. These are typographic characters rendered in the inherited sans face; they are NOT loaded SVGs and require zero asset pipeline. Lucide inline SVGs remain deferred. |
| Font | Inherited from chassis.css: **Inter** (`--font-sans`, body + choices + buttons), **Fraunces** (`--font-serif`, question stem + score hero), **JetBrains Mono** (`--font-mono`, timer + progress counter `5/20` + score `17/20` + `source.ref` + history-table date column). No new font loaded. |

**Scoping rule (binding):**
- All Phase 4 selectors **MUST** start with `#panel-qcm` OR `#panel-tests` (parent-selector scoping) — never a bare `.qz-*` selector.
- Class names **MUST** be prefixed `.qz-` (shared "quiz" prefix covering both QCM révision rapide and Tests blancs since both render `question + 4 choices + reveal panel` identically; they diverge only on the wrapper state machine).
- **DO NOT** add new `:root` custom properties. Reuse existing tokens: `--bg-1`, `--bg-2`, `--ink-1`, `--ink-2`, `--ink-3`, `--accent`, `--accent-soft`, `--success`, `--warning`, `--alert`, `--border-subtle`, `--focus-ring`, `--space-*`, `--step-*`, `--radius-*`.
- **DO NOT** modify any existing chassis rule (including the Phase 3 `.fc-*` block). Phase 4 is **additive only**.
- The two IIFE consumers share one CSS namespace and one helper `renderQuestion(item, opts)` defined once in `outils.html` (CONTEXT.md "Module layout" decision).

---

## Spacing Scale

**Inherited from chassis.css `@layer tokens` — Phase 4 reuses, does not redefine.**

| Token | Value | Phase 4 usage |
|-------|-------|---------------|
| `--space-xs` | 0.25rem (4px) | Gap inside the inline picked-choice badge (`✓` glyph + choice text); padding-block of correct/incorrect inline-flex; spacing between progress digits inside the mono `5/20` block |
| `--space-sm` | 0.5rem (8px) | Vertical gap between stacked choice buttons on **all** viewports (D-08 forbids 2×2 reshuffle that would mess with `correct` index); padding inside `.qz-reveal` source line; gap between Précédent / Suivant in test footer on mobile |
| `--space-md` | 1rem (16px) | Padding inside `.qz-card`; gap between stem and choices; gap between reveal panel sections (badge, canonical answer, explanation, source); padding inside history-table cells |
| `--space-lg` | 1.5rem (24px) | Padding around the card; vertical rhythm between theme picker / card / footer-controls / history sections; padding inside `.qz-results` score hero panel |
| `--space-xl` | 2rem (32px) | Top padding of `#panel-qcm` / `#panel-tests` content blocks on desktop; gap between final-results score hero and the per-question corrections list |
| `--space-2xl` | 3rem (48px) | Reserved — not used in Phase 4 |
| `--space-3xl` | 4rem (64px) | Reserved — not used in Phase 4 |

### Exceptions (Phase 4 specific)

| Exception | Value | Justification |
|-----------|-------|---------------|
| Choice button **minimum touch target** | 44 × 44px (`min-height: 44px`) — width fluid (full-width via `display: block` on mobile and desktop) | WCAG 2.5.5 — owner studies on phone. Wider than Flashcards grade button because choice text is long-form regulatory prose (e.g. `« 40 ans, en raison de la latence de certaines maladies professionnelles »`) and `min-height: 44px` is the floor, not the equal value — choices auto-grow to wrap their content. |
| "Suivant" button **minimum touch target** | 44 × 44px | Same WCAG rationale. Primary CTA after reveal. |
| "Démarrer un test" button **minimum touch target** | 44 × 44px | Same. |
| "Précédent" / "Suivant" navigation buttons in test mode **minimum touch target** | 44 × 44px | Same. Free back/forward (D-07) is the test's keyboard contract; buttons are the touch equivalent. |
| "Abandonner" button **minimum touch target** | 44 × 44px | Same. Triggers native `confirm()` — see Copywriting Contract. |
| Theme `<select>` **minimum touch target** (both panels) | 44px height | Same. Identical treatment to the Phase 3 `#fc-theme-select` rule. |
| History-table row tap target | rows are passive (read-only — D-12 confirmed: no expand-on-tap) | History rows are NOT interactive — they carry no `<button>`, no `<a>`, no `onclick`. No touch-target floor required. Cells use 8px (`--space-sm`) vertical padding for visual density. |

All seven exceptions are touch-target floors, **not** new spacing tokens. They are enforced via `min-height: 44px` on the named control selectors only.

---

## Typography

**Inherited from chassis.css. Three families, fluid scale. Same role-mapping discipline as Phase 3.**

### QCM révision rapide (`#panel-qcm`)

| Role | Token | Family | Weight | Line height | Phase 4 element |
|------|-------|--------|--------|-------------|-----------------|
| Theme picker label + `<select>` text | `--step-0` (14px) | `--font-sans` | 500 (label) / 400 (option) | 1.4 | `.qz-theme label`, `#qz-qcm-theme-select` |
| **Question stem (focal)** | `--step-3` (clamp 20–24px) | **`--font-serif`** (Fraunces) | 600 | 1.3 | `[data-qz-question]` — Fraunces matches the Flashcards recto rhythm; same component, same focal weight. `text-wrap: balance`. |
| **Choice button text** | `--step-1` (16px) | `--font-sans` | 500 | 1.4 | `.qz-choices > button` — Inter 500 reads as actionable but not louder than the stem. Body register. |
| Choice button "letter" prefix (A / B / C / D) | `--step-0` (14px) | **`--font-mono`** | 500 | 1 | The leading uppercase letter + middot inside each choice (`A · …`). Mono ties the letter to keyboard semantics (Tab order). |
| Reveal panel — badge `✓ Correct` / `✗ Incorrect` | `--step-1` (16px) | `--font-sans` | 600 | 1 | `.qz-reveal__badge` — sans 600 reads as decisive. Glyph + word both present (color is never the only differentiator). |
| Reveal panel — canonical answer | `--step-2` (clamp 17–18px) | `--font-sans` | 600 | 1.5 | `[data-qz-answer]` — identical treatment to Flashcards `[data-fc-answer]`. The eye lands here first when reveal expands. |
| Reveal panel — explanation prose | `--step-1` (16px) | `--font-sans` | 400 | 1.6 | `[data-qz-explanation]` — body register; `color: var(--ink-2)` to recede. Identical to Flashcards `[data-fc-explanation]`. |
| Reveal panel — source line | `--step-0` (14px) | `--font-sans` (authority text) + `--font-mono` (ref code) | 400 | 1.5 | `[data-qz-source]` — `authority` in sans, `ref` (e.g. `R4121-1`) wrapped in inline `<code>` for mono treatment. Identical to Flashcards. |
| "Suivant" button label | `--step-1` (16px) | `--font-sans` | 600 | 1 | Sans 600 — same weight as Flashcards grade buttons. |
| "Suivant" keyboard hint (desktop ≥48rem only) | `--step--1` (12px) | `--font-mono` | 500 | 1 | `Espace ou Entrée`, `color: var(--ink-3)`. Mirrors Flashcards reveal-hint pattern. |

### Tests blancs (`#panel-tests`)

| Role | Token | Family | Weight | Line height | Phase 4 element |
|------|-------|--------|--------|-------------|-----------------|
| Theme picker label + `<select>` text (start screen) | `--step-0` (14px) | `--font-sans` | 500 / 400 | 1.4 | `.qz-theme label`, `#qz-test-theme-select` |
| "Démarrer un test" button label (start screen primary CTA) | `--step-1` (16px) | `--font-sans` | 600 | 1 | Sans 600 — primary CTA register. |
| **Timer (`MM:SS`)** | `--step-2` (clamp 17–18px) | **`--font-mono`** (JetBrains Mono) | 500 | 1 | `[data-qz-timer]` — mono signals "data / live counter" (same family treatment as Flashcards bandeau counters). Visible top-left of the test view. |
| Timer label ("Temps restant") sr-only | `--step-0` | `--font-sans` | 500 | 1.4 | `.qz-timer__label.sr-only` — visually hidden, present for screen readers via `aria-live="off"` (announcement cadence is rude every second; see ARIA contract below). |
| **Progress indicator** (`5/20`) | `--step-2` (clamp 17–18px) | **`--font-mono`** | 500 | 1 | `[data-qz-progress]` — mono, same size as timer for visual balance. Visible top-right of test view, mirroring timer position. |
| Question stem (test mode — same as QCM) | `--step-3` (clamp 20–24px) | `--font-serif` | 600 | 1.3 | `[data-qz-question]` — reused selector; one renderer for both panels. |
| Choice button text (test mode — same as QCM) | `--step-1` (16px) | `--font-sans` | 500 | 1.4 | `.qz-choices > button` — reused. |
| Précédent / Suivant button labels | `--step-1` (16px) | `--font-sans` | 600 | 1 | Sans 600. |
| Abandonner button label | `--step-0` (14px) | `--font-sans` | 500 | 1 | Smaller weight + smaller size — secondary register, the destructive action shouldn't shout (CONTEXT.md "Tolerant by default" tone). |
| Timeout banner ("Temps écoulé") | `--step-1` (16px) | `--font-sans` | 600 | 1.4 | `.qz-timer-banner` — sans 600, `color: var(--alert)`. Banner appears at 00:00 (D-13). |
| **Score hero (final results — `17/20`)** | `--step-5` (clamp 36–64px) | **`--font-serif`** (Fraunces) | 600 | 1.1 | `[data-qz-score]` — display weight, Fraunces matches the Hub h1 rhythm. Largest number on the page; nothing else competes. |
| Score hero label ("Score final" / "Bravo — 17/20") | `--step-2` (clamp 17–18px) | `--font-serif` | 600 | 1.3 | `.qz-results__heading` — serif sub-heading. |
| Per-question correction — question stem | `--step-2` (clamp 17–18px) | `--font-serif` | 600 | 1.3 | `.qz-correction__question` — slightly smaller than active stem because the user is now scanning, not deciding. |
| Per-question correction — answer / explanation / source | `--step-1` / `--step-1` / `--step-0` | `--font-sans` / `--font-sans` / `--font-sans`+`--font-mono` | 400 / 400 / 400 | 1.6 / 1.6 / 1.5 | Identical token mapping to the QCM reveal panel; one CSS rule serves both. |
| History-table caption (`<caption>`) | `--step-0` (14px) | `--font-sans` | 500 | 1.4 | `.qz-history caption` — `Historique des tests` (visible, not sr-only). |
| History-table header cells | `--step-0` (14px) | `--font-sans` | 600 | 1.4 | `.qz-history th` — sans 600. |
| History-table data cells — date column | `--step-0` (14px) | **`--font-mono`** | 400 | 1.4 | `.qz-history td.qz-history__date` — mono signals "data" / sortable date (identical pattern to `.biblio-card__date`). |
| History-table data cells — theme column | `--step-0` (14px) | `--font-sans` | 400 | 1.4 | `.qz-history td.qz-history__theme` — French full theme name (`DUERP`, `ISO 9001`, `Tous les thèmes`, …) from the same lookup used by the theme picker. |
| History-table data cells — score column | `--step-0` (14px) | **`--font-mono`** | 500 | 1.4 | `.qz-history td.qz-history__score` — mono, weight 500, format `17/20`. |
| Empty-history inline message | `--step-1` (16px) | `--font-sans` | 400 | 1.6 | `.qz-history__empty` — `color: var(--ink-2)`. |

**Body line-height: 1.5–1.6 (chassis default).** **Heading line-height: 1.1–1.3 (chassis default).** No new lh values introduced.

---

## Color

**60 / 30 / 10 split — inherited from chassis. Dark default, `light-dark()`-aware.**

| Role | Token | OKLCH (dark mode reference) | Phase 4 usage |
|------|-------|------------------------------|---------------|
| Dominant (60%) — page background | `--bg-1` | `oklch(15% 0.012 65)` | Page surface; `#panel-qcm` and `#panel-tests` themselves use `--bg-1`. Choice buttons in idle state: `background: transparent` (inherits `--bg-1`). |
| Secondary (30%) — card surfaces | `--bg-2` | `oklch(19% 0.014 65)` | `.qz-card` background; `.qz-reveal` panel background (inside the card, subtle stack via `border-top: 1px solid var(--border-subtle)` separator — no nested background change); `.qz-results` score hero panel background; history-table odd rows (`tr:nth-child(odd) { background: color-mix(in oklch, var(--bg-2) 50%, transparent); }` — subtle zebra). |
| Accent (10%) | `--accent` / `--accent-soft` | `oklch(74% 0.10 78)` | **Reserved list — see below** |
| Destructive | `--alert` | `oklch(64% 0.18 30)` | **Three Phase 4 uses (only):** (a) Incorrect choice — picked-state border + `✗` glyph + badge text. (b) Timer in last 5 minutes (`time ≤ 300s`) — color shifts from `var(--ink-1)` to `var(--alert)`. (c) Timeout banner background-tint (`background: color-mix(in oklch, var(--alert) 12%, var(--bg-2))`) + banner text color `var(--alert)`. |
| Success signal | `--success` | `oklch(70% 0.13 145)` | **Two Phase 4 uses (only):** (a) Correct choice (the user picked the right one) — picked-state border + `✓` glyph + badge text. (b) Score hero color tier — see "Score color tiers" below. |
| Warning signal | `--warning` | `oklch(74% 0.13 70)` | **One Phase 4 use:** score hero "middle" tier (12–14/20) color — see "Score color tiers" below. **NOT** used for timer states (timer goes straight from neutral to alert; no intermediate warning) — the test is tolerant per D-13, no need to manufacture mid-stress signaling. |
| Neutral ink scale | `--ink-1` / `--ink-2` / `--ink-3` | already declared | Body text, secondary prose, source-line tertiary text, history-cell text. Same usage as biblio + Phase 3 flashcards. |
| Focus ring | `--focus-ring` | `oklch(82% 0.18 250)` | All Phase 4 focusable elements via inherited `:focus-visible` rule (chassis line 142). **Do not override.** Choice buttons get the standard 3px outline; the picked-state semantic colors (success/alert) are **additive** to the focus ring, not a replacement — focus visibility is never compromised by selection state. |

### Accent reserved for (explicit list — never "everywhere")

The accent (`--accent` / `--accent-soft`) is used in Phase 4 **only** for:

1. **The "Suivant" button in QCM mode** — primary CTA after reveal. Background `var(--accent)`, ink `var(--bg-1)` — identical treatment to Phase 3 `[data-fc-reveal]`. Same OKLCH literal, same border, same hover `filter: brightness(1.05)`. Visually consistent across modes.
2. **The "Démarrer un test" button on the Tests blancs start screen** — primary CTA. Same treatment as "Suivant" / Flashcards `Révéler`. Three primary CTAs across the app, all identical chrome — coherent system.
3. **The active state of the theme `<select>`** — `border-color: var(--accent)` when focused (same as Phase 3 `#fc-theme-select:focus-visible`).
4. **Score hero "high" tier (≥ 15/20)** — `color: var(--accent)` on `[data-qz-score]` when `score / total ≥ 0.75`. See "Score color tiers" below.

Accent is **NOT** used for:
- Choice buttons in any state (they use border + ink + semantic success/alert only).
- The question stem (uses `--ink-1`).
- Précédent / Suivant navigation in test mode (these are secondary, equal-weight nav controls — border `var(--border-subtle)`, transparent background, text `var(--ink-1)`).
- "Abandonner" button (uses `--ink-2` text on transparent — visually less than nav controls; destructive but tolerant tone per D-15).
- The timer (uses `--ink-1` normal, `--alert` at-zero — no accent state).
- The progress indicator (uses `--ink-1` always — informational, not a CTA).
- The history table (uses ink scale only — passive read-only).

### Choice button color contract (the four answer buttons)

Equal visual weight pre-interaction (same border, same padding, same height, same background). Differentiation comes from semantic state on click (auto-reveal — D-01). The semantics map:

| State | Border | Background | Text | Glyph (leading) | Glyph color |
|-------|--------|------------|------|-----------------|-------------|
| **Idle** (pre-click) | `1px solid var(--border-subtle)` | transparent | `var(--ink-1)` | `A · ` / `B · ` / `C · ` / `D · ` (mono) | `var(--ink-3)` |
| **Hover / focus-visible** (pre-click) | `1px solid var(--accent)` + focus ring inherited from chassis | transparent | `var(--ink-1)` | unchanged | `var(--ink-3)` |
| **Picked + correct** (the chosen choice IS the right answer) | `2px solid var(--success)` | `color-mix(in oklch, var(--success) 12%, transparent)` | `var(--ink-1)` | unchanged | unchanged (letter stays mono ink-3) |
| **Picked + incorrect** (the chosen choice is wrong) | `2px solid var(--alert)` | `color-mix(in oklch, var(--alert) 12%, transparent)` | `var(--ink-1)` | unchanged | unchanged |
| **Not picked + correct** (revealed canonical answer — user picked something else) | `2px dashed var(--success)` | transparent | `var(--ink-1)` | unchanged | unchanged |
| **Not picked + not correct** (the two distractor choices the user did not pick) | `1px solid var(--border-subtle)` | transparent | `var(--ink-2)` (dimmed) | unchanged | unchanged |
| **Disabled** (post-reveal, all clicks ignored) | inherits the four above states | inherits | inherits | unchanged | inherits — `pointer-events: none` is the only addition |

**In Tests blancs mode (test running)** the choice state machine is different — the click does NOT reveal, it merely marks the choice as "selected for this question". Until final submit, the only visible state is **Idle** + a single **Selected** state:

| State (test mode only) | Border | Background | Text |
|------------------------|--------|------------|------|
| **Idle** | `1px solid var(--border-subtle)` | transparent | `var(--ink-1)` |
| **Selected** (the user picked this for this question; can change later — D-07 free nav) | `2px solid var(--accent)` | `color-mix(in oklch, var(--accent) 8%, transparent)` | `var(--ink-1)` |

The accent border + 8% tint is the lightest "marked" treatment in the system — clearly visible, not loud. Free back/forward navigation keeps it reversible (clicking another choice replaces selection; clicking the same choice toggles off — see Keyboard contract).

**On the final results screen (test ended)** every question's choices are rendered in the QCM-mode picked/correct/incorrect contract above — the user can now see all answers + corrections inline.

**Accessibility:** color is **never** the only differentiator.
- Each picked-state carries the leading `✓` / `✗` glyph (added to the `aria-label` + visually in the badge above the explanation, but **NOT** inside the choice button text itself — keeps the button text equal to the original choice prose for screen-reader echo on re-focus).
- The reveal-panel badge carries the French word: `Correct` or `Incorrect`.
- A monochrome user receives full information via glyph + word + dashed-vs-solid border (the "not picked + correct" dashed style is distinguishable without color).

### Score color tiers (final results hero)

The `[data-qz-score]` element (the large `17/20` Fraunces number) takes one of three colors based on the ratio:

| Ratio | Color | Range | Rationale |
|-------|-------|-------|-----------|
| `score / total ≥ 0.75` | `var(--accent)` | 15–20 / 20 | Owner is exam-ready on this theme. Use the brand warm-yellow — celebratory but sober (CONTEXT.md tone: "Bravo — 17/20"). |
| `0.50 ≤ score / total < 0.75` | `var(--warning)` | 10–14 / 20 | Mid-tier — needs more revision. The warning ochre matches the "Free-revision banner" Phase 3 treatment. |
| `score / total < 0.50` | `var(--alert)` | 0–9 / 20 | Lapse — back to flashcards. Same `--alert` used for incorrect-choice borders; consistent semantic signaling. |

The color tier is a **single ink-color swap on `[data-qz-score]` only**. No background changes, no animation, no celebratory chrome. The label text `Bravo — ` / `Score final — ` (see Copywriting) carries the linguistic register; color is the visual echo.

---

## Copywriting Contract

All copy is **French**, consistent with the project's voice (CLAUDE.md "Language: French in conversation") and the Phase 3 register (sober, exam-grade, `tu` address). No emojis. No exclamation marks except in `Bravo — 17/20` (single celebration budget, same as Phase 3 `Bravo — file vide pour aujourd'hui.`).

### QCM révision rapide (`#panel-qcm`)

| Element | Copy |
|---------|------|
| Panel heading (visually hidden — `<h2 class="sr-only">`) | `QCM — révision rapide` |
| Theme picker label | `Thème` |
| Theme picker default option | `Tous les thèmes` |
| Theme picker option labels | French full names from the same source-of-truth lookup as Phase 3 (e.g. `duerp` → `DUERP`, `iso-9001` → `ISO 9001`, `acronymes` → `Acronymes`, `risque-routier` → `Risque routier`) — **planner extracts these from the existing `outils-data.js` THEMES set, identical to Phase 3 fc-theme list**. Order: `Tous les thèmes` first, then 15 themes in `outils-data.js` source order. |
| Choice button — `aria-label` template | `Choix {LETTRE} : {texte du choix}` — e.g. `Choix A : R4121-1` |
| Reveal panel badge — correct | `✓ Correct` |
| Reveal panel badge — incorrect | `✗ Incorrect` |
| Reveal panel — canonical answer prefix (sr-only) | `Réponse correcte :` |
| Reveal panel — explanation prefix (sr-only) | `Explication :` |
| Reveal panel — source prefix (sr-only) | `Source :` |
| "Suivant" button (Primary CTA after reveal) | `Suivant` |
| "Suivant" button — keyboard hint (desktop ≥48rem only) | `Espace ou Entrée` (rendered in `--ink-3` `--step--1` mono — mirrors Flashcards reveal-hint pattern) |
| Empty pool — filtered theme has no QCM items | `Aucun QCM pour ce thème. Choisis un autre thème.` (rendered inside `.qz-card` body; theme picker stays usable) |
| Bank-load failure (degradation echo of Phase 3) | `Impossible de charger la banque de questions. Recharge la page ou vérifie que outils-data.js est bien servi.` (rendered inside `.qz-card`, `color: var(--ink-2)`, no red alert chrome) |

### Tests blancs (`#panel-tests`)

| Element | Copy |
|---------|------|
| Panel heading (visually hidden) | `Tests blancs chronométrés` |
| **Start screen — heading** (visible) | `Démarrer un test blanc` |
| Start screen — body explanation | `20 questions tirées au hasard · 20 minutes · navigation libre. Le test ne modifie pas tes flashcards.` |
| Start screen — theme picker label | `Thème` |
| Start screen — theme picker default | `Tous les thèmes` |
| Start screen — primary CTA | `Démarrer un test` |
| Start screen — pool-too-small inline error (theme pool < 20 QCMs) | `Pool insuffisant pour ce thème ({N} QCM disponibles, 20 requis). Choisis "Tous les thèmes" ou un autre thème.` (rendered below the picker, color `var(--ink-2)`; CTA is disabled via `disabled` attribute) |
| **Test running — timer label** (sr-only) | `Temps restant` |
| Test running — timer format | `{MM}:{SS}` — e.g. `19:42`, `00:35`, `00:00` (always 2-digit padded) |
| Test running — progress label (sr-only) | `Question {N} sur {TOTAL}` |
| Test running — progress format | `{N}/{TOTAL}` — e.g. `5/20` |
| Test running — Précédent button | `Précédent` |
| Test running — Suivant button | `Suivant` |
| Test running — Suivant button on the last question (N === TOTAL) | `Terminer le test` (label morphs on the last question; same `<button>` element, same DOM position, label swap only) |
| Test running — Abandonner button | `Abandonner` |
| **Abandon confirmation modal** (native `confirm()` — D-15) | `Es-tu sûr de vouloir abandonner ? Tes réponses seront perdues.` |
| Timeout banner (appears at 00:00 — D-13) | `Temps écoulé — tu peux continuer.` (sober, tolerant; rendered above the timer) |
| **Final results screen — score hero (heading)** | When `score === total`: `Sans faute — {score}/{total}.` |
| | When `score / total ≥ 0.75`: `Bravo — {score}/{total}.` |
| | When `0.50 ≤ score / total < 0.75`: `À retravailler — {score}/{total}.` |
| | When `score / total < 0.50`: `Beaucoup à revoir — {score}/{total}.` |
| Final results — sub-heading | `Thème : {Theme display name}` (e.g. `Thème : DUERP` or `Thème : Tous les thèmes`) |
| Final results — corrections list intro (visible `<h3>`) | `Corrections` |
| Final results — per-question correction badge | Reuses QCM `✓ Correct` / `✗ Incorrect`. For unanswered questions: `— Non répondu` (em-dash + label, color `var(--ink-2)`, no glyph). |
| Final results — primary CTA (start a new test) | `Nouveau test` (returns to start screen) |
| **History section — heading** (visible `<h3>`, fourth child of `#panel-tests`) | `Historique des tests` |
| History — table caption (visible `<caption>` for screen readers + visual) | `Historique des tests` (same string as the heading — `<caption>` is the accessible name; the `<h3>` is removed if `<caption>` proves enough for the planner) — **planner's call: choose one OR the other, not both.** |
| History — table column headers | `Date` · `Thème` · `Score` |
| History — empty state (no tests completed yet) | `Aucun test terminé pour le moment. Lance ton premier test ci-dessus.` (rendered in place of the `<table>`, `color: var(--ink-2)`, no border) |
| History — row count visible affordance (sr-only mirror) | `{N} tests enregistrés.` (announced via `aria-live="polite"` on a sibling sr-only `<p>` after writes — keeps screen readers in sync) |

### Voice rules (carried from Phase 3 unchanged)

- Address the owner with `tu`.
- No marketing voice. The four-tier score heading is the entire celebration / lament budget. `Sans faute — 20/20.` is the one "wow" line; `Beaucoup à revoir — 7/20.` is the one "ouch" line. Both stay sober.
- No nudging copy ("Recommence !", "Ne lâche rien !"). The owner is preparing a Bachelor — respect their focus.
- No technical jargon in error copy ("DOMContentLoaded", "fetch failed", "localStorage quota"). User-facing copy speaks French QHSE register only.

### Destructive actions

| Action | Confirmation approach | Copy |
|--------|----------------------|------|
| **Abandonner un test en cours** | Native `confirm()` modal (D-15 — UI-researcher's discretion, locked here to native `confirm()`) | `Es-tu sûr de vouloir abandonner ? Tes réponses seront perdues.` |
| **Reset score history** | **None in Phase 4.** No "Effacer l'historique" button. The FIFO cap (D-11) handles bound; manual reset is devtools-only (`localStorage.removeItem('qhse-scores-v1')`). Deferred to a hypothetical settings panel if it ever surfaces as a need. |
| **Tests blancs writing to `qhse-srs-v1`** | **Architecturally forbidden** (D-V2-03, asserted by `verify-quiz.cjs`). Not a UI confirmation — a structural invariant. No copy needed. |

**Rationale for native `confirm()` over custom `<dialog>`:**
- Zero JS to write (project favors vanilla minimal-code).
- Automatic focus trap, automatic ESC-to-cancel, automatic screen-reader announcement — all delivered by the browser without our code.
- The destructive action is a single yes/no, no extra fields, no rich content — `<dialog>` would be over-engineered.
- Mobile-friendly: native modal renders consistently across iOS Safari + Android Chrome (the owner's two real targets).
- The copy is the entire affordance — no custom styling work.

The accessibility audit gate: `confirm()` is WCAG-compliant; the browser provides modal semantics, focus management, and keyboard escape. No further work needed.

---

## Layout & Interaction Contracts

**This section is Phase-4-specific and not in the standard template — it carries the interaction decisions the planner and executor need.**

### Composition: `#panel-qcm` (top-to-bottom)

```
┌───────────────────────────────────────────────────────────┐
│ <h2 class="sr-only">QCM — révision rapide</h2>             │
├───────────────────────────────────────────────────────────┤
│ .qz-theme                                                  │
│   Thème  [ Tous les thèmes        ▾ ]                      │
├───────────────────────────────────────────────────────────┤
│ .qz-card  (the focal element)                              │
│                                                            │
│   [Pre-reveal:]                                            │
│     <h3 data-qz-question>…question Fraunces 20–24…</h3>    │
│     <div class="qz-choices">                               │
│       <button>A · choice text…</button>                    │
│       <button>B · choice text…</button>                    │
│       <button>C · choice text…</button>                    │
│       <button>D · choice text…</button>                    │
│     </div>                                                 │
│                                                            │
│   [Post-reveal (auto on click — D-01):]                    │
│     <div class="qz-reveal" data-qz-reveal>                 │
│       <p class="qz-reveal__badge">✓ Correct</p>            │
│       <p data-qz-answer>…canonical answer…</p>             │
│       <p data-qz-explanation>…explanation ink-2…</p>       │
│       <p data-qz-source>…authority + <code>ref</code>…</p> │
│     </div>                                                 │
│     [ Suivant ]   (accent CTA, 44px; Espace ou Entrée)     │
└───────────────────────────────────────────────────────────┘
```

The pre-reveal choices stay visible after reveal — they update their visual state in place (picked/correct/incorrect/not-picked-correct/dimmed-distractor per the choice color contract). The reveal panel appears below them (instant `[hidden]` toggle, no animation), then the "Suivant" button replaces the choice grid's bottom edge as the next focus target.

### Composition: `#panel-tests` (top-to-bottom, three mutually-exclusive states)

```
┌───────────────────────────────────────────────────────────┐
│ <h2 class="sr-only">Tests blancs chronométrés</h2>         │
├───────────────────────────────────────────────────────────┤
│ STATE A — Start screen  (.qz-start, default visible)      │
│   <h3>Démarrer un test blanc</h3>                         │
│   <p>20 questions tirées au hasard · 20 minutes · …</p>   │
│   .qz-theme   Thème  [ Tous les thèmes  ▾ ]               │
│   [ Démarrer un test ]   (accent CTA)                     │
│   [ Pool insuffisant … ] (inline error, conditional)      │
├───────────────────────────────────────────────────────────┤
│ STATE B — Test running  (.qz-running[hidden by default]) │
│   ┌─────────────────────────────────────────────────┐    │
│   │ [Temps écoulé — tu peux continuer.] (banner    │    │
│   │  hidden until 00:00; D-13)                      │    │
│   │ ⏱  data-qz-timer  19:42    data-qz-progress  5/20│    │
│   └─────────────────────────────────────────────────┘    │
│   .qz-card  ← same renderer as QCM; choices are SELECT   │
│              not auto-reveal                              │
│     <h3 data-qz-question>…question…</h3>                  │
│     <div class="qz-choices">… 4 choices …</div>           │
│   ┌─────────────────────────────────────────────────┐    │
│   │ [ Précédent ] [ Abandonner ]      [ Suivant   ] │    │
│   └─────────────────────────────────────────────────┘    │
├───────────────────────────────────────────────────────────┤
│ STATE C — Results  (.qz-results[hidden by default])      │
│   .qz-results__hero (centred)                             │
│     <p class="qz-results__heading">Bravo — 17/20.</p>     │
│     <p>Thème : DUERP</p>                                  │
│   <h3>Corrections</h3>                                    │
│   <ol class="qz-corrections">                             │
│     <li> 1. ✓ Correct                                     │
│            <h4 .qz-correction__question>…stem…</h4>       │
│            …choices in picked/correct/dimmed states…      │
│            <p data-qz-answer>…canonical answer…</p>       │
│            <p data-qz-explanation>…explanation…</p>       │
│            <p data-qz-source>…</p>                        │
│     </li>                                                 │
│     <li> 2. ✗ Incorrect …  (same shape) </li>            │
│     <li> 3. — Non répondu …  (no glyph, ink-2) </li>     │
│     … 20 entries total …                                  │
│   </ol>                                                   │
│   [ Nouveau test ]    (accent CTA, returns to STATE A)    │
├───────────────────────────────────────────────────────────┤
│ HISTORY  (.qz-history, always visible in STATE A + C;    │
│           hidden during STATE B — would distract)         │
│   <h3>Historique des tests</h3>                          │
│   <table class="qz-history">                              │
│     <caption class="sr-only">Historique des tests</caption>│
│     <thead><tr><th>Date</th><th>Thème</th><th>Score</th></tr></thead>│
│     <tbody>                                               │
│       <tr><td>2026-05-25</td><td>DUERP</td><td>17/20</td></tr>│
│       <tr><td>2026-05-24</td><td>Tous</td><td>14/20</td></tr>│
│       … most recent first, cap 50 (D-11) …                │
│     </tbody>                                              │
│   </table>                                                │
└───────────────────────────────────────────────────────────┘
```

### Responsive layout (one breakpoint at `48rem` — matches chassis)

| Viewport | Theme picker | Card | Choices | Timer / progress row | Précédent / Suivant / Abandonner row | History table |
|----------|--------------|------|---------|----------------------|--------------------------------------|---------------|
| **< 48rem (mobile)** | Full width below heading; label stacks above `<select>` | Full width, `padding: var(--space-md)`, `margin-inline: 0` | Vertical stack (`flex-direction: column`, `gap: var(--space-sm)`); each `min-height: 44px`; choices auto-grow to wrap text | Single line, timer left + progress right (`justify-content: space-between`); banner stacks above when visible | Two rows: Précédent / Suivant top (50/50 split); Abandonner alone below (full width, less weight) | Horizontal scroll inside container if needed; column widths flex; date column gets `white-space: nowrap` because mono `yyyy-mm-dd` is short |
| **≥ 48rem (desktop)** | Inline: label left of `<select>`, `min-width: 16rem` | Centred, `max-width: 48rem`, `padding: var(--space-lg)`, `margin-inline: auto` | Vertical stack (same — D-08 forbids `choices` reshuffle, and 2-column would mix the natural reading order); choices grow with content | Single line, same arrangement, slightly larger comfortable spacing | Single row: Précédent left, Abandonner middle (ink-2 less weight), Suivant right (accent) | Full table width; no horizontal scroll; zebra row tint visible |

### Card visual treatment

- `.qz-card` background: `var(--bg-2)` (same 30% secondary surface as Flashcards `.fc-card` — consistent visual stacking).
- `.qz-card` border: `1px solid var(--border-subtle)`; `border-radius: var(--radius-lg)` (1rem — same focal radius as `.fc-card`).
- `.qz-card` shadow: **none** in idle state (flat, paper-on-table aesthetic — Phase 3 invariant).
- `.qz-card` padding: `var(--space-lg)` desktop / `var(--space-md)` mobile.
- `.qz-card` minimum height: `clamp(20rem, 50vh, 32rem)` — slightly taller than `.fc-card` because the 4-choice stack adds vertical mass and the card should not jitter between short stems (1-line questions) and long ones (4-line distractors).
- **No flip animation.** Reveal panel is `[hidden]` toggle on `.qz-reveal`. Choice picked-state is an instant attribute swap (`data-qz-choice-state="picked-correct"` etc.).
- **No animations on timer.** The timer decrements every second via `setInterval` — the visible number changes but the element does not pulse, glow, or shake. Color shift at `≤ 300s` is an instant ink-color swap.
- **No animation on banner reveal at 00:00.** Banner appears via `[hidden]` toggle. The `--alert` color does the attention work; motion would feel punitive in the tolerant timer model.

### Timer visual treatment

- `[data-qz-timer]`: JetBrains Mono, weight 500, `--step-2` size.
- Position: inside `.qz-running > .qz-timer-row` — left side of the row.
- Idle color: `var(--ink-1)`.
- At `time ≤ 300s` (5 minutes remaining): color shifts to `var(--alert)`. No size change, no weight change, no animation. Single OKLCH literal swap.
- At `time === 0`: color stays `var(--alert)`; the timer continues counting up display as `00:00` and DOES NOT count negative (the displayed text is `00:00` from 0 onward — the elapsed-overtime is implicit per D-13, no explicit `+MM:SS` overlay). The banner `<p class="qz-timer-banner">` un-hides above the row.
- Mono signaling: the digital-clock aesthetic carries the "this is live data" affordance — same family treatment as the Phase 3 bandeau dues counter (`[data-fc-dues]`).
- Format: always `MM:SS` with both fields zero-padded — `19:42`, `01:05`, `00:30`, `00:00`. Never `19:5` or `1:5`.

### Progress indicator visual treatment

- `[data-qz-progress]`: JetBrains Mono, weight 500, `--step-2` size (same as timer for visual balance).
- Position: inside `.qz-running > .qz-timer-row` — right side of the row, baseline-aligned with timer.
- Color: `var(--ink-1)` always (informational, never a CTA, no semantic state).
- Format: `{current}/{total}` — e.g. `5/20`. Updates on Précédent / Suivant click.
- No visual progress bar, no dots, no segments. Pure text. The two-mono-numbers row (timer + progress) IS the progress indicator — minimal, scannable, exam-paper-like. (Visual progress bars rejected because 20 dots wastes horizontal real estate at mobile width and adds DOM noise.)

### Reveal panel visual treatment (QCM mode + per-question correction in results)

- `.qz-reveal` background: transparent (sits inside `.qz-card` which is already `--bg-2`).
- `.qz-reveal` separator above: `border-top: 1px solid var(--border-subtle)`; `padding-top: var(--space-md)`; `margin-top: var(--space-md)`.
- `.qz-reveal__badge`: inline-flex, gap `--space-xs`, padding `--space-xs --space-sm`, `border-radius: var(--radius-sm)`. Glyph (`✓` or `✗`) + label (`Correct` / `Incorrect`).
  - Correct badge: `background: color-mix(in oklch, var(--success) 14%, transparent)`; `color: var(--success)`; `border: 1px solid var(--success)`.
  - Incorrect badge: `background: color-mix(in oklch, var(--alert) 14%, transparent)`; `color: var(--alert)`; `border: 1px solid var(--alert)`.
  - No-answer badge (results screen, unanswered questions): plain text `— Non répondu` in `var(--ink-2)`, no background, no border (avoid implying success/failure on an absence).

### Results screen visual treatment

- `.qz-results__hero`: centered (`text-align: center`); padding `--space-xl --space-lg`; background `var(--bg-2)`; border `1px solid var(--border-subtle)`; `border-radius: var(--radius-lg)`; `margin-block: var(--space-lg)`.
- `[data-qz-score]`: Fraunces 600, `--step-5` (clamp 36–64px), color per the Score color tier rule above. Single line, no wrapping.
- `.qz-results__heading` (the full sentence wrapping the score): Fraunces 600, `--step-2`, color `var(--ink-1)`. The score number inside it is the only color-tiered element; the rest of the sentence stays `--ink-1`. Renders as one paragraph; `[data-qz-score]` is a `<strong>` or `<span>` child that takes the tier color and the larger size.
- `.qz-corrections` is `<ol>` with explicit numbering (`list-style: decimal`) and `padding-inline-start: var(--space-xl)`; gap between `<li>` items is `--space-xl` (each correction needs breathing room).
- Each `.qz-corrections > li` has no border (the spacing carries the separation) but the `<h4 class="qz-correction__question">` is anchored visually by a 2px accent underline (same `::after` pattern as `section h2::after` in chassis line 334 — visual rhythm consistency).
- Choices inside each correction reuse the QCM picked/correct/incorrect/distractor states — one renderer, one CSS rule set.

### History table visual treatment

- `.qz-history`: `width: 100%`; `border-collapse: collapse`; `font-size: var(--step-0)`.
- `.qz-history caption`: text-align left, `padding-block-end: var(--space-sm)`, `color: var(--ink-2)`, font-weight 500. (Visible by default; if a sibling `<h3>` is also present, the caption is sr-only — planner picks one.)
- `.qz-history thead th`: `text-align: left`; `padding: var(--space-sm) var(--space-md)`; `color: var(--ink-2)`; font-weight 600; `border-bottom: 1px solid var(--border-subtle)`.
- `.qz-history tbody td`: `padding: var(--space-sm) var(--space-md)`; `color: var(--ink-1)`; `vertical-align: baseline`.
- `.qz-history__date`: mono, color `var(--ink-2)` (data dimmed slightly; same treatment as `.biblio-card__date`).
- `.qz-history__theme`: sans, `color: var(--ink-1)`.
- `.qz-history__score`: mono, weight 500, `color: var(--ink-1)`. (No color tier on score in the history — only the final-results hero does color tiering; the table stays calm and scannable.)
- Zebra row tint (subtle): `tbody tr:nth-child(odd) { background: color-mix(in oklch, var(--bg-2) 50%, transparent); }`. Even rows transparent. Aids row tracking on mobile narrow viewports without loud chrome.
- No sticky `<thead>` (cap 50 entries, no need; vertical scroll inside the section if it exceeds viewport).
- No hover state on rows (rows are passive read-only — D-12). Touch / click on a row does nothing.
- No borders between cells. The padding + zebra tint carry the row separation.
- No icons in cells. The mono date + sans theme + mono score is the entire visual vocabulary.

### Theme picker visual treatment (both panels)

- Native `<select>` — no custom dropdown chrome. Identical treatment to Phase 3 `#fc-theme-select` (chassis lines 632–651). Two new selectors `#qz-qcm-theme-select` and `#qz-test-theme-select` inherit the same rule set via shared `.qz-theme select` class.
- Width, padding, border, focus state: copied from `.fc-theme` rule body (`font: inherit`, `min-height: 44px`, `border: 1px solid var(--border-subtle)`, `border-radius: var(--radius-sm)`, `padding: 0 var(--space-md)`; mobile full-width, desktop `min-width: 16rem; max-width: 24rem`).
- Option order identical to Flashcards: `Tous les thèmes` first, then the 15 themes in `outils-data.js` source order — keeps owner mental model aligned across the three panels.

### Choice button geometry

- Display: block (full width — vertical stack, all viewports).
- `min-height: 44px`; padding: `var(--space-sm) var(--space-md)`; `border-radius: var(--radius-sm)`.
- `text-align: left` (long-form regulatory prose reads left-aligned; centred wraps look wrong on multi-line).
- `font: inherit`; `font-weight: 500`; `line-height: 1.4`.
- Leading letter prefix (`A · ` etc.) is a `<span>` inside the button, font-family `--font-mono`, color `var(--ink-3)`, `padding-inline-end: var(--space-sm)`. The rest of the button text is the raw choice string from `outils-data.js`.
- Cursor: `pointer` in idle/hover; `not-allowed` in post-reveal disabled state (QCM mode only — Tests blancs choices remain clickable for free nav).

### Keyboard contract

| Panel / State | Key | Action |
|---------------|-----|--------|
| `#panel-qcm`, choices visible (pre-reveal) | `Tab` / `Shift-Tab` | Move focus through the four choices in natural DOM order |
| `#panel-qcm`, focus on a choice button | `Enter` / `Space` | Pick that choice (= auto-reveal — D-01); reveal panel shows; "Suivant" button receives focus |
| `#panel-qcm`, post-reveal, "Suivant" focused | `Enter` / `Space` | Advance to next QCM (D-02); focus moves to first choice of next question |
| `#panel-qcm`, post-reveal, any other focus | `Enter` / `Space` | No-op (focus stays where it is; the Suivant CTA shortcut requires focus on the button) |
| `#panel-qcm`, **anywhere in panel** (focus on choice/select/Suivant) | Arrow keys | **Pass-through** — do NOT capture (browser default scroll / select-option behavior preserved). No arrow-key navigation between choices (CONTEXT.md keyboard discipline) |
| `#panel-tests`, STATE A (start screen) | `Tab` to "Démarrer un test", `Enter` / `Space` | Start the test |
| `#panel-tests`, STATE B (running), focus on a choice | `Enter` / `Space` | Mark choice as selected (toggle if same choice, replace if different) |
| `#panel-tests`, STATE B, focus on "Suivant" | `Enter` / `Space` | Advance to next question (D-07 free nav — user can come back) |
| `#panel-tests`, STATE B, focus on "Précédent" | `Enter` / `Space` | Go to previous question; previously-selected choice (if any) shows in selected state |
| `#panel-tests`, STATE B, focus on "Abandonner" | `Enter` / `Space` | Open native `confirm()` modal — D-15 |
| `#panel-tests`, STATE B, **anywhere** | Arrow keys | Pass-through (same rule as QCM) |
| `#panel-tests`, STATE B, **anywhere** | `Escape` | **No-op.** Escape does NOT abandon the test (would be too easy to lose work). The "Abandonner" button is the only abandon path. |
| `#panel-tests`, STATE C (results), focus on "Nouveau test" | `Enter` / `Space` | Return to STATE A (start screen) |
| Both panels, focus inside `<select>` / `<input>` / `<textarea>` | Any digit / Space | **Pass-through** — let the form control receive the key (same discipline as Phase 3 keyboard contract) |

**No global document-level keydown handlers.** All key handling is bound to the focused element (choice button, Suivant button, etc.) via `.addEventListener('keydown', …)`. This matches the Phase 3 keyboard discipline (no `document.addEventListener` for hot keys) — keyboard behavior is local to the focused widget.

**Focus management on state transitions:**
- After a QCM auto-reveal: focus moves to the "Suivant" button (so `Enter` / `Space` advances).
- After "Suivant" advances to a new QCM: focus moves to the first choice button of the new question.
- After "Démarrer un test" (STATE A → B): focus moves to the first choice button of question 1.
- After "Suivant" / "Précédent" inside a test: focus moves to the first choice button of the newly-shown question.
- After test completion (STATE B → C): focus moves to the "Nouveau test" button.
- After "Nouveau test" (STATE C → A): focus moves to the theme `<select>` (re-entry point).
- After "Abandonner" confirmed (STATE B → A): focus moves to the theme `<select>`.
- When the QCM pool is empty or filtered theme has no QCMs: focus stays on the theme `<select>` (the only actionable element).

### ARIA contract

- `#panel-qcm` and `#panel-tests` already have `role="tabpanel"` `aria-labelledby="tab-qcm"` / `aria-labelledby="tab-tests"` `tabindex="0"` (chassis-managed; do not change).
- Each panel mounts an `<h2 class="sr-only">…</h2>` first child for screen-reader landmark (mirrors Phase 3 pattern).
- `.qz-choices` carries `role="group"` and `aria-labelledby="qz-question-id"` (where `qz-question-id` is the id of the `<h3>` stem) — groups the four choice buttons under the question.
- Each choice `<button>` is a `<button type="button">` with `aria-label="Choix {LETTRE} : {texte}"`.
- Post-reveal in QCM mode: each picked choice gets `aria-pressed="true"` (the user's selection); the canonical correct choice (regardless of pick) gets `aria-describedby="qz-reveal-id"` so screen readers announce the correction in context. All other choices get `aria-pressed="false"`.
- `[data-qz-reveal]` uses `hidden` attribute (not `display: none`) so screen readers skip it pre-reveal — same discipline as Phase 3 `[data-fc-verso]`.
- `.qz-reveal__badge` is announced via the visible glyph + word ("Correct" / "Incorrect") — no sr-only override needed.
- `<time datetime="2026-05-25">2026-05-25</time>` in the history-table date column (machine-readable + human format; here both happen to be the same ISO string, but the `<time>` element pattern is consistent with Phase 3).
- `[data-qz-source] code` for the regulatory ref (e.g. `<code>R4121-1</code>`) — chassis already styles `code` with `--font-mono`.
- `[data-qz-timer]` carries `role="timer"` and `aria-live="off"` (announcement every second would be rude — screen-reader users get the count via Tab-to-timer or via the banner at 00:00).
- At 00:00, `.qz-timer-banner` un-hides; it carries `role="status"` `aria-live="polite"` so screen readers announce "Temps écoulé — tu peux continuer." once.
- `[data-qz-progress]` carries `aria-label="Question {N} sur {TOTAL}"`. No `aria-live` (changes only on Précédent / Suivant clicks, which the user initiated — they know they advanced).
- `.qz-history` uses semantic `<table>` + `<caption>` + `<thead>` + `<tbody>` — no `role="table"` override needed (native semantics are correct).
- History-row updates announce via a sr-only `<p aria-live="polite">` sibling: `{N} tests enregistrés.` after a test completion writes a new row.

### Motion contract

- **Zero declared transitions in Phase 4.** Same discipline as Phase 3.
- Reveal is an instant `[hidden]` toggle on `.qz-reveal`. Choice picked-state is an instant attribute swap.
- Timer color shift at 5-min threshold and at 00:00 is an instant ink-color swap.
- Timeout banner appearance is an instant `[hidden]` toggle.
- Score hero color tier is set once on results render — no animation.
- Test STATE A → B → C transitions are instant `[hidden]` toggles between three top-level container divs inside `#panel-tests`.

The chassis `prefers-reduced-motion` block (lines 22–29) is a global belt-and-suspenders; Phase 4 doesn't trigger it because Phase 4 adds **no animations**.

---

## Component Inventory (for planner)

| Component | Selector | Role | Mount surface |
|-----------|----------|------|---------------|
| **QCM panel container** | `#panel-qcm` (existing) | Tab panel wrapper | outils.html:133 (replaces `<p class="placeholder">`) |
| QCM panel heading (sr-only) | `#panel-qcm > h2.sr-only` | Screen-reader landmark | First child of `#panel-qcm` |
| Theme picker (QCM) | `#panel-qcm .qz-theme` | Label + native `<select>` | Second child of `#panel-qcm` |
| QCM theme `<select>` | `#qz-qcm-theme-select` | Theme filter | Inside `.qz-theme` |
| QCM card | `#panel-qcm .qz-card` | Question + choices + reveal | Third child of `#panel-qcm` |
| QCM question stem | `#panel-qcm [data-qz-question]` | Fraunces stem | Inside `.qz-card` |
| QCM choices group | `#panel-qcm .qz-choices` | 4 choice buttons | Inside `.qz-card` |
| QCM choice button | `#panel-qcm .qz-choices > button[data-qz-choice]` | Single choice | Inside `.qz-choices` (×4) |
| QCM reveal panel | `#panel-qcm .qz-reveal[hidden]` | Badge + answer + explanation + source | Inside `.qz-card` |
| QCM reveal badge | `#panel-qcm .qz-reveal__badge` | `✓ Correct` / `✗ Incorrect` | Inside `.qz-reveal` |
| QCM canonical answer | `#panel-qcm [data-qz-answer]` | Answer prose | Inside `.qz-reveal` |
| QCM explanation | `#panel-qcm [data-qz-explanation]` | Explanation prose | Inside `.qz-reveal` |
| QCM source | `#panel-qcm [data-qz-source]` | Authority + ref + url | Inside `.qz-reveal` |
| QCM "Suivant" button | `#panel-qcm [data-qz-next]` | Primary CTA after reveal | Below the card (or last child of card; planner's call) |
| QCM empty-pool inline | `#panel-qcm .qz-no-pool` | `Aucun QCM pour ce thème.` | Replaces card body when pool empty |
| QCM bank-load error inline | `#panel-qcm .qz-error` | Graceful-degradation copy | Inside `.qz-card` when `window.BANK` missing |
| **Tests panel container** | `#panel-tests` (existing) | Tab panel wrapper | outils.html:138 (replaces `<p class="placeholder">`) |
| Tests panel heading (sr-only) | `#panel-tests > h2.sr-only` | Screen-reader landmark | First child of `#panel-tests` |
| Test start screen | `#panel-tests .qz-start` | STATE A | Second child of `#panel-tests` |
| Test start heading | `.qz-start > h3` | Visible heading | Inside `.qz-start` |
| Test start body | `.qz-start > p` | Test rules summary | Inside `.qz-start` |
| Test theme picker | `#panel-tests .qz-theme` | Label + `<select>` | Inside `.qz-start` |
| Test theme `<select>` | `#qz-test-theme-select` | Theme filter | Inside `.qz-theme` |
| Test "Démarrer un test" button | `#panel-tests [data-qz-start]` | Primary CTA | Inside `.qz-start` |
| Test pool-too-small inline | `#panel-tests .qz-pool-small` | Inline error below picker | Conditional, inside `.qz-start` |
| Test running container | `#panel-tests .qz-running[hidden]` | STATE B | Third child of `#panel-tests` |
| Test timer row | `.qz-timer-row` | Holds timer + progress | First child of `.qz-running` |
| Test timer | `[data-qz-timer]` | `MM:SS` countdown | Inside `.qz-timer-row` |
| Test progress | `[data-qz-progress]` | `N/TOTAL` indicator | Inside `.qz-timer-row` |
| Test timeout banner | `.qz-timer-banner[hidden]` | Appears at 00:00 (D-13) | Above timer-row inside `.qz-running` (banner shows `Temps écoulé — tu peux continuer.`) |
| Test running card | `#panel-tests .qz-card` | Same `.qz-card` selector reused; rendered by shared helper | Second child of `.qz-running` |
| Test footer controls | `.qz-test-controls` | Précédent / Abandonner / Suivant | Third child of `.qz-running` |
| Test Précédent button | `[data-qz-prev]` | Free-nav backward (D-07) | Inside `.qz-test-controls` |
| Test Suivant button | `[data-qz-next]` (reused selector; label morphs to `Terminer le test` on last question) | Free-nav forward | Inside `.qz-test-controls` |
| Test Abandonner button | `[data-qz-abandon]` | Trigger native `confirm()` (D-15) | Inside `.qz-test-controls` |
| Results screen | `#panel-tests .qz-results[hidden]` | STATE C | Fourth child of `#panel-tests` |
| Results hero | `.qz-results__hero` | Score hero panel | Inside `.qz-results` |
| Results score number | `[data-qz-score]` | The large `17/20` | Inside `.qz-results__heading` |
| Results heading | `.qz-results__heading` | `Bravo — 17/20.` sentence wrapper | Inside `.qz-results__hero` |
| Results subheading | `.qz-results__subheading` | `Thème : DUERP` | Inside `.qz-results__hero` |
| Results corrections heading | `.qz-results > h3` | `Corrections` | Inside `.qz-results` |
| Results corrections list | `.qz-corrections` (`<ol>`) | 20 per-question corrections | Inside `.qz-results` |
| Results correction item | `.qz-corrections > li` | Single correction (badge + stem + choices + reveal) | Inside `.qz-corrections` |
| Results "Nouveau test" button | `[data-qz-restart]` | Returns to STATE A | Inside `.qz-results` |
| **History container** | `#panel-tests .qz-history-section` | History wrapper (always visible in STATE A + C) | Fifth child of `#panel-tests` |
| History heading | `.qz-history-section > h3` | `Historique des tests` | Inside `.qz-history-section` |
| History table | `.qz-history` (`<table>`) | Compact 3-column table (D-12) | Inside `.qz-history-section` |
| History table caption | `.qz-history caption` | Visible OR sr-only (planner picks) | Inside `<table>` |
| History row | `.qz-history tbody tr` | Single test entry | Inside `<tbody>` |
| History date cell | `.qz-history__date` (`<td>` with class) | Mono date | Inside row |
| History theme cell | `.qz-history__theme` (`<td>` with class) | French theme name | Inside row |
| History score cell | `.qz-history__score` (`<td>` with class) | Mono `N/20` | Inside row |
| History empty inline | `.qz-history__empty` | `Aucun test terminé pour le moment.` | Replaces `<table>` when `qhse-scores-v1` empty |
| History sr-only announce | `.qz-history__announce.sr-only` | `aria-live="polite"` row-count mirror | Sibling of `<table>` |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none | not applicable (project does not use shadcn — vanilla HTML/CSS/JS per CLAUDE.md) |
| third-party | none | not applicable |

**Zero external components, zero CDN dependencies introduced by Phase 4.** The only "external" runtime asset already loaded by `outils.html` is Google Fonts CSS2 (unchanged since Phase 1). The Package Legitimacy Gate is satisfied trivially.

**Glyphs used (`✓ U+2713`, `✗ U+2717`):** these are Unicode characters in the inherited sans face, NOT loaded assets. No SVG, no icon font, no runtime injection. Renders consistently across Chromium / WebKit / Gecko on Win/macOS/iOS/Android (verified visually in chassis.css existing `▾ ▴` disclosure usage — same precedent).

---

## Mapping to Owner-Verifiable Success Criteria (ROADMAP Phase 4)

Every UI contract above maps back to a ROADMAP success criterion. The checker must be able to trace each component to its owning criterion.

| ROADMAP SC | UI element(s) that make it true |
|------------|---------------------------------|
| **SC1** — Owner opens QCM tab, picks a theme, sees stem + 4 choices; selecting one immediately reveals correct/incorrect + canonical answer + explanation + source | `.qz-theme` (theme picker), `.qz-card > [data-qz-question]`, `.qz-choices > button` (×4), auto-reveal `[hidden]` toggle on `.qz-reveal`, `.qz-reveal__badge` carries `✓ Correct` / `✗ Incorrect`, `[data-qz-answer]` + `[data-qz-explanation]` + `[data-qz-source]` populated from the bank item |
| **SC2** — Wrong QCM answer adds card to SRS queue (verifiable via `qhse-srs-v1[itemId]` showing interval reset) | The choice-button click handler in the QCM IIFE invokes `window.SRS.schedule(state, 'rate')` and writes back to `qhse-srs-v1[item.id]` (CONTEXT.md D-03); the picked-incorrect button visual state (`2px solid var(--alert)` + `✗` glyph) is the user-facing echo |
| **SC3** — Tests blancs tab: start timed exam, see countdown, answer sequence; on completion see final score + per-question correction with sources | `.qz-start` start screen with `[data-qz-start]` CTA; STATE B transition shows `[data-qz-timer]` counting down, `[data-qz-progress]` `N/20`, `.qz-card` per question, `[data-qz-prev]` / `[data-qz-next]` / `[data-qz-abandon]` footer; STATE C transition shows `[data-qz-score]` hero, `.qz-corrections` with 20 per-question corrections reusing the QCM reveal contract |
| **SC4** — Two test sessions appear in score history with date/theme/score in `qhse-scores-v1`; `qhse-srs-v1` is NOT modified by tests blancs | `.qz-history-section` (always-visible 4th child of `#panel-tests`) with `.qz-history` `<table>` rendering rows from `qhse-scores-v1` sorted newest-first, cap 50 FIFO (D-11). The tests blancs IIFE writes only to `qhse-scores-v1` — never calls `SRS.schedule`. `verify-quiz.cjs` asserts no `qhse-srs-v1` mutation during a test session (D-V2-03 invariant). |

---

## What This Contract Does NOT Define (out of scope)

To make the scoping explicit so the checker doesn't flag absences:

- **No new design tokens.** Phase 4 reuses 100% of the chassis token surface.
- **No new fonts, no font weights beyond 400/500/600/700 already declared in the Google Fonts CSS2 link.**
- **No icon library.** Two Unicode glyphs (`✓` / `✗`) inline in inherited sans. Lucide / Phosphor / any sprite system remains deferred.
- **No animations.** Per the Phase 3 motion discipline carried forward.
- **No skeleton loaders, no spinners.** `window.BANK` is guaranteed at DOMContentLoaded; render is sub-millisecond.
- **No modals, no overlays, no toasts.** Abandon confirmation uses native `confirm()`; errors are inline; empty-history is inline.
- **No custom `<dialog>` element.** Native `confirm()` covers the single yes/no destructive action — see Copywriting Contract rationale.
- **No light-mode-specific overrides.** Chassis `light-dark()` tokens handle both modes automatically.
- **No print styles.** Tests blancs / QCM are screen-only; chassis print rules already hide chrome.
- **No third-party design system, no Tailwind, no shadcn, no Alpine, no htmx.** Per CLAUDE.md "What NOT to Use".
- **No graph / sparkline / chart for score history.** D-12 locks `<table>` only.
- **No animated timer (pulse / glow / shake / wiggle).** The number changes; that is the entire timer affordance.
- **No celebratory confetti / scaling number / sound on results screen.** The score hero color tier + the text label is the entire celebration.
- **No filter dropdown above the history table.** Deferred per CONTEXT.md `<deferred>`.
- **No expand-on-tap row details in history.** D-12 confirmed: passive read-only.
- **No mid-test save / resume across reload.** D-14 + D-16 reject this; F5 = test lost, no warning.
- **No `beforeunload` warning during a test.** D-14 explicit.
- **No score history pagination.** Cap 50 (D-11) is small enough to render in one pass.

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS — French, sober, exam-grade; all elements specified including destructive `confirm()` copy; 4-tier score heading covers all ratio bands; empty + error states defined for both panels
- [ ] Dimension 2 Visuals: PASS — flat, no animation, no icon library; component inventory complete; two Unicode glyphs documented as Unicode (not assets); 3-state Tests blancs machine declared
- [ ] Dimension 3 Color: PASS — 60/30/10 inherited from chassis; accent reserved list explicit (4 uses); semantic success/alert/warning reserved lists explicit; score color tier rule declared
- [ ] Dimension 4 Typography: PASS — three families inherited; per-panel size-role mapping declared; timer + progress + score hero typography pinned to specific tokens
- [ ] Dimension 5 Spacing: PASS — chassis `--space-*` scale (multiples of 4); 44px touch-target floors documented for 6 control surfaces; history-cell padding documented as exception (passive read-only, no touch floor needed)
- [ ] Dimension 6 Registry Safety: PASS — zero registries, zero CDN deps, zero shadcn blocks, zero icon libraries

**Approval:** pending

---

## UI-SPEC COMPLETE
