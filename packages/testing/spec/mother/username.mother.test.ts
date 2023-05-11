import { describe, expect, test } from 'vitest';

import { UsernameMother } from '../../src';

describe('UsernameMother', () => {
	test('should works as expected', () => {
		const value = UsernameMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('string');
	});
});
