import { WordMother } from '@hexadrop/mother';
import { describe, expect, test } from 'vitest';

import { InvalidBooleanValueTypeErrorMother } from './mother/invalid-boolean-value-type.error.mother';

describe('InvalidBooleanValueTypeError', () => {
	test('should create', () => {
		const expectedError = InvalidBooleanValueTypeErrorMother.create();
		expect(expectedError.message).toBe(`BooleanValueObject must only contains boolean values`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidBooleanValueTypeError');
		expect(expectedError.stack).toBeDefined();
	});
	test('should create from property', () => {
		const property = WordMother.random();
		const expectedError = InvalidBooleanValueTypeErrorMother.create(property);
		expect(expectedError.message).toBe(`${property} must only contains boolean values`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidBooleanValueTypeError');
		expect(expectedError.stack).toBeDefined();
	});
});
