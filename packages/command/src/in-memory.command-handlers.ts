import type { CommandBusCallback, CommandHandler } from './bus';
import type { CommandClass } from './command';
import Command from './command';
import CommandHandlers from './command-handlers';
import { CommandNotRegisteredError, InvalidCommandError } from './error';

/**
 * @class InMemoryCommandHandlers
 * @implements CommandHandlers
 * @description Class representing in-memory command handlers.
 */
export default class InMemoryCommandHandlers extends CommandHandlers {
	/**
	 * @property {Map<string, CommandBusCallback>} commandHandlersMap - The map of command handlers.
	 */
	private readonly commandHandlersMap: Map<string, CommandBusCallback>;

	/**
	 * @constructor
	 * @description Constructs an instance of InMemoryCommandHandlers.
	 */
	constructor() {
		super();
		this.commandHandlersMap = new Map<string, CommandBusCallback>();
	}

	/**
	 * @method register
	 * @description Method to register a command handler.
	 * @param {CommandClass<CommandType>} command - The command class.
	 * @param {CommandBusCallback<CommandType> | CommandHandler<CommandType>} handlerOrCallback - The command bus callback or command handler.
	 * @template CommandType - The type of the command.
	 */
	register<CommandType extends Command>(
		command: CommandClass<CommandType>,
		handlerOrCallback: CommandBusCallback<CommandType> | CommandHandler<CommandType>,
	): void {
		if ('run' in handlerOrCallback) {
			this.commandHandlersMap.set(
				command.COMMAND_NAME,
				handlerOrCallback.run.bind(handlerOrCallback) as CommandBusCallback,
			);
		} else {
			this.commandHandlersMap.set(command.COMMAND_NAME, handlerOrCallback as CommandBusCallback);
		}
	}

	/**
	 * @method search
	 * @description Method to search for a command handler.
	 * @param {CommandType | CommandClass<CommandType>} command - The command or command class to search for.
	 * @returns {CommandBusCallback<CommandType>} - The command bus callback for the command.
	 * @throws {InvalidCommandError} - Throws an error if the command is invalid.
	 * @throws {CommandNotRegisteredError} - Throws an error if the command is not registered.
	 * @template CommandType - The type of the command.
	 */
	search<CommandType extends Command>(
		command: CommandClass<CommandType> | CommandType,
	): CommandBusCallback<CommandType> {
		let commandName: string | undefined;
		if ('COMMAND_NAME' in command) {
			commandName = command.COMMAND_NAME;
		} else if ('commandName' in command) {
			commandName = command.commandName;
		}

		if (!commandName) {
			throw new InvalidCommandError();
		}

		const handler = this.commandHandlersMap.get(commandName);

		if (!handler) {
			throw new CommandNotRegisteredError(commandName);
		}

		return handler;
	}

	/**
	 * @method unregister
	 * @description Method to unregister a command handler.
	 * @param {CommandClass<CommandType>} command - The command class to unregister.
	 * @template CommandType - The type of the command.
	 */
	unregister<CommandType extends Command>(command: CommandClass<CommandType>): void {
		this.commandHandlersMap.delete(command.COMMAND_NAME);
	}
}
