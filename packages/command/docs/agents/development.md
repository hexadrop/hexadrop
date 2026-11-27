# @hexadrop/command development

Use the smallest command that validates the change.

## Commands

| Task | Command |
| --- | --- |
| Tests | `bun test packages/command` |
| Build | `cd packages/command && bun run prepublishOnly` |
| Lint | `bun run lint:fix` |
| Typecheck | `bun run typecheck` |

## Test layout

Tests live next to sources under `src/*.test.ts`.
