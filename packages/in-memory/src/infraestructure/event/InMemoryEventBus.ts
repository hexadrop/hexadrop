import { DomainEvent, EventBus, EventHandler } from '@hexadrop/core';

export class InMemoryEventBus implements EventBus {
	private readonly subscriptions: Map<string, EventHandler<any, unknown>[]>;

	constructor(...initialSubscription: EventHandler<any, unknown>[]) {
		this.subscriptions = new Map<string, EventHandler<any, unknown>[]>();
		initialSubscription?.forEach(h => this.subscribe(h));
	}

	async publish(...events: DomainEvent[]): Promise<void> {
		const promises = [];
		for (const e of events) {
			const handlers = this.subscriptions.get(e.eventName);
			if (!handlers) continue;
			for (const handler of handlers) {
				promises.push(
					new Promise<void>(r => {
						const returnValue = handler.handle(e.toPrimitive());
						if (returnValue) {
							returnValue.then(() => r());
						} else {
							r();
						}
					})
				);
			}
		}
		await Promise.all(promises);
	}

	subscribe<D extends DomainEvent<DTO>, DTO = unknown>(handler: EventHandler<D, DTO>): void {
		const event = handler.subscribedTo();
		const c = this.subscriptions.get(event.EVENT_NAME);
		if (c) {
			this.subscriptions.set(event.EVENT_NAME, [...c, handler]);
		} else {
			this.subscriptions.set(event.EVENT_NAME, [handler]);
		}
	}

	unsubscribe<D extends DomainEvent<T>, T>(handler: EventHandler<D, T>): void {
		const event = handler.subscribedTo();
		const c = this.subscriptions.get(event.EVENT_NAME);
		if (c) {
			this.subscriptions.set(
				event.EVENT_NAME,
				c.filter(e => e !== handler)
			);
		}
	}
}
