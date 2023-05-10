import type { Command, CommandClass, DomainError, Either } from '@hexadrop/core';

import type { UseCase } from './use-case';

export type CommandBusCallback<C extends Command> = (
	command: C
) => Either<void, DomainError> | Promise<Either<void, DomainError>>;

export interface CommandBus {
	dispatch(command: Command): Either<void, DomainError> | Promise<Either<void, DomainError>>;

	register<C extends Command>(command: CommandClass<C>, useCase: UseCase<C>): void;

	register<C extends Command>(command: CommandClass<C>, callback: CommandBusCallback<C>): void;

	unregister<C extends Command>(command: CommandClass<C>, useCase: UseCase<C>): void;

	unregister<C extends Command>(command: CommandClass<C>, callback: CommandBusCallback<C>): void;
}
