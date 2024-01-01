import DomainError from '@hexadrop/error';

/**
 * CommandHandlerError is a custom error class that extends DomainError.
 * It is used to handle errors that occur in the command handler.
 */
export default class CommandHandlerError extends DomainError {
	/**
	 * Constructor for the CommandHandlerError class.
	 * @param {string | Error} message - The error message. If an Error object is passed, its message property is used.
	 */
	constructor(message: string | Error) {
		super('CommandHandlerError', typeof message === 'string' ? message : message.message, 'HEX(500)');
	}
}
