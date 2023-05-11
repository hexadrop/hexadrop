import { UsernameMother } from '@hexadrop/testing';
import { describe, expect, test } from 'vitest';

describe('UsernameMother', () => {
	test('should works as expected', () => {
		const value = UsernameMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('string');
	});
});
