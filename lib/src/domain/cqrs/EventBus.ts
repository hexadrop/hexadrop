import { DomainEvent, DomainEventClass } from './DomainEvent';

export interface EventBus {
	publish(events: Array<DomainEvent>): Promise<void> | void;

	subscribe<D extends DomainEvent<DTO>, DTO>(
		event: DomainEventClass<D, DTO>,
		callback: (dto: DTO) => Promise<void> | void
	): void;

	unsubscribe<D extends DomainEvent<DTO>, DTO>(
		event: DomainEventClass<D, DTO>,
		callback: (dto: DTO) => Promise<void> | void
	): void;
}
