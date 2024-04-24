import '@abraham/reflection';

import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import { describe, expect, jest, test } from 'bun:test';

import type { EventHandler } from './bus';
import Decorator from './decorator';
import DomainEvent from './domain-event';

const handler1Spy = jest.fn((_: DomainEvent) => Either.right<DomainError>());

class Event1 extends DomainEvent {
	static override EVENT_NAME = 'Event1';

	constructor(aggregateId: string) {
		super(Event1.EVENT_NAME, aggregateId);
	}
}

class Event1Handler implements EventHandler<Event1> {
	run(event: Event1) {
		return handler1Spy(event);
	}
}

class Event2Handler {
	booz(event: Event1): Either<DomainError, void> {
		return handler1Spy(event);
	}
}

describe('@EventHandler()', () => {
	test('should decorate a event handler', () => {
		const target = Decorator(Event1)(Event1Handler);
		expect(target).toBe(Event1Handler);
		const handler = Reflect.getMetadata('event-handler', Event1);
		expect(handler).toStrictEqual([Event1Handler]);
	});
	test('should throw an exception if command handler has `run()` method', () => {
		const expectedError = new Error('EventHandler must implements a `run()` method');
		expect(() => Decorator(Event1)(Event2Handler)).toThrow(expectedError);
	});
});
