# Senior Leadership CV UI Design

Date: 2026-05-20

## Goal

Improve the personal website so it reads as a polished senior engineering leadership CV/resume page. The page should support Director and VP of Engineering opportunities by making leadership scope, business credibility, and contact paths easier to scan.

The selected direction is an Executive Brief presentation with Credibility Dashboard elements: calm, mature, recruiter-friendly, and evidence-led.

## Current State Review

The site is a single static `index.html` file that renders React through CDN scripts and Babel in the browser. It contains three complete visual directions, a hidden tweaks panel, embedded portrait data, and the CV content.

Issues to address:

- The current production page still carries design-exploration mechanics that are not useful to visitors.
- The first screen is visually interesting, but it behaves more like a design concept than an executive CV.
- Three theme systems in one file make the page harder to maintain and increase page weight.
- Recruiter-critical information exists, but it should be prioritized more clearly above the fold.
- Mobile layout needs tighter navigation, spacing, and button behavior.

## Audience

Primary audience:

- Founders, CTOs, VPs, and recruiters evaluating Kapil for Director or VP of Engineering roles.

Secondary audience:

- Engineering leaders and peers checking background, credibility, and contact links.

## Design Direction

Use one production visual system:

- Warm neutral background.
- High-contrast dark text.
- Restrained accent color for actions and key proof points.
- Dense but readable executive layout.
- Minimal decoration.
- Clear sections with stable spacing and strong typographic hierarchy.

The site should feel like an executive brief, not a portfolio landing page or visual experiment.

## Page Structure

### Header

The header should stay sticky but become cleaner and more compact.

Include:

- `KK` or full name mark.
- Section links: About, Experience, Skills, Education.
- Print action.
- Primary contact action.

Mobile behavior:

- Avoid cramped nav links.
- Keep primary contact accessible.
- Hide or compact secondary links when needed.

### Hero

The hero should become the main executive snapshot.

Content:

- Availability/target-role indicator.
- Name and current title.
- Headline: `Engineering leadership for B2B SaaS scale.`
- Concise supporting copy summarizing 17+ years, organization scaling, delivery systems, and notable companies.
- Contact links for email, LinkedIn, and GitHub.
- Understated portrait, if retained.

Hero should prioritize message clarity over oversized typography.

### Credibility Metrics

Keep metrics above the fold or immediately after the hero.

Use compact evidence cards for:

- `17+` years in engineering.
- `0->10x` team/org scaling.
- `70%` test coverage from zero baseline.
- Director/VP target or current senior leadership scope.

Metrics should be scannable and visually connected to the hero.

### About

Convert About into a concise executive summary.

Keep:

- The current leadership philosophy.
- Hands-on engineering credibility.
- CI/CD, test strategy, developer productivity, ownership, and mentorship.

Reduce visual ornamentation and improve paragraph rhythm.

### Experience

Keep expandable experience, but improve scanning.

Requirements:

- Default-open the most recent two companies.
- Make company, role, years, and location easy to read.
- Give current Goldcast and Harness roles stronger visual priority.
- Keep historical roles available without overloading the first read.
- Improve touch target and focus behavior on expandable rows.

### Skills

Keep grouped skills, but present them as executive capabilities.

Groups:

- Leadership.
- Platform.
- Engineering.

The section should read as capabilities, not a keyword wall.

### Education And Recognition

Keep education, certifications, and awards as compact supporting proof.

This section should not visually compete with Experience.

### Footer

Simplify the footer into a contact close.

Include:

- Short note about target roles.
- Email action.
- LinkedIn action.
- Location and contact metadata.

Avoid making the footer a second oversized hero.

## Technical Scope

Keep the implementation as a static single-file site for this iteration.

Changes planned:

- Collapse production styling to one maintained visual direction.
- Remove visitor-facing theme/tweaks UI.
- Remove unused alternate theme code where practical.
- Preserve existing content, portrait data, links, and print action.
- Add `.superpowers/` to `.gitignore` so brainstorming artifacts stay out of commits.

Out of scope:

- Moving to Vite, Next.js, or a build system.
- Rewriting content from scratch.
- Adding a blog, project portfolio, testimonials, or analytics.
- Replacing the portrait image.

## Accessibility And Responsive Requirements

- Maintain semantic section structure.
- Ensure buttons and expandable job rows are keyboard reachable.
- Keep text readable on mobile without overlap.
- Use responsive constraints instead of viewport-scaled text for compact UI elements.
- Respect print action and avoid breaking print layout.
- Keep color contrast strong for body text and actions.

## Verification

Before claiming the implementation is complete:

- Open the page locally and inspect desktop and mobile widths.
- Verify hero, nav, metrics, expandable jobs, contact links, portrait, and footer render correctly.
- Run a static smoke check for obvious HTML/script errors.
- Confirm `.superpowers/` remains ignored.

## Open Decisions

None. The approved direction is Executive Brief with Credibility Dashboard elements.
