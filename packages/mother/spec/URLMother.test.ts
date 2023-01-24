import { describe, expect, test } from 'vitest';

import { URLMother } from '../src';

describe('URLMother', () => {
	test('should works as expected', () => {
		const value = URLMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('string');
	});
});
