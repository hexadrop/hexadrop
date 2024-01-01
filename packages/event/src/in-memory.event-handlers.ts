import type { EventBusCallback, EventHandler } from './bus';
import type { DomainEventClass } from './domain-event';
import DomainEvent from './domain-event';
import EventHandlers from './event-handlers';
/**
 * The InMemoryEventHandlers class implements the EventHandlers interface.
 * It provides in-memory storage and management of event handlers.
 */
export default class InMemoryEventHandlers extends EventHandlers {
	/**
	 * A private map that stores event handlers.
	 */
	private readonly map: Map<string, (EventBusCallback<any> | EventHandler<any>)[]>;

	/**
	 * The constructor initializes the map.
	 */
	constructor() {
		super();
		this.map = new Map<string, EventBusCallback[]>();
	}

	/**
	 * The 'register' method registers an event handler for a specific event.
	 *
	 * @param event - The event for which to register the handler.
	 * @param handler - The handler to be registered for the event. It can be an 'EventBusCallback' or an instance of 'EventHandler'.
	 */
	register<E extends DomainEvent>(event: DomainEventClass<E>, handler: EventBusCallback<E> | EventHandler<E>): void {
		const callbacks: (EventBusCallback<E> | EventHandler<E>)[] = this.map.get(event.EVENT_NAME) ?? [];
		const exists = callbacks.find(v => v === handler);
		if (!exists) {
			callbacks.push(handler);
		}

		this.map.set(event.EVENT_NAME, callbacks);
	}

	/**
	 * The 'search' method searches for event handlers for a specific event.
	 *
	 * @param event - The event for which to search the handlers. It can be a 'DomainEventClass' or an instance of 'DomainEvent'.
	 * @returns An array of 'EventBusCallback' which are the handlers for the provided event.
	 */
	search<E extends DomainEvent>(event: DomainEventClass<E> | E): EventBusCallback<E>[] {
		let handler: (EventBusCallback<E> | EventHandler<E>)[] = [];
		let eventName: string | undefined = undefined;
		if ('EVENT_NAME' in event) {
			eventName = event.EVENT_NAME;
		} else if ('eventName' in event) {
			eventName = event.eventName;
		}

		if (!eventName) {
			return [];
		}

		handler = this.map.get(eventName) ?? [];

		return handler.map(ch => {
			if ('run' in ch) {
				return ch.run.bind(ch);
			}

			return ch;
		});
	}

	/**
	 * The 'unregister' method unregisters an event handler for a specific event.
	 *
	 * @param event - The event for which to unregister the handler.
	 * @param handler - The handler to be unregistered for the event. It can be an 'EventBusCallback' or an instance of 'EventHandler'.
	 */
	unregister<E extends DomainEvent>(
		event: DomainEventClass<E>,
		handler: EventBusCallback<E> | EventHandler<E>
	): void {
		let callbacks: (EventBusCallback<E> | EventHandler<E>)[] = this.map.get(event.EVENT_NAME) ?? [];
		if (callbacks.length === 0) {
			return;
		}
		callbacks = callbacks.filter(v => v !== handler);

		this.map.set(event.EVENT_NAME, callbacks);
	}
}
