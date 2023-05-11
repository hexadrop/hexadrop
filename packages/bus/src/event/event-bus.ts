import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';

import type { Handler } from '../handler';
import type { DomainEvent, DomainEventClass } from './domain-event';

export type EventBusCallback<Event extends DomainEvent = DomainEvent> = (
	event: Event
) => Either<void, DomainError> | Promise<Either<void, DomainError>>;

export interface EventBus {
	publish(...events: DomainEvent[]): Promise<void> | void;

	subscribe<Event extends DomainEvent>(
		event: DomainEventClass<Event>,
		useCase: Handler<Event>
	): Promise<void> | void;

	subscribe<Event extends DomainEvent>(
		event: DomainEventClass<Event>,
		callback: EventBusCallback<Event>
	): Promise<void> | void;

	unsubscribe<Event extends DomainEvent>(
		event: DomainEventClass<Event>,
		useCase: Handler<Event>
	): Promise<void> | void;

	unsubscribe<Event extends DomainEvent>(
		event: DomainEventClass<Event>,
		callback: EventBusCallback<Event>
	): Promise<void> | void;
}
