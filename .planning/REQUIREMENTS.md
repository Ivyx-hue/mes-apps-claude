# Requirements: QHSE CESI Hub

**Defined:** 2026-05-11
**Core Value:** Have one trustworthy place that answers "what is this formation, what will I study, and where do I find the best resources" — without having to dig through scattered sources every time.

## v1 Requirements

Requirements for initial release. Each maps to a roadmap phase.

### Infrastructure

- [ ] **INFRA-01**: Site is deployed at `https://mes-apps-claude.vercel.app/qhse-cesi/` through the existing GitHub Actions pipeline (push to `main` produces a live URL in ~60s)
- [ ] **INFRA-02**: The whole site is a single `index.html` under `/qhse-cesi/` with inline `<style>` and `<script>` — no build step, no npm dependencies, no framework
- [ ] **INFRA-03**: The existing QHSE Trainer at the repo root keeps working unchanged after the hub ships

### Visual Identity

- [ ] **IDENT-01**: Visual identity is clearly distinct from the QHSE Trainer (different font families, different palette, different mood — "editorial / library" vs the Trainer's "industrial terminal")
- [ ] **IDENT-02**: Dark mode is the default theme; light mode falls out for free via `color-scheme` + `light-dark()` but no toggle is shipped in V1
- [ ] **IDENT-03**: Color tokens are defined once in `:root` using OKLCH and `light-dark()`; all components consume tokens, no hard-coded colors in component CSS
- [ ] **IDENT-04**: Typography pairs a display family + body/UI family + mono family (recommended: Fraunces + Inter + JetBrains Mono via Google Fonts CSS2); fluid type scale via `clamp()`
- [ ] **IDENT-05**: Dark theme passes WCAG AA contrast (body text ≥ 4.5:1) and uses no pure `#000` background

### Layout Chassis

- [ ] **CHASSIS-01**: Top navigation is sticky and contains anchor links to Accueil, Découverte, Biblio (and to Outils once V2 ships)
- [ ] **CHASSIS-02**: Anchor navigation uses native smooth scroll with `scroll-padding-top` + `scroll-margin-top` so section headings land below the sticky nav, not under it
- [ ] **CHASSIS-03**: On mobile (≤768 px) the nav collapses into a burger menu that auto-closes synchronously when a link is clicked, before the scroll fires
- [ ] **CHASSIS-04**: A keyboard-accessible "Skip to main content" link is the first focusable element
- [ ] **CHASSIS-05**: Every main section has a stable `id` so URLs like `#decouverte` and `#biblio-officiel` are bookmarkable
- [ ] **CHASSIS-06**: A print stylesheet expands link URLs as footnotes (`a[href]::after`) and removes the sticky nav from printed output
- [ ] **CHASSIS-07**: The page is usable from 360 px (small mobile) to 1440+ px (desktop) with one breakpoint near 720–768 px
- [ ] **CHASSIS-08**: A reserved `<section id="outils" hidden>` placeholder exists in the markup for V2 — adding V2 means removing the `hidden` attribute, not restructuring the page
- [ ] **CHASSIS-09**: `prefers-reduced-motion: reduce` disables smooth scroll and entrance animations
- [ ] **CHASSIS-10**: Empty-shell build passes Lighthouse (Performance + Accessibility) and axe DevTools with no critical issues

### Découverte

- [ ] **DECOUV-01**: One-screen Accueil section explains in ~150 words what the site is, who it's for, and what's inside
- [ ] **DECOUV-02**: Découverte opens with a one-minute pitch of the Bachelor QHSE at CESI Bordeaux (durée, niveau, RNCP, rythme alternance)
- [ ] **DECOUV-03**: Programme par année is rendered (modules + volumes horaires when available); each fact carries an inline `source` + `as_of` date
- [ ] **DECOUV-04**: RNCP blocs de compétences are listed and cited by RNCP fiche number + version date (not by search URL)
- [ ] **DECOUV-05**: Calendrier alternance is rendered (rythme école/entreprise, périodes d'examens, échéance mémoire)
- [ ] **DECOUV-06**: Métiers / débouchés are listed with salary ranges (min / médiane / max) and every salary range cites its source (Apec, France Travail, or INSEE — not aggregators)
- [ ] **DECOUV-07**: A mini-table-of-contents inside the Découverte section links to its subsections
- [ ] **DECOUV-08**: Bordeaux-specific facts are not conflated with generic CESI / generic Bachelor QHSE content — anything generic is explicitly labelled `(générique CESI, non spécifique Bordeaux)`

### Biblio

- [ ] **BIBLIO-01**: 5 link categories are rendered with semantic `<section>` + `<h2>` headings and stable `id` anchors: `officiel`, `communaute`, `pedago`, `annales`, `pro`
- [ ] **BIBLIO-02**: Content is data-driven — `BIBLIO_CATEGORIES[]` and `BIBLIO[]` arrays in JS, a pure `renderCard(item)` function, single `innerHTML` mount; no inline `onclick=""`, no hand-duplicated card HTML
- [ ] **BIBLIO-03**: Each category has at least 5 verified link cards (≥ 25 cards total at launch)
- [ ] **BIBLIO-04**: Every card carries the canonical schema: `id`, `title`, `url`, `description`, `category`, `source_type`, `tags`, `priority`, `lastChecked`, optional `archive_url`, optional `note`
- [ ] **BIBLIO-05**: Each card visibly shows its `source_type` as a provenance badge: `officiel` (verified), `pédagogique`, `communauté` (with "lire avec recul" caveat), `outil-pro`, `annales`
- [ ] **BIBLIO-06**: Each card visibly shows its `lastChecked` date with age-based color (neutral ≤ 90 d, warning 90–180 d, alert > 180 d)
- [ ] **BIBLIO-07**: Every outbound `<a>` opens in a new tab with `target="_blank" rel="noopener noreferrer"`
- [ ] **BIBLIO-08**: A category badge plus a category accent color visually groups cards inside each section
- [ ] **BIBLIO-09**: High-value cards (RNCP fiche, official CESI page, INRS dossiers) include an `archive_url` (Wayback) as a rot-resistance backup

### Policy & Trust

- [ ] **POLICY-01**: A `LEGAL.md` inside `/qhse-cesi/` documents that the site is a link-curation tool, does not host third-party PDFs, and respects the limits of the French pedagogical exception
- [ ] **POLICY-02**: A `V2_BACKLOG.md` in `.planning/` is created and pre-seeded with all deferred features (study tools, scrollspy, filter chips, mark-as-read, search, light toggle); any "while I'm at it" V1 idea is routed there
- [ ] **POLICY-03**: No `.pdf` files are committed under `/qhse-cesi/` — confirmed by `git ls-files '*.pdf'` returning empty under that path
- [ ] **POLICY-04**: The site footer shows `derniere_maj` (ISO date) and links to the GitHub repo for transparency

## v2 Requirements

Deferred to future release. Tracked but not in the current roadmap.

### Study Tools (V2 — the original "study tools" deferral from PROJECT.md)

- **TOOL-01**: Flashcards trainer covering Découverte + Biblio key facts
- **TOOL-02**: QCM mode (multiple-choice quiz) per module
- **TOOL-03**: Spaced-repetition scheduling with localStorage progress

### Reading & Navigation Enhancements (v1.1 — quick wins once V1 is lived-in)

- **UX-01**: Scrollspy that highlights the active section in the sticky nav (`IntersectionObserver`, ~30 lines vanilla JS)
- **UX-02**: Per-category filter chips on Biblio (toggle `display` via `data-category`)
- **UX-03**: Mark-as-read toggle on each card, persisted in `localStorage`
- **UX-04**: In-page Ctrl+K search (substring filter over card titles + tags)
- **UX-05**: Copy-link button per card (`navigator.clipboard.writeText`)
- **UX-06**: Reading-progress bar on the Découverte section
- **UX-07**: Optional light-mode toggle (with inline `<head>` FART-prevention script)
- **UX-08**: Auto link-checker as a periodic GitHub Action (rather than the V1 manual `?verify=1` ritual)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| AI chatbot pasted on top of the curated hub | Destroys the "curated trustworthy source" premise; MIT 2026 research shows chatbots degrade accuracy for vulnerable users |
| Gamification (XP / badges / streaks) | One reader who already wants to read — no engagement problem to solve |
| Real-time Reddit / RSS / API embeds | Breaks offline reading, breaks when tokens expire, defeats the curation model |
| User accounts / authentication / backend sync | Single-user personal tool, static HTML is sufficient |
| Comments / discussion threads | Single-user site, no audience |
| Carousels / sliders | 15 years of NN/G evidence against them; the hub is a reference doc |
| Analytics / heat-maps / tracking pixels | CNIL exposure, no audience |
| Newsletter signup, social share buttons | Personal tool, not a publication |
| Hosting copyrighted annales / corrigés PDFs | French pedagogical exception does not cover public Vercel hosting; link-only policy enforced |
| Multi-language UI | Formation is in French, content is in French, owner is French — no value added |
| Replacing or modifying the existing QHSE Trainer | Trainer stays at repo root; hub lives at `/qhse-cesi/` and links to the Trainer |
| Service worker / PWA shell | A single static file is already offline-friendly; complexity not justified |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | TBD | Pending |
| INFRA-02 | TBD | Pending |
| INFRA-03 | TBD | Pending |
| IDENT-01 | TBD | Pending |
| IDENT-02 | TBD | Pending |
| IDENT-03 | TBD | Pending |
| IDENT-04 | TBD | Pending |
| IDENT-05 | TBD | Pending |
| CHASSIS-01 | TBD | Pending |
| CHASSIS-02 | TBD | Pending |
| CHASSIS-03 | TBD | Pending |
| CHASSIS-04 | TBD | Pending |
| CHASSIS-05 | TBD | Pending |
| CHASSIS-06 | TBD | Pending |
| CHASSIS-07 | TBD | Pending |
| CHASSIS-08 | TBD | Pending |
| CHASSIS-09 | TBD | Pending |
| CHASSIS-10 | TBD | Pending |
| DECOUV-01 | TBD | Pending |
| DECOUV-02 | TBD | Pending |
| DECOUV-03 | TBD | Pending |
| DECOUV-04 | TBD | Pending |
| DECOUV-05 | TBD | Pending |
| DECOUV-06 | TBD | Pending |
| DECOUV-07 | TBD | Pending |
| DECOUV-08 | TBD | Pending |
| BIBLIO-01 | TBD | Pending |
| BIBLIO-02 | TBD | Pending |
| BIBLIO-03 | TBD | Pending |
| BIBLIO-04 | TBD | Pending |
| BIBLIO-05 | TBD | Pending |
| BIBLIO-06 | TBD | Pending |
| BIBLIO-07 | TBD | Pending |
| BIBLIO-08 | TBD | Pending |
| BIBLIO-09 | TBD | Pending |
| POLICY-01 | TBD | Pending |
| POLICY-02 | TBD | Pending |
| POLICY-03 | TBD | Pending |
| POLICY-04 | TBD | Pending |

**Coverage:**
- v1 requirements: 39 total
- Mapped to phases: 0 (roadmap pending)
- Unmapped: 39 ⚠️ (resolved during roadmap creation)

---
*Requirements defined: 2026-05-11*
*Last updated: 2026-05-11 after initial definition*
