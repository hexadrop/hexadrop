import type { Handler } from '../handler';
import type { DomainEventClass } from './domain-event';
import { DomainEvent } from './domain-event';
import type { EventBus, EventBusCallback } from './event-bus';
import { EventHandlersInformation } from './event-handlers-information';

export class InMemoryEventBus implements EventBus {
	private readonly info: EventHandlersInformation;
	constructor(info?: EventHandlersInformation) {
		this.info = info ?? new EventHandlersInformation();
	}

	async publish(...events: DomainEvent[]): Promise<void> {
		const promises = [];
		for (const e of events) {
			const handlers = this.info.search(e);
			for (const handler of handlers) {
				promises.push(
					new Promise<void>((resolve, reject) => {
						const returnValue = handler(e);
						if (returnValue instanceof Promise) {
							void returnValue.then(e =>
								e.isRight() ? reject(e.getRight()) : resolve()
							);
						} else {
							returnValue.isRight() ? reject(returnValue.getRight()) : resolve();
						}
					})
				);
			}
		}
		await Promise.all(promises);
	}

	subscribe<E extends DomainEvent>(
		event: DomainEventClass<E>,
		handlerOrCallback: EventBusCallback<E> | Handler<E>
	): Promise<void> | void {
		this.info.register(event, handlerOrCallback);
	}

	unsubscribe<E extends DomainEvent>(
		event: DomainEventClass<E>,
		handlerOrCallback: EventBusCallback<E> | Handler<E>
	): Promise<void> | void {
		this.info.unregister(event, handlerOrCallback);
	}
}
