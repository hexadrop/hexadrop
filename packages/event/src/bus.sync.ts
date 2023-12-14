import type { EventBusCallback, EventHandler } from './bus';
import EventBus from './bus';
import EventBusHandlers from './bus.handlers';
import type { DomainEventClass } from './domain-event';
import DomainEvent from './domain-event';

export default class SyncEventBus extends EventBus {
	private readonly info: EventBusHandlers;
	constructor(info?: EventBusHandlers) {
		super();
		this.info = info ?? new EventBusHandlers();
	}

	async publish(...events: DomainEvent[]): Promise<void> {
		const promises = [];
		for (const e of events) {
			const handlers = this.info.search(e);
			for (const handler of handlers) {
				promises.push(
					new Promise<void>((resolve, reject) => {
						try {
							const returnValue = handler(e);
							if (returnValue instanceof Promise) {
								void returnValue.then(e => (e.isRight() ? reject(e.getRight()) : resolve()));
							} else if (returnValue.isRight()) {
								reject(returnValue.getRight());
							} else {
								resolve();
							}
						} catch (e) {
							reject(e);
						}
					})
				);
			}
		}
		await Promise.all(promises);
	}

	subscribe<E extends DomainEvent>(
		event: DomainEventClass<E>,
		handlerOrCallback: EventBusCallback<E> | EventHandler<E>
	): Promise<void> | void {
		this.info.register(event, handlerOrCallback);
	}

	unsubscribe<E extends DomainEvent>(
		event: DomainEventClass<E>,
		handlerOrCallback: EventBusCallback<E> | EventHandler<E>
	): Promise<void> | void {
		this.info.unregister(event, handlerOrCallback);
	}
}
