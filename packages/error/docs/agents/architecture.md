# @hexadrop/error architecture

## Public surfaces

| Export | Location | Responsibility |
| --- | --- | --- |
| `.` | `./dist/domain-error.mjs` | see README.md |
| `./invalid-argument` | `./dist/invalid-argument.mjs` | see README.md |
| `./not-found` | `./dist/not-found.mjs` | see README.md |

## Build output

`tsdown.config.ts` emits ESM-only artifacts (`*.mjs`, `*.d.mts`) into `dist/`.
