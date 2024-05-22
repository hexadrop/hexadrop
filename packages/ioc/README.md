<h1 align="center">
  @hexadrop/ioc
</h1>

<p align="center">
  An opinionated IoC container interface for TypeScript
</p>

## Installation

```bash
npm install --save @hexadrop/ioc
```

**Using bun**

```bash
bun add @hexadrop/ioc
```

## What it does

This package provides an interface for an IoC container. It does not provide an implementation by itself.

You can use it as a base for your own implementation or use one of the following implementations:

-   [DIOD](https://github.com/artberri/diod): A simple and lightweight IoC container for TypeScript.

## Hexadrop Code Quality Standards

Publishing this package we are committing ourselves to the following code quality standards:

-   Respect **Semantic Versioning**: No breaking changes in patch or minor versions
-   No surprises in transitive dependencies: Use the **bare minimum dependencies** needed to meet the purpose
-   **One specific purpose** to meet without having to carry a bunch of unnecessary other utilities
-   **Tests** as documentation and usage examples
-   **Well documented README** showing how to install and use
-   **License favoring Open Source** and collaboration
