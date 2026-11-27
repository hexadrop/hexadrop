# @hexadrop/types architecture

## Public surfaces

| Export | Location | Responsibility |
| --- | --- | --- |
| `./abstract` | `./dist/abstract.mjs` | see README.md |
| `./awaitable` | `./dist/awaitable.mjs` | see README.md |
| `./class` | `./dist/class.mjs` | see README.md |
| `./instance` | `./dist/instance.mjs` | see README.md |
| `./newable` | `./dist/newable.mjs` | see README.md |
| `./nullable` | `./dist/nullable.mjs` | see README.md |
| `./primitives` | `./dist/primitives.mjs` | see README.md |
| `./recursive-partial` | `./dist/recursive-partial.mjs` | see README.md |

## Build output

`tsdown.config.ts` emits ESM-only artifacts (`*.mjs`, `*.d.mts`) into `dist/`.
