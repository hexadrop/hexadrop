import { WordMother } from '@hexadrop/mother';
import { describe, expect, test } from 'vitest';

import { InvalidStringValueTypeErrorMother } from './mother/invalid-string-value-type.error.mother';

describe('InvalidStringValueTypeError', () => {
	test('should create', () => {
		const expectedError = InvalidStringValueTypeErrorMother.create();
		expect(expectedError.message).toBe(`StringValueObject must only contains string values`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidStringValueTypeError');
		expect(expectedError.stack).toBeDefined();
	});
	test('should create from property', () => {
		const property = WordMother.random();
		const expectedError = InvalidStringValueTypeErrorMother.create(property);
		expect(expectedError.message).toBe(`${property} must only contains string values`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidStringValueTypeError');
		expect(expectedError.stack).toBeDefined();
	});
});
