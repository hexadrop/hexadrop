import { expect, jest } from 'bun:test';

import type { EventBusCallback, EventHandler } from './bus';
import EventBus from './bus';
import type { DomainEventClass } from './domain-event';
import DomainEvent from './domain-event';

export default class MockEventBus extends EventBus {
	readonly publishSpy = jest.fn((..._events: DomainEvent[]) => Promise.resolve());

	readonly subscribeSpy = jest.fn(
		(_event: DomainEventClass<any>, _handler: EventBusCallback<any> | EventHandler<any>) => Promise.resolve()
	);

	readonly unsubscribeSpy = jest.fn(
		(_event: DomainEventClass<any>, _handler: EventBusCallback<any> | EventHandler<any>) => Promise.resolve()
	);

	private static getDataFromDomainEvent(event: DomainEvent) {
		const { eventId: _e, occurredOn: _o, ...attributes } = event;

		return attributes;
	}

	assertIsSubscribed<D extends DomainEvent>(clazz: DomainEventClass<D>, handler: EventHandler<D>): void {
		const some = this.subscribeSpy.mock.calls.some(([c, h]) => c === clazz && h === handler);
		expect(some).toBe(true);
	}

	assertIsUnsubscribed<D extends DomainEvent>(clazz: DomainEventClass<D>, handler: EventHandler<D>): void {
		const some = this.unsubscribeSpy.mock.calls.some(([c, h]) => c === clazz && h === handler);
		expect(some).toBe(true);
	}

	assertLastPublishedEvents(...expectedEvents: DomainEvent[]): void {
		expect(this.publishSpy).toHaveBeenCalled();
		const lastSpyCall = this.publishSpy.mock.lastCall;
		expect(lastSpyCall).toBeDefined();
		expect(lastSpyCall?.map(e => MockEventBus.getDataFromDomainEvent(e))).toStrictEqual(
			expectedEvents.map(e => MockEventBus.getDataFromDomainEvent(e))
		);
	}

	assertNotPublishEvent(): void {
		expect(this.publishSpy).not.toHaveBeenCalled();
	}

	assertPublishedEvents(...expectedEvents: DomainEvent[]): void {
		expect(this.publishSpy).toHaveBeenCalled();
		const eventsArr = this.publishSpy.mock.calls.flat();
		expect(eventsArr.map(e => MockEventBus.getDataFromDomainEvent(e))).toStrictEqual(
			expectedEvents.map(e => MockEventBus.getDataFromDomainEvent(e))
		);
	}

	assertSubscriptionsLength(length: number): void {
		expect(this.subscribeSpy).toHaveBeenCalledTimes(length);
	}

	assertUnsubscriptionLength(length: number): void {
		expect(this.unsubscribeSpy).toHaveBeenCalledTimes(length);
	}

	publish(...events: DomainEvent[]): Promise<void> | void {
		return this.publishSpy(...events);
	}

	subscribe<D extends DomainEvent>(
		event: DomainEventClass<D>,
		handlerOrCallback: EventBusCallback<D> | EventHandler<D>
	): Promise<void> | void {
		return this.subscribeSpy(event, handlerOrCallback);
	}

	unsubscribe<D extends DomainEvent>(
		event: DomainEventClass<D>,
		handlerOrCallback: EventBusCallback<D> | EventHandler<D>
	): Promise<void> | void {
		return this.unsubscribeSpy(event, handlerOrCallback);
	}
}
