import { DomainEvent, DomainEventClass } from './DomainEvent';

export interface EventHandler<T extends DomainEvent<DTO>, DTO> {
	handle(event: T): void | Promise<void>;

	subscribedTo(): DomainEventClass<T, DTO>;
}
