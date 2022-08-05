import { DomainEvent, DomainEventClass, EventBus, EventBusCallback } from '../../domain';

type DomainEventClassTuple<E extends DomainEvent<DTO>, DTO = unknown> = [
	DomainEventClass<E, DTO>,
	EventBusCallback<DTO>
];

export class InMemoryEventBus implements EventBus {
	private readonly subscriptions: Map<string, EventBusCallback<any>[]>;

	constructor(initialSubscription?: DomainEventClassTuple<DomainEvent>[]) {
		this.subscriptions = new Map<string, EventBusCallback[]>();
		initialSubscription?.forEach(([e, c]) => this.subscribe(e, c));
	}

	async publish<T>(events: Array<DomainEvent<T>>): Promise<void> {
		const promises = [];
		for (const e of events) {
			const eventBusCallbacks = this.subscriptions.get(e.eventName);
			if (!eventBusCallbacks) continue;
			for (const eventBusCallback of eventBusCallbacks) {
				promises.push(
					new Promise<void>(r => {
						eventBusCallback(e.toPrimitive());
						r();
					})
				);
			}
		}
		await Promise.all(promises);
	}

	subscribe<D extends DomainEvent<DTO>, DTO = unknown>(
		event: DomainEventClass<D, DTO>,
		callback: EventBusCallback<DTO>
	): void {
		const c = this.subscriptions.get(event.EVENT_NAME);
		if (c) {
			this.subscriptions.set(event.EVENT_NAME, [...c, callback]);
		} else {
			this.subscriptions.set(event.EVENT_NAME, [callback]);
		}
	}

	unsubscribe<D extends DomainEvent<T>, T>(
		event: DomainEventClass<D, T>,
		eventBusCallback: (dto: T) => Promise<void> | void
	): void {
		const c = this.subscriptions.get(event.EVENT_NAME);
		if (c) {
			this.subscriptions.set(
				event.EVENT_NAME,
				c.filter(e => e !== eventBusCallback)
			);
		}
	}
}
