import SpanishPhoneNumberValueError from './spanish-phone-number.value-object.error';
import StringValueObject from './string.value-object';

const REGEX = /^[6-9]\d{8}$/;
export default class SpanishPhoneNumberValueObject extends StringValueObject {
	/**
	 * Constructs a new SpanishPhoneNumberValueObject instance.
	 * @param {string} value - The value of the phone number.
	 * @param {string} [property='SpanishPhoneNumberValueObject'] - The property name (optional).
	 * @throws {SpanishPhoneNumberValueError} If the value is not valid.
	 */
	constructor(value: string, property = 'SpanishPhoneNumberValueObject') {
		super(value, undefined, property);
		SpanishPhoneNumberValueObject.valueFormat(value, property);
	}

	private static valueFormat(value: string, property: string) {
		if (!REGEX.test(value)) {
			throw new SpanishPhoneNumberValueError(value, property);
		}
	}
}
