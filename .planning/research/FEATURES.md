# Feature Research

**Domain:** Single-user personal study hub — academic programme overview + curated external resource library (single HTML file, static, read-only V1)
**Researched:** 2026-05-11
**Confidence:** MEDIUM-HIGH (patterns are well-established for awesome-lists, single-page reference sites, and Notion-style student dashboards; complexity estimates are HIGH confidence given the single-file constraint)

## Framing

The reference points for this hub are not "learning platforms" or "LMS templates" — those over-engineer for the multi-user case. The right mental models are:

1. **GitHub awesome-lists** (e.g. `sindresorhus/awesome`, `awesome-selfhosted`) — grouped categorical link inventories that prioritize scannability.
2. **Personal academic homepages** (e.g. `academicpages.github.io`) — single-page, anchor-navigated, content-first.
3. **Single-user Notion dashboards published as websites** — curated, manually-maintained, read-mostly.
4. **Reference docs sites with TOC + scrollspy** (Material for MkDocs, Bootstrap docs) — sticky on-this-page navigation in a long-form layout.

The owner is a *single reader who already knows the content goal* — they don't need onboarding, gamification, or "engagement". They need fast retrieval, trust signals, and zero friction between "I want to find X" and "I'm reading X".

## Feature Landscape

### Table Stakes (Without These The Site Is Annoying)

| Feature | Why Expected | Complexity (single HTML file) | Notes |
|---------|--------------|-------------------------------|-------|
| **Sticky top nav with anchor links to main sections** | Long mono-page is unusable without persistent jump-to nav. Standard pattern in MkDocs, academicpages, awesome-list READMEs. | LOW | `position: sticky; top: 0`. ~30 lines CSS. |
| **Smooth scroll on anchor click** | Jarring instant jump on a long doc breaks reading flow. Native CSS does it. | TRIVIAL | `html { scroll-behavior: smooth; scroll-padding-top: <nav-height>; }` — the `scroll-padding-top` is the gotcha most sites miss. |
| **Mobile burger menu** | Already in active requirements. Site is unusable on phone without it. | LOW | Pure CSS checkbox-hack or 15 lines JS. No library. |
| **Responsive layout (mobile + desktop)** | Owner uses Wispr Flow on mobile and desktop. Mandatory. | LOW | CSS grid + one breakpoint at ~768px. Don't over-engineer with 4 breakpoints. |
| **Dark mode as default** | Explicit owner preference (CLAUDE.md, PROJECT.md). | TRIVIAL | Default CSS vars are dark. No toggle needed in V1 (anti-feature, see below). |
| **External links open in new tab** | Every link in Biblio is external. Losing the hub on every click is infuriating. | TRIVIAL | `target="_blank" rel="noopener"`. |
| **Visible category headings (h2/h3) in Biblio** | The 5 categories are the primary affordance for finding a resource. Buried = useless. | TRIVIAL | Semantic HTML. |
| **Link cards with title + 1-line description + source domain** | A bare `<a>` with just a title is a faith-based click. Domain + description = informed click. Awesome-lists nailed this pattern. | LOW | `<article class="link-card">` with title, description, `<span class="domain">inrs.fr</span>`. |
| **Readable typography (line-height ~1.6, max-width ~70ch on prose)** | This is a *reading* hub. Eye-strain typography kills the product. | TRIVIAL | 4 CSS rules. |
| **Keyboard scroll works** | Spacebar/PageDown must work. Don't break the browser. | FREE | Just don't add `e.preventDefault()` on scroll handlers. The risk is over-engineering breaks this. |
| **Section IDs match nav anchors and are linkable** | User wants to bookmark `#biblio-officielles`. Standard. | TRIVIAL | `<section id="biblio-officielles">`. |
| **Visible "current section" indicator in nav (scrollspy)** | On a long mono-page with 7+ sections, the nav loses meaning without "you are here". This is the defining UX feature of MkDocs/Bootstrap docs. | MEDIUM | ~30 lines vanilla JS using `IntersectionObserver`. Gumshoe is overkill — write it inline. |
| **Loads fast (<200ms perceived, no FOUC)** | Static single file. The hub *is* the file. | FREE | Inline all CSS and JS. No external fonts blocking render (use `font-display: swap` if using webfonts). |
| **Works on /qhse-cesi/ subpath** | Already in requirements. | TRIVIAL | Use relative paths only. |

### Differentiators (Genuinely Improve The Study Experience)

| Feature | Value Proposition | Complexity (single HTML file) | Notes |
|---------|-------------------|-------------------------------|-------|
| **Per-category filter chips in Biblio ("all / officielles / communauté / pédago / annales / outils")** | When the Biblio grows past ~30 links, scanning becomes work. Chip filter collapses the page to the relevant slice in one click. Used by every mature awesome-list-as-website (e.g. `awesomelists.top`). | LOW | ~25 lines vanilla JS, toggles `display: none` on cards by `data-category`. Single state, no router. |
| **"Mark as read / vu" toggle per Biblio card (localStorage)** | Real differentiator for the use case. After 2 weeks the hub has 60+ links — knowing what you've already opened removes redundant clicks. Pattern from Next.js course tracker and WPComplete. | LOW | Click checkbox → `localStorage.setItem('read:' + linkId, '1')` → CSS pseudo-class greys out card. ~20 lines. |
| **Reading progress bar (% of Biblio links marked read)** | Visible feedback for a self-paced reader. Cheap once "mark as read" exists. NOT gamification (no points/badges) — just a fuel gauge. | TRIVIAL | Compute `readCount / totalCount` on render. ~5 lines. |
| **In-page search box (Ctrl+K) filtering Biblio cards by title/description** | At 80+ links, scroll-and-filter beats memory. Search is the keyboard-driven version of category chips. | MEDIUM | ~40 lines vanilla JS — `input` event filters cards by `.textContent`. No fuzzy match needed at this scale; substring is enough. |
| **"Last-updated" or "added" date per link** | Critical trust signal for a curated library. "Added 2026-03" tells the reader the link was vetted recently; old undated links rot silently. Industry-standard in well-maintained awesome-lists. | LOW | Static `data-added="2026-05"` attribute, rendered as a small badge. No automation needed in V1. |
| **Visual category color-coding (badge per card)** | When filter chips are off and user is scrolling all cards, a colored category pill on each card preserves orientation. Tiny but high-impact. | TRIVIAL | One CSS class per category, ~6 rules. |
| **Print stylesheet (clean black-on-white, no nav, all links expanded as footnotes)** | Owner may want to print the Découverte section for offline reading on commute. CSS `@media print` does it for free. Also makes "save as PDF" produce a clean artifact. | LOW | ~20 lines CSS in `@media print`. Use `a[href]::after { content: " (" attr(href) ")" }` for visible URLs. |
| **Smooth section anchors that survive copy-paste in URL bar** | User shares `mes-apps-claude.vercel.app/qhse-cesi/#decouverte-rncp` with a classmate or pastes into their notes. Works for free if anchors are correct. | FREE | Just use `<section id>`. |
| **Visible table of contents in Découverte section (separate from top nav)** | Découverte is dense (programme + RNCP + alternance + métiers). A mini-TOC at the top of that section, just for its subsections, helps. Pattern from long Wikipedia articles. | TRIVIAL | Hand-coded `<ul>` of in-section anchors. No auto-generation. |
| **Salary ranges shown as visual bars not just numbers** | The "métiers" subsection is the emotional payoff of Découverte ("voici ce que je vais faire dans 3 ans"). A horizontal bar with min/median/max is more legible than "28k-45k €". | LOW | Pure CSS, ~15 lines. One per métier. |
| **Copy-link button on each Biblio card** | Sharing a single resource via Discord/SMS is faster than "open the hub, find the card, copy URL". Small but real. | LOW | `navigator.clipboard.writeText`, ~10 lines. Show "Copié !" toast for 1s. |
| **Persistent dark mode (no toggle, no flicker)** | Already dark by default — but ensure no white flash on load. Inline the theme in `<head>`. | TRIVIAL | Default CSS vars are dark. Done. |
| **Offline-readable (no external CDN dependencies)** | Hub must work on the train/RER. Single-file HTML with inline CSS/JS achieves this for free. Only external thing is the *outbound* Biblio links — those obviously need internet, but the hub itself doesn't. | FREE | Just don't add a CDN script tag. |

### Anti-Features (Tempting But Make The Site Worse)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **AI chatbot / "Ask the hub a question"** | Trendy, feels modern, "every site has one in 2026". | (1) Adds an API key, runtime dependency, latency, cost. (2) Pollutes a *trusted curated source* with hallucinated answers — the entire point of the hub is "I vetted these links myself". An LLM pasted on top destroys that trust. (3) Owner already uses ChatGPT/Claude separately; duplicating them here adds zero value. | None. If the owner wants AI Q&A, they paste a Biblio link into Claude. The hub stays the *source*, not the *answerer*. |
| **Gamification (XP, badges, streaks, levels)** | Looks engaging. Common in EdTech. | This is a *reading hub for one person who already wants to read it*. The reader is the owner; he doesn't need to be tricked into engagement. Gamification turns a serious reference into a toy and adds nag-UI. WPComplete-style "Mark as Complete" is fine (functional). XP bars are not. | The simple "read/unread" toggle + progress bar in Differentiators is the *non-gamified* version. Stop there. |
| **Real-time Reddit / Twitter / RSS feeds embedded in "Communauté"** | "Why curate links when you can just embed the live feed?" | (1) Breaks offline. (2) Breaks when API tokens expire (Twitter learned this lesson). (3) Floods the page with low-signal noise that defeats the curation premise. (4) PROJECT.md explicitly puts this Out of Scope already. | Hand-curate the 5-10 best Reddit threads / LinkedIn posts as static link cards with a quote-excerpt. Refresh manually every few months. |
| **User accounts / login / sync across devices** | "What if I want to see my read-marks on my phone?" | This is a single-user app. Auth + backend = 100x the complexity for a problem that doesn't exist (localStorage on each device is fine; the user re-marks 5 links on a new device once a year). | localStorage. If cross-device sync ever matters, export/import a JSON blob via a button. |
| **Comments / discussion under each link** | Feels community-flavored. | Single-user site. No audience. Moderation cost > zero. Spam vector. | None. The owner takes notes in his own Obsidian/Notion. |
| **Server-rendered "trending" or "popular" links** | Analytics-flavored. | No backend. No analytics in scope. Faking "popular" with a static badge is dishonest. | Manually tag 3-5 cards as "Essentiel" via a static badge. That's honest editorial signal, not fake popularity. |
| **Light mode toggle in V1** | "Some people prefer light mode." | The owner doesn't (CLAUDE.md). One user. Building a toggle for a hypothetical alternate-self is YAGNI. Adds a button, a state, a preference-persistence layer, and a second color palette to maintain. | Dark only. Light mode is a 30-minute change later if it ever matters. |
| **Auto link-checker / dead-link scanner running on page load** | "What if a link rots?" | Running fetch() against 80 external domains on every page load is slow, CORS-blocked, and pointless. Link rot is real (27% of Million Dollar Homepage links rotted) but the answer is *manual quarterly audit via a script in the repo* or a GitHub Action — not runtime checks. | (Future v2) A `scripts/check-links.js` run locally or in CI. Not in V1. |
| **PWA / service worker / "install as app"** | "Make it feel native." | Adds a manifest, an SW, cache invalidation pain. Owner already gets offline reading from the single-file static HTML. The browser bookmark is the install. | Skip. The Vercel URL is the app. |
| **Animations / scroll-triggered reveals / parallax** | "Looks polished." | Slows down scanning, which is the entire job of this site. The reader wants to *find a link in 2 seconds*, not watch sections fade in over 800ms. | Static. Maybe a 100ms fade on filter changes. That's it. |
| **Search across the *content* of external linked pages** | "Like a mini Google for my Biblio." | Requires scraping, indexing, hosting. Out of scope by an order of magnitude. | In-page search (title + description only) covers 90% of the value. |
| **Newsletter signup / email capture** | Reflex from every landing-page template. | No newsletter. One user. Delete this thought. | Delete. |
| **Social share buttons (Twitter / LinkedIn / Facebook)** | Reflex. | Not a content site. Not seeking traffic. Tracking pixels. | A single "Copy URL" button per section if sharing matters at all. |
| **Carousels / sliders for métiers or modules** | "Looks dynamic." | Carousels are user-hostile (NN/G has 15 years of research saying so). Hide content behind interaction = content invisible. | A static grid of cards. All content visible at once. Let the user scroll. |
| **"Login with GitHub" to sync read-marks** | Slightly less crazy than full auth. | Still adds an OAuth dance and a backend for a one-user app. | localStorage. |

## Feature Dependencies

```
Sticky nav with anchors
    └──requires──> Section IDs on each <section>
                       └──enables──> Direct URL linking (#decouverte-rncp)

Scrollspy (current section highlight)
    └──requires──> Sticky nav
    └──requires──> IntersectionObserver on sections

Category filter chips
    └──requires──> data-category attribute on every link card
                       └──enables──> In-page search (same DOM filtering machinery)

Mark-as-read toggle
    └──requires──> Stable unique ID per link card (data-id="ed-inrs-tms")
                       └──enables──> Reading progress bar
                       └──enables──> Copy-link-to-card feature (uses same ID as anchor)

Print stylesheet
    └──enhances──> Découverte section (offline reading on commute)
    └──independent of──> All JS features (works even with JS off)

Dark mode (default, no toggle)
    └──conflicts with──> Light-mode toggle  [resolution: ship dark only in V1]

AI chatbot
    └──conflicts with──> "Curated trustworthy source" core value  [resolution: never]

Real-time Reddit feed
    └──conflicts with──> Offline-readable, trust, PROJECT.md "Out of Scope"  [resolution: never]
```

### Dependency Notes

- **Stable card IDs are the cornerstone:** "mark as read", "copy link", "share anchor", and a future v2 "flashcard from link" all depend on each Biblio entry having a stable `data-id`. Decide the ID scheme on day 1 (e.g. `kebab-case-source-topic`: `inrs-ed-6155-tms`).
- **`data-category` attributes unlock both filtering and search cheaply:** the same querySelectorAll loop powers both features. Build category-filter first, search reuses 80% of the code.
- **Print stylesheet is JS-independent:** worth shipping in V1 because it costs ~20 lines of CSS and gives a free PDF export path for the Découverte section.
- **Scrollspy is the difference between "long page" and "navigable document":** without it, the sticky nav is decoration. With it, the nav becomes a live map.

## MVP Definition

### Launch With (v1.0 — Découverte + Biblio reading hub)

Minimum to validate the core hypothesis "one trustworthy place answers what is this formation and where are the best resources".

- [ ] **Sticky top nav with section anchors** — required for any long mono-page
- [ ] **Smooth scroll + `scroll-padding-top`** — anchors don't hide under the sticky nav
- [ ] **Mobile burger menu** — explicit requirement
- [ ] **Responsive layout (1 breakpoint)** — explicit requirement
- [ ] **Dark mode default, no toggle** — owner preference, less code
- [ ] **Découverte section with subsections** (pitch, programme par année, RNCP blocs, calendrier alternance, métiers/salaires) — half the value proposition
- [ ] **Biblio section with 5 category groups** — the other half
- [ ] **Link card pattern** (title + 1-line desc + domain + category badge) — the unit of value in Biblio
- [ ] **External links `target="_blank" rel="noopener"`** — every Biblio click
- [ ] **Section IDs + bookmarkable URLs** — shareable, navigable
- [ ] **Visual category color badges on cards** — trivial, big UX gain
- [ ] **Print stylesheet** — 20 lines, enables offline PDF
- [ ] **Distinct visual identity from QHSE Trainer** — explicit requirement (avoid Bebas Neue + lime + dot grid; pick something editorial/serif-leaning, e.g. Inter + a warm-paper accent)
- [ ] **Deploys to /qhse-cesi/** — explicit requirement

### Add After Validation (v1.x — once V1 is in real study use)

Trigger: after 2-3 weeks of real use, when the Biblio has grown past ~30 links and the owner is feeling friction.

- [ ] **Scrollspy active-section indicator in nav** — once the page is long enough that "where am I" becomes a real question
- [ ] **Per-category filter chips** — once Biblio > 30 links
- [ ] **Mark-as-read toggle + reading progress bar** — once owner is in active study and tracking matters
- [ ] **`data-added` date badges on cards** — once the library is old enough that "is this still current?" is a real question
- [ ] **In-page Ctrl+K search** — once Biblio > 60 links and filter chips alone aren't enough
- [ ] **Copy-link button on cards** — once the owner actually shares links with classmates

### Future Consideration (v2+)

Triggers explicit in PROJECT.md ("study tools deferred to V2 once V1 reading hub is shipped and validated in real study sessions").

- [ ] **Flashcard tool integration** — defer until real study sessions reveal what cards are actually needed; design hindered by lack of usage data
- [ ] **QCM / quiz** — same reason
- [ ] **Link-checker GitHub Action** — once the Biblio is large enough that manual rot-checks are painful (~6 months)
- [ ] **Personal annotation layer** (notes per link, stored in localStorage) — only if "mark as read" proves insufficient
- [ ] **Export / import JSON of read-state** — only if owner uses a second device frequently
- [ ] **Programme-vs-RNCP cross-reference view** — pedagogically interesting, but speculative until owner is mid-formation

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Sticky nav + smooth scroll + scroll-padding | HIGH | LOW | P1 |
| Mobile burger menu | HIGH | LOW | P1 |
| Responsive layout | HIGH | LOW | P1 |
| Dark mode default (no toggle) | HIGH | LOW | P1 |
| Découverte content sections | HIGH | LOW (content cost is the real cost, not code) | P1 |
| Biblio with 5 categories | HIGH | LOW | P1 |
| Link card pattern | HIGH | LOW | P1 |
| Category color badges | HIGH | LOW | P1 |
| Section IDs + bookmarkable anchors | HIGH | TRIVIAL | P1 |
| Print stylesheet | MEDIUM | LOW | P1 |
| Scrollspy current-section highlight | HIGH | MEDIUM | P2 |
| Category filter chips | HIGH | LOW | P2 |
| Mark-as-read + progress bar | MEDIUM-HIGH | LOW | P2 |
| `data-added` date badges | MEDIUM | TRIVIAL (content only) | P2 |
| Salary range visual bars | MEDIUM | LOW | P2 |
| In-page Ctrl+K search | MEDIUM | MEDIUM | P3 |
| Copy-link button per card | LOW-MEDIUM | LOW | P3 |
| Mini-TOC inside Découverte | MEDIUM | TRIVIAL | P2 |
| AI chatbot | NEGATIVE | HIGH | NEVER |
| Gamified XP / streaks | NEGATIVE | MEDIUM | NEVER |
| Live Reddit / RSS feeds | NEGATIVE | HIGH | NEVER |
| User accounts / sync backend | NEGATIVE | HIGH | NEVER |
| Light mode toggle | LOW | LOW | DEFER (v2+ if ever) |
| PWA / service worker | LOW | MEDIUM | DEFER |
| Carousels / sliders | NEGATIVE | MEDIUM | NEVER |

**Priority key:**
- **P1**: Must ship in v1.0 — without these the hub fails its purpose
- **P2**: Ship in v1.1–v1.3 after 2-4 weeks of real use signals the need
- **P3**: Ship when usage data justifies it
- **NEVER**: Documented anti-features — re-read this table before "just adding" them
- **DEFER**: Plausible but not justified yet

## Competitor / Reference Feature Analysis

| Feature | Awesome-list (sindresorhus/awesome on GitHub) | MkDocs Material reference docs | academicpages.github.io | Our Approach |
|---------|------------------------------------------------|--------------------------------|--------------------------|--------------|
| Layout | Long markdown, anchor TOC at top | Sidebar nav + content + on-this-page | Single-page sections | Single-page sections (mono-page) — closest to academicpages |
| Navigation | TOC anchors only, no sticky | Persistent sidebar + sticky TOC | Sticky top nav | Sticky top nav + (P2) scrollspy |
| Search | Browser Ctrl+F | Built-in fuzzy search | None | (P3) custom in-page search |
| Categories | Markdown headings | Sidebar tree | Page sections | h2 categories + (P2) filter chips |
| Mark-as-read | None | None | None | (P2) Differentiator — localStorage |
| Last-updated | Per-repo, rare | Per-page (git) | Per-page (manual) | (P2) per-card `data-added` |
| Dark mode | GitHub-native | Toggle | Theme-dependent | Dark only, no toggle |
| Mobile | Markdown reflows | Excellent | Good | First-class |
| Offline | GitHub renders cached | Cached HTML | Static HTML | Single-file, fully offline |
| Visual identity | Plain markdown | Material Design | Various | Custom (editorial / paper / warm — distinct from Trainer's industrial-terminal) |

## Concrete Visual Identity Recommendation (Single-File Constraint)

The existing QHSE Trainer is industrial: Bebas Neue + lime + dot grid. For meaningful distinction, the hub should lean **editorial / library / reading-room**:

- Typography: a humanist sans (Inter, system-ui, or Söhne-ish stack) for UI + a quiet serif (Source Serif, system serif, or `ui-serif`) for long-form prose in Découverte. Or pure system fonts — fastest and most "personal site" feeling.
- Palette: warm dark (e.g. `#1a1814` background, `#e8e2d4` text, `#c9a96e` accent) instead of cold black + lime. Reads like a leather-bound study, not a control room.
- Texture: subtle paper grain or nothing — explicitly *not* the dot grid.
- Density: more whitespace, longer line-height (1.65), reading-optimized max-width.

This gives "different app, same owner" — the visual signal the requirements ask for, without forcing two distinct design systems to be maintained.

## Sources

- [GitHub - sindresorhus/awesome](https://github.com/sindresorhus/awesome) — canonical awesome-list pattern (category headings, link + 1-line description)
- [GitHub - awesome-selfhosted/awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted) — mature curated list with category rules (min 3 entries per category)
- [Academic Pages template](https://academicpages.github.io/) — single-page personal academic site pattern
- [Material for MkDocs - Setting up navigation](https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/) — gold standard for sticky nav + scrollspy + on-this-page
- [Smooth Scrolling Sticky ScrollSpy Navigation — bram.us](https://www.bram.us/2020/01/10/smooth-scrolling-sticky-scrollspy-navigation/) — vanilla JS scrollspy with IntersectionObserver
- [Gumshoe vanilla JS scrollspy](https://github.com/cferdinandi/gumshoe) — reference implementation (we'll inline ~30 lines instead)
- [Nielsen Norman Group - In-Page Links for Content Navigation](https://www.nngroup.com/articles/in-page-links-content-navigation/) — UX research on anchor links + when to use TOCs
- [Implementing dark mode for static websites — Phelipe Teles](https://phelipetls.github.io/posts/implementing-dark-mode-for-static-websites/) — static-site dark mode patterns
- [Dark mode toggle on your static website — Tim Visée](https://timvisee.com/blog/dark-mode-toggle-on-static-website/) — confirmed: toggle is non-trivial, justifies "no toggle in V1"
- [CSS for Print: Designing Web Content for Physical Output — OpenReplay](https://blog.openreplay.com/css-for-print--designing-web-content-for-physical-output/) — `@media print` patterns
- [How to Avoid Link Rot — American Bar Association](https://www.americanbar.org/groups/law_practice/resources/law-practice-magazine/2025/march-april-2025/how-to-avoid-link-rot/) — manual quarterly audit + Perma.cc for critical sources
- [Link rot — Wikipedia](https://en.wikipedia.org/wiki/Link_rot) — 27% of links in a 2023 study returned no-redirect blanks; justifies `data-added` badges
- [MDN - Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) — persistence for mark-as-read
- [Use Local Storage in React using hooks (Next.js course tracker pattern) — Full Stack Heroes](https://fullstackheroes.com/tutorials/react/save-to-local-storage-using-hooks/) — the "mark lesson read" pattern adapted
- [MIT News — AI chatbots provide less-accurate information to vulnerable users](https://news.mit.edu/2026/study-ai-chatbots-provide-less-accurate-information-vulnerable-users-0219) — empirical support for "don't paste a chatbot on top of a curated trust source"

---
*Feature research for: personal single-user study hub (academic programme overview + curated link library, single-file static HTML)*
*Researched: 2026-05-11*
