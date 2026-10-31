# hexadrop agent guide

A monorepo of hexagonal-architecture utilities and DDD primitives for TypeScript, published as the `@hexadrop/*` packages.

- **Package manager:** Bun (`bun`)
- **Build:** per package, from its directory: `bun run prepublishOnly` (runs tsdown)
- **Test:** `bun run test`
- **Type-check:** `bun run typecheck`
- **Lint:** `bun run lint:fix`

## Packages

| Package | Scope | Agent guide |
| --- | --- | --- |
| `@hexadrop/aggregate-root` | DDD aggregate root | [AGENTS.md](packages/aggregate-root/AGENTS.md) |
| `@hexadrop/command` | Command pattern | [AGENTS.md](packages/command/AGENTS.md) |
| `@hexadrop/either` | Either monad | [AGENTS.md](packages/either/AGENTS.md) |
| `@hexadrop/error` | Domain errors | [AGENTS.md](packages/error/AGENTS.md) |
| `@hexadrop/event` | Domain events | [AGENTS.md](packages/event/AGENTS.md) |
| `@hexadrop/ioc` | IoC container | [AGENTS.md](packages/ioc/AGENTS.md) |
| `@hexadrop/ploc` | Observable state container | [AGENTS.md](packages/ploc/AGENTS.md) |
| `@hexadrop/query` | Query pattern | [AGENTS.md](packages/query/AGENTS.md) |
| `@hexadrop/types` | Type utilities | [AGENTS.md](packages/types/AGENTS.md) |
| `@hexadrop/value-object` | Value objects | [AGENTS.md](packages/value-object/AGENTS.md) |

## Task guides

- [Architecture](docs/agents/architecture.md) — public surfaces and build output.
- [Conventions](docs/agents/conventions.md) — runtime, imports, and source-code conventions.
- [Development and testing](docs/agents/development.md) — targeted validation, linting, and per-package build commands.
- [Release process](docs/agents/release-process.md) — changesets, beta snapshots, stable releases, and hotfixes.
- [Pull requests](docs/agents/pull-requests.md) — approved-issue, labeling, checklist, and merge requirements.
- [Branches and commits](docs/agents/branches-and-commits.md) — GitFlow branches, naming, conventions, and hooks.
