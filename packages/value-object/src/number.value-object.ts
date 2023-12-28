import { EmptyNumberValueError, InvalidNumberValueTypeError } from './number.value-object.error';

/**
 * NumberValueObject is an abstract class that represents a number value object.
 * It provides methods to compare the number value with other NumberValueObject instances.
 */
export default abstract class NumberValueObject {
	/**
	 * The value of the number.
	 */
	readonly value: number;

	/**
	 * Constructs a new NumberValueObject instance.
	 * @param {number} value - The value of the number.
	 * @param {string} [property] - The property name (optional).
	 * @throws {InvalidNumberValueTypeError} If the value is not a number.
	 * @throws {EmptyNumberValueError} If the value is null or undefined.
	 */
	constructor(value: number, property?: string) {
		NumberValueObject.notEmpty(value, property);
		NumberValueObject.allowedValue(value, property);
		this.value = value;
	}

	/**
	 * Checks if the value is a number.
	 * @param {unknown} value - The value to check.
	 * @param {string} [property] - The property name (optional).
	 * @throws {InvalidNumberValueTypeError} If the value is not a number.
	 */
	private static allowedValue(value: unknown, property?: string) {
		if (typeof value !== 'number') {
			throw new InvalidNumberValueTypeError(property);
		}
	}

	/**
	 * Checks if the value is not null or undefined.
	 * @param {unknown} value - The value to check.
	 * @param {string} [property] - The property name (optional).
	 * @throws {EmptyNumberValueError} If the value is null or undefined.
	 */
	private static notEmpty(value: unknown, property?: string) {
		if (value === null || value === undefined) {
			throw new EmptyNumberValueError(property);
		}
	}

	/**
	 * Checks if the value is bigger than the other NumberValueObject's value.
	 * @param {NumberValueObject} other - The other NumberValueObject to compare with.
	 * @returns {boolean} True if the value is bigger, false otherwise.
	 */
	isBiggerThan(other: NumberValueObject): boolean {
		return this.value > other.value;
	}

	/**
	 * Checks if the value is equal to the other NumberValueObject's value.
	 * @param {NumberValueObject} other - The other NumberValueObject to compare with.
	 * @returns {boolean} True if the values are equal, false otherwise.
	 */
	isEqualsTo(other: NumberValueObject): boolean {
		return this.value === other.value;
	}

	/**
	 * Checks if the value is lesser than the other NumberValueObject's value.
	 * @param {NumberValueObject} other - The other NumberValueObject to compare with.
	 * @returns {boolean} True if the value is lesser, false otherwise.
	 */
	isLesserThan(other: NumberValueObject): boolean {
		return this.value < other.value;
	}

	/**
	 * Converts the value to a string.
	 * @param {number} [radix] - The radix to use for the conversion (optional).
	 * @returns {string} The string representation of the value.
	 */
	toString(radix?: number): string {
		return this.value.toString(radix);
	}
}
