import InvalidArgumentError from '@hexadrop/error/invalid-argument';

/**
 * EmptyBooleanValueError is a class that represents an error when a BooleanValueObject is null or empty.
 * It extends the InvalidArgumentError class.
 */
class EmptyBooleanValueError extends InvalidArgumentError {
	/**
	 * Constructs a new EmptyBooleanValueError instance.
	 * @param {string} [property='BooleanValueObject'] - The property name (optional).
	 */
	constructor(property?: string) {
		super(`${property ?? 'BooleanValueObject'} can not be null or empty`, 'EmptyBooleanValueError', 'HEX(400)');
	}
}

/**
 * InvalidBooleanValueTypeError is a class that represents an error when a BooleanValueObject contains non-boolean values.
 * It extends the InvalidArgumentError class.
 */
class InvalidBooleanValueTypeError extends InvalidArgumentError {
	/**
	 * Constructs a new InvalidBooleanValueTypeError instance.
	 * @param {string} [property='BooleanValueObject'] - The property name (optional).
	 */
	constructor(property?: string) {
		super(
			`${property ?? 'BooleanValueObject'} must only contains boolean values`,
			'InvalidBooleanValueTypeError',
			'HEX(400)',
		);
	}
}

export { EmptyBooleanValueError, InvalidBooleanValueTypeError };
