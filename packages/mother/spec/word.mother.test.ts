import { describe, expect, test } from 'vitest';

import { WordMother } from '../src';

describe('WordMother', () => {
	test('should works as expected', () => {
		const value = WordMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('string');
	});
});
