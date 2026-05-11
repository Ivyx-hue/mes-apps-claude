# Pitfalls Research

**Domain:** Single-file personal study-hub website — curated French QHSE/CESI Bachelor reference hub (single user, reading-first, link-curation-heavy)
**Researched:** 2026-05-11
**Confidence:** HIGH (most pitfalls are well-documented in published research and confirmed by domain-specific sources on link rot, dark-mode WCAG, French copyright law, and solo-dev scope creep)

> Two distinct risk surfaces in this project:
> - **Technical** — single-file HTML/CSS/JS at `/qhse-cesi/index.html`, dark mode, anchor nav, mobile burger menu, scope creep into V2 tooling
> - **Editorial** — curating links to INRS / Légifrance / AIDA / France Compétences / Reddit / LinkedIn / YouTube; risk of stale info, dead links, copyright issues on annales, conflating CESI Bordeaux specifics with generic French QHSE info, survivorship-bias testimonials
>
> Pitfalls are tagged **[TECH]** or **[EDITORIAL]** so the roadmap can route them correctly.

---

## Critical Pitfalls

### Pitfall 1: Silent link rot [EDITORIAL]

**What goes wrong:**
A curated link card to an INRS dossier, a Reddit thread, or a CESI page silently breaks. The "Biblio" section advertises itself as a trustworthy reference hub, but six months in, ~5–15% of the link cards 404 or redirect to a generic homepage. Trust collapses the moment the owner clicks a dead card in front of a classmate or during a study session before rentrée.

**Why it happens:**
Empirical research finds links die at ~5% per year on average, and 54% of curated reference lists (Wikipedia "References" sections) have at least one dead link. CESI rebrands its site sections every academic year; INRS reorganizes ED/TJ document URLs; Reddit threads get deleted or locked; LinkedIn profiles go private. Nothing prompts the maintainer that a link is dead — it just rots in place.

**How to avoid:**
- For each link card, store: `title`, `url`, `source` (e.g. "INRS"), `last_verified` (ISO date), `archive_url` (optional Wayback fallback).
- Display `last_verified` discreetly on each card so the owner sees aging at a glance ("Vérifié il y a 4 mois" → orange after 90 days, red after 180).
- Bake a tiny "Verify links" dev-mode JS function (only runs on `?verify=1` query) that opens every URL in a new tab in batches so the owner can spot-check them quarterly.
- For high-value links (RNCP fiche, official CESI Bordeaux programme page, INRS dossiers), add a Wayback Machine archive URL as fallback so even a dead primary link still resolves to a snapshot.
- Prefer permalinks (Légifrance article URLs with article ID, INRS ED reference numbers, ISO standard numbers) over deep navigation paths.

**Warning signs:**
- A card has no `last_verified` date in the HTML
- Clicking a link redirects to a homepage instead of the specific resource
- Reddit thread shows "[removed]" or "[deleted]"
- The card's age badge has been red (>180 days) for more than one month

**Phase to address:**
V1 launch (schema + display); ongoing maintenance ritual at every git commit that touches `index.html` (verify any new link before committing).

---

### Pitfall 2: Mixing official sources with forum chatter without provenance signals [EDITORIAL]

**What goes wrong:**
A Reddit r/cesi anecdote ("le module SST en B3 est inutile") sits visually next to the official RNCP fiche on the page. The owner — or a peer the owner shows the site to — can't tell at a glance which is an authoritative source and which is one student's opinion. Six months later the owner cites the Reddit anecdote as fact in an alternance review.

**Why it happens:**
Survivorship bias on student forums is documented and severe: only happy/unhappy outliers post, the silent majority never speaks up. Reddit's "Applying to College"-style communities have well-documented Dunning-Kruger problems where confident pseudo-authorities outweigh nuanced voices. A flat list of "useful links" treats all sources equally.

**How to avoid:**
- Tag every resource with a `source_type` enum and render a colour/icon: `officiel` (INRS, Légifrance, AIDA, France Compétences, CESI), `pédagogique` (cours en ligne, MOOC, livres), `communauté` (Reddit, LinkedIn, forums), `outil-pro` (logiciels de veille, BARPI), `annales`.
- Officiel sources get a verified-style badge (e.g., checkmark + "Source officielle"). Communauté sources get an explicit "Témoignage individuel — lire avec recul" note.
- Group cards by `source_type` inside each of the 5 Biblio categories rather than mixing freely.
- For any community testimonial, include the date and a one-line context ("alternant B2 2024, alternance industrie pharma") so the reader can weight it.

**Warning signs:**
- A Reddit link is added without a date or context line
- The owner can't recite the source hierarchy off the top of their head
- Two cards in the same category have wildly different reliability but look identical

**Phase to address:**
V1 launch — bake source-type tagging into the card schema from day one. Retrofitting provenance after content is added is painful.

---

### Pitfall 3: Conflating CESI Bordeaux specifics with generic French QHSE info [EDITORIAL]

**What goes wrong:**
The Découverte section lists "programme par année" with module names harvested from a CESI Nanterre or CESI Toulouse page (or worse, an old 2022 brochure), and presents them as Bordeaux 2026 reality. Modules, alternance calendars, and even RNCP bloc mappings differ by campus and by promotion year. The owner builds expectations from inaccurate content and is blindsided at rentrée.

**Why it happens:**
- CESI is a federated network: each campus publishes its own page, with overlapping but non-identical content.
- France Compétences updates RNCP fiches regularly (referential changes 2022 law n°2022-1598, plus apprentissage NPEC referential updates published as recently as Sept 2025). An old fiche is technically "still findable on Google" but obsolete.
- "Bachelor QHSE" is a brand name used by multiple écoles (CESI, ESAIP, etc.); search results blend them.

**How to avoid:**
- Every Découverte fact (module list, calendar, durée, ECTS, RNCP bloc) carries an explicit `source` attribution and `as_of` date inline ("Source: programme CESI Bordeaux 2026-2027, vérifié le 11/05/2026").
- Cite the RNCP fiche by its number (e.g., RNCP35365) and version date, not by a generic France Compétences search URL.
- Maintain a `campus: bordeaux` flag in any structured content; never copy-paste content from another campus without explicit "(générique CESI, non spécifique Bordeaux)" annotation.
- Cross-check programme details against (1) official CESI Bordeaux page, (2) the RNCP fiche, (3) the signed alternance contract / convention de formation when available. Three sources beats one.

**Warning signs:**
- A module name appears in the Découverte section but does not appear in the RNCP fiche or the CESI Bordeaux page
- The page cites "Bachelor QHSE" generically without a campus identifier
- A salary range or débouché claim has no source link

**Phase to address:**
V1 launch — bake source attribution into the Découverte content schema. Audit before every git push that modifies Découverte content.

---

### Pitfall 4: Single-file HTML rotting into a 5000-line unmaintainable wall [TECH]

**What goes wrong:**
The constraint says "single `index.html` with inline CSS/JS". Six months in, the file is 4000+ lines: hundreds of link cards, full programme text, modal logic, theme toggle, smooth-scroll polyfills. Any edit risks breaking another section. Diffs on git push become unreadable. The owner stops adding content because the cognitive cost is too high.

**Why it happens:**
Single-file convenience scales poorly past ~1500 lines. There's no module boundary, no IDE autocomplete on data, no test surface. Inline `<style>` and `<script>` blocks bloat as content grows because every card, every programme item, every footnote adds raw HTML. Caching is moot because the whole document re-downloads on every change.

**How to avoid:**
- Keep the *runtime* single-file (constraint) but separate **structure** inside the file with clearly-commented section markers: `<!-- ============ SECTION: BIBLIO ============ -->`. Aim for an internal "table of contents" comment block at the top of `<body>`.
- Move content into a single `<script type="application/json" id="content-data">…</script>` block at the bottom of `<body>`. Render via JS on load. This separates *content edits* from *layout/style edits* and makes diffs readable.
- Hard ceiling: if `index.html` exceeds 2000 lines, that is a refactor trigger, not a "keep adding" signal. Refactor strategies (still single-file): extract a CSS variable system, deduplicate card markup via JS templating, collapse Découverte prose into the JSON content block.
- Use HTML comments to mark "edit zones" so the owner (or Claude) knows where to add new content without touching layout.

**Warning signs:**
- `index.html` > 2000 lines
- A new card requires editing more than one place in the file
- The owner avoids opening the file for small updates
- Git diffs for a "single new link" change >20 lines

**Phase to address:**
V1 launch — pick the JSON-content-block pattern from day one. Retrofitting later is a half-day refactor; designing for it costs nothing.

---

### Pitfall 5: Scope creep from V1 reading hub into V2 study tools [TECH/EDITORIAL]

**What goes wrong:**
Mid-V1, the owner thinks "while I'm at it, I'll add a small QCM for ISO 45001 — just one quiz." Then "let me persist QCM scores to localStorage." Then "let me add a flashcard for acronyms." V1 ships three months late, half the reading content is missing because attention drifted to interactive tools, and the QHSE Trainer (which already exists for QCM/flashcards) now has a janky duplicate inside the hub.

**Why it happens:**
"Silent scope creep" is the documented #1 killer of solo-dev projects. Each individual addition feels trivial; cumulative impact is fatal. The existing QHSE Trainer is right there at the repo root, tempting copy-paste. The owner's profile (alternant + voice-driven workflow) optimizes for momentum, which makes "just one more thing" feel productive.

**How to avoid:**
- Hard rule, written into the README of `/qhse-cesi/`: "V1 = read-only Découverte + Biblio. Zero interactive study features. Zero localStorage beyond theme preference." Pin this rule in `PROJECT.md` `Out of Scope` (already done — keep it there).
- Any feature idea that arrives during V1 goes into a `V2_BACKLOG.md` file in the planning folder, with one line of context. Do not implement, do not prototype, do not "just sketch it."
- Treat the QHSE Trainer as a separate product. Hub links *to* the Trainer; it does not absorb it.
- Define a concrete V1 "done" gate: all 5 Biblio categories populated with ≥5 verified cards each, full Découverte sections present, mobile + desktop pass, dark mode pass, deployed at `/qhse-cesi/`. Ship before adding anything.

**Warning signs:**
- A commit message mentions QCM, flashcard, quiz, score, or "interactive" before V1 ship
- The owner says "while I'm at it…" or "ce serait sympa de…"
- A new feature requires `localStorage` beyond the theme key
- `index.html` grows JS logic beyond: theme toggle, burger toggle, smooth-scroll, link-verification dev tool, JSON-content render

**Phase to address:**
V1 launch (set the rule); ongoing during V1 build (enforce it at every commit); V2 only after V1 ships and is used through at least one study session.

---

### Pitfall 6: Dark mode that fails WCAG AA contrast [TECH]

**What goes wrong:**
Owner prefers dark mode, so it's the default. Body background ends up `#0a0a0a` with `#888` secondary text, link cards have dim hover states, focus rings are barely visible. The site looks moody but:
- Subtitle and meta text fail WCAG AA 4.5:1
- Tab-key focus is invisible
- Saturated lime accents (a temptation, given the Trainer's aesthetic) "vibrate" on near-black

The owner uses the site for one study session, eyes fatigue after 30 minutes, abandons it. WCAG-aware reviewers (or future employers in QHSE — a discipline that explicitly cares about ergonomics) flag it.

**Why it happens:**
Naive dark-mode implementation inverts brand colours without re-tuning contrast ratios. WCAG 2.1 SC 1.4.3 requires 4.5:1 for normal text and 3:1 for large text **regardless of theme**; offering a dark theme does not satisfy contrast — both themes must individually pass. Pure `#000` worsens halation; highly saturated colours on dark backgrounds bleed/vibrate.

**How to avoid:**
- Base background `#121212` (Material Dark guideline) or `#0f1115`, never pure `#000`.
- Body text `#e6e6e6` minimum on the base background → contrast ~16:1, safe headroom.
- Secondary text: minimum `#a0a0a0` on `#121212` → contrast ~7:1, still AA for normal text.
- Accent colours: avoid the Trainer's lime — pick a different palette (constraint: distinct visual identity anyway). Test every link/button colour against background with a contrast checker before shipping.
- Explicit `:focus-visible` outline at 3px solid accent, with a 2px offset so it's visible on all backgrounds.
- Add a light-mode toggle (uses `prefers-color-scheme` as default, persists in `localStorage`) — accessibility win and respects users in bright environments (rentrée breaks, library sessions).

**Warning signs:**
- Contrast checker (axe DevTools, Chrome Lighthouse) flags any text
- Pressing Tab and visually losing the focus indicator on any interactive element
- Hex codes `#000` or `#fff` appear in the CSS
- Any colour value with HSL saturation > 80% on a dark background

**Phase to address:**
V1 launch — bake the palette decisions in before content is added. Refactoring colour tokens after the fact is mechanical but tedious.

---

### Pitfall 7: Flash of inaccurate colour theme (FART) on every page load [TECH]

**What goes wrong:**
Owner adds a light-mode toggle that reads `localStorage`. On every page load, the page renders in dark (default) for ~150ms, then JS runs, reads `localStorage`, and snaps to light. Result: a jarring flash on every navigation between anchors that triggers reload (or on first load from cold cache).

**Why it happens:**
JS reading `localStorage` runs after first paint. CSS-only `prefers-color-scheme` doesn't know about a user's explicit override stored in `localStorage`. The mismatch produces "Flash of inAccurate coloR Theme" — well-documented bug pattern.

**How to avoid:**
- Inline a tiny synchronous script inside `<head>` (before any CSS link or style) that reads `localStorage.getItem('theme')` and sets `document.documentElement.dataset.theme = 'light' | 'dark'` immediately. CSS variables are then keyed on `[data-theme="light"]` / `[data-theme="dark"]`.
- Default to `prefers-color-scheme` when no localStorage value exists.
- The toggle JS only needs to update both `localStorage` and the `data-theme` attribute — no flash.
- Verify: hard-reload with cache disabled in DevTools, eyes on the page; no flash should be visible.

**Warning signs:**
- A visible flash on Ctrl+F5 reload
- The theme toggle script lives at the end of `<body>` instead of inline in `<head>`
- CSS targets `body.dark` set by JS *after* DOMContentLoaded

**Phase to address:**
V1 launch — if light/dark toggle is in scope (recommended for accessibility). If V1 is dark-only with no toggle, this pitfall doesn't apply yet but resurfaces at V2.

---

### Pitfall 8: Anchor links hidden behind fixed top nav on mobile [TECH]

**What goes wrong:**
The top nav is sticky/fixed (typical for anchor-link single-page sites). Clicking "Biblio" in the burger menu scrolls to `#biblio`, but the section heading is hidden behind the 56px-tall fixed nav. On mobile this is doubly bad because the burger menu overlay also stays open, blocking the view.

**Why it happens:**
Default anchor-link scroll positions the target at `scrollTop: 0`, ignoring fixed-header height. Burger menus often forget to auto-close on link click. This is one of the most consistently shipped bugs on single-page anchored sites.

**How to avoid:**
- CSS-only fix: `html { scroll-padding-top: 4rem; }` (matches header height) and `html { scroll-behavior: smooth; }`. Modern browsers handle the rest.
- For each section target, also set `scroll-margin-top: 4rem;` as a belt-and-suspenders fallback.
- Burger menu JS: on any nav link click inside the open menu, close the menu *before* the scroll happens (`menu.classList.remove('open')` synchronously, then let the anchor navigation proceed).
- Test on actual mobile: not just Chrome DevTools device emulation. iOS Safari and Android Chrome behave differently with `scroll-behavior: smooth` + `scroll-padding-top` combos.

**Warning signs:**
- Clicking an anchor positions the heading touching the bottom of the nav (no breathing room)
- The burger menu stays visible after tapping a link
- The URL hash updates but the scroll position doesn't change (history.pushState bug)
- iOS Safari "rubber-bands" past the target

**Phase to address:**
V1 launch — these are 5-line CSS fixes if you know them; 2-hour debugging sessions if you don't.

---

### Pitfall 9: Hosting copyrighted PDFs of annales / corrigés [EDITORIAL/LEGAL]

**What goes wrong:**
The "anciens sujets / annales" category in Biblio tempts the owner to upload PDFs of past CESI exam papers, INRS quiz solutions, or scanned course materials directly to the repo (or worse, link to a Studocu-style aggregator). This:
- Likely violates French droit d'auteur (the pedagogical exception is narrowly scoped to intranet/extranet of the institution and excludes public web hosting and database-style aggregation of protected works).
- Risks DMCA / Article L335-3 takedowns against the repo.
- If linked through, sends the reader into a paywall/login flow that breaks the "trustworthy hub" promise.

**Why it happens:**
The pedagogical exception in French law (accord sectoriel) authorises use of works *to* registered students of an institution, *on* that institution's intranet, for direct illustration of teaching/research — and explicitly **excludes** public diffusion and exhaustive databases of protected works. A public Vercel deployment fails all three criteria.

**How to avoid:**
- **Do not host PDFs in the repo.** Link only.
- For each annales-style link: prefer official sources (CESI internal SharePoint via "lien à demander à l'école", Service Public, France Compétences sample evaluation grids) or links the owner can verify the author consents to public sharing.
- For Studocu/Doc-du-Juriste/aggregator links: tag with a `paywall` flag and a warning ("Inscription requise — qualité non vérifiée"). Do not represent them as authoritative annales.
- If a peer shares a corrigé personnellement, store it locally — don't link or upload.
- Add a `LEGAL.md` note in the repo explaining the hub is a link-curation tool, not a content host. This is also a reasonable answer if a third party ever questions a card.

**Warning signs:**
- A commit adds a `.pdf` file under `/qhse-cesi/`
- A link points to a publicly-hosted PDF whose origin is a student's Google Drive or a forum attachment
- The card title contains "corrigé" or "sujet 20XX" without a verified institutional source

**Phase to address:**
V1 launch — set the hosting policy explicitly in `PROJECT.md` Out of Scope and in the card schema. Once a copyrighted PDF lands in git history, removing it is a `git filter-repo` exercise, not a simple delete.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hard-code all link cards as raw `<div>` markup in `index.html` | Fast to ship the first 10 cards | At 50 cards, layout edits become a find-and-replace nightmare; diffs are unreadable | Acceptable for ≤15 cards total; refactor to JSON-data + JS render at 16+ |
| Skip `last_verified` date on cards "for now" | Saves 30 minutes designing schema | At month 6, no way to know which links to re-check; trust degrades silently | Never — bake the field in from card #1, even if value is empty |
| Inline pure-`#000` background to "match dark mode vibes" | One-line dark theme | Fails WCAG due to halation + saturated-colour vibration; eye fatigue on long sessions | Never for a study tool used 1h+ per session |
| Default to dark only, no light toggle | Smaller code surface | Library/outdoor study sessions become uncomfortable; accessibility regression | Acceptable for V1 only if `prefers-color-scheme: light` is at least respected via CSS media query |
| Use `<a href="#biblio">` without `scroll-padding-top` | Anchor links work in dev | Section titles hide behind sticky nav on every page load; user clicks twice to see anything | Never — `scroll-padding-top` is one CSS line |
| Mix Reddit anecdotes with INRS dossiers in the same flat list | "All my QHSE links in one place" | Reader cannot weight source reliability; conflates community noise with regulatory fact | Never for a hub branded as "trustworthy" |
| Skip burger-menu close on link click | One less event listener | Menu overlays the target section on mobile; user manually closes after every nav | Never — 3-line JS fix |
| Copy programme details from another CESI campus | Quick to populate Découverte | Inaccurate expectations for Bordeaux 2026-2027; embarrassing if shown to peers | Acceptable only if explicitly labelled "générique CESI, non Bordeaux-spécifique" |

---

## Integration Gotchas

Common mistakes when "connecting to" external sources (this site connects via links, not APIs, so gotchas are link-shape and citation-shape).

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| INRS dossiers | Linking to a search result URL (`/recherche/?q=...`) that decays as the search index changes | Link to the stable ED/TJ document permalink (e.g. `https://www.inrs.fr/media.html?refINRS=ED%206288`) |
| Légifrance | Linking to a code article via the navigation URL (e.g. `/codes/section_lc/...`) which breaks on site reorg | Use the article-ID permalink (`/codes/article_lc/LEGIARTI000XXX`) which is stable across redesigns |
| France Compétences (RNCP) | Linking to the search page or to "Bachelor QHSE" by name | Link directly to the RNCP fiche by number (e.g. `https://www.francecompetences.fr/recherche/rncp/XXXXX`) and cite the fiche version date |
| ISO standards | Linking to a third-party summary site (Lexology, qualiblog) and presenting it as the standard | Link to the ISO official page (`iso.org/standard/XXXXX.html`) for canonical identity; supplement with a clearly-tagged "vulgarisation" link if needed |
| Reddit (r/cesi etc.) | Linking to a thread without a date, or to a user profile that may go private | Link to the permalink (`/r/cesi/comments/XXXX/`), embed thread date in the card, archive via Wayback for high-signal threads |
| CESI Bordeaux | Linking to a top-level campus URL ("the Bordeaux page") that gets rebranded yearly | Link to the specific Bachelor QHSE programme URL; re-verify at every rentrée |
| YouTube channels | Linking to a single video as if it represented the channel's quality | Link to the channel home + cite a specific video as example; tag the channel's specialty (norme ISO, terrain, vulgarisation) |
| AIDA (INERIS) | Linking via a generic search portal | Link to the specific rubrique ICPE or the specific texte URL with its ID |
| LinkedIn témoignages | Linking to a profile that can go private overnight | Quote the relevant excerpt with date inside the card; link only as secondary attribution |
| Wayback Machine | Treating archive.org as primary; archive snapshots can also rot if the original is dynamic | Use Wayback as fallback only, primary always points to the live source |

---

## Performance Traps

This site is single-user, static, no backend. Most "performance" advice doesn't apply. The real traps are about cognitive performance and load-time UX on mobile.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Loading 50+ link cards with hover animations and shadow gradients | Mobile scroll jank, fan spin on older phones | Use simple borders + `transform`-based hover only; avoid animating `box-shadow` or `filter`; use `content-visibility: auto` on offscreen sections | Becomes noticeable at ~30 cards on mid-range Android |
| Heavy webfonts (Bebas Neue, custom serifs) blocking first paint | White screen for 1–2s on slow 4G | Use `font-display: swap`; subset fonts; or use system fonts (`-apple-system, BlinkMacSystemFont, "Segoe UI"...`) | Any time the owner travels and study sessions happen on slow tethered connection |
| Inline base64-encoded images for icons | `index.html` doubles in size, slows first parse | Use inline SVG (smaller than base64) or a single sprite sheet; or Unicode glyphs / emoji where culturally acceptable | At 4+ encoded images |
| Smooth-scroll polyfill JS shipped to all browsers | Extra JS for zero gain on modern browsers | `scroll-behavior: smooth` is supported in all evergreen browsers — no polyfill needed | Acceptable scale: this project always |
| Re-rendering all cards on theme switch | Visible flicker, lost scroll position | Toggle a `data-theme` attribute on `<html>` and let CSS variables do the work; never re-render DOM | At any scale |
| `index.html` growing past ~200KB | Slow first parse on mobile, hurts Lighthouse score | Move content into the JSON `<script>` block (parsed lazily); minify only at deploy time if needed | At ~50 cards + full Découverte prose |

---

## Security Mistakes

This is a static read-only site. Most OWASP categories don't apply. Domain-specific risks below.

| Mistake | Risk | Prevention |
|---------|------|------------|
| `target="_blank"` without `rel="noopener noreferrer"` on outbound links | Window.opener tabnabbing; third-party site can manipulate the source tab | Always pair `target="_blank"` with `rel="noopener noreferrer"` on every outbound link card |
| Embedding tweets / LinkedIn / YouTube via iframe `<embed>` widgets | Third-party JS execution, fingerprinting, GDPR exposure (owner is in France) | Use plain links, not embeds. If embedding is required (V2), use lite-embed patterns (click-to-load) |
| Hosting any user-supplied content via URL params (e.g. `?note=...` rendered into the page) | XSS surface even on a static site | Don't render URL params into the DOM. The site is read-only — no need to support input. |
| Committing a personal note / private email / draft alternance contract into the repo "temporarily" | Public repo means public history; secrets cannot be retroactively deleted | Treat `/qhse-cesi/` as 100% public. Anything private lives outside the repo. Pre-commit grep for "@cesi", "@gmail", phone-number patterns before push |
| Hot-linking images from third-party sites (CESI logo, INRS logo) | Image breaks if source rebrands; potential trademark issue if used for branding rather than attribution | Host minimal assets locally (favicons), or skip logos entirely and use text-only source attribution |
| Including Google Analytics / heat-mapping without CNIL consent banner | French CNIL compliance issue even for a single-user tool, since deployment is public | Add zero analytics in V1. If telemetry is ever wanted, use a CNIL-exempt local-only counter (no cookies, no external requests) |
| Linking to HTTP (non-HTTPS) resources | Mixed-content warnings, "Not Secure" badge on the hub | Audit all links for `https://`; INRS, Légifrance, AIDA, CESI, France Compétences are all HTTPS — there's no excuse |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Wall of link cards with no visual hierarchy | Owner can't find the one card they remember; cognitive overload defeats the "trustworthy hub" purpose | Group by `source_type` within each Biblio category; show official sources first; allow filter/search if cards exceed 25 |
| Découverte section as a wall of text | Skim impossible; owner re-reads the same paragraph each visit | Break into scannable blocks: 1-minute pitch (top), programme par année (table), RNCP blocs (cards), calendrier alternance (timeline), métiers (table with salary ranges) |
| No "last updated" footer | Owner forgets when content was last verified; trust decays | Display `derniere_maj` (ISO date) prominently in footer; auto-update via a commit hook or by manual edit at each content push |
| Burger menu that doesn't indicate the current section | Owner gets lost in the long page; doesn't know "where am I" | Use `IntersectionObserver` to highlight the active section in the nav (CSS `:target` is unreliable on smooth scroll) |
| Smooth-scroll that takes 2+ seconds | Owner overshoots target, taps another link mid-scroll, lands somewhere unexpected | Either disable `scroll-behavior: smooth` for long jumps, or cap animation duration; consider `behavior: 'instant'` for `>50vh` jumps |
| No keyboard navigation (Tab/Enter/Esc) tested | Accessibility regression; QHSE field cares about ergonomics; embarrassing if shown in a portfolio | Tab through every interactive element before shipping; Esc closes the burger menu; focus traps inside modals if any |
| Link cards that look clickable everywhere but only the title is a link | Owner taps the card body, nothing happens, frustration | Make the entire card clickable (wrap in `<a>` or use a JS click handler that mirrors the link's behaviour, including middle-click new-tab) |
| No empty states for "section under construction" | Reader hits a half-built Biblio category and assumes the site is abandoned | Either don't ship the section at all, or show a clear "En cours de constitution — vérifié au [date]" placeholder |
| Salary ranges shown without source or date | Owner cites them to peers, learns later they're 2019 numbers from a generic site | Always cite source + year; prefer Apec / France Travail / INSEE data over scraped aggregator sites |

---

## "Looks Done But Isn't" Checklist

Verify each item before declaring V1 shipped.

- [ ] **Link cards:** Every card has `source_type`, `last_verified` date, and (where applicable) `archive_url` — verify by inspecting the rendered HTML, not just the data
- [ ] **Anchor navigation:** Click each nav link on mobile; section heading is fully visible below the nav with breathing room (not flush against it)
- [ ] **Burger menu:** Tapping a link auto-closes the menu before scroll completes — verify on real mobile (not DevTools emulation)
- [ ] **Dark mode contrast:** Run Chrome Lighthouse + axe DevTools; zero contrast warnings — including on hover states, focus rings, and disabled states
- [ ] **Theme persistence:** Toggle theme, hard-reload (Ctrl+Shift+R), no flash; toggle again, navigate to anchor, reload — choice persists
- [ ] **Découverte sourcing:** Every fact has a source link or `as_of` date — grep the rendered HTML for unsourced claims
- [ ] **RNCP fiche:** Cited by number (RNCP XXXXX), not by search URL; version date noted
- [ ] **CESI Bordeaux specificity:** No copy-pasted content from another campus without explicit "(générique CESI)" label
- [ ] **No copyrighted PDFs:** `git ls-files '*.pdf'` returns nothing inside `/qhse-cesi/`
- [ ] **No private content leaked:** grep repo for email addresses, phone numbers, "@cesi" mentions of real people, draft contracts
- [ ] **Outbound links:** All `target="_blank"` have `rel="noopener noreferrer"` — grep for `target="_blank"` and inspect every match
- [ ] **HTTPS only:** No `http://` in `href` attributes
- [ ] **Visual identity:** Side-by-side with the QHSE Trainer, the two apps feel clearly distinct (not just colour swap) — different typography, layout density, accent treatment
- [ ] **Existing Trainer not broken:** `/index.html` (root) still loads and works after the `/qhse-cesi/` deploy
- [ ] **Mobile real-device test:** Loaded on actual iOS Safari and Android Chrome (not just DevTools)
- [ ] **Reader test:** Owner reads the hub end-to-end and can answer "what will I study in year 2 at CESI Bordeaux QHSE?" from the page alone, without opening another tab
- [ ] **Footer:** `derniere_maj` date is current (within the last week of ship)
- [ ] **404 spot-check:** Click 10 random Biblio links — zero dead, zero redirect-to-homepage

---

## Recovery Strategies

When pitfalls occur despite prevention.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Link rot (1–5 dead cards) | LOW | (1) Add Wayback fallback to the card; (2) update `last_verified`; (3) if no archive exists, mark `status: "archive perdue"` and de-emphasise visually rather than deleting (preserves provenance) |
| Link rot (>10% of cards dead) | MEDIUM | Quarterly audit ritual: open the dev-mode `?verify=1` mass-link-check, batch-fix in one commit, refresh `derniere_maj` |
| Misattributed CESI content discovered mid-promo | MEDIUM | (1) Add a "Correction du [date]" banner to the Découverte section; (2) tag the corrected fact with a `corrected_from` note; (3) cross-check the rest of the section for similar errors before re-shipping |
| Single-file HTML exceeded 2000 lines | MEDIUM (half-day) | Extract content to JSON `<script>` block, render via JS template; no functional change for users, big readability win for editing |
| Dark-mode contrast failure caught by axe DevTools | LOW | Update CSS variables (single source of truth); re-run Lighthouse to verify across all sections |
| Scope-creep into V2 features already coded into V1 | MEDIUM | Git revert the feature commits; copy the work into a `V2_BACKLOG.md` note with the file diff attached; resume V1 |
| Copyrighted PDF committed to git history | HIGH | `git filter-repo` to purge from history; force-push (acceptable here because solo repo); rotate any cached deploys; document in `LEGAL.md` to deter recurrence |
| Burger menu / anchor-link bug shipped to prod | LOW | CSS-only fix (`scroll-padding-top` + menu-close handler); one commit, ~60s deploy |
| FART on theme toggle | LOW | Move theme-init script inline into `<head>`; one commit |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address each pitfall.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| 1. Silent link rot | V1 launch (schema + UI) → Ongoing maintenance (quarterly audit) | `last_verified` field visible on every card; `?verify=1` dev tool exists |
| 2. Mixing official vs forum sources | V1 launch (taxonomy baked into schema) | Every card has `source_type`; community cards have explicit caveat |
| 3. CESI Bordeaux ≠ generic QHSE | V1 launch (sourcing rule for Découverte) | Every Découverte fact has source + `as_of`; RNCP fiche cited by number |
| 4. Single-file rot | V1 launch (JSON-content pattern from card #1) | `index.html` < 2000 lines at ship; content lives in JSON block |
| 5. Scope creep into V2 | V1 launch (Out of Scope rule); ongoing (every commit) | No QCM/flashcard/quiz code in `index.html`; `V2_BACKLOG.md` collects ideas |
| 6. Dark-mode WCAG contrast | V1 launch (palette decisions before content) | axe DevTools + Lighthouse zero contrast issues |
| 7. FART / theme flash | V1 launch (inline `<head>` script) | Hard-reload shows no flash on multiple devices |
| 8. Anchor links + burger menu | V1 launch (`scroll-padding-top` + close-on-click) | Manual mobile test: every nav link lands cleanly, menu auto-closes |
| 9. Copyrighted PDFs | V1 launch (hosting policy in `PROJECT.md` + `LEGAL.md`) | `git ls-files '*.pdf'` under `/qhse-cesi/` returns empty |

---

## Sources

- [Ahrefs link rot study — 66.5% of links dead in 9 years, ~5%/year](https://ahrefs.com/blog/link-rot-study/) — link rot baseline rate
- [Link rot — Wikipedia](https://en.wikipedia.org/wiki/Link_rot) — 54% of Wikipedia references contain at least one dead link; academic broken-link rate 39–83%
- [Pew Research on Link Rot — DSHR's Blog](https://blog.dshr.org/2024/05/pew-research-on-link-rot.html) — citation half-life ~14 years; only 62% of academic links archived
- [Mathias Bynens — Inline vs external CSS/JS thresholds](https://mathiasbynens.be/notes/inline-vs-separate-file) — single-file scaling pitfalls
- [MDN — HTML performance optimization](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/HTML) — when single-file breaks down
- [The Designer's Guide to Dark Mode Accessibility](https://www.accessibilitychecker.org/blog/dark-mode-accessibility/) — dark mode contrast pitfalls
- [Offering a Dark Mode Doesn't Satisfy WCAG Color Contrast — BoIA](https://www.boia.org/blog/offering-a-dark-mode-doesnt-satisfy-wcag-color-contrast-requirements) — WCAG SC 1.4.3 applies to both themes
- [NN/G — Dark Mode: How Users Think About It and Issues to Avoid](https://www.nngroup.com/articles/dark-mode-users-issues/) — user-facing dark mode UX pitfalls
- [CSS-Tricks — Flash of inAccurate coloR Theme (FART)](https://css-tricks.com/flash-of-inaccurate-color-theme-fart/) — FART/FOUC prevention with inline head script
- [Spigot Design — Smooth Scroll Offset Anchor Links with CSS](https://spigotdesign.com/smooth-scroll-offset-anchor-links-with-css/) — `scroll-padding-top` + `scroll-margin-top` patterns
- [Pixelflips — Offsetting Anchor Links with a Fixed Header](https://pixelflips.com/blog/anchor-links-with-a-fixed-header) — sticky header anchor pitfalls
- [Académie de Normandie — Exceptions au droit d'auteur dans un cadre pédagogique](https://www.ac-normandie.fr/exceptions-au-droit-d-auteur-dans-un-cadre-pedagogique-123314) — French pedagogical exception scope
- [ENSSIB — L'étudiant, l'enseignant et le chercheur face au droit d'auteur (PDF)](https://www.enssib.fr/bibliotheque-numerique/documents/648-le-chercheur-l-enseignant-et-l-etudiant-face-au-droit-d-auteur.pdf) — what is and isn't allowed under the pedagogical exception
- [Ministère de l'Education nationale — Utilisation des œuvres à des fins d'illustration](https://www.education.gouv.fr/bo/2011/07/menj1100017x.htm) — public web hosting outside the exception
- [France Compétences — Vademecum RNCP mis à jour](https://www.francecompetences.fr/fiche/france-competences-publie-une-version-mise-a-jour-de-son-vademecum/) — RNCP fiche update process
- [Tex Admissions — The Truth About Reddit's Applying to College](https://www.texadmissions.com/blog/2025/5/1/the-truth-about-reddits-applying-to-college-from-someone-who-helped-start-it) — student-forum misinformation patterns
- [Scientific American — The Perils of Survivorship Bias](https://www.scientificamerican.com/article/the-perils-of-survivorship-bias/) — survivorship bias in testimonials
- [LinkedIn — Survivorship Bias in Higher Education](https://www.linkedin.com/pulse/survivorship-bias-higher-education-stuart-norton-wcjcc) — applied to higher-ed testimonials
- [Medium — 5 ways I beat scope creep as a solo dev (Rim Nassih)](https://medium.com/@rimnassih/5-ways-i-beat-scope-creep-with-real-examples-as-a-solo-dev-c5f9bf7331a4) — solo dev MVP discipline
- [Designli — What is Feature Creep and How to Avoid It](https://designli.co/blog/what-is-feature-creep-and-how-to-avoid-it) — V2 backlog as scope-creep defence

---

*Pitfalls research for: single-file personal study-hub website (QHSE CESI Hub)*
*Researched: 2026-05-11*
