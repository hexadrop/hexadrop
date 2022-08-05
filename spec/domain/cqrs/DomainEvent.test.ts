import { describe, expect, test } from 'vitest';
import { DomainEvent, VoidDomainEvent } from '../../../src';

class ExtendsVoidDomainEvent extends VoidDomainEvent {
	constructor() {
		super();
	}
}

interface MockEventDTO {
	id: string;
}

class MockEvent extends DomainEvent<MockEventDTO> {
	static EVENT_NAME = 'event';

	constructor(aggregateId: string, eventId?: string, occurredOn?: Date, relatedId?: string) {
		super(MockEvent.EVENT_NAME, aggregateId, eventId, occurredOn, relatedId);
	}

	static fromPrimitives(dto: MockEventDTO) {
		return new MockEvent(dto.id);
	}

	toPrimitive(): MockEventDTO {
		return {
			id: this.aggregateId,
		};
	}
}

describe('VoidDomainEvent', () => {
	test('should exports VoidDomainEvent', () => {
		expect(VoidDomainEvent).toBeDefined();
		expect(VoidDomainEvent.EVENT_NAME).toBe('void');
	});
	test('should VoidDomainEvent can not be instantiate', () => {
		const fn = () => new ExtendsVoidDomainEvent();
		expect(fn).toThrow('Invalid event');
	});
});

describe('DomainEvent', () => {
	test('should instantiate', () => {
		const query = new MockEvent('id');
		expect(query.eventName).toBe('event');
		expect(query.eventId).toBeDefined();
		expect(query.occurredOn).toBeDefined();
		expect(query.aggregateId).toBe('id');
		expect(query.relatedId).toBeUndefined();
	});
	test('should instantiate with event id', () => {
		const query = new MockEvent('id', 'eventId');
		expect(query.eventName).toBe('event');
		expect(query.eventId).toBe('eventId');
		expect(query.occurredOn).toBeDefined();
		expect(query.aggregateId).toBe('id');
		expect(query.relatedId).toBeUndefined();
	});
	test('should instantiate with occurredOn', () => {
		const d = new Date();
		const query = new MockEvent('id', undefined, d);
		expect(query.eventName).toBe('event');
		expect(query.eventId).toBeDefined();
		expect(query.occurredOn).toBe(d);
		expect(query.aggregateId).toBe('id');
		expect(query.relatedId).toBeUndefined();
	});
	test('should instantiate with relatedId', () => {
		const query = new MockEvent('id', undefined, undefined, 'relatedId');
		expect(query.eventName).toBe('event');
		expect(query.eventId).toBeDefined();
		expect(query.occurredOn).toBeDefined();
		expect(query.aggregateId).toBe('id');
		expect(query.relatedId).toBe('relatedId');
	});
});
