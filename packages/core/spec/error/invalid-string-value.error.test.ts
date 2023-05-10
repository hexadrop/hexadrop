import { WordMother } from '@hexadrop/mother';
import { describe, expect, test } from 'vitest';

import { InvalidStringValueErrorMother } from './mother/invalid-string-value.error.mother';

describe('InvalidStringValueError', () => {
	test('should create from value', () => {
		const value = WordMother.random();
		const expectedError = InvalidStringValueErrorMother.create(value);
		expect(expectedError.message).toBe(`StringValueObject can not contains '${value}' value`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidStringValueError');
		expect(expectedError.stack).toBeDefined();
	});
	test('should create from value and property', () => {
		const value = WordMother.random();
		const property = WordMother.random();
		const expectedError = InvalidStringValueErrorMother.create(value, property);
		expect(expectedError.message).toBe(`${property} can not contains '${value}' value`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidStringValueError');
		expect(expectedError.stack).toBeDefined();
	});
});
