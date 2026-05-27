# Phase 5 Discussion Log — Fiches de révision

**Date:** 2026-05-27
**Workflow:** /gsd-discuss-phase 5 (default mode, no flags)
**Mode:** discuss (single-pass, multi-question batch)

---

## Prior Context Loaded

- **Project-level:** `.planning/PROJECT.md`, `.planning/REQUIREMENTS.md` (FICHE-01/02), `.planning/STATE.md` (Phase 4 plans 4/4 shipped, awaiting UAT)
- **V2 spec:** `.planning/V2-ETUDE-SPEC.md` — "Fiches de révision: one structured printable sheet per major theme — condensed sourced summary of the Hub content, inline citations, print stylesheet (reuse Phase 1 print rules)"
- **Prior CONTEXT.md:** Phase 4 (`04-CONTEXT.md`), Phase 3 (`03-CONTEXT.md`), Phase 2 (`02-CONTEXT.md`)
- **Codebase scout:**
  - `qhse-cesi/outils.html:128-131` — `#panel-fiches` mount + placeholder hint "feuille A4 recto-verso par bloc RNCP"
  - `qhse-cesi/chassis.css:1460-~1500` — `@media print` block (Section 7) already ships nav/burger hidden, light color-scheme, Fraunces headings, external-URL footnote expansion
  - `qhse-cesi/outils-data.js` — `window.BANK` = 226 items × 15 themes (frozen Phase 2)
  - Phase 3 `.fc-*` namespace, Phase 4 `.qz-*` namespace → Phase 5 will own `.fi-*`

## Carried-Forward Decisions (not re-asked)

- **D-V2-01** Hub-only scope, root QHSE Trainer is a frozen sibling
- **D-V2-02** All four study modes ship — Fiches is mode 4/4
- **D-V2-04** SRS is read-only for Fiches (no `qhse-srs-v1` writes, no `qhse-scores-v1` writes)
- **D-V2-05** Single-file architecture (chassis.css + outils.html + outils-data.js + srs.js)
- **Phase 3/4 IIFE pattern** — DCL boot, double-load guard, panel-scoped listeners, no document-level keydown, `createElement` + `textContent` only (no `.innerHTML` on data)
- **Phase 3/4 CSS pattern** — `@layer components` append, reuse chassis tokens, zero new `:root` props
- **Phase 4 merge-safe `writePrefs`** — `Object.assign({}, existing, partial)` to protect P3 + Plan 02 + Plan 03 keys

## Phase Boundary Confirmed

Ship a Fiches de révision mode inside `#panel-fiches` of `outils.html` — printable structured revision sheets per BANK theme, sourced summary + Questions clés recycle, integrate with the existing print rules. Read-only surface (no SRS / scores writes).

---

## Gray Areas Identified (4 presented, 3 selected for discussion)

| # | Area | Selected? |
|---|------|-----------|
| 1 | Découpage des fiches | ✅ |
| 2 | Source du contenu prose | ✅ |
| 3 | Structure interne d'une fiche | ✅ |
| 4 | Navigation et UX panneau Fiches | ❌ (Claude's Discretion — mirror QCM/Flashcards picker pattern) |

---

## Area 1 — Découpage des fiches

**Question:** Quel grain pour les fiches ?

**Options presented:**
1. 1 fiche par bloc RNCP (4 fiches denses, recto-verso A4) — matchait le placeholder existant
2. **1 fiche par thème BANK (15 fiches synthétiques) ← SELECTED**
3. Hybride RNCP + sous-sections thèmes
4. Sélection éditoriale (8-10 fiches choisies)

**Decision:** 1 fiche par thème BANK (15 fiches), slugs alignés sur le picker QCM/Flashcards/Tests blancs (15 thèmes, sans l'option `all`).

**Rationale captured in CONTEXT.md DEC-01:** alignement avec l'axe de travail existant (BANK filtering, prefs `lastTheme/lastQcmTheme/lastTestTheme`). Évite la double-axe RNCP + thème qui forcerait l'owner à traduire mentalement. Le thème `rncp` du BANK couvre déjà le niveau bloc-compétences.

---

## Area 2 — Source du contenu prose

**Question:** D'où vient la prose des fiches ?

**Options presented:**
1. Rédaction long-form nouvelle (style Découverte v1.0)
2. **Hybride intro long-form + "Questions clés" BANK ← SELECTED**
3. Réutilisation directe du BANK (concat programmatique)
4. Texte minimal + liens internes

**Decision:** Hybride intro long-form authored from scratch (style Découverte v1.0) + section "Questions clés" recyclant 5-10 BANK items sélectionnés éditorialement par thème, format Q/R (question → answer → explanation → source).

**Rationale captured in CONTEXT.md DEC-02:** 50% effort recycle, zéro duplication risk (un item BANK peut servir Flashcards + QCM + Fiche), narrative scaffolding préservée par l'intro long-form. Évite la prose hachée d'une concat pure ET l'effort de duplication d'une rédaction full-new.

---

## Area 3 — Structure interne d'une fiche

**Question:** Template fixe ou free-form ?

**Options presented:**
1. **Template fixe par fiche ← SELECTED**
2. Recto-verso différencié (recto synthèse, verso détails)
3. Free-form long-form (h2/h3 organiques)
4. Tableau-récap dominant

**Decision:** Template fixe identique sur les 15 fiches — 6 sections obligatoires dans cet ordre : TL;DR · Définitions · Cadre légal/normatif · Démarche/méthode · Pièges fréquents · Sources.

**Rationale captured in CONTEXT.md DEC-03:** prédictibilité de navigation, scannabilité, comparabilité cross-fiche (la section Pièges devient un index final-week revision). Print parity A4. Section length budget : 1-2 pages par fiche, cap 3 pages.

---

## Claude's Discretion (deferred to planning — not asked)

| Tag | Decision | Why no question |
|-----|----------|----------------|
| DEC-04 | Theme picker `<select>` + single fiche rendered, optional in-fiche ToC | Direct mirror of Plan 04-02/03 picker pattern — no novelty |
| DEC-05 | IIFE shell identical to Plans 04-02/03 (DCL boot, double-load guard, panel-scoped) | Locked by Phase 3/4 precedent |
| DEC-06 | `.fi-*` CSS namespace appended to `chassis.css @layer components` after `.qz-*` block | Direct mirror of Plan 04-01 discipline |
| DEC-07 | Print = Ctrl+P only, no JS button; add `page-break-before: always` per fiche + hide other 3 panels in print | chassis.css §7 already does 90% of work; no new UX needed |
| DEC-08 | Source line builder reused from Plan 04-02/03 (createElement + textContent) | XSS-safe Pattern S3 already proven |
| DEC-09 | Fiches IIFE NEVER writes `qhse-srs-v1` or `qhse-scores-v1` | Read-only surface (logical extension of D-V2-03 to Phase 5) |

---

## Deferred / Out of Scope (captured for future)

- Full-text search across fiches → v2.1 backlog if asked
- "Imprimer toutes les fiches" button → skip; native browser print handles
- Owner-editable margin annotations → defeats static printable model
- Cross-linking between fiches → planner discretion if cheap
- `verify-fiches.cjs` Node gate codifying FICHE-01/02 contract → likely Plan 05-04 if Phase 5 follows Phase 4's 4-plan shape

---

## Scope-Creep Redirects

None during this session. All user answers stayed within the FICHE-01/02 phase boundary.

---

## Next Step Confirmed

**Required before `/gsd-plan-phase 5`:** run `/gsd-ui-phase 5` to lock the UI design contract (panel layout, typography rhythm, print-specific polish on top of chassis.css §7). The plan-phase workflow's UI gate (§5.6) will block planning until UI-SPEC.md exists, since Fiches is a frontend phase.

Sequence:
```
1. /gsd-ui-phase 5      → 05-UI-SPEC.md (locks visual + print contract)
2. /gsd-plan-phase 5    → 05-RESEARCH.md, 05-PATTERNS.md, plans 05-XX-PLAN.md
3. /gsd-execute-phase 5 → ship the fiches + namespace + new content
```
