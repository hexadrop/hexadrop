import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';

import type { Handler } from '../handler';
import type { Command, CommandClass } from './command';

export type CommandBusCallback<C extends Command = Command> = (
	command: C
) => Either<void, DomainError> | Promise<Either<void, DomainError>>;

export interface CommandBus {
	dispatch(command: Command): Either<void, DomainError> | Promise<Either<void, DomainError>>;

	register<C extends Command>(command: CommandClass<C>, useCase: Handler<C>): void;

	register<C extends Command>(command: CommandClass<C>, callback: CommandBusCallback<C>): void;

	unregister<C extends Command>(
		command: CommandClass<C>,
		callback: CommandBusCallback<C> | Handler<C>
	): void;
}
