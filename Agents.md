# Agents.md — AI Agent Guide for kapilkumawat.in

This file is for any AI coding agent (Claude Code, Cursor, Copilot, Gemini Code Assist, etc.) working on this project.  
Read this before touching any file.

---

## What this project is

Personal CV / portfolio site for **Kapil Kumawat**, Senior Director of Engineering.  
He is actively seeking VP / Head of Engineering / Director of Engineering roles.  
The site is his primary outbound signal to recruiters and hiring managers. **Content accuracy and professional tone are critical.**

---

## Tech stack

- Pure static HTML + CSS + vanilla JS
- No build tools, no frameworks, no npm, no dependencies
- Deployed: GitHub Pages → Cloudflare CDN → `kapilkumawat.in`

---

## Two files, one source of truth

There are two CV documents that must stay in sync:

| File | Purpose | Audience |
|---|---|---|
| `index.html` | Full interactive web CV | Web visitors, recruiters clicking a link |
| `resume.html` | Print-optimised A4 resume | Printed / PDF download via Chrome |

**Rule: any factual change (number, date, company, achievement) must be applied to both files.**  
After editing `resume.html`, the PDF (`Kapil-Kumawat-Resume.pdf`) must be regenerated from Chrome (File → Print → Save as PDF, A4, default margins from `@page`).

---

## Key facts — do not alter without instruction

These are verified facts. Do not "improve" them with approximations or inventions:

| Fact | Value |
|---|---|
| Years of experience | 17+ |
| Engineers led | 30+ (5 countries: Ireland, Serbia, US, Brazil, Canada) |
| Managers developed | 5+ (3 EMs at Goldcast; 2 IC→EM transitions) |
| Interns converted | 26+ (20+ at Harness, 6+ at Goldcast) |
| Pipeline steps (Harness) | 500+, core unchanged 6+ years, <10 lifetime bugs |
| Test coverage (Harness) | 0% → 70% |
| Test coverage (ServiceNow / AppDynamics / Goldcast) | 0% → 80% |
| AI rebuild | 22 Claude agents, 90% unit test coverage, <$200 build cost |
| Cost saving — observability | $190K/yr (Coralogix migration) |
| Cost saving — feature flags | $40K/yr (LaunchDarkly → Harness FF) |
| Client contract renewal | 2× previous value, six-figure deal, top financial institution |
| Career start | Syntel, 2008 |
| Current role | Sr. Director of Engineering @ Goldcast → Cvent (2023–present) |

---

## Content rules

1. **Tone**: factual, confident, first-person implicit. No marketing fluff. No invented superlatives.
2. **Numbers**: only change a quantified claim if Kapil provides updated data.
3. **Dates**: keep `index.html` and `resume.html` date ranges consistent. "Present" means the role is still active.
4. **Email links**: always wrap in `<!--email_off-->…<!--/email_off-->` — this prevents bot harvesting.
5. **Section order**: when in doubt, follow the order in `index.html` as canonical.

---

## Design system (don't break these)

| Token | Value |
|---|---|
| Primary accent | `#10b981` |
| Accent text (dark bg) | `#047857` |
| Dark surface | `#0f172a` / `#1e293b` |
| Fonts | Space Grotesk, Inter, JetBrains Mono |

- CSS lives inline in `<style>` tags — there are no external stylesheets to edit.
- Dark mode uses `html.theme-dark` class + `@media (prefers-color-scheme: dark)`. Both must be kept in sync when adding new components.
- The theme script in `<head>` runs before paint to prevent flash-of-unstyled-content. Do not move it or make it async.

---

## Infrastructure — read before suggesting deployment changes

```
Browser → Cloudflare (CDN + DNS) → GitHub Pages
```

- DNS: `kapilkumawat.in` managed in Cloudflare
- SSL: Cloudflare Full (Strict) — do not break origin cert config
- The `CNAME` file in the repo root contains `kapilkumawat.in` — **never delete or modify it**
- Deployment: push to `main` → GitHub Pages auto-builds → Cloudflare serves from cache
- Cache purge: Cloudflare Dashboard → Caching → Purge Everything (if content doesn't update post-push)
- Do not enable Cloudflare Rocket Loader — it breaks the inline theme script

---

## Common tasks

### Add a new bullet to a section

1. Find the section in `index.html` (look for `<details class="cv-impact-area">` or `<ul class="cv-role-bullets">`)
2. Add the `<li>` in the same format as siblings
3. Mirror the change in the equivalent section of `resume.html`
4. If the bullet contains a number or date, update the Key Facts table above

### Update a date or metric in the hero/outcomes

- Hero metrics: `index.html` → `.cv-metrics` div (around line 1634)
- Scope strip: `index.html` → `.cv-scope-strip` div (around line 1581)
- Outcomes cards: both `index.html` (`.cv-outcomes`) and `resume.html` (`.r-outcomes`)

### Add a new skill pill

Find `.cv-skill-list` under the relevant `.cv-skill-group` and add `<li class="cv-skill">New skill</li>`.

### Regenerate the PDF

Open `resume.html` in Chrome → Cmd+P → Destination: Save as PDF → Paper: A4 → Margins: None → Save → replace `Kapil-Kumawat-Resume.pdf`.

---

## What not to do

- Do not add a build system, package.json, or framework — the site is intentionally zero-dependency
- Do not refactor the CSS into external files — the inline approach is deliberate for a single-file distribution
- Do not invent or round up facts, metrics, or achievements
- Do not remove `<!--email_off-->` wrappers from email links
- Do not delete the `CNAME` file
- Do not add comments to the HTML/CSS explaining what you changed — keep the code clean
- Do not add emoji to content unless Kapil explicitly requests it
