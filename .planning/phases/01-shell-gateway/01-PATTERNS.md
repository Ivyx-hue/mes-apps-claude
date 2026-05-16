# Phase 1: Shell & Gateway — Pattern Map

**Mapped:** 2026-05-16
**Files analyzed:** 3 (1 created as extraction, 1 new, 1 modified)
**Analogs found:** 3 / 3 — all from `qhse-cesi/index.html` (the single authoritative source)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `qhse-cesi/chassis.css` | stylesheet (extracted) | static asset | `qhse-cesi/index.html` lines 15–640 | exact — verbatim extraction |
| `qhse-cesi/outils.html` | page shell | event-driven (tab switching) | `qhse-cesi/index.html` full document | role-match — mirrors head/nav/footer boilerplate; tab JS is new |
| `qhse-cesi/index.html` | page (3 surgical edits) | static content + scrollspy | self — current file | self-modification — 3 targeted patches |

---

## Pattern Assignments

### `qhse-cesi/chassis.css` (stylesheet, verbatim extraction)

**Analog:** `qhse-cesi/index.html`

**Critical constraint:** D-01 / SHELL-04 — byte-identical verbatim move. Zero reorganization, zero rule cleanup, zero renaming. The only transformation is removing the two surrounding HTML tags (`<style>` and `</style>`) and the two-space indentation on every line (optional — keep indentation if simpler).

**Exact `<style>` block boundaries:**

```
Opening tag:  index.html line 15   →  <style>
Closing tag:  index.html line 640  →  </style>
Total lines extracted: 626 (lines 15–640 inclusive, tags removed)
```

**Full style block content to extract** (lines 15–640):

- Line 15: `  <style>` — REMOVE this line (HTML tag, not CSS)
- Lines 16–639: CSS content — COPY verbatim (626 lines of CSS)
- Line 640: `  </style>` — REMOVE this line (HTML tag, not CSS)

The extracted CSS starts with:
```css
/* CSS layer order — declared once. Reset always loses to component styles. */
@layer reset, tokens, base, components, utilities;
```
...and ends with:
```css
      section { break-inside: avoid-page; }
    }
```

**Layer structure (for planner reference — do not reorder):**
```
@layer reset     — lines 16–45
@layer tokens    — lines 47–103
@layer base      — lines 105–172
@layer components — lines 174–608
@media print     — lines 610–639
```

---

### `qhse-cesi/outils.html` (page shell, event-driven tab switching)

**Analog:** `qhse-cesi/index.html`

#### `<head>` boilerplate pattern (lines 1–14)

Copy this block verbatim into `outils.html`, adjusting only `<title>` and `<meta name="description">`. Replace the `<style>` block with the `<link>` to `chassis.css`.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark light">
  <meta name="description" content="[outils-specific description]">
  <title>[Outils title] — QHSE CESI Hub</title>

  <!-- Google Fonts: dual preconnect + single CSS2 stylesheet request (Fraunces + Inter + JetBrains Mono) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="chassis.css">
</head>
```

**What changes vs. `index.html`:**
- `<meta name="description">` — outils-specific copy
- `<title>` — e.g. `Outils d'étude — QHSE CESI Hub`
- `<style>…</style>` block (626 lines) → single `<link rel="stylesheet" href="chassis.css">` line

#### Skip-link pattern (line 644)

```html
<a class="skip-link" href="#main">Aller au contenu principal</a>
```

Reuse identically — `chassis.css` already styles `.skip-link`.

#### Header / brand / nav pattern (lines 646–678)

`outils.html` does NOT need a burger menu (it is a single-purpose tool page, not a multi-section hub). However it should have a minimal header with the brand link pointing back to the Hub and a back-link. The header structure from `index.html` can be simplified — omit the `<input type="checkbox" id="nav-toggle">` / `<label class="burger">` / `<nav>` entirely, or keep a minimal nav. The burger pattern is:

```html
<!-- CSS-only burger: hidden checkbox + label. JS only flips checked=false on link tap. -->
<input type="checkbox" id="nav-toggle" class="nav-toggle" aria-label="Ouvrir le menu">
<label for="nav-toggle" class="burger">
  <!-- Lucide 'menu' SVG (lines 654–658) -->
  <!-- Lucide 'x' SVG (lines 660–663) -->
  <span class="sr-only" data-state="closed">Ouvrir le menu</span>
  <span class="sr-only" data-state="open">Fermer le menu</span>
</label>
<nav aria-label="Navigation principale">
  <ul class="nav__list">
    <li><a href="index.html" data-target="">← Hub</a></li>
  </ul>
</nav>
```

Note: `chassis.css` has all the header/burger styles already. The burger JS (closing on link tap) lives in `index.html`'s `<script>` block — `outils.html` will have its own `<script>` for tab behavior; include the burger-close logic there too if the burger is kept.

#### Tab shell pattern (NEW — no existing analog; use ARIA spec)

This is a new pattern — no existing analog in the codebase. The D-05 decision specifies:
- `role="tablist"` on the `<ul>` containing tabs
- `role="tab"` + `aria-selected` on each `<button>` or `<li>`
- `role="tabpanel"` + `[hidden]` on each panel
- Arrow-key navigation (Left/Right to cycle tabs)
- `location.hash` sync on tab activation

**Reference structure (write fresh per ARIA authoring practices):**

```html
<div class="tab-shell">
  <ul role="tablist" aria-label="Modes d'étude" class="tab-list">
    <li role="presentation">
      <button role="tab" id="tab-flashcards" aria-selected="true" aria-controls="panel-flashcards">
        Flashcards
      </button>
    </li>
    <li role="presentation">
      <button role="tab" id="tab-fiches" aria-selected="false" aria-controls="panel-fiches" tabindex="-1">
        Fiches de révision
      </button>
    </li>
    <li role="presentation">
      <button role="tab" id="tab-qcm" aria-selected="false" aria-controls="panel-qcm" tabindex="-1">
        QCM
      </button>
    </li>
    <li role="presentation">
      <button role="tab" id="tab-tests" aria-selected="false" aria-controls="panel-tests" tabindex="-1">
        Tests blancs
      </button>
    </li>
  </ul>

  <div role="tabpanel" id="panel-flashcards" aria-labelledby="tab-flashcards">
    <!-- Phase 3 mount point -->
    <p class="placeholder">Mode Flashcards — arrive en Phase 3.</p>
  </div>
  <div role="tabpanel" id="panel-fiches" aria-labelledby="tab-fiches" hidden>
    <!-- Phase 5 mount point -->
    <p class="placeholder">Fiches de révision — arrive en Phase 5.</p>
  </div>
  <div role="tabpanel" id="panel-qcm" aria-labelledby="tab-qcm" hidden>
    <!-- Phase 4 mount point -->
    <p class="placeholder">Mode QCM — arrive en Phase 4.</p>
  </div>
  <div role="tabpanel" id="panel-tests" aria-labelledby="tab-tests" hidden>
    <!-- Phase 4 mount point -->
    <p class="placeholder">Tests blancs — arrive en Phase 4.</p>
  </div>
</div>
```

**Tab JS pattern (inline `<script>` at bottom of `outils.html`):**

```javascript
(() => {
  'use strict';

  // Tab switching: ARIA tablist pattern — arrow-key nav, aria-selected, [hidden] toggle, hash sync.
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  function activate(tab) {
    tabs.forEach(t => {
      const active = t === tab;
      t.setAttribute('aria-selected', active);
      t.tabIndex = active ? 0 : -1;
    });
    panels.forEach(p => {
      p.hidden = p.id !== tab.getAttribute('aria-controls');
    });
    location.hash = tab.id;
    tab.focus();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (e) => {
      const idx = tabs.indexOf(e.currentTarget);
      if (e.key === 'ArrowRight') { e.preventDefault(); activate(tabs[(idx + 1) % tabs.length]); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); activate(tabs[(idx - 1 + tabs.length) % tabs.length]); }
      if (e.key === 'Home')       { e.preventDefault(); activate(tabs[0]); }
      if (e.key === 'End')        { e.preventDefault(); activate(tabs[tabs.length - 1]); }
    });
  });

  // Restore from hash on load.
  const hash = location.hash.slice(1);
  const initial = tabs.find(t => t.id === hash) || tabs[0];
  activate(initial);
})();
```

#### Footer pattern (lines 800–805)

```html
<footer role="contentinfo">
  <div class="footer__inner">
    <p>QHSE CESI Hub — dernière mise à jour <time datetime="2026-05-16">16 mai 2026</time></p>
    <p><a href="https://github.com/Ivyx-hue/mes-apps-claude" target="_blank" rel="noopener noreferrer">Code source sur GitHub</a></p>
  </div>
</footer>
```

Copy verbatim, update the `<time datetime>` to the deploy date.

---

### `qhse-cesi/index.html` — 3 surgical edits only (self-modification)

**Analog:** self — current file. All edit targets verified by reading the live file.

#### Edit A: Replace inline `<style>` block with `<link>` (lines 15–640)

**Current (lines 15–640):**
```html
  <style>
    /* CSS layer order — declared once. Reset always loses to component styles. */
    @layer reset, tokens, base, components, utilities;
    … (626 lines of CSS) …
    }
  </style>
```

**Replace the entire block with one line at line 15:**
```html
  <link rel="stylesheet" href="chassis.css">
```

Lines 16–640 are deleted entirely. The `</head>` tag (currently line 641) moves up to line 16.

**SHELL-04 verification:** After this edit, `index.html` renders identically because `chassis.css` contains the verbatim same rules. No selector, property, or value changes.

#### Edit B: Remove `hidden` from nav `<li>` (line 674)

**Current (line 674):**
```html
          <li hidden><a href="#outils" data-target="outils">Outils</a></li>
```

**Replace with:**
```html
          <li id="nav-outils"><a href="#outils" data-target="outils">Outils</a></li>
```

Note: Add `id="nav-outils"` to match the pattern of the other nav items (`id="nav-accueil"` line 671, `id="nav-decouverte"` line 672, `id="nav-biblio"` line 673) — the scrollspy queries `.nav__list a[data-target]` so this is optional but consistent. The mandatory change is removing `hidden`.

**Scrollspy impact:** The scrollspy at line 825 queries `main > section[id]:not([hidden])` — once the `<section id="outils">` has `hidden` removed (Edit C), it will automatically be observed. No JS changes needed.

#### Edit C: Remove `hidden` + rewrite gateway section (lines 793–797)

**Current (lines 793–797):**
```html
    <section id="outils" aria-labelledby="h-outils" hidden>
      <p class="eyebrow">04 / OUTILS</p>
      <h2 id="h-outils">Outils — réservé V2</h2>
      <p class="placeholder">Réservé V2 — flipping the two hidden attributes unlocks this surface.</p>
    </section>
```

**Replace with** (remove `hidden`, rewrite h2 and body content, keep `eyebrow` pattern and `aria-labelledby`):
```html
    <section id="outils" aria-labelledby="h-outils">
      <p class="eyebrow">04 / OUTILS</p>
      <h2 id="h-outils">Outils d'étude</h2>
      <p class="lead">[Editorial paragraph — at Claude's discretion per D-09 tone guidance. Should introduce the 4 modes and set expectation that the surface opens in a dedicated page.]</p>
      <ul>
        <li><strong>Flashcards</strong> — [brief description, arrive Phase 3]</li>
        <li><strong>Fiches de révision</strong> — [brief description, arrive Phase 5]</li>
        <li><strong>QCM</strong> — [brief description, arrive Phase 4]</li>
        <li><strong>Tests blancs</strong> — [brief description, arrive Phase 4]</li>
      </ul>
      <p><a href="outils.html">Ouvrir les outils d'étude</a></p>
    </section>
```

**Tone reference:** Match the Accueil section voice (line 687) — declarative, precise, no marketing filler. The link to `outils.html` uses no `target="_blank"` (D-09: same-tab, internal navigation).

---

## Shared Patterns

### `<link rel="stylesheet" href="chassis.css">` placement
**Source:** `index.html` lines 10–14 (Google Fonts block) → line 15 (`<style>`)
**Apply to:** Both `index.html` (Edit A) and `outils.html` `<head>`
**Rule:** The `<link>` to `chassis.css` goes immediately after the Google Fonts `<link>` block, before `</head>`. Both pages use identical `<link rel="preconnect">` + Google Fonts URL.

```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="chassis.css">
```

### External links vs. internal links
**Source:** `index.html` lines 803–804 (footer GitHub link) vs. D-09 decision
**Apply to:** `outils.html` footer, `#outils` gateway link
**Rule:** External links (`href^="http"`) always carry `target="_blank" rel="noopener noreferrer"`. Internal links (`href="outils.html"`, `href="index.html"`, `href="#..."`) never carry `target="_blank"`.

### `.placeholder` class for dated placeholders
**Source:** `index.html` line 789 (`<p class="placeholder">En cours de constitution…</p>`)
**Apply to:** Each empty tab panel in `outils.html`
**Rule:** Empty-state copy uses `<p class="placeholder">` — `chassis.css` already styles this class. Wording must name the phase: "arrive en Phase 3", "arrive en Phase 4", "arrive en Phase 5".

### `.eyebrow` + `aria-labelledby` section header pattern
**Source:** `index.html` lines 685–688 (Accueil), 691–692 (Découverte), 787–788 (Biblio), 793–796 (Outils)
**Apply to:** `#outils` gateway section after Edit C
```html
<section id="outils" aria-labelledby="h-outils">
  <p class="eyebrow">04 / OUTILS</p>
  <h2 id="h-outils">…</h2>
```

### JS IIFE wrapper
**Source:** `index.html` lines 807–848 (`(() => { 'use strict'; … })();`)
**Apply to:** `outils.html` inline `<script>` tab JS
**Rule:** All JS wrapped in an immediately-invoked arrow function with `'use strict'`. No globals. No inline handlers.

---

## What NOT to Touch

| Element | Location | Reason |
|---|---|---|
| CSS-only burger (`#nav-toggle` checkbox + `.burger` label) | `index.html` lines 650–667 | Frozen v1.0 pattern — untouched by all 3 edits |
| Scrollspy `IntersectionObserver` (section B) | `index.html` lines 823–837 | Works automatically once `hidden` removed from `<section id="outils">` — no edit needed |
| Burger-close-on-tap (section C) | `index.html` lines 839–847 | No change needed |
| Biblio data `BIBLIO[]` + render stub (section D) | `index.html` lines 849–end | Out of scope for Phase 1 |
| Root QHSE Trainer (`index.html` at repo root) | `/index.html` | Completely separate app — zero touch |
| `.github/workflows/deploy.yml` | repo root | Already configured — do not modify |

---

## No Analog Found

| File | Role | Reason |
|---|---|---|
| Tab JS in `outils.html` | event handler | No ARIA tablist pattern exists anywhere in the codebase. Write from spec (D-05 + ARIA Authoring Practices). The IIFE wrapper and `'use strict'` discipline come from `index.html` lines 807–810. |

---

## Metadata

**Analog search scope:** `qhse-cesi/index.html` (944 lines, sole source file)
**Files scanned:** 1 (all patterns concentrated in the single v1.0 file)
**Key verified line numbers:**
- `<style>` opens: line **15**
- `<style>` closes: line **640**
- `</head>`: line **641**
- `<body>`: line **642**
- Hidden nav `<li>`: line **674** — exact markup: `<li hidden><a href="#outils" data-target="outils">Outils</a></li>`
- `<section id="outils" … hidden>`: line **793**
- Section h2 "réservé V2": line **795**
- Placeholder `<p>`: line **796** — exact text: `Réservé V2 — flipping the two hidden attributes unlocks this surface.`
- `</main>`: line **798**
- `<script>` block: line **807**
- Scrollspy section query: line **825** — `document.querySelectorAll('main > section[id]:not([hidden])')`
- Pattern extraction date: **2026-05-16**
