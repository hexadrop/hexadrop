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
	 * @param {CommandClass<C>} command - The command class.
	 * @param {CommandBusCallback<C> | CommandHandler<C>} handlerOrCallback - The command bus callback or command handler.
	 * @template C - The type of the command.
	 */
	register<C extends Command>(
		command: CommandClass<C>,
		handlerOrCallback: CommandBusCallback<C> | CommandHandler<C>
	): void {
		if ('run' in handlerOrCallback) {
			this.commandHandlersMap.set(
				command.COMMAND_NAME,
				handlerOrCallback.run.bind(handlerOrCallback) as CommandBusCallback
			);
		} else {
			this.commandHandlersMap.set(command.COMMAND_NAME, handlerOrCallback as CommandBusCallback);
		}
	}

	/**
	 * @method search
	 * @description Method to search for a command handler.
	 * @param {C | CommandClass<C>} command - The command or command class to search for.
	 * @returns {CommandBusCallback<C>} - The command bus callback for the command.
	 * @throws {InvalidCommandError} - Throws an error if the command is invalid.
	 * @throws {CommandNotRegisteredError} - Throws an error if the command is not registered.
	 * @template C - The type of the command.
	 */
	search<C extends Command>(command: C | CommandClass<C>): CommandBusCallback<C> {
		let handler: CommandBusCallback<C> | undefined = undefined;
		let commandName: string | undefined = undefined;
		if ('COMMAND_NAME' in command) {
			commandName = command.COMMAND_NAME;
		} else if ('commandName' in command) {
			commandName = command.commandName;
		}

		if (!commandName) {
			throw new InvalidCommandError();
		}

		handler = this.commandHandlersMap.get(commandName);

		if (!handler) {
			throw new CommandNotRegisteredError(commandName);
		}

		return handler;
	}

	/**
	 * @method unregister
	 * @description Method to unregister a command handler.
	 * @param {CommandClass<C>} command - The command class to unregister.
	 * @template C - The type of the command.
	 */
	unregister<C extends Command>(command: CommandClass<C>): void {
		this.commandHandlersMap.delete(command.COMMAND_NAME);
	}
}
