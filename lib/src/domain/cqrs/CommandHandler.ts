import { Either } from '../Either';
import { DomainError } from '../error';
import { Command, CommandClass } from './Command';

export interface CommandHandler<T extends Command, E extends DomainError = DomainError> {
	handle(command: T): Promise<Either<void, E>>;

	subscribedTo(): CommandClass<T> | CommandClass<T>[];
}
