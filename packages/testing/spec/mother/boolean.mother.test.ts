import { BooleanMother } from '@hexadrop/testing';
import { describe, expect, test } from 'vitest';

describe('BooleanMother', () => {
	test('should works as expected', () => {
		const value = BooleanMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('boolean');
	});
});
