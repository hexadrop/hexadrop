import DomainError from './domain-error';

/**
 * Class representing an InvalidArgumentError.
 * @extends DomainError
 */
export default class InvalidArgumentError extends DomainError {
	/**
	 * Create an InvalidArgumentError.
	 * @param {string} message - The error message.
	 * @param {string} [name='InvalidArgumentError'] - The name of the error.
	 * @param {string} [code='HEX(400)'] - The error code.
	 */
	constructor(message: string, name?: string, code?: string) {
		super(name ?? 'InvalidArgumentError', message, code ?? 'HEX(400)');
	}
}
