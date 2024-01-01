import type { CommandBusCallback } from './bus';
import type { CommandClass } from './command';
import Command from './command';

/**
 * This is an abstract class named CommandHandlers.
 * It provides a structure for handling commands in the application.
 *
 * @abstract
 */
export default abstract class CommandHandlers {
	/**
	 * This is an abstract method named 'search'.
	 * It is expected to be implemented by subclasses of CommandHandlers.
	 * The method takes a command of type 'C' or 'CommandClass<C>' as an argument.
	 * 'C' is a generic parameter that extends 'Command'.
	 * The method should return a 'CommandBusCallback<C>'.
	 *
	 * @abstract
	 * @param {C | CommandClass<C>} command - The command to be searched.
	 * @returns {CommandBusCallback<C>} - The callback function to be executed when the command is found.
	 */
	abstract search<C extends Command>(command: C | CommandClass<C>): CommandBusCallback<C>;
}
