# LEGAL.md — QHSE CESI Hub

**Dernière mise à jour :** 2026-05-15

## Nature du site

Ce site (`https://mes-apps-claude.vercel.app/qhse-cesi/`) est un **outil personnel de curation de liens** créé par un étudiant de la formation Bachelor QHSE à CESI Bordeaux pour son propre usage pédagogique. Il **n'est pas une publication commerciale**, **n'est pas un hébergeur de contenu**, et **n'a pas vocation à être un service public**.

L'objectif est de regrouper, en un seul endroit, les références indispensables à la formation : programme officiel, blocs de compétences RNCP, ressources pédagogiques curées, retours d'expérience et outils professionnels.

## Politique de non-hébergement des PDF

**Aucun fichier `.pdf` n'est hébergé sous `/qhse-cesi/`.** Toutes les ressources référencées renvoient à la page source qui les héberge. Cette règle est vérifiable techniquement :

```bash
git ls-files 'qhse-cesi/*.pdf'   # → empty
```

Si une ressource est disponible uniquement en PDF, le lien pointe vers la page éditoriale qui propose ce PDF, jamais vers le fichier directement.

## Exception pédagogique française (CPI Article L122-5, 3°, e)

Lorsqu'une description de carte cite brièvement un extrait d'une ressource liée, cette citation s'appuie sur l'**exception pédagogique** prévue à l'article **L122-5, 3°, e du Code de la propriété intellectuelle** :

> « […] la représentation ou la reproduction d'extraits d'œuvres […] à des fins exclusives d'illustration dans le cadre de l'enseignement et de la recherche […] est autorisée. »

Les conditions strictes sont respectées :

- la finalité est **pédagogique et non commerciale** (étude personnelle de la formation Bachelor QHSE),
- les extraits sont **courts** (descriptions ≤ 120 caractères par carte),
- la **source est citée** sur chaque carte (titre + URL d'origine + domaine + date de vérification),
- aucun extrait n'est diffusé en dehors du contexte de l'enseignement personnel.

## Propriété intellectuelle des ressources liées

Tout contenu accessible **via** les liens reste la **propriété de ses ayants droit respectifs** (INRS, France Compétences, CESI, Légifrance, AFNOR, Apec, France Travail, Reddit, LinkedIn, YouTube, et autres). Ce site ne revendique aucun droit sur ces contenus.

Les **titres et descriptions** affichés sur les cartes sont rédigés par le propriétaire du site et constituent un travail de curation éditoriale.

## Demande de retrait

Tout titulaire de droits qui souhaiterait le retrait d'un lien peut le demander via les **GitHub Issues** du dépôt source :

[`https://github.com/Ivyx-hue/mes-apps-claude/issues`](https://github.com/Ivyx-hue/mes-apps-claude/issues)

Une réponse est apportée sous 30 jours.

## Code source

Le code source du site est public sur GitHub : [`https://github.com/Ivyx-hue/mes-apps-claude`](https://github.com/Ivyx-hue/mes-apps-claude). Il est diffusé tel quel, à titre d'exercice personnel.

## Données personnelles

Ce site **ne collecte aucune donnée personnelle** :

- aucun cookie de suivi,
- aucun outil d'analyse (Google Analytics, Plausible, etc.),
- aucun formulaire,
- aucun compte utilisateur,
- aucun appel à un backend.

Seul l'éventuel `localStorage` du navigateur peut stocker des préférences locales liées à V2 (non actif en V1).

---

*LEGAL.md — POLICY-01 satisfied. Maintenu manuellement à chaque modification matérielle du site.*
