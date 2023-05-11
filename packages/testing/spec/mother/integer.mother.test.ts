import { IntegerMother } from '@hexadrop/testing';
import { describe, expect, test } from 'vitest';

describe('IntegerMother', () => {
	test('should works as expected', () => {
		const value = IntegerMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('number');
	});
});
