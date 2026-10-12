# TZ GEMS project workflow

## Repository and branches

- Use `syedmukhtarpatan-hue/tzgems` on GitHub. The local remote is `origin`.
- Work on `staging`. Save new designs and major changes in descriptive commits.
- Work exclusively on `staging`. The user's latest instruction supersedes all
  earlier authorizations to publish completed phases automatically to `main`.
- Keep `main` as the stable production branch. Never merge or push development
  changes to `main` without the user's explicit approval.
- At phase completion, review the changes, run the relevant available checks,
  inspect tracked and staged files for secrets, commit the phase, and publish
  all intended source/configuration/documentation changes to GitHub `staging`.
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

The user requested a complete rebuild against the final approved TZ GEMS
wireframe on 11 October 2026. The former editorial design is obsolete.
Do not deploy to production. Leave the rebuilt site ready for review on staging.
Use white #FFFFFF, navy #111936, Libre Baskerville and Inter.
See `docs/REBUILD.md` for current routes, content gaps and verification.
Build with Next.js App Router, TypeScript, Tailwind CSS, React, and Lucide icons.
Use clearly labelled demonstration products and illustrative assets until real
inventory and authorised brand photography are supplied. Never invent business
credentials, testimonials, certificates, event attendance, prices, or contacts.
The user selected demo mode for WhatsApp: do not display a fake phone number.
Do not ask for the WhatsApp number again. Preserve the original local history,
including the four local records from the initial GitHub connection.
See `VERSION_CONTROL.md` for the checkpoint and phase-publishing workflow.
