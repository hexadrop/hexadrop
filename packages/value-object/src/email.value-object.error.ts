import InvalidArgumentError from '@hexadrop/error/invalid-argument';

/**
 * InvalidEmailValueError is a class that represents an error when a EmailValueObject contains invalid email values.
 * It extends the InvalidArgumentError class.
 */
class InvalidEmailValueError extends InvalidArgumentError {
	/**
	 * Constructs a new InvalidEmailValueError instance.
	 * @param {string} value - The invalid email value.
	 * @param {string} [property='EmailValueObject'] - The property name (optional).
	 */
	constructor(value: string, property?: string) {
		super(
			`${property ?? 'EmailValueObject'} can not contains '${value}' value`,
			'InvalidEmailValueError',
			'HEX(400)'
		);
	}
}

export default InvalidEmailValueError;
