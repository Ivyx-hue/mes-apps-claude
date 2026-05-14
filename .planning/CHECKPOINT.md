# Session Checkpoint — QHSE CESI Hub

**Saved**: 2026-05-14 20:29 (Europe/Paris) — owner deferring Phase 2 verify to next session
**Branch**: main (all Phase 2 commits pushed through `280d233`)
**Workflow**: `/gsd-execute-phase 2` ⏸ PAUSED at Task 8 owner-verify checkpoint

---

## Where We Are — Quick Read

**Phase 2 is DEPLOYED LIVE** at https://mes-apps-claude.vercel.app/qhse-cesi/ (last commit `c5f8a7c`, 720 lines). The gsd-executor agent ran Tasks 1-7 and pushed every commit; Task 5 was skipped via the pre-resolved Mode B decision (generic rythme, no personal contract dates).

**What the owner still needs to do** before Phase 2 closes:
1. Open https://mes-apps-claude.vercel.app/qhse-cesi/ on **phone AND desktop**
2. Walk the **27-point checklist** below
3. Reply `approuvé` → final SUMMARY.md + closing commit → Phase 3 unlocked
   - Or `bug: <desc>` / `fix: <desc>` → follow-up commit, re-run verify

---

## GSD Workflow Status

| Step | Status | Commits |
|------|--------|---------|
| `/gsd-new-project` | ✓ DONE | `6bf70e6` `3f84ebf` `db04d6e` `0de8876` `686de33` `3fb0e05` |
| `/gsd-ui-phase 1` | ✓ DONE | `5523c5d` `44fbd99` `0feb90c` |
| `/gsd-plan-phase 1` | ✓ DONE | `a7f0845` |
| `/gsd-execute-phase 1` | ✓ DONE (owner-verified) | `3d79ced` `e09f5a2` |
| `/gsd-plan-phase 2` | ✓ DONE | `4cfe167` `3840f36` `6c254e9` |
| `/gsd-execute-phase 2` | ⏸ PAUSED at owner-verify | `69d15cf` `9bbab76` `119be9e` `1b91e57` `c5f8a7c` `280d233` |
| `/gsd-plan-phase 3` (Biblio) | ⏸ Pending Phase 2 close | — |

## Phase 2 Commits (chronological)

| Commit | Task | Content |
|--------|------|---------|
| `69d15cf` | T2 | Accueil lead (147 mots) + Découverte pitch (143 mots) + mini-TOC scaffolding |
| `9bbab76` | T3 | Programme par année — `<dl>` BC01-BC04, 1-year Bordeaux post-Bac+2 variant |
| `119be9e` | T4 | RNCP blocs `<ol>` + Sources réglementaires footer (RNCP41446 clickable) |
| `1b91e57` | T6 (Calendrier) | Rythme + durée, Mode B (no personal dates) |
| `c5f8a7c` | T7 | Métiers Tier A FT + Tier B Apec, footer date refresh `14 mai 2026` |
| `280d233` | — | Partial SUMMARY.md (Task 8 pending close) |

## Executor Deviations (locked, both reasonable)

1. **Métiers citations promoted to clickable** — needed to satisfy phase invariant P8 (≥5 external links). Final count: 8.
2. **F1204 fallback → H1502** — instead of duplicate H1302 ROMEs on both Tier A articles, executor used H1502 (Coordinateur QSE / Management qualité industrielle) on the first article, renaming heading to "Animateur QSE / Coordinateur QSE" to honestly reflect the source ROME.

## Pre-existing issue flagged (NOT Phase 2 scope)

`qhse-cesi/index.html:230` — `oklch(0% 0 0 / 0.45)` translucent sticky-header shadow. Phase 1 chassis artefact. Trips the Phase 2 black-floor invariant despite being a translucent shadow (not a surface color). Either:
- Fix as a Phase 1 maintenance commit (rewrite as `rgb(0 0 0 / 0.45)` or similar), or
- Relax the invariant to surface-color contexts only.

---

## OWNER-VERIFY CHECKLIST — 27 points (phone + desktop)

Live URL: **https://mes-apps-claude.vercel.app/qhse-cesi/**

### A. Accueil (DECOUV-01) — 3 checks
- [ ] 1. Lead paragraph readable in < 30 s; can summarise "what is this site, who is it for, what's inside"
- [ ] 2. h1 still reads `Une formation, mes ressources, un seul onglet.`
- [ ] 3. Phase-1 short placeholder is gone

### B. Découverte pitch + mini-TOC (DECOUV-02, DECOUV-07) — 4 checks
- [ ] 4. Mini-TOC `<aside>` visible with 5 entries (Pitch / Programme / Blocs / Calendrier / Métiers)
- [ ] 5. Each TOC tap lands on the correct h3, below the sticky nav
- [ ] 6. Pitch mentions: `niveau 6`, `RNCP41446`, `1 an / un an / post-Bac+2`, `3 semaines / 1 semaine`
- [ ] 7. Pitch carries no salary numbers, no "180 ECTS", no exclamations, no first-person

### C. Programme (DECOUV-03) — 3 checks
- [ ] 8. 4 modules in a `<dl>` (term + description, not a table)
- [ ] 9. Each `<dd>` ends with `Bloc N°k.` in muted ink
- [ ] 10. One closing sentence acknowledging volumes horaires omission (no `—` / `*`)

### D. RNCP blocs + Sources réglementaires (DECOUV-04) — 3 checks
- [ ] 11. Flat `<ol>` of 4 blocs, each strong-prefixed, always expanded
- [ ] 12. Clickable `RNCP41446` link opens `https://www.francecompetences.fr/recherche/rncp/41446/` in new tab
- [ ] 13. Sources block shows `Certificateur : CESI`, `2025-10-23`, `2030-10-27`

### E. Calendrier (DECOUV-05) — 2 checks
- [ ] 14. Rythme `trois semaines / une semaine` + durée `un an`, cited from CESI Bordeaux
- [ ] 15. (Mode B: single paragraph only; per pre-resolved decision)

### F. Métiers (DECOUV-06) — 4 checks
- [ ] 16. 2 tier eyebrows: `DÉBUTANT (0-2 ans · France Travail)` and `AVEC EXPÉRIENCE (3 ans+ · Apec)`
- [ ] 17. 4 métiers, 2 per tier — Tier A in `€/mois`, Tier B in `k€`, all in monospace
- [ ] 18. No INSEE / Glassdoor / Indeed / HelloWork / Talent.com / JobiJoba citations
- [ ] 19. Each Tier B description carries "après environ trois ans d'expérience"

### G. Citations + freshness — 3 checks
- [ ] 20. Every factual claim has `(Source : ..., vérifié le 2026-05-14)` in muted ink
- [ ] 21. No `(générique CESI, non spécifique Bordeaux)` label anywhere (per D-05)
- [ ] 22. Footer reads `14 mai 2026`

### H. Chassis intact (Phase 1 invariants) — 3 checks
- [ ] 23. Sticky header works; brand top-left; burger opens/closes on mobile
- [ ] 24. Print preview: header hidden, URLs as mono footnotes, body black-on-white
- [ ] 25. QHSE Trainer at https://mes-apps-claude.vercel.app/ still loads with original identity

### I. Accessibility — 2 checks
- [ ] 26. Lighthouse Accessibility ≥ 95 on the live URL
- [ ] 27. axe DevTools: zero critical issues

**Pass criterion:** all 27 ✓ → Phase 2 closes. Any ✗ → describe and a follow-up commit will be opened.

---

## Resume Instructions (for tomorrow)

1. Open this file (`.planning/CHECKPOINT.md`) to recover full context
2. Open https://mes-apps-claude.vercel.app/qhse-cesi/ on phone + desktop
3. Walk the 27-point checklist above
4. Tell Claude:
   - `approuvé` → finalises Phase 2 + opens Phase 3 (Biblio)
   - `bug: <desc>` or `fix: <desc>` → opens follow-up commit cycle

**Key paths**:
- Plan: `.planning/phases/02-d-couverte-content/02-PLAN.md`
- Research: `.planning/phases/02-d-couverte-content/02-RESEARCH.md`
- Partial summary: `.planning/phases/02-d-couverte-content/02-SUMMARY.md`
- Modified file: `qhse-cesi/index.html` (720 lines)

---
*Checkpoint saved 2026-05-14 20:29 by orchestrator on owner request "Enregistre tout, on reprendra demain"*
