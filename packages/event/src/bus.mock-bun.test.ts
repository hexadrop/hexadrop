import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import { describe, expect, jest, test } from 'bun:test';

import type { EventHandler } from './bus';
import BunMockEventBus from './bus.mock-bun';
import type { DomainEventClass } from './domain-event';
import DomainEvent from './domain-event';

const handler1Spy = jest.fn((_event: DomainEvent) => Either.right<DomainError>());
const handler4Spy = jest.fn((_event: DomainEvent) => Promise.resolve(Either.right<DomainError>()));

class Event1 extends DomainEvent {
	static override EVENT_NAME = 'Event1';

	constructor(
		readonly foo: string,
		aggregateId: string,
		occurredOn?: Date,
		eventId?: string,
		relatedId?: string,
	) {
		super(Event1.EVENT_NAME, {
			aggregateId,
			eventId,
			occurredOn,
			relatedId,
		});
	}
}

class Event1Handler implements EventHandler<Event1> {
	run(event: Event1): Either<DomainError, void> {
		return handler1Spy(event);
	}
}

class Event2 extends DomainEvent {
	static override EVENT_NAME = 'Event2';

	constructor(
		readonly bar: string,
		aggregateId: string,
		occurredOn?: Date,
		eventId?: string,
		relatedId?: string,
	) {
		super(Event2.EVENT_NAME, {
			aggregateId,
			eventId,
			occurredOn,
			relatedId,
		});
	}
}

class Event4 extends DomainEvent {
	static override EVENT_NAME = 'Event4';

	constructor(
		readonly buzz: string,
		aggregateId: string,
		occurredOn?: Date,
		eventId?: string,
		relatedId?: string,
	) {
		super(Event4.EVENT_NAME, {
			aggregateId,
			eventId,
			occurredOn,
			relatedId,
		});
	}
}

class Event4Handler implements EventHandler<Event4> {
	async run(event: Event4): Promise<Either<DomainError, void>> {
		return handler4Spy(event);
	}

	subscribedTo(): DomainEventClass<Event4> {
		return Event4;
	}
}

describe('MockEventBus', () => {
	test('should assertIsSubscribed works as expected', async () => {
		const handler1 = new Event1Handler();
		const handler4 = new Event4Handler();
		const bus = new BunMockEventBus();

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
		const bus = new BunMockEventBus();

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
		const bus = new BunMockEventBus();

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
		const bus = new BunMockEventBus();

		expect(() => bus.assertUnsubscriptionLength(1)).toThrow();

		await bus.unsubscribe(Event1, handler1);

		expect(() => bus.assertUnsubscriptionLength(1)).not.toThrow();

		await bus.unsubscribe(Event4, handler4);

		expect(() => bus.assertUnsubscriptionLength(1)).toThrow();
		expect(() => bus.assertUnsubscriptionLength(2)).not.toThrow();
	});
	test('should assertNotPublishEvent works as expected', async () => {
		const date = new Date();
		const event1 = new Event1('foo', 'id', date, 'eventId');
		const bus = new BunMockEventBus();

		expect(() => bus.assertNotPublishEvent()).not.toThrow();

		await bus.publish(event1);

		expect(() => bus.assertNotPublishEvent()).toThrow();
	});
	test('should assertLastPublishedEvents works as expected', async () => {
		const date = new Date();
		const event1 = new Event1('foo', 'id', date, 'eventId');
		const event2 = new Event2('bar', 'id2', undefined, 'eventId');
		const event4 = new Event4('buzz', 'id3', undefined, 'eventId');
		const bus = new BunMockEventBus();

		await bus.publish(event1);
		await bus.publish(event2, event4);

		expect(() => bus.assertLastPublishedEvents(event1, event2, event4)).toThrow();

		expect(() => bus.assertLastPublishedEvents(event2, event4)).not.toThrow();
	});
	test('should assertPublishedEvents works as expected', async () => {
		const date = new Date();
		const event1 = new Event1('foo', 'id', date, 'eventId');
		const event2 = new Event2('bar', 'id2', undefined, 'eventId');
		const event4 = new Event4('buzz', 'id3', undefined, 'eventId');
		const event44 = new Event4('buzz', 'id3', undefined, 'eventId');
		const bus = new BunMockEventBus();

		await bus.publish(event1);
		await bus.publish(event2, event4);

		expect(() => bus.assertPublishedEvents(event1, event2, event44)).not.toThrow();

		expect(() => bus.assertPublishedEvents(event2, event44)).toThrow();
	});
});
