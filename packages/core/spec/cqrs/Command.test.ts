import { describe, expect, test } from 'vitest';
import { Command } from '../../src';

class MockCommand extends Command {
	static COMMAND_NAME = 'command';

	constructor(commandId?: string, relatedId?: string) {
		super(MockCommand.COMMAND_NAME, commandId, relatedId);
	}
}

describe('Command', () => {
	test('should instantiate', () => {
		const command = new MockCommand();
		expect(command.commandName).toBe('command');
		expect(command.commandId).toBeDefined();
		expect(command.relatedId).toBeUndefined();
	});
	test('should instantiate with id', () => {
		const command = new MockCommand('id');
		expect(command.commandName).toBe('command');
		expect(command.commandId).toBe('id');
		expect(command.relatedId).toBeUndefined();
	});
	test('should instantiate with relatedId', () => {
		const command = new MockCommand(undefined, 'relatedId');
		expect(command.commandName).toBe('command');
		expect(command.commandId).toBeDefined();
		expect(command.relatedId).toBe('relatedId');
	});
});
