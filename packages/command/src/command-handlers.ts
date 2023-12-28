import type { CommandBusCallback } from './bus';
import type { CommandClass } from './command';
import Command from './command';

/**
 * @interface CommandHandlers
 * @description Interface representing a set of command handlers.
 */
export interface CommandHandlers {
	/**
	 * @method search
	 * @description Method to search for a command handler.
	 * @param {C | CommandClass<C>} command - The command or command class to search for.
	 * @returns {CommandBusCallback<C>} - The command bus callback for the command.
	 * @template C - The type of the command.
	 */
	search<C extends Command>(command: C | CommandClass<C>): CommandBusCallback<C>;
}
