import { describe, expect, test } from 'vitest';

import { UuidMother } from '../src';

describe('UuidMother', () => {
	test('should works as expected', () => {
		const value = UuidMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('string');
	});
});
