import DomainError from '@hexadrop/error';

/**
 * InvalidCommandError class that extends DomainError.
 * This error is thrown when a command does not have a 'COMMAND_NAME' static property.
 */
export default class InvalidCommandError extends DomainError {
	/**
	 * InvalidCommandError constructor.
	 * It initializes with a specific error message and error code.
	 */
	constructor() {
		super('InvalidCommandError', `The command hasn't an 'COMMAND_NAME' static property`, 'HEX(500)');
	}
}
