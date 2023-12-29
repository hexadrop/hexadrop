import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';

import type { DomainEventClass } from './domain-event';
import DomainEvent from './domain-event';

/**
 * EventBusCallback is a type alias for a function that handles a domain event.
 * It takes a domain event and returns either an Either<void, DomainError> or a Promise that resolves to an Either<void, DomainError>.
 *
 * @template Event - The type of the domain event. It must extend DomainEvent.
 * @param {Event} event - The domain event to handle.
 * @returns {Either<void, DomainError> | Promise<Either<void, DomainError>>} - Either an Either<void, DomainError> or a Promise that resolves to an Either<void, DomainError>.
 */
type EventBusCallback<Event extends DomainEvent = DomainEvent> = (
	event: Event
) => Either<void, DomainError> | Promise<Either<void, DomainError>>;

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

/**
 * EventBus is an abstract class that defines the contract for a domain event bus.
 * It provides methods to publish, subscribe, and unsubscribe from domain events.
 *
 * @abstract
 */
abstract class EventBus {
	/**
	 * Publishes one or more domain events.
	 *
	 * @abstract
	 * @param {...DomainEvent[]} events - The domain events to publish.
	 * @returns {Promise<void> | void} - The method can return a Promise that resolves to void, or void directly.
	 */
	abstract publish(...events: DomainEvent[]): Promise<void> | void;

	/**
	 * Subscribes a use case or an event handler to a specific domain event.
	 *
	 * @abstract
	 * @template Event - The type of the domain event. It must extend DomainEvent.
	 * @param {DomainEventClass<Event>} event - The class of the domain event to subscribe to.
	 * @param {EventHandler<Event> | EventBusCallback<Event>} useCase - The use case or event handler to subscribe.
	 * @returns {Promise<void> | void} - The method can return a Promise that resolves to void, or void directly.
	 */
	abstract subscribe<Event extends DomainEvent>(
		event: DomainEventClass<Event>,
		useCase: EventHandler<Event> | EventBusCallback<Event>
	): Promise<void> | void;

	/**
	 * Unsubscribes a callback or an event handler from a specific domain event.
	 *
	 * @abstract
	 * @template Event - The type of the domain event. It must extend DomainEvent.
	 * @param {DomainEventClass<Event>} event - The class of the domain event to unsubscribe from.
	 * @param {EventBusCallback<Event> | EventHandler<Event>} callback - The callback or event handler to unsubscribe.
	 * @returns {Promise<void> | void} - The method can return a Promise that resolves to void, or void directly.
	 */
	abstract unsubscribe<Event extends DomainEvent>(
		event: DomainEventClass<Event>,
		callback: EventBusCallback<Event> | EventHandler<Event>
	): Promise<void> | void;
}

export type { EventBusCallback, EventHandler };

export default EventBus;
