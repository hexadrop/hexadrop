<h1 align="center">
  @hexadrop/value-object
</h1>

<p align="center">
  Base class for value objects
</p>

## Installation

```bash
npm install --save @hexadrop/value-object
```

**Using bun**

```bash
bun add @hexadrop/value-object
```

## What it does

Provides base classes for creating value objects in TypeScript. These base classes include:

-   `BooleanValueObject`: A base class for boolean value objects. It ensures the value is not empty and is of the
    correct type. It also provides methods to compare the value with another BooleanValueObject and to convert the
    value to a string.

-   `DateValueObject`: A base class for date value objects. It provides methods to compare the date value with other
    DateValueObject instances.

-   `NumberValueObject`: A base class for number value objects. It provides methods to compare the number value with
    other NumberValueObject instances.

-   `StringValueObject`: A base class for string value objects. It provides methods for validating the string value and
    comparing it with other string value objects.

-   `UuiiValueObject`: A base class for UUID value objects. It extends the StringValueObject class and provides
    additional methods for validating the UUID value.

Each of these classes ensures that the value is not null or undefined and is of the correct type.
If the value is not valid, an error is thrown. The classes also provide methods for comparing the value with another
value object of the same type.

## How to use

To create a value object, extend one of the base classes and provide a constructor that calls the base class constructor
with the value and the type of the value.

### BooleanValueObject

```typescript
import BooleanValueObject from '@hexadrop/value-object/boolean';

class MyBooleanValueObject extends BooleanValueObject {
  constructor(value: boolean) {
    super(value, 'MyBooleanValueObject');
  }
}
```

### DateValueObject

```typescript
import DateValueObject from '@hexadrop/value-object/date';

export default class RequestFinishedAt extends DateValueObject {
  constructor(value: Date | number | string) {
    super(typeof value === 'string' || typeof value === 'number' ? new Date(value) : value, 'RequestFinishedAt');
  }
}
```

### NumberValueObject

```typescript
import NumberValueObject from '@hexadrop/value-object/number';

const MIN_VALUE = 0;

class ProductPrice extends NumberValueObject {
  constructor(value: number) {
    super(value, 'ProductPrice');
    ProductPrice.minMax(value);
  }

  static minLength(): number {
    return MIN_VALUE;
  }

  private static minMax(value: number) {
    if (value < MIN_VALUE) {
      throw new Error(`ProductPrice can not be lesser than ${this.minLength()}`);
    }
  }
}
```

### StringValueObject

```typescript
import StringValueObject from '@hexadrop/value-object/string';

const MAX_LENGTH = 160;

export default class Name extends StringValueObject {
  constructor(value: string) {
    super(value, undefined, 'Name');
    Name.valueLength(value);
  }

  static maxLength(): number {
    return MAX_LENGTH;
  }

  private static valueLength(value: string) {
    if (value.length > MAX_LENGTH) {
      throw new Error(`Name can not have more than ${MAX_LENGTH} characters`);
    }
  }
}
```

### UuiiValueObject

```typescript
import UuiiValueObject from '@hexadrop/value-object/uuii';

export default class RequestId extends UuiiValueObject {
  constructor(value: string) {
    super(value, 'RequestId');
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
