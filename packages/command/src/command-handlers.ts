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
	 * The method takes a command of type 'CommandType' or 'CommandClass<CommandType>' as an argument.
	 * 'CommandType' is a generic parameter that extends 'Command'.
	 * The method should return a 'CommandBusCallback<CommandType>'.
	 *
	 * @abstract
	 * @param {CommandType | CommandClass<CommandType>} command - The command to be searched.
	 * @returns {CommandBusCallback<CommandType> | Promise<CommandBusCallback<CommandType>>} - The callback function to be executed when the command is found.
	 * @template CommandType - The type of the command.
	 */
	abstract search<CommandType extends Command>(
		command: CommandClass<CommandType> | CommandType
	): CommandBusCallback<CommandType> | Promise<CommandBusCallback<CommandType>>;
}
