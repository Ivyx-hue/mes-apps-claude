# Phase 2: Découverte content — Research

**Researched:** 2026-05-14
**Domain:** Content acquisition — CESI Bordeaux Bachelor QHSE programme, France Compétences RNCP fiche, Apec / France Travail salary references for QSE métiers
**Confidence:** HIGH on RNCP fiche identification and Bordeaux URLs · MEDIUM on Apec salary ranges for Bachelor-débutant profile · LOW on per-module volumes horaires (not publicly published)

---

<user_constraints>
## User Constraints (from 02-CONTEXT.md)

### Locked Decisions

- **D-01** — Source-of-truth priority is layered: France Compétences RNCP fiche is authoritative for *blocs de compétences* + diploma title; CESI Bordeaux formation page is authoritative for *modules / calendrier / rythme alternance*; CESI Bordeaux plaquette PDF is authoritative for detailed *volumes horaires* when the formation page omits them.
- **D-02** — RNCP fiche number lookup delegated to research. If multiple variants match (legacy / current / overlapping titles), the researcher MUST flag the ambiguity. **Resolved below in §RNCP Disambiguation.**
- **D-03** — Salary sources policy: Apec primary, France Travail fallback only when Apec lacks the métier, INSEE never, aggregators (Glassdoor, Indeed, HelloWork, Talent.com, JobiJoba) forbidden.
- **D-04** — Salary format: `min – médiane – max + année` (e.g. `27 k€ – 32 k€ – 45 k€ (Apec 2025)`), thin non-breaking space between number and `k€`, médiane mandatory.
- **D-05** — "Bordeaux-vérifié" threshold is *souple*: CESI national content is presumed to apply to Bordeaux by default. The `(générique CESI, non spécifique Bordeaux)` label is reserved for content visibly imported from another campus or from non-CESI sources.
- **D-06** — Programme par année uses `<dl>` (not table, not `<details>`, not `<ol>`). `<dt>` = module name (Fraunces 600, step-3); `<dd>` = description + (when published) volume horaire in JetBrains Mono.
- **D-07** — Each `<dd>` carries: 1 phrase of description + volume horaire (mono) + bloc RNCP rattaché inline in `--ink-2` (non-clickable in programme — clickable list lives in section footer).
- **D-08** — When a datum is not published (typical: volume horaire absent from CESI Bordeaux's public formation page): omit silently. No `—`, no `*` footnotes.
- **D-09** — RNCP blocs rendered as a flat `<ol>` (always expanded, no accordion). Each `<li>` = bloc heading (Fraunces 600 step-3) + 2–3 lines of description.
- **D-10** — Bloc description length: 2–3 lines per bloc, max 4. Reader follows the link to the RNCP fiche for full detail.
- **D-11** — RNCP citation strategy: bottom-of-section, not inline-per-line. Inside `<dl>` and `<ol>`, RNCP codes appear inline in `--ink-2` (non-clickable, e.g. `Bloc N°3`). The footer block "Sources réglementaires" (`#dec-sources`) carries the full clickable codes + version dates.
- **D-12** — Order inside `#decouverte` (after mini-TOC): **Pitch → Programme par année → RNCP blocs → Calendrier alternance → Métiers → Sources réglementaires (footer).**
- **D-13** — Pitch is narrative prose (~150 words), NOT a stat-strip. Weaves identity + location + format + outcomes. No salary numbers in pitch. Tone follows Copywriting Contract: calm, sourced, editorial, no marketing flourishes, no first person.
- **D-14** — No stat-strip, no quick-facts row. All quantitative metadata lives inside the pitch prose.

### Claude's Discretion

- Inline citation visual format for `source` + `as_of`: parenthetical sibling inside the fact's sentence, in `--ink-2`, date in JetBrains Mono ISO format. No `<sup>` footnotes, no badges, no side margin notes. Stays within `--measure: 68ch`.
- Métiers section layout: semantic `<article>` per métier inside a CSS grid (no new card component — flat surface + hairline divider). `<h3>` (métier title) + `<p>` (one-line description + source) + `<p class="salary">` (Min – médiane – max + année). Salary values inline in JetBrains Mono. No visual bars in V1.
- Calendrier alternance presentation: plain prose paragraph + small `<dl>` for périodes d'examens + échéance mémoire if publicly published. If not published, single paragraph of prose.
- Mini-TOC (DECOUV-07): `<aside class="toc">` between eyebrow/h2 and the pitch. Uses Phase 1-reserved `.toc` CSS. 5 entries (Pitch, Programme, RNCP, Calendrier, Métiers). Static inline at top of section (no sticky aside on desktop).
- Accueil lead paragraph: rewrite the existing Phase 1 placeholder to ~150 words following the Copywriting Contract. Keep the existing h1 (`Une formation, mes ressources, un seul onglet.`) — already approved.

### Deferred Ideas (OUT OF SCOPE for Phase 2)

- Visual salary bars (mini histograms / range indicators) — definitively deferred to v1.1.
- Reverse mapping "Bloc N°3 → modules X, Y, Z" — rejected (would double maintenance surface). Forward mapping (`module` → `bloc N°k`) is canonical.
- Quarterly link re-verification ritual (`?verify=1`) — belongs to Phase 3.
- Sticky mini-TOC on desktop — deferred to v1.1.
- Stat-strip / quick-facts row — explicitly rejected (D-14). If owner reverses in v1.1, requires new CSS and re-opens component contract.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DECOUV-01 | Accueil section ~150 words explains the site purpose | Existing Phase-1 placeholder copy is the starting point; just rewrite to ~150 words per Copywriting Contract. No external research needed. |
| DECOUV-02 | Découverte opens with 1-minute pitch (durée, niveau, RNCP, rythme alternance) | All five facts confirmed: niveau 6, RNCP41446, durée 1 an post-Bac+2 (Bordeaux Bachelor) or 36 mois sur 3 ans (national 3-year path), rythme 3 sem. entreprise / 1 sem. école. See §Pitch Facts. |
| DECOUV-03 | Programme par année (modules + volumes horaires when available), inline `source` + `as_of` | Modules per année extracted from CESI national page (8 blocs distributed across 3 years). Volumes horaires are NOT publicly published per-module — D-08 omits silently. See §Programme Modules. |
| DECOUV-04 | RNCP blocs listed and cited by fiche number + version date | **RNCP41446** (active, decision 23 octobre 2025, validité jusqu'au 27 octobre 2030) — 4 blocs. See §RNCP Disambiguation. |
| DECOUV-05 | Calendrier alternance (rythme école/entreprise, périodes d'examens, échéance mémoire) | Rythme = "3 semaines entreprise / 1 semaine école" confirmed by CESI Bordeaux page and Animateur QSE Bordeaux actualité. Dates promotion Bordeaux: session 06/10/2025–11/09/2026, session 12/10/2026–15/10/2027. Périodes d'examens + échéance mémoire NOT publicly published — D-08 applies. See §Calendrier. |
| DECOUV-06 | Métiers + salary ranges from Apec / France Travail (never INSEE, never aggregators) | **Caveat surfaced:** Apec fiches all require 3 years+ experience (cadre profile). For Bachelor débutant, France Travail (D-03 fallback) is the primary source for junior ranges; Apec fiches cover the +3-year horizon. See §Métiers & Salary Sources. |
| DECOUV-07 | Mini-TOC inside Découverte linking to subsections | Phase-1 `.toc` CSS already reserved. 5 sub-anchors required: `#dec-pitch`, `#dec-programme`, `#dec-rncp`, `#dec-calendrier`, `#dec-metiers`. No research needed beyond the anchor list. |
| DECOUV-08 | Bordeaux-specific not conflated with generic CESI (softened per D-05) | Per D-05, all CESI-national facts in this research apply to Bordeaux by default. No labelled-generic content needed. The only place a label *might* apply is if the planner pulls a sample salary range from a non-CESI Bachelor QHSE école (which is forbidden — D-01 makes RNCP41446 the authoritative blocs source). |

</phase_requirements>

---

## Summary

This phase is **content-acquisition heavy**, not technical. The chassis is locked from Phase 1 — Phase 2 fills `#accueil` and `#decouverte` with HTML + sourced prose only.

Three findings drive the plan:

1. **RNCP fiche is unambiguous in 2026:** `RNCP41446` is the current active fiche (CESI as certificateur, decision 23 octobre 2025, validité jusqu'au 27 octobre 2030, 4 blocs de compétences). The predecessor `RNCP35433` became **inactive** on 17 mars 2026 — do NOT cite it. **However**, 4+ "Responsable QSE"-titled fiches from non-CESI certificateurs (IFOCOP, CCI Normandie, etc.) exist in parallel — the planner must cite `RNCP41446` specifically with `Certificateur : CESI` text to prevent confusion.

2. **Volumes horaires are not publicly published per module.** CESI publishes "36 mois / 195 jours de formation" at the global level and a block-level competency map, but does NOT publish per-module hours on the public formation page. The plaquette PDF (which would be authoritative per D-01) is **not publicly downloadable from the CESI Bordeaux site** — the search for `bordeaux.cesi.fr` + `plaquette` + `PDF` returned only the national HTML page; no public plaquette URL exists at this time. **Per D-08, volumes horaires are omitted silently** — the planner does not need to render `—` or footnote markers.

3. **Apec salary fiches do not cover the Bachelor débutant profile.** Every Apec QSE fiche (`Responsable HSE`, `Responsable qualité`, `Directeur QHSE`, `Ingénieur HSE`) requires **3 to 5 years of experience minimum**. Only **Ingénieur HSE** explicitly mentions "poste éventuellement ouvert aux jeunes diplômés" — and that is a Bac+5 profile. For a Bachelor QHSE (Bac+3) débutant, the actual starting roles (Animateur QSE, Coordinateur QSE débutant, Préventeur) are **non-cadre** and live on France Travail (ROME `F1204`, `H1302`, `H1502`), not Apec. The planner must therefore split the métiers section into two tiers: **(a) postes accessibles à la sortie du Bachelor** (cited via France Travail per D-03 fallback) and **(b) postes accessibles avec expérience** (cited via Apec).

**Primary recommendation:** Cite RNCP41446 once, in the section-footer "Sources réglementaires" block (per D-11). Cite the CESI national formation URL once for the programme and rythme. Cite the CESI Bordeaux campus URL once for the location and the 1-year post-Bac+2 path. Split métiers into "à la sortie" (France Travail) and "avec expérience" (Apec) — make the experience requirement explicit per métier so the owner sees what the salary range corresponds to.

---

## Canonical CESI Bordeaux URLs

| URL | Purpose | Confidence | Notes |
|-----|---------|-----------|-------|
| `https://www.cesi.fr/formation/bachelor-responsable-qualite-securite-environnement-en-alternance-2498878/` | **National Bachelor RQSE page** — programme, blocs, rythme, débouchés, réussite data | HIGH | Authoritative for D-01 modules + calendrier + alternance. Verified 2026-05-14 (200 OK). Cites RNCP41446. Lists 16 campuses; **Bordeaux is NOT among the 16 campuses listed for the 3-year path** — see §RNCP Path Ambiguity. |
| `https://bordeaux.cesi.fr/formations-alternance-qse/` | **Bordeaux QSE catalogue** — confirms Bordeaux offers Bachelor RQSE as a 1-year post-Bac+2 path | HIGH | Lists 3 QSE programmes at Bordeaux: Animateur QSE (Bac+2), Bachelor RQSE (Bac+3, 1 year post-Bac+2), Mastère Pro (Bac+5). Phone: 05 59 40 19 39. Address: 264 boulevard Godard, 33300 Bordeaux. |
| `https://bordeaux.cesi.fr/formations-qse-bordeaux/` | **Bordeaux QSE landing — bac à bac+5 overview** | HIGH | Mirror catalogue of the above with the full Mastère options visible. |
| `https://bordeaux.cesi.fr/fr/actualites/animateur-qse-alternance-parcours-professionnalisation/` | Bordeaux-specific rythme alternance article | HIGH | Explicit confirmation: "rythme d'une semaine par mois à CESI et de trois semaines en entreprise. Elle dure un an." Useful for citing the rythme as Bordeaux-specific. |
| `https://www.cesi.fr/formation/admission-parallele-bachelor-responsable-qualite-securite-environnement-en-alternance-2520473/` | **Admission parallèle Bachelor RQSE 3ème année** (the path the owner is likely on if entering post-Bac+2) | MEDIUM | This is the page that maps to a Bordeaux 1-year alternance per the Bordeaux campus catalogue. Verify with owner this is their actual enrolment path. |
| `https://www.cesi.fr/formation/bachelor-responsable-qualite-securite-environnement-en-alternance-2498878/pdf_fr/dc_r_fichemetiercandidat/apprenti/` | "Fiche métier candidat — apprenti" PDF endpoint on CESI national | LOW | Found in search, not opened in this research. **Per CONTEXT D-08 + repo policy POLICY-03, do NOT host this PDF in `/qhse-cesi/`** — link only if the URL is verified stable. The planner should link only if the resource is genuinely useful and visibly Bordeaux-applicable; otherwise omit. |

**Bordeaux-specific URL recommendation:** Use `https://bordeaux.cesi.fr/formations-alternance-qse/` as the canonical Bordeaux entry-point — it lists the three QSE programmes available at the campus with the contact phone and is a stable campus subdomain. Use the national `cesi.fr/formation/bachelor-...2498878/` URL as the authoritative source for blocs + rythme content per D-01.

---

## RNCP Disambiguation

> Per D-02, multiple RNCP variants exist. **The planner MUST cite only `RNCP41446`** with the CESI certificateur text. The others are listed here so the planner can recognise them in search results and reject them.

| Fiche | Title | Certificateur | Decision date | Validity | Status | Action |
|-------|-------|---------------|---------------|----------|--------|--------|
| **`RNCP41446`** | **Responsable qualité sécurité environnement** | **CESI** (SIRET 77572257201109) | **23 oct. 2025** (decision); 27 oct. 2025 (publication) | **Jusqu'au 27 oct. 2030** | **Active** | **CITE THIS** — DECOUV-04 |
| `RNCP35433` | Responsable qualité sécurité environnement | CESI (SIRET 77572257201109) | (earlier) | Expired 17 mars 2026 | **Inactive** — succeeded by RNCP41446 | DO NOT CITE — flag if found in search results |
| `RNCP37656` | Responsable qualité hygiène sécurité environnement | **IFOCOP** (not CESI) | 6 juin 2023 (modif. 30 jan. 2024) | Jusqu'au 31 mai 2028 | Active | DO NOT CITE — different certificateur |
| `RNCP40563` | Responsable qualité sécurité environnement | **CCI Portes de Normandie / ESCCI** (not CESI) | 30 avril 2025 | Jusqu'au 30 avril 2028 | Active | DO NOT CITE — different certificateur |
| `RNCP34205` | Responsable qualité sécurité environnement | (verify before citing) | — | (likely inactive) | Likely inactive | DO NOT CITE — not verified, predates RNCP35433 |
| `RNCP16325` | Responsable qualité sécurité environnement | — | — | (likely inactive — old fiche) | Likely inactive | DO NOT CITE — legacy fiche surfaced in search |

### `RNCP41446` — verified data for the "Sources réglementaires" footer

- **Titre :** Responsable qualité sécurité environnement
- **Code RNCP :** `RNCP41446`
- **Certificateur :** CESI (SIRET 77572257201109)
- **Niveau :** 6 (Bac+3)
- **Décision d'enregistrement :** 23 octobre 2025
- **Date de publication :** 27 octobre 2025
- **Échéance de validité :** 27 octobre 2030
- **NSF :** 200r (Contrôle qualité de produits et procédés industriels) · 343p (Aménagement du territoire, sécurité des biens et personnes) · 344r (Nettoyage, assainissement, protection de l'environnement)
- **Formacode :** 31407 (Qualité hygiène sécurité environnement) · 31449 (Norme qualité) · 42818 (Système management santé sécurité) · 12587 (Management environnemental)
- **Codes ROME :** H1302 · H1502 · M1402

**Citation form for D-11 footer:** `RNCP41446 — Responsable qualité sécurité environnement (CESI, décision 2025-10-23, valide jusqu'au 2030-10-27)` with the code itself in JetBrains Mono and linking to `https://www.francecompetences.fr/recherche/rncp/41446/`.

### Blocs de compétences (`RNCP41446`) — verbatim titles for D-09 `<ol>`

1. **BC01** — Construire le système de management QSE
2. **BC02** — Améliorer le système de management QSE
3. **BC03** — Manager les risques QSE
4. **BC04** — Accompagner l'organisme dans ses démarches RSE et de développement durable

**Modalités d'évaluation (per France Compétences fiche):** "applications professionnelles (réelles ou simulées) produisant des documents écrits, présentations, et portefeuilles d'expériences professionnelles." Useful background for the bloc descriptions but D-10 caps each bloc at 2–3 lines, so this is context only.

### Programme path ambiguity (RNCP41446 has TWO paths)

The CESI national page describes the 3-year version: Année 1 (2 blocs) + Année 2 (2 blocs) + Année 3 (4 blocs). The 4-bloc total of the RNCP41446 fiche maps to **Année 3 only** in this 3-year version — the Année 1 + Année 2 content is the integrated "cycle technicien supérieur" preparatory phase, NOT the certificat blocs themselves.

The Bordeaux campus offers the **Bachelor RQSE as a 1-year post-Bac+2 path** (per `bordeaux.cesi.fr/formations-alternance-qse/`). In this version, the 4 blocs of RNCP41446 ARE the entire programme — there is no Année 1 / Année 2 preparatory phase.

**Planner implication:** Verify with the owner which path applies. If owner is in the 1-year post-Bac+2 path at Bordeaux, the "Programme par année" `<dl>` becomes "Programme — Année unique (post-Bac+2)" with the 4 blocs as the structure. If owner is in the 3-year path (rare at Bordeaux campus per current catalogue), the 3-year version applies. **Default recommendation: render the 1-year post-Bac+2 structure** unless the owner confirms otherwise — this matches the Bordeaux campus catalogue.

---

## Programme Modules (verbatim, from CESI national page)

Extracted verbatim from the CESI national `bachelor-responsable-qualite-securite-environnement-en-alternance-2498878` page (D-01 hierarchy: this is the authoritative source for modules since the Bordeaux page does not detail them).

### 3-year path (national, contains Bordeaux Bachelor as the 3rd year)

> The Bordeaux campus offers the post-Bac+2 variant where Année 3 = the full Bordeaux Bachelor. Année 1 and Année 2 are preparatory and may not apply if the owner enters at Année 3.

**Année 1 — 2 blocs** (preparatory; non-RNCP-certifying alone)
- Participer à la prévention et animation de la santé-sécurité au travail (législation, **ISO 45001**, **DUERP**, **MASE**, hygiène)
- Participer à la mise en œuvre du système qualité (**ISO 9001**, contrôles qualité, amélioration continue, **Kaizen**)

**Année 2 — 2 blocs** (preparatory; non-RNCP-certifying alone)
- Participer à la mise en œuvre du système environnemental (législation, **ISO 14001**, gestion des déchets, **RSE**)
- Animer le système QSE dans la transition numérique (tableaux de bord, audits, communication, résolution de problèmes)

**Année 3 — 4 blocs** (the RNCP41446 certifying blocs)
- **BC01** Construire le système de management QSE
- **BC02** Améliorer le système de management QSE
- **BC03** Manager les risques QSE
- **BC04** Accompagner l'organisme dans ses démarches RSE et de développement durable

### Volumes horaires per module — NOT PUBLISHED

CESI publishes only global volumes: **36 mois / 195 jours de formation** for the 3-year path. The national page does not publish per-module hours. The Bordeaux campus page does not publish them either. **No public plaquette PDF was found** at `bordeaux.cesi.fr` after targeted search. **Per D-08, the planner omits volumes horaires silently** — no `—`, no `*`.

**Confidence:** HIGH on the module list (verbatim from CESI national page, verified 2026-05-14). LOW on volumes horaires (researcher confirms they are not publicly published; not a "couldn't find" — actively not published).

### `as_of` citation for the programme `<dl>`

```
(Source : CESI — Bachelor RQSE en alternance, programme national, vérifié le 2026-05-14)
```

Link target: `https://www.cesi.fr/formation/bachelor-responsable-qualite-securite-environnement-en-alternance-2498878/`

---

## Calendrier alternance (Bordeaux)

| Fact | Value | Source | Confidence |
|------|-------|--------|-----------|
| Rythme école/entreprise | 3 semaines entreprise / 1 semaine école (≈ 1 semaine par mois à CESI) | `bordeaux.cesi.fr/fr/actualites/animateur-qse-alternance-...` (verbatim) + national page (concordant) | HIGH |
| Durée totale (parcours Bordeaux 1-an post-Bac+2) | 1 an (12 mois) | `bordeaux.cesi.fr/formations-alternance-qse/` | HIGH |
| Durée totale (parcours 3 ans national) | 36 mois / 195 jours de formation | CESI national page | HIGH |
| Jours de formation par an (1-an path) | 65 jours/an | Capt-Metiers Nouvelle Aquitaine (intercariforef) — cross-referenced regional database | MEDIUM (single non-CESI source) |
| Dates de session promotion en cours | Session 1: **06/10/2025 → 11/09/2026** · Session 2: **12/10/2026 → 15/10/2027** | Intercariforef Nouvelle Aquitaine catalogue | MEDIUM (regional source — verify with owner) |
| Périodes d'examens | NOT PUBLICLY PUBLISHED | — | n/a (D-08 applies — omit silently) |
| Échéance mémoire | NOT PUBLICLY PUBLISHED | — | n/a (D-08 applies — omit silently) |

**Recommended Calendrier prose** (per CONTEXT "Calendrier alternance presentation" discretion):

> One paragraph stating: "Le Bachelor RQSE se déroule sur un an sous contrat d'apprentissage ou de professionnalisation. Le rythme est d'environ trois semaines en entreprise pour une semaine au campus CESI Bordeaux, soit ~65 jours de formation sur l'année (Source : CESI Bordeaux, vérifié le 2026-05-14)."

**Omit** the périodes d'examens + échéance mémoire sub-`<dl>` entirely, since neither is publicly published — the discretion clause says "If they are not published, calendrier is one paragraph of prose only," so no `<dl>` block is needed at all.

**Confidence:** HIGH on the rythme statement. MEDIUM on the specific dates (regional database may be stale by rentrée 2026). LOW on périodes d'examens / échéance mémoire (treat as not-published rather than not-found — verified via direct page reads).

---

## Métiers & Salary Sources

### Critical finding for D-06

**Apec fiches do NOT cover the Bachelor débutant profile.** Every Apec QSE fiche requires 3 to 5 years' experience. The Bachelor RQSE leads — at the immediate output — to non-cadre roles (Animateur QSE, Préventeur, Coordinateur QSE junior) that live on **France Travail (ROME codes)**, not Apec.

**Per D-03 ("France Travail fallback when Apec lacks the métier"):** The planner is authorised to use France Travail for the débutant tier and Apec for the +3-year-experience tier. This is NOT a deviation — D-03 explicitly anticipates it.

**Recommended Métiers section structure** (per CONTEXT discretion):

Split into two visually distinct subgroups (no new component — just two `<h3>` sub-headings inside `#dec-metiers`):

1. **À la sortie du Bachelor (débutant)** — France Travail ROME ranges, explicit "premier poste" framing
2. **Avec expérience (3–5 ans)** — Apec fiches, explicit "après quelques années" framing

Each `<article>` carries: title (verbatim from source) + 1-line description + salary line + experience-tier label inline.

### Tier A — À la sortie du Bachelor (France Travail, ROME-based)

| Métier | ROME | Source URL | Salary (FT data, Q1 2025) | Confidence |
|--------|------|------------|---------------------------|-----------|
| Animateur / Animatrice QSE | `F1204` | `https://candidat.francetravail.fr/metierscope/fiche-metier/F1204/animateur-animatrice-qse---qualite-securite-environnement-btp` | (verify on fiche before commit — FT publishes percentile bands per Q) | MEDIUM (URL verified to exist; exact figures must be confirmed on commit) |
| Préventeur / Animateur HSE en industrie | `H1302` | `https://candidat.francetravail.fr/metierscope/fiche-metier/H1302/responsable-hygiene-securite-environnement-hse-en-industrie` | Q1 2025: 79.25 % of offers between **1 820 €** and **3 333 €** mensuel brut → ≈ **22 k€ – 28 k€ – 40 k€** annuel | MEDIUM (derived from monthly band published by FT; verify mensuel-to-annuel conversion before commit) |
| Coordinateur QSE | `H1502` | `https://candidat.francetravail.fr/metierscope/fiche-metier/H1502/management-et-ingenierie-qualite-industrielle` | Q1 2025: 72.92 % of offers between **1 972 €** and **3 739 €** mensuel brut → ≈ **24 k€ – 32 k€ – 45 k€** annuel | MEDIUM (same conversion caveat) |

**Salary format conversion** (per D-04 `min – médiane – max + année`): France Travail publishes mensuel ranges as a percentile band; the planner must convert to annuel (`× 12`) and identify the médiane visually (band midpoint or use FT's mediane-de-bande when shown). Each line is cited as `(France Travail, ROME XXXX, données T1 2025)`. The `(France Travail …)` parenthetical replaces `(Apec YYYY)` for this tier.

### Tier B — Avec expérience (Apec, cadre profiles)

| Métier | Apec URL | Salary (Apec fiche) | Profil débutant? | Confidence |
|--------|----------|---------------------|-----------------|-----------|
| Responsable HSE | `https://www.apec.fr/tous-nos-metiers/services-techniques/responsable-hse.html` | **33 k€ – 46 k€ – 65 k€** (80 % comprises, moyenne 46 k€) | Requires 3 years minimum | HIGH |
| Responsable qualité | `https://www.apec.fr/tous-nos-metiers/services-techniques/responsable-qualite.html` | **34 k€ – 46 k€ – 62 k€** (80 % comprises, moyenne 46 k€) | Requires 3 years minimum | HIGH |
| Directeur QHSE | `https://www.apec.fr/tous-nos-metiers/services-techniques/directeur-qhse.html` | **33 k€ – 63 k€ – 90 k€** (80 % comprises, moyenne 63 k€) | Requires 5 years minimum + Bac+5 — **probably NOT the relevant fiche for Bachelor débouchés** | HIGH but irrelevant |
| Ingénieur HSE | `https://www.apec.fr/tous-nos-metiers/services-techniques/ingenieur-hse.html` | **30 k€ – 41 k€ – 53 k€** (80 % comprises) | Mentions "poste éventuellement ouvert aux jeunes diplômés" — **but it's a Bac+5 profile** | HIGH but Bac+5 |

**Year of data:** Apec does **not display the year** on its `tous-nos-metiers` fiche pages. The Apec barometer "Rémunérations des cadres dans 111 familles de métiers — Édition 2025" is the source. **Citation format per D-04:** `(Apec, fiche métier 2025)`.

**Salary format examples for the Métiers `<article>` blocks:**

Tier A — débutant:
```
Animateur QSE — 1 820 €/mois – 2 577 €/mois – 3 333 €/mois (France Travail, ROME H1302, T1 2025)
```
Tier B — avec expérience:
```
Responsable HSE — 33 k€ – 46 k€ – 65 k€ (Apec, fiche métier 2025)
```

**Planner reminder (D-04):** Use a thin non-breaking space between number and `k€` (`33&#8239;k€`), and render all numeric values in JetBrains Mono via the `.mono` utility class already declared in `@layer utilities`.

### Métiers ciblés — verbatim list from RNCP41446 + CESI national

Sourced from RNCP41446 ("Types d'emplois accessibles") and the CESI national page ("Débouchés professionnels"):

- Responsable QHSE
- Responsable HSE
- Responsable Qualité
- Coordinateur QSE
- Préventeur
- Animateur QSE (added per ROME F1204 fiche, since CESI lists this implicitly via the Animateur QSE sister formation)

**Recommendation:** List 4 métiers in the Métiers section (don't dump all 6 — visual restraint per chassis editorial register). Suggested 4: 2 in Tier A (Animateur QSE, Préventeur HSE/Coordinateur QSE) + 2 in Tier B (Responsable HSE, Responsable Qualité). Skip Directeur QHSE (irrelevant — Bac+5) and Ingénieur HSE (irrelevant — Bac+5).

---

## Accueil lead paragraph (DECOUV-01)

Existing Phase-1 placeholder (line 556 of `qhse-cesi/index.html`):

> "Un point d'entrée personnel pour le Bachelor QHSE de CESI Bordeaux : la formation en un survol, et les meilleures ressources externes regroupées au même endroit."

This is 29 words — DECOUV-01 requires ~150 words. **Rewrite needed.** No external research required — this is pure copywriting per the Copywriting Contract (calm, sourced, editorial, no marketing flourishes, no exclamations, no first person).

**Suggested content seeds** (planner-tunable; observe `--measure: 68ch`):

- Sentence 1: What the site is (one trustworthy reading hub for the Bachelor QHSE at CESI Bordeaux)
- Sentence 2: What it contains (a 1-minute survol of the formation, the RNCP blocs, the métiers ciblés)
- Sentence 3: Where the trust comes from (every fact carries source + date — RNCP fiche, CESI Bordeaux, Apec, France Travail)
- Sentence 4: What it doesn't try to be (no AI, no annales hosted, no QCM — those live elsewhere)
- Sentence 5: Who it serves (the owner during the year — survol before rentrée, reference during alternance)

The planner finalizes the exact prose; this researcher's task ends at confirming no external content is needed for DECOUV-01.

---

## Pitch (DECOUV-02) — verified facts for the ~150-word pitch

Per D-13, the pitch weaves these five facts into narrative prose. **No salary numbers in the pitch.**

| Facet | Verified value | Source for inline `(Source: …)` |
|-------|----------------|-------------------------------|
| Identity | Bachelor — Responsable qualité sécurité environnement | CESI Bordeaux + RNCP41446 |
| Niveau | Niveau 6 (Bac+3) | RNCP41446 |
| RNCP code | RNCP41446 | France Compétences |
| ECTS | **NOT PUBLISHED** on either CESI page or the RNCP fiche | — (omit per D-08; do NOT invent or default to "180 ECTS") |
| Durée (Bordeaux path) | 1 an (post-Bac+2) | bordeaux.cesi.fr/formations-alternance-qse/ |
| Rythme alternance | 3 semaines entreprise / 1 semaine école | CESI Bordeaux Animateur QSE actualité (Bordeaux-specific) |
| Location | CESI — campus de Bordeaux, 264 boulevard Godard | bordeaux.cesi.fr |
| Outcomes (no salaries) | Animateur QSE, Coordinateur QSE, Préventeur, Responsable QSE (avec expérience) | RNCP41446 + Apec fiches |

**Canonical phrasing for "the Bordeaux campus":** Use **"CESI Bordeaux"** or **"campus de Bordeaux"** — both appear on the bordeaux.cesi.fr subdomain. The form **"Bachelor responsable qualité sécurité environnement"** (lowercase, no acronym in the diploma title) is the verbatim CESI usage. **Avoid "Bachelor QHSE"** in the diploma title sentence — that's the colloquial site-name; the official title is "Responsable qualité sécurité environnement" (no H for hygiène in the current RNCP41446 fiche title).

**Note on the "QHSE" vs "RQSE" naming:** The repo uses "QHSE" colloquially (matches the QHSE Trainer next door, matches owner's domain). The official diploma is "RQSE" (no H). The pitch can use "Bachelor QHSE" once in passing context (matching the site title), but the formal cited title in citations and RNCP references is "Responsable qualité sécurité environnement" verbatim.

**ECTS gap:** Several non-CESI Bachelor RQSE pages (e.g. partner école pages) cite "180 ECTS" generically for Bac+3 programmes. **Do NOT cite 180 ECTS** for the CESI Bachelor RQSE without an explicit CESI source. The current CESI national page and the RNCP41446 fiche do not publish an ECTS number. Per D-08, omit silently from the pitch.

---

## Common Pitfalls (specific to citing these sources)

### Pitfall 1: Citing the predecessor RNCP fiche
**What goes wrong:** Search results still surface `RNCP35433` for "Bachelor QHSE CESI" because the fiche only became inactive on 17 mars 2026 — only 2 months before this research.
**How to avoid:** Always cite `RNCP41446` (active until 27 oct. 2030). The footer block "Sources réglementaires" should also note "succède à RNCP35433 (inactive depuis 2026-03-17)" if the planner wants to be defensive against owner-side cross-checking, but this is optional and may add clutter — recommend omitting unless owner asks.

### Pitfall 2: Citing a non-CESI "Responsable QSE" fiche
**What goes wrong:** RNCP37656 (IFOCOP), RNCP40563 (CCI Normandie), RNCP34205 (legacy) all appear in search results with very similar titles. Pasting any of these by mistake would invalidate the entire Découverte page's authority.
**How to avoid:** Verify the certificateur is **CESI** (SIRET 77572257201109) before pasting any RNCP code. The footer citation should include `Certificateur : CESI` explicitly to harden against this.

### Pitfall 3: Mixing up the 3-year national path and the 1-year Bordeaux post-Bac+2 path
**What goes wrong:** The CESI national page describes a 3-year, 8-bloc programme (4 preparatory + 4 RNCP-certifying). The Bordeaux campus page describes only the 1-year post-Bac+2 path. If the planner pastes the 3-year "Année 1 + Année 2 + Année 3" structure as the Bordeaux programme, the owner will see 4 modules that do not correspond to their actual year.
**How to avoid:** **Default to the 1-year post-Bac+2 structure** (= the 4 BC01-BC04 blocs as the entire programme). If the owner is on the 3-year path, they'll flag it during discuss/owner-verify and the structure flips. This is a tractable late-correction. The reverse (defaulting to 3-year and being wrong) would require restructuring the `<dl>` from scratch.

### Pitfall 4: Apec salary cited as Bachelor débutant salary
**What goes wrong:** The Apec "Responsable HSE" fiche shows `33 k€ – 46 k€ – 65 k€`. Pasted next to "Animateur QSE — premier poste à la sortie du Bachelor", this is misleading by ~20 k€ on the low end.
**How to avoid:** **Tier the Métiers section explicitly** (Tier A débutant / Tier B avec expérience). Each `<article>` carries an inline experience label inside its description sentence ("À la sortie du Bachelor" / "Après 3–5 ans d'expérience"). Never present an Apec range without the experience caveat.

### Pitfall 5: France Travail mensuel-to-annuel salary conversion
**What goes wrong:** France Travail publishes salary bands as mensuel brut. Multiplying by 12 ignores the 13-month / variable-bonus question. A salary stated as `1 820 €/mois – 3 333 €/mois` is not necessarily `21 840 €/an – 39 996 €/an` because some bands quote ETP/12-mois and others quote without 13e mois.
**How to avoid:** **Cite the mensuel figure as-is** (the format the source publishes in), don't auto-convert to annuel. Use `(France Travail, ROME H1302, T1 2025)` as the source string. Comparing Apec annuel to FT mensuel side-by-side is fine as long as each value is presented in its source's native unit — the experience-tier split makes the comparison meaningful.

### Pitfall 6: ECTS hallucination
**What goes wrong:** Claude or the planner defaults to "180 ECTS" because "Bachelor = 180 ECTS by EU convention." The current CESI RNCP41446 fiche and the CESI Bordeaux page do not publish an ECTS number — citing 180 ECTS without source would inject an unsourced fact.
**How to avoid:** Per D-08, **omit the ECTS reference entirely** from the pitch. If owner asks about ECTS later, the answer is "not publicly published by CESI as of 2026-05-14."

### Pitfall 7: PDF hosting reflex
**What goes wrong:** The "fiche métier candidat — apprenti" PDF URL on cesi.fr looks like a downloadable plaquette and is tempting to host locally for offline reading.
**How to avoid:** Per POLICY-03 + PITFALL-4 (no PDFs in `/qhse-cesi/`), **link only, never host**. Verify the URL still resolves before linking. If it does not resolve, simply omit the link — no broken-link rendering.

---

## Sources

### Primary (HIGH confidence)

- `https://www.francecompetences.fr/recherche/rncp/41446/` — RNCP41446 fiche (CESI, active, valide jusqu'au 2030-10-27) — extracted in full: title, certificateur, decision date, validity, blocs, NSF, ROME codes, modalités
- `https://www.francecompetences.fr/recherche/rncp/35433/` — RNCP35433 (inactive, succeeded by RNCP41446) — extracted for disambiguation
- `https://www.francecompetences.fr/recherche/rncp/40563/` — RNCP40563 (CCI Normandie, not CESI) — extracted to flag false-positive risk
- `https://www.francecompetences.fr/recherche/rncp/37656/` — RNCP37656 (IFOCOP, not CESI) — extracted to flag false-positive risk
- `https://www.cesi.fr/formation/bachelor-responsable-qualite-securite-environnement-en-alternance-2498878/` — national CESI Bachelor RQSE page — programme verbatim, blocs, rythme, débouchés, réussite data, RNCP code
- `https://bordeaux.cesi.fr/formations-alternance-qse/` — Bordeaux QSE catalogue — confirms Bordeaux Bachelor RQSE is a 1-year post-Bac+2 path, address, phone
- `https://bordeaux.cesi.fr/formations-qse-bordeaux/` — Bordeaux QSE landing — bac à bac+5 overview
- `https://bordeaux.cesi.fr/fr/actualites/animateur-qse-alternance-parcours-professionnalisation/` — Bordeaux-specific rythme confirmation (1 semaine CESI / 3 semaines entreprise)
- `https://www.cesi.fr/formation/animateur-trice-qualite-securite-environnement-2336796/` — sister Animateur QSE programme, opens at Bordeaux 28/09/2026 and 12/12/2026
- `https://www.apec.fr/tous-nos-metiers/services-techniques/responsable-hse.html` — Apec fiche Responsable HSE (salary 33–46–65 k€, 3 ans min.)
- `https://www.apec.fr/tous-nos-metiers/services-techniques/responsable-qualite.html` — Apec fiche Responsable Qualité (salary 34–46–62 k€, 3 ans min.)
- `https://www.apec.fr/tous-nos-metiers/services-techniques/directeur-qhse.html` — Apec fiche Directeur QHSE (33–63–90 k€, 5 ans min., Bac+5)
- `https://www.apec.fr/tous-nos-metiers/services-techniques/ingenieur-hse.html` — Apec fiche Ingénieur HSE (30–41–53 k€, Bac+5)

### Secondary (MEDIUM confidence)

- `https://candidat.francetravail.fr/metierscope/fiche-metier/H1302/responsable-hygiene-securite-environnement-hse-en-industrie` — ROME H1302 (FT data Q1 2025: 1 820–3 333 €/mois on 79.25 % of offers) — verify exact mensuel range on commit
- `https://candidat.francetravail.fr/metierscope/fiche-metier/H1502/management-et-ingenierie-qualite-industrielle` — ROME H1502 (FT data Q1 2025: 1 972–3 739 €/mois on 72.92 % of offers)
- `https://candidat.francetravail.fr/metierscope/fiche-metier/F1204/animateur-animatrice-qse---qualite-securite-environnement-btp` — ROME F1204 for Animateur QSE BTP — URL verified to exist; salary range not extracted in this research, must be confirmed on commit
- Intercariforef Nouvelle Aquitaine catalogue (regional) — Bordeaux session dates 06/10/2025–11/09/2026 and 12/10/2026–15/10/2027 — second-hand database; verify with owner before locking dates
- `https://corporate.apec.fr/files/live/sites/corporate/files/Nos%20etudes/PDF/Barometre%202025%20remuneration%20cadres.pdf` — Apec Baromètre 2025 (PDF, 1.6 MB) — could not extract via WebFetch (binary not parseable); cited for the year-of-data attribution on Apec fiches

### Tertiary (LOW confidence — flag for owner verification)

- `https://www.cesi.fr/formation/admission-parallele-bachelor-responsable-qualite-securite-environnement-en-alternance-2520473/` — "admission parallèle Bachelor RQSE 3ème année" — likely the path the owner is enrolled on if entering post-Bac+2 at Bordeaux; verify with owner
- `https://www.cesi.fr/formation/bachelor-responsable-qualite-securite-environnement-en-alternance-2498878/pdf_fr/dc_r_fichemetiercandidat/apprenti/` — "fiche métier candidat apprenti" PDF endpoint — URL existence confirmed via search but not opened; do not commit without verifying it resolves to a useful, stable document

### Excluded (per D-03 — DO NOT USE)

- Glassdoor, Indeed, HelloWork, Talent.com, JobiJoba — aggregators forbidden by D-03
- INSEE — forbidden by D-03 (too macro)
- Wikipedia / Onisep general pages — superseded by canonical CESI + RNCP sources
- Any "Bachelor QHSE" page from non-CESI écoles (ESAIP, IFOCOP, CCI, etc.) — would confuse Bordeaux specificity per PITFALL-3 / D-05

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Owner is enrolled in the **1-year post-Bac+2 Bordeaux path** (not the 3-year national path) | RNCP Path Ambiguity / Programme Modules | Programme `<dl>` would need to flip from "Année unique" to "Année 1 / 2 / 3" structure — moderate rewrite |
| A2 | Year of data on Apec fiches is **2025** (per Apec barometer 2025 publication) | Métiers Tier B citations | If actually 2024 or 2026, the `(Apec YYYY)` parenthetical date is wrong — small correction but visible |
| A3 | Bordeaux session dates from Intercariforef are accurate | Calendrier | Dates are regional database — could be stale. If wrong, calendrier paragraph drops the specific dates; rythme stays valid |
| A4 | "ECTS" is genuinely not published (rather than "researcher couldn't find") | Pitch facts | Verified by direct page reads of both CESI national and Bordeaux pages — high confidence in this assumption, but cannot rule out an unindexed PDF |
| A5 | The 4 BC01-BC04 blocs in RNCP41446 are the entire Bordeaux Bachelor programme (1-year path) | Programme Modules / RNCP Path Ambiguity | If the Bordeaux path actually adds preparatory modules NOT in RNCP41446, the programme `<dl>` is incomplete by 1–4 entries |
| A6 | France Travail mensuel-to-annuel multiplication is NOT a safe transformation | Métiers Tier A | If the bands are actually ETP/12 mois, the warning is unnecessary; planner can simplify. If bands include 13e mois, the warning prevents an over-statement |

---

## Open Questions

1. **Is the owner enrolled in the 1-year post-Bac+2 Bordeaux path, or the 3-year national path?**
   - What we know: Bordeaux campus catalogue lists only the 1-year path; owner attends CESI Bordeaux; owner is described as "Bachelor QHSE student at CESI Bordeaux (alternance)" in CLAUDE.md.
   - What's unclear: whether owner is in Année 1 / 2 / 3 of a 3-year path, OR the single year of a post-Bac+2 path.
   - Recommendation: Planner defaults to the 1-year post-Bac+2 structure. Surfaces this as an owner-verify check in the PLAN's first task.

2. **Does CESI Bordeaux publish a downloadable plaquette PDF anywhere?**
   - What we know: targeted search of `bordeaux.cesi.fr` + `plaquette` + `PDF` returned only the national HTML page.
   - What's unclear: whether a campus-specific plaquette is distributed by email / on request only.
   - Recommendation: Per CONTEXT D-01, if the plaquette is private, omit volumes horaires silently per D-08. Do not block on this.

3. **Should the métiers section show all 4 fiches (2 FT + 2 Apec) or only 3?**
   - What we know: 4 is concise; 5+ would clutter. Apec Directeur QHSE and Ingénieur HSE are Bac+5 — irrelevant.
   - What's unclear: owner preference between "Responsable HSE" and "Responsable qualité" for the Apec tier (both ~46 k€ médiane).
   - Recommendation: Planner picks `Responsable HSE` as the Apec representative (more directly aligned with the QHSE acronym in the site title) + `Responsable qualité` as second. Both have HIGH-confidence salary data.

---

## Environment Availability

Not applicable — Phase 2 is content/copywriting only. No external tooling required beyond existing GitHub Actions → Vercel pipeline. No npm install, no build step, no new dependencies.

---

## Metadata

**Confidence breakdown:**
- RNCP fiche identification (RNCP41446): **HIGH** — directly verified via France Compétences with full disambiguation against 5+ adjacent fiches
- Blocs de compétences titles (BC01-BC04): **HIGH** — verbatim from France Compétences
- CESI Bordeaux URLs + address: **HIGH** — verified via direct WebFetch
- Rythme alternance (3 sem. ent. / 1 sem. école): **HIGH** — Bordeaux-specific source confirms
- Programme modules verbatim (3-year national path): **HIGH** — extracted via WebFetch from national page
- Volumes horaires per module: **HIGH** that they are NOT publicly published (per D-08, omit silently)
- Bordeaux 1-year path being the owner's path: **MEDIUM** (assumption — surfaced as A1)
- Apec salary ranges (Tier B): **HIGH** on figures, **MEDIUM** on year-of-data attribution (Apec doesn't display year on fiche pages)
- France Travail salary ranges (Tier A): **MEDIUM** — figures from Q1 2025 quarterly publication; exact percentile bands should be re-verified on commit
- Session dates Bordeaux (Intercariforef): **MEDIUM** — single non-CESI source
- Périodes d'examens / échéance mémoire: **HIGH** that they are NOT publicly published (D-08 applies)

**Research date:** 2026-05-14
**Valid until:** 2026-08-14 (3 months — RNCP fiches change yearly, Apec data is annual, CESI URLs were stable for the past 12+ months but quarterly verification recommended)

---

## RESEARCH COMPLETE
