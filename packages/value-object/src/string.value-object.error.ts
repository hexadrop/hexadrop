import InvalidArgumentError from '@hexadrop/error/invalid-argument';

/**
 * EmptyStringValueError is a class that represents an error when a StringValueObject is null or empty.
 * It extends the InvalidArgumentError class.
 */
class EmptyStringValueError extends InvalidArgumentError {
	/**
	 * Constructs a new EmptyStringValueError instance.
	 * @param {string} [property='StringValueObject'] - The property name (optional).
	 */
	constructor(property?: string) {
		super(`${property ?? 'StringValueObject'} can not be null or empty`, 'EmptyStringValueError', 'HEX(400)');
	}
}

/**
 * InvalidStringValueError is a class that represents an error when a StringValueObject contains invalid string values.
 * It extends the InvalidArgumentError class.
 */
class InvalidStringValueError extends InvalidArgumentError {
	/**
	 * Constructs a new InvalidStringValueError instance.
	 * @param {string} value - The invalid string value.
	 * @param {string} [property='StringValueObject'] - The property name (optional).
	 */
	constructor(value: string, property?: string) {
		super(
			`${property ?? 'StringValueObject'} can not contains '${value}' value`,
			'InvalidStringValueError',
			'HEX(400)',
		);
	}
}

/**
 * InvalidStringValueTypeError is a class that represents an error when a StringValueObject contains non-string values.
 * It extends the InvalidArgumentError class.
 */
class InvalidStringValueTypeError extends InvalidArgumentError {
	/**
	 * Constructs a new InvalidStringValueTypeError instance.
	 * @param {string} [property='StringValueObject'] - The property name (optional).
	 */
	constructor(property?: string) {
		super(
			`${property ?? 'StringValueObject'} must only contains string values`,
			'InvalidStringValueTypeError',
			'HEX(400)',
		);
	}
}

export { EmptyStringValueError, InvalidStringValueError, InvalidStringValueTypeError };
