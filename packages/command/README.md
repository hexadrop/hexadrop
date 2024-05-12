<h1 align="center">
  @hexadrop/command
</h1>

<p align="center">
  Opinionated package to create and dispatch commands for CQRS applications.
</p>

```bash
npm install --save @hexadrop/command
```

**Using bun**

```bash
bun add @hexadrop/command
```

## What it does

This package is an opinionated utility designed to streamline the creation and dispatching
commands in CQRS (Command Query Responsibility Segregation) applications.

It provides a set of abstractions and utilities that allow developers to handle commands in a structured and efficient
way.
Key features include:

-   **Command Creation**: Simplifies the process of creating new commands.
-   **Command Dispatching**: Provides mechanisms to dispatch commands to their respective handlers.
-   **Command Handler Decorators**: Provides decorators to define command handlers.

## How to use

First of all define your commands. A command is a simple class that extends the `Command` class and defines
the properties that will be passed to the command handler.

```typescript
// src/commands/create-user.command.ts
class CreateUserCommand extends Command {
  static override COMMAND_NAME = 'user.create';

  constructor(
    readonly id: string,
    readonly name: string,
    readonly age: number
  ) {
    super(CreateUserCommand.COMMAND_NAME);
  }
}
```

```typescript
// src/commands/delete-user.command.ts
class DeleteUserCommand extends Command {
  static override COMMAND_NAME = 'user.delete';

  constructor(readonly id: string) {
    super(CreateUserCommand.COMMAND_NAME);
  }
}
```

Then define your command handlers. A command handler is a simple class that implements the `CommandHandler` interface

```typescript
// src/handlers/create-user.handler.ts
import Either from '@hexadrop/either';

class CreateUserHandler implements CommandHandler<CreateUserCommand> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async handle(command: CreateUserCommand): Promise<Either<DomainError, void>> {
    const { age, id, name } = command;
    await this.usersRepository.create({ age, id, name });

    return Either.right();
  }
}
```

```typescript
// src/handlers/delete-user.handler.ts
import Either from '@hexadrop/either';

class DeleteUserHandler implements CommandHandler<DeleteUserCommand> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async handle(command: DeleteUserCommand): Promise<Either<DomainError, void>> {
    const { id } = command;
    await this.usersRepository.delete(id);

    return Either.right();
  }
}
```

Finally, you can dispatch your commands. To do so you need to create a `CommandBus` instance and register your command
handlers.

```typescript
// src/index.ts
import CommandBus from '@hexadrop/command/bus';
import SyncCommandBus from '@hexadrop/command/bus/sync';
import InMemoryCommandHandlers from '@hexadrop/command/handlers/memory';

import { CreateUserCommand, DeleteUserCommand } from './commands';
import { CreateUserHandler, DeleteUserHandler } from './handlers';

const usersRepository; // Your users repository

const createUserHandler = new CreateUserHandler(usersRepository);
const deleteUserHandler = new DeleteUserHandler(usersRepository);

const handlers = new InMemoryCommandHandlers();

handlers.register(CreateUserCommand, createUserHandler);
handlers.register(DeleteUserCommand, deleteUserHandler);

const commandBus: CommandBus = new SyncCommandBus(handlers);

commandBus.dispatch(new CreateUserCommand('1', 'John', 30));
commandBus.dispatch(new DeleteUserCommand('1'));
```

## Hexatool Code Quality Standards

Publishing this package we are committing ourselves to the following code quality standards:

-   Respect **Semantic Versioning**: No breaking changes in patch or minor versions
-   No surprises in transitive dependencies: Use the **bare minimum dependencies** needed to meet the purpose
-   **One specific purpose** to meet without having to carry a bunch of unnecessary other utilities
-   **Tests** as documentation and usage examples
-   **Well documented README** showing how to install and use
-   **License favoring Open Source** and collaboration
