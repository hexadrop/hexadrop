import { describe, expect, test } from 'vitest';

import { IntegerMother } from '../src';

describe('IntegerMother', () => {
	test('should works as expected', () => {
		const value = IntegerMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('number');
	});
});
