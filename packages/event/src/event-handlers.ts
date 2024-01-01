import type { EventBusCallback } from './bus';
import type { DomainEventClass } from './domain-event';
import DomainEvent from './domain-event';
/**
 * The EventHandlers interface defines the structure for event handlers.
 * It contains a single method 'search' which is used to search for event handlers.
 */
export interface EventHandlers {
	/**
	 * The 'search' method is used to search for event handlers.
	 * It accepts an event of type 'DomainEventClass' or 'DomainEvent' and returns an array of 'EventBusCallback'.
	 *
	 * @param event - The event for which to search the handlers. It can be a 'DomainEventClass' or an instance of 'DomainEvent'.
	 * @returns An array of 'EventBusCallback' which are the handlers for the provided event.
	 */
	search<E extends DomainEvent>(event: DomainEventClass<E> | E): EventBusCallback<E>[];
}
