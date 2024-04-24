import { decodeTime, ulid } from 'ulid';

import StringValueObject from './string.value-object';
import InvalidUlidValueError from './ulid.value-object.error';

// Regular expression for validating ULID format
const REGEXP = /^[\dA-Z]{26}$/;

/**
 * UlidValueObject is an abstract class that represents a ULID value object.
 * It extends the StringValueObject class and provides additional methods for validating the ULID value.
 */
export default abstract class UlidValueObject extends StringValueObject {
	/**
	 * Constructs a new UlidValueObject instance.
	 *
	 * @param value - The ULID value.
	 * @param property - Optional. The property name.
	 * @throws {InvalidUlidValueError} If the value is not a valid ULID.
	 */
	constructor(value: string, property?: string) {
		super(value, undefined, property);
		UlidValueObject.ensureIsValidUlid(value, property);
	}

	/**
	 * Generates a random ULID.
	 *
	 * @param {number} [seedTime] - Optional. The seed time to use for generating the ULID. If not provided, the current time is used.
	 * @returns {string} The generated ULID.
	 */
	static random(seedTime?: number): string {
		return ulid(seedTime);
	}

	/**
	 * Checks if the value is a valid ULID.
	 *
	 * @param id - The value to check.
	 * @param property - Optional. The property name.
	 * @throws {InvalidUlidValueError} If the value is not a valid ULID.
	 */
	private static ensureIsValidUlid(id: string, property?: string): void {
		if (!REGEXP.test(id)) {
			throw new InvalidUlidValueError(id, property);
		}
	}

	/**
	 * Retrieves the timestamp from the ULID value.
	 *
	 * @returns {number} The timestamp in milliseconds since the Unix epoch.
	 */
	getTime(): number {
		return decodeTime(this.value);
	}
}
