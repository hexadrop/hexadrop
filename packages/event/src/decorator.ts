import type { DomainEventClass } from './domain-event';
import DomainEvent from './domain-event';

const EVENT_HANDLER_METADATA_KEY = 'event-handler';

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
			throw new Error('EventHandler must implements a `run()` method');
		}

		return target;
	};
}

export default EventHandler;
