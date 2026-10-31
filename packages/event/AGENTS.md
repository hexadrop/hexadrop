# @hexadrop/event agent guide

Domain event primitives with in-memory, pub-sub, and IoC-backed bus adapters.

- **Package manager:** Bun (`bun`)
- **Build:** `cd packages/event && bun run prepublishOnly` (runs tsdown)
- **Test:** `bun test packages/event`
- **Type-check:** `bun run typecheck`
- **Lint:** `bun run lint:fix`

## Task guides

- [Architecture](docs/agents/architecture.md) — public surfaces and build output.
- [Conventions](docs/agents/conventions.md) — imports, build, and source-code conventions.
- [Development](docs/agents/development.md) — targeted validation and build commands.

Top-level workflow rules (branches, commits, PR rules) live in the root [AGENTS.md](../../AGENTS.md).
