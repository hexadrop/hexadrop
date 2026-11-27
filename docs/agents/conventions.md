# Conventions

## Runtime and package management

Use Bun for package management, scripts, and tests. Do not add Node-specific scripts.

## Imports

The root `tsconfig.json` maps workspace packages to their `src/` (for example `@hexadrop/types/*` → `packages/types/src/*`). Cross-package imports use the `@hexadrop/*` specifier and resolve through those paths, so changes are tested without a build step.

## Hexagonal structure

Keep the boundary clean: domain logic (`AggregateRoot`, `Command`/`Query`, `DomainEvent`, `ValueObject`) never imports infrastructure adapters; adapters (`bus.*`, `handler.ioc`, `ploc.memory`, `ploc.react`) implement ports from the domain layer. `bun:test` stays a dev-only external so mock buses never leak into consumers' bundles.

## Linting

ESLint uses `@hexadrop/eslint-config` through `eslint.config.js`. Run `bun run lint:fix` before committing.
