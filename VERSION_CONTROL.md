# TZ GEMS version control

Git saves named checkpoints of your files. Each checkpoint is a commit, with a
short identifier such as `abc1234`. A branch is a named line of development.

The website uses Next.js App Router, React, TypeScript, and Tailwind CSS.
The `.gitignore` covers common web dependencies, builds, environment values,
credentials, and local development files.

## The two branches

- `main`: the stable production branch. Merging or pushing changes here always
  requires the user's explicit approval.
- `staging`: all current development work and completed development phases.
  Work exclusively here until the user changes this instruction.

New designs and major changes should have separate, descriptive commits, for
example `Add emerald collection layout` or `Refine mobile product navigation`.
Save a checkpoint before trying a substantially different design.

Git saves history; it does not deploy a website. Publishing through a hosting
service is a separate action that needs approval.

## Save a checkpoint

Run these commands from the project folder. Start by checking your branch and
files:

```sh
git status
git branch --show-current
```

If you are not on `staging`, save any current work before switching branches.
With a clean working folder, use `git switch staging`.

Review your changes, stage only the intended files, and review the staged changes:

```sh
git diff
git add -- path/to/changed-file path/to/another-file
git diff --cached --stat
git diff --cached
git commit -m "Describe the design or change you completed"
git status
```

Replace the example file paths with your real files. New, untracked files do not
appear in `git diff` until you stage them, so review their contents too.

Before every commit, check that the staged files contain no passwords, API keys,
tokens, private keys, or real environment values. `.gitignore` prevents matching
untracked files from being added normally; it does not remove files that were
already tracked. Do not use `git add -f` to bypass the ignore rules. Keep real
secrets outside Git, and use placeholders in environment templates.

## Compare versions

```sh
git log --oneline --decorate -15
git diff
git diff --cached
git diff main..staging
git log --oneline main..staging
git diff OLD_COMMIT NEW_COMMIT
```

The log lists your saved checkpoints. `git diff` shows unsaved changes to tracked
files; `git diff --cached` shows the next proposed commit. The branch comparisons
show what development has changed since the approved version. Replace
`OLD_COMMIT` and `NEW_COMMIT` with identifiers from the log.

## See a previous design safely

Open an old checkpoint in a separate folder, leaving your current files intact:

```sh
git worktree add --detach ../tz-gems-preview CHECKPOINT
```

Replace `CHECKPOINT` with the desired commit identifier. Use a fresh folder name
if `../tz-gems-preview` already exists. This is a preview: do not save development
commits there. Ask Codex to help preview it using the framework once one exists.

## Restore a previous design without losing history

First commit your current work and confirm `git status` is clean. To undo one
specific design commit, stay on `staging` and make a new commit that reverses it:

```sh
git switch staging
git revert COMMIT_TO_UNDO
git status
```

Replace `COMMIT_TO_UNDO` with the identifier from the log. Review and test the
result before publishing the restore to GitHub `staging`.

A revert preserves the original commit and records its reversal. To restore an
entire older checkpoint across multiple commits, preview it in a separate working
folder, then record the selected restored files as a new commit on `staging`. Ask
Codex to perform that restore after you select the checkpoint; preserve the
latest version and review the restored design before merging it into `staging`.

If a revert or merge reports conflicts, stop and ask for help. A conflicted
revert can be cancelled with `git revert --abort`. Do not use reset, clean,
force-push, or amend/rebase existing commits to restore a design.

## Publish completed development phases to staging

The latest user instruction is to work exclusively on `staging` and push completed
development phases to `staging`. It revokes earlier permission to publish phases
automatically to `main`. This rule is also saved in `AGENTS.md`.

Finish the phase on `staging`, review the changes, preview the design when one
exists, run the relevant available checks, check for secrets, and save a
descriptive commit. A phase with unfinished work or failed checks is not ready
to publish. Upload intended source, configuration, and documentation; keep ignored
dependencies, builds, credentials, and local artifacts out of GitHub.

With authenticated terminal Git, first fetch and inspect remote changes. If
`origin/staging` is already included in `staging` and the working folder is clean,
push the completed phase:

```sh
git fetch origin
git status
git diff main..staging
git log --oneline main..staging
git merge-base --is-ancestor origin/staging staging
git push origin staging
git status
```

Run the commands in order and stop if any command fails. If remote changes are
not included in `staging`, inspect and integrate them with an ordinary merge
before pushing. If branches diverge or GitHub rejects a push, investigate;
never force-push or bypass branch protections. Stay on `staging`.

Production promotion is a separate step. Review the finished staging version with
the user and get explicit approval before merging or pushing anything to `main`.

The connected GitHub app can also publish a phase when terminal authentication
is unavailable. Codex reads the remote staging head, uploads the intended files,
advances only `staging` without forcing it, and verifies the published contents. This is a
phase-completion workflow carried out during our work, not a background scheduler.
Website deployment remains a separate action.

## Connected GitHub repository

A local repository is not an off-device backup. You selected the existing
repository <https://github.com/syedmukhtarpatan-hue/tzgems>, which is connected
locally as `origin`. It was empty when inspected, with `main` configured as its
default branch. No new GitHub repository was created.

The GitHub app is authenticated as `syedmukhtarpatan-hue` and has write access.
The selected repository was public when checked. You instructed Codex to use this
repository and publish completed phases to `staging`; no visibility change was made.

GitHub CLI (`gh`) was unavailable, and terminal Git authentication was not set up.
The app connection can upload project files without installing `gh`. Its API
creates GitHub commits with their own identifiers, so those identifiers can differ
from the original local checkpoints. Preserve the local history, fetch the remote
commits, and integrate them with an ordinary merge. For the first connection of
two independently initialized histories, use an explicitly reviewed merge with
`--allow-unrelated-histories` once; do not reset either history.

After connector publication, compare `git diff origin/staging staging`:
empty output means the tracked development files match.
Local branches can still show extra local commits. Uploading those exact original
commit records requires authenticated terminal Git. A later ordinary push can
upload them once the remote commits are ancestors of the local branch.

For terminal Git access, install GitHub CLI from <https://cli.github.com/>. If
Homebrew is already installed, use `brew install gh`, then authenticate:


```sh
gh auth login --hostname github.com --git-protocol https --web
gh auth setup-git --hostname github.com
gh auth status --hostname github.com
```

Complete the browser sign-in. When asked whether to authenticate Git with your
GitHub credentials, answer **Yes**. Do not share tokens or passwords in this chat.
Tell Codex when sign-in is complete. Codex can then recheck the remote's history
and upload the preserved local commit records with an ordinary push.

After authentication and verification, set up the staging push if needed:

```sh
git push --set-upstream origin staging
```

## Verify the setup

```sh
git status
git branch -vv
git log --oneline --decorate --all
git remote -v
```

Both `main` and `staging` should exist after the baseline commit. Normal work
should be on `staging`, with a clean working folder after a checkpoint. `origin`
should point to `https://github.com/syedmukhtarpatan-hue/tzgems.git`. After the
first publication, both remote branches should exist and each local branch should
track its corresponding remote branch. An ahead count can include preserved local
commits even when the local and GitHub files match.

The repository uses `pull.ff=only` to stop a pull from silently creating a merge
commit, and `push.default=simple` to avoid pushing an unintended branch. During
local setup, no global Git settings were changed. The optional `gh auth setup-git`
command configures Git's authentication helper for GitHub. Commit author details are stored only in this
repository. Lockfiles belong in Git; `work/` and `outputs/` are generated local
workspace artifacts and stay on disk without being committed.
