import { DateMother } from '@hexadrop/testing';
import { describe, expect, test } from 'vitest';

describe('DateMother', () => {
	test('should recent works as expected', () => {
		const value = DateMother.recent();
		expect(value).toBeDefined();
		expect(typeof value).toBe('object');
		expect(value).toBeInstanceOf(Date);
	});
	test('should soon works as expected', () => {
		const value = DateMother.soon();
		expect(value).toBeDefined();
		expect(typeof value).toBe('object');
		expect(value).toBeInstanceOf(Date);
	});
	test('should past works as expected', () => {
		const value = DateMother.past();
		expect(value).toBeDefined();
		expect(typeof value).toBe('object');
		expect(value).toBeInstanceOf(Date);
	});
	test('should future works as expected', () => {
		const value = DateMother.future();
		expect(value).toBeDefined();
		expect(typeof value).toBe('object');
		expect(value).toBeInstanceOf(Date);
	});
});
