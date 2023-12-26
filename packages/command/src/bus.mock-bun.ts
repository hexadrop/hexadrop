import { expect, jest } from 'bun:test';
import Either from '@hexadrop/either';
import CommandError from '@hexadrop/error';
import type CommandBus from './bus';
import type { CommandBusCallback, CommandHandler } from './bus';
import type Command from './command';
import type { CommandClass } from './command';

export default class MockCommandBus implements CommandBus {
	readonly dispatchSpy = jest.fn((..._commands: Command[]) =>
		Promise.resolve(Either.left<void, CommandError>(undefined))
	);

	readonly registerSpy = jest.fn(
		(_command: CommandClass<any>, _handler: CommandBusCallback<any> | CommandHandler<any>) => Promise.resolve()
	);

	readonly unregisterSpy = jest.fn(
		(_command: CommandClass<any>, _handler: CommandBusCallback<any> | CommandHandler<any>) => Promise.resolve()
	);

	private static getDataFromCommand(command: Command) {
		const { commandId: _c, ...attributes } = command;

		return attributes;
	}

	assertDispatchedCommands(...expectedCommands: Command[]): void {
		expect(this.dispatchSpy).toHaveBeenCalled();
		const commandsArr = this.dispatchSpy.mock.calls.flat();
		expect(commandsArr.length).toEqual(expectedCommands.length);
		expect(commandsArr.map(e => MockCommandBus.getDataFromCommand(e))).toStrictEqual(
			expectedCommands.map(e => MockCommandBus.getDataFromCommand(e))
		);
	}

	assertLastDispatchedCommand(expectedCommand: Command): void {
		expect(this.dispatchSpy).toHaveBeenCalled();
		const commandsArr = this.dispatchSpy.mock.calls[this.dispatchSpy.mock.calls.length - 1] ?? [];
		const command = commandsArr[0];
		expect(command).toBeDefined();
		if (command) {
			expect(MockCommandBus.getDataFromCommand(command)).toStrictEqual(
				MockCommandBus.getDataFromCommand(expectedCommand)
			);
		}
	}

	assertNotDispatchedCommand(): void {
		expect(this.dispatchSpy).not.toHaveBeenCalled();
	}

	dispatch(command: Command): Either<void, CommandError> | Promise<Either<void, CommandError>> {
		return this.dispatchSpy(command);
	}

	register<C extends Command>(command: CommandClass<C>, callback: CommandBusCallback<C> | CommandHandler<C>): void {
		this.registerSpy(command, callback);
	}

	unregister<C extends Command>(command: CommandClass<C>, callback: CommandBusCallback<C> | CommandHandler<C>): void {
		this.unregisterSpy(command, callback);
	}
}
