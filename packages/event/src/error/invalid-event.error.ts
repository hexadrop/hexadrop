import DomainError from '@hexadrop/error';

/**
 * InvalidEventError class that extends DomainError.
 * This error is thrown when a event does not have a 'EVENT_NAME' static property.
 */
export default class InvalidEventError extends DomainError {
	/**
	 * InvalidEventError constructor.
	 * It initializes with a specific error message and error code.
	 */
	constructor() {
		super('InvalidEventError', `The event hasn't an 'EVENT_NAME' static property`, 'HEX(500)');
	}
}
