# Phase 2: Découverte content - Context

**Gathered:** 2026-05-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Fill `#accueil` (lead paragraph ~150 words) and `#decouverte` (one-minute pitch + programme par année + RNCP blocs + calendrier alternance + métiers/débouchés) inside the existing `qhse-cesi/index.html`. The chassis (Phase 1) is locked — no new CSS components, no new tokens, no new fonts. Phase 2 ships HTML + copy only, with inline `source` + `as_of` provenance on every factual claim.

Satisfies DECOUV-01..08 (8 requirements).

**Mode:** `mvp` (vertical slice — content acquisition + render in one pass).

**Out of scope (deferred):** Biblio cards (Phase 3), V2 study tools, scrollspy (already shipped Phase 1), filter chips, mark-as-read, search.

</domain>

<decisions>
## Implementation Decisions

### Sourcing & verification strategy

- **D-01 — Source-of-truth priority is layered, not single:** Fiche France Compétences (RNCP) is authoritative for *blocs de compétences* and the diploma title. The CESI Bordeaux formation page is authoritative for *modules*, *calendrier*, and *rythme alternance*. The CESI Bordeaux plaquette PDF (linked externally, never hosted) is authoritative for detailed *volumes horaires* when the formation page does not publish them. Each fact in Découverte points to its primary source — the source is not generic to the section.
- **D-02 — RNCP fiche number lookup is delegated to research:** the gsd-phase-researcher in Phase 2 must identify the correct France Compétences fiche RNCP for "Bachelor QHSE niveau 6" delivered by CESI Bordeaux. If multiple variants match (legacy fiche / current fiche / overlapping titles), the researcher MUST flag the ambiguity and present options before writing fiche numbers into the page.
- **D-03 — Salary sources policy (DECOUV-06):** Apec is the primary source for métier salary ranges (best match for Bac+3 cadre junior). France Travail (ex-Pôle Emploi) is the fallback when Apec lacks the métier. INSEE is **never** used (too macro / wrong granularity). No aggregator — Glassdoor, Indeed, HelloWork, Talent.com, JobiJoba are forbidden.
- **D-04 — Salary range visual format:** `min – médiane – max + année of the source data`. Example rendered: `27 k€ – 32 k€ – 45 k€ (Apec 2025)`. Use thin non-breaking space between the number and `k€`. The année makes salary staleness visible. The médiane is mandatory — it is the most useful number.
- **D-05 — "Bordeaux-vérifié" threshold is *souple* (deliberate softening of DECOUV-08):** CESI national content is presumed to apply to CESI Bordeaux by default. The label `(générique CESI, non spécifique Bordeaux)` is reserved for content visibly imported from another campus (Nanterre, Lyon, Rouen, etc.) or for Bachelor QHSE content from non-CESI schools used as a reference. **This is a deliberate policy choice by the owner** — the original requirement read strictly "Bordeaux-specific only", and the owner accepts the softer reading: if CESI national publishes it, assume Bordeaux applies it unless we have evidence to the contrary. Reason: a strict reading would force a label on nearly every fact, devaluing the label where it actually matters.

### Programme par année — HTML structure

- **D-06 — Use `<dl>` per année** (not table, not `<details>`, not `<ol>`). Each `<dt>` is the module name (Fraunces 600, step-3); each `<dd>` is one sentence of description + (when published) the volume horaire in JetBrains Mono. `<dl>` keeps the layout coulée, mobile-friendly, and inside the `--measure: 68ch` measure rule already declared in `@layer base`.
- **D-07 — Each `<dd>` carries: 1 phrase of description + volume horaire (mono) + bloc RNCP rattaché (inline, in `--ink-2`, not clickable from the programme — the clickable list lives in the section footer).** This makes the module-to-RNCP-bloc mapping traceable inside the programme without spawning a separate table.
- **D-08 — When a datum is not published (typical case: volume horaire absent from CESI Bordeaux's public formation page):** omit silently. Do **not** render `—`, do **not** render `*` footnotes. The module appears with its description; the missing fact simply does not appear. Rationale: visible omission would clutter most lines (CESI rarely publishes per-module hours publicly).

### RNCP blocs de compétences — presentation

- **D-09 — Render blocs as a flat `<ol>` (always expanded, no accordion).** Each `<li>` is one bloc: heading (Fraunces 600 step-3) + 2–3 lines of description of the compétences ciblées. No nesting, no toggle, no card component. Rationale: the Découverte goal is "survol en un scroll" — folding the blocs behind a `<details>` toggle directly contradicts that.
- **D-10 — Bloc description length is short — 2 to 3 lines per bloc, max 4. Not a paragraph, not a sub-list.** Anyone who wants the full bloc detail follows the link to the RNCP fiche in the section footer.
- **D-11 — RNCP citation strategy is bottom-of-section, not inline-per-line:** inside the programme `<dl>` and the blocs `<ol>`, RNCP codes appear inline in `--ink-2` (non-clickable, e.g. `Bloc N°3`). A single block at the **end of `#decouverte`** titled "Sources réglementaires" carries the full list of fiches with their clickable codes in JetBrains Mono and their version dates (e.g. `RNCP35365 · version 2024-09`). Two places to maintain instead of N — but the reading flow stays clean.

### Pitch (1-minute), order, and section composition

- **D-12 — Order of sub-sections inside `#decouverte`** (after the inline mini-TOC): **Pitch → Programme par année → RNCP blocs → Calendrier alternance → Métiers → Sources réglementaires (footer of the section).** Rationale: narrative survol — what is it → what you study → what it certifies → how it's paced → what it leads to.
- **D-13 — The 1-minute pitch is a narrative paragraph (~150 words), NOT a stat-strip:** it weaves the identity (Bachelor QHSE, niveau 6, RNCP, Bac+3, 180 ECTS) + location (CESI Bordeaux) + format (alternance, durée, rythme) + outcomes (métiers ciblés in one sentence, with no salary numbers — those live in the Métiers section). Tone follows the Copywriting Contract from Phase 1 UI-SPEC: calm, sourced, editorial, no marketing flourishes, no exclamations, no first person. The pitch uses the `--step-2` lead-paragraph type role (already declared in `@layer base`).
- **D-14 — No stat-strip / no quick-facts row.** All quantitative metadata (niveau, ECTS, durée, rythme) lives inside the pitch prose. Rationale: the chassis ships zero "stat-strip" component; adding one would violate the Phase 1 component contract (only six components allowed). The narrative version is also kinder to mobile readers.

### Claude's Discretion

The user explicitly declined to discuss these areas — Claude (planner + executor) decides them, anchored on the Phase 1 UI-SPEC + project research:

- **Inline citation visual format for `source` + `as_of`:** default to a parenthetical sibling inside the fact's sentence, in `--ink-2`, with the date in JetBrains Mono ISO format. Example: `Le rythme alternance est de 3 semaines en entreprise / 1 semaine à l'école (Source : CESI Bordeaux 2026-2027, vérifié le 2026-05-14).` No `<sup>` footnotes, no badges, no side margin notes. Citation must stay within the `--measure: 68ch` reading rule.
- **Métiers section layout:** semantic `<article>` per métier inside a CSS grid (no new card component — flat surface, hairline divider). Each `<article>` contains: `<h3>` (métier title) + `<p>` (one-line description with source) + `<p class="salary">` (Min – médiane – max + année). Salary values inline in JetBrains Mono. No visual bars in V1 (deferred per research SUMMARY — they are a v1.1 enhancement, not a launch requirement).
- **Calendrier alternance presentation:** plain prose paragraph stating the rythme (école/entreprise weeks split), plus a small `<dl>` for périodes d'examens + échéance mémoire if those dates are publicly published by CESI Bordeaux. If they are not published, calendrier is one paragraph of prose only.
- **Mini-TOC (DECOUV-07):** `<aside class="toc">` inserted at the top of `#decouverte` *between* the eyebrow/h2 and the pitch. Uses the Phase 1-reserved `.toc` CSS (already shipped). Vertical list of in-section anchor links — one entry per sub-section listed in D-12 (Pitch, Programme, RNCP blocs, Calendrier, Métiers — 5 entries). On desktop ≥ 768 px, the mini-TOC remains inline at the top of the section (no sticky aside). Rationale: the chassis ships `.toc` as a static block, not a sticky aside; making it sticky would require new CSS and re-validating the `--header-h` scroll-offset interaction.
- **Accueil lead paragraph finalization (DECOUV-01):** rewrite the current Phase 1 placeholder lead into a ~150-word block following the Copywriting Contract (no marketing, calm tone). Keep the existing h1 (`Une formation, mes ressources, un seul onglet.`) — it has owner sign-off from Phase 1.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project-level contracts

- `CLAUDE.md` — project instructions, deploy pipeline, GitHub token policy
- `.planning/PROJECT.md` — core value, constraints, key decisions, owner profile
- `.planning/REQUIREMENTS.md` §Découverte — DECOUV-01..08 acceptance criteria (this is the *test* of Phase 2)
- `.planning/STATE.md` — accumulated context

### Phase 1 — Carries Forward

- `.planning/phases/01-skeleton-chassis-visual-identity/01-UI-SPEC.md` — **MUST be honoured.** Token contract, type scale, accent reservation, Copywriting Contract, component contract (only six components allowed; mini-TOC reserved CSS already there)
- `.planning/phases/01-skeleton-chassis-visual-identity/01-SUMMARY.md` — what shipped, known deviations
- `qhse-cesi/index.html` — the file Phase 2 edits in place (single-file, no build)

### Research artifacts

- `.planning/research/SUMMARY.md` — `## Phases that MAY benefit from research` section explicitly calls out Phase 2 as **content-acquisition heavy**; planner must budget content-gathering time, not just coding time
- `.planning/research/PITFALLS.md` — PITFALL-3 (generic-CESI conflation, softened per D-05), PITFALL-4 (no PDF hosting), PITFALL-5 (V2 scope creep)
- `.planning/research/FEATURES.md` — Découverte feature details

### External sources (planner / researcher will canonicalize URLs)

- CESI Bordeaux formation page — Bachelor QHSE (URL to be confirmed by gsd-phase-researcher; primary source for modules + calendrier + alternance)
- France Compétences fiche RNCP — number to be confirmed by gsd-phase-researcher (primary source for blocs + diploma title + ECTS + niveau)
- CESI Bordeaux plaquette PDF — primary source for detailed volumes horaires when the formation page omits them (linked externally; never hosted in `/qhse-cesi/`)
- Apec — primary source for métier salary ranges
- France Travail — fallback source for métier salary ranges (Apec gap-fill only)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- **`#accueil` section (lines ~553–557 of `qhse-cesi/index.html`):** has the h1 already approved (`Une formation, mes ressources, un seul onglet.`) and a placeholder `<p class="lead">` to replace.
- **`#decouverte` section (lines ~559–563):** has eyebrow `01 / DÉCOUVERTE` (correct: actually `02 / DÉCOUVERTE` per UI-SPEC copy table — verify and fix if drifted), h2 `La formation, en un survol`, and a single `<p class="placeholder">` to remove. The section is otherwise empty.
- **`.lead` and `.placeholder` CSS classes:** already declared in `@layer components`. Reuse `.lead` for the pitch's first paragraph (this triggers the `--step-2` 17–18 px lead-paragraph size declared in UI-SPEC typography table). Remove `.placeholder` paragraphs.
- **`.toc` CSS:** declared in Phase 1's `@layer components` but no `<aside class="toc">` is currently in the HTML. Phase 2 adds the markup — styles cascade for free.
- **`--measure: 68ch` rule** (in `@layer base`): applies to `p`, `li`, `blockquote`, `dd`. The pitch + module descriptions + bloc descriptions all stay inside this reading measure for free.
- **Mono font role:** UI-SPEC reserves JetBrains Mono for RNCP codes, ISO numbers, ISO dates. Use `<code>` or a `.mono` utility class (already declared) inline.

### Established Patterns

- **No `#000` background ever, no `oklch(0% ...)`.** Phase 1 ships `oklch(15%...)` floor.
- **Accent (`--accent`, brass) is RESERVED.** Allowed only on: inline `<a>` (with `--link`), active nav, h2 underline (already in place), Phase 3 badges. Phase 2 MUST NOT introduce a new accent surface (e.g., no accent-coloured module headers, no accent-coloured stat-strip background, no accent dot bullets).
- **No new components.** The Phase 1 component contract enumerates exactly six components. Phase 2 may add HTML *content* inside the existing components but MUST NOT introduce a new named component (no `.card`, no `.stat-strip`, no `.timeline`). Métiers `<article>` blocks are treated as semantic HTML, not as a new "card" component — same flat surface, no shadow, hairline divider.
- **All outbound links** use `target="_blank" rel="noopener noreferrer"` (UI-SPEC + research PITFALL).
- **French throughout.** Copy contract: calm, sourced, editorial; no marketing flourishes; no exclamations; no emoji in headings; sentence case (not Title Case).

### Integration Points

- The mini-TOC's anchor links target IDs that Phase 2 introduces inside `#decouverte`: `#dec-pitch`, `#dec-programme`, `#dec-rncp`, `#dec-calendrier`, `#dec-metiers`. The "Sources réglementaires" footer block uses `#dec-sources`.
- `scroll-margin-top: var(--header-h)` is already declared on `<section>` in `@layer base`. New sub-anchors inside `#decouverte` should be `<h3>` elements with `scroll-margin-top: var(--header-h)` applied (Phase 1 contract says belt-and-suspenders for iOS Safari quirks).
- The footer `<time datetime="2026-05-11">11 mai 2026</time>` value must be updated at Phase 2's last commit to reflect the new `derniere_maj` date.

</code_context>

<specifics>
## Specific Ideas

- The pitch sentence "the Bordeaux campus" must use the canonical CESI naming the formation page uses (e.g., "campus de Bordeaux" or "CESI Bordeaux"). Researcher confirms canonical phrasing.
- Module names in the programme `<dl>` follow CESI Bordeaux's own naming (verbatim, not paraphrased). If CESI Bordeaux publishes "QSE 1 — Fondamentaux", we ship "QSE 1 — Fondamentaux", not "Fundamentals of QSE 1".
- Volume horaire format when published: `~30 h` or `30 h` (no padding zero, lowercase `h`, no period). Always in JetBrains Mono. The `~` indicates "as published / nominal" when CESI publishes a rounded figure.
- Métier titles in the métiers section follow Apec's canonical titles when sourced from Apec (e.g., "Animateur sécurité environnement", "Responsable QSE"). Mixing Apec titles with French Travail ROME labels is allowed — just keep each métier's title coherent with its salary source.

</specifics>

<deferred>
## Deferred Ideas

Items that came up but belong elsewhere — preserved here so the planner does not silently fold them in:

- **Visual salary bars (mini histograms or range indicators):** noted in research as "P2 feature — defer if time-pressured." Definitively deferred to v1.1. V1 ships salary ranges as text only.
- **Reverse mapping "Bloc N°3 covers modules X, Y, Z":** discussed but not adopted. The forward mapping (`module` → `bloc N°k` in the programme `<dl>`) is the canonical direction. Reverse mapping would duplicate information and double the maintenance surface.
- **Quarterly link re-verification ritual (`?verify=1` dev tool from research):** belongs to Phase 3 (Biblio) — the Découverte section has fewer outbound links and a different staleness profile (RNCP fiches change yearly, not weekly).
- **Sticky mini-TOC on desktop scroll:** deferred. v1.1 if owner finds the static inline TOC insufficient during real reading sessions.
- **Stat-strip / quick-facts row:** explicitly rejected (D-14). If owner reverses this in v1.1, it requires new CSS — re-open the component contract.

</deferred>

---

*Phase: 02-d-couverte-content*
*Context gathered: 2026-05-14 via interactive discuss-phase (2 gray areas: sourcing & verification, programme + RNCP structure)*
