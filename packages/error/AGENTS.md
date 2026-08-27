# @hexadrop/error agent guide

Domain error hierarchy for hexagonal architecture primitives.

- **Package manager:** Bun (`bun`)
- **Build:** `cd packages/error && bun run prepublishOnly` (runs tsdown)
- **Test:** `bun test packages/error`
- **Type-check:** `bun run typecheck`
- **Lint:** `bun run lint:fix`

## Task guides

- [Architecture](docs/agents/architecture.md) — public surfaces and build output.
- [Conventions](docs/agents/conventions.md) — imports, build, and source-code conventions.
- [Development](docs/agents/development.md) — targeted validation and build commands.
- [Release process](docs/agents/release-process.md) — changesets, beta snapshots, stable releases.

Top-level workflow rules (branches, commits, PR rules) live in the root [AGENTS.md](../../AGENTS.md).
