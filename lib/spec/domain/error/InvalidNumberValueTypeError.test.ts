import { describe, expect, test } from 'vitest';
import { InvalidNumberValueTypeErrorMother } from './mother/InvalidNumberValueTypeErrorMother';

describe('InvalidNumberValueTypeError', () => {
	test('should create from string', () => {
		const expectedError = InvalidNumberValueTypeErrorMother.create();
		expect(expectedError.message).toBe(`A NumberValueObject must only contains number values`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidNumberValueTypeError');
		expect(expectedError.stack).toBeDefined();
	});
});
