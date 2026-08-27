# @hexadrop/value-object architecture

## Public surfaces

| Export | Location | Responsibility |
| --- | --- | --- |
| `./boolean` | `./dist/boolean.value-object.mjs` | see README.md |
| `./date` | `./dist/date.value-object.mjs` | see README.md |
| `./email` | `./dist/email.value-object.mjs` | see README.md |
| `./number` | `./dist/number.value-object.mjs` | see README.md |
| `./spanish/document-number` | `./dist/spanish-document-number.value-object.mjs` | see README.md |
| `./spanish/phone-number` | `./dist/spanish-phone-number.value-object.mjs` | see README.md |
| `./string` | `./dist/string.value-object.mjs` | see README.md |
| `./uuii` | `./dist/uuii.value-object.mjs` | see README.md |
| `./ulid` | `./dist/ulid.value-object.mjs` | see README.md |

## Build output

`tsdown.config.ts` emits ESM-only artifacts (`*.mjs`, `*.d.mts`) into `dist/`.
