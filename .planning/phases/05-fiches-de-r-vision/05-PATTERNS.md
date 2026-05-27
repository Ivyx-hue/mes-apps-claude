# Phase 5: Fiches de révision — Pattern Map

**Mapped:** 2026-05-27
**Files analyzed:** 5 (3 EDIT + 2 NEW)
**Analogs found:** 5 / 5 (every file has an exact match in Phases 3–4)

> Phase 5 is **copy-extend-adapt** — every primitive Phase 5 needs already shipped in Phases 1–4. This map points at the exact byte-ranges to mirror.

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `qhse-cesi/chassis.css` (APPEND `.fi-*` block inside `@layer components`) | stylesheet (component namespace) | render | `qhse-cesi/chassis.css:883-1411` (`.qz-*` block) | **exact** — same parent-selector discipline, same tokens, additive only |
| `qhse-cesi/chassis.css` (APPEND inside `@media print`) | stylesheet (print rules) | render | `qhse-cesi/chassis.css:1460-1489` (chassis §7) | **exact** — extends an already-existing block, same `!important` discipline |
| `qhse-cesi/outils.html` (REPLACE `#panel-fiches` placeholder, lines 128-131) | view (DOM scaffold) | request-response | `qhse-cesi/outils.html:133-173` (`#panel-qcm` scaffold) + `175-254` (`#panel-tests` scaffold) | **exact** — same tab-shell child structure, same `data-*` hook discipline |
| `qhse-cesi/outils.html` (APPEND fourth IIFE, after line 1955) | view (event controller) | event-driven | `qhse-cesi/outils.html:911-1375` (QCM IIFE `__qzQcmBooted`) | **exact** — same shell (DCL boot, double-load guard, panel-scoped events, merge-safe writePrefs, source-line builder) |
| `qhse-cesi/outils.html` (lines 16-17: add `<script src="./fiches-data.js" defer></script>`) | wiring (script tag) | load-order | `qhse-cesi/outils.html:16` (`<script src="outils-data.js" defer></script>`) | **exact** — single-line append, same `defer` attribute |
| `qhse-cesi/fiches-data.js` (NEW) | data (static content bank) | load-once | `qhse-cesi/outils-data.js:1-19` (header + idempotent double-load guard) | **exact** — same WR-04 guard pattern, same `window.X = [...]` shape |
| `tools/verify-fiches.cjs` (NEW — or `.planning/phases/05-fiches-de-r-vision/verify-fiches.cjs`) | tool (Node verification gate) | batch | `.planning/phases/04-qcm-tests-blancs/verify-quiz.cjs:1-399` | **exact** — same `global.window` shim, same `pass`/`fail`/`check` helpers, same 6-group structure |

**Note on script wiring location:** CONTEXT.md §`<specifics>` mentions wiring the script tag in `index.html`, but the only consumer is `outils.html` (lines 16-17 already load `outils-data.js` + `srs.js` there). The Fiches IIFE lives in `outils.html`, so `fiches-data.js` MUST be wired into `outils.html`, not `index.html`. RESEARCH.md §Component Responsibilities confirms this. Planner: enforce this correction.

---

## Pattern Assignments

### `qhse-cesi/chassis.css` — APPEND `.fi-*` block (component namespace)

**Analog:** `qhse-cesi/chassis.css:883-1411` (`.qz-*` block, ~528 lines)

**Append location:** Immediately before line 1411 (the closing `}` of `@layer components { }`). Confirmed by Grep: line 1411 is the closing brace of the `@layer components` block, line 1413 starts `@layer utilities`.

**Block-header comment pattern** (mirror at line 883):
```css
      /* ============ Phase 4 — QCM + Tests blancs (.qz-*) ============ */
```
→ Phase 5 equivalent:
```css
      /* ============ Phase 5 — Fiches de révision (.fi-*) ============ */
```

**Parent-selector scoping pattern** (verbatim from lines 886-921):
```css
      /* -- 1. Theme picker (shared by both panels) -- */
      #panel-qcm .qz-theme,
      #panel-tests .qz-theme {
        display: flex;
        gap: var(--space-sm);
        align-items: center;
        margin-block: var(--space-md);
        flex-wrap: wrap;
      }
      #panel-qcm .qz-theme label,
      #panel-tests .qz-theme label {
        font-weight: 500;
        color: var(--ink-2);
      }
      #qz-qcm-theme-select,
      #qz-test-theme-select {
        font: inherit;
        min-height: 44px;            /* WCAG 2.5.5 — 44px touch target */
        background: var(--bg-2);
        color: var(--ink-1);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-sm);
        padding: 0 var(--space-md);
        width: 100%;
      }
      #qz-qcm-theme-select:focus-visible,
      #qz-test-theme-select:focus-visible {
        border-color: var(--accent);
      }
      @media (min-width: 48rem) {
        #qz-qcm-theme-select,
        #qz-test-theme-select {
          min-width: 16rem;
          max-width: 24rem;
          width: auto;
        }
      }
```
→ Phase 5 mirror: `#panel-fiches .fi-theme { … }` + `#fi-theme-select { min-height: 44px; … }` with the **exact** same shape.

**Card surface pattern** (verbatim from lines 923-943) — the `.fi-fiche` article reuses this card treatment:
```css
      /* -- 2. Card -- */
      #panel-qcm .qz-card,
      #panel-tests .qz-card {
        background: var(--bg-2);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        padding: var(--space-md);
        min-height: clamp(20rem, 50vh, 32rem);
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        margin-block: var(--space-md);
      }
      @media (min-width: 48rem) {
        #panel-qcm .qz-card,
        #panel-tests .qz-card {
          padding: var(--space-lg);
          max-width: 48rem;
          margin-inline: auto;
        }
      }
```
→ Phase 5: `#panel-fiches .fi-fiche { background: var(--bg-2); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); … max-width: 48rem; margin-inline: auto; }` per UI-SPEC §Layout lines 321-326. **Drop `min-height`** — fiche content is variable and a fixed min-height fights the print contract.

**Inline error / empty state pattern** (verbatim from lines 1403-1410):
```css
      /* -- 13. Inline error / no-pool messages (graceful degradation) -- */
      #panel-qcm .qz-no-pool,
      #panel-qcm .qz-error {
        font-size: var(--step-1);
        color: var(--ink-2);
        line-height: 1.6;
        padding: var(--space-md) 0;
      }
```
→ Phase 5: `#panel-fiches .fi-empty, #panel-fiches .fi-error { … }` — identical rule body.

**Token inventory available** (from lines 32-87, do NOT add any new token):
- Spaces: `--space-xs|sm|md|lg|xl|2xl|3xl`
- Type: `--step--1|0|1|2|3|4|5`
- Colors: `--bg-1`, `--bg-2`, `--ink-1`, `--ink-2`, `--ink-3`, `--accent`, `--accent-soft`, `--link`, `--link-hover`, `--focus-ring`, `--border-subtle`
- Layout: `--header-h: 4rem`, `--container-max: 72rem`, `--measure: 68ch`
- Radius: `--radius-sm|md|lg`
- Fonts: `--font-serif` (Fraunces), `--font-sans` (Inter), `--font-mono` (JetBrains Mono)

**Invariants to preserve:**
- Every selector starts with `#panel-fiches` (parent-selector scoping — never bare `.fi-*`).
- Block appended **inside** the existing `@layer components { }` brace (insert before line 1411).
- Zero new `:root` custom properties.
- Zero `!important` outside the print panel-isolation rules.
- No animations, no transitions.
- 4-space indent (matches lines 883+).

---

### `qhse-cesi/chassis.css` — APPEND inside `@media print`

**Analog:** `qhse-cesi/chassis.css:1460-1489` (chassis §7, the entire existing print block)

**Existing print rules to mirror** (verbatim, lines 1460-1489):
```css
    /* ============ 7. PRINT (@media print) ============ */
    @media print {
      /* Hide chrome */
      header, .skip-link, .nav-toggle, .burger { display: none !important; }
      /* Force light, max-contrast surface */
      :root { color-scheme: light; }
      body {
        background: #fff;
        color: oklch(10% 0 0);
        font-family: var(--font-sans);
      }
      h1, h2, h3 {
        font-family: var(--font-serif);
        color: oklch(10% 0 0);
        page-break-after: avoid;
      }
      /* Expand external (http/https) link URLs as footnotes — NOT internal anchors. */
      a[href^="http"]::after {
        content: " (" attr(href) ")";
        font-family: var(--font-mono);
        font-size: 0.85em;
        color: #444;
        word-break: break-all;
      }
      /* Hide the accent underline on h2 — irrelevant in print. */
      h2::after { display: none; }
      /* Restore measure for prose readability on A4. */
      p, li { max-width: none; }
      section { break-inside: avoid-page; }
    }
```

**Append location:** Immediately before line 1489 (the closing `}` of `@media print { }`). Indent matches existing block (6 spaces inside `@media print`).

**New rules to add** (per UI-SPEC §Print Contract lines 402-455):
1. Hide sibling panels + tablist (lines 406-410 of UI-SPEC).
2. Force-show fiches panel (`#panel-fiches { display: block !important; }`).
3. Per-fiche `page-break-before: always`.
4. Hide `.fi-theme` + `nav.fi-toc` (already partially covered by chassis `nav { display: none }` if it existed; UI-SPEC adds explicit rules).
5. Force `<details>` open + remove triangle (Pitfall 4 fix).
6. Section heading print underline (grayscale-safe).
7. Sources page-break-before.
8. Flat-white fiche card (remove `--bg-2` background + radius + max-width for print).

**Invariants to preserve:**
- Append **inside** the existing `@media print { }` brace.
- Zero modifications to existing print rules (additive only — diff must show 0 deletions).
- Reuse `!important` only where panel-isolation needs to override `[hidden]` attribute (lines 410, 414, 423 of UI-SPEC).
- Do NOT add a new `@page` rule unless verified absent first (RESEARCH §Pitfall: UI-SPEC line 457 leaves this conditional).

**Anti-pattern observed in chassis (DO NOT introduce):** The existing print block uses `oklch(10% 0 0)` (hex equivalent `#181818`-ish) for "near-black text" — Phase 5 reuses this exact value for the section-heading underline (`oklch(30% 0 0)`). Do not introduce `#000` or new hex values.

---

### `qhse-cesi/outils.html` — REPLACE `#panel-fiches` placeholder (lines 128-131)

**Current state** (verbatim, lines 128-131):
```html
      <div role="tabpanel" id="panel-fiches" aria-labelledby="tab-fiches" tabindex="0" hidden>
        <!-- Phase 5 mount point: Fiches de révision imprimables -->
        <p class="placeholder">Ce mode arrive en Phase 5 — fiches de révision synthétiques, optimisées pour l'impression (feuille A4 recto-verso par bloc RNCP). La feuille de style dédiée est déjà incluse dans <code>chassis.css</code>.</p>
      </div>
```

**Analog scaffold patterns to mirror:**

**QCM panel scaffold** (lines 133-173) — closest match for "theme picker + main article":
```html
      <div role="tabpanel" id="panel-qcm" aria-labelledby="tab-qcm" tabindex="0" hidden>
        <h2 class="sr-only">QCM — révision rapide</h2>

        <nav class="qz-theme" aria-label="Choisir un thème">
          <label for="qz-qcm-theme-select">Thème</label>
          <select id="qz-qcm-theme-select" data-qz-qcm-theme>
            <option value="all">Tous les thèmes</option>
            <option value="duerp">DUERP</option>
            … 15 options total …
          </select>
        </nav>

        <article class="qz-card" data-qz-card>
          <h3 id="qz-qcm-question" data-qz-question></h3>
          <div class="qz-choices" role="group" aria-labelledby="qz-qcm-question" data-qz-choices>
            <!-- 4 <button type="button" data-qz-choice data-qz-choice-idx="0..3"> nodes injected by IIFE -->
          </div>
          …
        </article>

        <!-- Phase 4 QCM engine — IIFE appended after Flashcards IIFE; see outils.html#qcm-iife -->
      </div>
```

**Phase 5 scaffold structure** (per UI-SPEC §Composition lines 217-296):
- `<h2 class="sr-only">Fiches de révision</h2>` (mirror line 134 sr-only heading pattern).
- `<nav class="fi-theme" aria-label="Choisir un thème">` with `<label for="fi-theme-select">Thème</label>` + `<select id="fi-theme-select" data-fi-theme>` containing **15 options, NO `all`** (per DEC-01 / UI-SPEC line 168). Mirror the option list from lines 84-100 (Flashcards picker), **dropping the `<option value="all">` line**.
- `<nav class="fi-toc" aria-label="Sommaire de la fiche">` placeholder — actual `<ol>` injected by IIFE.
- `<article class="fi-fiche" data-fi-active-fiche>` placeholder — actual content injected by IIFE on theme change.
- Trailing comment: `<!-- Phase 5 Fiches engine — IIFE appended after Tests blancs IIFE; see outils.html#fiches-iife -->`

**Invariants to preserve:**
- Do NOT remove `role="tabpanel" aria-labelledby="tab-fiches" tabindex="0" hidden` attributes from `<div id="panel-fiches">` (chassis-managed; tab IIFE at lines 268-316 toggles `hidden`).
- Indent matches existing scaffolds (6 spaces for direct children of `#panel-fiches`).
- Use `data-fi-*` namespace (mirrors `data-qz-*` and `data-fc-*` discipline).

---

### `qhse-cesi/outils.html` — APPEND fourth IIFE (after line 1955)

**Analog:** `qhse-cesi/outils.html:911-1375` (QCM IIFE, ~465 lines). The Tests IIFE at lines 1378-1955 is a secondary reference but the QCM IIFE is the closer match (single panel, single render path).

**Pattern P1 — IIFE shell with DCL boot + double-load guard** (verbatim from lines 911-947 + 1370-1375):
```javascript
  <script>
    /* ============ IIFE: QCM révision rapide — auto-reveal click → SRS wrong-feed → Suivant advance ============ */
    /* No globals, no inline on* handlers, no document-level keydown. Phase 4 / Plan 04-02. */
    (() => {
      'use strict';

      // Double-load guard — unique guard name per IIFE (never reuse __fcViewBooted)
      if (window.__qzQcmBooted) return;
      window.__qzQcmBooted = true;

      // Inline scripts execute during HTML parsing — BEFORE deferred external
      // scripts (outils-data.js, srs.js) finish evaluating. Defer the IIFE body
      // until DOMContentLoaded so window.BANK and window.SRS are populated.
      // (Same hotfix pattern as Flashcards IIFE — commit 0553899.)
      function boot() {
      // ----------------------------------------------------------------
      // Pre-flight: require window.BANK and window.SRS before touching DOM
      // ----------------------------------------------------------------
      const panel = document.getElementById('panel-qcm');

      if (!panel) {
        console.warn('[QCM] #panel-qcm not found — cannot boot view.');
        return;
      }

      if (!window.BANK || !Array.isArray(window.BANK) || !window.SRS || typeof window.SRS.schedule !== 'function') {
        // Graceful degradation — render an inline error inside the card
        const card = panel.querySelector('[data-qz-card]');
        if (card) {
          const errEl = document.createElement('p');
          errEl.className = 'qz-error';
          errEl.textContent = 'Impossible de charger la banque de questions. Recharge la page ou vérifie que outils-data.js est bien servi.';
          card.appendChild(errEl);
        }
        console.error('[QCM] BANK or SRS missing — cannot boot view.', { BANK: !!window.BANK, SRS: !!window.SRS });
        return;
      }
      …
      } // end boot()

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot, { once: true });
      } else {
        boot();
      }
    })();
  </script>
```

**Phase 5 adaptation rules:**
- Guard variable: `__fiBooted` (NOT `__qzQcmBooted` — silent no-op trap; not `__fcViewBooted` either).
- Pre-flight checks: `window.BANK` (Array.isArray) **AND** `window.FICHES` (Array.isArray) — Phase 5 reads NEVER from `window.SRS` (DEC-09).
- Error message: `'Impossible de charger les données. Recharge la page ou vérifie que outils-data.js et fiches-data.js sont bien servis.'`
- Comment header line 2: replace "Phase 4 / Plan 04-02" with "Phase 5 / Plan 05-XX".

**Pattern P3 — Source line builder** (verbatim from lines 1226-1248):
```javascript
        // Source line — verbatim port of Flashcards source builder
        // (createElement + textContent only — Pattern S3 / T-04-02-01)
        while (els.sourceEl.childNodes.length > 1) {
          els.sourceEl.removeChild(els.sourceEl.lastChild);
        }
        const src = item.source;
        if (src) {
          els.sourceEl.appendChild(document.createTextNode(src.authority));
          if (src.ref) {
            els.sourceEl.appendChild(document.createTextNode(' — '));
            const codeEl = document.createElement('code');
            codeEl.textContent = src.ref;
            els.sourceEl.appendChild(codeEl);
          }
          if (src.url && src.url.startsWith('http')) {
            els.sourceEl.appendChild(document.createTextNode(' '));
            const a = document.createElement('a');
            a.href = src.url;
            a.textContent = src.url;
            a.rel = 'noopener noreferrer';
            a.target = '_blank';
            els.sourceEl.appendChild(a);
          }
        }
```
→ Phase 5 reuses this **verbatim** for: (a) `.fi-qa-source <p>` inside Questions clés `<details>`, (b) `.fi-sources-list <li>` bibliography entries, (c) `<span class="fi-cite">` inline citations inside `cadreLegal` / `demarche` HTML strings (if HTML-string mode chosen; see Pitfall 6).

**Pattern P4 — Merge-safe writePrefs** (verbatim from lines 969-996):
```javascript
      // QCM IIFE adds lastQcmTheme; Flashcards keys (lastTheme, lastMode,
      // newCardsPerDay) are preserved by the merge-safe writer (Pattern S2).
      const DEFAULT_PREFS = {
        lastQcmTheme: 'all'
      };

      function readPrefs() {
        try {
          const raw = localStorage.getItem('qhse-prefs-v1');
          if (!raw) return Object.assign({}, DEFAULT_PREFS);
          const parsed = JSON.parse(raw);
          return {
            lastQcmTheme: (typeof parsed.lastQcmTheme === 'string') ? parsed.lastQcmTheme : DEFAULT_PREFS.lastQcmTheme
          };
        } catch (e) {
          console.warn('[QCM] readPrefs failed:', e.message);
          return Object.assign({}, DEFAULT_PREFS);
        }
      }

      function writePrefs(partial) {
        try {
          const raw = localStorage.getItem('qhse-prefs-v1');
          const existing = raw ? JSON.parse(raw) : {};
          const merged = Object.assign({}, existing, partial);
          localStorage.setItem('qhse-prefs-v1', JSON.stringify(merged));
        } catch (e) {
          console.warn('[QCM] writePrefs failed:', e.message);
        }
      }
```
→ Phase 5 adaptation:
- `DEFAULT_PREFS = { lastFicheTheme: 'duerp' }` (NOT `'all'` — DEC-01 has no `all` option).
- `readPrefs()` returns `{ lastFicheTheme: (typeof parsed.lastFicheTheme === 'string') ? parsed.lastFicheTheme : DEFAULT_PREFS.lastFicheTheme }`.
- `writePrefs(partial)` body is **byte-identical** (the merge logic is mode-agnostic).
- Log prefix: `[Fiches]`.

**Event wiring pattern** (verbatim from lines 1337-1344):
```javascript
      // ----------------------------------------------------------------
      // Event wiring — panel-scoped only (Pattern S4)
      // NEVER document.addEventListener('keydown', ...) — choices and
      // Suivant are native <button>s; Enter/Space work via browser default.
      // Arrow keys pass through to browser default (D-keyboard discipline).
      // ----------------------------------------------------------------
      els.themeSelect.addEventListener('change', onThemeChange);
      els.choices.addEventListener('click', onChoiceClick);
      els.nextBtn.addEventListener('click', onNextClick);
```
→ Phase 5: only `els.themeSelect.addEventListener('change', onThemeChange)` — Fiches has no choices, no Suivant. ToC anchor links are native `<a href="#fi-s-tldr">`, no JS listener needed (chassis `scroll-behavior: smooth` at line 93 handles smooth scroll).

**XSS-safe theme-select restore pattern** (lines 1349-1358):
```javascript
      const prefs = readPrefs();
      state.theme = prefs.lastQcmTheme || 'all';

      // Restore picker value; if the slug is unknown (theme removed from
      // bank, garbage prefs), the <select> silently falls back to its
      // first option ("Tous les thèmes") — graceful degradation.
      els.themeSelect.value = state.theme;
      if (els.themeSelect.value !== state.theme) {
        state.theme = 'all';
      }
```
→ Phase 5: fall back to `'duerp'` not `'all'` (no `all` in Phase 5; DUERP is the default per UI-SPEC §Copywriting line 169).

**Invariants to preserve:**
- Append IIFE after line 1955 (the closing `})();` of the Tests IIFE). Verify by reading current end-of-file.
- IIFE wrapped in own `<script>` block (one IIFE per `<script>`, mirror lines 911 + 1378 patterns).
- ALL listeners panel-scoped via `panel.querySelector(...)` — NO `document.addEventListener('keydown', …)`.
- ALL bank/fiche content rendered via `createElement` + `textContent` (Pattern S3). Exception: `cadreLegal` / `demarche` HTML strings need a whitelist filter (RESEARCH Pitfall 6 / UI-SPEC line 514).
- DCL gate (lines 1370-1374) is **mandatory** — race condition hotfix from commit 0553899.
- `window.SRS` is NEVER read or called (DEC-09 / D-V2-03 invariant extended).
- `qhse-srs-v1` and `qhse-scores-v1` localStorage keys are NEVER touched (DEC-09).

---

### `qhse-cesi/outils.html` — Add `<script src="./fiches-data.js" defer>` at line 17-18

**Analog:** Lines 15-17:
```html
  <link rel="stylesheet" href="chassis.css">
  <script src="outils-data.js" defer></script>
  <script src="srs.js" defer></script>
```

→ Phase 5 adds line 18:
```html
  <script src="outils-data.js" defer></script>
  <script src="srs.js" defer></script>
  <script src="fiches-data.js" defer></script>
```

**Load order rationale:** `defer` scripts execute in document order after parsing. Order must be:
1. `outils-data.js` → `window.BANK` (required by Fiches IIFE for `selectedIds[]` resolution)
2. `srs.js` → `window.SRS` (read by P3/P4 IIFEs; Phase 5 doesn't touch but the order is set)
3. `fiches-data.js` → `window.FICHES` (required by Fiches IIFE)

The Fiches IIFE's DCL gate (Pattern P1) ensures all three are populated before boot runs.

**Invariants to preserve:**
- `defer` attribute is mandatory (Pitfall 1).
- Relative path `./fiches-data.js` (or `fiches-data.js` to match existing relative form — match `outils-data.js` style: no `./` prefix).
- Single line, 2-space indent (matches lines 16-17).

---

### `qhse-cesi/fiches-data.js` — NEW FILE

**Analog:** `qhse-cesi/outils-data.js:1-19` (header + double-load guard) — same pattern. The body shape comes from UI-SPEC §Data Contract lines 497-512.

**Header + double-load guard** (verbatim from `outils-data.js:1-19`):
```javascript
/* qhse-cesi/outils-data.js
 * Content bank — Phase 2.
 * window.BANK: array of study items (flashcards + QCM) covering the full Bachelor QHSE scope.
 * Schema: { id, type, theme, question, answer, choices?, correct?, explanation, source, difficulty }
 * Consumed by: P3 (Flashcards/SM-2), P4 (QCM/Tests), P5 (Fiches).
 * DO NOT import, require, or bundle — loaded via <script src> in outils.html.
 *
 * WR-04: idempotent double-load guard. If this file is included twice,
 * the first BANK wins — a second load must not silently overwrite any
 * markers/state downstream code attached. window.BANK stays a plain
 * global (no IIFE, no module scope) so it is readable as the bare
 * identifier BANK in the browser console — P3/P4/P5 depend on that.
 */
if (window.BANK && window.BANK.length) {
  if (typeof console !== 'undefined' && console.warn) {
    console.warn('outils-data.js loaded twice — keeping the first BANK');
  }
} else {
window.BANK = [
```
→ Phase 5 mirror:
```javascript
/* qhse-cesi/fiches-data.js
 * Fiches de révision — Phase 5.
 * window.FICHES: array of 15 revision-sheet objects, one per BANK theme (DEC-01).
 * Schema: { slug, title, tldr, definitions[], cadreLegal, demarche, selectedIds[], pieges[], sources[] }
 * Consumed by: P5 Fiches IIFE in outils.html.
 * DO NOT import, require, or bundle — loaded via <script src> in outils.html.
 *
 * WR-04: idempotent double-load guard. Same pattern as outils-data.js:14-18.
 */
if (window.FICHES && window.FICHES.length) {
  if (typeof console !== 'undefined' && console.warn) {
    console.warn('fiches-data.js loaded twice — keeping the first FICHES');
  }
} else {
window.FICHES = [
  …
];
}
```

**Per-fiche object schema** (from UI-SPEC §Data Contract lines 497-512):
```javascript
{
  slug: 'duerp',           // matches BANK theme slug (DEC-01)
  title: 'DUERP',          // French display name (same as theme picker)
  tldr: '',                // 2-3 sentence string
  definitions: [           // array of {term, value} objects
    { term: 'DUERP', value: '…' },
  ],
  cadreLegal: '',          // HTML string of prose with <span class="fi-cite"> citations
  demarche: '',            // HTML string of prose
  selectedIds: [],         // BANK item IDs for Questions clés (5-10 per theme)
  pieges: [],              // array of strings (bullet list items)
  sources: [               // array of {authority, ref, url}
    { authority: 'INRS', ref: 'R4121-1', url: 'https://…' },
  ],
}
```

**BANK item shape reference** (from `outils-data.js:27-41`):
```javascript
{
  id: 'duerp-flashcard-001',
  type: 'flashcard',
  theme: 'duerp',
  question: "…",
  answer: "…",
  explanation: "…",
  source: {
    authority: 'INRS',
    ref: 'Art. R4121-1 Code du travail',
    url: 'https://www.inrs.fr/demarche/document-unique/ce-qu-il-faut-retenir.html',
    verified: '2026-05-19'
  },
  difficulty: 1
}
```
→ `selectedIds[]` items reference these by `id` string (e.g., `'duerp-flashcard-001'`). Cross-reference resolved by `window.BANK.find(b => b.id === id)` in the IIFE.

**Schema invariants** (planner enforces in verify-fiches.cjs):
- `FICHES.length === 15`
- Every `slug` ∈ the 15 BANK theme slugs (no `all`, no novel slugs)
- Every `selectedIds[i]` exists in `window.BANK` AND its `theme === fiche.slug`
- `selectedIds.length` ∈ [5, 10]
- Every `sources[i].url` content-verified before commit (per `feedback_verify_links_before_ship.md`)

---

### `tools/verify-fiches.cjs` — NEW FILE (or `.planning/phases/05-fiches-de-r-vision/verify-fiches.cjs`)

**Analog:** `.planning/phases/04-qcm-tests-blancs/verify-quiz.cjs:1-399` (full file)

**Path consideration:** RESEARCH §Component Responsibilities (line 197) places it at `.planning/phases/05-fiches-de-r-vision/verify-fiches.cjs` to match Phase 4 sibling. The orchestrator's "Expected file scope" suggests `tools/verify-fiches.cjs`. **Planner decides** — both are valid; matching Phase 4's location (`.planning/phases/04-qcm-tests-blancs/verify-quiz.cjs`) keeps cross-phase discipline obvious.

**Header + bootstrap pattern** (verbatim from `verify-quiz.cjs:1-57`):
```javascript
/* verify-quiz.cjs
 * Verification gate for Phase 4 QCM + Tests blancs (qhse-cesi/outils.html IIFEs).
 *
 * USAGE:
 *   node .planning/phases/04-qcm-tests-blancs/verify-quiz.cjs
 *
 * Exit 0 = all 6 assertion groups PASS. Exit 1 = any assertion FAIL.
 *
 * Mirrors .planning/phases/03-flashcards-srs/verify-srs.cjs scaffold (lines 1-65, 269-276).
 * Sibling gate, NOT a replacement — verify-srs.cjs still asserts the Phase 3 SM-2 contract.
 * Node built-ins only: assert, path. No npm deps, no test runner.
 */
'use strict';

const path   = require('path');
const assert = require('assert');

// ----------------------------------------------------------------
// Bootstrap: load srs.js + outils-data.js under Node via global.window shim.
// ----------------------------------------------------------------
const srsPath = path.resolve(__dirname, '../../../qhse-cesi/srs.js');
global.window = {};

try {
  require(srsPath);
} catch (e) {
  console.error('FAIL: could not load srs.js from', srsPath);
  console.error(e.message);
  process.exit(1);
}

const SRS = global.window.SRS;
…

const bankPath = path.resolve(__dirname, '../../../qhse-cesi/outils-data.js');
try {
  require(bankPath);
} catch (e) {
  console.error('FAIL: could not load outils-data.js from', bankPath);
  console.error(e.message);
  process.exit(1);
}

const BANK = global.window.BANK;
…

console.log('outils-data.js loaded OK — BANK.length =', BANK.length);
```
→ Phase 5 adds a third bootstrap step to load `fiches-data.js` via the same `global.window` shim, asserting `FICHES.length === 15`.

**Helper pattern** (verbatim from lines 60-80):
```javascript
let allPassed = true;

function pass(label) {
  console.log('PASS [' + label + ']');
}

function fail(label, reason) {
  console.error('FAIL [' + label + '] ' + reason);
  allPassed = false;
}

function check(label, fn) {
  try {
    fn();
    pass(label);
  } catch (e) {
    fail(label, e.message);
  }
}
```
→ Use **verbatim** in `verify-fiches.cjs`.

**Group (d) merge-safe writePrefs assertion** (verbatim from lines 236-272) — this group already includes `lastFicheTheme` scenario at lines 266-271:
```javascript
check('SC4/PERSIST-01 group (d) — qhse-prefs-v1 merge-safety preserves P3 + Plan 02 keys', () => {
  function writePrefs(existing, partial) {
    return Object.assign({}, existing, partial);
  }

  …

  // Scenario 4: future key (e.g. lastFicheTheme from Phase 5) must coexist with existing keys.
  const withFuture = writePrefs(afterPlan03, { lastFicheTheme: 'rps' });
  assert.strictEqual(withFuture.lastFicheTheme, 'rps');
  assert.strictEqual(withFuture.lastTheme,       'duerp',  'unknown key write must not clobber known keys');
  assert.strictEqual(withFuture.lastQcmTheme,    'iso-9001');
  assert.strictEqual(withFuture.lastTestTheme,   'tms');
});
```
→ Phase 5 verify-fiches.cjs adds the reverse: write `lastFicheTheme` first, then assert `lastTheme`, `lastMode`, `newCardsPerDay`, `lastQcmTheme`, `lastTestTheme` all survive.

**Group (e) D-V2-03 read-only invariant pattern** (verbatim from lines 277-335) — this is the closest pattern to Phase 5's DEC-09 (read-only SRS + scores):
```javascript
check('SC4/D-V2-03 group (e) — Tests blancs path does NOT mutate qhse-srs-v1 (hard invariant)', () => {
  const srsStore = {
    'duerp-flashcard-001':       SRS.schedule(null, 'bien', '2026-05-24'),
    …
  };
  const snapshotBefore = JSON.stringify(srsStore);

  // … simulate the Tests IIFE path (BANK.filter + scoreRow build) …

  const snapshotAfter = JSON.stringify(srsStore);

  // Step 5: THE assertion — byte-equal proves zero mutation.
  assert.strictEqual(snapshotAfter, snapshotBefore,
    'D-V2-03 violated: qhse-srs-v1 was mutated by the Tests blancs simulation. ' +
    'Before: ' + snapshotBefore + '. After: ' + snapshotAfter);
});
```
→ Phase 5 verify-fiches.cjs adapts: simulate Fiches IIFE path (theme change + render fiche + resolve `selectedIds[]`) and assert byte-equality for BOTH `qhse-srs-v1` AND `qhse-scores-v1` snapshots.

**Phase 5 assertion groups (recommended):**
- (a) FICHES schema: `FICHES.length === 15`, every fiche has all 9 required keys, types correct.
- (b) Slug coverage: every `slug` ∈ 15 BANK theme slugs, no duplicates, no `all`.
- (c) `selectedIds[]` cross-reference: every id ∈ BANK AND `BANK[id].theme === fiche.slug`. Length ∈ [5, 10].
- (d) `qhse-prefs-v1` merge-safety: writing `lastFicheTheme` preserves all P3+P4 keys (reverse direction of `verify-quiz.cjs` group (d)).
- (e) DEC-09 read-only invariant: simulated Fiches theme change does NOT mutate `qhse-srs-v1` OR `qhse-scores-v1` snapshots.
- (f) Sources schema: every `sources[i]` has `{authority, ref, url}`, every `url` starts with `https://`.

**Final exit pattern** (verbatim from lines 389-399):
```javascript
console.log('\n' + '='.repeat(70));
if (allPassed) {
  console.log('Phase 4 verification gate: ALL 6 groups PASS …');
  process.exit(0);
} else {
  console.error('Phase 4 verification gate: ONE OR MORE ASSERTIONS FAILED …');
  process.exit(1);
}
```

**Invariants to preserve:**
- Node built-ins only (`assert`, `path`). Zero npm deps.
- `global.window = {}` shim loaded before `require(srsPath)` (lines 22-23) — required because the data files write to `window.X`.
- Mirror the 6-group structure for cross-phase discipline.
- Path-resolve relative to `__dirname` so the gate works from any CWD.

---

## Shared Patterns

### S1 — Parent-scoped CSS namespace
**Source:** `qhse-cesi/chassis.css:886-1410` (every `.qz-*` selector is prefixed `#panel-qcm` or `#panel-tests`)
**Apply to:** Every Phase 5 CSS selector in the `.fi-*` block (must start with `#panel-fiches`).
**Rationale:** Prevents Phase 5 styles from leaking into Flashcards/QCM/Tests panels or future panels. UI-SPEC §Scoping rule line 33 binds this.

### S2 — Merge-safe writePrefs
**Source:** `qhse-cesi/outils.html:987-996` (QCM IIFE)
**Apply to:** Phase 5 Fiches IIFE `writePrefs({ lastFicheTheme })`.
**Rationale:** A naive `setItem` clobbers Phase 3 + Phase 4 sibling keys. `verify-quiz.cjs:266-271` already verifies a Phase 5 `lastFicheTheme` write must not clobber.

### S3 — XSS-safe DOM construction
**Source:** `qhse-cesi/outils.html:1132-1181` (renderQuestion in QCM IIFE) + 1226-1248 (source-line builder)
**Apply to:** ALL Fiches DOM rendering — `tldr`, `definitions[]`, `pieges[]`, `sources[]`, Questions clés answer/explanation/source. Exception: `cadreLegal` / `demarche` HTML strings need a whitelist filter (Pitfall 6).
**Rationale:** Pattern S3 / Pattern T-04-02-01 — `createElement` + `textContent` only. Never `innerHTML` on data-file content.

### S4 — Panel-scoped event listeners (no document keydown)
**Source:** `qhse-cesi/outils.html:1337-1344` (QCM IIFE event wiring comment + 3 listeners)
**Apply to:** Phase 5 Fiches IIFE — listen only on `panel.querySelector(...)` elements.
**Rationale:** Cross-panel keyboard collision (P3/P4 review finding). Native `<select>`, `<details>`, and `<a>` handle keyboard via browser defaults.

### S5 — DCL race-condition hotfix
**Source:** `qhse-cesi/outils.html:903-907` (Flashcards), `1370-1374` (QCM), `1949-1953` (Tests)
**Apply to:** Phase 5 Fiches IIFE boot.
**Rationale:** Inline scripts parse-block; deferred external scripts (`fiches-data.js`) run after parse. Without DCL gate, `window.FICHES` is `undefined` at IIFE entry. Hotfix commit 0553899.

### S6 — `target="_blank"` always paired with `rel="noopener noreferrer"`
**Source:** `qhse-cesi/outils.html:1239-1246` (source-line builder); `qhse-cesi/outils.html:261` (footer GitHub link)
**Apply to:** Every `<a>` Fiches builds via JS AND every `<a href>` in `cadreLegal` / `demarche` HTML strings.
**Rationale:** Reverse-tabnabbing mitigation (V14 of ASVS). Already enforced by chassis pattern; do not regress.

### S7 — Idempotent double-load guard on data files
**Source:** `qhse-cesi/outils-data.js:14-18`
**Apply to:** `qhse-cesi/fiches-data.js` (new file).
**Rationale:** WR-04 — if `<script src>` is duplicated (e.g., by a future dev tool), the first FICHES wins. Mirror exact `if (window.X && window.X.length) { console.warn(...) } else { window.X = [...] }` shape.

---

## No Analog Found

None. Every Phase 5 file has an exact or near-exact analog in Phases 1–4.

---

## Anti-Patterns Observed in This Codebase (DO NOT INTRODUCE)

Each anti-pattern below has been actively rejected in prior reviews. Phase 5 must continue the discipline.

| Anti-pattern | Why forbidden | Enforcement |
|--------------|---------------|-------------|
| `document.addEventListener('keydown', …)` | Cross-panel keyboard collision (P3 review finding). All Fiches keyboard is native: `<select>` arrows, `<details>` Space/Enter, `<a>` Enter. | Code search must return 0 hits inside the Fiches IIFE. |
| `.innerHTML = userOrBankContent` | XSS surface for committed but human-authored content (Pattern S3 / Pitfall 6). | Whitelist filter required for `cadreLegal` + `demarche`; everywhere else `createElement` + `textContent`. |
| `innerHTML += '<…>'` (string concatenation) | Same XSS surface; also breaks event listeners on existing children. | Forbidden. Use `appendChild(document.createElement(...))`. |
| New `:root` custom properties | Chassis tokens are FROZEN (Phase 1 contract). Adding tokens fights the existing design system. | UI-SPEC §Scoping rule line 35 + DEC-06 binds. CSS diff review must show 0 new `--*` definitions. |
| New `@page` rules in print stylesheet | UI-SPEC §Print Contract line 457 says "do NOT add `@page` rules if they conflict with existing chassis". Verify absence first; if absent, A4 portrait + 1cm margin is acceptable. | Inspect existing `@media print { }` block (lines 1460-1489) — currently no `@page` rule, so adding one is conditional. |
| `!important` outside print panel-isolation | Specificity wars. Chassis discipline: `@layer` order does the work. | UI-SPEC §Layout line 411 — only allowed for `#panel-* { display: none !important }` in print. |
| Animations / transitions in `.fi-*` | UI-SPEC §Motion Contract lines 374-380 — zero motion in Phase 5. The chassis `prefers-reduced-motion` block is the only motion code allowed. | Diff review for `animation:`, `transition:` keywords in the `.fi-*` block. |
| `window.print()` button or call | DEC-07 / UI-SPEC line 459 — Ctrl+P only. Adding a button clutters the panel. | Code search must return 0 hits. |
| Re-use of `__fcViewBooted` / `__qzQcmBooted` / `__qzTestsBooted` guard name | Two IIFEs sharing a guard silently no-op the second one. | Use `__fiBooted` (new, distinct). Grep must show this name nowhere else. |
| Calling `window.SRS.schedule(...)` or writing `qhse-srs-v1` / `qhse-scores-v1` | DEC-09 / D-V2-03 invariant extended to Phase 5 — Fiches is read-only. | `verify-fiches.cjs` group (e) snapshot-equality assertion. Code search must return 0 hits in Fiches IIFE. |
| Pre-rendering all 15 fiches as siblings with `[hidden]` toggles | ID collision on `fi-s-tldr` etc. (Pitfall 3). UI-SPEC line 331 binds single-fiche-at-a-time. | Code review: `panel.appendChild(article.fi-fiche)` should be preceded by `existing.remove()`. |
| Authoring new external URLs without verification | `feedback_verify_links_before_ship.md` policy — every URL must have content-verified `<title>` + topic match + soft-404 grep. | Per-commit manual gate before each fiche content batch ships. Optional: `verified: 'YYYY-MM-DD'` field on each `sources[i]`. |
| Touching the root QHSE Trainer at repo root | D-V2-01 frozen-sibling invariant. | Phase 5 changes confined to `qhse-cesi/` and `.planning/phases/05-fiches-de-r-vision/` + optionally `tools/`. |

---

## Metadata

**Analog search scope:** `qhse-cesi/*`, `.planning/phases/03-flashcards-srs/*`, `.planning/phases/04-qcm-tests-blancs/*`
**Files scanned:** 7 (outils.html, chassis.css, outils-data.js, srs.js header, verify-quiz.cjs, verify-srs.cjs reference via RESEARCH, 05-UI-SPEC.md)
**Line-range reads:** outils.html [1-160, 160-260, 900-1300, 1300-1400, 1940-1957], chassis.css [1-110, 880-960, 1380-1490], outils-data.js [1-50], verify-quiz.cjs [1-399]
**Pattern extraction date:** 2026-05-27

**Confidence:** HIGH — every analog is verbatim production code that has passed review and shipped to main.
