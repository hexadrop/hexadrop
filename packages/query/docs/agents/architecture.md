# @hexadrop/query architecture

## Public surfaces

| Export | Location | Responsibility |
| --- | --- | --- |
| `.` | `./dist/query.mjs` | see README.md |
| `./bus` | `./dist/bus.mjs` | see README.md |
| `./bus/mock/bun` | `./dist/bus.mock-bun.mjs` | see README.md |
| `./bus/mock/vitest` | `./dist/bus.mock-vitest.mjs` | see README.md |
| `./bus/sync` | `./dist/bus.sync.mjs` | see README.md |
| `./decorator` | `./dist/decorator.mjs` | see README.md |
| `./handlers` | `./dist/query-handlers.mjs` | see README.md |
| `./handlers/memory` | `./dist/in-memory.query-handlers.mjs` | see README.md |
| `./handlers/ioc` | `./dist/ioc.query-handlers.mjs` | see README.md |

## Build output

`tsdown.config.ts` emits ESM-only artifacts (`*.mjs`, `*.d.mts`) into `dist/`.
