# TZ GEMS project workflow

## Repository and branches

- Use `syedmukhtarpatan-hue/tzgems` on GitHub. The local remote is `origin`.
- Work on `staging`. Save new designs and major changes in descriptive commits.
- The user authorized publishing all completed, checked phases to `main` on
  11 October 2026. This supersedes the earlier instruction to request approval
  before each promotion to `main`. No repeated confirmation is needed.
- At phase completion, review the changes, run the relevant available checks,
  inspect tracked and staged files for secrets, commit the phase, and publish
  all intended source/configuration/documentation changes to GitHub `main`.
- Keep `staging` aligned with the completed phase, then continue development
  there. Do not publish unfinished phases or changes with failed checks.
- Use the connected GitHub app when terminal Git authentication is unavailable.
  Read the remote head before writing and verify remote file contents afterward.
  Connector-created commits may have different IDs from local commits. Preserve
  local commits and integrate remote history with an ordinary merge; never reset
  or rebase to make commit IDs match. Compare the final trees to verify parity.
- Never force-push, rewrite existing history, delete existing work, or bypass
  branch protections. Reinspect unexpected remote changes before integrating them.
- Keep credentials, real environment values, dependencies, build output, and
  ignored local artifacts out of commits and uploads. "All code" means intended
  project source and supporting files, not ignored artifacts.
- Pushing completed phases to GitHub does not itself authorize website deployment.

## Current scope

Only version-control setup has been requested so far. Do not begin the TZ GEMS
website implementation until the user asks to start it. See `VERSION_CONTROL.md`
for the beginner workflow and authentication options.
