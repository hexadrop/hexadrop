import { DomainError, DomainEvent, DomainEventClass, Either, EventHandler } from '@hexadrop/core';
import { describe, expect, test, vi } from 'vitest';
import { EventHandlersInformation, InMemoryEventBus } from '../../../src';

class HandlerError extends DomainError {
	constructor() {
		super('Handler3Error', 'msg', 'HEX(123)');
	}
}

const handler1Spy = vi.fn<[unknown], Either<void, DomainError>>(() => Either.left(undefined));
const handler2Spy = vi.fn<[unknown], Either<void, DomainError>>(() => Either.left(undefined));
const handler3Spy = vi.fn<[unknown], Either<void, DomainError>>(() => Either.left(undefined));
const handler4Spy = vi.fn<[unknown], Promise<Either<void, DomainError>>>(() => Promise.resolve(Either.left(undefined)));
const handler5Spy = vi.fn<[unknown], Either<void, DomainError>>(() => Either.right(new HandlerError()));
const handler6Spy = vi.fn<[unknown], Promise<Either<void, DomainError>>>(() =>
	Promise.resolve(Either.right(new HandlerError()))
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
	handle(event: Event1): Either<void, DomainError> {
		return handler1Spy(event);
	}

	subscribedTo(): DomainEventClass<Event1> {
		return Event1;
	}
}

class Event3Handler implements EventHandler<Event1, Event1DTO> {
	handle(event: Event1): Either<void, DomainError> {
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
	handle(event: Event2): Either<void, DomainError> {
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
	handle(event: Event4): Promise<Either<void, DomainError>> {
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
	handle(event: Event5): Either<void, DomainError> {
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
	handle(event: Event6): Promise<Either<void, DomainError>> {
		return handler6Spy(event);
	}

	subscribedTo(): DomainEventClass<Event6> {
		return Event6;
	}
}

describe('InMemoryEventBus', () => {
	test('should works as expected', async () => {
		const date = new Date();
		const event1 = new Event1('1', date);
		const event2 = new Event2();
		const event4 = new Event4();
		const event5 = new Event5();
		const event6 = new Event6();
		const handler1 = new Event1Handler();
		const handler2 = new Event2Handler();
		const handler3 = new Event3Handler();
		const handler4 = new Event4Handler();
		const handler5 = new Event5Handler();
		const handler6 = new Event6Handler();
		const info = new EventHandlersInformation(handler4, handler5, handler6);
		const bus = new InMemoryEventBus(info);

		bus.subscribe(handler1);

		await bus.publish(event1, event2);

		expect(handler1Spy).toHaveBeenCalledWith(event1);
		expect(handler2Spy).toHaveBeenCalledTimes(0);
		expect(handler3Spy).toHaveBeenCalledTimes(0);
		expect(handler4Spy).toHaveBeenCalledTimes(0);

		bus.unsubscribe(handler1);

		await bus.publish(event1, event2);

		expect(handler1Spy).toHaveBeenCalledTimes(1);
		expect(handler2Spy).toHaveBeenCalledTimes(0);
		expect(handler3Spy).toHaveBeenCalledTimes(0);
		expect(handler4Spy).toHaveBeenCalledTimes(0);

		bus.subscribe(handler1);
		bus.subscribe(handler2);
		bus.subscribe(handler3);

		await bus.publish(event1, event2, event4);

		expect(handler1Spy).toHaveBeenCalledTimes(2);
		expect(handler2Spy).toHaveBeenCalledTimes(1);
		expect(handler3Spy).toHaveBeenCalledTimes(1);
		expect(handler4Spy).toHaveBeenCalledTimes(1);

		const rejection5 = await expect(() => bus.publish(event5)).rejects;
		rejection5.toThrow(HandlerError);

		const rejection6 = await expect(() => bus.publish(event6)).rejects;
		rejection6.toThrow(HandlerError);
	});
});
