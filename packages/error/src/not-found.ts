import DomainError from './domain-error';

/**
 * Class representing a DomainNotFoundError.
 * @extends DomainError
 */
export default class DomainNotFoundError extends DomainError {
	/**
	 * Create a DomainNotFoundError.
	 * @param {string} domain - The domain in which the error occurred.
	 * @param {string} id - The ID that was not found in the domain.
	 * @param {string} [param='id'] - The parameter that was not found.
	 * @param {string} [name='DomainNotFoundError'] - The name of the error.
	 * @param {string} [code='HEX(404)'] - The error code.
	 */
	constructor(domain: string, id: string, parameter?: string, name?: string, code?: string) {
		super(
			name ?? 'DomainNotFoundError',
			`${domain} with ${parameter ?? 'id'} '${id}' was not found`,
			code ?? 'HEX(404)'
		);
	}
}
