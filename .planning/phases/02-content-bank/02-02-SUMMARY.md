---
phase: 02-content-bank
plan: 02
subsystem: content-bank
tags: [outils-data, window.BANK, iso-45001, iso-9001, iso-14001, batch-B, wikipedia-fr]
dependency_graph:
  requires: [02-01]
  provides: [iso-45001 18 items, iso-9001 14 items, iso-14001 14 items, window.BANK 82 items]
  affects: [02-03, 02-04, 02-05, 02-06, 02-07, phase-03, phase-04, phase-05]
tech_stack:
  added: []
  patterns: [Wikipedia FR as free authoritative ISO source, HLS §4-§10 clause refs, OHSAS-vs-ISO 45001 distractor strategy]
key_files:
  created: []
  modified:
    - qhse-cesi/outils-data.js
decisions:
  - "All three ISO source.url values use Wikipedia FR (fr.wikipedia.org/wiki/ISO_*) — human-approved at checkpoint 2026-05-19"
  - "iso-45001 source swapped from Pollutec learnandconnect to Wikipedia FR per human checkpoint correction (OHSAS 18001 coverage requirement)"
  - "No norm sub-field added — theme slug carries the norm identity per D-02"
  - "source.verified set to 2026-05-20 (authoring date) for all 46 items"
metrics:
  duration: "~35 minutes"
  completed: "2026-05-20"
  tasks_completed: 1
  files_changed: 1
---

# Phase 2 Plan 02: Batch B — ISO 45001 / ISO 9001 / ISO 14001 Summary

**One-liner:** 46 ISO items appended (iso-45001:18 + iso-9001:14 + iso-14001:14) on human-approved Wikipedia FR sources, BANK.length=82, exam-critical facts cross-checked (OHSAS 18001 predecessor, 7 principles, HLS §4–§10, §5.4/§6.1.2, March 2018 publication).

---

## Tasks Completed

| Task | Name | Status | Commit |
|------|------|--------|--------|
| 1 | Scout and curl-pre-screen free authoritative ISO source pages | DONE | aed4826 (Wave 1) |
| 2 | Human-verify ISO free source URLs (CHECKPOINT) | DONE | resolved out-of-band — sources approved 2026-05-19 |
| 3 | Author Batch B — iso-45001 (18) + iso-9001 (14) + iso-14001 (14), verify and commit | DONE | 389eab2 |

---

## Pre-Append Verification (State Check)

Before authoring Batch B, prior state was verified:

- Commit `aed4826` confirmed present in `git log`
- `node verify-bank.cjs duerp:18 principes-generaux:18` → EXIT 0, BANK.length=36, ALL ASSERTIONS PASSED
- `qhse-cesi/outils-data.js` Batch A intact (36 items)

---

## Human-Confirmed ISO Source URLs

| Theme | URL | Approved |
|-------|-----|---------|
| `iso-45001` | `https://fr.wikipedia.org/wiki/ISO_45001` | 2026-05-19 (human-verified at checkpoint) |
| `iso-9001` | `https://fr.wikipedia.org/wiki/ISO_9001` | 2026-05-19 (human-verified at checkpoint) |
| `iso-14001` | `https://fr.wikipedia.org/wiki/ISO_14001` | 2026-05-19 (human-verified at checkpoint) |

**Note:** The iso-45001 source was corrected at the human-verify checkpoint from the originally-scouted `learnandconnect.pollutec.com` URL to `fr.wikipedia.org/wiki/ISO_45001`. The Wikipedia FR ISO 45001 page explicitly covers OHSAS 18001 as the predecessor norm — required for the exam-critical distractor "OHSAS 18001 vs ISO 18001". The Pollutec page lacked OHSAS 18001 coverage.

All three URLs are server-rendered Wikipedia FR pages with:
- HTTP 200, non-empty on-topic titles
- No soft-404 markers
- Substantial body sizes (118–151 KB)
- Content-verified for ISO clauses, principles, and dates

---

## Batch B Item Breakdown

| Theme | Flashcards | QCMs | Total |
|-------|-----------|------|-------|
| `iso-45001` | 10 | 8 | 18 |
| `iso-9001` | 8 | 6 | 14 |
| `iso-14001` | 8 | 6 | 14 |
| **Batch B Total** | **26** | **20** | **46** |

**Running total after Batch B:** 82 items (36 Batch A + 46 Batch B)

---

## Exam-Critical Facts Cross-Checked

All verified against the approved Wikipedia FR pages before authoring:

| Fact | Verified Value | Common Trap |
|------|---------------|-------------|
| ISO 45001 predecessor | OHSAS 18001 (BSI) | "ISO 18001" — does not exist |
| ISO 45001 publication date | March 2018 | 2015 (ISO 9001/14001 year) |
| ISO 45001 §5.4 | Consultation et participation des travailleurs | §5.1 Leadership |
| ISO 45001 §6.1.2 | Identification des dangers et évaluation des risques SST | §5.4 participation |
| ISO 9001:2015 principles count | 7 | 8 (ISO 9001:2000/2008) |
| ISO 9001:2015 HLS | §4–§10 | None |
| ISO 14001 aspects/impacts | aspect = cause, impact = effect | synonym confusion |
| ISO 14001:2015 §6.1.3 | Obligations de conformité (légales + volontaires) | légales uniquement |
| HLS shared by | ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 | OHSAS 18001 (not HLS) |

---

## Schema Compliance

- All 46 items: `id`, `type`, `theme`, `question`, `answer`, `explanation`, `source{authority, ref, url, verified}`, `difficulty` present and non-empty
- QCM items: `choices` (4 options each) + `correct` (valid 0-based index)
- Zero `legifrance` in any `source.url` (D-07 enforced)
- Zero `iso.org/standard`, `boutique.afnor.org`, `shop.bsigroup.com` in any URL
- No `norm` sub-field added (D-02 — theme slug carries the norm identity)
- `source.authority`: 'Wikipédia FR' for all 46 items
- `source.ref` format: `ISO 45001:2018 §X.Y.Z — description` pattern
- `difficulty`: mix of 1, 2, 3 per D-13 rubric (no fixed distribution)

---

## Verify-Bank Gate Result (Post-Append)

```
BANK.length = 82
PASS: theme "iso-45001" has 18 items (>= 18)
PASS: theme "iso-9001" has 14 items (>= 14)
PASS: theme "iso-14001" has 14 items (>= 14)
PASS: theme "duerp" has 18 items (>= 18)
PASS: theme "principes-generaux" has 18 items (>= 18)
ALL ASSERTIONS PASSED.
```

Exit 0. All assertions passed.

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Missing trailing comma after last Batch A item**
- **Found during:** Task 3, after first verify-bank run
- **Issue:** The edit that appended Batch B content left the last Batch A item (`principes-generaux-qcm-008`) without a trailing comma before the new `iso-45001` block, causing a JS syntax error (`SyntaxError: Unexpected token '{'` at line 718)
- **Fix:** Added the missing comma: `difficulty: 3\n  },` on the item at line 708
- **Files modified:** `qhse-cesi/outils-data.js`
- **Commit:** Included in 389eab2 (no separate commit — fix was pre-commit)

### Source Swap (Checkpoint Resolution)

**iso-45001 source corrected at human-verify checkpoint:**
- Originally scouted: `https://learnandconnect.pollutec.com/iso-45001-sante-securite-travail/` (Pollutec)
- Approved replacement: `https://fr.wikipedia.org/wiki/ISO_45001` (Wikipedia FR)
- Reason: Wikipedia FR ISO 45001 explicitly covers OHSAS 18001 as predecessor (17× OHSAS in body) — exam-critical for the "OHSAS 18001 vs ISO 18001" distractor strategy. Pollutec page had 0 OHSAS 18001 hits. Editorial consistency with iso-9001/iso-14001 sources (all Wikipedia FR).
- Impact: All iso-45001 items cite `https://fr.wikipedia.org/wiki/ISO_45001` — no items cite Pollutec.

---

## Surfaced Source Gaps (D-09)

None. All three ISO themes resolved with human-approved free sources. Zero items dropped.

---

## Known Stubs

None. This is a data-only plan. All 46 items are fully authored with real content, sources, and exam-grade explanations. No placeholder text.

---

## Threat Flags

None. All 46 Batch B `source.url` values are free Wikipedia FR pages. No paywalled links, no `iso.org/standard`, no `boutique.afnor.org`, no `media.html?refINRS=` patterns, no `legifrance` in `source.url`, no hosted PDFs.

---

## Self-Check: PASSED

Files exist:
- `qhse-cesi/outils-data.js` — FOUND (82 items)

Commits exist:
- `aed4826` — FOUND (Task 1: ISO scouting note)
- `389eab2` — FOUND (Task 3: 46 ISO items)

Verify-bank result: EXIT 0, BANK.length=82, ALL ASSERTIONS PASSED

Push status: `389eab2` pushed to `origin/main` — confirmed
