# Phase 1: Shell & Gateway - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-16
**Phase:** 1-shell-gateway
**Areas discussed:** chassis.css extraction, outils.html tab mechanism, #outils gateway content
**Areas offered but not selected:** Navigation model (captured as Claude's Discretion)

---

## chassis.css extraction

| Option | Description | Selected |
|--------|-------------|----------|
| Bloc entier verbatim | Cut lines 15–640 byte-identical into chassis.css; both pages `<link>` it; unused page-specific CSS on outils.html = harmless dead CSS. Spec-conformant, SHELL-04 safe. | ✓ |
| Séparer partagé vs spécifique | chassis.css = shared tokens/components; page-specific CSS stays inline in index.html. Cleaner/lighter but classification risk → v1.0 regression (SHELL-04 forbids). | |

**User's choice:** Bloc entier verbatim
**Notes:** Zero-regression on v1.0 is the deciding factor — a verbatim move makes visual drift provably impossible. Single decision for this area; spec covers the rest.

---

## outils.html tab mechanism

| Option | Description | Selected |
|--------|-------------|----------|
| JS vanilla minimal + ARIA | ~15-20 lines: role=tablist/tab/tabpanel, arrow-key nav, `[hidden]` toggle, `location.hash` sync. Consistent with outils.html being a JS app (P3-P5); integrates with PERSIST-01 restore. | ✓ |
| CSS-only (radio:checked) | Zero JS for switching, same pattern as v1.0 burger. But ARIA-correct tabs hard in pure CSS; P3-P5 add JS anyway → split-brain. | |

**User's choice:** JS vanilla minimal + ARIA

| Option (empty-state) | Description | Selected |
|--------|-------------|----------|
| Placeholder daté par onglet | Each empty panel shows e.g. "Mode Flashcards — arrive en Phase 3". Self-explanatory, owner-verifiable. | ✓ |
| Onglet vide nu | Tabs present, panels empty/no text. More minimal but P1 deploy looks broken at owner-verify. | |

**User's choice:** Placeholder daté par onglet
**Notes:** Deliberate, scoped departure from the v1.0 CSS-only philosophy — applies to outils.html only; Hub burger/scrollspy stay CSS-only.

---

## #outils gateway content

| Option | Description | Selected |
|--------|-------------|----------|
| Paragraphe + mini-liste 4 modes + lien primaire | Short editorial paragraph + 4-mode list + primary link to outils.html, same tab. Consistent with Découverte/Biblio tone. | ✓ |
| Téaser 1 ligne + bouton | One-line hook + button to outils.html. Minimal, faster, but doesn't present the 4 modes in the Hub. | |

**User's choice:** Paragraphe + mini-liste 4 modes + lien primaire
**Notes:** Link opens same tab — internal Hub navigation; the v1.0 `target="_blank"` rule is for external links only. Un-hide the two `hidden` attributes (nav l.674 + section l.793) — the only structural edits to frozen index.html besides the chassis `<link>` swap.

---

## Claude's Discretion

- **Navigation model** (offered as a gray area, not selected): keep the existing in-page hash-anchor pattern — nav "Outils" stays `href="#outils"`, scrolls to the `#outils` section, section contains the primary link to `outils.html`. Cross-document view transitions = optional progressive enhancement, not required for P1.
- Exact placeholder wording, ARIA label strings, gateway paragraph copy — within the decided tone/structure.
- Whether tab JS is inline in `outils.html` or a tiny separate file (no build step either way; `outils-data.js` is reserved for the P2 content bank, not shell JS).

## Deferred Ideas

- Cross-document view transitions between Hub and `outils.html` — optional polish, not P1.
- All study-mode behavior (flashcards, SM-2, QCM, timed tests, fiches, localStorage) — Phases 3–5.
- 200+ sourced content bank (`outils-data.js`) — Phase 2.

(None are scope creep — all are explicitly later phases in the locked roadmap.)
