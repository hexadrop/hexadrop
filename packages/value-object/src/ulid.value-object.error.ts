import InvalidArgumentError from '@hexadrop/error/invalid-argument';

/**
 * InvalidUlidValueError is a class that represents an error when a UlidValueObject contains invalid ULID values.
 * It extends the InvalidArgumentError class.
 */
export default class InvalidUlidValueError extends InvalidArgumentError {
	/**
	 * Constructs a new InvalidUlidValueError instance.
	 * @param {string} value - The invalid ULID value.
	 * @param {string} [property='UlidValueObject'] - The property name (optional).
	 */
	constructor(value: string, property?: string) {
		super(
			`${property ?? 'UlidValueObject'} can not contains '${value}' value`,
			'InvalidUlidValueError',
			'HEX(400)',
		);
	}
}
