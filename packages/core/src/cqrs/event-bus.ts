import type { Either } from '../either';
import type { DomainError } from '../error';
import type { DomainEvent, DomainEventClass } from './domain-event';
import type { EventHandler } from './event-handler';

export type EventBusCallback<DTO = any> = (
	event: DTO
) => Either<void, DomainError> | Promise<Either<void, DomainError>>;

export interface EventBus {
	publish(...events: DomainEvent[]): Promise<void> | void;

	subscribe<Event extends DomainEvent<DTO>, DTO>(
		eventHandler: EventHandler<Event, DTO>
	): Promise<void> | void;

	subscribe<Event extends DomainEvent<DTO>, DTO>(
		event: DomainEventClass<Event>,
		callback: EventBusCallback<Event>
	): Promise<void> | void;

	unsubscribe<Event extends DomainEvent<DTO>, DTO>(
		handler: EventHandler<Event, DTO>
	): Promise<void> | void;

	unsubscribe<Event extends DomainEvent<DTO>, DTO>(
		event: DomainEventClass<Event>,
		callback: EventBusCallback<Event>
	): Promise<void> | void;
}
