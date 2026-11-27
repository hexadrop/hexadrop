# @hexadrop/types development

Use the smallest command that validates the change.

## Commands

| Task | Command |
| --- | --- |
| Tests | `bun test packages/types` |
| Build | `cd packages/types && bun run prepublishOnly` |
| Lint | `bun run lint:fix` |
| Typecheck | `bun run typecheck` |

## Test layout

Tests live next to sources under `src/*.test.ts`.
