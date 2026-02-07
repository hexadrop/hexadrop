import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';

import CommandBus from './bus';
import Command from './command';
import CommandHandlers from './command-handlers';
import CommandHandlerError from './error/command-handler.error';

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
	 * @param {Command} command - The command to be dispatched.
	 * @returns {Promise<Either<DomainError, void>>} - The result of the command dispatch.
	 * @template CommandType - The type of the command.
	 */
	async dispatch(command: Command): Promise<Either<DomainError, void>> {
		const callbacks = await this.info.search(command);
		try {
			return await callbacks(command);
		} catch (error) {
			if (error instanceof DomainError) {
				return Either.left(error);
			}

			return Either.left(new CommandHandlerError(error));
		}
	}
}
