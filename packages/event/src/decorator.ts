import type { DomainEventClass } from './domain-event';
import DomainEvent from './domain-event';

function EventHandler<E extends DomainEvent>(event: DomainEventClass<E>): ClassDecorator {
	return <TFunction extends Function>(target: TFunction): TFunction => {
		Reflect.defineMetadata('event-handler', true, target);

		const handlers = Reflect.getMetadata<TFunction[]>('event-handlers', event);
		if (handlers) {
			handlers.push(target);
		} else {
			Reflect.defineMetadata('event-handlers', [target], event);
		}

		return target;
	};
}

export default EventHandler;
