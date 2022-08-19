import type { DomainEvent, EventBus, EventHandler } from '@hexadrop/core';
import type { EventHandlersInformation } from './EventHandlersInformation';

export class InMemoryEventBus implements EventBus {
	constructor(private readonly info: EventHandlersInformation) {}

	async publish(...events: DomainEvent[]): Promise<void> {
		const promises = [];
		for (const e of events) {
			const handlers = this.info.search(e);
			for (const handler of handlers) {
				promises.push(
					new Promise<void>((resolve, reject) => {
						const returnValue = handler.handle(e);
						if (returnValue instanceof Promise) {
							returnValue.then(e => (e.isRight() ? reject(e.getRight()) : resolve()));
						} else {
							returnValue.isRight() ? reject(returnValue.getRight()) : resolve();
						}
					})
				);
			}
		}
		await Promise.all(promises);
	}

	subscribe<D extends DomainEvent<DTO>, DTO = unknown>(handler: EventHandler<D, DTO>): void {
		this.info.addEventHandler(handler);
	}

	unsubscribe<D extends DomainEvent<T>, T>(handler: EventHandler<D, T>): void {
		this.info.removeEventHandler(handler);
	}
}
