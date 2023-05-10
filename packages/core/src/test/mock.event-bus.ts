import { assert, stub } from 'sinon';

import type { DomainEvent, DomainEventClass } from '../cqrs/domain-event';
import type { EventBus, EventBusCallback } from '../cqrs/event-bus';
import type { UseCase } from '../cqrs/use-case';

export class MockEventBus implements EventBus {
	publishSpy = stub<DomainEvent[], Promise<void> | void>();
	subscribeSpy = stub<
		[DomainEventClass<any>, EventBusCallback<any> | UseCase<any>],
		Promise<void> | void
	>();

	unsubscribeSpy = stub<
		[DomainEventClass<any>, EventBusCallback<any> | UseCase<any>],
		Promise<void> | void
	>();

	private static getDataFromDomainEvent(event: DomainEvent) {
		const { eventId: _e, occurredOn: _o, ...attributes } = event;

		return attributes;
	}

	assertIsSubscribed<D extends DomainEvent>(
		clazz: DomainEventClass<D>,
		handler: UseCase<D>
	): void {
		assert.called(this.subscribeSpy);
		assert.calledWith(this.subscribeSpy, clazz, handler);
	}

	assertIsUnsubscribed<D extends DomainEvent>(
		clazz: DomainEventClass<D>,
		handler: UseCase<D>
	): void {
		assert.called(this.unsubscribeSpy);
		assert.calledWith(this.unsubscribeSpy, clazz, handler);
	}

	assertLastPublishedEvents(...expectedEvents: DomainEvent[]): void {
		assert.called(this.publishSpy);
		const lastSpyCall = this.publishSpy.lastCall;
		assert.match(lastSpyCall.args.length, expectedEvents.length);
		const eventsArr = lastSpyCall.args;
		assert.match(
			eventsArr.map(e => MockEventBus.getDataFromDomainEvent(e)),
			expectedEvents.map(e => MockEventBus.getDataFromDomainEvent(e))
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
			eventsArr.map(e => MockEventBus.getDataFromDomainEvent(e)),
			expectedEvents.map(e => MockEventBus.getDataFromDomainEvent(e))
		);
	}

	assertSubscriptionsLength(length: number): void {
		assert.callCount(this.subscribeSpy, length);
	}

	assertUnsubscriptionLength(length: number): void {
		assert.callCount(this.unsubscribeSpy, length);
	}

	publish(...events: DomainEvent[]): Promise<void> | void {
		return this.publishSpy(...events);
	}

	subscribe<D extends DomainEvent>(
		event: DomainEventClass<D>,
		useCaseOrCallback: EventBusCallback<D> | UseCase<D>
	): Promise<void> | void {
		return this.subscribeSpy(event, useCaseOrCallback);
	}

	unsubscribe<D extends DomainEvent>(
		event: DomainEventClass<D>,
		useCaseOrCallback: EventBusCallback<D> | UseCase<D>
	): Promise<void> | void {
		return this.unsubscribeSpy(event, useCaseOrCallback);
	}
}
