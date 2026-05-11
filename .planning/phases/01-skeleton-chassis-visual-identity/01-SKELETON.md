---
phase: 01
type: walking-skeleton
created: 2026-05-11
---

# Phase 1 — Walking Skeleton

This phase ships the thinnest possible end-to-end slice that proves the entire pipeline works **before any content is written**. After Phase 1 ships, every subsequent phase only adds content into known, working surfaces — no new infrastructure, no new build steps.

---

## The slice (vertical, end-to-end)

```
Local file (qhse-cesi/index.html)
        ↓
git add → git commit ("✨ Feature: Phase 1 — skeleton chassis QHSE CESI Hub")
        ↓
git push origin main
        ↓
GitHub Actions workflow (.github/workflows/deploy.yml — UNCHANGED)
        ↓
Vercel auto-deploys the repo
        ↓
Live at https://mes-apps-claude.vercel.app/qhse-cesi/
        ↓
Owner opens the URL on phone + desktop
        ↓
Verifies: page renders, sticky nav works, burger menu works on mobile,
          fonts/colors visibly distinct from QHSE Trainer at root,
          skip-link reveals on first Tab, print preview hides nav.
        ↓
Owner approves → Phase 1 complete → Phase 2 (Découverte content) unlocks.
```

---

## What this proves

| Question | Answer (verified at end of Phase 1) |
|----------|--------------------------------------|
| Does the subdirectory pattern (`/qhse-cesi/`) deploy cleanly through the existing pipeline? | Yes — file exists at `https://mes-apps-claude.vercel.app/qhse-cesi/` |
| Does the existing QHSE Trainer at `/` still work? | Yes — visit root, Trainer loads unchanged (INFRA-03) |
| Is the visual identity gate locked? | Yes — Fraunces + Inter + JetBrains Mono, warm-dark palette, brass accent — visibly different from Trainer's Bebas Neue + lime (IDENT-01) |
| Does sticky nav + smooth-scroll-with-offset + burger menu work on real devices? | Yes — owner tap-tests on phone (CHASSIS-01..03) |
| Are anchors bookmarkable? | Yes — `#accueil` / `#decouverte` / `#biblio` resolve directly (CHASSIS-05) |
| Is the V2 surface reserved without restructuring the page? | Yes — `<section id="outils" hidden>` + matching nav `<li hidden>` exist in the DOM (CHASSIS-08) |
| Is the print stylesheet functional? | Yes — Ctrl+P preview hides nav, expands external URLs as footnotes (CHASSIS-06) |
| Does the empty shell pass accessibility and Lighthouse? | Yes — axe 0 critical, Lighthouse A11y ≥ 95 (CHASSIS-10, IDENT-05) |

---

## Architectural decisions locked by this skeleton (do NOT re-litigate in Phase 2 or 3)

These decisions are baked into `qhse-cesi/index.html` at end of Phase 1 and become the contract subsequent phases build on:

1. **Single-file, no build.** `qhse-cesi/index.html` is the entire app. Inline `<style>`, inline `<script>`, two `<link>` tags for Google Fonts. No npm, no bundler, no CSS preprocessor. (INFRA-02)
2. **Subdirectory location.** `/qhse-cesi/` — never the repo root (root belongs to the Trainer, frozen sibling per INFRA-03).
3. **CSS layer order:** `@layer reset, tokens, base, components, utilities;` — declared once. Reset always loses to component styles.
4. **OKLCH tokens + `light-dark()`** for color. Dark wins by default via `color-scheme: dark light` on `:root` and `<meta name="color-scheme" content="dark light">`. No light-mode toggle in V1 (IDENT-02).
5. **Three typefaces only**, single Google Fonts CSS2 request: Fraunces (display) + Inter (body/UI) + JetBrains Mono (technical strings). (IDENT-04)
6. **No `#000` background, no pure black anywhere.** Dark surface floor is `oklch(15% ...)` ≈ `#1a1814`. (IDENT-05, PITFALLS #6)
7. **Header height single source of truth:** `--header-h: 4rem` → reused by `scroll-padding-top` and `scroll-margin-top`. (CHASSIS-02, PITFALLS #8)
8. **CSS-only burger menu** via `:has()` + hidden checkbox; close-on-link-tap fires before scroll via one ~5-line delegated listener (CHASSIS-03, PITFALLS #8).
9. **IIFE-wrapped JS** with no globals leaking to `window`. No inline `onclick=""`, no inline event handlers, ever. (ARCHITECTURE anti-pattern #1)
10. **Reserved V2 surface:** `<section id="outils" hidden>` + matching `<li hidden>` nav entry — flipping V2 live = removing two `hidden` attributes. (CHASSIS-08)
11. **Print stylesheet is part of the chassis**, not an afterthought (CHASSIS-06).
12. **`prefers-reduced-motion: reduce`** disables smooth-scroll + transitions, baked into reset layer from commit #1 (CHASSIS-09).
13. **Deploy pipeline is untouched.** `.github/workflows/deploy.yml` is read-only for the life of this project. Every change ships via `git push origin main`.

---

## What Phase 1 deliberately does NOT ship

These are explicitly out-of-scope for Phase 1 even though they appear in the wider research:

- **Content** in Accueil / Découverte / Biblio sections beyond placeholder labels. Section bodies contain `En cours de constitution — première publication prévue [Phase 2 / Phase 3].`
- **Phase 3 data structures** (`BIBLIO_CATEGORIES`, `BIBLIO`, `renderCard`) — Phase 3 owns these.
- **Phase 2 prose** (1-minute pitch, programme par année, RNCP blocs, métiers, mini-TOC) — Phase 2 owns these.
- **`@starting-style` entrance animations** — zero entrance-animation CSS ships in Phase 1, not even commented-out (per UI-checker recommendation #3). Reserved `.toc` CSS for Phase 2 consumer is fine.
- **Light-mode toggle UI** — `light-dark()` makes light "free" via OS preference, but no in-page toggle button exists in V1.
- **localStorage state, theme persistence, scrollspy beyond active-nav** — all V2.

---

## Definition of done for Phase 1 (the gate to Phase 2)

The owner can perform all of these without Claude's help, and every one passes:

1. Open `https://mes-apps-claude.vercel.app/qhse-cesi/` on **phone** — page renders with warm-dark editorial identity (cream text on dim-paper background, brass accent, serif headlines). Burger icon visible. Tap burger → menu opens. Tap "Découverte" → menu closes synchronously, page scrolls to `#decouverte`, the h2 lands cleanly below the sticky nav (not under it).
2. Open the same URL on **desktop** — horizontal nav visible, no burger. Click each nav item → smooth scroll, the h2 lands below the sticky bar.
3. Open `https://mes-apps-claude.vercel.app/` on the same device — the **existing QHSE Trainer** loads unchanged (industrial-terminal aesthetic with Bebas Neue + lime). The two apps feel like different products.
4. Press **Tab** from a cold page load — the first focusable thing is the "Aller au contenu principal" skip-link, fully visible with a brass-bordered pill. Press Enter — focus moves into `<main>`.
5. Press **Ctrl+P** (or "Print" on mobile) — print preview shows the page with nav and skip-link hidden, external links expanded as footnotes in monospace, body in black on white.
6. Run **Chrome Lighthouse** on the live URL — Accessibility ≥ 95, no critical errors. Run **axe DevTools** — zero critical issues.
7. View source (Ctrl+U) — confirm the page is a single `index.html` with inline `<style>` and `<script>`; no `<script src="...">` other than Google Fonts `<link>`s; no inline `onclick=""` anywhere; every external `<a>` has `target="_blank" rel="noopener noreferrer"`.

All seven boxes ticked → Phase 1 is shipped → `/gsd-transition` moves the project to Phase 2.

---

*Skeleton documented: 2026-05-11*
*Owner gate (visual identity) signed off: 2026-05-11 (UI-SPEC.md status: approved)*
