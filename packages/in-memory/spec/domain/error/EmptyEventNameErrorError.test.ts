import { describe, test, expect } from 'vitest';
import { EmptyEventNameErrorMother } from './mother/EmptyEventNameErrorMother';

describe('EmptyEventNameError', () => {
	test('should create from string', () => {
		const expectedError = EmptyEventNameErrorMother.create('Command');
		expect(expectedError.message).toBe(`The command 'Command' hasn't a command handler associated`);
		expect(expectedError.errorCode).toBe(400);
		expect(expectedError.code).toBe('HEX(400)');
		expect(expectedError.name).toBe('EmptyEventNameError');
		expect(expectedError.stack).toBeDefined();
	});
});
