import {
	EmptyStringValueError,
	InvalidStringValueError,
	InvalidStringValueTypeError,
} from './string.value-object.error';

/**
 * StringValueObject is an abstract class that represents a string value object.
 * It provides methods for validating the string value and comparing it with other string value objects.
 *
 * @template S - The type of the string value object, which extends string.
 */
export default abstract class StringValueObject<S extends string = string> {
	readonly value: S;

	/**
	 * Constructs a new StringValueObject instance.
	 *
	 * @param value - The string value.
	 * @param allowedValues - Optional. An array of allowed string values.
	 * @param property - Optional. The property name.
	 * @throws {EmptyStringValueError} If the value is null, undefined, or an empty string.
	 * @throws {InvalidStringValueTypeError} If the value is not a string.
	 * @throws {InvalidStringValueError} If the value is not included in the allowedValues array.
	 */
	constructor(value: S, allowedValues?: S[], property?: string);
	constructor(value: S, allowedValues?: undefined, property?: string) {
		StringValueObject.notEmpty(value, property);
		StringValueObject.allowedType(value, property);
		StringValueObject.allowedValues(value, allowedValues, property);
		this.value = value;
	}

	/**
	 * Checks if the value is a string.
	 *
	 * @param value - The value to check.
	 * @param property - Optional. The property name.
	 * @throws {InvalidStringValueTypeError} If the value is not a string.
	 */
	private static allowedType(value: unknown, property?: string) {
		if (typeof value !== 'string') {
			throw new InvalidStringValueTypeError(property);
		}
	}

	/**
	 * Checks if the value is included in the allowedValues array.
	 *
	 * @param value - The value to check.
	 * @param values - Optional. An array of allowed string values.
	 * @param property - Optional. The property name.
	 * @throws {InvalidStringValueError} If the value is not included in the allowedValues array.
	 */
	private static allowedValues(value: string, values?: string[], property?: string) {
		if (values && !values.includes(value)) {
			throw new InvalidStringValueError(value, property);
		}
	}

	/**
	 * Checks if the value is not null, undefined, or an empty string.
	 *
	 * @param value - The value to check.
	 * @param property - Optional. The property name.
	 * @throws {EmptyStringValueError} If the value is null, undefined, or an empty string.
	 */
	private static notEmpty(value: unknown, property?: string) {
		if (value === null || value === undefined || value === '') {
			throw new EmptyStringValueError(property);
		}
	}

	/**
	 * Compares the string value of the current instance with the string value of another StringValueObject instance.
	 *
	 * @param other - The other StringValueObject instance to compare with.
	 * @returns {boolean} True if the string values are equal, false otherwise.
	 */
	isEqualsTo(other: StringValueObject): boolean {
		return this.value === other.value;
	}

	/**
	 * Returns the string value of the current instance.
	 *
	 * @returns {string} The string value.
	 */
	toString(): string {
		return this.value;
	}
}
