import { EmptyBooleanValueError } from '../error/EmptyBooleanValueError';
import { InvalidBooleanValueTypeError } from '../error/InvalidBooleanValueTypeError';

export abstract class BooleanValueObject {
	readonly value: boolean;

	protected constructor(value: boolean, property?: string) {
		BooleanValueObject.notEmpty(value, property);
		BooleanValueObject.allowedValue(value, property);
		this.value = value;
	}

	isEqualsTo(other: BooleanValueObject): boolean {
		return this.value === other.value;
	}

	toString(): string {
		return JSON.stringify(this.value);
	}

	private static notEmpty(value: unknown, property?: string) {
		if (value === null || value === undefined) throw new EmptyBooleanValueError(property);
	}

	private static allowedValue(value: unknown, property?: string) {
		if (typeof value !== 'boolean') throw new InvalidBooleanValueTypeError(property);
	}
}
