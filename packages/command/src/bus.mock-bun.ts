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
	 * @property {Mock} dispatchSpy - A mock function for the dispatch method.
	 */
	readonly dispatchSpy = jest.fn(
		(..._commands: Command[]) => Promise.resolve(Either.right<DomainError, undefined>()),
	);

	/**
	 * This is a private static method that extracts data from a command.
	 * It omits the 'commandId' property from the command object and returns the remaining properties.
	 * If no command is provided, it returns an empty object.
	 *
	 * @template CommandType - A type that extends the Command interface.
	 * @param {CommandType} command - The command object from which to extract data. This is optional.
	 * @returns {Omit<CommandType, 'commandId'> | {}} - An object that contains the properties of the command object, excluding 'commandId'. If no command is provided, an empty object is returned.
	 */
	private static getDataFromCommand<CommandType extends Command>(
		command?: CommandType,
	): Omit<CommandType, 'commandId'> | Record<string, never> {
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
		const commandsArray = this.dispatchSpy.mock.calls.flat();
		expect(commandsArray.length).toEqual(expectedCommands.length);
		expect(commandsArray.map(command => MockBunCommandBus.getDataFromCommand(command))).toStrictEqual(
			expectedCommands.map(command => MockBunCommandBus.getDataFromCommand(command)),
		);
	}

	/**
	 * @method assertLastDispatchedCommand
	 * @description Method to assert that a specific command was the last one dispatched.
	 * @param {Command} expectedCommand - The expected last dispatched command.
	 */
	assertLastDispatchedCommand(expectedCommand: Command): void {
		expect(this.dispatchSpy).toHaveBeenCalled();
		const commandsArray = this.dispatchSpy.mock.calls.at(-1) ?? [];
		const command = commandsArray[0];
		expect(command).toBeDefined();
		expect(MockBunCommandBus.getDataFromCommand(command)).toStrictEqual(
			MockBunCommandBus.getDataFromCommand(expectedCommand),
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
