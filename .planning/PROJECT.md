# QHSE CESI Hub

## What This Is

A personal study companion website that aggregates everything I need to know about the Bachelor QHSE at CESI Bordeaux — official programme, RNCP blocs de compétences, curated external resources (Reddit, INRS, ISO norms, past exam material), and reference links. Built as a single-user reading hub so I can "survoler la formation" before the rentrée and stay organized during it.

## Core Value

Have one trustworthy place that answers "what is this formation, what will I study, and where do I find the best resources" — without having to dig through scattered sources every time.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Landing section that explains the site's purpose in one screen
- [ ] "Découverte" section with: 1-minute pitch of the Bachelor, programme by year, RNCP blocs de compétences, alternance calendar, métiers/débouchés with salary ranges
- [ ] "Biblio" section with curated link cards grouped in 5 categories: sources officielles, communauté & retours d'expérience, contenu pédagogique, anciens sujets/annales, outils pros & veille
- [ ] Top navigation with anchor links between sections and smooth scroll
- [ ] Mobile-friendly responsive layout (burger menu on small screens)
- [ ] Distinct visual identity from the existing QHSE Trainer (each app has its own personality)
- [ ] Deploy at `https://mes-apps-claude.vercel.app/qhse-cesi/` via the existing GitHub Actions pipeline

### Out of Scope

- Interactive study tools (flashcards, QCM, quiz) — deferred to V2 once V1 reading hub is shipped and validated in real study sessions
- Backend / database / user accounts — single-user personal tool, static site is sufficient
- Live/scraped data feeds (real-time RSS, dynamic Reddit threads) — content is hand-curated to keep the site trustworthy and offline-readable
- Multi-language UI — French content matches the formation; no need for translation
- Replacing or modifying the existing QHSE Trainer app — it stays at the repo root, this hub lives in its own subdirectory

## Context

- **Owner profile**: Bachelor QHSE alternant at CESI Bordeaux, rentrée fixée, alternance fixée. Former electrician on nuclear sites (habilitations B1V, BR, H1V, SCN1, CSQ, RP1), BTS CGO background. Strong technical/industrial vocabulary.
- **Existing apps in repo**: `index.html` is the QHSE Trainer (flashcards + QCM, "Industrial Safety Terminal" aesthetic — Bebas Neue + lime + dot grid). The hub must have a clearly different visual identity.
- **Deploy pipeline**: GitHub Actions auto-deploys `main` to Vercel. Pushing to `main` produces a live URL in ~60s. Workflow file at `.github/workflows/deploy.yml` — do not touch.
- **Content sources to research**: official CESI Bordeaux Bachelor QHSE page, France Compétences fiche RNCP, INRS, ED INRS, Légifrance, AIDA, ISO standards (9001 / 14001 / 45001), Reddit r/cesi, LinkedIn témoignages, YouTube référence channels, Studocu / forums for annales if available.
- **User preferences**: French in conversation, English in code/comments. Wispr Flow voice input — keep prompts concise. Dark mode preferred. No manual commands — Claude handles git operations end-to-end.

## Constraints

- **Tech stack**: Pure HTML + CSS + JS in a single `index.html` file. No build step, no npm dependencies, no framework. Persistence via `localStorage` only if needed.
- **Location**: `/qhse-cesi/index.html` inside the existing `mes-apps-claude` repo. Must not break the existing QHSE Trainer at the repo root.
- **Browser support**: Modern evergreen browsers on mobile + desktop. Dark mode is the default theme.
- **Content policy**: All resource links must be curated and verifiable. No scraping at runtime — content is baked into the HTML and updated manually via git commits.
- **Visual identity**: Must be distinct from the QHSE Trainer's "Industrial Safety Terminal" aesthetic. Each app in this repo has its own personality.
- **Deploy flow**: Every change ships through the existing GitHub Actions pipeline. No manual Vercel CLI usage.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single-file HTML/CSS/JS app, no framework | Matches existing repo pattern, zero build overhead, deploys in seconds | — Pending |
| Hub lives at `/qhse-cesi/` subdirectory rather than replacing root | Preserves the live QHSE Trainer while adding the hub alongside | — Pending |
| V1 is read-only (Découverte + Biblio); study tools deferred to V2 | Reading hub provides immediate value before rentrée; tooling needs real study sessions to design well | — Pending |
| Each app has its own visual identity (no shared design system) | Owner preference — wants personality per app, not uniform branding | — Pending |
| Mono-page with anchored sections (Approach A) over multi-page or sidebar-wiki | Simplest, mobile-friendliest, fits single-file constraint; can refactor to sidebar later if content explodes | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-11 after initialization*
