import Either from '@hexadrop/either';
import type DomainError from '@hexadrop/error';
import PQueue from 'p-queue';

import EventBus from './bus';
import DomainEvent from './domain-event';
import { EventHandlerError } from './error';
import EventHandlers from './event-handlers';

/**
 * AsyncEventBus is a class that extends the abstract EventBus class.
 * It provides an asynchronous implementation of the EventBus.
 *
 * @class
 * @extends {EventBus}
 */
export default class AsyncEventBus extends EventBus {
	/**
	 * The event handlers for the bus.
	 *
	 * @private
	 * @type {EventHandlers}
	 */
	private readonly info: EventHandlers;

	/**
	 * The queue for the bus.
	 *
	 * @private
	 * @type {PQueue}
	 */
	private readonly queue: PQueue;

	/**
	 * Creates an instance of AsyncEventBus.
	 *
	 * @param {EventHandlers} info - The event handlers for the bus.
	 * @param {number} [concurrency=5] - The maximum number of concurrent handlers.
	 */
	constructor(info: EventHandlers, concurrency = 5) {
		super();
		this.info = info;
		this.queue = new PQueue({ concurrency });
	}

	/**
	 * @async
	 * @param {...DomainEvent[]} events - The domain events to publish.
	 * @returns {Either<DomainError, void>}
	 */
	publish(...events: DomainEvent[]): Either<DomainError, void> {
		for (const event of events) {
			const handlers = this.info.search(event);
			for (const handler of handlers) {
				void this.queue.add(
					() =>
						new Promise<Either<DomainError, void>>(resolve => {
							try {
								const returnValue = handler(event);
								if (returnValue instanceof Promise) {
									void returnValue.then(either => resolve(either));
								} else {
									resolve(returnValue);
								}
							} catch (error) {
								resolve(Either.left(new EventHandlerError(error as Error)));
							}
						})
				);
			}
		}

		return Either.right();
	}
}
