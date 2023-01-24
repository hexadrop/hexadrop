import { WordMother } from '@hexadrop/mother';
import { describe, expect, test } from 'vitest';

import { EmptyDateValueErrorMother } from './mother/EmptyDateValueErrorMother';

describe('EmptyDateValueError', () => {
	test('should create', () => {
		const expectedError = EmptyDateValueErrorMother.create();
		expect(expectedError.message).toBe(`DateValueObject can not be null or empty`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('EmptyDateValueError');
		expect(expectedError.stack).toBeDefined();
	});
	test('should create from property', () => {
		const property = WordMother.random();
		const expectedError = EmptyDateValueErrorMother.create(property);
		expect(expectedError.message).toBe(`${property} can not be null or empty`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('EmptyDateValueError');
		expect(expectedError.stack).toBeDefined();
	});
});
