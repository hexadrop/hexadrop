import type { Either } from '../either';
import type { DomainError } from '../error';
import type { Command, CommandClass } from './command';

export interface CommandHandler<T extends Command> {
	handle(command: T): Either<void, DomainError> | Promise<Either<void, DomainError>>;

	subscribedTo(): CommandClass<T> | CommandClass<T>[];
}
