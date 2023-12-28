import { describe, expect, test } from 'bun:test';

import InvalidCommandError from './invalid-command.error';

describe('InvalidCommandError', () => {
	describe('constructor()', () => {
		test('should works as expected', () => {
			const error = new InvalidCommandError();
			expect(error.name).toBe('InvalidCommandError');
			expect(error.message).toBe(`The command hasn't an 'COMMAND_NAME' static property`);
			expect(error.code).toBe('HEX(500)');
		});
	});
});
