import { WordMother } from '@hexadrop/testing';
import { describe, expect, test } from 'vitest';

describe('WordMother', () => {
	test('should works as expected', () => {
		const value = WordMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('string');
	});
});
