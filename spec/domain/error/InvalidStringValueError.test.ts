import { describe, expect, test } from 'vitest';
import { WordMother } from '../../../src/test';
import { InvalidStringValueErrorMother } from './mother/InvalidStringValueErrorMother';

describe('InvalidStringValueError', () => {
	test('should create from string', () => {
		const value = WordMother.random();
		const expectedError = InvalidStringValueErrorMother.create(value);
		expect(expectedError.message).toBe(`Invalid value '${value}'`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidStringValueError');
		expect(expectedError.stack).toBeDefined();
	});
});
