# @hexadrop/event architecture

## Public surfaces

| Export | Location | Responsibility |
| --- | --- | --- |
| `.` | `./dist/domain-event.mjs` | see README.md |
| `./bus` | `./dist/bus.mjs` | see README.md |
| `./bus/async` | `./dist/bus.async.mjs` | see README.md |
| `./bus/mock/bun` | `./dist/bus.mock-bun.mjs` | see README.md |
| `./bus/mock/vitest` | `./dist/bus.mock-vitest.mjs` | see README.md |
| `./bus/pub-sub` | `./dist/bus.pub-sub.mjs` | see README.md |
| `./bus/sync` | `./dist/bus.sync.mjs` | see README.md |
| `./decorator` | `./dist/decorator.mjs` | see README.md |
| `./handlers` | `./dist/event-handlers.mjs` | see README.md |
| `./handlers/memory` | `./dist/in-memory.event-handlers.mjs` | see README.md |
| `./handlers/ioc` | `./dist/ioc.event-handlers.mjs` | see README.md |

## Build output

`tsdown.config.ts` emits ESM-only artifacts (`*.mjs`, `*.d.mts`) into `dist/`.
