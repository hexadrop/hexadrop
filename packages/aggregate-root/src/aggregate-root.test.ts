import { describe, expect, test } from 'bun:test';
import type { DomainEventParams } from '@hexadrop/event';
import DomainEvent from '@hexadrop/event';
import type { Primitives } from '@hexadrop/types/primitives';

import AggregateRoot from './aggregate-root';

class MockEvent extends DomainEvent {
	static override EVENT_NAME = 'event';
	readonly foo: string;

	constructor({ foo, ...params }: DomainEventParams<MockEvent>) {
		super(MockEvent.EVENT_NAME, params);
		this.foo = foo;
	}
}

class MockAggregateRoot extends AggregateRoot {
	readonly value: string;
	constructor(primitives: Primitives<MockAggregateRoot>) {
		super();
		this.value = primitives.value;
	}

	override toPrimitives(): Primitives<MockAggregateRoot> {
		return {
			value: this.value,
		};
	}
}

describe('AggregateRoot', () => {
	test('should record and pullDomainEvents works as expected', () => {
		const event1 = new MockEvent({ aggregateId: '1', foo: 'afa' });
		const event2 = new MockEvent({ aggregateId: '1', foo: 'afa2' });
		const event3 = new MockEvent({ aggregateId: '1', foo: 'afa3' });
		const entity = new MockAggregateRoot({ value: 'value' });

		entity.record(event1, event2);

		const pulled = entity.pullDomainEvents();

		expect(pulled).toStrictEqual([event1, event2]);

		const pulled2 = entity.pullDomainEvents();

		expect(pulled2).toStrictEqual([]);

		entity.record(event3);

		const pulled3 = entity.pullDomainEvents();

		expect(pulled3).toStrictEqual([event3]);
	});
});
