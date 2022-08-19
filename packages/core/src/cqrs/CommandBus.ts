import type { Either } from '../Either';
import type { DomainError } from '../error';
import type { Command } from './Command';

export interface CommandBus {
	dispatch(command: Command): Either<void, DomainError> | Promise<Either<void, DomainError>>;
}
