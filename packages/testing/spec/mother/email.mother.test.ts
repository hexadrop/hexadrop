import { EmailMother } from '@hexadrop/testing';
import { describe, expect, test } from 'vitest';

describe('EmailMother', () => {
	test('should works as expected', () => {
		const value = EmailMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('string');
	});
});
