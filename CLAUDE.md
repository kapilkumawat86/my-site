# CLAUDE.md — kapilkumawat.in

## Project overview

Personal CV / portfolio site for Kapil Kumawat (Senior Director of Engineering).  
Static HTML + CSS + JS — no build tools, no frameworks.  
Deployed via GitHub Pages at `kapilkumawat.in`. Commits to `main` auto-deploy.

## Files

| File | Purpose |
|---|---|
| `index.html` | Web CV (full interactive site) |
| `resume.html` | Print-optimised A4 resume (linked as downloadable PDF source) |
| `Kapil-Kumawat-Resume.pdf` | Pre-generated PDF served as the download |
| `favicon.svg` | SVG favicon (matches nav brand mark) |
| `og-image.png` | Open Graph / Twitter card image (1200×630) |
| `icon-192.png` / `icon-512.png` | PWA / Apple touch icons |
| `site.webmanifest` | Web app manifest |
| `sitemap.xml` | SEO sitemap |
| `robots.txt` | Crawler rules |
| `options-game/` | Standalone offline-first PWA game (separate sub-project) |

## Infrastructure

```
Browser → Cloudflare (CDN + DNS) → GitHub Pages
```

| Layer | Details |
|---|---|
| **DNS** | `kapilkumawat.in` — managed in Cloudflare DNS |
| **CDN** | Cloudflare — handles SSL termination, caching, DDoS protection, and edge delivery |
| **Hosting** | GitHub Pages (repo: `kapilkumawat86/my-site` or similar, `main` branch) |
| **Custom domain** | Configured via `CNAME` file in repo root (contains `kapilkumawat.in`) |
| **SSL** | Cloudflare Full (Strict) — Cloudflare issues the edge cert; GitHub Pages provides the origin cert |

### Cloudflare cache behaviour

- Static assets (`*.png`, `*.pdf`, `*.svg`, `*.ico`) are cached at the edge.
- `index.html` and `resume.html` should be treated as short-TTL or bypass-cache so content updates propagate quickly after a push.
- After pushing a content change, if it doesn't appear: **Cloudflare Dashboard → Caching → Purge Everything** (or purge specific URLs).

### Deployment flow

1. Edit files locally
2. `git push origin main`
3. GitHub Pages rebuilds (usually under 60 seconds)
4. Cloudflare serves the updated content from cache or fetches fresh from origin

### Things to avoid

- Do not change the `CNAME` file — removing or altering it breaks the custom domain mapping.
- Do not enable Cloudflare "Rocket Loader" — it can defer inline scripts and break the theme FOUC prevention script.
- Cloudflare Page Rules or Transform Rules that redirect `www.kapilkumawat.in` should preserve HTTPS.

## Serving locally

```sh
npx serve .
# opens at http://localhost:3000
```

## Design system

- Primary accent: `#10b981` (emerald green)
- Dark accent text: `#047857`
- Dark backgrounds: `#0f172a` / `#1e293b`
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (code/nav)
- Supports auto / forced dark / forced light themes via `localStorage('cv-theme')`
- CSS custom properties on `:root`; dark overrides via `html.theme-dark` and `@media (prefers-color-scheme: dark)`

## Content structure (index.html)

| Section | ID | Description |
|---|---|---|
| Hero | `#top` | Name, title, scope strip, proof points, metrics |
| About | `#about` | Philosophy, outcomes cards, 6 principles |
| Impact Portfolio | `#impact` | 7 expandable impact areas |
| Experience | `#experience` | Career timeline + 7 job accordions |
| Skills | `#skills` | 3 skill groups as pill lists |
| AI Era | `#ai` | Agentic development narrative |
| Education | `#education` | Degrees, certs, awards |
| Footer | — | CTA + contact meta |

## Resume sections (resume.html)

Numbered 01–08: Frontend Engineering, Building Products, Managing Teams, Client Experience, Technology Innovations, Coaching, Global Partners, Leadership Philosophy.

## Key content facts (single source of truth)

- 17+ years engineering experience
- 30+ engineers led globally (5 countries: Ireland, Serbia, US, Brazil, Canada)
- 5+ managers developed (3 EMs at Goldcast; 2 IC→EM transitions)
- 26+ interns converted to production engineers (20+ at Harness, 6+ at Goldcast)
- Harness pipeline step framework: 500+ steps, core unchanged 6+ years, <10 lifetime bugs
- Test coverage: 0→70% at Harness; 0→80% at ServiceNow, AppDynamics, Goldcast
- AI rebuild: 22 Claude agents, 90% unit test coverage, <$200 build cost
- Cost savings: $190K (Coralogix migration) + $40K (LaunchDarkly → Harness FF)
- 2× contract renewal (top financial institution, six-figure deal)
- Career: Syntel (2008) → CA Tech → Pegasystems → ServiceNow → AppDynamics → Harness (2019–2023) → Goldcast → Cvent (2023–present)

## Important patterns

- Email links are wrapped in `<!--email_off-->…<!--/email_off-->` to prevent bot harvesting
- Coverage bar animations use `IntersectionObserver` + `data-pct` attribute + CSS `transition`
- Theme script runs inline before paint to avoid FOUC
- Print stylesheet hides nav, portrait, and expands all `<details>` accordions
- `resume.html` has `noindex, follow` robots meta (not meant to be directly indexed)

## Updating the PDF

After editing `resume.html`, print-to-PDF from Chrome (A4, no margins beyond page `@page` settings) and replace `Kapil-Kumawat-Resume.pdf`.
