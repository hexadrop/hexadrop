import { UrlMother } from '@hexadrop/testing';
import { describe, expect, test } from 'vitest';

describe('URLMother', () => {
	test('should works as expected', () => {
		const value = UrlMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('string');
	});
});
