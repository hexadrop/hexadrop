# @hexadrop/ploc agent guide

Ploc observable state container with React and in-memory adapters.

- **Package manager:** Bun (`bun`)
- **Build:** `cd packages/ploc && bun run prepublishOnly` (runs tsdown)
- **Test:** `bun test packages/ploc`
- **Type-check:** `bun run typecheck`
- **Lint:** `bun run lint:fix`

## Task guides

- [Architecture](docs/agents/architecture.md) — public surfaces and build output.
- [Conventions](docs/agents/conventions.md) — imports, build, and source-code conventions.
- [Development](docs/agents/development.md) — targeted validation and build commands.

Top-level workflow rules (branches, commits, PR rules) live in the root [AGENTS.md](../../AGENTS.md).
