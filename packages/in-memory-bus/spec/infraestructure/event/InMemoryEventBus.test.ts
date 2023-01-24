import { DomainError, DomainEvent, DomainEventClass, Either, EventHandler } from '@hexadrop/core';
import { describe, expect, test, vi } from 'vitest';

import { EventHandlersInformation, InMemoryEventBus } from '../../../src';

class HandlerError extends DomainError {
	constructor() {
		super('Handler3Error', 'msg mondongo', 'HEX(123)');
	}
}

const handler1Spy = vi.fn<[object], Either<void, DomainError>>(() => Either.left(undefined));
const handler2Spy = vi.fn<[object], Either<void, DomainError>>(() => Either.left(undefined));
const handler3Spy = vi.fn<[object], Either<void, DomainError>>(() => Either.left(undefined));
const handler4Spy = vi.fn<[object], Promise<Either<void, DomainError>>>(() =>
	Promise.resolve(Either.left(undefined))
);
const handler5Spy = vi.fn<[object], Either<void, DomainError>>(() =>
	Either.right(new HandlerError())
);
const handler6Spy = vi.fn<[object], Promise<Either<void, DomainError>>>(() =>
	Promise.resolve(Either.right(new HandlerError()))
);

const callback1Spy = vi.fn<[object], Either<void, DomainError>>(() => Either.left(undefined));
const callback2Spy = vi.fn<[object], Promise<Either<void, DomainError>>>(() =>
	Promise.resolve(Either.left(undefined))
);
const callback7Spy = vi.fn<[object], Either<void, DomainError>>(() =>
	Either.right(new HandlerError())
);
const callback8Spy = vi.fn<[object], Promise<Either<void, DomainError>>>(() =>
	Promise.resolve(Either.right(new HandlerError()))
);

function callback1(event: object) {
	return callback1Spy(event);
}

async function callback2(event: object) {
	return callback2Spy(event);
}

function callback7(event: object) {
	return callback7Spy(event);
}

async function callback8(event: object) {
	return callback8Spy(event);
}

interface Event1DTO {
	id: string;
}

class Event1 extends DomainEvent<Event1DTO> {
	static readonly EVENT_NAME = 'Event1';

	constructor(eventId?: string, occurredOn?: Date, relatedId?: string) {
		super(Event1.EVENT_NAME, '1', eventId, occurredOn, relatedId);
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
	handle(event: Event1DTO) {
		return handler1Spy(event);
	}

	subscribedTo(): DomainEventClass<Event1, Event1DTO> {
		return Event1;
	}
}

class Event3Handler implements EventHandler<Event1, Event1DTO> {
	handle(event: Event1DTO): Either<void, DomainError> {
		return handler3Spy(event);
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

class Event2Handler implements EventHandler<Event2, Event2DTO> {
	handle(event: Event2DTO): Either<void, DomainError> {
		return handler2Spy(event);
	}

	subscribedTo(): DomainEventClass<Event2> {
		return Event2;
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

interface Event5DTO {
	id: string;
}

class Event5 extends DomainEvent<Event5DTO> {
	static readonly EVENT_NAME = 'Event5';

	constructor() {
		super(Event5.EVENT_NAME, 'id');
	}

	static fromPrimitives() {
		return new Event5();
	}

	toPrimitive(): Event5DTO {
		return {
			id: this.aggregateId,
		};
	}
}

class Event5Handler implements EventHandler<Event5, Event5DTO> {
	handle(event: Event5DTO): Either<void, DomainError> {
		return handler5Spy(event);
	}

	subscribedTo(): DomainEventClass<Event5> {
		return Event5;
	}
}

interface Event6DTO {
	id: string;
}

class Event6 extends DomainEvent<Event6DTO> {
	static readonly EVENT_NAME = 'Event6';

	constructor() {
		super(Event6.EVENT_NAME, 'id');
	}

	static fromPrimitives() {
		return new Event6();
	}

	toPrimitive(): Event6DTO {
		return {
			id: this.aggregateId,
		};
	}
}

class Event6Handler implements EventHandler<Event6, Event6DTO> {
	async handle(event: Event6DTO): Promise<Either<void, DomainError>> {
		return handler6Spy(event);
	}

	subscribedTo(): DomainEventClass<Event6> {
		return Event6;
	}
}

interface Event7DTO {
	id: string;
}

class Event7 extends DomainEvent<Event7DTO> {
	static readonly EVENT_NAME = 'Event7';

	constructor() {
		super(Event7.EVENT_NAME, 'id');
	}

	static fromPrimitives() {
		return new Event7();
	}

	toPrimitive(): Event7DTO {
		return {
			id: this.aggregateId,
		};
	}
}

interface Event8DTO {
	id: string;
}

class Event8 extends DomainEvent<Event8DTO> {
	static readonly EVENT_NAME = 'Event8';

	constructor() {
		super(Event8.EVENT_NAME, 'id');
	}

	static fromPrimitives() {
		return new Event8();
	}

	toPrimitive(): Event8DTO {
		return {
			id: this.aggregateId,
		};
	}
}

describe('InMemoryEventBus', () => {
	test('should works as expected', async () => {
		const event1 = new Event1();
		const dto: Event1DTO = { id: '1' };
		const event2 = new Event2();
		const event4 = new Event4();
		const event5 = new Event5();
		const event6 = new Event6();
		const event7 = new Event7();
		const event8 = new Event8();
		const handler1 = new Event1Handler();
		const handler2 = new Event2Handler();
		const handler3 = new Event3Handler();
		const handler4 = new Event4Handler();
		const handler5 = new Event5Handler();
		const handler6 = new Event6Handler();
		const info = new EventHandlersInformation(handler4, handler5, handler6);
		const bus = new InMemoryEventBus(info);

		await bus.subscribe(handler1);
		await bus.subscribe(Event1, callback1);

		await bus.publish(event1, event2);

		expect(handler1Spy).toHaveBeenCalledWith(dto);
		expect(handler2Spy).toHaveBeenCalledTimes(0);
		expect(handler3Spy).toHaveBeenCalledTimes(0);
		expect(handler4Spy).toHaveBeenCalledTimes(0);

		expect(callback1Spy).toHaveBeenCalledWith(dto);
		expect(callback2Spy).toHaveBeenCalledTimes(0);
		expect(callback7Spy).toHaveBeenCalledTimes(0);
		expect(callback8Spy).toHaveBeenCalledTimes(0);

		await bus.unsubscribe(handler1);
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

		await bus.subscribe(handler1);
		await bus.subscribe(handler2);
		await bus.subscribe(handler3);

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

		const rejection5 = expect(() => bus.publish(event5)).rejects;
		await rejection5.toThrow(HandlerError);

		const rejection6 = expect(() => bus.publish(event6)).rejects;
		await rejection6.toThrow(HandlerError);

		const rejection7 = expect(() => bus.publish(event7)).rejects;
		await rejection7.toThrow(HandlerError);

		const rejection8 = expect(() => bus.publish(event8)).rejects;
		await rejection8.toThrow(HandlerError);
	});
});
