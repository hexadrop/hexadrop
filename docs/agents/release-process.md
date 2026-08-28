# Release process

This monorepo releases ten packages from GitFlow with Changesets. All packages are versioned and published together on `main`; `develop` publishes beta snapshots.

## Daily development

1. Create a work branch from `develop`.
2. For every package behavior change, add a changeset with `bun changeset add`.
3. Merge the pull request into `develop` (squash merge).
4. Each push to `develop` that adds or modifies a changeset publishes a beta snapshot for the changed packages to npm under the `beta` tag.

Install a beta explicitly, for example `npm install @hexadrop/either@beta`.

Snapshot releases do not commit version files; they use pending changesets to compute versions like `0.2.0-beta-20260802153000`.

## Stable release

1. `release-prepare.yml` maintains the draft `changeset-release/main` PR targeting `main` whenever `develop` has non-empty changesets.
2. Mark the generated release PR ready for review and merge it into `main` with a merge commit.
3. `release.yml` on `main` publishes all `@hexadrop/*` packages under `latest`.
4. `sync-to-develop.yml` opens or updates `internal/sync-from-main-to-develop`; merge it with a merge commit.

The release PR carries pending changesets, the calculated version, and the changelog; publication only happens on `main`.

## Release stabilization

Use a `release/*` branch when you need a stabilization period. Only release-critical fixes, docs, and QA changes go there. Merge it into `main`, then merge the `internal/sync-from-main-to-develop` PR back into `develop` with a merge commit.

## Hotfixes

Create `hotfix/*` from `main`, add a changeset, merge into `main`, then merge the resulting sync PR into `develop` with a merge commit.

GitHub Actions must be allowed to create pull requests for `release-prepare.yml` and `sync-to-develop.yml` to work. Topics such as `internal:sync` label exemptions and merge-method rules are detailed in [pull-requests.md](pull-requests.md).
