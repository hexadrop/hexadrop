import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';

import type { EventBusCallback, EventHandler } from './bus';
import EventBus from './bus';
import type { DomainEventClass } from './domain-event';
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
		for (const event of events) {
			// eslint-disable-next-line no-await-in-loop
			const handlers = await this.info.search(event);
			for (const handler of handlers) {
				promises.push(
					new Promise<Either<DomainError, void>>(resolve => {
						try {
							const returnValue = handler(event);
							if (returnValue instanceof Promise) {
								void returnValue
									.then(either => resolve(either))
									.catch((error: unknown) => {
										if (error instanceof DomainError) {
											resolve(Either.left(error));
										} else {
											resolve(Either.left(new EventHandlerError(error)));
										}
									});
							} else {
								resolve(returnValue);
							}
						} catch (error) {
							if (error instanceof DomainError) {
								resolve(Either.left(error));
							} else {
								resolve(Either.left(new EventHandlerError(error)));
							}
						}
					})
				);
			}
		}

		const results = await Promise.all(promises);
		const someError = results.find(either => either.isLeft());

		return someError ?? Either.right();
	}

	/*
	 * Subscribes to a domain event.
	 *
	 * @abstract
	 * @param {DomainEventClass<Event>} event - The domain event to subscribe to.
	 * @param {EventBusCallback<Event> | EventHandler<Event>} useCaseOrCallback - The use case or callback to be executed when the event is triggered.
	 */
	async subscribe<Event extends DomainEvent>(
		event: DomainEventClass<Event>,
		useCaseOrCallback: EventBusCallback<Event> | EventHandler<Event>
	): Promise<void> {
		if ('run' in useCaseOrCallback) {
			await this.info.register(event, useCaseOrCallback.run.bind(useCaseOrCallback));

			return;
		}
		await this.info.register(event, useCaseOrCallback);
	}
}
