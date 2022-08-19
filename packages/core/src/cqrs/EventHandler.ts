import type { Either } from '../Either';
import type { DomainError } from '../error';
import type { DomainEvent, DomainEventClass } from './DomainEvent';

export interface EventHandler<T extends DomainEvent<DTO>, DTO> {
	handle(event: T): Either<void, DomainError> | Promise<Either<void, DomainError>>;

	subscribedTo(): DomainEventClass<T, DTO>;
}
