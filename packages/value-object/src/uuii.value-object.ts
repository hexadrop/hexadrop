import StringValueObject from './string.value-object';
import InvalidUuiiValueError from './uuii.value-object.error';

// Regular expression for validating UUID format
const REGEXP = /^[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;

/**
 * UuiiValueObject is an abstract class that represents a UUID value object.
 * It extends the StringValueObject class and provides additional methods for validating the UUID value.
 */
export default abstract class UuiiValueObject extends StringValueObject {
	/**
	 * Constructs a new UuiiValueObject instance.
	 *
	 * @param value - The UUID value.
	 * @param property - Optional. The property name.
	 * @throws {InvalidUuiiValueError} If the value is not a valid UUID.
	 */
	constructor(value: string, property?: string) {
		super(value, undefined, property);
		UuiiValueObject.ensureIsValidUuid(value, property);
	}

	/**
	 * Generates a random UUID.
	 *
	 * @returns {string} A random UUID.
	 */
	static random(): string {
		return crypto.randomUUID();
	}

	/**
	 * Checks if the value is a valid UUID.
	 *
	 * @param id - The value to check.
	 * @param property - Optional. The property name.
	 * @throws {InvalidUuiiValueError} If the value is not a valid UUID.
	 */
	private static ensureIsValidUuid(id: string, property?: string): void {
		if (!REGEXP.test(id)) {
			throw new InvalidUuiiValueError(id, property);
		}
	}
}
