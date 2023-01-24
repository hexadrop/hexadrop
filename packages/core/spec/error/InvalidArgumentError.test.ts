import { WordMother } from '@hexadrop/mother';
import { describe, expect, test } from 'vitest';

import { InvalidArgumentErrorMother } from './mother/InvalidArgumentErrorMother';

describe('InvalidArgumentError', () => {
	test('should create from message', () => {
		const message = WordMother.random();
		const expectedError = InvalidArgumentErrorMother.create(message);
		expect(expectedError.message).toBe(message);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidArgumentError');
		expect(expectedError.stack).toBeDefined();
	});
	test('should create from message and name', () => {
		const message = WordMother.random();
		const name = WordMother.random();
		const expectedError = InvalidArgumentErrorMother.create(message, name);
		expect(expectedError.message).toBe(message);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe(name);
		expect(expectedError.stack).toBeDefined();
	});
	test('should create from message, name and code', () => {
		const message = WordMother.random();
		const name = WordMother.random();
		const code = 'TTT(123)';
		const expectedError = InvalidArgumentErrorMother.create(message, name, code);
		expect(expectedError.message).toBe(message);
		expect(expectedError.errorCode).toBe(123);
		expect(expectedError.code).toBe('TTT(123)');
		expect(expectedError.name).toBe(name);
		expect(expectedError.stack).toBeDefined();
	});
});
