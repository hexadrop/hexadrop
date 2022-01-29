import { DomainEvent, DomainEventClass, EventBus } from '../../domain';

type Callback = (dto: any) => Promise<void> | void;

type DomainEventClassTuple<DTO, E extends DomainEvent<DTO>> = [DomainEventClass<DTO, E>, Callback];

export class InMemoryEventBus implements EventBus {
	private readonly subscriptions: Map<string, Callback[]>;

	constructor(initialSubscription: DomainEventClassTuple<unknown, DomainEvent<unknown>>[]) {
		this.subscriptions = new Map<string, Callback[]>();
		initialSubscription.forEach(([e, c]) => this.subscribe(e, c));
	}

	async publish<T>(events: Array<DomainEvent<T>>): Promise<void> {
		const promises = [];
		for (const e of events) {
			const callbacks = this.subscriptions.get(e.eventName);
			if (!callbacks) continue;
			for (const callback of callbacks) {
				promises.push(
					new Promise<void>(r => {
						callback(e.toPrimitive());
						r();
					})
				);
			}
		}
		await Promise.all(promises);
	}

	subscribe<T>(event: DomainEventClass<T, DomainEvent<T>>, callback: Callback): void {
		const c = this.subscriptions.get(event.EVENT_NAME);
		if (c) {
			this.subscriptions.set(event.EVENT_NAME, [...c, callback]);
		} else {
			this.subscriptions.set(event.EVENT_NAME, [callback]);
		}
	}

	unsubscribe<T>(event: DomainEventClass<T, DomainEvent<T>>, callback: (dto: T) => Promise<void> | void): void {
		const c = this.subscriptions.get(event.EVENT_NAME);
		if (c) {
			this.subscriptions.set(
				event.EVENT_NAME,
				c.filter(e => e !== callback)
			);
		}
	}
}
