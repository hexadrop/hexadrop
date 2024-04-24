<h1 align="center">
  @hexadrop/error
</h1>

<p align="center">
    Opinionated error base class for DDD
</p>

## Installation

```bash
npm install --save @hexadrop/error
```

**Using bun**

```bash
bun add @hexadrop/error
```

## What it does

This package provides an opinionated base class for Domain Errors.
This is meant to be extended and used as a base class for Domain Errors.

It is opinionated in the sense that it enforces a constructor with three arguments:

-   `name`: The name of the error.
-   `message`: The message of the error.
-   `code`: The code of the error. Must follow the next Regexp `/[A-Z][A-Z][A-Z]\((\d{3}|\d{6})\)/`.
    For example `FNL(123)` or `RPA(435678)`

## How to use

```typescript
import DomainError from '@hexadrop/error';

class EmptyErrorCodeError extends DomainError {
  constructor() {
    super('EmptyErrorCodeError', 'DomainError code can not be null or empty', 'HEX(400)');
  }
}
```

## Hexatool Code Quality Standards

Publishing this package we are committing ourselves to the following code quality standards:

-   Respect **Semantic Versioning**: No breaking changes in patch or minor versions
-   No surprises in transitive dependencies: Use the **bare minimum dependencies** needed to meet the purpose
-   **One specific purpose** to meet without having to carry a bunch of unnecessary other utilities
-   **Tests** as documentation and usage examples
-   **Well documented README** showing how to install and use
-   **License favoring Open Source** and collaboration
