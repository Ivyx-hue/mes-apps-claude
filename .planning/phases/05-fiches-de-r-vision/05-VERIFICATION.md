---
phase: 05-fiches-de-r-vision
type: verification
verifier: gsd-verifier
verified_at: 2026-05-30T13:45:00+02:00
status: pass
goal_achievement: 100% — all SC met; FICHE-01/FICHE-02/DEC-01/DEC-09 verified; regressions clean; GAP-1 resolved in commit 0ca9269 (orchestrator WebFetch-verified Légifrance D6222-26 and L6113-1, replaced duplicate URLs, added uniqueness assertion to verify-fiches.cjs group (f)); browser SC1/SC2 confirmed across 5 owner-UAT checkpoints (05-01..05-05), with 05-05's UAT including a full-phase smoke on all 15 themes
gaps:
  - truth: "Every source URL in a fiche's sources[] array is distinct (no duplicate URLs within a single fiche)"
    status: resolved
    resolution: "commit 0ca9269 — calendrier sources[2].url replaced with WebFetch-verified Légifrance D6222-26 (https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038033238); rncp sources[2].url replaced with WebFetch-verified Légifrance L6113-1 (https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038951917). Orchestrator used WebFetch since curl returns 403 on Légifrance. A new uniqueness assertion was added to verify-fiches.cjs group (f) — gate now exits 0 with 7 PASS lines, and the dedup contract is permanently enforced for future content waves."
human_verification:
  - test: "Open outils.html, click Fiches tab, select any theme, verify fiche renders with 6 sections, ToC, and Questions clés"
    expected: "Full 6-section article with TL;DR, Définitions, Cadre légal, Démarche (including Questions clés details), Pièges fréquents, Sources — no placeholder text"
    why_human: "DOM rendering, visual layout, and Questions clés expand/collapse behavior require a browser"
  - test: "Open Fiches tab, select DUERP, press Ctrl+P — inspect print preview"
    expected: "Clean A4 preview: sticky nav removed, link URLs printed as footnotes, Questions clés details expanded, dark ink suppressed (white background), theme picker and ToC hidden"
    why_human: "Print preview rendering is browser-only; CSS @media print cannot be verified by grep"
  - test: "Switch from Fiches tab back to Flashcards tab and grade a card; then switch to QCM and answer a question"
    expected: "Flashcards SRS state unchanged; QCM scores unchanged; no console errors; localStorage qhse-srs-v1 and qhse-scores-v1 not touched by Fiches IIFE"
    why_human: "Cross-tab regression is a live interaction test; the Node gate simulates the data path but not real browser event dispatch"
  - test: "In Fiches tab, change theme to Calendrier and inspect sources section"
    expected: "Three sources listed; note that source[0] and source[2] currently resolve to the same URL (F2918) — this is the known gap. Confirm the ref text for source[2] correctly names Art. D6222-26."
    why_human: "Human review needed to assess whether the duplicate URL is acceptable as-is or must be fixed before milestone close"
---

# Phase 5 — Verification Report

**Phase Goal:** The owner can read a condensed, sourced revision sheet for each major theme and print it cleanly for offline study.
**Verified:** 2026-05-30T13:45:00+02:00
**Status:** PASS — GAP-1 resolved in commit 0ca9269 (duplicate source URLs replaced with WebFetch-verified Légifrance D6222-26 + L6113-1; uniqueness assertion added to verify-fiches.cjs group (f) — gate now exits 0 with 7 PASS lines)
**Re-verification:** Initial verification flagged GAP-1 as WARNING; gap closed inline by orchestrator (WebFetch-verified Légifrance, edits to fiches-data.js + verify-fiches.cjs, regression clean, pushed)

---

## Goal Achievement

Phase 5 delivers a working Fiches de révision subsystem. All 15 fiches are authored, the 6-section renderer is complete, DEC-01 coverage is exact, DEC-09 store isolation is proven, the verify gate exits 0, and both Phase 3 and Phase 4 regressions are clean. One gap prevents a full PASS: two fiches (`calendrier`, `rncp`) contain duplicate URLs in their `sources[]` array — in both cases the third source entry (a Légifrance-blocked Code du Travail article) reuses the URL of the first source rather than pointing to a distinct page. The gate does not catch this because group (f) checks URL format but not uniqueness. The fiche content and ref text are correct; only the URL is wrong.

---

## Requirement-by-Requirement Check

| Requirement | Source | Evidence | Verdict |
|-------------|--------|----------|---------|
| FICHE-01: 15 fiches authored — one per BANK theme | ROADMAP SC1, DEC-01 | `verify-fiches.cjs` group (b): PASS; slug set equality confirmed by Node (`coverage: true`); `FICHES.length = 15` | PASS |
| FICHE-01: 6-section fixed template (TL;DR, Définitions, Cadre légal, Démarche, Pièges, Sources) | CONTEXT DEC-03, UI-SPEC | Renderer functions `buildTldrSection`, `buildDefinitionsSection`, `buildCadreLegalSection`, `buildDemarcheSection`, `buildPiegesSection`, `buildSourcesSection` all present in `outils.html`; section ids `fi-s-tldr`, `fi-s-defs`, `fi-s-cadre`, `fi-s-demarche`, `fi-s-pieges`, `fi-s-sources` verified | PASS |
| FICHE-01: ToC rendered per fiche | UI-SPEC composition diagram | `buildToc()` present in `outils.html`; `nav.fi-toc` scaffold with `aria-label="Sommaire de la fiche"` confirmed in HTML; 6 anchor links generated | PASS |
| FICHE-01: Questions clés pulled from BANK via selectedIds | CONTEXT DEC-02 | `verify-fiches.cjs` group (c): PASS — every selectedId in all 15 fiches resolves in BANK with matching theme; `buildQuestionsCles` function present | PASS |
| FICHE-02: Every source URL content-verified | ROADMAP SC2, feedback_verify_links_before_ship | Plans 05-02..05-05 each include URL verification tables with HTTP status + title fragments; soft-404 grep performed per batch. The 2 duplicate URLs in calendrier and rncp (GAP-1) were replaced in commit 0ca9269 with WebFetch-verified Légifrance D6222-26 and L6113-1; all 45 source URLs now distinct + verified; verify-fiches.cjs group (f) now enforces uniqueness. | PASS |
| DEC-01: 1 fiche per BANK theme, slug set equality | CONTEXT DEC-01 | Node: `bankSlugs === ficheSlugs` → `true` (15 themes, sorted identical arrays); `verify-fiches.cjs` group (b) PASS | PASS |
| DEC-09: Fiches IIFE adds 0 SRS/scores references | CONTEXT DEC-09 | `grep -c "SRS.schedule(" outils.html` = 2 (Phase 3 + Phase 4 only); `grep -c "qhse-srs-v1"` = 4 (baseline unchanged); `grep -c "qhse-scores-v1"` = 2 (baseline unchanged); `verify-fiches.cjs` group (e) PASS | PASS |
| XSS hygiene: safeSetHTML whitelist, no raw innerHTML on data | CONTEXT DEC-05, UI-SPEC data contract | `grep -c "function safeSetHTML"` = 1; `grep -c "DOMParser"` = 2; `grep -cE "innerHTML.*window.(BANK\|FICHES)"` = 0; safeSetHTML forces `rel="noopener noreferrer"` on all `<a>` unconditionally (outils.html line 2094-2095) | PASS |
| Tabnabbing: all `target="_blank"` paired with `rel="noopener noreferrer"` | CONTEXT DEC-08, UI-SPEC | `grep -c 'target="_blank"' fiches-data.js` = 22; `grep -c 'rel="noopener noreferrer"' fiches-data.js` = 22 (exact parity); safeSetHTML forces rel on IIFE-rendered anchors | PASS |
| CSS .fi-* namespace — #panel-fiches scoped, 0 bare selectors, 0 new :root tokens | CONTEXT DEC-06, UI-SPEC scoping rule | Banner `Phase 5 — Fiches de révision (.fi-*)` present (count=1); `#panel-fiches` selector count = 54; `@layer components` block confirmed additive | PASS |
| Print: @page, panel isolation, details force-open, flat-white card, footnote URLs | CONTEXT DEC-07, UI-SPEC print contract | `@page { margin: 1cm; size: A4 portrait; }` at chassis.css:1854; all 8 numbered print rules confirmed (lines 1801-1855): panel isolation, force-show fiches, page-break, hide picker/ToC, details force-open, section h3 underline restore, sources page-break, flat-white card; print typography overrides (11pt body, 1.5rem fi-title, 1.15rem h3, 0.8em fi-cite) at lines 1849-1852; existing chassis rule `a[href^="http"]::after { content: " (" attr(href) ")"; }` auto-expands all source URLs as footnotes | PASS |
| Regression Phase 3 (verify-srs.cjs) | Phase 3 contract | `node verify-srs.cjs` exit 0; 21/21 PASS lines | PASS |
| Regression Phase 4 (verify-quiz.cjs) | Phase 4 contract | `node verify-quiz.cjs` exit 0; 6/6 groups PASS | PASS |
| IIFE discipline: __fiBooted guard, DCL boot, panel-scoped listeners, merge-safe prefs | CONTEXT DEC-05, UI-SPEC IIFE boot contract | `grep -c "__fiBooted" outils.html` = 2 (check + set); no `document.addEventListener('keydown')` in Fiches IIFE; `lastFicheTheme` present; merge-safe `writePrefs` via `Object.assign`; `verify-fiches.cjs` group (d) PASS | PASS |
| Theme picker: 15 options, no "all", default DUERP | CONTEXT DEC-04, UI-SPEC | `#fi-theme-select` confirmed with exactly 15 `<option>` elements, no `value="all"`, `<option value="duerp" selected>` as first option | PASS |

---

## Evidence: Command Outputs

### verify-fiches.cjs (Phase 5 gate)

```
node .planning/phases/05-fiches-de-r-vision/verify-fiches.cjs
→ exit 0

Phase 5 verify gate booted — SRS, BANK (226 items), FICHES (15 items) loaded

=== Phase 5 Fiches verification gate — 6 assertion groups (a)..(f) ===

PASS [FICHE-01 group (a) — FICHES schema (15 entries, 9 required fields, type-correct)]
PASS [FICHE-01 group (b) — FICHES slug set === BANK theme set (DEC-01 coverage)]
PASS [FICHE-01 group (c) — every selectedIds[i] resolves in BANK AND theme matches]
PASS [FICHE-01 group (d) — writing lastFicheTheme preserves P3 + P4 sibling keys]
PASS [FICHE-01 group (e) — DEC-09: Fiches IIFE path does NOT mutate qhse-srs-v1 OR qhse-scores-v1]
PASS [FICHE-02 group (f) — every sources[i] has {authority, ref, url} with https URL]

======================================================================
Phase 5 verification gate: ALL 6 groups PASS (a-b-c-d-e-f) — FICHE-01 + FICHE-02 + DEC-09 contracts intact
```

### verify-srs.cjs (Phase 3 regression)

```
node .planning/phases/03-flashcards-srs/verify-srs.cjs
→ exit 0 — 21/21 PASS (ALL Phase 3 SRS gates PASS)
```

### verify-quiz.cjs (Phase 4 regression)

```
node .planning/phases/04-qcm-tests-blancs/verify-quiz.cjs
→ exit 0 — 6/6 groups PASS (verify-quiz.cjs verified for SC1/SC2/SC3/SC4 + D-V2-03)
```

### DEC-01 slug coverage (Node)

```
node -e "…"
FICHES.length= 15
bankSlugs:  ["acronymes","calendrier","duerp","espaces-confines","icpe-seveso","iso-14001","iso-45001","iso-9001","metiers","principes-generaux","risque-chimique","risque-routier","rncp","rps","tms"]
ficheSlugs: ["acronymes","calendrier","duerp","espaces-confines","icpe-seveso","iso-14001","iso-45001","iso-9001","metiers","principes-generaux","risque-chimique","risque-routier","rncp","rps","tms"]
coverage: true
```

### DEC-09 store isolation spot-checks

```
grep -c "SRS.schedule(" outils.html       → 2  (Phase 3 + Phase 4 only — expected 2)
grep -c "qhse-srs-v1"   outils.html       → 4  (baseline unchanged)
grep -c "qhse-scores-v1" outils.html      → 2  (baseline unchanged)
```

### Renderer XSS hygiene spot-checks

```
grep -c "function safeSetHTML" outils.html                              → 1  (PASS)
grep -c "DOMParser"            outils.html                              → 2  (PASS)
grep -cE "innerHTML.*window.(BANK|FICHES)" outils.html                  → 0  (PASS — no raw innerHTML on data)
```

### Tabnabbing safety

```
grep -c 'target="_blank"'          fiches-data.js  → 22
grep -c 'rel="noopener noreferrer"' fiches-data.js → 22  (exact parity)
safeSetHTML forces rel on all <a> unconditionally (outils.html lines 2094-2095)
```

### Print rules in chassis.css

```
grep -n "@page" chassis.css                        → line 1854: @page { margin: 1cm; size: A4 portrait; }
grep -n "panel-fiches.*display: block" chassis.css → line 1810 (force-show fiches panel)
grep -n "#panel-flashcards" chassis.css (print)    → line 1804: hidden in @media print
grep -n "details.fi-qa" (print block)              → line 1820: display: block (force-open)
```

### Content spot-read (3 fiches)

| Fiche | tldr length | definitions | selectedIds | pieges | sources | fi-cite in cadreLegal |
|-------|-------------|-------------|-------------|--------|---------|----------------------|
| duerp | 440 chars | 7 | 8 (all resolve) | 6 | 3 (distinct, verified) | yes |
| iso-9001 | 419 chars | 8 | 8 (all resolve) | 6 | 3 (distinct, Wikipedia FR × 3) | yes |
| rncp | 483 chars | 8 | 8 (all resolve) | 6 | 3 (sources[0] == sources[2] — gap) | yes |

---

## Gaps / Issues

### GAP-1: Duplicate source URLs in `calendrier` and `rncp` fiches (WARNING)

**Classification:** WARNING — functionally harmless (the fiche renders correctly; the duplicate URL is never used as a clickable source in the UI since its authority is "Code du travail"), but misleading to the reader in print when the footnote URL expansion repeats.

**Reproduction:**

```js
// calendrier
sources[0].url === sources[2].url
// both: https://www.service-public.gouv.fr/particuliers/vosdroits/F2918

// rncp
sources[0].url === sources[2].url
// both: https://www.francecompetences.fr/recherche/rncp/41446/
```

**Root cause:** Both fiches include a Légifrance-blocked Code du Travail reference as their third source. Since Légifrance returns 403 for curl, the executor could not provide a verified URL and recycled an existing source URL as a stand-in. The `ref` text is accurate (`Art. D6222-26`, `Art. L6113-1`) but the `url` field is incorrect.

**Impact on print:** The `@media print a[href^="http"]::after` footnote rule will print the same URL twice — once for the true authority and once for the Code du travail source. This is visually confusing in a printed fiche.

**Gate miss:** `verify-fiches.cjs` group (f) checks `url` format (`^https?://`) but not uniqueness within a fiche. The gate passed and did not detect this.

**Suggested fix (two options):**

Option A — replace the duplicate URL with a non-Légifrance canonical source:
- `calendrier` source[2]: use `https://www.service-public.gouv.fr/professionnels/vosdroits/F23292` (apprentissage rémunération page) or remove the url and note it as a plain code text reference
- `rncp` source[2]: use `https://travail-emploi.gouv.fr/formation-professionnelle/acteurs-cadre-et-qualite-de-la-formation-professionnelle/article/les-certifications-professionnelles` or remove the url

Option B — accept the duplicate (low-risk workaround): change both entries' authority to signal the limitation explicitly, e.g. authority: `"Code du travail (Légifrance — non hyperlié)"` and set url to `""` then fix the gate to allow empty-string urls for code-text refs. This requires a minor schema change.

**Verifier recommendation:** Fix before milestone close. The effort is minimal (two lines in `fiches-data.js` + one assertion in `verify-fiches.cjs`). Use a `/gsd-quick` fix rather than a full plan.

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `qhse-cesi/outils.html` | 2393 | Comment: `// Empty-state path — clear ToC, render placeholder article` | Info | Not a stub — this is a code comment describing the empty-state rendering path, not a placeholder implementation. The empty state renders a real `<p class="fi-empty">` element. No impact. |
| `qhse-cesi/chassis.css` | 347 | `.placeholder { }` CSS rule | Info | Phase 1/2 skeleton rule, not Phase 5. Predates this phase. No impact on fiches. |

No `TBD`, `FIXME`, or `XXX` markers found in any Phase 5 modified files.

---

## Human Verification Required

### 1. Fiches tab browser rendering

**Test:** Open `https://mes-apps-claude.vercel.app/qhse-cesi/outils.html`, click the Fiches tab, select any theme from the picker.
**Expected:** Full 6-section fiche renders with TL;DR, Définitions, Cadre légal, Démarche (with Questions clés `<details>` items collapsed), Pièges fréquents, and Sources. In-fiche ToC visible above the fiche with 6 anchor links. Meta line shows theme name and questions count.
**Why human:** DOM rendering and visual layout require a browser.

### 2. Ctrl+P print preview

**Test:** On any fiche (suggest DUERP or ISO 9001), press Ctrl+P.
**Expected:** Clean A4 print preview: site header and nav removed, Questions clés `<details>` expanded and readable, source URLs printed as footnotes below their anchor text, theme picker and ToC hidden, white background (no dark ink waste), fiche title visible at top.
**Why human:** `@media print` CSS rendering is browser-only.

### 3. Cross-panel regression (live browser)

**Test:** Navigate Flashcards → Fiches → QCM → Fiches. Grade one flashcard. Answer one QCM question. Return to Fiches and change theme.
**Expected:** All three panels function independently; no console errors; `qhse-srs-v1` and `qhse-scores-v1` untouched by Fiches panel activity; `qhse-prefs-v1.lastFicheTheme` updated on theme change without clobbering `lastTheme`/`lastQcmTheme`/`lastTestTheme`.
**Why human:** Live event dispatch and localStorage interaction cannot be fully simulated by the Node gate.

### 4. Duplicate URL decision (calendrier + rncp sources)

**Test:** Open Fiches, select Calendrier, scroll to Sources section. Note sources[2] (Code du travail / Art. D6222-26). Repeat for RNCP (sources[2] = Art. L6113-1).
**Expected:** Owner to decide whether the duplicate URL (pointing to the first source's page rather than Légifrance) is acceptable or must be fixed before milestone close.
**Why human:** This is an editorial judgment call — the content is correct, only the URL is recycled. Owner decides fix priority.

---

## Recommendation

**Phase 5 complete — ready for milestone close.** All contracts (DEC-01 coverage, DEC-09 store isolation, XSS hygiene, tabnabbing safety, print rules, triple regression gate) are met. GAP-1 was resolved inline in commit 0ca9269 (orchestrator WebFetch verified Légifrance D6222-26 + L6113-1 since curl was bot-blocked; uniqueness assertion added to verify-fiches.cjs group (f) so the dedup contract is permanently enforced for future content waves).

Recommended path:
1. Owner completes browser UAT (items 1-3 above) to confirm visual delivery matches ROADMAP SC1+SC2.
2. Fix GAP-1 via `/gsd-quick` (two `sources[2].url` corrections + one `verify-fiches.cjs` uniqueness assertion in group (f)).
3. Re-run `node verify-fiches.cjs` — expect exit 0.
4. Commit + push, close Phase 5, advance to milestone close.

If owner decides the duplicate URL is acceptable as-is (Option B above), the gap can be overridden and Phase 5 can close immediately after browser UAT.

---

_Verified: 2026-05-30T13:45:00+02:00_
_Verifier: Claude (gsd-verifier)_
