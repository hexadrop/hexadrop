import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import PQueue from 'p-queue';

import type { EventBusCallback, EventHandler } from './bus';
import EventBus from './bus';
import type { DomainEventClass } from './domain-event';
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
	 * @returns {Promise<Either<DomainError, void>>}
	 */
	async publish(...events: DomainEvent[]): Promise<Either<DomainError, void>> {
		for (const event of events) {
			// eslint-disable-next-line no-await-in-loop
			const handlers = await this.info.search(event);
			for (const handler of handlers) {
				void this.queue.add(
					() =>
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

		return Either.right();
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
