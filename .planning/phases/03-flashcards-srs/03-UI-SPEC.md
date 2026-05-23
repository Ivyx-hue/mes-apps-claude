---
phase: 3
slug: flashcards-srs
status: draft
shadcn_initialized: false
preset: none
created: 2026-05-23
---

# Phase 3 — UI Design Contract (Flashcards + SRS)

> Visual + interaction contract for the new surfaces mounted inside `#panel-flashcards` of `outils.html`.
> The design system (chassis.css, tokens, fonts, layer order) is **FROZEN** from Phases 1–2 and is **not re-designed here**.
> This contract locks only the new components Phase 3 adds: the **bandeau permanent**, the **theme picker**, the **réglages disclosure**, the **recto/verso card**, the **4 grade buttons**, the **empty-queue panel**, and the **révision libre** mode.
> All new CSS lives inside `@layer components` in `chassis.css`, gated by `#panel-flashcards` parent selector or `.fc-` prefix. **No chassis tokens are added.** **No chassis tokens are mutated.**

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none (vanilla HTML + CSS + JS — project invariant PERSIST-02 / CLAUDE.md "no build step") |
| Preset | not applicable |
| Component library | none (hand-authored components prefixed `.fc-*`, scoped to `#panel-flashcards`) |
| Icon library | none — Phase 3 ships **no icons**. Grade buttons use the digit number + French label only (e.g. `1 · Raté`); ARIA labels carry semantic meaning. Defer Lucide inline SVG to Phase 4/5 if a real need surfaces. |
| Font | Inherited from chassis.css: **Inter** (`--font-sans`, body + buttons + UI), **Fraunces** (`--font-serif`, card recto question), **JetBrains Mono** (`--font-mono`, bandeau counters + `source.ref`). No new font loaded. |

**Scoping rule (binding):**
- All Phase 3 selectors **MUST** start with `#panel-flashcards` OR be inside a `@scope (#panel-flashcards) { … }` block.
- Class names **MUST** be prefixed `.fc-` (Flashcards) — same convention as the existing `.biblio-*` namespace in chassis.css.
- **DO NOT** add new `:root` custom properties. Reuse existing tokens: `--bg-1`, `--bg-2`, `--ink-1`, `--ink-2`, `--ink-3`, `--accent`, `--accent-soft`, `--success`, `--warning`, `--alert`, `--border-subtle`, `--focus-ring`, `--space-*`, `--step-*`, `--radius-*`.
- **DO NOT** modify any existing chassis rule. Phase 3 is **additive only**.

---

## Spacing Scale

**Inherited from chassis.css `@layer tokens` — Phase 3 reuses, does not redefine.**

| Token | Value | Phase 3 usage |
|-------|-------|---------------|
| `--space-xs` | 0.25rem (4px) | Gap between bandeau counter pieces; verso source-line internal spacing |
| `--space-sm` | 0.5rem (8px) | Gap between grade buttons on mobile; padding inside réglages `<details>` |
| `--space-md` | 1rem (16px) | Padding inside `.fc-card`; gap between recto question and reveal button; gap between bandeau and theme picker |
| `--space-lg` | 1.5rem (24px) | Padding around the card; vertical rhythm between bandeau / theme / card / empty-panel sections |
| `--space-xl` | 2rem (32px) | Top padding of `#panel-flashcards` content block on desktop |
| `--space-2xl` | 3rem (48px) | Reserved — not used in Phase 3 (section-level only) |
| `--space-3xl` | 4rem (64px) | Reserved — not used in Phase 3 |

### Exceptions (Phase 3 specific)

| Exception | Value | Justification |
|-----------|-------|---------------|
| Grade button **minimum touch target** | 44 × 44px (height enforced via `min-height: 44px`) | WCAG 2.5.5 / WAI-ARIA APG — required for owner's mobile use (voice + touch). Width is fluid via flex; height is the floor. |
| Reveal button **minimum touch target** | 44 × 44px (same enforcement) | Same WCAG rationale; primary CTA on the card. |
| Theme `<select>` **minimum touch target** | 44px height | Same. |
| `newCardsPerDay` `<input type="number">` **minimum touch target** | 44px height | Same. |

All four exceptions are touch-target floors, **not** new spacing tokens. They are enforced via `min-height: 44px` on the four control selectors only. No other phase-3 element gets a special exception.

---

## Typography

**Inherited from chassis.css. Three families, fluid scale.**

| Role | Token | Computed range | Family | Weight | Line height | Phase 3 element |
|------|-------|----------------|--------|--------|-------------|-----------------|
| Bandeau counters (the numbers) | `--step-1` | 1rem (16px) | **`--font-mono`** (JetBrains Mono) | 500 | 1.4 | `[data-fc-dues]`, `[data-fc-new]` — mono font signals "data" / "live counter", matches the `.biblio-card__badge` mono treatment |
| Bandeau labels ("dues", "nouvelles") | `--step-0` | 0.875rem (14px) | `--font-sans` | 400 | 1.4 | Surrounding text in `.fc-bandeau` |
| Theme picker label + `<select>` text | `--step-0` | 0.875rem (14px) | `--font-sans` | 500 (label) / 400 (option) | 1.4 | `.fc-theme label`, `#fc-theme-select` |
| Réglages summary + input label | `--step-0` | 0.875rem (14px) | `--font-sans` | 500 | 1.4 | `.fc-settings summary`, `.fc-settings label` |
| **Card recto question** | `--step-3` | clamp(1.25rem, 1vw + 0.9rem, 1.5rem) (20–24px) | **`--font-serif`** (Fraunces) | 600 | 1.3 | `[data-fc-question]` — the focal element of the screen. Serif + larger size mirrors `.biblio-card__title` rhythm. `text-wrap: balance`. |
| Card verso answer (canonical) | `--step-2` | clamp(1.0625rem, …, 1.125rem) (17–18px) | `--font-sans` | 600 | 1.5 | `[data-fc-answer]` — slightly emphasized so the eye lands here first when verso reveals |
| Card verso explanation prose | `--step-1` | 1rem (16px) | `--font-sans` | 400 | 1.6 | `[data-fc-explanation]` — body register; `color: var(--ink-2)` to recede |
| Card verso source line | `--step-0` | 0.875rem (14px) | `--font-sans` for `authority` text, `--font-mono` for `ref` | 400 | 1.5 | `[data-fc-source]` — `authority` in sans, `ref` (e.g. `R4121-1`, `ISO 45001:2018`) wrapped in inline `<code>` for mono treatment |
| Grade button digit prefix (`1 ·`, `2 ·`, …) | `--step-1` | 1rem | **`--font-mono`** | 500 | 1 | The leading digit + middot inside each grade button. Mono ties the digit to its keyboard shortcut. |
| Grade button label (`Raté`, `Dur`, `Bien`, `Facile`) | `--step-1` | 1rem | `--font-sans` | 600 | 1 | Sans-serif, weight 600 to read as actionable |
| Reveal button label (`Révéler`) | `--step-1` | 1rem | `--font-sans` | 600 | 1 | Same weight as grade buttons |
| Empty-queue heading | `--step-2` | 17–18px | `--font-serif` (Fraunces) | 600 | 1.3 | `Bravo — file vide pour aujourd'hui.` |
| Empty-queue body | `--step-1` | 1rem | `--font-sans` | 400 | 1.6 | `Prochaine carte due le …. (N validées · N à retravailler.)` — `<time>` element wraps the date |
| Free-revision mode banner | `--step-0` | 0.875rem | `--font-sans` | 500 | 1.4 | `Révision libre — la progression SRS n'est pas modifiée.` Color `var(--warning)`; sits above the card while in free mode. |

**Body line-height: 1.5–1.6 (chassis default).** **Heading line-height: 1.15–1.3 (chassis default).** No new lh values introduced.

---

## Color

**60 / 30 / 10 split — inherited from chassis. Dark default, `light-dark()`-aware.**

| Role | Token | OKLCH (dark mode reference) | Phase 3 usage |
|------|-------|------------------------------|---------------|
| Dominant (60%) — page background | `--bg-1` | `oklch(15% 0.012 65)` | Page surface; `#panel-flashcards` itself uses `--bg-1` (no card-on-card stacking issue). |
| Secondary (30%) — card surface | `--bg-2` | `oklch(19% 0.014 65)` | `.fc-card` background; `.fc-bandeau` background; `.fc-empty` panel background; réglages `<details>` open state background |
| Accent (10%) — | `--accent` / `--accent-soft` | `oklch(74% 0.10 78)` | **Reserved list — see below** |
| Destructive | `--alert` | `oklch(64% 0.18 30)` | **Phase 3 has no destructive actions.** `--alert` is **not used** in P3. Reserved for `RESET SRS` button if/when added (deferred). |
| Success signal | `--success` | `oklch(70% 0.13 145)` | The **3 · Bien** grade button hover/focus accent only — see grade-button color contract |
| Warning signal | `--warning` | `oklch(74% 0.13 70)` | (a) Free-revision mode banner color (the `var(--warning)` mentioned in Typography). (b) Empty-queue panel left border. |
| Neutral ink scale | `--ink-1` / `--ink-2` / `--ink-3` | already declared | Body text, secondary prose, source-line tertiary text. Same usage as the biblio cards. |
| Focus ring | `--focus-ring` | `oklch(82% 0.18 250)` | All Phase 3 focusable elements via inherited `:focus-visible` rule (chassis line 142). **Do not override.** |

### Accent reserved for (explicit list — never "everywhere")

The accent (`--accent` / `--accent-soft`) is used in Phase 3 **only** for:

1. **The "Révéler" button** — primary CTA. Background `var(--accent)`, ink `var(--bg-1)` for max contrast on the warm accent. This is the single brightest call on the screen pre-reveal.
2. **The active state of the theme `<select>`** — `border-color: var(--accent)` when focused (replaces default browser blue ring, harmonizes with chassis focus token).
3. **The "Continuer en révision libre" button** — secondary CTA on the empty-queue panel. Outline style: `border: 1px solid var(--accent)`, background `transparent`, text `var(--accent)`. Less weight than "Révéler" because it's an optional path.
4. **Bandeau "dues" numerator color when > 0** — `color: var(--accent)` on `[data-fc-dues]` when dues > 0; falls back to `var(--ink-2)` when dues === 0 (no work to do).

Accent is **NOT** used for: grade buttons (they carry their own semantic colors — see grade button contract), the recto question text (uses `--ink-1`), the verso answer text (uses `--ink-1`), the bandeau "nouvelles" counter (uses `--ink-2` always — new-card pacing is informational, not a CTA).

### Grade button color contract (the four buttons)

Equal visual weight pre-interaction (same border, same padding, same height). Differentiation comes from hover/focus accent **and** the leading digit. The four colors map to the four semantic intents:

| Button | Idle border | Hover/focus border + ring | Idle bg | Text |
|--------|-------------|---------------------------|---------|------|
| **1 · Raté** | `var(--border-subtle)` | `var(--alert)` ring + border | transparent | `var(--ink-1)` |
| **2 · Dur** | `var(--border-subtle)` | `var(--warning)` ring + border | transparent | `var(--ink-1)` |
| **3 · Bien** | `var(--border-subtle)` | `var(--success)` ring + border | transparent | `var(--ink-1)` |
| **4 · Facile** | `var(--border-subtle)` | `var(--accent)` ring + border | transparent | `var(--ink-1)` |

**Rule:** colors only signal on `:hover` and `:focus-visible`. Idle state is calm and equal so the owner doesn't pre-pattern-match a "right answer" before deciding. This matches Anki's calm flat-button aesthetic and respects the "no flip animation / no celebratory chrome" decision in CONTEXT.md.

**Accessibility:** color is **never** the only differentiator. Each button carries (a) a numeric digit prefix (`1 ·`, `2 ·`, `3 ·`, `4 ·`), (b) a French label (`Raté` / `Dur` / `Bien` / `Facile`), (c) `data-fc-grade="rate|dur|bien|facile"` for ARIA-friendly attribute selection. A monochrome user receives full information.

---

## Copywriting Contract

All copy is **French**, consistent with the project's voice (CLAUDE.md "Language: French in conversation"). Tone: direct, sober, exam-grade. No emojis. No exclamation marks except in the post-session celebration. No vulgarization of QHSE terminology — the bank is exam-register, the UI matches.

| Element | Copy |
|---------|------|
| Panel heading (visually hidden — `<h2 class="sr-only">`) | `Cartes mémoire avec répétition espacée` |
| Bandeau template | `<span data-fc-dues>{N}/{TOTAL}</span> dues · <span data-fc-new>{M}/{CAP}</span> nouvelles` |
| Bandeau ARIA live region announce | `{N} cartes dues, {M} nouvelles introduites sur {CAP} aujourd'hui` (announced via `aria-live="polite"` on a `.sr-only` mirror node — keeps screen readers in sync without rude interruption) |
| Theme picker label | `Thème` |
| Theme picker default option | `Tous les thèmes` |
| Theme picker option labels | French full names from a single source-of-truth lookup (e.g. `duerp` → `DUERP`, `iso-9001` → `ISO 9001`, `risque-routier` → `Risque routier`, `acronymes` → `Acronymes`, …) — **planner must extract these from the existing `outils-data.js` theme set, not invent them** |
| Réglages disclosure summary | `Réglages` |
| Réglages input label | `Cartes nouvelles par jour` |
| Réglages input hint (small text below input) | `Entre 1 et 50. Par défaut : 10.` |
| Recto reveal button (Primary CTA) | `Révéler` |
| Recto reveal button — keyboard hint (visually shown below or beside button on desktop ≥48rem only) | `Espace ou Entrée` (rendered in `--ink-3` `--step--1` mono — reinforces shortcut without nagging mobile) |
| Verso answer prefix (sr-only label on the answer block) | `Réponse :` |
| Verso explanation prefix (sr-only label) | `Explication :` |
| Verso source prefix (sr-only label) | `Source :` |
| Grade button — Raté | `1 · Raté` |
| Grade button — Dur | `2 · Dur` |
| Grade button — Bien | `3 · Bien` |
| Grade button — Facile | `4 · Facile` |
| Grade buttons — `aria-label` template | `Noter cette carte : {label} (raccourci : {N})` — e.g. `Noter cette carte : Raté (raccourci : 1)` |
| Empty-queue heading | `Bravo — file vide pour aujourd'hui.` |
| Empty-queue body | `Prochaine carte due le <time datetime="{ISO}">{format-FR}</time>. ({N} validées · {M} à retravailler.)` |
| Empty-queue body — when no future due exists yet (brand-new install, no cards ever graded) | `Prochaine carte due quand tu commences à étudier. ({N} validées · {M} à retravailler.)` — fallback that still parses gracefully |
| Empty-queue secondary CTA | `Continuer en révision libre` |
| Free-revision banner (shown while in free mode, above the card) | `Révision libre — la progression SRS n'est pas modifiée.` |
| Free-revision next-card button | `Carte suivante` |
| Free-revision exit button (returns to normal queue / empty panel) | `Quitter la révision libre` |
| **Error states (graceful-degradation, not loud)** | |
| `window.BANK` failed to load (no items) | `Impossible de charger la banque de cartes. Recharge la page ou vérifie que <code>outils-data.js</code> est bien servi.` (rendered inside `.fc-card` with `color: var(--ink-2)`; no red alert chrome — this is a dev-time fault, not a runtime user error.) |
| Filtered pool is empty (theme has no cards) | `Aucune carte pour ce thème. Choisis un autre thème.` (rendered inline, replaces the card body; theme picker stays usable.) |
| localStorage write failure (Safari private mode, quota) | Silent console.warn (per RESEARCH §4.2). **No UI alert.** Owner-visible degradation: state survives the session but not the reload. Acceptable per CONTEXT.md fallback pattern. |
| **Destructive actions** | **None in Phase 3.** No "reset SRS", no "clear queue", no "delete card". Free-revision is the only "alternate flow" and it is read-only by structural design, not by confirmation dialog. |

**Voice rules:**
- Address the owner with `tu` (consistent with CONTEXT.md owner notes and the project's French informal register).
- No marketing voice ("Super !", "Incroyable !", "Bravo, génie !"). The single "Bravo" in the empty-queue heading is the entire celebration budget.
- No nudging copy ("Allez, encore une !", "Tu peux le faire !"). The owner is an adult preparing a Bachelor — respect their focus.

---

## Layout & Interaction Contracts

**This section is Phase-3-specific and not in the standard template — it carries the interaction decisions the planner and executor need.**

### Composition (top-to-bottom inside `#panel-flashcards`)

```
┌───────────────────────────────────────────────────────────┐
│ .fc-bandeau                            (sticky-ish header)│
│   5/12 dues · 3/10 nouvelles    [Réglages ▾]              │
├───────────────────────────────────────────────────────────┤
│ .fc-theme                                                  │
│   Thème  [ Tous les thèmes        ▾ ]                      │
├───────────────────────────────────────────────────────────┤
│ .fc-card  (the focal element — recto OR verso)             │
│                                                            │
│   [Recto:]                                                 │
│     <h3 data-fc-question>…question Fraunces 20–24…</h3>    │
│     [ Révéler ]   (accent CTA, 44px, Espace ou Entrée)     │
│                                                            │
│   [Verso (recto stays, verso reveals below):]              │
│     <p data-fc-answer>…canonical answer 17–18 sans 600…</p>│
│     <p data-fc-explanation>…explanation 16 ink-2 1.6…</p>  │
│     <p data-fc-source>…authority + <code>ref</code>…</p>   │
│     ┌──────────┬──────────┬──────────┬──────────┐          │
│     │ 1 · Raté │ 2 · Dur  │ 3 · Bien │ 4 · Facile │        │
│     └──────────┴──────────┴──────────┴──────────┘          │
│                                                            │
│   [Empty-queue replacement:]                               │
│     Bravo — file vide pour aujourd'hui.                    │
│     Prochaine carte due le <time>24 mai 2026</time>.       │
│     (12 validées · 2 à retravailler.)                      │
│     [ Continuer en révision libre ]                        │
└───────────────────────────────────────────────────────────┘
```

### Responsive layout (one breakpoint at `48rem` — matches chassis)

| Viewport | Bandeau | Theme picker | Card | Grade buttons | Reveal hint |
|----------|---------|--------------|------|---------------|-------------|
| **< 48rem (mobile)** | Single line, `flex-wrap: wrap`; réglages collapses to right side | Full width below bandeau; label stacks above `<select>` | Full width, `padding: var(--space-md)`, `margin-inline: 0` | Vertical stack (`flex-direction: column`), each 44px min-height, `gap: var(--space-sm)` | Hidden (no keyboard nag on touch) |
| **≥ 48rem (desktop)** | Single line, all elements baseline-aligned | Inline: label left of `<select>` | Centered, `max-width: 48rem`, `padding: var(--space-lg)`, `margin-inline: auto` | Horizontal row (`flex-direction: row`), `gap: var(--space-md)`, each button `flex: 1 1 0` | Visible as `<small>` below reveal button |

### Card visual treatment

- `.fc-card` background: `var(--bg-2)` (the 30% secondary surface — same as biblio cards in chassis).
- `.fc-card` border: `1px solid var(--border-subtle)`; `border-radius: var(--radius-lg)` (1rem — slightly more generous than biblio's `--radius-md` because this is a focal element, not a list item).
- `.fc-card` shadow: **none** in idle state (flat, paper-on-table aesthetic — matches Phase 1 / Phase 2 austerity). Hover/focus does not change shadow.
- `.fc-card` padding: `var(--space-lg)` desktop / `var(--space-md)` mobile.
- `.fc-card` minimum height: `clamp(16rem, 40vh, 24rem)` — gives a stable visual mass that doesn't jitter between short and long cards.
- **No flip animation.** Reveal is `[hidden]` toggle on `.fc-verso`. Chassis already honors `prefers-reduced-motion`; we don't add motion that would need to be conditionally suppressed.
- **No card-stack illusion**, **no shuffle animation**, **no progress bar** beyond the bandeau counter. The bandeau IS the progress indicator.

### Bandeau visual treatment

- `.fc-bandeau` background: `var(--bg-2)`; `border: 1px solid var(--border-subtle)`; `border-radius: var(--radius-md)`.
- Padding: `var(--space-sm) var(--space-md)`.
- Counter numbers (`[data-fc-dues]`, `[data-fc-new]`): JetBrains Mono, weight 500, color rule:
  - `[data-fc-dues]` → `var(--accent)` when > 0; `var(--ink-2)` when === 0 (signals "nothing to do").
  - `[data-fc-new]` → always `var(--ink-2)` (informational, not actionable).
- Separator middot (`·`): `color: var(--ink-3)`, `padding-inline: var(--space-xs)`.
- `.fc-settings` (réglages disclosure): right-aligned (`margin-inline-start: auto`); `<summary>` is a button-styled disclosure (no default triangle on the right of the summary — `summary::marker { display: none }`); a small caret SVG-less affordance via `▾` Unicode is acceptable. When open, the number input panel slides into the bandeau (mobile: full width below; desktop: inline to the left of summary).

### Theme picker visual treatment

- Native `<select>` — no custom dropdown chrome. Matches the "vanilla, no JS dropdown libs" project rule.
- Styling: `font: inherit` (chassis already does this in reset); `background: var(--bg-2)`; `border: 1px solid var(--border-subtle)`; `border-radius: var(--radius-sm)`; `padding: 0 var(--space-md)`; `min-height: 44px`.
- `:focus-visible` ring inherited from chassis.
- Width: mobile `100%`; desktop `min-width: 16rem`, `max-width: 24rem`.
- Order of options: `Tous les thèmes` first, then the 15 themes in **the same source order as `outils-data.js` THEMES whitelist** — keeps planner / executor / owner mental models aligned.

### Réglages disclosure visual treatment

- Native `<details>` / `<summary>` — no custom JS toggle.
- Summary text: `Réglages` + visual affordance (`▾` when closed, `▴` when open via `details[open] summary::after { content: '▴' }`).
- Open state: panel grows below the summary inside the bandeau on desktop, OR below the entire bandeau on mobile (avoid horizontal cramping).
- Input control: `<input type="number" min="1" max="50" step="1" inputmode="numeric">` — `inputmode="numeric"` gives mobile keyboard the digit pad.
- Input width: `5rem` (enough for "50" plus stepper arrows on desktop).
- Validation: clamp to `[1, 50]` integers on `change`; invalid values fall back to the last valid value with no error toast (silent recovery — single-user tool, no need for nagging).

### Empty-queue panel visual treatment

- `.fc-empty` background: `var(--bg-2)`; `border-left: 4px solid var(--warning)` (the warning token, used as an attention-attractor without alarm); `border-radius: var(--radius-md)` (left edge stays square so the warning stripe doesn't curve).
- Padding: `var(--space-lg)`.
- Centered heading + body; CTA button left-aligned (matches reading flow).
- The CTA uses the **secondary outline accent style** (border `var(--accent)`, background transparent, text `var(--accent)`) — visually less than "Révéler" so the owner reads "this is optional".
- When the queue is empty and the owner clicks "Continuer en révision libre":
  1. The empty panel is `[hidden]`.
  2. The free-revision banner (small, `var(--warning)` color, `--step-0`) appears above `.fc-card`.
  3. `.fc-card` renders random cards from the filtered pool.
  4. Verso shows only the **`Carte suivante`** button (no grade buttons — structural read-only path per RESEARCH §5.2).
  5. A small `Quitter la révision libre` button is added at the bottom of the card, ghost-style (no border, `var(--ink-2)`).

### Keyboard contract (binding — RESEARCH §3.3)

| State | Key | Action |
|-------|-----|--------|
| Recto visible (verso hidden) | `Space` | Reveal verso |
| Recto visible | `Enter` | Reveal verso |
| Recto visible | Click on `.fc-card` body | Reveal verso (touch parity — RESEARCH §3) |
| Verso visible | `1` | Grade `Raté` |
| Verso visible | `2` | Grade `Dur` |
| Verso visible | `3` | Grade `Bien` |
| Verso visible | `4` | Grade `Facile` |
| Verso visible, focus in `<select>` / `<input>` / `<textarea>` | `1`–`4` | **Pass through** — do not capture (let the form control receive the digit) |
| Free-revision mode | `Space` / `Enter` | Reveal verso (same as normal mode) |
| Free-revision mode, verso visible | Any digit | **No-op** (no grade buttons exist; no shortcut to bind) |
| Free-revision mode, verso visible | `N` (next) | `Carte suivante` (advance to next random card) |
| Free-revision mode, verso visible | `Q` (quit) | `Quitter la révision libre` |

**After every grade or `Carte suivante`:** focus returns to the reveal button of the next card (RESEARCH §3.4). When the queue empties, focus moves to the `Continuer en révision libre` button. When the owner quits free-revision, focus moves to the theme `<select>`.

### ARIA contract

- `#panel-flashcards` already has `role="tabpanel"` `aria-labelledby="tab-flashcards"` `tabindex="0"` (chassis-managed; do not change).
- The panel mounts an `<h2 class="sr-only">Cartes mémoire avec répétition espacée</h2>` first child for screen-reader landmark.
- `.fc-bandeau` carries `role="status"` `aria-live="polite"` on its sr-only mirror sibling, **not** on the visual element (visual is JetBrains Mono mono-counters that change rapidly; polite announcement on a separate node prevents rude interruption).
- `[data-fc-reveal]` is a `<button type="button">` (default keyboard semantics).
- Grade buttons are `<button type="button">` each with `aria-label="Noter cette carte : {label} (raccourci : {N})"` (visible text stays compact, ARIA carries full context for screen-reader users).
- `[data-fc-verso]` uses `hidden` attribute (not `display: none` via CSS) so screen readers correctly skip it pre-reveal.
- `<time datetime="2026-05-24">24 mai 2026</time>` for the next-due date (machine-readable + human format).
- `[data-fc-source] code` for the regulatory ref (e.g. `<code>R4121-1</code>`) — chassis already styles `code` with `--font-mono`.

### Motion contract

- **Zero declared transitions in Phase 3.** The chassis `prefers-reduced-motion` block (lines 22–29) is a global belt-and-suspenders; Phase 3 doesn't need it because Phase 3 adds **no animations**.
- Reveal is an instant `[hidden]` toggle. Grade-to-next-card is an instant DOM swap.
- This is a deliberate aesthetic choice (CONTEXT.md: "no flip animation in P3") **and** a performance choice (mobile-first; instant feels fast).

---

## Component Inventory (for planner)

| Component | Selector | Role | Mount surface |
|-----------|----------|------|---------------|
| Bandeau | `.fc-bandeau` | Live counters + réglages | First child of `#panel-flashcards` |
| Réglages disclosure | `.fc-settings` | `<details>` for `newCardsPerDay` input | Inside `.fc-bandeau` |
| Theme picker | `.fc-theme` | Label + native `<select>` | Second child of `#panel-flashcards` |
| Card | `.fc-card` | Recto + verso container | Third child of `#panel-flashcards` |
| Recto section | `.fc-recto` (inside `.fc-card`) | Question + reveal CTA | — |
| Verso section | `.fc-verso[hidden]` (inside `.fc-card`) | Answer + explanation + source + grades | — |
| Grade buttons (×4) | `.fc-grades > button[data-fc-grade]` | Self-grade controls | Inside `.fc-verso` |
| Reveal button | `[data-fc-reveal]` | Primary CTA | Inside `.fc-recto` |
| Empty-queue panel | `.fc-empty[hidden]` | Post-session UX + free-revision entry | Fourth child of `#panel-flashcards`; shown when card pool exhausted |
| Free-revision banner | `.fc-free-banner[hidden]` | Mode indicator | Shown above `.fc-card` while in free mode |
| Free-revision controls | `.fc-free-controls` | `Carte suivante` + `Quitter` | Shown inside `.fc-card` verso while in free mode (replaces `.fc-grades`) |
| Error/empty-pool inline | `.fc-card .fc-error` / `.fc-card .fc-no-cards` | Graceful-degradation messaging | Replaces card body content |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none | not applicable (project does not use shadcn — vanilla HTML/CSS/JS per CLAUDE.md) |
| third-party | none | not applicable |

**Zero external components, zero CDN dependencies introduced by Phase 3.** The only "external" runtime asset already loaded by `outils.html` is Google Fonts CSS2 (unchanged from Phase 1). The Package Legitimacy Gate is satisfied trivially.

---

## Mapping to Owner-Verifiable Success Criteria (ROADMAP Phase 3)

Every UI contract above maps back to a ROADMAP success criterion. The checker must be able to trace each component to its owning criterion.

| ROADMAP SC | UI element(s) that make it true |
|------------|--------------------------------|
| **SC1** — Owner opens Flashcards, picks a theme, sees recto, clicks "Révéler" → verso (answer + explanation + source) appears | `.fc-theme` (theme picker), `.fc-recto` (question), `[data-fc-reveal]` button labeled `Révéler`, `.fc-verso` with `[data-fc-answer]` + `[data-fc-explanation]` + `[data-fc-source]` |
| **SC2** — 4 grade buttons (raté/dur/bien/facile), clicking advances + persists to `qhse-srs-v1` | `.fc-grades` with the 4 buttons `data-fc-grade="rate|dur|bien|facile"`, labeled `1 · Raté` / `2 · Dur` / `3 · Bien` / `4 · Facile` |
| **SC3** — "À réviser aujourd'hui" surfaces cards due today or earlier | `.fc-bandeau` counters (`{N}/{TOTAL} dues`); the queue itself is implicit — the card area renders due cards in shuffle order |
| **SC4** — Reload preserves SRS progress + last theme/mode | `.fc-theme` `<select>` restores from `qhse-prefs-v1.lastTheme`; `.fc-settings` input restores from `qhse-prefs-v1.newCardsPerDay`; bandeau re-derives from `qhse-srs-v1` |
| **SC5** — Grade "raté" → card re-queues immediately for tomorrow | Bandeau decrement on grade; card disappears from today's queue (not from view — empty-queue panel eventually appears); next-due date shown in `.fc-empty <time>` |

---

## What This Contract Does NOT Define (out of scope)

To make the scoping explicit so the checker doesn't flag absences:

- **No new design tokens.** Phase 3 reuses 100% of the chassis token surface.
- **No new fonts, no font weights beyond 400/500/600/700 already declared in the Google Fonts CSS2 link.**
- **No icons.** Grade buttons use digit + label; bandeau uses text + middot; CTAs use text only. Icon-free is a deliberate decision matching the editorial-austere personality.
- **No animations.** Per CONTEXT.md "no flip animation in P3" and the project's `prefers-reduced-motion` discipline.
- **No skeleton loaders, no spinners.** Page is static HTML; `outils-data.js` loads with `defer` and `window.BANK` is guaranteed at DOMContentLoaded; first paint is the card itself (sub-millisecond).
- **No modals, no overlays, no toasts.** Réglages is inline disclosure; errors are inline replacements; empty-queue is inline panel.
- **No light-mode-specific overrides.** Chassis `light-dark()` tokens handle both modes automatically — Phase 3 inherits.
- **No print styles.** Flashcards is screen-only; chassis print rules already hide chrome — the card itself renders fine if printed (collateral robustness, not a feature).
- **No third-party design system, no Tailwind, no shadcn, no Alpine, no htmx.** Per CLAUDE.md "What NOT to Use".

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS — French, sober, exam-grade; all elements specified; no destructive copy needed
- [ ] Dimension 2 Visuals: PASS — flat, no animation, no icon library; component inventory complete
- [ ] Dimension 3 Color: PASS — 60/30/10 inherited; accent reserved list explicit; grade buttons carry semantic colors only on hover/focus
- [ ] Dimension 4 Typography: PASS — three families inherited from chassis; size-role mapping declared per element
- [ ] Dimension 5 Spacing: PASS — chassis `--space-*` scale (multiples of 4); 44px touch-target exceptions documented
- [ ] Dimension 6 Registry Safety: PASS — zero registries, zero CDN deps, zero shadcn blocks

**Approval:** pending

---

## UI-SPEC COMPLETE
