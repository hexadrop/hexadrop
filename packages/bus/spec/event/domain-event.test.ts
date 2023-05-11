import type { DomainEventParams } from '@hexadrop/bus';
import { DomainEvent } from '@hexadrop/bus';
import { describe, expect, test } from 'vitest';

class MockEvent extends DomainEvent {
	static override EVENT_NAME = 'event';
	readonly foo: string;

	constructor({
		aggregateId,
		eventId,
		occurredOn,
		relatedId,
		foo,
	}: DomainEventParams<MockEvent>) {
		super(MockEvent.EVENT_NAME, eventId, aggregateId, occurredOn, relatedId);
		this.foo = foo;
	}
}

describe('DomainEvent', () => {
	test('should instantiate with event id', () => {
		const query = new MockEvent({
			eventId: 'eventId',
			aggregateId: 'id',
			foo: 'foo',
		});
		expect(query.eventName).toBe('event');
		expect(query.eventId).toBe('eventId');
		expect(query.occurredOn).toBeDefined();
		expect(query.aggregateId).toBe('id');
		expect(query.relatedId).toBeUndefined();
		expect(query.foo).toBe('foo');
	});
	test('should instantiate with occurredOn', () => {
		const d = new Date();
		const query = new MockEvent({
			eventId: 'eventId',
			occurredOn: d,
			aggregateId: 'id',
			foo: 'foo',
		});
		expect(query.eventName).toBe('event');
		expect(query.eventId).toBe('eventId');
		expect(query.occurredOn).toBe(d);
		expect(query.aggregateId).toBe('id');
		expect(query.relatedId).toBeUndefined();
		expect(query.foo).toBe('foo');
	});
	test('should instantiate with relatedId', () => {
		const query = new MockEvent({
			eventId: 'eventId',
			relatedId: 'relatedId',
			aggregateId: 'id',
			foo: 'foo',
		});
		expect(query.eventName).toBe('event');
		expect(query.eventId).toBe('eventId');
		expect(query.occurredOn).toBeDefined();
		expect(query.aggregateId).toBe('id');
		expect(query.relatedId).toBe('relatedId');
		expect(query.foo).toBe('foo');
	});
});
