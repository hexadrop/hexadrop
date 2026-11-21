# Development and testing

Use the smallest command that validates the changed behavior.

## Commands

| Task | Command |
| --- | --- |
| Install dependencies | `bun install` |
| Run all unit tests | `bun run test` |
| Run tests for one package | `bun test packages/<name>` |
| Run tests for one file | `bun test packages/<name>/src/<file>.test.ts` |
| Lint and fix | `bun run lint:fix` |
| Type-check | `bun run typecheck` |
| Build one package | `cd packages/<name> && bun run prepublishOnly` (runs `tsdown`) |

## Test layout

Unit tests live next to the sources under `packages/*/src/*.test.ts`. `command`, `event`, and `query` additionally provide `bus.mock.bun` and `bus.mock.vitest` helpers that callers use under Bun tests or Vitest.

## Before committing

Lint-staged on pre-commit runs `bun run lint:fix`. The pre-push hook runs `bun test`, `lint:fix`, and `typecheck`. Commit messages are validated by commitlint.

## Building packages

Each package defines `prepublishOnly: tsdown` with its own `tsdown.config.ts`. Build from the package directory, check `dist/` output, and verify `exports` resolve.
