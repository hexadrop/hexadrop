import { EmptyBooleanValueError } from '../error/empty-boolean-value.error';
import { InvalidBooleanValueTypeError } from '../error/invalid-boolean-value-type.error';

export abstract class BooleanValueObject {
	readonly value: boolean;

	protected constructor(value: boolean, property?: string) {
		BooleanValueObject.notEmpty(value, property);
		BooleanValueObject.allowedValue(value, property);
		this.value = value;
	}

	private static allowedValue(value: unknown, property?: string) {
		if (typeof value !== 'boolean') {
			throw new InvalidBooleanValueTypeError(property);
		}
	}

	private static notEmpty(value: unknown, property?: string) {
		if (value === null || value === undefined) {
			throw new EmptyBooleanValueError(property);
		}
	}

	isEqualsTo(other: BooleanValueObject): boolean {
		return this.value === other.value;
	}

	toString(): string {
		return JSON.stringify(this.value);
	}
}
