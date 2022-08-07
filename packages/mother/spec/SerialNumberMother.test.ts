import { describe, expect, test } from 'vitest';
import { SerialNumberMother } from '../src';

describe('SerialNumberMother', () => {
	test('should works as expected', async () => {
		const value = SerialNumberMother.random();
		expect(value).toBeDefined();
		expect(typeof value).toBe('string');
	});
});
