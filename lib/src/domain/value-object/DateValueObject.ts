import { InvalidDateValueTypeError } from '../error/InvalidDateValueTypeError';

export abstract class DateValueObject {
	readonly value: Date;

	protected constructor(value: Date) {
		DateValueObject.notEmpty(value);
		DateValueObject.allowedValue(value);
		this.value = value;
	}

	toString(): string {
		return this.value.toISOString();
	}

	isAfterThan(other: DateValueObject): boolean {
		return this.value.valueOf() > other.value.valueOf();
	}

	isBeforeThan(other: DateValueObject): boolean {
		return this.value.valueOf() < other.value.valueOf();
	}

	isEqualsTo(other: DateValueObject): boolean {
		return this.value.valueOf() === other.value.valueOf();
	}

	private static notEmpty(value: unknown) {
		if (value === null || value === undefined) throw new InvalidDateValueTypeError();
	}

	private static allowedValue(value: unknown) {
		if (!(value instanceof Date)) throw new InvalidDateValueTypeError();
	}
}
