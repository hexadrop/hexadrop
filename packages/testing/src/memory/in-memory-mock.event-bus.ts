import type { DomainEventClass, EventBusCallback, Handler } from '@hexadrop/bus';
import { DomainEvent } from '@hexadrop/bus';
import { InMemoryEventBus } from '@hexadrop/bus/memory';
import { assert, stub } from 'sinon';

export class InMemoryMockEventBus extends InMemoryEventBus {
	publishSpy = stub<DomainEvent[], Promise<void> | void>();
	subscribeSpy = stub<
		[DomainEventClass<DomainEvent>, EventBusCallback<any> | Handler<any>],
		Promise<void> | void
	>();

	unsubscribeSpy = stub<
		[DomainEventClass<DomainEvent>, EventBusCallback<any> | Handler<any>],
		Promise<void> | void
	>();

	private static getDataFromDomainEvent(event: DomainEvent) {
		const { eventId: _e, occurredOn: _o, ...attributes } = event;

		return attributes;
	}

	assertIsSubscribed<D extends DomainEvent>(
		event: DomainEventClass<D>,
		handler: EventBusCallback<D> | Handler<D>
	): void {
		assert.called(this.subscribeSpy);
		assert.calledWith(this.subscribeSpy, event, handler);
	}

	assertIsUnsubscribed<D extends DomainEvent>(
		event: DomainEventClass<D>,
		handler: EventBusCallback<D> | Handler<D>
	): void {
		assert.called(this.unsubscribeSpy);
		assert.calledWith(this.unsubscribeSpy, event, handler);
	}

	assertLastPublishedEvents(...expectedEvents: DomainEvent[]): void {
		assert.called(this.publishSpy);
		const lastSpyCall = this.publishSpy.lastCall;
		assert.match(lastSpyCall.args.length, expectedEvents.length);
		const eventsArr = lastSpyCall.args;
		assert.match(
			eventsArr.map(e => InMemoryMockEventBus.getDataFromDomainEvent(e)),
			expectedEvents.map(e => InMemoryMockEventBus.getDataFromDomainEvent(e))
		);
	}

	assertNotPublishEvent(): void {
		assert.notCalled(this.publishSpy);
	}

	assertPublishedEvents(...expectedEvents: DomainEvent[]): void {
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

	assertSubscriptionsLength(length: number): void {
		assert.callCount(this.subscribeSpy, length);
	}

	assertUnsubscriptionLength(length: number): void {
		assert.callCount(this.unsubscribeSpy, length);
	}

	override async publish(...events: DomainEvent[]): Promise<void> {
		await this.publishSpy(...events);

		return super.publish(...events);
	}

	override async subscribe<E extends DomainEvent>(
		event: DomainEventClass<E>,
		handler: EventBusCallback<E> | Handler<E>
	): Promise<void> {
		await this.subscribeSpy(event, handler);

		return super.subscribe(event, handler);
	}

	override async unsubscribe<E extends DomainEvent>(
		event: DomainEventClass<E>,
		handler: EventBusCallback<E> | Handler<E>
	): Promise<void> {
		await this.unsubscribeSpy(event, handler);

		return super.unsubscribe(event, handler);
	}
}
