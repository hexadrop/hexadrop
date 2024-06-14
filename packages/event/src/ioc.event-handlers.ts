import type { Container } from '@hexadrop/ioc';

import type { EventBusCallback, EventHandler, EventHandlerClass } from './bus';
import { EVENT_HANDLER_METADATA_KEY } from './decorator';
import type DomainEvent from './domain-event';
import type { DomainEventClass } from './domain-event';
import { InvalidEventError } from './error';
import EventHandlers from './event-handlers';

/**
 * IoCEventHandlers is a class that implements the EventHandlers interface.
 * It is used to search for event handlers in the IoC container.
 */
export default class IoCEventHandlers extends EventHandlers {
	/**
	 * Constructor for the IoCEventHandlers class.
	 * @param {Container} container - The IoC container.
	 */
	constructor(private readonly container: Container) {
		super();
	}

	/**
	 * The 'register' method registers an event handler for a specific event.
	 *
	 * @param _event - The event for which to register the handler.
	 * @param _handler - The handler to be registered for the event. It can be an 'EventBusCallback' or an instance of 'EventHandler'.
	 */
	register<E extends DomainEvent>(
		_event: DomainEventClass<E>,
		_handler: EventBusCallback<E> | EventHandler<E>
	): void {
		throw new Error('Method not implemented.');
	}

	/**
	 * The search method is used to find event handlers for a specific event.
	 * @param {EventType | DomainEventClass<EventType>} event - The event or the class of the event.
	 * @returns {EventBusCallback<EventType>[]} An array of event handler callbacks.
	 * @throws {InvalidEventError} If the event does not have a name.
	 * @throws {EventNotRegisteredError} If the event handler is not registered.
	 * @template EventType - The type of the event.
	 */
	search<EventType extends DomainEvent>(
		event: DomainEventClass<EventType> | EventType
	): EventBusCallback<EventType>[] {
		let handlers: EventHandlerClass<EventType>[] | undefined;
		let eventName: string | undefined;

		// Check if the event has a EVENT_NAME property
		if ('EVENT_NAME' in event) {
			eventName = event.EVENT_NAME;
			handlers = Reflect.getMetadata<EventHandlerClass<EventType>[]>(EVENT_HANDLER_METADATA_KEY, event);
		} else if ('eventName' in event) {
			// Check if the event has a eventName property
			eventName = event.eventName;
			handlers = Reflect.getMetadata<EventHandlerClass<EventType>[]>(
				EVENT_HANDLER_METADATA_KEY,
				event.constructor
			);
		}

		// If the event does not have a name, throw an error
		if (!eventName) {
			throw new InvalidEventError();
		}

		// If the event handler is not registered, return an empty array
		if (!handlers) {
			return [];
		}

		// Get the event handlers instances from the IoC container
		const instances = handlers.map(handler => this.container.get<EventHandler<EventType>>(handler));

		// Return the event handler callbacks
		return instances.map(handler => handler.run.bind(handler));
	}
}
