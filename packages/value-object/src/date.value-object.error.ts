import InvalidArgumentError from '@hexadrop/error/invalid-argument';

class EmptyDateValueError extends InvalidArgumentError {
	constructor(property = 'DateValueObject') {
		super(`${property} can not be null or empty`, 'EmptyDateValueError', 'HEX(400)');
	}
}
class InvalidDateValueTypeError extends InvalidArgumentError {
	constructor(property = 'DateValueObject') {
		super(`${property} must only contains date values`, 'InvalidDateValueTypeError', 'HEX(400)');
	}
}

export { EmptyDateValueError, InvalidDateValueTypeError };
