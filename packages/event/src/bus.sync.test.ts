import { describe, expect, jest, test } from 'bun:test';
import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';

import type { EventBusCallback, EventHandler } from './bus';
import EventBusHandlers from './bus.handlers';
import SyncEventBus from './bus.sync';
import type { DomainEventParams } from './domain-event';
import DomainEvent from './domain-event';

class HandlerError extends DomainError {
	constructor() {
		super('Handler3Error', 'msg mondongo', 'HEX(123)');
	}
}

const handler1Spy = jest.fn((_: DomainEvent) => Either.left<void, DomainError>(undefined));
const handler2Spy = jest.fn((_: DomainEvent) => Either.left<void, DomainError>(undefined));
const handler3Spy = jest.fn((_: DomainEvent) => Either.left<void, DomainError>(undefined));
const handler4Spy = jest.fn((_: DomainEvent) => Promise.resolve(Either.left<void, DomainError>(undefined)));
const handler5Spy = jest.fn((_: DomainEvent) => Either.right<void, DomainError>(new HandlerError()));
const handler6Spy = jest.fn((_: DomainEvent) => Promise.resolve(Either.right<void, DomainError>(new HandlerError())));

const callback1Spy = jest.fn((_: DomainEvent) => Either.left<void, DomainError>(undefined));
const callback2Spy = jest.fn((_: DomainEvent) => Promise.resolve(Either.left<void, DomainError>(undefined)));
const callback7Spy = jest.fn((_: DomainEvent) => Either.right<void, DomainError>(new HandlerError()));
const callback8Spy = jest.fn((_: DomainEvent) => Promise.resolve(Either.right<void, DomainError>(new HandlerError())));

function callback1(event: DomainEvent) {
	return callback1Spy(event);
}

async function callback2(event: DomainEvent) {
	return callback2Spy(event);
}

function callback7(event: DomainEvent) {
	return callback7Spy(event);
}

async function callback8(event: DomainEvent) {
	return callback8Spy(event);
}

class Event1 extends DomainEvent {
	static override EVENT_NAME = 'Event1';

	constructor({ eventId, occurredOn, relatedId, aggregateId }: DomainEventParams<Event1>) {
		super(Event1.EVENT_NAME, { eventId, aggregateId, occurredOn, relatedId });
	}
}

class Event1Handler implements EventHandler<Event1> {
	run(event: Event1) {
		return handler1Spy(event);
	}
}

class Event3Handler implements EventHandler<Event1> {
	run(event: Event1): Either<void, DomainError> {
		return handler3Spy(event);
	}
}

class Event2 extends DomainEvent {
	static override EVENT_NAME = 'Event2';

	constructor({ eventId, occurredOn, relatedId, aggregateId }: DomainEventParams<Event2>) {
		super(Event2.EVENT_NAME, { eventId, aggregateId, occurredOn, relatedId });
	}
}

class Event2Handler implements EventHandler<Event2> {
	run(event: Event2): Either<void, DomainError> {
		return handler2Spy(event);
	}
}

class Event4 extends DomainEvent {
	static override EVENT_NAME = 'Event4';

	constructor({ eventId, occurredOn, relatedId, aggregateId }: DomainEventParams<Event4>) {
		super(Event4.EVENT_NAME, { eventId, aggregateId, occurredOn, relatedId });
	}
}

class Event4Handler implements EventHandler<Event4> {
	async run(event: Event4): Promise<Either<void, DomainError>> {
		return handler4Spy(event);
	}
}

class Event5 extends DomainEvent {
	static override EVENT_NAME = 'Event5';

	constructor({ eventId, occurredOn, relatedId, aggregateId }: DomainEventParams<Event5>) {
		super(Event5.EVENT_NAME, { eventId, aggregateId, occurredOn, relatedId });
	}
}

class Event5Handler implements EventHandler<Event5> {
	run(event: Event5): Either<void, DomainError> {
		return handler5Spy(event);
	}
}

class Event6 extends DomainEvent {
	static override EVENT_NAME = 'Event6';

	constructor({ eventId, occurredOn, relatedId, aggregateId }: DomainEventParams<Event6>) {
		super(Event6.EVENT_NAME, { eventId, aggregateId, occurredOn, relatedId });
	}
}

class Event6Handler implements EventHandler<Event6> {
	async run(event: Event6): Promise<Either<void, DomainError>> {
		return handler6Spy(event);
	}
}

class Event7 extends DomainEvent {
	static override EVENT_NAME = 'Event7';

	constructor({ eventId, occurredOn, relatedId, aggregateId }: DomainEventParams<Event6>) {
		super(Event7.EVENT_NAME, { eventId, aggregateId, occurredOn, relatedId });
	}
}

class Event8 extends DomainEvent {
	static override EVENT_NAME = 'Event8';

	constructor({ eventId, occurredOn, relatedId, aggregateId }: DomainEventParams<Event8>) {
		super(Event8.EVENT_NAME, { eventId, aggregateId, occurredOn, relatedId });
	}
}

describe('InMemoryEventBus', () => {
	test('should works as expected', async () => {
		const event1 = new Event1({ eventId: '1', aggregateId: '1' });
		const event2 = new Event2({ eventId: '2', aggregateId: '2' });
		const event4 = new Event4({ eventId: '4', aggregateId: '4' });
		const event5 = new Event5({ eventId: '5', aggregateId: '5' });
		const event6 = new Event6({ eventId: '6', aggregateId: '6' });
		const event7 = new Event7({ eventId: '7', aggregateId: '7' });
		const event8 = new Event8({ eventId: '8', aggregateId: '8' });
		const handler1 = new Event1Handler();
		const handler2 = new Event2Handler();
		const handler3 = new Event3Handler();
		const handler4 = new Event4Handler();
		const handler5 = new Event5Handler();
		const handler6 = new Event6Handler();
		const map = new Map<string, EventBusCallback[]>();
		map.set(Event4.EVENT_NAME, [handler4.run.bind(handler4)]);
		map.set(Event5.EVENT_NAME, [handler5.run.bind(handler5)]);
		map.set(Event6.EVENT_NAME, [handler6.run.bind(handler6)]);
		const info = new EventBusHandlers(map);
		const bus = new SyncEventBus(info);

		await bus.subscribe(Event1, handler1);
		await bus.subscribe(Event1, callback1);

		await bus.publish(event1, event2);

		expect(handler1Spy.mock.calls[0]).toStrictEqual([event1]);
		expect(handler2Spy).toHaveBeenCalledTimes(0);
		expect(handler3Spy).toHaveBeenCalledTimes(0);
		expect(handler4Spy).toHaveBeenCalledTimes(0);

		expect(callback1Spy.mock.calls[0]).toStrictEqual([event1]);
		expect(callback2Spy).toHaveBeenCalledTimes(0);
		expect(callback7Spy).toHaveBeenCalledTimes(0);
		expect(callback8Spy).toHaveBeenCalledTimes(0);

		await bus.unsubscribe(Event1, handler1);
		await bus.unsubscribe(Event1, callback1);

		await bus.publish(event1, event2);

		expect(handler1Spy).toHaveBeenCalledTimes(1);
		expect(handler2Spy).toHaveBeenCalledTimes(0);
		expect(handler3Spy).toHaveBeenCalledTimes(0);
		expect(handler4Spy).toHaveBeenCalledTimes(0);

		expect(callback1Spy).toHaveBeenCalledTimes(1);
		expect(callback2Spy).toHaveBeenCalledTimes(0);
		expect(callback7Spy).toHaveBeenCalledTimes(0);
		expect(callback8Spy).toHaveBeenCalledTimes(0);

		await bus.subscribe(Event1, handler1);
		await bus.subscribe(Event2, handler2);
		await bus.subscribe(Event1, handler3);

		await bus.subscribe(Event1, callback1);
		await bus.subscribe(Event2, callback2);
		await bus.subscribe(Event7, callback7);
		await bus.subscribe(Event8, callback8);

		await bus.publish(event1, event2, event4);

		expect(handler1Spy).toHaveBeenCalledTimes(2);
		expect(handler2Spy).toHaveBeenCalledTimes(1);
		expect(handler3Spy).toHaveBeenCalledTimes(1);
		expect(handler4Spy).toHaveBeenCalledTimes(1);

		expect(callback1Spy).toHaveBeenCalledTimes(2);
		expect(callback2Spy).toHaveBeenCalledTimes(1);
		expect(callback7Spy).toHaveBeenCalledTimes(0);
		expect(callback8Spy).toHaveBeenCalledTimes(0);

		expect(async () => await bus.publish(event5)).toThrow(new HandlerError());
		expect(async () => await bus.publish(event6)).toThrow(new HandlerError());
		expect(async () => await bus.publish(event7)).toThrow(new HandlerError());
		expect(async () => await bus.publish(event8)).toThrow(new HandlerError());
	});
});
