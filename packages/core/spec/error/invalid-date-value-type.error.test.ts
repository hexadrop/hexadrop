import { WordMother } from '@hexadrop/mother';
import { describe, expect, test } from 'vitest';

import { InvalidDateValueTypeErrorMother } from './mother/invalid-date-value-type.error.mother';

describe('InvalidDateValueTypeError', () => {
	test('should create', () => {
		const expectedError = InvalidDateValueTypeErrorMother.create();
		expect(expectedError.message).toBe(`DateValueObject must only contains date values`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidDateValueTypeError');
		expect(expectedError.stack).toBeDefined();
	});
	test('should create from property', () => {
		const property = WordMother.random();
		const expectedError = InvalidDateValueTypeErrorMother.create(property);
		expect(expectedError.message).toBe(`${property} must only contains date values`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidDateValueTypeError');
		expect(expectedError.stack).toBeDefined();
	});
});
