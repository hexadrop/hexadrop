import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';

import type { DomainEventClass } from './domain-event';
import DomainEvent from './domain-event';

type EventBusCallback<Event extends DomainEvent = DomainEvent> = (
	event: Event
) => Either<void, DomainError> | Promise<Either<void, DomainError>>;

interface EventHandler<Event extends DomainEvent = DomainEvent> {
	run: EventBusCallback<Event>;
}

abstract class EventBus {
	abstract publish(...events: DomainEvent[]): Promise<void> | void;

	abstract subscribe<Event extends DomainEvent>(
		event: DomainEventClass<Event>,
		useCase: EventHandler<Event> | EventBusCallback<Event>
	): Promise<void> | void;

	abstract unsubscribe<Event extends DomainEvent>(
		event: DomainEventClass<Event>,
		callback: EventBusCallback<Event> | EventHandler<Event>
	): Promise<void> | void;
}

export type { EventBusCallback, EventHandler };

export default EventBus;
