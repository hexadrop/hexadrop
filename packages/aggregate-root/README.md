<h1 align="center">
  @hexadrop/aggregate-root
</h1>

<p align="center">
  Opinionated aggregate root base class for DDD
</p>

## Installation

```bash
npm install --save @hexadrop/aggregate-root
```

**Using bun**

```bash
bun add @hexadrop/aggregate-root
```

## What it does

-   Default export is an abstract class `AggregateRoot`. This class provides the following:
    -   A `record(...events: DomainEvent[])` method to record events.
    -   A `pullDomainEvents(): DomainEvent[]` method to get uncommitted events.
    -   An abstract `toPrimitives(): Primitives<this>` method to convert the aggregate root to primitives.

## How to use

```typescript
import AggregateRoot from '@hexadrop/aggregate-root';
import DomainEvent from '@hexadrop/event';
import type { Primitives } from '@hexadrop/types/primitives';

class MockEvent extends DomainEvent {
  static override EVENT_NAME = 'event';

  constructor(
    readonly foo: string,
    aggregateId: string
  ) {
    super(MockEvent.EVENT_NAME, aggregateId);
  }
}

class MockAggregateRoot extends AggregateRoot {
  readonly foo: string;

  constructor(primitives: Primitives<MockAggregateRoot>) {
    super();
    this.foo = primitives.foo;
  }

  static create(foo: string): MockAggregateRoot {
    const aggregateRoot = new MockAggregateRoot({ foo });
    aggregateRoot.record(new MockEvent(foo, 'aggregateId'));

    return aggregateRoot;
  }

  override toPrimitives(): Primitives<MockAggregateRoot> {
    return {
      foo: this.foo,
    };
  }
}
```

## Hexadrop Code Quality Standards

Publishing this package we are committing ourselves to the following code quality standards:

-   Respect **Semantic Versioning**: No breaking changes in patch or minor versions
-   No surprises in transitive dependencies: Use the **bare minimum dependencies** needed to meet the purpose
-   **One specific purpose** to meet without having to carry a bunch of unnecessary other utilities
-   **Tests** as documentation and usage examples
-   **Well documented README** showing how to install and use
-   **License favoring Open Source** and collaboration
