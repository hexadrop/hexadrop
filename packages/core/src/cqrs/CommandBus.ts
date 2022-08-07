import { Either } from '../Either';
import { DomainError } from '../error';
import { Command } from './Command';

export interface CommandBus {
	dispatch(command: Command): Either<void, DomainError> | Promise<Either<void, DomainError>>;
}
