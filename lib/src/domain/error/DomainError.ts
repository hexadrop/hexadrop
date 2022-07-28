const DOMAIN_ERROR_CODE = /[A-Z][A-Z][A-Z]\((\d{3}|\d{6})\)/;

/**
 * The base class for all domain errors.
 *
 * @public
 */
export abstract class DomainError extends Error {
	/**
	 * Returns the average of two numbers.
	 *
	 * @param name - The name of the error
	 * @param message - The error message
	 * @param code - [Optional] The error code. Must follow the next Regexp `/[A-Z][A-Z][A-Z]\((\d{3}|\d{6})\)/`.
	 *    For example FNL(123) or RPA(435678)
	 */
	protected constructor(name: string, message: string, readonly code: string) {
		DomainError.allowedValues(code);
		super(message);
		this.name = name || 'DomainError';
	}

	private static allowedValues(code: string) {
		if (!code) {
			throw new EmptyErrorCodeError();
		}
		if (!DOMAIN_ERROR_CODE.test(code)) {
			throw new InvalidErrorCodeError();
		}
	}

	get errorCode(): number {
		const code = this.code.substring(4).replace(')', '');
		return +code;
	}
}

export class InvalidErrorCodeError extends DomainError {
	constructor() {
		super(
			'InvalidErrorCodeError',
			`DomainError code must follow the next Regexp '/[A-Z][A-Z][A-Z]\((\d{3}|\d{6})\)/'`,
			'HEX(400)'
		);
	}
}

export class EmptyErrorCodeError extends DomainError {
	constructor() {
		super('EmptyErrorCodeError', 'DomainError code can not be null or empty', 'HEX(400)');
	}
}
