# @hexadrop/command architecture

## Public surfaces

| Export | Location | Responsibility |
| --- | --- | --- |
| `.` | `./dist/command.mjs` | see README.md |
| `./bus` | `./dist/bus.mjs` | see README.md |
| `./bus/mock/bun` | `./dist/bus.mock-bun.mjs` | see README.md |
| `./bus/mock/vitest` | `./dist/bus.mock-vitest.mjs` | see README.md |
| `./bus/sync` | `./dist/bus.sync.mjs` | see README.md |
| `./decorator` | `./dist/decorator.mjs` | see README.md |
| `./handlers` | `./dist/command-handlers.mjs` | see README.md |
| `./handlers/memory` | `./dist/in-memory.command-handlers.mjs` | see README.md |
| `./handlers/ioc` | `./dist/ioc.command-handlers.mjs` | see README.md |

## Build output

`tsdown.config.ts` emits ESM-only artifacts (`*.mjs`, `*.d.mts`) into `dist/`.
