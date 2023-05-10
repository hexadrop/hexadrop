import type { Either } from '../either';
import type { DomainError } from '../error';
import type { Command } from './command';

export interface CommandBus {
	dispatch(command: Command): Either<void, DomainError> | Promise<Either<void, DomainError>>;
}
