import { DomainEvent, EventHandler } from '@hexadrop/core';
import { assert, stub } from 'sinon';
import { InMemoryEventBus } from '../infraestructure';

export class InMemoryMockEventBus extends InMemoryEventBus {
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

	async publish(...events: DomainEvent[]): Promise<void> {
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
