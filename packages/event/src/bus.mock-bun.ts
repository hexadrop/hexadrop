import Either from '@hexadrop/either';
import type DomainError from '@hexadrop/error';
import { expect, jest } from 'bun:test';

import type { EventBusCallback, EventHandler } from './bus';
import EventBus from './bus';
import type { DomainEventClass } from './domain-event';
import DomainEvent from './domain-event';

/**
 * BunMockEventBus is a class that extends the abstract EventBus class.
 * It provides a mock implementation of the EventBus for testing purposes.
 * It includes methods to assert the behavior of the bus.
 *
 * @class
 * @extends {EventBus}
 */
export default class BunMockEventBus extends EventBus {
	/**
	 * A spy function that mocks the 'publish' method of the bus.
	 *
	 * @readonly
	 */
	readonly publishSpy = jest.fn((..._events: DomainEvent[]) =>
		Promise.resolve(Either.right<DomainError, void>(undefined))
	);

	/**
	 * A spy function that mocks the 'subscribe' method of the bus.
	 *
	 * @readonly
	 */
	readonly subscribeSpy = jest.fn(
		(_event: DomainEventClass<any>, _handler: EventBusCallback<any> | EventHandler<any>) => Promise.resolve()
	);

	/**
	 * A spy function that mocks the 'unsubscribe' method of the bus.
	 *
	 * @readonly
	 */
	readonly unsubscribeSpy = jest.fn(
		(_event: DomainEventClass<any>, _handler: EventBusCallback<any> | EventHandler<any>) => Promise.resolve()
	);

	/**
	 * A static method that extracts the data from a domain event.
	 *
	 * @private
	 * @static
	 * @param {DomainEvent} event - The domain event to extract data from.
	 * @returns {Object} - The data extracted from the domain event.
	 */
	private static getDataFromDomainEvent(event: DomainEvent) {
		const { eventId: _e, occurredOn: _o, ...attributes } = event;

		return attributes;
	}

	/**
	 * Asserts that a handler is subscribed to a domain event.
	 *
	 * @template D - The type of the domain event. It must extend DomainEvent.
	 * @param {DomainEventClass<D>} clazz - The class of the domain event.
	 * @param {EventHandler<D>} handler - The handler to check.
	 */
	assertIsSubscribed<D extends DomainEvent>(clazz: DomainEventClass<D>, handler: EventHandler<D>): void {
		const some = this.subscribeSpy.mock.calls.some(([c, h]) => c === clazz && h === handler);
		expect(some).toBe(true);
	}

	/**
	 * Asserts that a handler is unsubscribed from a domain event.
	 *
	 * @template D - The type of the domain event. It must extend DomainEvent.
	 * @param {DomainEventClass<D>} clazz - The class of the domain event.
	 * @param {EventHandler<D>} handler - The handler to check.
	 */
	assertIsUnsubscribed<D extends DomainEvent>(clazz: DomainEventClass<D>, handler: EventHandler<D>): void {
		const some = this.unsubscribeSpy.mock.calls.some(([c, h]) => c === clazz && h === handler);
		expect(some).toBe(true);
	}

	/**
	 * Asserts that the last published events match the expected events.
	 *
	 * @param {...DomainEvent[]} expectedEvents - The expected domain events.
	 */
	assertLastPublishedEvents(...expectedEvents: DomainEvent[]): void {
		expect(this.publishSpy).toHaveBeenCalled();
		const lastSpyCall = this.publishSpy.mock.lastCall;
		expect(lastSpyCall).toBeDefined();
		expect(lastSpyCall?.map(e => BunMockEventBus.getDataFromDomainEvent(e))).toStrictEqual(
			expectedEvents.map(e => BunMockEventBus.getDataFromDomainEvent(e))
		);
	}

	/**
	 * Asserts that no events were published.
	 */
	assertNotPublishEvent(): void {
		expect(this.publishSpy).not.toHaveBeenCalled();
	}

	/**
	 * Asserts that the published events match the expected events.
	 *
	 * @param {...DomainEvent[]} expectedEvents - The expected domain events.
	 */
	assertPublishedEvents(...expectedEvents: DomainEvent[]): void {
		expect(this.publishSpy).toHaveBeenCalled();
		const eventsArr = this.publishSpy.mock.calls.flat();
		expect(eventsArr.map(e => BunMockEventBus.getDataFromDomainEvent(e))).toStrictEqual(
			expectedEvents.map(e => BunMockEventBus.getDataFromDomainEvent(e))
		);
	}

	/**
	 * Asserts that the number of subscriptions matches the expected number.
	 *
	 * @param {number} length - The expected number of subscriptions.
	 */
	assertSubscriptionsLength(length: number): void {
		expect(this.subscribeSpy).toHaveBeenCalledTimes(length);
	}

	/**
	 * Asserts that the number of unsubscriptions matches the expected number.
	 *
	 * @param {number} length - The expected number of unsubscriptions.
	 */
	assertUnsubscriptionLength(length: number): void {
		expect(this.unsubscribeSpy).toHaveBeenCalledTimes(length);
	}

	/**
	 * Publishes one or more domain events.
	 * It calls the 'publishSpy' method with the events.
	 *
	 * @param {...DomainEvent[]} events - The domain events to publish.
	 * @returns {Promise<Either<DomainError, void>> | Either<DomainError, void>} - The result of the 'publishSpy' method.
	 */
	publish(...events: DomainEvent[]): Promise<Either<DomainError, void>> | Either<DomainError, void> {
		return this.publishSpy(...events);
	}

	/**
	 * Subscribes a handler or a callback to a domain event.
	 * It calls the 'subscribeSpy' method with the event and the handler or callback.
	 *
	 * @template D - The type of the domain event. It must extend DomainEvent.
	 * @param {DomainEventClass<D>} event - The class of the domain event.
	 * @param {EventBusCallback<D> | EventHandler<D>} handlerOrCallback - The handler or callback to subscribe.
	 * @returns {Promise<void> | void} - The result of the 'subscribeSpy' method.
	 */
	subscribe<D extends DomainEvent>(
		event: DomainEventClass<D>,
		handlerOrCallback: EventBusCallback<D> | EventHandler<D>
	): Promise<void> | void {
		return this.subscribeSpy(event, handlerOrCallback);
	}

	/**
	 * Unsubscribes a handler or a callback from a domain event.
	 * It calls the 'unsubscribeSpy' method with the event and the handler or callback.
	 *
	 * @template D - The type of the domain event. It must extend DomainEvent.
	 * @param {DomainEventClass<D>} event - The class of the domain event.
	 * @param {EventBusCallback<D> | EventHandler<D>} handlerOrCallback - The handler or callback to unsubscribe.
	 * @returns {Promise<void> | void} - The result of the 'unsubscribeSpy' method.
	 */
	unsubscribe<D extends DomainEvent>(
		event: DomainEventClass<D>,
		handlerOrCallback: EventBusCallback<D> | EventHandler<D>
	): Promise<void> | void {
		return this.unsubscribeSpy(event, handlerOrCallback);
	}
}
