import { describe, expect, test } from 'vitest';
import { EmptyErrorCodeErrorMother } from './mother/EmptyErrorCodeErrorMother';

describe('EmptyErrorCodeError', () => {
	test('should create from string', () => {
		const expectedError = EmptyErrorCodeErrorMother.create();
		expect(expectedError.message).toBe('DomainError code can not be null or empty');
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('EmptyErrorCodeError');
		expect(expectedError.stack).toBeDefined();
	});
});
