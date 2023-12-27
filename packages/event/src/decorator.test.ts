import '@abraham/reflection';
import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';

import { describe, expect, jest, test } from 'bun:test';
import type { EventHandler } from './bus';

import EventHandlerDecorator from './decorator';
import DomainEvent, { type DomainEventParams } from './domain-event';

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
		EventHandlerDecorator(Event1)(Event1Handler);
		const meta = Reflect.getMetadata('event-handler', Event1Handler);
		expect(meta).toBe(true);

		const handler = Reflect.getMetadata('event-handlers', Event1);
		expect(handler).toStrictEqual([Event1Handler]);
	});
});
