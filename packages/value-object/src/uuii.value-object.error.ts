import InvalidArgumentError from '@hexadrop/error/invalid-argument';

/**
 * InvalidUuiiValueError is a class that represents an error when a UuiiValueObject contains invalid UUII values.
 * It extends the InvalidArgumentError class.
 */
export default class InvalidUuiiValueError extends InvalidArgumentError {
	/**
	 * Constructs a new InvalidUuiiValueError instance.
	 * @param {string} value - The invalid UUII value.
	 * @param {string} [property='UuiiValueObject'] - The property name (optional).
	 */
	constructor(value: string, property?: string) {
		super(
			`${property ?? 'UuiiValueObject'} can not contains '${value}' value`,
			'InvalidUuiiValueError',
			'HEX(400)'
		);
	}
}
