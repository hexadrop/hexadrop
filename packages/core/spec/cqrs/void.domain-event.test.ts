import { describe, expect, test } from 'vitest';

import { VoidDomainEvent } from '../../src/cqrs/void.domain-event';

class ExtendsVoidDomainEvent extends VoidDomainEvent {
	constructor() {
		super();
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
