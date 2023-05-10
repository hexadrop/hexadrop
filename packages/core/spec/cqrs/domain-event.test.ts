import { describe, expect, test } from 'vitest';

import type { DomainEventParams } from '../../src';
import { DomainEvent } from '../../src';

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
		super(MockEvent.EVENT_NAME, aggregateId, eventId, occurredOn, relatedId);
		this.foo = foo;
	}
}

describe('DomainEvent', () => {
	test('should instantiate', () => {
		const query = new MockEvent({
			aggregateId: 'id',
			foo: 'foo',
		});
		expect(query.eventName).toBe('event');
		expect(query.eventId).toBeDefined();
		expect(query.occurredOn).toBeDefined();
		expect(query.aggregateId).toBe('id');
		expect(query.relatedId).toBeUndefined();
		expect(query.foo).toBe('foo');
	});
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
			occurredOn: d,
			aggregateId: 'id',
			foo: 'foo',
		});
		expect(query.eventName).toBe('event');
		expect(query.eventId).toBeDefined();
		expect(query.occurredOn).toBe(d);
		expect(query.aggregateId).toBe('id');
		expect(query.relatedId).toBeUndefined();
		expect(query.foo).toBe('foo');
	});
	test('should instantiate with relatedId', () => {
		const query = new MockEvent({
			relatedId: 'relatedId',
			aggregateId: 'id',
			foo: 'foo',
		});
		expect(query.eventName).toBe('event');
		expect(query.eventId).toBeDefined();
		expect(query.occurredOn).toBeDefined();
		expect(query.aggregateId).toBe('id');
		expect(query.relatedId).toBe('relatedId');
		expect(query.foo).toBe('foo');
	});
});
