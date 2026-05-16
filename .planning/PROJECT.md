# QHSE CESI Hub

## What This Is

A personal study companion website that aggregates everything needed to know about the Bachelor QHSE at CESI Bordeaux — official programme, RNCP blocs de compétences, curated external resources (INRS, ISO norms, service-public.fr, veille pro), and reference links. A single-user reading hub to "survoler la formation" before the rentrée and stay organized during it.

**Shipped v1.0 "Reading Hub" — 2026-05-16.** Live at `https://mes-apps-claude.vercel.app/qhse-cesi/`: Accueil + Découverte (sourced long-form prose) + Biblio (35 content-verified link cards across 5 categories), single-file HTML/CSS/JS, dark editorial identity.

## Core Value

Have one trustworthy place that answers "what is this formation, what will I study, and where do I find the best resources" — without having to dig through scattered sources every time.

## Current State

| | |
|---|---|
| Shipped milestone | **v1.0 "Reading Hub"** (Phases 1–3, 3 plans) — 2026-05-16 |
| Live URL | `https://mes-apps-claude.vercel.app/qhse-cesi/` (HTTP 200) |
| Codebase | `qhse-cesi/index.html` — 944 lines, single file, no build, no deps + `qhse-cesi/LEGAL.md` |
| Requirements | 39 / 39 v1 ✓ Complete |
| Link quality | 35/35 cards content-verified (3 SPA cards owner-eyeballed); HTTP-only audits banned |
| Next milestone | **v2.0 "Étude"** — study tools, designed & parked in `.planning/V2-ETUDE-SPEC.md` |

## Next Milestone Goals

**v2.0 "Étude"** (study tools) — fully designed, parked in `.planning/V2-ETUDE-SPEC.md`, 5-phase decomposition. Adds quiz / fiches / tests with spaced repetition on top of the V1 reading hub by un-hiding the reserved `<section id="outils" hidden>` placeholder. Start via `/gsd-new-milestone` ingesting that spec.

Alternative path: v1.1 reading-hub quick wins (scrollspy, filter chips, mark-as-read, Ctrl+K search, light toggle, GitHub-Action link-checker) tracked in `.planning/V2_BACKLOG.md` § v1.1.

## Requirements

### Validated

- ✓ Landing section that explains the site's purpose in one screen — v1.0
- ✓ "Découverte" section: 1-min pitch, programme by year, RNCP blocs, alternance calendar, métiers/débouchés with salary ranges — v1.0
- ✓ "Biblio" section: 35 curated link cards in 5 categories (officiel, communauté, pédagogique, annales, outil-pro) — v1.0
- ✓ Top navigation with anchor links + smooth scroll — v1.0
- ✓ Mobile-friendly responsive layout (burger menu) — v1.0
- ✓ Distinct visual identity from the QHSE Trainer — v1.0
- ✓ Deployed at `…/qhse-cesi/` via the existing GitHub Actions pipeline — v1.0

### Active

- [ ] v2.0 "Étude" study tools — see `.planning/V2-ETUDE-SPEC.md` (quiz, fiches, tests, spaced repetition)

### Out of Scope

- Backend / database / user accounts — single-user personal tool, static site is sufficient
- Live/scraped data feeds (real-time RSS, dynamic Reddit threads) — content is hand-curated; runtime link-checking deferred to a v1.1 GitHub Action
- Multi-language UI — French content matches the formation
- Replacing or modifying the existing QHSE Trainer — it stays at the repo root, this hub lives in its own subdirectory
- Hosting copyrighted annales/corrigés PDFs — French pedagogical exception does not cover public Vercel hosting; link-only policy enforced (`LEGAL.md`)
- AI chatbot / gamification / analytics / social — destroy the "curated trustworthy source" premise; no audience to engage

> **Note:** "Interactive study tools" left Out of Scope at v1.0 close — **promoted to the v2.0 "Étude" milestone** (designed, parked in `V2-ETUDE-SPEC.md`).

## Context

- **Owner profile**: Bachelor QHSE alternant at CESI Bordeaux. Former electrician on nuclear sites (habilitations B1V, BR, H1V, SCN1, CSQ, RP1), BTS CGO background. Strong technical/industrial vocabulary. Voice input (Wispr Flow) — keep prompts concise. French in conversation, English in code/comments. Dark mode preferred. No manual git — Claude handles deploy end-to-end. Token-conscious: commit/push atomically (caps hit mid-task).
- **Existing apps in repo**: `index.html` is the QHSE Trainer (flashcards + QCM, "Industrial Safety Terminal" aesthetic). The hub has a clearly different "editorial library" identity and lives at `/qhse-cesi/`.
- **Deploy pipeline**: GitHub Actions auto-deploys `main` to Vercel (~60s). Workflow at `.github/workflows/deploy.yml` — do not touch.
- **Link-curation discipline (learned v1.0)**: every external URL must be **content-verified** (real `<title>`, topic match, soft-404 grep) before ship — HTTP-status audits are banned. See memory `feedback_verify_links_before_ship.md`. Preferred stable FR sources: `service-public.fr`, INRS `/risques|/demarche/.../ce-qu-il-faut-retenir.html`, `ameli.fr`, `francetravail.fr/metierscope`.

## Constraints

- **Tech stack**: Pure HTML + CSS + JS in a single `index.html`. No build step, no npm, no framework. `localStorage` only if needed.
- **Location**: `/qhse-cesi/index.html`. Must not break the QHSE Trainer at the repo root.
- **Browser support**: Modern evergreen, mobile + desktop. Dark default, no light toggle in V1.
- **Content policy**: All resource links curated, content-verified, no runtime scraping. No `.pdf` under `/qhse-cesi/`.
- **Visual identity**: Distinct from the QHSE Trainer's "Industrial Safety Terminal" aesthetic.
- **Deploy flow**: Every change ships through the existing GitHub Actions pipeline. No manual Vercel CLI.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single-file HTML/CSS/JS app, no framework | Matches repo pattern, zero build, deploys in seconds | ✓ Good — 944 lines, shipped clean |
| Hub at `/qhse-cesi/` subdirectory, not replacing root | Preserves the live QHSE Trainer | ✓ Good — INFRA-03 intact |
| V1 read-only (Découverte + Biblio); study tools → V2 | Reading hub gives value before rentrée; tooling needs real study sessions to design | ✓ Good — v2.0 "Étude" spec parked |
| Each app its own visual identity (no shared design system) | Owner preference — personality per app | ✓ Good — editorial vs terminal |
| Mono-page with anchored sections (Approach A) | Simplest, mobile-friendliest, single-file | ✓ Good |
| Biblio data-driven from `BIBLIO[]` + `renderCard()` | No hand-duplicated HTML, no inline `onclick` | ✓ Good — 35 cards, 1 mount |
| Link audit must be CONTENT-level, not HTTP-status | HTTP 200 ≠ working: SPAs, soft-404s, bot-walls, wrong-doc redirects all return 200 | ⚠️ Learned the hard way — 3 owner-verify fix rounds; now codified in memory + LEGAL discipline |
| `communaute` category = verified veille/practitioner sources | Stable QHSE discussion forums don't exist (Reddit/LinkedIn/ANACT all unreliable) | ✓ Good — honest sourcing |
| V2 "Étude" = parked 5-phase milestone, finish V1 first | Owner instruction; brainstorming → `V2-ETUDE-SPEC.md` | ✓ Good — clean V1 close |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition:** requirements invalidated → Out of Scope; validated → Validated; new → Active; decisions → Key Decisions; "What This Is" accuracy check.

**After each milestone:** full review of all sections, Core Value check, Out of Scope audit, Context refresh.

---
*Last updated: 2026-05-16 after v1.0 "Reading Hub" milestone*
