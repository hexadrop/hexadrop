import { Either } from '../Either';
import { DomainError } from '../error';
import { Command, CommandClass } from './Command';

export interface CommandHandler<T extends Command> {
	handle(command: T): Promise<Either<void, DomainError>>;

	subscribedTo(): CommandClass<T> | CommandClass<T>[];
}
