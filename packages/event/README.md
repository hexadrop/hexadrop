<h1 align="center">
  @hexadrop/event
</h1>

<p align="center">
  Opinionated package to create and dispatch events for DDD applications.
</p>

```bash
npm install --save @hexadrop/event
```

**Using bun**

```bash
bun add @hexadrop/event
```

## What it does
This package is an opinionated utility designed to streamline the creation and dispatching of events 
in CQRS (Command Query Responsibility Segregation) applications. It provides a set of abstractions and utilities 
that allow developers to handle events in a structured and efficient way. Key features include:

- **Event Creation**: Simplifies the process of creating new events.
- **Event Dispatching**: Provides mechanisms to dispatch events to their respective handlers.
- **Event Handler Decorators**: Provides decorators to define event handlers.

## How to use

## Hexatool Code Quality Standards

Publishing this package we are committing ourselves to the following code quality standards:

- Respect **Semantic Versioning**: No breaking changes in patch or minor versions
- No surprises in transitive dependencies: Use the **bare minimum dependencies** needed to meet the purpose
- **One specific purpose** to meet without having to carry a bunch of unnecessary other utilities
- **Tests** as documentation and usage examples
- **Well documented README** showing how to install and use
- **License favoring Open Source** and collaboration
