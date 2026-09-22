# Mile High Bulldogs

Astro homepage for Ferris State alumni in Colorado, hosted on Cloudflare Pages.

## Pages CMS

The homepage uses seven fixed section editors in `.pages.yml`, with content in
`src/content/*.json` and image uploads in `public/uploads/` (public URLs:
`/uploads/`). The integration extends the existing Featured Event pilot.

**Current review branch:** `codex/pages-cms-test`
**Preview:** https://codex-pages-cms-test.mile-high-bulldogs.pages.dev/
**Editor:** https://app.pagescms.org/

See [the client editing and setup guide](docs/pages-cms.md) for the complete
editable-field inventory, account steps, publishing behavior, and recovery.
The production branch is `main`. Do not merge the review branch or edit `main`
in Pages CMS until the owner approves production launch.

## Development

Requires Node.js 22.12 or newer. Install locked dependencies with `npm ci`.

| Command | Purpose |
| --- | --- |
| `npm run dev -- --background` | Start the background Astro development server |
| `npm run astro -- dev status` | Show the server URL and status |
| `npm run astro -- dev logs` | Read server logs |
| `npm run astro -- dev stop` | Stop the background server |
| `npm run astro -- check` | Astro and TypeScript diagnostics |
| `npm run build` | Validate content and build `dist/` |
| `npm run test:cms` | Exercise every CMS field and invalid-content build failures |
| `npm run test:browser` | Check the built page on desktop, mobile, and tablet |
| `npm run test:browser -- https://codex-pages-cms-test.mile-high-bulldogs.pages.dev/` | Check the deployed preview |

Run `test:cms` in an isolated checkout, with no concurrent editor changes: it
makes temporary content edits and restores them in `finally`. It finishes with
a clean production build. The browser check uses Playwright Chromium
(`npx playwright install chromium`), or a Chrome executable supplied through
`CHROME_PATH`. Screenshots go to ignored `.loop/cms-verification/`.
An optional `CMS_BASELINE_DIR` points to a previously built approved site for
section-geometry and screenshot comparison. `visual-diff.mjs` remains unchanged.
