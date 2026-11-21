# @hexadrop/ploc architecture

## Public surfaces

| Export | Location | Responsibility |
| --- | --- | --- |
| `.` | `./dist/ploc.mjs` | see README.md |
| `./memory` | `./dist/ploc.memory.mjs` | see README.md |
| `./react` | `./dist/ploc.react.mjs` | see README.md |
| `./hook` | `./dist/ploc.memory-hook.mjs` | see README.md |

## Build output

`tsdown.config.ts` emits ESM-only artifacts (`*.mjs`, `*.d.mts`) into `dist/`.
