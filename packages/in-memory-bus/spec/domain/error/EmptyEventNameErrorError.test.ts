import { describe, expect, test } from 'vitest';

import { EmptyEventNameErrorMother } from './mother/EmptyEventNameErrorMother';

describe('EmptyEventNameError', () => {
	test('should create from string', () => {
		const expectedError = EmptyEventNameErrorMother.create('Command');
		expect(expectedError.message).toBe(
			`The command 'Command' hasn't a command handler associated`
		);
		expect(expectedError.errorCode).toBe(500);
		expect(expectedError.code).toBe('HEX(500)');
		expect(expectedError.name).toBe('EmptyEventNameError');
		expect(expectedError.stack).toBeDefined();
	});
});
