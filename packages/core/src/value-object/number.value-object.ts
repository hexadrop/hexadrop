import { EmptyNumberValueError } from '../error/empty-number-value.error';
import { InvalidNumberValueTypeError } from '../error/invalid-number-value-type.error';

export abstract class NumberValueObject {
	readonly value: number;

	protected constructor(value: number, property?: string) {
		NumberValueObject.notEmpty(value, property);
		NumberValueObject.allowedValue(value, property);
		this.value = value;
	}

	private static allowedValue(value: unknown, property?: string) {
		if (typeof value !== 'number') {
			throw new InvalidNumberValueTypeError(property);
		}
	}

	private static notEmpty(value: unknown, property?: string) {
		if (value === null || value === undefined) {
			throw new EmptyNumberValueError(property);
		}
	}

	isBiggerThan(other: NumberValueObject): boolean {
		return this.value > other.value;
	}

	isEqualsTo(other: NumberValueObject): boolean {
		return this.value === other.value;
	}

	isLesserThan(other: NumberValueObject): boolean {
		return this.value < other.value;
	}

	toString(radix?: number): string {
		return this.value.toString(radix);
	}
}
