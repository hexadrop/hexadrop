# @hexadrop/aggregate-root conventions

## Imports

Import with the package specifier `@hexadrop/aggregate-root`; cross-workspace imports resolve through the root `tsconfig.json` paths to `../../src/`.

## Build

`prepublishOnly` runs `tsdown` with `tsdown.config.ts`. It emits ESM-only artifacts (`*.mjs` plus `*.d.mts`) under `dist/`.

## Tests

Tests live next to sources under `src/*.test.ts` and run with `bun test`.
