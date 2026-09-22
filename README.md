# Astro Starter Kit: Minimal

## Pages CMS pilot

The `codex/pages-cms-test` branch contains the featured-event editing pilot.
Open this repository and branch in Pages CMS, then select **Featured Event**.

- `.pages.yml` defines the editable fields and blocks creating, renaming, or deleting the content file.
- `src/content/featured-event.json` stores the description, date, time, venue, ticket link, photo, and photo description.
- Photos upload to `public/uploads/` and are served at `/uploads/`. For this pilot they are served as uploaded; use reasonably sized web images.
- Date edits update the event card, event details, and mobile ticket bar. Ticket-link edits update all ticket buttons.
- The matchup, team logos, pregame information, ticket deadline, flyer, and contact details remain outside this pilot's editor.

Saving in Pages CMS commits to the selected branch. Cloudflare Pages must have
preview deployments enabled for this branch to update its preview. Saving on
the production branch publishes to the live website after a successful build.
Use the test branch for the pilot; do not merge until the preview is approved.

Validation: `npm run astro -- check` and `npm run build`.
Invalid dates, empty required fields, invalid ticket links, or missing photos
fail the build. To undo an edit, revert its Git commit on the same branch.

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
