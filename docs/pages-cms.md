# Pages CMS: client editing and handoff

## Review status

Repository: `bryguy-404/Mile-High-Bulldogs`
Review branch: **`codex/pages-cms-test`**
Preview: https://codex-pages-cms-test.mile-high-bulldogs.pages.dev/
Editor: https://app.pagescms.org/

This extends the successful Featured Event pilot rather than replacing it.
The event description and photo are restored from commit `9191286`. The robot
upload and “See you at the game!” test sentence are removed. The production
branch `main` has not been changed by this integration.

## What the client can edit

Every editor is a fixed JSON file. None allows file creation, renaming, or
removal. Text fields are plain text; clients cannot insert HTML, add sections,
reorder cards, or change styles and layout.

| Editor | Editable content |
| --- | --- |
| **1 · Hero** | Intro label; each of the three heading lines; introduction; video poster / background used while loading and for reduced motion. |
| **2 · Featured Event** | Calendar label; section label; accessible matchup heading; “vs.” label; both team graphics and descriptions; event description; date; time; venue; pregame details; ticket deadline; ticket destination; flyer destination and button label; event photo, accessibility description, and caption; four detail labels; contact introduction, name, email, and phone. |
| **3 · Why We Exist** | Section label; heading; all 18 fixed paragraphs, callouts, invitation, and card texts in page order. The closing tagline comes from Shared Information. |
| **4 · Origin Story** | Section label; heading; all 14 fixed paragraphs and callouts in page order. The closing tagline comes from Shared Information. |
| **5 · Gallery** | Section label; heading; introduction; four featured photos; “More Bulldog Moments” heading and subtitle; eleven community photos. Every photo has editable accessibility text. Photo count, position, and cropping rules remain fixed. |
| **6 · Social** | Section label; heading; invitation text. Destinations are edited once under Shared Information. |
| **7 · Shared Information** | Organization name; shared tagline; Facebook and Instagram destinations; ticket and group button labels; disabled swag button label, status and explanation; three navigation labels and destinations; homepage search/social title and description. |

Shared values stay synchronized:

- The ticket URL updates all five ticket buttons; the button label is shared.
- The event date updates the calendar card, details, date banner, and mobile bar.
- The tagline updates the banner, both story closings, and footer.
- Facebook and Instagram destinations update every corresponding link.
- Phone edits update both the visible number and tap-to-call destination. Email
  edits update the visible address and mail link.
- Navigation edits update desktop and mobile menus. Use an existing anchor
  (`#top`, `#event`, `#story`, `#origin`, `#gallery`, `#social`) or a full web URL.

The design, section order, photo counts, crop settings, site logo, favicon,
social preview artwork, videos, disabled shop behavior, and page routes remain
managed in code. This editor does not create pages or events. It updates the
one featured event. The separate HypeReel component is not on the homepage and
has not been added to it.

## Editing and previewing

1. Open this repository in Pages CMS and confirm the branch is
   **`codex/pages-cms-test`** before saving.
2. Open the numbered section you want, edit the fields, and save.
3. A save creates a Git commit on the selected branch. Uploading a photo can
   create a separate commit; select that photo in the field and save the
   section as well.
4. Wait for the Cloudflare Pages deployment for that commit to succeed, then
   refresh the preview. A saved CMS form alone does not prove deployment passed.
5. Check the changed section at desktop and phone widths, including its links.

Keep dates, ticket deadline, descriptive prose, flyer content, and imagery
consistent when updating the featured event. The CMS cannot rewrite dates
inside prose, PDF files, video footage, or photos. Time is displayed as entered;
include a timezone when helpful.

### Images and flyers

The pilot's media configuration is retained: `public/uploads` → `/uploads`,
random names, and JPG/JPEG/PNG/WebP/AVIF uploads. Existing homepage photos and
team graphics are available in that same library. The original event image
remains byte-for-byte intact. The original Red Wings vector graphic has a PNG
copy for the existing raster image picker.

Upload a web-sized image (roughly 1600–2400 pixels on its long side, ideally
under 1 MB), then choose it in the relevant field and describe the image for
accessibility. Keep the existing portrait composition for the event photo and
use similar proportions for gallery replacements. Layout and crop controls
are intentionally absent. Gallery/team images retain responsive Astro image
optimization and detected dimensions; a content hash invalidates transformed
images even if a file is overwritten at the same path. The event photo and
hero poster continue to be served as uploaded.

Flyer editing accepts a complete `https://` link to a PDF or the existing local
`/downloads/ferris-state-alumni-night.pdf`. PDF and video uploads are not part of
the image library. A developer can replace a local PDF; the client can point
the flyer button to an externally hosted document. Never delete or rename a
media file still selected by a section. Content operation restrictions do not
remove the media library's own file-management controls.

## Remaining account steps — complete one at a time

The pilot already proved that the owner's Pages CMS connection can commit text
and image edits to the test branch. Do not reinstall the GitHub App or recreate
`.pages.yml` if that existing connection works.

1. **Open the existing repository and test branch in Pages CMS.** Refresh it and
   confirm all seven numbered editors appear. Stop here for the first handoff;
   report which screen is visible before continuing.
2. **Review one expanded editor on the test branch.** Make one small, reversible
   text change, save, confirm the matching Cloudflare preview deployment, and
   restore the approved text. Repeat with a gallery image if a client rehearsal
   is desired. The prior pilot already verified event-photo uploads; the added
   fields are also covered by repository integration tests.
3. **Confirm the client's access method.** The hosted Pages CMS supports email
   collaborators who do not need GitHub accounts. Use the repository's
   Collaborators management to invite the exact email provided by the owner.
   This guide has not sent an invitation or changed account permissions. Confirm
   the invitation and branch behavior with the owner before sending it.
4. **Have the client accept and rehearse on the test branch.** Confirm they can
   see the section editors and media library but cannot change `.pages.yml` or
   manage collaborators. Verify their save produces a successful preview. If
   using a GitHub login instead, verify appropriate repository access; GitHub
   write access is broader than CMS-only collaboration.
5. **Obtain explicit production approval.** Only then should the developer merge
   the reviewed branch into `main`, confirm Cloudflare's production branch and
   successful build, and verify the live site. No production merge or push is
   included in this handoff.
6. **Select the agreed ongoing editing branch.** Direct saves to `main` would
   publish automatically after a successful build. If the owner wants review
   before every publication, continue editing a review branch and use a
   developer-reviewed merge. The branch selector and hidden CMS controls are
   not a GitHub permission boundary; use repository/branch access rules where
   needed and test that the Pages CMS App can perform the chosen workflow.

If the owner cannot see the repository, inspect the existing Pages CMS GitHub
App installation and ensure this repository is selected. Cloudflare's existing
Git integration must allow preview builds for `codex/pages-cms-test`; production
should remain `main`. No new CMS secrets or runtime API tokens belong in this
static website.

## Developer implementation and validation

- `.pages.yml`: seven single-file editors, fixed objects rather than lists;
  explicit `create: false`, `rename: false`, and `delete: false` on every file.
- `src/content/*.json`: the editable values; every saved key has a CMS field.
- `src/lib/content-validation.ts`, `homepage-content.ts`, `featured-event.ts`,
  and `story.content.ts`: build-time schemas and shared mappings.
- `src/lib/cms-image.ts`: local upload metadata and content-sensitive image cache
  keys. Gallery and team graphics use the existing Astro image service.
- Components retain their existing classes, section anchors, and interaction
  scripts. The date banner's previously hard-coded date is now derived.

`npm run astro -- check` and `npm run build` validate the application. Run
`npm run test:cms` in an isolated checkout to check the CMS/schema contract,
mutate every editable text/link field and image slot, verify rendered HTML and
shared links/dates, and exercise invalid-content build failures. Tests always
restore the original JSON files. `npm run test:browser` checks desktop, mobile,
and tablet rendering, images, navigation, ticket/social links, flyer/video
availability, and browser errors. Optional approved-build comparison checks
section dimensions and screenshot differences.

Invalid or empty required text, impossible dates, unsafe links, invalid contact
information, missing uploaded images or local flyers, and missing fixed gallery
slots fail the build. A failed build leaves the previous successful deployment
in place, but the bad Git commit must still be corrected. Required CMS fields
provide immediate feedback; build validation is the final check.

To undo an edit, restore the prior field values and save on the **same branch**,
or have the developer revert the relevant content/media commit in GitHub. Keep
any image required by the restored content. Wait for the recovery deployment
and verify its preview before considering the edit reverted.

Official references: [Pages CMS quick start](https://pagescms.org/docs/quick-start/),
[content configuration](https://pagescms.org/docs/configuration/content/),
[operation restrictions](https://pagescms.org/docs/configuration/content/operations/),
[image media](https://pagescms.org/docs/configuration/media/), and
[email collaborators](https://pagescms.org/docs/configuration/collaborators/).

## Integration verification record

Verified locally for this handoff:

- Astro check: no errors or warnings (one pre-existing unused-import hint in
  `visual-diff.mjs`, which was left untouched).
- Production build: successful.
- CMS integration test: all 104 editable text/link fields plus the date fields
  and image slots affect rendered output; all five ticket links stay in sync;
  same-path image replacement refreshes generated images; 12 invalid-edit
  scenarios fail the build; approved content is restored afterward.
- Desktop (1440 px), mobile (390 px), and tablet (768 px): identical section
  geometry against the restored pilot. Screenshot differences were 0.0160%,
  0.0206%, and 0.0215%, respectively, after making the original team artwork
  available through the raster picker. No browser, console, or HTTP errors.
- The existing uncommitted `visual-diff.mjs` change in the original checkout was
  compared byte-for-byte with its pre-task patch and preserved.

Authenticated client access and an actual save through the expanded Pages CMS
forms remain the account handoff checks above; local tests do not substitute
for accepting a collaborator invitation.
