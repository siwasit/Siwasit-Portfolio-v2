# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # dev server at http://localhost:4200 (auto-reload)
npm run build      # production build → dist/portfolio/
npm run watch      # dev build in watch mode (no server)
npx ng generate component components/<name>  # scaffold a new component (skipTests is set globally)
```

No linter is configured. Prettier is configured in `package.json` (100-char width, single quotes, Angular HTML parser).

## Architecture

Single-page portfolio. No routing — the app is one scrollable page with four anchor sections (`#profile`, `#experience`, `#work`, `#contact`). Angular 20, all components standalone.

**State flow:** `PanelService` (`src/app/services/panel.service.ts`) is the only shared state. It holds a signal `openIndex: signal<number | null>` that controls which project's slide-over panel is open. `WorkComponent` calls `panel.open(i)` on card click; `ProjectPanelComponent` reads the signal via `computed()` and drives its own visibility with CSS class `[class.open]`. No `@Input`/`@Output` cross-component wiring — everything goes through the service.

**Content is driven by JSON files:** All editable content lives in `src/content/`. Do not hardcode content in components.

| File | Used by |
|---|---|
| `src/content/hero.json` | `HeroComponent` — `skillGroups` array |
| `src/content/experience.json` | `ExperienceComponent` — `entries` array |
| `src/content/projects.json` | `PanelService` — `projects` array (imported as `PROJECTS`) |

To add/edit content, update the relevant JSON file or use the CMS at `/admin`.

**Project model** (`src/app/models/project.model.ts`): each project has `cardDesc` (card summary text) and `previewStyle` (0–3, controls which card visual variant renders). `linkLabel` and `linkHref` are optional — the panel link is hidden when `linkHref` is empty.

**Card preview styles** (in `work.component.html`): driven by `project.previewStyle`, not loop index. Style 2 renders a chart element; style 3 renders an app icon "M". CSS classes `grid-style-{n}` and `glow-{n}` are applied accordingly.

**Experience bullet highlights:** bullet text uses `{word}` syntax to mark highlighted spans. `ExperienceComponent.parseBullet()` parses this into segments. The `highlights` array in each bullet must list the same words that appear in braces in the text.

**Scroll-reveal:** `RevealDirective` (`src/app/directives/reveal.directive.ts`) is applied via the `reveal` attribute selector. It adds class `reveal` to the host element (which starts at `opacity:0; transform:translateY(20px)` in global styles), then uses `IntersectionObserver` to add `revealed` once the element enters the viewport. Apply it to any element that should animate in on scroll.

**Active nav:** `NavComponent` uses `@HostListener('window:scroll')` and `getBoundingClientRect()` to imperatively update `activeSection` signal, which drives `[class.active]` on each link. No router or `RouterLinkActive`.

**Global shared styles** (`src/styles.scss`) defines the utility classes used across components: `.reveal`/`.revealed`, `.skill-tag`, `.tech-badge`, `.mono-label`, `.section-inner`, `.section-heading`, `.accent-bullet`, `.btn-ghost`, `.btn-text`. Component SCSS files rely on these being global — don't scope them.

**Static assets** (profile photo) live in `public/images/` and are referenced as `/images/profile.jpg` at runtime (Angular copies `public/**` to the output root).

## CMS

Content is managed via Sveltia CMS at `/admin`. Configuration is at `public/admin/config.yml`.

- **Backend:** GitHub (`siwasit/Siwasit-Portfolio-v2`, `main` branch) via a Cloudflare Worker OAuth proxy (`sveltia-cms-auth`)
- **Deployment:** Cloudflare Pages — a CMS save commits the JSON file, Pages auto-deploys
- **Collections:** Hero, Experience, Projects — each maps to the corresponding `src/content/*.json` file
- **Local development:** uncomment `local_backend: true` in `config.yml` and run `npx decap-server`, then visit `http://localhost:4200/admin`

## Design tokens

| Token | Value |
|---|---|
| Background | `#0b0c0f` |
| Card surface | `#101216` / `#0e1014` |
| Text primary | `#f4f5f7` |
| Text secondary | `#9aa0a8` |
| Text muted | `#6b7079` |
| Accent blue | `#3d6bff` |
| Font display | Space Grotesk (600/700) |
| Font body | Instrument Sans (400/500/600) |
| Font mono | JetBrains Mono (400/500) |

Fonts are loaded via Google Fonts in `src/index.html`. Don't introduce new typefaces.
