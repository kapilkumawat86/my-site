# kapilkumawat.in

Personal portfolio site for Kapil Kumawat, Sr. Director of Engineering.

## Contents

- **`/`** — CV and portfolio page
- **`/options-game/`** — Options Trader: Volatility Wars — an offline-first PWA educational game covering calls, puts, Greeks, Iron Condors, and risk management across 13 chapters

## Tech stack

Static HTML, CSS, and JavaScript with no build tools. Deployed via GitHub Pages at [kapilkumawat.in](https://kapilkumawat.in).

## Development

Open any `.html` file directly in a browser, or serve locally:

```sh
npx serve .
```

## Deployment

Commits to `main` deploy automatically via GitHub Pages.

To update the game's offline cache, bump `CACHE_VERSION` in `options-game/service-worker.js`.
