import EventBus from './bus';
import DomainEvent from './domain-event';
import type { EventHandlers } from './event-handlers';

export default class SyncEventBus extends EventBus {
	private readonly info: EventHandlers;
	constructor(info: EventHandlers) {
		super();
		this.info = info;
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
}
