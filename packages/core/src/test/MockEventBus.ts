import { expect, vi } from 'vitest';
import { DomainEvent } from '../cqrs/DomainEvent';
import { EventBus } from '../cqrs/EventBus';
import { EventHandler } from '../cqrs/EventHandler';

export class MockEventBus implements EventBus {
	publishSpy = vi.fn<DomainEvent[], void | Promise<void>>();
	subscribeSpy = vi.fn<[EventHandler<DomainEvent, unknown>], void | Promise<void>>();
	unsubscribeSpy = vi.fn<[EventHandler<DomainEvent, unknown>], void | Promise<void>>();

	private static getDataFromDomainEvent(event: DomainEvent) {
		const { eventId, occurredOn, ...attributes } = event;
		return attributes;
	}

	assertIsSubscribed<DTO, D extends DomainEvent<DTO>>(handler: EventHandler<D, unknown>) {
		const spyCalls = this.subscribeSpy.mock.calls;

		expect(spyCalls.length).toBeGreaterThan(0);

		const handlers = spyCalls.map(c => c[0]) as EventHandler<D, unknown>[];
		expect(handlers.some(h => h.constructor.name === handler.constructor.name)).toBeTruthy();
	}

	assertIsUnsubscribed<DTO, D extends DomainEvent<DTO>>(handler: EventHandler<D, unknown>) {
		const spyCalls = this.unsubscribeSpy.mock.calls;

		expect(spyCalls.length).toBeGreaterThan(0);

		const handlers = spyCalls.map(c => c[0]) as EventHandler<D, unknown>[];
		expect(handlers.some(h => h.constructor.name === handler.constructor.name)).toBeTruthy();
	}

	assertLastPublishedEvents(...expectedEvents: DomainEvent[]) {
		const spyCalls = this.publishSpy.mock.calls;

		expect(spyCalls.length).toBeGreaterThan(0);

		const lastSpyCall = spyCalls[spyCalls.length - 1];

		const lastPublishedEventsData = lastSpyCall.map(c => MockEventBus.getDataFromDomainEvent(c));
		const expectedEventsData = expectedEvents.map(c => MockEventBus.getDataFromDomainEvent(c));

		expect(lastPublishedEventsData).toMatchObject(expectedEventsData);
	}

	assertNotPublishEvent() {
		const spyCalls = this.publishSpy.mock.calls;
		expect(spyCalls.length).toBe(0);
	}

	assertPublishedEvents(...expectedEvents: DomainEvent[]) {
		const spyCalls = this.publishSpy.mock.calls;

		expect(spyCalls.length).toBeGreaterThan(0);

		const publishedEvents = spyCalls.flat() as DomainEvent[];

		const publishedEventsData = publishedEvents.map(e => MockEventBus.getDataFromDomainEvent(e));
		const expectedEventsData = expectedEvents.map(e => MockEventBus.getDataFromDomainEvent(e));

		expect(expectedEventsData).toMatchObject(publishedEventsData);
	}

	assertSubscriptionsLength(length: number) {
		const spyCalls = this.subscribeSpy.mock.calls;
		expect(spyCalls.length).toBe(length);
	}

	assertUnsubscriptionLength(length: number) {
		const spyCalls = this.unsubscribeSpy.mock.calls;
		expect(spyCalls.length).toBe(length);
	}

	publish(...events: DomainEvent[]): Promise<void> | void {
		return this.publishSpy(...events);
	}

	subscribe<D extends DomainEvent>(handler: EventHandler<D, unknown>): void | Promise<void> {
		return this.subscribeSpy(handler);
	}

	unsubscribe<D extends DomainEvent>(handler: EventHandler<D, unknown>): void | Promise<void> {
		return this.unsubscribeSpy(handler);
	}
}
