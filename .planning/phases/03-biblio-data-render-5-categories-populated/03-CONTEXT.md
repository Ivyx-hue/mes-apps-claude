# Phase 3: Biblio data + render + 5 categories populated - Context

**Gathered:** 2026-05-15
**Status:** Ready for planning
**Source:** Interactive discuss-phase (3 user-selected gray areas + 1 follow-up + 4 Claude's-discretion items)

<domain>
## Phase Boundary

Build the Biblio section: a data-driven render of ≥ 35 curated link cards across 5 categories (`officiel`, `communaute`, `pedago`, `annales`, `pro`), each card carrying provenance + freshness signals + (for high-value cards) a Wayback `archive_url` fallback. Mount point `#biblio-grid` is already in place at `qhse-cesi/index.html:659` (reserved during Phase 1).

Phase 3 also ships the governance scaffolding for the V1 reading hub: `LEGAL.md` inside `/qhse-cesi/` documenting the link-only policy, `.planning/V2_BACKLOG.md` pre-seeded with every deferred V1 idea, and the `derniere_maj` ISO date in the footer.

Satisfies BIBLIO-01..09 (9 requirements) + POLICY-01..04 (4 requirements) = 13 of the 39 v1 requirements. Closes V1.

**Mode:** `mvp` (vertical slice — data + render + governance in one phase).

**Out of scope (deferred to V2 / v1.1):** scrollspy (`UX-01`), filter chips (`UX-02`), mark-as-read (`UX-03`), Ctrl+K search (`UX-04`), copy-link per card (`UX-05`), reading-progress bar (`UX-06`), light-mode toggle (`UX-07`), automated link-checker as GitHub Action (`UX-08`), study tools (`TOOL-01..03`).

</domain>

<decisions>
## Implementation Decisions

### Card distribution (BIBLIO-03, owner-bumped 25 → 35 on 2026-05-15)

- **D-01 — Card split is equally weighted across the 5 categories: 7 cards each (7×5 = 35).** Owner explicitly chose symmetry over reference-weighted distribution. Rationale: locks the floor (BIBLIO-03's "≥ 5 per category") with room to breathe in every category, avoids surcharge artificielle in categories the owner consults rarely, and gives the researcher a clear target (find 7 per category, not "as many as possible in officiel + pedago"). If a category genuinely cannot produce 7 vetted cards, the researcher MUST flag the shortfall during plan-phase rather than padding with low-quality URLs.

### Seed list strategy (when the 35 URLs get locked)

- **D-02 — Researcher proposes ~50 candidates during `/gsd-plan-phase 3`; owner picks / cuts to 35 BEFORE `/gsd-execute-phase 3` runs.** Adds an explicit **owner-approve seed-list checkpoint** between plan-phase and execute-phase. The plan must include this checkpoint as a hard gate (no card-render task starts until the owner has approved the final 35-URL list). Rationale: owner does not start from a blank page (saves 30-60 min of manual research), but every URL gets owner sign-off before being baked into the page — same discipline as Phase 2's owner-verify gate, applied earlier in the cycle.
  - **Researcher output format** (consumed by owner during the picks/cuts step): a markdown file `.planning/phases/03-biblio-data-render-5-categories-populated/03-SEED-CANDIDATES.md` with one section per category, each section listing ~10 candidate URLs with: `title`, `url`, proposed `description` (1 line), proposed `source_type`, proposed `priority`, proposed `lastChecked`, and (for high-value officiel cards) proposed `archive_url`. Owner edits this file directly — keep / cut / re-categorize — and replies "seed approuvé" to unlock execute-phase.
  - **Reject criteria the researcher MUST honour** (locked from PROJECT.md + research):  no `.pdf` URLs (POLICY-03), no aggregators (Glassdoor, Indeed, HelloWork, Talent.com, JobiJoba — already forbidden in Phase 2 D-03 for métiers, extends here for all source types), no paywalled domains without an open-access alternative, no URLs that already 404 at research time.

### Card layout (BIBLIO-08 visual grouping)

- **D-03 — Cards render as a full-width editorial list — 1 column at every breakpoint (mobile + desktop).** Each card row contains: `[provenance badge]` `Titre de la card` (h3, Fraunces 600 step-2) + `description` (2-3 lignes, body Inter, inside `--measure: 68ch`) + footer row carrying `domain` (Inter step-0 in `--ink-2`) and `lastChecked` (JetBrains Mono, age-coloured per BIBLIO-06). NO 2-col or 3-col grid. Rationale: matches the chassis "library / editorial" identity (vs the QHSE Trainer's catalogue density), keeps cards readable on mobile without responsive gymnastics, and lets each card carry full metadata without squeezing.
- **D-03b — Sticky card semantics:** each card is a `<a>` wrapping a `<article>` (or equivalent) — the whole card surface is clickable, not just the title. `target="_blank" rel="noopener noreferrer"` on every card (BIBLIO-07).
- **D-03c — Cards inside a category section are listed inside a `<ul role="list">` (or semantic equivalent) to preserve screen-reader semantics, with `list-style: none` for visual flat presentation.**

### Card ordering inside a category (intra-category sort)

- **D-04 — Cards are sorted by `lastChecked` descending — most recently verified card appears at the top of its category.** Renderer sorts at render time using `Array.prototype.sort((a,b) => b.lastChecked.localeCompare(a.lastChecked))` over the ISO `YYYY-MM-DD` strings (lexicographic compare = chronological compare for ISO dates). Rationale: gives the reader a visible freshness signal at-a-glance for each category, encourages the quarterly link-verification ritual (re-verifying a card moves it up in its section), and avoids the "intentional importance" question the `priority` field would force on every card.
- **D-04b — `priority` field is kept in the schema (BIBLIO-04 requires it) but NOT used for sort.** Its V1 role is metadata-only — useful for the researcher to flag must-have vs nice-to-have during the seed list, and for future filtering features in V2 (`UX-02` filter chips). Researcher fills it (1=critical, 2=important, 3=useful); renderer ignores it for V1 layout.

### Pre-existing Phase 1 shadow invariant (carry-forward decision)

- **D-05 — The Phase 2/3 black-floor invariant is relaxed to apply to SURFACE colors only, not to shadow alpha channels.** The `oklch(0% 0 0 / 0.45)` translucent sticky-header shadow at `qhse-cesi/index.html:230` is intentional editorial depth (Phase 1 design choice) — it is not a surface color and should not trip the invariant. The verification gate becomes: `oklch(0%` / `#000` is forbidden as a `background`, `background-color`, `color`, `border-color`, or any non-shadow CSS property value. Inside `box-shadow`, `filter: drop-shadow`, or `outline-color` it is allowed when carrying an alpha channel < 1.
  - **Action for the planner:** include this invariant relaxation in PLAN.md's verification gates section so the gsd-plan-checker and executor know the rule.
  - **Action for the executor:** the existing line 230 stays as-is; no opportunistic fix during Phase 3 (no Phase-1 scope creep). If Phase 3 introduces new shadows, same rule applies.

### Claude's Discretion

The owner explicitly declined to discuss these — the planner + executor decide them, anchored on Phase 1 UI-SPEC + project research + the locked decisions above:

- **Category accent colors (BIBLIO-08).** UI-SPEC reserves `--accent` (brass) for inline links, active nav, h2 underline, AND **badges (Phase 3 use)**. Recommended default: **single shared `--accent` for every badge surface, with the badge LABEL itself being the visual differentiator** (`OFFICIEL`, `PÉDAGOGIQUE`, `COMMUNAUTÉ`, `OUTIL-PRO`, `ANNALES`). This avoids introducing 5 new tokens (would violate Phase 1's "tokens declared once in `:root`" rule and require re-validating WCAG AA contrast on every variant). If the owner reverses this during owner-verify, falling back to 2-3 variants of `--accent` (e.g., warm = officiel/annales, cool = communauté/pedago/pro) is the next-cheapest step.
- **`archive_url` policy (BIBLIO-09).** Rule for the researcher when filling `03-SEED-CANDIDATES.md`: an `archive_url` is **mandatory** when ALL of the following hold: (a) `source_type` is `officiel`, (b) the URL is a versioned reference document that could change without notice (RNCP fiche, France Compétences fiche, official CESI Bordeaux formation page, INRS dossier ED-XXXX, Légifrance article). The `archive_url` value is the Wayback Machine snapshot URL of the form `https://web.archive.org/web/YYYYMMDDhhmmss/<original-url>`. For non-officiel cards (`pedago`, `annales`, `communaute`, `pro`), `archive_url` is optional — researcher may include if a snapshot is freely available, otherwise leaves the field empty.
- **`note` field usage (BIBLIO-04 schema, BIBLIO-05 "lire avec recul" caveat).** Rule: `note` is **mandatory** when `source_type: "communauté"` (the "lire avec recul" caveat from BIBLIO-05 is rendered as the `note` text on the card). Optional for all other source types. Recommended default for communauté cards: `note: "Lire avec recul — témoignage individuel, non vérifié."` Researcher may shorten / contextualize per card.
- **Card mount strategy.** Single inline `<script>` at the end of `<body>` (matches Phase 1 architecture). Listener on `DOMContentLoaded` calls `renderCards()` once, which builds a single `innerHTML` string (no per-card DOM mutation) and assigns it to `document.getElementById('biblio-grid').innerHTML`. Rationale: BIBLIO-02 mandates "single innerHTML mount, no inline `onclick=""`, no hand-duplicated card HTML" — this is the literal implementation.
- **`renderCard()` and data location.** Both `BIBLIO_CATEGORIES[]`, `BIBLIO[]`, and `renderCard(item)` live INLINE in `qhse-cesi/index.html` (per PROJECT.md single-file constraint, per CHASSIS-INFRA-02). NOT separate `.js` files. Approximate inline footprint: ~6 KB of JSON-like array literals + ~30-50 lines of `renderCard()` function. The file size cap from Phase 2 was 1000 lines; Phase 3 should target ≤ 1100 lines (current 720 + ~350-400 for Biblio content + render + LEGAL/V2_BACKLOG are separate files).
- **`tags[]` V1 usage.** Populated by the researcher per card (free-form tags like `RNCP`, `INRS`, `ISO-45001`, `alternance`, `bordeaux`, `reddit`, `mooc`, etc.) but NOT visually rendered in V1. Reserved for V2 filter chips (`UX-02`). Renderer ignores `tags[]` for V1 layout; it is metadata-only.
- **`LEGAL.md` location and content (POLICY-01).** Path: `qhse-cesi/LEGAL.md`. Content: short (≤ 80 lines) French markdown stating (1) the site is a personal link-curation tool — not a commercial publication, not a content host; (2) the site does not host third-party PDFs (linked externally only) — per POLICY-03; (3) acknowledges the French pedagogical exception (CPI Article L122-5, 3°, e — courte citation à des fins d'illustration de l'enseignement et de la recherche) as the framework under which short excerpts of cited content may appear in card descriptions; (4) all linked content remains the property of its respective owners; (5) link to the GitHub repo + last update date. Researcher drafts the precise wording during plan-phase research; executor writes the file during execute-phase.
- **`V2_BACKLOG.md` location and content (POLICY-02).** Path: `.planning/V2_BACKLOG.md`. Pre-seeded with every deferred V1 idea — at minimum: `UX-01..08` + `TOOL-01..03` from REQUIREMENTS.md, plus the v1.1 enhancements deferred from Phase 2's CONTEXT.md (sticky mini-TOC, visual salary bars, reverse RNCP mapping). Each entry: title, originating phase, reason deferred, expected complexity. Planner writes the seed list during plan-phase; executor commits it during execute-phase task 1 (governance scaffolding lands before card render).
- **`derniere_maj` footer (POLICY-04).** Replaces the existing Phase 2 footer `<time>2026-05-14</time>` with the Phase 3 ship date. Researcher/executor MUST refresh this on every Phase 3 commit that changes the rendered HTML — same discipline as Phase 2's footer date refresh.
- **Card categories visual order on the page (top to bottom).** Recommended default: `officiel` → `communaute` → `pedago` → `annales` → `pro`. Matches the natural narrative survol (regulatory anchor → human context → learning → practice → professional veille) and the canonical naming order in BIBLIO-01. If the owner reverses this during owner-verify, the order is a 30-second edit.
- **Category `<section>` heading and anchor IDs.** Each category renders inside `<section id="biblio-<slug>" aria-labelledby="h-biblio-<slug>">` with `<h2 id="h-biblio-<slug>">` (sentence case, French). Slug = canonical category name (per BIBLIO-01: `officiel`, `communaute`, `pedago`, `annales`, `pro`). H2 examples (placeholder, executor finalizes wording): `Sources officielles`, `Communauté & retours d'expérience`, `Contenu pédagogique`, `Annales & sujets`, `Outils pros & veille`.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project-level contracts

- `CLAUDE.md` — project instructions, deploy pipeline, GitHub token policy
- `.planning/PROJECT.md` — core value, constraints, key decisions, owner profile, out-of-scope guardrails
- `.planning/REQUIREMENTS.md` §Biblio + §Policy & Trust — BIBLIO-01..09 + POLICY-01..04 are the acceptance test of Phase 3 (13 requirements)
- `.planning/STATE.md` — accumulated context

### Phase 1 — Carries forward (chassis frozen)

- `.planning/phases/01-skeleton-chassis-visual-identity/01-UI-SPEC.md` — **MUST be honoured.** Token contract, type scale, accent reservation (Phase 3 finally uses accent on badges), Copywriting Contract, component contract (cards = the Phase-3-reserved component slot)
- `.planning/phases/01-skeleton-chassis-visual-identity/01-SUMMARY.md` — what shipped, known deviations, the `oklch(0% 0 0 / 0.45)` shadow at line 230

### Phase 2 — Patterns to mirror

- `.planning/phases/02-d-couverte-content/02-CONTEXT.md` — citation discipline pattern (`(Source : ..., vérifié le YYYY-MM-DD)` in `--ink-2`), outbound link safety pattern (`target="_blank" rel="noopener noreferrer"`)
- `.planning/phases/02-d-couverte-content/02-SUMMARY.md` — quarterly link-verification ritual deferred to Phase 3 (now in scope: applies to BIBLIO outbound links)

### Research artifacts

- `.planning/research/SUMMARY.md` — biblio seed strategy (≥ 5 per category, sourced from INRS, Légifrance, AIDA, France Compétences, Reddit r/cesi, LinkedIn témoignages, YouTube channels, Studocu) — confirmed via owner decision D-01 at 7 per category
- `.planning/research/PITFALLS.md` — PITFALL-2 (no PDF hosting under `/qhse-cesi/` extends here for all card URLs), PITFALL-4 (no aggregator URLs), PITFALL-5 (V2 scope creep — feed everything into `V2_BACKLOG.md`)
- `.planning/research/FEATURES.md` — Biblio feature details, BIBLIO_CATEGORIES + BIBLIO array conventions
- `.planning/research/ARCHITECTURE.md` — `renderCard()` + single innerHTML mount pattern

### Existing code (Phase 3 edits in place)

- `qhse-cesi/index.html` (720 lines, Phase 2 deploy) — Phase 3 edits this file. Mount point already exists at line 659 (`<div id="biblio-grid">`). CSS for `#biblio-grid` reserved at line 369. Eyebrow `03 / BIBLIO` already in place at line 656.

### External sources (researcher canonicalizes URLs during plan-phase)

- France Compétences fiche RNCP41446 — `https://www.francecompetences.fr/recherche/rncp/41446/` (verified live in Phase 2, expected `source_type: officiel`, mandatory `archive_url`)
- CESI Bordeaux Bachelor QHSE formation page — to be confirmed by researcher (expected `source_type: officiel`, mandatory `archive_url`)
- INRS dossiers ED-XXXX — researcher selects ~3-5 most relevant for the formation (ED 6322 sur le DUERP, ED 6098 sur les TMS, ED 6029 risque routier, etc.)
- Légifrance — Code du Travail R-4121-1 (DUERP), L-4121-1, etc.
- AIDA (INERIS) — bases réglementaires environnement
- ISO 9001 / 14001 / 45001 — official ISO landing pages (the standards themselves are paywalled; link to the public landing/summary pages)
- Reddit r/cesi — `https://www.reddit.com/r/cesi/` and curated witness threads (researcher picks freshest 3-5)
- LinkedIn témoignages — public posts from CESI alumni / Bachelor QHSE témoins
- YouTube channels — researcher proposes 3-5 (INRS chaîne officielle, formateurs QHSE indépendants, MOOCs)
- Studocu / forums — annales / sujets / corrigés links (vérifier que le site ne héberge pas de PDFs sans droits — link uniquement)
- Apec + France Travail — outils pros (déjà cités dans Phase 2 #dec-sources, peuvent réapparaître en biblio sous `outil-pro`)

### Reference docs for archive_url construction

- Wayback Machine API — `https://archive.org/wayback/available?url=<URL>` — researcher uses to fetch the most recent snapshot timestamp for high-value cards.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- **`<section id="biblio">` (line 655–660 of `qhse-cesi/index.html`):** already has eyebrow `03 / BIBLIO`, h2 `Les meilleures ressources, classées et datées`, and the `<div id="biblio-grid">` mount point reserved during Phase 1. Phase 3 fills the mount point.
- **`#biblio-grid` CSS rule** (line 369): currently empty placeholder (`margin-top: var(--space-lg);`). Phase 3 extends this rule (or adds child rules) for the editorial-list layout and category sub-sections.
- **`--accent` token (brass, OKLCH)**: reserved for badges (Phase 3 is the first phase to introduce a badge surface). Use `--accent` for the badge text color OR background, never both at once (WCAG AA contrast).
- **`--ink-2` muted color**: used for citation parentheticals in Phase 2 — mirror for card domain + lastChecked rendering.
- **JetBrains Mono via `<code>` or `.mono` class**: use for `lastChecked` ISO date rendering (BIBLIO-06 freshness coloring is on this element).
- **Outbound link safety**: every `<a>` in cards uses `target="_blank" rel="noopener noreferrer"` (BIBLIO-07). Pattern already established in Phase 2 (8 outbound URLs).
- **`<time datetime="2026-05-14">14 mai 2026</time>` footer block**: Phase 3 refreshes this to the Phase 3 ship date on every commit that changes rendered HTML (POLICY-04).

### Established Patterns

- **No `#000` background, no `oklch(0%` as a SURFACE color.** Shadows with alpha < 1 are allowed (relaxed invariant — D-05). Phase 1 floor stays at `oklch(15%...)` for surfaces.
- **Accent (`--accent`, brass) is RESERVED** for inline links, active nav, h2 underline, AND now badges (Phase 3 finally uses the badge slot). Phase 3 MUST NOT introduce a SIXTH accent surface (no accent-coloured card border, no accent-coloured card background — only the badge).
- **Component contract from Phase 1 enumerates exactly six components**: Phase 3 introduces the seventh — **the Biblio card** — which was reserved during Phase 1 UI-SPEC for this phase. No OTHER new component allowed in Phase 3 (no `.timeline`, no `.callout`, no `.kbd`, etc.).
- **All outbound links** use `target="_blank" rel="noopener noreferrer"` (UI-SPEC + research PITFALL + Phase 2 pattern).
- **French throughout.** Card titles + descriptions are French. Badge labels are short French uppercase tokens. Domain names render verbatim (English domain names like `inrs.fr` are fine).
- **Citation discipline from Phase 2 extends here** — though Phase 3 cards do not need per-fact `(Source : ..., vérifié le ...)` citations in the same form, because the **card itself is the source citation**. The `lastChecked` field carries the equivalent of "vérifié le".

### Integration Points

- **Nav anchor `#biblio`** already exists (line 542: `<li id="nav-biblio"><a href="#biblio" data-target="biblio">Biblio</a></li>`). Phase 3 does NOT modify the nav — it only fills `#biblio` content. The new sub-section anchors (`#biblio-officiel`, `#biblio-communaute`, etc.) are NOT added to the top nav (the top nav stays at the three top-level sections).
- **`scroll-margin-top: var(--header-h)`** already declared on `<section>` in `@layer base`. Each category sub-section `<section id="biblio-<slug>">` inherits this for free.
- **Footer `<time>`** is the single dated element on the page (POLICY-04). Phase 3 keeps this single-source-of-truth pattern.
- **Print stylesheet (Phase 1 CHASSIS-06)** expands link URLs as footnotes. The biblio cards' outbound URLs WILL appear in print as `(https://...)` footnotes — that is the desired behaviour (print becomes a printable biblio).

### File-size considerations

- Phase 2 deploy: 720 lines.
- Phase 3 budget: ≤ 1100 lines (adds ~350-400 lines for Biblio content + JS render + CSS, plus separate `LEGAL.md` and `V2_BACKLOG.md` files).
- If approaching the 1100 cap, the planner MUST surface the file-size pressure as a planning question, NOT silently split into multiple files (PROJECT.md single-file constraint).

</code_context>

<specifics>
## Specific Ideas

- **Researcher output file**: `.planning/phases/03-biblio-data-render-5-categories-populated/03-SEED-CANDIDATES.md` — markdown with one section per category, ~10 candidate URLs each, each row showing the proposed metadata. Owner edits in place (keep/cut/re-categorize) and replies "seed approuvé" before execute-phase starts.
- **Card schema example** (renderer reference, executor finalizes the exact field order):
  ```js
  {
    id: "officiel-rncp-41446",
    title: "Fiche RNCP 41446 — Bachelor QHSE",
    url: "https://www.francecompetences.fr/recherche/rncp/41446/",
    description: "Fiche officielle France Compétences — blocs de compétences, niveau, certificateur.",
    category: "officiel",
    source_type: "officiel",
    tags: ["RNCP", "fiche", "officiel", "francecompetences"],
    priority: 1,
    lastChecked: "2026-05-15",
    archive_url: "https://web.archive.org/web/20260515.../https://www.francecompetences.fr/...",
    note: null
  }
  ```
- **Badge wording (final)**: `OFFICIEL`, `PÉDAGOGIQUE`, `COMMUNAUTÉ`, `OUTIL-PRO`, `ANNALES`. Uppercase short tokens in JetBrains Mono or Inter 600 (executor picks the font role that best fits the chassis — inline `<span class="badge">`).
- **Sort implementation**: `BIBLIO.sort((a, b) => b.lastChecked.localeCompare(a.lastChecked))` at render time (D-04). This is one line — keep it inline in `renderCards()`.
- **Wayback URL format**: `https://web.archive.org/web/YYYYMMDDhhmmss/<original-url>` — researcher fetches the most recent snapshot via the Wayback Machine availability API.
- **`derniere_maj` discipline**: every commit that changes rendered HTML refreshes the footer `<time datetime>` value. Executor MUST verify this before each commit.

</specifics>

<deferred>
## Deferred Ideas

Items that came up during discussion but belong elsewhere — preserved so the planner does not silently fold them in:

- **Filter chips per category (`UX-02`)**: deferred to V2. Phase 3 ships card metadata (`tags[]`) populated but visually unused, which is the V2 enablement contract — adding filter chips in v1.1 means writing the chip HTML + filter JS only, no schema change.
- **Mark-as-read toggle per card (`UX-03`)**: deferred to V2. Uses `localStorage`; out of scope for V1 reading hub.
- **In-page Ctrl+K search (`UX-04`)**: deferred to V2. Substring filter over `title` + `tags[]` is a V2 quick-win.
- **Sticky mini-TOC for Biblio categories**: deferred to v1.1 if owner finds in-section nav insufficient.
- **Visual salary bars (Phase 2 deferral, mentioned again)**: stays deferred to v1.1. Phase 3 Biblio does not relate.
- **Automated link-checker GitHub Action (`UX-08`)**: deferred to V2. V1 ships a manual `?verify=1` dev tool ritual or a quarterly link-verification reminder — both lighter than CI.
- **Reverse RNCP-bloc-to-modules mapping (Phase 2 deferral)**: stays deferred. Out of Phase 3 scope.
- **Sticky scrollspy / active-section highlight (`UX-01`)**: deferred to V2.
- **Reading-progress bar on Découverte (`UX-06`)**: deferred to V2.
- **Light-mode toggle (`UX-07`)**: deferred to V2.
- **Study tools (`TOOL-01..03`)**: deferred to V2 — explicitly out of scope per PROJECT.md.

All of the above land in `.planning/V2_BACKLOG.md` as part of Phase 3's POLICY-02 deliverable.

</deferred>

---

*Phase: 03-biblio-data-render-5-categories-populated*
*Context gathered: 2026-05-15 via interactive discuss-phase (3 user-selected gray areas + 1 shadow-invariant decision + 4 Claude's-discretion items)*
