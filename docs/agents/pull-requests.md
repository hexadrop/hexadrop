# Pull requests

## Issue-first workflow

No PR without an issue. Open one using the issue templates, wait for the `status:approved` label, then reference it in the PR body with `Closes #N`, `Fixes #N`, or `Resolves #N`. Automated sync PRs carry the `internal:sync` label and are exempt.

## Labels

Each PR must have exactly one `type:*` label (`type:bug`, `type:feature`, `type:docs`, `type:refactor`, `type:chore`, or `type:breaking-change`). Status and priority labels apply to issues only.

The labeler workflow automatically assigns `release` to branches matching `changeset-release/*`.

## PR title

Use the Conventional Commits format, same as commit messages, for example `feat(query): add handler decorator` or `fix(ploc): guard missing context`.

## PR checklist

- [ ] Linked approved issue (`Closes #N`)
- [ ] Exactly one `type:*` label
- [ ] Commits organized by work unit
- [ ] `bun test` passes
- [ ] A changeset for any package behavior change
- [ ] Self-reviewed

## Automated checks

| Check | What it verifies |
| --- | --- |
| Issue reference | PR body links an issue |
| Issue approved | Linked issue has `status:approved` |
| Type label | Exactly one `type:*` label |
| Unit tests | `bun test` |
| ESLint | `bun run lint:ci` |
| Typecheck | `bun run typecheck` |

All checks must pass before merge. Sync PRs with `internal:sync` are exempt from issue and type validation.

## Merge methods

Use the method that keeps `main` and `develop` aligned:

- Work branches (`feat/*`, `fix/*`, `chore/*`, `renovate/*`) → **squash merge**
- `hotfix/*` → `main` → **squash merge**
- `changeset-release/main` → `main` → **merge commit**
- `internal/sync-from-main-to-develop` → `develop` → **merge commit**

Squash short-lived branches; merge-commit when the source is `main` or `develop` so both branches share ancestry.
