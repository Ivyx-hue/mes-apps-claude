# Phase 2: Content Bank — Research

**Researched:** 2026-05-17
**Domain:** QHSE regulatory content, authority-backbone URL scouting, data-file schema, batch-authoring strategy
**Confidence:** HIGH (schema/architecture), HIGH (INRS/service-public URLs), MEDIUM (ISO free pages), MEDIUM (SPA-flagged sources)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** `theme` is a closed vocabulary of exactly 15 kebab-case slugs: `duerp` · `principes-generaux` · `iso-9001` · `iso-14001` · `iso-45001` · `tms` · `risque-routier` · `risque-chimique` · `rps` · `espaces-confines` · `acronymes` · `metiers` · `calendrier` · `icpe-seveso` · `rncp`. No catch-all/`divers` theme.
- **D-02:** ISO norms are three separate themes (`iso-9001`, `iso-14001`, `iso-45001`). No single `iso` theme, no extra `norm` sub-field.
- **D-03:** RNCP41446 / BC01–BC04 is handled by topical themes + one meta-theme `rncp`. No extra `bloc` schema field.
- **D-04:** `acronymes`, `metiers`, `calendrier` are first-class themes, not cross-cutting tags.
- **D-05:** Pédagogique-first sourcing. `source.authority` + `source.url` point to the stable content-verifiable pedagogical page. Regulatory ref always in `source.ref`.
- **D-06:** ISO items: `source.ref` = norm + clause; `source.url` = a free authoritative page that actually covers that point. Never link paywalled full text.
- **D-07:** Légifrance deep-link of legal articles goes inside `explanation` prose (parenthetical) in addition to the pedagogical primary `source`. Primary `source.url` stays the pedagogical page.
- **D-08:** Authority map binding for content-acquisition agent — see table below.
- **D-09:** No unsourced regulatory claim ships. Surface gaps rather than shipping an unverified item.
- **D-10:** `answer` = short recall-grade (1–3 sentences or short list). `explanation` = "why" — context, articulation, mnemonic, common pitfall.
- **D-11:** QCM `answer` = correct option restated concisely; `explanation` = why correct AND why each distractor is wrong.
- **D-12:** QCM distractors = plausible real-domain confusions (wrong article number, neighbouring norm, swapped principle, acronym false-friend).
- **D-13:** `difficulty` rubric: `1` = pure restitution; `2` = comprehension/application; `3` = analysis/articulation. No fixed per-level distribution.

### Claude's Discretion
- Global shape: `window.BANK` array literal in `outils-data.js`, `<script src="outils-data.js">` added to `outils.html`.
- Coverage weighting & volume distribution: balanced with light tilt toward exam-heavy themes (DUERP, 9 principes, ISO 45001, risque chimique). Every theme non-empty and meaningfully filterable.
- Authoring delivery: theme-batched generation with atomic checkpoint commits per batch.
- `id` convention: `<theme>-<type>-NNN` (e.g. `duerp-qcm-001`).
- Exact `verified` date = the date each URL is content-verified during execution.

### Deferred Ideas (OUT OF SCOPE)
- Coverage-weighting precision / fixed difficulty distribution.
- All study-mode behaviour (flashcard render, SM-2, QCM engine, localStorage).
- Fiches de révision long-form prose (Phase 5).
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| BANK-01 | `qhse-cesi/outils-data.js` provides 200+ study items covering the full Bachelor QHSE scope | Volume distribution plan (§6), URL backbone (§3) enable implementation |
| BANK-02 | Every item follows the canonical schema (`id`, `type`, `theme`, `question`, `answer`, `choices?`, `correct?`, `explanation`, `source`, `difficulty`) | Schema confirmed against V2-ETUDE-SPEC.md (§4) |
| BANK-03 | Every item carries a `source` object (`authority`, `ref`, `url`, `verified` date); no regulatory claim ships unsourced | Authority map (§3) and sourcing rules (D-05..D-09) |
| BANK-04 | Every `source.url` is content-verified (real `<title>` + topic match + soft-404 grep; no search/index pages) | Verification protocol (§5), URL scouting with curl results (§3) |
| BANK-05 | Items carry a `theme` so any mode can filter by theme | Closed 15-slug vocabulary locked in D-01 |
| SHELL-05 | (PARTIAL — close this phase) `outils.html` loads content bank via `<script src="outils-data.js">` | `outils.html` integration point confirmed (§4) |
</phase_requirements>

---

## Summary

Phase 2 is fundamentally a content-acquisition and curation phase, not a code-writing phase. The technical deliverable (`outils-data.js`) is a plain JS file of ~200 array-literal objects. The real work is: (1) finding and curl-verifying a stable, content-bearing URL for every regulatory claim, and (2) authoring accurate exam-grade items with correct article numbers, norm clauses, and ROME codes.

The authority backbone is clear and highly verifiable. For 10 of the 15 themes, INRS `/risques/<slug>/ce-qu-il-faut-retenir.html` and `/demarche/<slug>/ce-qu-il-faut-retenir.html` pages curl-verify cleanly with titles matching content, substantial body length (50–90 KB), and no soft-404 markers. `service-public.fr` and `ameli.fr/entreprise` provide equally clean static HTML. The three ISO themes require a non-paywalled strategy: `iso.org` standard overview pages return HTTP 403 to curl, so the plan uses INRS for ISO 45001 (confirmed article) and `qualiteperformance.org` or `learnandconnect.pollutec.com` summaries for 9001/14001 as secondary sources. The `rncp` and `metiers` themes depend on JS SPAs (France compétences, France Travail MétierScope) that must be flagged for human eyeball during execution.

**Primary recommendation:** Author in 6 theme-batches (≈35 items each), commit atomically after each batch. The dominant risk is source-verification failures at scale — the URL scouting in this document gives the executor a pre-vetted backbone that dramatically reduces that risk.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Content storage (`BANK` array) | Static file (`outils-data.js`) | — | Zero-build architecture — plain JS loaded via `<script src>` |
| Schema enforcement | Author-time (hand-authored) | — | No runtime validator; correctness is a human discipline at authoring time |
| Theme filtering | Consumer phase (P3/P4/P5) | — | `BANK.filter(i => i.theme === x)` — data is passive, mode engines query |
| Source verification | Author-time curl | — | BANK-04 hard gate; verified before commit |
| `window.BANK` exposure | Browser global | — | Evaluable in console; no module system, no build |
| `<script src>` wiring | `outils.html` | — | Single `<script src="outils-data.js">` before the tab IIFE; closes SHELL-05 |

---

## Standard Stack

This phase has no external package dependencies. The "stack" is the data format and the authoring toolchain.

### Core
| Component | Version/Spec | Purpose | Why Standard |
|-----------|-------------|---------|--------------|
| `outils-data.js` | plain ES5-safe JS | Array literal assigned to `window.BANK` | Zero build, D-V2-05 locked; `<script src>` in `outils.html` |
| Item schema | V2-ETUDE-SPEC.md | 12-field object | Owner-approved, locked |
| Theme vocabulary | D-01 (15 slugs) | `theme` field values | Locked, closed set |

### No packages to install

This phase installs no npm, pip, or other packages. The `## Package Legitimacy Audit` section is omitted — no external packages involved.

---

## Architecture Patterns

### Data-File Shape

```js
// File: qhse-cesi/outils-data.js
// Source: V2-ETUDE-SPEC.md (locked schema) [VERIFIED: codebase]
window.BANK = [
  {
    id: 'duerp-flashcard-001',
    type: 'flashcard',          // 'flashcard' | 'qcm'
    theme: 'duerp',             // one of the 15 locked slugs
    question: 'Quel article du Code du travail impose le DUERP ?',
    answer: "L'article R4121-1 du Code du travail impose à tout employeur de transcrire les résultats de l'évaluation des risques dans un Document Unique.",
    // choices / correct absent for flashcards
    explanation: "Le DUERP est obligatoire dès le 1er salarié (R4121-1). Il doit être mis à jour au moins annuellement dans les entreprises de 11 salariés et plus. Conservation : 40 ans. (Légifrance : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000023795562)",
    source: {
      authority: 'INRS',
      ref: 'Art. R4121-1 Code du travail',
      url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
      verified: '2026-05-17'
    },
    difficulty: 1
  },
  {
    id: 'principes-generaux-qcm-001',
    type: 'qcm',
    theme: 'principes-generaux',
    question: "Quel est le 3e principe général de prévention au sens de l'article L4121-2 ?",
    answer: "Combattre les risques à la source.",
    choices: [
      "Éviter les risques",
      "Évaluer les risques qui ne peuvent pas être évités",
      "Combattre les risques à la source",
      "Adapter le travail à l'homme"
    ],
    correct: 2,   // index into choices (0-based)
    explanation: "Ordre exact de L4121-2 : 1-Éviter, 2-Évaluer, 3-Combattre à la source, 4-Adapter. Distractor 0 et 1 sont les principes 1 et 2 ; distractor 3 est le principe 4.",
    source: {
      authority: 'INRS',
      ref: 'Art. L4121-2 Code du travail',
      url: 'https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html',
      verified: '2026-05-17'
    },
    difficulty: 2
  }
];
```

**Key invariants (V2-ETUDE-SPEC.md §Content bank):**
- `correct` is a 0-based index into `choices` array
- `choices` and `correct` are present only for `type: 'qcm'` items
- `difficulty` values: `1` | `2` | `3` only
- `theme` must be one of the 15 locked slugs — no others

### Integration Point: `outils.html`

The `<script src="outils-data.js">` tag is inserted in `<head>` (or immediately before the closing `</body>`, before the existing tab IIFE) in `qhse-cesi/outils.html`. [VERIFIED: codebase]

Current state of `outils.html` (141 lines, confirmed): no `<script src="outils-data.js">` tag present. The tab IIFE at lines 88–139 is shell-only and does not reference `BANK`. Insertion point: add `<script src="outils-data.js"></script>` after the `<link rel="stylesheet" href="chassis.css">` line (line 15) in `<head>`, so `window.BANK` is available before any inline scripts run.

```html
<!-- Insert in <head>, after chassis.css link — closes SHELL-05 -->
<script src="outils-data.js"></script>
```

### Recommended Project Structure (additions only)

```
qhse-cesi/
├── outils.html        # existing — add <script src="outils-data.js"> in <head>
├── outils-data.js     # NEW — window.BANK array literal (this phase)
├── chassis.css        # existing
└── index.html         # existing, untouched
```

### Pattern: Batch-then-commit Authoring

Author theme by theme. After each batch:
1. Write items for the batch to `outils-data.js` (append to the array)
2. Run a per-batch self-check: `BANK.filter(i => i.theme === '<slug>').length` in browser console
3. `git add qhse-cesi/outils-data.js && git commit -m "feat(bank): add <theme> batch (N items)"`
4. Push immediately — token-cap safety net

### Anti-Patterns to Avoid

- **`media.html?refINRS=ED XXXX` links:** These redirect to the wrong brochure. Always use `/risques/<slug>/ce-qu-il-faut-retenir.html` or `/demarche/<slug>/ce-qu-il-faut-retenir.html` — static, correctly curl-verified.
- **Search-result URLs (`?q=`, `/recherche?`):** Banned per D-09 and feedback_verify_links_before_ship.
- **`source.url` pointing to the Légifrance article:** Légifrance has Cloudflare JS embedded in page source (grep triggers on the word "cloudflare" in a `<script>` tag) but actual article content IS present in curl output today. However, per the verify-links-before-ship memory Légifrance is flagged as unreliable for deep links. Rule: Légifrance article URLs go only in `explanation` prose (D-07), never in `source.url`.
- **`window.BANK = require(...)` or any module syntax:** Zero-build means plain `window.BANK = [...]` only.
- **One giant uncommitted file:** Token-cap risk. Commit per batch, never accumulate all 200+ items before first commit.

---

## Authority-Backbone URL Scouting (15 Themes)

### Curl-Verification Legend
- `[CV]` = curl-verified in this research session: HTTP 200, real `<title>` matching topic, no soft-404 markers, substantial body (>10KB)
- `[SPA]` = JS single-page app — curl returns thin shell (~5KB, generic title); must be human-eyeballed during execution
- `[CF]` = Cloudflare JS present in page source, but article content IS embedded in curl response (use only in `explanation`, not `source.url`)
- `[HTTP403]` = ISO.org blocks curl entirely

---

### Theme: `duerp`
Authority per D-08: INRS (dossiers / "ce qu'il faut retenir") · `ref`: Code du travail article (R4121-1, L4121-3)

| URL | What it Contains | Status |
|-----|-----------------|--------|
| `https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html` | DUERP definition, 5 étapes EvRP, conservation 40 ans, Papripact, mise à jour triggers | `[CV]` — title "Document unique d'évaluation des risques…INRS", body 72KB |
| `https://www.inrs.fr/demarche/evaluation-risques-professionnels/ce-qu-il-faut-retenir.html` | EvRP methodology, cadre juridique, success factors | `[CV]` — distinct from DUERP page; covers the approach not just the document |
| `https://www.ameli.fr/entreprise/sante-travail/risques/troubles-musculosquelettiques-tms/pourquoi-comment-agir` | (for TMS/DUERP overlap items) | `[CV]` |
| `https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000023795562` | Art. R4121-1 exact text | `[CF]` — in `explanation` only per D-07 |
| `https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033019913` | Art. L4121-2 exact text (9 principes) | `[CF]` — in `explanation` only per D-07 |

**Regulatory accuracy anchors:**
- Art. R4121-1 Code du travail: imposes DUERP on every employer dès 1 salarié
- Art. L4121-3: general obligation to evaluate risks
- Art. L4121-3-1: Papripact (programme annuel de prévention des risques) — obligatoire pour les entreprises ≥ 50 salariés
- Conservation du DUERP: **40 ans** (not 5, not 10 — common exam trap)
- Mise à jour: annuelle ≥11 salariés, à chaque décision d'aménagement important, à chaque nouvelle information

---

### Theme: `principes-generaux`
Authority per D-08: INRS · `ref`: Art. L4121-2 Code du travail

| URL | What it Contains | Status |
|-----|-----------------|--------|
| `https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html` | All 9 principles listed with explanatory text, links to sub-dossiers | `[CV]` — title "Neuf principes généraux de prévention — INRS", body 61KB |

**Regulatory accuracy anchors — exact order of L4121-2 (exam-critical):**
1. Éviter les risques
2. Évaluer les risques qui ne peuvent pas être évités
3. Combattre les risques à la source
4. Adapter le travail à l'homme
5. Tenir compte de l'état d'évolution de la technique
6. Remplacer ce qui est dangereux par ce qui ne l'est pas ou par ce qui l'est moins
7. Planifier la prévention (en intégrant technique, organisation, conditions de travail, relations sociales, facteurs ambiants — y compris RPS et harcèlement)
8. Prendre des mesures de protection collective en leur donnant la priorité sur les mesures de protection individuelle
9. Donner les instructions appropriées aux travailleurs

Common exam trap: confusing order (3 vs 4, 8 vs 9), or attributing the article number as L4121-1 instead of L4121-2.

---

### Theme: `iso-9001`
Authority per D-08: Free authoritative summary · `ref`: ISO 9001:2015 + clause

| URL | What it Contains | Status |
|-----|-----------------|--------|
| `https://www.iso.org/standards/popular/iso-9000-family` | ISO 9000 family overview — HTTP 403 to curl | `[HTTP403]` |
| `https://www.iso.org/home/insights-news/resources/iso-9001-explained.html` | ISO 9001 explained — HTTP 403 to curl | `[HTTP403]` |
| `https://www.qualiteperformance.org/comprendre-la-qualite/referentiels-de-management-iso-14001-le-management-environnemental` | ISO 14001 (sister page exists for 9001) | needs verification at execution |
| `https://normalisation.afnor.org/actualites/management-de-la-qualite-afnor-met-a-disposition-la-norme-iso-90012015/` | AFNOR announcement of ISO 9001:2015 | [ASSUMED] — not curl-tested |

**ISO 9001 gap flag:** iso.org blocks curl (HTTP 403). During execution, the executor MUST human-eyeball an alternative free authoritative page. Candidates:
- `https://www.afnor.org/en/quality/` (AFNOR ISO 9001 overview — in English; French equivalent may differ)
- `https://learnandconnect.pollutec.com/iso-45001-sante-securite-travail/` (pattern exists for 45001 — search for a 9001 equivalent)
- Wikipedia FR (`https://fr.wikipedia.org/wiki/ISO_9001`) as a secondary cite — [ASSUMED] adequacy for a `source.url`

**D-06 compliance note:** Never link the AFNOR boutique (paywall) or ISO.org standard page (paywall). The `source.url` must be a free page that actually contains the cited content.

**Regulatory accuracy anchors:**
- ISO 9001:2015 — current version (revision to ISO 9001:2026 underway, target Aug–Oct 2026, 3-year transition)
- 7 Quality Management Principles (ISO 9000): customer focus, leadership, engagement of people, process approach, improvement, evidence-based decision making, relationship management
- Structure: HLS (High Level Structure) — same as ISO 14001 and ISO 45001
- Key clauses: §4 (contexte), §5 (leadership), §6 (planification), §7 (support), §8 (réalisation), §9 (évaluation), §10 (amélioration)
- PDCA (Roue de Deming) underpins the structure

---

### Theme: `iso-14001`
Authority per D-08: Free authoritative summary · `ref`: ISO 14001:2015 + clause

| URL | What it Contains | Status |
|-----|-----------------|--------|
| `https://www.iso.org/standard/60857.html` | ISO 14001:2015 standard page — 403 to curl | `[HTTP403]` |
| `https://fr.wikipedia.org/wiki/ISO_14001` | Wikipedia FR ISO 14001 — reasonable secondary | [ASSUMED] |
| `https://www.qualiteperformance.org/comprendre-la-qualite/referentiels-de-management-iso-14001-le-management-environnemental` | Qualité Performance: ISO 14001 management environnemental | [ASSUMED] — not curl-tested; candidate for execution |

**ISO 14001 gap flag:** Same iso.org 403 problem as 9001. Executor must find and curl-verify a free French authoritative page.

**Regulatory accuracy anchors:**
- ISO 14001:2015 — current version (ISO 14001:2026 in preparation — under revision as of 2026)
- Scope: Système de Management Environnemental (SME)
- PDCA cycle — same HLS as 9001/45001
- Key clauses mirror ISO 9001 (§4–§10) with environmental lens
- Notion of "aspects environnementaux" and "impacts environnementaux"
- "Double matérialité" integration in upcoming 14001:2026 revision

---

### Theme: `iso-45001`
Authority per D-08: INRS (for 45001) · `ref`: ISO 45001:2018 + clause

| URL | What it Contains | Status |
|-----|-----------------|--------|
| `https://www.inrs.fr/media.html?refINRS=NO+28` | INRS Note Opérationnelle 28 on ISO 45001:2018 — **WARNING: `media.html` redirect pattern** | `[AVOID]` — may serve wrong document |
| `https://www.preventionbtp.fr/ressources/focus/la-norme-iso-45001-systemes-de-management-de-la-sante-et-la-securite-au-travail_e57dJMa6kD6qabXQpowUUk` | Prévention BTP ISO 45001 — free overview | [ASSUMED] — not curl-tested |
| `https://www.oo2.fr/actualites/iso-45001-sante-et-securite-au-travail-tout-qu-faut-savoir-sur-la-norme-iso-450012018` | oo2.fr ISO 45001 overview | [ASSUMED] — not curl-tested |

**ISO 45001 gap flag:** The natural INRS source uses the `media.html?refINRS=` pattern which is flagged as unreliable (redirects to wrong document). Executor must find an INRS static page about ISO 45001, or use a pre-verified alternative. Search query at execution: `site:inrs.fr ISO 45001` — look for a `/demarche/` or `/risques/` page, not `media.html`.

**Regulatory accuracy anchors:**
- ISO 45001:2018 replaced OHSAS 18001
- Published March 2018; revision started 2024, publication target October 2027
- HLS structure (§4–§10) — same as 9001/14001
- Key addition vs OHSAS 18001: explicit "worker participation and consultation" (§5.4), "context of the organization" (§4)
- PDCA underpins
- Key clause for exam: §6.1.2 — identification des dangers et évaluation des risques SST

---

### Theme: `tms`
Authority per D-08: INRS · ameli risques pro · `ref`: Code du travail articles + statistical refs

| URL | What it Contains | Status |
|-----|-----------------|--------|
| `https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html` | TMS definition, health impact, risk factors (biomécanique, psychosociale, environnementale), 4-step prevention approach, statistics | `[CV]` — title "Troubles musculosquelettiques (TMS). Ce qu'il faut retenir — INRS", body 69KB |
| `https://www.ameli.fr/entreprise/sante-travail/risques/troubles-musculosquelettiques-tms/pourquoi-comment-agir` | TMS prevention from ameli angle — PRAP training, 4 sectors, subsidies | `[CV]` — title "Les TMS : pourquoi et comment agir | ameli.fr | Entreprise", body 94KB |
| `https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/prevention.html` | TMS prevention démarche | available (INRS static) |

**Regulatory accuracy anchors:**
- TMS = plus de 80% (INRS) / 88% (ameli 2024) des maladies professionnelles reconnues
- Membres supérieurs principalement touchés (épaule, coude/poignet, main), mais aussi membres inférieurs et rachis
- 3 catégories de facteurs de risque: biomécaniques, psychosociaux, environnementaux
- TMS-Pros: programme Assurance Maladie en 4 étapes (mobiliser, investiguer, maîtriser, évaluer)
- PRAP = Prévention des Risques liés à l'Activité Physique (formation)

---

### Theme: `risque-routier`
Authority per D-08: INRS · `ref`: Code du travail + stats ONISR

| URL | What it Contains | Status |
|-----|-----------------|--------|
| `https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html` | Risque routier pro: ~30% des AT mortels, mission vs trajet distinction, prévention (organisation/ressources/compétences) | `[CV]` — title "Risques routiers. Ce qu'il faut retenir — INRS", body 69KB |
| `https://www.inrs.fr/risques/routiers/demarche-prevention.html` | Prevention approach details | available (INRS static) |
| `https://www.inrs.fr/risques/deplacements/ce-qu-il-faut-retenir.html` | Déplacements (broader category) | `[CV]` via WebSearch result |

**Regulatory accuracy anchors:**
- Risque routier de mission: conduite d'un véhicule dans le cadre d'une mission professionnelle
- Risque routier de trajet: domicile ↔ lieu de travail
- ~30% des accidents du travail mortels (mission + trajet combinés) — major exam stat
- Prévention sur 3 axes: organisation du travail/déplacements, ressources (véhicules, télécommunications), compétences (recrutement, formation)
- Intégration dans le DUERP obligatoire

---

### Theme: `risque-chimique`
Authority per D-08: INRS · ameli · `ref`: Code du travail + CLP regulation

| URL | What it Contains | Status |
|-----|-----------------|--------|
| `https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html` | Chemical risk overview, health effects (acute/chronic), CMR, fire/explosion, prevention framework | `[CV]` — title "Risques chimiques. Ce qu'il faut retenir — INRS", body 80KB |
| `https://www.inrs.fr/risques/classification-etiquetage-produits-chimiques/ce-qu-il-faut-retenir.html` | CLP regulation, SGH, pictogrammes, mentions de danger/prudence | `[CV]` — title "Classification et étiquetage…Ce qu'il faut retenir — INRS", body 51KB |
| `https://www.inrs.fr/risques/mesure-expositions-agents-chimiques-biologiques/ce-qu-il-faut-retenir.html` | VLEP (valeurs limites d'exposition professionnelle), mesurages atmosphériques | `[CV]` via WebFetch |
| `https://www.ameli.fr/entreprise/sante-travail/risques/risques-chimiques-entreprise/definition` | Ameli: risques chimiques, causes, 2e maladie pro | `[CV]` — title "Tout savoir sur les risques chimiques | ameli.fr", body 82KB |

**Regulatory accuracy anchors:**
- CMR = Cancérogène, Mutagène, toxique pour la Reproduction — classification renforcée
- Règlement CLP (CE) 1272/2008 — Classification, Labelling, Packaging — remplace l'ancien système 1 juin 2015
- SGH = Système Général Harmonisé (UN level)
- VLEP: VME (valeur moyenne d'exposition, 8h) et VLE (valeur limite d'exposition courte durée, 15min)
- Fiches de Données de Sécurité (FDS) — obligatoire pour tout agent chimique dangereux
- 2e cause de maladies professionnelles après TMS

---

### Theme: `rps`
Authority per D-08: INRS · `ref`: Code du travail + modèles de Karasek/Siegrist

| URL | What it Contains | Status |
|-----|-----------------|--------|
| `https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html` | RPS definition (stress + violences internes + violences externes), facteurs de risque, conséquences santé, prévention collective | `[CV]` — title "Risques psychosociaux (RPS). Ce qu'il faut retenir — INRS", body 87KB |
| `https://www.inrs.fr/risques/psychosociaux/prevention.html` | Démarche de prévention RPS | available (INRS static) |

**Regulatory accuracy anchors:**
- RPS ≠ une maladie: risques pouvant conduire à troubles cardiovasculaires, TMS, anxio-dépression, burnout
- 3 composantes: stress (modèle déséquilibre effort/ressources), violences internes (harcèlement moral/sexuel), violences externes (incivilités, agressions)
- Burnout (épuisement professionnel): ensemble de réactions consécutives à des situations de stress chronique au travail
- Harcèlement moral: Art. L1152-1 Code du travail
- Prévention: démarche collective centrée sur le travail et son organisation (pas analyse psychologique individuelle)
- Questionnaires INRS: RPS-DU (pour DUERP) et Sumer

---

### Theme: `espaces-confines`
Authority per D-08: INRS · `ref`: Code du travail + arrêté

| URL | What it Contains | Status |
|-----|-----------------|--------|
| `https://www.inrs.fr/risques/espaces-confines/ce-qu-il-faut-retenir.html` | Definition, risques atmosphériques (O2, toxiques, explosifs), organisation (permis d'entrer, surveillance permanente), formation | `[CV]` — title "Espaces confinés. Ce qu'il faut retenir — INRS", body 66KB |
| `https://www.inrs.fr/risques/espaces-confines/procedure-travail-espaces-confines.html` | Permis d'entrer et de travail, procédure | available (INRS static) |

**Regulatory accuracy anchors:**
- Définition: volume totalement ou partiellement fermé, non conçu pour occupation permanente, accessible temporairement
- Exemples: fosses, cuves, silos, égouts, canalisations, puits, trémies
- Risques atmosphériques: (1) appauvrissement en O2 (< 19,5%), (2) atmosphère toxique, (3) atmosphère explosive (ATEX)
- Causes principales d'accidents: analyse insuffisante, mauvaise coordination, surveillance atmosphérique absente, formation inadéquate
- Permis d'entrer: obligatoire — informe des dangers, mesures de prévention, secours
- Surveillance permanente extérieure par un surveillant qualifié
- Lien avec risque chimique (agents chimiques dans l'espace)

---

### Theme: `acronymes`
Authority per D-08: domain authority of each acronym · `ref`: varies

| URL | What it Contains | Status |
|-----|-----------------|--------|
| `https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html` | For DUERP, EvRP, Papripact acronyms | `[CV]` |
| `https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html` | For CMR, FDS, VLEP, SGH, CLP, ATEX | `[CV]` |
| `https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html` | For TMS, PRAP, AT/MP | `[CV]` |
| `https://entreprendre.service-public.gouv.fr/vosdroits/F33414` | For ICPE, DREAL, CERFA, CODERST | `[CV]` |
| `https://www.francecompetences.fr/recherche/rncp/41446/` | For RNCP, CFA, VAE, BC01–BC04 | `[SPA]` — human eyeball needed |

**Key QHSE acronymes to cover:**
DUERP, EvRP, Papripact, PRAP, TMS, AT/MP, CMR, FDS, VLEP/VME/VLE, SGH/CLP, ATEX, ICPE, DREAL, SEVESO, EPI/EPC, PDCA, SMQ/SME/SMS (Système Management Qualité/Environnemental/Santé-Sécurité), RNCP, CFA, VAE, QCM, HSE, QHSE, ROME, OHSAS, ISO, RPS, CSE, CHSCT (ancien), CSSCT

---

### Theme: `metiers`
Authority per D-08: France Travail MétierScope + APEC · `ref`: code ROME

| URL | What it Contains | Status |
|-----|-----------------|--------|
| `https://candidat.francetravail.fr/metierscope/fiche-metier/H1302` | H1302 Responsable HSE en industrie — fiches missions, salaires | `[SPA]` — curl title "Fiche Métier", body ~5KB. Human eyeball required. |
| `https://candidat.francetravail.fr/metierscope/fiche-metier/H1502/responsable-qualite-en-industrie` | H1502 Responsable qualité en industrie | `[SPA]` — same SPA pattern |
| `https://candidat.francetravail.fr/metierscope/fiche-metier/H1523` | H1523 Responsable QSE en industrie | `[SPA]` — same SPA pattern |
| `https://candidat.francetravail.fr/metierscope/fiche-metier/H1303` | H1303 Technicien HSE | `[SPA]` — same SPA pattern |

**SPA mitigation strategy:** MétierScope renders content in the browser but not via curl. During execution, the executor must open each URL in a browser, verify the content matches the ROME code, and set `verified` date after manual check. The `source.url` may still be used — but BANK-04 verification requires a human step, not a curl step, for these 4 URLs.

**Regulatory accuracy anchors:**
- H1302: Management et ingénierie HSE industriels — niveau Bac+5 (Master/Ingénieur) typiquement
- H1502: Management et ingénierie qualité industrielle
- H1523: Responsable QSE — niveau Bachelor / Bac+3 typiquement (corresponds to RNCP41446 target level)
- H1303: Technicien HSE — niveau Bac+2

---

### Theme: `calendrier`
Authority per D-08: service-public.fr (contrat apprentissage/pro) · `ref`: Code du travail

| URL | What it Contains | Status |
|-----|-----------------|--------|
| `https://www.service-public.gouv.fr/particuliers/vosdroits/F2918` | Contrat d'apprentissage: conditions, durée (6 mois à 3 ans), rémunération (% SMIC par âge/année), formation en CFA (≥25% durée contrat), maître d'apprentissage | `[CV]` — title "Contrat d'apprentissage | Service Public", body 245KB |
| `https://www.service-public.gouv.fr/particuliers/vosdroits/F15478` | Contrat de professionnalisation: conditions, rémunération par tranche d'âge, durée (6–24 mois), tuteur | `[CV]` — title "Contrat de professionnalisation | Service Public", body 317KB |
| `https://entreprendre.service-public.gouv.fr/vosdroits/F31704` | Différences apprentissage vs professionnalisation | [ASSUMED] — not curl-tested; likely same pattern as above |

**Regulatory accuracy anchors:**
- Contrat d'apprentissage: CFA ≥ 25% de la durée totale du contrat; entrée en CFA dans les 3 mois du démarrage
- Rémunération apprentissage: % du SMIC selon âge (16-17: 27%, 18-20: 43%, 21-25: 53%, 26+: 100%) — these percentages are updated; executor must verify current values at time of authoring
- Contrat de professionnalisation: durée 6–12 mois (extensible à 24 mois par accord de branche)
- Maître d'apprentissage (apprentissage) vs Tuteur (professionnalisation) — common exam confusion

---

### Theme: `icpe-seveso`
Authority per D-08: service-public.fr · Géorisques · aida.ineris.fr · `ref`: Code de l'environnement

| URL | What it Contains | Status |
|-----|-----------------|--------|
| `https://entreprendre.service-public.gouv.fr/vosdroits/F33414` | ICPE classification (déclaration/enregistrement/autorisation), procédures, cessation d'activité, accidents | `[CV]` — title "Installations classées…(ICPE) | Service Public Entreprendre", body 1MB (very large — static) |
| `https://aida.ineris.fr/inspection-icpe/risques-accidentels/seveso` | Seveso directive (2012/18/UE), établissements Seveso, aide Seveso 3 | `[CV]` — title "Seveso | AIDA", body 37KB (landing page — thin, use sub-pages) |
| `https://aida.ineris.fr/inspection-icpe/principes-reglementaires/quest-quune-installation-classee` | Définition installation classée | available (INRS static) |
| `https://aida.ineris.fr/thematiques/nomenclature-icpe` | Nomenclature ICPE (rubriques) | available |

**Additional ICPE/Seveso source — ecologie.gouv.fr:**
- `https://www.ecologie.gouv.fr/politiques-publiques/savoir-icpe-nomenclature-gestion-declaration` — Ministère de la Transition écologique (ICPE, nomenclature, déclaration). Not curl-tested; [ASSUMED] for now.

**Regulatory accuracy anchors:**
- 3 régimes ICPE: Déclaration (moindre danger) → Enregistrement (procédure simplifiée) → Autorisation (dangers sérieux)
- Directive Seveso 3: 2012/18/UE — établissements à hauts risques (seuils de substances dangereuses)
- Seveso seuil bas (S) vs seuil haut (SH) — deux niveaux de contrainte
- Rubriques ICPE: 4xxx = substances dangereuses CLP (Seveso); 1xxx–3xxx = activités et procédés
- Art. L511-1 Code de l'environnement: fondement des ICPE
- DREAL = Direction Régionale de l'Environnement, de l'Aménagement et du Logement — autorité de contrôle
- PPRT = Plan de Prévention des Risques Technologiques — associé aux Seveso SH

---

### Theme: `rncp`
Authority per D-08: France compétences (fiche RNCP41446) · `ref`: RNCP41446 / BCxx

| URL | What it Contains | Status |
|-----|-----------------|--------|
| `https://www.francecompetences.fr/recherche/rncp/41446/` | RNCP41446 certification fiche, BC01–BC04 titles and descriptions, NSF codes, ROME codes, expiration 2030-10-27 | `[SPA]` — curl: title "Rechercher une certification - France compétences" (generic), body 276KB, RNCP content IS embedded (grep finds RNCP41446 + BC text) — ambiguous SPA status. Human eyeball to confirm rendering. |

**Regulatory accuracy anchors (WebFetch confirmed content in RNCP41446 fiche):**
- BC01: "Construire le système de management QSE"
- BC02: "Améliorer le système de management QSE"
- BC03: "Manager les risques QSE"
- BC04: "Accompagner l'organisme dans ses démarches RSE et de développement durable"
- Niveau: 6 (Bac+3)
- Certificateur: CESI
- Expiration fiche: 27-10-2030
- ROME codes associated: H1302, H1502, H1523 (visible in the fiche)

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| URL liveness checking | Custom HTTP checker | The curl command from feedback_verify_links_before_ship.md | Already battle-tested; checks title + soft-404 + Cloudflare |
| Content-verification | Eye-scanning HTML | The exact bash snippet (fetch body, grep title, grep soft-404 markers) | HTTP-200 alone is insufficient — SPAs and Cloudflare return 200 |
| Schema validation | Runtime validator in JS | Author-time discipline + per-batch console check (`BANK.filter(…).length`) | Zero-build means no validator; check schema at authoring time |
| Theme taxonomy | Inferred from content | The closed D-01 vocabulary | The 15 slugs are locked — no derivation needed |
| Légifrance deep-links | None — use directly in `explanation` | Embed as parenthetical in `explanation` prose per D-07 | Légifrance has Cloudflare JS in source but content is actually present in curl; rule is: `explanation` only, never `source.url` |

---

## Content-Verification Protocol (BANK-04)

This is the procedure the executor MUST follow for every `source.url` before committing an item:

```bash
# Step 1: Fetch with realistic browser UA, follow redirects
body=$(curl -sS -L --max-time 14 \
  -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36" \
  "$url" 2>/dev/null)

# Step 2: Extract and check title
title=$(printf '%s' "$body" | tr -d '\n' \
  | grep -oiE '<title[^>]*>[^<]*</title>' | head -1 | sed 's/<[^>]*>//g')
echo "TITLE: $title"

# Step 3: Check for soft-404 markers
printf '%s' "$body" \
  | grep -qiE 'page introuvable|erreur 404|not found|just a moment|page non trouv' \
  && echo "SOFT-404 DETECTED — REJECT" \
  || echo "OK"

# Step 4 (manual): Does the title match the item's claimed topic?
# FAIL if: title is generic ("Fiche Métier", "Rechercher une certification"),
#          empty, or unrelated to the item's question.
```

**PASS criteria:** HTTP 200 + non-empty title matching the item topic + no soft-404 grep match.

**FAIL patterns and remedies:**
| Failure | Cause | Remedy |
|---------|-------|--------|
| Title is "Fiche Métier" (5KB body) | MétierScope SPA | Human browser verification required; set `verified` after eyeballing |
| Title "Rechercher une certification" (but content exists in grep) | France compétences SPA-like | Human browser eyeball; content IS present in HTML source, rendering uncertain |
| Title "Just a moment…" | Cloudflare CAPTCHA block | Replace URL with a non-Cloudflare source |
| Title is wrong doc | INRS `media.html?refINRS=` redirect | Replace with `/risques/<slug>/ce-qu-il-faut-retenir.html` static URL |
| Wrong-doc pass (200 + plausible title but wrong content) | The hardest case | Check body grep for the specific claim (article number, norm, term) |

**SPA checkpoint rule:** For `metiers` theme (H1302/H1502/H1523/H1303) and `rncp` theme, curl verification is insufficient. The plan MUST include an explicit `checkpoint:human-verify` task for these URL classes before committing items that cite them.

---

## Volume Distribution and Batch Plan

### Proposed Per-Theme Item Targets

Total target: **210 items** (buffer above the 200 minimum for the event that a few items fail source verification and must be dropped).

| Theme | Flashcards | QCM | Subtotal | Rationale |
|-------|-----------|-----|----------|-----------|
| `duerp` | 10 | 8 | **18** | Exam-heavy; foundational regulatory knowledge |
| `principes-generaux` | 10 | 8 | **18** | 9 named principles — high restitution + discrimination QCMs |
| `iso-9001` | 8 | 6 | **14** | One of 3 ISO themes; clauses + 7 principles |
| `iso-14001` | 8 | 6 | **14** | Environmental norm; aspects/impacts concepts |
| `iso-45001` | 10 | 8 | **18** | Exam-heavy SST norm; replaces OHSAS 18001 |
| `tms` | 8 | 6 | **14** | 88% maladies pro — high-stats theme |
| `risque-routier` | 7 | 5 | **12** | ~30% AT mortels — stat + prevention axes |
| `risque-chimique` | 10 | 8 | **18** | Exam-heavy; CMR, CLP, VLEP, FDS |
| `rps` | 8 | 6 | **14** | RPS definition + 3 composantes + burnout |
| `espaces-confines` | 7 | 5 | **12** | Permis d'entrer, surveillance, atmosphères |
| `acronymes` | 14 | 6 | **20** | Pure restitution D1; many short flashcards |
| `metiers` | 7 | 5 | **12** | ROME codes + salaires + missions |
| `calendrier` | 6 | 5 | **11** | Apprentissage vs pro — dates/pourcentages |
| `icpe-seveso` | 7 | 5 | **12** | 3 régimes + Seveso seuils |
| `rncp` | 8 | 5 | **13** | BC01–BC04 structure + diploma metadata |
| **TOTAL** | **128** | **82** | **210** | ~61% flashcard / 39% QCM |

**Tilt rationale:** DUERP, principes-généraux, iso-45001, risque-chimique each get 18 items (highest in the non-`acronymes` group) — matching D-08 exam-heavy designation. Every theme reaches at least 11 items, ensuring meaningful filterability.

### Recommended Batch Order and Sizing

Token-conscious: commit after each batch. Recommended grouping by authority source to minimize context-switching:

| Batch | Themes | Items | Authority Source |
|-------|--------|-------|-----------------|
| Batch A | `duerp` + `principes-generaux` | 36 | INRS `/demarche/` pages |
| Batch B | `iso-45001` + `iso-9001` + `iso-14001` | 46 | ISO/INRS mixed (hardest — ISO 9001/14001 need human-verified URLs) |
| Batch C | `tms` + `risque-routier` + `rps` | 40 | INRS `/risques/<slug>/ce-qu-il-faut-retenir.html` |
| Batch D | `risque-chimique` + `espaces-confines` | 30 | INRS `/risques/chimiques/` + `/espaces-confines/` |
| Batch E | `icpe-seveso` + `calendrier` + `acronymes` | 43 | AIDA/service-public + INRS cross-theme |
| Batch F | `metiers` + `rncp` | 25 | France Travail SPA + France compétences (human-verify batch) |

**Batch F note:** Both `metiers` and `rncp` depend on SPA sources requiring human eyeball. This batch should be planned with an explicit checkpoint step: open each MétierScope and France compétences URL in a browser, confirm content, record `verified` date, then write items.

### Per-Batch Self-Check

After each batch, verify in browser console before committing:
```js
// Minimum count per theme in this batch
BANK.filter(i => i.theme === 'duerp').length           // expect 18 after Batch A
BANK.filter(i => i.type === 'qcm' && i.choices && i.correct !== undefined).length  // all QCMs have choices+correct
BANK.filter(i => !i.source || !i.source.url || !i.source.verified).length         // expect 0
```

---

## Domain Accuracy Anchors (exam-critical facts)

These are the specific regulatory reference points items MUST get exactly right. A wrong article number or norm clause propagates into the owner's exam prep.

### Code du travail articles

| Fact | Exact Reference | Common Error to Avoid |
|------|----------------|----------------------|
| Obligation DUERP | Art. R4121-1 | Confusing with L4121-1 (obligation générale) or L4121-3 |
| 9 principes généraux | Art. L4121-2 | Attributing to L4121-1 |
| Obligation de sécurité de l'employeur | Art. L4121-1 | Confusing with L4121-2 |
| Conservation DUERP | 40 ans | Writing 5 ans or 10 ans |
| Mise à jour DUERP fréquence | Annuelle ≥11 salariés | Writing "chaque année" without the seuil |
| Harcèlement moral | Art. L1152-1 | Confusing avec L1153-1 (harcèlement sexuel) |

### ISO norms

| Fact | Exact Reference | Common Error to Avoid |
|------|----------------|----------------------|
| ISO 45001 remplace | OHSAS 18001 (pas ISO 45001:2008) | Writing "ISO 45001 remplace ISO 18001" (wrong) |
| ISO 45001 publication | Mars 2018 | Writing 2015 (confusion with 9001/14001 revision) |
| ISO 45001 participation travailleurs | §5.4 | Vague "le management" without le §5.4 |
| 7 principes du management qualité (ISO 9001) | ISO 9000 (pas 9001 directement) | Listing 8 principes (ISO 9001:2000 had 8; 2015 has 7) |
| Structure HLS | §4–§10 (identique pour 9001/14001/45001) | Writing differing clause numbers |

### ICPE/Seveso

| Fact | Exact Reference | Common Error to Avoid |
|------|----------------|----------------------|
| 3 régimes ICPE ordre | Déclaration → Enregistrement → Autorisation | Inverting order (most dangerous → least) |
| Directive Seveso 3 | 2012/18/UE | Writing Seveso II (96/82/CE) or wrong year |
| Seveso 2 niveaux | Seuil bas (S) et Seuil haut (SH) | Calling them "catégorie 1 et 2" |
| Fondement ICPE | Art. L511-1 Code de l'environnement | Citing Code du travail |

### RNCP41446 (BC01–BC04)

| Fact | Exact Reference |
|------|----------------|
| BC01 | Construire le système de management QSE |
| BC02 | Améliorer le système de management QSE |
| BC03 | Manager les risques QSE |
| BC04 | Accompagner l'organisme dans ses démarches RSE et de développement durable |
| Niveau | Niveau 6 (Bac+3) |
| Expiration | 27-10-2030 |

---

## Common Pitfalls

### Pitfall 1: Shipping items before URL is verified

**What goes wrong:** `source.url` contains a URL that HTTP-200s but serves wrong content (INRS `media.html?refINRS=` redirect, SPA returning 200 with empty title, or a generic catalogue page).

**Why it happens:** Author generates items and URLs together without running the curl check, or trusts that INRS links "work."

**How to avoid:** Run the verification bash snippet from §5 for EVERY `source.url` before committing the batch. Never accumulate unverified items across a batch.

**Warning signs:** URL contains `media.html?refINRS=`, or title is "Fiche Métier", or body is < 10KB.

### Pitfall 2: Wrong article number in item

**What goes wrong:** An item states "L4121-1 impose les 9 principes généraux" (wrong — that's L4121-2). Owner revises a false regulatory fact.

**Why it happens:** L4121-1 and L4121-2 are adjacent and semantically close. Same pattern with R4121-1 vs L4121-3.

**How to avoid:** Keep the Domain Accuracy Anchors table (§8) open during authoring. Cross-check every article citation in `source.ref` before commit.

**Warning signs:** Article number in `answer` differs from article number in `source.ref`.

### Pitfall 3: QCM distractor is obviously wrong

**What goes wrong:** Distractors are too easy to eliminate, making the QCM a poor study tool.

**Why it happens:** Generating "plausible" distractors without knowing real-domain confusions.

**How to avoid:** Per D-12, distractors must be real-domain confusions: neighbouring article number (L4121-1 vs L4121-2), adjacent norm (OHSAS 18001 vs ISO 45001), swapped principle (principle 3 vs 4), acronym false-friend (DUERP vs DUER vs DUER-P).

**Warning signs:** A distractor says something like "éviter le travail" or "ignorer les risques" — obviously wrong, not a real trap.

### Pitfall 4: MétierScope / France compétences SPA not eyeballed

**What goes wrong:** Items in the `metiers` or `rncp` batch pass curl but have URLs that render as "Fiche Métier" only — the owner clicks the link and sees a spinner or empty page.

**Why it happens:** Curl returns 200 + "Fiche Métier" title but the actual content loads via React/Angular after JS execution.

**How to avoid:** Batch F must include an explicit human-verify task. Do not treat curl 200 as sufficient for these domains. Open in browser, confirm content displays, then set `verified` date.

**Warning signs:** Body is ~5KB, title is "Fiche Métier" — this is the SPA skeleton.

### Pitfall 5: ISO norms `source.url` links to paywalled or shop page

**What goes wrong:** `source.url` points to `https://www.boutique.afnor.org/…` or `https://www.iso.org/standard/62085.html` — paywall. Owner clicks and hits a purchase page.

**Why it happens:** Googling ISO 9001 produces the standard purchase page prominently.

**How to avoid:** Per D-06, never link the paywalled standard text. Use a free authoritative summary page. If no suitable free page exists, surface the gap (D-09) rather than linking a paywall.

**Warning signs:** URL contains `boutique.afnor.org`, `iso.org/standard/`, `shop.bsigroup.com`.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| OHSAS 18001 (SST) | ISO 45001:2018 | Published March 2018; transition period ended March 2021 | Items must reference ISO 45001, not OHSAS 18001 (though OHSAS 18001 is worth a distractor in QCMs) |
| ISO 9001:2008 | ISO 9001:2015 | Published Sept 2015 | 7 management principles (was 8 in 2000 version); HLS structure |
| ISO 14001:2004 | ISO 14001:2015 | Published Sept 2015 | HLS alignment; ISO 14001:2026 in preparation |
| Système DSD (ancienne classification chimique) | Règlement CLP (CE) 1272/2008 | Full replacement 1 June 2015 | Pictogrammes SGH, mentions H/P, CAS numbers |
| CHSCT | CSSCT (au sein du CSE) | Loi Rebsamen 2015, effective post-2017 ordonnances Macron | CSE = Comité Social et Économique, remplace CHSCT + DP + CE |

**Deprecated/outdated:**
- **OHSAS 18001:** Withdrawn March 2021 — do not write items as if it is current, but it is valid as a QCM distractor
- **DSD/DPD (Dangerous Substances/Preparations Directive):** Replaced by CLP entirely since 2015
- **CHSCT:** Replaced by CSSCT (sous-commission du CSE) — items about représentation du personnel must use CSE/CSSCT

---

## Open Questions

1. **ISO 9001 / ISO 14001 free authoritative French source**
   - What we know: iso.org returns HTTP 403 to curl; no INRS-specific page for 9001/14001 exists
   - What's unclear: Which free French-language authoritative page covers ISO 9001 clauses sufficiently for a `source.url` that passes BANK-04
   - Recommendation: At execution time of Batch B, search `site:afnor.org ISO 9001 management qualité` and `site:qualiteperformance.org iso 9001` and curl-verify the result before authoring ISO 9001/14001 items

2. **MétierScope SPA rendering in production**
   - What we know: Curl returns ~5KB "Fiche Métier" skeleton; memory file notes that SPA pages "DID render in a real browser during Phase 2 owner-verify" (referring to v1.0 Phase 2/3, not this phase)
   - What's unclear: Whether France Travail MétierScope has a stable hash-based URL that a user following the `source.url` will see rendered
   - Recommendation: During Batch F, test each MétierScope URL in Chrome and Firefox; if rendering is reliable, proceed; if broken, substitute with `https://www.francetravail.fr/employeur/vos-recrutements/le-rome-et-les-fiches-metiers.html` + a static PDF fiche as inline ref

3. **Pourcentages de rémunération en alternance — stability**
   - What we know: The SMIC-based percentages for apprentissage change with CFA agreements and government reforms
   - What's unclear: Whether the service-public.fr values at time of research are the current 2026 values
   - Recommendation: At authoring time of `calendrier` batch, re-fetch `service-public.fr/F2918` and take the current table values; tag with verification date

---

## Environment Availability

This phase is code-free from a tooling standpoint. Required tools:

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `curl` | BANK-04 URL verification | ✓ (bash available) | system | `wget -q -O-` |
| Browser (Chrome/Firefox) | SPA eyeball (`metiers`, `rncp` batches) | ✓ (user's machine) | any modern | — |
| git | Atomic batch commits | ✓ | any | — |
| Text editor / Claude session | Authoring items | ✓ | — | — |

**No missing dependencies with no fallback.**

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `qualiteperformance.org` has a free ISO 9001 page analogous to the 14001 one found in search | §3 iso-9001 | Executor must find alternative free source; delays Batch B |
| A2 | `learnandconnect.pollutec.com` ISO 45001 page is curl-verifiable and stable | §3 iso-45001 | Must find alternative non-INRS source for ISO 45001 |
| A3 | `entreprendre.service-public.gouv.fr/vosdroits/F31704` (apprentissage vs professionnalisation comparison) passes curl with substantive title | §3 calendrier | Minor — two other service-public pages already verified |
| A4 | France compétences RNCP page content (BC01–BC04 text) is actually rendered from server-side HTML (grep found it) rather than a client-loaded SPA | §3 rncp | If SPA-only, the URL must still pass human-eyeball check; content accuracy is unaffected |
| A5 | Rémunération apprentissage percentages on service-public.fr F2918 reflect 2026 current values | §3 calendrier | Items cite outdated figures if percentages changed; executor must re-verify at authoring time |
| A6 | Légifrance article pages (L4121-2, R4121-1) consistently serve article content in curl despite Cloudflare JS present in source | §3 / §5 | If blocked at execution time, Légifrance URLs cannot be used even in `explanation`; use `code.travail.gouv.fr` as fallback for deep-link citations |

---

## Sources

### Primary (HIGH confidence — curl-verified)
- `https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html` — DUERP: CV body 72KB, title match, no soft-404
- `https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html` — 9 PGP: CV body 61KB
- `https://www.inrs.fr/risques/tms-troubles-musculosquelettiques/ce-qu-il-faut-retenir.html` — TMS: CV body 69KB
- `https://www.inrs.fr/risques/routiers/ce-qu-il-faut-retenir.html` — risque routier: CV body 69KB
- `https://www.inrs.fr/risques/chimiques/ce-qu-il-faut-retenir.html` — risque chimique: CV body 80KB
- `https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html` — RPS: CV body 87KB
- `https://www.inrs.fr/risques/espaces-confines/ce-qu-il-faut-retenir.html` — espaces confinés: CV body 66KB
- `https://www.inrs.fr/risques/classification-etiquetage-produits-chimiques/ce-qu-il-faut-retenir.html` — CLP/SGH: CV body 51KB
- `https://www.ameli.fr/entreprise/sante-travail/risques/troubles-musculosquelettiques-tms/pourquoi-comment-agir` — TMS ameli: CV body 94KB
- `https://www.ameli.fr/entreprise/sante-travail/risques/risques-chimiques-entreprise/definition` — risques chimiques ameli: CV body 82KB
- `https://www.service-public.gouv.fr/particuliers/vosdroits/F2918` — contrat apprentissage: CV body 245KB
- `https://www.service-public.gouv.fr/particuliers/vosdroits/F15478` — contrat professionnalisation: CV body 317KB
- `https://entreprendre.service-public.gouv.fr/vosdroits/F33414` — ICPE: CV body 1MB
- `https://aida.ineris.fr/inspection-icpe/risques-accidentels/seveso` — Seveso AIDA: CV body 37KB
- `https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033019913` — Art. L4121-2: CF (Cloudflare JS in source but article content present, body 112KB)
- `https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000023795562` — Art. R4121-1: CF (same pattern, body 110KB)
- `qhse-cesi/outils.html` — integration point confirmed (141 lines, no `<script src="outils-data.js">` present) [VERIFIED: codebase]
- `.planning/V2-ETUDE-SPEC.md` — schema source of truth [VERIFIED: codebase]
- `.planning/phases/02-content-bank/02-CONTEXT.md` — 13 locked decisions D-01..D-13 [VERIFIED: codebase]

### Secondary (MEDIUM confidence — WebFetch / WebSearch verified with official sources)
- INRS WebFetch results: page structure and section headings confirmed for all 8 `ce-qu-il-faut-retenir` pages
- France compétences RNCP41446: BC01–BC04 titles confirmed via WebFetch (SPA status ambiguous)
- Légifrance full text of L4121-2 (9 PGP): confirmed via WebSearch + article content in curl body

### Tertiary (LOW confidence — WebSearch, not curl-tested)
- ISO 9001 free source strategy: candidates identified but not curl-verified
- ISO 14001 free source strategy: same
- `preventionbtp.fr` ISO 45001 page: not curl-tested
- `ecologie.gouv.fr` ICPE page: not curl-tested

---

## Metadata

**Confidence breakdown:**
- Schema and file architecture: HIGH — locked in V2-ETUDE-SPEC.md, confirmed in codebase
- INRS authority URLs (10 themes): HIGH — curl-verified with title + soft-404 check in this session
- service-public.fr URLs (2 themes): HIGH — curl-verified
- ISO 9001/14001 free sources: LOW — iso.org returns 403; alternatives not yet curl-tested
- ISO 45001 INRS source: MEDIUM — `media.html?refINRS=` pattern is flagged as unreliable; static alternative not yet identified
- MétierScope / France compétences SPAs: MEDIUM — content exists but curl-verification is incomplete
- Regulatory accuracy anchors: HIGH — cross-referenced against INRS page content and search results

**Research date:** 2026-05-17
**Valid until:** 2026-08-17 (stable regulatory content; re-verify `calendrier` rémunération percentages at authoring time as these change with government decree)
