import { describe, expect, test } from 'vitest';

import { UrlMother } from '../../src';

describe('URLMother', () => {
	test('should works as expected', () => {
		const value = UrlMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('string');
	});
});
