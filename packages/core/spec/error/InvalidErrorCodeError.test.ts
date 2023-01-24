import { describe, expect, test } from 'vitest';

import { InvalidErrorCodeErrorMother } from './mother/InvalidErrorCodeErrorMother';

describe('InvalidErrorCodeError', () => {
	test('should create from string', () => {
		const expectedError = InvalidErrorCodeErrorMother.create();
		expect(expectedError.message).toBe(
			`DomainError code must follow the next Regexp '/[A-Z][A-Z][A-Z]((d{3}|d{6}))/'`
		);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('InvalidErrorCodeError');
		expect(expectedError.stack).toBeDefined();
	});
});
