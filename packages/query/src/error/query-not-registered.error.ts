import InvalidArgumentError from '@hexadrop/error/invalid-argument';
/**
 * `QueryNotRegisteredError` is a custom error class that extends the `InvalidArgumentError` class from the `@hexadrop/error` package.
 * It represents an error that occurs when a query does not have an associated query handler.
 *
 * @extends {InvalidArgumentError}
 */
export default class QueryNotRegisteredError extends InvalidArgumentError {
	/**
	 * Constructs a new instance of the `QueryNotRegisteredError` class.
	 *
	 * @param {string} query - The query that does not have an associated query handler.
	 */
	constructor(query: string) {
		super(`The query '${query}' hasn't a query handler associated`, 'QueryNotRegisteredError', 'HEX(500)');
	}
}
