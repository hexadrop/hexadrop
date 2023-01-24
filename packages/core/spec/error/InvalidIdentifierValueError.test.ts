import { WordMother } from '@hexadrop/mother';
import { describe, expect, test } from 'vitest';

import { InvalidIdentifierValueErrorMother } from './mother/InvalidIdentifierValueErrorMother';

describe('InvalidIdentifierValueError', () => {
	test('should create from value', () => {
		const value = WordMother.random();
		const expectedError = InvalidIdentifierValueErrorMother.create(value);
		expect(expectedError.message).toBe(
			`IdentifierValueObject can not contains '${value}' value`
		);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidIdentifierValueError');
		expect(expectedError.stack).toBeDefined();
	});
	test('should create from value and property', () => {
		const value = WordMother.random();
		const property = WordMother.random();
		const expectedError = InvalidIdentifierValueErrorMother.create(value, property);
		expect(expectedError.message).toBe(`${property} can not contains '${value}' value`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidIdentifierValueError');
		expect(expectedError.stack).toBeDefined();
	});
});
