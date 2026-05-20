# Senior Leadership CV Static UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the personal site from a React/Babel-rendered dynamic page into a static senior leadership CV/resume page.

**Architecture:** Replace the runtime-rendered app with semantic HTML, inline CSS, native browser behavior, and no framework scripts. Use `<details>` / `<summary>` for expandable experience so the page remains interactive without a JavaScript app.

**Tech Stack:** Static HTML, inline CSS, native HTML disclosure elements, one print button using `window.print()`.

---

## File Structure

- Modify: `index.html`
  - Owns all static markup, styling, links, and native disclosure behavior.
  - Must not load React, ReactDOM, Babel, or JSX.

- Reference only: `docs/superpowers/specs/2026-05-20-senior-leadership-cv-ui-design.md`
  - Approved Executive Brief / Credibility Dashboard design direction.

## Task 1: Static Conversion Checks

- [x] Verify the current dynamic app fails the static-page constraint.

Run:

```bash
test $(rg -n "react|react-dom|babel|text/babel|createRoot|function App|data-design|cv-tweaks|<div id=\"root\"" index.html | wc -l | tr -d ' ') -eq 0
```

Expected before implementation:

```text
Exit code 1
```

- [x] Verify the current app does not yet expose enough semantic static structure.

Run:

```bash
test $(rg -n "<main|<section|<details|<footer|<nav" index.html | wc -l | tr -d ' ') -ge 8
```

Expected before implementation:

```text
Exit code 1
```

## Task 2: Replace Runtime App With Static HTML

- [x] Remove the React root, React/ReactDOM/Babel CDN scripts, JSX script, CV data object, component functions, tweak panel, dynamic design switching, and mutation observer behavior.
- [x] Add static semantic regions: sticky nav, main hero, about, experience, skills, education, and footer.
- [x] Preserve the content, contact links, print action, and first two experience entries open by default.
- [x] Use native `<details>` and `<summary>` for expandable experience entries.

## Task 3: Implement Executive Brief Visual System

- [x] Replace the old three-theme CSS with one production style system.
- [x] Use warm neutral background, high-contrast dark text, restrained accent color, compact executive layout, and metric cards.
- [x] Add responsive behavior for desktop, tablet, mobile, and print.
- [x] Keep text inside containers at mobile widths and avoid horizontal overflow.

## Task 4: Verification

- [x] Verify no runtime app patterns remain.

Run:

```bash
test $(rg -n "react|react-dom|babel|text/babel|createRoot|function App|data-design|cv-tweaks|<div id=\"root\"" index.html | wc -l | tr -d ' ') -eq 0
```

Expected:

```text
Exit code 0
```

- [x] Verify semantic static structure exists.

Run:

```bash
test $(rg -n "<main|<section|<details|<footer|<nav" index.html | wc -l | tr -d ' ') -ge 8
```

Expected:

```text
Exit code 0
```

- [x] Verify the page serves over a local static server.

Run:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
curl -sS -I http://127.0.0.1:4173/
```

Expected:

```text
HTTP/1.0 200 OK
Content-type: text/html
```

- [x] Verify served page content and structure.

Run:

```bash
curl -sS http://127.0.0.1:4173/ | rg -n "<title>|<nav|<main|<details|<footer|Engineering leadership for B2B SaaS scale"
```

Expected:

```text
Matches for title, nav, main, details, footer, and the hero tagline.
```

- [x] Verify whitespace.

Run:

```bash
git diff --check
```

Expected:

```text
No output and exit code 0
```
