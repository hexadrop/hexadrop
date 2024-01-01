import Either from '@hexadrop/either';
import type DomainError from '@hexadrop/error';

import EventBus from './bus';
import DomainEvent from './domain-event';
import { EventHandlerError } from './error';
import EventHandlers from './event-handlers';

/**
 * SyncEventBus is a class that extends the abstract EventBus class.
 * It provides a synchronous implementation of the EventBus.
 *
 * @class
 * @extends {EventBus}
 */
export default class SyncEventBus extends EventBus {
	/**
	 * The event handlers for the bus.
	 *
	 * @private
	 * @type {EventHandlers}
	 */
	private readonly info: EventHandlers;

	/**
	 * Creates an instance of SyncEventBus.
	 *
	 * @param {EventHandlers} info - The event handlers for the bus.
	 */
	constructor(info: EventHandlers) {
		super();
		this.info = info;
	}

	/**
	 * Publishes one or more domain events.
	 * It iterates over each event and each handler for the event, and calls the handler with the event.
	 * If the handler returns a Promise, it waits for the Promise to resolve.
	 * If the handler throws an error, it wraps the error in an Either and resolves the Promise with it.
	 * After all handlers have been called for all events, it checks if any of them returned an error.
	 * If at least one handler returned an error, it returns the first error.
	 * Otherwise, it returns a right Either with undefined.
	 *
	 * @async
	 * @param {...DomainEvent[]} events - The domain events to publish.
	 * @returns {Promise<Either<DomainError, void>>} - A Promise that resolves to an Either. If at least one handler returned an error, it is an Either.left with the first error. Otherwise, it is an Either.right with undefined.
	 */
	async publish(...events: DomainEvent[]): Promise<Either<DomainError, void>> {
		const promises = [];
		for (const e of events) {
			const handlers = this.info.search(e);
			for (const handler of handlers) {
				promises.push(
					new Promise<Either<DomainError, void>>(resolve => {
						try {
							const returnValue = handler(e);
							if (returnValue instanceof Promise) {
								void returnValue.then(e => resolve(e));
							} else {
								resolve(returnValue);
							}
						} catch (e) {
							resolve(Either.left(new EventHandlerError(e as Error)));
						}
					})
				);
			}
		}

		const results = await Promise.all(promises);
		const someError = results.find(e => e.isLeft());

		return someError ?? Either.right(undefined);
	}
}
