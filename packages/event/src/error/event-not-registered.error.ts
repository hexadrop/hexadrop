import InvalidArgumentError from '@hexadrop/error/invalid-argument';

/**
 * EventNotRegisteredError class that extends InvalidArgumentError.
 * This error is thrown when an event does not have an associated event handler.
 */
export default class EventNotRegisteredError extends InvalidArgumentError {
	/**
	 * EventNotRegisteredError constructor.
	 * @param {string} event - The event name that does not have an associated event handler.
	 */
	constructor(event: string) {
		super(`The event '${event}' hasn't a event handler associated`, 'EventNotRegisteredError', 'HEX(500)');
	}
}
