# Phase 2: Découverte content - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-14
**Phase:** 02-d-couverte-content
**Areas discussed:** Stratégie de sourcing & vérification ; Structure programme par année + RNCP blocs

---

## Stratégie de sourcing & vérification

### Q1 — Quelle URL est la source-of-truth pour les faits Bordeaux-spécifiques ?

| Option | Description | Selected |
|--------|-------------|----------|
| Combinaison priorisée | RNCP = blocs/intitulé · CESI Bordeaux = modules/calendrier/alternance · plaquette PDF = volumes horaires | ✓ |
| Page formation CESI Bordeaux uniquement | Une URL stable mais marketing, peu de chiffres précis | |
| Fiche France Compétences + une URL CESI | RNCP = squelette, CESI = chair, sans plaquette PDF | |
| Owner fournit les URLs avant qu'on continue | — | |

**User's choice:** Combinaison priorisée (Recommandé)
**Notes:** Chaque fait pointe vers sa source primaire, pas une source-de-section globale.

### Q2 — RNCP fiche identifier (owner connaît / researcher trouve / titre seulement) ?

| Option | Description | Selected |
|--------|-------------|----------|
| Owner donne le numéro maintenant | Numéro RNCP + version date fournis directement | |
| Researcher le trouve | gsd-phase-researcher cherche la fiche correspondante, lève un flag si ambiguïté | ✓ |
| Owner donne l'intitulé exact, pas le numéro | Researcher fait le mapping intitulé → numéro | |

**User's choice:** Researcher le trouve (Recommandé)
**Notes:** Le researcher doit flagger si plusieurs variantes RNCP matchent (legacy/current/overlapping titles).

### Q3a — Politique fourchettes salariales métiers : sources acceptées ?

| Option | Description | Selected |
|--------|-------------|----------|
| Apec en priorité, France Travail fallback | Apec = cadres jeunes diplômés (bon match), FT en gap-fill, INSEE jamais, aucun agrégateur | ✓ |
| Les 3 sources (Apec + FT + INSEE) avec contexte | Plus rigoureux mais plus lourd visuellement | |
| Apec uniquement, métiers sans Apec retirés | 100 % une seule source — liste plus courte | |

**User's choice:** Apec en priorité, France Travail fallback (Recommandé)
**Notes:** INSEE never used (too macro). Glassdoor / Indeed / HelloWork / Talent.com / JobiJoba forbidden.

### Q3b — Format de la fourchette salariale affichée

| Option | Description | Selected |
|--------|-------------|----------|
| Min – médiane – max + année | Ex : "27 k€ – 32 k€ – 45 k€ (Apec 2025)" — 3 chiffres + année visible | ✓ |
| Min – max seulement | Plus court mais perd la médiane | |
| Médiane seule | Évite l'illusion de précision, mais moins informatif | |

**User's choice:** Min – médiane – max + année (Recommandé)
**Notes:** Thin non-breaking space entre le nombre et `k€`. Année rend le vieillissement visible.

### Q4 — Seuil "Bordeaux-vérifié" vs "générique CESI"

| Option | Description | Selected |
|--------|-------------|----------|
| Strict (la source mentionne explicitement Bordeaux) | Tout fait non Bordeaux-nommé → label "(générique CESI, non spécifique Bordeaux)" | |
| Souple (CESI national vaut Bordeaux par défaut) | Label appliqué seulement aux contenus visiblement d'un autre campus | ✓ |
| Strict par défaut, exception RNCP | Strict partout sauf blocs RNCP (nationaux par construction) | |

**User's choice:** Souple : CESI national vaut Bordeaux par défaut
**Notes:** Softening délibéré de DECOUV-08. Le strict force un label sur quasi-tout, ce qui dévalue le label là où il compte vraiment.

---

## Structure programme par année + RNCP blocs

### Q5 — Format HTML pour le programme par année

| Option | Description | Selected |
|--------|-------------|----------|
| `<dl>` module → description courte | Layout coulée, mobile-friendly, --measure 68ch respecté, bon pour 8-15 modules/an | ✓ |
| `<table>` 3 colonnes module/heures/bloc | Scanable mais overflow mobile <360px | |
| `<ol>` imbriqué hiérarchique | Simple mais perd l'espace pour descriptions | |
| `<details>` par année + `<ul>` dedans | Économise scroll mais cache info — va contre "survoler en 1 scroll" | |

**User's choice:** `<dl>` module → description courte (Recommandé)
**Notes:** Compromis lisibilité/structure.

### Q6 — Profondeur du programme : qu'est-ce qui figure dans chaque `<dd>` ?

| Option | Description | Selected |
|--------|-------------|----------|
| Nom + 1 phrase + heures (si dispo) | Compromis classique | |
| Nom + 1 phrase + heures + bloc RNCP rattaché | Traçabilité maximale module→référentiel | ✓ |
| Nom seul | Trop pauvre pour le survol | |
| Nom + 1 phrase ; heures et blocs en section séparée | Double lecture, chaque vue épurée | |

**User's choice:** Nom + 1 phrase + heures + bloc RNCP rattaché
**Notes:** Le bloc RNCP en suffixe inline (`Bloc N°3` en `--ink-2` non-cliquable) — la liste cliquable des fiches vit en footer de section.

### Q7a — Présentation des blocs de compétences RNCP

| Option | Description | Selected |
|--------|-------------|----------|
| Liste plate `<ol>` numéroté toujours dépliée | Survol direct, bon pour 4-5 blocs | ✓ |
| `<details>` accordion par bloc | Économise scroll mais ajoute friction — contraire à l'objectif Phase 2 | |
| Cards 2-col desktop / 1-col mobile via container-query | Plus visuel mais ajoute composant non prévu Phase 1 | |

**User's choice:** Liste plate `<ol>` numéroté + description (Recommandé)

### Q7b — Format de citation du code RNCP

| Option | Description | Selected |
|--------|-------------|----------|
| Inline mono + lien direct | Le numéro en mono brass cliquable, version date en --ink-2 | |
| Footer de section avec liste complète | Codes inline `--ink-2` non-cliquables, bloc "Sources réglementaires" en bas | ✓ |
| Badge mono autonome à côté du titre | Très visible mais nouveau composant CSS | |

**User's choice:** Footer de section avec liste complète des fiches
**Notes:** Deux endroits à maintenir (inline `--ink-2` + footer cliquable) — le compromis accepté pour garder un flow de lecture propre.

### Q8 — Donnée non publiée : comment afficher (ex: volume horaire absent) ?

| Option | Description | Selected |
|--------|-------------|----------|
| Omettre silencieusement | Le module reste listé, le volume horaire n'apparaît pas | ✓ |
| Tiret cadratin explicite | `—` en --ink-3 — plus honnête mais bruyant | |
| Note de bas de programme | `*` renvoyé en bas — épuré mais note à maintenir | |

**User's choice:** Omettre silencieusement (Recommandé)
**Notes:** CESI publie rarement les heures par module publiquement ; le `—` polluerait quasi toutes les lignes.

### Q9 — Ordre des sous-sections à l'intérieur de `#decouverte`

| Option | Description | Selected |
|--------|-------------|----------|
| Pitch → Programme → RNCP → Calendrier → Métiers | Survol narratif naturel | ✓ |
| Pitch → Programme → Calendrier → RNCP → Métiers | Calendrier remonte avant RNCP — "quotidien" tôt | |
| Pitch → Métiers → Programme → RNCP → Calendrier | "À quoi ça mène" tôt — atypique | |

**User's choice:** Pitch → Programme → RNCP → Calendrier → Métiers (Recommandé)

### Q10 — Longueur des descriptions de bloc RNCP

| Option | Description | Selected |
|--------|-------------|----------|
| Court : titre + 2-3 lignes | Survol rapide, fiche RNCP en footer pour qui veut tout | ✓ |
| Moyen : titre + 4-6 lignes + sous-liste compétences | Plus dense, plus utile pour réviser | |
| Long : titre + ~10 lignes + sous-liste | Quasi-recopie de la fiche — trahit "hub = pointeur" | |

**User's choice:** Court — titre + 2-3 lignes (Recommandé)

### Q11 — Stat-strip "niveau 6 / Bac+3 / 180 ECTS / 24 mois / rythme"

| Option | Description | Selected |
|--------|-------------|----------|
| Oui, `<dl>` horizontal compact sous le pitch | Métadonnées scanables en un coup d'œil | |
| Non, les faits sont dans la prose du pitch | Plus narratif, plus humain | ✓ |
| Oui mais en fin de section, pas en tête | Pitch pur narratif, récap factuel en fin | |

**User's choice:** Non, ces faits sont dans la prose du pitch
**Notes:** Évite d'introduire un composant non prévu Phase 1 (component contract = 6 components only).

### Q12 — Composition du pitch (~150 mots)

| Option | Description | Selected |
|--------|-------------|----------|
| Identité + chiffres + débouchés (Recommandé) | Ph1 ce que c'est ; Ph2 comment ; Ph3 pour quoi — sourcé, neutre | ✓ |
| Histoire personnelle + identité + chiffres | Ph1 perso ; mais le contrat éditorial dit "calme, jamais marketing" et #accueil est déjà en première personne | |
| Identité + chiffres + spécificités pédagogiques CESI | Pas de métiers ; à la place, ce que CESI Bx fait différemment — risque marketing | |

**User's choice:** Identité + chiffres-clés + débouchés (Recommandé)
**Notes:** Pas de salaires dans le pitch (ils vivent dans la section Métiers). Pas de première personne (la première personne est dans `#accueil`).

---

## Claude's Discretion

Areas the owner explicitly declined to discuss — Claude (planner + executor) decides:

- Inline citation visual format (`source` + `as_of` rendering)
- Métiers section layout (semantic `<article>` per métier — no card component)
- Calendrier alternance rendering (paragraph + small `<dl>` for dates if published)
- Mini-TOC placement (static at top of `#decouverte`, not sticky aside)
- Accueil lead paragraph copy (~150 words, follows Copywriting Contract)

## Deferred Ideas

- Visual salary bars — deferred to v1.1 (research previously flagged as P2)
- Reverse mapping "Bloc → modules" — rejected; forward mapping in programme is canonical
- `?verify=1` link-checker dev tool — belongs to Phase 3 (Biblio has more outbound links)
- Sticky mini-TOC on desktop — deferred to v1.1 pending real reading-session feedback
- Stat-strip / quick-facts row — rejected (D-14); revisit only with new component-contract decision
