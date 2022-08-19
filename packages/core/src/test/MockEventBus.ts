import { assert, stub } from 'sinon';
import type { DomainEvent } from '../cqrs/DomainEvent';
import type { EventBus } from '../cqrs/EventBus';
import type { EventHandler } from '../cqrs/EventHandler';

export class MockEventBus implements EventBus {
	publishSpy = stub<DomainEvent[], void | Promise<void>>();
	subscribeSpy = stub<[EventHandler<DomainEvent, unknown>], void | Promise<void>>();
	unsubscribeSpy = stub<[EventHandler<DomainEvent, unknown>], void | Promise<void>>();

	private static getDataFromDomainEvent(event: DomainEvent) {
		const { eventId, occurredOn, ...attributes } = event;
		return attributes;
	}

	assertIsSubscribed<DTO, D extends DomainEvent<DTO>>(handler: EventHandler<D, unknown>) {
		assert.called(this.subscribeSpy);
		assert.calledWith(this.subscribeSpy, handler);
	}

	assertIsUnsubscribed<DTO, D extends DomainEvent<DTO>>(handler: EventHandler<D, unknown>) {
		assert.called(this.unsubscribeSpy);
		assert.calledWith(this.unsubscribeSpy, handler);
	}

	assertLastPublishedEvents(...expectedEvents: DomainEvent[]) {
		assert.called(this.publishSpy);
		const lastSpyCall = this.publishSpy.lastCall;
		assert.match(lastSpyCall.args.length, expectedEvents.length);
		const eventsArr = lastSpyCall.args;
		assert.match(
			eventsArr.map(e => MockEventBus.getDataFromDomainEvent(e)),
			expectedEvents.map(e => MockEventBus.getDataFromDomainEvent(e))
		);
	}

	assertNotPublishEvent() {
		assert.notCalled(this.publishSpy);
	}

	assertPublishedEvents(...expectedEvents: DomainEvent[]) {
		assert.called(this.publishSpy);
		const eventsArr = this.publishSpy
			.getCalls()
			.map(c => c.args)
			.flat();
		assert.match(eventsArr.length, expectedEvents.length);
		assert.match(
			eventsArr.map(e => MockEventBus.getDataFromDomainEvent(e)),
			expectedEvents.map(e => MockEventBus.getDataFromDomainEvent(e))
		);
	}

	assertSubscriptionsLength(length: number) {
		assert.callCount(this.subscribeSpy, length);
	}

	assertUnsubscriptionLength(length: number) {
		assert.callCount(this.unsubscribeSpy, length);
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
