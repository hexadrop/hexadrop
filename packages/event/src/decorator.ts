import type { DomainEventClass } from './domain-event';
import DomainEvent from './domain-event';
import EventHandlerError from './error/event-handler.error';

const EVENT_HANDLER_METADATA_KEY = 'event-handler';

/**
 * EventHandler is a function that acts as a decorator for classes that handle domain events.
 * It checks if the class has a 'run' method and associates the class with the events it can handle.
 *
 * @template EventType - The type of the domain event. It must extend DomainEvent.
 * @param {...DomainEventClass<EventType>[]} events - The domain events that the class can handle.
 * @returns {ClassDecorator} - A class decorator that associates the class with the events it can handle.
 *
 * @throws {Error} - If the class does not implement a 'run' method, an error is thrown.
 */
function EventHandler<EventType extends DomainEvent>(...events: DomainEventClass<EventType>[]): ClassDecorator {
	return <ClassType extends Function>(target: ClassType): ClassType => {
		if ('run' in target.prototype) {
			for (const event of events) {
				const handlers = Reflect.getMetadata<ClassType[]>(EVENT_HANDLER_METADATA_KEY, event) ?? [];
				if (!handlers.some(handler => handler === target)) {
					handlers.push(target);
				}
				Reflect.defineMetadata<ClassType[]>(EVENT_HANDLER_METADATA_KEY, handlers, event);
			}
		} else {
			throw new EventHandlerError('EventHandler must implements a `run()` method');
		}

		// Return the class
		return target;
	};
}

export { EVENT_HANDLER_METADATA_KEY };

export default EventHandler;
