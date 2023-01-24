import { describe, expect, test } from 'vitest';

import { CommandNotRegisteredErrorMother } from './mother/CommandNotRegisteredErrorMother';

describe('CommandNotRegisteredError', () => {
	test('should create from string', () => {
		const expectedError = CommandNotRegisteredErrorMother.create('Command');
		expect(expectedError.message).toBe(
			`The command 'Command' hasn't a command handler associated`
		);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('CommandNotRegisteredError');
		expect(expectedError.stack).toBeDefined();
	});
});
