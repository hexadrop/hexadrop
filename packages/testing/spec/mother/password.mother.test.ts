import { PasswordMother } from '@hexadrop/testing';
import { describe, expect, test } from 'vitest';

describe('PasswordMother', () => {
	test('should works as expected', () => {
		const value = PasswordMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('string');
	});
});
