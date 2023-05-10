import type { DomainEventClass, EventHandler } from '@hexadrop/core';
import { DomainError, DomainEvent, Either } from '@hexadrop/core';
import { describe, expect, test, vi } from 'vitest';

import { EventHandlersInformation } from '../../../src';
import { InMemoryMockEventBus } from '../../../src/test';

const handler1Spy = vi.fn<[unknown], Either<void, DomainError>>(() => Either.left(undefined));
const handler4Spy = vi.fn<[unknown], Promise<Either<void, DomainError>>>(() =>
	Promise.resolve(Either.left(undefined))
);

interface Event1DTO {
	id: string;
}

class Event1 extends DomainEvent<Event1DTO> {
	static readonly EVENT_NAME = 'Event1';

	constructor(eventId?: string, occurredOn?: Date, relatedId?: string) {
		super(Event1.EVENT_NAME, 'id', eventId, occurredOn, relatedId);
	}

	static fromPrimitives() {
		return new Event1();
	}

	toPrimitive(): Event1DTO {
		return {
			id: this.aggregateId,
		};
	}
}

class Event1Handler implements EventHandler<Event1, Event1DTO> {
	handle(event: Event1DTO): Either<void, DomainError> {
		return handler1Spy(event);
	}

	subscribedTo(): DomainEventClass<Event1> {
		return Event1;
	}
}

interface Event2DTO {
	id: string;
}

class Event2 extends DomainEvent<Event2DTO> {
	static readonly EVENT_NAME = 'Event2';

	constructor() {
		super(Event2.EVENT_NAME, 'id');
	}

	static fromPrimitives() {
		return new Event2();
	}

	toPrimitive(): Event2DTO {
		return {
			id: this.aggregateId,
		};
	}
}

interface Event4DTO {
	id: string;
}

class Event4 extends DomainEvent<Event4DTO> {
	static readonly EVENT_NAME = 'Event4';

	constructor() {
		super(Event4.EVENT_NAME, 'id');
	}

	static fromPrimitives() {
		return new Event4();
	}

	toPrimitive(): Event4DTO {
		return {
			id: this.aggregateId,
		};
	}
}

class Event4Handler implements EventHandler<Event4, Event4DTO> {
	async handle(event: Event4DTO): Promise<Either<void, DomainError>> {
		return handler4Spy(event);
	}

	subscribedTo(): DomainEventClass<Event4> {
		return Event4;
	}
}

describe('InMemoryMockEventBus', () => {
	test('should assertIsSubscribed works as expected', async () => {
		const handler1 = new Event1Handler();
		const handler4 = new Event4Handler();
		const info = new EventHandlersInformation();
		const bus = new InMemoryMockEventBus(info);

		expect(() => bus.assertIsSubscribed(handler1)).toThrow();
		expect(() => bus.assertIsSubscribed(handler4)).toThrow();

		await bus.subscribe(handler1);

		expect(() => bus.assertIsSubscribed(handler1)).not.toThrow();
		expect(() => bus.assertIsSubscribed(handler4)).toThrow();

		await bus.subscribe(handler4);

		expect(() => bus.assertIsSubscribed(handler1)).not.toThrow();
		expect(() => bus.assertIsSubscribed(handler4)).not.toThrow();
	});
	test('should assertSubscriptionsLength works as expected', async () => {
		const handler1 = new Event1Handler();
		const handler4 = new Event4Handler();
		const info = new EventHandlersInformation();
		const bus = new InMemoryMockEventBus(info);

		expect(() => bus.assertSubscriptionsLength(1)).toThrow();

		await bus.subscribe(handler1);

		expect(() => bus.assertSubscriptionsLength(1)).not.toThrow();

		await bus.subscribe(handler4);

		expect(() => bus.assertSubscriptionsLength(1)).toThrow();
		expect(() => bus.assertSubscriptionsLength(2)).not.toThrow();
	});
	test('should assertIsUnsubscribed works as expected', async () => {
		const handler1 = new Event1Handler();
		const handler4 = new Event4Handler();
		const info = new EventHandlersInformation(handler1, handler4);
		const bus = new InMemoryMockEventBus(info);

		expect(() => bus.assertIsUnsubscribed(handler1)).toThrow();
		expect(() => bus.assertIsUnsubscribed(handler4)).toThrow();

		await bus.unsubscribe(handler1);

		expect(() => bus.assertIsUnsubscribed(handler1)).not.toThrow();
		expect(() => bus.assertIsUnsubscribed(handler4)).toThrow();

		await bus.unsubscribe(handler4);

		expect(() => bus.assertIsUnsubscribed(handler1)).not.toThrow();
		expect(() => bus.assertIsUnsubscribed(handler4)).not.toThrow();
	});
	test('should assertUnsubscriptionLength works as expected', async () => {
		const handler1 = new Event1Handler();
		const handler4 = new Event4Handler();
		const info = new EventHandlersInformation(handler1, handler4);
		const bus = new InMemoryMockEventBus(info);

		expect(() => bus.assertUnsubscriptionLength(1)).toThrow();

		await bus.unsubscribe(handler1);

		expect(() => bus.assertUnsubscriptionLength(1)).not.toThrow();

		await bus.unsubscribe(handler4);

		expect(() => bus.assertUnsubscriptionLength(1)).toThrow();
		expect(() => bus.assertUnsubscriptionLength(2)).not.toThrow();
	});
	test('should assertNotPublishEvent works as expected', async () => {
		const date = new Date();
		const handler1 = new Event1Handler();
		const event1 = new Event1('1', date);
		const info = new EventHandlersInformation(handler1);
		const bus = new InMemoryMockEventBus(info);

		expect(() => bus.assertNotPublishEvent()).not.toThrow();

		await bus.publish(event1);

		expect(() => bus.assertNotPublishEvent()).toThrow();
	});
	test('should assertLastPublishedEvents works as expected', async () => {
		const date = new Date();
		const event1 = new Event1('1', date);
		const event2 = new Event2();
		const event4 = new Event4();
		const event44 = new Event4();
		const info = new EventHandlersInformation();
		const bus = new InMemoryMockEventBus(info);

		await bus.publish(event1);
		await bus.publish(event2, event4);

		expect(() => bus.assertLastPublishedEvents(event1, event2, event44)).toThrow();

		expect(() => bus.assertLastPublishedEvents(event2, event44)).not.toThrow();
	});
	test('should assertPublishedEvents works as expected', async () => {
		const date = new Date();
		const event1 = new Event1('1', date);
		const event2 = new Event2();
		const event4 = new Event4();
		const info = new EventHandlersInformation();
		const bus = new InMemoryMockEventBus(info);

		await bus.publish(event1);
		await bus.publish(event2, event4);

		expect(() => bus.assertPublishedEvents(event1, event2, event4)).not.toThrow();

		expect(() => bus.assertPublishedEvents(event2, event4)).toThrow();
	});
});
