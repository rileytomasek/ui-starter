# Configure a consuming application

Use GitHub's **Use this template → Create a new repository**, keeping visibility
appropriate for the app. Clone that new repository. The upstream repository is
not a consuming app: apply refuses its origin. For a disposable/local copy, use
a separate Git repository with an initial commit and no upstream origin.

1. Read README, AGENTS.md, and its two-skill UI workflow. Install Node 24.10.0,
   pnpm 11.14.0, dependencies (`pnpm install`), and browser binaries
   (`pnpm exec playwright install chromium firefox webkit`). Run `pnpm dev`.
2. Edit `.starter/config.json`: name, purpose, intended users, npm packageName,
   shell (`header` or `sidebar`), and initial routes with path/title/description.
   First route must be `/`; routes are concrete lowercase paths. Reuse user-provided
   decisions. Missing identity is an error, not a prompt to invent product scope.
3. Review colors/fonts/density/radius/icons in `visual`. Defaults describe the
   actual shipped foundation. If changing them, edit src/index.css/font imports
   using [UI](../ui.md), then record what you chose. These fields record decisions;
   they do not execute arbitrary CSS. Carbon stays the coherent UI family.
   Base UI Nova is the maintained primitive/preset choice. Changing primitive base
   requires a component migration, not a components.json edit.
4. Set explicit retainGallery/retainExamples booleans. Gallery requires examples.
   Keep both to retain a development reference; keep examples alone for reference
   source; keep neither for a minimal app. Shared primitives/integrations remain.
   Reference-only dependencies are removed only when remaining code does not use
   them. No runtime auth/backend/deployment choices are inferred.
5. Run `pnpm setup:finalize --preview`. Preview is non-mutating and prints every
   proposed write (including its content), removal, lockfile update, and check.
   Review the proposed app pages and instructions. Modified files require recorded
   resolutions with their current SHA-256; see below.
6. Run `pnpm setup:finalize --apply`. It saves affected original bytes in Git metadata,
   changes only manifest-listed files, formats generated files, reconciles the
   lockfile, then runs `pnpm check` and `pnpm test:e2e`. It never commits or resets.
   A failed check preserves the tool and a recovery journal. Fix the failure and
   retry apply; completed transformations do not overwrite your fixes.
7. After success, setup scripts, `.starter/`, this guide, and original specs are
   removed. README/AGENTS describe only the app. Run `pnpm dev`, review configured
   pages in light/dark and mobile/desktop, inspect `git diff`, then commit the app.
   `pnpm setup:finalize` no longer exists after success; normal checks remain.

Example choices (replace these with the actual app's purpose):

```json
{
  "name": "Fieldnotes",
  "purpose": "Organize research observations and review work.",
  "users": "Product researchers",
  "packageName": "fieldnotes",
  "shell": "header",
  "routes": [
    {
      "path": "/",
      "title": "Observations",
      "description": "Research observations and recent work."
    },
    { "path": "/reviews", "title": "Reviews", "description": "Upcoming research reviews." }
  ],
  "retainGallery": false,
  "retainExamples": false
}
```

Keep the visual and resolutions objects from the complete config. Generated pages
have honest titles/descriptions and no fake persistence actions. Extend them with
real app features after finalization.

## Modified files

The shipped manifest records exact files and hashes. Never refresh it in a consuming
copy to bypass conflicts. Preview reports a changed file and its current hash. Add
an entry under `resolutions`, e.g. `"README.md": {"action":"remove","sha256":"…"}`
only when replacing that modified file is intended. `remove` authorizes the planned
replacement/deletion, not deletion of arbitrary paths. A changed hash invalidates
that decision.

`keep` preserves an already app-specific replacement; it must pass final checks and
retain the configured purpose, both UI skills and their usage, and CLI conventions. To keep example
files, select the corresponding retention choice. Temporary setup/spec instructions
cannot remain active: use `migrate` after manually transferring enduring content to
an existing retained file. Record `to`, `targetSha256`, and the source `sha256` to
acknowledge that transfer. The tool verifies the destination exists unchanged, then
performs the planned replacement/removal. It does not guess how to merge prose.

New files in temporary directories must be moved out before apply. New unrelated
files elsewhere are untouched. Symlinks and escaping paths are rejected. Preserve
legal notices and skill provenance. See [.starter/RECOVERY.md](../../.starter/RECOVERY.md)
for retry and restoring selected files from the recorded Git-metadata backup.
