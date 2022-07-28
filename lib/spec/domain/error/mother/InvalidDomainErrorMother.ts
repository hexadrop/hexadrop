import { DomainError } from '../../../../src';

export class EmptyErrorCodeError extends DomainError {
    constructor() {
        super(
            'EmptyErrorCodeError',
            'empty error message',
            ''
        );
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
        super(
            'UndefinedErrorCodeError',
            'undefined error message',
            'asfkj'
        );
    }
}

export class EmptyNameError extends DomainError {
    constructor() {
        super(
            '',
            'undefined error message',
            'HEX(400)'
        );
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

    static emptyErrorCode() {
        return new EmptyErrorCodeError();
    }

    static undefinedErrorCode() {
        return new UndefinedErrorCodeError();
    }

    static invalidErrorCode() {
        return new InvalidErrorCodeError();
    }

    static emptyName() {
        return new EmptyNameError();
    }

    static undefinedName() {
        return new UndefinedNameError();
    }
}
