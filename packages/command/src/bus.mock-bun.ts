import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import { expect, jest } from 'bun:test';

import type CommandBus from './bus';
import type Command from './command';

/**
 * @class MockBunCommandBus
 * @implements CommandBus
 * @description Class representing a mock command bus for testing in Bun.
 */
export default class MockBunCommandBus implements CommandBus {
	/**
	 * @property {jest.Mock} dispatchSpy - A mock function for the dispatch method.
	 */
	readonly dispatchSpy = jest.fn((..._commands: Command[]) =>
		Promise.resolve(Either.right<DomainError, void>(undefined))
	);

	/**
	 * @private
	 * @static
	 * @method getDataFromCommand
	 * @description Method to extract data from a command.
	 * @param {Command} command - The command to extract data from.
	 * @returns {Object} - The extracted data.
	 */
	private static getDataFromCommand(command?: Command): object {
		if (!command) {
			return {};
		}
		const { commandId: _c, ...attributes } = command;

		return attributes;
	}

	/**
	 * @method assertDispatchedCommands
	 * @description Method to assert that specific commands were dispatched.
	 * @param {...Command[]} expectedCommands - The expected dispatched commands.
	 */
	assertDispatchedCommands(...expectedCommands: Command[]): void {
		expect(this.dispatchSpy).toHaveBeenCalled();
		const commandsArr = this.dispatchSpy.mock.calls.flat();
		expect(commandsArr.length).toEqual(expectedCommands.length);
		expect(commandsArr.map(e => MockBunCommandBus.getDataFromCommand(e))).toStrictEqual(
			expectedCommands.map(e => MockBunCommandBus.getDataFromCommand(e))
		);
	}

	/**
	 * @method assertLastDispatchedCommand
	 * @description Method to assert that a specific command was the last one dispatched.
	 * @param {Command} expectedCommand - The expected last dispatched command.
	 */
	assertLastDispatchedCommand(expectedCommand: Command): void {
		expect(this.dispatchSpy).toHaveBeenCalled();
		const commandsArr = this.dispatchSpy.mock.calls[this.dispatchSpy.mock.calls.length - 1] ?? [];
		const command = commandsArr[0];
		expect(command).toBeDefined();
		expect(MockBunCommandBus.getDataFromCommand(command)).toStrictEqual(
			MockBunCommandBus.getDataFromCommand(expectedCommand)
		);
	}

	/**
	 * @method assertNotDispatchedCommand
	 * @description Method to assert that no command was dispatched.
	 */
	assertNotDispatchedCommand(): void {
		expect(this.dispatchSpy).not.toHaveBeenCalled();
	}

	/**
	 * @method dispatch
	 * @description Method to dispatch a command.
	 * @param {Command} command - The command to be dispatched.
	 * @returns {Either<DomainError, void> | Promise<Either<DomainError, void>>} - The result of the command dispatch.
	 */
	dispatch(command: Command): Either<DomainError, void> | Promise<Either<DomainError, void>> {
		return this.dispatchSpy(command) as Either<DomainError, void> | Promise<Either<DomainError, void>>;
	}
}
