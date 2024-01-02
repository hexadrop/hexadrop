import { describe, expect, test } from 'bun:test';

import Command from './command';

class MockCommand extends Command {
	static override COMMAND_NAME = 'command';

	constructor(
		readonly foo: string,
		commandId?: string
	) {
		super(MockCommand.COMMAND_NAME, commandId);
	}
}

describe('Command', () => {
	describe('constructor()', () => {
		test('should instantiate with command id', () => {
			const command = new MockCommand('foo', 'commandId');
			expect(command.commandName).toBe('command');
			expect(command.commandId).toBe('commandId');
			expect(command.foo).toBe('foo');
			expect(Object.getPrototypeOf(command)).toStrictEqual(MockCommand.prototype);
			expect(command.constructor).toStrictEqual(MockCommand);
		});
		test('should instantiate without command id', () => {
			const command = new MockCommand('foo');
			expect(command.commandName).toBe('command');
			expect(command.commandId).toBeDefined();
			expect(command.foo).toBe('foo');
			expect(Object.getPrototypeOf(command)).toStrictEqual(MockCommand.prototype);
			expect(command.constructor).toStrictEqual(MockCommand);
		});
	});
});
