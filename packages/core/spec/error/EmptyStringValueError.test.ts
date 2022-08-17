import { describe, expect, test } from 'vitest';
import { WordMother } from '@hexadrop/mother';
import { EmptyStringValueErrorMother } from './mother/EmptyStringValueErrorMother';

describe('EmptyStringValueError', () => {
	test('should create', () => {
		const expectedError = EmptyStringValueErrorMother.create();
		expect(expectedError.message).toBe(`StringValueObject can not be null or empty`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('EmptyStringValueError');
		expect(expectedError.stack).toBeDefined();
	});
	test('should create from property', () => {
		const property = WordMother.random();
		const expectedError = EmptyStringValueErrorMother.create(property);
		expect(expectedError.message).toBe(`${property} can not be null or empty`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('EmptyStringValueError');
		expect(expectedError.stack).toBeDefined();
	});
});
