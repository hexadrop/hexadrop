import DomainError from '@hexadrop/error';

/**
 * EventHandlerError is a custom error class that extends DomainError.
 * It is used to handle errors that occur in the event handler.
 */
export default class EventHandlerError extends DomainError {
	/**
	 * Constructor for the EventHandlerError class.
	 * @param {string | Error} message - The error message. If an Error object is passed, its message property is used.
	 */
	constructor(message: Error | string) {
		super('EventHandlerError', typeof message === 'string' ? message : message.message, 'HEX(500)');
	}
}
