import DomainError from '@hexadrop/error';
/**
 * `InvalidQueryError` is a custom error class that extends the `DomainError` class from the `@hexadrop/error` package.
 * It represents an error that occurs when a query does not have a 'QUERY_NAME' static property.
 *
 * @extends {DomainError}
 */
export default class InvalidQueryError extends DomainError {
	/**
	 * Constructs a new instance of the `InvalidQueryError` class.
	 */
	constructor() {
		super('InvalidQueryError', `The query hasn't an 'QUERY_NAME' static property`, 'HEX(500)');
	}
}
