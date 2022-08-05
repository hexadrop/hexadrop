import { DomainEvent, DomainEventClass } from './DomainEvent';

export type EventBusCallback<T = unknown> = (dto: T) => Promise<void> | void;

export interface EventBus {
	publish(events: Array<DomainEvent>): Promise<void> | void;

	subscribe<D extends DomainEvent<DTO>, DTO = unknown>(
		event: DomainEventClass<D, DTO>,
		callback: EventBusCallback<DTO>
	): void;

	unsubscribe<D extends DomainEvent<DTO>, DTO>(
		event: DomainEventClass<D, DTO>,
		callback: (dto: DTO) => Promise<void> | void
	): void;
}
