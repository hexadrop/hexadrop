import { Either } from '../Either';
import { DomainError } from '../error';
import { Command } from './Command';

export interface CommandBus {
	dispatch<C extends Command = Command, E extends DomainError = DomainError>(command: C): Promise<Either<void, E>>;
}
