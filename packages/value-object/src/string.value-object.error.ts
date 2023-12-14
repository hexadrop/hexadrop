import InvalidArgumentError from '@hexadrop/error/invalid-argument';

class EmptyStringValueError extends InvalidArgumentError {
	constructor(property = 'StringValueObject') {
		super(`${property} can not be null or empty`, 'EmptyStringValueError', 'HEX(400)');
	}
}
class InvalidStringValueError extends InvalidArgumentError {
	constructor(property = 'StringValueObject', value: string) {
		super(`${property} can not contains '${value}' value`, 'InvalidStringValueError', 'HEX(400)');
	}
}
class InvalidStringValueTypeError extends InvalidArgumentError {
	constructor(property = 'StringValueObject') {
		super(`${property} must only contains string values`, 'InvalidStringValueTypeError', 'HEX(400)');
	}
}

export { EmptyStringValueError, InvalidStringValueError, InvalidStringValueTypeError };
