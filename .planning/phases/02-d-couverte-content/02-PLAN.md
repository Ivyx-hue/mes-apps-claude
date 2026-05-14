---
phase: 02-d-couverte-content
plan: 01
type: execute
wave: 1
mode: mvp
depends_on: [01-skeleton-chassis-visual-identity]
files_modified:
  - qhse-cesi/index.html
autonomous: false   # contains a checkpoint:human-action (owner-gate for personal dates) + a final checkpoint:human-verify
requirements:
  - DECOUV-01
  - DECOUV-02
  - DECOUV-03
  - DECOUV-04
  - DECOUV-05
  - DECOUV-06
  - DECOUV-07
  - DECOUV-08
tags:
  - content
  - copywriting
  - qhse
  - rncp
  - alternance
user_setup: []     # no external service onboarding — pure content + HTML

must_haves:
  truths:
    - "Owner can read the Accueil lead paragraph (~150 words) and answer 'what is this site, who is it for, what's inside' in under 30 s without scrolling further."
    - "Owner can read the Découverte pitch and learn durée, niveau, RNCP, rythme alternance in ~1 minute of reading, with no salary numbers in the pitch."
    - "Owner can click each mini-TOC entry (Pitch / Programme / RNCP blocs / Calendrier / Métiers) and land on the correct subsection, with the heading visible below the sticky header (scroll-margin-top: var(--header-h) is in force)."
    - "Owner sees the 4 RNCP41446 blocs (BC01-BC04) listed verbatim, with the fiche cited at the bottom of the section by code + decision date + validity date, linked to francecompetences.fr."
    - "Owner sees the alternance rythme '3 semaines entreprise / 1 semaine école' rendered as prose, cited from CESI Bordeaux, with owner-confirmed session dates from their personal contract."
    - "Owner sees 4-6 métiers in two visually distinct experience tiers (débutant via France Travail / expérimenté via Apec), each with min - médiane - max salary + source + année."
    - "Every factual claim in Découverte carries an inline parenthetical citation (Source : ... vérifié le YYYY-MM-DD)."
    - "Anything visibly imported from a non-CESI source or from another CESI campus is labelled (générique CESI, non spécifique Bordeaux); CESI-national content applies to Bordeaux by default per D-05."
  artifacts:
    - path: "qhse-cesi/index.html"
      provides: "Filled #accueil lead + complete #decouverte section (mini-TOC + pitch + programme + RNCP blocs + calendrier + métiers + sources réglementaires footer); updated <time> in footer"
      contains: "id=\"dec-pitch\", id=\"dec-programme\", id=\"dec-rncp\", id=\"dec-calendrier\", id=\"dec-metiers\", id=\"dec-sources\", RNCP41446, BC01, BC02, BC03, BC04"
  key_links:
    - from: "qhse-cesi/index.html mini-TOC links"
      to: "h3 sub-anchors inside #decouverte"
      via: "in-section href=\"#dec-*\" anchors"
      pattern: "href=\"#dec-(pitch|programme|rncp|calendrier|metiers)\""
    - from: "Sources réglementaires footer block"
      to: "francecompetences.fr fiche RNCP41446"
      via: "<a href=\"https://www.francecompetences.fr/recherche/rncp/41446/\" target=\"_blank\" rel=\"noopener noreferrer\">"
      pattern: "francecompetences\\.fr/recherche/rncp/41446"
    - from: "Programme + Pitch citation parentheticals"
      to: "cesi.fr national Bachelor RQSE page + bordeaux.cesi.fr campus catalogue"
      via: "inline (Source : ..., vérifié le 2026-05-14) parentheticals"
      pattern: "Source\\s*:.+v[ée]rifi[ée]\\s+le\\s+2026-"
---

<objective>
Fill the empty `#accueil` lead and the empty `#decouverte` body inside the existing `qhse-cesi/index.html`, in a single file, with hand-written French semantic prose. Every factual claim carries an inline `source` + `as_of` citation. The Phase 1 chassis (tokens, components, accent reservation, copywriting contract) is locked — Phase 2 ships HTML content + a deploy + an owner-verification pass, nothing else.

**Mode:** MVP (vertical slice — content acquisition → drafting → render → deploy → owner verify).

**Phase Goal (user story):**

**As a** Bachelor QHSE student arriving at the QHSE CESI Hub for the first time,
**I want to** read a calm, sourced, ~1-minute survol of my formation (identity, programme, RNCP blocs, alternance rythme, métiers cibles),
**so that** I have one trustworthy place that answers "what is this formation and where does it lead" before the rentrée and during the alternance year — without ever wondering whether a number is sourced or invented.

Purpose: Move the Hub from "owner-approved empty shell" → "owner-approved reading hub for the formation". The Découverte section IS the value proposition for Phase 2.

Output: A single commit (split logically into 2-3 commits is acceptable, see Task 7) that updates `qhse-cesi/index.html` only, deploys via the existing GitHub Actions pipeline to `https://mes-apps-claude.vercel.app/qhse-cesi/`, and passes the owner-verification checklist on phone + desktop.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@CLAUDE.md
@.planning/PROJECT.md
@.planning/REQUIREMENTS.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/02-d-couverte-content/02-CONTEXT.md
@.planning/phases/02-d-couverte-content/02-RESEARCH.md
@.planning/phases/01-skeleton-chassis-visual-identity/01-UI-SPEC.md
@.planning/phases/01-skeleton-chassis-visual-identity/01-SUMMARY.md
@qhse-cesi/index.html

<interfaces>
<!-- Reserved CSS classes from Phase 1 that Phase 2 must REUSE, not re-define -->
<!-- All declared in @layer components inside qhse-cesi/index.html; styles cascade for free. -->

Reserved classes / patterns Phase 2 consumes (do NOT redeclare, do NOT add new components):

- `<p class="eyebrow">` — section eyebrow (already in #accueil + #decouverte; do not add more)
- `<p class="lead">` — `--step-2` 17–18 px lead paragraph type role. Use ONCE in #accueil and ONCE as the opening paragraph of the pitch (#dec-pitch).
- `<p class="placeholder">` — REMOVE every occurrence in #accueil and #decouverte.
- `<aside class="toc">` — mini-TOC reserved CSS already shipped in @layer components (Phase 1). Hand-write the `<aside class="toc">` markup; styles cascade for free.
- `.mono` utility class — JetBrains Mono via `class="mono"` (declared in @layer utilities). Use on RNCP codes, ISO numbers, ISO dates, salary numbers.
- `--measure: 68ch` — automatic reading-measure rule on `p`, `li`, `blockquote`, `dd` (declared in @layer base). Inherited for free.
- `--ink-2` colour — muted secondary text. Use inline `style="color: var(--ink-2)"` ONLY on the inline RNCP-bloc reference inside `<dd>` (per D-07) and on parenthetical citations. NO new utility class.
- `--accent` colour — RESERVED (per UI-SPEC §Color §Accent reserved-for list). Phase 2 MUST NOT introduce a new accent surface. Allowed only on: inline `<a>` (automatic), active nav (automatic), `<h2>::after` (automatic). Do NOT colour any new element with `--accent`.
- `<h3>` — Fraunces 600, `--step-3`. Sub-section headings inside #decouverte. Each h3 carries `id="dec-*"` AND `scroll-margin-top: var(--header-h)` (apply inline `style="scroll-margin-top: var(--header-h)"` per Phase 1 belt-and-suspenders contract).
- Footer `<time datetime="YYYY-MM-DD">DD mois YYYY</time>` — update at last commit to `2026-05-14` (today's date when the deploy lands).

Reserved IDs that the mini-TOC anchors point to (h3 children of #decouverte):
- `#dec-pitch`     — Pitch (~150-word narrative paragraph)
- `#dec-programme` — Programme par année (1-year post-Bac+2 Bordeaux variant; `<dl>` of 4 BC blocs as the entire programme)
- `#dec-rncp`      — Blocs de compétences (flat `<ol>` of BC01..BC04 with 2-3 lines each)
- `#dec-calendrier`— Calendrier alternance (single prose paragraph; rythme cited from CESI Bordeaux, dates owner-confirmed)
- `#dec-metiers`   — Métiers (4 articles: 2 Tier-A débutant via France Travail + 2 Tier-B avec expérience via Apec)
- `#dec-sources`   — Sources réglementaires (section footer block; full RNCP41446 citation + clickable codes)

Banned patterns Phase 2 MUST NOT introduce (Phase 1 contracts forbid these):
- `<table>` for programme  (D-06 forbids, `<dl>` only)
- `<details>` / `<summary>` for RNCP blocs (D-09 forbids, flat `<ol>` only)
- `<sup>` footnotes for citations (UI-SPEC Discretion forbids, parenthetical only)
- new `.card` / `.stat-strip` / `.timeline` / any new component class (Phase 1 component contract caps at 6)
- `#000` background OR `oklch(0%...)` anywhere (UI-SPEC §Color floor is `oklch(15%...)`)
- Emoji in headings, exclamation marks, marketing flourishes ("Découvrez", "Explorez", "Plongez"), first-person voice ("je", "nous", "mon")
- `style="color: var(--accent)"` on any new element — accent is reserved
- Hosting PDFs locally (POLICY-03)
- inline `onclick=` (Phase 1 §Registry Safety)
- citing `RNCP35433` (inactive since 2026-03-17), `RNCP37656` (IFOCOP), `RNCP40563` (CCI), `RNCP34205` / `RNCP16325` (legacy)
- citing "180 ECTS" without a CESI source (PITFALL-6 — not publicly published)
- citing INSEE / Glassdoor / Indeed / HelloWork / Talent.com / JobiJoba for salaries (D-03 forbidden list)
</interfaces>
</context>

<phase_goal>

## Phase Goal

**As a** Bachelor QHSE student arriving at the QHSE CESI Hub for the first time, **I want to** read a calm, sourced, ~1-minute survol of my formation (identity, programme, RNCP blocs, alternance rythme, métiers cibles), **so that** I have one trustworthy place that answers "what is this formation and where does it lead" before the rentrée and during the alternance year — without ever wondering whether a number is sourced or invented.

</phase_goal>

<definition_of_done>

## Definition of Done — DECOUV-01..08 traceability

Each requirement maps to a verifiable check. All checks must pass before owner-verify (Task 8) can be signalled.

| Req | What it requires | Verification gate (automated where possible) |
|-----|------------------|----------------------------------------------|
| **DECOUV-01** | Accueil section ~150 words explains the site purpose | `grep -A 50 'id="accueil"' qhse-cesi/index.html \| sed -n '/lead/,/<\/p>/p' \| wc -w` returns ≥ 130 and ≤ 170. Manual: owner reads in < 30 s and can summarise. |
| **DECOUV-02** | Découverte opens with 1-minute pitch (durée, niveau, RNCP, rythme alternance) | `grep -n 'id="dec-pitch"' qhse-cesi/index.html` matches AND `grep -A 30 'id="dec-pitch"'` contains all four of: `niveau 6`, `RNCP41446`, `1 an` (or `un an` / `post-Bac+2`), `3 semaines`. No `k€` inside pitch (no salary numbers per D-13). |
| **DECOUV-03** | Programme par année (1-year Bordeaux variant; `<dl>` of modules); each fact has source + as_of | `grep -n '<dl' qhse-cesi/index.html` returns ≥ 1 match inside #decouverte. `grep -E 'Source\s*:.+v[ée]rifi[ée]\s+le\s+2026-' qhse-cesi/index.html \| wc -l` ≥ 4 (pitch + programme + rythme + métiers at minimum). |
| **DECOUV-04** | RNCP blocs cited by fiche number + version date | `grep -c 'RNCP41446' qhse-cesi/index.html` ≥ 1 AND `grep -c '2025-10-23' qhse-cesi/index.html` ≥ 1 (decision date) AND `grep -c '2030-10-27' qhse-cesi/index.html` ≥ 1 (validity date). `grep -c 'RNCP35433\|RNCP37656\|RNCP40563\|RNCP34205\|RNCP16325' qhse-cesi/index.html` MUST equal 0 (no forbidden fiches). |
| **DECOUV-05** | Calendrier alternance rendered (rythme + owner-confirmed dates) | `grep -A 15 'id="dec-calendrier"' qhse-cesi/index.html` contains `3 semaines` AND `1 semaine`. Owner-confirmed personal-contract dates appear inline OR are silently omitted with citation `(Source : contrat d'alternance personnel, vérifié le 2026-05-14)` if owner provided them at Task 6 gate. |
| **DECOUV-06** | Métiers with salary ranges (min/médiane/max) cited from Apec / France Travail / INSEE (never aggregators) | `grep -c 'Apec' qhse-cesi/index.html` ≥ 1 AND `grep -c 'France Travail' qhse-cesi/index.html` ≥ 1 AND `grep -c 'k€\|€/mois' qhse-cesi/index.html` ≥ 4 (one salary line per métier). `grep -c 'Glassdoor\|Indeed\|HelloWork\|Talent.com\|JobiJoba\|INSEE' qhse-cesi/index.html` MUST equal 0. |
| **DECOUV-07** | Mini-TOC inside Découverte linking to subsections | `grep -n '<aside class="toc"' qhse-cesi/index.html` matches AND the aside contains 5 `<a href="#dec-...">` entries (Pitch, Programme, RNCP blocs, Calendrier, Métiers). Each anchor target exists as an `id="dec-*"` element. |
| **DECOUV-08** | Generic-CESI labelling (softened per D-05) | The label `(générique CESI, non spécifique Bordeaux)` appears ONLY on content visibly imported from another campus or non-CESI source. Default expectation: 0 occurrences in V1 (all sourced content is either CESI national or CESI Bordeaux, both Bordeaux-applicable per D-05). Verification: `grep -c 'générique CESI' qhse-cesi/index.html` — value is informational, not gated. |

**Aggregate gates** (must all pass before Task 8):

- `wc -l qhse-cesi/index.html` returns < 1000 (no runaway content).
- `grep -c 'class="placeholder"' qhse-cesi/index.html` equals **0** (every Phase 1 placeholder removed).
- `grep -c 'target="_blank" rel="noopener noreferrer"' qhse-cesi/index.html` ≥ 5 (every external link safe).
- `grep -cE 'oklch\(\s*0%' qhse-cesi/index.html` equals **0** (no pure-black surface).
- `grep -c 'style="color:\s*var(--accent)' qhse-cesi/index.html` equals **0** (no new accent surface).
- Footer `<time datetime="...">` matches today's deploy date.
- Lighthouse Accessibility score on live URL ≥ 95 (matches Phase 1 floor).
- axe DevTools on live URL: zero critical issues.

</definition_of_done>

<tasks>

<task type="auto">
  <name>Task 1: Draft Accueil lead + Découverte pitch (copy only, no HTML)</name>
  <files>(working-memory only — output captured inside the executor's response; no file write yet)</files>
  <action>
**Goal:** produce two finished French prose blocks that pass the Copywriting Contract before any HTML is written. Defer rendering to Task 2; defer all other sub-sections to Tasks 3-6.

**Step 1 — Accueil lead (DECOUV-01):** Write a single `<p class="lead">` of **130-170 French words** that replaces the existing Phase 1 placeholder (line 556 of `qhse-cesi/index.html`, currently 29 words). Source seeds from `.planning/phases/02-d-couverte-content/02-RESEARCH.md §Accueil lead paragraph (DECOUV-01)`:

  - Sentence 1: what the site IS (one trustworthy reading hub for the Bachelor QHSE at CESI Bordeaux).
  - Sentence 2: what it contains (the formation in a 1-minute survol, then a curated biblio).
  - Sentence 3: where the trust comes from (every fact carries source + as_of date — RNCP41446 fiche, CESI Bordeaux, Apec, France Travail).
  - Sentence 4: what it does not try to be (no AI chatbot, no PDF hosting, no QCM — those live elsewhere).
  - Sentence 5: who it serves (the owner during the year — survol before rentrée, reference during alternance).

  No exclamations. No first person ("je", "nous", "mon"). No marketing flourishes ("Découvrez", "Explorez", "Plongez", "Plateforme"). Sentence case. Stays inside `--measure: 68ch`. The existing h1 (`Une formation, mes ressources, un seul onglet.`) is owner-approved from Phase 1 — do not touch.

**Step 2 — Découverte pitch (DECOUV-02 / D-13):** Write a single `<p class="lead">` of **~150 words** (130-170) that opens the `#decouverte` section as `#dec-pitch`. Source the verified facts from `02-RESEARCH.md §Pitch (DECOUV-02)` table. Mandatory facts that the pitch MUST weave in:

  - Identity: Bachelor "Responsable qualité sécurité environnement" (official verbatim title) — colloquially "Bachelor QHSE" allowed once for site-name continuity (the H in QHSE is the colloquial form; the official RNCP41446 title omits the H, see PITFALL §QHSE-vs-RQSE).
  - Niveau: niveau 6 (Bac+3).
  - RNCP: `RNCP41446`. Render `RNCP41446` inside `<span class="mono">…</span>` or `<code>…</code>`.
  - Durée (Bordeaux path): 1 an, post-Bac+2 (admission parallèle 3ème année). NOT 3 ans.
  - Rythme: 3 semaines en entreprise / 1 semaine à CESI Bordeaux.
  - Location: campus CESI Bordeaux.
  - Outcomes mention (no numbers): Animateur QSE, Coordinateur QSE, Préventeur en sortie immédiate; Responsable QSE / Responsable HSE après quelques années d'expérience.

**Forbidden inside the pitch** (PITFALL-6 + D-13):
  - **NO ECTS reference.** CESI does not publish an ECTS number on RNCP41446 or on the Bordeaux page. Default "180 ECTS" is unsourced — do not write it.
  - **NO salary numbers** (those live in Métiers per D-13).
  - **NO stat-strip / quick-facts row** — narrative prose only (D-14).
  - **NO `(générique CESI, non spécifique Bordeaux)` label** — every pitch fact is either CESI Bordeaux or CESI national (Bordeaux-applicable by default per D-05).

**Step 3 — Inline citations** for the pitch (D-11 says RNCP code itself is non-clickable in the pitch; the clickable form lives in `#dec-sources`). Use ONE parenthetical sibling per claim group, in `--ink-2`, date in JetBrains Mono ISO format. Example structure (planner-suggested; executor may rephrase as long as content is preserved):

```
... Le Bachelor RQSE de CESI Bordeaux conduit au titre niveau 6
"Responsable qualité sécurité environnement" enregistré au RNCP sous le code
<span class="mono">RNCP41446</span> (Source : France Compétences, vérifié le
<span class="mono">2026-05-14</span>). Au campus de Bordeaux, il se déroule
sur un an en alternance, en admission parallèle après un Bac+2, avec un
rythme de trois semaines en entreprise pour une semaine au campus (Source :
CESI Bordeaux, vérifié le <span class="mono">2026-05-14</span>). ...
```

The pitch should carry **2 to 3 inline citation parentheticals** maximum — too many breaks the reading rhythm. Group claims by source.

**Step 4 — Validate against Copywriting Contract** (UI-SPEC §Copywriting Contract). Self-check:
  - 0 exclamation marks
  - 0 first-person pronouns
  - 0 banned verbs (Découvrez, Explorez, Plongez, Maîtrisez, Apprenez)
  - 0 ALL-CAPS strings (except inline RNCP code in mono)
  - 0 emoji
  - Sentence case for any inline emphasis

**Output of Task 1:** Two finished prose blocks (Accueil lead + Découverte pitch) printed in the executor's response, ready to paste into HTML in Task 2. Do NOT edit `qhse-cesi/index.html` yet.
  </action>
  <verify>
    <automated>
      # Self-validation BEFORE Task 2 (no file written yet — count words in the executor's response):
      # Accueil lead: 130-170 words. Pitch: 130-170 words.
      # Required tokens present in pitch: niveau 6, RNCP41446, 1 an (or "un an"), 3 semaines, Bordeaux
      # Forbidden tokens absent in pitch: ECTS, k€, €/mois, INSEE, Glassdoor
      # Forbidden patterns absent in both: "!", "Découvrez", "Explorez", "Plongez", "je ", "nous ", "mon "
      echo "Self-validation only — no file changes yet."
    </automated>
  </verify>
  <done>
    Two French prose blocks (Accueil lead, Découverte pitch) drafted, each 130-170 words, every required fact present, every forbidden pattern absent, every citation parenthetical paired with a verified source from `02-RESEARCH.md`. Ready to paste in Task 2.
  </done>
</task>

<task type="auto">
  <name>Task 2: Render Accueil lead, Découverte pitch, and mini-TOC scaffolding into qhse-cesi/index.html</name>
  <files>qhse-cesi/index.html</files>
  <action>
**Step 1 — Replace the Accueil placeholder** (line 556, current text `Un point d'entrée personnel pour le Bachelor QHSE de CESI Bordeaux : la formation en un survol, et les meilleures ressources externes regroupées au même endroit.`):

Replace the single `<p class="lead">…</p>` with the Task-1 Accueil lead (130-170 words). Keep `class="lead"` exactly — Phase 1 ships `--step-2` lead-paragraph type via this class. The h1 above stays untouched.

**Step 2 — Replace the Découverte placeholder** (line 562, current text `<p class="placeholder">En cours de constitution — première publication prévue Phase 2.</p>`):

Delete the entire `<p class="placeholder">…</p>` line.

In its place, insert (in this exact source order — matches D-12):

```html
<aside class="toc" aria-label="Sommaire de la section Découverte">
  <ul>
    <li><a href="#dec-pitch">Le pitch en 1 minute</a></li>
    <li><a href="#dec-programme">Programme</a></li>
    <li><a href="#dec-rncp">Blocs de compétences RNCP</a></li>
    <li><a href="#dec-calendrier">Calendrier alternance</a></li>
    <li><a href="#dec-metiers">Métiers et débouchés</a></li>
  </ul>
</aside>

<h3 id="dec-pitch" style="scroll-margin-top: var(--header-h)">Le pitch en 1 minute</h3>
<p class="lead">[paste Task-1 Découverte pitch here, with inline (Source : ..., vérifié le 2026-05-14) parentheticals and <span class="mono"> on RNCP code]</p>

<!-- Tasks 3, 4, 5, 6 will append the remaining sub-sections here, in this order:
     #dec-programme  → Task 3
     #dec-rncp       → Task 4
     #dec-calendrier → Task 5
     #dec-metiers    → Task 6
     #dec-sources    → Task 4 (footer block) -->
```

The `<aside class="toc">` reuses the Phase-1-reserved `.toc` styles (declared in `@layer components`) — do NOT add any new CSS. The Phase 1 UI-SPEC §Component 6 ships the styles for free.

`scroll-margin-top: var(--header-h)` is applied inline to each `<h3>` per UI-SPEC §Layout Grid §Section scroll-offset (belt-and-suspenders for iOS Safari quirks — already declared on `<section>` in `@layer base`, repeated on `<h3>` to be safe).

**Step 3 — Verify no chrome damage:** before saving, the file must still contain (these are Phase 1 invariants):

  - `<section id="accueil" aria-labelledby="h-accueil">` ... `</section>` (intact)
  - `<section id="decouverte" aria-labelledby="h-decouverte">` ... `</section>` (intact)
  - `<p class="eyebrow">01 / ACCUEIL</p>` and `<p class="eyebrow">02 / DÉCOUVERTE</p>` (untouched)
  - `<h1 id="h-accueil">Une formation, mes ressources, un seul onglet.</h1>` (untouched)
  - `<h2 id="h-decouverte">La formation, en un survol</h2>` (untouched)

**Step 4 — Commit:** stage `qhse-cesi/index.html` and commit. Do NOT push yet (push after Task 6 or Task 7 to bundle the deploy).

```
git add qhse-cesi/index.html
git commit -m "✨ Feature: Phase 2 — Accueil lead + Découverte pitch + mini-TOC scaffolding (DECOUV-01, DECOUV-02 partial, DECOUV-07 scaffold)"
```
  </action>
  <verify>
    <automated>
      # Gate 1 — placeholder removed from Accueil + Découverte
      test "$(grep -c 'class="placeholder"' qhse-cesi/index.html)" -le 1
      # (≤ 1: only the #outils placeholder may remain — that's V2-reserved)

      # Gate 2 — Accueil lead word count 130-170
      ACCUEIL_WC=$(awk '/id="accueil"/,/<\/section>/' qhse-cesi/index.html | sed -n 's/.*<p class="lead">\(.*\)<\/p>.*/\1/p' | wc -w)
      test "$ACCUEIL_WC" -ge 130 -a "$ACCUEIL_WC" -le 170

      # Gate 3 — mini-TOC present with 5 anchors
      grep -c '<aside class="toc"' qhse-cesi/index.html | grep -q '^1$'
      grep -oE 'href="#dec-(pitch|programme|rncp|calendrier|metiers)"' qhse-cesi/index.html | sort -u | wc -l | grep -q '^5$'

      # Gate 4 — pitch h3 present with scroll-margin-top
      grep -c 'id="dec-pitch"' qhse-cesi/index.html | grep -q '^1$'
      grep -q 'scroll-margin-top:\s*var(--header-h)' qhse-cesi/index.html

      # Gate 5 — required pitch facts present (case-insensitive search of pitch p.lead)
      grep -A 20 'id="dec-pitch"' qhse-cesi/index.html | grep -qi 'niveau 6'
      grep -A 20 'id="dec-pitch"' qhse-cesi/index.html | grep -q 'RNCP41446'
      grep -A 20 'id="dec-pitch"' qhse-cesi/index.html | grep -qE '(1 an|un an|post-Bac\+2)'
      grep -A 20 'id="dec-pitch"' qhse-cesi/index.html | grep -q '3 semaines'

      # Gate 6 — no ECTS hallucination
      ! grep -A 20 'id="dec-pitch"' qhse-cesi/index.html | grep -qi 'ECTS'

      # Gate 7 — no salary numbers in pitch (PITFALL-4 / D-13)
      ! grep -A 20 'id="dec-pitch"' qhse-cesi/index.html | grep -qE 'k€|€/mois'

      # Gate 8 — no forbidden RNCP fiches
      test "$(grep -cE 'RNCP35433|RNCP37656|RNCP40563|RNCP34205|RNCP16325' qhse-cesi/index.html)" -eq 0

      # Gate 9 — no banned marketing verbs anywhere in #decouverte
      ! awk '/id="decouverte"/,/<\/section>/' qhse-cesi/index.html | grep -qE 'Découvrez|Explorez|Plongez|Maîtrisez'

      # Gate 10 — at least one inline citation in pitch with as_of 2026-05-14
      grep -A 20 'id="dec-pitch"' qhse-cesi/index.html | grep -qE 'Source\s*:.+v[ée]rifi[ée]\s+le\s+<span class="mono">2026-05-14'
    </automated>
  </verify>
  <done>
    `qhse-cesi/index.html` contains: 150-word Accueil lead replacing the placeholder; `<aside class="toc">` with 5 anchors above the pitch; `<h3 id="dec-pitch">` + 150-word pitch with at least 1 inline citation parenthetical and `RNCP41446` in mono; no marketing verbs; no ECTS; no salary numbers; no forbidden RNCP fiches. One commit on a local branch. Phase 1 structural invariants intact.
  </done>
</task>

<task type="auto" tdd="false">
  <name>Task 3: Render Programme par année — Bordeaux 1-year post-Bac+2 variant (`<dl>` of BC blocs)</name>
  <files>qhse-cesi/index.html</files>
  <action>
**Per A1 (post-research resolution): the programme is a single year (post-Bac+2 Bordeaux variant), NOT the 3-year national variant.** Render the 4 RNCP41446 blocs (BC01-BC04) as the entire programme via a single `<dl>` (D-06).

**Per D-07:** each `<dd>` carries: 1 phrase of description (verbatim from CESI national page where possible) + bloc RNCP rattaché inline in `--ink-2` (non-clickable in programme).

**Per D-08:** volumes horaires are NOT publicly published per module (`02-RESEARCH.md §Programme Modules §Volumes horaires per module`). **Omit silently.** Do NOT render `—`, do NOT render `*` footnotes.

**Per D-11:** RNCP code references inside `<dd>` are non-clickable (e.g., `Bloc N°3`); the clickable form lives in the `#dec-sources` footer block (Task 4).

**Markup to append** inside `#decouverte`, immediately after the pitch's closing `</p>`:

```html
<h3 id="dec-programme" style="scroll-margin-top: var(--header-h)">Programme</h3>
<p>Au campus de Bordeaux, le Bachelor RQSE est délivré en un an, en admission parallèle après un Bac+2 (Source : CESI Bordeaux, vérifié le <span class="mono">2026-05-14</span>). La promotion couvre les quatre blocs de compétences du titre RNCP <span class="mono">RNCP41446</span> sur l'année.</p>

<dl>
  <dt>Construire le système de management QSE</dt>
  <dd>Cadrer, déployer et documenter un système de management QSE conforme aux référentiels ISO 9001 / 14001 / 45001 dans une organisation. <span style="color: var(--ink-2)">Bloc N°1.</span></dd>

  <dt>Améliorer le système de management QSE</dt>
  <dd>Piloter l'amélioration continue : audits internes, indicateurs, plans d'actions, revues de direction. <span style="color: var(--ink-2)">Bloc N°2.</span></dd>

  <dt>Manager les risques QSE</dt>
  <dd>Identifier, évaluer et traiter les risques santé-sécurité, environnementaux et qualité au sein des activités de l'entreprise. <span style="color: var(--ink-2)">Bloc N°3.</span></dd>

  <dt>Accompagner l'organisme dans ses démarches RSE et de développement durable</dt>
  <dd>Structurer une démarche RSE alignée sur les enjeux développement durable de l'organisation et de ses parties prenantes. <span style="color: var(--ink-2)">Bloc N°4.</span></dd>
</dl>

<p style="color: var(--ink-2)">Programme verbatim issu de la fiche RNCP41446 et de la page nationale CESI — Bachelor RQSE en alternance (Source : CESI, vérifié le <span class="mono">2026-05-14</span>). Les volumes horaires par bloc ne sont pas publiés publiquement par CESI Bordeaux ; ils ne sont pas affichés ici.</p>
```

**Per D-08 explicit acknowledgement:** the closing `<p style="color: var(--ink-2)">` paragraph EXPLICITLY tells the reader why volumes horaires are absent. This is NOT a footnote marker — it is a one-time prose explanation. Acceptable per D-08 because it surfaces the omission once, not inline-per-module.

**Per D-05 / DECOUV-08:** the bloc descriptions are paraphrased from CESI national content. Per D-05, CESI national applies to Bordeaux by default — NO `(générique CESI, non spécifique Bordeaux)` label is needed.

**Commit:**

```
git add qhse-cesi/index.html
git commit -m "✨ Feature: Phase 2 — Programme par année (1-year Bordeaux variant, BC01-BC04 dl) (DECOUV-03)"
```
  </action>
  <verify>
    <automated>
      # Gate 1 — programme h3 + dl present
      grep -c 'id="dec-programme"' qhse-cesi/index.html | grep -q '^1$'
      grep -cE '<dl[^>]*>' qhse-cesi/index.html | grep -qvE '^0$'

      # Gate 2 — 4 dt + 4 dd inside #decouverte
      DT_COUNT=$(awk '/id="dec-programme"/,/<h3 id="dec-rncp"/' qhse-cesi/index.html | grep -cE '<dt>')
      DD_COUNT=$(awk '/id="dec-programme"/,/<h3 id="dec-rncp"/' qhse-cesi/index.html | grep -cE '<dd>')
      test "$DT_COUNT" -eq 4 -a "$DD_COUNT" -eq 4

      # Gate 3 — all 4 BC blocs textually present
      grep -q 'Construire le système de management QSE' qhse-cesi/index.html
      grep -q 'Améliorer le système de management QSE' qhse-cesi/index.html
      grep -q 'Manager les risques QSE' qhse-cesi/index.html
      grep -q 'développement durable' qhse-cesi/index.html

      # Gate 4 — inline bloc references in --ink-2 (4 occurrences inside dd)
      test "$(awk '/id="dec-programme"/,/<h3 id="dec-rncp"/' qhse-cesi/index.html | grep -c 'Bloc N°')" -ge 4

      # Gate 5 — no <table> for programme (D-06)
      ! awk '/id="dec-programme"/,/<h3 id="dec-rncp"/' qhse-cesi/index.html | grep -qE '<table'

      # Gate 6 — no — or * footnote markers (D-08)
      ! awk '/id="dec-programme"/,/<h3 id="dec-rncp"/' qhse-cesi/index.html | grep -qE '<dd>[^<]*[—\*][^<]*<'

      # Gate 7 — programme citation present
      awk '/id="dec-programme"/,/<h3 id="dec-rncp"/' qhse-cesi/index.html | grep -qE 'Source\s*:.+CESI.+v[ée]rifi[ée]\s+le'
    </automated>
  </verify>
  <done>
    `<h3 id="dec-programme">` followed by an introductory paragraph + `<dl>` with 4 `<dt>` + 4 `<dd>` covering BC01-BC04 verbatim, each `<dd>` ending with `<span style="color: var(--ink-2)">Bloc N°k.</span>`, plus a closing `<p style="color: var(--ink-2)">` citation paragraph that names the omission of volumes horaires. No `<table>`, no `—`, no `*`. One commit local.
  </done>
</task>

<task type="auto" tdd="false">
  <name>Task 4: Render RNCP blocs `<ol>` + "Sources réglementaires" footer block</name>
  <files>qhse-cesi/index.html</files>
  <action>
**Per D-09 / D-10:** render the 4 RNCP41446 blocs as a **flat `<ol>` always expanded**. Each `<li>` is one bloc: an inline strong heading (no nested `<h4>` — D-09 says heading-as-strong is fine to keep the type scale clean) + 2-3 lines of description, max 4. No nesting, no toggle, no accordion.

**Per D-11:** the clickable RNCP code lives in the `#dec-sources` footer block — NOT inline in the `<ol>`.

**Markup to append** immediately after the programme's closing `</p>` (which currently sits before the next sub-section):

```html
<h3 id="dec-rncp" style="scroll-margin-top: var(--header-h)">Blocs de compétences RNCP</h3>
<p>Le titre est composé de quatre blocs de compétences. Chacun est évalué en applications professionnelles (productions écrites, présentations, portefeuille d'expériences professionnelles) selon la fiche France Compétences <span class="mono">RNCP41446</span> (Source : France Compétences, vérifié le <span class="mono">2026-05-14</span>).</p>

<ol>
  <li><strong>Bloc N°1 — Construire le système de management QSE.</strong> Cadre normatif (ISO 9001, ISO 14001, ISO 45001), structuration documentaire, déploiement opérationnel d'un système de management intégré.</li>

  <li><strong>Bloc N°2 — Améliorer le système de management QSE.</strong> Audits internes, indicateurs de performance, plans d'actions correctives et préventives, revues de direction, conduite du changement.</li>

  <li><strong>Bloc N°3 — Manager les risques QSE.</strong> Identification, évaluation et traitement des risques santé-sécurité, environnementaux et qualité ; document unique d'évaluation des risques professionnels (DUERP) ; gestion de crise.</li>

  <li><strong>Bloc N°4 — Accompagner l'organisme dans ses démarches RSE et de développement durable.</strong> Structuration d'une démarche RSE, identification des parties prenantes, intégration des enjeux développement durable dans la stratégie.</li>
</ol>
```

**Then append the "Sources réglementaires" footer block** (`#dec-sources` — D-11). This is the **single block** where RNCP codes are clickable. It also carries the disambiguation defence from PITFALL-2 (cite `Certificateur : CESI`) and the full validity-period from RNCP41446 (decision 23 octobre 2025, valide jusqu'au 27 octobre 2030):

Insert this block at the **end** of `#decouverte`, after Métiers (Task 6 will move the closing `</section>` if needed). For Task 4, append it after the `<ol>` and before the section's current closing `</section>` tag.

```html
<h3 id="dec-sources" style="scroll-margin-top: var(--header-h)">Sources réglementaires</h3>
<dl>
  <dt><a href="https://www.francecompetences.fr/recherche/rncp/41446/" target="_blank" rel="noopener noreferrer"><span class="mono">RNCP41446</span></a> — Responsable qualité sécurité environnement</dt>
  <dd>Certificateur : CESI. Décision d'enregistrement <span class="mono">2025-10-23</span>, valide jusqu'au <span class="mono">2030-10-27</span>. Niveau 6. Quatre blocs de compétences (Source : France Compétences, vérifié le <span class="mono">2026-05-14</span>).</dd>

  <dt><a href="https://www.cesi.fr/formation/bachelor-responsable-qualite-securite-environnement-en-alternance-2498878/" target="_blank" rel="noopener noreferrer">CESI — Bachelor RQSE en alternance</a></dt>
  <dd>Page nationale du programme : référentiel, blocs, rythme, débouchés (Source : CESI, vérifié le <span class="mono">2026-05-14</span>).</dd>

  <dt><a href="https://bordeaux.cesi.fr/formations-alternance-qse/" target="_blank" rel="noopener noreferrer">CESI Bordeaux — formations QSE en alternance</a></dt>
  <dd>Catalogue du campus de Bordeaux : Animateur QSE (Bac+2), Bachelor RQSE (Bac+3, post-Bac+2 sur un an), Mastère QSE (Bac+5) (Source : CESI Bordeaux, vérifié le <span class="mono">2026-05-14</span>).</dd>
</dl>
```

**Deviation policy:** if at execution time the `francecompetences.fr/recherche/rncp/41446/` URL returns anything other than HTTP 200 with the RNCP41446 fiche page, STOP and surface the discrepancy. Do NOT silently fall back to a cached value. (This is the most likely staleness vector in this plan — RNCP fiches can be renumbered between research and execution.)

**Commit:**

```
git add qhse-cesi/index.html
git commit -m "✨ Feature: Phase 2 — RNCP blocs ol + Sources réglementaires footer (DECOUV-04)"
```
  </action>
  <verify>
    <automated>
      # Gate 1 — rncp h3 + ol present
      grep -c 'id="dec-rncp"' qhse-cesi/index.html | grep -q '^1$'

      # Gate 2 — exactly 4 <li> inside the rncp <ol>
      RNCP_LI=$(awk '/id="dec-rncp"/,/<h3 id="dec-calendrier"|<h3 id="dec-metiers"|<h3 id="dec-sources"/' qhse-cesi/index.html | grep -c '<li>')
      test "$RNCP_LI" -eq 4

      # Gate 3 — all 4 bloc headings present
      grep -q 'Bloc N°1' qhse-cesi/index.html
      grep -q 'Bloc N°2' qhse-cesi/index.html
      grep -q 'Bloc N°3' qhse-cesi/index.html
      grep -q 'Bloc N°4' qhse-cesi/index.html

      # Gate 4 — no <details> or accordion (D-09)
      ! awk '/id="dec-rncp"/,/<h3 id="dec-calendrier"|<h3 id="dec-sources"/' qhse-cesi/index.html | grep -qE '<details|<summary'

      # Gate 5 — Sources réglementaires footer block exists
      grep -c 'id="dec-sources"' qhse-cesi/index.html | grep -q '^1$'

      # Gate 6 — clickable RNCP41446 link to francecompetences.fr present (D-11)
      grep -qE 'href="https://www\.francecompetences\.fr/recherche/rncp/41446/?"[^>]*>.*RNCP41446' qhse-cesi/index.html

      # Gate 7 — Certificateur : CESI present (PITFALL-2 defence)
      grep -q 'Certificateur\s*:\s*CESI' qhse-cesi/index.html

      # Gate 8 — decision + validity dates present in mono
      grep -q '2025-10-23' qhse-cesi/index.html
      grep -q '2030-10-27' qhse-cesi/index.html

      # Gate 9 — no forbidden RNCP fiches still absent
      test "$(grep -cE 'RNCP35433|RNCP37656|RNCP40563|RNCP34205|RNCP16325' qhse-cesi/index.html)" -eq 0

      # Gate 10 — outbound links carry target="_blank" rel="noopener noreferrer"
      test "$(grep -cE 'href="https://[^"]+"\s+target="_blank"\s+rel="noopener noreferrer"' qhse-cesi/index.html)" -ge 3
    </automated>
  </verify>
  <done>
    `<h3 id="dec-rncp">` + intro `<p>` + flat `<ol>` of 4 `<li>` blocs (BC01-BC04, 2-3 lines each, strong-prefixed, no nesting); `<h3 id="dec-sources">` + `<dl>` with clickable RNCP41446 fiche link to francecompetences.fr (with mono code, decision date, validity date, `Certificateur : CESI`), plus CESI national + CESI Bordeaux source links. All outbound links carry `target="_blank" rel="noopener noreferrer"`. One commit local.
  </done>
</task>

<task type="checkpoint:human-action" gate="blocking">
  <name>Task 5: Calendrier alternance — gate for owner-confirmed personal dates</name>
  <files>(none — pause for owner input)</files>
  <what-built>
    Tasks 1-4 have shipped the Accueil lead, the Découverte pitch, the programme `<dl>`, the RNCP `<ol>`, and the Sources réglementaires footer block. All three commits are local; nothing has been pushed.

    The next sub-section is the Calendrier alternance (`#dec-calendrier`). The rythme `3 semaines entreprise / 1 semaine école` is sourced from `bordeaux.cesi.fr` (HIGH confidence — `02-RESEARCH.md §Calendrier alternance`). However, **the owner-specific session dates (start, end, périodes d'examens, échéance mémoire) are NOT publicly published** by CESI Bordeaux (`02-RESEARCH.md §Calendrier alternance` row 6-7).

    Per A3 (post-research resolution): the personal-contract dates must be owner-confirmed. The citation format if provided is `(Source : contrat d'alternance personnel, vérifié le 2026-05-14)`.
  </what-built>
  <how-to-verify>
    Ask the owner — in French, concise (the owner uses Wispr Flow voice input, so keep the prompt short):

    > Pour la sous-section Calendrier de Découverte, j'ai besoin de quatre dates de ton contrat d'alternance personnel :
    >
    > 1. **Date de début de promotion** (ex : `2026-09-01`) — quand commence ta première semaine au campus ou en entreprise ?
    > 2. **Date de fin de promotion** (ex : `2027-08-31`) — quand se termine ton année ?
    > 3. **Période d'examens** (ex : `juin 2027` ou `2027-06-15 → 2027-06-26`) — si elle figure sur ton planning. **Sinon, réponds "non publiée".**
    > 4. **Échéance mémoire** (ex : `2027-07-15`) — date limite de remise du mémoire de fin d'études. **Sinon, réponds "non publiée".**
    >
    > Pour toute date que tu ne connais pas ou qui n'est pas publiée, réponds simplement "non publiée" et je l'omettrai silencieusement (politique D-08). Le rythme `3 semaines en entreprise / 1 semaine à CESI` est déjà sourcé depuis le site Bordeaux et n'a pas besoin de toi.

    **If the owner replies with one or more dates:** record each one in the format `(Source : contrat d'alternance personnel, vérifié le 2026-05-14)`. Render in a small `<dl>` inside `#dec-calendrier`.

    **If the owner replies "non publiée" / "je ne sais pas" / "skip" for ALL four:** the calendrier becomes a **single prose paragraph** (rythme + durée only, no `<dl>`). Per `02-CONTEXT.md §Decisions §Calendrier alternance presentation`: *"If they are not published, calendrier is one paragraph of prose only."*

    **If the owner asks to skip the gate entirely:** treat as "all non publiée" — single paragraph, no `<dl>`. Proceed to Task 6.
  </how-to-verify>
  <resume-signal>
    Owner types either:
    - 1-4 specific dates (one per question), OR
    - "non publiée" / "skip" / "toutes non publiées" for any or all of the four

    Then Task 6 (gsd-executor) proceeds with the captured data.
  </resume-signal>
</task>

<task type="auto" tdd="false">
  <name>Task 6: Render Calendrier alternance (rythme + owner-confirmed dates)</name>
  <files>qhse-cesi/index.html</files>
  <action>
**Source the rythme** from `02-RESEARCH.md §Calendrier alternance` row 1: `3 semaines entreprise / 1 semaine école`, cited from `bordeaux.cesi.fr/fr/actualites/animateur-qse-alternance-parcours-professionnalisation/`.

**Source the durée** from `02-RESEARCH.md §Calendrier alternance` row 2: `1 an (12 mois)`, cited from `bordeaux.cesi.fr/formations-alternance-qse/`.

**Source the dates** from the owner's Task 5 reply.

**Markup to append** after the RNCP `<ol>` and before the `<h3 id="dec-metiers">` insertion point (Task 7 will append métiers after this). Two render modes depending on owner's answers:

**Mode A — owner provided ≥ 1 date:**

```html
<h3 id="dec-calendrier" style="scroll-margin-top: var(--header-h)">Calendrier alternance</h3>
<p>Au campus de Bordeaux, le Bachelor RQSE se déroule sur un an en alternance, sous contrat d'apprentissage ou de professionnalisation. Le rythme est de trois semaines en entreprise pour une semaine au campus CESI Bordeaux (Source : CESI Bordeaux, vérifié le <span class="mono">2026-05-14</span>).</p>

<dl>
  <!-- include only the dates the owner provided; omit silently the rest per D-08 -->
  <dt>Début de promotion</dt>
  <dd><span class="mono">[OWNER_DATE_1]</span> (Source : contrat d'alternance personnel, vérifié le <span class="mono">2026-05-14</span>).</dd>
  <!-- ... etc. for any of the other 3 dates the owner provided ... -->
</dl>
```

**Mode B — owner answered "non publiée" / "skip" for all:**

```html
<h3 id="dec-calendrier" style="scroll-margin-top: var(--header-h)">Calendrier alternance</h3>
<p>Au campus de Bordeaux, le Bachelor RQSE se déroule sur un an en alternance, sous contrat d'apprentissage ou de professionnalisation. Le rythme est de trois semaines en entreprise pour une semaine au campus CESI Bordeaux (Source : CESI Bordeaux, vérifié le <span class="mono">2026-05-14</span>). Les dates précises de session, périodes d'examens et échéance mémoire ne sont pas publiées par le campus ; elles seront ajoutées si elles deviennent publiques.</p>
```

**Per D-08:** in Mode A, omit silently each individual date the owner did NOT provide (do not render `—` or `*`). In Mode B, the closing sentence acknowledges the omission once, then no `<dl>` block is rendered.

**Citation format reminder (per A3 post-research resolution):** personal-contract dates use `Source : contrat d'alternance personnel, vérifié le 2026-05-14`. Rythme uses `Source : CESI Bordeaux, vérifié le 2026-05-14`.

**Commit:**

```
git add qhse-cesi/index.html
git commit -m "✨ Feature: Phase 2 — Calendrier alternance (rythme + owner-confirmed dates) (DECOUV-05)"
```
  </action>
  <verify>
    <automated>
      # Gate 1 — calendrier h3 present
      grep -c 'id="dec-calendrier"' qhse-cesi/index.html | grep -q '^1$'

      # Gate 2 — rythme present + cited from CESI Bordeaux
      awk '/id="dec-calendrier"/,/<h3 id="dec-metiers"|<h3 id="dec-sources"/' qhse-cesi/index.html | grep -qE '3 semaines.*1 semaine|trois semaines.*une semaine'
      awk '/id="dec-calendrier"/,/<h3 id="dec-metiers"|<h3 id="dec-sources"/' qhse-cesi/index.html | grep -qE 'CESI Bordeaux'

      # Gate 3 — durée 1 an / un an present
      awk '/id="dec-calendrier"/,/<h3 id="dec-metiers"|<h3 id="dec-sources"/' qhse-cesi/index.html | grep -qE '(1 an|un an)'

      # Gate 4 — citation parenthetical present
      awk '/id="dec-calendrier"/,/<h3 id="dec-metiers"|<h3 id="dec-sources"/' qhse-cesi/index.html | grep -qE 'Source\s*:.+v[ée]rifi[ée]\s+le'

      # Gate 5 — if <dl> present (Mode A), it carries the personal-contract citation
      if awk '/id="dec-calendrier"/,/<h3 id="dec-metiers"|<h3 id="dec-sources"/' qhse-cesi/index.html | grep -q '<dl>'; then
        awk '/id="dec-calendrier"/,/<h3 id="dec-metiers"|<h3 id="dec-sources"/' qhse-cesi/index.html | grep -q 'contrat d.alternance personnel'
      fi

      # Gate 6 — no — or * placeholders (D-08)
      ! awk '/id="dec-calendrier"/,/<h3 id="dec-metiers"|<h3 id="dec-sources"/' qhse-cesi/index.html | grep -qE '<dd>[^<]*[—\*][^<]*<'
    </automated>
  </verify>
  <done>
    `<h3 id="dec-calendrier">` + paragraph with rythme `3 semaines / 1 semaine`, durée `1 an`, citation from CESI Bordeaux. If owner provided personal dates, a `<dl>` follows with each provided date cited from personal contract. If owner skipped, single paragraph only with acknowledgement sentence. One commit local.
  </done>
</task>

<task type="auto" tdd="false">
  <name>Task 7: Render Métiers — 4 articles in 2 experience tiers (Tier A débutant FT + Tier B Apec) + final deploy</name>
  <files>qhse-cesi/index.html</files>
  <action>
**Per A2 (post-research resolution):** the Métiers section uses **two tiers** — Tier A (Débutant, 0-2 ans) cited from France Travail + Tier B (Expérimenté, 3 ans+) cited from Apec. Total métier count ≤ 6; the planner picks **4 métiers** per `02-RESEARCH.md §Métiers ciblés` recommendation: 2 in Tier A + 2 in Tier B.

**Tier eyebrow** (per A2 visual flag): a small `<p class="eyebrow">` above each tier group, e.g. `DÉBUTANT (0-2 ans · France Travail)` / `AVEC EXPÉRIENCE (3 ans+ · Apec)`. This REUSES the existing `.eyebrow` CSS class — no new component.

**Per CONTEXT discretion clause (`Métiers section layout`):** each métier is a semantic `<article>` with `<h4>` (métier title — Fraunces inherits via cascade) + `<p>` (1-line description + source caveat) + `<p class="salary">` (salary line). NO new card class — flat surface, no shadow, default border. The `.salary` class doesn't exist in Phase 1 either — use inline mono via `<span class="mono">` instead. Final form: `<p>` (description) + `<p>` (salary line with `<span class="mono">` on the numbers).

**Markup to append** after the Calendrier section's closing tag and before the `#dec-sources` block (which Task 4 already placed at the bottom of the section — reorder if needed so source order is: Pitch → Programme → RNCP → Calendrier → Métiers → Sources):

```html
<h3 id="dec-metiers" style="scroll-margin-top: var(--header-h)">Métiers et débouchés</h3>
<p>Le Bachelor RQSE ouvre à deux horizons distincts : des postes accessibles à la sortie de la formation (premier poste, profil non-cadre) et des postes accessibles après quelques années d'expérience (profil cadre, fiches Apec). Les fourchettes ci-dessous sont présentées dans l'unité publiée par la source — mensuelle brute pour France Travail, annuelle brute pour Apec.</p>

<!-- Tier A — débutant -->
<p class="eyebrow">DÉBUTANT (0-2 ans · France Travail)</p>

<article>
  <h4>Animateur QSE</h4>
  <p>Premier poste à la sortie du Bachelor, animation opérationnelle santé-sécurité-environnement sur site (industrie, BTP).</p>
  <p><span class="mono">[FT mensuel min – mediane – max]</span> (Source : France Travail, ROME <span class="mono">F1204</span>, données T1 2025, vérifié le <span class="mono">2026-05-14</span>).</p>
</article>

<article>
  <h4>Préventeur HSE / Coordinateur QSE</h4>
  <p>Premier poste à la sortie du Bachelor en industrie, suivi des risques professionnels et environnementaux, contrôles qualité.</p>
  <p><span class="mono">[FT mensuel min – mediane – max]</span> (Source : France Travail, ROME <span class="mono">H1302</span>, données T1 2025, vérifié le <span class="mono">2026-05-14</span>).</p>
</article>

<!-- Tier B — avec expérience -->
<p class="eyebrow">AVEC EXPÉRIENCE (3 ans+ · Apec)</p>

<article>
  <h4>Responsable HSE</h4>
  <p>Poste cadre accessible après environ trois ans d'expérience, pilotage de la politique HSE d'un site ou d'une activité.</p>
  <p><span class="mono">33 k€ – 46 k€ – 65 k€</span> (Source : Apec, fiche métier 2025, vérifié le <span class="mono">2026-05-14</span>).</p>
</article>

<article>
  <h4>Responsable Qualité</h4>
  <p>Poste cadre accessible après environ trois ans d'expérience, pilotage du système qualité et de l'amélioration continue.</p>
  <p><span class="mono">34 k€ – 46 k€ – 62 k€</span> (Source : Apec, fiche métier 2025, vérifié le <span class="mono">2026-05-14</span>).</p>
</article>
```

**For Tier A salary lines:** open the two France Travail metierscope URLs from `02-RESEARCH.md §Métiers Tier A`:

  - F1204 — `https://candidat.francetravail.fr/metierscope/fiche-metier/F1204/animateur-animatrice-qse---qualite-securite-environnement-btp`
  - H1302 — `https://candidat.francetravail.fr/metierscope/fiche-metier/H1302/responsable-hygiene-securite-environnement-hse-en-industrie`

Extract the **current** mensuel brut salary band (the FT page publishes a percentile band per quarter — typical format `XX,XX % des offres entre [min] € et [max] € mensuel brut`). The Q1 2025 data captured in `02-RESEARCH.md` was:

  - H1302: 79.25 % des offres entre **1 820 €** et **3 333 €** mensuel brut → median ≈ midpoint **2 577 €/mois**
  - H1502 (alternative for Coordinateur QSE): 72.92 % entre **1 972 €** et **3 739 €** → median ≈ **2 856 €/mois**

**Fallback if F1204 is unreachable at execution time** (page down, format changed, geo-blocked, or `curl -fsI` returns non-200): cite the Animateur QSE article with **H1302** pre-extracted figures instead — this matches `02-RESEARCH.md` §Métiers Tier A example at line 245 which uses exactly `Animateur QSE — 1 820 €/mois – 2 577 €/mois – 3 333 €/mois (France Travail, ROME H1302, T1 2025)`. Replace the placeholder salary line for Animateur QSE with:

```html
<p><span class="mono">1 820 €/mois – 2 577 €/mois – 3 333 €/mois</span> (Source : France Travail, ROME <span class="mono">H1302</span>, données T1 2025, vérifié le <span class="mono">2026-05-14</span>).</p>
```

Both Tier A articles will then cite ROME H1302 — accept this redundancy. Sourcing integrity (every figure has a real, accessible source) outweighs ROME-code precision (F1204 is semantically closer to Animateur QSE, but unverifiable today is worse than H1302 verifiable). Do **not** silently leave the `[FT mensuel min – mediane – max]` placeholder in the rendered HTML — that violates DECOUV-04 (every claim sourced).

**If the FT page at execution time publishes different figures**, use the live figures (the parenthetical `données T1 2025` stays accurate to the data source even if FT reports them with a 1-quarter lag). The format on the page MUST be `mensuel min – médiane – max` per D-04 — do NOT auto-convert to annuel (per PITFALL-5).

Example final salary line (using 02-RESEARCH.md Q1 2025 data):

```
<span class="mono">1 820 €/mois – 2 577 €/mois – 3 333 €/mois</span>
```

Use a thin non-breaking space (`&#8239;`) between the number and the unit per D-04, or a regular space — owner has not specified. Default: regular space; revisit if visual review flags it.

**For Tier B salary lines:** the Apec ranges from `02-RESEARCH.md §Métiers Tier B` are HIGH-confidence and stable for 2025 (Apec barometer 2025). No re-fetch needed unless the executor notices Apec barometer 2026 has been published between research and execution. The format `33 k€ – 46 k€ – 65 k€` uses regular `k€` (D-04 thin-nbsp is a polish detail; default to regular space).

**Per PITFALL-4 (Apec salary cited as débutant salary):** each Tier B article description carries the "après environ trois ans d'expérience" caveat inline. This satisfies the experience-tier visibility requirement from A2 without adding a new component.

**Per D-05 / DECOUV-08:** all sources are CESI Bordeaux + CESI national + France Compétences + Apec + France Travail — all Bordeaux-applicable by default. NO `(générique CESI, non spécifique Bordeaux)` label needed.

**Final cleanup:**

1. **Update the footer `<time>`** (line 581) to today's deploy date:
   ```html
   <p>QHSE CESI Hub — dernière mise à jour <time datetime="2026-05-14">14 mai 2026</time></p>
   ```

2. **Source-order sanity check:** the source order inside `#decouverte` MUST be (D-12):
   - `<aside class="toc">`
   - `<h3 id="dec-pitch">` + pitch
   - `<h3 id="dec-programme">` + programme
   - `<h3 id="dec-rncp">` + RNCP blocs
   - `<h3 id="dec-calendrier">` + calendrier
   - `<h3 id="dec-metiers">` + métiers
   - `<h3 id="dec-sources">` + sources réglementaires footer
   - `</section>`

   If Task 4 inserted `#dec-sources` immediately after `#dec-rncp`, **move it now** to be the very last child of `#decouverte`, after Métiers. The Sources réglementaires block is the **footer of the section**, not an inline block.

3. **Commit + push** (this is the deploy commit — pushing triggers GitHub Actions → Vercel):
   ```
   git add qhse-cesi/index.html
   git commit -m "✨ Feature: Phase 2 — Métiers (Tier A FT débutant + Tier B Apec expérimenté), footer date refresh (DECOUV-06)"
   git pull --rebase origin main
   git push origin main
   ```

   Token: the user provides the GitHub token (`ghp_...`) at session start per CLAUDE.md. If the token is absent or expired, surface the request before attempting the push: *"J'ai besoin de ton token GitHub (ghp_...) pour déployer."*

4. **Wait for deploy** (~60 s per CLAUDE.md). Verify the live URL returns 200:
   ```
   curl -sI https://mes-apps-claude.vercel.app/qhse-cesi/ | head -1
   ```

   Expected: `HTTP/2 200`.
  </action>
  <verify>
    <automated>
      # Gate 1 — métiers h3 present
      grep -c 'id="dec-metiers"' qhse-cesi/index.html | grep -q '^1$'

      # Gate 2 — exactly 4 <article> inside #dec-metiers
      METIER_COUNT=$(awk '/id="dec-metiers"/,/<h3 id="dec-sources"|<\/section>/' qhse-cesi/index.html | grep -c '<article>')
      test "$METIER_COUNT" -eq 4

      # Gate 3 — 2 tier eyebrows present
      awk '/id="dec-metiers"/,/<h3 id="dec-sources"|<\/section>/' qhse-cesi/index.html | grep -qE 'DÉBUTANT.*France Travail'
      awk '/id="dec-metiers"/,/<h3 id="dec-sources"|<\/section>/' qhse-cesi/index.html | grep -qE 'AVEC EXPÉRIENCE.*Apec'

      # Gate 4 — Apec cited ≥ 2 times, France Travail cited ≥ 2 times
      AP_COUNT=$(awk '/id="dec-metiers"/,/<h3 id="dec-sources"|<\/section>/' qhse-cesi/index.html | grep -c 'Apec')
      FT_COUNT=$(awk '/id="dec-metiers"/,/<h3 id="dec-sources"|<\/section>/' qhse-cesi/index.html | grep -c 'France Travail')
      test "$AP_COUNT" -ge 2 -a "$FT_COUNT" -ge 2

      # Gate 5 — forbidden sources absent (D-03)
      ! awk '/id="dec-metiers"/,/<h3 id="dec-sources"|<\/section>/' qhse-cesi/index.html | grep -qE 'INSEE|Glassdoor|Indeed|HelloWork|Talent\.com|JobiJoba'

      # Gate 6 — at least 4 salary numbers (k€ for Tier B, €/mois for Tier A)
      SAL_COUNT=$(awk '/id="dec-metiers"/,/<h3 id="dec-sources"|<\/section>/' qhse-cesi/index.html | grep -cE 'k€|€/mois')
      test "$SAL_COUNT" -ge 4

      # Gate 7 — experience caveat inline per Tier B article
      awk '/id="dec-metiers"/,/<h3 id="dec-sources"|<\/section>/' qhse-cesi/index.html | grep -q 'trois ans d.expérience'

      # Gate 8 — source order: dec-metiers appears BEFORE dec-sources in the file
      M_LINE=$(grep -n 'id="dec-metiers"' qhse-cesi/index.html | head -1 | cut -d: -f1)
      S_LINE=$(grep -n 'id="dec-sources"' qhse-cesi/index.html | head -1 | cut -d: -f1)
      test "$M_LINE" -lt "$S_LINE"

      # Gate 9 — footer time updated to 2026-05-14
      grep -q 'datetime="2026-05-14"' qhse-cesi/index.html
      grep -q '14 mai 2026' qhse-cesi/index.html

      # Gate 10 — file still under 1000 lines
      test "$(wc -l < qhse-cesi/index.html)" -lt 1000

      # Gate 11 — no new accent surface
      test "$(grep -c 'style="color:\s*var(--accent)' qhse-cesi/index.html)" -eq 0

      # Gate 12 — no #000 or oklch(0%)
      ! grep -E '#000\b|oklch\(\s*0%' qhse-cesi/index.html

      # Gate 13 — placeholder gone from accueil + decouverte (only #outils may keep one)
      test "$(grep -c 'class="placeholder"' qhse-cesi/index.html)" -le 1

      # Gate 14 — live deploy reachable (sanity, run AFTER push completes ~60s)
      curl -s -o /dev/null -w "%{http_code}\n" https://mes-apps-claude.vercel.app/qhse-cesi/ | grep -q '^200$'
    </automated>
  </verify>
  <done>
    `<h3 id="dec-metiers">` + intro `<p>` + 2 tier eyebrows + 4 `<article>` elements (Animateur QSE, Préventeur HSE/Coordinateur QSE, Responsable HSE, Responsable Qualité), each with description + experience caveat (Tier B) + salary line in mono. `#dec-sources` is the last child of `#decouverte`. Footer `<time>` updated to `2026-05-14`. One commit pushed to `main`, deploy returns 200 from `https://mes-apps-claude.vercel.app/qhse-cesi/`.
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 8: Owner-verify gate — manual checks on live URL</name>
  <what-built>
    Phase 2 has shipped. `qhse-cesi/index.html` now contains:

    - Accueil section: h1 (Phase 1, unchanged) + ~150-word lead paragraph.
    - Découverte section: mini-TOC (`.toc` aside, 5 anchors) + 5 sub-sections (Pitch, Programme `<dl>` of BC01-BC04, RNCP `<ol>` of BC01-BC04, Calendrier alternance, Métiers in 2 tiers) + Sources réglementaires footer block (clickable RNCP41446 + CESI national + CESI Bordeaux).
    - Footer `<time>` updated to today.

    Deployed to `https://mes-apps-claude.vercel.app/qhse-cesi/` via the existing GitHub Actions pipeline.
  </what-built>
  <how-to-verify>
    Owner runs the following checks on **both phone and desktop** (each check is binary pass/fail; flag any visual or factual issue and request a follow-up commit):

    **A — Accueil (DECOUV-01)**
    1. Open `https://mes-apps-claude.vercel.app/qhse-cesi/` on phone. Read the Accueil lead paragraph. Can you state in your own words "what is this site, who is it for, what's inside" in under 30 s without scrolling further? ✓ / ✗
    2. The h1 still reads `Une formation, mes ressources, un seul onglet.` (unchanged from Phase 1). ✓ / ✗
    3. The Phase 1 placeholder `Un point d'entrée personnel pour le Bachelor QHSE de CESI Bordeaux : …` is GONE. ✓ / ✗

    **B — Découverte pitch + mini-TOC (DECOUV-02, DECOUV-07)**
    4. Below the `02 / DÉCOUVERTE` eyebrow + h2, the mini-TOC `<aside>` is visible with 5 entries: `Le pitch en 1 minute`, `Programme`, `Blocs de compétences RNCP`, `Calendrier alternance`, `Métiers et débouchés`. ✓ / ✗
    5. Tap each TOC entry one by one. Each tap lands on the correct h3 sub-heading, and the heading is visible below the sticky nav (not hidden under it). ✓ / ✗
    6. The pitch reads naturally in about 1 minute. It mentions: `niveau 6`, `RNCP41446`, `1 an / un an / post-Bac+2`, `3 semaines en entreprise / 1 semaine à CESI Bordeaux`. ✓ / ✗
    7. The pitch does NOT mention salary numbers, does NOT mention "180 ECTS", does NOT have exclamation marks, does NOT use first-person voice. ✓ / ✗

    **C — Programme (DECOUV-03)**
    8. The Programme section shows 4 modules (BC01-BC04 titles) in a `<dl>` (term + description pairs, NOT a table). ✓ / ✗
    9. Each `<dd>` ends with a small reference like `Bloc N°1.` / `Bloc N°2.` / `Bloc N°3.` / `Bloc N°4.` in muted ink. ✓ / ✗
    10. There is one closing sentence acknowledging that volumes horaires are not published — no `—` placeholders, no `*` footnotes. ✓ / ✗

    **D — RNCP blocs + Sources réglementaires (DECOUV-04)**
    11. The RNCP blocs section shows a flat numbered list of 4 blocs (`<ol>`), each with a strong-prefixed title + 2-3 lines of description. No accordion, no toggle, always expanded. ✓ / ✗
    12. Scroll to the bottom of Découverte. The "Sources réglementaires" block shows a clickable `RNCP41446` link. Click it — it opens `https://www.francecompetences.fr/recherche/rncp/41446/` in a new tab. ✓ / ✗
    13. The Sources block displays: `Certificateur : CESI`, decision date `2025-10-23`, validity date `2030-10-27`. ✓ / ✗

    **E — Calendrier (DECOUV-05)**
    14. The Calendrier section shows the rythme `3 semaines en entreprise / 1 semaine à CESI Bordeaux` and durée `un an`, cited from CESI Bordeaux. ✓ / ✗
    15. If you provided personal dates in Task 5, those dates appear in a `<dl>` cited from `contrat d'alternance personnel`. If you skipped Task 5, only the single rythme paragraph is rendered. ✓ / ✗

    **F — Métiers (DECOUV-06)**
    16. The Métiers section is visibly split into two tiers via two `<p class="eyebrow">` labels: `DÉBUTANT (0-2 ans · France Travail)` and `AVEC EXPÉRIENCE (3 ans+ · Apec)`. ✓ / ✗
    17. 4 métiers are rendered (2 per tier). Each carries a salary line in monospace numbers. Tier A salaries are in `€/mois`. Tier B salaries are in `k€`. ✓ / ✗
    18. No salary cites INSEE, Glassdoor, Indeed, HelloWork, Talent.com or JobiJoba (only Apec and France Travail). ✓ / ✗
    19. Each Tier B article description carries the inline caveat "après environ trois ans d'expérience". ✓ / ✗

    **G — Citations + freshness (DECOUV-03 + DECOUV-08)**
    20. Every factual claim you can spot (modules, blocs, rythme, salary, fiche dates) has a visible `(Source : ... vérifié le 2026-05-14)` parenthetical in muted ink. ✓ / ✗
    21. There is no `(générique CESI, non spécifique Bordeaux)` label anywhere (per D-05, default to "CESI = Bordeaux-applicable" unless content is imported from another campus). ✓ / ✗
    22. Footer date reads `14 mai 2026`. ✓ / ✗

    **H — Chassis intact (Phase 1 invariants)**
    23. Sticky header still works; brand `QHSE CESI` is visible top-left; burger menu opens and closes on mobile. ✓ / ✗
    24. Print preview (Ctrl+P or "Imprimer"): sticky header is hidden, all external URLs appear as monospace footnotes after the link text, body is black on white. ✓ / ✗
    25. QHSE Trainer at `https://mes-apps-claude.vercel.app/` still loads with its original Bebas Neue + lime + dot-grid identity (INFRA-03 still holds). ✓ / ✗

    **I — Accessibility floor (CHASSIS-10 / IDENT-05)**
    26. Run Lighthouse Accessibility on `https://mes-apps-claude.vercel.app/qhse-cesi/` — score ≥ 95. ✓ / ✗
    27. Run axe DevTools on the same URL — zero critical issues. ✓ / ✗

    Pass criterion: all 27 checks ✓ → Phase 2 is complete. Any ✗ → describe the issue and Claude opens a follow-up commit before closing the phase. Per D-08 + A3, Mode B for Calendrier (single paragraph) is acceptable — check 15 passes either way.
  </how-to-verify>
  <resume-signal>
    Owner types either:
    - `approuvé` / `approved` / `ok` → Phase 2 closes, gsd-executor writes `02-SUMMARY.md`.
    - `bug: <description>` or `fix: <description>` → Claude opens a follow-up commit and re-runs the relevant gates from Tasks 2-7.
  </resume-signal>
</task>

</tasks>

<threat_model>

## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Owner → Claude (token) | GitHub token (`ghp_...`) handed over for `git push`. Never logged or echoed. CLAUDE.md policy. |
| Claude → CESI / France Compétences / Apec / France Travail | Outbound URL embedding only — content is read at research time, baked into HTML at execution time, NOT scraped at runtime. The page itself makes zero network requests at user-visit time. |
| Live site → user browser | Static HTML over HTTPS via Vercel. No JS fetches, no third-party trackers, no analytics, no service worker. |
| User browser → outbound link target | `target="_blank" rel="noopener noreferrer"` on every outbound `<a>` — prevents reverse-tabnabbing and referrer leakage. |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-02-01 | **Spoofing** — fact attribution | Inline citation parentheticals | mitigate | Every factual claim carries `(Source : <named entity>, vérifié le 2026-05-14)`. Named entities are restricted to: France Compétences, CESI (national), CESI Bordeaux, Apec, France Travail, contrat d'alternance personnel. Forbidden sources (INSEE, aggregators) are gated out by Task 7 Gate 5. |
| T-02-02 | **Tampering** — wrong RNCP fiche pasted | RNCP citation in `#dec-sources` | mitigate | The clickable code lives in ONE place (D-11) — only one citation surface to maintain. Task 2 Gate 8 + Task 4 Gate 9 reject all 5 forbidden adjacent fiches (`RNCP35433`, `RNCP37656`, `RNCP40563`, `RNCP34205`, `RNCP16325`). Task 4 Gate 7 requires `Certificateur : CESI` text as PITFALL-2 defence. |
| T-02-03 | **Repudiation** — undated claims | Any factual paragraph | mitigate | Every Source parenthetical includes `vérifié le 2026-05-14` (the research date). Year of source data (e.g. `T1 2025` for FT, `fiche métier 2025` for Apec) is included where the source publishes a year. Definition of Done table Row DECOUV-03 enforces ≥ 4 occurrences of `Source\s*:.+vérifié le 2026-`. |
| T-02-04 | **Information disclosure** — referrer leakage on outbound clicks | Outbound `<a>` to francecompetences.fr / cesi.fr / apec.fr / candidat.francetravail.fr | mitigate | `target="_blank" rel="noopener noreferrer"` on every outbound link. Task 4 Gate 10 + Task 2 inherits Phase 1 Gate. |
| T-02-05 | **Denial of service** — broken outbound link at execution time (URL drift between research 2026-05-14 and execution N+M days later) | RNCP fiche URL, CESI URLs, Apec URLs, France Travail URLs | accept (mitigate at execution) | Task 4 deviation policy: if `francecompetences.fr/recherche/rncp/41446/` returns non-200 at execution, STOP and surface. Task 7 Gate 14 verifies the deploy itself is 200. Outbound link breakage to apec.fr / cesi.fr / francetravail.fr is not auto-detectable in a static page — accepted as residual risk; Phase 3 will introduce the quarterly link-check ritual (`?verify=1`) for the Biblio links per `02-CONTEXT.md §Deferred` row 3. |
| T-02-06 | **Elevation of privilege** — token in commit history | git commit metadata | mitigate | Token is in the `git remote set-url` command's URL portion only at push time; the URL is not written to the repo (CLAUDE.md pipeline). Commit messages never echo the token. The `.git/config` `[remote]` entry is not committed. |
| T-02-07 | **Spoofing** — content drift between RESEARCH.md and live CESI page | Programme module names, rythme citation | accept (mitigate at execution) | Module names are verbatim from CESI national page as of 2026-05-14. If CESI restructures the page between research and execution, the executor must surface the discrepancy at Task 3 commit time. Acceptance criterion: discrepancy ≤ 1 module name → patch inline; > 1 → return PLAN BLOCKED and re-run discuss/research. |
| T-02-08 | **Information disclosure** — owner's personal contract dates exposed publicly | `#dec-calendrier` `<dl>` (Mode A) | accept | The owner explicitly opts in to publishing each date at the Task 5 gate. The site is single-user and the dates are not personally identifying beyond "Bachelor QHSE alternance student at CESI Bordeaux" (already in CLAUDE.md publicly). Mode B (skip) is the silent-default for any non-confirmed date per D-08. |
| T-02-09 | **Tampering** — accent reservation widened by accident | New `style="color: var(--accent)"` introduced in any Phase 2 markup | mitigate | Task 7 Gate 11 enforces 0 occurrences of `style="color:\s*var(--accent)"` in the file. Phase 1 UI-SPEC §Color reserved-for list is the canonical contract. |
| T-02-10 | **Repudiation** — Mode B calendrier (no dates) misread as "data was lost" by future-owner reviewing the site | `#dec-calendrier` (Mode B only) | mitigate | The Mode B paragraph explicitly states "Les dates précises de session ... ne sont pas publiées par le campus ; elles seront ajoutées si elles deviennent publiques." — surfaces the omission as deliberate per D-08. |
| T-02-11 | **Denial of service** — file grows past 1000 lines, owner can no longer mentally model the whole file | `qhse-cesi/index.html` | mitigate | Task 7 Gate 10 caps at < 1000 lines. Estimated final size: ~750-850 lines (current 630 + ~150 lines of content). If exceeded, split is not allowed (single-file constraint INFRA-02) — content must be compressed instead. |

</threat_model>

<owner_verify_checklist>

## Owner-Verify Checklist (run after Task 7 deploy, summarised here for the orchestrator)

See **Task 8 (`how-to-verify`)** for the full 27-check list. Summary categories:

- A. Accueil (3 checks): lead reads in < 30 s, h1 untouched, placeholder gone.
- B. Découverte pitch + mini-TOC (4 checks): TOC has 5 entries, anchors land below sticky nav, pitch covers durée/niveau/RNCP/rythme, no banned content.
- C. Programme (3 checks): `<dl>` of 4 BC blocs, `Bloc N°k` references in muted ink, volumes-horaires omission acknowledged once.
- D. RNCP blocs + Sources réglementaires (3 checks): flat `<ol>` of 4 blocs, clickable RNCP41446 link, Certificateur/dates visible.
- E. Calendrier (2 checks): rythme + durée cited, Mode A `<dl>` present if owner provided dates.
- F. Métiers (4 checks): 2 tier eyebrows, 4 articles, no forbidden sources, experience caveat inline.
- G. Citations + freshness (3 checks): inline `(Source : ... vérifié le 2026-05-14)` on every claim, no spurious labels, footer date updated.
- H. Chassis intact (3 checks): sticky nav works, print preview correct, Trainer still loads.
- I. Accessibility (2 checks): Lighthouse ≥ 95, axe zero critical.

**Total:** 27 binary checks. All ✓ → close phase. Any ✗ → follow-up commit before close.

</owner_verify_checklist>

<verification>

## Phase-Level Verification (orchestrator-runnable after Task 8 ✓)

```bash
# Run from repo root after deploy + owner ✓
set -e

# 1. File invariants
test "$(wc -l < qhse-cesi/index.html)" -lt 1000
test "$(grep -c 'class="placeholder"' qhse-cesi/index.html)" -le 1
test "$(grep -cE '#000\b|oklch\(\s*0%' qhse-cesi/index.html)" -eq 0
test "$(grep -c 'style="color:\s*var(--accent)' qhse-cesi/index.html)" -eq 0

# 2. Requirement coverage
grep -c 'id="dec-pitch"'      qhse-cesi/index.html | grep -q '^1$'   # DECOUV-02 + DECOUV-07
grep -c 'id="dec-programme"'  qhse-cesi/index.html | grep -q '^1$'   # DECOUV-03 + DECOUV-07
grep -c 'id="dec-rncp"'       qhse-cesi/index.html | grep -q '^1$'   # DECOUV-04 + DECOUV-07
grep -c 'id="dec-calendrier"' qhse-cesi/index.html | grep -q '^1$'   # DECOUV-05 + DECOUV-07
grep -c 'id="dec-metiers"'    qhse-cesi/index.html | grep -q '^1$'   # DECOUV-06 + DECOUV-07
grep -c 'id="dec-sources"'    qhse-cesi/index.html | grep -q '^1$'   # DECOUV-04
grep -c '<aside class="toc"'  qhse-cesi/index.html | grep -q '^1$'   # DECOUV-07

# 3. Source-order sanity
P=$(grep -n 'id="dec-pitch"'      qhse-cesi/index.html | head -1 | cut -d: -f1)
G=$(grep -n 'id="dec-programme"'  qhse-cesi/index.html | head -1 | cut -d: -f1)
R=$(grep -n 'id="dec-rncp"'       qhse-cesi/index.html | head -1 | cut -d: -f1)
C=$(grep -n 'id="dec-calendrier"' qhse-cesi/index.html | head -1 | cut -d: -f1)
M=$(grep -n 'id="dec-metiers"'    qhse-cesi/index.html | head -1 | cut -d: -f1)
S=$(grep -n 'id="dec-sources"'    qhse-cesi/index.html | head -1 | cut -d: -f1)
test "$P" -lt "$G" -a "$G" -lt "$R" -a "$R" -lt "$C" -a "$C" -lt "$M" -a "$M" -lt "$S"

# 4. RNCP citation invariant
grep -q 'RNCP41446'                                                qhse-cesi/index.html
grep -q '2025-10-23'                                               qhse-cesi/index.html
grep -q '2030-10-27'                                               qhse-cesi/index.html
grep -q 'Certificateur\s*:\s*CESI'                                 qhse-cesi/index.html
test "$(grep -cE 'RNCP35433|RNCP37656|RNCP40563|RNCP34205|RNCP16325' qhse-cesi/index.html)" -eq 0

# 5. Forbidden source absent
test "$(grep -cE 'INSEE|Glassdoor|Indeed|HelloWork|Talent\.com|JobiJoba' qhse-cesi/index.html)" -eq 0

# 6. ECTS hallucination absent (PITFALL-6)
! grep -A 20 'id="dec-pitch"' qhse-cesi/index.html | grep -qi 'ECTS'

# 7. Citation discipline — at least 6 inline citations
test "$(grep -cE 'Source\s*:.+v[ée]rifi[ée]\s+le\s+(<span class="mono">)?2026-05-14' qhse-cesi/index.html)" -ge 6

# 8. Outbound link safety
test "$(grep -cE 'href="https://[^"]+"\s+target="_blank"\s+rel="noopener noreferrer"' qhse-cesi/index.html)" -ge 5

# 9. Footer date refresh
grep -q 'datetime="2026-05-14"' qhse-cesi/index.html
grep -q '14 mai 2026'           qhse-cesi/index.html

# 10. Live deploy reachable
curl -s -o /dev/null -w "%{http_code}\n" https://mes-apps-claude.vercel.app/qhse-cesi/ | grep -q '^200$'

echo "Phase 2 verification: all 10 phase-level gates passed."
```

</verification>

<success_criteria>

Phase 2 closes when all of the following are TRUE:

1. **All 27 owner-verify checks** in Task 8 return ✓ (owner confirms on phone + desktop).
2. **All 10 phase-level verification gates** above pass.
3. **All 8 DECOUV-* requirements** have at least one verification gate marked passing in the DoD table.
4. **The live URL** `https://mes-apps-claude.vercel.app/qhse-cesi/` returns 200 and displays the new Découverte content.
5. **The QHSE Trainer** at `https://mes-apps-claude.vercel.app/` still loads with its Phase 1 identity (INFRA-03 still holds).
6. **`02-SUMMARY.md`** is written to `.planning/phases/02-d-couverte-content/` summarising what shipped, the deploy commit SHA, and any deviations from this plan.
7. **`ROADMAP.md`** Phase 2 row flips to `Complete` with the completion date `2026-05-14`.

</success_criteria>

<output>

After Task 8 ✓, gsd-executor creates:

- `.planning/phases/02-d-couverte-content/02-SUMMARY.md` — what shipped, deploy commit SHA, deviations, owner sign-off date.

And updates:

- `.planning/STATE.md` — append Phase 2 completion + DECOUV-01..08 satisfaction.
- `.planning/ROADMAP.md` — flip Phase 2 row to `Complete` with date and deploy URL.
- `qhse-cesi/index.html` footer `<time datetime>` already updated at Task 7 (no further edit).

Commit cadence (target):

- Task 2 commit: `✨ Feature: Phase 2 — Accueil lead + Découverte pitch + mini-TOC scaffolding (DECOUV-01, DECOUV-02 partial, DECOUV-07 scaffold)`
- Task 3 commit: `✨ Feature: Phase 2 — Programme par année (1-year Bordeaux variant, BC01-BC04 dl) (DECOUV-03)`
- Task 4 commit: `✨ Feature: Phase 2 — RNCP blocs ol + Sources réglementaires footer (DECOUV-04)`
- Task 6 commit: `✨ Feature: Phase 2 — Calendrier alternance (rythme + owner-confirmed dates) (DECOUV-05)`
- Task 7 commit (deploy push): `✨ Feature: Phase 2 — Métiers (Tier A FT débutant + Tier B Apec expérimenté), footer date refresh (DECOUV-06)`
- Task 8 closing commit (if no owner fixes needed): `✅ Phase 2 complete: owner-verified, 8/8 DECOUV requirements satisfied`

**Final deploy URL on close:** `https://mes-apps-claude.vercel.app/qhse-cesi/`

</output>

---

## PLAN COMPLETE
