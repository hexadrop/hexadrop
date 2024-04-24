import InvalidArgumentError from '@hexadrop/error/invalid-argument';

/**
 * InvalidNumberValueTypeError is a class that represents an error when a NumberValueObject contains non-number values.
 * It extends the InvalidArgumentError class.
 */
class InvalidNumberValueTypeError extends InvalidArgumentError {
	/**
	 * Constructs a new InvalidNumberValueTypeError instance.
	 * @param {string} [property='NumberValueObject'] - The property name (optional).
	 */
	constructor(property?: string) {
		super(
			`${property ?? 'NumberValueObject'} must only contains number values`,
			'InvalidNumberValueTypeError',
			'HEX(400)',
		);
	}
}

/**
 * EmptyNumberValueError is a class that represents an error when a NumberValueObject is null or empty.
 * It extends the InvalidArgumentError class.
 */
class EmptyNumberValueError extends InvalidArgumentError {
	/**
	 * Constructs a new EmptyNumberValueError instance.
	 * @param {string} [property='NumberValueObject'] - The property name (optional).
	 */
	constructor(property?: string) {
		super(`${property ?? 'NumberValueObject'} can not be null or empty`, 'EmptyNumberValueError', 'HEX(400)');
	}
}

export { EmptyNumberValueError, InvalidNumberValueTypeError };
