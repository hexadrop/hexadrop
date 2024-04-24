const DOMAIN_ERROR_CODE = /[A-Z]{3}\((?:\d{3}|\d{6})\)/;

/**
 * The base class for all domain errors.
 *
 * @public
 */
abstract class DomainError extends Error {
	/**
	 * Returns the average of two numbers.
	 *
	 * @param name - The name of the error
	 * @param message - The error message
	 * @param code - [Optional] The error code. Must follow the next Regexp `/[A-Z][A-Z][A-Z]\((\d{3}|\d{6})\)/`.
	 *    For example FNL(123) or RPA(435678)
	 */
	protected constructor(
		name: string,
		message: string,
		readonly code: string,
	) {
		allowedValues(code);
		super(message);
		this.name = name || 'DomainError';
	}

	/**
	 * Gets the numeric part of the error code.
	 *
	 * @returns {number} The numeric part of the error code.
	 */
	get errorCode(): number {
		const code = this.code.slice(4).replace(')', '');

		return Number(code);
	}
}

/**
 * Class representing an InvalidErrorCodeError.
 * @extends DomainError
 */
class InvalidErrorCodeError extends DomainError {
	/**
	 * Creates a new InvalidErrorCodeError.
	 */
	constructor() {
		super(
			'InvalidErrorCodeError',
			`DomainError code must follow the next Regexp '/[A-Z][A-Z][A-Z]((d{3}|d{6}))/'`,
			'HEX(400)',
		);
	}
}

/**
 * Class representing an EmptyErrorCodeError.
 * @extends DomainError
 */
class EmptyErrorCodeError extends DomainError {
	/**
	 * Creates a new EmptyErrorCodeError.
	 */
	constructor() {
		super('EmptyErrorCodeError', 'DomainError code can not be null or empty', 'HEX(400)');
	}
}

/**
 * Checks if the provided code is allowed.
 *
 * @param {string} code - The code to be checked.
 * @throws {EmptyErrorCodeError} If the provided code is null or empty.
 * @throws {InvalidErrorCodeError} If the provided code does not follow the pattern /[A-Z][A-Z][A-Z]\((\d{3}|\d{6})\)/.
 */
function allowedValues(code: string) {
	if (!code) {
		throw new EmptyErrorCodeError();
	}
	if (!DOMAIN_ERROR_CODE.test(code)) {
		throw new InvalidErrorCodeError();
	}
}

export { EmptyErrorCodeError, InvalidErrorCodeError };

export default DomainError;
