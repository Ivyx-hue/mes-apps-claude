---
phase: 02-content-bank
plan: 01
subsystem: content-bank
tags: [outils-data, window.BANK, duerp, principes-generaux, batch-A, shell-05]
dependency_graph:
  requires: [01-02]
  provides: [window.BANK global, outils-data.js file contract, verify-bank.cjs gate]
  affects: [02-02, 02-03, 02-04, 02-05, 02-06, 02-07, phase-03, phase-04, phase-05]
tech_stack:
  added: [outils-data.js plain ES5 global array]
  patterns: [window.BANK global contract, script-src wiring, verify-bank.cjs gate]
key_files:
  created:
    - qhse-cesi/outils-data.js
    - .planning/phases/02-content-bank/verify-bank.cjs
  modified:
    - qhse-cesi/outils.html
decisions:
  - "window.BANK = [...] at top level (no IIFE) — browser-console-evaluable global per PATTERNS.md"
  - "Script tag inserted synchronously before </head> so BANK is available before tab IIFE runs"
  - "All 36 Batch A items use two INRS demarche/ URLs (not media.html?refINRS=) to satisfy D-09"
  - "Légifrance deep-links in explanation prose only, zero in source.url (D-07 enforced)"
metrics:
  duration: "~45 minutes"
  completed: "2026-05-19"
  tasks_completed: 3
  files_changed: 3
---

# Phase 2 Plan 01: Scaffold outils-data.js + Wire outils.html + Batch A Summary

**One-liner:** window.BANK global contract established, SHELL-05 wiring closed, Batch A (36 items: duerp 18 + principes-generaux 18) authored and content-verified via INRS demarche/ pages.

---

## Tasks Completed

| Task | Name | Status | Commit |
|------|------|--------|--------|
| 1 | Create outils-data.js + wire outils.html | DONE | 3d49cbf |
| 2 | Author Batch A — duerp (18) + principes-generaux (18) | DONE | 3d49cbf |
| 3 | Create verify-bank.cjs + atomic commit + push | DONE | 3d49cbf |

---

## Deliverables

### `qhse-cesi/outils-data.js`
- Header comment block per PATTERNS.md spec
- `window.BANK = [` at top level (no IIFE — browser-console-evaluable)
- 36 schema-compliant items (18 duerp + 18 principes-generaux)
- Closes with `]; // end window.BANK` and `// Total items: 36 — verified 2026-05-19`

### `qhse-cesi/outils.html`
- Single added line: `  <script src="outils-data.js"></script>` after `<link rel="stylesheet" href="chassis.css">`
- Zero other changes — tab IIFE untouched
- SHELL-05 deferred clause structurally closed

### `.planning/phases/02-content-bank/verify-bank.cjs`
- Node CommonJS gate script
- Validates: 15-slug theme closed set, required fields, difficulty in {1,2,3}, QCM choices+correct, source completeness, zero legifrance in source.url
- Accepts `theme:count` CLI args for per-theme minimum assertions
- Exits 0 on all-pass, exits 1 with descriptive message on first failure
- Reusable by batch plans 02-02..02-06 and integration plan 02-07

---

## Batch A: Verified Source URLs

| URL | Checked | Title | Body Size | Pass? |
|-----|---------|-------|-----------|-------|
| `https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html` | 2026-05-19 | "Document unique d'évaluation des risques… INRS" | 72 539 bytes | PASS |
| `https://www.inrs.fr/demarche/evaluation-risques-professionnels/ce-qu-il-faut-retenir.html` | 2026-05-19 | "Évaluation des risques professionnels… INRS" | 62 304 bytes | PASS |
| `https://www.inrs.fr/demarche/principes-generaux/Principes-generaux-prevention.html` | 2026-05-19 | "Principes généraux de la démarche de prévention… INRS" | 61 020 bytes | PASS |

Verification method: `curl -sS -L --max-time 14 -A "Mozilla/5.0..."` + `<title>` extraction + soft-404 grep (no hits). All three URLs returned HTTP 200, non-generic titles matching item topics, no soft-404 markers. Legifrance deep-links (LEGIARTI000023795562 for R4121-1, LEGIARTI000033019913 for L4121-2) placed in `explanation` prose only as per D-07.

---

## Batch A Item Breakdown

| Theme | Flashcards | QCMs | Total |
|-------|-----------|------|-------|
| `duerp` | 10 | 8 | 18 |
| `principes-generaux` | 10 | 8 | 18 |
| **Total** | **20** | **16** | **36** |

**Article references used (cross-checked against RESEARCH §Domain Accuracy Anchors):**
- `Art. R4121-1` — DUERP obligation (correctly not L4121-1 or L4121-3)
- `Art. L4121-1` — obligation générale de sécurité
- `Art. L4121-2` — 9 principes généraux (correctly not L4121-1)
- `Art. L4121-3` — mise à jour DUERP
- `Art. L4121-3-1` — Papripact obligatoire ≥ 50 salariés
- `Art. R4741-1` — sanction contravention 5e classe
- Conservation DUERP: 40 ans (not 5 or 10 — exam trap avoided)
- Principes généraux: 9 items in exact L4121-2 order (1-Éviter through 9-Instructions)

**QCM distractor strategy (D-12):** All distractors are real-domain confusions:
- Adjacent article numbers (L4121-1 vs L4121-2 vs R4121-1 vs L4121-3)
- Wrong conservation durations (5 ans, 10 ans)
- Swapped principle positions (2e vs 3e vs 4e vs 5e)
- Wrong threshold values (11 vs 50 vs 100 salariés)

---

## SHELL-05 Deferred Clause: CLOSED

The `<script src="outils-data.js">` wiring clause from SHELL-05 is now closed. Confirmed by:
```
git diff qhse-cesi/outils.html @ commit 3d49cbf
+  <script src="outils-data.js"></script>
```
Exactly one added line, zero other changes.

---

## Deviations from Plan

None. Plan executed exactly as written.

- Task 1: `outils-data.js` scaffold + `outils.html` wiring — executed per spec
- Task 2: 36 items authored, all source URLs content-verified via curl protocol
- Task 3: `verify-bank.cjs` created, green for `duerp:18 principes-generaux:18`, committed atomically and pushed

---

## Surfaced Source Gaps (D-09)

None. All Batch A items use pre-vetted `[CV]` INRS demarche/ URLs from RESEARCH §Authority-Backbone URL Scouting. No items were dropped or deferred.

---

## Threat Flags

None. All Batch A `source.url` values are free INRS pedagogical pages. No paywalled links, no `media.html?refINRS=` patterns, no Légifrance in `source.url`, no hosted PDFs.

---

## Known Stubs

None. This plan is a data-only plan (no UI rendering). The `window.BANK` array is fully populated with 36 real items. Phase 3 (Flashcards/SM-2) will render these items; no placeholder data was introduced.

---

## Self-Check: PASSED

Files exist:
- `qhse-cesi/outils-data.js` — FOUND
- `qhse-cesi/outils.html` (contains `outils-data.js`) — FOUND
- `.planning/phases/02-content-bank/verify-bank.cjs` — FOUND

Commit exists: `3d49cbf` — FOUND (pushed to main, branch up to date with origin)

Verifier result: `node verify-bank.cjs duerp:18 principes-generaux:18` — EXIT 0, ALL ASSERTIONS PASSED
