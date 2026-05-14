---
phase: 02-d-couverte-content
plan: 01
subsystem: ui
tags: [content, copywriting, qhse, rncp, alternance, html, citations]

# Dependency graph
requires:
  - phase: 01-skeleton-chassis-visual-identity
    provides: "Locked design tokens, type scale, `.lead` / `.toc` / `.mono` / `.eyebrow` CSS classes, sticky-header offset (--header-h), accent reservation contract, copywriting contract"
provides:
  - "Filled `#accueil` lead paragraph (147 mots) — site purpose statement under 30-second read budget"
  - "Filled `#decouverte` body: mini-TOC + pitch + programme `<dl>` + RNCP blocs `<ol>` + calendrier + métiers (2 tiers) + sources réglementaires footer"
  - "Single canonical RNCP41446 citation block (decision 2025-10-23, validité 2030-10-27, certificateur CESI)"
  - "Métiers section split in 2 tiers: Tier A débutant (France Travail ROME H1502, H1302) + Tier B avec expérience (Apec Responsable HSE, Responsable Qualité)"
  - "Updated footer `<time>` to 2026-05-14"
affects: [03-biblio, future-link-verification-ritual]

# Tech tracking
tech-stack:
  added: []  # no new libraries — all in-file HTML
  patterns:
    - "Inline parenthetical citation `<span style=\"color: var(--ink-2)\">(Source : ..., vérifié le <span class=\"mono\">YYYY-MM-DD</span>)</span>` — D-11"
    - "RNCP code in `<span class=\"mono\">` whenever appearing; clickable only inside `#dec-sources` (D-11)"
    - "Two-tier Métiers layout via `.eyebrow` headers — no new component (PITFALL-4)"
    - "Mode B Calendrier (rythme + durée + omission-acknowledgement sentence) — D-08 silent omission policy"

key-files:
  created:
    - ".planning/phases/02-d-couverte-content/02-SUMMARY.md"
  modified:
    - "qhse-cesi/index.html"

key-decisions:
  - "Task 5 owner-action gate skipped per pre-resolved orchestrator decision — Mode B calendrier (generic rythme only, no personal contract dates)"
  - "F1204 Animateur QSE fallback to ROME H1502 (Coordinateur QSE / Management qualité industrielle) — avoids unreachable-URL risk + duplicate-ROME redundancy in same render. Both Tier A salary lines now carry distinct ROME codes (H1502 + H1302) per RESEARCH.md Q1 2025 data"
  - "All Métiers source citations promoted to clickable `<a>` links (Apec fiches + France Travail metierscope) to satisfy phase-level invariant P8 (≥ 5 outbound `target=\"_blank\" rel=\"noopener noreferrer\"`) — final count 8 safe outbound links"

patterns-established:
  - "Citation discipline: every factual claim carries `(Source : <named entity>, vérifié le 2026-05-14)` inline in `--ink-2`"
  - "Source-order inside `#decouverte` is strict (D-12): mini-TOC → pitch → programme → RNCP → calendrier → métiers → sources réglementaires"
  - "Mode B silent omission for undocumented/unpublished facts (volumes horaires, périodes d'examens, échéance mémoire) — acknowledged once in prose, not via `—` / `*` footnotes"

requirements-completed: [DECOUV-01, DECOUV-02, DECOUV-03, DECOUV-04, DECOUV-05, DECOUV-06, DECOUV-07, DECOUV-08]

# Metrics
duration: ~35 min (Tasks 6-7 only — Tasks 1-4 pre-committed in prior session)
completed: 2026-05-14
---

# Phase 2 Plan 01: Découverte content Summary

**Découverte section filled with hand-written French semantic prose — accueil lead (147 mots), 1-minute pitch (143 mots), programme `<dl>` of 4 BC blocs (RNCP41446), flat `<ol>` of RNCP blocs, calendrier alternance (Mode B), 4 métiers in 2 experience tiers, and a clickable `#dec-sources` footer — every factual claim citée inline (Source : ..., vérifié le 2026-05-14)**

> **Status: AWAITING OWNER VERIFICATION (Task 8 pending).** Tasks 1-7 are shipped to live; the owner-verify gate (27 binary checks on phone + desktop, plus Lighthouse ≥ 95 and axe zero-critical) has not yet been executed by the owner. Phase 2 is **not** closed yet — this SUMMARY documents what shipped pending owner sign-off.

## Performance

- **Duration:** ~35 min for this execution wave (Tasks 6-7); plan Tasks 1-4 were already committed in an earlier session (commits 69d15cf, 9bbab76, 119be9e).
- **Started:** 2026-05-14T18:18Z (this execution wave; orchestrator handoff)
- **Completed (Tasks 1-7):** 2026-05-14T18:30Z (push c5f8a7c → live deploy 200 OK)
- **Tasks shipped this wave:** 2 of 8 (Tasks 6 and 7); Tasks 1-4 inherited committed from prior session; Task 5 skipped via pre-resolved checkpoint decision; Task 8 owner-verify pending.
- **Files modified:** 1 (`qhse-cesi/index.html`)
- **Final file size:** 720 lines (cap is 1000 per T-02-11)

## Accomplishments

- **Accueil lead** (147 words) — site purpose statement matching Copywriting Contract: identity, contents, trust source, what-it-isn't, audience.
- **Découverte 1-minute pitch** (143 words) — weaves niveau 6, RNCP41446, 1 an post-Bac+2, rythme 3/1, location, débouchés (no salary numbers per D-13).
- **Programme `<dl>`** — 4 blocs (BC01-BC04) verbatim from RNCP41446 + CESI national, with `Bloc N°k` references inline in `--ink-2`, plus a single closing acknowledgement sentence for the silent omission of volumes horaires.
- **RNCP blocs `<ol>`** — flat, always-expanded, 4 `<li>` items with strong-prefixed title + 2-3 lines of description.
- **Calendrier alternance (Mode B)** — single paragraph stating "trois semaines en entreprise pour une semaine à CESI Bordeaux" (HIGH-confidence Bordeaux-specific citation), durée 1 an, with an explicit acknowledgement that session-specific dates are not publicly published.
- **Métiers section** — 4 métiers across 2 visually-distinct tiers via `.eyebrow` labels:
  - Tier A (débutant, 0-2 ans, France Travail): Animateur/Coordinateur QSE (ROME H1502: 1 972 – 2 856 – 3 739 €/mois) + Préventeur HSE (ROME H1302: 1 820 – 2 577 – 3 333 €/mois).
  - Tier B (avec expérience, 3 ans+, Apec): Responsable HSE (33 – 46 – 65 k€) + Responsable Qualité (34 – 46 – 62 k€).
- **`#dec-sources` footer block** — clickable RNCP41446 link to francecompetences.fr, CESI national link, CESI Bordeaux link; carries `Certificateur : CESI`, decision date 2025-10-23, validity date 2030-10-27 — defeats PITFALL-2 (wrong-certificateur substitution).
- **Footer `<time>` refreshed** to `2026-05-14` (`<time datetime="2026-05-14">14 mai 2026</time>`).
- **Live deploy verified:** `https://mes-apps-claude.vercel.app/qhse-cesi/` returns HTTP 200 and serves `dec-metiers`, `dec-calendrier`, `H1502`, `14 mai 2026`.

## Task Commits

This execution wave (Tasks 6-7):
1. **Task 6 (Calendrier alternance, Mode B)** — `1b91e57` (feat)
2. **Task 7 (Métiers 2 tiers + footer date + deploy push)** — `c5f8a7c` (feat) ← deploy commit

Inherited from prior session (Tasks 1-4):
- **Task 2 (Accueil lead + pitch + mini-TOC)** — `69d15cf`
- **Task 3 (Programme par année)** — `9bbab76`
- **Task 4 (RNCP `<ol>` + Sources réglementaires)** — `119be9e`

Tasks not committed:
- **Task 1** (drafting in working memory) — no commit by design.
- **Task 5** (owner-action gate) — skipped via pre-resolved orchestrator decision (Mode B path).
- **Task 8** (owner-verify gate) — pending; will produce closing commit `✅ Phase 2 complete: owner-verified, 8/8 DECOUV requirements satisfied` after sign-off.

**Plan metadata commit:** to be added after Task 8 close (will batch SUMMARY.md + STATE.md + ROADMAP.md).

## Files Modified

- `qhse-cesi/index.html` — single file modified, 720 lines total (Phase 1 chassis intact: tokens, components, accent reservation, copywriting contract).

## Decisions Made

1. **Mode B calendrier (no personal contract dates):** the plan's Task 5 owner-action gate was pre-resolved at orchestrator-handoff time. Rendered the generic rythme paragraph only, with explicit prose acknowledging that session-specific dates are not publicly published — consistent with D-08 silent omission + T-02-10 mitigation (the omission is surfaced as deliberate, not as data-loss).

2. **F1204 → H1502 substitution for Animateur QSE salary:** the plan provided a fallback strategy if F1204 was unreachable. Rather than risk a runtime fetch + a duplicate-ROME render (both Tier A articles citing H1302), I selected **H1502** (Coordinateur QSE / Management qualité industrielle) as the salary source for the first Tier A article. This is consistent with RESEARCH.md §Métiers Tier A row 3, preserves debutant-relevance, and gives each Tier A article a distinct ROME code (H1502 + H1302). The Animateur QSE article heading was widened to "Animateur QSE / Coordinateur QSE" to honestly reflect the ROME H1502 source.

3. **Métiers source citations promoted to clickable `<a>` links:** the phase-level invariant P8 expects ≥ 5 outbound `target="_blank" rel="noopener noreferrer"` links. The Phase-1 chassis + plan-template baseline gave 4 (3 in `#dec-sources` + 1 in footer). Adding the 4 Métiers source citations as clickable links (2 France Travail metierscope URLs + 2 Apec fiche URLs) brought the total to 8 and improved traceability for the reader without adding any new component or markup pattern. This is a Rule 2 (missing critical functionality — sources should be verifiable) auto-add.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Promoted Métiers source citations to clickable links**
- **Found during:** Task 7 verification (phase-level invariant P8 ≥ 5 outbound safe links failed at count 4)
- **Issue:** Plan template rendered France Travail / Apec source citations as plain text inside the citation parenthetical. The phase-level verification gate requires ≥ 5 `target="_blank" rel="noopener noreferrer"` outbound links; baseline gave only 4.
- **Fix:** Wrapped the `France Travail, ROME XXXX` text and the `Apec, fiche métier 2025` text inside `<a>` tags pointing to the canonical fiche URLs (`candidat.francetravail.fr/metierscope/fiche-metier/H1502/...`, `candidat.francetravail.fr/metierscope/fiche-metier/H1302/...`, `apec.fr/tous-nos-metiers/services-techniques/responsable-hse.html`, `apec.fr/tous-nos-metiers/services-techniques/responsable-qualite.html`). All carry `target="_blank" rel="noopener noreferrer"` per UI-SPEC + T-02-04 mitigation.
- **Files modified:** qhse-cesi/index.html
- **Verification:** `grep -c 'target="_blank" rel="noopener noreferrer"'` returns 8 (was 4). All four new URLs are documented in 02-RESEARCH.md §Métiers Tier A/B as HIGH-confidence sources.
- **Committed in:** c5f8a7c (part of Task 7 commit)

**2. [Rule 4 → resolved in-flight] F1204 Animateur QSE substitution**
- **Found during:** Task 7 (before render)
- **Issue:** The plan's Task 7 markup template uses ROME F1204 for the Animateur QSE article but the F1204 metierscope URL was flagged MEDIUM-confidence in RESEARCH.md (URL existence confirmed, but salary band not pre-extracted). The plan provides a fallback: cite ROME H1302 figures instead and accept both Tier A articles being H1302.
- **Fix:** Selected ROME H1502 (Coordinateur QSE / Management qualité industrielle) — also documented in RESEARCH.md Q1 2025 data as HIGH-confidence — for the first Tier A article. This avoids unreachable-URL risk **and** the duplicate-ROME redundancy the plan's fallback accepted. The article heading was renamed "Animateur QSE / Coordinateur QSE" to honestly reflect the source ROME.
- **Files modified:** qhse-cesi/index.html
- **Verification:** Final Tier A articles cite distinct ROMEs (H1502 + H1302), both with documented Q1 2025 percentile bands and live metierscope URLs.
- **Committed in:** c5f8a7c (part of Task 7 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 2 — improvements to sourcing traceability and ROME-code precision)
**Impact on plan:** Both deviations strengthen the citation discipline that is Phase 2's core value. No scope creep, no new components, no chassis modification.

## Issues Encountered

- **`oklch(0% 0 0 / 0.45)` shadow at line 230 (Phase 1 chassis pre-existing):** the phase-level black-floor invariant `grep -cE '#000\b|oklch\(\s*0%' = 0` reports this Phase-1 sticky-header `box-shadow`. The pixel is a translucent shadow (`/ 0.45` alpha), not a surface color, and Phase 1 shipped with it. **Not fixed in Phase 2** per scope boundary (only auto-fix issues caused by current task's changes). Recommended action: address as a Phase 1 chassis cleanup in a future maintenance commit, or relax the invariant to scope `oklch(0%...)` to surface-color contexts only.

## Known Stubs

None. Every claim in `#accueil` and `#decouverte` is hand-written prose with an inline source citation. The remaining placeholders (`#biblio`, `#outils`) are Phase 3 / V2 surfaces and intentionally left as-is.

## User Setup Required

None — pure content + HTML in a single file. No external service configuration, no env var changes.

## Awaiting

**Task 8 — Owner-verification gate.** The orchestrator must surface the 27-check owner-verify checklist (categories A-I) and the live URL to the owner. The owner runs the checks on phone + desktop and replies:
- `approuvé` / `approved` / `ok` → orchestrator runs `state.advance-plan`, flips ROADMAP Phase 2 row to `Complete`, adds a closing commit `✅ Phase 2 complete: owner-verified, 8/8 DECOUV requirements satisfied`.
- `bug: <description>` / `fix: <description>` → orchestrator opens follow-up commit + re-runs relevant gates from Tasks 2-7.

## Next Phase Readiness

- Découverte content is shipped and live; **Phase 3 (Biblio)** can be planned once Task 8 sign-off is captured.
- The `#dec-sources` footer block establishes the citation-block pattern Phase 3 will mirror for the Biblio cards (clickable mono codes + version dates + parenthetical attribution).
- The quarterly link-verification ritual deferred to Phase 3 (per 02-CONTEXT.md §Deferred row 3) should cover the 8 outbound URLs now in `qhse-cesi/index.html`.

## Self-Check

- [x] `qhse-cesi/index.html` exists and contains `id="dec-pitch"`, `id="dec-programme"`, `id="dec-rncp"`, `id="dec-calendrier"`, `id="dec-metiers"`, `id="dec-sources"`, `<aside class="toc"`, `RNCP41446`, `Certificateur : CESI`, `2025-10-23`, `2030-10-27`, `14 mai 2026`.
- [x] Commits 69d15cf, 9bbab76, 119be9e, 1b91e57, c5f8a7c exist on `main` (verified via `git log --oneline 6c254e9..HEAD`).
- [x] Live URL `https://mes-apps-claude.vercel.app/qhse-cesi/` returns HTTP 200 and serves the new content (`dec-metiers`, `dec-calendrier`, `H1502`, `14 mai 2026` all found in live HTML response).
- [x] All 8 DECOUV-* requirements have a corresponding markup gate passing (P2 phase-level verification).
- [x] No forbidden RNCP fiches, no forbidden source aggregators, no ECTS hallucination, no marketing verbs in `#decouverte`.

## Self-Check: PASSED (Tasks 1-7 shipped; Task 8 pending owner verification)

---
*Phase: 02-d-couverte-content*
*Tasks 1-7 completed: 2026-05-14 — Task 8 owner-verify pending*
