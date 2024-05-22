<h1 align="center">
  @hexadrop/either
</h1>

<p align="center">
    Either monad implementation
</p>

```bash
npm install --save @hexadrop/either
```

**Using bun**

```bash
bun add @hexadrop/either
```

## What it does

It provides an implementation of the Either monad in TypeScript. The Either monad is a popular
functional programming concept used to handle computations that can result in two possible outcomes:
a successful result (Right) or an error (Left). This is useful for handling computations that can fail,
providing a way to chain operations while keeping error handling separate.

## How to use

The `@hexadrop/either` package default exports a class `Either` with methods to create an instance
representing a left or right value (`Either.left` and `Either.right`),
check the type of the value (`isLeft` and `isRight`),
retrieve the value (`getLeft`, `getRight`, `getLeftOrElse`, `getRightOrElse`),
and transform the value (`mapLeft`, `mapRight`, `flatMapLeft`, `flatMapRight`).

### Creating an instance

```typescript
import Either from '@hexadrop/either';

// Create a Right value
const right = Either.right('This is a right value');
console.log(right.isRight()); // true
console.log(right.getRight()); // 'This is a right value'

// Create a Left value
const left = Either.left('This is a left value');
console.log(left.isLeft()); // true
console.log(left.getLeft()); // 'This is a left value'
```

### Transforming the value

```typescript
// Use mapRight to transform a Right value
const transformedRight = right.mapRight(value => value.toUpperCase());
console.log(transformedRight.getRight()); // 'THIS IS A RIGHT VALUE'

// Use mapLeft to transform a Left value
const transformedLeft = left.mapLeft(value => value.toUpperCase());
console.log(transformedLeft.getLeft()); // 'THIS IS A LEFT VALUE'
```

### Using flatMap

```typescript
// Use flatMapRight to transform a Right value into a new Either
const flatMappedRight = right.flatMapRight(value => Either.right(value.length));
console.log(flatMappedRight.getRight()); // 20

// Use flatMapLeft to transform a Left value into a new Either
const flatMappedLeft = left.flatMapLeft(value => Either.left(value.length));
console.log(flatMappedLeft.getLeft()); // 19
```

## Hexadrop Code Quality Standards

Publishing this package we are committing ourselves to the following code quality standards:

-   Respect **Semantic Versioning**: No breaking changes in patch or minor versions
-   No surprises in transitive dependencies: Use the **bare minimum dependencies** needed to meet the purpose
-   **One specific purpose** to meet without having to carry a bunch of unnecessary other utilities
-   **Tests** as documentation and usage examples
-   **Well documented README** showing how to install and use
-   **License favoring Open Source** and collaboration
