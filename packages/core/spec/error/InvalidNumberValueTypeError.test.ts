import { WordMother } from '@hexadrop/mother';
import { describe, expect, test } from 'vitest';

import { InvalidNumberValueTypeErrorMother } from './mother/InvalidNumberValueTypeErrorMother';

describe('InvalidNumberValueTypeError', () => {
	test('should create', () => {
		const expectedError = InvalidNumberValueTypeErrorMother.create();
		expect(expectedError.message).toBe(`NumberValueObject must only contains number values`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidNumberValueTypeError');
		expect(expectedError.stack).toBeDefined();
	});
	test('should create from property', () => {
		const property = WordMother.random();
		const expectedError = InvalidNumberValueTypeErrorMother.create(property);
		expect(expectedError.message).toBe(`${property} must only contains number values`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidNumberValueTypeError');
		expect(expectedError.stack).toBeDefined();
	});
});
