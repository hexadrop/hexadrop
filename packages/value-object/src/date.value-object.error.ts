import InvalidArgumentError from '@hexadrop/error/invalid-argument';

/**
 * EmptyDateValueError is a class that represents an error when a DateValueObject is null or empty.
 * It extends the InvalidArgumentError class.
 */
class EmptyDateValueError extends InvalidArgumentError {
	/**
	 * Constructs a new EmptyDateValueError instance.
	 * @param {string} [property='DateValueObject'] - The property name (optional).
	 */
	constructor(property?: string) {
		super(`${property ?? 'DateValueObject'} can not be null or empty`, 'EmptyDateValueError', 'HEX(400)');
	}
}

/**
 * InvalidDateValueTypeError is a class that represents an error when a DateValueObject contains non-date values.
 * It extends the InvalidArgumentError class.
 */
class InvalidDateValueTypeError extends InvalidArgumentError {
	/**
	 * Constructs a new InvalidDateValueTypeError instance.
	 * @param {string} [property='DateValueObject'] - The property name (optional).
	 */
	constructor(property?: string) {
		super(
			`${property ?? 'DateValueObject'} must only contains date values`,
			'InvalidDateValueTypeError',
			'HEX(400)'
		);
	}
}

export { EmptyDateValueError, InvalidDateValueTypeError };
