import { WordMother } from '@hexadrop/mother';
import { describe, expect, test } from 'vitest';

import { EmptyBooleanValueErrorMother } from './mother/EmptyBooleanValueErrorMother';

describe('EmptyBooleanValueError', () => {
	test('should create', () => {
		const expectedError = EmptyBooleanValueErrorMother.create();
		expect(expectedError.message).toBe(`BooleanValueObject can not be null or empty`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('EmptyBooleanValueError');
		expect(expectedError.stack).toBeDefined();
	});
	test('should create from property', () => {
		const property = WordMother.random();
		const expectedError = EmptyBooleanValueErrorMother.create(property);
		expect(expectedError.message).toBe(`${property} can not be null or empty`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('EmptyBooleanValueError');
		expect(expectedError.stack).toBeDefined();
	});
});
