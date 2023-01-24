import type {
	DomainEvent,
	DomainEventClass,
	EventBus,
	EventBusCallback,
	EventHandler,
	Nullable,
} from '@hexadrop/core';

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
						const returnValue = handler(e.toPrimitive());
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

	subscribe<Event extends DomainEvent<DTO>, DTO>(
		event: DomainEventClass<Event, DTO> | EventHandler<Event, DTO>,
		callback?: Nullable<EventBusCallback<DTO>>
	): Promise<void> | void {
		if (callback) {
			const e = event as DomainEventClass<Event, DTO>;
			this.info.addCallBack(e, callback);
		} else {
			this.info.addEventHandler(event as EventHandler<Event, DTO>);
		}
	}

	unsubscribe<Event extends DomainEvent<DTO>, DTO>(
		event: DomainEventClass<Event, DTO> | EventHandler<Event, DTO>,
		callback?: Nullable<EventBusCallback<DTO>>
	): Promise<void> | void {
		if (callback) {
			const e = event as DomainEventClass<Event, DTO>;
			this.info.removeCallBack(e, callback);
		} else {
			this.info.removeEventHandler(event as EventHandler<Event, DTO>);
		}
	}
}
