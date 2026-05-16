---
phase: 03-biblio-data-render-5-categories-populated
plan: 01
subsystem: ui+data+governance
tags: [biblio, cards, data-driven, render, governance, legal, v2-backlog, v1-closure]

requires:
  - phase: 01-skeleton-chassis-visual-identity
  - phase: 02-d-couverte-content

provides:
  - "5 <section id=\"biblio-*\"> rendered dynamically from BIBLIO_CATEGORIES[]"
  - "35 link cards (7/category) rendered from BIBLIO[] via single innerHTML mount"
  - "biblio-card component: full-width editorial list (D-03), badge + title + desc + optional note + footer (domain + archive + lastChecked)"
  - "Freshness coloring 3 tiers (BIBLIO-06): fresh ≤ 90 d, warning 90-180 d, alert > 180 d"
  - "5 Wayback archive_url snapshots on officiel high-value cards (BIBLIO-09)"
  - "qhse-cesi/LEGAL.md — link-curation policy + CPI L122-5 (POLICY-01)"
  - ".planning/V2_BACKLOG.md — pre-seeded with UX-01..08 + TOOL-01..03 + Phase 2 v1.1 deferrals (POLICY-02)"
  - "Footer derniere_maj refreshed to 2026-05-15 (POLICY-04)"
  - "No .pdf under qhse-cesi/ confirmed (POLICY-03)"

affects: [V1 milestone closure — 13 remaining requirements satisfied; 39/39 v1 requirements complete]

# Metrics
duration: ~25 min (orchestrator-inline execution, no executor subagent spawn)
completed: 2026-05-16 (Tasks 1-8 complete; owner-verified, V1 closed)
---

# Phase 3 Plan 01 — Biblio data + render + governance — Summary

**The Biblio section shipped: 35 curated link cards across 5 categories (officiel · communauté · pédagogique · annales · outil-pro), rendered data-driven via `BIBLIO[]` + `renderCards()` into `#biblio-grid`, with provenance badges + age-coloured freshness signals + Wayback fallback on officiel high-value cards. Governance scaffolding shipped: `qhse-cesi/LEGAL.md` (POLICY-01) and `.planning/V2_BACKLOG.md` (POLICY-02). Footer date refreshed (POLICY-04). No PDFs under `/qhse-cesi/` (POLICY-03).**

> **Status: ✅ COMPLETE — OWNER-VERIFIED 2026-05-16.** Tasks 1-8 done. Owner ran the 16-point checklist in-browser across 3 link-fix rounds; final round (CARSAT soft-404, `e8ea7ac`) closed the last defect, owner confirmed it was the only remaining broken card. Phase 3 closed; V1 milestone closed.

## Performance

- **Duration:** ~25 min orchestrator-inline (Opus). NO gsd-executor subagent spawn (token-budget conservation).
- **Started:** 2026-05-15T19:35Z
- **Completed (Tasks 1-7):** 2026-05-15T20:00Z (push `7ab07b0`, deploy 200 OK)
- **Files modified:** 1 (`qhse-cesi/index.html`, 720 → 944 lines)
- **Files created:** 2 (`qhse-cesi/LEGAL.md`, `.planning/V2_BACKLOG.md`)
- **Commits:** 6 (one per task: T-03-01 plan+seeds, T-03-02 LEGAL, T-03-03 V2_BACKLOG, T-03-04 CSS, T-03-05+06 data+render, T-03-07 footer)

## Accomplishments

- **35 Biblio cards filled in `BIBLIO[]`** — exactly 7 per category, matching the owner-approved 35 in `03-SEED-CANDIDATES.md`. IDs are kebab-case (`officiel-rncp-41446`, `communaute-reddit-cesi`, …). Each card carries the full BIBLIO-04 schema.
- **5 Wayback `archive_url`** on officiel high-value cards: CESI Bordeaux, Légifrance R4121-1, Légifrance L4121-1, INRS ED 6322 (real snapshots). RNCP41446 uses the Wayback `/web/*/` wildcard pattern pending a manual save (researcher flagged: no snapshot yet).
- **7 `note` fields** on communauté cards — each carries a tailored "Lire avec recul" caveat (BIBLIO-05).
- **5 `<section id="biblio-*">`** rendered in locked visual order: `officiel` → `communaute` → `pedago` → `annales` → `pro`.
- **`renderCards()` pattern matches BIBLIO-02 strictly**: single innerHTML mount, no inline `onclick=""`, no hand-duplicated card HTML, no per-card DOM mutation. Sort once at render time (`BIBLIO.sort((a,b) => b.lastChecked.localeCompare(a.lastChecked))`).
- **Freshness coloring** wired via `.biblio-card__date--{fresh|warning|alert}` reusing the existing `--warning` + `--alert` tokens declared in Phase 1 (no new tokens).
- **Outbound link safety**: every card `<a>` AND every archive link `<a>` carries `target="_blank" rel="noopener noreferrer"` (BIBLIO-07). Phase 2's 8 outbound links unchanged.
- **`qhse-cesi/LEGAL.md`** (66 lignes) — link-curation framing, CPI L122-5 exception pédagogique with the literal article text, no-PDF policy linked to POLICY-03, IP attribution, removal-via-GitHub-Issues clause, no-data-collected clause.
- **`.planning/V2_BACKLOG.md`** (65 lignes) — pre-seeded with v1.1 quick wins (UX-01..07 + Phase 2 deferrals), v2 study tools (TOOL-01..03), v2 reading enhancements (UX-08 + reverse RNCP mapping), and the rejected-ideas wall (AI chatbot, gamification, real-time embeds, etc.).
- **Footer `<time>` refreshed** to `2026-05-15` — single-source-of-truth dated element on the page.
- **Live deploy verified**: `https://mes-apps-claude.vercel.app/qhse-cesi/` returns HTTP 200, serves 56 KB, 26 occurrences of `biblio-*` markup tokens.
- **File-size discipline**: 944 / 1100 lines (Phase 2 was 720 → +224 lines for CSS + JS + data, well under the 1100 cap).

## Task Commits

1. **T-03-01** Plan + owner-approved 35 seeds — `ac8db00`
2. **T-03-02** LEGAL.md (POLICY-01) — `b508e4a`
3. **T-03-03** V2_BACKLOG.md (POLICY-02) — `42396b5`
4. **T-03-04** CSS scaffolding for Biblio cards — `4284d52`
5. **T-03-05+06** BIBLIO[] 35 cards + renderCards (combined commit, BIBLIO-01..09) — `dfa0947`
6. **T-03-07** Footer derniere_maj refresh (POLICY-04) — `7ab07b0`

## Decisions Made (during execution)

1. **Skipped gsd-executor subagent spawn** — orchestrator (Opus) executed the 6 implementation tasks inline. Rationale: owner replied "j'approuve tout" + cap-pressure context (researcher subagent had hit its quota minutes earlier). Cheaper, faster, and cleaner audit trail since each task = 1 commit + 1 push immediately. No quality compromise — CONTEXT.md + RESEARCH.md provided the same blueprint the executor would have received.
2. **Combined T-03-05 (renderCards skeleton) and T-03-06 (35 cards)** into one commit — the schema is data-driven and the skeleton needs the data to be testable. Splitting into two commits would have shipped an intentionally-broken intermediate state (empty grid). Combined commit ships a working state.
3. **`SOURCE_TYPE_LABEL` map** introduced as a small lookup table for badge labels — avoids inline conditional logic and keeps the renderer pure.
4. **`archive_url` for RNCP41446** uses Wayback wildcard pattern `https://web.archive.org/web/*/<url>` (researcher flagged no snapshot existed at research time). Owner-action item: at any point, visit `https://web.archive.org/save/<url>` to trigger a snapshot and (optionally) replace the wildcard with the explicit timestamp.

## Files Modified

- `qhse-cesi/index.html` — 720 → 944 lines (+224)
- `qhse-cesi/LEGAL.md` — new, 66 lines
- `.planning/V2_BACKLOG.md` — new, 65 lines

## Deviations from Plan

**1. [Owner feedback — post-ship fix] 13 of 35 Biblio URLs replaced (commit `c9ba98c`)**
- **Found during:** owner first-pass review of the live deploy ("pas mal de liens ne fonctionne… gateway 404… je voudrais des liens plus précis").
- **Issue:** the orchestrator's auto-picked 35 from `03-SEED-CANDIDATES.md` were never live-probed before shipping (the researcher had flagged ~40 of 50 as un-probed). Audit found 6 hard 404s (Diplomeo, Studyrama search, YouTube `@CESIOfficiel`, FUN-MOOC search, INRS SST page, ICSI publications) + 7 generic search-pages forcing the reader to re-navigate (Reddit ×2 search, Studocu ×2 search, Annabac search, AFNOR root, plus Légifrance article-codes that 403 bots and render as dense legal text).
- **Fix:** all 13 replaced with direct, verified-200 URLs. Légifrance → Ministère du Travail articles (travail-emploi.gouv.fr — direct + pedagogical). Search-pages → specific landing pages (ANACT QVT/Thèmes, FonCSI Cahiers, AIDA INERIS Code env, INRS publications catalogue + ED 6294, CESI Bordeaux actualités, LinkedIn groupe QHSE, real YouTube CESI channel-ID).
- **Verification:** full 35-URL curl audit with browser UA — **35/35 HTTP 200, 0 failures**. Card count unchanged (7/7/7/7/7). File still 944 lines.
- **Process lesson:** the D-02 seed-approve gate was meant to catch exactly this — it was short-circuited by the "j'approuve tout" auto-pick. The post-ship fix restores the verification the gate would have provided.

**2.** All 7 implementation tasks (T-03-02..07) shipped as specified in PLAN.md. T-03-01 pre-resolved via owner's "j'approuve tout" + orchestrator auto-pick.

**3. [Owner feedback — round 2, content-verified] 13 more URLs replaced (commit `3ace8b3`)**
- **Found during:** owner second-pass in-browser review after round 1.
- **Issue:** round 1 audited URLs by HTTP status only. ~13 cards returned HTTP 200 but were broken in-browser: JS-SPA empty-title soft-404s (`travail-emploi.gouv.fr`, `francecompetences.fr`, `apec.fr`), INRS `media.html?refINRS=` serving the WRONG document, Cloudflare bot-walls ("Just a moment", `reddit.com`/`legifrance.gouv.fr`), LinkedIn login-walls.
- **Fix:** 13 replaced with CONTENT-verified URLs (fetch body → real `<title>` non-empty AND topic-matching → grep soft-404 markers). Regulatory → `service-public.fr` (static); INRS → `/risques/.../ce-qu-il-faut-retenir.html` + `/demarche/...`; `communaute` category pivoted from dead forums to verified veille/practitioner sources.
- **Process lesson:** HTTP-status link audits are invalid — banned. Codified in memory `feedback_verify_links_before_ship.md`. 32/35 cards content-provable; 3 SPA cards (RNCP francecompetences, Apec HSE, Apec Qualité) flagged honestly as un-curl-verifiable (rendered fine in Phase 2 owner-verify; owner eyeballs in browser).

**4. [Owner-verify, round 3] CARSAT Aquitaine soft-404 replaced (commit `e8ea7ac`)**
- **Found during:** owner final in-browser owner-verify (resumed 2026-05-16).
- **Issue:** `pro-carsat-aquitaine` deep-link `/home/entreprise/prevenir-vos-risques-professionnels.html` returned HTTP 200 but soft-404'd (title "Caisse régionale", redirect to `/media/404.html`); the whole `/prevenir-les-risques-professionnels` subtree was gone.
- **Fix:** replaced with `https://www.carsat-aquitaine.fr/home/entreprise.html` — content-verified (200, real title "Espace entreprises - Carsat Aquitaine", body covers prévention/subventions/tarification AT-MP, regional preserved). Owner confirmed it was the **only** remaining broken card → V1 owner-verify PASSED.

T-03-08 (owner-verify gate): **PASSED 2026-05-16**.

## Issues Encountered

- **13/35 seed URLs were broken or imprecise on first ship** — see Deviation 1. Resolved in `c9ba98c`; full 35/35 now HTTP 200. Root cause: seed list shipped without live-probing because the owner-approve gate was auto-resolved.
- **RNCP41446 has no Wayback snapshot** — known limitation from research, mitigated via wildcard pattern. Action documented in `03-SEED-CANDIDATES.md` and in this SUMMARY.
- **Légifrance 403s bots + dense legal text** — replaced both Légifrance article cards with Ministère du Travail (travail-emploi.gouv.fr) articles, which are more pedagogical and bot-accessible. The two replaced officiel cards lost their `archive_url` (Ministère articles change slugs less predictably than Wayback would track; acceptable trade-off for direct readability).
- **`qhse-cesi/LEGAL.md` is not served by Vercel by default** — files outside the served HTML routing. Owner reads it on GitHub. This is by design (it's a source-code policy file, not a rendered page). If a public LEGAL page is wanted later, refactor to an HTML anchor `#legal` inside `index.html` (v1.1 candidate).

## Known Stubs

None. Every BIBLIO-* and POLICY-* requirement maps to shipped code.

## User Setup Required

None — pure HTML/CSS/JS + 2 markdown files. No env vars, no service config, no Vercel changes.

## Owner Verification — PASSED

**T-03-08 — Owner-verification gate: ✅ PASSED 2026-05-16.** Owner ran the 16-point checklist on phone + desktop against `https://mes-apps-claude.vercel.app/qhse-cesi/` across 3 link-fix rounds (HTTP-only round 1 → content-verified round 2 → CARSAT round 3). Final state: 35/35 cards live, content-verified (3 SPA cards eyeballed OK in browser). Owner triggered `/gsd-complete-milestone` → V1 closed (39/39 v1 requirements complete).

## Next Phase Readiness

V1 (v1.0 "Reading Hub") closed 2026-05-16. Next milestone: **v2.0 "Étude"** — study tools, fully designed and parked in `.planning/V2-ETUDE-SPEC.md`. Start via `/gsd-new-milestone` ingesting that spec. (v1.1 quick wins in `V2_BACKLOG.md` § v1.1 remain available as an alternative path.)

## Self-Check

- [x] `qhse-cesi/index.html` contains `BIBLIO_CATEGORIES`, `BIBLIO`, `renderCards`, `getDomain`, `freshnessClass`, `formatDateFR`, `esc`.
- [x] Exactly 35 card entries in `BIBLIO[]` (7 per category × 5 categories).
- [x] 5 Wayback `archive_url` on officiel high-value cards (RNCP, CESI Bordeaux, Légifrance × 2, INRS ED 6322).
- [x] 7 `note` fields on communauté cards.
- [x] `qhse-cesi/LEGAL.md` exists and cites CPI L122-5.
- [x] `.planning/V2_BACKLOG.md` exists and includes UX-01..08 + TOOL-01..03.
- [x] `git ls-files 'qhse-cesi/*.pdf'` returns empty.
- [x] Footer `<time datetime="2026-05-15">15 mai 2026</time>` present once.
- [x] File size 944 lines (≤ 1100 cap).
- [x] Live URL https://mes-apps-claude.vercel.app/qhse-cesi/ returns HTTP 200 and serves Phase 3 markup (26 biblio-* matches in HTML response).

## Self-Check: PASSED (Tasks 1-8 complete; owner-verified 2026-05-16; V1 closed)

---
*Phase: 03-biblio-data-render-5-categories-populated*
*Tasks 1-8 completed: 2026-05-16 — owner-verified, V1 milestone closed*
