import { DomainError } from '../../../src';

export class EmptyErrorCodeError extends DomainError {
	constructor() {
		super('EmptyErrorCodeError', 'empty error message', '');
	}
}

export class UndefinedErrorCodeError extends DomainError {
	constructor() {
		super(
			'UndefinedErrorCodeError',
			'undefined error message',
			// @ts-ignore
			undefined
		);
	}
}

export class InvalidErrorCodeError extends DomainError {
	constructor() {
		super('UndefinedErrorCodeError', 'undefined error message', 'asfkj');
	}
}

export class EmptyNameError extends DomainError {
	constructor() {
		super('', 'undefined error message', 'HEX(400)');
	}
}

export class UndefinedNameError extends DomainError {
	constructor() {
		super(
			// @ts-ignore
			undefined,
			'undefined error message',
			'HEX(400)'
		);
	}
}

export class InvalidDomainErrorMother {
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
