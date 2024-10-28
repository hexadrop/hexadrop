import DomainError from '@hexadrop/error';

/**
 * QueryHandlerError is a custom error class that extends DomainError.
 * It is used to handle errors that occur in the query handler.
 */
export default class QueryHandlerError extends DomainError {
	/**
	 * Constructor for the QueryHandlerError class.
	 * @param {string | Error} payload - The error message. If an Error object is passed, its message property is used.
	 */
	constructor(payload: unknown) {
		let message = '';
		if (payload instanceof Error) {
			message = payload.message;
		} else if (typeof payload === 'string') {
			message = payload;
		} else if (typeof payload === 'object' && payload !== null) {
			if ('message' in payload && typeof payload.message === 'string') {
				message = payload.message;
			} else if ('error' in payload && typeof payload.error === 'string') {
				message = payload.error;
			} else {
				message = JSON.stringify(payload);
			}
		}
		super('QueryHandlerError', message, 'HEX(500)');
	}
}
