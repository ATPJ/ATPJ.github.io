# ATPJ portfolio

A bilingual (English / Persian) developer portfolio, built as a live view of a server the developer operates: a deploy log in the hero, skills as `docker ps`, projects as a `git log`, working style as systemd lines, contact as an SSH prompt.

Static site: [Astro](https://astro.build) + hand-written CSS + a few small TypeScript scripts. Hosted on GitHub Pages.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # static output in dist/
npm run preview    # serve dist/ on http://localhost:4331
npm test           # unit tests (Vitest)
npx playwright install chromium   # once
npm run test:e2e   # browser tests (Playwright + axe)
```

## Editing content

All content lives in `src/content/` and is validated at build time. Every user-visible string needs both `en` and `fa`; a missing one fails the build.

| File | What it holds |
|------|---------------|
| `profile.ts` | handle, role, tagline, about text, contact links |
| `skills.ts` | skill groups and each skill's category (it decides the color) |
| `projects.ts` | `verified` projects (stack and contributions required) and `general` ones (no name, no link) |
| `soft-skills.ts` | working-style lines |
| `i18n/en.ts`, `i18n/fa.ts` | UI strings (both files must have the same keys) |

To add a project link later, add `url: 'https://…'` to the project in `projects.ts` (verified projects only).

Colors, type, spacing, and motion timings are tokens in `src/styles/tokens.css`.

## Deployment

Push to `main`. `.github/workflows/deploy.yml` runs tests, builds, runs the browser tests, and deploys to GitHub Pages.

- The site is built for a **user site** (`ATPJ.github.io`, served at `https://atpj.github.io/`). In the repository settings, set Pages to **GitHub Actions**.
- To serve from a repository subpath or a custom domain instead, change `SITE` and `BASE` in the workflow (for example `BASE=/portfolio/`). Nothing else changes.

## Languages

- `/` is English, `/fa/` is Persian (right to left; code stays left to right).
- A first visit to `/` goes to `/fa/` only when the browser language is Persian and the visitor has not chosen a language yet. The choice made with the language switch is remembered in `localStorage`.
