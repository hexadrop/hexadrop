import { assert, stub } from 'sinon';
import { DomainEvent } from '../cqrs/DomainEvent';
import { EventBus } from '../cqrs/EventBus';
import { EventHandler } from '../cqrs/EventHandler';

export class MockEventBus implements EventBus {
	publishSpy = stub<DomainEvent[], void | Promise<void>>();
	subscribeSpy = stub<[EventHandler<DomainEvent, unknown>], void | Promise<void>>();
	unsubscribeSpy = stub<[EventHandler<DomainEvent, unknown>], void | Promise<void>>();

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
		assert.calledWith(lastSpyCall, ...expectedEvents);
	}

	assertNotPublishEvent() {
		assert.notCalled(this.publishSpy);
	}

	assertPublishedEvents(...expectedEvents: DomainEvent[]) {
		const events = [...expectedEvents];
		assert.called(this.publishSpy);
		const eventsArr = this.publishSpy
			.getCalls()
			.map(c => c.args)
			.flat();
		assert.match(eventsArr.length, expectedEvents.length);
		this.publishSpy.getCalls().forEach(c => {
			const expected = events.splice(0, c.args.length);
			assert.calledWith(c, ...expected);
		});
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
