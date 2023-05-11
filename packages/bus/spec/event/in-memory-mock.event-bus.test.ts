import type { DomainEventParams, EventBusCallback, Handler } from '@hexadrop/bus';
import { DomainEvent } from '@hexadrop/bus';
import { EventHandlersInformation } from '@hexadrop/bus/memory';
import { Either } from '@hexadrop/either';
import { DomainError } from '@hexadrop/error';
import { InMemoryMockEventBus } from '@hexadrop/testing';
import { describe, expect, test, vi } from 'vitest';

const handler1Spy = vi.fn<[unknown], Either<void, DomainError>>(() => Either.left(undefined));
const handler4Spy = vi.fn<[unknown], Promise<Either<void, DomainError>>>(() =>
	Promise.resolve(Either.left(undefined))
);

class Event1 extends DomainEvent {
	static override EVENT_NAME = 'Event1';

	constructor({ eventId, occurredOn, relatedId, aggregateId }: DomainEventParams<Event1>) {
		super(Event1.EVENT_NAME, eventId, aggregateId, occurredOn, relatedId);
	}
}

class Event1Handler implements Handler<Event1> {
	run(event: Event1) {
		return handler1Spy(event);
	}
}

class Event2 extends DomainEvent {
	static override EVENT_NAME = 'Event2';

	constructor({ eventId, occurredOn, relatedId, aggregateId }: DomainEventParams<Event2>) {
		super(Event2.EVENT_NAME, eventId, aggregateId, occurredOn, relatedId);
	}
}

class Event4 extends DomainEvent {
	static override EVENT_NAME = 'Event4';

	constructor({ eventId, occurredOn, relatedId, aggregateId }: DomainEventParams<Event4>) {
		super(Event4.EVENT_NAME, eventId, aggregateId, occurredOn, relatedId);
	}
}

class Event4Handler implements Handler<Event4> {
	async run(event: Event4): Promise<Either<void, DomainError>> {
		return handler4Spy(event);
	}
}

describe('InMemoryMockEventBus', () => {
	test('should assertIsSubscribed works as expected', async () => {
		const handler1 = new Event1Handler();
		const handler4 = new Event4Handler();
		const info = new EventHandlersInformation();
		const bus = new InMemoryMockEventBus(info);

		expect(() => bus.assertIsSubscribed(Event1, handler1)).toThrow();
		expect(() => bus.assertIsSubscribed(Event4, handler4)).toThrow();

		await bus.subscribe(Event1, handler1);

		expect(() => bus.assertIsSubscribed(Event1, handler1)).not.toThrow();
		expect(() => bus.assertIsSubscribed(Event4, handler4)).toThrow();

		await bus.subscribe(Event4, handler4);

		expect(() => bus.assertIsSubscribed(Event1, handler1)).not.toThrow();
		expect(() => bus.assertIsSubscribed(Event4, handler4)).not.toThrow();
	});
	test('should assertSubscriptionsLength works as expected', async () => {
		const handler1 = new Event1Handler();
		const handler4 = new Event4Handler();
		const info = new EventHandlersInformation();
		const bus = new InMemoryMockEventBus(info);

		expect(() => bus.assertSubscriptionsLength(1)).toThrow();

		await bus.subscribe(Event1, handler1);

		expect(() => bus.assertSubscriptionsLength(1)).not.toThrow();

		await bus.subscribe(Event4, handler4);

		expect(() => bus.assertSubscriptionsLength(1)).toThrow();
		expect(() => bus.assertSubscriptionsLength(2)).not.toThrow();
	});
	test('should assertIsUnsubscribed works as expected', async () => {
		const handler1 = new Event1Handler();
		const handler4 = new Event4Handler();
		const map = new Map<string, EventBusCallback[]>();
		map.set(Event1.EVENT_NAME, [handler1.run.bind(handler1)]);
		map.set(Event4.EVENT_NAME, [handler4.run.bind(handler4)]);
		const info = new EventHandlersInformation(map);
		const bus = new InMemoryMockEventBus(info);

		expect(() => bus.assertIsUnsubscribed(Event1, handler1)).toThrow();
		expect(() => bus.assertIsUnsubscribed(Event4, handler4)).toThrow();

		await bus.unsubscribe(Event1, handler1);

		expect(() => bus.assertIsUnsubscribed(Event1, handler1)).not.toThrow();
		expect(() => bus.assertIsUnsubscribed(Event4, handler4)).toThrow();

		await bus.unsubscribe(Event4, handler4);

		expect(() => bus.assertIsUnsubscribed(Event1, handler1)).not.toThrow();
		expect(() => bus.assertIsUnsubscribed(Event4, handler4)).not.toThrow();
	});
	test('should assertUnsubscriptionLength works as expected', async () => {
		const handler1 = new Event1Handler();
		const handler4 = new Event4Handler();
		const map = new Map<string, EventBusCallback[]>();
		map.set(Event1.EVENT_NAME, [handler1.run.bind(handler1)]);
		map.set(Event4.EVENT_NAME, [handler4.run.bind(handler4)]);
		const info = new EventHandlersInformation(map);
		const bus = new InMemoryMockEventBus(info);

		expect(() => bus.assertUnsubscriptionLength(1)).toThrow();

		await bus.unsubscribe(Event1, handler1);

		expect(() => bus.assertUnsubscriptionLength(1)).not.toThrow();

		await bus.unsubscribe(Event4, handler4);

		expect(() => bus.assertUnsubscriptionLength(1)).toThrow();
		expect(() => bus.assertUnsubscriptionLength(2)).not.toThrow();
	});
	test('should assertNotPublishEvent works as expected', async () => {
		const date = new Date();
		const handler1 = new Event1Handler();
		const event1 = new Event1({ eventId: '1', aggregateId: '1', occurredOn: date });
		const map = new Map<string, EventBusCallback[]>();
		map.set(Event1.EVENT_NAME, [handler1.run.bind(handler1)]);
		const info = new EventHandlersInformation(map);
		const bus = new InMemoryMockEventBus(info);

		expect(() => bus.assertNotPublishEvent()).not.toThrow();

		await bus.publish(event1);

		expect(() => bus.assertNotPublishEvent()).toThrow();
	});
	test('should assertLastPublishedEvents works as expected', async () => {
		const date = new Date();
		const event1 = new Event1({ eventId: '1', aggregateId: '1', occurredOn: date });
		const event2 = new Event2({ eventId: '2', aggregateId: '2' });
		const event4 = new Event4({ eventId: '3', aggregateId: '3' });
		const event44 = new Event4({ eventId: '3', aggregateId: '3' });
		const info = new EventHandlersInformation();
		const bus = new InMemoryMockEventBus(info);

		await bus.publish(event1);
		await bus.publish(event2, event4);

		expect(() => bus.assertLastPublishedEvents(event1, event2, event44)).toThrow();

		expect(() => bus.assertLastPublishedEvents(event2, event44)).not.toThrow();
	});
	test('should assertPublishedEvents works as expected', async () => {
		const date = new Date();
		const event1 = new Event1({ eventId: '1', aggregateId: '1', occurredOn: date });
		const event2 = new Event2({ eventId: '2', aggregateId: '2' });
		const event4 = new Event4({ eventId: '3', aggregateId: '3' });
		const info = new EventHandlersInformation();
		const bus = new InMemoryMockEventBus(info);

		await bus.publish(event1);
		await bus.publish(event2, event4);

		expect(() => bus.assertPublishedEvents(event1, event2, event4)).not.toThrow();

		expect(() => bus.assertPublishedEvents(event2, event4)).toThrow();
	});
});
