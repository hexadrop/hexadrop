import InvalidArgumentError from '@hexadrop/error/invalid-argument';

/**
 * SpanishPhoneNumberValueError is a class that represents an error when a SpanishPhoneNumberValueObject contains invalid values.
 * It extends the InvalidArgumentError class.
 */
class SpanishPhoneNumberValueError extends InvalidArgumentError {
	/**
	 * Constructs a new SpanishPhoneNumberValueError instance.
	 * @param {string} value - The invalid phone number value.
	 * @param {string} [property='SpanishPhoneNumberValueObject'] - The property name (optional).
	 */
	constructor(value: string, property?: string) {
		super(
			`${property ?? 'SpanishPhoneNumberValueObject'} can not contains '${value}' value`,
			'SpanishPhoneNumberValueError',
			'HEX(400)'
		);
	}
}

export default SpanishPhoneNumberValueError;
