import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';

import CommandBus from './bus';
import Command from './command';
import type { CommandHandlers } from './command-handlers';

/**
 * @class SyncCommandBus
 * @extends CommandBus
 * @description Class representing a synchronous command bus.
 */
export default class SyncCommandBus extends CommandBus {
	/**
	 * @property {CommandHandlers} info - The command handler information.
	 */
	private readonly info: CommandHandlers;

	/**
	 * @constructor
	 * @param {CommandHandlers} info - The command handler information.
	 */
	constructor(info: CommandHandlers) {
		super();
		this.info = info;
	}

	/**
	 * @method dispatch
	 * @description Method to dispatch a command.
	 * @param {C} command - The command to be dispatched.
	 * @returns {Promise<Either<DomainError, void>>} - The result of the command dispatch.
	 * @template C - The type of the command.
	 */
	async dispatch<C extends Command>(command: C): Promise<Either<DomainError, void>> {
		const callbacks = this.info.search(command);

		return callbacks(command);
	}
}
