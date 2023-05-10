import type { DomainError } from '../error';
import type { Either } from '../types';
import type { DomainEvent, DomainEventClass } from './domain-event';
import type { UseCase } from './use-case';

export type EventBusCallback<Event extends DomainEvent> = (
	event: Event
) => Either<void, DomainError> | Promise<Either<void, DomainError>>;

export interface EventBus {
	publish(...events: DomainEvent[]): Promise<void> | void;

	subscribe<Event extends DomainEvent>(
		event: DomainEventClass<Event>,
		useCase: UseCase<Event>
	): Promise<void> | void;

	subscribe<Event extends DomainEvent>(
		event: DomainEventClass<Event>,
		callback: EventBusCallback<Event>
	): Promise<void> | void;

	unsubscribe<Event extends DomainEvent>(
		event: DomainEventClass<Event>,
		useCase: UseCase<Event>
	): Promise<void> | void;

	unsubscribe<Event extends DomainEvent>(
		event: DomainEventClass<Event>,
		callback: EventBusCallback<Event>
	): Promise<void> | void;
}
