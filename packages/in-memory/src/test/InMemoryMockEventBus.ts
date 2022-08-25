import type { DomainEvent, DomainEventClass, EventBusCallback, EventHandler, Nullable } from '@hexadrop/core';
import { assert, stub } from 'sinon';
import { InMemoryEventBus } from '../infraestructure';

export class InMemoryMockEventBus extends InMemoryEventBus {
	publishSpy = stub<DomainEvent[], void | Promise<void>>();
	subscribeSpy = stub<
		[DomainEventClass<DomainEvent> | EventHandler<DomainEvent, any>, Nullable<EventBusCallback<any>>],
		void | Promise<void>
	>();
	unsubscribeSpy = stub<
		[DomainEventClass<DomainEvent> | EventHandler<DomainEvent, any>, Nullable<EventBusCallback<any>>],
		void | Promise<void>
	>();

	private static getDataFromDomainEvent(event: DomainEvent) {
		const { eventId, occurredOn, ...attributes } = event;
		return attributes;
	}

	assertIsSubscribed<D extends DomainEvent<DTO>, DTO>(handler: EventHandler<D, DTO>) {
		assert.called(this.subscribeSpy);
		assert.calledWith(this.subscribeSpy, handler);
	}

	assertIsUnsubscribed<D extends DomainEvent<DTO>, DTO>(handler: EventHandler<D, DTO>) {
		assert.called(this.unsubscribeSpy);
		assert.calledWith(this.unsubscribeSpy, handler);
	}

	assertLastPublishedEvents(...expectedEvents: DomainEvent[]) {
		assert.called(this.publishSpy);
		const lastSpyCall = this.publishSpy.lastCall;
		assert.match(lastSpyCall.args.length, expectedEvents.length);
		const eventsArr = lastSpyCall.args;
		assert.match(
			eventsArr.map(e => InMemoryMockEventBus.getDataFromDomainEvent(e)),
			expectedEvents.map(e => InMemoryMockEventBus.getDataFromDomainEvent(e))
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
			eventsArr.map(e => InMemoryMockEventBus.getDataFromDomainEvent(e)),
			expectedEvents.map(e => InMemoryMockEventBus.getDataFromDomainEvent(e))
		);
	}

	assertSubscriptionsLength(length: number) {
		assert.callCount(this.subscribeSpy, length);
	}

	assertUnsubscriptionLength(length: number) {
		assert.callCount(this.unsubscribeSpy, length);
	}

	override async publish(...events: DomainEvent[]): Promise<void> {
		await this.publishSpy(...events);
		return super.publish(...events);
	}

	override async subscribe<Event extends DomainEvent<DTO>, DTO>(
		event: DomainEventClass<Event, DTO> | EventHandler<Event, DTO>,
		callback?: Nullable<EventBusCallback<DTO>>
	): Promise<void> {
		await this.subscribeSpy(event, callback);
		return super.subscribe(event, callback);
	}

	override async unsubscribe<Event extends DomainEvent<DTO>, DTO>(
		event: DomainEventClass<Event, DTO> | EventHandler<Event, DTO>,
		callback?: Nullable<EventBusCallback<DTO>>
	): Promise<void> {
		await this.unsubscribeSpy(event, callback);
		return super.unsubscribe(event, callback);
	}
}
