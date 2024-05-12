import type { Container } from '@hexadrop/ioc';

import type { CommandBusCallback, CommandHandler, CommandHandlerClass } from './bus';
import type { CommandClass } from './command';
import Command from './command';
import CommandHandlers from './command-handlers';
import { COMMAND_HANDLER_METADATA_KEY } from './decorator';
import { CommandNotRegisteredError, InvalidCommandError } from './error';

/**
 * IoCCommandHandlers class implements CommandHandlers interface.
 * It uses inversion of control to manage command handlers.
 */
export default class IoCCommandHandlers extends CommandHandlers {
	/**
	 * IoCCommandHandlers constructor.
	 * @param {Container} container - The IoC container.
	 */
	constructor(private readonly container: Container) {
		super();
	}

	/**
	 * Searches for a command handler in the IoC container.
	 * @param {CommandType | CommandClass<CommandType>} command - The command to search for.
	 * @throws {InvalidCommandError} If the command does not have a name.
	 * @throws {CommandNotRegisteredError} If the command handler is not registered in the IoC container.
	 * @returns {CommandBusCallback<CommandType>} The command handler callback.
	 * @template CommandType - The command type.
	 */
	search<CommandType extends Command>(
		command: CommandClass<CommandType> | CommandType
	): CommandBusCallback<CommandType> {
		let handler: CommandHandlerClass<CommandType> | undefined;
		let commandName: string | undefined;

		// Check if the command has a COMMAND_NAME property
		if ('COMMAND_NAME' in command) {
			commandName = command.COMMAND_NAME;
			handler = Reflect.getMetadata<CommandHandlerClass<CommandType>>(COMMAND_HANDLER_METADATA_KEY, command);
		} else if ('commandName' in command) {
			// Check if the command has a commandName property
			commandName = command.commandName;
			handler = Reflect.getMetadata<CommandHandlerClass<CommandType>>(
				COMMAND_HANDLER_METADATA_KEY,
				command.constructor
			);
		}

		// If the command does not have a name, throw an error
		if (!commandName) {
			throw new InvalidCommandError();
		}

		// If the command handler is not registered, throw an error
		if (!handler) {
			throw new CommandNotRegisteredError(commandName);
		}

		// Get the command handler instance from the IoC container
		const instance = this.container.get<CommandHandler<CommandType>>(handler);

		// Return the command handler callback
		return instance.run.bind(instance);
	}
}
