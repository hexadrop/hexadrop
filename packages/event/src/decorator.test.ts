import '@abraham/reflection';

import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import { describe, expect, jest, test } from 'bun:test';

import type { EventHandler } from './bus';
import EventHandlerDecorator from './decorator';
import type { DomainEventParams } from './domain-event';
import DomainEvent from './domain-event';

const handler1Spy = jest.fn((_: DomainEvent) => Either.left<void, DomainError>(undefined));

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

describe('@EventHandler()', () => {
	test('should decorate a event handler', () => {
		const target = EventHandlerDecorator(Event1)(Event1Handler);
		expect(target).toBe(Event1Handler);
		const handler = Reflect.getMetadata('event-handler', Event1);
		expect(handler).toStrictEqual([Event1Handler]);
	});
});
