import { Command } from '@hexadrop/core';
import { describe, expect, test } from 'vitest';
import { MockCommandBus } from '../../src/test';

class Command1 extends Command {
	static readonly COMMAND_NAME = 'Command1';

	constructor() {
		super(Command1.COMMAND_NAME);
	}
}

class Command2 extends Command {
	static readonly COMMAND_NAME = 'Command2';

	constructor() {
		super(Command2.COMMAND_NAME);
	}
}

describe('MockCommandBus', () => {
	test('should assertLastPublishedCommand works as expected', async () => {
		const command1 = new Command1();
		const command2 = new Command2();
		const bus = new MockCommandBus();

		await bus.dispatch(command1);
		await bus.dispatch(command2);

		expect(() => bus.assertLastPublishedCommand(command1)).toThrow();
		expect(() => bus.assertLastPublishedCommand(command2)).not.toThrow();
	});
	test('should assertLastPublishedCommand works as expected', async () => {
		const command1 = new Command1();
		const command2 = new Command2();
		const bus = new MockCommandBus();

		await bus.dispatch(command1);
		await bus.dispatch(command2);

		expect(() => bus.assertPublishedCommands(command1)).toThrow();
		expect(() => bus.assertPublishedCommands(command1, command2)).not.toThrow();
	});
	test('should assertNotPublishedCommand works as expected', async () => {
		const command1 = new Command1();
		const command2 = new Command2();
		const bus = new MockCommandBus();

		expect(() => bus.assertNotPublishedCommand()).not.toThrow();

		await bus.dispatch(command1);
		await bus.dispatch(command2);

		expect(() => bus.assertNotPublishedCommand()).toThrow();
	});
});
