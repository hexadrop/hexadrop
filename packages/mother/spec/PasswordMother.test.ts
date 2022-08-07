import { describe, expect, test } from 'vitest';
import { PasswordMother } from '../src';

describe('PasswordMother', () => {
	test('should works as expected', async () => {
		const value = PasswordMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('string');
	});
});
