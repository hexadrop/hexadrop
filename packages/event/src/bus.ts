import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import type { Class } from '@hexadrop/types/class';

import type { DomainEventClass } from './domain-event';
import DomainEvent from './domain-event';

/**
 * EventBusCallback is a type alias for a function that handles a domain event.
 * It takes a domain event and returns either an Either<DomainError, void> or a Promise that resolves to an Either<DomainError, void>.
 *
 * @template Event - The type of the domain event. It must extend DomainEvent.
 * @param {Event} event - The domain event to handle.
 * @returns {Either<DomainError, void> | Promise<Either<DomainError, void>>} - Either an Either<DomainError, void> or a Promise that resolves to an Either<DomainError, void>.
 */
type EventBusCallback<Event extends DomainEvent = DomainEvent> = (
	event: Event
) => Either<DomainError, void> | Promise<Either<DomainError, void>>;

/**
 * EventHandler is an interface that defines the contract for an event handler.
 * It requires a 'run' method that takes a domain event and returns a function that handles the event.
 *
 * @interface
 * @template Event - The type of the domain event. It must extend DomainEvent.
 */
interface EventHandler<Event extends DomainEvent = DomainEvent> {
	/**
	 * The 'run' method is responsible for handling the domain event.
	 * It takes a domain event and returns a function that handles the event.
	 *
	 * @param {Event} event - The domain event to handle.
	 * @returns {EventBusCallback<Event>} - A function that handles the domain event.
	 */
	run: EventBusCallback<Event>;
}

type EventHandlerClass<EventType extends DomainEvent> = Class<any[], EventHandler<EventType>>;

/**
 * EventBus is an abstract class that defines the contract for a domain event bus.
 * It provides a method to publish domain events.
 *
 * @abstract
 */
abstract class EventBus {
	/**
	 * Publishes one or more domain events.
	 *
	 * @abstract
	 * @param {...DomainEvent[]} events - The domain events to publish.
	 * @returns {Promise<Either<DomainError, void>> | Either<DomainError, void>} - The method can return a Promise that resolves to an Either<DomainError, void>, or an Either<DomainError, void> directly.
	 */
	abstract publish(...events: DomainEvent[]): Either<DomainError, void> | Promise<Either<DomainError, void>>;

	/*
	 * Subscribes to a domain event.
	 *
	 * @abstract
	 * @param {DomainEventClass<Event>} event - The domain event to subscribe to.
	 * @param {EventBusCallback<Event> | EventHandler<Event>} useCaseOrCallback - The use case or callback to be executed when the event is triggered.
	 */
	abstract subscribe<Event extends DomainEvent>(
		event: DomainEventClass<Event>,
		useCaseOrCallback: EventBusCallback<Event> | EventHandler<Event>
	): Promise<void> | void;
}

export type { EventBusCallback, EventHandler, EventHandlerClass };

export default EventBus;
