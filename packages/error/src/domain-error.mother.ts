import DomainError from './domain-error';

class EmptyErrorCodeError extends DomainError {
	constructor() {
		super('EmptyErrorCodeError', 'empty error message', '');
	}
}

class UndefinedErrorCodeError extends DomainError {
	constructor() {
		super(
			'UndefinedErrorCodeError',
			'undefined error message',
			// @ts-expect-error Expect not undefined
			undefined
		);
	}
}

class InvalidErrorCodeError extends DomainError {
	constructor() {
		super('UndefinedErrorCodeError', 'undefined error message', 'asfkj');
	}
}

class EmptyNameError extends DomainError {
	constructor() {
		super('', 'undefined error message', 'HEX(400)');
	}
}

class UndefinedNameError extends DomainError {
	constructor() {
		super(
			// @ts-expect-error Expect not undefined
			undefined,
			'undefined error message',
			'HEX(400)'
		);
	}
}

export default class InvalidDomainErrorMother {
	static emptyErrorCode(): EmptyErrorCodeError {
		return new EmptyErrorCodeError();
	}

	static emptyName(): EmptyErrorCodeError {
		return new EmptyNameError();
	}

	static invalidErrorCode(): EmptyErrorCodeError {
		return new InvalidErrorCodeError();
	}

	static undefinedErrorCode(): EmptyErrorCodeError {
		return new UndefinedErrorCodeError();
	}

	static undefinedName(): EmptyErrorCodeError {
		return new UndefinedNameError();
	}
}
