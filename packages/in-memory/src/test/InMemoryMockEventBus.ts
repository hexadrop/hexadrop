import { DomainEvent, EventHandler } from '@hexadrop/core';
import { expect, vi } from 'vitest';
import { InMemoryEventBus } from '../infraestructure';

export class InMemoryMockEventBus extends InMemoryEventBus {
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

		const lastPublishedEventsData = lastSpyCall.map(c => InMemoryMockEventBus.getDataFromDomainEvent(c));
		const expectedEventsData = expectedEvents.map(c => InMemoryMockEventBus.getDataFromDomainEvent(c));

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

		const publishedEventsData = publishedEvents.map(e => InMemoryMockEventBus.getDataFromDomainEvent(e));
		const expectedEventsData = expectedEvents.map(e => InMemoryMockEventBus.getDataFromDomainEvent(e));

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

	async publish<T>(...events: DomainEvent[]): Promise<void> {
		await this.publishSpy(...events);
		return super.publish(...events);
	}

	async subscribe<D extends DomainEvent>(handler: EventHandler<D, unknown>): Promise<void> {
		await this.subscribeSpy(handler);
		return super.subscribe(handler);
	}

	async unsubscribe<D extends DomainEvent>(handler: EventHandler<D, unknown>): Promise<void> {
		await this.unsubscribeSpy(handler);
		super.unsubscribe(handler);
	}
}
