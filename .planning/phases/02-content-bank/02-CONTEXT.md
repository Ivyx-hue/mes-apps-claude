# Phase 2: Content Bank - Context

**Gathered:** 2026-05-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Publish `qhse-cesi/outils-data.js` — a hand-authored, source-verified bank of **200+ study items** covering the full Bachelor QHSE scope, schema-compliant, such that any later mode (Flashcards/SRS P3, QCM/Tests P4, Fiches P5) can consume it with **zero further content work**.

Covers requirements **BANK-01..05** and closes the deferred clause of **SHELL-05** (the `<script src="outils-data.js">` content-bank load).

**In scope:** the data file, its themes, items, schema conformance, source verification, and the `<script src>` wiring in `outils.html`.
**NOT in scope:** any study-mode logic, rendering, SM-2, timers, localStorage, fiches prose, UI — those are Phases 3–5. Item schema, file architecture (zero build, `<script src>`), volume (200+), and the content-verified-URL discipline are **already locked** in `V2-ETUDE-SPEC.md` and are not re-litigated here.

</domain>

<decisions>
## Implementation Decisions

### Theme taxonomy (BANK-05)
- **D-01:** `theme` is a **closed vocabulary of exactly 15 kebab-case slugs**. Every item carries exactly one; no value outside this set; **no catch-all/`divers` theme** (owner rejected the safety-net option — forces correct classification):
  `duerp` · `principes-generaux` · `iso-9001` · `iso-14001` · `iso-45001` · `tms` · `risque-routier` · `risque-chimique` · `rps` · `espaces-confines` · `acronymes` · `metiers` · `calendrier` · `icpe-seveso` · `rncp`
- **D-02:** ISO norms are **three separate themes** (`iso-9001` qualité, `iso-14001` environnement, `iso-45001` SST) — enables targeted per-norm revision and separate Phase-5 fiches. No single `iso` theme, no extra `norm` sub-field.
- **D-03:** RNCP41446 / BC01–BC04 is handled by **topical themes + one meta-theme `rncp`** for diploma-structure items (bloc titles, BCxx scope, RNCP metadata). Topical items (DUERP, ISO…) keep their topical theme. **No extra `bloc` schema field** and no `bc01..bc04` themes — the bloc mapping stays documentary, not a filter key.
- **D-04:** `acronymes`, `metiers`, `calendrier` are **first-class themes**, not cross-cutting tags.

### Source strategy (BANK-03, BANK-04 — exam-accuracy constraint)
- **D-05:** **Pédagogique-first sourcing.** `source.authority` + `source.url` point to the stable, content-verifiable pedagogical page (INRS / service-public.fr / ameli risques pro), consistent with the v1.0 link discipline (those "ce qu'il faut retenir"/dossier pages are the stable ones). The exact regulatory reference is **always** carried in `source.ref` (e.g. `Art. R4121-1 Code du travail`, `ISO 45001:2018 §6.1.2`, `code ROME H1302`, `RNCP41446 BC02`).
- **D-06:** **ISO items:** `source.ref` = norm + clause; `source.url` = a **free authoritative page that actually covers that point** (AFNOR norm fiche / ISO.org summary page / INRS for 45001). Never link the paywalled full text; never link a shop/landing page that does not contain the answer (would be a "wrong-doc" violation of the verify-links discipline).
- **D-07:** **Reinforced traceability:** whenever an item cites a legal article, the **Légifrance deep-link of that article** is additionally included inside `explanation` (in prose/parenthetical), in addition to the pedagogical primary `source`. Primary `source.url` stays the content-verified pedagogical page.
- **D-08:** **Authority map (binding rule for the content-acquisition agent):**
  | Domain | Primary `authority` / `url` | `ref` |
  |---|---|---|
  | DUERP, principes-generaux, espaces-confines, tms, risque-chimique, risque-routier, rps | INRS (dossiers / ED / "ce qu'il faut retenir"), ameli risques pro | Code du travail article (R4121-1, L4121-2…) |
  | iso-9001 / iso-14001 / iso-45001 | Free authoritative summary (AFNOR fiche norme / ISO.org résumé / INRS pour 45001) | norm n° + clause |
  | icpe-seveso | service-public.fr · Géorisques · aida.ineris.fr | rubrique ICPE / art. Code de l'environnement |
  | metiers | francetravail.fr/metierscope · Apec | code ROME (H1302/H1502…) |
  | rncp | France compétences (fiche RNCP41446) | RNCP41446 / BCxx |
  | calendrier | service-public.fr (contrat apprentissage/pro) | art. Code du travail |
  | acronymes | domain authority of each acronym | — |
- **D-09:** **No unsourced regulatory claim ships.** If no free, directly-content-verifiable source exists for an item, the content-acquisition agent **surfaces the gap** rather than shipping an unverified item or a status-only/search/index URL. URL discipline = real `<title>` + topic match + soft-404 grep (HTTP-status-only audits banned — see `feedback_verify_links_before_ship`).

### Content depth & question calibre (BANK-02)
- **D-10:** Editorial split: **`answer` = short, recall-grade** (the thing to reproduce at the exam — a definition / short list / article number, ~1–3 sentences or a short list). **`explanation` = the "why"** — context, articulation between notions, mnemonic, common pitfall.
- **D-11:** **QCM derivation of D-10** (Claude's-discretion application of the locked rule, not a separate "selon le type" policy): `answer` = the correct option restated concisely; `explanation` = why the correct option is right **and** why each distractor is wrong.
- **D-12:** **QCM distractors = plausible, real-domain confusions** (wrong article number, neighbouring norm, swapped principle, acronym false-friend) — reproduces a real CESI QCM trap. Not obviously-wrong throwaways.
- **D-13:** **`difficulty` rubric (also used by P3/P4 to compose sessions):** `1` = pure restitution (definition, acronym, title, article/norm number to know by heart); `2` = comprehension/application (distinguish two neighbouring notions, apply a principle to a simple case, pick the right norm/procedure); `3` = analysis/articulation (link several notions, practical case, justify a démarche). No fixed per-level distribution mandated (owner chose the plain grid, not the "+ répartition cible" variant).

### Claude's Discretion
- **Global shape:** expose the bank so `BANK` is evaluable in the browser console (`BANK.length >= 200`, `BANK.filter(i => i.theme === 'duerp')`) per ROADMAP success criteria — i.e. a `window.BANK` array literal in `outils-data.js`, plus the `<script src="outils-data.js">` tag added to `outils.html` (closing SHELL-05). No build step.
- **Coverage weighting & volume distribution:** owner de-selected this area → Claude decides. Target: balanced coverage across all 15 themes with a light tilt toward exam-heavy themes (DUERP, 9 principes, ISO 45001, risque chimique), every theme non-empty and meaningfully filterable (BANK-01/05 success criteria); flashcard:QCM ratio at the planner/executor's discretion (both types present per theme).
- **Authoring delivery:** theme-batched generation with **atomic checkpoint commits per batch** (token-conscious — owner hits weekly caps mid-task; never one giant uncommitted file). Planner's call on exact batching.
- **`id` convention:** `<theme>-<type>-NNN` (e.g. `duerp-qcm-001`) per the spec example, executor's discretion on exact numbering.
- Exact `verified` date = the date each URL is content-verified during execution.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Authoritative milestone design (read first — locked, do not re-litigate)
- `.planning/V2-ETUDE-SPEC.md` — owner-approved locked decisions D-V2-01..06. **The "Content bank" section is the schema source of truth**: item schema (`id, type, theme, question, answer, choices?, correct?, explanation, source{authority,ref,url,verified}, difficulty`), `type ∈ {flashcard,qcm}`, `correct` = index into `choices`, `difficulty ∈ {1,2,3}`, the exhaustive theme list, and the non-negotiable content-accuracy constraint. **Architecture section** locks `outils-data.js` via `<script src>`, plain array literals, zero build.

### Phase scope & requirements
- `.planning/ROADMAP.md` — Phase 2 "Content Bank" goal + 4 owner-verifiable success criteria (`BANK.length >= 200`, 10-item field sample, content-verified URLs, `theme` filter works for ≥6 themes).
- `.planning/REQUIREMENTS.md` — BANK-01..05 full text + traceability; SHELL-05 PARTIAL note (the `<script src="outils-data.js">` clause is this phase's deliverable — confirm the SHELL-05 re-map closes here).

### Architecture / integration target
- `.planning/phases/01-shell-gateway/01-CONTEXT.md` — Phase 1 decisions: `outils.html` 4-tab shell (the consumer surface), chassis.css contract, zero-build invariant; the dated placeholders mark where P3–P5 mount the bank.
- `qhse-cesi/outils.html` — the page that will gain `<script src="outils-data.js">` (no `<script src>` present yet; tab IIFE at the bottom is shell-only). 141 lines.

### Discipline (binding for this phase)
- `C:\Users\Lasmoles\.claude\projects\C--Users-Lasmoles-mes-apps-claude\memory\feedback_verify_links_before_ship.md` — content-verified URL discipline (real `<title>` + topic match + soft-404 grep; no search/index pages; HTTP-status-only audits banned). **Hard gate for BANK-04.**
- `qhse-cesi/LEGAL.md` — link-only policy; no `.pdf` hosting under `/qhse-cesi/`; French pedagogical-exception scope (constrains what may be linked as a source).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`outils.html` 4-tab shell** (Phase 1, 141 lines): the consumer surface. P2 only adds the `<script src="outils-data.js">` tag in `<head>` or before the existing tab IIFE — no other change to `outils.html` markup/logic.
- **v1.0 Découverte provenance pattern** (`qhse-cesi/index.html`): authority + ref inline-citation style already shipped and owner-approved — the bank's `source` object mirrors that provenance discipline; Phase-5 fiches will render it the same way.
- **Preferred stable FR sources already vetted in v1.0** (PROJECT.md / Biblio): service-public.fr, INRS `/risques|/.../ce-qu-il-faut-retenir.html`, ameli.fr, francetravail.fr/metierscope — reuse as the D-08 authority backbone.

### Established Patterns
- Zero build, no deps, no framework (PERSIST-02). `outils-data.js` = plain JS array literal assigned to a global; loaded via `<script src>`. No bundler, no JSON fetch.
- Content-verified-URL discipline is a project invariant (v1.0 learned-the-hard-way; codified in memory + LEGAL). This phase is where it bites hardest (200+ URLs).
- Atomic commit/push per unit of work (token-conscious memory) — applies to batch authoring.

### Integration Points
- `qhse-cesi/outils.html` ← add `<script src="outils-data.js">` (closes SHELL-05's deferred clause).
- `window.BANK` is the contract P3 (Flashcards/SRS), P4 (QCM/Tests), P5 (Fiches) all read. Schema/theme stability here is a hard dependency for three downstream phases — breaking changes after P2 are expensive.
- Deploy unchanged: push `main` → GitHub Actions → Vercel; `outils-data.js` served statically at `…/qhse-cesi/outils-data.js`.

</code_context>

<specifics>
## Specific Ideas

- "A wrong answer makes the owner revise *false* information for a real diploma" (spec wording) — accuracy is the phase's defining quality bar, above volume or speed. When in doubt between shipping an unverified item and surfacing a gap, surface the gap.
- The owner is a Bachelor QHSE alternant with strong industrial/regulatory vocabulary (ex-nuclear electrician) — content register should be exam-grade and precise, not vulgarized; `answer` terse and reproducible, `explanation` carrying the articulation/mnemonic.
- QCM distractors should feel like the real CESI trap (neighbouring norm, swapped principle, false-friend acronym), so practice trains discrimination, not elimination-by-obviousness.

</specifics>

<deferred>
## Deferred Ideas

- **Coverage-weighting precision / fixed difficulty distribution** — owner de-selected the weighting area and chose the plain difficulty grid (not the "+ répartition cible" variant); left to Claude's discretion this phase. Revisit only if P3/P4 session composition reveals gaps.
- All study-mode behaviour (flashcard render, SM-2, QCM engine, timed tests, fiches prose, localStorage, last-mode restore) — Phases 3–5 by design; the bank is built to feed them, not to implement them.
- Fiches de révision long-form prose — Phase 5 consumes the same sourced bank; not authored here.

None of the above is scope creep — all are explicitly later phases in the locked roadmap.

</deferred>

---

*Phase: 2-content-bank*
*Context gathered: 2026-05-17*
