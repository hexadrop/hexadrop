import { EmptyStringValueError } from '../error/EmptyStringValueError';
import { InvalidStringValueError } from '../error/InvalidStringValueError';
import { InvalidStringValueTypeError } from '../error/InvalidStringValueTypeError';

export abstract class StringValueObject<S extends string = string> {
	readonly value: S;

	protected constructor(value: S, allowedValues?: S[], property?: string);
	protected constructor(value: S, allowedValues?: undefined, property?: string) {
		StringValueObject.notEmpty(value, property);
		StringValueObject.allowedType(value, property);
		StringValueObject.allowedValues(value, allowedValues, property);
		this.value = value;
	}

	private static allowedType(value: unknown, property?: string) {
		if (typeof value !== 'string') {
			throw new InvalidStringValueTypeError(property);
		}
	}

	private static allowedValues(value: string, values?: string[], property?: string) {
		if (values && !values.includes(value)) {
			throw new InvalidStringValueError(property, value);
		}
	}

	private static notEmpty(value: unknown, property?: string) {
		if (value === null || value === undefined || value === '') {
			throw new EmptyStringValueError(property);
		}
	}

	isEqualsTo(other: StringValueObject): boolean {
		return this.value === other.value;
	}

	toString(): string {
		return this.value;
	}
}
