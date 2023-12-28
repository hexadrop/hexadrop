import InvalidArgumentError from '@hexadrop/error/invalid-argument';

/**
 * CommandNotRegisteredError class that extends InvalidArgumentError.
 * This error is thrown when a command does not have an associated command handler.
 */
export default class CommandNotRegisteredError extends InvalidArgumentError {
	/**
	 * CommandNotRegisteredError constructor.
	 * @param {string} command - The command name that does not have an associated command handler.
	 */
	constructor(command: string) {
		super(`The command '${command}' hasn't a command handler associated`, 'CommandNotRegisteredError', 'HEX(500)');
	}
}
