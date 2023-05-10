import { UuidMother } from '@hexadrop/testing';
import { describe, expect, test } from 'vitest';

describe('UuidMother', () => {
	test('should works as expected', () => {
		const value = UuidMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('string');
	});
});
