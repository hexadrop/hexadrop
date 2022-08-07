import { describe, expect, test } from 'vitest';
import { AggregateRoot, DomainEvent } from '../src';

interface MockEventDTO {
	id: string;
}

class MockEvent extends DomainEvent<MockEventDTO> {
	constructor(private readonly id: string) {
		super('event', id);
	}

	toPrimitive(): MockEventDTO {
		return {
			id: this.id,
		};
	}
}

interface MockAggregateRootDTO {
	value: string;
}

class MockAggregateRoot extends AggregateRoot<MockAggregateRootDTO, MockEvent> {
	private constructor(private readonly value: string) {
		super();
	}

	static fromPrimitives({ value }: MockAggregateRootDTO): MockAggregateRoot {
		return new MockAggregateRoot(value);
	}

	toPrimitives(): MockAggregateRootDTO {
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
		const entity = MockAggregateRoot.fromPrimitives({ value: 'value' });

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
