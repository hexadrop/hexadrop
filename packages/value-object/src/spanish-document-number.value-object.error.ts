import InvalidArgumentError from '@hexadrop/error/invalid-argument';

/**
 * InvalidSpanishDocumentNumberValueError is a class that represents an error when a SpanishDocumentNumberValueObject contains invalid values.
 * It extends the InvalidArgumentError class.
 */
class InvalidSpanishDocumentNumberValueError extends InvalidArgumentError {
	/**
	 * Constructs a new InvalidSpanishDocumentNumberValueError instance.
	 * @param {string} value - The invalid spanishDocumentNumber value.
	 * @param {string} [property='SpanishDocumentNumberValueObject'] - The property name (optional).
	 */
	constructor(value?: null | string, property?: string) {
		super(
			`${property ?? 'SpanishDocumentNumberValueObject'} can not contains '${value ?? ''}' value`,
			'InvalidSpanishDocumentNumberValueError',
			'HEX(400)'
		);
	}
}

export default InvalidSpanishDocumentNumberValueError;
