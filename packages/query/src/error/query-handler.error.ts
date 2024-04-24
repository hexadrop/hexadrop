import DomainError from '@hexadrop/error';

/**
 * QueryHandlerError is a custom error class that extends DomainError.
 * It is used to handle errors that occur in the query handler.
 */
export default class QueryHandlerError extends DomainError {
	/**
	 * Constructor for the QueryHandlerError class.
	 * @param {string | Error} message - The error message. If an Error object is passed, its message property is used.
	 */
	constructor(message: Error | string) {
		super('QueryHandlerError', typeof message === 'string' ? message : message.message, 'HEX(500)');
	}
}
