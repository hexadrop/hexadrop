import { describe, expect, test } from 'vitest';

import { EmailMother } from '../src';

describe('EmailMother', () => {
	test('should works as expected', () => {
		const value = EmailMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('string');
	});
});
