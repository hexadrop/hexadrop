import { describe, expect, test } from 'bun:test';

import DomainEvent from './domain-event';

class MockEvent extends DomainEvent {
	static override EVENT_NAME = 'event';

	constructor(
		readonly foo: string,
		aggregateId: string,
		eventId?: string,
		occurredOn?: Date,
		relatedId?: string,
	) {
		super(MockEvent.EVENT_NAME, {
			aggregateId,
			eventId,
			occurredOn,
			relatedId,
		});
	}
}

describe('DomainEvent', () => {
	describe('constructor()', () => {
		test('should instantiate with event id', () => {
			const query = new MockEvent('foo', 'id', 'eventId');
			expect(query.eventName).toBe('event');
			expect(query.eventId).toBe('eventId');
			expect(query.occurredOn).toBeDefined();
			expect(query.aggregateId).toBe('id');
			expect(query.relatedId).toBeUndefined();
			expect(query.foo).toBe('foo');
		});
		test('should instantiate with occurredOn', () => {
			const d = new Date();
			const query = new MockEvent('foo', 'id', 'eventId', d);
			expect(query.eventName).toBe('event');
			expect(query.eventId).toBe('eventId');
			expect(query.occurredOn).toBe(d);
			expect(query.aggregateId).toBe('id');
			expect(query.relatedId).toBeUndefined();
			expect(query.foo).toBe('foo');
		});
		test('should instantiate with relatedId', () => {
			const query = new MockEvent('foo', 'id', 'eventId', undefined, 'relatedId');
			expect(query.eventName).toBe('event');
			expect(query.eventId).toBe('eventId');
			expect(query.occurredOn).toBeDefined();
			expect(query.aggregateId).toBe('id');
			expect(query.relatedId).toBe('relatedId');
			expect(query.foo).toBe('foo');
		});
	});
});
