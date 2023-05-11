import { AggregateRoot } from '@hexadrop/aggregate-root';
import { DomainEvent } from '@hexadrop/bus';
import type { Primitives } from '@hexadrop/types';
import { describe, expect, test } from 'vitest';

class MockEvent extends DomainEvent {
	constructor(id: string) {
		super('event', '1', id);
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
		const event1 = new MockEvent('afa');
		const event2 = new MockEvent('afa2');
		const event3 = new MockEvent('afa3');
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
