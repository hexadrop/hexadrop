import InvalidArgumentError from '@hexadrop/error/invalid-argument';

class EmptyBooleanValueError extends InvalidArgumentError {
	constructor(property = 'BooleanValueObject') {
		super(`${property} can not be null or empty`, 'EmptyBooleanValueError', 'HEX(400)');
	}
}

class InvalidBooleanValueTypeError extends InvalidArgumentError {
	constructor(property = 'BooleanValueObject') {
		super(`${property} must only contains boolean values`, 'InvalidBooleanValueTypeError', 'HEX(400)');
	}
}

export { EmptyBooleanValueError, InvalidBooleanValueTypeError };
