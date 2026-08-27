# @hexadrop/either agent guide

Either monad for functional error handling with Left/Right helpers.

- **Package manager:** Bun (`bun`)
- **Build:** `cd packages/either && bun run prepublishOnly` (runs tsdown)
- **Test:** `bun test packages/either`
- **Type-check:** `bun run typecheck`
- **Lint:** `bun run lint:fix`

## Task guides

- [Architecture](docs/agents/architecture.md) — public surfaces and build output.
- [Conventions](docs/agents/conventions.md) — imports, build, and source-code conventions.
- [Development](docs/agents/development.md) — targeted validation and build commands.

Top-level workflow rules (branches, commits, PR rules) live in the root [AGENTS.md](../../AGENTS.md).
