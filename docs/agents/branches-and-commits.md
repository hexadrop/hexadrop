# Branches and commits

## Branches

| Branch | Purpose | Publication |
| --- | --- | --- |
| `feature/*` | Product and maintenance work | None |
| `develop` | Integration for the next release | Beta snapshot |
| `release/*` | Optional stabilization from `develop` | None |
| `main` | Stable releases | `latest` tag |
| `hotfix/*` | Urgent fix from `main` | None |

## Branch naming

Branch names must match:

```
^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert|release|hotfix|internal)\/[a-z0-9._-]+$
```

Rules: all lowercase; hyphens, dots, or underscores as separators; short, descriptive names. `sync-to-develop.yml` maintains `internal/sync-from-main-to-develop` automatically.

## Commit convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Messages must match `^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([a-z0-9\._-]+\))?!?: .+`. Allowed types: `feat`, `fix`, `docs`, `refactor`, `chore`, `style`, `perf`, `test`, `build`, `ci`, `revert`. Breaking changes use `!` after the type or scope plus a `BREAKING CHANGE:` footer.

## Husky hooks

- `pre-commit` — lint-staged runs `bun run lint:fix` on staged files
- `commit-msg` — commitlint validates the message
- `pre-push` — `bun test`, `lint:fix`, and `typecheck`
