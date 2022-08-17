import { describe, expect, test } from 'vitest';
import { Command } from '../../src';
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
	test('should assertLastDispatchedCommand works as expected', async () => {
		const command1 = new Command1();
		const command2 = new Command2();
		const bus = new MockCommandBus();

		await bus.dispatch(command1);
		await bus.dispatch(command2);

		expect(() => bus.assertLastDispatchedCommand(command1)).toThrow();
		expect(() => bus.assertLastDispatchedCommand(command2)).not.toThrow();
	});
	test('should assertDispatchedCommands works as expected', async () => {
		const command1 = new Command1();
		const command2 = new Command2();
		const bus = new MockCommandBus();

		await bus.dispatch(command1);
		await bus.dispatch(command2);

		expect(() => bus.assertDispatchedCommands(command1)).toThrow();
		expect(() => bus.assertDispatchedCommands(command1, command2)).not.toThrow();
	});
	test('should assertNotDispatchedCommand works as expected', async () => {
		const command1 = new Command1();
		const command2 = new Command2();
		const bus = new MockCommandBus();

		expect(() => bus.assertNotDispatchedCommand()).not.toThrow();

		await bus.dispatch(command1);
		await bus.dispatch(command2);

		expect(() => bus.assertNotDispatchedCommand()).toThrow();
	});
});
