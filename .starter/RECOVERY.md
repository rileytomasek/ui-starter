# Recovering an interrupted application transition

A failed check leaves `.starter/state.json` and `pnpm setup:finalize --apply`
available. Fix the reported failure, then rerun apply. Completed transformations
are not repeated: edits made while fixing the app are preserved. Do not change
app choices after apply begins; finish or recover before changing configuration.
Preview during recovery lists the original planned operations; verification
operates on the current app files.

The state records an absolute backup path inside Git's `app-setup-backups/`
directory. It contains base64 copies of affected files as they were immediately
before apply, including dirty files. Missing original files are represented by
null. The branch and index are never committed or reset by setup. Unrelated
files are never included in transformations.

To recover, inspect the backup JSON and restore only needed paths: decode the
chosen `files[path]` with `Buffer.from(value, "base64")` and write it to that
repository-relative path. A null entry means the file did not originally exist;
review any new contents before removing it. Recover .starter/config.json and
package.json too, then remove the generated state file to restart. Do not apply
a repository-wide reset, and do not overwrite unrelated or newer app work.
The backup remains in Git metadata after success, not in active app documentation.
