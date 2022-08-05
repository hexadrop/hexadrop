import { describe, expect, test } from 'vitest';
import { InvalidBooleanValueTypeErrorMother } from './mother/InvalidBooleanValueTypeErrorMother';

describe('InvalidBooleanValueTypeError', () => {
	test('should create from string', () => {
		const expectedError = InvalidBooleanValueTypeErrorMother.create();
		expect(expectedError.message).toBe(`A BooleanValueObject must only contains boolean values`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidBooleanValueTypeError');
		expect(expectedError.stack).toBeDefined();
	});
});
