import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import { beforeEach, describe, expect, jest, test } from 'bun:test';

import type { EventHandler } from './bus';
import EventBus from './bus';
import SyncEventBus from './bus.sync';
import DomainEvent from './domain-event';
import { EventHandlerError } from './error';
import InMemoryEventHandlers from './in-memory.event-handlers';

class HandlerError extends DomainError {
	constructor() {
		super('Handler3Error', 'msg mondongo', 'HEX(123)');
	}
}

const event1Handler1Spy = jest.fn((_: DomainEvent) => Either.right<DomainError, void>(undefined));
const event1Handler2Spy = jest.fn((_: DomainEvent) => Either.right<DomainError, void>(undefined));
const event1Handler3Spy = jest.fn((_: DomainEvent) => Either.left<DomainError, void>(new HandlerError()));
const event1Handler4Spy = jest.fn((_: DomainEvent) => {
	throw new HandlerError();
});

class Event1 extends DomainEvent {
	static override EVENT_NAME = 'Event1';

	constructor(aggregateId: string) {
		super(Event1.EVENT_NAME, aggregateId);
	}
}

class Event1Handler implements EventHandler<Event1> {
	run(event: Event1) {
		return event1Handler1Spy(event);
	}
}

describe('SyncEventBus', () => {
	let bus: EventBus;
	beforeEach(() => {
		event1Handler1Spy.mockClear();
		event1Handler2Spy.mockClear();
		event1Handler3Spy.mockClear();
	});
	describe('publish()', () => {
		test('should works with simple registered event handler', async () => {
			const info = new InMemoryEventHandlers();
			info.register(Event1, new Event1Handler());
			bus = new SyncEventBus(info);

			const either = await bus.publish(new Event1('1'));

			expect(event1Handler1Spy).toHaveBeenCalledTimes(1);
			expect(either.isRight()).toBe(true);
		});
		test('should works with simple registered callbacks', async () => {
			const info = new InMemoryEventHandlers();
			info.register(Event1, event1Handler2Spy);
			bus = new SyncEventBus(info);

			const either = await bus.publish(new Event1('1'));

			expect(event1Handler2Spy).toHaveBeenCalledTimes(1);
			expect(either.isRight()).toBe(true);
		});
		test('should works with multiple registered callbacks', async () => {
			const info = new InMemoryEventHandlers();
			info.register(Event1, new Event1Handler());
			info.register(Event1, event1Handler2Spy);
			bus = new SyncEventBus(info);

			const either = await bus.publish(new Event1('1'));

			expect(event1Handler1Spy).toHaveBeenCalledTimes(1);
			expect(event1Handler2Spy).toHaveBeenCalledTimes(1);
			expect(either.isRight()).toBe(true);
		});
		test('should works with handler with errors', async () => {
			const info = new InMemoryEventHandlers();
			info.register(Event1, event1Handler3Spy);
			bus = new SyncEventBus(info);

			const either = await bus.publish(new Event1('1'));

			expect(event1Handler3Spy).toHaveBeenCalledTimes(1);
			expect(either.isLeft()).toBe(true);
			expect(either.getLeft()).toStrictEqual(new HandlerError());
		});
		test('should works with multiple registered callbacks with some errors', async () => {
			const info = new InMemoryEventHandlers();
			info.register(Event1, event1Handler2Spy);
			info.register(Event1, event1Handler3Spy);
			bus = new SyncEventBus(info);

			const either = await bus.publish(new Event1('1'));

			expect(event1Handler2Spy).toHaveBeenCalledTimes(1);
			expect(event1Handler3Spy).toHaveBeenCalledTimes(1);
			expect(either.isLeft()).toBe(true);
			expect(either.getLeft()).toStrictEqual(new HandlerError());
		});
		test('should works with un handle error', async () => {
			const info = new InMemoryEventHandlers();
			info.register(Event1, event1Handler4Spy);
			bus = new SyncEventBus(info);

			const either = await bus.publish(new Event1('1'));

			expect(event1Handler4Spy).toHaveBeenCalledTimes(1);
			expect(either.isLeft()).toBe(true);
			expect(either.getLeft()).toStrictEqual(new EventHandlerError('msg mondongo'));
		});
	});
});
