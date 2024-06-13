import InvalidEmailValueError from './email.value-object.error';
import StringValueObject from './string.value-object';

const REGEX = /^[\w+.-]+@[\dA-Za-z-]+\.[\d.A-Za-z-]+$/;
export default class EmailValueObject extends StringValueObject {
	/**
	 * Constructs a new EmailValueObject instance.
	 * @param {string} value - The value of the email.
	 * @param {string} [property='EmailValueObject'] - The property name (optional).
	 * @throws {InvalidEmailValueError} If the value is not valid.
	 */
	constructor(value: string, property = 'EmailValueObject') {
		super(value, undefined, property);
		EmailValueObject.valueFormat(value, property);
	}

	private static valueFormat(value: string, property: string) {
		if (!REGEX.test(value)) {
			throw new InvalidEmailValueError(value, property);
		}
	}
}
