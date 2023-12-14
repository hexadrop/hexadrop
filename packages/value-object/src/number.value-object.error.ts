import InvalidArgumentError from '@hexadrop/error/invalid-argument';

class InvalidNumberValueTypeError extends InvalidArgumentError {
	constructor(property = 'NumberValueObject') {
		super(`${property} must only contains number values`, 'InvalidNumberValueTypeError', 'HEX(400)');
	}
}

class EmptyNumberValueError extends InvalidArgumentError {
	constructor(property = 'NumberValueObject') {
		super(`${property} can not be null or empty`, 'EmptyNumberValueError', 'HEX(400)');
	}
}

export { EmptyNumberValueError, InvalidNumberValueTypeError };
