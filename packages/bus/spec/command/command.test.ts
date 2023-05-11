import { Command } from '@hexadrop/bus';
import { describe, expect, test } from 'vitest';

class MockCommand extends Command {
	static override COMMAND_NAME = 'command';

	constructor(commandId: string, relatedId?: string) {
		super(MockCommand.COMMAND_NAME, commandId, relatedId);
	}
}

describe('Command', () => {
	test('should instantiate with id', () => {
		const command = new MockCommand('id');
		expect(command.commandName).toBe('command');
		expect(command.commandId).toBe('id');
		expect(command.relatedId).toBeUndefined();
	});
	test('should instantiate with relatedId', () => {
		const command = new MockCommand('id', 'relatedId');
		expect(command.commandName).toBe('command');
		expect(command.commandId).toBe('id');
		expect(command.relatedId).toBe('relatedId');
	});
});
