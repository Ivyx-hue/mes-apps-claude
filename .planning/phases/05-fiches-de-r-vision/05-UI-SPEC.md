---
phase: 5
slug: fiches-de-r-vision
status: draft
shadcn_initialized: false
preset: none
created: 2026-05-27
---

# Phase 5 — UI Design Contract (Fiches de révision)

> Visual + interaction contract for the new surface mounted inside `#panel-fiches` of `outils.html`.
> The design system (chassis.css, tokens, fonts, layer order) is **FROZEN** from Phases 1–4 and is **not re-designed here**.
> Phase 4 `04-UI-SPEC.md` is the authoritative pattern reference for component discipline — Phase 5 reuses the same OKLCH tokens, the same Fraunces/Inter/JetBrains Mono typography hierarchy, the same theme-picker shape, the same IIFE discipline, and the same zero-animation contract.
> This contract locks only the new components Phase 5 adds: the **Fiches panel** (theme picker → fiche article with 6-section template → in-fiche ToC → Questions clés `<details>` items) and the **`@media print` extensions** for per-fiche page breaks and panel isolation.
> All new CSS lives inside `@layer components` in `chassis.css`, gated by `#panel-fiches` parent selector and prefixed `.fi-*` (CONTEXT.md DEC-06). **No chassis tokens are added.** **No chassis tokens are mutated.**
> Sources: CONTEXT.md (DEC-01..DEC-09), DISCUSSION-LOG.md, ROADMAP.md Phase 5, REQUIREMENTS.md FICHE-01/FICHE-02, chassis.css token scan.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none (vanilla HTML + CSS + JS — project invariant PERSIST-02 / CLAUDE.md "no build step") |
| Preset | not applicable |
| Component library | none (hand-authored components prefixed `.fi-*`, scoped to `#panel-fiches`) |
| Icon library | none — Phase 5 ships no icon library. The `<details>` expand affordance uses the browser-native `<summary>` triangle (no custom SVG). No other icons introduced. |
| Font | Inherited from chassis.css: **Inter** (`--font-sans`, body prose + picker + ToC + Questions clés metadata), **Fraunces** (`--font-serif`, fiche title h2 + section headings h3 + sub-headings h4), **JetBrains Mono** (`--font-mono`, inline citations `<code>` for regulatory refs + source URLs in print footnotes). No new font loaded. |

**Scoping rule (binding):**
- All Phase 5 selectors **MUST** start with `#panel-fiches` (parent-selector scoping) — never a bare `.fi-*` selector.
- Class names **MUST** be prefixed `.fi-` (fiche namespace).
- **DO NOT** add new `:root` custom properties. Reuse existing tokens: `--bg-1`, `--bg-2`, `--ink-1`, `--ink-2`, `--ink-3`, `--accent`, `--accent-soft`, `--border-subtle`, `--focus-ring`, `--space-*`, `--step-*`, `--radius-*`, `--measure`.
- **DO NOT** modify any existing chassis rule (including `.fc-*` and `.qz-*` blocks). Phase 5 is **additive only**.
- The `.fi-*` block is appended to `chassis.css @layer components` immediately after the Phase 4 `.qz-*` block (which ends at line 1411). Print extensions are appended inside the existing `@media print` block (which ends at line 1489).

---

## Spacing Scale

**Inherited from chassis.css `@layer tokens` — Phase 5 reuses, does not redefine.**

| Token | Value | Phase 5 usage |
|-------|-------|---------------|
| `--space-xs` | 0.25rem (4px) | Gap between inline `<summary>` triangle and the question text inside `.fi-qa`; padding-block of the source-line `<code>` ref tag |
| `--space-sm` | 0.5rem (8px) | Gap between ToC anchor links; padding inside `.fi-toc` nav on mobile; gap between list items in `.fi-section` definition lists (`<dd>` + `<dt>` pairs) |
| `--space-md` | 1rem (16px) | Paragraph spacing inside each fiche section (`margin-block-end` on `<p>`); padding inside `.fi-qa` (Questions clés detail block); gap between fiche sections |
| `--space-lg` | 1.5rem (24px) | Padding around the `.fi-fiche` container on desktop; vertical rhythm between theme picker / fiche article; padding inside `.fi-toc` on desktop |
| `--space-xl` | 2rem (32px) | Top padding of `#panel-fiches` on desktop; gap between the fiche title block and the first section |
| `--space-2xl` | 3rem (48px) | `margin-block-start` of each `<section>` child inside `.fi-fiche` (breathing room between the 6 fixed sections on screen) |
| `--space-3xl` | 4rem (64px) | Reserved — not used in Phase 5 |

### Exceptions (Phase 5 specific)

| Exception | Value | Justification |
|-----------|-------|---------------|
| Theme `<select>` **minimum touch target** | `min-height: 44px` | WCAG 2.5.5 — owner studies on phone. Identical to Phase 3/4 theme select treatment. |
| In-fiche ToC sticky offset | `top: var(--header-h)` (4rem = 64px) | Sticky `.fi-toc` on desktop uses the chassis `--header-h` token as the top offset so it clears the fixed site header. Not a new spacing value — reuses existing token. |
| `.fi-qa > summary` **minimum touch target** | `min-height: 44px` | Questions clés `<details>` summary is an interactive control on mobile. |
| Print `margin` per fiche | `1cm` on all sides via `@page` | Standard A4 print margin. Not a spacing scale token — lives in `@media print` only. |

---

## Typography

**Inherited from chassis.css. Three families, fluid scale. Same role-mapping discipline as Phases 3 and 4.**

### Screen typography

| Role | Token | Family | Weight | Line height | Phase 5 element |
|------|-------|--------|--------|-------------|-----------------|
| Theme picker label | `--step-0` (14px) | `--font-sans` | 500 | 1.4 | `.fi-theme label` |
| Theme picker `<select>` text | `--step-0` (14px) | `--font-sans` | 400 | 1.4 | `#fi-theme-select` |
| **Fiche title (h2)** | `--step-4` (clamp 28–40px) | **`--font-serif`** (Fraunces) | 600 | 1.15 | `.fi-fiche > header > h2.fi-title` — largest heading in the panel; `text-wrap: balance` |
| Fiche subtitle / theme slug line | `--step-0` (14px) | `--font-mono` | 400 | 1.4 | `.fi-fiche > header > .fi-meta` — e.g. `duerp · 6 sections · 8 questions clés`. `color: var(--ink-3)`. |
| **In-fiche ToC heading** (sr-only) | `--step-0` (14px) | `--font-sans` | 500 | 1.4 | `nav.fi-toc > h3.sr-only` — "Dans cette fiche" label, screen-reader only |
| ToC anchor links | `--step-0` (14px) | `--font-sans` | 400 | 1.4 | `nav.fi-toc a` — `color: var(--ink-2)` idle, `var(--accent)` on hover/focus |
| **Section heading (h3)** | `--step-3` (clamp 20–24px) | **`--font-serif`** (Fraunces) | 600 | 1.2 | `.fi-section > h3` — one per each of the 6 fixed sections. `text-wrap: balance`. |
| Sub-heading (h4, inside a section) | `--step-2` (clamp 17–18px) | **`--font-serif`** (Fraunces) | 600 | 1.3 | `.fi-section > h4` — optional, only where a section has sub-topics (e.g. multiple ISO norms under Cadre légal) |
| **Body prose** | `--step-1` (16px) | `--font-sans` | 400 | 1.6 | `.fi-section p` — main reading register; `max-width: var(--measure)` (68ch) to maintain optimal line length |
| Definition term (`<dt>`) | `--step-1` (16px) | `--font-sans` | 600 | 1.5 | `.fi-section dt` — bold term in definition lists |
| Definition value (`<dd>`) | `--step-1` (16px) | `--font-sans` | 400 | 1.5 | `.fi-section dd` — `color: var(--ink-1)`, `padding-inline-start: var(--space-md)` |
| Bullet list items | `--step-1` (16px) | `--font-sans` | 400 | 1.6 | `.fi-section li` — `max-width: var(--measure)` |
| Inline source citation | `--step-0` (14px) | `--font-sans` (authority) + `--font-mono` (ref code) | 400 | 1.5 | `span.fi-cite` — `(INRS — <code>Dossier risque chimique</code>)` pattern; `color: var(--ink-2)` for the wrapper |
| Regulatory ref (inline `<code>`) | 0.9em of parent | `--font-mono` | 400 | — | `code` inside `.fi-section` — inherits chassis base `code` rule |
| **Questions clés — summary** | `--step-1` (16px) | `--font-sans` | 500 | 1.4 | `details.fi-qa > summary` — question stem; `color: var(--ink-1)` |
| Questions clés — answer | `--step-1` (16px) | `--font-sans` | 600 | 1.5 | `.fi-qa-answer` — canonical answer revealed on expand |
| Questions clés — explanation | `--step-1` (16px) | `--font-sans` | 400 | 1.6 | `.fi-qa-explanation` — `color: var(--ink-2)` |
| Questions clés — source line | `--step-0` (14px) | `--font-sans` + `--font-mono` (ref) | 400 | 1.5 | `.fi-qa-source` — identical rendering to Phase 3/4 source line |
| **Sources section** — bibliography item | `--step-0` (14px) | `--font-sans` | 400 | 1.5 | `.fi-sources-list li` — authority + ref + URL; URL wrapped in `<a>` |
| Empty / error state message | `--step-1` (16px) | `--font-sans` | 400 | 1.6 | `.fi-empty`, `.fi-error` — `color: var(--ink-2)` |

**Body line-height: 1.6 (chassis default for prose).** **Heading line-height: 1.15–1.3 (chassis defaults per element level).** No new line-height values introduced.

### Print typography (overrides within `@media print`)

| Role | Value | Rule |
|------|-------|------|
| Body font size | 11pt | `#panel-fiches { font-size: 11pt; }` — slightly smaller than screen 16px for A4 density |
| Body line-height | 1.55 | Matches chassis body `line-height: 1.55` baseline |
| Fiche title (h2) | `--step-3` equivalent (~18pt) | `#panel-fiches .fi-title { font-size: 1.5rem; }` — scale down for print page economy |
| Section headings (h3) | `--step-2` equivalent (~14pt) | `#panel-fiches .fi-section h3 { font-size: 1.15rem; }` |
| Source citation | 9pt | `#panel-fiches .fi-cite { font-size: 0.8em; }` |
| Questions clés summary | `--step-1` equivalent (12pt) | Inherits from print body; no override needed |

---

## Color

**60 / 30 / 10 split — inherited from chassis. Dark default, `light-dark()`-aware. Same mapping discipline as Phases 3 and 4.**

| Role | Token | OKLCH (dark mode reference) | Phase 5 usage |
|------|-------|------------------------------|---------------|
| Dominant (60%) — page background | `--bg-1` | `oklch(15% 0.012 65)` | `#panel-fiches` background; `.fi-fiche` base surface |
| Secondary (30%) — card/article surfaces | `--bg-2` | `oklch(19% 0.014 65)` | `.fi-fiche` article background (the entire fiche is rendered on `--bg-2` with border `1px solid var(--border-subtle)` — same card treatment as `.qz-card` / `.fc-card`); `.fi-toc` background on desktop sticky variant |
| Accent (10%) | `--accent` / `--accent-soft` | `oklch(74% 0.10 78)` | **Reserved list — see below** |
| Neutral ink scale | `--ink-1` / `--ink-2` / `--ink-3` | already declared | Body text `--ink-1`; secondary prose / metadata / citation wrapper `--ink-2`; monospace ref codes / decorative prefixes `--ink-3`. |
| Focus ring | `--focus-ring` | `oklch(82% 0.18 250)` | All Phase 5 focusable elements via inherited `:focus-visible` rule (chassis line 142). Do not override. |

### Accent reserved for (explicit list — never "everywhere")

The accent (`--accent` / `--accent-soft`) is used in Phase 5 **only** for:

1. **The active/hover ToC anchor link** — `nav.fi-toc a:hover`, `nav.fi-toc a:focus-visible`: `color: var(--accent)`. The ToC is the only navigational CTA in the panel; accent signals the action affordance.
2. **The `<summary>` hover state inside `.fi-qa`** — `details.fi-qa > summary:hover`: `color: var(--accent)`. Signals that each question stem is expandable. On idle, summary is `var(--ink-1)`.
3. **Section heading accent bar** — each `.fi-section > h3::after` gets a `2px solid var(--accent)` underline (same `::after` visual-rhythm pattern as the hub's `section h2::after` in chassis). Ties Phase 5 section headings to the existing design language.

Accent is **NOT** used for:
- Body prose (reads `--ink-1`).
- Definition terms (uses `--ink-1` weight 600 — emphasis via weight, not color).
- Questions clés answer text (reads `--ink-1` weight 600 — same as definition terms).
- The fiche article border (uses `--border-subtle`).
- The print stylesheet (print forces `oklch(10% 0 0)` for everything except link expansion, per existing chassis §7 rules).

### Section separator treatment

Each `.fi-section` (there are 6 per fiche) is separated by:
- `border-top: 1px solid var(--border-subtle)` at the top of each section after the first.
- `padding-block-start: var(--space-2xl)` above the section heading.
- No background color change per section — the fiche is one contiguous `--bg-2` surface.

### Questions clés (`<details>`) visual state

| State | Border | Background | Summary text color |
|-------|--------|------------|-------------------|
| **Collapsed** (default on screen) | `1px solid var(--border-subtle)` | transparent | `var(--ink-1)` |
| **Expanded** | `1px solid var(--accent)` | `color-mix(in oklch, var(--accent-soft) 60%, transparent)` | `var(--ink-1)` |
| **Hover / focus-visible** (collapsed) | `1px solid var(--accent)` | transparent | `var(--accent)` |

**In print**: all `<details>` are forced open (see Print contract below). The expand/collapse UI is irrelevant in print.

---

## Copywriting Contract

All copy is **French**, `tu` address, sober exam-grade register. No emojis. No exclamation marks. Consistent with Phase 3/4 voice rules. Source: CONTEXT.md DEC-04 + Phase 3/4 voice rules.

### Panel (`#panel-fiches`)

| Element | Copy |
|---------|------|
| Panel heading (visually hidden — `<h2 class="sr-only">`) | `Fiches de révision` |
| Theme picker label | `Thème` |
| Theme picker — 15 options (no "Tous les thèmes" — DEC-01) | Same French display names as Phase 3/4 picker: `DUERP` · `Principes généraux` · `ISO 9001` · `ISO 14001` · `ISO 45001` · `TMS` · `Risque routier` · `Risque chimique` · `RPS` · `Espaces confinés` · `Acronymes` · `Métiers` · `Calendrier alternance` · `ICPE / Seveso` · `RNCP` |
| Theme picker default selected | `DUERP` (default theme per DEC-04 `prefs.lastFicheTheme \|\| 'duerp'`) |
| In-fiche ToC heading (sr-only) | `Dans cette fiche` |
| ToC link labels (6 fixed sections) | `TL;DR` · `Définitions` · `Cadre légal` · `Démarche` · `Pièges fréquents` · `Sources` |
| **Fiche section 1 heading** | `TL;DR` |
| **Fiche section 2 heading** | `Définitions` |
| **Fiche section 3 heading** | `Cadre légal et normatif` |
| **Fiche section 4 heading** | `Démarche et méthode` |
| **Fiche section 5 heading** | `Pièges fréquents` |
| **Fiche section 6 heading** | `Sources` |
| Questions clés section sub-heading (h3) | `Questions clés` (rendered before the list of `.fi-qa` details blocks, inside section 4 or as a standalone 7th section — see Layout contract) |
| `.fi-qa > summary` expand hint (appended) | `▸` (U+25B8 BLACK RIGHT-POINTING SMALL TRIANGLE) prepended to the question text in screen mode via CSS `content` — CSS-only, not in DOM. In print, suppressed. |
| **Empty state heading** (theme slug resolves to no fiche) | `Fiche introuvable` |
| **Empty state body** | `Aucune fiche disponible pour ce thème. Sélectionne un autre thème dans la liste.` |
| **Bank-load error state** | `Impossible de charger les données. Recharge la page ou vérifie que outils-data.js est bien servi.` |
| Fiche meta line format | `{THEME_DISPLAY_NAME} · {N} questions clés` — e.g. `DUERP · 7 questions clés` |

### Destructive actions

None in Phase 5. The Fiches panel is read-only (DEC-09). No writes to `qhse-srs-v1`, `qhse-scores-v1`, or any destructive local storage key. The only write is `qhse-prefs-v1.lastFicheTheme` (merge-safe). No confirmation dialogs required.

### Voice rules (carried from Phases 3 and 4 unchanged)

- Address the owner with `tu`.
- No marketing voice. Section headings are functional (`Définitions`, `Pièges fréquents`) — not promotional.
- No nudging copy. Fiches are a reading surface, not a gamified tool.
- No technical jargon in error copy. User-facing errors speak French QHSE register only.
- Inline source citations follow the Découverte v1.0 style: `(INRS — Dossier risques chimiques)` — authority in sans, regulatory ref in `<code>` for mono treatment, full URL as `<a href>` target.

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none (not applicable — no shadcn in this project) | not required |
| Third-party | none | not required |

No third-party registries. No CDN assets introduced. Zero new network dependencies. Lucide inline SVGs remain deferred (no icons in Phase 5).

---

## Layout and Interaction Contracts

**This section carries the interaction decisions the planner and executor need. Not in the standard template — added per Phase 4 precedent.**

### Composition: `#panel-fiches` (top-to-bottom)

```
┌────────────────────────────────────────────────────────────┐
│ <h2 class="sr-only">Fiches de révision</h2>                 │
├────────────────────────────────────────────────────────────┤
│ .fi-theme                                                   │
│   Thème  [ DUERP                        ▾ ]                 │
│   (15 options, no "Tous les thèmes", default: lastFicheTheme│
│    || 'duerp'; persists to qhse-prefs-v1 on change)         │
├────────────────────────────────────────────────────────────┤
│ nav.fi-toc  (in-fiche ToC — screen only, print-hidden)      │
│   <h3 class="sr-only">Dans cette fiche</h3>                 │
│   <ol>                                                      │
│     <li><a href="#fi-s-tldr">TL;DR</a></li>                 │
│     <li><a href="#fi-s-defs">Définitions</a></li>           │
│     <li><a href="#fi-s-cadre">Cadre légal</a></li>          │
│     <li><a href="#fi-s-demarche">Démarche</a></li>          │
│     <li><a href="#fi-s-pieges">Pièges fréquents</a></li>    │
│     <li><a href="#fi-s-sources">Sources</a></li>            │
│   </ol>                                                     │
│   (Sticky at top of fiche on ≥48rem;                        │
│    inline above fiche title on <48rem — no sticky mobile)   │
├────────────────────────────────────────────────────────────┤
│ article.fi-fiche  (rendered per selected theme)             │
│   <header class="fi-fiche-header">                          │
│     <h2 class="fi-title">DUERP</h2>                         │
│     <p class="fi-meta">DUERP · 7 questions clés</p>         │
│   </header>                                                 │
│                                                             │
│   <section id="fi-s-tldr"  data-fi-section="tldr">          │
│     <h3>TL;DR</h3>                                          │
│     <p>2-3 sentence summary prose…</p>                      │
│   </section>                                                │
│                                                             │
│   <section id="fi-s-defs"  data-fi-section="definitions">   │
│     <h3>Définitions</h3>                                    │
│     <dl>                                                    │
│       <dt>DUERP</dt><dd>Document Unique d'Évaluation…</dd>  │
│       …                                                     │
│     </dl>                                                   │
│   </section>                                                │
│                                                             │
│   <section id="fi-s-cadre" data-fi-section="cadre-legal">   │
│     <h3>Cadre légal et normatif</h3>                        │
│     <p>…inline citations <span class="fi-cite">…</span>…</p>│
│   </section>                                                │
│                                                             │
│   <section id="fi-s-demarche" data-fi-section="demarche">   │
│     <h3>Démarche et méthode</h3>                            │
│     <p>…</p>                                                │
│                                                             │
│     <h4>Questions clés</h4>                                 │
│     <div class="fi-qa-list">                                │
│       <details class="fi-qa">                               │
│         <summary>Quelle est la périodicité…?</summary>      │
│         <p class="fi-qa-answer">Au moins annuelle…</p>      │
│         <p class="fi-qa-explanation">…ink-2 prose…</p>      │
│         <p class="fi-qa-source">INRS — <code>R4121-1</code> │
│           <a href="…" rel="noopener noreferrer">…</a></p>   │
│       </details>                                            │
│       … (5–10 items per theme)                              │
│     </div>                                                  │
│   </section>                                                │
│                                                             │
│   <section id="fi-s-pieges" data-fi-section="pieges">       │
│     <h3>Pièges fréquents</h3>                               │
│     <ul>                                                    │
│       <li>…confusable point…</li>                           │
│       …                                                     │
│     </ul>                                                   │
│   </section>                                                │
│                                                             │
│   <section id="fi-s-sources" data-fi-section="sources">     │
│     <h3>Sources</h3>                                        │
│     <ul class="fi-sources-list">                            │
│       <li>INRS — Dossier DUERP — <a href="…">…</a></li>    │
│       …                                                     │
│     </ul>                                                   │
│   </section>                                                │
│                                                             │
│ </article>                                                  │
└────────────────────────────────────────────────────────────┘
```

**Placement of Questions clés sub-section:** inside `<section data-fi-section="demarche">` as an `<h4>Questions clés</h4>` + `.fi-qa-list` block. Rationale: the questions flow from the démarche content — the user reads the method, then tests understanding. The Sources section (always last) stays clean. This is a planner's call on per-fiche authoring; the UI contract declares the container, not the mandatory parent section.

### In-fiche ToC — responsive behavior

| Viewport | Behavior |
|----------|----------|
| **< 48rem (mobile)** | `.fi-toc` renders inline above `.fi-fiche-header`, no sticky position. `position: static`. Links displayed as a horizontal flex row with `flex-wrap: wrap`, gap `--space-sm`. Compact height. |
| **≥ 48rem (desktop)** | `.fi-toc` renders inline above `.fi-fiche-header` but also has `position: sticky; top: var(--header-h)` applied only if the fiche content height exceeds the viewport. Implemented via `position: sticky` on `.fi-toc` (CSS-only, no JS IntersectionObserver). The ToC stays readable at the top of the panel while the user scrolls through long fiches. |

**No sidebar ToC layout.** The ToC is inline above the fiche content on both breakpoints. The desktop sticky behavior is vertical-scroll stickiness within the panel column, not a two-column sidebar (which would complicate the single-column fiche layout and break print).

**Print:** `.fi-toc` is hidden in print (`display: none`) — already covered by the existing chassis print rule `nav { display: none }` (line 1463 pattern).

### Responsive layout (one breakpoint at 48rem — matches chassis)

| Viewport | Theme picker | Fiche article | ToC | fi-qa items |
|----------|--------------|---------------|-----|-------------|
| **< 48rem (mobile)** | Full width below heading; label stacks above `<select>` | Full width, `padding: var(--space-md)`, `margin-inline: 0` | Inline above fiche, horizontal flex, wrapping | Stacked full-width `<details>` |
| **≥ 48rem (desktop)** | Inline: label left of `<select>`, `min-width: 16rem; max-width: 24rem` | `max-width: 48rem`, `margin-inline: auto`, `padding: var(--space-lg)` | Inline above fiche, sticky on scroll | Same stacked `<details>` — no grid reshuffle |

### Fiche article visual treatment

- `.fi-fiche` background: `var(--bg-2)` — same card surface as `.qz-card` / `.fc-card`.
- `.fi-fiche` border: `1px solid var(--border-subtle)`; `border-radius: var(--radius-lg)` (1rem).
- `.fi-fiche` shadow: **none** — flat, paper-on-table aesthetic (Phase 3 invariant, carried).
- `.fi-fiche` padding: `var(--space-lg)` desktop / `var(--space-md)` mobile.
- `.fi-fiche` `max-width: 48rem` centered on desktop (consistent with `.qz-card` desktop width, readable prose measure within).
- `.fi-fiche-header` bottom border: `1px solid var(--border-subtle)`, `padding-block-end: var(--space-lg)`, `margin-block-end: var(--space-xl)` — visually separates the title block from the first section.
- `.fi-title` uses `--step-4` (Fraunces 600) — the focal heading of the panel.
- `.fi-meta` (theme slug line): `--step-0`, mono, `color: var(--ink-3)`.
- Section headings (`.fi-section > h3`): `--step-3` Fraunces 600 — each gets a `::after` with `2px solid var(--accent)` underline (same `::after` rhythm pattern as chassis `section h2::after`).
- **No flip animation. No slide animation.** Fiche switching on theme picker change is an instant DOM replace (the IIFE clears and re-renders the `.fi-fiche` element synchronously on `change` event). No `[hidden]` toggle between multiple pre-rendered fiches — only one fiche is in the DOM at a time.

### Questions clés (`<details>`) — screen interaction

- All `.fi-qa` are **collapsed by default** in screen mode. The summary shows the question stem prepended with a CSS `▸` triangle via `::before content`.
- On expand (`open` attribute set by browser): the border changes to `1px solid var(--accent)` and background gets `--accent-soft` tint.
- The expanded block shows: answer (`--ink-1`, weight 600) → explanation (`--ink-2`, weight 400) → source line (authority + `<code>` ref + `<a>` URL).
- Questions clés items are editorial selections (5–10 per theme). They are programmatically fetched from `window.BANK.filter(i => i.theme === slug)` with editorial pre-selection baked into a `fiches-data.js` `selectedIds[]` array per theme — the IIFE renders only the selected IDs.
- `cursor: pointer` on `<summary>` idle; `cursor: pointer` on `<summary>` hover.
- Keyboard: browser-native `<details>` keyboard behavior (Space / Enter to expand/collapse on focused `<summary>`). No custom key handlers.

### Keyboard contract

| Control | Key | Action |
|---------|-----|--------|
| `#fi-theme-select` | Arrow Up/Down | Browser-native option selection |
| `#fi-theme-select` | Enter | Confirm selection (browser native; IIFE listens to `change` event) |
| ToC `<a>` links | Enter / Space | Scroll to section anchor (browser smooth scroll via `scroll-behavior: smooth` on `html`) |
| `.fi-qa > summary` (focused) | Enter / Space | Toggle `<details>` open/closed (browser native) |
| Any focusable element | Tab / Shift-Tab | Natural DOM order focus movement |
| Any element | Arrow keys | Pass-through — no custom arrow key capture |

**No global document-level keydown handlers.** Same discipline as Phases 3 and 4. No `document.addEventListener('keydown', …)`.

**Focus management on theme change:**
- After `#fi-theme-select` `change` event fires and IIFE re-renders the fiche: focus moves to `.fi-title` (`tabindex="-1"`, `focus()` called programmatically). This is the fiche's natural reading start point. Screen readers hear the new fiche title immediately.

### ARIA contract

- `#panel-fiches` already has `role="tabpanel"` `aria-labelledby="tab-fiches"` `tabindex="0"` (chassis-managed; do not change).
- First child of `#panel-fiches`: `<h2 class="sr-only">Fiches de révision</h2>` — screen-reader panel landmark (mirrors Phase 3/4 pattern).
- `#fi-theme-select`: accessible label via associated `<label for="fi-theme-select">Thème</label>`.
- `nav.fi-toc`: `aria-label="Sommaire de la fiche"` — distinguishes it from the site nav (which has its own `aria-label`).
- Each ToC `<a href="#fi-s-{slug}">` links to the corresponding section `id` — native anchor navigation, no JS.
- `.fi-title`: `tabindex="-1"` so the IIFE can call `.focus()` programmatically on theme change without the element appearing in natural tab order.
- `.fi-fiche`: `aria-live="polite"` region — announces fiche replacement on theme change to screen readers. (Light wrapper; `aria-atomic="false"` so only the changed content is announced, not the entire fiche re-read.)
- `details.fi-qa`: browser-native `<details>/<summary>` semantics; no `role` override needed.
- `details.fi-qa > summary`: the `▸` triangle is CSS `::before content` only — not in the DOM, so screen readers do not read it. The summary text alone is the accessible label.
- `.fi-cite > a`: `target="_blank"` `rel="noopener noreferrer"` — same link safety pattern as Biblio cards and Découverte v1.0.
- Source `<a>` elements: `aria-label` not required — the anchor text is the authority name, which is descriptive.

### Motion contract

- **Zero declared transitions in Phase 5.** Same discipline as Phases 3 and 4.
- Fiche replacement on theme change: instant DOM re-render (innerHTML clear + appendChild equivalent via createElement).
- `.fi-qa` expand/collapse: browser-native `<details>` toggle — no CSS animation added. The `open` attribute change is instant.
- Sticky ToC repositioning: CSS `position: sticky` is handled by the browser compositor — no JS animation.
- No `@starting-style` entrance animations (deferred per CLAUDE.md stack — the project never adopted them).

The chassis `prefers-reduced-motion` block (lines 22–29) covers Phase 5 transparently since Phase 5 adds no animations.

---

## Print Contract (FICHE-02)

**This section extends `chassis.css @media print` (§7, lines 1460–1489). Phase 5 adds exactly the rules below. No existing print rules are modified.**

### What chassis §7 already covers (do not re-add)

| Rule already present | Effect on fiches |
|----------------------|-----------------|
| `header, .skip-link, .nav-toggle, .burger { display: none !important }` | Removes sticky site header — fiche starts at top of page |
| `:root { color-scheme: light }` | Forces light mode — no dark ink waste on paper |
| `body { background: #fff; color: oklch(10% 0 0) }` | White page, near-black text |
| `h1, h2, h3 { font-family: var(--font-serif); color: oklch(10% 0 0); page-break-after: avoid }` | Fraunces headings, no orphan headings |
| `a[href^="http"]::after { content: " (" attr(href) ")"; font-family: var(--font-mono); font-size: 0.85em; color: #444; word-break: break-all }` | External link URLs printed as footnotes — covers `.fi-cite a`, `.fi-sources-list a`, `.fi-qa-source a` automatically |
| `h2::after { display: none }` | Hides accent underline bars on headings |
| `p, li { max-width: none }` | Restores full-width prose for A4 columns |
| `section { break-inside: avoid-page }` | Prevents sections splitting mid-page |

### New rules Phase 5 adds inside `@media print`

```
/* ---- Phase 5 print extensions ---- */

/* 1. Hide everything except the active fiches panel */
#panel-flashcards,
#panel-qcm,
#panel-tests,
[role="tablist"] { display: none !important; }

/* 2. Show the fiches panel even if [hidden] attribute is set
   (user may print from a tab other than Fiches) */
#panel-fiches { display: block !important; }

/* 3. Page break before each fiche article (for future multi-fiche print runs
   where multiple articles might be rendered; currently only one is rendered
   at a time, but the rule is harmless and forward-safe) */
#panel-fiches .fi-fiche { page-break-before: always; }

/* 4. Hide the theme picker and ToC in print — not useful on paper */
#panel-fiches .fi-theme,
#panel-fiches nav.fi-toc { display: none !important; }

/* 5. Force all <details> open in print — Questions clés must be readable */
#panel-fiches details.fi-qa { display: block; }
#panel-fiches details.fi-qa > summary {
  display: block;
  font-weight: 600;
  list-style: none;  /* remove triangle */
}
#panel-fiches details.fi-qa > summary::before { content: none; }  /* remove CSS triangle */

/* 6. Section headings — restore the accent underline bar in grayscale-safe version
   (the chassis rule `h2::after { display: none }` hides .fi-section h3::after too;
   re-add as a solid black bottom border for print scannability) */
#panel-fiches .fi-section > h3 {
  border-bottom: 1px solid oklch(30% 0 0);
  padding-block-end: 0.2em;
  margin-block-end: 0.5em;
}

/* 7. Sources section — break-before so bibliography starts fresh */
#panel-fiches [data-fi-section="sources"] { page-break-before: always; }

/* 8. Remove card chrome for print — flat white is more print-appropriate */
#panel-fiches .fi-fiche {
  background: #fff;
  border: none;
  border-radius: 0;
  padding: 0;
  max-width: none;
  margin: 0;
}
```

**A4 page margin:** the browser default (`@page { margin: 1cm }` is a suggestion in the print block — do NOT add `@page` rules if they conflict with existing chassis. Check chassis for existing `@page`; if absent, add `@page { margin: 1cm; size: A4 portrait; }` inside `@media print`.)

**Print button:** none. Ctrl+P only (DEC-07/DEC-08). No `window.print()` button in the panel. No DOM element, no copy for it.

---

## Component Inventory (for planner)

| Component | Selector | Role | Mount surface |
|-----------|----------|------|---------------|
| Fiches panel heading (sr-only) | `#panel-fiches > h2.sr-only` | Screen-reader panel landmark | First child of `#panel-fiches` |
| Theme picker | `#panel-fiches .fi-theme` | Label + native `<select>` | Second child of `#panel-fiches` |
| Fiches theme `<select>` | `#fi-theme-select` | Theme filter | Inside `.fi-theme` |
| In-fiche ToC | `#panel-fiches nav.fi-toc` | Anchor nav for 6 sections | Third child of `#panel-fiches` |
| Fiche article | `#panel-fiches article.fi-fiche` | Full fiche content container | Fourth child (replaced on theme change) |
| Fiche header | `.fi-fiche > header.fi-fiche-header` | Title + meta line | First child of `.fi-fiche` |
| Fiche title | `.fi-title` (h2) | Theme display name | Inside `.fi-fiche-header` |
| Fiche meta | `.fi-meta` (p) | Theme slug + QA count | Inside `.fi-fiche-header` |
| Section — TL;DR | `section#fi-s-tldr[data-fi-section="tldr"]` | 2-3 sentence summary | First section in `.fi-fiche` |
| Section — Définitions | `section#fi-s-defs[data-fi-section="definitions"]` | `<dl>` key terms | Second section |
| Section — Cadre légal | `section#fi-s-cadre[data-fi-section="cadre-legal"]` | Legal + normative framework | Third section |
| Section — Démarche | `section#fi-s-demarche[data-fi-section="demarche"]` | Actionable method + Questions clés sub-section | Fourth section |
| Questions clés container | `.fi-qa-list` | Wraps all `.fi-qa` `<details>` | Inside `[data-fi-section="demarche"]` |
| Questions clés item | `details.fi-qa` | Expandable Q/R from BANK | Inside `.fi-qa-list` (5–10 per fiche) |
| Questions clés answer | `.fi-qa-answer` (p) | Canonical answer | Inside `.fi-qa`, after `<summary>` |
| Questions clés explanation | `.fi-qa-explanation` (p) | Explanation in ink-2 | Inside `.fi-qa`, after `.fi-qa-answer` |
| Questions clés source | `.fi-qa-source` (p) | Authority + `<code>` ref + `<a>` URL | Inside `.fi-qa`, last child |
| Section — Pièges | `section#fi-s-pieges[data-fi-section="pieges"]` | `<ul>` of exam traps | Fifth section |
| Section — Sources | `section#fi-s-sources[data-fi-section="sources"]` | Bibliography `<ul>` | Sixth section |
| Inline citation | `span.fi-cite` | `(Authority — <code>ref</code>)` wrapper | Inside prose in any section |
| Empty state | `.fi-empty` | No-fiche message | Replaces `.fi-fiche` when no content found |
| Error state | `.fi-error` | Bank-load failure message | Replaces `.fi-fiche` on IIFE boot error |

---

## Data Contract (for planner — content authoring)

The 15 fiches' prose lives in a new `qhse-cesi/fiches-data.js` file (parallel to `outils-data.js`), exposing `window.FICHES` — an array of objects with this shape:

```js
{
  slug: 'duerp',           // matches BANK theme slug (DEC-01)
  title: 'DUERP',          // French display name (same as theme picker)
  tldr: '',                // 2-3 sentence string
  definitions: [           // array of {term, value} objects
    { term: 'DUERP', value: '…' },
  ],
  cadreLegal: '',          // HTML string of prose with <span class="fi-cite"> citations
  demarche: '',            // HTML string of prose
  selectedIds: [],         // BANK item IDs for Questions clés (5-10 per theme)
  pieges: [],              // array of strings (bullet list items)
  sources: [               // array of {authority, ref, url}
    { authority: 'INRS', ref: 'R4121-1', url: 'https://…' },
  ],
}
```

**XSS discipline:** The IIFE builds DOM via `createElement` + `textContent` for all string fields (title, tldr, definitions, pieges, sources, Questions clés answer/explanation/source). The `cadreLegal` and `demarche` fields may use limited safe HTML (only `<p>`, `<strong>`, `<em>`, `<span class="fi-cite">`, `<a>`, `<code>`, `<ul>`, `<li>`) — if so, the IIFE uses a trusted `setHTML`-equivalent whitelist pattern, not raw `innerHTML` on unfiltered user input (content is hand-authored, static, committed — no runtime user data, so the risk is minimal, but Pattern S3 discipline still applies).

**No new localStorage key.** Only `qhse-prefs-v1.lastFicheTheme` is written (merge-safe, DEC-09).

---

## IIFE Boot Contract (for planner)

| Property | Value |
|----------|-------|
| Guard variable | `__fiBooted` |
| Entry point | `document.addEventListener('DOMContentLoaded', boot)` |
| Globals consumed | `window.BANK` (from `outils-data.js` deferred script) + `window.FICHES` (from `fiches-data.js` deferred script) |
| Globals mutated | none (`window.SRS` untouched; read-only surface) |
| Storage reads | `qhse-prefs-v1` → `lastFicheTheme` |
| Storage writes | `qhse-prefs-v1` → `lastFicheTheme` only, via merge-safe `writePrefs` helper (same pattern as Plans 04-02/04-03) |
| Panel scope | All event listeners attached to elements inside `#panel-fiches` only; no `document.addEventListener` |
| Storage invariant | `qhse-srs-v1` and `qhse-scores-v1` are **never touched** (DEC-09 / D-V2-03 extended to Phase 5) |

---

## Pre-Population Sources

Every design decision in this contract was pre-populated from upstream artifacts. No questions were asked during this UI research session.

| Source | Decisions Used |
|--------|----------------|
| `05-CONTEXT.md` (DEC-01..DEC-09) | 9 locked decisions: découpage, content model, template structure, navigation UX, IIFE pattern, CSS namespace, print integration (Ctrl+P only), source line builder, storage invariant |
| `05-DISCUSSION-LOG.md` | 3 gray areas resolved (découpage, source, structure), 6 Claude's Discretion deferred items confirmed |
| `chassis.css` (scanned lines 1–1489) | All tokens, spacing scale, typography scale, color tokens, `.qz-*` namespace pattern (lines 883–1411), print §7 rules (lines 1460–1489) |
| `04-UI-SPEC.md` | Typography role mapping, color contract, spacing exceptions, ARIA contract, keyboard contract, motion contract — all inherited |
| `REQUIREMENTS.md` FICHE-01/FICHE-02 | Scope: structured sheets per theme, print stylesheet |
| `ROADMAP.md` Phase 5 SC1/SC2 | Success criteria: readable sourced sheets + clean Ctrl+P print |
| `CLAUDE.md` stack constraints | No build step, no CDN assets, no framework, dark default, French |

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
