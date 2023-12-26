import { describe, expect, test } from 'bun:test';

import type { CommandParams } from './command';
import Command from './command';

class MockCommand extends Command {
	static override COMMAND_NAME = 'command';
	readonly foo: string;

	constructor({ foo, ...params }: CommandParams<MockCommand>) {
		super(MockCommand.COMMAND_NAME, params);
		this.foo = foo;
	}
}

describe('Command', () => {
	test('should instantiate with command id', () => {
		const command = new MockCommand({
			commandId: 'commandId',
			foo: 'foo',
		});
		expect(command.commandName).toBe('command');
		expect(command.commandId).toBe('commandId');
		expect(command.foo).toBe('foo');
	});
	test('should instantiate with occurredOn', () => {
		const command = new MockCommand({
			commandId: 'commandId',
			foo: 'foo',
		});
		expect(command.commandName).toBe('command');
		expect(command.commandId).toBe('commandId');
		expect(command.foo).toBe('foo');
	});
	test('should instantiate with relatedId', () => {
		const command = new MockCommand({
			commandId: 'commandId',
			foo: 'foo',
		});
		expect(command.commandName).toBe('command');
		expect(command.commandId).toBe('commandId');
		expect(command.foo).toBe('foo');
	});
});
