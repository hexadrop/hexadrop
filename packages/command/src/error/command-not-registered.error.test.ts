import { describe, expect, test } from 'bun:test';

import CommandNotRegisteredError from './command-not-registered.error';

describe('CommandNotRegisteredError', () => {
	describe('constructor()', () => {
		test('should works as expected', () => {
			const error = new CommandNotRegisteredError('cmd');
			expect(error.name).toBe('CommandNotRegisteredError');
			expect(error.message).toBe(`The command 'cmd' hasn't a command handler associated`);
			expect(error.code).toBe('HEX(500)');
		});
	});
});
