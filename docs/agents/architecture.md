# Architecture

Hexadrop is a Bun monorepo of ten independently published packages under `packages/*`. Each package exposes public entry points in `src/` that map to the top-level `exports` in its `package.json`, and emits ESM-only artifacts with `tsdown` into `dist/`.

## Packages

| Package | Public surfaces |
| --- | --- |
| `@hexadrop/aggregate-root` | `AggregateRoot` with pull/pull-and-wipe domain events |
| `@hexadrop/command` | `command`, `bus`, `bus.sync`, `decorator`, `handlers`, `handlers.memory`, `handlers.ioc`, `bus.mock.bun`, `bus.mock.vitest` |
| `@hexadrop/either` | `Either` monad (`Left`/`Right` helpers) |
| `@hexadrop/error` | `DomainError`, `InvalidArgumentError`, `NotFoundError` |
| `@hexadrop/event` | `domain-event`, `bus`, `bus.async`, `bus.sync`, `bus.pub-sub`, `decorator`, `handlers`, `handlers.memory`, `handlers.ioc`, `bus.mock.bun`, `bus.mock.vitest` |
| `@hexadrop/ioc` | `Container`, `decorator.service` |
| `@hexadrop/ploc` | `Ploc` observable state container, `hook` (React hook), `memory` adapter, `react` adapter |
| `@hexadrop/query` | `query`, `bus`, `bus.sync`, `decorator`, `handlers`, `handlers.memory`, `handlers.ioc`, `bus.mock.bun`, `bus.mock.vitest` |
| `@hexadrop/types` | `abstract`, `awaitable`, `class`, `instance`, `newable`, `nullable`, `primitives`, `recursive-partial` |
| `@hexadrop/value-object` | `boolean`, `date`, `email`, `number`, `string`, `ulid`, `uuii`, `spanish/document-number`, `spanish/phone-number` |

Details per package live in each `packages/<name>/docs/agents/architecture.md`.

## Build output

Every package has its own `tsdown.config.ts`. It emits ESM-only artifacts (`*.mjs` plus `*.d.mts`) into `dist/`, with minification and sourcemaps. Packages bundling Bus mocks for tests (`command`, `event`, `query`) mark `bun:test` under `deps.neverBundle`. Published `files` are limited to `dist`.
