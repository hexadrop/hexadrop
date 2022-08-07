import { InvalidNumberValueTypeError } from '../error/InvalidNumberValueTypeError';

export abstract class NumberValueObject {
	readonly value: number;

	protected constructor(value: number) {
		NumberValueObject.notEmpty(value);
		NumberValueObject.allowedValue(value);
		this.value = value;
	}

	toString(radix?: number): string {
		return this.value.toString(radix);
	}

	isEqualsTo(other: NumberValueObject): boolean {
		return this.value === other.value;
	}

	isBiggerThan(other: NumberValueObject): boolean {
		return this.value > other.value;
	}

	isLesserThan(other: NumberValueObject): boolean {
		return this.value < other.value;
	}

	private static notEmpty(value: unknown) {
		if (value === null || value === undefined) throw new InvalidNumberValueTypeError();
	}

	private static allowedValue(value: unknown) {
		if (typeof value !== 'number') throw new InvalidNumberValueTypeError();
	}
}
