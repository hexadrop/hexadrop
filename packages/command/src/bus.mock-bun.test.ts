import { describe, expect, test } from 'bun:test';

import MockBunCommandBus from './bus.mock-bun';
import Command from './command';

class Command1 extends Command {
	static override COMMAND_NAME = 'Command1';

	constructor(id: string) {
		super(Command1.COMMAND_NAME, { commandId: id });
	}
}

class Command2 extends Command {
	static override COMMAND_NAME = 'Command2';

	constructor(id: string) {
		super(Command2.COMMAND_NAME, { commandId: id });
	}
}

describe('MockBunCommandBus', () => {
	describe('assertDispatchedCommands()', () => {
		test('should works as expected', async () => {
			const command1 = new Command1('1');
			const command2 = new Command2('2');
			const bus = new MockBunCommandBus();

			await bus.dispatch(command1);
			await bus.dispatch(command2);

			expect(() => bus.assertDispatchedCommands(command1)).toThrow();
			expect(() => bus.assertDispatchedCommands(command1, command2)).not.toThrow();
		});
	});
	describe('assertLastDispatchedCommand()', () => {
		test('should works as expected', async () => {
			const command1 = new Command1('1');
			const command2 = new Command2('2');
			const bus = new MockBunCommandBus();

			await bus.dispatch(command1);
			await bus.dispatch(command2);

			expect(() => bus.assertLastDispatchedCommand(command1)).toThrow();
			expect(() => bus.assertLastDispatchedCommand(command2)).not.toThrow();
		});
	});
	describe('assertNotDispatchedCommand()', () => {
		test('should works as expected', async () => {
			const command1 = new Command1('1');
			const command2 = new Command2('2');
			const bus = new MockBunCommandBus();

			expect(() => bus.assertNotDispatchedCommand()).not.toThrow();

			await bus.dispatch(command1);
			await bus.dispatch(command2);

			expect(() => bus.assertNotDispatchedCommand()).toThrow();
		});
	});
});
