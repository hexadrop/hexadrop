import { EmptyBooleanValueError, InvalidBooleanValueTypeError } from './boolean.value-object.error';

/**
 * BooleanValueObject is an abstract class that represents a boolean value object.
 * It provides methods to ensure the value is not empty and is of the correct type.
 * It also provides methods to compare the value with another BooleanValueObject and to convert the value to a string.
 */
export default abstract class BooleanValueObject {
	/**
	 * The boolean value.
	 */
	readonly value: boolean;

	/**
	 * Constructs a new BooleanValueObject.
	 * @param value - The boolean value.
	 * @param property - The name of the property (optional).
	 * @throws {EmptyBooleanValueError} If the value is null or undefined.
	 * @throws {InvalidBooleanValueTypeError} If the value is not a boolean.
	 */
	constructor(value: boolean, property?: string) {
		BooleanValueObject.notEmpty(value, property);
		BooleanValueObject.allowedValue(value, property);
		this.value = value;
	}

	/**
	 * Checks if the value is a boolean.
	 * @param value - The value to check.
	 * @param property - The name of the property (optional).
	 * @throws {InvalidBooleanValueTypeError} If the value is not a boolean.
	 */
	private static allowedValue(value: unknown, property?: string) {
		if (typeof value !== 'boolean') {
			throw new InvalidBooleanValueTypeError(property);
		}
	}

	/**
	 * Checks if the value is not empty.
	 * @param value - The value to check.
	 * @param property - The name of the property (optional).
	 * @throws {EmptyBooleanValueError} If the value is null or undefined.
	 */
	private static notEmpty(value: unknown, property?: string) {
		if (value === null || value === undefined) {
			throw new EmptyBooleanValueError(property);
		}
	}

	/**
	 * Compares the value with another BooleanValueObject.
	 * @param other - The other BooleanValueObject to compare with.
	 * @returns {boolean} True if the values are equal, false otherwise.
	 */
	isEqualsTo(other: BooleanValueObject): boolean {
		return this.value === other.value;
	}

	/**
	 * Converts the value to a string.
	 * @returns {string} The string representation of the value.
	 */
	toString(): string {
		return JSON.stringify(this.value);
	}
}
