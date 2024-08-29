import { EmptyDateValueError, InvalidDateValueTypeError } from './date.value-object.error';

interface ToDateObject {
	toDate(): Date;
}

/**
 * DateValueObject is a class that represents a date value object.
 * It provides methods to compare the date value with other DateValueObject instances.
 */
export default class DateValueObject {
	/**
	 * The value of the date.
	 */
	readonly value: Date;

	/**
	 * Constructs a new DateValueObject instance.
	 * @param {Date | string | number} value - The value of the date.
	 * @param {string} [property] - The property name (optional).
	 * @throws {InvalidDateValueTypeError} If the value is not a Date instance.
	 * @throws {EmptyDateValueError} If the value is null or undefined.
	 */
	constructor(value: Date | number | string | ToDateObject, property?: string) {
		DateValueObject.notEmpty(value, property);
		DateValueObject.allowedValue(value, property);
		if (typeof value === 'string' || typeof value === 'number') {
			this.value = new Date(value);
		} else if (value instanceof Date) {
			this.value = value;
		} else {
			this.value = new Date(value.toDate());
		}
	}

	/**
	 * Checks if the value is a Date instance.
	 * @param {unknown} value - The value to check.
	 * @param {string} [property] - The property name (optional).
	 * @throws {InvalidDateValueTypeError} If the value is not a Date instance.
	 */
	private static allowedValue(value: unknown, property?: string) {
		if (
			!(value instanceof Date) &&
			typeof value !== 'string' &&
			typeof value !== 'number' &&
			(value === null ||
				typeof value !== 'object' ||
				!('toDate' in value) ||
				typeof (value as ToDateObject).toDate !== 'function')
		) {
			throw new InvalidDateValueTypeError(property);
		}
	}

	/**
	 * Checks if the value is not null or undefined.
	 * @param {unknown} value - The value to check.
	 * @param {string} [property] - The property name (optional).
	 * @throws {EmptyDateValueError} If the value is null or undefined.
	 */
	private static notEmpty(value: unknown, property?: string) {
		if (value === null || value === undefined) {
			throw new EmptyDateValueError(property);
		}
	}

	/**
	 * Checks if the date value is after the other DateValueObject's date value.
	 * @param {DateValueObject} other - The other DateValueObject to compare with.
	 * @returns {boolean} True if the date value is after, false otherwise.
	 */
	isAfterThan(other: DateValueObject): boolean {
		return this.value.valueOf() > other.value.valueOf();
	}

	/**
	 * Checks if the date value is before the other DateValueObject's date value.
	 * @param {DateValueObject} other - The other DateValueObject to compare with.
	 * @returns {boolean} True if the date value is before, false otherwise.
	 */
	isBeforeThan(other: DateValueObject): boolean {
		return this.value.valueOf() < other.value.valueOf();
	}

	/**
	 * Checks if the date value is equal to the other DateValueObject's date value.
	 * @param {DateValueObject} other - The other DateValueObject to compare with.
	 * @returns {boolean} True if the date values are equal, false otherwise.
	 */
	isEqualsTo(other: DateValueObject): boolean {
		return this.value.valueOf() === other.value.valueOf();
	}

	/**
	 * Converts the date value to a string in ISO format.
	 * @returns {string} The string representation of the date value in ISO format.
	 */
	toString(): string {
		return this.value.toISOString();
	}
}
