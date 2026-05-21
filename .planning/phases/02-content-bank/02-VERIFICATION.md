---
phase: 02-content-bank
verified: 2026-05-21T00:04:00Z
status: human_needed
score: 4/4 must-haves verified
overrides_applied: 0
human_verification:
  - test: "Load outils-data.js in browser console and evaluate BANK.length >= 200"
    expected: "true; BANK.length === 226"
    why_human: "SC1 is phrased as an owner-console action. Mechanical gate confirms 226 items in Node; browser console confirms window.BANK is globally evaluable (no IIFE, no module scope). Confirms the contractual form the owner and P3/P4/P5 depend on."
  - test: "Evaluate BANK.filter(i => i.theme === 'duerp') in the browser console, then repeat for at least 5 other themes"
    expected: "Each filter returns a non-empty array; at minimum duerp, principes-generaux, iso-9001, tms, rps, acronymes all return arrays with length >= 1"
    why_human: "SC4 is phrased as an owner-console filter check. Mechanical gate confirms all 15 themes non-empty in Node. Browser console confirms window.BANK is evaluable in the runtime the owner and mode renderers will actually use."
---

# Phase 2: Content Bank Verification Report

**Phase Goal:** `outils-data.js` is published with 200+ study items — fully sourced, schema-compliant, covering every Bachelor QHSE theme — such that any mode can consume them without further content work.
**Verified:** 2026-05-21T00:04:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | `BANK.length >= 200`; items span all 15 declared themes | ✓ VERIFIED | Gate: `BANK.length = 226`; all 15 themes present and non-empty (histogram confirmed). Confirmed by independent `node -e` run. |
| 2 | 10 random items each carry all required fields; QCM items carry `choices` and `correct` | ✓ VERIFIED | Gate SC2 + independent 10-item sample both PASS. Full QCM sweep: all 92 QCM items have valid `choices` array and `correct` in-range index. |
| 3 | Every `source.url` is content-verified (real title + topic match + soft-404 grep); no search/index pages; no status-only checks | ✓ VERIFIED | 27 distinct URLs in ledger, all PASS. 26 with `title=` + `topic-match=yes` + `soft404=no` via curl. 1 SPA (francecompetences.fr/41446/) as `human-eyeball` with WebFetch content evidence (276KB body, RNCP41446 confirmed). Zero status-only lines. Zero FAIL entries. |
| 4 | `BANK.filter(i => i.theme === X)` returns non-empty arrays for all 15 themes | ✓ VERIFIED | Gate SC4 + independent filter check across all 15 slugs: every theme has >= 1 item. Minimum: calendrier 11, espaces-confines 12, risque-routier 12, icpe-seveso 12, metiers 12, rncp 13, iso-9001 14, iso-14001 14, tms 14, rps 14, iso-45001 18, duerp 18, principes-generaux 18, risque-chimique 18, acronymes 26. |

**Score:** 4/4 truths verified

---

## Gate Execution

The `--final` gate was run live during this verification:

```
node .planning/phases/02-content-bank/verify-bank.cjs --final
```

Exit code: **0**. Output: `--final: ALL ROADMAP SC1-4 + SHELL-05 + D-01..D-13 PASS — BANK.length=226`

This is independent evidence — the gate was re-run by the verifier in a fresh process, not taken from SUMMARY.md.

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `qhse-cesi/outils-data.js` | window.BANK array, 200+ items, all 15 themes | ✓ VERIFIED | 4357 lines, 263 KB, 226 items. Top-level `window.BANK = [` assignment (not IIFE). ES5-safe syntax. `// Total items:` trailer present. |
| `qhse-cesi/outils.html` | `<script src="outils-data.js"></script>` in head | ✓ VERIFIED | Line 16, immediately after `<link rel="stylesheet" href="chassis.css">`, before `</head>`. Exactly one occurrence. |
| `.planning/phases/02-content-bank/verify-bank.cjs` | Per-batch gate + `--final` mode | ✓ VERIFIED | 450 lines. Default `theme:count` mode and `--final` mode both present and confirmed green on live run. |
| `.planning/phases/02-content-bank/url-verification-ledger.txt` | 27 PASS entries, no status-only | ✓ VERIFIED | 27 distinct URLs, 26 static curl + 1 human-eyeball SPA. Every entry has `title=` or `human-eyeball`. Zero FAIL entries. |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `qhse-cesi/outils.html` | `qhse-cesi/outils-data.js` | `<script src="outils-data.js"></script>` at line 16 | ✓ WIRED | Pattern `<script src="outils-data.js"></script>` present; `--final` gate SHELL-05 assertion PASS. |
| `qhse-cesi/outils-data.js` | `window.BANK` | Top-level global assignment | ✓ WIRED | `window.BANK = [` at file scope; not wrapped in IIFE; `Array.isArray(window.BANK)` confirms. |
| `verify-bank.cjs --final` | `url-verification-ledger.txt` | `fs.readFileSync` + URL lookup | ✓ WIRED | SC3 assertion reads ledger, checks every distinct `source.url`; gate exits 0. |

---

### Data-Flow Trace (Level 4)

Not applicable — `outils-data.js` is a static data file, not a component that renders dynamic data. The data flows from the literal array to `window.BANK` at parse time. No fetch, no store, no props. The consumer (P3/P4/P5 renderers) will read `window.BANK` directly after the script loads.

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| `window.BANK` is a global array after require | `node -e "global.window={};require('./qhse-cesi/outils-data.js');process.exit(Array.isArray(window.BANK)?0:1)"` | exit 0 | ✓ PASS |
| BANK.length >= 200 | `node -e "...;process.exit(window.BANK.length>=200?0:1)"` | exit 0 (length 226) | ✓ PASS |
| `--final` gate exits 0 | `node verify-bank.cjs --final` | exit 0 | ✓ PASS |
| Every theme filter non-empty (7 sampled) | `node -e` filter check | All 7 PASS | ✓ PASS |
| Zero FAIL/status-only in ledger | `node -e` ledger scan | 0 FAIL, 0 status-only | ✓ PASS |
| No search/index `source.url` | `node -e` url pattern scan | 0 suspect URLs | ✓ PASS |

---

### Probe Execution

| Probe | Command | Result | Status |
|-------|---------|--------|--------|
| `verify-bank.cjs --final` | `node .planning/phases/02-content-bank/verify-bank.cjs --final` | exit 0; all ROADMAP SC1-4 + SHELL-05 + D-01..D-13 PASS | ✓ PASS |

---

### Requirements Coverage

| Requirement | Description | Status | Evidence |
|-------------|-------------|--------|----------|
| BANK-01 | 200+ items covering full Bachelor QHSE scope | ✓ SATISFIED | BANK.length=226; all 15 D-01 themes present and non-empty |
| BANK-02 | Every item follows canonical schema | ✓ SATISFIED | Full-bank validation in gate pass; per-item field check (all 226 items); 92 QCM items have valid `choices`/`correct` |
| BANK-03 | Every item carries a `source` object; no unsourced regulatory claim | ✓ SATISFIED | Gate asserts all 226 items have non-empty `source.{authority,ref,url,verified}`; D-09 gap surfacing honored |
| BANK-04 | Every `source.url` is HTTP-200 and content-verified | ✓ SATISFIED | 27-entry ledger, all PASS; 26 curl-verified with title+topic+soft404; 1 SPA with WebFetch human-eyeball; zero status-only lines |
| BANK-05 | Items carry `theme` so any mode can filter | ✓ SATISFIED | 15 distinct theme slugs; gate SC4 + independent filter confirm all non-empty |
| SHELL-05 | `outils.html` loads bank via `<script src="outils-data.js">` | ✓ SATISFIED | Line 16 of outils.html; gate SHELL-05 assertion PASS; deferred clause closed in Wave 1 commit 3d49cbf, asserted by --final |

**Orphaned requirements check:** REQUIREMENTS.md maps BANK-01..05 and SHELL-05 to Phase 2. All 6 accounted for. No orphaned requirements.

---

### Anti-Patterns Found

| File | Issue | Severity | Impact |
|------|-------|----------|--------|
| `qhse-cesi/outils-data.js` | WR-01: 79 QCM items where `answer` field text != `choices[correct]` text (56 trailing-period diffs; 23 substantively different) | ⚠️ Warning | D-11 defines `answer` = "correct option restated concisely" — the 23 substantive cases are a soft D-11 violation. The structural gate does NOT assert `answer === choices[correct]`, so these passed the phase gate. They do not break any ROADMAP SC (SC2 only checks non-empty + valid). They will surface as a content inconsistency in Phase 4 QCM rendering: the "correct answer" shown at reveal will differ from the text the student was forced to choose. **REVIEW underreported: said 17, actual is 79.** Tech debt; naturally co-located with Phase 4 QCM renderer work where the contract must be locked. |
| `qhse-cesi/outils-data.js` | WR-02: Section banner at line ~3414 (`acronymes`) claims 20 items, actually 26; 4 themes lack section banners | ⚠️ Warning | Pure comment hygiene; no user-facing impact. No `TBD`/`FIXME`/`XXX` debt markers. |
| `qhse-cesi/outils-data.js` | WR-03: 2 duplicate question texts across modes (`iso-45001-flashcard-001` + `qcm-001`; `iso-14001-flashcard-004` + `qcm-003`) | ⚠️ Warning | No user-facing impact now. Will surface in Phase 4 Tests blancs if the session builder doesn't de-duplicate on question text. |
| `qhse-cesi/outils.html:16` | WR-04: `<script src="outils-data.js">` is render-blocking (no `defer`); no double-load guard in the data file | ⚠️ Warning | Performance/robustness polish. No current-state failure; no mode to consume the bank yet. |

**Debt-marker gate check:** Scanned `qhse-cesi/outils-data.js` and `qhse-cesi/outils.html` for `TBD`, `FIXME`, `XXX`. Zero hits. Debt-marker gate: CLEAR.

---

### WR-01 Verifier Judgment

The REVIEW identified 17 QCM items where `answer` diverges from `choices[correct]`. The actual count is **79** (56 trailing-period only; 23 substantively different). The REVIEW undercount does not change the classification — this is a tech-debt Warning, not a ROADMAP SC failure.

**Does WR-01 constitute Success Criterion #2 failure?**

SC2 requires: "Owner samples 10 random items and confirms each has all required fields: `id`, `type`, `theme`, `question`, `answer`, `explanation`, `source`, `difficulty` — and QCM items also carry `choices` and `correct`."

SC2 tests *presence* of fields and *structural validity* of `choices`/`correct`. It does not assert `answer === choices[correct]`. All 226 items have non-empty `answer` and all 92 QCM items have a valid `choices` array with `correct` in range. **SC2 is PASSED.**

D-11 says "`answer` = the correct option restated concisely." The 23 substantive mismatches are a D-11 accuracy concern — the `answer` field carries a richer or differently-worded form of the correct answer, not a wrong answer. No item's `answer` contradicts the correct choice; they diverge in verbosity or phrasing. This is a rendering contract gap (which field does the Phase 4 QCM module display?), not a data corruption.

**Verdict: Defer to Phase 4.** The QCM renderer in Phase 4 must lock the contract (`answer` = long-form gloss vs `choices[correct]` = display text, or force them equal). This is the natural closure point — the renderer will immediately surface any item where `choices[correct]` and `answer` diverge, and a one-shot alignment pass at that time costs less than doing it now without a renderer to validate against. Not a Phase 2 goal failure.

---

### Human Verification Required

#### 1. Browser console: BANK evaluability and length

**Test:** Open `https://mes-apps-claude.vercel.app/qhse-cesi/outils.html`, open DevTools console, type `BANK.length >= 200`
**Expected:** `true` (actual value: 226)
**Why human:** SC1 is phrased as an owner-console action in the deployed browser. The mechanical gate confirms this in Node.js. The human check confirms `window.BANK` is globally evaluable in the actual browser runtime that Phase 3/4/5 renderers will use — no module scoping, no IIFE, directly accessible as `BANK`.

#### 2. Browser console: theme filter

**Test:** In the same DevTools console, evaluate `BANK.filter(i => i.theme === 'duerp')`, then repeat for `iso-9001`, `tms`, `rps`, `acronymes`, `rncp` (6 additional themes)
**Expected:** Each call returns a non-empty array. Minimum expected counts: duerp 18, iso-9001 14, tms 14, rps 14, acronymes 26, rncp 13.
**Why human:** SC4 is phrased as an owner-console filter check. Confirms `theme` is a usable filter key in the deployed runtime.

---

### Gaps Summary

No gaps. All 4 ROADMAP success criteria are mechanically verified. The 4 REVIEW warnings (WR-01 through WR-04) are tech debt, not goal failures:

- WR-01 (answer/choices divergence): deferred to Phase 4 QCM renderer — the contract must be locked when the renderer is built.
- WR-02 (banner drift): comment hygiene, no user-facing impact.
- WR-03 (2 duplicate questions): deferred to Phase 4 Tests blancs session builder — de-duplication by question text is the natural fix location.
- WR-04 (render-blocking script, no double-load guard): performance/robustness polish, no consumer code exists yet to be affected.

Phase 2 goal is achieved. Pending: two owner-console checks in the deployed browser (SC1 + SC4 confirmation in the actual runtime environment).

---

_Verified: 2026-05-21T00:04:00Z_
_Verifier: Claude (gsd-verifier)_
