import { DomainEvent, EventBus, EventHandler } from '@hexadrop/core';
import PQueue, { Options, QueueAddOptions } from 'p-queue';
import PriorityQueue from 'p-queue/dist/priority-queue';
import { EventHandlersInformation } from './EventHandlersInformation';

export class InMemoryQueuedEventBus implements EventBus {
	private readonly q: PQueue;

	constructor(
		private readonly info: EventHandlersInformation,
		queueOptions?: Omit<Options<PriorityQueue, QueueAddOptions>, 'autoStart'>
	) {
		const defaultOptions = {
			autoStart: true,
		};
		const options = queueOptions ? { ...queueOptions, ...defaultOptions } : defaultOptions;
		this.q = new PQueue(options);
	}

	async publish(...events: DomainEvent[]): Promise<void> {
		const promises = [];
		for (const e of events) {
			const handlers = this.info.search(e);
			for (const handler of handlers) {
				promises.push(this.q.add(() => handler.handle(e)));
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
